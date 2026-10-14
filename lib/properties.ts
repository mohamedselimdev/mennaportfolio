import { demoProperties, type Property } from "./data";
import { kv } from "./store";

const P = "property:";
export const propertiesEnabled = () => !!kv();

async function readSaved(): Promise<Property[]> {
  const store = kv();
  if (!store) return [];
  try {
    const { keys } = await store.list({ prefix: P });
    const rows = await Promise.all(keys.map(async (k) => {
      try { return JSON.parse((await store.get(k.name)) ?? "null") as Property | null; } catch { return null; }
    }));
    return rows.filter((r): r is Property => !!r).sort((a, b) => a.code.localeCompare(b.code));
  } catch {
    return [];
  }
}

/** Units added from the dashboard; the labelled demo units are shown only until the first real one exists. */
export async function getProperties(): Promise<Property[]> {
  const saved = await readSaved();
  return saved.length ? saved : demoProperties;
}
export const hasRealProperties = async () => (await readSaved()).length > 0;
export async function getProperty(slug: string) {
  return (await getProperties()).find((p) => p.slug === slug);
}

export async function saveProperty(p: Property) {
  const store = kv();
  if (!store) throw new Error("no-store");
  await store.put(`${P}${p.slug}`, JSON.stringify(p));
}
export async function deleteProperty(slug: string) {
  await kv()?.delete(`${P}${slug}`);
}
export async function slugTaken(slug: string) {
  return !!(await kv()?.get(`${P}${slug}`));
}
