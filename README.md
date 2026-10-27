# Paphawit Ngamchaliew — résumé

A responsive, server-rendered résumé with a separate, monochrome A4 print layout.

## Development

Use **Node.js 24** (`nvm use`) and **pnpm 10.28.2**. The Vercel adapter explicitly targets `nodejs24.x`.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Edit `static/data/profile.json` to update the résumé. The page imports this data at build time, so career information is available without JavaScript. Rebuild and redeploy after editing it. No API credentials, external fonts, or backend services are required.

## Verification

```sh
pnpm check
pnpm lint
pnpm test:unit
pnpm exec playwright install chromium
pnpm test:integration
```

The browser suite builds the production app, starts a local preview, and checks résumé content, rendering without JavaScript, mobile overflow, navigation, printing, and PDF output. If Chromium is already installed, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium pnpm test:integration` instead of downloading another copy.

```sh
pnpm build
pnpm preview
```

## Printing and PDF

Use **Print / Save PDF** in the page header, then select **Save as PDF** in the browser. Use A4 paper, the default scale, and turn browser headers and footers off. The print layout removes navigation, decorative elements, and personal-interest content; retains contact details and every career entry; and avoids splitting roles across pages. Browser PDF output contains selectable text and clickable links. The current résumé occupies one A4 page.

## Content provenance

The redesign preserves the career dates and achievements in the existing repository, with descriptions edited for clarity. The source LinkedIn profile is <https://www.linkedin.com/in/paphawit/>. Public profile and search access were blocked by the cloud environment proxy during this update, so the résumé has **not** been verified against current LinkedIn information. Confirm any new roles, dates, or achievements before publishing updated career claims.
