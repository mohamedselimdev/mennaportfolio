import { Stub } from "@/components/admin/Stub";

export const metadata = { title: "المدونة" };
export default function Page() {
  return <Stub title="المدونة" desc="المقالات والنشر" items={["مقالات وتصنيفات", "بيانات SEO", "مسودة / منشور", "جدولة النشر"]} />;
}
