import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

/** Brand lockup: emblem + live wordmark (readable on dark surfaces). */
export async function Logo({ light = true, stacked = false, className = "" }: { light?: boolean; stacked?: boolean; className?: string }) {
  const content = await getSiteContent();
  const name = content.en.brand || "Menna Mostafa";
  return (
    <Link href="/" aria-label={name} className={`inline-flex items-center gap-3 ${stacked ? "flex-col text-center" : ""} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/mark.png" alt="" width={1019} height={557} className={stacked ? "h-16 w-auto" : "h-9 w-auto sm:h-11"} />
      <span className={`whitespace-nowrap leading-tight ${light ? "text-white" : "text-forest-900"}`}>
        <span className="font-display block text-base font-bold uppercase tracking-[0.06em] sm:text-lg">{name}</span>
        <span className={`${stacked ? "block" : "hidden sm:block"} text-[10px] font-medium uppercase tracking-[0.28em] text-gold-500`}>{content.en.role || "Real Estate Broker"}</span>
      </span>
    </Link>
  );
}
