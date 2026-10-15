import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import type { Property } from "@/lib/data";
import { getDict, fmtPriceL, fmtNumL } from "@/lib/i18n";

export async function PropertyCard({ p }: { p: Property }) {
  const { t, lang } = await getDict();
  return (
    <article className="card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-hover)]">
      <div className="relative aspect-[16/10] bg-forest-800">
        <Image src={p.image} alt={p.demo ? `${p.name} (${t.demoImg})` : p.name} fill sizes="(max-width:768px) 85vw, 25vw" className="object-cover" unoptimized={p.image.startsWith("http")} />
        <span className="absolute top-3 start-3 rounded-md bg-[#1E9A50] px-3 py-0.5 text-xs font-bold text-white">{t.status[p.status]}</span>
        {p.demo && <span className="absolute bottom-2 end-2 rounded bg-black/55 px-2 py-0.5 text-[10px] text-white">{t.demoImg}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-extrabold text-forest-900">{p.name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted"><MapPin size={14} className="text-forest-600" aria-hidden />{p.district}</p>
        <div className="flex gap-4 text-sm text-muted">
          <span className="flex items-center gap-1"><BedDouble size={15} className="text-forest-600" aria-hidden />{fmtNumL(p.beds, lang)} {t.rooms}</span>
          <span className="flex items-center gap-1"><Bath size={15} className="text-forest-600" aria-hidden />{fmtNumL(p.baths, lang)} {t.baths}</span>
          <span className="flex items-center gap-1"><Ruler size={15} className="text-forest-600" aria-hidden />{fmtNumL(p.area, lang)} {t.sqm}</span>
        </div>
        <p className="mt-1 text-lg font-extrabold text-gold-600">{fmtPriceL(p.price, lang)}</p>
        <Link href={`/properties/${p.slug}`} className="btn mt-auto w-full rounded-xl border border-forest-900/30 text-sm text-forest-900 hover:bg-forest-900 hover:text-white">{t.details}</Link>
      </div>
    </article>
  );
}
