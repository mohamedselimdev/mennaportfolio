import { Suspense } from "react";
import type { Metadata } from "next";
import { PageNav, Footer, WaFab } from "@/components/Chrome";
import { BookingForm } from "./BookingForm";
export const metadata: Metadata = { title: "احجز معاينة", alternates: { canonical: "/book-viewing" } };
export default function Page() {
  return (<><PageNav /><main className="mx-auto max-w-3xl px-4 py-10"><h1 className="mb-6 text-3xl font-extrabold text-forest-900">احجز معاينة أو استشارة</h1><Suspense><BookingForm /></Suspense></main><Footer /><WaFab /></>);
}
