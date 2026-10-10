import { NextRequest, NextResponse } from "next/server";
import { processWithUfoWizard } from "@/lib/ufo-wizard";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_FILES = 5;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const operation = String(form.get("operation") ?? "resign").toLowerCase();
    const psnId = String(form.get("psnId") ?? form.get("psid") ?? "").trim();
    const uploads = ["files", "targetFiles", "originalFiles", "replacementFiles", "sceSysFiles"]
      .flatMap((key) => form.getAll(key))
      .filter((v): v is File => v instanceof File);

    if (!["resign", "encrypt", "decrypt", "convert", "reregion"].includes(operation)) {
      return NextResponse.json({ error: "Unsupported operation." }, { status: 400 });
    }
    if (uploads.length === 0) {
      return NextResponse.json({ error: "Select at least one file to upload." }, { status: 400 });
    }
    if (uploads.length > MAX_FILES) {
      return NextResponse.json({ error: `Upload no more than ${MAX_FILES} files at once.` }, { status: 400 });
    }
    for (const file of uploads) {
      if (file.size === 0) {
        return NextResponse.json({ error: `${file.name} is empty.` }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `${file.name} exceeds the 100 MB limit.` }, { status: 413 });
      }
    }
    if ((operation === "resign" || operation === "reregion") && !psnId) {
      return NextResponse.json({ error: "PlayStation Network ID is required for Resign." }, { status: 400 });
    }

    const result = await processWithUfoWizard({
      operation: operation === "reregion" ? "convert" : operation as "resign" | "encrypt" | "decrypt" | "convert",
      psnId,
      files: await Promise.all(uploads.map(async (file) => ({
        name: file.name,
        type: file.type || "application/octet-stream",
        bytes: Buffer.from(await file.arrayBuffer()),
      }))),
    });

    return new NextResponse(new Uint8Array(result.bytes), {
      status: 200,
      headers: {
        "Content-Type": result.contentType || "application/octet-stream",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(result.fileName)}`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected processing error.";
    const status = message.includes("not configured") ? 503 : message.includes("HTTP 4") ? 502 : 500;
    return NextResponse.json({ error: message, message, detail: message }, { status });
  }
}
