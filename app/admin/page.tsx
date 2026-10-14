import { Eye, Users, CalendarCheck, MessageCircle, Filter } from "lucide-react";
import { TrendChart } from "./Charts";
import { fmtNum } from "@/lib/data";

// DEMO numbers: not real. Replace with queries over AnalyticsEvent/Lead/Booking once the DB is connected.
const kpis = [[Eye, "إجمالي الزيارات", 1240], [Users, "العملاء المحتملون", 64], [CalendarCheck, "حجوزات المعاينة", 18], [MessageCircle, "نقرات واتساب", 92]] as const;
const trend = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"].map((m, i) => ({ m, visits: 400 + i * 130, leads: 20 + i * 8 }));
const funnel = [["الزيارات", 1240], ["نماذج مرسلة", 64], ["نقرات واتساب", 92], ["حجوزات", 18]] as const;
const leads = [["عميل تجريبي ١", "DEMO-001", "الموقع", "جديد"], ["عميل تجريبي ٢", "DEMO-002", "واتساب", "تم التواصل"], ["عميل تجريبي ٣", "DEMO-003", "الموقع", "معاينة محجوزة"]];

export default function Admin() {
  return (
    <main className="space-y-6">
      <div><h1 className="text-3xl font-extrabold text-forest-900">لوحة التحكم</h1>
        <p className="mt-1 rounded-lg bg-gold-200 p-2 text-sm">وضع تجريبي: الأرقام أدناه عيّنة توضيحية وليست بيانات حقيقية. نقرة واتساب ≠ رسالة مُسلَّمة أو صفقة.</p></div>
      <section aria-label="المؤشرات" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(([I, l, v]) => <div key={l} className="card p-5"><I className="text-forest-700" aria-hidden /><p className="mt-2 text-sm text-muted">{l}</p><p className="text-3xl font-extrabold">{fmtNum(v)}</p></div>)}
      </section>
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="card p-5"><h2 className="font-bold">الزيارات والعملاء المحتملون</h2><TrendChart data={trend} /></section>
        <section className="card p-5"><h2 className="flex items-center gap-2 font-bold"><Filter size={16} aria-hidden />مسار التحويل</h2>
          <ul className="mt-4 space-y-3">{funnel.map(([l, v]) => <li key={l}><div className="flex justify-between text-sm"><span>{l}</span><b>{fmtNum(v)}</b></div><div className="mt-1 h-2 rounded bg-line"><div className="h-2 rounded bg-forest-700" style={{ width: `${Math.max(4, (v / 1240) * 100)}%` }} /></div></li>)}</ul></section>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card p-5"><h2 className="font-bold">أحدث العملاء المحتملين</h2>
          <table className="mt-3 w-full text-sm"><thead className="text-muted"><tr><th className="text-start">العميل</th><th className="text-start">الوحدة</th><th className="text-start">المصدر</th><th className="text-start">الحالة</th></tr></thead>
            <tbody>{leads.map((r) => <tr key={r[0]} className="border-t border-line">{r.map((c) => <td key={c} className="py-2">{c}</td>)}</tr>)}</tbody></table></section>
        <section className="card p-5"><h2 className="font-bold">أداء الحملات الإعلانية</h2>
          <p className="mt-3 rounded-lg border border-dashed border-line p-6 text-center text-muted">غير متصل<br /><span className="text-xs">اربط Meta / Google Ads أو أدخل التكاليف يدويًا. لا تُعرض أرقام إنفاق مُختلقة.</span></p></section>
      </div>
    </main>
  );
}
