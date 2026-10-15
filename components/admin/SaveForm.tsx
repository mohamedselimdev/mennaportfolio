"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export type SaveResult = { error?: string; success?: string };
function SaveButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return <button disabled={disabled || pending} className="btn btn-primary disabled:opacity-50">{pending ? "جاري الحفظ…" : "حفظ التغييرات"}</button>;
}
export function SaveForm({ action, disabled = false, children }: { action: (state: SaveResult, form: FormData) => Promise<SaveResult>; disabled?: boolean; children: React.ReactNode }) {
  const [state, formAction] = useActionState(action, {});
  return <form action={formAction} className="space-y-5">
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-card p-4">
      <SaveButton disabled={disabled} />
      {state.error && <p role="alert" className="text-sm font-bold text-red-700">{state.error}</p>}
      {state.success && <p role="status" className="text-sm font-bold text-forest-700">{state.success}</p>}
    </div>
    {children}
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-card p-4">
      <SaveButton disabled={disabled} />
    </div>
  </form>;
}
