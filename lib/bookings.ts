import { kv } from "./store";

export type Booking = {
  id: string; name: string; phone: string; property?: string; date: string; time: string;
  channel: "whatsapp" | "call"; notes?: string; status: "pending" | "confirmed" | "cancelled"; createdAt: string;
};

const B = "booking:";
const SLOT = "slot:";

export const bookingsEnabled = () => !!kv();

/** Reserves the date+time slot, then stores the booking. Returns "taken" if the slot is already held. */
export async function createBooking(input: Omit<Booking, "id" | "status" | "createdAt">): Promise<"ok" | "taken" | "no-store"> {
  const store = kv();
  if (!store) return "no-store";
  const slot = `${SLOT}${input.date}T${input.time}`;
  if (await store.get(slot)) return "taken";
  const createdAt = new Date().toISOString();
  const id = crypto.randomUUID();
  const booking: Booking = { ...input, id, status: "pending", createdAt };
  await store.put(`${B}${createdAt}:${id}`, JSON.stringify(booking));
  await store.put(slot, id);
  return "ok";
}

export async function listBookings(limit = 200): Promise<Booking[]> {
  const store = kv();
  if (!store) return [];
  const { keys } = await store.list({ prefix: B, limit });
  const rows = await Promise.all(keys.map(async (k) => {
    try { return JSON.parse((await store.get(k.name)) ?? "null") as Booking | null; } catch { return null; }
  }));
  return rows.filter((r): r is Booking => !!r).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function keyFor(id: string) {
  const store = kv();
  if (!store) return;
  const { keys } = await store.list({ prefix: B });
  return keys.find((k) => k.name.endsWith(`:${id}`))?.name;
}

export async function setBookingStatus(id: string, status: Booking["status"]) {
  const store = kv();
  const key = await keyFor(id);
  if (!store || !key) return;
  const b = JSON.parse((await store.get(key)) ?? "null") as Booking | null;
  if (!b) return;
  await store.put(key, JSON.stringify({ ...b, status }));
  // A cancelled booking frees its slot again.
  const slot = `${SLOT}${b.date}T${b.time}`;
  if (status === "cancelled") await store.delete(slot);
  else await store.put(slot, id);
}
