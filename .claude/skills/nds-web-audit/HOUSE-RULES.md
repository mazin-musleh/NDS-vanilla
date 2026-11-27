# House rules: where NDS wins over the guides

A guide point that matches a row here is **not a finding**. Drop it silently, unless the row's "reopen when" has come true. Then report it once, as a question.

The guides assume a greenfield app. NDS is a shipped design system with measured decisions, so most clashes are on purpose. The general rules (AGENTS.md, `_sass/sass.md`, `_js/js.md`) always win. This file lists only the ones the guides keep pushing against.

## General

| Guide says | NDS does | Why | Reopen when |
|---|---|---|---|
| Use `:has()` | Avoids it | Last resort, never on a critical path (style recalc cost) | Never as a default |
| Baseline-newly features with no fallback | Degrade, never break | No browser floor | — |
| Change the markup (`<details name>`, `<progress>`, `command=`, `switch` attr, single OTP input) | Keeps the markup | Consumer markup is a production contract | A major release: file it for the major |
| Fluid `clamp()` type | Fluid only where scoped | No blanket clamp | — |
| `structuredClone()` | `JSON.parse(JSON.stringify())` | Older browsers, on purpose | — |
| Swap working code for a newer JS feature (`Promise.withResolvers`, `toReversed`, `AbortSignal.timeout`) | Keeps the code | No browser floor, no measured gain | Baseline widely + a real gain |
| `el.replaceChildren()` over `innerHTML = ''` | Keeps innerHTML | Marginal; NDS writes innerHTML templates, so Trusted Types is not a goal | NDS adopts Trusted Types |
| Load a polyfill from a CDN (esm.sh) | Never | CSP posture and no third-party runtime fetch | — |

## Overlays

| Guide says | NDS does | Why | Reopen when |
|---|---|---|---|
| `showModal()` | `show()` + `popover="manual"` + custom `inert` | `showModal()` cost ~300 ms on phones (nds-dialog.js Gotchas) | Re-measure shows the cost is gone |
| `closedby="any"`, invokers (`command=`) | Own outside-click handler, `data-modal-target` | The handler already covers light dismiss on `show()` dialogs; invokers change consumer markup | A major |
| No body `overflow:hidden` / `position:fixed` | `NDS.scrollLock` | Also serves Backdrop owners (nav, side menu); `overscroll-behavior` alone fails on Safari | — |
| `@starting-style` + `overlay` animation | `data-state` + timer | WebKit lacks `overlay` (plans/top-layer.md) | WebKit ships `overlay` |
| CSS-only anchor flip (`position-try`) | JS flip math kept | Firefox lacks anchor positioning; would be a second code path | Firefox ships it |
| No toasts over a modal | Toasts sit above modals (`data-nds-above`) | Product call | — |
| `interestfor`, `focusgroup` | Not used | Chrome only | Baseline widely |

## Forms

| Guide says | NDS does | Why | Reopen when |
|---|---|---|---|
| `appearance: base-select` select | Own Custom Select component | Deliberate component; no browser floor | — |
| `:user-invalid` validation | `novalidate` + NDS JS validation | Custom messages and the rule pipeline | — |
| Never split OTP into boxes | Segmented boxes | Markup contract | A major |
| `field-sizing: content` | Not used | Baseline only since 2026-06 | Baseline widely + a need |

## Dates

| Guide says | NDS does | Why | Reopen when |
|---|---|---|---|
| Temporal API | `Intl` + `islamic-umalqura` in `nds-date.js` | Safari lacks Temporal; NDS code already handles calendars and Android ICU month names | Temporal is Baseline widely |

## Components

| Guide says | NDS does | Why | Reopen when |
|---|---|---|---|
| Follow the OS dark preference by default | Light by default | Product call | — |
| Scroll-driven fades and `scroll-state` queries | Existing JS (`nds-scroll-more`) | Needs a fallback anyway; no gain | — |
