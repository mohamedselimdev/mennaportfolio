import { Search } from "lucide-react";

export function SearchBar({ districts = ["التجمع الخامس", "القاهرة الجديدة", "٦ أكتوبر"], types = ["شقة", "فيلا"] }: { districts?: string[]; types?: string[] }) {
  const sel = "field appearance-auto";
  return (
    <form action="/properties" method="get" className="card mx-auto grid max-w-[1100px] gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] items-end" role="search">
      <label className="text-xs font-bold text-forest-900">المنطقة / المدينة
        <select name="district" className={sel} defaultValue=""><option value="">كل المناطق</option>{districts.map((d) => <option key={d}>{d}</option>)}</select></label>
      <label className="text-xs font-bold text-forest-900">نوع الوحدة
        <select name="type" className={sel} defaultValue=""><option value="">كل الأنواع</option>{types.map((t) => <option key={t}>{t}</option>)}</select></label>
      <label className="text-xs font-bold text-forest-900">الميزانية
        <select name="max" className={sel} defaultValue=""><option value="">كل الميزانيات</option><option value="8000000">حتى ٨ مليون</option><option value="12000000">حتى ١٢ مليون</option><option value="25000000">حتى ٢٥ مليون</option></select></label>
      <label className="text-xs font-bold text-forest-900">الهدف
        <select name="goal" className={sel} defaultValue=""><option value="">شراء أو إيجار</option><option>شراء</option><option>إيجار</option></select></label>
      <button className="btn btn-primary"><Search size={18} aria-hidden /> ابحث عن وحدتك</button>
    </form>
  );
}
