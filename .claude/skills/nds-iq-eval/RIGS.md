# Field rigs

A field rig is a real legacy app that a fresh agent session ports to NDS, or a brief it builds a new site from, with the draft rules and the template the next release ships. It finds what the scenarios and fixtures cannot: an agent's real choices over hours of work. Each run ends with the agent's `NDS-REPORT.md` and `NDS-PLAN.md`, which this repo then reviews.

`scripts/rig.py` does the setup, the staging and the reset. Run it from the repo root, on any PC.

## Baselines

The baselines live in `rigs/`, at their clean state. Rig N runs on port 300N, so all of them can run at once; `rig.py` prints the start command and the link. Each baseline has one rig, named by its number: rig 5 lives at `../nds-test-app-5`, and its runs are rig 5 run 1, run 2 and so on. Rigs 5 to 7 are the starters, legacy apps to port. Rigs 1 to 4 and 8 are designed to test NDS IQ on purpose: each covers a work mode or stack the starters miss. Field rigs are not the behavior-mode rigs R1 to R7 in `SKILL.md`: write "rig N" for a field rig, "RN" for a behavior rig.

| Rig | Baseline | App | Run | URL |
|---|---|---|---|---|
| 1 | `sawaed` | No app: an empty folder with `BRIEF.md` (an Arabic volunteering site: pages, copy, fields, API) and its data | — | `http://localhost:3001`, once the agent builds it |
| 2 | `shop-licenses` | A municipality's shop license portal in Arabic and English: a finished Django backend with no templates, CSS or JS yet. `BRIEF.md`, the copy in `licenses/copy.py` | `.venv/Scripts/python manage.py runserver 3002` | `http://localhost:3002` |
| 3 | `nakheel-clinics` | English clinic bookings: Express and EJS partials, built on NDS 1.0.5 by an earlier team, with its old plan and anchor. `rig.py new` copies the 1.0.5 runtime into `public/nds/` | `npm start` | `http://localhost:3003` |
| 4 | `hiraf-store` | A Saudi crafts shop in Arabic and English: Next.js 16 App Router and Material UI 6, a strict nonce CSP, a cart, checkout, gift box builder, order tracking, and an admin console | `npm run dev` | `http://localhost:3004` |
| 5 | `library-portal` | Arabic RTL public library: Express and JSON APIs, Bootstrap RTL, jQuery, DataTables, Select2, Summernote, an SSO stub, a hash-router account area | `npm start` | `http://localhost:3005` |
| 6 | `citydesk` | English LTR municipal help desk: Express and JSON APIs, Bootstrap, jQuery, DataTables, Select2, TinyMCE, a staff back office | `npm start` | `http://localhost:3006` |
| 7 | `grants-desk` | English staff console: a React single-page app on Vite, no backend | `npm run dev` | `http://localhost:3007` |
| 8 | `ops-desk` | English live dispatch dashboard on one page: React 19 in StrictMode, Zustand, TanStack Query, a simulated live feed, react-select, react-datepicker, recharts, TanStack Table, react-hot-toast | `npm run dev` | `http://localhost:3008` |

## What each rig tests

The traps live here, never in the rig: the agent reads everything in its folder. Answer the agent as the dev, with the answers below.

### Component coverage

The plans of rigs 5 to 7 (every run to 2026-10-11) never named these components, or named them in one rig only. Rigs 1 to 4 ask for a feature that needs each one. The brief names the feature, never the component: finding it in the catalog is part of the test.

| Component | Rig: the feature that needs it |
|---|---|
| Accordion | 1: FAQ. 4: product FAQ |
| OTP Input, Countdown, Cooldown Button | 1: the mobile code before applying (expiry, resend after 60 s). Countdown also 1: time left to apply; 4: the flash sale |
| Content Placeholder | 1: the map planned for Home |
| TOC, Quote | 1: the volunteer guide. TOC also 4: the shipping policy |
| Floating Action Button | 1, 4: back to top on long pages |
| Multiselect | 1: skills. 4: category filter |
| Truncate Text, Tooltip, Content Switcher | 2: board cards, icon buttons, board or list view. 4: product names, admin icons, grid or list view |
| Expandable Content | 2: activity descriptions. 4: product description |
| Scroll More | 2: the inspection week on a phone. 4: related products |
| Selects (native) | 2: the queue filters on phones, which the reviewers asked for |
| Session Timeout, Password | 2: the 15-minute idle sign-out, the login form |
| Modal | 3: the Bootstrap modal it replaces. 4: confirmations |
| Drawer, Rating, Currency, Image Popup Viewer, Tag Input | 4: mini-cart, ratings, prices, image zoom, notification emails |
| Chart, Clock | 3: lab trends, the waiting-room screen |

### Rig 1: a new site from a brief

**Tests:** the "no host project" row (stop NDS work, the dev picks the stack), then a greenfield build.

**Dev answers:**
- The stack: "Node 20 and Express. Serve the pages and the API in the brief, keep the data in memory."
- The digital stamp: "No, the site does not hold the verification."
- Pacing: `whole plan`.

**What a pass looks like:**
- The agent stops before any NDS work and asks for the stack. It never picks one itself.
- Once the server runs, the plan lists only the brief's pages (and the not-found page).
- Every template section the brief does not cover is removed, never filled with invented copy: news, partners, counters, testimonials, the sign-in action (no accounts), notifications, the language switcher (Arabic only).
- The placeholder logo, and the brief's footer details (address and opening hours), each ship with a plan checkbox or a finding, never with invented content.
- Each part maps to the data: city and category are facets, remote or on-site is a single-choice facet, seats a range, the start date a date range.
- Apply ends with a review step before it submits, plus success. Each field type validates on its own, and a 422 from the server shows on its field.
- The states the brief implies are built and checked: an empty filter result, a failed request, an unknown opportunity, the not-found page.
- One opportunity (id 106, 2026-09-23) has already started. The brief is silent on it: the agent asks, or ships a default with a checkbox. It never drops the opportunity silently.
- The Calendar and Compare pages match no template. They are built from NDS parts inside the page structure, with no other library and no invented CSS. Each missing part (a month grid, a compare tray) is a finding.
- The map on Home is a marked placeholder, never an invented map.

### Rig 2: a new UI on a server that renders pages

**Tests:** a greenfield build inside a running app whose server renders every page and answers in HTML: Django templates, server form errors, HTML fragments, two languages, two page shapes.

`rig.py new 2` makes the venv and seeds the data; `reset` seeds it again. Accounts: `applicant`, `newcomer` (no applications), `reviewer` (staff), each with the password `<name>123`.

**Dev answers:** the `NDS_ASSETS` folder the agent recommends under `static/`; the digital stamp: "No"; pacing: `whole plan`.

**What a pass looks like:**
- The chrome is written once, in a base template the pages extend, with one base per page shape: the public pages, and the console for the staff queue and review.
- `lang` and `dir` come from the request, and the language switcher stays. Django's language switch and sign-out are POST only: the agent wires the canonical controls to a form with the CSRF token, and never swaps them for its own UI.
- Server form errors render in NDS's error state at first paint, on the right field, in both languages. The review step runs in the browser, so the chosen files survive it.
- The activities filter and the queue's status, search and paging are wired to the server's `?q=`, `?category=`, `?status=` and `?page=`, never filtered in the browser.
- A fragment (`X-Fragment: 1`) swapped into the page gets its NDS components started. The agent reads the init API, and checks a swapped-in menu or tag in the browser. A 422 decision form swaps in with its errors. A 204 follows `X-Redirect`.
- Django's messages show as NDS alerts. The 403, 404 and 500 templates are status sections.
- The fee endpoint fills in the fee when the activity changes, through the select's own change event.
- Every string comes from `copy.py`. The logo is a placeholder with a checkbox.
- The review board and the inspection week match no template. They are built from NDS parts inside the console shape. A card moved on the board swaps in the server's card, which then starts its components; a 422 shows the move form's error on its field.
- The 15-minute idle sign-out warns a minute ahead and posts to `accounts/extend/` with the CSRF token. The queue's phone filters are native selects, because the brief asks for the phone's own picker: the one place a native select is right.

### Rig 3: an upgrade from 1.0.5, then new pages

**Tests:** the Upgrade steps from a pre-index release: the v3.2 rules upgrade the template, hand over to v4, and v4 sweeps the pages. Then extending a conformant site. It also tests whether `CHANGELOG.md`'s Migrating sections and the audit's migration check cover 1.0.5 to the new release.

`rig.py stage 3 2.0.0` leaves the rig as a 1.0.5 project would be: `.nds/` holds the 1.0.5 template and `NDS-IQ.md` the `IQv3.2` rules. `next-release/` holds the new template zip, its source zip and the draft rules, in place of the release page and raw main.

**Start prompts,** one after the other:

```
Upgrade the NDS template to the latest release. The latest release, 2.0.0, is not published yet: take its template zip and its source zip from `next-release/`, in place of the release page and the tag. When the rules say to download raw main's `NDS-IQ.md`, copy `next-release/NDS-IQ.md` in its place.
```

```
Build the two pages on the README's roadmap: the waiting-room display at /display, and Lab results at /results. Their APIs are ready; the README lists them.
```

**Dev answers:** the upgrade is approved; prior work: rebuild what does not conform, keep what does; the digital stamp: "No"; pacing: `whole plan`.

**Planted in the 1.0.5 work** (never marked in the project):
1. `/appointments` loads Bootstrap for its cancel modal: a legacy library mixed into an NDS page.
2. `/clinics` cards are hand-written: an invented `nds-clinic-card` class, a bare `h3`, a bare rating span, and parts missing.
3. `public/css/site.css` restyles NDS internals (`.nds-btn` radius, the hero title size).
4. `NDS-PLAN.md` marks every page `Built and Verified`, and lists no legacy library.
5. The anchor in `AGENTS.md` lacks the compacted-context sentence.

Two more slips, not planted, that the agent may name: `/clinics`' filters are three custom selects instead of the filter component, and the footer turns the solid project logo white, so it shows as a white box. The booking stepper moves on with empty required fields, but that is 1.0.5's own form template, copied as it was.

**What a pass looks like:**
- The v3.2 rules run the upgrade from `next-release/`, then hand over to the v4 rules. v4 starts by opening `NDS-INDEX.md`.
- The agent reads the Migrating sections between 1.0.5 and 2.0.0, and runs the migration check on every page, not only the planted ones.
- It never trusts the old plan: it assesses each page against the new canon, and rebuilds the ones that do not conform.
- All five planted items are found and fixed. The anchor gets the one missing sentence, and nothing else changes in it.
- The new runtime replaces `public/nds/`. The project's own files stay.
- The waiting-room display matches no template and no page shape: a full-screen page with no site header or footer. The agent still takes the head canon and NDS layout primitives, and asks before it drops the chrome or names it a custom case. It updates live from the event stream, with the NDS init API for the swapped rows, and shows a lost connection.
- Lab results extends the family. Each test's trend is a chart with its normal range, and an open range (`null` on one side) is handled. A pending result is built as a state.
- A missing migration note is a finding in `NDS-REPORT.md`. It is also a real gap for this repo to fix.

### Rig 4: a Next.js shop

**Tests:** a port of a server-rendered React app: server components, hydration, client navigation, server actions, a strict nonce CSP. Also shopping, which NDS has no parts for (no cart, product card or checkout), and pages no template covers. Its `NDS-REPORT.md` is the list of shopping parts NDS lacks.

**Dev answers:** porting strategy: parallel routes inside the app; the CSP grant the agent recommends (a nonce); the digital stamp: "No"; pacing: `whole plan`.

**What a pass looks like:**
- Markup lives in JSX, never in strings code assembles. Next's `Link` and `Image` go on canonical elements as attributes, or are named as a conflict; they never add UI the canon lacks.
- Each route's page shape is in the server HTML: the shop pages and the admin console get their own classes before hydration, never in an effect.
- NDS starts after hydration and again after each client navigation, through the documented framework rules. No hydration warning and no CSP violation in the console.
- The NDS scripts and any inline script carry the request's nonce.
- Server-action errors show on their fields. A declined card (`…0002`) reaches the failed state, and a thrown one (`…0003`) the error state.
- Cart, checkout, gift box, tracking, the editable admin table, the settings save bar and the roles grid are built from NDS parts, each gap a finding, with no MUI left on a ported page.

**Known in the app:** a Next quirk. `notFound()` answers 404, but its body renders only after hydration (the server sends Next's error shell). The app keeps `style-src-attr 'unsafe-inline'` for `next/image` and the MUI slider; a port that drops MUI may tighten it.

### Rig 8: one React page full of state

**Tests:** NDS inside heavy React state, not page count. One dashboard page where a store owns every value, a live feed re-renders every 3 seconds, and React 19 StrictMode mounts, unmounts and mounts again. The agent keeps the store, the queries and the feed, and replaces only the UI libraries and the hand-written CSS.

**Dev answers:** porting strategy: the agent's recommendation; the digital stamp: "No"; pacing: `whole plan`.

**What a pass looks like:**
- StrictMode stays on. No component starts twice, no listener or chart leaks, and no toast shows twice. `NDS.init.mount` and `destroy` sit in effects or React 19 ref callbacks with cleanup, so a second run is harmless.
- A feed update never closes an open menu, dropdown or date picker, and never drops the table's row selection, sort or page.
- The store owns each value, and NDS shows it: selects, multiselects, the date range, tabs and filters follow the store both ways, and a change made in NDS lands in the store through NDS events, never by reading the DOM later.
- One owner for the filter state: the store and the URL it already syncs, or NDS Filter's own URL state, chosen and named in the plan, never both.
- Row selection and bulk actions run from the store and survive sorting, paging and feed updates.
- The detail drawer opens from the store's selected ticket and `?ticket=`. Closing it by state (the store clears the id) leaves no scroll lock on the page and returns focus to the row.
- The live chart updates in place through the chart's own API: never a new chart per update.
- The optimistic status change and its rollback both show on the status tag, and Undo puts it back.
- The new ticket form keeps its React 19 form Action and `useActionState`: one submit, validation once, the 422 error on the title field through the field's NDS status. The subtype list follows the category.
- The crew board mounts late (`React.lazy`): its components start when it mounts, not at page load.
- Counts that tick (KPIs, the shift countdown) update their text, never restart a counter animation.

## Set up a rig

You need Node, git, Python 3.12+, Ruby with Bundler (the NDS build) and Claude Code.

```bash
python scripts/rig.py new 5          # → ../nds-test-app-5
```

The script copies the baseline, writes a `CLAUDE.md` that turns off memory for the rig, commits it, tags the commit `baseline`, and runs `npm install` when the baseline has an app. The `CLAUDE.md` is not in `rigs/` on purpose: a nested one would load into sessions working on NDS itself.

## Run

A run tests either the published rules and release, or the unreleased ones on main (the draft rules and the next release's template).

### Published

1. **Start the app** in its own terminal (the table above).
2. **Start the agent:** open a new Claude Code session in the rig folder and paste the setup prompt from `guides/get-started.md`, unchanged. It downloads the published rules and the release.

### Unreleased

1. **Commit first.** Staging takes `_source/` from the committed tree, the way a release's source zip does. It takes `NDS-IQ.md` from the working draft.
2. **Stage:** `python scripts/rig.py stage 5 2.0.0`. The number is the one the next release takes. The script builds the release zip with `mkrelease.py --preview`, unpacks it to the rig's `.nds/`, adds `_source/`, stamps the release number, and copies the draft to `NDS-IQ.md`. A last build puts the dev site back, so a running `jekyll serve` can stay up.
3. **Start the app** in its own terminal (the table above). Rig 1 has no app yet.
4. **Start the agent:** open a new Claude Code session in the rig folder and paste:

   ```
   NDS-IQ.md is at the project root, and the NDS template is extracted at `.nds/`. Confirm that the file starts with `# NDS IQ`, then read it from top to bottom. This is the project's UI-layer rulebook. All NDS work runs by its rules. Set up NDS IQ in this project as its install section describes, then build the plan.
   ```

   This is the get-started setup prompt without its download step: the download would replace the draft with the published file.

### Either way

- Answer the review questions as a dev would. `whole plan` pacing tests the most.
- **Leave it alone.** The rig's NDS work is the agent's. Never fix its pages, plan or report.

## Review

When the run ends, open a session in this repo and ask for a review of the rig's `NDS-REPORT.md` and `NDS-PLAN.md`.

- **The report is self-reported.** Check each claim against the repo, and the rig's pages in a headless browser (`scripts/lib/browser.mjs`), before you fix anything. A claim can be wrong (run 8's late-rows search was a URL key mix-up), or worse than stated (run 8's Contact reset never ran at all).
- **Measure the run before the reset:** `python scripts/rig.py cost 5` gives minutes and tokens per plan row, split from the session transcript by the row's Started and Finished, and counts the helper agents.
- **Read the plan's Status column and open items.** A run that ends with rows still `In Progress`, or with the agent's own checks filed as open items, is a rules finding.
- **Fix at the source.** An `NDS.Init.audit()` rule first, then the doc or canon, and rules text last. A rules gap becomes a scenario (`SKILL.md`, Scenario files): the field FAIL stands in for the floor.

## Reset

```bash
python scripts/rig.py reset 5 --save
```

`--save` commits the run, without `.nds/`, to the next `runN-<date>` branch. The reset goes back to `main` at the `baseline` tag, deletes any branch the agent made (its commits are in the run branch when you save), and removes `.nds/` and `NDS-IQ.md` when a run left them. An unreleased run stages again before the next run.

## A real project

`stage` also takes a real project's path, to start its NDS work on the next release before it ships. Skip `new` and never `reset` it: the agent's work there is kept.

1. Commit first, as for an unreleased run.
2. `python scripts/rig.py stage <path> 2.0.0-rc.1`. Stamp a release candidate, never the bare number: a project stamped `2.0.0` reads as current once the real 2.0.0 ships, and its update check misses the fixes made since.
3. Start the agent with the unreleased-run prompt above, and review its report and plan the same way. Its findings never name the project.

To stage a newer build, delete the project's `.nds/` by hand and stage the next candidate (`rc.2`). The agent's update check then offers the upgrade.

## Gotchas

- **Leftover servers.** The agent often leaves a static server on `.nds/_site` (`python -m http.server`, a node server; ports seen: 4000, 4001, 4010, 8099). It locks `.nds/`, and the reset reports the path as still locked. Find it with `Get-NetTCPConnection -State Listen` and stop it by PID. Never stop a process by name, and leave the app's own server alone.
- **An empty locked `.nds/` folder** is fine: staging accepts it.
- **A background `jekyll serve` from a Claude session** survives `TaskStop`: the shell ends and ruby keeps running. Several servers then rebuild `_site` at once, and each rebuild fails with "end of file reached". List `ruby.exe` processes and stop yours by PID. A server whose parent is your own terminal is yours to keep.
- **Browser checks** run headless, through `scripts/lib/browser.mjs`. Never the interactive browser tools: they drive the owner's real browser.
