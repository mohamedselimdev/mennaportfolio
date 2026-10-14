import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { waLink, generalMsg } from "@/lib/whatsapp";

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="منة مصطفى - الرئيسية">
      <span className="font-serif text-3xl leading-none tracking-tight text-gold-500" style={{ fontFamily: "Georgia, serif" }}>MM</span>
      <span className={`hidden sm:block leading-tight ${light ? "text-white" : "text-forest-900"}`}>
        <span className="block text-sm font-bold">Menna Mostafa</span>
        <span className="block text-[11px] text-gold-500">Real Estate Consultant</span>
      </span>
    </Link>
  );
}

export function WaButton({ message = generalMsg, label = "تواصل عبر واتساب", className = "btn btn-primary" }: { message?: string; label?: string; className?: string }) {
  const href = waLink(message);
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={className} data-event="whatsapp_click">
      <MessageCircle size={18} aria-hidden /> {label}
    </a>
  );
}

const nav = [["/", "الرئيسية"], ["/properties", "الوحدات المتاحة"], ["/#projects", "المشاريع"], ["/about", "من أنا"], ["/#testimonials", "آراء العملاء"], ["/contact", "تواصل معي"]];

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-4">
        <Logo />
        <nav aria-label="القائمة الرئيسية" className="hidden lg:flex items-center gap-7 text-sm text-white/90">
          {nav.map(([h, l]) => <Link key={h} href={h} className="hover:text-gold-500 transition-colors">{l}</Link>)}
        </nav>
        <WaButton label="تواصل عبر واتساب" className="btn btn-outline text-sm !py-2 rounded-full" />
      </div>
      <nav aria-label="قائمة الجوال" className="lg:hidden flex gap-5 overflow-x-auto px-4 pb-2 text-xs text-white/85 whitespace-nowrap">
        {nav.map(([h, l]) => <Link key={h} href={h} className="py-2">{l}</Link>)}
      </nav>
    </header>
  );
}

export function PageNav() {
  return <div className="bg-forest-900 relative h-24 lg:h-20"><Navbar /></div>;
}

export function Footer() {
  return (
    <footer className="bg-forest-950 text-white/80">
      <div className="mx-auto max-w-[1280px] px-4 py-10 grid gap-8 md:grid-cols-3">
        <div><Logo /><p className="mt-3 text-sm">استشارات عقارية موثوقة لاختيار وحدتك المناسبة.</p></div>
        <div className="text-sm space-y-2"><p className="font-bold text-white">روابط</p>
          <Link className="block hover:text-gold-500" href="/properties">الوحدات المتاحة</Link>
          <Link className="block hover:text-gold-500" href="/book-viewing">احجز معاينة</Link>
          <Link className="block hover:text-gold-500" href="/contact">تواصل معي</Link></div>
        <div className="text-sm space-y-2"><p className="font-bold text-white">قانوني</p>
          <Link className="block hover:text-gold-500" href="/privacy">سياسة الخصوصية</Link></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© منة مصطفى. الصور والوحدات المعروضة حالياً تجريبية للعرض فقط.</p>
    </footer>
  );
}

export function WaFab() {
  return (
    <div className="fixed bottom-4 start-4 z-40">
      <WaButton label="واتساب" className="btn btn-primary shadow-lg rounded-full" />
    </div>
  );
}
export { Phone };
