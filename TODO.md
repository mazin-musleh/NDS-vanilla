# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.


Cleared at the 1.12.0 release (2026-09-05). That release shipped the swiper loop with inline slide and peek knobs and the one-gap gutter, the Safari batch (iPhone icons, modal height, `NDS.request` without `AbortSignal.any`, the code lexer, RTL track pinning), state-styles-its-host across `data-state` and `data-status` with the release guard, the scroll lock and mainnav minimal mode off `<body>`, the closed-menus revert, one breakpoint truth for SCSS and JS, the tooltip move to the delegated bundle, the HGI face in crit, the paged-skeleton fixes and the reduced-motion sweep. Detail is in `CHANGELOG.md`.

## Open

- **`.nds-section-shape` — decide: document it or delete it.** Added 2026-03-04 (`1a8b7439`) alongside the hero-slider custom-content work, and used by nothing since: zero hits outside its own three lines in `_sass/layout/_section-layout.scss` (the `--section-shape-size` knob at :17, the sizing rule at :109). No doc page names it, so consumers cannot find it either.

  It also has a live layout bug. The title is `display: flex` + `flex-wrap: wrap`, so the text is one anonymous flex item; once that item's max-content width exceeds the line, the shape is pushed to a flex line of its own and orphans below the title, start-aligned. `.nds-center` escapes it — that variant switches the title to `flex-direction: column`, which stacks the shape on purpose and reads correctly. Deleting `flex-wrap: wrap` keeps the shape beside the wrapped text block (`align-items: center` already handles the vertical centering); making the title non-flex with an `inline-block` shape instead trails it off the last line. Both were reasoned from the box model, neither was verified in a browser — check visually before picking. Demos for all four cases (short title, long title, `.nds-full`, `.nds-center`) are already sitting in `playground.md`.

  Deleting is the cheaper answer if nothing wants it: 5 lines and a knob, no consumers, no docs, so no migration note.

- **`_swiper.scss` deck — PERF-06 tag tail under `[data-status]`.** `.nds-swiper-card[data-status="active"] img` (`_sass/components/_swiper.scss:508`) fails `scripts/check-data-state-tails.py`, which fails `scripts/check-release-guards.py` and blocks the release gate. Landed 2026-09-07 in `86ffabb8` with the deck motion work. Chrome keys attribute invalidation by attribute NAME, so this one rule puts every `<img>` in the document into a single `data-status` invalidation set.

  Fix is the documented host pattern, folded into the `&[data-status="active"]` block that is already there, so the violating selector disappears rather than moving: declare `--_img-x: translateX(calc(var(--_dir) * (var(--_card) - var(--_strip))))` on `.nds-swiper-card`, set `--_img-x: none` inside the active block, and give `img` `transform: var(--_img-x)`. Net −3 lines, no markup change, and the value the image inherits computes the same as today. A `.nds-swiper-card-img` class would also pass the check, but it needs the class in authored markup — a contract change for no gain.

  Verify by building and eyeballing the deck demo (it touches deck motion), then re-run `check-data-state-tails.py`.

- **NDS IQ — line 191 still tells the dev to add an accessibility `<script>` tag.** `_includes/NDS-IQ.md:191` reads "`nds-main.min.js`, plus `nds-accessibility.min.js` when its panel remains". That tag no longer exists: the loader registers Accessibility `lazy` and fetches the bundle on the first FAB press, so the clause should just end at `nds-main.min.js`. A dev following it today adds a tag that loads the panel eagerly — the exact cost the lazy tier removes.

  Held back on purpose rather than shipped with the loader change: edits batch near a release so main's copy does not drift ahead of the latest published template, and a rules edit wants a scoped `nds-iq-eval` run before it is called done. Line 197's "accessibility panel and its FAB" in the chrome list stays — the FAB is still markup the dev copies.

  When it lands: drop the clause (−141 chars, the trajectory-is-DOWN direction), bump the heading's display revision to `instructions v3.1` — v3.0 is already pushed to main, so the next edit is the first after publication — and run `nds-iq-eval` scoped. Both guides derive their version chip from that heading, so they follow automatically.
