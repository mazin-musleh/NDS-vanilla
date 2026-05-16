// NDS Core — shared namespace and utilities
(() => {
    'use strict';

    window.NDS = window.NDS || {};

    // ── Assets base (auto-derived; consumer can override) ───────────
    // Resolve sibling-asset URLs (i18n JSON, future data files) against
    // wherever this bundle actually loaded from, regardless of the calling
    // page's depth or the site's baseurl. Works for:
    //   /assets/js/nds-main.min.js                   → /assets/
    //   /NDS-vanilla/assets/js/nds-main.min.js?ver=… → /NDS-vanilla/assets/
    //   https://cdn.example.com/v1/assets/js/…       → https://cdn.example.com/v1/assets/
    // document.currentScript is valid synchronously while this IIFE runs
    // (script parsing time). Falls back to page-relative if the bundle was
    // loaded inline or via a path we can't pattern-match.
    //
    // Override layers, in priority order:
    //   1. window.NDS_I18N_PATH       → only the i18n directory (component-specific)
    //   2. window.NDS_ASSETS_BASE     → entire assets directory (e.g. CDN)
    //   3. auto-derived from script src
    //   4. 'assets/' (page-relative fallback)
    // Set the override BEFORE this bundle loads.
    //
    // Use match() (not replace()) so a script src that doesn't fit the
    // `/.../js/{name}.js` shape falls through to the empty-string fallback,
    // letting _fetchOne use 'assets/i18n/' page-relative. replace() would
    // return the original src unchanged and produce a malformed URL like
    // `https://host/bundle.jsi18n/...` on the first fetch.
    const _scriptSrc = (document.currentScript && document.currentScript.src) || '';
    const _scriptBaseMatch = _scriptSrc.match(/^(.*\/)js\/[^/]+\.js(?:\?.*)?$/);
    const ASSETS_BASE = window.NDS_ASSETS_BASE
                     || (_scriptBaseMatch && _scriptBaseMatch[1])
                     || '';

    // ── Language & Direction (cached) ────────────────────────────────
    // BCP 47: 'ar', 'ar-SA', 'ar-EG' → 'ar'  |  'en', 'en-US' → 'en'
    // Usage: NDS.lang    → 'ar' | 'en' | ...
    //        NDS.isArabic → true/false
    //        NDS.isRTL   → true/false
    //        NDS.langKey → 'ar' | 'en'   (bilingual selector — falls back to
    //                                     'en' for any non-Arabic locale; use
    //                                     for component `labels[NDS.langKey]`
    //                                     lookups where the component carries
    //                                     only `{ ar, en }` translations)
    // ── Breakpoints (matches _mixins.scss) ─────────────────────────
    // Usage: NDS.breakpoints.desktop → '(min-width: 960px)'
    //        window.matchMedia(NDS.breakpoints.mobile).matches
    NDS.breakpoints = {
        mobile:          '(max-width: 599px)',
        tablet:          '(min-width: 600px)',
        'tablet-max':    '(max-width: 960px)',
        desktop:         '(min-width: 960px)',
        'desktop-max':   '(max-width: 1280px)',
        'large-desktop': '(min-width: 1280px)'
    };

    // Live getters so runtime language/direction toggles (e.g. language switcher) stay correct.
    Object.defineProperty(NDS, 'lang', {
        get() { return (document.documentElement.lang || 'en').split('-')[0].toLowerCase(); }
    });
    Object.defineProperty(NDS, 'isArabic', {
        get() { return NDS.lang === 'ar'; }
    });
    Object.defineProperty(NDS, 'isRTL', {
        get() { return document.documentElement.dir === 'rtl'; }
    });
    Object.defineProperty(NDS, 'langKey', {
        get() { return NDS.isArabic ? 'ar' : 'en'; }
    });

    // ── i18n ─────────────────────────────────────────────────────────
    // Component-scoped runtime localization. Each consumer:
    //   1. Bakes English defaults into its HTML alongside data-i18n keys.
    //   2. Calls NDS.i18n.load('{component}', scope) at init.
    //   3. Optionally awaits the returned data for component-specific work
    //      (iterating arrays, removing locale-excluded controls, etc.).
    //
    // Override hooks (read once per load):
    //   window.NDS_I18N      = { '{component}': {...}, ... }   inline strings
    //   window.NDS_I18N_PATH = '/custom/'                       base path
    NDS.i18n = {
        // Load translations for a component and apply them to its scope(s).
        // Always fetches — JSON is the single source of truth for both EN
        // and other locales. Falls back to en.json when the active locale's
        // file is missing or fails (so consumers can ship a partial set of
        // translations without breaking the live-region / lazy-built UI).
        async load(component, scopes) {
            // Inline override wins — consumer set strings before bundle loaded.
            const inline = window.NDS_I18N && window.NDS_I18N[component];
            if (inline) { this.apply(scopes, inline); return inline; }

            // Reject anything that isn't a BCP-47 base tag (2–3 letters) before
            // it reaches the fetch URL — guards against <html lang="../foo">
            // path-traversal into a sibling _data file.
            const lang = /^[a-z]{2,3}$/.test(NDS.lang) ? NDS.lang : 'en';
            const data = await this._fetchOne(component, lang)
                      || (lang !== 'en' && await this._fetchOne(component, 'en'));
            if (data) this.apply(scopes, data);
            return data || null;
        },

        async _fetchOne(component, lang) {
            const base = window.NDS_I18N_PATH || (ASSETS_BASE ? ASSETS_BASE + 'i18n/' : 'assets/i18n/');
            try {
                const res = await fetch(base + component + '/' + lang + '.json', { cache: 'default' });
                if (!res.ok) throw new Error(res.status);
                return await res.json();
            } catch (err) {
                console.warn('[NDS.i18n] ' + component + '/' + lang + ' failed', err);
                return null;
            }
        },

        // Walk scope(s) and swap text/attributes per data on every match.
        //   data-i18n="key"            → textContent = data[key]
        //   data-i18n-attr="a:k1,b:k2" → setAttribute(a, data[k1]) etc.
        // Missing keys are skipped (HTML defaults stay). Attribute names are
        // allowlisted to a11y/text attrs so JSON-driven values can never reach
        // event handlers (onclick), URLs (href/src), or styles. Lookup is
        // portal-aware (NDS.queryAll) so future components with portaled
        // dropmenus inside their i18n scope still get translated.
        apply(scopes, data) {
            if (!data) return;
            this._roots(scopes).forEach(root => {
                // One walk for both attrs; classify per element. An element can
                // carry data-i18n AND data-i18n-attr — both branches still run.
                NDS.queryAll(root, '[data-i18n], [data-i18n-attr]').forEach(el => {
                    const textKey = el.dataset.i18n;
                    if (textKey) {
                        const v = data[textKey];
                        if (typeof v === 'string') el.textContent = v;
                    }
                    const attrSpec = el.dataset.i18nAttr;
                    if (!attrSpec) return;
                    attrSpec.split(',').forEach(pair => {
                        const [attr, key] = pair.split(':').map(s => s.trim());
                        if (!this._SAFE_ATTR.test(attr)) {
                            console.warn('[NDS.i18n] refused to set unsafe attr:', attr);
                            return;
                        }
                        const v = data[key];
                        if (typeof v === 'string') el.setAttribute(attr, v);
                    });
                });
            });
        },

        // Copy own enumerable keys from src onto target, skipping prototype
        // pollution vectors. Use this anywhere a component overlays JSON-
        // sourced data onto a runtime object (e.g. a strings dictionary).
        safeMerge(target, src) {
            if (!src) return target;
            for (const k of Object.keys(src)) {
                if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
                target[k] = src[k];
            }
            return target;
        },

        // Allowlist for data-i18n-attr — text/a11y attributes only.
        _SAFE_ATTR: /^(aria-[a-z-]+|title|alt|placeholder|label)$/,

        _roots(scopes) {
            if (!scopes) return [document.documentElement];
            const arr = Array.isArray(scopes) ? scopes : [scopes];
            return arr
                .map(s => typeof s === 'string' ? document.querySelector(s) : s)
                .filter(Boolean);
        },
    };

    // ── Debounce ─────────────────────────────────────────────────────
    // Usage: const fn = NDS.debounce(handler, 150)
    NDS.debounce = (fn, ms) => {
        let t;
        return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
    };

    // ── RAF Throttle ─────────────────────────────────────────────────
    // Single-in-flight requestAnimationFrame throttle for scroll/mousemove handlers
    // Usage: el.addEventListener('scroll', NDS.rafThrottle(handler), { passive: true })
    NDS.rafThrottle = fn => {
        let ticking = false;
        return (...args) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { ticking = false; fn(...args); });
        };
    };

    // ── Run-When-Idle ────────────────────────────────────────────────
    // Defers work to a browser-idle slot via requestIdleCallback, with a
    // setTimeout fallback for environments without rIC. Use for non-critical
    // init-time work (topbar widget API calls, post-load analytics, etc.)
    // that shouldn't compete with the post-DCL hydration window.
    // Usage: NDS.onIdle(() => fetchWeather(), 2000)
    NDS.onIdle = (fn, timeout = 2000) => {
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(fn, { timeout });
        } else {
            setTimeout(fn, 1);
        }
    };

    // ── Window Resize Bus ────────────────────────────────────────────
    // Single listener, 150ms debounce, fan-out to subscribers
    // Usage: const off = NDS.onResize(handler)
    NDS.onResize = (() => {
        const subs = [];
        const fire = NDS.debounce(() => { for (let i = 0; i < subs.length; i++) subs[i](); }, 150);
        window.addEventListener('resize', fire, { passive: true });

        return fn => {
            subs.push(fn);
            return () => { const i = subs.indexOf(fn); if (i !== -1) subs.splice(i, 1); };
        };
    })();

    // ── Element Resize Observer ──────────────────────────────────────
    // Single ResizeObserver, multiple elements
    // Usage: const off = NDS.onElementResize(el, handler)
    NDS.onElementResize = (() => {
        const map = new Map();
        const ro = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(entries => {
                for (let i = 0; i < entries.length; i++) {
                    const fns = map.get(entries[i].target);
                    if (fns) fns.forEach(fn => fn(entries[i]));
                }
            })
            : null;

        return (el, fn) => {
            if (!ro) return () => {};
            let fns = map.get(el);
            if (!fns) { fns = new Set(); map.set(el, fns); ro.observe(el); }
            fns.add(fn);
            return () => {
                fns.delete(fn);
                if (!fns.size) { map.delete(el); ro.unobserve(el); }
            };
        };
    })();

    // ── Intersection Observer Pool ─────────────────────────────────
    // Shared viewport IntersectionObservers, grouped by options
    // Usage: const off = NDS.onIntersect(el, handler, { threshold, rootMargin })
    NDS.onIntersect = (() => {
        const pool = new Map(); // key → { io, map }

        return (el, fn, opts = {}) => {
            if (typeof IntersectionObserver === 'undefined') return () => {};
            const key = (opts.threshold || 0) + '|' + (opts.rootMargin || '0px');
            let group = pool.get(key);
            if (!group) {
                const map = new Map();
                const io = new IntersectionObserver(entries => {
                    for (let i = 0; i < entries.length; i++) {
                        const cb = map.get(entries[i].target);
                        if (cb) cb(entries[i]);
                    }
                }, { threshold: opts.threshold || 0, rootMargin: opts.rootMargin || '0px' });
                group = { io, map };
                pool.set(key, group);
            }
            group.map.set(el, fn);
            group.io.observe(el);
            return () => {
                group.map.delete(el);
                group.io.unobserve(el);
                if (!group.map.size) { group.io.disconnect(); pool.delete(key); }
            };
        };
    })();

    // ── DOM Mutation Bus ─────────────────────────────────────────────
    // Single MutationObserver on body, selector-based dispatch.
    // Each subscriber returns an unsubscribe handle so per-instance callers
    // (component constructors / init() methods called per re-init) can
    // release their subscription without the pool's array growing
    // unboundedly across instances. Mirrors NDS.onResize / onElementResize
    // / onIntersect / onOutsideScroll.
    // Usage: const off = NDS.onDOMAdd('.selector', nodes => { ... })
    //        const off = NDS.onDOMRemove('.selector', nodes => { ... })
    //        const off = NDS.onChildrenChange('.selector', parents => { ... })
    //        // later: off();  releases the subscriber
    //          onChildrenChange fires when a matched element's direct
    //          children change. Matches on mutation.target (the parent,
    //          still attached), so selectors with '>' combinators work and
    //          child removals are detected cleanly (removed nodes have
    //          parentNode === null by callback time).
    const domBus = (() => {
        const addSubs = [], removeSubs = [], childrenSubs = [];
        let started = false;

        function dispatch(nodes, subs) {
            for (let s = 0; s < subs.length; s++) {
                const hits = [];
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].matches(subs[s].sel)) hits.push(nodes[i]);
                    const ch = nodes[i].querySelectorAll(subs[s].sel);
                    for (let c = 0; c < ch.length; c++) hits.push(ch[c]);
                }
                if (hits.length) subs[s].fn(hits);
            }
        }

        function dispatchParents(parents, subs) {
            for (let s = 0; s < subs.length; s++) {
                const hits = [];
                parents.forEach(p => { if (p.matches(subs[s].sel)) hits.push(p); });
                if (hits.length) subs[s].fn(hits);
            }
        }

        function start() {
            if (started || !document.body) return;
            started = true;
            new MutationObserver(mutations => {
                const added = [], removed = [], parents = new Set();
                for (let i = 0; i < mutations.length; i++) {
                    const m = mutations[i];
                    if (m.target && m.target.nodeType === 1) parents.add(m.target);
                    for (let j = 0; j < m.addedNodes.length; j++)
                        if (m.addedNodes[j].nodeType === 1) added.push(m.addedNodes[j]);
                    for (let j = 0; j < m.removedNodes.length; j++)
                        if (m.removedNodes[j].nodeType === 1) removed.push(m.removedNodes[j]);
                }
                // A reparent (e.g. NDS.portal → document.body.appendChild) emits
                // both a remove and an add for the same node in one batch. Treat
                // that as a move, not a lifecycle change — drop those nodes from
                // both lists so subscribers (and any descendants matching their
                // selectors) keep their instances, listeners, and internal state
                // across portals and similar reparents.
                let realAdded = added, realRemoved = removed;
                if (added.length && removed.length) {
                    const addedSet = new Set(added), removedSet = new Set(removed);
                    realAdded = added.filter(n => !removedSet.has(n));
                    realRemoved = removed.filter(n => !addedSet.has(n));
                }
                // Removes before adds: for unrelated mutations batched together,
                // tearing down old state before constructing new state is safer.
                if (realRemoved.length) dispatch(realRemoved, removeSubs);
                if (realAdded.length) dispatch(realAdded, addSubs);
                if (parents.size && childrenSubs.length) dispatchParents(parents, childrenSubs);
            }).observe(document.body, { childList: true, subtree: true });
        }

        return { addSubs, removeSubs, childrenSubs, start };
    })();

    NDS.onDOMAdd = (sel, fn) => {
        const sub = { sel, fn };
        domBus.addSubs.push(sub);
        domBus.start();
        return () => { const i = domBus.addSubs.indexOf(sub); if (i !== -1) domBus.addSubs.splice(i, 1); };
    };
    NDS.onDOMRemove = (sel, fn) => {
        const sub = { sel, fn };
        domBus.removeSubs.push(sub);
        domBus.start();
        return () => { const i = domBus.removeSubs.indexOf(sub); if (i !== -1) domBus.removeSubs.splice(i, 1); };
    };
    NDS.onChildrenChange = (sel, fn) => {
        const sub = { sel, fn };
        domBus.childrenSubs.push(sub);
        domBus.start();
        return () => { const i = domBus.childrenSubs.indexOf(sub); if (i !== -1) domBus.childrenSubs.splice(i, 1); };
    };

    // ── Attribute Change Observer ────────────────────────────────────
    // Single MutationObserver on <html> for attribute changes, selector-based dispatch.
    // Observing documentElement (not body) so subscribers can match 'html' itself —
    // e.g. lang/dir changes for direction-aware components.
    // Returns an unsubscribe handle so per-instance callers can release
    // their subscription. Mirrors the DOM Mutation Bus shape above.
    // Usage: const off = NDS.onAttrChange('.nds-progress-circle', ['data-value', 'data-num'], els => { ... })
    //        // later: off();  releases the subscriber
    const attrSubs = [];
    NDS.onAttrChange = (sel, attrs, fn) => {
        const sub = { sel, attrs: new Set(attrs), fn };
        attrSubs.push(sub);
        if (attrSubs.length === 1) {
            new MutationObserver(mutations => {
                const changed = new Map();
                for (let i = 0; i < mutations.length; i++) {
                    const el = mutations[i].target;
                    if (!changed.has(el)) changed.set(el, new Set());
                    changed.get(el).add(mutations[i].attributeName);
                }
                for (let s = 0; s < attrSubs.length; s++) {
                    const hits = [];
                    changed.forEach((attrs, el) => {
                        if (!el.matches(attrSubs[s].sel)) return;
                        for (const a of attrs) { if (attrSubs[s].attrs.has(a)) { hits.push(el); break; } }
                    });
                    if (hits.length) attrSubs[s].fn(hits);
                }
            }).observe(document.documentElement, { attributes: true, subtree: true });
        }
        return () => { const i = attrSubs.indexOf(sub); if (i !== -1) attrSubs.splice(i, 1); };
    };

    // ── State Management (data-state) ─────────────────────────────────
    // Space-separated token management for data-state attribute
    // Usage: NDS.State.add(el, 'open', 'active')
    //        NDS.State.remove(el, 'open')
    //        NDS.State.has(el, 'open')     → true/false
    //        NDS.State.set(el, 'open')     → replaces all tokens
    //        NDS.State.get(el)            → 'open active' (raw string)
    //        NDS.State.clear(el)           → removes data-state entirely
    //        NDS.State.apply(el, ...states) → fire onAdd hooks for existing states (init-time)
    //        NDS.State.onAdd(state, scope, fn)    → register hook: fn(el) fires when state added on el matching scope
    //        NDS.State.onRemove(state, scope, fn) → register hook: fn(el) fires when state removed
    NDS.State = (() => {
        const _onAdd = {};    // { 'disabled': [{ scope, fn }, ...] }
        const _onRemove = {};

        function _fire(hooks, token, el) {
            const fns = hooks[token];
            if (!fns) return;
            for (let i = 0; i < fns.length; i++) {
                if (el.matches(fns[i].scope)) fns[i].fn(el, token);
            }
        }

        const parse = el => new Set((el.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));

        const add = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            const added = [];
            for (let i = 0; i < states.length; i++) {
                if (!cur.has(states[i])) { cur.add(states[i]); added.push(states[i]); }
            }
            if (!added.length) return;
            el.setAttribute('data-state', [...cur].join(' '));
            for (let i = 0; i < added.length; i++) _fire(_onAdd, added[i], el);
        };

        const remove = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            const removed = [];
            for (let i = 0; i < states.length; i++) {
                if (cur.has(states[i])) { cur.delete(states[i]); removed.push(states[i]); }
            }
            if (!removed.length) return;
            cur.size ? el.setAttribute('data-state', [...cur].join(' '))
                     : el.removeAttribute('data-state');
            for (let i = 0; i < removed.length; i++) _fire(_onRemove, removed[i], el);
        };

        const has = (el, state) => el ? parse(el).has(state) : false;

        const get = el => el ? (el.getAttribute('data-state') || '') : '';

        const set = (el, ...states) => {
            if (!el) return;
            states.length ? el.setAttribute('data-state', states.join(' '))
                          : el.removeAttribute('data-state');
        };

        const clear = el => { if (el) el.removeAttribute('data-state'); };

        const apply = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            for (let i = 0; i < states.length; i++) {
                if (cur.has(states[i])) _fire(_onAdd, states[i], el);
            }
        };

        const onAdd = (state, scope, fn) => {
            (_onAdd[state] || (_onAdd[state] = [])).push({ scope, fn });
        };

        const onRemove = (state, scope, fn) => {
            (_onRemove[state] || (_onRemove[state] = [])).push({ scope, fn });
        };

        return { parse, add, remove, has, get, set, clear, apply, onAdd, onRemove };
    })();

    // ── Status Management (data-status) ─────────────────────────────
    // Single-value management for data-status attribute
    // Usage: NDS.Status.set(el, 'error')
    //        NDS.Status.get(el)            → 'error' | ''
    //        NDS.Status.clear(el)          → removes data-status
    NDS.Status = {
        set: (el, status) => { if (el && status) el.setAttribute('data-status', status); },
        get: (el) => el ? (el.getAttribute('data-status') || '') : '',
        clear: (el) => { if (el) el.removeAttribute('data-status'); }
    };

    // ── HTML Escape ──────────────────────────────────────────────────
    // Escape a string for safe insertion into an HTML context (innerHTML, template literals).
    // Uses the browser's textContent serializer so every edge case the parser cares about
    // (quotes, angle brackets, entities, mixed charsets) is handled by the engine itself —
    // no regex-based escape can match that coverage.
    // Usage: el.innerHTML = `<span>${NDS.escapeHtml(userValue)}</span>`
    // Shared scratch node — one allocation for the page lifetime instead of
    // one per escape call. Reading innerHTML between writes is fine because
    // the node is never inserted into the document.
    const _escapeNode = document.createElement('div');
    NDS.escapeHtml = (str) => {
        if (str == null) return '';
        _escapeNode.textContent = String(str);
        return _escapeNode.innerHTML;
    };

    // ── Unique ID ─────────────────────────────────────────────────────
    // Short collision-resistant ID for DOM-scoped needs (input names,
    // aria-controls targets, per-upload file handles). Uses crypto.randomUUID
    // when available for stronger uniqueness; falls back to time + Math.random
    // otherwise. Optional prefix keeps IDs grep-friendly when inspected.
    // Usage: NDS.uniqueId()         → 'c9d7...' or '1745232...nt3m42'
    //        NDS.uniqueId('file-')  → 'file-c9d7...'
    NDS.uniqueId = (prefix = '') => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return prefix + crypto.randomUUID();
        }
        return prefix + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
    };

    // ── Transition Speed ─────────────────────────────────────────────
    // Reads --nds-transition-speed from document.documentElement and
    // returns the value in milliseconds. The CSS variable is set in
    // critical CSS and doesn't change at runtime, so the value is
    // memoized on first call.
    // Usage: const ms = NDS.transitionSpeed();
    NDS.transitionSpeed = (() => {
        let cached;
        return () => {
            if (cached !== undefined) return cached;
            const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nds-transition-speed'));
            cached = isFinite(v) ? v * 1000 : 200;
            return cached;
        };
    })();

    // ── Focusable Selector + Tab Focus Trap ──────────────────────────
    // Standard "tabbable element" selector — matches the elements a Tab/
    // Shift+Tab traversal will land on. Excludes [tabindex="-1"] (unreachable
    // by Tab) and disabled form controls. Exposed so component code can
    // reuse the same coverage when querying focusables.
    NDS.focusableSel =
        'a[href], button:not([disabled]), textarea:not([disabled]), ' +
        'input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Build a keydown handler that traps Tab/Shift+Tab inside `containerFn()`'s
    // returned element. Pass either a function (re-evaluated on every Tab —
    // lets the caller gate by open/close state, or return null when the
    // surface isn't active) or the element directly. When the active element
    // is the first tabbable, Shift+Tab wraps to the last; when it's the last,
    // Tab wraps to the first. No-ops when the container is gone, hidden, or
    // has no tabbables.
    //
    // Usage: document.addEventListener('keydown',
    //          NDS.trapFocus(() => isOpen ? panelEl : null),
    //          { signal });
    NDS.trapFocus = (containerFn) => (e) => {
        if (e.key !== 'Tab') return;
        const c = typeof containerFn === 'function' ? containerFn() : containerFn;
        if (!c) return;
        const f = c.querySelectorAll(NDS.focusableSel);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    // ── Live-Region Announcer (WCAG 4.1.3) ─────────────────────────────
    // Announce a transient message to assistive tech. Clear-then-set (with a
    // short delay) forces AT to re-utter even when the text is identical to
    // the previous announcement. No-ops on an empty message or an
    // unresolvable region.
    //   message — string to announce
    //   region  — optional explicit live-region element. Pass it for a
    //             component-owned status region; omit it entirely to use a
    //             shared SR-only region NDS lazily creates on <body>. An
    //             explicitly-passed null/falsy region no-ops (lets callers
    //             forward an optional element without a separate guard).
    // Usage: NDS.announce('Copied to clipboard');
    //        NDS.announce(msg, panel.querySelector('[data-a11y-status]'));
    NDS.announce = (() => {
        const DELAY = 50;
        let shared;
        const defaultRegion = () => {
            if (!shared || !shared.isConnected) {
                shared = document.createElement('div');
                shared.className = 'sr-only';
                shared.setAttribute('aria-live', 'polite');
                shared.setAttribute('aria-atomic', 'true');
                document.body.appendChild(shared);
            }
            return shared;
        };
        return (message, region) => {
            if (!message) return;
            const el = region === undefined ? defaultRegion() : region;
            if (!el) return;
            el.textContent = '';
            setTimeout(() => { el.textContent = message; }, DELAY);
        };
    })();

    // ── Local-Storage TTL Cache ────────────────────────────────────────
    // Wraps localStorage with a JSON `{value, expires}` envelope. Getter
    // returns the cached value when fresh, `null` on miss / parse error /
    // expiry (stale entries are evicted on read). Setter stamps
    // `Date.now() + minutes * 60 * 1000`. All storage operations are
    // try/catch'd so callers never have to handle quota / disabled-storage
    // exceptions. Keys are namespaced under an `nds_` prefix so the
    // cache shares the origin's localStorage cleanly with non-NDS code.
    //
    // Cache safety: callers are responsible for treating cached values as
    // potentially-untrusted (any same-origin script can write to
    // localStorage). Store primitive values, not pre-rendered HTML; render
    // imperatively at the consumer. See `_js/nds-cityWeather.js` for the
    // canonical pattern.
    //
    // Usage:
    //   NDS.cache.set('weather_v2_ar_24.71', { desc, temp, icon }, 15);
    //   const cached = NDS.cache.get('weather_v2_ar_24.71');
    //   if (cached) renderWeather(el, cached);
    //   NDS.cache.clear('weather_v2_ar_24.71'); // optional manual eviction
    NDS.cache = (() => {
        const PREFIX = 'nds_';
        return {
            get(key) {
                try {
                    const data = localStorage.getItem(PREFIX + key);
                    if (!data) return null;
                    const parsed = JSON.parse(data);
                    if (Date.now() < parsed.expires) return parsed.value;
                    localStorage.removeItem(PREFIX + key);
                } catch {}
                return null;
            },
            set(key, value, minutes) {
                try {
                    localStorage.setItem(PREFIX + key, JSON.stringify({
                        value,
                        expires: Date.now() + (minutes * 60 * 1000)
                    }));
                } catch {}
            },
            clear(key) {
                try { localStorage.removeItem(PREFIX + key); } catch {}
            }
        };
    })();

    // ── Body Scroll Lock ───────────────────────────────────────────────
    // Locks/unlocks document scroll while preserving the visual scroll
    // position. `lock()` captures the current pageYOffset and pins the
    // body via `position: top: -<scrollY>px` (callers are expected to
    // pair this with a CSS rule that sets `body { position: fixed }`
    // when the appropriate state-token is present, e.g.
    // `body[data-state~="backdrop"]`). `unlock()` parses the saved
    // offset back out of the inline style, clears it, and restores
    // scroll. Stateless: the inline style is the source of truth, so
    // calling `unlock()` when not locked is a safe no-op.
    //
    // Does NOT touch `data-state` — callers manage backdrop / overlay
    // state tokens themselves so the same helper serves both
    // backdrop-coupled and standalone scroll-lock use cases.
    //
    // Caller responsibility: do NOT call `lock()` twice without an
    // intervening `unlock()`. The second call would capture the
    // already-locked scroll position (0) and lose the original. Existing
    // callers gate this via overlay isActive / menu open-state guards.
    //
    // Usage: NDS.scrollLock.lock();
    //        // ... overlay shown ...
    //        NDS.scrollLock.unlock();
    NDS.scrollLock = {
        lock() {
            const scrollY = window.pageYOffset;
            document.body.style.top = `-${scrollY}px`;
        },
        unlock() {
            if (!document.body.style.top) return;
            const scrollY = parseInt(document.body.style.top, 10) * -1;
            document.body.style.top = '';
            window.scrollTo(0, scrollY);
        }
    };

    // ── Outside-scroll Close Helper ────────────────────────────────────
    // Capture-phase document scroll listener that invokes `onClose` when the
    // scroll event originates outside `scopeEl`. Scrolls inside scopeEl
    // (e.g. a scrollable dropmenu panel) are ignored. Returns an unsubscribe
    // handle the caller stores for later removal — mirrors the NDS.on*
    // subscription shape so teardown is uniform across helpers.
    // Usage: const off = NDS.onOutsideScroll(this.menu, () => this.close());
    //        // later: off();
    NDS.onOutsideScroll = (scopeEl, onClose) => {
        const handler = (e) => {
            if (e?.target?.nodeType && scopeEl.contains(e.target)) return;
            onClose();
        };
        document.addEventListener('scroll', handler, { capture: true, passive: true });
        return () => document.removeEventListener('scroll', handler, { capture: true });
    };

    // ── Portal-Aware DOM Lookup ────────────────────────────────────────
    // When a `.nds-dropmenu-menu` is portaled to <body>, its descendants
    // are no longer reachable through the original wrapper's DOM tree.
    // These helpers bridge that gap using the `_ownerDropmenu` backref
    // dropmenu sets on every menu.
    //
    //   NDS.closest(el, sel)       — like el.closest, but if `el` lives
    //                                inside a portaled menu it falls back
    //                                to the menu's owner wrapper and
    //                                continues from there.
    //   NDS.queryAll(root, sel)    — like root.querySelectorAll, but also
    //                                searches inside any portaled menu
    //                                whose owner wrapper is a descendant
    //                                of `root`.
    //   NDS.querySelector(root, sel) — first match using queryAll order.

    NDS.closest = (el, selector) => {
        if (!el) return null;
        const direct = el.closest(selector);
        if (direct) return direct;
        const menu = el.closest('.nds-dropmenu-menu');
        if (menu && menu._ownerDropmenu) {
            return menu._ownerDropmenu.closest(selector);
        }
        return null;
    };

    // Active NDS.portal count — incremented in portal, decremented in unportal.
    // queryAll/querySelector use this to skip the body > .nds-dropmenu-menu sweep
    // when nothing is portaled (the common case on most pages).
    let _portaledCount = 0;

    NDS.queryAll = (root, selector) => {
        if (!root) return [];
        if (_portaledCount === 0) return Array.from(root.querySelectorAll(selector));
        const set = new Set();
        root.querySelectorAll(selector).forEach(el => set.add(el));
        if (document.body) {
            const portaled = document.body.querySelectorAll(':scope > .nds-dropmenu-menu');
            for (let i = 0; i < portaled.length; i++) {
                const menu = portaled[i];
                const owner = menu._ownerDropmenu;
                if (!owner || !root.contains(owner)) continue;
                if (menu.matches(selector)) set.add(menu);
                menu.querySelectorAll(selector).forEach(el => set.add(el));
            }
        }
        return Array.from(set);
    };

    NDS.querySelector = (root, selector) => {
        if (!root) return null;
        const direct = root.querySelector(selector);
        if (direct) return direct;
        if (_portaledCount === 0) return null;
        if (document.body) {
            const portaled = document.body.querySelectorAll(':scope > .nds-dropmenu-menu');
            for (let i = 0; i < portaled.length; i++) {
                const menu = portaled[i];
                const owner = menu._ownerDropmenu;
                if (!owner || !root.contains(owner)) continue;
                if (menu.matches(selector)) return menu;
                const found = menu.querySelector(selector);
                if (found) return found;
            }
        }
        return null;
    };

    // ── Portal / Containing-Block Detection ────────────────────────────
    // A `position: fixed` element resolves `top`/`left` against the nearest
    // ancestor that establishes a containing block — and is trapped inside
    // the nearest stacking-context ancestor. The CSS spec lists many
    // properties that establish either; the most common offenders we hit
    // in this codebase are `container-type: inline-size` (on
    // `.nds-section-wrapper`) and `isolation: isolate` (on
    // `.nds-hero-section.nds-sub`). Returns true if any ancestor would
    // trap the element.
    NDS.needsPortal = (el) => {
        let n = el.parentElement;
        while (n && n !== document.documentElement) {
            const cs = getComputedStyle(n);
            const wc = cs.willChange || '';
            const cn = cs.contain || '';
            const ct = cs.containerType || '';
            if (cs.transform !== 'none' ||
                cs.perspective !== 'none' ||
                cs.filter !== 'none' ||
                (cs.backdropFilter && cs.backdropFilter !== 'none') ||
                (cs.webkitBackdropFilter && cs.webkitBackdropFilter !== 'none') ||
                cs.clipPath !== 'none' ||
                cs.contentVisibility === 'auto' ||
                cs.isolation === 'isolate' ||
                /\b(transform|filter|perspective)\b/.test(wc) ||
                /\b(paint|layout|strict|content)\b/.test(cn) ||
                /\b(inline-size|size)\b/.test(ct)) {
                return true;
            }
            n = n.parentElement;
        }
        return false;
    };

    // Move `el` to <body> when an ancestor would trap it; no-op otherwise.
    // Records the original parent + next-sibling on the element so unportal
    // can restore them. `opts.snapshotVars` lets callers preserve custom
    // properties that consumers set on the wrapper (e.g.
    // `--dropmenu-min-width: 250px` on `.nds-filter`) — those values are
    // read from the inherited cascade BEFORE the move and re-applied as
    // inline styles after, so the visual remains identical.
    // `opts.scopeClasses` accepts class tokens that get added to `el` on
    // portal (and removed on unportal). Authors use these to mirror parent
    // context — e.g. `.nds-pagination-ellipsis .nds-dropmenu-menu` styles
    // can also target `.nds-dropmenu-menu.nds-pagination-ellipsis` so the
    // visual survives the move.
    // Usage: NDS.portal(menu, { snapshotVars: ['--menu-padding'], scopeClasses: ['nds-pagination-ellipsis'] });
    //        NDS.unportal(menu); // later
    NDS.portal = (el, opts = {}) => {
        if (el._ndsPortal) return; // already portaled
        if (!NDS.needsPortal(el)) return;
        _portaledCount++;
        const snap = {};
        const vars = opts.snapshotVars;
        if (vars && vars.length) {
            const cs = getComputedStyle(el);
            for (let i = 0; i < vars.length; i++) {
                const val = cs.getPropertyValue(vars[i]).trim();
                if (val) snap[vars[i]] = val;
            }
        }
        const setProps = [];
        const addedClasses = [];
        el._ndsPortal = {
            parent: el.parentNode,
            nextSibling: el.nextSibling,
            setProps,
            addedClasses,
        };
        document.body.appendChild(el);
        for (const k in snap) {
            el.style.setProperty(k, snap[k]);
            setProps.push(k);
        }
        const scopes = opts.scopeClasses;
        if (scopes && scopes.length) {
            for (let i = 0; i < scopes.length; i++) {
                const cls = scopes[i];
                if (cls && !el.classList.contains(cls)) {
                    el.classList.add(cls);
                    addedClasses.push(cls);
                }
            }
        }
        // Force a style/layout flush — Safari sometimes skips style recalc
        // when an element is reparented while display:none/hidden.
        void el.offsetHeight;
    };

    NDS.unportal = (el) => {
        const state = el._ndsPortal;
        if (!state) return;
        _portaledCount--;
        if (state.nextSibling && state.nextSibling.parentNode === state.parent) {
            state.parent.insertBefore(el, state.nextSibling);
        } else {
            state.parent.appendChild(el);
        }
        for (let i = 0; i < state.setProps.length; i++) {
            el.style.removeProperty(state.setProps[i]);
        }
        if (state.addedClasses) {
            for (let i = 0; i < state.addedClasses.length; i++) {
                el.classList.remove(state.addedClasses[i]);
            }
        }
        delete el._ndsPortal;
    };

    // ── Place `position: fixed` element at viewport coords ─────────────
    // Writes `top`/`left` then measures and corrects. The CSS spec says
    // top/left on a `position: fixed` element resolve against the
    // viewport — but only when no ancestor establishes a containing block.
    // When one does (transform, filter, container-type, etc.), the values
    // resolve against that ancestor instead, leaving the element offset.
    // The set of triggering properties varies per engine (Safari notably
    // honors `container-type: inline-size` strictly), so a static heuristic
    // misfires. Reading the actual rect after the write reveals any
    // discrepancy; subtracting it lands the element at the intended
    // viewport coords across engines.
    // The transform back-out handles in-flight slide animations on the
    // element itself (e.g. dropmenu's opening translateY).
    // Usage: NDS.placeFixed(menu, top, leftPx);
    NDS.placeFixed = (el, top, left) => {
        el.style.top = top + 'px';
        el.style.left = left + 'px';
        const r = el.getBoundingClientRect();
        const tm = getComputedStyle(el).transform;
        let tx = 0, ty = 0;
        if (tm && tm !== 'none') {
            const m = tm.match(/matrix\(([^)]+)\)/);
            if (m) {
                const parts = m[1].split(',');
                tx = parseFloat(parts[4]) || 0;
                ty = parseFloat(parts[5]) || 0;
            }
        }
        const dx = (r.left - tx) - left;
        const dy = (r.top  - ty) - top;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            el.style.top  = (top  - dy) + 'px';
            el.style.left = (left - dx) + 'px';
        }
    };

    // ── Viewport Flip-Position Measurement ─────────────────────────────
    // Measures available space around a trigger so popup-like components
    // (dropmenus, tooltips, date pickers, custom selects) can decide
    // whether their menu fits below the trigger or should flip above.
    // Returns raw measurements only — the caller computes its own flipUp
    // heuristic (e.g. `spaceBelow < menuRect.height`) and writes final
    // top/left styles so each component keeps its own arrow offsets,
    // RTL clamp, and gap conventions.
    //
    // When `respectNav` is true (default), treats the sticky `.nds-main-nav`
    // bottom edge + `navGap` as the top viewport boundary so menus can't
    // open behind it. Pass `respectNav: false` for components inside forms
    // or other contexts where the nav overlap doesn't apply.
    //
    // Usage: const p = NDS.flipPosition(trigger, menu);
    //        const flipUp = p.spaceBelow < p.menuRect.height && p.spaceAbove > p.spaceBelow;
    //        const top = flipUp ? p.triggerRect.top - p.menuRect.height - 4 : p.triggerRect.bottom + 4;
    // Cached lookup for `.nds-main-nav` — flipPosition fires on every popup
    // open, so avoiding the repeated qS adds up. `undefined` = never looked up,
    // null = looked up and absent, element = cached. SPA consumers that swap
    // the nav DOM on route changes leave a detached element in the cache;
    // isConnected re-lookups in that case (null stays sticky to avoid
    // re-querying on every popup when no nav is present).
    let _navEl;

    NDS.flipPosition = (trigger, menuEl, opts = {}) => {
        const { respectNav = true, navGap = 16 } = opts;
        const triggerRect = trigger.getBoundingClientRect();
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        const vh = doc.clientHeight;

        let topEdge = 0;
        if (respectNav) {
            if (_navEl === undefined || (_navEl && !_navEl.isConnected)) {
                _navEl = document.querySelector('.nds-main-nav');
            }
            const navBottom = _navEl ? _navEl.getBoundingClientRect().bottom : 0;
            if (navBottom > 0) topEdge = navBottom + navGap;
        }

        const menuRect = menuEl.getBoundingClientRect();
        const spaceBelow = vh - triggerRect.bottom;
        const spaceAbove = triggerRect.top - topEdge;

        return {
            spaceBelow,
            spaceAbove,
            topEdge,
            triggerRect,
            menuRect,
            viewportWidth: vw,
            viewportHeight: vh,
        };
    };

    // ── Lazy Reveal ────────────────────────────────────────────────────
    // Strip `hidden` once the DOM is ready from any [data-nds-lazy] element.
    // The opt-in marker for [hidden] elements that have no JS component to
    // reveal themselves (every component-owned [hidden] self-reveals via
    // NDS.reveal). Current consumer: the static footer.
    document.addEventListener('DOMContentLoaded', () => {
        const els = document.querySelectorAll('[data-nds-lazy]');
        for (let i = 0; i < els.length; i++) els[i].removeAttribute('hidden');
    });

    // ── Batched Reveal ──────────────────────────────────────────────────
    // Strips the `hidden` attribute from one or more elements, coalescing
    // every call within a frame into a single rAF flush — so a burst of
    // component inits produces one layout pass, not one reveal per element.
    // Components that ship `[hidden]` as a FOUC guard call this at the end
    // of their own init()/create(): the reveal is then init-gated per
    // component and dynamically-added instances self-reveal too.
    // Usage: NDS.reveal(el)  |  NDS.reveal(el1, el2, …)
    NDS.reveal = (() => {
        let queue = [];
        let scheduled = false;
        const flush = () => {
            scheduled = false;
            const els = queue;
            queue = [];
            for (let i = 0; i < els.length; i++) els[i].removeAttribute('hidden');
        };
        return (...els) => {
            for (let i = 0; i < els.length; i++) {
                if (els[i]) queue.push(els[i]);
            }
            if (!scheduled) {
                scheduled = true;
                requestAnimationFrame(flush);
            }
        };
    })();

    // ── Grid Last Row ────────────────────────────────────────────────
    // Marks items in the last row of a grid with .nds-last-row
    // Used by .nds-divided grids to remove bottom borders from the last visual row
    // Usage: NDS.gridLastRow.update()  — re-scan all grids on the page
    //        NDS.gridLastRow.update(container)  — re-scan grids within a container
    NDS.gridLastRow = (() => {
        const SEL = '.nds-divided.nds-grid';
        const CLS = 'nds-last-row';
        let listening = false;

        function scan(container) {
            const grids = container && container.matches?.(SEL)
                ? [container]
                : (container || document).querySelectorAll(SEL);

            for (let g = 0; g < grids.length; g++) {
                const grid = grids[g];
                const items = grid.children;
                for (let i = 0; i < items.length; i++) items[i].classList.remove(CLS);
                if (!items.length) continue;

                // Skip hidden/non-laid-out grids (offsetTop is 0 for all items)
                if (!grid.offsetParent) continue;

                const lastTop = items[items.length - 1].offsetTop;
                for (let i = items.length - 1; i >= 0; i--) {
                    if (items[i].offsetTop === lastTop) {
                        items[i].classList.add(CLS);
                    } else {
                        break;
                    }
                }
            }
        }

        function startListening() {
            if (listening) return;
            listening = true;
            NDS.onResize(() => scan());
        }

        function update(container) {
            scan(container);
            // Start resize listener on first call that finds grids
            if (!listening && document.querySelector(SEL)) startListening();
        }

        document.addEventListener('DOMContentLoaded', () => update());

        return { update };
    })();
})();
