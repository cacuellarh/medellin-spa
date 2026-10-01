# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/catalog site for **Laurel Spa (Medellín, Colombia)**. Angular 19 (standalone components, no NgModules) with SSR + prerendering, styled with Tailwind CSS 3. There is no backend: the content (plans, services, price ranges, home highlights) is edited in the C-Code CMS, stored in Firestore and turned into static JSON files before each build; bookings happen through WhatsApp links. UI text, routes, and much of the naming are in Spanish.

## Commands

- `npm run content` — brings the content from Firestore: writes `src/assets/data/*.json` and updates `prerender-routes.txt` and `public/sitemap.xml` (`c-code-content pull --site medellin-spa --project c-code-bf1fd`, package `@c-code/content`). It runs automatically before `npm start` and `npm run build`.
- `npm start` — dev server at http://localhost:4200
- `npm run build` — production build to `dist/medellin-spa/` (prerender is enabled in `angular.json`, so all routes are rendered at build time). `vercel.json` makes Vercel use it, so the content is pulled before every deploy.
- `npm run serve:ssr:medellin-spa` — run the built Express SSR server (`src/server.ts`)
- `npm test` — Karma + Jasmine unit tests (needs Chrome)
- Single spec: `npx ng test --include=src/pages/planes/pages/plan-list/plan-list.component.spec.ts`
- Specs get their providers (HttpClient, router, catalog, SEO) from `TEST_PROVIDERS` in `src/test-providers.ts`.

No lint or e2e setup exists.

## Architecture

- **Pages live in `src/pages/`, not `src/app/`.** `src/app/` holds the root shell (`app.component`: fixed header with top bar, nav and mobile menu, the promo popup and the floating WhatsApp button, hidden on plan details), the shared footer (`components/site-footer`), `nav-links.ts`, `site.config.ts`, app config and `app.routes.ts`. `<main>` carries the top padding for the fixed header (`pt-16 lg:pt-[7.5rem]`), so pages must not add their own offset. Every route lazy-loads a standalone component from `src/pages/` via `loadComponent`.
- Routes: `''` (main), `planes` (with children `''` → plan list and `:slug` → plan details), `galeria`, `politicas_reserva`.
- **UI components come from `@c-code/c-code-fw/ui`** (the owner's npm library, source in `C:/dev/c-code/c-code-fw`): `cc-plan-catalog`, `cc-plan-details`, `cc-plan-card`, `cc-gallery`, `cc-page-banner`, `cc-section-heading`, `cc-info-item`, `cc-notice`, `cc-faq`/`cc-faq-item`, `cc-social-links`, `cc-whatsapp-button`, `cc-promo-modal` and the `ccButton` directive for every call to action. Pages only load data, set SEO and pass props; choose the look with component inputs (`variant`, `tone`, `size`, `appearance`…). Fix component bugs in the library, not with CSS overrides here.
- Page layout pattern: `<div class="mx-auto max-w-site px-4 py-8 lg:px-8 lg:py-12">` with a `cc-page-banner` (the page `<h1>`) or, on the home page, sections with `cc-section-heading`.
- **Theme = `src/styles.css`, the single source of colors and fonts.** It defines the brand variables (`--laurel-*`) and maps them to the library roles (`--cc-accent`, `--cc-on-accent`, `--cc-heading`…). `tailwind.config.js` reads the same variables for `primary`, `secondary`, `secondary_text`, `bg`, `stone`, and maps `fontSize` (`text-sm`…`text-4xl`) to the library's `--cc-text-*` scale (`tokens.css` is loaded in `angular.json` → styles). Change colors in `styles.css`, never with hex values in templates. Tailwind opacity modifiers (`bg-primary/50`) do not work with these variables; use `bg-[color-mix(in_srgb,var(--laurel-green-dark)_70%,transparent)]`.
- Headings use El Messiri (`font-heading`), body text Albert Sans. Gold used as text must be `text-secondary_text` (#7a5c17); plain `secondary` fails contrast on white.
- **Data layer = JSON in `src/assets/data/`, generated from Firestore and not tracked by git**, fetched with `HttpClient` from `assets/data/...`:
  - `plans.json` — plans (durations in sentence case, e.g. "2 horas 20 minutos"); `category` is the numeric value of the `PlanCategory` enum (from `@c-code/c-code-fw/ui`) (`0` Individual, `1` Couple, `2` Group, `3` None), and `additionalServicesId` references IDs in `additionals.json`.
  - `additionals.json` — add-on services, which `PlanCatalogService.getPlans()` (from the library) joins into `plan.additionalServices`.
  - `priceRanges.json` — used by the filter form.
  - `services.json` — icon and name list shown on the main page (`DataService`).
  - To add or change plans or prices, use the C-Code CMS (`npm run cms` in `C:/dev/c-code/c-code-fw`). Do not edit these files: the next `npm run content` overwrites them. No code changes are needed.
- **/planes keeps the category in the URL** (`?categoria=individual|pareja|grupal`, see `src/pages/planes/category-slugs.ts`); without it, the couples category shows. The home category cards link there.
- **All filtering happens on the client**, inside `cc-plan-catalog`. `PlanCatalogService` requests each JSON file once and caches it. Category counts are computed from `plans.json`.
- **Plan details live at `/planes/:slug`**, where the slug comes from the plan name via `planSlug()` from `@c-code/c-code-fw/ui` (for example `PLAN FLOR DE LOTTO 3` → `plan-flor-de-lotto-3`). `PlanDetailsComponent` loads the plan with `PlanCatalogService.getPlanBySlug`. Unknown slugs redirect to `/planes`. Renaming a plan changes its URL.
- **SEO:** each page calls `SeoService.update()` (from `@c-code/c-code-fw/ui`, configured with `provideSeo()` in `app.config.ts`) in `ngOnInit` to set the title, meta description, canonical URL, and Open Graph/Twitter tags. `SITE_URL` in `src/app/site.config.ts` holds the production domain. The business JSON-LD (`DaySpa`: address, hours, phones) is static in `src/index.html`. Plan details add a per-plan `Service` JSON-LD with `SeoService.setJsonLd()`.
- **Parameterized routes are only prerendered if they are listed** in `prerender-routes.txt` (referenced from `angular.json`). That file and `public/sitemap.xml` list every page, including one URL per plan. `npm run content` rewrites the plan entries (`/planes/<slug>`) of both from the CMS and keeps the other lines; add or remove the site's own pages (home, gallery…) by hand.
- **Contact data lives in `src/app/site.config.ts`:** `CONTACT` (phones, email, address, hours, maps link), `SOCIAL_LINKS`, `WHATSAPP_URL` (general message), `planWhatsappUrl(plan)` (booking message with the plan name and price, used by plan details) and `WHATSAPP_PHONE`.
- **The promo popup and the gallery are edited in the CMS**, like the plans:
  - `assets/data/promo.json` holds the popup: on/off, image, button, WhatsApp message, delay, repeat days and dates. `app.component` shows it only while `isPromoRunning()` says so, and uses `promoRememberKey()` from the library, so a new image or new dates show again to people who closed the old one.
  - `assets/data/gallery.json` holds the gallery photos (`src`, `thumb`, `caption`), in order. Older photos live in `assets/images/galery/`; new ones come from the CMS image library (`/assets/cms/…`).

## Conventions / gotchas

- Code runs on the server during SSR and prerendering. Guard any direct `document`/`window` access with `isPlatformBrowser`.
- Static images and icons live in `src/assets/` (served at `assets/...`). `public/` holds the favicon, `robots.txt`, and `sitemap.xml`.
- Large decorative PNGs are referenced as `.webp` (the original `.png` files are still in the repo). Photos stay `.jpeg` because they double as `og:image` previews.
- Keep one `<h1>` per page. Tailwind's preflight resets heading sizes, so changing a heading level doesn't change how it looks.
- The project lives in `C:/dev/medellin-spa` (moved out of OneDrive, which caused hung builds).
- To try unpublished library changes, build and pack the library (`npx ng build core && cd dist/core && npm pack` in `c-code-fw`) and run `npm install --no-save <path>/c-code-c-code-fw-<version>.tgz` here. `--no-save` keeps `package.json` pointing at the published version; bump it only after publishing.
