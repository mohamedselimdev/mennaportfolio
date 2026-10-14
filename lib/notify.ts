import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Booking } from "./bookings";

type NewBooking = Omit<Booking, "id" | "status" | "createdAt">;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const post = (url: string, init: RequestInit) => fetch(url, { ...init, signal: AbortSignal.timeout(8000) });

function lines(b: NewBooking) {
  return [
    `حجز معاينة جديد`,
    `الاسم: ${b.name}`,
    `الهاتف: ${b.phone} (${b.channel === "whatsapp" ? "واتساب" : "اتصال"})`,
    `الوحدة: ${b.property || "—"}`,
    `الموعد: ${b.date} ${b.time}`,
    ...(b.notes ? [`ملاحظات: ${b.notes}`] : []),
  ];
}

async function telegram(b: NewBooking) {
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return;
  await post(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chat, text: lines(b).join("\n") }),
  });
}

async function email(b: NewBooking) {
  const key = process.env.RESEND_API_KEY, to = process.env.NOTIFY_EMAIL_TO, from = process.env.NOTIFY_EMAIL_FROM;
  if (!key || !to || !from) return;
  const [title, ...rest] = lines(b);
  await post("https://api.resend.com/emails", {
    method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
    body: JSON.stringify({ from, to: to.split(",").map((x) => x.trim()), subject: `${title}: ${b.name} - ${b.date} ${b.time}`, html: `<div dir="rtl">${rest.map(esc).join("<br>")}</div>` }),
  });
}

/** Fire-and-forget: never throws, never delays the booking response when waitUntil is available. */
export function notifyNewBooking(b: NewBooking) {
  const job = Promise.allSettled([telegram(b), email(b)]).then(() => undefined);
  try { getCloudflareContext().ctx.waitUntil(job); } catch { /* local: job still runs */ }
}
