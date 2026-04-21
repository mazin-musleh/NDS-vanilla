/**
 * NDS Sort Component
 * DOM-reorder sort for any collection of sibling elements. Consumed by Filter
 * (direct-select dropmenu buttons) and Tables (3-way cycle column headers).
 *
 * Triggers, a11y target, and value accessor are provided by the consumer, so
 * the same engine serves both widgets without copy-pasted comparator logic.
 *
 * Public API:
 *   NDS.Sort.init(selector, options)    — auto-init matching containers
 *   NDS.Sort.reinit(selector)           — idempotent re-init
 *   NDS.Sort.create(root, options)      — factory → NDSSort instance
 *   NDS.Sort.getInstance(root)          — retrieve existing instance
 *   NDS.Sort.detectType(sampleValues)   — pure helper
 *   NDS.Sort.parseValue(raw, type)      — pure helper
 *   NDS.Sort.compare(a, b, type, dir)   — pure helper
 *
 * Options (passed to create):
 *   items          — selector | NodeList | Array | () => NodeList  (required)
 *   reorderIn      — Element (parent to re-append into); default: items[0].parentElement
 *   triggers       — selector for clickable elements inside `root` (required)
 *   accessor       — (item, key) => raw value; default: item.getAttribute('data-sort-' + key)
 *   keyFrom        — (trigger) => key; default: trigger.getAttribute('data-sort') || ''
 *   mode           — 'direct' | 'cycle'   default: 'direct'
 *                      direct : each trigger fixes its own (key, dir) pair; empty key resets
 *                      cycle  : same trigger toggles asc → desc → reset across three clicks
 *   a11y           — 'pressed' | 'sort' | 'none'   default: 'pressed'
 *                      pressed: aria-pressed on trigger + data-state="selected"
 *                      sort   : aria-sort on a11yTarget + data-state="active" on trigger
 *   a11yTarget     — (trigger) => Element that carries aria-sort   default: trigger.closest('th')
 *   types          — { [key]: 'number' | 'date' | 'string' } overrides for auto-detect
 *   initialState   — { key, dir } | null to seed state without reordering (HTML pre-sorted)
 *   urlSync        — false | { keyParam, dirParam } — read at init, write on change
 *   onChange       — ({ key, dir, orderedItems, state }) => void
 *
 * Event: dispatches `nds:sort:change` on `root` with detail { key, dir, orderedItems, sort }.
 */
(function() {
    'use strict';

    // ── Pure helpers (also exposed under NDS.Sort) ──────────────────────

    // Treat key=0 (column index) as present; only null/undefined/'' mean "no key → reset".
    function _hasKey(key) {
        return key !== null && key !== undefined && key !== '';
    }

    function unwrapNumber(str) {
        // Strip thousands separators/whitespace, then read leading number; handles "9,375 SAR"
        const cleaned = String(str).replace(/[,\s]/g, '');
        const m = cleaned.match(/^-?[\d.]+/);
        return m ? parseFloat(m[0]) : NaN;
    }

    function isDateString(str) {
        const s = String(str).trim();
        // Reject pure-numeric strings that would coerce via Date.parse (e.g. "1995" → 1995-01-01)
        if (/^-?\d+(\.\d+)?$/.test(s)) return false;
        const patterns = [
            /^\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}$/,   // DD/MM/YYYY, DD-MM-YY, etc.
            /^\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}$/,     // YYYY-MM-DD
            /^\d{4}-\d{2}-\d{2}T/                      // ISO 8601
        ];
        if (!patterns.some(p => p.test(s))) return false;
        return !isNaN(new Date(s).getTime());
    }

    function detectType(sampleValues) {
        const values = (sampleValues || []).filter(v => v !== null && v !== undefined && v !== '');
        if (!values.length) return 'string';

        // Date check wins over number: "2026-03-15" has a leading digit sequence
        // that unwrapNumber would greedily accept (parseFloat stops at the dash),
        // so every same-year row would collapse to the same numeric value.
        let dates = 0, nums = 0;
        for (let i = 0; i < values.length; i++) {
            if (isDateString(values[i])) dates++;
            else if (!isNaN(unwrapNumber(values[i]))) nums++;
        }
        if (dates === values.length) return 'date';
        if (nums === values.length) return 'number';
        return 'string';
    }

    function parseValue(raw, type) {
        if (type === 'number') {
            const n = unwrapNumber(raw);
            return isNaN(n) ? 0 : n;
        }
        if (type === 'date') {
            const t = new Date(String(raw).trim()).getTime();
            return isNaN(t) ? 0 : t;
        }
        return String(raw == null ? '' : raw);
    }

    function compare(a, b, type, dir) {
        const av = parseValue(a, type);
        const bv = parseValue(b, type);
        let cmp;
        if (type === 'string') {
            cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' });
        } else {
            cmp = av - bv;
        }
        return dir === 'desc' ? -cmp : cmp;
    }

    // ── Instance ─────────────────────────────────────────────────────────

    class NDSSort {
        constructor(root, options) {
            this.root = root;
            this.opts = Object.assign({
                mode: 'direct',
                a11y: 'pressed',
                a11yTarget: (t) => t.closest('th'),
                accessor: (item, key) => item.getAttribute('data-sort-' + key),
                keyFrom: (t) => t.getAttribute('data-sort') || '',
            }, options || {});

            this._ac = new AbortController();
            this.state = { key: null, dir: null };
            this._originalOrder = null;

            this.init();
        }

        init() {
            this._originalOrder = [...this._resolveItems()];
            this._bindTriggers();

            // Seed state without reordering — used when HTML arrives pre-sorted
            if (this.opts.initialState && this.opts.initialState.key != null) {
                this.state = {
                    key: this.opts.initialState.key,
                    dir: this.opts.initialState.dir || 'asc'
                };
            } else if (this.opts.urlSync) {
                this._readUrl();  // also applies
                return;
            }

            this._render();
        }

        // ── Item / container resolution ──────────────────────────────────

        _resolveItems() {
            const src = this.opts.items;
            if (typeof src === 'function') return Array.from(src() || []);
            if (typeof src === 'string') return Array.from(this.root.querySelectorAll(src));
            if (src && typeof src.length === 'number') return Array.from(src);
            return [];
        }

        _resolveContainer(items) {
            if (this.opts.reorderIn) return this.opts.reorderIn;
            return items[0]?.parentElement || null;
        }

        // ── Trigger resolution / wiring ──────────────────────────────────

        _resolveTriggers() {
            const src = this.opts.triggers;
            if (typeof src === 'function') return Array.from(src() || []);
            if (typeof src === 'string') return Array.from(this.root.querySelectorAll(src));
            if (src && typeof src.length === 'number') return Array.from(src);
            return [];
        }

        _bindTriggers() {
            const triggers = this._resolveTriggers();
            const { signal } = this._ac;
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this._onTrigger(trigger);
                }, { signal });
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this._onTrigger(trigger);
                    }
                }, { signal });
            });
        }

        _onTrigger(trigger) {
            const key = this.opts.keyFrom(trigger);

            if (this.opts.mode === 'cycle') {
                if (!_hasKey(key)) { this.apply(null, null); return; }
                let nextDir;
                if (this.state.key === key) {
                    // asc → desc → reset
                    nextDir = this.state.dir === 'asc' ? 'desc'
                            : this.state.dir === 'desc' ? null
                            : 'asc';
                } else {
                    nextDir = 'asc';
                }
                this.apply(nextDir ? key : null, nextDir);
                return;
            }

            // direct mode
            if (!_hasKey(key)) { this.apply(null, null); return; }
            const dir = trigger.getAttribute('data-sort-dir') || 'asc';
            this.apply(key, dir);
        }

        // ── Apply / reset ────────────────────────────────────────────────

        apply(key, dir) {
            const items = this._resolveItems();
            const container = this._resolveContainer(items);
            const hasKey = _hasKey(key);

            this.state = {
                key: hasKey ? key : null,
                dir: hasKey ? (dir || 'asc') : null
            };

            if (!container || !items.length) {
                this._render();
                return;
            }

            let ordered;
            if (hasKey) {
                const accessor = this.opts.accessor;
                const sample = items.map(i => accessor(i, key));
                const type = (this.opts.types && this.opts.types[key]) || detectType(sample);
                ordered = [...items].sort((a, b) =>
                    compare(accessor(a, key), accessor(b, key), type, dir || 'asc')
                );
            } else {
                ordered = this._originalOrder ? [...this._originalOrder] : [...items];
            }

            // Preserves listeners and element state — appendChild on an attached node moves it.
            ordered.forEach(item => container.appendChild(item));

            this._render();

            if (this.opts.urlSync) this._writeUrl();
            if (typeof this.opts.onChange === 'function') {
                this.opts.onChange({ key: this.state.key, dir: this.state.dir, orderedItems: ordered, state: this.getState() });
            }

            this.root.dispatchEvent(new CustomEvent('nds:sort:change', {
                detail: { key: this.state.key, dir: this.state.dir, orderedItems: ordered, sort: this },
                bubbles: true
            }));
        }

        reset() { this.apply(null, null); }

        getState() { return { key: this.state.key, dir: this.state.dir }; }

        // ── a11y / active render ─────────────────────────────────────────

        _render() {
            const triggers = this._resolveTriggers();
            const a11y = this.opts.a11y;

            triggers.forEach(trigger => {
                const key = this.opts.keyFrom(trigger);
                const dirAttr = trigger.getAttribute('data-sort-dir') || null;

                let isActive;
                if (this.opts.mode === 'cycle') {
                    isActive = this.state.key !== null && this.state.key === key && this.state.dir !== null;
                } else {
                    isActive = this.state.key !== null
                            && key === this.state.key
                            && (!dirAttr || dirAttr === this.state.dir);
                }

                if (a11y === 'pressed') {
                    trigger.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                    if (isActive) NDS.State.set(trigger, 'selected');
                    else NDS.State.remove(trigger, 'selected');
                } else if (a11y === 'sort') {
                    const target = this.opts.a11yTarget ? this.opts.a11yTarget(trigger) : null;
                    if (target) {
                        if (isActive && this.state.dir) {
                            target.setAttribute('aria-sort', this.state.dir === 'asc' ? 'ascending' : 'descending');
                        } else {
                            target.setAttribute('aria-sort', 'none');
                        }
                    }
                    if (isActive) NDS.State.add(trigger, 'active');
                    else NDS.State.remove(trigger, 'active');
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

            const { key: activeKey, dir: activeDir } = this.state;
            const isDirect = this.opts.mode === 'direct';

            const activeBtn = triggers.find(t => {
                const k = this.opts.keyFrom(t);
                if (!_hasKey(activeKey)) return !_hasKey(k);
                if (!isDirect) return k === activeKey;
                const d = t.getAttribute('data-sort-dir') || 'asc';
                return k === activeKey && (!t.hasAttribute('data-sort-dir') || d === activeDir);
            });

            const sourceIcon = activeBtn?.querySelector('i.nds-icon, i.hgi, i');
            if (sourceIcon) triggerIcon.className = sourceIcon.className;
        }

        // ── URL sync ─────────────────────────────────────────────────────

        _readUrl() {
            const params = new URLSearchParams(window.location.search);
            const { keyParam, dirParam } = this.opts.urlSync;
            const key = params.get(keyParam);
            if (!key) { this._render(); return; }
            const dir = params.get(dirParam) || 'asc';
            this.apply(key, dir);  // handles render + writeUrl + onChange + event
        }

        _writeUrl() {
            const params = new URLSearchParams(window.location.search);
            const { keyParam, dirParam } = this.opts.urlSync;

            if (this.state.key) {
                params.set(keyParam, this.state.key);
                if (this.state.dir && this.state.dir !== 'asc') {
                    params.set(dirParam, this.state.dir);
                } else {
                    params.delete(dirParam);
                }
            } else {
                params.delete(keyParam);
                params.delete(dirParam);
            }

            const qs = params.toString();
            const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }

        destroy() {
            this._ac.abort();
            if (this.root) {
                this.root.ndsSort = null;
                this.root.removeAttribute('data-nds-sort-initialized');
            }
        }
    }

    // ── Global API ───────────────────────────────────────────────────────

    function initializeSorts() {
        // No auto-init by selector (sort is composed into other widgets).
        // Exposed for symmetry — takes an optional root+options pair.
    }

    function reinitializeSorts() { initializeSorts(); }

    if (typeof window !== 'undefined') {
        window.NDS = window.NDS || {};
        NDS.Sort = {
            init: initializeSorts,
            reinit: reinitializeSorts,

            create: (root, options) => {
                if (!root) return null;
                if (root.ndsSort) return root.ndsSort;
                const instance = new NDSSort(root, options);
                root.ndsSort = instance;
                root.setAttribute('data-nds-sort-initialized', 'true');
                return instance;
            },

            getInstance: (root) => {
                if (typeof root === 'string') root = document.querySelector(root);
                return root?.ndsSort || null;
            },

            // Pure helpers
            detectType,
            parseValue,
            compare
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSSort;
    }
})();
