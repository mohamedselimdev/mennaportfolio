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
Done: homepage, properties + detail, booking form (validated, saved to Cloudflare KV, managed in /admin/bookings), contact, about, privacy, admin dashboard (real booking and unit counts, protected by Basic Auth in middleware.ts).
Todo: Prisma/Postgres, Auth.js + RBAC, admin CRUD, analytics events, CMS.


## Admin auth
Set secrets before deploying: `npx wrangler secret put ADMIN_USER` and `npx wrangler secret put ADMIN_PASSWORD` (use a long random password). Locally put both in `.env.local`. If either is missing, `/admin` returns 503.

## Booking notifications
Optional secrets: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`, and/or `RESEND_API_KEY` + `NOTIFY_EMAIL_FROM` + `NOTIFY_EMAIL_TO`. Whatever is configured is used; failures never block a booking.

## Deploy from GitHub (no local setup)
Repo Settings → Secrets and variables → Actions → add `CLOUDFLARE_API_TOKEN` (template "Edit Cloudflare Workers"; also needs Workers KV Storage: Edit), `CLOUDFLARE_ACCOUNT_ID`, `ADMIN_USER`, `ADMIN_PASSWORD`. Then Actions → "Deploy to Cloudflare Workers" → Run workflow.
