import "server-only";
import { headers } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export async function requireAdmin() {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;
  const authorization = (await headers()).get("authorization") ?? "";
  if (!user || !password || !authorization.startsWith("Basic ")) throw new Error("Unauthorized");
  const actual = Buffer.from(authorization.slice(6), "base64");
  const expected = Buffer.from(`${user}:${password}`);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new Error("Unauthorized");
}
