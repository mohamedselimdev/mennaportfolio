import Image from "next/image";
import Link from "next/link";
import { Navbar, Footer, WaFab, WaButton } from "@/components/Chrome";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";
import { Compass, ShieldCheck, Headphones, KeyRound, FileText, Search, CalendarCheck, Phone } from "lucide-react";

const strip = [
  [Compass, "إرشاد مخصص", "اختيار يناسب احتياجك وميزانيتك"],
  [ShieldCheck, "معلومات موثّقة", "تُعرض فقط بعد التحقق منها"],
  [Headphones, "استشارة مجانية", "نقاش أولي بدون التزام"],
  [KeyRound, "متابعة بعد التعاقد", "معك في كل خطوة"],
] as const;
const steps = [
  [FileText, "حدّد احتياجك", "أخبرني بما تبحث عنه"],
  [Search, "عرض الخيارات", "أقدّم لك وحدات مناسبة"],
  [CalendarCheck, "حجز معاينة", "نحدد موعدًا يناسبك"],
  [KeyRound, "إتمام التعاقد", "ومتابعة حتى الاستلام"],
] as const;

export default async function Home() {
  return (
    <>
      <main>
        <section className="relative isolate min-h-[640px] bg-forest-950 text-white">
          <div className="absolute inset-0 overflow-hidden -z-10"><Image src="/img/website_hero_architecture_detail.webp" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-60 blur-[2px] scale-110" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,24,21,.2), rgba(7,24,21,.85))" }} /></div>
          <Navbar />
          <div className="relative mx-auto flex max-w-[1280px] flex-col justify-center px-4 pt-36 pb-44 lg:pt-44">
            <h1 className="reveal max-w-xl text-4xl font-extrabold leading-tight sm:text-6xl">بيتك القادم <br />أقرب مما تتخيل</h1>
            <p className="reveal mt-5 max-w-lg text-white/85">مستشارة عقارية موثوقة لمساعدتك في اختيار أفضل وحدة سكنية أو استثمارية في أفضل المواقع.</p>
            <span className="mt-4 text-[11px] text-white/50">صورة الخلفية توضيحية مؤقتة</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-4 z-10"><SearchBar /></div>
        </section>

        <section className="bg-forest-900 pt-24 pb-8 text-white">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-4 lg:grid-cols-4">
            {strip.map(([I, t, d]) => (
              <div key={t} className="text-center"><I className="mx-auto mb-2 text-gold-500" aria-hidden /><p className="font-bold">{t}</p><p className="text-xs text-white/60">{d}</p></div>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-[1280px] px-4 py-16">
          <div className="card grid overflow-hidden md:grid-cols-[1fr_1.4fr]">
            <div className="relative min-h-[360px] bg-white">
              <Image src="/img/menna-portrait.jpg" alt="منة مصطفى، مستشارة عقارية" fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover object-top" />
            </div>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-forest-900">من أنا؟</h2>
              <p className="mt-4 leading-8 text-muted">أنا منة مصطفى، مستشارة عقارية أساعد العملاء على إيجاد وحدتهم المثالية للسكن أو الاستثمار، بتقديم معلومات دقيقة ومتابعة حقيقية في كل خطوة. <span className="text-xs">(نص تعريفي مؤقت، يُعدَّل من لوحة المحتوى)</span></p>
              <Link href="/about" className="btn btn-primary mt-6">تعرّف أكثر عليّ</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 pb-16">
          <div className="text-center"><h2 className="text-3xl font-extrabold text-forest-900">الوحدات المتاحة</h2><p className="mt-1 text-muted">اكتشف أحدث الوحدات</p></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{(await getProperties()).slice(0, 8).map((p) => <PropertyCard key={p.slug} p={p} />)}</div>
          <div className="mt-8 text-center"><Link href="/properties" className="btn btn-primary">عرض كل الوحدات</Link></div>
        </section>

        <section id="projects" className="mx-auto grid max-w-[1280px] gap-5 px-4 pb-16 md:grid-cols-[2fr_1fr]">
          <div className="card bg-forest-900 p-8 text-white !border-0"><h2 className="text-2xl font-extrabold">مشاريع مميزة</h2><p className="mt-2 text-white/70">سيتم عرض المطورين والمشاريع الحقيقية هنا بعد إضافتها وتأكيد الشراكات من لوحة التحكم.</p></div>
          <div className="card flex flex-col items-start justify-center gap-3 bg-forest-800 p-8 text-white !border-0"><h2 className="text-xl font-extrabold">احجز وحدتك الآن بخطوات بسيطة</h2><WaButton className="btn btn-outline" label="تواصل عبر واتساب" /></div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-8 px-4 pb-16 lg:grid-cols-[2fr_1fr]">
          <div><h2 className="text-3xl font-extrabold text-forest-900">كيف نبدأ؟</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {steps.map(([I, t, d], i) => (
                <div key={t} className="card p-4 text-center"><I className="mx-auto mb-2 text-forest-700" aria-hidden /><p className="font-bold text-sm">{i + 1}. {t}</p><p className="text-xs text-muted">{d}</p></div>
              ))}</div></div>
          <div className="card p-6"><h2 className="text-xl font-extrabold text-forest-900">تواصل معي مباشرة</h2><p className="mt-1 text-sm text-muted">للاستفسار أو لحجز معاينة أو استشارة مجانية</p>
            <div className="mt-4 grid gap-3"><WaButton /><Link href="/book-viewing" className="btn btn-gold"><Phone size={16} aria-hidden /> احجز معاينة</Link></div></div>
        </section>

        <section id="testimonials" className="bg-forest-900 py-14 text-center text-white">
          <h2 className="text-3xl font-extrabold">آراء العملاء</h2>
          <p className="mx-auto mt-3 max-w-md px-4 text-white/70">ستظهر هنا آراء العملاء الحقيقية بعد الحصول على موافقتهم. لا توجد آراء منشورة حاليًا.</p>
        </section>
      </main>
      <Footer /><WaFab />
    </>
  );
}
