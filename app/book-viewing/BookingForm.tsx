"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function BookingForm() {
  const sp = useSearchParams();
  const [state, setState] = useState<{ type: "idle" | "ok" | "err" | "busy"; msg?: string }>({ type: "idle" });
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState({ type: "busy" });
    const res = await fetch("/api/bookings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), phone: f.get("phone"), property: f.get("property") || undefined, date: f.get("date"), time: f.get("time"), channel: f.get("channel"), notes: f.get("notes") || undefined, consent: f.get("consent") === "on" }),
    });
    const j = await res.json().catch(() => ({}));
    setState(res.ok ? { type: "ok" } : { type: "err", msg: j.error ?? "حدث خطأ" });
  }
  if (state.type === "ok") return <div role="status" className="card p-8 text-center"><p className="text-xl font-bold text-forest-700">تم استلام طلب الحجز</p><p className="mt-2 text-sm text-muted">سنتواصل معك لتأكيد الموعد. الطلب لا يُعدّ مؤكدًا قبل التأكيد.</p></div>;
  const L = "block text-sm font-bold text-forest-900";
  return (
    <form onSubmit={submit} className="card grid gap-4 p-6 sm:grid-cols-2">
      <label className={L}>الاسم<input required name="name" className="field mt-1" autoComplete="name" /></label>
      <label className={L}>رقم الهاتف<input required name="phone" type="tel" dir="ltr" className="field mt-1" autoComplete="tel" /></label>
      <label className={L}>كود الوحدة (اختياري)<input name="property" defaultValue={sp.get("property") ?? ""} className="field mt-1" /></label>
      <label className={L}>وسيلة التواصل<select name="channel" className="field mt-1"><option value="whatsapp">واتساب</option><option value="call">اتصال</option></select></label>
      <label className={L}>التاريخ<input required name="date" type="date" className="field mt-1" /></label>
      <label className={L}>الوقت<input required name="time" type="time" step={1800} className="field mt-1" /></label>
      <label className={`${L} sm:col-span-2`}>ملاحظات<textarea name="notes" rows={3} className="field mt-1" /></label>
      <label className="flex items-start gap-2 text-sm sm:col-span-2"><input required type="checkbox" name="consent" className="mt-1 h-4 w-4" /> أوافق على استخدام بياناتي للتواصل معي بخصوص هذا الطلب (<a className="underline" href="/privacy">سياسة الخصوصية</a>).</label>
      {state.type === "err" && <p role="alert" className="text-sm text-[var(--danger)] sm:col-span-2">{state.msg}</p>}
      <button disabled={state.type === "busy"} className="btn btn-primary sm:col-span-2">{state.type === "busy" ? "جارٍ الإرسال..." : "تأكيد طلب الحجز"}</button>
    </form>
  );
}
