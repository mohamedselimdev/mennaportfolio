import { Search } from "lucide-react";
import { getDict } from "@/lib/i18n";

export async function SearchBar({ districts = ["التجمع الخامس", "القاهرة الجديدة", "٦ أكتوبر"], types = ["شقة", "فيلا"], className = "" }: { districts?: string[]; types?: string[]; className?: string }) {
  const { t, lang } = await getDict();
  const sel = "field appearance-auto !rounded-xl !bg-white !text-[#17231F] !border-[#E4DCCF]";
  const budgets: [string, number][] = [["8000000", 8], ["12000000", 12], ["25000000", 25]];
  const n = (m: number) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(m);
  return (
    <form action="/properties" method="get" className={`rounded-3xl bg-[#F6F1E8] p-5 text-[#17231F] shadow-xl ${className}`} role="search">
      <fieldset className="mb-4 flex gap-2 text-sm">
        <legend className="sr-only">{t.tabAll}</legend>
        {[["", t.tabAll], ["إيجار", t.tabRent], ["شراء", t.tabSale]].map(([v, l], i) => (
          <label key={v} className="cursor-pointer">
            <input type="radio" name="goal" value={v} defaultChecked={i === 0} className="peer sr-only" />
            <span className="block rounded-xl bg-[#E9E3D8] px-5 py-2 font-bold text-[#4a4a44] peer-checked:bg-[#121816] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2">{l}</span>
          </label>
        ))}
      </fieldset>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <select name="type" aria-label={t.fType} className={sel} defaultValue=""><option value="">{t.fType}</option>{types.map((x) => <option key={x}>{x}</option>)}</select>
        <select name="district" aria-label={t.fDistrict} className={sel} defaultValue=""><option value="">{t.fDistrict}</option>{districts.map((d) => <option key={d}>{d}</option>)}</select>
        <select name="max" aria-label={t.fBudget} className={sel} defaultValue=""><option value="">{t.fBudget}</option>{budgets.map(([v, m]) => <option key={v} value={v}>{t.fUpTo} {n(m)} {t.million}</option>)}</select>
        <button className="btn btn-sand !rounded-xl px-8"><Search size={18} aria-hidden /> {t.searchShort}</button>
      </div>
    </form>
  );
}
