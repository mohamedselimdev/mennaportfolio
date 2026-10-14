import { NextResponse } from "next/server";
import { z } from "zod";
import { createBooking } from "@/lib/bookings";
import { notifyNewBooking } from "@/lib/notify";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^\+?[0-9\s-]{8,16}$/, "رقم الهاتف غير صالح"),
  property: z.string().trim().max(40).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):(00|30)$/),
  channel: z.enum(["whatsapp", "call"]),
  notes: z.string().trim().max(500).optional(),
  consent: z.literal(true),
});
const hits = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "محاولات كثيرة، حاول لاحقًا" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "بيانات غير صالحة", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  const b = parsed.data;
  if (new Date(`${b.date}T${b.time}:00+03:00`).getTime() < now) return NextResponse.json({ error: "اختر موعدًا في المستقبل" }, { status: 400 });

  try {
    const r = await createBooking(b);
    if (r === "taken") return NextResponse.json({ error: "هذا الموعد محجوز، اختر موعدًا آخر" }, { status: 409 });
    if (r === "no-store") return NextResponse.json({ error: "تخزين الحجوزات غير مُفعّل بعد" }, { status: 503 });
    notifyNewBooking(b);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "تعذّر حفظ الطلب، حاول مرة أخرى" }, { status: 500 });
  }
}
