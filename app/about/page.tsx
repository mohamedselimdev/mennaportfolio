import type { Metadata } from "next";
import Image from "next/image";
import { PageNav, Footer, WaFab, WaButton } from "@/components/Chrome";
export const metadata: Metadata = { title: "من أنا", alternates: { canonical: "/about" } };
export default function Page() {
  return (<><PageNav /><main className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1fr_1.4fr]">
    <div className="relative aspect-square overflow-hidden rounded-2xl"><Image src="/img/menna-portrait.jpg" alt="منة مصطفى" fill sizes="40vw" className="object-cover object-top" /></div>
    <div><h1 className="text-3xl font-extrabold text-forest-900">منة مصطفى</h1>
      <p className="mt-4 leading-8 text-muted">مستشارة عقارية. السيرة المهنية والإنجازات تُضاف من لوحة المحتوى بعد التحقق منها، ولا تُعرض أي أرقام (سنوات خبرة، عملاء، صفقات) قبل تأكيدها.</p>
      <div className="mt-6"><WaButton /></div></div></main><Footer /><WaFab /></>);
}
