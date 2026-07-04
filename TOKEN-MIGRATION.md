# Token Migration Reference — v1.2.0 → v1.3.0

v1.3.0 restructures the design-token layer to enforce the four-tier naming grammar.

**Who is affected:** only consumers who **override or reference NDS token custom properties** in their own CSS. If you use NDS as-is (the built bundle, its classes and components), nothing changes — component output is identical.

Values are unchanged unless noted; these are renames and removals, not visual changes.

---

## 1. Numeric scale rungs removed → use size names

**Spacing** — `--spacing-{number}` rungs are gone; use the t-shirt names:

| Removed | Use | Removed | Use |
|---|---|---|---|
| `--spacing-0` | `--spacing-none` | `--spacing-6` | `--spacing-3xl` |
| `--spacing-0-5` | `--spacing-xxs` | `--spacing-8` | `--spacing-4xl` |
| `--spacing-1` | `--spacing-xs` | `--spacing-10` | `--spacing-5xl` |
| `--spacing-1-5` | `--spacing-sm` | `--spacing-12` | `--spacing-6xl` |
| `--spacing-2` | `--spacing-md` | `--spacing-16` | `--spacing-7xl` |
| `--spacing-3` | `--spacing-lg` | `--spacing-20` | `--spacing-8xl` |
| `--spacing-4` | `--spacing-xl` | `--spacing-24` | `--spacing-9xl` |
| `--spacing-5` | `--spacing-2xl` | `--spacing-32` | `--spacing-10xl` |
| | | `--spacing-40` | `--spacing-11xl` |

The old numeric names were a ×4px index (`--spacing-N` = N × 4px). The named ladder stops at `--spacing-11xl` (160px), so rungs above `--spacing-40` — `--spacing-48` (192px) through `--spacing-480` (1920px) — have no named equivalent; set an explicit length.

**Radius** — `--radius-{number}` removed:

| Removed | Use |
|---|---|
| `--radius-0` | `--radius-none` |
| `--radius-2` | `--radius-xs` |
| `--radius-4` | `--radius-sm` |
| `--radius-8` | `--radius-md` |
| `--radius-16` | `--radius-lg` |
| `--radius-24` | `--radius-xl` |
| `--radius-9999` | `--radius-full` |

**Width** — the generic `--width-{xxs…6xl}` scale is removed entirely. Element widths are now meaning-named knobs (e.g. `--nds-sidemenu-width`). Set an explicit width or the component's own width knob.

## 2. Alpha alias layer removed → use palette alphas

The `--alpha-*` tier is gone; reference the palette directly:

| Removed | Use |
|---|---|
| `--alpha-black-{0…100}` | `--colors-alpha-black-{n}` |
| `--alpha-white-{0…100}` | `--colors-alpha-white-{n}` |
| `--alpha-primary-{10,20}` / `--alpha-info-{10,20}` | `--colors-blue-alpha-{n}` |
| `--alpha-success-{10,20}` | `--colors-green-alpha-{n}` |
| `--alpha-warning-{10,20}` | `--colors-yellow-alpha-{n}` |
| `--alpha-error-{10,20}` | `--colors-red-alpha-{n}` |

## 3. Semantic tokens — color-named & shade-numbered removed

| Removed | Use | Note |
|---|---|---|
| `--background-brand-light` | `--background-primary-light` | rename (brand→primary) |
| `--background-brand-strong` | `--background-primary-strong` | rename |
| `--background-white` | `--colors-base-white` | |
| `--background-black` | `--colors-base-black` | |
| `--background-{primary,success,info,warning,error}-25` | `--background-{…}-faint` | rename (`-25`→`-faint`) |
| `--background-primary-50` | `--background-primary-light` | |
| `--background-{secondary,tertiary}-25/50` | `--colors-{secondary,tertiary}-25/50` | no semantic twin |
| `--background-primary-200/300/400` | `--colors-primary-200/300/400` | |
| `--background-neutral-25/50/100/200/300/400/800/900` | `--colors-neutral-{n}` | `--background-neutral-light` kept |
| `--text-black` | `--text-default` | same value |
| `--text-brand` | `--text-primary` | was an alias |
| `--icon-default-400/500` | `--colors-neutral-400/500` | |
| `--icon-primary-400` | `--colors-primary-400` | |

## 4. Border tokens

| Removed | Use | Note |
|---|---|---|
| `--border-white-40` | `--border-oncolor` | new token, same value (translucent border on colored fills) |
| `--border-white` | `--colors-base-white` | |
| `--border-black` | `--colors-base-black` | |
| `--border-transparent-10` | `--colors-alpha-white-10` | |
| `--border-oncolor-transparent-30` | `--colors-alpha-white-30` | |
| `--border-background-white` | `--border-neutral-tertiary` | same value (neutral-100) |
| `--border-background-neutral` | `--border-neutral-primary` | same value (neutral-300) |

## 5. Component tokens renamed

| Removed | Use |
|---|---|
| `--button-background-black-{default,hovered,pressed,selected}` | `--button-background-neutral-{…}` |
| `--rating-star-{normal,hovered,pressed,selected}-{brand,default}` | `--rating-star-{brand,default}-{default,hovered,pressed,selected}` (`normal`→`default`; variant and state order swapped) |
| `--featuredicons-background-brand-light` | `--featuredicons-background-primary-light` |
| `--table-cell-h-padding` / `--table-cell-v-padding` | `--table-cell-padding-inline` / `--table-cell-padding-block` |
| `--tab-horizontal-tab-md-button-h-padding` / `-v-padding` | `--tab-button-padding-inline` / `--tab-button-padding-block` |
| `--progressindicator-progress-indicator-gap` | `--stepper-indicator-gap` |
| `--progressindicator-progress-text-content-side-padding` | `--stepper-text-padding` |
| `--control-disabled` | `--controls-disabled` |

New tokens: `--button-background-secondary-*`, `--button-indicator-{default,pressed,primary,selected}`.

## 6. Removed with no replacement

Unimplemented `--controls-*` state tokens dropped (no consumers): `--controls-primary`, `--controls-primary-focused`, `--controls-primary-readonly`, `--controls-neutral-focused`, `--controls-pressed`, `--controls-icon-hovered`, `--controls-icon-pressed`. Also `--icon-text-gap`, `--text-content-gap` (consolidated).
