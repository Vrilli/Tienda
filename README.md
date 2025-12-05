# Ecommerce Skincare - Demo

## What is included
- Next.js + Tailwind demo storefront for skincare products
- Cart with localStorage
- Stripe Checkout integration (server-side create checkout session)
- Authentication with NextAuth (Google + Email provider) — demo config
- Admin panel (CRUD) that edits `data/products.json`

## Env variables required
Create a `.env.local` file with:
```
STRIPE_SECRET_KEY=sk_test_...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=some_random_secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
EMAIL_SERVER=smtp://user:pass@smtp.example.com:587
EMAIL_FROM=you@example.com
```

## Run locally
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

> Notes:
- The admin API writes to `data/products.json`. This is for demo only — in production use a DB.
- NextAuth requires proper provider credentials and a NEXTAUTH_SECRET.
- Stripe requires a valid `STRIPE_SECRET_KEY`.