import { revalidatePath } from "next/cache";
import { getWhatsappNumber, hasSettingsStore, isValidWa, setWhatsappNumber } from "@/lib/whatsapp";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { SaveForm, type SaveResult } from "@/components/admin/SaveForm";

export const metadata = { title: "الإعدادات" };

async function save(_state: SaveResult, formData: FormData): Promise<SaveResult> {
  "use server";
  await requireAdmin();
  const raw = String(formData.get("whatsapp") ?? "").trim();
  // Accept "+20 100 000 0000", "0020...", etc. Empty clears the saved number.
  const digits = raw.replace(/\D/g, "").replace(/^00/, "");
  if ((raw && !/^[+\d\s()-]+$/.test(raw)) || (digits && !isValidWa(digits))) return { error: "راجع الرقم. اكتب كود الدولة ثم الرقم، مثال: 201001234567." };
  try { await setWhatsappNumber(digits); } catch { return { error: "تعذّر حفظ الرقم الآن. حاول مرة أخرى." }; }
  revalidatePath("/", "layout");
  return { success: digits ? "تم حفظ رقم واتساب وتحديث أزرار الموقع." : "تم إيقاف رابط واتساب. الأزرار تفتح صفحة التواصل." };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await searchParams;
  const current = await getWhatsappNumber();
  const store = hasSettingsStore();
  return (
    <main className="card max-w-xl p-8">
      <h1 className="text-2xl font-extrabold text-forest-900">إعدادات واتساب</h1>
      <p className="my-4 text-sm text-muted">لتغيير الاسم والصور والنصوص والهاتف والبريد، افتح <Link href="/admin/content" className="font-bold underline">تعديل بيانات الموقع</Link>.</p>
      <SaveForm action={save} disabled={!store}>
        <label className="grid gap-1 text-sm font-bold">رقم واتساب منة
          <input name="whatsapp" dir="ltr" inputMode="tel" defaultValue={current} placeholder="20XXXXXXXXXX" disabled={!store} className="field" />
        </label>
        <p className="text-sm text-muted">اكتب الرقم بالصيغة الدولية (كود الدولة ثم الرقم بدون +). سيظهر في كل أزرار واتساب في الموقع. اتركه فارغاً لإيقاف الأزرار وتحويلها لصفحة التواصل.</p>
        {!store && <p className="rounded-lg bg-gold-200 p-3 text-sm">الحفظ غير متاح في هذه النسخة. استخدم لوحة الموقع المنشور أو تواصل مع مسؤول الموقع.</p>}
      </SaveForm>
      <p className="mt-4 text-sm">الرقم الحالي: <bdi dir="ltr">{current ? `+${current}` : "غير مضبوط"}</bdi></p>
    </main>
  );
}
