/* NDS.Sort — public surface
 * Rides: nds-dropmenu (triggers may sit inside a menu; soft), nds-pagination (a markup-wired paged list repages after a sort; soft)
 * Methods:
 *   NDS.Sort.init()                     wire every list a [data-sort-target] button names
 *   NDS.Sort.refresh(root)              wire new lists, re-sort the wired ones inside root
 *   NDS.Sort.create(root, options)      factory → instance (one per root, reused)
 *   NDS.Sort.destroy(root)              undo create()
 *   NDS.Sort.getInstance(rootOrSel)     the existing instance, or null
 *   NDS.Sort.detectType(sampleValues, dateFormat, calendar)   'number' | 'date' | 'string'
 *   NDS.Sort.parseValue(raw, type, dateFormat, calendar)      pure helper
 *   NDS.Sort.compare(a, b, type, order, dateFormat, calendar)   pure helper
 *   instance.setSort(key, order)        sort now (null key resets to the authored order)
 *   instance.reset()                    back to the authored order
 *   instance.refresh()                  re-run the active sort over the items as they stand
 *   instance.getState()                 {key, order}
 *   instance.root / .options            read-only: the sorted list, the resolved options
 *   instance.hasMarkupTriggers          true when [data-sort-target] buttons drive it, not a Filter or a Table
 *   instance.destroy()
 * Events (bubble from the root):
 *   nds:sort:change   detail {key, order, orderedItems, sort}
 * Hooks:
 *   data-sort          the key, on a trigger
 *   data-sort-order    the order that trigger fixes (direct mode)
 *   data-sort-<key>    the value to sort by, on each item (the default accessor)
 *   data-sort-target   the id of the list a trigger sorts — markup wiring, no create()
 *   data-sort-mode     "cycle" on any of a list's triggers picks cycle mode
 *   data-state         sorted-asc | sorted-desc on the state host (a11yTarget in
 *                      a11y 'sort', else the trigger). Authored, it seeds the state.
 * Gotchas:
 *   - Auto-detect reads a date in the root's nearest data-date-format and data-calendar (NDS.Date),
 *     or a Gregorian YYYY-MM-DD.
 *     Other date text sorts as text: write YYYY-MM-DD in the sort attribute.
 *   - Markup wiring sorts the list's children with the defaults. types, accessor, urlSync
 *     and onChange need create(). Filter and Tables create their own, and init() skips a
 *     list that already has an instance.
 *   - The options object IS the API: items, triggers, reorderIn, accessor, keyFrom,
 *     mode ('direct' | 'cycle'), a11y ('pressed' | 'sort' | 'none'), a11yTarget, types,
 *     initialState, urlSync, onChange.
 *   - A selector string resolves INSIDE the root — pass a function for elements outside it.
 *   - Sorting re-appends the nodes, so listeners and element state survive. Items that
 *     arrive later need refresh().
 *   - Sorting is CLIENT-SIDE: it reorders the DOM it was handed and never re-fetches.
 *     Use it only when the page holds every matching row. If the server pages the
 *     results it must sort them too — author no triggers at all and let the consumer
 *     send its own sort param; see nds-filter's form-mode gotcha for that shape.
 *   - In direct mode a trigger with no data-sort-order always applies asc; it does NOT
 *     toggle. Ship the asc/desc pair, or a lone trigger looks dead after the first click.
 */
/**
 * NDS Sort Component
 * DOM-reorder sort for any collection of sibling elements. Consumed by Filter
 * (direct-select dropmenu buttons) and Tables (3-way cycle column headers).
 *
 * Triggers, a11y target, and value accessor are provided by the consumer, so
 * the same engine serves both widgets without copy-pasted comparator logic.
 *
 * Public API:
 *   NDS.Sort.create(root, options)      — factory → NdsSort instance
 *   NDS.Sort.getInstance(root)          — retrieve existing instance
 *   NDS.Sort.detectType(sampleValues, dateFormat, calendar)   — pure helper
 *   NDS.Sort.parseValue(raw, type, dateFormat, calendar)      — pure helper
 *   NDS.Sort.compare(a, b, type, order, dateFormat, calendar)   — pure helper
 *
 * Options (passed to create):
 *   items          — selector | NodeList | Array | () => NodeList  (required)
 *   reorderIn      — Element (parent to re-append into); default: items[0].parentElement
 *   triggers       — selector for clickable elements inside `root` (required)
 *   accessor       — (item, key) => raw value; default: item.getAttribute('data-sort-' + key)
 *   keyFrom        — (trigger) => key; default: trigger.getAttribute('data-sort') || ''
 *   mode           — 'direct' | 'cycle'   default: 'direct'
 *                      direct : each trigger fixes its own (key, order) pair; empty key resets
 *                      cycle  : same trigger toggles asc → desc → reset across three clicks
 *   a11y           — 'pressed' | 'sort' | 'none'   default: 'pressed'
 *                      pressed: aria-pressed on trigger + data-state="selected"
 *                      sort   : aria-sort on a11yTarget + data-state="active" on trigger
 *   a11yTarget     — (trigger) => Element that carries aria-sort   default: trigger.closest('th')
 *   types          — { [key]: 'number' | 'date' | 'string' } overrides for auto-detect
 *   initialState   — { key, order } | null to seed state without reordering (HTML pre-sorted)
 *   urlSync        — false | { keyParam, orderParam } — read at init, write on change
 *   onChange       — ({ key, order, orderedItems, state }) => void
 *
 * Event: dispatches `nds:sort:change` on `root` with detail { key, order, orderedItems, sort }.
 */
(function() {
    'use strict';

    // ── Pure helpers (also exposed under NDS.Sort) ──────────────────────

    // Treat key=0 (column index) as present; only null/undefined/'' mean "no key → reset".
    function isKeySet(key) {
        return key !== null && key !== undefined && key !== '';
    }

    function unwrapNumber(text) {
        // Strip thousands separators/whitespace, then read leading number; handles "9,375 SAR"
        const cleaned = String(text).replace(/[,\s]/g, '');
        const match = cleaned.match(/^-?[\d.]+/);
        return match ? parseFloat(match[0]) : NaN;
    }

    const ISO = /^\d{4}-\d{2}-\d{2}T/;   // ISO 8601 with a time
    // Digits joined by / or : are a date or a time: never a number ("12/31/2026" is not 12).
    const DATE_LIKE = /\d\s*[\/:]\s*\d/;

    // A day in `format` and `calendar` (default: the site's) or YYYY-MM-DD, as local midnight; NaN otherwise.
    function parseDay(text, format, calendar) {
        const date = NDS.Date.parse(text, { format, calendar }) || NDS.Date.parse(text, { format: 'YYYY-MM-DD' });
        return date ? date.getTime() : NaN;
    }

    // new Date() last: ISO with a time, and a column create() forces to 'date'.
    function parseDateTime(text, format, calendar) {
        const trimmed = String(text).trim();
        const time = parseDay(trimmed, format, calendar);
        return isNaN(time) ? new Date(trimmed).getTime() : time;
    }

    function isDateString(text, format, calendar) {
        const trimmed = String(text).trim();
        // Not Date.parse alone: it also takes "1995" and "Item 2"
        return ISO.test(trimmed) ? !isNaN(new Date(trimmed).getTime()) : !isNaN(parseDay(trimmed, format, calendar));
    }

    function detectType(sampleValues, dateFormat, calendar) {
        const values = (sampleValues || []).filter(value => value !== null && value !== undefined && value !== '');
        if (!values.length) return 'string';

        // Date check wins over number: "2026-03-15" has a leading digit sequence
        // that unwrapNumber would greedily accept (parseFloat stops at the dash),
        // so every same-year row would collapse to the same numeric value.
        let dates = 0, numbers = 0;
        for (let i = 0; i < values.length; i++) {
            if (isDateString(values[i], dateFormat, calendar)) dates++;
            else if (!DATE_LIKE.test(values[i]) && !isNaN(unwrapNumber(values[i]))) numbers++;
        }
        if (dates === values.length) return 'date';
        if (numbers === values.length) return 'number';
        return 'string';
    }

    function parseValue(raw, type, dateFormat, calendar) {
        if (type === 'number') {
            const number = unwrapNumber(raw);
            return isNaN(number) ? 0 : number;
        }
        if (type === 'date') {
            const time = parseDateTime(raw, dateFormat, calendar);
            return isNaN(time) ? 0 : time;
        }
        return String(raw == null ? '' : raw);
    }

    // One collator: localeCompare with options builds a new one on every call.
    let collator;
    function compareParsed(leftValue, rightValue, type) {
        if (type !== 'string') return leftValue - rightValue;
        collator ||= new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        return collator.compare(leftValue, rightValue);
    }

    function compare(left, right, type, order, dateFormat, calendar) {
        const comparison = compareParsed(parseValue(left, type, dateFormat, calendar), parseValue(right, type, dateFormat, calendar), type);
        return order === 'desc' ? -comparison : comparison;
    }

    // ── Instance ─────────────────────────────────────────────────────────

    class NdsSort {
        constructor(root, options) {
            this.root = root;
            this.options = Object.assign({
                mode: 'direct',
                a11y: 'pressed',
                a11yTarget: (trigger) => trigger.closest('th'),
                accessor: (item, key) => item.getAttribute('data-sort-' + key),
                keyFrom: (trigger) => trigger.getAttribute('data-sort') || '',
            }, options || {});

            this.abortController = new AbortController();
            this._state = { key: null, order: null };
            this._originalOrder = null;

            this.init();
        }

        init() {
            this._originalOrder = [...this._resolveItems()];
            this._addTriggerListeners();

            // A sort in the URL wins over the markup's: a shared link opens as it was shared.
            const urlKey = this.options.urlSync && this._getUrlKey();
            if (isKeySet(urlKey)) {
                this.setSort(urlKey, new URLSearchParams(window.location.search).get(this.options.urlSync.orderParam));
                return;
            }

            // Seed state without reordering — used when HTML arrives pre-sorted
            const seed = this.options.initialState || this._readSeed();
            if (seed && seed.key != null) {
                this._state = { key: seed.key, order: String(seed.order).toLowerCase() === 'desc' ? 'desc' : 'asc' };
            }

            this._render();
        }

        // The state host carries sorted-asc / sorted-desc: the header cell in
        // a11y 'sort' (it carries aria-sort too), else the trigger itself.
        _getStateHost(trigger) {
            return (this.options.a11y === 'sort' && this.options.a11yTarget?.(trigger)) || trigger;
        }

        _readSeed() {
            for (const trigger of this._resolveTriggers()) {
                const host = this._getStateHost(trigger);
                const order = NDS.state.has(host, 'sorted-asc') ? 'asc'
                          : NDS.state.has(host, 'sorted-desc') ? 'desc' : null;
                if (order) return { key: this.options.keyFrom(trigger), order };
            }
            return null;
        }

        // ── Item / container resolution ──────────────────────────────────

        // Shared dispatch for the flexible `selector | NodeList | Array | () => NodeList`
        // shape that both `options.items` and `options.triggers` accept.
        _resolveLike(src) {
            if (typeof src === 'function') return Array.from(src() || []);
            if (typeof src === 'string') {
                const found = Array.from(this.root.querySelectorAll(src));
                if (!found.length) this._warnOutOfScope(src);
                return found;
            }
            if (src && typeof src.length === 'number') return Array.from(src);
            return [];
        }

        // A selector that matches elsewhere on the page but nothing inside the root
        // is always a scoping mistake, never an intended empty state — so it is worth
        // saying out loud. An empty list whose selector matches nowhere stays silent.
        // Once per selector: _resolveTriggers runs on every render.
        _warnOutOfScope(src) {
            if (this._warnedSelectors && this._warnedSelectors.has(src)) return;
            if (!document.querySelector(src)) return;
            this._warnedSelectors = this._warnedSelectors || new Set();
            this._warnedSelectors.add(src);
            console.warn(`NDS Sort: "${src}" matches elements on the page but none inside the root — `
                + 'a selector string resolves inside the root. Pass a function for elements outside it.', this.root);
        }

        _resolveItems() {
            return this._resolveLike(this.options.items);
        }

        _resolveContainer(items) {
            if (this.options.reorderIn) return this.options.reorderIn;
            return items[0]?.parentElement || null;
        }

        // ── Trigger resolution / wiring ──────────────────────────────────

        _resolveTriggers() {
            return this._resolveLike(this.options.triggers);
        }

        _addTriggerListeners() {
            const triggers = this._resolveTriggers();
            const { signal } = this.abortController;
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this._handleTrigger(trigger);
                }, { signal });
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this._handleTrigger(trigger);
                    }
                }, { signal });
            });
        }

        _handleTrigger(trigger) {
            const key = this.options.keyFrom(trigger);

            if (this.options.mode === 'cycle') {
                if (!isKeySet(key)) { this.setSort(null, null); return; }
                let nextOrder;
                if (this._state.key === key) {
                    // asc → desc → reset
                    nextOrder = this._state.order === 'asc' ? 'desc'
                            : this._state.order === 'desc' ? null
                            : 'asc';
                } else {
                    nextOrder = 'asc';
                }
                this.setSort(nextOrder ? key : null, nextOrder);
                return;
            }

            // direct mode
            if (!isKeySet(key)) { this.setSort(null, null); return; }
            this.setSort(key, this._triggerOrder(trigger));
        }

        // ── Apply / reset ────────────────────────────────────────────────

        setSort(key, order) {
            const items = this._resolveItems();
            const container = this._resolveContainer(items);
            const hasKey = isKeySet(key);

            // Anything but desc is asc: a hand-edited URL or a caller's typo never becomes the state.
            this._state = {
                key: hasKey ? key : null,
                order: hasKey ? (String(order).toLowerCase() === 'desc' ? 'desc' : 'asc') : null
            };

            if (!container || !items.length) {
                this._render();
                return;
            }

            // Items that arrive after init (async content) missed init()'s snapshot,
            // leaving it empty with no original order to restore. Take it on first
            // use instead — the DOM is still in its authored order until we sort.
            if (!this._originalOrder.length) this._originalOrder = [...items];

            let ordered;
            if (hasKey) {
                const raws = items.map(item => this.options.accessor(item, key));
                const dateFormat = NDS.Date.getFormat(this.root);
                const calendar = NDS.Date.getCalendar(this.root);
                const type = (this.options.types && this.options.types[key]) || detectType(raws, dateFormat, calendar);
                // Each value parsed once, not on every comparison.
                const values = raws.map(raw => parseValue(raw, type, dateFormat, calendar));
                const sign = this._state.order === 'desc' ? -1 : 1;
                ordered = items.map((item, index) => index)
                    .sort((left, right) => sign * compareParsed(values[left], values[right], type))
                    .map(index => items[index]);
            } else {
                // Drop snapshot entries the container no longer holds. appendChild
                // on a removed node re-attaches it, so restoring a stale snapshot
                // would resurrect deleted rows — and hold them detached until then.
                // Items that arrived since the snapshot follow it, in their current order.
                const snapshot = new Set(this._originalOrder);
                this._originalOrder = this._originalOrder.filter(el => container.contains(el))
                    .concat(items.filter(item => !snapshot.has(item)));
                ordered = [...this._originalOrder];
            }

            // Preserves listeners and element state — appendChild on an attached node moves it.
            ordered.forEach(item => container.appendChild(item));

            this._render();

            if (this.options.urlSync) this._writeUrl();
            if (typeof this.options.onChange === 'function') {
                this.options.onChange({ key: this._state.key, order: this._state.order, orderedItems: ordered, state: this.getState() });
            }

            this.root.dispatchEvent(new CustomEvent('nds:sort:change', {
                detail: { key: this._state.key, order: this._state.order, orderedItems: ordered, sort: this },
                bubbles: true
            }));
        }

        reset() { this.setSort(null, null); }

        // Re-run the active sort against the items as they stand now. Items that
        // arrive after create() — an async list, an AJAX swap — miss init()'s pass
        // entirely: a URL-seeded sort settles its state with nothing to sort, and
        // nothing re-applies it on its own. No-op when no sort is active.
        refresh() {
            if (!isKeySet(this._state.key)) return;
            // Read by the markup wiring's onChange: a re-sort of new rows keeps the user's page.
            this._refreshing = true;
            try {
                this.setSort(this._state.key, this._state.order);
            } finally {
                this._refreshing = false;
            }
        }

        getState() { return { key: this._state.key, order: this._state.order }; }

        // ── a11y / active render ─────────────────────────────────────────

        _render() {
            const triggers = this._resolveTriggers();
            const a11y = this.options.a11y;
            // Cleared in a pass of its own: two triggers can share one host.
            triggers.forEach(trigger => NDS.state.remove(this._getStateHost(trigger), 'sorted-asc', 'sorted-desc'));

            triggers.forEach(trigger => {
                const key = this.options.keyFrom(trigger);
                const orderAttribute = trigger.hasAttribute('data-sort-order') ? this._triggerOrder(trigger) : null;

                let isActive;
                if (this.options.mode === 'cycle') {
                    isActive = this._state.key !== null && this._state.key === key && this._state.order !== null;
                } else {
                    isActive = this._state.key !== null
                            && key === this._state.key
                            && (!orderAttribute || orderAttribute === this._state.order);
                }

                if (isActive && this._state.order) NDS.state.add(this._getStateHost(trigger), 'sorted-' + this._state.order);

                if (a11y === 'pressed') {
                    NDS.aria.pressed(trigger, isActive);
                    if (isActive) NDS.state.add(trigger, 'selected');
                    else NDS.state.remove(trigger, 'selected');
                } else if (a11y === 'sort') {
                    const target = this.options.a11yTarget ? this.options.a11yTarget(trigger) : null;
                    if (target) {
                        if (isActive && this._state.order) {
                            NDS.aria.sort(target, this._state.order === 'asc' ? 'ascending' : 'descending');
                        } else {
                            NDS.aria.sort(target, 'none');
                        }
                    }
                    if (isActive) NDS.state.add(trigger, 'active');
                    else NDS.state.remove(trigger, 'active');
                }
            });

            this._syncDropmenuTriggerIcon(triggers);
        }

        // When the triggers live inside a .nds-dropmenu, mirror the active trigger's
        // icon onto the dropmenu's own trigger button so the closed menu reflects the
        // current sort. Icon classes are copied verbatim, so authors can use any icon
        // set (NDS inline, HGI font, custom) without JS changes.
        _syncDropmenuTriggerIcon(triggers) {
            if (!triggers.length) return;
            const dropmenu = triggers[0].closest('.nds-dropmenu');
            if (!dropmenu) return;
            const triggerIcon = dropmenu.querySelector('.nds-dropmenu-trigger > i, .nds-dropmenu-trigger .nds-icon, .nds-dropmenu-trigger .hgi');
            if (!triggerIcon) return;

            const { key: activeKey, order: activeOrder } = this._state;
            const isDirect = this.options.mode === 'direct';

            const activeBtn = triggers.find(trigger => {
                const triggerKey = this.options.keyFrom(trigger);
                if (!isKeySet(activeKey)) return !isKeySet(triggerKey);
                if (!isDirect) return triggerKey === activeKey;
                return triggerKey === activeKey && (!trigger.hasAttribute('data-sort-order') || this._triggerOrder(trigger) === activeOrder);
            });

            const sourceIcon = activeBtn?.querySelector('i.nds-icon, i.hgi, i');
            if (sourceIcon) triggerIcon.className = sourceIcon.className;
        }

        // ── URL sync ─────────────────────────────────────────────────────

        // A trigger's order as written, in any case: anything but desc is asc.
        _triggerOrder(trigger) {
            return (trigger.getAttribute('data-sort-order') || '').toLowerCase() === 'desc' ? 'desc' : 'asc';
        }

        // Whether one of the triggers sorts by `key`. Another use of the same param
        // (a server's own sort select, a second sort on the page) is not this sort's.
        // String(): a keyFrom may return a column index, and the URL holds text.
        _isOwnKey(key) {
            return !!key && this._resolveTriggers().some(trigger => String(this.options.keyFrom(trigger)) === key);
        }

        // The trigger's own key, not the URL text, so a column index comes back a number.
        _getUrlKey() {
            const param = new URLSearchParams(window.location.search).get(this.options.urlSync.keyParam);
            const trigger = param && this._resolveTriggers().find(trigger => String(this.options.keyFrom(trigger)) === param);
            return trigger ? this.options.keyFrom(trigger) : null;
        }

        // Clears only values this sort could have written, so a site's own ?order=12345 survives.
        _writeUrl() {
            const params = new URLSearchParams(window.location.search);
            const { keyParam, orderParam } = this.options.urlSync;
            const ownOrder = /^(asc|desc)$/i.test(params.get(orderParam) || '');

            if (isKeySet(this._state.key)) {
                params.set(keyParam, this._state.key);
                if (this._state.order === 'desc') params.set(orderParam, 'desc');
                else if (ownOrder) params.delete(orderParam);
            } else {
                // The order goes with its key: another sort's key keeps its order=desc.
                const key = params.get(keyParam);
                if (!key || this._isOwnKey(key)) {
                    params.delete(keyParam);
                    if (ownOrder) params.delete(orderParam);
                }
            }

            NDS.writeUrlParams(params);
        }

        destroy() {
            this.abortController.abort();
            // The sorted-* states, aria-sort and the trigger icon stay: the rows stay in that order, and a re-create seeds from them.
            if (this.root) {
                delete this.root.ndsSort;
                this.root.removeAttribute('data-nds-sort-initialized');
            }
        }
    }

    // ── Markup wiring ────────────────────────────────────────────────────

    // One list per distinct target id. ponytail: triggers are bound at create — one added later
    // needs NDS.init.destroy + refresh; bind by delegation if that becomes common.
    function getMarkupLists() {
        const lists = new Set();
        document.querySelectorAll('[data-sort-target]').forEach(trigger => {
            if (trigger.closest('code')) return;
            const list = document.getElementById(trigger.getAttribute('data-sort-target'));
            if (list) lists.add(list);
        });
        return lists;
    }

    function init() {
        getMarkupLists().forEach(list => {
            if (list.ndsSort) return;
            const selector = `[data-sort-target="${CSS.escape(list.id)}"]`;
            NDS.Sort.create(list, {
                items: () => list.children,
                triggers: () => document.querySelectorAll(selector),
                mode: document.querySelector(`${selector}[data-sort-mode="cycle"]`) ? 'cycle' : 'direct',
                // Pagination's watchers see a reorder as no change, so a paged list repages here:
                // page 1 for a new sort, the same page for a refresh.
                onChange: () => {
                    const paged = list.closest('.nds-paged-content');
                    if (paged) NDS.Pagination.refresh(paged, { keepPage: !!list.ndsSort?._refreshing });
                },
            }).hasMarkupTriggers = true;
        });
    }

    // Owner hook for NDS.init.refresh: rows added to a wired list join the active sort.
    function refresh(root = document) {
        init();
        getMarkupLists().forEach(list => {
            if (list.ndsSort?.hasMarkupTriggers && (root === document || root.contains(list) || list.contains(root))) list.ndsSort.refresh();
        });
    }

    // ── Global API ───────────────────────────────────────────────────────

    NDS.Sort = {
        init,
        refresh,
        create: (root, options) => {
            if (!root) return null;
            if (root.ndsSort) return root.ndsSort;
            const instance = new NdsSort(root, options);
            root.ndsSort = instance;
            root.setAttribute('data-nds-sort-initialized', 'true');
            return instance;
        },

        destroy: (root) => NDS.resolveElement(root)?.ndsSort?.destroy(),

        getInstance: (root) => NDS.resolveElement(root)?.ndsSort || null,

        // Pure helpers
        detectType,
        parseValue,
        compare
    };
})();
