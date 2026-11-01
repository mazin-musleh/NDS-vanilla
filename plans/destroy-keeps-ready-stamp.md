# destroy() on a live element brings back the loading skeleton

Found 2026-11-01 by `/nds-js-audit nds-accordion.js architecture` (Gap, owner call).

## Problem

`destroy()` removes the component's `data-nds-<name>-initialized` stamp so a later
`init()` / `reinit()` rebuilds it (commit 14dbfda0 for Accordion, "mirror the shape
already used by Filter/Pagination/Upload"). The same stamp is the CSS pre-init gate:
`:not([data-nds-<name>-initialized])` paints the skeleton or holds the element hidden.

So a consumer who calls `destroy()` and leaves the markup on the page gets the
skeleton back over real content. Accordion's doc says the opposite:
"The markup stays as it is, and the open items stay open" (`components/accordion.md`
destroy rows). A host that removes the node right after destroy never sees it, which is
why nothing in the repo caught it.

## Reach — destroy removes the stamp AND a CSS rule gates on it

Confirm each before changing it (grep `:not([data-nds-<name>-initialized])` in `_sass/`):

- accordion (`_accordion.scss` skeleton, L239; transition gate L105)
- breadcrumb, filter, pagination, stepper, swiper

Not affected (destroy keeps the stamp, or no CSS gate): tabs, toc, tooltip, and the
rest of the `removeAttribute(...initialized)` list (autocomplete, chart, drawer,
dropmenu, editor, expandable, multiselect, otp, password, scroll-more, sideinfo, sort).

## Fix (recommended): the stamp means "revealed", the instance means "live"

1. `destroy()` stops removing the stamp. The element stays revealed.
2. Each `init()` sweep decides "already live" from the instance (the `el.ndsAccordion`
   backref, the module WeakSet, the instances map) — never from the attribute.
   Accordion: `setupAccordions` drops the `hasAttribute` check; the backref check
   above it already covers the rAF race its comment describes.
3. Re-create on a stamped root: `_setupInitialState` writes the state the DOM already
   has, so nothing animates. Check the same for each component (swiper clones,
   pagination rebuild).

Rejected: a second attribute (one for the CSS gate, one for the init guard). Two names
for one fact; the instance already says "live".

## Observable change → Migration line

The stamp now stays after `destroy()`. A consumer selector like
`:not([data-nds-accordion-initialized])` used to detect "destroyed" stops matching.
Unlikely, but it is a `data-*` the script writes: one Migration line per component, and
the docs' destroy rows say the stamp stays.

## Order

One component per commit, Accordion first (its doc already promises the right
behavior). Per commit: browser check — destroy on a live element shows content, not
the skeleton; destroy → create → click works; reinit after destroy rebuilds.
