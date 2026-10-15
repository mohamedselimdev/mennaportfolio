import { kv } from "@/lib/store";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-f0-9-]{36}$/.test(id)) return new Response("Not found", { status: 404 });
  const raw = await kv()?.get(`media:${id}`);
  if (!raw) return new Response("Not found", { status: 404 });
  try {
    const image = JSON.parse(raw) as { type: string; data: string };
    if (!["image/png", "image/jpeg", "image/webp"].includes(image.type)) throw new Error("invalid-type");
    return new Response(Buffer.from(image.data, "base64"), { headers: { "Content-Type": image.type, "X-Content-Type-Options": "nosniff", "Cache-Control": "public, max-age=31536000, immutable" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
