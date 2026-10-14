import type { Metadata } from "next";
import { PageNav, Footer, WaFab, WaButton } from "@/components/Chrome";
import { getWhatsappNumber } from "@/lib/whatsapp";
import Link from "next/link";
export const metadata: Metadata = { title: "تواصل معي", alternates: { canonical: "/contact" } };
export default async function Page() {
  return (<><PageNav /><main id="form" className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-3xl font-extrabold text-forest-900">تواصل معي</h1>
    <div className="card mt-6 space-y-4 p-6">
      {!(await getWhatsappNumber()) && <p className="rounded-lg bg-gold-200 p-3 text-sm">رقم واتساب لم يُضبط بعد . سيعمل الزر فور إضافة الرقم الموثّق.</p>}
      <WaButton className="btn btn-primary w-full" />
      <Link href="/book-viewing" className="btn btn-gold w-full">احجز معاينة أو استشارة</Link>
    </div></main><Footer /><WaFab /></>);
}
