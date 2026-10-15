import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageNav, Footer, WaButton } from "@/components/Chrome";
import { fmtPrice, fmtNum, statusLabel } from "@/lib/data";
import { getProperty } from "@/lib/properties";
import { propertyMsg } from "@/lib/whatsapp";

type P = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) return {};
  return { title: p.name, alternates: { canonical: `/properties/${p.slug}` } };
}

export default async function PropertyPage({ params }: P) {
  const { slug } = await params;
  const p = await getProperty(slug);
  if (!p) notFound();
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const msg = propertyMsg(p.name, p.code, `${site}/properties/${p.slug}`);
  const rows: [string, string][] = [["الكود", p.code], ["المشروع", p.project], ["المنطقة", p.district], ["النوع", p.type], ["المساحة", `${fmtNum(p.area)} م²`], ["الغرف", fmtNum(p.beds)], ["الحمامات", fmtNum(p.baths)], ["الحالة", statusLabel[p.status]], ["التقسيط", p.installments ? "متاح" : "غير متاح"]];
  return (
    <>
      <PageNav />
      <main className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-forest-800">
            <Image src={p.image} alt={p.demo ? `${p.name} (صورة توضيحية)` : p.name} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" unoptimized={p.image.startsWith("http")} />
          </div>
          {p.demo && <p className="mt-2 text-xs text-muted">الصورة والبيانات تجريبية وليست وحدة فعلية.</p>}
          <h1 className="mt-4 text-3xl font-extrabold text-forest-900">{p.name}</h1>
          <dl className="card mt-6 grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
            {rows.map(([k, v]) => <div key={k}><dt className="text-xs text-muted">{k}</dt><dd className="font-bold">{v}</dd></div>)}
          </dl>
        </div>
        <aside className="card h-fit space-y-3 p-6 lg:sticky lg:top-6">
          <p className="text-2xl font-extrabold text-forest-700">{fmtPrice(p.price)}</p>
          <WaButton message={msg} label="استفسر عبر واتساب" className="btn btn-primary w-full" />
          <Link href={`/book-viewing?property=${p.code}`} className="btn btn-gold w-full">احجز معاينة</Link>
          <Link href="/contact" className="btn w-full border border-line">اتصال بالمستشارة</Link>
        </aside>
      </main>
      <Footer />
    </>
  );
}
