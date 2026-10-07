/* NDS.Countdown — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Countdown.init() / .reinit()     wire every .nds-countdown not yet wired
 *   NDS.Countdown.set(el, target)        a new target: ISO text, a Date, or seconds from now (number)
 * Events:
 *   nds:countdown:tick   detail {remaining} — every second, from the element
 *   nds:countdown:warn   detail {remaining} — once, when remaining reaches data-countdown-warn
 *   nds:countdown:end    detail {}          — once, at zero
 * Hooks:
 *   data-countdown          the target: YYYY-MM-DD[THH:mm[:ss]][offset]. No offset = the site timezone
 *   data-countdown-seconds  a duration from wire time instead of a target
 *   data-countdown-warn     seconds; at or under it the root carries data-state="warning"
 *   data-countdown-now      the server's current time (ISO), on the root or any ancestor (<html> for the page),
 *                           so a wrong visitor clock cannot move a deadline
 *   [data-unit="d|h|m|s"]   a unit: the script writes its .nds-countdown-value, or the unit itself when it has none.
 *                           The units written are the units shown; words and separators are the author's markup.
 *                           An empty .nds-countdown-label inside a unit gets the unit word in the element's language,
 *                           and data-countdown-sizes with every form of it, so the CSS reserves the widest
 *                           A <span> root is inline text; any other root is one row of units (CSS, .nds-lg/.nds-sm),
 *                           a .nds-card.nds-statistic per unit bringing every card variant and knob
 *   [data-countdown-hide-zero]  on a unit: hidden while its value is 0 (the default markup's days)
 *   .nds-countdown-ended    at zero it becomes the root's only content, from any depth; set() puts the rest back.
 *                           Without it the zeros stay
 *   no [data-unit] at all   the script writes the default: days with their word (hidden at 0), then hh:mm:ss
 * Gotchas:
 *   - One timer per page, aligned to the second. Each tick computes from the target, nothing is
 *     decremented, so a throttled or hidden tab never drifts: it renders once on return.
 *   - The largest unit written absorbs what is above it (h m shows 2 days as 48 h), and a skipped
 *     unit in the middle carries into the next one written.
 *   - data-countdown-seconds counts from wire time, so a reload restarts it. For a resumed timer
 *     the server renders the remainder, or the page calls set(el, seconds).
 *   - The root is a bidi isolate in the page direction (CSS): Arabic words around the units read
 *     right to left, and 05:12:09 stays one number run without a forced direction.
 */

(() => {
    'use strict';

    const SEL = '.nds-countdown';
    const WIRED_ATTR = 'data-nds-countdown-initialized';
    const UNITS = { d: 86400, h: 3600, m: 60, s: 1 };
    const UNIT_NAMES = { d: 'day', h: 'hour', m: 'minute', s: 'second' };
    const DEFAULT_MARKUP = '<span data-unit="d" data-countdown-hide-zero><span class="nds-countdown-value">--</span> <span class="nds-countdown-label"></span> </span>'
        + '<span class="nds-countdown-value" data-unit="h">--</span>:<span class="nds-countdown-value" data-unit="m">--</span>:<span class="nds-countdown-value" data-unit="s">--</span>';

    // Per-element runtime: { target (ms), offset, warn, warned, lang, order, units: [{ unit, box, value, label, hideZero }] }
    const items = new Map();
    const offsets = new WeakMap(); // server now − visitor now, fixed at wire time
    const endedSwap = new WeakMap(); // the content an ended message replaced, for set() to put back
    let timer = null;
    let visibilityBound = false;
    const zoneFormats = new Map();
    const unitFormats = new Map();

    const pad = (n) => String(n).padStart(2, '0');

    // The wall clock of epoch `t` in `tz`, as if it were UTC.
    function wallOf(t, tz) {
        let f = zoneFormats.get(tz);
        if (!f) {
            f = new Intl.DateTimeFormat('en', { timeZone: tz, hourCycle: 'h23', numberingSystem: 'latn',
                year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
            zoneFormats.set(tz, f);
        }
        const p = {};
        for (const { type, value } of f.formatToParts(t)) p[type] = +value;
        return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    }

    // ISO text → epoch ms, or NaN. An offset is read as written; without one it is a wall
    // time in the site timezone (the visitor's when <html data-timezone> is unset).
    // ponytail: lives here until a second component reads a wall time in the site timezone, then it moves to NDS.date.
    function parseIso(text) {
        const s = String(text ?? '').trim();
        const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?(Z|([+-])(\d{2}):?(\d{2}))?$/.exec(s);
        if (!m) return NaN;
        const [y, mo, d] = [+m[1], +m[2], +m[3]];
        const [h, mi, sec] = [+m[4] || 0, +m[5] || 0, +m[6] || 0];
        const wall = Date.UTC(y, mo - 1, d, h, mi, sec);
        // Not Date.parse: it rejects a date-only offset (Chrome) and +0300 (Safari).
        if (m[7]) return m[7] === 'Z' ? wall : wall - (m[8] === '-' ? -1 : 1) * (m[9] * 60 + +m[10]) * 6e4;
        const tz = NDS.date.site.timeZone;
        if (!tz) return new Date(y, mo - 1, d, h, mi, sec).getTime();
        // Shift by the zone's offset at the guess, then once more in case the guess sat across a DST edge.
        let t = wall;
        for (let i = 0; i < 2; i++) t = wall - (wallOf(t, tz) - t);
        return t;
    }

    // The unit word for `value` in `lang`, with the language's own plural ("3 أيام", "11 يومًا").
    function unitWord(lang, unit, value) {
        const key = lang + unit;
        let f = unitFormats.get(key);
        if (!f) {
            f = new Intl.NumberFormat(lang, { style: 'unit', unit: UNIT_NAMES[unit], unitDisplay: 'long' });
            unitFormats.set(key, f);
        }
        return f.formatToParts(value).find((p) => p.type === 'unit')?.value ?? '';
    }

    // Every form the unit word takes, one per line: the CSS reserves the widest, so a label never
    // resizes its box ("seconds" → "second"). One number per plural category: 0 1 2 3 11 100.
    const wordForms = (lang, unit) => [...new Set([0, 1, 2, 3, 11, 100].map((n) => unitWord(lang, unit, n)))].join('\n');

    function fire(el, type, detail) {
        el.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: detail || {} }));
    }

    const remainingOf = (it) => Math.max(0, Math.round((it.target - Date.now() - it.offset) / 1000));

    function render(el, it) {
        const rem = remainingOf(it);
        // The largest written unit takes everything above it; a skipped unit carries down.
        const vals = {};
        let left = rem;
        for (const u of it.order) {
            vals[u] = Math.floor(left / UNITS[u]);
            left -= vals[u] * UNITS[u];
        }
        for (const x of it.units) {
            const v = vals[x.unit];
            x.value.textContent = x.unit === 'd' ? v : pad(v);
            if (x.label) x.label.textContent = unitWord(it.lang, x.unit, v);
            if (x.hideZero) x.box.hidden = v === 0;
        }
        fire(el, 'nds:countdown:tick', { remaining: rem });
        if (it.warn && !it.warned && rem <= it.warn) {
            it.warned = true;
            NDS.State.add(el, 'warning');
            fire(el, 'nds:countdown:warn', { remaining: rem });
        }
        if (rem === 0) {
            items.delete(el);
            NDS.State.remove(el, 'warning');
            NDS.State.add(el, 'ended');
            // The ended message becomes the only content: units, words and separators all go at once.
            const done = el.querySelector('.nds-countdown-ended');
            if (done) {
                endedSwap.set(el, { nodes: Array.from(el.childNodes), done, parent: done.parentNode, next: done.nextSibling });
                el.replaceChildren(done);
            }
            fire(el, 'nds:countdown:end');
        }
    }

    function tick() {
        timer = null;
        for (const [el, it] of items) {
            if (!el.isConnected) { items.delete(el); continue; }
            render(el, it);
        }
        if (items.size) schedule();
    }

    // One timeout for every countdown, aligned to the next second.
    function schedule() {
        if (timer || document.hidden) return;
        timer = setTimeout(tick, 1000 - Date.now() % 1000);
    }

    function stopTimer() {
        if (!timer) return;
        clearTimeout(timer);
        timer = null;
    }

    function track(el, target) {
        const offset = offsets.get(el) || 0;
        const t = typeof target === 'number' ? Date.now() + offset + target * 1000
            : target instanceof Date ? target.getTime() : parseIso(target);
        if (!Number.isFinite(t)) {
            console.warn('NDS Countdown: target is not a date or a number of seconds', el);
            return false;
        }
        const swap = endedSwap.get(el);
        if (swap) {
            el.replaceChildren(...swap.nodes);
            swap.parent.insertBefore(swap.done, swap.next);
            endedSwap.delete(el);
        }
        let lang = el.closest('[lang]')?.lang || 'en';
        // Intl throws on a malformed tag (ar_SA), which would stop every countdown after this one.
        try { Intl.getCanonicalLocales(lang); } catch {
            console.warn(`NDS Countdown: lang "${lang}" is not a language tag; using en`, el);
            lang = 'en';
        }
        const units = [];
        el.querySelectorAll('[data-unit]').forEach((box) => {
            const unit = box.getAttribute('data-unit');
            if (!(unit in UNITS)) return;
            const label = box.querySelector('.nds-countdown-label');
            // A written label stays as the author wrote it. An empty one is ours: the sizes stamp marks it after the fill.
            const auto = label && (!label.textContent.trim() || label.hasAttribute('data-countdown-sizes'));
            if (auto) label.setAttribute('data-countdown-sizes', wordForms(lang, unit));
            units.push({ unit, box, value: box.querySelector('.nds-countdown-value') || box,
                label: auto ? label : null, hideZero: box.hasAttribute('data-countdown-hide-zero') });
        });
        const order = Object.keys(UNITS).filter((u) => units.some((x) => x.unit === u));
        const it = { target: t, offset, warn: parseInt(el.getAttribute('data-countdown-warn'), 10) || 0, warned: false,
            lang, order, units };
        // Only the largest unit can lose a digit (10 → 9 days): its value holds the width of its start.
        const top = order[0];
        if (top) {
            const v = Math.floor(remainingOf(it) / UNITS[top]);
            units.forEach((x) => { if (x.unit === top) x.value.setAttribute('data-countdown-sizes', top === 'd' ? String(v) : pad(v)); });
        }
        NDS.State.remove(el, 'ended', 'warning');
        items.set(el, it);
        render(el, it);
        if (items.has(el)) schedule();
        return true;
    }

    function wire(el) {
        if (el.hasAttribute(WIRED_ATTR) || el.closest('code, .code-example')) return;
        const src = el.closest('[data-countdown-now]');
        if (src) {
            const t = parseIso(src.getAttribute('data-countdown-now'));
            if (Number.isFinite(t)) offsets.set(el, t - Date.now());
            else console.warn('NDS Countdown: data-countdown-now is not a date', src);
        }
        if (!el.querySelector('[data-unit]')) el.insertAdjacentHTML('afterbegin', DEFAULT_MARKUP);
        const seconds = el.getAttribute('data-countdown-seconds');
        // Stamped only on success, so reinit() retries a target filled in later.
        if (track(el, seconds !== null ? parseInt(seconds, 10) : el.getAttribute('data-countdown'))) el.setAttribute(WIRED_ATTR, '');
    }

    function init() {
        document.querySelectorAll(SEL).forEach(wire);
        if (!visibilityBound) {
            visibilityBound = true;
            document.addEventListener('visibilitychange', () => { document.hidden ? stopTimer() : tick(); });
        }
    }

    NDS.Countdown = {
        init,
        reinit: init,
        set(el, target) { if (el) track(el, target); }
    };
})();
