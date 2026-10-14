import { getCloudflareContext } from "@opennextjs/cloudflare";

export type KV = {
  get(k: string): Promise<string | null>;
  put(k: string, v: string): Promise<void>;
  delete(k: string): Promise<void>;
  list(o: { prefix: string; limit?: number; cursor?: string }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
};

// Local smoke tests only (DEV_MEMORY_KV=1): an in-memory stand-in for the KV binding.
function memoryKV(): KV {
  const g = globalThis as unknown as { __memKV?: Map<string, string> };
  const m = (g.__memKV ??= new Map());
  return {
    get: async (k) => m.get(k) ?? null,
    put: async (k, v) => void m.set(k, v),
    delete: async (k) => void m.delete(k),
    list: async ({ prefix }) => ({ keys: [...m.keys()].filter((k) => k.startsWith(prefix)).sort().map((name) => ({ name })), list_complete: true }),
  };
}

/** The SETTINGS KV namespace (bound in wrangler.jsonc), or undefined off Workers. */
export function kv(): KV | undefined {
  if (process.env.DEV_MEMORY_KV === "1") return memoryKV();
  try {
    return (getCloudflareContext().env as { SETTINGS?: KV }).SETTINGS;
  } catch {
    return undefined;
  }
}
