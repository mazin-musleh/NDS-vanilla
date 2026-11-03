# Turathna

The public site of the National Heritage Program: the program, its numbers, the heritage sites it restores, news, social channels and a partner portal. English (LTR) by default, Arabic (RTL) available. The product brief is in [BRIEF.md](BRIEF.md).

Vue 3.5, Vite 8, Vue Router 5, Pinia 4, TypeScript 6. No component library.

## Run it

```bash
npm install
npm run dev        # http://localhost:3010
npm run build      # type-check and production build into dist/
npm run preview    # serve the build on http://localhost:3010
```

## Layout

```
public/data/       JSON the API client reads (sites, kpis, news, media, partners, pages, home)
public/images/     placeholder images the data points at
src/api/client.ts  fetch wrapper with a 300-600 ms delay and the simulated POST endpoints
src/stores/        Pinia stores: lang, sites, kpis, news, media, search, auth, newsletter, content
src/copy/          en.ts and ar.ts: every UI string; read through useCopy()
src/composables/   useCopy(): t(), tr(), number and date formatting
src/router/        routes, scroll behaviour, the /partners guard
src/views/         one view per route
```

Language: the `lang` store sets `<html lang>` and `dir` and saves the choice in `localStorage` (`turathna.lang`). Switching it never reloads the page.

## Routes

| Path | View | Query |
|---|---|---|
| `/` | `HomeView` | |
| `/about` | `AboutView` | |
| `/kpis` | `KpisView` (kept alive) | `year`, `region` |
| `/sites` | `SitesView` (kept alive) | `q`, `region`, `type`, `unesco`, `view=grid\|list` |
| `/sites/:id` | `SiteDetailView` | |
| `/news` | `NewsView` | `page` |
| `/news/:slug` | `NewsDetailView` | |
| `/media` | `MediaView` | |
| `/search` | `SearchView` | `q`, `type`, `page` |
| `/partners/sign-in` | `PartnerSignInView` | `redirect` |
| `/partners` | `PartnerDashboardView` (signed in only) | |
| any other path | `NotFoundView` | |

`/partners` sends signed-out visitors to `/partners/sign-in?redirect=...`. The two kept-alive views (`App.vue` lists them in `KeepAlive`) read their query in the view and write filter changes back to the address.

## Test accounts and failure paths

| Case | How |
|---|---|
| Sign in | `partner@example.sa` / `Turath#2026` |
| Wrong credentials | any other email or password: `401 invalid credentials` |
| Locked account | `locked@example.sa` (any password that matches): `423 account locked` |
| KPI load failure | year 2023 on `/kpis`: `500` |
| Newsletter failure | an email ending in `@fail.test`: `500` |

Every request waits 300 to 600 ms, so loading states are visible.

## Status

The data layer, stores, routes and copy are done. The views are placeholders: each loads its data and dumps it as JSON. Build the interface from [BRIEF.md](BRIEF.md), in the visual identity in [brand/](brand/BRAND.md).
