# DUTHUR Store

A focused replacement for the DUTHUR Shopify storefront. Built for a small Turkish clothing store without customer accounts or unnecessary SaaS complexity.

## Stack
- Next.js App Router + TypeScript
- Supabase Postgres, Auth and Storage
- Vercel-ready
- Arabic / English / Turkish

## Included MVP
- Home, Products, Product detail, Your Size, About, Contact
- Cart persisted in localStorage
- Türkiye-only checkout with all 81 provinces
- Shipping / pickup, discount codes, bank transfer
- Transactional order creation and stock decrement in Postgres RPC
- Admin magic-link login
- Admin: dashboard, products, image upload, stock, orders, discounts, messages, settings

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and add the Supabase URL + publishable key.
3. Apply SQL migrations under `supabase/migrations` to a Supabase project if using a fresh project.
4. Set `store_settings.admin_email` to the email allowed to access admin.
5. Run `npm run dev`.
6. Open `/admin/login` and enter the configured admin email. Supabase sends a magic link.

## Deployment
Import the repository into Vercel and set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

In Supabase Auth URL configuration, add the production callback URL:
`https://YOUR_DOMAIN/auth/callback`

## Important
Prices, discounts, shipping and stock are revalidated in the database when an order is created. Client-side cart values are never treated as authoritative.
