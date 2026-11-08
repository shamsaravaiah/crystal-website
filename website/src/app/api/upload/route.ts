import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { isSameOriginRequest } from "@/lib/security";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

const MAX_FILES = 12;
const MAX_BYTES = 8 * 1024 * 1024; // 8MB per file
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files");

  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Maximum ${MAX_FILES} images per upload` },
      { status: 400 },
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const urls: string[] = [];

  for (const entry of files) {
    if (!(entry instanceof File)) continue;

    if (!ALLOWED_TYPES.has(entry.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${entry.type || entry.name}` },
        { status: 400 },
      );
    }

    if (entry.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `${entry.name} is too large (max 8MB)` },
        { status: 400 },
      );
    }

    const extFromName = path.extname(entry.name).toLowerCase();
    const ext =
      extFromName === ".jpg" ||
      extFromName === ".jpeg" ||
      extFromName === ".png" ||
      extFromName === ".webp" ||
      extFromName === ".gif"
        ? extFromName
        : entry.type === "image/png"
          ? ".png"
          : entry.type === "image/webp"
            ? ".webp"
            : entry.type === "image/gif"
              ? ".gif"
              : ".jpg";

    const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
    const buffer = Buffer.from(await entry.arrayBuffer());
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
    urls.push(`/uploads/${filename}`);
  }

  return NextResponse.json({ urls });
}
