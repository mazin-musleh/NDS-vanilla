# Turathna: product brief

Turathna (تراثنا) is the public site of the National Heritage Program. It presents the program, its numbers, the heritage sites it restores, news, its social channels, and a portal where partner organisations follow their proposals.

The data layer, stores, routes and copy are built. This brief covers what is left: the interface of every page. Every view in `src/views/` already loads its data and holds it in a store; what remains is the markup, the styling and the interactions.

## Audience

- Public visitors, mostly on phones. Many arrive from a social post or a search, read one page and leave. The first screen of every page has to load fast and read well at 360 px wide.
- Partner staff, mostly on desktop, who sign in to follow proposals. They are in the portal for minutes at a time and want dense, clear information.

## Languages

- English is the default. Arabic is the second language and gets a full right-to-left layout, not a mirrored copy: reading order, icons that point somewhere, the position of controls and the direction of animations all follow the language.
- The language switch is in the header. Switching changes the page in place: no reload, no jump back to the top, and the visitor stays on the same page with the same filters and the same open state. The choice is remembered for the next visit.
- All interface text comes from `src/copy/en.ts` and `src/copy/ar.ts` through `useCopy()`. Bilingual data fields (names, summaries, article text) are read with its `tr()` helper. Do not write visible text directly in templates.
- Numbers and dates are shown in Latin digits in both languages, formatted with the helpers in `useCopy()`.

## Visual identity

The program's agency delivered its identity: `brand/BRAND.md`, with the art in `brand/assets/`. The site follows it on every page, in both languages and in dark mode. The full logo lockup is still in design; until it arrives, use the emblem from the identity with the program name in text. Keep the logo in one place so swapping it is a single change. Content images in `public/images/` are placeholders; keep proper alternative text from the data.

## Look and feel

Calm, warm and confident, like a good museum guide. Plenty of space, large readable text, photographs that carry the page. No colour should carry meaning on its own; pair it with text or an icon.

The site must work with a keyboard, with a screen reader, and with the browser set to reduce motion. Tap targets are comfortable on a phone.

## Shared parts

### Header

On every page except partner sign-in.

- Logo, linking to Home.
- Main navigation: Home, About the program, Our impact, Heritage sites, News, Social media (`nav.*`). The page you are on is marked.
- A search entry that takes the visitor to Search.
- The language switch (`lang.switchTo`), showing the name of the other language.
- A link to the partner portal (`nav.partners`), visually quieter than the main links.
- On a phone the navigation collapses behind a menu button (`a11y.openMenu`, `a11y.closeMenu`). It opens over the page, closes on a link tap, on Escape, and returns focus to the button.
- A "skip to main content" link first in tab order (`a11y.skip`).
- The header stays visible when scrolling up and gets out of the way when scrolling down on phones.

### Footer

On every page except partner sign-in.

- Links to the main pages and to the legal pages (`footer.privacy`, `footer.terms`, `footer.accessibility`). The legal pages do not exist yet; the links can point to an empty anchor for now.
- Contact details: address, phone, email, opening hours (`footer.*`).
- Social icons for the six channels (X, Instagram, YouTube, TikTok, Snapchat, LinkedIn) from the media data, each with the channel name as its accessible name, opening in a new tab.
- The copyright line (`footer.rights`).

### States

Every page that loads data shows a loading state while it waits (the API takes up to a second), an empty state when there is nothing to show, and an error state when loading fails. Use `states.*` unless the page has its own text.

## Pages

### Home (`/`)

Sections, in order:

1. **Hero.** Large photograph from `home.hero`, the title and text (`home.heroTitle`, `home.heroText`) and two actions: explore the sites (`home.heroPrimary`) and about the program (`home.heroSecondary`).
2. **The program in numbers** (`home.numbersTitle`). Four figures from `home.figures`: sites restored, visits a year, artisans trained, partner organisations. Each figure counts up from zero to its value the first time the section scrolls into view. With reduced motion, show the final value immediately. Large values read in short form (4.2M) on phones.
3. **Featured sites** (`home.featuredTitle`). The six featured sites as a slider: one and a half cards on a phone, three on desktop. Visitors can swipe or drag, use previous and next buttons, and use the arrow keys. Each card shows the cover photo, name, region and a UNESCO mark where it applies, and links to the site page. A "view all" link goes to Heritage sites.
4. **Latest news** (`home.newsTitle`). The three newest articles: image, category, date, title, short summary. A "view all" link goes to News.
5. **Upcoming events** (`home.eventsTitle`). The upcoming events from `home.events`: date, title, place, and a "Free" mark where it applies. Events linked to a site link to that site. If there are none, show `home.eventsEmpty`.
6. **Partners** (`home.partnersTitle`). The partner logos in a row that wraps on phones.
7. **Newsletter** (`home.newsletterTitle`, `home.newsletterText`). One email field and a subscribe button. The field is validated on submit. While sending, the button shows `newsletter.sending` and cannot be pressed again. On success show `newsletter.success` and clear the field. On a validation problem or a server failure show `newsletter.invalid` or `newsletter.failed` next to the field and keep what the visitor typed.

### About (`/about`)

Sections, in order:

1. Page title and intro (`about.title`, `about.intro`).
2. **Vision** and **mission** (`about.visionTitle`, `about.missionTitle`): two large statements side by side on desktop, stacked on a phone.
3. **Values** (`about.valuesTitle`): five values with title and one sentence each.
4. **Goals** (`about.goalsTitle`): four goals, each with a title and one sentence.
5. **Leadership** (`about.leadershipTitle`): a card per person with photo, name, role and a short bio.
6. **Structure** (`about.structureTitle`): the five units of the program with their names and one-line descriptions, shown as a simple organisation chart on desktop and a plain list on phones.
7. **Milestones** (`about.milestonesTitle`): a timeline of the program's years, vertical on phones, and alternating sides on desktop. Each milestone shows year, title and text.

### Our impact (`/kpis?year=&region=`)

A dashboard of the program's results. The year (2023 to 2026, default 2025) and the region (all regions, or one of five, default all) are chosen with two filters at the top. The choice is kept in the address, so the page can be shared, and changing it does not scroll the page.

Sections, in order:

1. **Filters** (`kpis.year`, `kpis.region`).
2. **Figure tiles**: sites restored, visits, budget (SAR million), jobs created. Each tile shows the value and the change against the previous year, as an amount and a percentage with an arrow (`kpis.vsPrevious`). The first year on record has no earlier year, so its tiles show `kpis.noPrevious` instead.
3. **Three charts**, each with a title, an accessible text equivalent (a data table a screen reader can reach) and values readable without hovering:
   - Sites restored per region: bars (`kpis.charts.sitesByRegion`).
   - Visits per month: a line over twelve months (`kpis.charts.visitorsByMonth`).
   - Budget split by category: a donut with a legend (`kpis.charts.budgetSplit`, `kpis.budgetCategories.*`).
   Charts follow the language: month names, category names and number formats, and in Arabic the horizontal axis reads right to left.
4. **Indicators table** (`kpis.indicatorsTitle`): one row per indicator with target, actual and a status (`kpis.status.*`: target met, on track, behind target). Status is shown with text and an icon, not colour alone. On a phone the table becomes a list of small cards.

While data loads, show placeholders in the shape of the tiles and charts so the page does not jump. If the data fails to load (the 2023 data currently does), replace the figures, charts and table with the error state: `kpis.errorTitle`, `kpis.errorText` and a `kpis.errorRetry` button that loads again with the same filters. The filters stay usable, so the visitor can move to another year without reloading.

### Heritage sites (`/sites?q=&region=&type=&unesco=&view=grid|list`)

Sections, in order:

1. Title and intro (`sites.title`, `sites.intro`).
2. **Search and filters**: a text search (`sites.searchLabel`), a region filter, a type filter, and a yes/no option for UNESCO World Heritage only (`sites.filters.*`). A "clear all filters" action appears once any filter is set. All of it is kept in the address.
3. **Result count** (`sites.results`) and the **grid or list toggle** (`sites.view.*`). The grid shows cards with cover photo, name, region, type and the UNESCO mark. The list shows a compact row per site with a small photo, name, summary and region. The toggle is remembered in the address.
4. **Results**, nine per page, with paging underneath (`common.previous`, `common.next`, `common.pageOf`). Changing a filter returns to page 1. Changing the page scrolls back to the top of the results.
5. **Empty state** when nothing matches (`sites.empty`, `sites.emptyHint`, and the clear action).

Coming back to this page from a site page restores the same filters, page and scroll position.

### Site (`/sites/:id`)

Sections, in order:

1. A link back to Heritage sites (`site.backToList`), the name, region, type, the UNESCO mark and the year restored.
2. **Photo gallery** (`site.gallery`): a main photo and thumbnails, three to five per site, some portrait. Tapping a photo opens it in a full-screen image viewer (`site.viewer`) with the caption from the photo's alternative text, previous and next controls (`site.previousImage`, `site.nextImage`), the position (`site.imageOf`), swipe on touch screens, arrow keys and Escape on a keyboard, and a close button (`site.closeViewer`). The viewer keeps focus inside while open and returns it to the photo that opened it.
3. **About this site** (`site.overview`): the description.
4. **Visiting hours** (`site.visiting`): the days grouped by hours, with closed days marked (`site.closed`), and the note. Highlight today's row.
5. **Tickets** (`site.tickets`): prices for adult, child and student with currency, or "Entry is free" (`site.free`), the under-6 rule and the note.
6. **Location** (`site.location`): a map placeholder with the site's name and coordinates (`site.mapPlaceholder`, `site.coordinates`). A real map comes later; leave room for it and a "get directions" link.
7. **More sites nearby** (`site.related`): up to three related sites as cards.

An unknown site id shows the not-found page (this is already wired).

### News (`/news?page=`)

1. Title and intro (`news.title`, `news.intro`).
2. A list of articles, six per page, newest first: image, category (`news.categories.*`), date, title, summary and a read-more link. The first article on page 1 may be larger.
3. Paging (`common.previous`, `common.next`, `common.pageOf`), kept in the address. Changing the page scrolls to the top of the list.

### News article (`/news/:slug`)

1. Back link (`news.backToList`), category, date (`news.published`), title.
2. Cover image, then the article text in a comfortable reading width.
3. Share links for the page: copy the link, and share through the device's share sheet where available.
4. Previous and next article links (`news.previousArticle`, `news.nextArticle`).

### Social media (`/media`)

1. Title and intro (`media.title`, `media.intro`).
2. **Channel cards** (`media.channelsTitle`): one per channel with its name, handle, follower count (`common.followers`, in short form) and a follow button (`media.follow`) opening the channel in a new tab. Choosing a card filters the posts below to that channel; choosing it again, or `media.allChannels`, shows all.
3. **Latest posts** (`media.postsTitle`): the twelve newest posts in an even grid: channel, date, text, image where there is one, reactions (`media.engagement`) and a link to the post (`media.viewPost`). Posts keep the language of their text; Arabic and English posts can appear side by side.
4. Empty state for a channel with no posts (`media.empty`).

### Search (`/search?q=&type=&page=`)

1. A search field at the top with the current query and a submit button (`search.label`, `search.submit`). Submitting changes the address and runs the search; a query shorter than two letters shows `search.prompt`.
2. **Type filters** (`search.types.*`): everything, sites, news, posts, each with its count (`search.typeCount`). The current type is marked.
3. The **result count** (`search.results`, `search.resultsOne`) and the **results**, eight per page: a small image, a type label, the title and the summary, linking to the page. News results show their date. Posts link to the social media page.
4. Paging, kept in the address.
5. **No results** (`search.noResults`, `search.noResultsHint`) with suggestions of where else to look.

The query term is highlighted in the titles and summaries of the results.

### Partner sign-in (`/partners/sign-in`)

A minimal page: a full-screen background photo (`public/images/signin-bg.svg`) with a sign-in panel on top. No site header and no footer. Instead, one small logo at the top that links to Home and a "back to the public site" link (`partners.backToSite`). The page works in both languages and has its own language switch.

The panel holds:

- Title and intro (`partners.signInTitle`, `partners.signInIntro`).
- Email and password fields (`partners.email`, `partners.password`), a control to show or hide the password (`partners.showPassword`, `partners.hidePassword`) and a "keep me signed in" option (`partners.remember`).
- The sign-in button, which shows `partners.signingIn` and is disabled while the request is running.
- A forgot-password link and a "not a partner yet" line with an ask-to-join link (`partners.forgot`, `partners.needAccount`, `partners.apply`). These two destinations do not exist yet.

Errors appear in the panel, above the button, and are announced to screen readers (`partners.errors.*`): missing fields, wrong credentials, a locked account, and a server that cannot be reached. The fields keep their values after an error; the password field is cleared and focused after wrong credentials. After a successful sign-in the visitor goes to the page that sent them here, or to the dashboard.

### Partner dashboard (`/partners`)

Reached only when signed in. Otherwise the visitor is sent to sign-in (already wired). Built for desktop, usable on a tablet.

1. A slim portal header with the logo, the partner's name and organisation (`partners.welcome`, `partners.organisation`), a link to the public site and the sign-out button (`partners.signOut`). It is not the public site header.
2. **Proposals** (`partners.proposalsTitle`): a table with reference, proposal title, site, submitted date, last update, amount in SAR, status label and next step (`partners.columns.*`). A new-proposal button (`partners.newProposal`) sits above the table; it does not do anything yet.
3. Status labels (`partners.status.*`): draft, submitted, under review, more information needed, approved, not approved. Each label has distinct text and a different shape or icon as well as colour. A row with "more information needed" stands out because the partner has to act.
4. Proposals can be sorted by date and filtered by status.
5. Loading, empty (`partners.proposalsEmpty`) and error (`partners.loadFailed`, with a try-again action) states.

### Page not found

Title, short text and a link to Home (`notFound.*`). It uses the normal header and footer.

## Accounts for review

Sign-in works with `partner@example.sa` and password `Turath#2026`. The other cases (wrong password, locked account) are listed in the README.

## Out of scope for now

Real maps, real photography, the legal pages, forgot-password, ask-to-join and the new-proposal form. Leave a clean place for each.
