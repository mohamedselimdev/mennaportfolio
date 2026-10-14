import { revalidatePath } from "next/cache";
import { bookingsEnabled, listBookings, setBookingStatus, type Booking } from "@/lib/bookings";

export const metadata = { title: "الحجوزات" };

async function setStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as Booking["status"];
  if (!/^[0-9a-f-]{36}$/.test(id) || !["pending", "confirmed", "cancelled"].includes(status)) return;
  await setBookingStatus(id, status);
  revalidatePath("/admin/bookings");
}

const label = { pending: "قيد الانتظار", confirmed: "مؤكد", cancelled: "ملغي" } as const;

export default async function Page() {
  const rows = await listBookings();
  return (
    <main className="card p-6">
      <h1 className="text-2xl font-extrabold text-forest-900">الحجوزات</h1>
      {!bookingsEnabled() && <p className="mt-3 rounded-lg bg-gold-200 p-3 text-sm">التخزين غير متصل. يعمل بعد النشر على Cloudflare (KV باسم SETTINGS).</p>}
      {bookingsEnabled() && rows.length === 0 && <p className="mt-3 text-muted">لا توجد حجوزات بعد.</p>}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead><tr className="border-b text-right text-muted"><th className="p-2">العميل</th><th className="p-2">الهاتف</th><th className="p-2">الوحدة</th><th className="p-2">الموعد</th><th className="p-2">الحالة</th><th className="p-2">إجراء</th></tr></thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-b align-top">
                <td className="p-2 font-bold">{b.name}{b.notes && <span className="block text-xs font-normal text-muted">{b.notes}</span>}</td>
                <td className="p-2" dir="ltr">{b.phone}<span className="block text-xs text-muted">{b.channel === "whatsapp" ? "واتساب" : "اتصال"}</span></td>
                <td className="p-2">{b.property || "—"}</td>
                <td className="p-2" dir="ltr">{b.date} {b.time}</td>
                <td className="p-2">{label[b.status]}</td>
                <td className="p-2">
                  <form action={setStatus} className="flex gap-2">
                    <input type="hidden" name="id" value={b.id} />
                    {b.status !== "confirmed" && <button name="status" value="confirmed" className="btn btn-primary !py-1 text-xs">تأكيد</button>}
                    {b.status !== "cancelled" && <button name="status" value="cancelled" className="btn btn-outline !py-1 text-xs">إلغاء</button>}
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
