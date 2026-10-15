import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { waLink, generalMsg, getWhatsappNumber } from "@/lib/whatsapp";
import { getDict, getTheme } from "@/lib/i18n";
import { Toggles } from "@/components/Toggles";
import { Logo } from "@/components/Brand";

export async function WaButton({ message = generalMsg, label, className = "btn btn-primary" }: { message?: string; label?: string; className?: string }) {
  const { t } = await getDict();
  const href = waLink(await getWhatsappNumber(), message);
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={className} data-event="whatsapp_click">
      <MessageCircle size={18} aria-hidden /> {label ?? t.wa}
    </a>
  );
}

export async function Navbar() {
  const { t, lang } = await getDict();
  const theme = await getTheme();
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 lg:px-8 lg:py-4">
        <div className="flex items-center gap-3">
          <WaButton className="btn btn-wa hidden text-sm !py-2 rounded-xl sm:inline-flex" />
          <Toggles lang={lang} theme={theme} themeLabel={theme === "dark" ? t.themeLight : t.themeDark} langLabel={t.langBtn} />
        </div>
        <nav aria-label={lang === "ar" ? "القائمة الرئيسية" : "Main menu"} className="hidden lg:flex items-center gap-7 text-sm font-bold text-white/90">
          {t.nav.map(([h, l], i) => <Link key={h} href={h} className={`pb-1 hover:text-gold-500 transition-colors ${i === 0 ? "border-b-2 border-gold-500 text-white" : ""}`}>{l}</Link>)}
        </nav>
        <Logo />
      </div>
      <nav aria-label={lang === "ar" ? "قائمة الجوال" : "Mobile menu"} className="lg:hidden flex gap-5 overflow-x-auto px-4 pb-2 text-xs text-white/85 whitespace-nowrap">
        {t.nav.map(([h, l]) => <Link key={h} href={h} className="py-2">{l}</Link>)}
      </nav>
    </header>
  );
}

export function PageNav() {
  return <div className="bg-forest-900 relative h-24 lg:h-20"><Navbar /></div>;
}

export async function Footer() {
  const { t } = await getDict();
  return (
    <footer className="bg-forest-950 text-white/80">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-5 px-4 py-6 lg:flex-row">
        <Logo />
        <nav aria-label={t.links} className="flex min-w-0 flex-wrap justify-center gap-x-5 gap-y-3 text-sm">
          {t.nav.map(([h, l]) => <Link key={h} href={h} className="hover:text-gold-500">{l}</Link>)}
          <Link href="/privacy" className="hover:text-gold-500">{t.privacy}</Link>
        </nav>
      </div>
      <div className="border-t border-white/10 text-xs">
        <div dir="ltr" className="mx-auto grid max-w-[1280px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-4">
          <p dir="auto" title={t.rights} className="col-start-2 row-start-1 min-w-0 truncate text-center text-[10px] text-white/65 sm:text-xs">{t.rights}</p>
          <a dir="ltr" href="https://portfolio.mohamedselim.workers.dev/ar" target="_blank" rel="noopener noreferrer" aria-label="Developed by Mohamed Selim" className="col-start-1 row-start-1 inline-flex min-h-11 items-center justify-self-start gap-1 whitespace-nowrap text-[10px] text-white/80 hover:text-white sm:gap-2 sm:text-xs">
            <span aria-hidden>Developed by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/MS-logo.png" alt="" width={36} height={36} className="h-7 w-auto brightness-0 invert sm:h-9" />
          </a>
          <div className="col-start-3 row-start-1 justify-self-end">
            <WaButton label={t.waShort} className="btn btn-primary rounded-full !px-2 !py-2 text-[10px] sm:!px-4 sm:text-xs [&_svg]:size-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Phone, Logo };
