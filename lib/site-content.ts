import { cache } from "react";
import { z } from "zod";
import { kv } from "./store";

export const contentGroups = [
  { title: "الاسم والتعريف", fields: [["brand", "الاسم"], ["role", "المسمى المهني"], ["aboutT", "عنوان النبذة"], ["aboutP", "النبذة التعريفية"], ["aboutMore", "نص رابط التعريف"], ["discover", "وصف رابط صفحة التعريف"]] },
  { title: "بداية الصفحة الرئيسية", fields: [["hero1", "العنوان — السطر الأول"], ["hero2", "العنوان — السطر الثاني"], ["heroSub", "الوصف الرئيسي"], ["heroNote", "ملاحظة الصور"]] },
  { title: "المشاريع والوحدات", fields: [["projT", "عنوان المشاريع"], ["projSub", "وصف المشاريع"], ["unitsT", "عنوان الوحدات"], ["unitsSub", "وصف الوحدات"]] },
  { title: "التواصل وآراء العملاء", fields: [["ctaT", "عنوان دعوة التواصل"], ["ctaSub", "وصف دعوة التواصل"], ["contactT", "عنوان صفحة التواصل"], ["contactSub", "وصف صفحة التواصل"], ["testT", "عنوان آراء العملاء"], ["testNone", "وصف آراء العملاء"], ["rights", "حقوق الموقع"]] },
] as const;
export const mediaFields = [["hero", "خلفية بداية الموقع"], ["cutout", "الصورة الشخصية في البداية"], ["about", "صورة قسم النبذة"], ["portrait", "صورة صفحة التعريف"], ["cta", "خلفية دعوة التواصل"]] as const;
export const defaultMedia = { hero: "/img/hero.jpg", cutout: "/img/menna-cutout.webp", about: "/img/menna-studio.jpg", portrait: "/img/menna-studio.jpg", cta: "/img/website_partners_background_interior.webp" };
export const imageUrl = z.string().max(2048).refine((value) => {
  if (/^\/(?:img|brand|media)\/[A-Za-z0-9_./-]+$/.test(value) && !value.includes("..")) return true;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; }
}, "استخدم صورة من الموقع أو رابط HTTPS صالح.");
const textFields = Object.fromEntries(contentGroups.flatMap((group) => group.fields.map(([key]) => [key, z.string().trim().max(key === "aboutP" ? 5000 : 1200).optional()])));
const texts = z.object(textFields).strict();
export const contentSchema = z.object({
  ar: texts, en: texts,
  aboutPtsAr: z.array(z.string().trim().min(1).max(180)).length(3),
  aboutPtsEn: z.array(z.string().trim().min(1).max(180)).length(3),
  media: z.object({ hero: imageUrl, cutout: imageUrl, about: imageUrl, portrait: imageUrl, cta: imageUrl }),
  phone: z.string().trim().max(30).refine((v) => !v || /^\+?[\d ()-]{7,30}$/.test(v)),
  email: z.union([z.literal(""), z.email().max(254)]),
  address: z.string().trim().max(400),
  projects: z.array(z.object({ ar: z.string().trim().min(1).max(150), en: z.string().trim().min(1).max(150), image: imageUrl })).min(1).max(8),
});
export type SiteContent = z.infer<typeof contentSchema>;
export const defaultContent: SiteContent = {
  ar: {}, en: {}, media: defaultMedia, phone: "", email: "", address: "",
  aboutPtsAr: ["فهم احتياجاتك أولاً", "متابعة شخصية لكل عميل", "معلومات دقيقة وواضحة"],
  aboutPtsEn: ["Understanding your needs first", "Personal follow-up for every client", "Accurate and clear information"],
  projects: ["website_listing_01_exterior", "website_listing_02_exterior", "website_listing_03_villa", "website_listing_04_complex_pool"].map((image, i) => ({ ar: `مشروع تجريبي ${["أ", "ب", "ج", "د"][i]}`, en: `Demo project ${String.fromCharCode(65 + i)}`, image: `/img/${image}.webp` })),
};
export const getSiteContent = cache(async (strict = false): Promise<SiteContent> => {
  try {
    const raw = await kv()?.get("site_content");
    if (!raw) return defaultContent;
    const parsed = contentSchema.safeParse(JSON.parse(raw));
    if (!parsed.success && strict) throw new Error("invalid-content");
    return parsed.success ? parsed.data : defaultContent;
  } catch (error) { if (strict) throw error; return defaultContent; }
});
export async function saveSiteContent(content: SiteContent) {
  const store = kv();
  if (!store) throw new Error("no-store");
  await store.put("site_content", JSON.stringify(contentSchema.parse(content)));
}
