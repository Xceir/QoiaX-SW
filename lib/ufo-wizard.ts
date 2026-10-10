export type WizardOperation = "resign" | "encrypt" | "decrypt" | "convert";

export interface WizardInput {
  operation: WizardOperation;
  psnId: string;
  files: Array<{ name: string; type: string; bytes: Buffer }>;
}

export interface WizardOutput {
  bytes: Buffer;
  contentType: string;
  fileName: string;
}

/**
 * Server-side adapter for a compatible UFO Wizard processing API.
 * It deliberately never fabricates a processed save: without a configured API
 * endpoint, the UI receives a clear setup error instead of a fake download.
 */
export async function processWithUfoWizard(input: WizardInput): Promise<WizardOutput> {
  const endpoint = process.env.UFO_WIZARD_API_URL?.trim();
  if (!endpoint) {
    throw new Error("Save processing is not configured. Set UFO_WIZARD_API_URL to a compatible processing API endpoint in the server environment.");
  }

  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    throw new Error("UFO_WIZARD_API_URL must be a valid absolute URL.");
  }
  if (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
    throw new Error("The processing endpoint must use HTTPS, except for localhost development.");
  }

  const body = new FormData();
  body.set("operation", input.operation);
  if (input.psnId) body.set("psnId", input.psnId);
  for (const file of input.files) {
    body.append("files", new Blob([new Uint8Array(file.bytes)], { type: file.type }), file.name);
  }

  const response = await fetch(url, { method: "POST", body, signal: AbortSignal.timeout(110_000), cache: "no-store" });
  if (!response.ok) {
    const detail = (await response.text().catch(() => "")).slice(0, 500);
    throw new Error(`Processing service returned HTTP ${response.status}.${detail ? ` ${detail}` : ""}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length) throw new Error("The processing service returned an empty file.");
  const disposition = response.headers.get("content-disposition") ?? "";
  const encodedName = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const quotedName = disposition.match(/filename="?([^";]+)"?/i)?.[1];
  let fileName = `qoiax-${input.operation}-result.bin`;
  try { if (encodedName) fileName = decodeURIComponent(encodedName); else if (quotedName) fileName = quotedName; } catch { /* keep safe fallback */ }
  fileName = fileName.replace(/[\\/\0-\x1f]/g, "_").slice(0, 180) || `qoiax-${input.operation}-result.bin`;
  return { bytes, contentType: response.headers.get("content-type") || "application/octet-stream", fileName };
}
