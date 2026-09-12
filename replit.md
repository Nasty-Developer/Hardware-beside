# Shree Sawariya Store

Responsive ecommerce storefront for Shree Sawariya, an electrical and hardware store in Kurla West, Mumbai.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/shree-sawariya-store/src/App.tsx` — storefront routes, cart, wishlist, checkout, store information, and shared layout
- `artifacts/shree-sawariya-store/src/data/products.ts` — local product catalog and category data
- `artifacts/shree-sawariya-store/src/index.css` — storefront theme and responsive layout utilities
- `artifacts/shree-sawariya-store/index.html` — page title, SEO description, and social metadata

## Architecture decisions

- Product browsing, cart, wishlist, and checkout are intentionally client-side for this storefront prototype.
- Store contact details are centralized in `App.tsx` so the address and phone stay consistent across the store section, footer, maps link, and click-to-call actions.
- The imported visual system is preserved: deep blue, bright blue, white, and coral accents with responsive desktop/mobile layouts.

## Product

Customers can browse categories and products, search the catalog, save wishlist items, add products to a cart, complete a demo checkout flow, and find or call the physical Shree Sawariya store.

## User preferences

- Use the real business identity “Shree Sawariya” everywhere; do not restore the imported template name.

## Gotchas

- The storefront workflow supplies `PORT` and `BASE_PATH`; use the managed workflow for the live preview.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
