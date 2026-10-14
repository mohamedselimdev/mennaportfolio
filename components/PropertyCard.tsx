import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, Heart } from "lucide-react";
import { Property, fmtPrice, fmtNum, statusLabel } from "@/lib/data";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="card overflow-hidden transition-shadow hover:shadow-[var(--shadow-hover)] flex flex-col">
      <div className="relative aspect-[16/9] bg-forest-800">
        <Image src={p.image} alt={`${p.name} (صورة توضيحية)`} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover" />
        <span className="absolute top-3 start-3 rounded-full bg-forest-700 px-3 py-0.5 text-xs font-bold text-white">{statusLabel[p.status]}</span>
        <span className="absolute top-3 end-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-forest-900"><Heart size={15} aria-hidden /></span>
        <span className="absolute bottom-2 end-2 rounded bg-black/55 px-2 py-0.5 text-[10px] text-white">صورة تجريبية</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-bold text-forest-900">{p.name}</h3>
        <p className="text-xs text-muted">{p.project} · {p.district}</p>
        <p className="font-bold text-forest-700">{fmtPrice(p.price)}</p>
        <div className="flex gap-4 text-xs text-muted">
          <span className="flex items-center gap-1"><BedDouble size={14} aria-hidden />{fmtNum(p.beds)} غرف</span>
          <span className="flex items-center gap-1"><Bath size={14} aria-hidden />{fmtNum(p.baths)} حمام</span>
          <span className="flex items-center gap-1"><Ruler size={14} aria-hidden />{fmtNum(p.area)} م²</span>
        </div>
        <Link href={`/properties/${p.slug}`} className="btn btn-gold mt-auto w-full text-sm">تفاصيل الوحدة</Link>
      </div>
    </article>
  );
}
