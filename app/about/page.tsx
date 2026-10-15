import type { Metadata } from "next";
import Image from "next/image";
import { PageNav, Footer, WaButton } from "@/components/Chrome";
import { getDict } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
export const metadata: Metadata = { title: "من أنا", alternates: { canonical: "/about" } };
export default async function Page() {
  const { t } = await getDict();
  const content = await getSiteContent();
  return (<><PageNav /><main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1fr_1.4fr]">
    <div className="relative aspect-square overflow-hidden rounded-2xl"><Image src={content.media.portrait} unoptimized alt={t.brand} fill sizes="40vw" className="object-cover object-top" /></div>
    <div><h1 className="text-3xl font-extrabold text-forest-900">{t.brand}</h1>
      <p className="mt-4 whitespace-pre-line leading-8 text-muted">{t.aboutP}</p>
      <div className="mt-6"><WaButton /></div></div></main><Footer /></>);
}
