# Nigeria High Commission, Canberra — website

Next.js 13 (pages router) + MUI frontend that renders every page from the
Payload CMS in `../bankly-web-be`. No page content is hardcoded: pages are
composed in the CMS from layout blocks, and services/news have dedicated
templates.

## Running locally

```sh
nvm use 18
npm install --legacy-peer-deps   # yarn 1 cannot install the GitHub deps
cp .env.example .env.local        # point NEXT_PUBLIC_CMS_URL at the CMS
npx next dev -p 3001
```

Checks: `node_modules/.bin/tsc --noEmit`, `npx next lint --dir src`,
`npx next build`.

## How rendering works

| Route | Source |
| --- | --- |
| `/` and `/<slug>` | `pages/[...slug]` → CMS `pages` (slug `home` for `/`) → `RenderBlocks` over `page.layout` |
| `/services/<slug>` | `pages/services/[slug]` → CMS `consular-services` → `impls/service` template |
| `/news`, `/news/<slug>` | `pages/news/*` → CMS `news-articles` |
| `/sitemap.xml` | generated from published CMS content |

Header, footer and the site-wide alert bar come from the `header`, `footer`
and `site-settings` globals (fetched per request in `getServerSideProps`).

### Adding a block

1. Backend: block config + entry in `src/blocks/index.ts`, `yarn generate:types`.
2. Copy `src/payload-types.ts` → `src/types/payload-types.ts` here.
3. Component in `src/components/impls/cms-page/elements/block/<slug>/`.
4. Register it in `src/components/impls/cms-page/elements/block/index.tsx`.
5. If it needs data from another collection, add a populate function and map
   it in `src/api/helpers/pages/populate-blocks.ts`.

### Theme

All colours, fonts, gradients and shadows live in `src/theme/tokens.ts` and
are exposed through the MUI theme (`theme.palette.brand`, `palette.section`,
`palette.alert`, `palette.gradients`, `palette.customShadows`). Blocks pick a
named section theme (`paper | cream | deep | gold`) — never a colour value.

### Legacy URLs

`next.config.js` 301-redirects the old static `.html` URLs (e.g.
`/tourist-visa.html` → `/services/tourist-visa`).
