import type { Metadata } from "next";
import "@fontsource-variable/cairo/index.css";
import "@fontsource/tajawal/arabic-500.css";
import "./globals.css";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "منة مصطفى | مستشارة عقارية", template: "%s | منة مصطفى" },
  description: "مستشارة عقارية تساعدك في اختيار أفضل وحدة سكنية أو استثمارية.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
