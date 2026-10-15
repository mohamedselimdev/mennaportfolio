import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Clock, CheckCircle2, Building2, Plus, PenSquare, ExternalLink, Activity } from "lucide-react";
import { bookingsEnabled, listBookings } from "@/lib/bookings";
import { hasRealProperties, getProperties } from "@/lib/properties";
import { fmtNum } from "@/lib/data";

export const metadata = { title: "لوحة التحكم" };

const status = { pending: "قيد الانتظار", confirmed: "مؤكد", cancelled: "ملغي" } as const;
const tone = { pending: "bg-gold-200 text-forest-900", confirmed: "bg-forest-700 text-white", cancelled: "bg-line text-muted" } as const;


export default async function Admin() {
  const enabled = bookingsEnabled();
  const bookings = await listBookings();
  const realUnits = await hasRealProperties();
  const units = (await getProperties()).filter((p) => !p.demo);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date());
  const dateLabel = new Intl.DateTimeFormat("ar-EG", { timeZone: "Africa/Cairo", dateStyle: "full" }).format(new Date());
  const count = (s: keyof typeof status) => bookings.filter((b) => b.status === s).length;
  const upcoming = bookings.filter((b) => b.status !== "cancelled" && b.date >= today).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 5);
  const kpis = [
    [CalendarCheck, "إجمالي الحجوزات", fmtNum(bookings.length)],
    [Clock, "قيد الانتظار", fmtNum(count("pending"))],
    [CheckCircle2, "حجوزات مؤكدة", fmtNum(count("confirmed"))],
    [Building2, "وحدات منشورة", fmtNum(realUnits ? units.length : 0)],
  ] as const;
  const max = Math.max(1, ...(["pending", "confirmed", "cancelled"] as const).map(count));

  return (
    <main className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-forest-900">لوحة التحكم</h1>
          <p className="mt-1 text-muted">إدارة عملائك ومحتواك ومتابعة أداء التسويق في مكان واحد</p>
        </div>
        <div className="text-end text-sm"><p className="text-lg font-bold">مرحباً منة</p><p className="text-muted">{dateLabel}</p></div>
      </header>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/properties" className="btn btn-primary"><Plus size={18} aria-hidden /> إضافة وحدة</Link>
        <Link href="/admin/content" className="btn btn-gold"><PenSquare size={18} aria-hidden /> تعديل بيانات الموقع</Link>
        <Link href="/" className="btn btn-gold"><ExternalLink size={18} aria-hidden /> عرض الموقع</Link>
      </div>

      {!enabled && <p className="rounded-lg bg-gold-200 p-3 text-sm text-forest-900">التخزين غير متصل محلياً، فالأرقام تظهر بعد النشر على Cloudflare.</p>}

      <section aria-label="المؤشرات" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(([I, l, v]) => (
          <div key={l} className="card p-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cream text-forest-700"><I size={20} aria-hidden /></span>
            <p className="mt-3 text-sm text-muted">{l}</p>
            <p className={`mt-1 font-extrabold ${v === "غير متصل" ? "text-lg text-muted" : "text-3xl"}`}>{v}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between"><h2 className="font-bold">حالة الحجوزات</h2><Link href="/admin/bookings" className="text-sm underline">عرض الكل</Link></div>
          {bookings.length === 0 ? <p className="mt-4 text-muted">لا توجد حجوزات بعد.</p> : (
            <ul className="mt-4 space-y-3">
              {(["pending", "confirmed", "cancelled"] as const).map((s) => (
                <li key={s} className="grid grid-cols-[6rem_1fr_2rem] items-center gap-3 text-sm">
                  <span>{status[s]}</span>
                  <span className="h-3 overflow-hidden rounded-full bg-cream"><span className="block h-full rounded-full bg-forest-700" style={{ width: `${(count(s) / max) * 100}%` }} /></span>
                  <span className="font-bold">{fmtNum(count(s))}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card p-5">
          <h2 className="font-bold">المواعيد القادمة للمعاينات</h2>
          {upcoming.length === 0 ? <p className="mt-4 text-muted">لا توجد مواعيد قادمة.</p> : (
            <ul className="mt-3 divide-y divide-line text-sm">
              {upcoming.map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-2 py-2.5">
                  <div><p className="font-bold">{b.name}</p><p className="text-xs text-muted" dir="ltr">{b.date} · {b.time}</p></div>
                  <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${tone[b.status]}`}>{status[b.status]}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="card p-5">
        <div className="flex items-center justify-between"><h2 className="font-bold">الوحدات</h2><Link href="/admin/properties" className="text-sm underline">إدارة الوحدات</Link></div>
        {units.length === 0 ? <p className="mt-4 text-muted">لا توجد وحدات منشورة بعد. الوحدات المعروضة في الموقع حالياً تجريبية.</p> : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {units.slice(0, 4).map((p) => (
              <li key={p.slug} className="overflow-hidden rounded-xl border border-line">
                <div className="relative aspect-[16/9] bg-forest-800"><Image src={p.image} alt="" fill sizes="25vw" className="object-cover" unoptimized={p.image.startsWith("http")} /></div>
                <p className="truncate p-3 text-sm font-bold">{p.name}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card p-5">
        <h2 className="flex items-center gap-2 font-bold"><Activity size={18} aria-hidden /> النشاط الأخير</h2>
        {bookings.length === 0 ? <p className="mt-4 text-muted">لا يوجد نشاط بعد.</p> : (
          <ul className="mt-3 divide-y divide-line text-sm">
            {bookings.slice(0, 5).map((b) => <li key={b.id} className="flex flex-wrap justify-between gap-2 py-2.5"><span>حجز معاينة جديد من <b>{b.name}</b></span><span className="text-muted" dir="ltr">{new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Cairo", dateStyle: "medium", timeStyle: "short" }).format(new Date(b.createdAt))}</span></li>)}
          </ul>
        )}
      </section>
    </main>
  );
}
