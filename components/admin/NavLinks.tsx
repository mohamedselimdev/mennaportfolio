"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Layers, CalendarDays, PenSquare, Settings } from "lucide-react";

const items = [[Home, "الرئيسية", "/admin"], [PenSquare, "تعديل بيانات الموقع", "/admin/content"], [Settings, "إعدادات واتساب", "/admin/settings"], [Building2, "العقارات والأسعار", "/admin/properties"], [Layers, "كروت المشاريع", "/admin/projects"], [CalendarDays, "الحجوزات", "/admin/bookings"]] as const;

export function NavLinks() {
  const path = usePathname();
  return (
    <nav aria-label="لوحة التحكم" className="grid grid-cols-2 gap-1 px-3 pb-3 lg:flex lg:flex-col">
      {items.map(([I, l, h]) => {
        const active = h === "/admin" ? path === h : path.startsWith(h);
        return (
          <Link key={h} href={h} aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-xl px-3 py-3 text-xs transition-colors lg:text-sm ${active ? "border border-gold-500/50 bg-white/10 font-bold text-white" : "text-white/80 hover:bg-white/10"}`}>
            <I size={18} aria-hidden />{l}
          </Link>
        );
      })}
      <details className="col-span-2 px-4 py-3 text-sm text-white/60"><summary className="cursor-pointer">أدوات قادمة</summary><p className="mt-3 text-xs leading-6">العملاء المحتملون والمدونة والتحليلات غير متاحة حاليًا.</p></details>
    </nav>
  );
}
