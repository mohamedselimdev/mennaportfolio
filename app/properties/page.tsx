import type { Metadata } from "next";
import { PageNav, Footer, WaFab } from "@/components/Chrome";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/lib/data";
import Link from "next/link";

export const metadata: Metadata = { title: "الوحدات المتاحة", alternates: { canonical: "/properties" } };

export default async function Properties({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const q = await searchParams;
  const max = q.max ? Number(q.max) : undefined;
  let list = properties.filter((p) => (!q.district || p.district === q.district) && (!q.type || p.type === q.type) && (!max || p.price == null || p.price <= max));
  if (q.sort === "price") list = [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  return (
    <>
      <PageNav />
      <main className="mx-auto max-w-[1280px] px-4 py-10">
        <h1 className="text-3xl font-extrabold text-forest-900">الوحدات المتاحة</h1>
        <div className="mt-6"><SearchBar /></div>
        <div className="mt-6 flex gap-3 text-sm"><span className="text-muted">ترتيب:</span>
          <Link href={{ query: { ...q, sort: "" } }} className="underline">الأحدث</Link>
          <Link href={{ query: { ...q, sort: "price" } }} className="underline">السعر الأقل</Link></div>
        {list.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{list.map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
        ) : (
          <div className="card mt-8 p-10 text-center"><p className="font-bold">لا توجد وحدات مطابقة</p><p className="mt-1 text-sm text-muted">جرّب توسيع الفلاتر أو تواصل معي لمساعدتك.</p><Link href="/properties" className="btn btn-primary mt-4">مسح الفلاتر</Link></div>
        )}
      </main>
      <Footer /><WaFab />
    </>
  );
}
