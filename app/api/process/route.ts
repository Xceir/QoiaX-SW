import { NextRequest, NextResponse } from "next/server";
import { chromium, type Page, type Locator } from "playwright";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export const runtime = "nodejs";
export const maxDuration = 300;

type Upload = { name: string; path: string; size: number };

const MAX_FILE_BYTES = 100 * 1024 * 1024;
const MAX_TOTAL_BYTES = 250 * 1024 * 1024;
const MAX_FILES = 20;
const ORIGIN = "https://www.ufolouco.com.br/index.php";

function jsonError(message: string, status = 400, code = "REQUEST_FAILED") {
  return NextResponse.json({ ok: false, code, message }, { status });
}

async function saveUploads(form: FormData, field: string, dir: string, total: { bytes: number; count: number }): Promise<Upload[]> {
  const values = form.getAll(field).filter((v): v is File => v instanceof File && v.size > 0);
  const result: Upload[] = [];
  for (const file of values) {
    total.count += 1;
    total.bytes += file.size;
    if (total.count > MAX_FILES) throw new Error(`Maximum ${MAX_FILES} files per request.`);
    if (file.size > MAX_FILE_BYTES) throw new Error(`${file.name} exceeds the 100 MB per-file limit.`);
    if (total.bytes > MAX_TOTAL_BYTES) throw new Error("Total upload size exceeds 250 MB.");
    const safeName = path.basename(file.name).replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 150) || "upload.bin";
    const filePath = path.join(dir, `${total.count}-${Date.now()}-${safeName}`);
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    result.push({ name: safeName, path: filePath, size: file.size });
  }
  return result;
}

async function uploadToInput(page: Page, uploads: Upload[], terms: RegExp[], fallbackIndex: number) {
  if (!uploads.length) return;
  const inputs = page.locator('input[type="file"]');
  const count = await inputs.count();
  let best: { locator: Locator; score: number } | null = null;
  for (let i = 0; i < count; i++) {
    const input = inputs.nth(i);
    const context = await input.evaluate((el) => {
      let node: HTMLElement | null = el as HTMLElement;
      const levels: string[] = [];
      for (let depth = 0; node && depth < 6; depth++, node = node.parentElement) {
        levels.push((node.innerText || node.textContent || "").replace(/\s+/g, " ").trim().slice(0, 2000));
      }
      return levels;
    }).catch(() => [] as string[]);
    for (const term of terms) {
      const matching = context.filter((text) => term.test(text));
      if (matching.length) {
        const score = Math.min(...matching.map((text) => text.length));
        if (!best || score < best.score) best = { locator: input, score };
      }
    }
  }
  const target = best?.locator ?? (fallbackIndex < count ? inputs.nth(fallbackIndex) : null);
  if (!target) {
    throw new Error("Could not locate the upload field on UFO Wizard. The third-party form may have changed.");
  }
  await target.setInputFiles(uploads.map((u) => u.path));
}

async function clickButton(page: Page, pattern: RegExp, required = true) {
  const buttons = page.getByRole("button", { name: pattern });
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const button = buttons.nth(i);
    if (await button.isVisible().catch(() => false) && await button.isEnabled().catch(() => false)) {
      await button.click({ timeout: 8000 });
      return true;
    }
  }
  if (required) throw new Error(`Could not find an enabled button matching ${pattern}.`);
  return false;
}

async function fillPlayStationId(page: Page, psid: string) {
  if (!psid) return;
  const candidates = [
    page.getByLabel(/PlayStation ID/i),
    page.getByPlaceholder(/ufolouco-YT|UFO-Youtube|PlayStation ID/i),
    page.locator('input[type="text"]'),
  ];
  for (const candidate of candidates) {
    try {
      const count = await candidate.count();
      for (let i = 0; i < count; i++) {
        const field = candidate.nth(i);
        if (await field.isVisible().catch(() => false) && await field.isEditable().catch(() => false)) {
          await field.fill(psid);
          return;
        }
      }
    } catch {}
  }
  throw new Error("Could not find the PlayStation ID field in the selected UFO Wizard workflow.");
}

async function selectOperation(page: Page, operation: string) {
  const names: Record<string, RegExp> = {
    resign: /^Resign$/i,
    decrypt: /^Decrypt$/i,
    encrypt: /^Encrypt$/i,
    reregion: /^ReRegion$/i,
  };
  const buttons = page.getByRole("button", { name: names[operation] });
  for (let i = 0; i < await buttons.count(); i++) {
    const candidate = buttons.nth(i);
    if (await candidate.isVisible().catch(() => false)) { await candidate.click(); return; }
  }
  const text = page.getByText(names[operation], { exact: true }).first();
  if (await text.count()) { await text.click(); return; }
  throw new Error(`Could not select the ${operation} tab on UFO Wizard.`);
}

async function setIncludeSceSys(page: Page, enabled: boolean) {
  if (!enabled) return;
  const checkbox = page.getByLabel(/include sce_sys (folder|files)/i);
  for (let i = 0; i < await checkbox.count(); i++) {
    const candidate = checkbox.nth(i);
    if (await candidate.isVisible().catch(() => false)) {
      if (!(await candidate.isChecked().catch(() => false))) await candidate.check();
      return;
    }
  }
  throw new Error("The requested sce_sys option was not found on UFO Wizard.");
}

async function waitForDownload(page: Page, action: () => Promise<void>) {
  const downloadPromise = page.waitForEvent("download", { timeout: 120_000 }).catch(() => null);
  await action();
  const download = await downloadPromise;
  if (!download) return null;
  const failure = await download.failure();
  if (failure) throw new Error(`UFO Wizard download failed: ${failure}`);
  const suggested = download.suggestedFilename() || "processed-save.bin";
  const tempPath = path.join(tmpdir(), `qoiax-result-${Date.now()}-${suggested.replace(/[^a-zA-Z0-9._-]/g, "_")}`);
  await download.saveAs(tempPath);
  const bytes = await readFile(tempPath);
  await rm(tempPath, { force: true });
  return { name: suggested, bytes };
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return jsonError("Send files using multipart/form-data.");
  }

  let form: FormData;
  try { form = await request.formData(); }
  catch { return jsonError("Could not read the uploaded form."); }

  const operation = String(form.get("operation") || "").toLowerCase();
  if (!["resign", "decrypt", "encrypt", "reregion"].includes(operation)) {
    return jsonError("Unsupported operation.");
  }
  const psid = String(form.get("psid") || "").trim();
  const includeSceSys = String(form.get("includeSceSys") || "") === "true";
  if (operation !== "decrypt" && !psid) return jsonError("PlayStation ID is required.");
  if (psid.length > 100) return jsonError("PlayStation ID is too long.");

  const dir = await mkdtemp(path.join(tmpdir(), "qoiax-ufo-"));
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
  try {
    const total = { bytes: 0, count: 0 };
    const files = await saveUploads(form, "files", dir, total);
    const targetFiles = await saveUploads(form, "targetFiles", dir, total);
    const originalFiles = await saveUploads(form, "originalFiles", dir, total);
    const replacementFiles = await saveUploads(form, "replacementFiles", dir, total);
    const sceSysFiles = await saveUploads(form, "sceSysFiles", dir, total);

    if (operation === "reregion" && (!targetFiles.length || !originalFiles.length)) {
      return jsonError("ReRegion needs both a target-region reference save and the original save.");
    }
    if (operation === "encrypt" && (!files.length || !replacementFiles.length)) {
      return jsonError("Encrypt needs the original encrypted save and at least one decrypted replacement file.");
    }
    if (operation !== "reregion" && operation !== "encrypt" && !files.length) {
      return jsonError("Select at least one save file.");
    }

    browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    page.setDefaultTimeout(12_000);
    page.setDefaultNavigationTimeout(30_000);
    await page.goto(ORIGIN, { waitUntil: "domcontentloaded", timeout: 30_000 });
    await selectOperation(page, operation);
    await fillPlayStationId(page, psid);

    let result: { name: string; bytes: Buffer } | null = null;

    if (operation === "resign") {
      await uploadToInput(page, files, [/encrypted saves here/i, /resign save/i, /save folder/i], 0);
      result = await waitForDownload(page, async () => {
        await clickButton(page, /confirm resign|resign save|submit|execute/i);
      });
    } else if (operation === "decrypt") {
      await setIncludeSceSys(page, includeSceSys);
      await uploadToInput(page, files, [/drag encrypted saves here/i, /decrypt save/i], 1);
      result = await waitForDownload(page, async () => {
        await clickButton(page, /decrypt save|descriptografar|execute/i);
      });
    } else if (operation === "encrypt") {
      await uploadToInput(page, files, [/drag encrypted saves here/i, /original save file/i], 3);
      await clickButton(page, /mount save|load save|mount|continue|next/i);
      await page.waitForTimeout(800);
      await uploadToInput(page, replacementFiles, [/drag decrypted files here/i, /replacement files/i], 4);
      await setIncludeSceSys(page, includeSceSys || sceSysFiles.length > 0);
      if (sceSysFiles.length) {
        await uploadToInput(page, sceSysFiles, [/drag sce_sys files here/i, /sce_sys files/i], 5);
      }
      result = await waitForDownload(page, async () => {
        await clickButton(page, /confirm encrypt back|encrypt back|confirm encrypt/i);
      });
    } else {
      await uploadToInput(page, targetFiles, [/reference save/i, /target region save/i, /drag encrypted saves here/i], 6);
      await clickButton(page, /detect target region|continue|next|confirm target/i, false);
      await page.waitForTimeout(800);
      await uploadToInput(page, originalFiles, [/save to be converted/i, /save to convert/i], 7);
      result = await waitForDownload(page, async () => {
        await clickButton(page, /confirm reregion back|confirm reregion|reregion back/i);
      });
    }

    if (!result) {
      const bodyText = (await page.locator("body").innerText().catch(() => "")).slice(-1800);
      return NextResponse.json({
        ok: false,
        code: "NO_DOWNLOAD",
        message: "UFO Wizard did not start a file download. The site may require an extra confirmation, account sign-in, or a manual Discord step. No output was fabricated.",
        detail: bodyText,
      }, { status: 502 });
    }

    const safeName = result.name.replace(/[\r\n"]/g, "_").slice(0, 180) || "processed-save.bin";
    return new NextResponse(new Uint8Array(result.bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${safeName}"`,
        "Content-Length": String(result.bytes.byteLength),
        "Cache-Control": "no-store",
        "X-QoiaX-Operation": operation,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected processing error.";
    return jsonError(message, 502, "UPSTREAM_AUTOMATION_FAILED");
  } finally {
    if (browser) await browser.close().catch(() => {});
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
