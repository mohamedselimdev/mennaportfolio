import { kv } from "./store";

const KEY = "whatsapp_number";
const ENV_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");

/** E.164 digits without "+", e.g. 20XXXXXXXXXX. */
export const isValidWa = (n: string) => /^[1-9]\d{9,14}$/.test(n);

export const hasSettingsStore = () => !!kv();

/** Number saved from the dashboard (KV) wins; env var is the fallback. */
export async function getWhatsappNumber(): Promise<string> {
  try {
    const saved = await kv()?.get(KEY);
    if (saved != null) return isValidWa(saved) ? saved : "";
  } catch {}
  return isValidWa(ENV_NUMBER) ? ENV_NUMBER : "";
}

export async function setWhatsappNumber(n: string) {
  const store = kv();
  if (!store) throw new Error("no-store");
  await store.put(KEY, n);
}

/** wa.me link; falls back to /contact when no verified number is configured. */
export function waLink(number: string, message: string) {
  if (!number) return "/contact#form";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export const generalMsg = "مرحباً أستاذة منة، أرغب في الاستفسار عن الوحدات المتاحة.";
export const propertyMsg = (name: string, code: string, url: string) =>
  `مرحباً أستاذة منة، مهتم بوحدة ${name} رقم ${code} ورابطها ${url}، وأرغب في معرفة التفاصيل أو حجز معاينة.`;
