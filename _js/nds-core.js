/* NDS core utilities — public surface
 * Rides: (none — every other file rides THIS one)
 * Methods:
 *   state + status
 *     NDS.state.add / .remove / .set / .has / .get / .clear / .refresh (el, ...tokens)
 *                                     the data-state token list
 *     NDS.state.parse(el)              the tokens as a Set
 *     NDS.state.onAdd / .onRemove (token, scope, fn)   react to a token; returns off()
 *     NDS.state.onToggle(token, scope, fn, { className })  fn(el, on) once per real change, however the token
 *                                     was written; className also spells the token; returns off()
 *     NDS.status.set / .get / .clear (el, status)      the data-status value
 *     NDS.aria.expanded / .hidden / .pressed / .selected / .disabled / .label / .current
 *              / .sort (el, value)     write an ARIA attribute (null removes it)
 *   page facts (live getters, not snapshots)
 *     NDS.lang · NDS.isArabic · NDS.isRtl · NDS.prefersReducedMotion
 *     NDS.breakpoints                  the media-query strings the components share
 *   pooled observers — each returns an off() function, and you must call it
 *     NDS.onResize(fn) · NDS.onIntersect(el, fn, opts) · NDS.onElementResize(el, fn)
 *     NDS.onDomAdd(sel, fn) · NDS.onDomRemove(sel, fn) · NDS.onChildrenChange(sel, fn)
 *     NDS.onAttributeChange(sel, attrs, fn) · NDS.onOutsideScroll(el, fn)
 *   scheduling
 *     NDS.debounce(fn, ms) (.cancel() drops a pending call) · NDS.throttleToFrame(fn) · NDS.onIdle(fn, timeout)
 *     NDS.onNextPaint(fn) · NDS.onTransitionEnd(el, fn, opts) → cancel()
 *     NDS.transitionSpeed()            the token-sourced duration in ms
 *   DOM
 *     NDS.markHome(el) / .sendHome(el) / .getHome(el)   move a node the app owns; its old spot answers for it
 *     NDS.setTopLayer(el, on)             show or hide a [popover] in the top layer, in place
 *     NDS.resolveElement(idOrElOrSel) · NDS.fromTemplate(id) · NDS.flipPosition(trigger, menu) · NDS.place(el, t, l[, anchor]) · NDS.unplace(el, anchor) · NDS.isPinned(el)
 *     NDS.getStickyHeaderBottom() · NDS.getViewportPadding(el) · NDS.getVisibleBox() · NDS.scrollBelowNav(el, opts) · NDS.scrollLock.lock/unlock
 *     NDS.dragScroll(el, { canScroll, signal })   wheel + mouse-drag sideways scroll; a drag swallows its click
 *     NDS.trapFocus(getEl) · NDS.focusableSel
 *     NDS.setScrollStop(el, on)        give a scroller a tab stop so keys scroll it; an authored tabindex stays
 *     NDS.getCellText(cell)               a table cell's own text, the value sort and export read
 *     NDS.findOwnParts(root, sel, ownerSelector)   root's own matches, not a nested instance's
 *     NDS.findOwnItems(list, items)        a list's own items: never .nds-sub; a <tbody> keeps its direct rows
 *   data + text
 *     NDS.request(url, opts) → Promise<{isJson, data}>     the shared fetch wrapper
 *     NDS.writeUrlParams(params|string)   rewrite the URL's ?params in place; path, hash and history.state stay
 *     NDS.cache.get / .clear (key) · .set (key, value, minutes)   localStorage with expiry
 *     NDS.cookie.get / .delete (name) · .set (name, value, days)   a cookie, no consent check; delete covers parent domains
 *     NDS.formatNumber(n, opts) · NDS.toLatinDigits(s) · NDS.escapeHtml(s) · NDS.toSafeUrl(url) · NDS.getUniqueId(prefix)
 *     NDS.Date                         dates in Gregorian and Hijri: _js/nds-date.js
 *     NDS.announce(text)               say something in the shared live region
 *     NDS.i18n.load(component, lang)   a promise of a section's words
 *     NDS.i18n.getStrings(component, defaults) → { text, set, load, ready, has, defaults }   a component's strings;
 *                                      set() marks a fixed word for core, re-writes one with {vars}
 *     data-i18n="section.key" · data-i18n-{aria-label|aria-description|title|alt|placeholder|label}
 *                                      a marker: core writes the word in the page language, unless
 *                                      a script or the author changed it since
 *     NDS.i18n.translate(root?)         translate the markers in root now (mount/refresh call it)
 *     NDS.i18n.settled → Promise        the pack landed, failed, or 3 s passed; then <html data-nds-i18n>
 *     NDS.i18n.pack() → Promise         the page language's pack
 *     NDS.i18n.resolveLang(lang?)       the page's language or lang as a base tag ('ar-SA' → 'ar'); else 'en'
 *     NDS.i18n.isMissing(lang?)         true when that language's file failed to load
 *     NDS.i18n.format(value, vars)     fill {name}; a plural value picks by vars.n
 *     NDS.i18n.mergeOwnKeys(target, src)  copy own keys, skipping __proto__ / constructor / prototype
 *     NDS.setValue(el, value, { change }) write value (checked: a click), fire input + change
 *     NDS.setBadge(el, count) · NDS.buildChip(value, opts) · NDS.keepChipFocus(chips, render, fallback)
 * Events:
 *   nds:template:ready    on the stamped root, bubbles — detail.id is the summoned id.
 *                         Fires after NDS.init.refresh wires the arrivals, so page JS
 *                         that needs the markup binds on document and waits for it
 * Hooks:
 *   data-state    the token list NDS.state owns — space separated, matched with ~=
 *   data-status   the single value NDS.status owns
 * Gotchas:
 *   - There is no init(). Core is a utility layer, loaded first and consumed by everyone.
 *   - Every observer helper is POOLED — one observer per page, shared. Each call returns
 *     an off() function; not calling it leaks a subscriber for the page's lifetime.
 *   - NDS.request is a fetch wrapper and nothing more — no XHR, no upload progress, no
 *     retry, no cache layer and no interceptors.
 *   - data-state is a LIST. Never write it with setAttribute; go through NDS.state so
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
    const scriptSrc = (document.currentScript
        || [...document.scripts].find(script => /nds-main(\.min)?\.js/.test(script.src)) || {}).src || '';
    const isOwnPath = /\/js\/[^/?#]+\.js(?:[?#]|$)|nds-main(\.min)?\.js/.test(scriptSrc);
    const ASSETS_VERSION = (scriptSrc.match(/\?ver=[^&#]*/) || [''])[0];
    const ASSETS_BASE = window.NDS_ASSETS_PATH
                     || (isOwnPath ? new URL('../', scriptSrc).href : '');

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
    //        NDS.isRtl   → true/false
    // Live getters so runtime language/direction toggles (e.g. language switcher) stay correct.
    Object.defineProperty(NDS, 'lang', {
        get() { return (document.documentElement.lang || 'en').split('-')[0].toLowerCase(); }
    });
    Object.defineProperty(NDS, 'isArabic', {
        get() { return NDS.lang === 'ar'; }
    });
    Object.defineProperty(NDS, 'isRtl', {
        get() { return document.documentElement.dir === 'rtl'; }
    });

    // ── Reduced-motion preference (live getter) ──────────────────────
    // Reads the user's prefers-reduced-motion preference live so callers
    // react to runtime toggles (OS setting changes, DevTools Rendering
    // panel). Mirrors NDS.isRtl — a live boolean derived from a single
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
    const i18nMarks = {
        'data-i18n': 'text',
        'data-i18n-aria-label': 'aria-label',
        'data-i18n-aria-description': 'aria-description',
        'data-i18n-title': 'title',
        'data-i18n-alt': 'alt',
        'data-i18n-placeholder': 'placeholder',
        'data-i18n-label': 'label',
    };
    const I18N_MARK_SELECTOR = Object.keys(i18nMarks).map(attribute => `[${attribute}]`).join(',');
    NDS.i18n = {
        _files: Object.create(null),   // 'ar' → the pack, once landed (null when none)
        _loads: Object.create(null),   // same keys → Promise<data>

        // A promise of a section's words, in the page's language or lang. A marked word needs no
        // wait: core writes it, and the CSS holds it as a bar until then.
        load(component, lang) {
            if (this._fromFiles(component, lang) !== undefined) return Promise.resolve(this._getSection(component, lang));
            return this._get(component, lang).then(() => this._getSection(component, lang));
        },

        // The page's language, or the one a component passes ('ar-SA' → 'ar'). Anything
        // that isn't a BCP-47 base tag (2–3 letters) is 'en' — guards the fetch URL
        // against <html lang="../foo"> traversal.
        resolveLang(lang) {
            const code = String(lang || NDS.lang).split('-')[0].toLowerCase();
            return /^[a-z]{2,3}$/.test(code) ? code : 'en';
        },

        // The language's file failed to load (and its en fallback), so its components show English.
        isMissing(lang) { return this._files[this.resolveLang(lang)] === null; },

        // A section's words in a language: undefined until known, then the pack's section, or
        // null when it has none. English is built in (the JS defaults and the markup), so an
        // English page loads no file. Ignores the override: an override is no sign the file landed.
        _fromFiles(component, lang) {
            lang = this.resolveLang(lang);
            if (lang === 'en') return null;
            const pack = this._files[lang];
            if (pack === undefined) return undefined;
            return pack && component in pack ? pack[component] : null;
        },

        // The files' text with the inline override laid over it key by key. Until they
        // land, the override stands alone.
        _getSection(component, lang) {
            const inline = window.NDS_I18N && window.NDS_I18N[component];
            const data = this._fromFiles(component, lang);
            if (!inline) return data;
            return data ? Object.assign({}, data, inline) : inline;
        },

        _get(component, lang) { return this.pack(lang); },

        // A language's pack (the page's by default), landed; English has none. settled is the
        // capped promise the loader waits on.
        pack(lang) {
            lang = this.resolveLang(lang);
            return lang === 'en' ? Promise.resolve(null) : this._loadFile(lang);
        },

        // One fetch per pack per page. A missing pack is null, so English shows.
        _loadFile(path) {
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
        getStrings(component, defaults) {
            const i18n = this, queue = [];
            // The section's English: text() and its markers fall back to it when no file has the key.
            i18n._seeds[component] = Object.assign(i18n._seeds[component] || {}, defaults);
            const has = (object, key) => !!object && Object.prototype.hasOwnProperty.call(object, key);
            const hasLanded = () => i18n._fromFiles(component) !== undefined;
            const read = (el, attribute) => (attribute === 'text' ? el.textContent : el.getAttribute(attribute));
            const write = (el, attribute, value) => (attribute === 'text' ? (el.textContent = value) : el.setAttribute(attribute, value));
            const translate = (key, vars, lang) => {
                if (lang && i18n._fromFiles(component, lang) === undefined) i18n._get(component, lang);
                const section = i18n._getSection(component, lang);
                // Own keys only: a key from outside (a cached value, a browser error name) never reaches Object.prototype.
                // The English every getStrings() call for this section declared, not only this one's.
                const seed = i18n._seeds[component];
                return i18n.format(has(section, key) ? section[key] : has(seed, key) ? seed[key] : key, vars, lang);
            };
            return {
                text: translate,
                defaults,
                load: lang => i18n.load(component, lang),
                ready: lang => i18n._fromFiles(component, lang) !== undefined,
                has: key => has(defaults, key),
                set(el, attribute, key, vars) {
                    const value = translate(key, vars);
                    write(el, attribute, value);
                    // A fixed word becomes a marker, so core owns it from here, as markup would.
                    const mark = attribute === 'text' ? 'data-i18n' : 'data-i18n-' + attribute;
                    if (!vars && mark in i18nMarks) { el.setAttribute(mark, component + '.' + key); return; }
                    if (hasLanded()) return;
                    if (!queue.length) i18n.load(component).then(() => queue.splice(0).forEach(([e, attribute, was, key, variables]) => {
                        if (read(e, attribute) === was) write(e, attribute, translate(key, variables));
                    }));
                    queue.push([el, attribute, value, key, vars]);
                },
            };
        },

        // Fill {name} from vars. A plural value is an object of Intl.PluralRules
        // categories ({ one, two, few, many, other }), picked by vars.n.
        format(value, vars, lang) {
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                lang = this.resolveLang(lang);
                const rules = this._plural[lang] || (this._plural[lang] = new Intl.PluralRules(lang));
                value = value[rules.select(vars && vars.n)] || value.other;
            }
            if (typeof value !== 'string' || !vars) return value;
            return value.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match));
        },
        _plural: Object.create(null),

        // ?ver= rides along so a release never serves a stale file.
        async _fetchOne(path) {
            const base = window.NDS_I18N_PATH || (ASSETS_BASE ? ASSETS_BASE + 'i18n/' : 'assets/i18n/');
            try {
                const { data } = await NDS.request(base + path + '.json' + ASSETS_VERSION, { cache: 'default', json: true });
                return data;
            } catch (error) {
                // A 404 is a language NDS does not ship: English shows, and a site adds its words with NDS_I18N.
                if (error.status !== 404) console.warn('[NDS.i18n] ' + path + ' failed', error);
                return null;
            }
        },

        // Copy own enumerable keys from src onto target, skipping prototype
        // pollution vectors. Use this anywhere a component overlays JSON-
        // sourced data onto a runtime object (e.g. a strings dictionary).
        mergeOwnKeys(target, src) {
            if (!src) return target;
            for (const key of Object.keys(src)) {
                if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
                target[key] = src[key];
            }
            return target;
        },

        _seeds: Object.create(null),   // section → the JS defaults its getStrings() call registered
        _written: new WeakMap(),       // element → { target: { wrote: core's last write, was: the markup word it replaced } }
        _warned: new Set(),
        _warnOnce(message) { if (!this._warned.has(message)) { this._warned.add(message); console.warn('[NDS.i18n] ' + message); } },

        // The word a marker names, through text()'s chain: the override, the pack, the script's
        // English. Also that English (the JS default): the guard's baseline. word null: leave the markup.
        _resolveWord(ref) {
            const match = /^([a-z][a-z0-9-]*)\.([A-Za-z0-9_]+)$/.exec(ref);
            if (!match) {
                this._warnOnce(`marker "${ref}" is not section.key: a 1.x marker; write the section too, such as accessibility.${ref}`);
                return { word: null };
            }
            const [, section, key] = match;
            const hasOwn = (object) => !!object && Object.prototype.hasOwnProperty.call(object, key);
            const data = this._getSection(section), seed = this._seeds[section];
            const value = hasOwn(data) ? data[key] : hasOwn(seed) ? seed[key] : undefined;
            const english = hasOwn(seed) ? seed[key] : undefined;
            if (typeof value === 'string' && !/\{\w+\}/.test(value)) return { word: value, english };
            // A missing word is no error: the pack may not be in yet, or the section's script not
            // loaded, and the markup's English shows. check-i18n catches a misspelled section.
            if (value !== undefined) this._warnOnce(`${ref} has {vars} or plural forms: write it with set(), not a marker`);
            return { word: null };
        },

        // One element's markers. The guard: core skips a word someone changed. Untouched by core,
        // that is a word that no longer reads its English (when core knows the English); touched,
        // a word that reads neither what core wrote nor the markup word it replaced. It never adds an absent attribute.
        // force: the marker itself changed, so its new word always lands.
        _mark(el, force) {
            for (const name in i18nMarks) {
                const ref = el.getAttribute(name);
                if (ref === null) continue;
                if (!ref.trim()) {
                    this._warnOnce(`${name} with no value: a 1.x marker; name its word, ${name}="section.key"`);
                    continue;
                }
                const { word: word, english } = this._resolveWord(ref.trim());
                if (word === null) continue;
                const target = i18nMarks[name];
                const isText = target === 'text';
                if (isText && el.firstElementChild) {
                    this._warnOnce(`${ref}: data-i18n goes on an element that holds only the word`);
                    continue;
                }
                if (!isText && !el.hasAttribute(target)) continue;
                const seen = this._written.get(el) || {};
                const prev = seen[target];
                const current = isText ? el.textContent : el.getAttribute(target);
                // prev.was: the markup word core replaced. A morph (Livewire, Turbo, htmx) puts it back, and it is still NDS's.
                if (!force && (prev ? current !== prev.wrote && current !== prev.was : typeof english === 'string' && current.trim() !== english)) continue;
                if (current.trim() !== word) {
                    if (!isText) el.setAttribute(target, word);
                    else {
                        // Write the lone text node: a framework's node and comment anchors survive, and no childList record fires.
                        const texts = [...el.childNodes].filter(node => node.nodeType === 3);
                        if (texts.length === 1) texts[0].nodeValue = word; else el.textContent = word;
                    }
                }
                seen[target] = { wrote: isText ? el.textContent : word, was: prev && !force ? prev.was : current };
                this._written.set(el, seen);
            }
        },

        // Translate every marker in root (the document by default): root itself, its
        // descendants, and the content of each <template>, so a later clone lands translated.
        translate(root = document) {
            const walk = (node) => {
                if (node.nodeType === 1 && node.matches(I18N_MARK_SELECTOR)) this._mark(node);
                node.querySelectorAll(I18N_MARK_SELECTOR).forEach(el => this._mark(el));
                node.querySelectorAll('template').forEach(template => walk(template.content));
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
                NDS.onDomAdd(I18N_MARK_SELECTOR, elements => elements.forEach(el => this._mark(el)));
                NDS.onAttributeChange(I18N_MARK_SELECTOR, Object.keys(i18nMarks), elements => elements.forEach(el => this._mark(el, true)));
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
        const controller = new AbortController();
        if (signal?.aborted) controller.abort(signal.reason);
        else signal?.addEventListener('abort', () => controller.abort(signal.reason), { once: true });
        if (timeout) setTimeout(() => controller.abort(new DOMException('Request timed out', 'TimeoutError')), timeout);
        return controller.signal;
    };
    NDS.request = async (url, { signal, timeout = 15000, maxBytes = 1048576, json, ...init } = {}) => {
        const response = await fetch(url, {
            ...init,
            signal: composeSignal(signal, timeout)
        });
        if (!response.ok) {
            // Best-effort body slice so the thrown Error tells the operator what
            // the server actually said (typical error page > 512 bytes; we truncate).
            // A read failure here must not mask the HTTP error — swallow and move on.
            let body;
            try { body = await readCapped(response, 512, true); } catch {}
            throw Object.assign(new Error(`HTTP ${response.status}: ${response.statusText}`),
                                { status: response.status, url, body });
        }
        // Callers that know their endpoint pass json:true — a wrong Content-Type
        // must not silently downgrade a JSON response to a string.
        const isJson = json ?? (response.headers.get('Content-Type') || '').includes('application/json');
        const text = await readCapped(response, maxBytes);
        return { isJson, data: isJson && text ? JSON.parse(text) : text };
    };

    // Read a response body as text, refusing anything over maxBytes. Streams so
    // an oversized body is cancelled mid-flight rather than buffered whole — a
    // Content-Length check alone can be omitted or lied about.
    // truncate=true: don't throw on oversize — cancel and return what fits.
    // Used by the error path where a slice is diagnostic, not the payload.
    const readCapped = async (response, maxBytes, truncate) => {
        if (!response.body) return '';   // 204 / HEAD
        const declared = response.headers.get('Content-Length');
        if (declared && parseInt(declared, 10) > maxBytes && !truncate) throw new Error('Response too large');

        const reader = response.body.getReader();
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
    NDS.i18n.settled = Promise.race([NDS.i18n.pack(), new Promise(resolve => setTimeout(resolve, 3000))]);

    // ── Debounce ─────────────────────────────────────────────────────
    // Usage: const fn = NDS.debounce(handler, 150)
    NDS.debounce = (fn, ms) => {
        let timer;
        const debounceCall = (...callArguments) => { clearTimeout(timer); timer = setTimeout(() => fn(...callArguments), ms); };
        debounceCall.cancel = () => clearTimeout(timer); // destroy paths drop the pending call
        return debounceCall;
    };

    // ── RAF Throttle ─────────────────────────────────────────────────
    // Single-in-flight requestAnimationFrame throttle for scroll/mousemove handlers
    // Usage: el.addEventListener('scroll', NDS.throttleToFrame(handler), { passive: true })
    NDS.throttleToFrame = fn => {
        let ticking = false;
        return (...callArguments) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { ticking = false; fn(...callArguments); });
        };
    };

    // ── After Paint ──────────────────────────────────────────────────
    // Schedules fn to run after the NEXT paint commits — implemented as
    // two nested requestAnimationFrames. Use when a "from-state" must
    // paint before a "to-state" mutation triggers a CSS transition
    // (priming the transition by stamping one state, then removing it
    // after the browser has painted the from-state so the change to
    // the to-state animates instead of jumping).
    // Usage: NDS.onNextPaint(() => NDS.state.remove(panel, 'opening'));
    NDS.onNextPaint = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

    // ── Number formatting rule ───────────────────────────────────────
    // THE separator rule for every number NDS renders — .nds-number-format
    // (nds-numbers.js), the pagination records slots, and the selection
    // count all route here so they can never drift.
    // Page lang, Latin digits: one look whatever the browser's language. A bad lang falls back to en.
    NDS.formatNumber = (number, opts) => {
        // Every locale writes 0–999 this way in Latin digits; skips Intl's first-call locale load.
        if (!opts && Number.isInteger(number) && number >= 0 && number < 1000) return String(number);
        try { return number.toLocaleString(`${document.documentElement.lang || 'en'}-u-nu-latn`, opts); }
        catch { return number.toLocaleString('en', opts); }
    };

    // Arabic digits (both Unicode forms) → ASCII by their low nibble: what a field reads from a paste or autofill.
    NDS.toLatinDigits = (text) => String(text ?? '').replace(/[٠-٩۰-۹]/g, (char) => char.charCodeAt(0) & 15);


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
    const callEach = (list, call) => {
        for (let i = 0; i < list.length; i++) { const sub = list[i]; call(sub); if (list[i] !== sub) i--; }
    };

    // ── Window Resize Bus ────────────────────────────────────────────
    // Single listener, 150ms debounce, fan-out to subscribers
    // Usage: const off = NDS.onResize(handler)
    NDS.onResize = (() => {
        const subs = [];
        const fire = NDS.debounce(() => callEach(subs, fn => fn()), 150);
        window.addEventListener('resize', fire, { passive: true });
        return fn => subscribe(subs, fn);
    })();

    // ── Sections nobody has scrolled to ──────────────────────────────
    // A section is content-visibility:auto until it first draws (_section.scss); the browser reports
    // the draw and data-nds-drawn makes it a normal section. whenDrawn(el, fn) runs fn at once, or once
    // el's section draws: a ResizeObserver write that resizes a skipped section raises the loop error.
    const EXEMPT = ':first-of-type, :first-of-type + .nds-content-section, .nds-sideinfo-section'; // as in _section.scss
    const drawnWaits = new WeakMap(); // section → Set of fns; a view removed before its draw drops out
    const canSkip = 'oncontentvisibilityautostatechange' in window;
    const markDrawn = (section) => {
        section.setAttribute('data-nds-drawn', '');
        const waits = drawnWaits.get(section);
        if (waits) { drawnWaits.delete(section); waits.forEach((fn) => fn()); }
    };
    const drawAll = () => document.querySelectorAll('.nds-content-section:not([data-nds-drawn])').forEach(markDrawn);
    if (canSkip) {
        // A link to a far section would land on the 680px guesses (Chrome, 2026-10-26: 1020px short).
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href*="#"]');
            if (link && link.pathname === location.pathname && link.hash.length > 1) drawAll();
        }, true);
        document.documentElement.setAttribute('data-nds-cv', '');
        document.addEventListener('contentvisibilityautostatechange', (e) => {
            if (!e.skipped && e.target.classList.contains('nds-content-section')) markDrawn(e.target);
        }, true); // the event does not bubble
        // Drawn before this script ran: main CSS can apply first.
        document.querySelectorAll('.nds-content-section:not([data-nds-drawn])').forEach((section) => {
            if (getComputedStyle(section).contentVisibility === 'auto' && section.firstElementChild?.checkVisibility({ contentVisibilityAuto: true })) markDrawn(section);
        });
    }
    const whenDrawn = (el, fn) => {
        const section = canSkip && el.closest('.nds-content-section:not([data-nds-drawn])');
        if (!section || section.matches(EXEMPT)) { fn(); return () => {}; }
        if (!drawnWaits.has(section)) drawnWaits.set(section, new Set());
        drawnWaits.get(section).add(fn);
        return () => drawnWaits.get(section)?.delete(fn);
    };

    // ── Element Resize Observer ──────────────────────────────────────
    // Single ResizeObserver, multiple elements
    // Usage: const off = NDS.onElementResize(el, handler)
    //        handler(entry) may RETURN a function: its writes. Every handler in
    //        the batch reads first, then the writes run together — a write between
    //        two handlers' reads forces one layout per element (34 scroll-mores
    //        cost 68ms@6.6x that way).
    //        An element in a section nobody has scrolled to is observed once the section draws.
    NDS.onElementResize = (() => {
        const map = new Map();
        const resizeObserver = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(entries => {
                const writes = [];
                for (let i = 0; i < entries.length; i++) {
                    const listeners = map.get(entries[i].target);
                    if (listeners) listeners.forEach(fn => {
                        const write = fn(entries[i]);
                        if (typeof write === 'function') writes.push(write);
                    });
                }
                for (let i = 0; i < writes.length; i++) writes[i]();
            })
            : null;

        const cancels = new Map(); // el → stops its wait for the section to draw
        return (el, fn) => {
            if (!resizeObserver) return () => {};
            let listeners = map.get(el);
            if (!listeners) {
                listeners = new Set(); map.set(el, listeners);
                cancels.set(el, whenDrawn(el, () => { cancels.delete(el); resizeObserver.observe(el); }));
            }
            listeners.add(fn);
            return () => {
                if (!listeners.delete(fn)) return; // a repeat off() must not unobserve a newer subscriber
                if (!listeners.size) { map.delete(el); cancels.get(el)?.(); cancels.delete(el); resizeObserver.unobserve(el); }
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
                const intersectionObserver = new IntersectionObserver(entries => {
                    for (let i = 0; i < entries.length; i++) {
                        const listeners = map.get(entries[i].target);
                        if (listeners) listeners.forEach(fn => fn(entries[i]));
                    }
                }, { threshold: opts.threshold || 0, rootMargin: opts.rootMargin || '0px' });
                group = { io: intersectionObserver, map };
                pool.set(key, group);
            }
            // A Set per element, as in onElementResize: two subscribers on one element both fire.
            let elementListeners = group.map.get(el);
            if (!elementListeners) { elementListeners = new Set(); group.map.set(el, elementListeners); group.io.observe(el); }
            elementListeners.add(fn);
            return () => {
                if (!elementListeners.delete(fn) || elementListeners.size) return; // a repeat off() must not drop a newer subscriber
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
    // Usage: const off = NDS.onDomAdd('.selector', nodes => { ... })
    //        const off = NDS.onDomRemove('.selector', nodes => { ... })
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

        function dispatch(nodes, subs, moved) {
            callEach(subs, sub => {
                // A Set: a parent and its child added in one batch both reach the child.
                const hits = new Set();
                for (let i = 0; i < nodes.length; i++) {
                    if (nodes[i].matches(sub.sel)) hits.add(nodes[i]);
                    const descendants = nodes[i].querySelectorAll(sub.sel);
                    if (!descendants.length) continue;
                    // A new wrapper around a moved node (Table's .nds-table-wrapper) brings no new descendants.
                    const movedInside = moved && moved.filter(node => nodes[i].contains(node));
                    for (let j = 0; j < descendants.length; j++)
                        if (!movedInside || !movedInside.some(node => node.contains(descendants[j]))) hits.add(descendants[j]);
                }
                if (hits.size) sub.fn([...hits]);
            });
        }

        function dispatchParents(parents, subs) {
            callEach(subs, sub => {
                const hits = [];
                parents.forEach(parent => { if (parent.matches(sub.sel)) hits.push(parent); });
                if (hits.length) sub.fn(hits);
            });
        }

        function start() {
            if (started) return;
            started = true;
            new MutationObserver(mutations => {
                const added = [], removed = [], parents = new Set();
                for (let i = 0; i < mutations.length; i++) {
                    const mutation = mutations[i];
                    if (mutation.target && mutation.target.nodeType === 1) parents.add(mutation.target);
                    for (let j = 0; j < mutation.addedNodes.length; j++)
                        if (mutation.addedNodes[j].nodeType === 1) added.push(mutation.addedNodes[j]);
                    for (let j = 0; j < mutation.removedNodes.length; j++)
                        if (mutation.removedNodes[j].nodeType === 1) removed.push(mutation.removedNodes[j]);
                }
                // A reparent (e.g. NDS.markHome, then appendChild elsewhere) emits
                // both a remove and an add for the same node in one batch. Treat
                // that as a move, not a lifecycle change — drop those nodes from
                // both lists so subscribers (and any descendants matching their
                // selectors) keep their instances, listeners, and internal state
                // across relocations and similar reparents.
                let realAdded = added, realRemoved = removed, moved = null;
                if (added.length && removed.length) {
                    const addedSet = new Set(added), removedSet = new Set(removed);
                    realAdded = added.filter(node => !removedSet.has(node));
                    realRemoved = removed.filter(node => !addedSet.has(node));
                    moved = added.filter(node => removedSet.has(node));
                    if (!moved.length) moved = null;
                }
                // Removes before adds: for unrelated mutations batched together,
                // tearing down old state before constructing new state is safer.
                if (realRemoved.length) dispatch(realRemoved, removeSubs);
                if (realAdded.length) dispatch(realAdded, addSubs, moved);
                if (parents.size && childrenSubs.length) dispatchParents(parents, childrenSubs);
            }).observe(document.documentElement, { childList: true, subtree: true });   // <html>: a whole-body swap (Turbo Drive) stays in view
        }

        return { addSubs, removeSubs, childrenSubs, start };
    })();

    const makeDomSubscriber = (list) => (selector, fn) => { domBus.start(); return subscribe(list, { sel: selector, fn }); };
    NDS.onDomAdd = makeDomSubscriber(domBus.addSubs);
    NDS.onDomRemove = makeDomSubscriber(domBus.removeSubs);
    NDS.onChildrenChange = makeDomSubscriber(domBus.childrenSubs);

    // ── Attribute Change Observer ────────────────────────────────────
    // Single MutationObserver on <html> for attribute changes, selector-based dispatch.
    // Observing documentElement (not body) so subscribers can match 'html' itself —
    // e.g. lang/dir changes for direction-aware components.
    // Returns an unsubscribe handle so per-instance callers can release
    // their subscription. Mirrors the DOM Mutation Bus shape above.
    // Usage: const off = NDS.onAttributeChange('.nds-progress-circle', ['data-value', 'data-num'], els => { ... })
    //        // later: off();  releases the subscriber
    const attributeSubscribers = [];
    const attributeNames = new Set();
    let attributeObserver;
    NDS.onAttributeChange = (selector, attributes, fn) => {
        if (!attributeObserver) {
            attributeObserver = new MutationObserver(mutations => {
                const changed = new Map();
                for (let i = 0; i < mutations.length; i++) {
                    const el = mutations[i].target;
                    if (!changed.has(el)) changed.set(el, new Set());
                    changed.get(el).add(mutations[i].attributeName);
                }
                callEach(attributeSubscribers, sub => {
                    const hits = [];
                    changed.forEach((names, el) => {
                        // Attribute check before matches(): this observer sees every
                        // attribute write on the page, and matches() is the expensive half.
                        let watched = false;
                        for (const attribute of names) { if (sub.attrs.has(attribute)) { watched = true; break; } }
                        if (watched && el.matches(sub.sel)) hits.push(el);
                    });
                    if (hits.length) sub.fn(hits);
                });
            });
        }
        // attributeFilter = the union of every subscriber's names, re-observed as it
        // grows. Without it the observer records EVERY attribute write on the page
        // for its lifetime — class, aria, style, init stamps — and runs the callback.
        const before = attributeNames.size;
        attributes.forEach(attribute => attributeNames.add(attribute));
        if (attributeNames.size !== before) {
            attributeObserver.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: [...attributeNames] });
        }
        return subscribe(attributeSubscribers, { sel: selector, attrs: new Set(attributes), fn });
    };

    // ── State Management (data-state) ─────────────────────────────────
    // Space-separated token management for data-state attribute
    // Usage: NDS.state.add(el, 'open', 'active')
    //        NDS.state.remove(el, 'open')
    //        NDS.state.has(el, 'open')     → true/false
    //        NDS.state.set(el, 'open')     → replaces all tokens
    //        NDS.state.get(el)            → 'open active' (raw string)
    //        NDS.state.clear(el)           → removes data-state entirely
    //        NDS.state.refresh(el, ...states) → re-run the effects and onAdd hooks for the states el holds (after a render)
    //        NDS.state.onAdd(state, scope, fn)    → register hook: fn(el) fires when state added on el matching scope; returns off()
    //        NDS.state.onRemove(state, scope, fn) → register hook: fn(el) fires when state removed; returns off()
    //        NDS.state.onToggle(state, scope, fn, { className }) → fn(el, on) once per real change, whoever wrote it; returns off()
    NDS.state = (() => {
        // Null prototype: a token named like an Object.prototype key ('constructor') has no hooks.
        const addHooks = Object.create(null);    // { 'disabled': [{ scope, fn }, ...] }
        const removeHooks = Object.create(null);

        function runHooks(hooks, token, el) {
            const tokenHooks = hooks[token];
            if (tokenHooks) callEach(tokenHooks, sub => { if (el.matches(sub.scope)) sub.fn(el, token); });
        }

        const parse = el => new Set((el.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));

        // Effects: an NDS.state write runs them synchronously (Form relies on it); a bare attribute,
        // markup at load and added markup in the observers' microtask. `on` remembers each element an
        // effect has entered, so it runs once per real change and never undoes what it did not do.
        const effects = [], effectTokens = new Set(), effectSelectors = new Set(), pendingSelectors = new Set();
        let offAdded;
        const isHeld = (e, el, current) => (current.has(e.token) || (!!e.className && el.classList.contains(e.className))) && el.matches(e.scope);
        const runEffects = (el) => {
            const current = parse(el);
            callEach(effects, e => {
                const now = isHeld(e, el, current);
                if (now === e.on.has(el)) return;
                now ? e.on.add(el) : e.on.delete(el);
                e.fn(el, now);
            });
        };
        const sync = (el, tokens) => { if (tokens.some(token => effectTokens.has(token))) runEffects(el); };
        const scan = () => {
            const selector = [...pendingSelectors].join(',');
            pendingSelectors.clear();
            document.querySelectorAll(selector).forEach(runEffects);
        };
        NDS.onAttributeChange('*', ['data-state'], elements => elements.forEach(runEffects));

        const onToggle = (state, scope, fn, { className } = {}) => {
            const selector = `[data-state~="${state}"]` + (className ? `,.${className}` : '');
            effectTokens.add(state);
            if (className) NDS.onAttributeChange(scope, ['class'], elements => elements.forEach(runEffects));
            // One pooled selector for added markup, re-subscribed as it grows.
            if (!effectSelectors.has(selector)) {
                effectSelectors.add(selector);
                offAdded?.();
                offAdded = NDS.onDomAdd([...effectSelectors].join(','), elements => elements.forEach(runEffects));
            }
            // A registration after load (an injected bundle) scans once for its token.
            if (!pendingSelectors.size) {
                if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan, { once: true });
                else queueMicrotask(scan);
            }
            pendingSelectors.add(selector);
            return subscribe(effects, { token: state, scope, fn, className, on: new WeakSet() });
        };

        const add = (el, ...states) => {
            if (!el) return;
            const current = parse(el);
            const added = [];
            for (let i = 0; i < states.length; i++) {
                if (!current.has(states[i])) { current.add(states[i]); added.push(states[i]); }
            }
            if (!added.length) return;
            el.setAttribute('data-state', [...current].join(' '));
            sync(el, added);
            for (let i = 0; i < added.length; i++) runHooks(addHooks, added[i], el);
        };

        const remove = (el, ...states) => {
            if (!el) return;
            const current = parse(el);
            const removed = [];
            for (let i = 0; i < states.length; i++) {
                if (current.has(states[i])) { current.delete(states[i]); removed.push(states[i]); }
            }
            if (!removed.length) return;
            current.size ? el.setAttribute('data-state', [...current].join(' '))
                     : el.removeAttribute('data-state');
            sync(el, removed);
            for (let i = 0; i < removed.length; i++) runHooks(removeHooks, removed[i], el);
        };

        // No Set for a read: has() runs per row on every selection recount.
        const has = (el, state) => {
            const current = el && el.getAttribute('data-state');
            return !!current && !!state && (current === state || current.split(/\s+/).includes(state));
        };

        const get = el => el ? (el.getAttribute('data-state') || '') : '';

        // set and clear replace the list, so the hooks hear each token that left or arrived.
        const swap = (el, before) => {
            const after = parse(el);
            sync(el, [...before, ...after]);
            before.forEach(token => { if (!after.has(token)) runHooks(removeHooks, token, el); });
            after.forEach(token => { if (!before.has(token)) runHooks(addHooks, token, el); });
        };

        const set = (el, ...states) => {
            if (!el) return;
            const before = parse(el);
            states.length ? el.setAttribute('data-state', states.join(' '))
                          : el.removeAttribute('data-state');
            swap(el, before);
        };

        const clear = el => {
            if (!el) return;
            const before = parse(el);
            el.removeAttribute('data-state');
            swap(el, before);
        };

        const syncEffects = (el, ...states) => {
            if (!el) return;
            const current = parse(el);
            callEach(effects, e => {
                if (states.includes(e.token) && isHeld(e, el, current)) { e.on.add(el); e.fn(el, true); }
            });
            for (let i = 0; i < states.length; i++) {
                if (current.has(states[i])) runHooks(addHooks, states[i], el);
            }
        };

        const onAdd = (state, scope, fn) => subscribe(addHooks[state] ||= [], { scope, fn });
        const onRemove = (state, scope, fn) => subscribe(removeHooks[state] ||= [], { scope, fn });

        return { parse, add, remove, has, get, set, clear, refresh: syncEffects, onAdd, onRemove, onToggle };
    })();

    // ── Token mirrors ────────────────────────────────────────────────
    // CSS spells these tokens as a class; the data-state token stays the JS/markup
    // input and is mirrored onto the class here. Chrome keys attribute invalidation
    // by NAME, so every `[data-state] Y` rule feeds ONE shared set and every state
    // write anywhere restyles each matching Y under it (PERF-06). Tokens whose CSS
    // must reach descendants — loading's `> *`, the drawer's and upload's `.nds-btn`
    // / `.nds-form-control` rules, the table stripe's `of` list — key on their
    // class, whose set only they touch.
    // A class or aria-busy the author wrote stays theirs: mirrored holds only what this wrote.
    const mirrors = { loading: 'nds-loading', hidden: 'nds-hidden', 'has-more': 'nds-has-more', 'always-open': 'nds-always-open', dropbox: 'nds-dropbox' };
    const mirrored = new WeakMap();
    const getMirrorSet = (el) => mirrored.get(el) || mirrored.set(el, new Set()).get(el);
    for (const token in mirrors) {
        const className = mirrors[token];
        NDS.state.onToggle(token, '*', (el, on) => {
            if (on && !el.classList.contains(className)) { el.classList.add(className); getMirrorSet(el).add(className); }
            else if (!on && mirrored.get(el)?.delete(className)) el.classList.remove(className);
        });
    }
    // Loading tells a screen reader too: wait for the content.
    NDS.state.onToggle('loading', '*', (el, on) => {
        if (on && !el.hasAttribute('aria-busy')) { el.setAttribute('aria-busy', 'true'); getMirrorSet(el).add('aria-busy'); }
        else if (!on && mirrored.get(el)?.delete('aria-busy')) el.removeAttribute('aria-busy');
    });

    // ── Status Management (data-status) ─────────────────────────────
    // Single-value management for data-status attribute
    // Usage: NDS.status.set(el, 'error')
    //        NDS.status.get(el)            → 'error' | ''
    //        NDS.status.clear(el)          → removes data-status
    NDS.status = {
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
    // `<name>: aria('aria-<name>', <isBoolean>)`. Do NOT add a flat
    // NDS.aria<Name> at the top level.
    const makeAriaSetter = (attribute, isBoolean) => (el, value) => {
        if (!el) return;
        if (value == null || value === '') return el.removeAttribute(attribute);
        el.setAttribute(attribute, isBoolean ? String(Boolean(value)) : value);
    };
    NDS.aria = {
        expanded: makeAriaSetter('aria-expanded', true),
        hidden:   makeAriaSetter('aria-hidden',   true),
        pressed:  makeAriaSetter('aria-pressed',  true),
        selected: makeAriaSetter('aria-selected', true),
        disabled: makeAriaSetter('aria-disabled', true),
        label:    makeAriaSetter('aria-label',    false),
        current:  makeAriaSetter('aria-current',  false),
        sort:     makeAriaSetter('aria-sort',     false),
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
    // The count is data-count, drawn by CSS: as text it joins the visible label ("2Columns"),
    // which then no longer matches the name (WCAG 2.5.3).
    // Usage: NDS.setBadge(filterBtn, 3);
    const badgeBases = new WeakMap();   // button → its accessible name before any count landed
    NDS.setBadge = (btn, count) => {
        const icon = btn && btn.querySelector('i, .nds-icon');
        if (!icon) return;

        let badge = icon.querySelector('.nds-badge');
        if (count) {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'nds-badge';
                icon.appendChild(badge);
            }
            badge.textContent = '';   // an authored text count would show beside data-count
            badge.dataset.count = count;
        } else if (badge) {
            badge.remove();
        }

        if (!badgeBases.has(btn)) {
            const label = btn.querySelector('.nds-label');
            // Icon-only buttons carry their name on aria-label — read it before we overwrite it.
            badgeBases.set(btn, (label ? label.textContent : btn.getAttribute('aria-label') || '').trim());
        }
        // Keeps the visible label inside the accessible name (WCAG 2.5.3).
        const base = badgeBases.get(btn);
        if (base) {
            btn.setAttribute('aria-label', count ? `${base} (${count})` : base);
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
    //   opts.signal    — the owner's teardown: a chip that outlives it no longer calls onRemove
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
        for (const key in (opts.data || {})) chip.dataset[key] = opts.data[key];

        const text = document.createElement('span');
        text.className = 'nds-label';
        if (label instanceof Node) text.appendChild(label);
        else text.textContent = label;

        const icon = document.createElement('i');
        icon.className = 'nds-icon nds-hgi-cancel-01';
        NDS.aria.hidden(icon, true);

        chip.append(text, icon);
        if (opts.onRemove) {
            chip.addEventListener('click', (e) => { e.preventDefault(); opts.onRemove(e); }, { signal: opts.signal });
        }
        return chip;
    };

    // Removing the focused chip would drop focus to <body>. Runs render (which removes it),
    // then focuses the chip that took its slot, else fallback.
    //   chips — () => the live chip list, read before and after render
    // Usage: NDS.keepChipFocus(() => list.children, () => this.renderChips(), this.input);
    NDS.keepChipFocus = (chips, render, fallback) => {
        const at = Array.prototype.indexOf.call(chips(), document.activeElement);
        render();
        if (at < 0) return;
        const now = chips();
        (now[Math.min(at, now.length - 1)] || fallback)?.focus();
    };

    // ── HTML Escape ──────────────────────────────────────────────────
    // Escape a string for text and QUOTED attribute values. Not for unquoted
    // attributes, URLs (NDS.toSafeUrl), or style/script contents.
    // Usage: el.innerHTML = `<span title="${NDS.escapeHtml(v)}">${NDS.escapeHtml(v)}</span>`
    const htmlEscapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    NDS.escapeHtml = (text) => text == null ? '' : String(text).replace(/[&<>"']/g, (char) => htmlEscapes[char]);

    // ── Unique ID ─────────────────────────────────────────────────────
    // Short collision-resistant ID for DOM-scoped needs (input names,
    // aria-controls targets, per-upload file handles). Uses crypto.randomUUID
    // when available for stronger uniqueness; falls back to time + Math.random
    // otherwise. Optional prefix keeps IDs grep-friendly when inspected.
    // Usage: NDS.getUniqueId()         → 'c9d7...' or '1745232...nt3m42'
    //        NDS.getUniqueId('file-')  → 'file-c9d7...'
    NDS.getUniqueId = (prefix = '') => {
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
    // Usage: const grid = NDS.resolveElement('resultsGrid');
    NDS.resolveElement = (ref) => {
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
    // Usage: const label = NDS.getCellText(th);
    NDS.getCellText = (cell) => {
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
    // whose nearest ownerSelector is root, or sits outside root. A nested instance's parts are
    // not root's. Never tests root.matches(ownerSelector), so a create() on an element without
    // the class still finds its parts.
    // Usage: const buttons = NDS.findOwnParts(container, '.nds-accordion-btn', '.nds-accordion');
    NDS.findOwnParts = (root, selector, ownerSelector) => [...root.querySelectorAll(selector)].filter(el => {
        const owner = el.closest(ownerSelector);
        return owner === root || !root.contains(owner);
    });

    // ── Own Items ────────────────────────────────────────────────────
    // A list's own items. A .nds-sub row is never one: it rides its parent row. A <tbody>
    // owns only its direct rows, so a nested table in a sub row is a list of its own; a grid
    // or list may nest items under a wrapper, so it keeps them all. Empty's placeholder is never one.
    // Usage: const rows = NDS.findOwnItems(tbody, tbody.querySelectorAll('.nds-page-item'));
    NDS.findOwnItems = (list, items) => [...items].filter(el => !el.classList.contains('nds-sub')
        && !el.hasAttribute('data-nds-empty-placeholder')
        && (list.tagName !== 'TBODY' || el.parentElement === list));

    // ── Template Resolver ────────────────────────────────────────────
    // Resolve an id that may still sit inside a <template>. A modal or panel
    // may ship template-wrapped so its nodes stay out of the DOM until first
    // open; on a live miss this scans the page's templates, moves the owning
    // template's content in right after it, inits the arrivals via
    // NDS.init.refresh (loader inits are idempotent), fires a bubbling
    // nds:template:ready {id} on the element — page JS binds there, since
    // nothing it looked up at load existed — and returns the element.
    // MUTATING on a template hit — open/toggle paths only; read-only lookups
    // (isOpen, close) keep getElementById so they never move anything.
    NDS.fromTemplate = (id) => {
        if (!id) return null;
        let el = document.getElementById(id);
        if (el) return el;
        const templates = document.querySelectorAll('template');
        for (let i = 0; i < templates.length; i++) {
            if (!templates[i].content.getElementById(id)) continue;
            // After it, not in its place: the emptied <template> stays where a framework put it.
            templates[i].after(templates[i].content);
            el = document.getElementById(id);
            if (el) {
                NDS.init?.refresh?.(el);
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
    // Usage: const href = NDS.toSafeUrl(btn.dataset.href);
    NDS.toSafeUrl = (raw) => {
        if (!raw) return null;
        try {
            const url = new URL(raw, window.location.href);
            return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : null;
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
        const queryString = String(params).replace(/^\?/, '');
        history.replaceState(history.state, '', location.pathname + (queryString ? '?' + queryString : '') + location.hash);
    };

    // ── Sticky Header Bottom ─────────────────────────────────────────
    // Visible bottom edge of the sticky chrome (.nds-topbar + .nds-main-nav)
    // in viewport px — 0 when neither is present or both are scrolled away.
    // Consumers position panels/drawers below it. Queries + gBCR reads run
    // fresh per call (the nav's bottom moves on scroll) — cheap enough for
    // rAF-throttled scroll handlers; keep it out of unthrottled loops.
    // Usage: panel.style.setProperty('--panel-top', NDS.getStickyHeaderBottom() + 'px');
    NDS.getStickyHeaderBottom = () => {
        const nav = document.querySelector('.nds-main-nav');
        const topbar = document.querySelector('.nds-topbar');
        const navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
        const topbarBottom = topbar ? Math.max(0, topbar.getBoundingClientRect().bottom) : 0;
        return Math.max(navBottom, topbarBottom);
    };

    // The page's side gutter in px. Menus and tooltips keep it from the screen's
    // side edges, so they line up with the content. Internal. 16 where the browser
    // has no @property and reads the token as a calc() string.
    NDS.getViewportPadding = (el = document.documentElement) =>
        parseFloat(getComputedStyle(el).getPropertyValue('--nds-viewport-padding')) || 16;

    // The part of the screen the visitor sees, in getBoundingClientRect() coords. A pinch
    // zoom or an on-screen keyboard shrinks it; the layout viewport keeps its size. Internal.
    NDS.getVisibleBox = () => {
        const viewport = window.visualViewport, root = document.documentElement;
        const top = viewport ? viewport.offsetTop : 0, left = viewport ? viewport.offsetLeft : 0;
        return { top, left, right: left + (viewport ? viewport.width : root.clientWidth), bottom: top + (viewport ? viewport.height : root.clientHeight) };
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

    // ── Drag Scroll ──────────────────────────────────────────────────
    // A sideways scroller the mouse can work: the wheel scrolls it, a drag scrolls
    // it, and a drag past 3px swallows the click it ends with, so it never follows
    // a link or picks a tab. canScroll(e) gates the wheel and the drag start.
    // Usage: NDS.dragScroll(list, { canScroll: () => list.scrollWidth > list.clientWidth, signal });
    NDS.dragScroll = (el, { canScroll = () => true, signal } = {}) => {
        const getScrollBehavior = () => NDS.prefersReducedMotion ? 'auto' : 'smooth';
        el.addEventListener('wheel', (e) => {
            if (!canScroll(e) || Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
            e.preventDefault();
            el.scrollBy({ left: e.deltaY * (NDS.isRtl ? -0.8 : 0.8), behavior: getScrollBehavior() });
        }, { passive: false, signal });
        // A link's native drag-and-drop would steal the gesture — only while el scrolls.
        el.addEventListener('dragstart', (e) => { if (canScroll(e)) e.preventDefault(); }, { signal });
        el.addEventListener('mousedown', (e) => {
            if (e.button !== 0 || !canScroll(e)) return;
            const startX = e.pageX, startLeft = el.scrollLeft;
            let dragged = false;
            const drag = new AbortController();
            Object.assign(el.style, { cursor: 'grabbing', userSelect: 'none', scrollBehavior: 'auto' });
            document.addEventListener('mousemove', (moveEvent) => {
                if (Math.abs(moveEvent.pageX - startX) > 3) dragged = true;
                el.scrollLeft = startLeft - (moveEvent.pageX - startX);
            }, { signal: drag.signal });
            document.addEventListener('mouseup', () => {
                drag.abort();
                Object.assign(el.style, { cursor: '', userSelect: '', scrollBehavior: getScrollBehavior() });
                if (!dragged) return;
                // Capture on el runs before any target inside it; a click that lands outside never comes.
                const guard = new AbortController();
                el.addEventListener('click', (clickEvent) => { clickEvent.preventDefault(); clickEvent.stopImmediatePropagation(); },
                    { capture: true, once: true, signal: guard.signal });
                setTimeout(() => guard.abort(), 100);
            }, { signal: drag.signal });
        }, { signal });
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
            const speed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nds-transition-speed'));
            cached = isFinite(speed) ? speed * 1000 : 200;
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
    //       NDS.state.set(submenu, 'open');
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
            el.removeEventListener('transitionend', handleEnd);
            fn();
        };
        const handleEnd = (e) => { if (e.target === el) run(); };
        el.addEventListener('transitionend', handleEnd);
        timer = setTimeout(run, fallbackMs);
        return () => {
            if (done) return;
            done = true;
            clearTimeout(timer);
            el.removeEventListener('transitionend', handleEnd);
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
    ].map(selector => selector + ':not([tabindex="-1"])').join(', ');

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
    // A scroller with nothing to focus takes a tab stop so the keyboard can scroll it (Chrome
    // does this itself, Safari does not). Only a tabindex NDS wrote moves.
    const scrollStops = new WeakSet();
    NDS.setScrollStop = (el, on) => {
        if (el.hasAttribute('tabindex') && !scrollStops.has(el)) return;
        if (on) { scrollStops.add(el); el.setAttribute('tabindex', '0'); }
        else { scrollStops.delete(el); el.removeAttribute('tabindex'); }
    };

    NDS.trapFocus = (containerFn) => (e) => {
        if (e.key !== 'Tab') return;
        const container = typeof containerFn === 'function' ? containerFn() : containerFn;
        if (!container) return;
        // An unrendered match as `last` never takes focus, so Tab would leave instead of wrapping.
        // Only the ends decide the wrap: walk in from each, not over every match.
        const focusables = container.querySelectorAll(NDS.focusableSel);
        const isShown = (el) => el.checkVisibility?.({ visibilityProperty: true }) ?? el.getClientRects().length > 0;
        let i = 0, j = focusables.length - 1;
        while (i <= j && !isShown(focusables[i])) i++;
        while (j > i && !isShown(focusables[j])) j--;
        if (i > j) return;
        const first = focusables[i];
        const last = focusables[j];
        // From the container itself (focused when it has no control to start on), Shift+Tab would leave.
        if (e.shiftKey && (document.activeElement === first || document.activeElement === container)) { e.preventDefault(); last.focus(); }
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
        const ensureDefaultRegion = () => {
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
            const el = region === undefined ? ensureDefaultRegion() : region;
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
    // exceptions. Keys are namespaced under an `nds-cache:` prefix so the
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
        const PREFIX = 'nds-cache:';
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

    // ── Cookies ────────────────────────────────────────────────────────
    // Plain reads and writes, no consent check: essential values only. Under file:// there
    // are no cookies, so values fall back to NDS.cache (its nds-cache: prefix and envelope).
    NDS.cookie = (() => {
        const isLocalFile = window.location.protocol === 'file:';
        return {
            get(name) {
                if (isLocalFile) return NDS.cache.get(name);
                const prefix = name + '=';
                const hit = document.cookie.split(';').map(pair => pair.trim()).find(pair => pair.startsWith(prefix));
                if (!hit) return null;
                // A server encodes its cookies (Express res.cookie): give back the text it stored.
                try { return decodeURIComponent(hit.slice(prefix.length)); } catch { return hit.slice(prefix.length); }
            },
            set(name, value, days) {
                if (isLocalFile) return NDS.cache.set(name, value, days * 1440);
                const expires = new Date(Date.now() + days * 864e5).toUTCString();
                document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
            },
            delete(name) {
                if (isLocalFile) return NDS.cache.clear(name);
                const expired = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
                document.cookie = expired;
                // Trackers set theirs on the root domain (_ga on .example.com), which a delete on
                // www. alone misses. The browser ignores the bare public suffix.
                const labels = window.location.hostname.split('.');
                for (let i = 0; i < labels.length - 1; i++) {
                    document.cookie = expired + '; domain=' + labels.slice(i).join('.');
                }
            },
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
    let scrollLocks = 0;
    NDS.scrollLock = {
        lock() {
            if (scrollLocks++) return;
            const scrollY = window.pageYOffset;
            document.body.style.top = `-${scrollY}px`;
            document.body.setAttribute('data-nds-scroll-lock', '');
        },
        unlock() {
            if (!scrollLocks || --scrollLocks) return;
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
        const handleScroll = (e) => {
            if (e?.target?.nodeType && scopeEl.contains(e.target)) return;
            onClose();
        };
        document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        return () => document.removeEventListener('scroll', handleScroll, { capture: true });
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
    const home = new WeakMap();   // moved node → { mark, parent }
    const guardCounts = new WeakMap();   // old parent → how many moved nodes it is guarding
    const nodePrototype = Node.prototype;
    const getStandIn = (parent, node) => { const entry = node && home.get(node); return entry && entry.mark.parentNode === parent ? entry.mark : node; };
    function guardParent(parent) {
        const count = (guardCounts.get(parent) || 0) + 1;
        guardCounts.set(parent, count);
        if (count > 1) return;
        parent.insertBefore = function (node, ref) { return nodePrototype.insertBefore.call(this, getStandIn(this, node), getStandIn(this, ref)); };
        parent.appendChild = function (node) { return nodePrototype.appendChild.call(this, getStandIn(this, node)); };
        parent.removeChild = function (node) {
            if (getStandIn(this, node) === node) return nodePrototype.removeChild.call(this, node);
            // Back home first, through its owner's own exit, then out as the app asked.
            NDS.sendHome(node);
            return nodePrototype.removeChild.call(this, node);
        };
    }
    function unguard(parent) {
        const count = guardCounts.get(parent) - 1;
        if (count > 0) return void guardCounts.set(parent, count);
        guardCounts.delete(parent);
        delete parent.insertBefore;
        delete parent.appendChild;
        delete parent.removeChild;
    }

    NDS.markHome = (el) => {
        const parent = el?.parentNode;
        if (!parent || home.has(el)) return;
        const mark = document.createComment(' moved by NDS ');   // no nds- prefix: the audit reads those as class names
        nodePrototype.insertBefore.call(parent, mark, el);
        home.set(el, { mark, parent });
        guardParent(parent);
    };

    // Put a node NDS.markHome marked back at its marker. True when it went home; when the marker is
    // gone it goes to the end of its old parent while that parent is on the page, else off it.
    NDS.sendHome = (el) => {
        const entry = home.get(el);
        if (!entry) return false;
        home.delete(el);
        const parent = entry.mark.parentNode;
        if (parent) nodePrototype.replaceChild.call(parent, el, entry.mark);
        else if (entry.parent.isConnected) nodePrototype.appendChild.call(entry.parent, el);
        else el.remove();
        unguard(entry.parent);
        return !!el.parentNode;
    };

    // The element a marked node was moved out of, or null.
    NDS.getHome = (el) => home.get(el)?.parent || null;

    // Put a [popover] element in the browser's top layer (on) or take it out (off). It
    // escapes every clip and stacking context without leaving its place in the DOM, so
    // closest(), bubbling and inherited styles still work. No popover support (Safari < 17,
    // Firefox < 125): it stays where it is; the component's CSS decides what clips it.
    // Usage: NDS.setTopLayer(menu, true); … NDS.setTopLayer(menu, false);
    NDS.setTopLayer = (el, on) => {
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
    // With an anchor and CSS anchor positioning (Chrome 125, Safari 26), the coords are written
    // against the anchor, so the browser keeps el on it through every scroll with no script.
    // An anchor in a fixed or sticky box (a panel) gets a fixed el: page scroll moves neither.
    // Checked once: an anchor el cannot use (one in a later top-layer box) gets plain coords.
    // Returns true when anchored; NDS.unplace(el, anchor) removes what an anchored place wrote.
    // Usage: NDS.place(menu, top, leftPx[, trigger]);
    const ANCHORS = typeof CSS !== 'undefined' && CSS.supports('anchor-name: --a');
    const anchorNames = new WeakMap();
    let anchorCount = 0;
    const offset = (el, top, left) => {
        const rect = el.getBoundingClientRect();
        const { m41: translateX, m42: translateY } = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return [(rect.left - translateX) - left, (rect.top - translateY) - top];
    };
    NDS.place = (el, top, left, anchor) => {
        if (anchor && ANCHORS) {
            if (!anchorNames.has(anchor)) anchorNames.set(anchor, '--nds-anchor-' + ++anchorCount);
            const name = anchorNames.get(anchor), at = anchor.getBoundingClientRect();
            anchor.style.setProperty('anchor-name', name);
            el.style.setProperty('position-anchor', name);
            el.style.position = NDS.isPinned(anchor) ? 'fixed' : '';
            el.style.top = `calc(anchor(top) + ${top - at.top}px)`;
            el.style.left = `calc(anchor(left) + ${left - at.left}px)`;
            const [dx, dy] = offset(el, top, left);
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return true;
            NDS.unplace(el, anchor);
        }
        el.style.top = top + 'px';
        el.style.left = left + 'px';
        const [dx, dy] = offset(el, top, left);
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            el.style.top  = (top  - dy) + 'px';
            el.style.left = (left - dx) + 'px';
        }
        return false;
    };
    NDS.unplace = (el, anchor) => {
        anchor?.style.removeProperty('anchor-name');
        ['position-anchor', 'position', 'top', 'left'].forEach((property) => el.style.removeProperty(property));
    };

    // Inside a fixed or sticky box: it stays put while the page scrolls under it.
    // Usage: if (NDS.isPinned(trigger)) follow it on page scroll;
    NDS.isPinned = (el) => {
        for (let box = el.parentElement; box; box = box.parentElement) if (/fixed|sticky/.test(getComputedStyle(box).position)) return true;
        return false;
    };

    // Cached lookup for `.nds-main-nav` — flipPosition fires on every popup
    // open, so avoiding the repeated qS adds up. `undefined` = never looked up,
    // null = looked up and absent, element = cached. SPA consumers that swap
    // the nav DOM on route changes leave a detached element in the cache;
    // isConnected re-lookups in that case (null stays sticky to avoid
    // re-querying on every popup when no nav is present).
    let navEl;

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
        const root = document.documentElement;
        const vw = root.clientWidth;
        const vh = root.clientHeight;
        // Space is measured inside what the visitor sees, so a menu never opens under the keyboard.
        const box = NDS.getVisibleBox();

        let topEdge = box.top;
        if (respectNav) {
            if (navEl === undefined || (navEl && !navEl.isConnected)) {
                navEl = document.querySelector('.nds-main-nav');
            }
            if (navEl) {
                const navRect = navEl.getBoundingClientRect();
                // The sticky nav is a top boundary only for triggers BELOW it. A
                // trigger ABOVE the nav (e.g. a topbar dropmenu) opens a downward
                // menu that passes in front of the nav, so the nav must not clamp
                // it down past itself — leaving a gap below the trigger. Same for
                // a trigger INSIDE the nav (a nav-link tooltip): its popup opens
                // in front of the nav, and the clamp pushed it navGap below it.
                if (navRect.bottom > 0 && triggerRect.bottom > navRect.top && !navEl.contains(trigger)) {
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

    // ── Scroll restoration ─────────────────────────────────────────────
    // Native restoration stays ON — the browser applies the offset BEFORE first
    // paint, so a reload never flashes the top of the page (manual mode painted
    // frame one at 0 and jumped at the stamp). 'auto' is set explicitly: the
    // mode persists per history entry, so tabs stamped 'manual' by earlier
    // builds must be unstuck. Native lands on cv's 680px section estimates, so at
    // data-nds-loaded every section is marked drawn (real heights from then on)
    // and the page re-pins to the exact saved offset. Reload: always (native target == ours). Back/forward:
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
                    drawAll();
                    if (navType === 'reload' || !window.scrollY) window.scrollTo(0, y);
                };
                if (root.hasAttribute('data-nds-loaded')) restore();
                else {
                    const off = NDS.onAttributeChange('html', ['data-nds-loaded'], () => {
                        if (root.hasAttribute('data-nds-loaded')) { off(); restore(); }
                    });
                }
                window.addEventListener('load', restore);                   // fallback
            }
        }
    }

    // ── Sections nobody has scrolled to: draw the rest ────────────────
    // One per idle frame after the reveal: a scroll then meets no skipped section (up to 196ms
    // frames at 6.6x), and a scrollIntoView() of yours lands on real heights.
    if (canSkip) {
        const root = document.documentElement;
        const drawNext = () => {
            const section = document.querySelector('.nds-content-section:not([data-nds-drawn])');
            if (section) { markDrawn(section); requestAnimationFrame(() => NDS.onIdle(drawNext)); }
        };
        if (root.hasAttribute('data-nds-loaded')) NDS.onIdle(drawNext);
        else {
            const off = NDS.onAttributeChange('html', ['data-nds-loaded'], () => {
                if (root.hasAttribute('data-nds-loaded')) { off(); NDS.onIdle(drawNext); }
            });
        }
    }
})();
