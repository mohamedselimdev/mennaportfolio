import { redirect } from "next/navigation";

export const metadata = { title: "المشاريع" };
export default function Page() {
  redirect("/admin/content#projects");
}
