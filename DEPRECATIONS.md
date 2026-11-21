# Deprecations — remove at the next major

Classes, attributes and JS APIs that still ship, only so work already written against them
keeps running. Each one is dead weight in the bundle and a second way to say the same thing,
which is how docs and agents drift. Remove the whole list in one major release, and put
every line in that release's Migrating section.

This file is build-excluded (`_config.yml`). It is not cleared at a release the way
`TODO.md` is — an entry leaves only when the class is actually gone.

**A second spelling is not debt.** Plenty of components answer to a class *and* an
attribute, or to a colour name *and* a semantic one — tags and featured icons both do, and
that dual API is a convenience worth keeping. A name earns a row here only when it is
**wrong**: it says something the component no longer does, or names a fixed colour for a
surface the theme controls. Count spellings and you will deprecate half the system.

## Deprecated

v2.0.0 cleared this list. Removed and renamed names live in `_data/migrations.yml`.

**A new deprecation gets a row in both places:** a row here, and a row in `_data/migrations.yml`
with `status: deprecated`, so the audit warns about it until the next major removes it.

| Class | Replacement | Deprecated in | Declared at |
|---|---|---|---|
| `.nds-primary` on `.nds-content-section` / `.nds-hero-section` | `data-theme="dark oncolor primary"` | 2.1.0 | `_sass/layout/_section.scss` (`&.nds-primary`, the text `:is()`), `_content-layout.scss` gutter + striping `:not()`, the three event packs' striping |
| `.nds-gradient-primary` on the same | `data-theme="dark oncolor primary gradient"` | 2.1.0 | `_section.scss` (`&.nds-gradient-primary`), `_variables-a11y.scss` HC gradient rule, same `:not()` lists |
| `.nds-neutral` on the same | `data-theme="dark neutral"` | 2.1.0 | `_section.scss` (`&.nds-neutral`), same `:not()` lists |
| `.nds-brand` on `.nds-content-section` / `.nds-hero-section` | `data-theme="primary"` | 2.1.0 | `_section.scss` (`&.nds-brand`), the gutter + striping `:not()` lists, the Hajj and Foundation Day `::after` rules |
| `.nds-brand` on `.nds-footer` | `data-theme="dark oncolor primary"` | 2.1.0 | `_footer.scss` (`.nds-footer:is(.nds-brand)` with its hand-copied on-color knobs, DUPE-02; `&:not(.nds-brand, …)`), `--background-footer` |

## Needs an owner call — two live names for one thing

Neither is marked deprecated. Pick the survivor before the next major, then the loser moves
to the table above. Empty.

## Finding the next one

An alias pair shows up as a bare two-class `:is()` — the old name and the new one routed
to the same rule. Scan for `:is()` groups whose parts are all bare `.nds-` classes, then
read the ones where both names mean the same thing.

## Removal checklist

1. Delete the alias from the selector, not the whole rule — the canonical name stays.
2. `grep` the repo for the dead name: `_sass`, `_js`, `_includes`, `_layouts`, doc pages,
   `examples/`, `templates/`, `_data/`.
3. Rebuild and confirm the name appears in no bundle.
4. Set its `_data/migrations.yml` row to `removed` or `renamed`, and add one Migrating line
   per class: the dead name, the replacement, and where the canonical markup lives.
