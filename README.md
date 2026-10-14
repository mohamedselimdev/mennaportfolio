# Menna Mostafa Real Estate (DEMO)
Next.js 15 + Tailwind 4, Arabic RTL. Demo data/images only.

## Run
npm install && npm run dev

## Deploy as separate Cloudflare Worker (name: menna-realestate, does not touch other workers)
npx wrangler login
npm run cf:deploy
→ URL: https://menna-realestate.<your-subdomain>.workers.dev

## Config
.env.local: NEXT_PUBLIC_WHATSAPP_NUMBER (E.164, digits only), NEXT_PUBLIC_SITE_URL

## Status
Done: homepage, properties + detail, booking form (validated, saved to Cloudflare KV, managed in /admin/bookings), contact, about, privacy, admin dashboard preview (demo numbers, protected by Basic Auth in middleware.ts).
Todo: Prisma/Postgres, Auth.js + RBAC, admin CRUD, analytics events, CMS.


## Admin auth
Set secrets before deploying: `npx wrangler secret put ADMIN_USER` and `npx wrangler secret put ADMIN_PASSWORD` (use a long random password). Locally put both in `.env.local`. If either is missing, `/admin` returns 503.
