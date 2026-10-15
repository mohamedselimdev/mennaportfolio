"use client";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=lax`;
}

export function Toggles({ lang, theme, themeLabel, langLabel }: { lang: "ar" | "en"; theme: "light" | "dark"; themeLabel: string; langLabel: string }) {
  const router = useRouter();
  const btn = "grid h-9 min-w-9 place-items-center rounded-full border border-white/25 px-2 text-xs text-white/90 hover:bg-white/10";
  return (
    <div className="flex items-center gap-2">
      <button type="button" className={btn} aria-label={themeLabel} title={themeLabel} onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setCookie("theme", next);
        document.documentElement.dataset.theme = next;
        router.refresh();
      }}>{theme === "dark" ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}</button>
      <button type="button" className={btn} aria-label={langLabel} onClick={() => {
        const next = lang === "ar" ? "en" : "ar";
        setCookie("lang", next);
        document.documentElement.lang = next;
        document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
        router.refresh();
      }}>{langLabel}</button>
    </div>
  );
}
