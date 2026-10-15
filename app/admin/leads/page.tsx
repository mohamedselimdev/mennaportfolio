import { Stub } from "@/components/admin/Stub";

export const metadata = { title: "العملاء المحتملون" };
export default function Page() {
  return <Stub title="العملاء المحتملون" desc="إدارة العملاء ومراحل المتابعة" items={["مراحل: جديد، تم التواصل، مؤهل، معاينة، تفاوض، تم، خسارة", "المصدر وحملات UTM", "ملاحظات ومتابعات", "سجل التعديلات"]} />;
}
