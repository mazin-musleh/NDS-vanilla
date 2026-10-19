/* NDS core utilities — public surface
 * Rides: (none — every other file rides THIS one)
 * Methods:
 *   state + status
 *     NDS.State.add / .remove / .set / .has / .get / .clear / .apply (el, ...tokens)
 *                                     the data-state token list
 *     NDS.State.parse(el)              the tokens as a Set
 *     NDS.State.onAdd / .onRemove (token, scope, fn)   react to a token; returns off()
 *     NDS.Status.set / .get / .clear (el, status)      the data-status value
 *     NDS.aria.expanded / .hidden / .pressed / .selected / .disabled / .label / .current
 *              / .sort (el, value)     write an ARIA attribute (null removes it)
 *   page facts (live getters, not snapshots)
 *     NDS.lang · NDS.isArabic · NDS.isRTL · NDS.prefersReducedMotion
 *     NDS.breakpoints                  the media-query strings the components share
 *   pooled observers — each returns an off() function, and you must call it
 *     NDS.onResize(fn) · NDS.onIntersect(el, fn, opts) · NDS.onElementResize(el, fn)
 *     NDS.onDOMAdd(sel, fn) · NDS.onDOMRemove(sel, fn) · NDS.onChildrenChange(sel, fn)
 *     NDS.onAttrChange(sel, attrs, fn) · NDS.onOutsideScroll(el, fn)
 *   scheduling
 *     NDS.debounce(fn, ms) (.cancel() drops a pending call) · NDS.rafThrottle(fn) · NDS.onIdle(fn, timeout)
 *     NDS.afterPaint(fn) · NDS.onTransitionEnd(el, fn, opts) → cancel()
 *     NDS.transitionSpeed()            the token-sourced duration in ms
 *   DOM
 *     NDS.markHome(el) / .sendHome(el) / .homeOf(el)   move a node the app owns; its old spot answers for it
 *     NDS.topLayer(el, on)             show or hide a [popover] in the top layer, in place
 *     NDS.resolveEl(idOrElOrSel) · NDS.fromTemplate(id) · NDS.flipPosition(trigger, menu) · NDS.place(el, t, l)
 *     NDS.stickyHeaderBottom() · NDS.viewportPadding(el) · NDS.visibleBox() · NDS.scrollBelowNav(el, opts) · NDS.scrollLock.lock/unlock
 *     NDS.gridLastRow.update(container) · NDS.trapFocus(getEl) · NDS.focusableSel
 *     NDS.cellText(cell)               a table cell's own text, the value sort and export read
 *     NDS.ownParts(root, sel, ownerSel)   root's own matches, not a nested instance's
 *   data + text
 *     NDS.request(url, opts) → Promise<{isJson, data}>     the shared fetch wrapper
 *     NDS.writeUrlParams(params|string)   rewrite the URL's ?params in place; path, hash and history.state stay
 *     NDS.cache.get / .clear (key) · .set (key, value, minutes)   localStorage with expiry
 *     NDS.formatNumber(n, opts) · NDS.latinDigits(s) · NDS.escapeHtml(s) · NDS.safeUrl(url) · NDS.uniqueId(prefix)
 *     NDS.date                         dates in Gregorian and Hijri: _js/nds-date.js
 *     NDS.announce(text)               say something in the shared live region
 *     NDS.i18n.load(component, lang)   a promise of a section's words
 *     NDS.i18n.strings(component, defaults) → { text, set, load, ready, has, defaults }   a component's strings;
 *                                      set() marks a fixed word for core, re-writes one with {vars}
 *     data-i18n="section.key" · data-i18n-{aria-label|aria-description|title|alt|placeholder|label}
 *                                      a marker: core writes the word in the page language, unless
 *                                      a script or the author changed it since
 *     NDS.i18n.translate(root?)         translate the markers in root now (mount/refresh call it)
 *     NDS.i18n.settled → Promise        the pack landed, failed, or 3 s passed; then <html data-nds-i18n>
 *     NDS.i18n.pack() → Promise         the page language's pack
 *     NDS.i18n.format(value, vars)     fill {name}; a plural value picks by vars.n
 *     NDS.i18n.safeMerge(target, src)  copy own keys, skipping __proto__ / constructor / prototype
 *     NDS.setValue(el, value, { change }) write value (checked: a click), fire input + change
 *     NDS.badge(el, count) · NDS.buildChip(value, opts)
 * Events:
 *   nds:template:ready    on the stamped root, bubbles — detail.id is the summoned id.
 *                         Fires after NDS.Init.refresh wires the arrivals, so page JS
 *                         that needs the markup binds on document and waits for it
 * Hooks:
 *   data-state    the token list NDS.State owns — space separated, matched with ~=
 *   data-status   the single value NDS.Status owns
 * Gotchas:
 *   - There is no init(). Core is a utility layer, loaded first and consumed by everyone.
 *   - Every observer helper is POOLED — one observer per page, shared. Each call returns
 *     an off() function; not calling it leaks a subscriber for the page's lifetime.
 *   - NDS.request is a fetch wrapper and nothing more — no XHR, no upload progress, no
 *     retry, no cache layer and no interceptors.
 *   - data-state is a LIST. Never write it with setAttribute; go through NDS.State so
 *     other tokens survive and the onAdd/onRemove hooks fire.
 */
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
    // The script is found as the loader finds it: its own tag, else the page's nds-main
    // tag (a module has no currentScript). The assets folder is the one above it, when
    // it sits in js/ or is named nds-main; any other src (a site's own bundle) falls
    // back to page-relative.
    //
    // Override layers, in priority order:
    //   1. window.NDS_I18N_PATH       → only the i18n directory (component-specific)
    //   2. window.NDS_ASSETS_PATH     → entire assets directory (e.g. CDN)
    //   3. auto-derived from script src
    //   4. 'assets/' (page-relative fallback)
    // Set the override BEFORE this bundle loads.
    const _scriptSrc = (document.currentScript
        || [...document.scripts].find(s => /nds-main(\.min)?\.js/.test(s.src)) || {}).src || '';
    const _isOwnPath = /\/js\/[^/?#]+\.js(?:[?#]|$)|nds-main(\.min)?\.js/.test(_scriptSrc);
    const ASSETS_VER = (_scriptSrc.match(/\?ver=[^&#]*/) || [''])[0];
    const ASSETS_BASE = window.NDS_ASSETS_PATH
                     || (_isOwnPath ? new URL('../', _scriptSrc).href : '');

    // ── Breakpoints (matches _mixins.scss) ─────────────────────────
    // Usage: NDS.breakpoints.desktop → '(width >= 960px)'
    //        window.matchMedia(NDS.breakpoints.mobile).matches
    // Range syntax, not max-width: N - 1. A tier ending at 959px stops matching at
    // 959.01 while the next has not started, so a viewport of 959.2 — ordinary under
    // browser zoom — matched neither tier. `<` and `>=` on the same number are exact
    // complements, so every width lands in exactly one tier, here and in the CSS.
    NDS.breakpoints = {
        mobile:          '(width < 600px)',
        tablet:          '(width >= 600px)',
        'tablet-max':    '(width < 960px)',
        desktop:         '(width >= 960px)',
        'desktop-max':   '(width < 1280px)',
        'large-desktop': '(width >= 1280px)'
    };

    // ── Language & Direction (live) ──────────────────────────────────
    // BCP 47: 'ar', 'ar-SA', 'ar-EG' → 'ar'  |  'en', 'en-US' → 'en'
    // Usage: NDS.lang    → 'ar' | 'en' | ...
    //        NDS.isArabic → true/false
    //        NDS.isRTL   → true/false
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

    // ── Reduced-motion preference (live getter) ──────────────────────
    // Reads the user's prefers-reduced-motion preference live so callers
    // react to runtime toggles (OS setting changes, DevTools Rendering
    // panel). Mirrors NDS.isRTL — a live boolean derived from a single
    // system source. Components that need to re-render on a runtime
    // toggle still want raw `window.matchMedia(...).addEventListener` —
    // this getter only exposes the snapshot read.
    // Usage: if (NDS.prefersReducedMotion) callback(); else animate();
    // Covers BOTH the OS preference and the a11y panel's reduce-motion mode. CSS
    // handles the panel for animations, but an explicit scroll behavior:'smooth'
    // outranks scroll-behavior, so JS-driven motion has to read the mode here.
    Object.defineProperty(NDS, 'prefersReducedMotion', {
        get() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                document.documentElement.matches('[data-a11y~="reduce-motion"]');
        }
    });

    // ── i18n ─────────────────────────────────────────────────────────
    // One pack per language NDS ships besides English, assets/i18n/{lang}.json, keyed by component
    // and built from _i18n/ (scripts/check-i18n.mjs --build). English is built in: the JS defaults
    // and the markup. A missing pack, section or key shows the English.
    //
    // Override hooks:
    //   window.NDS_I18N      = { '{component}': {...}, ... }   inline strings, read on every lookup
    //   window.NDS_I18N_PATH = '/custom/'                       base path, read once per file
    //
    // Markers (plans/i18n-markers.md): data-i18n="section.key" writes an element's text, and
    // data-i18n-{attribute}="section.key" that attribute. Core translates them all once the pack
    // settles, then each one added or changed later. The six names are the attribute allowlist.
    const I18N_MARKS = {
        'data-i18n': 'text',
        'data-i18n-aria-label': 'aria-label',
        'data-i18n-aria-description': 'aria-description',
        'data-i18n-title': 'title',
        'data-i18n-alt': 'alt',
        'data-i18n-placeholder': 'placeholder',
        'data-i18n-label': 'label',
    };
    const I18N_MARK_SEL = Object.keys(I18N_MARKS).map(a => `[${a}]`).join(',');
    NDS.i18n = {
        _files: Object.create(null),   // 'ar' → the pack, once landed (null when none)
        _loads: Object.create(null),   // same keys → Promise<data>

        // A promise of a section's words, in the page's language or lang. A marked word needs no
        // wait: core writes it, and the CSS holds it as a bar until then.
        load(component, lang) {
            if (this._fromFiles(component, lang) !== undefined) return Promise.resolve(this._section(component, lang));
            return this._get(component, lang).then(() => this._section(component, lang));
        },

        // The page's language, or the one a component passes ('ar-SA' → 'ar'). Anything
        // that isn't a BCP-47 base tag (2–3 letters) is 'en' — guards the fetch URL
        // against <html lang="../foo"> traversal.
        _lang(lang) {
            const l = String(lang || NDS.lang).split('-')[0].toLowerCase();
            return /^[a-z]{2,3}$/.test(l) ? l : 'en';
        },

        // A section's words in a language: undefined until known, then the pack's section, or
        // null when it has none. English is built in (the JS defaults and the markup), so an
        // English page loads no file. Ignores the override: an override is no sign the file landed.
        _fromFiles(component, lang) {
            lang = this._lang(lang);
            if (lang === 'en') return null;
            const pack = this._files[lang];
            if (pack === undefined) return undefined;
            return pack && component in pack ? pack[component] : null;
        },

        // The files' text with the inline override laid over it key by key. Until they
        // land, the override stands alone.
        _section(component, lang) {
            const inline = window.NDS_I18N && window.NDS_I18N[component];
            const data = this._fromFiles(component, lang);
            if (!inline) return data;
            return data ? Object.assign({}, data, inline) : inline;
        },

        _get(component, lang) { return this.pack(lang); },

        // A language's pack (the page's by default), landed; English has none. settled is the
        // capped promise the loader waits on.
        pack(lang) {
            lang = this._lang(lang);
            return lang === 'en' ? Promise.resolve(null) : this._file(lang);
        },

        // One fetch per pack per page. A missing pack is null, so English shows.
        _file(path) {
            return this._loads[path] || (this._loads[path] = this._fetchOne(path)
                .then(data => (this._files[path] = data || null)));
        },

        // A component's strings: English defaults until its file lands.
        //   s.text(key, vars, lang)     the word in the page's language, or in lang (fetched on first use)
        //   s.set(el, attr, key, vars)  write an attribute ('text' = textContent) now. A fixed word
        //                               also gets its marker, so core owns it; one with {vars} is
        //                               written again when the file lands, unless it changed since
        //   s.load(lang)                a promise of the section's words
        //   s.ready(lang)               true once the text for that language is known
        //   s.has(key)                  the component defines this key (for keys from outside)
        strings(component, defaults) {
            const I = this, queue = [];
            // The section's English: text() and its markers fall back to it when no file has the key.
            I._seeds[component] = Object.assign(I._seeds[component] || {}, defaults);
            const has = (o, k) => !!o && Object.prototype.hasOwnProperty.call(o, k);
            const landed = () => I._fromFiles(component) !== undefined;
            const read = (el, attr) => (attr === 'text' ? el.textContent : el.getAttribute(attr));
            const write = (el, attr, v) => (attr === 'text' ? (el.textContent = v) : el.setAttribute(attr, v));
            const t = (key, vars, lang) => {
                if (lang && I._fromFiles(component, lang) === undefined) I._get(component, lang);
                const d = I._section(component, lang);
                // Own keys only: a key from outside (a cached value, a browser error name) never reaches Object.prototype.
                // The English every strings() call for this section declared, not only this one's.
                const seed = I._seeds[component];
                return I.format(has(d, key) ? d[key] : has(seed, key) ? seed[key] : key, vars, lang);
            };
            return {
                text: t,
                defaults,
                load: lang => I.load(component, lang),
                ready: lang => I._fromFiles(component, lang) !== undefined,
                has: key => has(defaults, key),
                set(el, attr, key, vars) {
                    const v = t(key, vars);
                    write(el, attr, v);
                    // A fixed word becomes a marker, so core owns it from here, as markup would.
                    const mark = attr === 'text' ? 'data-i18n' : 'data-i18n-' + attr;
                    if (!vars && mark in I18N_MARKS) { el.setAttribute(mark, component + '.' + key); return; }
                    if (landed()) return;
                    if (!queue.length) I.load(component).then(() => queue.splice(0).forEach(([e, a, was, k, vs]) => {
                        if (read(e, a) === was) write(e, a, t(k, vs));
                    }));
                    queue.push([el, attr, v, key, vars]);
                },
            };
        },

        // Fill {name} from vars. A plural value is an object of Intl.PluralRules
        // categories ({ one, two, few, many, other }), picked by vars.n.
        format(value, vars, lang) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                lang = this._lang(lang);
                const rules = this._plural[lang] || (this._plural[lang] = new Intl.PluralRules(lang));
                value = value[rules.select(vars && vars.n)] || value.other;
            }
            if (typeof value !== 'string' || !vars) return value;
            return value.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
        },
        _plural: Object.create(null),

        // ?ver= rides along so a release never serves a stale file.
        async _fetchOne(path) {
            const base = window.NDS_I18N_PATH || (ASSETS_BASE ? ASSETS_BASE + 'i18n/' : 'assets/i18n/');
            try {
                const { data } = await NDS.request(base + path + '.json' + ASSETS_VER, { cache: 'default', json: true });
                return data;
            } catch (err) {
                // A 404 is a language NDS does not ship: English shows, and a site adds its words with NDS_I18N.
                if (err.status !== 404) console.warn('[NDS.i18n] ' + path + ' failed', err);
                return null;
            }
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

        _seeds: Object.create(null),   // section → the JS defaults its strings() call registered
        _written: new WeakMap(),       // element → { target: { wrote: core's last write, was: the markup word it replaced } }
        _warned: new Set(),
        _warnOnce(msg) { if (!this._warned.has(msg)) { this._warned.add(msg); console.warn('[NDS.i18n] ' + msg); } },

        // The word a marker names, through text()'s chain: the override, the pack, the script's
        // English. Also that English (the JS default): the guard's baseline. word null: leave the markup.
        _word(ref) {
            const m = /^([a-z][a-z0-9-]*)\.([A-Za-z0-9_]+)$/.exec(ref);
            if (!m) {
                this._warnOnce(`marker "${ref}" is not section.key: a 1.x marker; write the section too, such as accessibility.${ref}`);
                return { word: null };
            }
            const [, section, key] = m;
            const own = (o) => !!o && Object.prototype.hasOwnProperty.call(o, key);
            const d = this._section(section), seed = this._seeds[section];
            const v = own(d) ? d[key] : own(seed) ? seed[key] : undefined;
            const english = own(seed) ? seed[key] : undefined;
            if (typeof v === 'string' && !/\{\w+\}/.test(v)) return { word: v, english };
            // A missing word is no error: the pack may not be in yet, or the section's script not
            // loaded, and the markup's English shows. check-i18n catches a misspelled section.
            if (v !== undefined) this._warnOnce(`${ref} has {vars} or plural forms: write it with set(), not a marker`);
            return { word: null };
        },

        // One element's markers. The guard: core skips a word someone changed. Untouched by core,
        // that is a word that no longer reads its English (when core knows the English); touched,
        // a word that reads neither what core wrote nor the markup word it replaced. It never adds an absent attribute.
        // force: the marker itself changed, so its new word always lands.
        _mark(el, force) {
            for (const name in I18N_MARKS) {
                const ref = el.getAttribute(name);
                if (ref === null) continue;
                if (!ref.trim()) {
                    this._warnOnce(`${name} with no value: a 1.x marker; name its word, ${name}="section.key"`);
                    continue;
                }
                const { word: v, english } = this._word(ref.trim());
                if (v === null) continue;
                const target = I18N_MARKS[name];
                const isText = target === 'text';
                if (isText && el.firstElementChild) {
                    this._warnOnce(`${ref}: data-i18n goes on an element that holds only the word`);
                    continue;
                }
                if (!isText && !el.hasAttribute(target)) continue;
                const seen = this._written.get(el) || {};
                const prev = seen[target];
                const cur = isText ? el.textContent : el.getAttribute(target);
                // prev.was: the markup word core replaced. A morph (Livewire, Turbo, htmx) puts it back, and it is still NDS's.
                if (!force && (prev ? cur !== prev.wrote && cur !== prev.was : typeof english === 'string' && cur.trim() !== english)) continue;
                if (cur.trim() !== v) {
                    if (!isText) el.setAttribute(target, v);
                    else {
                        // Write the lone text node: a framework's node and comment anchors survive, and no childList record fires.
                        const texts = [...el.childNodes].filter(n => n.nodeType === 3);
                        if (texts.length === 1) texts[0].nodeValue = v; else el.textContent = v;
                    }
                }
                seen[target] = { wrote: isText ? el.textContent : v, was: prev && !force ? prev.was : cur };
                this._written.set(el, seen);
            }
        },

        // Translate every marker in root (the document by default): root itself, its
        // descendants, and the content of each <template>, so a later clone lands translated.
        translate(root = document) {
            const walk = (r) => {
                if (r.nodeType === 1 && r.matches(I18N_MARK_SEL)) this._mark(r);
                r.querySelectorAll(I18N_MARK_SEL).forEach(el => this._mark(el));
                r.querySelectorAll('template').forEach(t => walk(t.content));
            };
            walk(root);
        },

        // The loader calls this from initialize(), so data-nds-auto-init="false" holds it too.
        // Once the pack settles: one walk, the data-nds-i18n stamp that releases the CSS hold,
        // then the markers added or changed later. A pack that lands after the 3 s cap walks
        // again; the guard keeps it to the words still in English.
        start() {
            if (this._started) return;
            this._started = true;
            this.settled.then(() => {
                this.translate();
                document.documentElement.setAttribute('data-nds-i18n', '');
                NDS.onDOMAdd(I18N_MARK_SEL, els => els.forEach(el => this._mark(el)));
                NDS.onAttrChange(I18N_MARK_SEL, Object.keys(I18N_MARKS), els => els.forEach(el => this._mark(el, true)));
                this.pack().then(() => this.translate());
            });
        },
    };

    // ── Request ──────────────────────────────────────────────────────
    // Shared fetch wrapper owning the response contract every fetching
    // component used to answer differently: abort composition, ok-check,
    // Content-Type branch, byte cap, timeout. It never touches loading
    // state, response application, or request construction — those are
    // per-component and unresolvable here.
    // Usage: const { isJson, data } = await NDS.request(url, { signal, json: true })
    // Distinguish failures without parsing message text:
    //   error.status              → HTTP error (also carries .url and .body — best-effort
    //                               body slice, first ~512 bytes, undefined if the read failed)
    //   error.name 'TimeoutError' → hit `timeout`
    //   error.name 'AbortError'   → caller aborted via `signal`
    //   neither                   → byte cap exceeded
    // Best-effort widget that wants a fallback instead of a throw on non-2xx? Wrap
    // it at the call site — no NDS option needed for a one-liner:
    //   const optional = (url, opts) =>
    //       NDS.request(url, opts).catch(err => err.status ? null : Promise.reject(err));
    // Adding an option? The name space is SHARED with fetch — anything
    // destructured here is a name fetch can never use, and if fetch ever grows
    // one we already claim, we swallow it silently. Only claim names the spec
    // would never take (`retry`, `csrf` fine; `priority`, `keepalive`, `duplex`
    // would have been landmines). `signal` is claimed deliberately: it is
    // composed with the timeout rather than forwarded.
    // Safari < 17.4 has no AbortSignal.any (and < 16 no .timeout): compose by hand
    // there, keeping the TimeoutError / AbortError contract below.
    // timeout:0 opts out. AbortSignal.timeout(0) would abort immediately,
    // burning the obvious spelling for "no timeout".
    const composeSignal = (signal, timeout) => {
        if (AbortSignal.any) return AbortSignal.any([signal, timeout && AbortSignal.timeout(timeout)].filter(Boolean));
        const ctrl = new AbortController();
        if (signal?.aborted) ctrl.abort(signal.reason);
        else signal?.addEventListener('abort', () => ctrl.abort(signal.reason), { once: true });
        if (timeout) setTimeout(() => ctrl.abort(new DOMException('Request timed out', 'TimeoutError')), timeout);
        return ctrl.signal;
    };
    NDS.request = async (url, { signal, timeout = 15000, maxBytes = 1048576, json, ...init } = {}) => {
        const res = await fetch(url, {
            ...init,
            signal: composeSignal(signal, timeout)
        });
        if (!res.ok) {
            // Best-effort body slice so the thrown Error tells the operator what
            // the server actually said (typical error page > 512 bytes; we truncate).
            // A read failure here must not mask the HTTP error — swallow and move on.
            let body;
            try { body = await readCapped(res, 512, true); } catch {}
            throw Object.assign(new Error(`HTTP ${res.status}: ${res.statusText}`),
                                { status: res.status, url, body });
        }
        // Callers that know their endpoint pass json:true — a wrong Content-Type
        // must not silently downgrade a JSON response to a string.
        const isJson = json ?? (res.headers.get('Content-Type') || '').includes('application/json');
        const text = await readCapped(res, maxBytes);
        return { isJson, data: isJson && text ? JSON.parse(text) : text };
    };

    // Read a response body as text, refusing anything over maxBytes. Streams so
    // an oversized body is cancelled mid-flight rather than buffered whole — a
    // Content-Length check alone can be omitted or lied about.
    // truncate=true: don't throw on oversize — cancel and return what fits.
    // Used by the error path where a slice is diagnostic, not the payload.
    const readCapped = async (res, maxBytes, truncate) => {
        if (!res.body) return '';   // 204 / HEAD
        const declared = res.headers.get('Content-Length');
        if (declared && parseInt(declared, 10) > maxBytes && !truncate) throw new Error('Response too large');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let text = '';
        let totalBytes = 0;
        while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            totalBytes += chunk.value.length;
            if (totalBytes > maxBytes) {
                reader.cancel();
                if (truncate) return (text + decoder.decode(chunk.value)).slice(0, maxBytes);
                throw new Error('Response too large');
            }
            text += decoder.decode(chunk.value, { stream: true });
        }
        return text;
    };

    // Start the pack now: nearly every page needs it, and most components init after it lands.
    // settled: the pack landed or failed, or 3 s passed. The loader and the marker pass wait on it.
    // ponytail: past 3 s a slow pack starts the late components and the markers in English.
    NDS.i18n.settled = Promise.race([NDS.i18n.pack(), new Promise(r => setTimeout(r, 3000))]);

    // ── Debounce ─────────────────────────────────────────────────────
    // Usage: const fn = NDS.debounce(handler, 150)
    NDS.debounce = (fn, ms) => {
        let t;
        const debounced = (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
        debounced.cancel = () => clearTimeout(t); // destroy paths drop the pending call
        return debounced;
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

    // ── After Paint ──────────────────────────────────────────────────
    // Schedules fn to run after the NEXT paint commits — implemented as
    // two nested requestAnimationFrames. Use when a "from-state" must
    // paint before a "to-state" mutation triggers a CSS transition
    // (priming the transition by stamping one state, then removing it
    // after the browser has painted the from-state so the change to
    // the to-state animates instead of jumping).
    // Usage: NDS.afterPaint(() => NDS.State.remove(panel, 'opening'));
    NDS.afterPaint = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

    // ── Number formatting rule ───────────────────────────────────────
    // THE separator rule for every number NDS renders — .nds-number-format
    // (nds-numbers.js), the pagination records slots, and the selection
    // count all route here so they can never drift.
    // Page lang, Latin digits: one look whatever the browser's language. A bad lang falls back to en.
    NDS.formatNumber = (n, opts) => {
        try { return n.toLocaleString(`${document.documentElement.lang || 'en'}-u-nu-latn`, opts); }
        catch { return n.toLocaleString('en', opts); }
    };

    // Arabic digits (both Unicode forms) → ASCII by their low nibble: what a field reads from a paste or autofill.
    NDS.latinDigits = (s) => String(s ?? '').replace(/[٠-٩۰-۹]/g, (c) => c.charCodeAt(0) & 15);


    // ── Run-When-Idle ────────────────────────────────────────────────
    // Defers work to a browser-idle slot via requestIdleCallback, with a
    // setTimeout fallback for environments without rIC. Use for non-critical
    // init-time work (topbar widget API calls, post-load analytics, etc.)
    // that shouldn't compete with the post-DCL hydration window.
    // Fallback fidelity gap: without rIC (older Safari <18) the setTimeout(fn, 1)
    // path fires ~immediately as a macrotask — NOT at true idle — and ignores the
    // `timeout` arg, so idle-tier work runs right after the critical pass there.
    // nds-loader.js `scheduleIdle` has a deadline-aware shim if a path must defer.
    // Usage: NDS.onIdle(() => fetchWeather(), 2000)
    NDS.onIdle = (fn, timeout = 2000) => {
        if (typeof requestIdleCallback === 'function') {
            requestIdleCallback(fn, { timeout });
        } else {
            setTimeout(fn, 1);
        }
    };

    // ── Subscriber lists (the pooled buses below) ────────────────────
    const subscribe = (list, sub) => {
        list.push(sub);
        return () => { const i = list.indexOf(sub); if (i !== -1) list.splice(i, 1); };
    };
    // A callback that calls its own off() shifts the list: step back, or the next subscriber is skipped.
    const each = (list, call) => {
        for (let i = 0; i < list.length; i++) { const sub = list[i]; call(sub); if (list[i] !== sub) i--; }
    };

    // ── Window Resize Bus ────────────────────────────────────────────
    // Single listener, 150ms debounce, fan-out to subscribers
    // Usage: const off = NDS.onResize(handler)
    NDS.onResize = (() => {
        const subs = [];
        const fire = NDS.debounce(() => each(subs, fn => fn()), 150);
        window.addEventListener('resize', fire, { passive: true });
        return fn => subscribe(subs, fn);
    })();

    // ── Element Resize Observer ──────────────────────────────────────
    // Single ResizeObserver, multiple elements
    // Usage: const off = NDS.onElementResize(el, handler)
    //        handler(entry) may RETURN a function: its writes. Every handler in
    //        the batch reads first, then the writes run together — a write between
    //        two handlers' reads forces one layout per element (34 scroll-mores
    //        cost 68ms@6.6x that way).
    NDS.onElementResize = (() => {
        const map = new Map();
        const ro = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(entries => {
                const writes = [];
                for (let i = 0; i < entries.length; i++) {
                    const fns = map.get(entries[i].target);
                    if (fns) fns.forEach(fn => {
                        const write = fn(entries[i]);
                        if (typeof write === 'function') writes.push(write);
                    });
                }
                for (let i = 0; i < writes.length; i++) writes[i]();
            })
            : null;

        return (el, fn) => {
            if (!ro) return () => {};
            let fns = map.get(el);
            if (!fns) { fns = new Set(); map.set(el, fns); ro.observe(el); }
            fns.add(fn);
            return () => {
                if (!fns.delete(fn)) return; // a repeat off() must not unobserve a newer subscriber
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
                        const fns = map.get(entries[i].target);
                        if (fns) fns.forEach(fn => fn(entries[i]));
                    }
                }, { threshold: opts.threshold || 0, rootMargin: opts.rootMargin || '0px' });
                group = { io, map };
                pool.set(key, group);
            }
            // A Set per element, as in onElementResize: two subscribers on one element both fire.
            let fns = group.map.get(el);
            if (!fns) { fns = new Set(); group.map.set(el, fns); group.io.observe(el); }
            fns.add(fn);
            return () => {
                if (!fns.delete(fn) || fns.size) return; // a repeat off() must not drop a newer subscriber
                group.map.delete(el);
                group.io.unobserve(el);
                if (!group.map.size) { group.io.disconnect(); pool.delete(key); }
            };
        };
    })();

    // ── DOM Mutation Bus ─────────────────────────────────────────────
    // Single MutationObserver on <html>, selector-based dispatch.
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
            each(subs, sub => {
                // A Set: a parent and its child added in one batch both reach the child.
                const hits = new Set();
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].matches(sub.sel)) hits.add(nodes[i]);
                    const ch = nodes[i].querySelectorAll(sub.sel);
                    for (let c = 0; c < ch.length; c++) hits.add(ch[c]);
                }
                if (hits.size) sub.fn([...hits]);
            });
        }

        function dispatchParents(parents, subs) {
            each(subs, sub => {
                const hits = [];
                parents.forEach(p => { if (p.matches(sub.sel)) hits.push(p); });
                if (hits.length) sub.fn(hits);
            });
        }

        function start() {
            if (started) return;
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
                // A reparent (e.g. NDS.markHome, then appendChild elsewhere) emits
                // both a remove and an add for the same node in one batch. Treat
                // that as a move, not a lifecycle change — drop those nodes from
                // both lists so subscribers (and any descendants matching their
                // selectors) keep their instances, listeners, and internal state
                // across relocations and similar reparents.
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
            }).observe(document.documentElement, { childList: true, subtree: true });   // <html>: a whole-body swap (Turbo Drive) stays in view
        }

        return { addSubs, removeSubs, childrenSubs, start };
    })();

    const onDOM = (list) => (sel, fn) => { domBus.start(); return subscribe(list, { sel, fn }); };
    NDS.onDOMAdd = onDOM(domBus.addSubs);
    NDS.onDOMRemove = onDOM(domBus.removeSubs);
    NDS.onChildrenChange = onDOM(domBus.childrenSubs);

    // ── Attribute Change Observer ────────────────────────────────────
    // Single MutationObserver on <html> for attribute changes, selector-based dispatch.
    // Observing documentElement (not body) so subscribers can match 'html' itself —
    // e.g. lang/dir changes for direction-aware components.
    // Returns an unsubscribe handle so per-instance callers can release
    // their subscription. Mirrors the DOM Mutation Bus shape above.
    // Usage: const off = NDS.onAttrChange('.nds-progress-circle', ['data-value', 'data-num'], els => { ... })
    //        // later: off();  releases the subscriber
    const attrSubs = [];
    const attrNames = new Set();
    let attrMo;
    NDS.onAttrChange = (sel, attrs, fn) => {
        if (!attrMo) {
            attrMo = new MutationObserver(mutations => {
                const changed = new Map();
                for (let i = 0; i < mutations.length; i++) {
                    const el = mutations[i].target;
                    if (!changed.has(el)) changed.set(el, new Set());
                    changed.get(el).add(mutations[i].attributeName);
                }
                each(attrSubs, sub => {
                    const hits = [];
                    changed.forEach((attrs, el) => {
                        // Attribute check before matches(): this observer sees every
                        // attribute write on the page, and matches() is the expensive half.
                        let watched = false;
                        for (const a of attrs) { if (sub.attrs.has(a)) { watched = true; break; } }
                        if (watched && el.matches(sub.sel)) hits.push(el);
                    });
                    if (hits.length) sub.fn(hits);
                });
            });
        }
        // attributeFilter = the union of every subscriber's names, re-observed as it
        // grows. Without it the observer records EVERY attribute write on the page
        // for its lifetime — class, aria, style, init stamps — and runs the callback.
        const before = attrNames.size;
        attrs.forEach(a => attrNames.add(a));
        if (attrNames.size !== before) {
            attrMo.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: [...attrNames] });
        }
        return subscribe(attrSubs, { sel, attrs: new Set(attrs), fn });
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
    //        NDS.State.onAdd(state, scope, fn)    → register hook: fn(el) fires when state added on el matching scope; returns off()
    //        NDS.State.onRemove(state, scope, fn) → register hook: fn(el) fires when state removed; returns off()
    NDS.State = (() => {
        // Null prototype: a token named like an Object.prototype key ('constructor') has no hooks.
        const _onAdd = Object.create(null);    // { 'disabled': [{ scope, fn }, ...] }
        const _onRemove = Object.create(null);

        function _fire(hooks, token, el) {
            const fns = hooks[token];
            if (fns) each(fns, sub => { if (el.matches(sub.scope)) sub.fn(el, token); });
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

        // No Set for a read: has() runs per row on every selection recount.
        const has = (el, state) => {
            const cur = el && el.getAttribute('data-state');
            return !!cur && !!state && (cur === state || cur.split(/\s+/).includes(state));
        };

        const get = el => el ? (el.getAttribute('data-state') || '') : '';

        // set and clear replace the list, so the hooks hear each token that left or arrived.
        const _swap = (el, before) => {
            const after = parse(el);
            before.forEach(t => { if (!after.has(t)) _fire(_onRemove, t, el); });
            after.forEach(t => { if (!before.has(t)) _fire(_onAdd, t, el); });
        };

        const set = (el, ...states) => {
            if (!el) return;
            const before = parse(el);
            states.length ? el.setAttribute('data-state', states.join(' '))
                          : el.removeAttribute('data-state');
            _swap(el, before);
        };

        const clear = el => {
            if (!el) return;
            const before = parse(el);
            el.removeAttribute('data-state');
            _swap(el, before);
        };

        const apply = (el, ...states) => {
            if (!el) return;
            const cur = parse(el);
            for (let i = 0; i < states.length; i++) {
                if (cur.has(states[i])) _fire(_onAdd, states[i], el);
            }
        };

        const onAdd = (state, scope, fn) => subscribe(_onAdd[state] ||= [], { scope, fn });
        const onRemove = (state, scope, fn) => subscribe(_onRemove[state] ||= [], { scope, fn });

        return { parse, add, remove, has, get, set, clear, apply, onAdd, onRemove };
    })();

    // ── Token mirrors ────────────────────────────────────────────────
    // CSS spells these tokens as a class; the data-state token stays the JS/markup
    // input and is mirrored onto the class here. Chrome keys attribute invalidation
    // by NAME, so every `[data-state] Y` rule feeds ONE shared set and every state
    // write anywhere restyles each matching Y under it (PERF-06). Tokens whose CSS
    // must reach descendants — loading's `> *`, the drawer's and upload's `.nds-btn`
    // / `.nds-form-control` rules, the table stripe's `of` list — key on their
    // class, whose set only they touch.
    // The observer catches State writes and bare setAttribute alike, in a microtask —
    // before the next paint, not inside the write. The scan covers markup that ships
    // with a token and runs before the reveal (0.2ms at 6.6x for loading).
    const MIRRORS = { loading: 'nds-loading', hidden: 'nds-hidden', 'has-more': 'nds-has-more', 'always-open': 'nds-always-open', dropbox: 'nds-dropbox' };
    const _mirrored = new WeakMap();
    const mirrorTokens = (el) => {
        const cur = NDS.State.parse(el);
        let mine = _mirrored.get(el);
        for (const token in MIRRORS) {
            const cls = MIRRORS[token], on = cur.has(token);
            if (on && !el.classList.contains(cls)) {
                el.classList.add(cls);
                if (!mine) _mirrored.set(el, mine = new Set());
                mine.add(cls);
            } else if (!on && mine && mine.has(cls)) { el.classList.remove(cls); mine.delete(cls); }
        }
        // Loading tells a screen reader too: wait for the content. An aria-busy the author wrote stays theirs.
        if (cur.has('loading') && !el.hasAttribute('aria-busy')) {
            el.setAttribute('aria-busy', 'true');
            if (!mine) _mirrored.set(el, mine = new Set());
            mine.add('aria-busy');
        } else if (!cur.has('loading') && mine && mine.delete('aria-busy')) el.removeAttribute('aria-busy');
    };
    NDS.onAttrChange('*', ['data-state'], (els) => els.forEach(mirrorTokens));
    const MIRROR_SEL = Object.keys(MIRRORS).map(t => `[data-state~="${t}"]`).join(',');
    const scanTokens = () => document.querySelectorAll(MIRROR_SEL).forEach(mirrorTokens);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scanTokens, { once: true }); else scanTokens();
    // Markup added later with the token already written fires no attribute change.
    NDS.onDOMAdd(MIRROR_SEL, (els) => els.forEach(mirrorTokens));

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

    // ── aria-* setter namespace ──────────────────────────────────────
    // Null-safe setters for aria-* attributes. Factory-built per attribute:
    //   - boolean attrs (expanded/hidden/pressed/selected/disabled) coerce
    //     the value via Boolean() → 'true' / 'false'
    //   - string attrs (label/current/sort) pass the value through as-is
    //   - null / undefined / '' → removeAttribute (idiomatic for aria-*)
    //   - null el → no-op (callers don't need to guard ahead of the call)
    // Reads use the DOM IDL property directly — `el.ariaExpanded === 'true'`,
    // `el.ariaLabel`, etc. — no NDS wrapper needed. Supported in every
    // evergreen browser since 2021.
    // Usage: NDS.aria.expanded(button, true);
    //        NDS.aria.expanded(toggleButton, !isOpen);
    //        NDS.aria.label(button, 'Open menu');
    //        NDS.aria.label(button, '');           // removes the attribute
    //        if (button.ariaExpanded === 'true') { ... }   // read via IDL
    // To add a new aria-* helper, extend the NDS.aria object below with
    // `<name>: _aria('aria-<name>', <isBool>)`. Do NOT add a flat
    // NDS.aria<Name> at the top level.
    const _aria = (attr, isBool) => (el, value) => {
        if (!el) return;
        if (value == null || value === '') return el.removeAttribute(attr);
        el.setAttribute(attr, isBool ? String(Boolean(value)) : value);
    };
    NDS.aria = {
        expanded: _aria('aria-expanded', true),
        hidden:   _aria('aria-hidden',   true),
        pressed:  _aria('aria-pressed',  true),
        selected: _aria('aria-selected', true),
        disabled: _aria('aria-disabled', true),
        label:    _aria('aria-label',    false),
        current:  _aria('aria-current',  false),
        sort:     _aria('aria-sort',     false),
    };

    // ── Count Badge ──────────────────────────────────────────────────
    // Stamp a count on a button's icon as .nds-badge (styled in _buttons.scss).
    // 0 / null removes it. No icon → no-op; the badge is positioned against the
    // <i>, not the button.
    // The badge text is unreadable to AT whenever the icon is aria-hidden (the
    // convention for .nds-icon), and aria-hidden can't be undone on a descendant —
    // so the count is mirrored into the button's accessible name instead. The base
    // name is taken from the button's own visible label, captured once before any
    // count lands, so no translated string is needed here: "Columns" → "Columns (2)".
    // Usage: NDS.badge(filterBtn, 3);
    NDS.badge = (btn, count) => {
        const icon = btn && btn.querySelector('i, .nds-icon');
        if (!icon) return;

        let badge = icon.querySelector('.nds-badge');
        if (count) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'nds-badge';
                icon.appendChild(badge);
            }
            badge.textContent = count;
        } else if (badge) {
            badge.remove();
        }

        if (btn._ndsBadgeBase === undefined) {
            const label = btn.querySelector('.nds-label');
            // Icon-only buttons carry their name on aria-label — read it before we overwrite it.
            btn._ndsBadgeBase = (label ? label.textContent : btn.getAttribute('aria-label') || '').trim();
        }
        // Keeps the visible label inside the accessible name (WCAG 2.5.3).
        if (btn._ndsBadgeBase) {
            btn.setAttribute('aria-label', count ? `${btn._ndsBadgeBase} (${count})` : btn._ndsBadgeBase);
        }
    };

    // ── Chip Builder ─────────────────────────────────────────────────
    // Removable .nds-chip button: label + cancel icon + click-to-remove.
    // One canonical shape for every chips consumer (taginput, multiselect,
    // filter applied-chips) so a11y details (aria-hidden icon, disabled
    // stamping) can't drift per component.
    //   label — string (rendered via textContent) or a Node (e.g. a
    //           formatted nds-number-format price node)
    //   opts.chipClass — variant classes appended after 'nds-chip'
    //   opts.data      — { camelKey: value } map stamped onto dataset
    //   opts.onRemove  — click handler; the click is preventDefault'ed
    //   opts.disabled  — initial disabled state
    // Usage: chipsEl.appendChild(NDS.buildChip('AI & ML', {
    //            chipClass: 'nds-primary nds-sm',
    //            data: { taginputValue: 'ai' },
    //            onRemove: () => this.removeTag('ai'),
    //        }));
    NDS.buildChip = (label, opts = {}) => {
        const chip = document.createElement('button');
        chip.className = 'nds-chip' + (opts.chipClass ? ' ' + opts.chipClass : '');
        chip.type = 'button';
        if (opts.disabled) chip.disabled = true;
        for (const k in (opts.data || {})) chip.dataset[k] = opts.data[k];

        const text = document.createElement('span');
        text.className = 'nds-label';
        if (label instanceof Node) text.appendChild(label);
        else text.textContent = label;

        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-cancel-01';
        NDS.aria.hidden(icon, true);

        chip.append(text, icon);
        if (opts.onRemove) {
            chip.addEventListener('click', (e) => { e.preventDefault(); opts.onRemove(e); });
        }
        return chip;
    };

    // ── HTML Escape ──────────────────────────────────────────────────
    // Escape a string for text and QUOTED attribute values. Not for unquoted
    // attributes, URLs (NDS.safeUrl), or style/script contents.
    // Usage: el.innerHTML = `<span title="${NDS.escapeHtml(v)}">${NDS.escapeHtml(v)}</span>`
    const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    NDS.escapeHtml = (str) => str == null ? '' : String(str).replace(/[&<>"']/g, (c) => ESC[c]);

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

    // ── Element Reference Resolver ───────────────────────────────────
    // Resolve a consumer-supplied reference to an element. Canonical form is
    // a bare id ('resultsGrid' — matches data-auto-pagination /
    // data-columns-target); '#id', any CSS selector, or an Element also
    // work. Misses and invalid selectors return null.
    // Usage: const grid = NDS.resolveEl('resultsGrid');
    NDS.resolveEl = (ref) => {
        if (!ref) return null;
        if (typeof ref !== 'string') return ref;
        const byId = document.getElementById(ref.replace(/^#/, ''));
        if (byId) return byId;
        try { return document.querySelector(ref); } catch { return null; }
    };

    // ── Cell Text ────────────────────────────────────────────────────
    // A table cell's own text: its direct text nodes, so a sort button, icon or badge
    // inside it stays out; textContent when it has none. The one reader Sort, Export
    // and the column toggle share — in core, so Export (extras) never waits on Tables.
    // Usage: const label = NDS.cellText(th);
    NDS.cellText = (cell) => {
        if (!cell) return '';
        const own = Array.from(cell.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent.trim())
            .filter(Boolean)
            .join(' ');
        return own || cell.textContent.trim();
    };

    // ── Own Parts ────────────────────────────────────────────────────
    // The elements under root matching selector that root's own instance drives: a part
    // whose nearest ownerSel is root, or sits outside root. A nested instance's parts are
    // not root's. Never tests root.matches(ownerSel), so a create() on an element without
    // the class still finds its parts.
    // Usage: const buttons = NDS.ownParts(container, '.nds-accordion-btn', '.nds-accordion');
    NDS.ownParts = (root, selector, ownerSel) => [...root.querySelectorAll(selector)].filter(el => {
        const owner = el.closest(ownerSel);
        return owner === root || !root.contains(owner);
    });

    // ── Template Resolver ────────────────────────────────────────────
    // Resolve an id that may still sit inside a <template>. A modal or panel
    // may ship template-wrapped so its nodes stay out of the DOM until first
    // open; on a live miss this scans the page's templates, moves the owning
    // template's content in right after it, inits the arrivals via
    // NDS.Init.refresh (loader inits are idempotent), fires a bubbling
    // nds:template:ready {id} on the element — page JS binds there, since
    // nothing it looked up at load existed — and returns the element.
    // MUTATING on a template hit — open/toggle paths only; read-only lookups
    // (isOpen, close) keep getElementById so they never move anything.
    NDS.fromTemplate = (id) => {
        if (!id) return null;
        let el = document.getElementById(id);
        if (el) return el;
        const tpls = document.querySelectorAll('template');
        for (let i = 0; i < tpls.length; i++) {
            if (!tpls[i].content.getElementById(id)) continue;
            // After it, not in its place: the emptied <template> stays where a framework put it.
            tpls[i].after(tpls[i].content);
            el = document.getElementById(id);
            if (el) {
                NDS.Init?.refresh?.(el);
                el.dispatchEvent(new CustomEvent('nds:template:ready', { bubbles: true, detail: { id } }));
            }
            return el;
        }
        return null;
    };

    // ── Programmatic Value Write ─────────────────────────────────────
    // Write a field's value (checked on a checkbox or radio) and fire a
    // bubbling input + change pair, so forms and framework bindings see it
    // as typing. { change: false } fires input only, as each keystroke does.
    // Through the prototype setter: React's setter on the node would record
    // the value, and its onChange would then skip the event. Null el no-ops.
    // Usage: NDS.setValue(input, text);
    NDS.setValue = (el, value, { change = true } = {}) => {
        if (!el) return;
        const key = el.type === 'checkbox' || el.type === 'radio' ? 'checked' : 'value';
        // React reads a box from its click: flip it with one, as a user does. A radio can't click off;
        // a disabled box or a cancelled click falls through to the plain write.
        if (key === 'checked' && el.checked !== !!value && (value || el.type === 'checkbox')) {
            el.click();
            if (el.checked === !!value) return;
        }
        const native = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), key);
        if (native?.set) native.set.call(el, value); else el[key] = value;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        if (change) el.dispatchEvent(new Event('change', { bubbles: true }));
    };

    // ── Safe URL (scheme allowlist) ──────────────────────────────────
    // Validate a consumer-supplied URL before it reaches an href, the
    // clipboard, or window.open — javascript:/data:/vbscript: payloads are
    // rejected. Relative URLs resolve against the page. Returns the
    // normalized href, or null when the value is missing, unparsable, or
    // off-allowlist (http/https/mailto/tel).
    // Usage: const href = NDS.safeUrl(btn.dataset.href);
    NDS.safeUrl = (raw) => {
        if (!raw) return null;
        try {
            const u = new URL(raw, window.location.href);
            return ['http:', 'https:', 'mailto:', 'tel:'].includes(u.protocol) ? u.href : null;
        } catch {
            return null;
        }
    };

    // ── URL params ───────────────────────────────────────────────────
    // Rewrites the URL's ?params in place: the path, the hash and history.state all stay.
    // A hash-routed app keeps its route in the hash, a router (React, Vue) its own state
    // in history.state, and a filter or page change must not wipe either. A string is
    // written as is (a leading ? is optional), so a snapshot is restored unre-encoded.
    // Usage: const p = new URLSearchParams(location.search); p.set('page', 2); NDS.writeUrlParams(p);
    NDS.writeUrlParams = (params) => {
        const qs = String(params).replace(/^\?/, '');
        history.replaceState(history.state, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    };

    // ── Sticky Header Bottom ─────────────────────────────────────────
    // Visible bottom edge of the sticky chrome (.nds-topbar + .nds-main-nav)
    // in viewport px — 0 when neither is present or both are scrolled away.
    // Consumers position panels/drawers below it. Queries + gBCR reads run
    // fresh per call (the nav's bottom moves on scroll) — cheap enough for
    // rAF-throttled scroll handlers; keep it out of unthrottled loops.
    // Usage: panel.style.setProperty('--panel-top', NDS.stickyHeaderBottom() + 'px');
    NDS.stickyHeaderBottom = () => {
        const nav = document.querySelector('.nds-main-nav');
        const topbar = document.querySelector('.nds-topbar');
        const navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
        const topbarBottom = topbar ? Math.max(0, topbar.getBoundingClientRect().bottom) : 0;
        return Math.max(navBottom, topbarBottom);
    };

    // The page's side gutter in px. Menus and tooltips keep it from the screen's
    // side edges, so they line up with the content. Internal. 16 where the browser
    // has no @property and reads the token as a calc() string.
    NDS.viewportPadding = (el = document.documentElement) =>
        parseFloat(getComputedStyle(el).getPropertyValue('--nds-viewport-padding')) || 16;

    // The part of the screen the visitor sees, in getBoundingClientRect() coords. A pinch
    // zoom or an on-screen keyboard shrinks it; the layout viewport keeps its size. Internal.
    NDS.visibleBox = () => {
        const v = window.visualViewport, doc = document.documentElement;
        const top = v ? v.offsetTop : 0, left = v ? v.offsetLeft : 0;
        return { top, left, right: left + (v ? v.width : doc.clientWidth), bottom: top + (v ? v.height : doc.clientHeight) };
    };

    // ── Scroll Below Sticky Nav ──────────────────────────────────────
    // Smooth-scroll `target` back into view below the sticky nav — no-op
    // when its top already clears the nav. The gap past the nav is read
    // from a consumer CSS custom property (opts.offsetVar, resolved on
    // opts.offsetEl or the target; 120px default when unset/invalid).
    // Respects prefers-reduced-motion (jumps instead of smooth-scrolling).
    // Usage: NDS.scrollBelowNav(grid, { offsetVar: '--pagination-scroll-offset', offsetEl: nav });
    NDS.scrollBelowNav = (target, opts = {}) => {
        const nav = document.querySelector('.nds-main-nav');
        const navHeight = nav ? nav.offsetHeight : 72;
        const targetTop = target.getBoundingClientRect().top;
        if (targetTop >= navHeight) return;
        const offsetVar = opts.offsetVar
            ? parseFloat(getComputedStyle(opts.offsetEl || target).getPropertyValue(opts.offsetVar))
            : NaN;
        const offset = Number.isFinite(offsetVar) ? offsetVar : 120;
        window.scrollTo({
            top: targetTop + window.pageYOffset - navHeight - offset,
            behavior: NDS.prefersReducedMotion ? 'auto' : 'smooth',
        });
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

    // ── Transition End (with safety-net) ─────────────────────────────
    // Subscribe to `el`'s next `transitionend`, filtering out events that
    // bubble up from descendants. The callback runs at most once: a real
    // transitionend fires it, OR a safety-net setTimeout fires it after
    // `opts.fallbackMs` if the real event is missed (reduce-motion,
    // mid-flight display:none, etc.). Idempotent — re-firing is a no-op.
    //
    //   opts.fallbackMs — defaults to NDS.transitionSpeed() + 50.
    //
    // Returns a cancel() handle that aborts both the listener and the
    // pending fallback timer without invoking fn. Use when a re-open
    // mid-close scenario needs to discard the close cleanup.
    //
    // Usage:
    //   NDS.onTransitionEnd(submenu, () => {
    //       NDS.State.set(submenu, 'open');
    //       submenu.style.height = '';
    //   });
    //   // Custom safety-net delay:
    //   NDS.onTransitionEnd(panel, cleanup, { fallbackMs: NDS.transitionSpeed() + 100 });
    //   // Cancellable mid-flight:
    //   this._cancelClose = NDS.onTransitionEnd(menu, cleanup);
    //   // ... if user re-opens: this._cancelClose();
    NDS.onTransitionEnd = (el, fn, opts = {}) => {
        const fallbackMs = opts.fallbackMs ?? NDS.transitionSpeed() + 50;
        let done = false;
        let timer;
        const run = () => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            el.removeEventListener('transitionend', onEnd);
            fn();
        };
        const onEnd = (e) => { if (e.target === el) run(); };
        el.addEventListener('transitionend', onEnd);
        timer = setTimeout(run, fallbackMs);
        return () => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            el.removeEventListener('transitionend', onEnd);
        };
    };

    // ── Focusable Selector + Tab Focus Trap ──────────────────────────
    // Standard "tabbable element" selector — matches the elements a Tab/
    // Shift+Tab traversal will land on. Excludes [tabindex="-1"] (unreachable
    // by Tab) and disabled form controls. Exposed so component code can
    // reuse the same coverage when querying focusables.
    NDS.focusableSel = [
        'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
        'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])', '[tabindex]'
    ].map(s => s + ':not([tabindex="-1"])').join(', ');

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
        // An unrendered match as `last` never takes focus, so Tab would leave instead of wrapping.
        // Only the ends decide the wrap: walk in from each, not over every match.
        const f = c.querySelectorAll(NDS.focusableSel);
        const shown = (el) => el.checkVisibility?.({ visibilityProperty: true }) ?? el.getClientRects().length > 0;
        let i = 0, j = f.length - 1;
        while (i <= j && !shown(f[i])) i++;
        while (j > i && !shown(f[j])) j--;
        if (i > j) return;
        const first = f[i];
        const last = f[j];
        // From the container itself (focused when it has no control to start on), Shift+Tab would leave.
        if (e.shiftKey && (document.activeElement === first || document.activeElement === c)) { e.preventDefault(); last.focus(); }
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
                shared.className = 'nds-sr-only';
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
    // imperatively at the consumer. See `_js/nds-city-weather.js` for the
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
    // position. `lock()` captures the current pageYOffset, pins the body
    // via `top: -<scrollY>px` and stamps `data-nds-scroll-lock`, which
    // _backdrop.scss turns into `position: fixed`. `unlock()` parses the
    // saved offset back out of the inline style, clears both, and restores
    // scroll. Counted: each `lock()` needs its own `unlock()`, and the page
    // unlocks with the last one, so a Modal over a Backdrop owner holds.
    // `unlock()` with no lock held is a safe no-op.
    //
    // Own attribute, NOT a data-state token: `data-state` keys hundreds of
    // rules, so flipping it on <body> restyled ~half the page (1,578
    // elements on the home page, measured 2026-09-02). A name only one
    // body rule uses restyles <body> alone.
    //
    // Usage: NDS.scrollLock.lock();
    //        // ... overlay shown ...
    //        NDS.scrollLock.unlock();
    let _scrollLocks = 0;
    NDS.scrollLock = {
        lock() {
            if (_scrollLocks++) return;
            const scrollY = window.pageYOffset;
            document.body.style.top = `-${scrollY}px`;
            document.body.setAttribute('data-nds-scroll-lock', '');
        },
        unlock() {
            if (!_scrollLocks || --_scrollLocks) return;
            const scrollY = -parseFloat(document.body.style.top); // fractional under zoom
            document.body.style.top = '';
            document.body.removeAttribute('data-nds-scroll-lock');
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

    // ── Mark home / Send home ───────────────────────────────────────────
    // A node NDS moves out of markup the app owns (a docked FAB, a pinned
    // nav item) leaves a comment marker in its place. While it is away, the old parent's
    // insertBefore / appendChild / removeChild take the marker for the node, so a framework
    // that still holds it (React inserts before it, or removes it) works on its old spot
    // instead of throwing "not a child of this node".
    // Usage: NDS.markHome(menu); document.body.appendChild(menu); … NDS.sendHome(menu);
    // ponytail: only those three methods answer for the node; replaceChild or a textContent
    // write on the old parent still sees the move.
    const _home = new WeakMap();   // moved node → { mark, parent }
    const _node = Node.prototype;
    const _standIn = (parent, n) => { const h = n && _home.get(n); return h && h.mark.parentNode === parent ? h.mark : n; };
    function _guard(parent) {
        parent._ndsMoved = (parent._ndsMoved || 0) + 1;
        if (parent._ndsMoved > 1) return;
        parent.insertBefore = function (node, ref) { return _node.insertBefore.call(this, _standIn(this, node), _standIn(this, ref)); };
        parent.appendChild = function (node) { return _node.appendChild.call(this, _standIn(this, node)); };
        parent.removeChild = function (node) {
            if (_standIn(this, node) === node) return _node.removeChild.call(this, node);
            // Back home first, through its owner's own exit, then out as the app asked.
            NDS.sendHome(node);
            return _node.removeChild.call(this, node);
        };
    }
    function _unguard(parent) {
        if (--parent._ndsMoved > 0) return;
        delete parent._ndsMoved;
        delete parent.insertBefore;
        delete parent.appendChild;
        delete parent.removeChild;
    }

    NDS.markHome = (el) => {
        const parent = el?.parentNode;
        if (!parent || _home.has(el)) return;
        const mark = document.createComment(' moved by NDS ');   // no nds- prefix: the audit reads those as class names
        _node.insertBefore.call(parent, mark, el);
        _home.set(el, { mark, parent });
        _guard(parent);
    };

    // Put a node NDS.markHome marked back at its marker. True when it went home; when the marker is
    // gone it goes to the end of its old parent while that parent is on the page, else off it.
    NDS.sendHome = (el) => {
        const h = _home.get(el);
        if (!h) return false;
        _home.delete(el);
        const parent = h.mark.parentNode;
        if (parent) _node.replaceChild.call(parent, el, h.mark);
        else if (h.parent.isConnected) _node.appendChild.call(h.parent, el);
        else el.remove();
        _unguard(h.parent);
        return !!el.parentNode;
    };

    // The element a marked node was moved out of, or null.
    NDS.homeOf = (el) => _home.get(el)?.parent || null;

    // Put a [popover] element in the browser's top layer (on) or take it out (off). It
    // escapes every clip and stacking context without leaving its place in the DOM, so
    // closest(), bubbling and inherited styles still work. No popover support (Safari < 17,
    // Firefox < 125): it stays where it is; the component's CSS decides what clips it.
    // Usage: NDS.topLayer(menu, true); … NDS.topLayer(menu, false);
    NDS.topLayer = (el, on) => {
        if (!el.showPopover || on === el.matches(':popover-open')) return;
        if (!on) el.hidePopover();
        else if (el.isConnected) el.showPopover();
    };

    // ── Place a positioned element at viewport coords ─────────────────
    // Writes `top`/`left` then measures and corrects, so the element lands at
    // the viewport coords whatever its containing block: the page for an
    // absolute popover in the top layer (the correction adds the scroll), the
    // wrapper where popover is missing, the viewport for a fixed element.
    // The transform back-out handles in-flight slide animations on the
    // element itself (e.g. dropmenu's opening translateY).
    // Usage: NDS.place(menu, top, leftPx);
    NDS.place = (el, top, left) => {
        el.style.top = top + 'px';
        el.style.left = left + 'px';
        const r = el.getBoundingClientRect();
        const { m41: tx, m42: ty } = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        const dx = (r.left - tx) - left;
        const dy = (r.top  - ty) - top;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            el.style.top  = (top  - dy) + 'px';
            el.style.left = (left - dx) + 'px';
        }
    };

    // Cached lookup for `.nds-main-nav` — flipPosition fires on every popup
    // open, so avoiding the repeated qS adds up. `undefined` = never looked up,
    // null = looked up and absent, element = cached. SPA consumers that swap
    // the nav DOM on route changes leave a detached element in the cache;
    // isConnected re-lookups in that case (null stays sticky to avoid
    // re-querying on every popup when no nav is present).
    let _navEl;

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
    NDS.flipPosition = (trigger, menuEl, opts = {}) => {
        const { respectNav = true, navGap = 16 } = opts;
        const triggerRect = trigger.getBoundingClientRect();
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        const vh = doc.clientHeight;
        // Space is measured inside what the visitor sees, so a menu never opens under the keyboard.
        const box = NDS.visibleBox();

        let topEdge = box.top;
        if (respectNav) {
            if (_navEl === undefined || (_navEl && !_navEl.isConnected)) {
                _navEl = document.querySelector('.nds-main-nav');
            }
            if (_navEl) {
                const navRect = _navEl.getBoundingClientRect();
                // The sticky nav is a top boundary only for triggers BELOW it. A
                // trigger ABOVE the nav (e.g. a topbar dropmenu) opens a downward
                // menu that passes in front of the nav, so the nav must not clamp
                // it down past itself — leaving a gap below the trigger. Same for
                // a trigger INSIDE the nav (a nav-link tooltip): its popup opens
                // in front of the nav, and the clamp pushed it navGap below it.
                if (navRect.bottom > 0 && triggerRect.bottom > navRect.top && !_navEl.contains(trigger)) {
                    topEdge = Math.max(topEdge, navRect.bottom + navGap);
                }
            }
        }

        const menuRect = menuEl.getBoundingClientRect();
        const spaceBelow = box.bottom - triggerRect.bottom;
        const spaceAbove = triggerRect.top - topEdge;

        return {
            spaceBelow,
            spaceAbove,
            topEdge,
            triggerRect,
            menuRect,
            box,
            viewportWidth: vw,
            viewportHeight: vh,
        };
    };

    // ── Grid Last Row ────────────────────────────────────────────────
    // Marks items in the last row of a grid with .nds-last-row
    // Used by .nds-divided grids to remove bottom borders from the last visual row
    // Usage: NDS.gridLastRow.update()  — re-scan all grids on the page
    //        NDS.gridLastRow.update(container)  — re-scan grids within a container
    NDS.gridLastRow = (() => {
        const SEL = '.nds-divided.nds-grid';
        const CLS = 'nds-last-row';

        // Reads only; returns the class writes so the pooled ResizeObserver can
        // run every grid's reads before any write.
        function mark(grid) {
            const items = grid.children;
            if (!items.length) return;
            let first = items.length; // hidden/non-laid-out grid: no last row
            if (grid.offsetParent) {
                const lastTop = items[items.length - 1].offsetTop;
                first = items.length - 1;
                while (first > 0 && items[first - 1].offsetTop === lastTop) first--;
            }
            return () => { for (let i = 0; i < items.length; i++) items[i].classList.toggle(CLS, i >= first); };
        }

        // Each grid marks itself from the ResizeObserver, which delivers after
        // layout: the offsetTop reads never force one, the first delivery is the
        // initial scan, and a grid that reflows (viewport resized, items added
        // or removed) re-marks on its own. A scheduled first scan (idle, DCL, after
        // the reveal paint) always raced the time-sliced inits and forced a
        // full-page layout (~1–2s on a table page at 6.6×).
        // The FIRST ITEM is observed, not the grid: the mark shrinks the grid (and
        // the last row's items) inside its own callback, the "ResizeObserver loop"
        // error. Rows depend only on column width and order, which the first item's
        // width tracks, and its content box never moves with the mark.
        // ponytail: fixed-width tracks (a consumer --_tracks) change columns without resizing it; observe the grid too if one needs it.
        // A grid that leaves the DOM releases its observer entry, else an SPA
        // that remounts grids retains every discarded one. Subscribed on the
        // first watch so a page without grids never starts the DOM bus for it.
        const offs = new WeakMap();
        let releasing = false;
        function unwatch(grid) { offs.get(grid)?.(); offs.delete(grid); }
        function watch(grid) {
            if (offs.has(grid)) return;
            const first = grid.firstElementChild;
            offs.set(grid, first ? NDS.onElementResize(first, () => (held(grid) ? undefined : mark(grid))) : () => {});
            if (releasing) return;
            releasing = true;
            NDS.onDOMRemove(SEL, (grids) => grids.forEach(unwatch));
            // A re-observed first item delivers again, so the grid re-marks in the observer without forcing layout.
            NDS.onChildrenChange(SEL, (grids) => grids.forEach((g) => { if (offs.has(g)) { unwatch(g); watch(g); } }));
        }

        // Before the reveal, off-screen sections are content-visibility:auto, and Chrome
        // tracks their size with its own observer: a mark that resizes one raises the
        // "ResizeObserver loop" error. Those grids mark once data-nds-loaded drops cv, still off-screen.
        const root = document.documentElement;
        const waiting = new Set();
        function held(grid) {
            if (root.hasAttribute('data-nds-loaded')) return false;
            const sec = grid.closest('.nds-content-section');
            if (!sec || sec.getBoundingClientRect().top < innerHeight || getComputedStyle(sec).contentVisibility !== 'auto') return false;
            if (!waiting.size) {
                const off = NDS.onAttrChange('html', ['data-nds-loaded'], () => {
                    off();
                    waiting.forEach((g) => { if (g.isConnected) { unwatch(g); watch(g); } });
                    waiting.clear();
                });
            }
            waiting.add(grid);
            return true;
        }

        function gridsIn(container) {
            return container && container.matches?.(SEL)
                ? [container]
                : (container || document).querySelectorAll(SEL);
        }

        // Explicit re-scan (marks now, so the read may force layout) and the
        // registration path for grids added after load.
        function update(container) {
            const grids = gridsIn(container);
            for (let g = 0; g < grids.length; g++) { watch(grids[g]); const write = mark(grids[g]); if (write) write(); }
        }

        // Observe only — no reads at load. Guarded for a bundle injected after load
        // (SPA host), which never sees DOMContentLoaded.
        const start = () => { const grids = gridsIn(); for (let g = 0; g < grids.length; g++) watch(grids[g]); };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

        return { update };
    })();

    // ── Scroll restoration ─────────────────────────────────────────────
    // Native restoration stays ON — the browser applies the offset BEFORE first
    // paint, so a reload never flashes the top of the page (manual mode painted
    // frame one at 0 and jumped at the stamp). 'auto' is set explicitly: the
    // mode persists per history entry, so tabs stamped 'manual' by earlier
    // builds must be unstuck. Native can still land short pre-stamp (cv holds
    // off-screen sections at 680px estimates, capping reachable height on long
    // pages), so at data-nds-loaded — cv dropped, heights real — re-pin to the
    // exact saved offset. Reload: always (native target == ours). Back/forward:
    // only rescue from 0 — native's per-entry offset beats our per-path save.
    // pagehide saves the pending y until the re-pin has run, so re-reloading
    // mid-load can't clobber the position with 0. (whole-page load = fallback.)
    if ('scrollRestoration' in history) {
        const root = document.documentElement;
        const KEY = 'nds-scroll:' + location.pathname;
        history.scrollRestoration = 'auto';
        let pending = 0;
        window.addEventListener('pagehide', () => {
            try { sessionStorage.setItem(KEY, pending || window.scrollY); } catch {}
        });
        const navType = (performance.getEntriesByType('navigation')[0] || {}).type;
        if (navType === 'reload' || navType === 'back_forward') {
            let y = 0;
            try { y = parseInt(sessionStorage.getItem(KEY), 10) || 0; } catch {}
            if (y) {
                pending = y;
                const restore = () => {
                    if (!pending) return;
                    pending = 0;
                    if (navType === 'reload' || !window.scrollY) window.scrollTo(0, y);
                };
                if (root.hasAttribute('data-nds-loaded')) restore();
                else {
                    const off = NDS.onAttrChange('html', ['data-nds-loaded'], () => {
                        if (root.hasAttribute('data-nds-loaded')) { off(); restore(); }
                    });
                }
                window.addEventListener('load', restore);                   // fallback
            }
        }
    }
})();
