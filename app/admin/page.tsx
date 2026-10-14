import Link from "next/link";
import { CalendarCheck, Clock, Building2 } from "lucide-react";
import { bookingsEnabled, listBookings } from "@/lib/bookings";
import { hasRealProperties, getProperties } from "@/lib/properties";
import { fmtNum } from "@/lib/data";

const status = { pending: "قيد الانتظار", confirmed: "مؤكد", cancelled: "ملغي" } as const;

export default async function Admin() {
  const enabled = bookingsEnabled();
  const bookings = await listBookings();
  const realUnits = await hasRealProperties();
  const units = realUnits ? (await getProperties()).length : 0;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const kpis = [
    [CalendarCheck, "إجمالي الحجوزات", bookings.length],
    [Clock, "حجوزات قيد الانتظار", pending],
    [Building2, "الوحدات المنشورة", units],
  ] as const;
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-extrabold text-forest-900">لوحة التحكم</h1>
      {!enabled && <p className="rounded-lg bg-gold-200 p-3 text-sm">التخزين غير متصل، فالأرقام تظهر بعد النشر على Cloudflare.</p>}
      <section aria-label="المؤشرات" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {kpis.map(([I, l, v]) => <div key={l} className="card p-5"><I className="text-forest-700" aria-hidden /><p className="mt-2 text-sm text-muted">{l}</p><p className="text-3xl font-extrabold">{fmtNum(v)}</p></div>)}
      </section>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card p-5">
          <div className="flex items-center justify-between"><h2 className="font-bold">أحدث الحجوزات</h2><Link href="/admin/bookings" className="text-sm underline">عرض الكل</Link></div>
          {bookings.length === 0 ? <p className="mt-3 text-muted">لا توجد حجوزات بعد.</p> : (
            <table className="mt-3 w-full text-sm"><thead className="text-muted"><tr><th className="text-start">العميل</th><th className="text-start">الموعد</th><th className="text-start">الحالة</th></tr></thead>
              <tbody>{bookings.slice(0, 5).map((b) => <tr key={b.id} className="border-t border-line"><td className="py-2">{b.name}</td><td className="py-2" dir="ltr">{b.date} {b.time}</td><td className="py-2">{status[b.status]}</td></tr>)}</tbody></table>
          )}
        </section>
        <section className="card p-5"><h2 className="font-bold">الزيارات والتحليلات والإعلانات</h2>
          <p className="mt-3 rounded-lg border border-dashed border-line p-6 text-center text-muted">غير متصل<br /><span className="text-xs">لا تُعرض أرقام زيارات أو نقرات أو إنفاق قبل ربط مصدر بيانات حقيقي.</span></p></section>
      </div>
    </main>
  );
}
