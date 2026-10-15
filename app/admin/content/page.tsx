import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { contentGroups, mediaFields, getSiteContent, contentSchema, saveSiteContent } from "@/lib/site-content";
import { dicts } from "@/lib/i18n";
import { kv } from "@/lib/store";
import { requireAdmin } from "@/lib/admin-auth";
import { prepareImage, storeImage } from "@/lib/media";
import { SaveForm, type SaveResult } from "@/components/admin/SaveForm";

export const metadata = { title: "تعديل بيانات الموقع" };
async function save(_state: SaveResult, form: FormData): Promise<SaveResult> {
  "use server";
  await requireAdmin();
  const value = (name: string) => String(form.get(name) ?? "").trim();
  const text = (lang: string) => Object.fromEntries(contentGroups.flatMap((group) => group.fields.map(([key]) => [key, value(`${lang}.${key}`)])));
  const candidate = {
    ar: text("ar"), en: text("en"),
    aboutPtsAr: [0,1,2].map((i) => value(`aboutPtsAr.${i}`)), aboutPtsEn: [0,1,2].map((i) => value(`aboutPtsEn.${i}`)),
    media: Object.fromEntries(mediaFields.map(([key]) => [key, value(`media.${key}`)])),
    phone: value("phone"), email: value("email"), address: value("address"),
    projects: Array.from({ length: 8 }, (_, i) => ({ ar: value(`project.${i}.ar`), en: value(`project.${i}.en`), image: value(`project.${i}.image`) })).filter((p) => p.ar || p.en || p.image),
  };
  const parsed = contentSchema.safeParse(candidate);
  if (!parsed.success) {
    const path = parsed.error.issues[0]?.path ?? [];
    const key = String(path.at(-1) ?? "");
    const label = contentGroups.flatMap((group) => group.fields.map(([field, label]) => ({ field, label }))).find((item) => item.field === key)?.label
      ?? mediaFields.find(([field]) => field === key)?.[1]
      ?? ({ phone: "رقم الاتصال", email: "البريد الإلكتروني", address: "العنوان", aboutPtsAr: "المميزات بالعربي", aboutPtsEn: "المميزات بالإنجليزي" } as Record<string, string>)[String(path[0])]
      ?? (path[0] === "projects" ? `بيانات المشروع ${Number(path[1] ?? 0) + 1}` : "البيانات المدخلة");
    return { error: `راجع الحقل: ${label}. أكمل البيانات، واستخدم أسماء وروابط صحيحة.` };
  }
  try {
    const uploads = mediaFields.map(([key]) => ({ key, file: form.get(`upload.${key}`) })).filter((item): item is { key: typeof mediaFields[number][0]; file: File } => item.file instanceof File && item.file.size > 0);
    if (uploads.reduce((sum, item) => sum + item.file.size, 0) > 10 * 1024 * 1024) return { error: "إجمالي الصور يجب ألا يزيد عن 10 ميجابايت." };
    const prepared = await Promise.all(uploads.map(async (item) => ({ key: item.key, image: await prepareImage(item.file) })));
    for (const item of prepared) parsed.data.media[item.key] = await storeImage(item.image);
    await saveSiteContent(parsed.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return { error: message === "image-size" ? "كل صورة يجب ألا تزيد عن 2 ميجابايت." : message === "image-type" ? "استخدم صور JPG أو PNG أو WebP فقط." : "تعذّر الحفظ الآن. حاول مرة أخرى." };
  }
  revalidatePath("/", "layout");
  return { success: "تم الحفظ. قد يستغرق ظهور التغييرات للجميع دقيقة." };
}
export default async function Page() {
  const content = await getSiteContent(true).catch(() => null);
  if (!content) return <main className="card p-6" dir="rtl"><h1 className="text-2xl font-bold">تعذّر تحميل بيانات الموقع</h1><p className="mt-3">حاول تحديث الصفحة بعد قليل. الحفظ متوقف مؤقتًا لحماية بياناتك الحالية.</p></main>;
  const enabled = !!kv();
  return <main className="mx-auto max-w-5xl space-y-6" dir="rtl">
    <header><h1 className="text-3xl font-extrabold text-forest-900">تعديل بيانات الموقع</h1><p className="mt-2 text-muted">افتح القسم المطلوب، عدّل البيانات، ثم اضغط حفظ التغييرات أسفل الصفحة.</p></header>
    <div className="flex flex-wrap gap-3"><Link href="/" target="_blank" rel="noopener noreferrer" className="btn btn-gold">معاينة الموقع</Link><Link href="/admin/settings" className="btn btn-gold">تعديل رقم واتساب</Link><Link href="/admin/properties" className="btn btn-gold">العقارات والأسعار</Link></div>
    {!enabled && <p role="alert" className="rounded-xl bg-gold-200 p-4">الحفظ غير متاح في هذه النسخة. افتح لوحة الموقع المنشور أو تواصل مع مسؤول الموقع.</p>}
    <SaveForm action={save} disabled={!enabled}>
      {contentGroups.map((group, index) => <details key={group.title} open={index === 0} className="card p-5">
        <summary className="cursor-pointer text-lg font-bold text-forest-900">{group.title}</summary>
        <div className="mt-5 grid gap-6 md:grid-cols-2">{(["ar", "en"] as const).map((lang) => <fieldset key={lang} className="min-w-0 space-y-4"><legend className="mb-4 font-bold">{lang === "ar" ? "العربية" : "English"}</legend>
          {group.fields.map(([key, label]) => <label key={key} className="grid gap-2 text-sm font-bold">{label}<textarea name={`${lang}.${key}`} dir={lang === "ar" ? "rtl" : "ltr"} rows={key === "aboutP" ? 5 : 2} maxLength={key === "aboutP" ? 5000 : 1200} defaultValue={content[lang][key] ?? dicts[lang][key]} className="field font-normal" /></label>)}
        </fieldset>)}</div>
      </details>)}
      <details className="card p-5"><summary className="cursor-pointer text-lg font-bold text-forest-900">المميزات الثلاثة</summary><div className="mt-5 grid gap-5 md:grid-cols-2">{(["aboutPtsAr", "aboutPtsEn"] as const).map((key) => <fieldset key={key} className="space-y-3"><legend className="mb-3 font-bold">{key === "aboutPtsAr" ? "العربية" : "English"}</legend>{content[key].map((text, i) => <label key={i} className="grid gap-1 text-sm">الميزة {i + 1}<input name={`${key}.${i}`} required maxLength={180} dir={key === "aboutPtsAr" ? "rtl" : "ltr"} defaultValue={text} className="field" /></label>)}</fieldset>)}</div></details>
      <details id="photos" className="card p-5"><summary className="cursor-pointer text-lg font-bold text-forest-900">صور الموقع</summary><p className="mt-3 text-sm text-muted">ارفع صورة JPG أو PNG أو WebP حتى 2 ميجابايت، أو الصق رابط صورة HTTPS. الصورة المرفوعة تستبدل الرابط عند الحفظ. للصورة المفرغة استخدم PNG أو WebP شفافًا.</p><div className="mt-5 grid gap-5 md:grid-cols-2">{mediaFields.map(([key, label]) => <fieldset key={key} className="min-w-0 space-y-3 rounded-xl border border-line p-4"><legend className="px-2 font-bold">{label}</legend><div className="relative aspect-video overflow-hidden rounded-lg bg-cream"><Image src={content.media[key]} alt={label} fill unoptimized sizes="400px" className="object-contain" /></div><label className="grid gap-1 text-sm">الرابط الحالي<input name={`media.${key}`} dir="ltr" required defaultValue={content.media[key]} className="field" /></label><label className="grid gap-1 text-sm">اختيار صورة جديدة<input type="file" name={`upload.${key}`} accept="image/png,image/jpeg,image/webp" className="field text-xs" /></label></fieldset>)}</div></details>
      <details className="card p-5"><summary className="cursor-pointer text-lg font-bold text-forest-900">بيانات التواصل</summary><div className="mt-5 grid gap-4 md:grid-cols-2"><label className="grid gap-2 text-sm font-bold">رقم الاتصال<input type="tel" name="phone" dir="ltr" maxLength={30} defaultValue={content.phone} className="field" /></label><label className="grid gap-2 text-sm font-bold">البريد الإلكتروني<input type="email" name="email" dir="ltr" defaultValue={content.email} className="field" /></label><label className="grid gap-2 text-sm font-bold md:col-span-2">العنوان<textarea name="address" maxLength={400} defaultValue={content.address} className="field" /></label></div></details>
      <details id="projects" className="card p-5"><summary className="cursor-pointer text-lg font-bold text-forest-900">كروت المشاريع</summary><p className="mt-3 text-sm text-muted">أكمل بطاقة فارغة لإضافة مشروع. لإزالته امسح حقول البطاقة الثلاثة. يجب الاحتفاظ بمشروع واحد على الأقل.</p><div className="mt-5 grid gap-4 md:grid-cols-2">{Array.from({ length: 8 }, (_, i) => <fieldset key={i} className="min-w-0 space-y-3 rounded-xl border border-line p-4"><legend className="px-2 font-bold">مشروع {i + 1}</legend>{(["ar", "en", "image"] as const).map((key) => <label key={key} className="grid gap-1 text-sm">{key === "ar" ? "الاسم بالعربي" : key === "en" ? "الاسم بالإنجليزي" : "رابط الصورة"}<input name={`project.${i}.${key}`} dir={key === "ar" ? "rtl" : "ltr"} maxLength={key === "image" ? 2048 : 150} defaultValue={content.projects[i]?.[key] ?? ""} className="field" /></label>)}</fieldset>)}</div></details>
    </SaveForm>
  </main>;
}
