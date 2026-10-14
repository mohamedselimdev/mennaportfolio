import { PageNav, Footer } from "@/components/Chrome";
export const metadata = { title: "سياسة الخصوصية" };
export default function Page() {
  return (<><PageNav /><main className="mx-auto max-w-3xl space-y-3 px-4 py-10 leading-8"><h1 className="text-3xl font-extrabold">سياسة الخصوصية</h1>
    <p>نجمع الحد الأدنى من البيانات (الاسم، الهاتف، تفضيلات الموعد) لغرض التواصل بخصوص طلبك فقط، ولا نشاركها مع أطراف أخرى دون موافقتك. (مسودة، تُراجع قانونيًا قبل الإطلاق.)</p></main><Footer /></>);
}
