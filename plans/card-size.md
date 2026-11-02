# Card size — plan

Status (2026-11-02): built. `tmp/card-snap.mjs` before/after on 151 pages at 1280 and 360px: 0 rows differ. `tmp/card-probe.mjs` checks each case (own class, list, nested card, knob, modal, phone gap).

## Why

A small or large card existed only inside a List: `card-sm` / `card-lg` reached items through `.nds-list.nds-sm > .nds-card`. A single card had to size each part by hand, and no other container could pass a size down.

## Decided (owner, 2026-11-02)

- **Steps travel by inheritance, as a card sizes its parts.** The card keeps its defaults in the fallback slot (`var(--card-gap, var(--_card-gap-base, default))`), so a step set on any ancestor reaches it.
- **Precedence:** a knob > the card's own size class > a container's step > the default.
- **Card classes:** `.nds-card.nds-sm`, `.nds-md`, `.nds-lg`. Not on Modal (width), Definition List or Stepper: their size classes are their own.
- **Container API, NDS only:** `@include card-sm` / `card-md` / `card-lg` on the container. First user: List. Consumers use the card classes, List, or a `--card-*` knob on any ancestor; no wrapper class.
- **Steps stop at a nested card and a nested list,** as the knobs do.
- **The phone gap step** sits in the default slot, so a container's step still wins on phones.
- **One icon ladder for card and List: LG (48px) is MD's icon** (owner, 2026-11-02). SM = 40, LG = 56. List icons grew 40 → 48.
- **The card's part defaults are its canon's** (icon LG, avatar XL, tags and stars SM), in each part's `-default` slot, on the card's header and content only: a part a card merely wraps (a doc frame's demo) and Modal, Definition List and Stepper keep the part's own size. The canons dropped those size classes, which blocked the steps. Part MD mixins are explicit, since `initial` would fall to the card default.
- A component that writes a card value on its own element (Accordion, Tabs panel, Metric) now keeps it inside a sized list.

## Check

`tmp/card-snap.mjs`: every card part's size on every page at 1280 and 360px, before and after.
