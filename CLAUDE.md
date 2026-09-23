# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/catalog site for **Laurel Spa (Medellín, Colombia)**. Angular 19 (standalone components, no NgModules) with SSR + prerendering, styled with Tailwind CSS 3. There is no backend: all content comes from static JSON files, and bookings happen through WhatsApp links. UI text, routes, and much of the naming are in Spanish.

## Commands

- `npm start` — dev server at http://localhost:4200
- `npm run build` — production build to `dist/medellin-spa/` (prerender is enabled in `angular.json`, so all routes are rendered at build time)
- `npm run serve:ssr:medellin-spa` — run the built Express SSR server (`src/server.ts`)
- `npm test` — Karma + Jasmine unit tests (needs Chrome)
- Single spec: `npx ng test --include=src/pages/planes/services/plan.service.spec.ts`

No lint or e2e setup exists.

## Architecture

- **Pages live in `src/pages/`, not `src/app/`.** `src/app/` holds only the root shell (`app.component` with the nav bar, a launch popup modal, and the floating WhatsApp button), app config, and `app.routes.ts`. Every route lazy-loads a standalone component from `src/pages/` via `loadComponent`.
- Routes: `''` (main), `planes` (with children `''` → plan list and `detalles` → plan details), `galeria`, `politicas_reserva`.
- **Data layer = JSON in `src/assets/data/`**, fetched with `HttpClient` from `assets/data/...`:
  - `plans.json` — plans; `category` is the numeric value of the `CategoryType` enum (`0` Individual, `1` Couple, `2` Group, `3` None), and `additionalServicesId` references IDs in `additionals.json`.
  - `additionals.json` — add-on services, which `PlanService.getPlans()` joins into `plan.additionalServices` (via `forkJoin`).
  - `priceRanges.json` — used by the filter form.
  - `services.json` — icon and name list shown on the main page (`DataService`).
  - To add or change plans or prices, edit these JSON files. No code changes are needed.
- **All filtering happens on the client** in `PlanService` (`src/pages/planes/services/plan.service.ts`). Each query re-fetches and re-joins the JSON.
- **Plan details has no ID in the URL.** `PlanCardComponent` stores the selected plan in a signal on `PlanService` (`setPlanDetails`), and `PlanDetailsComponent` reads it. If the signal is empty (deep link, reload), it redirects to `/`.
- The WhatsApp contact URL (phone and default message) is the single constant `whatsappMsgDefault` in `src/pages/planes/const.ts`. The root nav, the floating button, and plan details all reuse it.
- `@c-code/c-code-fw` (a third-party package) provides `ElementToggleService` / `ElementActiveDirective`, used in the plan list to show or hide the filter form and mark the active category.
- Gallery and carousels use `ngx-lightbox`, `ngx-slick-carousel`, and `swiper`.

## Conventions / gotchas

- Code runs on the server during SSR and prerendering. Guard any direct `document`/`window` access with `isPlatformBrowser` (see `AppComponent.menuToggle`).
- Tailwind theme colors are defined in `tailwind.config.js`: `primary`, `primary_light`, `primary_dark`, `secondary`, `secondary_light`, `secondary_dark`, `bg`. The default font is Albert Sans, loaded in `src/styles.css`. Use these tokens instead of raw hex values.
- Static images and icons live in `src/assets/` (served at `assets/...`). `public/` holds only the favicon.
