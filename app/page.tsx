import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, WaButton } from "@/components/Chrome";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Carousel } from "@/components/Carousel";
import { getProperties } from "@/lib/properties";
import { getDict } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
import { ShieldCheck, HeartHandshake, Headphones, BadgeCheck, Star, UserRound, Phone, Mail, Quote, Home as HomeIcon, MessageCircleHeart, Users } from "lucide-react";

const trustIcons = [ShieldCheck, HeartHandshake, Headphones, BadgeCheck];
const heroIcons = [Users, HomeIcon, Star];
const aboutIcons = [MessageCircleHeart, UserRound, BadgeCheck];

export default async function Home() {
  const { t, lang } = await getDict();
  const props = await getProperties();
  const content = await getSiteContent();
  const types = [...new Set(props.map((p) => p.type))];
  const districts = [...new Set(props.map((p) => p.district))];
  return (
    <>
      <main>
        <section className="relative isolate overflow-hidden bg-forest-950 text-white">
          <Image src={content.media.hero} unoptimized alt="" fill priority sizes="100vw" className="-z-10 object-cover object-center" />
          <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(270deg, rgba(8,20,17,.05) 0%, rgba(8,20,17,.4) 50%, rgba(8,20,17,.7) 100%)" }} />
          <Navbar />
          <div className="mx-auto grid max-w-[1440px] gap-6 px-4 pt-28 lg:min-h-[640px] lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-28 xl:min-h-[720px]">
            <div className="flex flex-col justify-end lg:col-start-2 lg:row-start-1">
              <h1 className="reveal text-4xl font-extrabold leading-tight sm:text-5xl xl:text-7xl"><span className="block">{t.hero1}</span><span className="block text-gold-500">{t.hero2}</span></h1>
              <p className="reveal mt-4 max-w-xl text-lg text-white/85">{t.heroSub}</p>
            </div>
            <div className="relative mx-auto lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-end flex w-full max-w-[360px] items-end justify-center lg:max-w-[560px]">
              <span aria-hidden className="absolute inset-x-8 top-16 bottom-0 rounded-full bg-gold-500/15 blur-3xl" />
              <Image src={content.media.cutout} unoptimized alt={`${t.brand}, ${t.role}`} width={900} height={1085} priority sizes="(max-width:1024px) 360px, 560px" className="relative z-10 h-auto w-full [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]" />
              <ul className="absolute inset-x-3 -bottom-4 z-20 grid grid-cols-3 divide-x divide-white/15 rounded-2xl border border-white/20 bg-forest-950/80 py-3 backdrop-blur rtl:divide-x-reverse lg:inset-x-6">
                {t.heroBadges.map(([h, d], i) => { const I = heroIcons[i]; return (
                  <li key={h} className="px-1 text-center"><I className="mx-auto mb-1 text-white" size={20} strokeWidth={1.4} aria-hidden /><p className="text-xs font-extrabold sm:text-sm">{h}</p><p className="text-[10px] text-white/70 sm:text-[11px]">{d}</p></li>
                ); })}
              </ul>
            </div>
            <div className="pb-16 lg:col-start-2 lg:row-start-2 lg:pb-12">
              <SearchBar districts={districts} types={types} className="mt-6 lg:mt-8" />
              <span className="mt-3 text-[11px] text-white/55">{t.heroNote}</span>
            </div>
          </div>
        </section>

        <section className="section-cream py-12">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-4 lg:grid-cols-4">
            {t.trust.map(([h, d], i) => { const I = trustIcons[i]; return (
              <div key={h} className="text-center"><I className="mx-auto mb-3 text-gold-600" size={52} strokeWidth={1.1} aria-hidden /><p className="text-lg font-extrabold text-forest-900">{h}</p><p className="mt-1 text-sm text-muted">{d}</p></div>
            ); })}
          </div>
        </section>

        <section id="about" className="relative mx-auto grid max-w-[1280px] items-center gap-10 overflow-hidden px-4 py-16 lg:grid-cols-2">
          <span aria-hidden dir="ltr" className="font-script pointer-events-none absolute -bottom-6 start-1/3 select-none whitespace-nowrap text-[9rem] leading-none text-forest-900/[0.05] dark:text-white/[0.05] lg:text-[12rem]">Menna Mostafa</span>
          <div className="relative text-center lg:text-start">
            <h2 className="text-4xl font-extrabold text-forest-900">{t.aboutT}</h2>
            <p className="mx-auto mt-4 max-w-xl leading-8 text-muted lg:mx-0">{t.aboutP}</p>
            <div dir="ltr" className="mt-5 text-center lg:text-left" aria-hidden>
              <p className="font-script text-5xl leading-none text-gold-600 sm:text-6xl">Menna Mostafa</p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.35em] text-muted">Real Estate Consultant</p>
            </div>
            <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
              {t.aboutPts.map((x, i) => { const I = aboutIcons[i]; return (
                <li key={x} className="flex flex-col items-center gap-2 text-center text-sm font-bold text-forest-900"><I size={34} strokeWidth={1.2} className="text-gold-600" aria-hidden />{x}</li>
              ); })}
            </ul>
            <div className="mt-7"><WaButton label={t.callNow} className="btn btn-ink !rounded-xl px-8" /></div>
          </div>
          <Link href="/about" className="group relative mx-auto block aspect-[799/1100] w-full max-w-md overflow-hidden rounded-2xl bg-[#F4F1EC] shadow-xl">
            <Image src={content.media.about} unoptimized alt={`${t.brand}, ${t.role}`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-bold text-white">{t.discover}</span>
          </Link>
        </section>

        <section id="projects" className="mx-auto max-w-[1280px] px-4 py-14">
          <div className="text-center"><h2 className="text-3xl font-extrabold text-forest-900">{t.projT}</h2><p className="mt-1 text-muted">{t.projSub}</p></div>
          <div className="mt-8">
            <Carousel label={t.projT} prev={lang === "ar" ? "السابق" : "Previous"} next={lang === "ar" ? "التالي" : "Next"}>
              {content.projects.map((project, i) => (
                <li key={i} className="relative aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-2xl bg-forest-800 sm:w-[calc(50%-.625rem)] lg:w-[calc(25%-.9375rem)]">
                  <Image src={project.image} unoptimized alt={project[lang]} fill sizes="(max-width:1024px) 86vw, 25vw" className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/85 to-transparent p-3 text-white">
                    <span className="text-sm font-bold sm:text-base">{project[lang]}</span>
                  </div>
                </li>
              ))}
            </Carousel>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-14">
          <div className="text-center"><h2 className="text-3xl font-extrabold text-forest-900">{t.unitsT}</h2><p className="mt-1 text-muted">{t.unitsSub}</p></div>
          <nav aria-label={t.unitsT} className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <Link href="/properties" className="rounded-xl bg-[#121816] px-6 py-2 font-bold text-white">{t.all}</Link>
            {types.map((x) => <Link key={x} href={{ pathname: "/properties", query: { type: x } }} className="rounded-xl bg-[#E9E3D8] px-6 py-2 font-bold text-[#4a4a44] hover:bg-[#ddd5c6]">{x}</Link>)}
          </nav>
          <div className="mt-8">
            <Carousel label={t.unitsT} prev={lang === "ar" ? "السابق" : "Previous"} next={lang === "ar" ? "التالي" : "Next"}>
              {props.slice(0, 8).map((p) => <li key={p.slug} className="w-[86%] shrink-0 snap-start sm:w-[calc(50%-.625rem)] lg:w-[calc(33.333%-.8334rem)]"><PropertyCard p={p} /></li>)}
            </Carousel>
          </div>
          <div className="mt-4 text-center"><Link href="/properties" className="btn btn-sand !rounded-xl px-8">{t.viewAll}</Link></div>
        </section>

        <section id="testimonials" className="section-cream py-14">
          <div className="mx-auto max-w-[1280px] px-4">
            <div className="text-center"><h2 className="text-3xl font-extrabold text-forest-900">{t.testT}</h2><p className="mx-auto mt-1 max-w-md text-muted">{t.testNone}</p></div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <li key={i} className="card border-dashed p-5">
                  <div className="flex items-start justify-between"><Quote className="text-gold-500" size={30} aria-hidden /><span className="grid h-12 w-12 place-items-center rounded-full bg-cream text-muted"><UserRound size={22} aria-hidden /></span></div>
                  <p className="mt-3 text-sm leading-7 text-muted">{t.testPh}</p>
                  <p className="mt-3 font-bold text-muted">{t.testPhName}</p>
                  <div className="mt-1 flex gap-0.5 text-gold-500/50" aria-hidden>{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={16} />)}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-forest-950 py-16 text-center text-white">
          <Image src={content.media.cta} unoptimized alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{t.ctaT}</h2>
            <p className="mt-2 text-white/80">{t.ctaSub}</p>
            <div className="mx-auto mt-7 grid w-full max-w-xs grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-3">
              <WaButton className="btn btn-wa !rounded-xl px-7" />
              <Link href={content.phone ? `tel:${content.phone.replace(/[^+\d]/g, "")}` : "/contact"} className="btn btn-outline !rounded-xl px-7"><Phone size={18} aria-hidden /> {t.call}</Link>
              <Link href={content.email ? `mailto:${content.email}` : "/book-viewing"} className="btn btn-outline !rounded-xl px-7"><Mail size={18} aria-hidden /> {t.msg}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
