/* NDS.Multiselect — public surface
 * Rides: nds-dropmenu (portal, positioning, search, auto-close knobs; soft — works without it)
 *      · nds-forms (required + min/max validation, disabled state)
 * Methods:
 *   NDS.Multiselect.init() / .reinit()   scan + initialize .nds-multiselect fields
 *   NDS.Multiselect.create(el)           instance one field (reuses an existing instance)
 *   NDS.Multiselect.destroy(el)          tear one field down
 *   instance.populate(options, selected) rebuild the option set at runtime
 * Events (bubble from .nds-multiselect):
 *   nds:multiselect:change   detail {name, values, labels} — on every commit
 * Hooks:
 *   data-multiselect-name · data-multiselect-options · data-multiselect-selected
 *   data-multiselect-action="apply|reset" · data-multiselect-dropmenu · data-multiselect-chips
 *   data-chip-class
 * Gotchas:
 *   - The checkboxes are the form carrier — no hidden inputs; read them, not the chips.
 *   - Default commit is instant; a [data-multiselect-action="apply"] button switches the
 *     field to staged mode, where closing without Apply reverts the checkboxes.
 */
// fixture stub — the banner above is the surface under test; real logic lives in the template.
