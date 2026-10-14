import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { fmtPrice, statusLabel, type Property } from "@/lib/data";
import { deleteProperty, getProperties, hasRealProperties, propertiesEnabled, saveProperty, slugTaken } from "@/lib/properties";

export const metadata = { title: "الوحدات" };

const images = [
  "website_listing_01_exterior", "website_listing_02_exterior", "website_listing_03_villa", "website_listing_04_complex_pool",
  "website_hero_architecture_detail", "website_about_architecture",
].map((n) => `/img/${n}.webp`);

const num = (min: number, max: number) => z.coerce.number().int().min(min).max(max);
const schema = z.object({
  code: z.string().trim().min(2).max(30).regex(/^[A-Za-z0-9؀-ۿ_-]+$/, "invalid"),
  name: z.string().trim().min(3).max(120),
  project: z.string().trim().max(80),
  district: z.string().trim().min(2).max(60),
  type: z.string().trim().min(2).max(30),
  area: num(10, 100000), beds: num(0, 50), baths: num(0, 50),
  price: z.preprocess((v) => (v === "" || v == null ? null : Number(String(v).replace(/[,\s]/g, ""))), z.number().int().positive().max(1e11).nullable()),
  status: z.enum(["available", "ready", "soon"]),
  image: z.string().trim().refine((u) => u.startsWith("/img/") || /^https:\/\/[^\s]+$/.test(u), "invalid"),
  tags: z.string().trim().max(200),
});

async function save(formData: FormData) {
  "use server";
  const orig = String(formData.get("slug") ?? "");
  const r = schema.safeParse(Object.fromEntries(formData));
  if (!r.success) redirect(`/admin/properties?error=1${orig ? `&edit=${encodeURIComponent(orig)}` : ""}`);
  const d = r.data;
  const slug = orig || d.code.toLowerCase().replace(/[^a-z0-9؀-ۿ]+/g, "-").replace(/^-|-$/g, "");
  if (!slug) redirect("/admin/properties?error=1");
  if (!orig && (await slugTaken(slug))) redirect("/admin/properties?error=dup");
  const p: Property = {
    slug, code: d.code, name: d.name, project: d.project, district: d.district, type: d.type, area: d.area, beds: d.beds, baths: d.baths,
    price: d.price, status: d.status, image: d.image, installments: formData.get("installments") === "on",
    tags: d.tags.split(/[,،]/).map((t) => t.trim()).filter(Boolean).slice(0, 6),
  };
  try { await saveProperty(p); } catch { redirect("/admin/properties?error=store"); }
  revalidatePath("/", "layout");
  redirect("/admin/properties?saved=1");
}

async function remove(formData: FormData) {
  "use server";
  const slug = String(formData.get("slug") ?? "");
  if (slug) await deleteProperty(slug);
  revalidatePath("/", "layout");
  redirect("/admin/properties");
}

const errors: Record<string, string> = { "1": "بيانات غير صالحة، راجع الحقول.", dup: "كود الوحدة مستخدم من قبل.", store: "تعذّر الحفظ، التخزين غير متصل." };

export default async function Page({ searchParams }: { searchParams: Promise<{ edit?: string; error?: string; saved?: string }> }) {
  const q = await searchParams;
  const enabled = propertiesEnabled();
  const real = await hasRealProperties();
  const list = await getProperties();
  const cur = q.edit ? list.find((p) => p.slug === q.edit && !p.demo) : undefined;
  const L = "grid gap-1 text-sm font-bold";
  return (
    <main className="grid gap-6">
      <section className="card p-6">
        <h1 className="text-2xl font-extrabold text-forest-900">الوحدات</h1>
        {!enabled && <p className="mt-3 rounded-lg bg-gold-200 p-3 text-sm">التخزين غير متصل. الإضافة والتعديل تعملان بعد النشر على Cloudflare (KV باسم SETTINGS).</p>}
        {!real && <p className="mt-3 rounded-lg bg-gold-200 p-3 text-sm">الوحدات المعروضة حالياً تجريبية. أول وحدة تضيفها ستحلّ محلها كلها في الموقع.</p>}
        {q.saved && <p role="status" className="mt-3 rounded-lg bg-forest-700/10 p-3 text-sm">تم الحفظ.</p>}
        {q.error && <p role="alert" className="mt-3 rounded-lg bg-red-100 p-3 text-sm">{errors[q.error] ?? errors["1"]}</p>}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead><tr className="border-b text-right text-muted"><th className="p-2">الكود</th><th className="p-2">الاسم</th><th className="p-2">المنطقة</th><th className="p-2">السعر</th><th className="p-2">الحالة</th><th className="p-2" /></tr></thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.slug} className="border-b">
                  <td className="p-2" dir="ltr">{p.code}</td>
                  <td className="p-2 font-bold"><Link href={`/properties/${p.slug}`} className="underline" target="_blank">{p.name}</Link>{p.demo && <span className="ms-2 text-xs font-normal text-muted">(تجريبية)</span>}</td>
                  <td className="p-2">{p.district}</td><td className="p-2">{fmtPrice(p.price)}</td><td className="p-2">{statusLabel[p.status]}</td>
                  <td className="p-2">{!p.demo && (
                    <div className="flex gap-2">
                      <Link href={`/admin/properties?edit=${encodeURIComponent(p.slug)}`} className="btn btn-outline !py-1 text-xs">تعديل</Link>
                      <form action={remove}><input type="hidden" name="slug" value={p.slug} /><button className="btn btn-outline !py-1 text-xs">حذف</button></form>
                    </div>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-extrabold text-forest-900">{cur ? `تعديل ${cur.code}` : "إضافة وحدة"}</h2>
        <form key={cur?.slug ?? "new"} action={save} className="mt-4 grid gap-4 sm:grid-cols-2">
          <input type="hidden" name="slug" value={cur?.slug ?? ""} />
          <label className={L}>كود الوحدة<input required name="code" defaultValue={cur?.code} readOnly={!!cur} dir="ltr" placeholder="MM-101" className="field" /></label>
          <label className={L}>اسم الوحدة<input required name="name" defaultValue={cur?.name} className="field" /></label>
          <label className={L}>المشروع<input name="project" defaultValue={cur?.project} className="field" /></label>
          <label className={L}>المنطقة / المدينة<input required name="district" defaultValue={cur?.district} className="field" /></label>
          <label className={L}>النوع<input required name="type" defaultValue={cur?.type ?? "شقة"} list="types" className="field" /><datalist id="types"><option>شقة</option><option>فيلا</option><option>دوبلكس</option><option>تاون هاوس</option><option>محل</option></datalist></label>
          <label className={L}>الحالة<select name="status" defaultValue={cur?.status ?? "available"} className="field"><option value="available">متاح</option><option value="ready">جاهز للاستلام</option><option value="soon">قريباً</option></select></label>
          <label className={L}>المساحة (م²)<input required name="area" type="number" min={10} defaultValue={cur?.area} className="field" /></label>
          <label className={L}>السعر (ج.م) — اتركه فارغاً لـ «السعر عند الطلب»<input name="price" inputMode="numeric" defaultValue={cur?.price ?? ""} dir="ltr" className="field" /></label>
          <label className={L}>الغرف<input required name="beds" type="number" min={0} defaultValue={cur?.beds ?? 2} className="field" /></label>
          <label className={L}>الحمامات<input required name="baths" type="number" min={0} defaultValue={cur?.baths ?? 2} className="field" /></label>
          <label className={`${L} sm:col-span-2`}>الصورة (اختر من الموجودة أو الصق رابط https)
            <input required name="image" defaultValue={cur?.image ?? images[0]} list="imgs" dir="ltr" className="field" /><datalist id="imgs">{images.map((i) => <option key={i} value={i} />)}</datalist></label>
          <label className={`${L} sm:col-span-2`}>وسوم (مفصولة بفاصلة)<input name="tags" defaultValue={cur?.tags.join("، ")} className="field" /></label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" name="installments" defaultChecked={cur?.installments} className="h-4 w-4" /> التقسيط متاح</label>
          <div className="flex gap-3 sm:col-span-2">
            <button className="btn btn-primary" disabled={!enabled}>{cur ? "حفظ التعديل" : "إضافة الوحدة"}</button>
            {cur && <Link href="/admin/properties" className="btn btn-outline">إلغاء</Link>}
          </div>
        </form>
      </section>
    </main>
  );
}
