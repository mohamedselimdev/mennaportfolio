import type { Metadata } from "next";
import { PageNav, Footer, WaButton } from "@/components/Chrome";
import { getWhatsappNumber } from "@/lib/whatsapp";
import Link from "next/link";
import { getDict } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
export const metadata: Metadata = { title: "تواصل معي", alternates: { canonical: "/contact" } };
export default async function Page() {
  const { t } = await getDict();
  const content = await getSiteContent();
  return (<><PageNav /><main id="form" className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-3xl font-extrabold text-forest-900">{t.contactT}</h1><p className="mt-2 text-muted">{t.contactSub}</p>
    <div className="card mt-6 space-y-4 p-6">
      {!(await getWhatsappNumber()) && <p className="rounded-lg bg-gold-200 p-3 text-sm">رقم واتساب لم يُضبط بعد . سيعمل الزر فور إضافة الرقم الموثّق.</p>}
      <WaButton className="btn btn-primary w-full" />
      {content.phone && <a href={`tel:${content.phone.replace(/[^+\d]/g, "")}`} className="btn btn-gold w-full"><bdi dir="ltr">{content.phone}</bdi></a>}
      {content.email && <a href={`mailto:${content.email}`} className="btn btn-gold w-full">{content.email}</a>}
      {content.address && <p className="whitespace-pre-line text-muted">{content.address}</p>}
      <Link href="/book-viewing" className="btn btn-gold w-full">{t.book}</Link>
    </div></main><Footer /></>);
}
