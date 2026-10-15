"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Carousel({ children, label, prev, next }: { children: React.ReactNode; label: string; prev: string; next: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ x: 0, scroll: 0, active: false, moved: false });
  const [position, setPosition] = useState({ progress: 0, overflow: false });
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setPosition({ progress: max > 1 ? Math.min(1, Math.abs(el.scrollLeft) / max) : 0, overflow: max > 1 });
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      const current = Math.abs(el.scrollLeft);
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? el.clientWidth : 1);
      if (max <= 1 || (delta < 0 && current <= 1) || (delta > 0 && current >= max - 1)) return;
      event.preventDefault();
      el.scrollLeft += delta * (getComputedStyle(el).direction === "rtl" ? -1 : 1);
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    for (const child of el.children) observer.observe(child);
    el.addEventListener("scroll", update, { passive: true });
    el.addEventListener("wheel", wheel, { passive: false });
    update();
    return () => { observer.disconnect(); el.removeEventListener("scroll", update); el.removeEventListener("wheel", wheel); };
  }, [children]);
  const go = (towardsEnd: boolean) => {
    const el = ref.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const sign = (towardsEnd ? 1 : -1) * (rtl ? -1 : 1);
    el.scrollBy({ left: sign * el.clientWidth * 0.8, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const btn = "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-card text-forest-900 transition-colors hover:border-gold-500 hover:bg-cream disabled:cursor-default disabled:opacity-30";
  return (
    <div className="relative">
      <ul ref={ref} aria-label={label} tabIndex={0}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, active: true, moved: false };
        }}
        onPointerMove={(event) => {
          if (!drag.current.active) return;
          const delta = event.clientX - drag.current.x;
          if (!drag.current.moved && Math.abs(delta) < 8) return;
          drag.current.moved = true;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.scrollLeft = drag.current.scroll - delta;
        }}
        onPointerUp={() => { drag.current.active = false; setDragging(false); }}
        onPointerCancel={() => { drag.current.active = false; setDragging(false); }}
        onPointerLeave={(event) => { if (!event.currentTarget.hasPointerCapture(event.pointerId)) drag.current.active = false; }}
        onLostPointerCapture={() => { drag.current.active = false; setDragging(false); }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; } }}
        className={`flex gap-5 overflow-x-auto overscroll-x-contain px-1 pb-4 outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold-500 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-proximity"}`}>{children}</ul>
      {position.overflow && <div className="mx-auto mt-2 flex max-w-sm items-center gap-5">
        <button type="button" aria-label={prev} disabled={position.progress <= 0.01} onClick={() => go(false)} className={btn}><ChevronRight size={18} aria-hidden className="ltr:hidden" /><ChevronLeft size={18} aria-hidden className="rtl:hidden" /></button>
        <div aria-hidden className="h-1 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full min-w-3 rounded-full bg-gold-600" style={{ width: `${Math.max(4, position.progress * 100)}%` }} /></div>
        <button type="button" aria-label={next} disabled={position.progress >= 0.99} onClick={() => go(true)} className={btn}><ChevronLeft size={18} aria-hidden className="ltr:hidden" /><ChevronRight size={18} aria-hidden className="rtl:hidden" /></button>
      </div>}
    </div>
  );
}
