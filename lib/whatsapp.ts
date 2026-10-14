export const WA_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
export const waValid = /^[1-9]\d{9,14}$/.test(WA_NUMBER);

/** wa.me link; falls back to /contact when no verified number is configured. */
export function waLink(message: string) {
  if (!waValid) return "/contact#form";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
export const generalMsg = "مرحباً أستاذة منة، أرغب في الاستفسار عن الوحدات المتاحة.";
export const propertyMsg = (name: string, code: string, url: string) =>
  `مرحباً أستاذة منة، مهتم بوحدة ${name} رقم ${code} ورابطها ${url}، وأرغب في معرفة التفاصيل أو حجز معاينة.`;
