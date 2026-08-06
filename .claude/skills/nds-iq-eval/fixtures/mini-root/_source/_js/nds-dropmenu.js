/* NDS.Dropmenu — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Dropmenu.init() / .reinit()      scan + initialize dropmenu wrappers
 *   NDS.Dropmenu.create(el)              instance one .nds-dropmenu wrapper
 *   NDS.Dropmenu.from(el)                resolve owning wrapper from any inner el — portal-aware
 *   NDS.Dropmenu.menuOf(dropmenu)        resolve menu el — works nested or portaled to <body>
 * Events (bubble from the .nds-dropmenu wrapper):
 *   nds:dropmenu:prepare   detail {dropmenu, trigger, menu, isOpen} — before lazy content builds
 *   nds:dropmenu:opened    detail {dropmenu, trigger, menu, isOpen}
 *   nds:dropmenu:closed    detail {dropmenu, trigger, menu, isOpen}
 *   nds:dropmenu:selected  detail {dropmenu, item, value}
 * Hooks:
 *   data-portal · data-anchor · data-anchor-cursor · data-position-vertical · data-delay
 *   data-no-auto-close · data-dropmenu-no-click · data-dropmenu-no-keys · data-dropmenu-primary
 *   data-search · data-search-empty · data-search-item · data-search-value
 *   data-select-name · data-select-value · data-required · data-trigger-label · data-value
 * Gotchas:
 *   - Portaled menus leave the DOM ancestry: use from()/menuOf(), not closest().
 *   - nds:dropmenu:prepare is the lazy-content hook; opened fires after placement.
 *   - data-position-vertical is written by the component (a CSS hook), never set it yourself.
 *   - Menus render in place by default: an ancestor with overflow or its own stacking
 *     context (a modal, a scrolling table wrapper, a transformed card) clips the open menu
 *     silently. The fix is data-portal on the wrapper — never overflow or z-index overrides;
 *     sizing knobs stay on the wrapper and survive the move.
 */
// fixture stub — the banner above is the surface under test; real logic lives in the template.
