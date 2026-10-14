import { revalidatePath } from "next/cache";
import { getWhatsappNumber, hasSettingsStore, isValidWa, setWhatsappNumber } from "@/lib/whatsapp";

export const metadata = { title: "الإعدادات" };

async function save(formData: FormData) {
  "use server";
  const raw = String(formData.get("whatsapp") ?? "").trim();
  // Accept "+20 100 000 0000", "0020...", etc. Empty clears the saved number.
  const digits = raw.replace(/\D/g, "").replace(/^00/, "");
  if (digits && !isValidWa(digits)) return;
  try { await setWhatsappNumber(digits); } catch { return; }
  revalidatePath("/", "layout");
}

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await searchParams;
  const current = await getWhatsappNumber();
  const store = hasSettingsStore();
  return (
    <main className="card max-w-xl p-8">
      <h1 className="text-2xl font-extrabold text-forest-900">الإعدادات</h1>
      <form action={save} className="mt-6 grid gap-3">
        <label className="grid gap-1 text-sm font-bold">رقم واتساب منة
          <input name="whatsapp" dir="ltr" inputMode="tel" defaultValue={current} placeholder="20XXXXXXXXXX" disabled={!store} className="field" />
        </label>
        <p className="text-sm text-muted">اكتب الرقم بالصيغة الدولية (كود الدولة ثم الرقم بدون +). سيظهر في كل أزرار واتساب في الموقع. اتركه فارغاً لإيقاف الأزرار وتحويلها لصفحة التواصل.</p>
        {!store && <p className="rounded-lg bg-gold-200 p-3 text-sm">الحفظ متاح بعد النشر على Cloudflare (يتطلب ربط KV باسم SETTINGS). حالياً يُقرأ الرقم من NEXT_PUBLIC_WHATSAPP_NUMBER.</p>}
        <button className="btn btn-primary w-fit" disabled={!store}>حفظ</button>
      </form>
      <p className="mt-4 text-sm">الرقم الحالي: <bdi dir="ltr">{current ? `+${current}` : "غير مضبوط"}</bdi></p>
    </main>
  );
}
