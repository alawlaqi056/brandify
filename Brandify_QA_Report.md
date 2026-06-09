# Brandify Pricing Engine - Production Readiness QA Report

## Project structure

- `app/` is the authoritative source. It is React 19 + TypeScript + Vite with a Hono/tRPC Node API, Drizzle ORM, and MySQL.
- `deploy/` is generated frontend deployment output. The old folder was a stale Next.js static export and did not match the Vite source.
- `wireframes/` and the root HTML/PDF files are planning/reference material.

## What was broken and fixed

- Removed stale Next.js artifacts and regenerated `deploy/` from the corrected Vite source.
- Standardized routing on `BrowserRouter` clean URLs and fixed homepage section links from subpages.
- Replaced the non-working Contact form with a validated mailto fallback and clear status message.
- Replaced active hardcoded contact details with `VITE_*` business configuration.
- Removed hardcoded admin password, plain-text `PASSWORD_HASH`, hardcoded JWT secret, and an unused insecure legacy admin implementation.
- Admin authentication now uses environment variables, scrypt password verification, and timing-safe comparison.
- Added clear order-submission failure feedback.
- Added image type validation, a 1 MB upload limit, clear upload errors, backend data URL validation, and a 3 MB request-body limit.
- Corrected misleading quotation wording: it saves a quotation but does not claim to send it.
- Marked non-persistent Admin AI Settings actions as Coming Soon.
- Added mutation error feedback for order status, quotations, and factories.
- Improved title, meta description, and Open Graph metadata.
- Fixed a broken `How It Works` page import and all type-check/lint errors.

## Admin page audit

- AI Settings: non-persistent actions clearly marked Coming Soon.
- Pricing: read-only display; no fake actions.
- Media: read-only library; no fake actions.
- Orders: listing, filtering, detail view, and status updates use the API with error feedback.
- Customers: read-only aggregation from orders; no fake actions.
- Factories: add action uses the API with error feedback.
- Quotations: saves through the API and clearly states customer delivery is not configured.

## Verification

- `npm run check`: passed.
- `npm run lint`: passed.
- `npm test`: passed, 1 test.
- `npm run build`: passed.
- Browser routes checked: home, categories, services, how-it-works, AI advisor, track order, admin login.
- Responsive checks passed at 390px, 768px, 1366px, and 1920px with no horizontal overflow.

## Business information still required

- Real business name, contact email, phone, WhatsApp number, and location.
- MySQL `DATABASE_URL`.
- Admin email, scrypt salt/hash, and a strong unique admin JWT secret.
- Kimi OAuth values if OAuth is required.
- A production email/CRM provider if Contact submissions must be sent without opening the visitor's email app.
- Object storage credentials if uploads should be retained at scale. The current safe fallback stores only images up to 1 MB in order data.
- Real legal/privacy/footer links, analytics IDs, and customer quotation delivery workflow.

## Deployment

1. Copy `.env.example` to `.env` and fill all required values.
2. Run `npm ci`.
3. Run `npm run db:migrate`.
4. Run `npm run check && npm run lint && npm test && npm run build`.
5. Deploy the Node application and run `npm start`. The host must provide Node.js and MySQL.
6. Deploy `dist/boot.js` together with `dist/public`.

The `deploy/` folder is a matching static frontend build, but static-only hosting will not support orders, tracking, admin, or database features.
