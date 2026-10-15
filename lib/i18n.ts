import { cookies } from "next/headers";
import { getSiteContent } from "./site-content";

export type Lang = "ar" | "en";
export type Theme = "light" | "dark";

export async function getLang(): Promise<Lang> {
  return (await cookies()).get("lang")?.value === "en" ? "en" : "ar";
}
export async function getTheme(): Promise<Theme> {
  return (await cookies()).get("theme")?.value === "dark" ? "dark" : "light";
}

const ar = {
  brand: "منة مصطفى",
  role: "مستشارة عقارية",
  nav: [["/", "الرئيسية"], ["/about", "من أنا"], ["/#projects", "المشاريع"], ["/properties", "الوحدات المتاحة"], ["/#testimonials", "آراء العملاء"], ["/contact", "تواصل معي"]] as [string, string][],
  wa: "تواصل عبر واتساب",
  waShort: "واتساب",
  call: "اتصال مباشر",
  msg: "أرسل رسالة",
  book: "احجز معاينة",
  browse: "تصفح الوحدات",
  hero1: "بيتك القادم",
  hero2: "يبدأ من هنا",
  heroSub: "مستشارة عقارية تساعدك في اختيار أفضل وحدة سكنية أو استثمارية بمعلومات دقيقة ومتابعة حقيقية.",
  heroNote: "صور توضيحية مؤقتة",
  tabAll: "جميع الوحدات", tabSale: "بيع", tabRent: "إيجار",
  fDistrict: "المنطقة / المدينة", fAllDistricts: "كل المناطق", fType: "نوع الوحدة", fAllTypes: "كل الأنواع",
  fBudget: "الميزانية", fAllBudgets: "كل الميزانيات", fUpTo: "حتى", million: "مليون", search: "ابحث عن وحدتك",
  trust: [["مصداقية وشفافية", "معلومات دقيقة وواضحة"], ["دعم مستمر", "قبل وبعد الاتفاق"], ["استشارات مجانية", "لاختيار الأنسب لك"], ["معلومات موثّقة", "تُعرض بعد التحقق منها"]] as [string, string][],
  heroBadges: [["متابعة شخصية", "لكل عميل"], ["معلومات موثّقة", "بعد التحقق فقط"], ["استشارة مجانية", "بدون التزام"]] as [string, string][],
  searchShort: "بحث", discover: "اكتشفي المزيد عن رحلتي في مجال العقارات", callNow: "تواصل معي الآن",
  testPh: "هنا يظهر رأي عميل حقيقي بعد الحصول على موافقته. هذا مكان تصميمي فقط.", testPhName: "اسم العميل",
  aboutT: "من أنا؟",
  aboutP: "أنا منة مصطفى، مستشارة عقارية أساعد العملاء على إيجاد وحدتهم المثالية للسكن أو الاستثمار. (نص تعريفي مؤقت، يُعدَّل من لوحة المحتوى.)",
  aboutPts: ["فهم احتياجاتك أولاً", "متابعة شخصية لكل عميل", "معلومات دقيقة وواضحة"],
  aboutMore: "تعرّف أكثر عليّ",
  projT: "المشاريع الرئيسية", projSub: "مشاريع تجريبية للعرض. تُستبدل بالمشاريع الحقيقية من لوحة التحكم.",
  unitsT: "الوحدات المتاحة", unitsSub: "مجموعة مختارة من الوحدات المتاحة حالياً", all: "الكل", viewAll: "عرض كل الوحدات",
  stepsT: "كيف نبدأ؟", stepsSub: "خطوات بسيطة لامتلاك وحدتك",
  steps: [["حدّد احتياجك", "أخبرني بما تبحث عنه"], ["عرض الخيارات", "أقدّم لك وحدات مناسبة"], ["حجز معاينة", "نحدد موعدًا يناسبك"], ["إتمام التعاقد", "ومتابعة حتى الاستلام"]] as [string, string][],
  testT: "آراء العملاء", testNone: "ستظهر هنا آراء العملاء الحقيقية بعد الحصول على موافقتهم. لا توجد آراء منشورة حاليًا.",
  ctaT: "مستعدة أساعدك تلاقي وحدتك المثالية؟", ctaSub: "تواصل معي الآن عبر واتساب أو من خلال النموذج وسأرد عليك في أقرب وقت.",
  contactT: "تواصل معي مباشرة", contactSub: "للاستفسار أو لحجز معاينة أو استشارة مجانية",
  footDesc: "استشارات عقارية موثوقة لاختيار وحدتك المناسبة.", links: "روابط", legal: "قانوني", privacy: "سياسة الخصوصية",
  rights: "© منة مصطفى.", demo: " الصور والوحدات المعروضة حالياً تجريبية للعرض فقط.",
  rooms: "غرف", baths: "حمام", sqm: "م²", details: "تفاصيل الوحدة", demoImg: "صورة تجريبية",
  status: { available: "متاح", ready: "جاهز للاستلام", soon: "قريباً" },
  priceOnRequest: "السعر عند الطلب", egp: "ج.م",
  themeDark: "الوضع الداكن", themeLight: "الوضع الفاتح", langBtn: "English",
};

export type Dict = typeof ar;

const en: Dict = {
  brand: "Menna Mostafa",
  role: "Real Estate Consultant",
  nav: [["/", "Home"], ["/about", "About"], ["/#projects", "Projects"], ["/properties", "Available Units"], ["/#testimonials", "Testimonials"], ["/contact", "Contact"]],
  wa: "Chat on WhatsApp",
  waShort: "WhatsApp",
  call: "Call now",
  msg: "Send a message",
  book: "Book a viewing",
  browse: "Browse units",
  hero1: "Your next home",
  hero2: "starts here",
  heroSub: "A real estate consultant helping you choose the best residential or investment unit, with accurate information and real follow-up.",
  heroNote: "Temporary illustrative images",
  tabAll: "All units", tabSale: "Buy", tabRent: "Rent",
  fDistrict: "Area / City", fAllDistricts: "All areas", fType: "Unit type", fAllTypes: "All types",
  fBudget: "Budget", fAllBudgets: "Any budget", fUpTo: "Up to", million: "million", search: "Find your unit",
  trust: [["Honest and transparent", "Clear, accurate details"], ["Ongoing support", "Before and after the deal"], ["Free consultation", "To pick what suits you best"], ["Verified information", "Shown once it is checked"]],
  heroBadges: [["Personal follow-up", "For every client"], ["Verified information", "Only after checking"], ["Free consultation", "No commitment"]],
  searchShort: "Search", discover: "Discover more about my journey in real estate", callNow: "Contact me now",
  testPh: "A real client's feedback appears here once they give consent. This is a design placeholder only.", testPhName: "Client name",
  aboutT: "About me",
  aboutP: "I am Menna Mostafa, a real estate consultant helping clients find their ideal home or investment. (Temporary intro text, editable from the content panel.)",
  aboutPts: ["Understanding your needs first", "Personal follow-up for every client", "Accurate and clear information"],
  aboutMore: "Learn more about me",
  projT: "Featured projects", projSub: "Demo projects for preview. Replaced by real projects from the dashboard.",
  unitsT: "Available units", unitsSub: "A selection of currently available units", all: "All", viewAll: "View all units",
  stepsT: "How it works", stepsSub: "Simple steps to own your unit",
  steps: [["Tell me your needs", "What are you looking for"], ["See the options", "Suitable units for you"], ["Book a viewing", "At a time that suits you"], ["Close the deal", "With follow-up until handover"]],
  testT: "Client testimonials", testNone: "Real client testimonials will appear here once clients give their consent. None are published yet.",
  ctaT: "Ready to help you find your ideal unit?", ctaSub: "Message me on WhatsApp or use the form and I will reply as soon as possible.",
  contactT: "Contact me directly", contactSub: "For questions, viewings or a free consultation",
  footDesc: "Trusted real estate guidance to help you choose the right unit.", links: "Links", legal: "Legal", privacy: "Privacy policy",
  rights: "© Menna Mostafa.", demo: " Images and units shown are demo content for preview only.",
  rooms: "beds", baths: "baths", sqm: "m²", details: "Unit details", demoImg: "Demo image",
  status: { available: "Available", ready: "Ready to move", soon: "Coming soon" },
  priceOnRequest: "Price on request", egp: "EGP",
  themeDark: "Dark mode", themeLight: "Light mode", langBtn: "العربية",
};

export const dicts = { ar, en };
export async function getDict() {
  const lang = await getLang();
  const content = await getSiteContent();
  const overrides = Object.fromEntries(Object.entries(content[lang]).filter(([, value]) => value !== undefined));
  const t: Dict = { ...dicts[lang], ...overrides, aboutPts: lang === "ar" ? content.aboutPtsAr : content.aboutPtsEn };
  return { lang, t, dir: lang === "ar" ? "rtl" : "ltr" } as const;
}
export const fmtPriceL = (p: number | null, lang: Lang) =>
  p == null ? dicts[lang].priceOnRequest : new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(p) + " " + dicts[lang].egp;
export const fmtNumL = (n: number, lang: Lang) => new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(n);
