import { Stub } from "@/components/admin/Stub";

export const metadata = { title: "التحليلات" };
export default function Page() {
  return <Stub title="التحليلات" desc="الزيارات والتحويلات ومصادر العملاء" items={["أحداث الزيارات والبحث", "نقرات واتساب", "مصادر UTM", "تكلفة الإعلانات (غير متصل)"]} />;
}
