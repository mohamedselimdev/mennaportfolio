import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/properties";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/properties", "/about", "/book-viewing", "/contact", "/privacy"].map((p) => ({ url: site + p }));
  const props = (await getProperties()).filter((p) => !p.demo).map((p) => ({ url: `${site}/properties/${p.slug}` }));
  return [...pages, ...props];
}
