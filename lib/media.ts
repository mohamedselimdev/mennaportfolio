import { kv } from "./store";

export async function prepareImage(file: File) {
  if (file.size > 2 * 1024 * 1024) throw new Error("image-size");
  const bytes = Buffer.from(await file.arrayBuffer());
  const png = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  const type = png ? "image/png" : jpeg ? "image/jpeg" : webp ? "image/webp" : "";
  if (!type || type !== file.type) throw new Error("image-type");
  return { id: crypto.randomUUID(), type, data: bytes.toString("base64") };
}
export async function storeImage(image: Awaited<ReturnType<typeof prepareImage>>) {
  const store = kv();
  if (!store) throw new Error("no-store");
  await store.put(`media:${image.id}`, JSON.stringify({ type: image.type, data: image.data }));
  return `/media/${image.id}`;
}
