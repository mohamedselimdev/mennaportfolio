import Link from "next/link";
import { Clock } from "lucide-react";

export function Stub({ title, desc, items }: { title: string; desc: string; items: string[] }) {
  return (
    <main className="space-y-6">
      <div><h1 className="text-3xl font-extrabold text-forest-900">{title}</h1><p className="mt-1 text-muted">{desc}</p></div>
      <section className="card p-8 text-center">
        <Clock className="mx-auto text-gold-600" size={34} aria-hidden />
        <p className="mt-3 font-bold">قيد التنفيذ في المرحلة التالية</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">هذا القسم غير متاح بعد. يمكنك حاليًا تعديل بيانات الموقع والصور والعقارات وإدارة الحجوزات من القائمة الرئيسية.</p>
        <Link href="/admin/content" className="btn btn-primary mt-4">تعديل بيانات الموقع</Link>
        <ul className="mx-auto mt-5 grid max-w-lg gap-2 text-start text-sm sm:grid-cols-2">
          {items.map((x) => <li key={x} className="rounded-lg border border-line px-3 py-2">{x}</li>)}
        </ul>
      </section>
    </main>
  );
}
