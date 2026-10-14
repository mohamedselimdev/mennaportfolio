// DEMO DATA ONLY: not real listings. Replace via the CMS once connected to a database.
export type Property = {
  slug: string; code: string; name: string; project: string; district: string; type: string;
  area: number; beds: number; baths: number; price: number | null; status: "available" | "ready" | "soon";
  image: string; tags: string[]; installments: boolean; demo?: boolean;
};
export const statusLabel = { available: "متاح", ready: "جاهز للاستلام", soon: "قريباً" } as const;

export const demoProperties: Property[] = [
  { slug: "demo-compound-5th-settlement", code: "DEMO-001", name: "وحدة تجريبية - التجمع الخامس", project: "مشروع تجريبي أ", district: "التجمع الخامس", type: "شقة", area: 160, beds: 3, baths: 2, price: 8500000, status: "available", image: "/img/website_listing_01_exterior.webp", tags: ["تقسيط"], installments: true, demo: true },
  { slug: "demo-compound-new-cairo", code: "DEMO-002", name: "وحدة تجريبية - القاهرة الجديدة", project: "مشروع تجريبي ب", district: "القاهرة الجديدة", type: "شقة", area: 200, beds: 3, baths: 3, price: 11200000, status: "ready", image: "/img/website_listing_02_exterior.webp", tags: ["جاهز للاستلام"], installments: false, demo: true },
  { slug: "demo-villa-new-cairo", code: "DEMO-003", name: "فيلا تجريبية - القاهرة الجديدة", project: "مشروع تجريبي ج", district: "القاهرة الجديدة", type: "فيلا", area: 350, beds: 4, baths: 4, price: null, status: "available", image: "/img/website_listing_03_villa.webp", tags: ["فيلا"], installments: true, demo: true },
  { slug: "demo-complex-6-october", code: "DEMO-004", name: "وحدة تجريبية - ٦ أكتوبر", project: "مشروع تجريبي د", district: "٦ أكتوبر", type: "شقة", area: 135, beds: 2, baths: 2, price: 7800000, status: "soon", image: "/img/website_listing_04_complex_pool.webp", tags: ["تقسيط"], installments: true, demo: true },
];
export const fmtPrice = (p: number | null) => (p == null ? "السعر عند الطلب" : new Intl.NumberFormat("ar-EG").format(p) + " ج.م");
export const fmtNum = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
