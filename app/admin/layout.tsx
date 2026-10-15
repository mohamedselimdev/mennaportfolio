import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/Brand";
import { NavLinks } from "@/components/admin/NavLinks";

export const metadata: Metadata = { title: "لوحة التحكم", robots: { index: false, follow: false } };

// Access is gated by middleware.ts (Basic Auth via ADMIN_USER / ADMIN_PASSWORD). Replace with Auth.js + RBAC later.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-cream lg:flex">
      <aside className="relative isolate overflow-hidden bg-forest-950 text-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:order-last">
        <Image src="/img/dashboard_sidebar_background_villa.webp" alt="" fill sizes="256px" className="-z-10 object-cover opacity-30" />
        <div className="p-6 text-center">
          <Logo stacked />
        </div>
        <NavLinks />
      </aside>
      <div className="min-w-0 flex-1 p-4 lg:p-8">{children}</div>
    </div>
  );
}
