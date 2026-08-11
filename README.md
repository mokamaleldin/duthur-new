# DUTHUR Store

A focused standalone replacement for the DUTHUR Shopify storefront. Built for a small Turkish clothing store without customer accounts or unnecessary SaaS complexity.

## Stack
- Next.js App Router + TypeScript
- Supabase Postgres, Auth and Storage
- Vercel-ready
- Arabic / English / Turkish with RTL for Arabic

## Included MVP
- Home, Products, Product detail, Your Size, About, Contact
- Cart persisted in localStorage
- Türkiye-only checkout with all 81 provinces
- Shipping / pickup, discount codes, bank transfer
- Server-side order creation through Postgres RPC with price, discount, shipping and stock validation
- Admin magic-link login with server-side role protection
- Admin: dashboard, products, multiple image upload, size stock, orders, discounts, messages and settings

## Existing DUTHUR data
The connected DUTHUR Supabase project is already initialized and seeded from the existing Shopify store with the current three products, product images, size variants and inventory snapshot. The old Shopify repository/store is used as a reference and is not modified by this project.

## Local setup
1. `npm ci`
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
4. Run `npm run dev`.
5. Open `/admin/login` and use an approved admin email. Supabase sends a magic link.

The approved admin emails for the current project are defined in the secure admin bootstrap migration under `supabase/migrations`.

## Deployment
Import this repository into Vercel and configure:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

In Supabase Auth URL configuration, add the production callback URL:
`https://YOUR_DOMAIN/auth/callback`

Do not move `duthur.co` away from the existing Shopify storefront until the new deployment has been tested end-to-end.

## Security
Prices, discounts, shipping and stock are revalidated in the database when an order is created. Client-side cart values are never treated as authoritative. Admin pages require both a valid Supabase session and an `admin` profile.
