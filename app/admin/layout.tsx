import type { Metadata } from "next";
import Link from "next/link";
import { Home, Users, Building2, Layers, CalendarDays, PenSquare, FileText, BarChart3, Settings } from "lucide-react";

export const metadata: Metadata = { title: "لوحة التحكم", robots: { index: false, follow: false } };
const items = [[Home, "الرئيسية", "/admin"], [Users, "العملاء المحتملون", "/admin/leads"], [Building2, "الوحدات", "/admin/properties"], [Layers, "المشاريع", "/admin/projects"], [CalendarDays, "الحجوزات", "/admin/bookings"], [PenSquare, "المحتوى", "/admin/content"], [FileText, "المدونة", "/admin/blog"], [BarChart3, "التحليلات", "/admin/analytics"], [Settings, "الإعدادات", "/admin/settings"]] as const;

// Access is gated by middleware.ts (Basic Auth via ADMIN_USER / ADMIN_PASSWORD). Replace with Auth.js + RBAC later.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream lg:flex lg:flex-row-reverse">
      <aside className="bg-forest-900 text-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0">
        <div className="p-5 text-center"><p className="text-3xl text-gold-500" style={{ fontFamily: "Georgia, serif" }}>MM</p><p className="text-sm">Menna Mostafa</p></div>
        <nav aria-label="لوحة التحكم" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible">
          {items.map(([I, l, h]) => <Link key={h} href={h} className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm hover:bg-white/10"><I size={18} aria-hidden />{l}</Link>)}
        </nav>
      </aside>
      <div className="min-w-0 flex-1 p-4 lg:p-8">{children}</div>
    </div>
  );
}
