import type { Metadata } from "next";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css";
import "@fontsource/ibm-plex-sans-arabic/latin-400.css";
import "@fontsource/ibm-plex-sans-arabic/latin-500.css";
import "@fontsource/ibm-plex-sans-arabic/latin-700.css";
import "@fontsource/tajawal/arabic-500.css";
import "@fontsource/el-messiri/arabic-500.css";
import "@fontsource/el-messiri/arabic-700.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/pinyon-script/latin-400.css";
import "./globals.css";
import { getLang, getTheme, getDict } from "@/lib/i18n";

// WhatsApp number is editable from /admin/settings, so pages render per request.
export const dynamic = "force-dynamic";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export async function generateMetadata(): Promise<Metadata> {
  const { t, lang } = await getDict();
  return {
  metadataBase: new URL(site),
  applicationName: t.brand,
  title: { default: `${t.brand} | ${t.role}`, template: `%s | ${t.brand}` },
  openGraph: { siteName: t.brand, type: "website", locale: lang === "ar" ? "ar_EG" : "en_US", images: [{ url: "/brand/og.jpg", width: 1200, height: 630, alt: "Menna Mostafa | منة مصطفى" }] },
  description: t.heroSub,
  twitter: { card: "summary_large_image", images: ["/brand/og.jpg"] },
  alternates: { canonical: "/" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const theme = await getTheme();
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} data-theme={theme}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
