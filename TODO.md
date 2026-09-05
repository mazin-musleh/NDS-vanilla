# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.


Cleared at the 1.12.0 release (2026-09-05). That release shipped the swiper loop with inline slide and peek knobs and the one-gap gutter, the Safari batch (iPhone icons, modal height, `NDS.request` without `AbortSignal.any`, the code lexer, RTL track pinning), state-styles-its-host across `data-state` and `data-status` with the release guard, the scroll lock and mainnav minimal mode off `<body>`, the closed-menus revert, one breakpoint truth for SCSS and JS, the tooltip move to the delegated bundle, the HGI face in crit, the paged-skeleton fixes and the reduced-motion sweep. Detail is in `CHANGELOG.md`.

## Open

- **`.nds-section-shape` — decide: document it or delete it.** Added 2026-03-04 (`1a8b7439`) alongside the hero-slider custom-content work, and used by nothing since: zero hits outside its own three lines in `_sass/layout/_section-layout.scss` (the `--section-shape-size` knob at :17, the sizing rule at :109). No doc page names it, so consumers cannot find it either.

  It also has a live layout bug. The title is `display: flex` + `flex-wrap: wrap`, so the text is one anonymous flex item; once that item's max-content width exceeds the line, the shape is pushed to a flex line of its own and orphans below the title, start-aligned. `.nds-center` escapes it — that variant switches the title to `flex-direction: column`, which stacks the shape on purpose and reads correctly. Deleting `flex-wrap: wrap` keeps the shape beside the wrapped text block (`align-items: center` already handles the vertical centering); making the title non-flex with an `inline-block` shape instead trails it off the last line. Both were reasoned from the box model, neither was verified in a browser — check visually before picking. Demos for all four cases (short title, long title, `.nds-full`, `.nds-center`) are already sitting in `playground.md`.

  Deleting is the cheaper answer if nothing wants it: 5 lines and a knob, no consumers, no docs, so no migration note.
