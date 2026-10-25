/* NDS.Countdown — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Countdown.init() / .reinit()     wire every .nds-countdown not yet wired
 *   NDS.Countdown.setTarget(el, target)  a new target: ISO text, a Date, or seconds from now (number)
 * Events:
 *   nds:countdown:tick   detail {remaining} — every second, from the element
 *   nds:countdown:warn   detail {remaining} — once, when remaining reaches data-countdown-warn
 *   nds:countdown:end    detail {}          — once, at zero
 * Hooks:
 *   data-countdown          the target: YYYY-MM-DD[THH:mm[:ss]][offset]. No offset = the site timezone.
 *                           Empty: shows its placeholders and waits for setTarget(), with no timer and no events
 *   data-countdown-seconds  a duration from wire time instead of a target
 *   data-countdown-warn     seconds; at or under it the root carries data-state="warning"
 *   data-countdown-now      the server's current time (ISO), on the root or any ancestor (<html> for the page),
 *                           so a wrong visitor clock cannot move a deadline
 *   [data-unit="d|h|m|s"]   a unit: the script writes its .nds-countdown-value, or the unit itself when it has none.
 *                           The units written are the units shown; words and separators are the author's markup.
 *                           An empty .nds-countdown-label inside a unit gets the unit word in the element's language,
 *                           and data-countdown-sizes with every form of it, so the CSS reserves the widest
 *                           A <span> root is inline text; any other root is one row of units (CSS, .nds-lg/.nds-sm),
 *                           a centered .nds-card (.nds-center) per unit bringing every card variant and knob,
 *                           or plain units (number over word), as in a row card's banner
 *   [data-countdown-hide-zero]  on a unit: hidden while its value is 0 (the default markup's days)
 *   data-countdown-hide     ids, space-separated: those elements get hidden at zero (an action that ends with the
 *                           deadline), anywhere on the page. setTarget() shows them again
 *   data-countdown-show     ids, space-separated: hidden until zero, then shown (a closed message outside the root)
 *   .nds-countdown-ended    at zero it becomes the root's only content, from any depth; setTarget() puts the rest back.
 *                           Without it the zeros stay
 *   no [data-unit] at all   the script writes the default: days with their word (hidden at 0), then hh:mm:ss
 * Gotchas:
 *   - One timer per page, aligned to the second. Each tick computes from the target, nothing is
 *     decremented, so a throttled or hidden tab never drifts: it renders once on return.
 *   - The largest unit written absorbs what is above it (h m shows 2 days as 48 h), and a skipped
 *     unit in the middle carries into the next one written.
 *   - data-countdown-seconds counts from wire time, so a reload restarts it. For a resumed timer
 *     the server renders the remainder, or the page calls setTarget(el, seconds).
 *   - With no dir of its own, the root gets dir="auto": digits and separators alone (05:12:09) read
 *     left to right in every language, and Arabic unit words make it right to left. The ended
 *     message gets dir="auto" too, so its words never turn the numbers around.
 */

(() => {
    'use strict';

    const SELECTOR = '.nds-countdown';
    const WIRED_ATTRIBUTE = 'data-nds-countdown-initialized';
    const unitSeconds = { d: 86400, h: 3600, m: 60, s: 1 };
    const unitNames = { d: 'day', h: 'hour', m: 'minute', s: 'second' };
    const DEFAULT_MARKUP = '<span data-unit="d" data-countdown-hide-zero><span class="nds-countdown-value">--</span> <span class="nds-countdown-label"></span> </span>'
        + '<span class="nds-countdown-value" data-unit="h">--</span>:<span class="nds-countdown-value" data-unit="m">--</span>:<span class="nds-countdown-value" data-unit="s">--</span>';

    // Per-element runtime: { target (ms), offset, warn, warned, lang, order, units: [{ unit, box, value, label, hideZero }] }
    const items = new Map();
    const offsets = new WeakMap(); // server now − visitor now, fixed at wire time
    const endedSwap = new WeakMap(); // the content an ended message replaced, for setTarget() to put back
    let timer = null;
    let visibilityBound = false;
    const zoneFormats = new Map();
    const unitFormats = new Map();

    const pad = (number) => String(number).padStart(2, '0');

    // The elements the root names by id: data-countdown-hide ones go at zero, data-countdown-show ones come.
    function toggleLinked(el, ended) {
        for (const [attribute, hide] of [['data-countdown-hide', ended], ['data-countdown-show', !ended]]) {
            for (const id of (el.getAttribute(attribute) || '').split(/\s+/)) {
                if (!id) continue;
                const linked = document.getElementById(id);
                if (linked) linked.hidden = hide;
                else console.warn(`NDS Countdown: ${attribute} names no element with id "${id}"`, el);
            }
        }
    }

    // The wall clock of epoch `t` in `tz`, as if it were UTC.
    function getWallTime(epoch, timeZone) {
        let formatter = zoneFormats.get(timeZone);
        if (!formatter) {
            formatter = new Intl.DateTimeFormat('en', { timeZone: timeZone, hourCycle: 'h23', numberingSystem: 'latn',
                year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
            zoneFormats.set(timeZone, formatter);
        }
        const parts = {};
        for (const { type, value } of formatter.formatToParts(epoch)) parts[type] = +value;
        return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    }

    // ISO text → epoch ms, or NaN. An offset is read as written; without one it is a wall
    // time in the site timezone (the visitor's when <html data-timezone> is unset).
    // ponytail: lives here until a second component reads a wall time in the site timezone, then it moves to NDS.Date.
    function parseIso(text) {
        const trimmed = String(text ?? '').trim();
        const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?)?(Z|([+-])(\d{2}):?(\d{2}))?$/.exec(trimmed);
        if (!match) return NaN;
        const [y, month, day] = [+match[1], +match[2], +match[3]];
        const [hour, minute, second] = [+match[4] || 0, +match[5] || 0, +match[6] || 0];
        const wall = Date.UTC(y, month - 1, day, hour, minute, second);
        // Not Date.parse: it rejects a date-only offset (Chrome) and +0300 (Safari).
        if (match[7]) return match[7] === 'Z' ? wall : wall - (match[8] === '-' ? -1 : 1) * (match[9] * 60 + +match[10]) * 6e4;
        const timeZone = NDS.Date.site.timeZone;
        if (!timeZone) return new Date(y, month - 1, day, hour, minute, second).getTime();
        // Shift by the zone's offset at the guess, then once more in case the guess sat across a DST edge.
        let epoch = wall;
        for (let i = 0; i < 2; i++) epoch = wall - (getWallTime(epoch, timeZone) - epoch);
        return epoch;
    }

    // The unit word for `value` in `lang`, with the language's own plural ("3 أيام", "11 يومًا").
    function getUnitWord(lang, unit, value) {
        const key = lang + unit;
        let formatter = unitFormats.get(key);
        if (!formatter) {
            formatter = new Intl.NumberFormat(lang, { style: 'unit', unit: unitNames[unit], unitDisplay: 'long' });
            unitFormats.set(key, formatter);
        }
        return formatter.formatToParts(value).find((part) => part.type === 'unit')?.value ?? '';
    }

    // Every form the unit word takes, one per line: the CSS reserves the widest, so a label never
    // resizes its box ("seconds" → "second"). One number per plural category: 0 1 2 3 11 100.
    const getWordForms = (lang, unit) => [...new Set([0, 1, 2, 3, 11, 100].map((number) => getUnitWord(lang, unit, number)))].join('\n');

    function fire(el, type, detail) {
        el.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: detail || {} }));
    }

    const getRemaining = (it) => Math.max(0, Math.round((it.target - Date.now() - it.offset) / 1000));

    function render(el, it) {
        const rem = getRemaining(it);
        // The largest written unit takes everything above it; a skipped unit carries down.
        const values = {};
        let left = rem;
        for (const unit of it.order) {
            values[unit] = Math.floor(left / unitSeconds[unit]);
            left -= values[unit] * unitSeconds[unit];
        }
        for (const x of it.units) {
            const value = values[x.unit];
            x.value.textContent = x.unit === 'd' ? value : pad(value);
            if (x.label) x.label.textContent = getUnitWord(it.lang, x.unit, value);
            if (x.hideZero) x.box.hidden = value === 0;
        }
        fire(el, 'nds:countdown:tick', { remaining: rem });
        // A listener's setTarget() replaced this run and rendered itself: this one stops.
        if (items.get(el) !== it) return;
        if (it.warn && !it.warned && rem <= it.warn) {
            it.warned = true;
            NDS.state.add(el, 'warning');
            fire(el, 'nds:countdown:warn', { remaining: rem });
            if (items.get(el) !== it) return;
        }
        if (rem === 0) {
            items.delete(el);
            NDS.state.remove(el, 'warning');
            NDS.state.add(el, 'ended');
            // The ended message becomes the only content: units, words and separators all go at once.
            const done = el.querySelector('.nds-countdown-ended');
            if (done) {
                endedSwap.set(el, { nodes: Array.from(el.childNodes), done, parent: done.parentNode, next: done.nextSibling });
                el.replaceChildren(done);
            }
            toggleLinked(el, true);
            fire(el, 'nds:countdown:end');
        }
    }

    function tick() {
        timer = null;
        // A copy: an entry a listener's setTarget() replaces or re-adds would be visited again in this loop.
        for (const [el, it] of [...items]) {
            if (items.get(el) !== it) continue;
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
        let epoch = typeof target === 'number' ? Date.now() + offset + target * 1000
            : target instanceof Date ? target.getTime() : parseIso(target);
        if (!Number.isFinite(epoch)) {
            console.warn('NDS Countdown: target is not a date or a number of seconds', el);
            return false;
        }
        // On a whole visitor second, like the timer: a late tick then never flips the rounding (15, 15).
        epoch = Math.round((epoch - offset) / 1000) * 1000 + offset;
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
            if (!(unit in unitSeconds)) return;
            const label = box.querySelector('.nds-countdown-label');
            // A written label stays as the author wrote it. An empty one is ours: the sizes stamp marks it after the fill.
            const auto = label && (!label.textContent.trim() || label.hasAttribute('data-countdown-sizes'));
            if (auto) label.setAttribute('data-countdown-sizes', getWordForms(lang, unit));
            units.push({ unit, box, value: box.querySelector('.nds-countdown-value') || box,
                label: auto ? label : null, hideZero: box.hasAttribute('data-countdown-hide-zero') });
        });
        const order = Object.keys(unitSeconds).filter((unit) => units.some((x) => x.unit === unit));
        const it = { target: epoch, offset, warn: parseInt(el.getAttribute('data-countdown-warn'), 10) || 0, warned: false,
            lang, order, units };
        // Only the largest unit can lose a digit (10 → 9 days): its value holds the width of its start.
        const top = order[0];
        if (top) {
            const value = Math.floor(getRemaining(it) / unitSeconds[top]);
            units.forEach((x) => { if (x.unit === top) x.value.setAttribute('data-countdown-sizes', top === 'd' ? String(value) : pad(value)); });
        }
        NDS.state.remove(el, 'ended', 'warning');
        toggleLinked(el, false);
        items.set(el, it);
        render(el, it);
        if (items.has(el)) schedule();
        return true;
    }

    function setupCountdown(el) {
        if (el.hasAttribute(WIRED_ATTRIBUTE) || el.closest('code')) return;
        // Once: a waiter is re-wired by every reinit(), and the server time in the markup does not move.
        const src = !offsets.has(el) && el.closest('[data-countdown-now]');
        if (src) {
            const serverNow = parseIso(src.getAttribute('data-countdown-now'));
            if (Number.isFinite(serverNow)) offsets.set(el, serverNow - Date.now());
            else console.warn('NDS Countdown: data-countdown-now is not a date', src);
        }
        if (!el.querySelector('[data-unit]')) el.insertAdjacentHTML('afterbegin', DEFAULT_MARKUP);
        // A time is left to right in every script. Without this, the sized largest unit (an inline box,
        // which bidi treats as a neutral) flips "02:03" to "03:02" on an Arabic page.
        if (!el.hasAttribute('dir')) el.dir = 'auto';
        el.querySelectorAll('.nds-countdown-ended:not([dir])').forEach((message) => { message.dir = 'auto'; });
        const seconds = el.getAttribute('data-countdown-seconds');
        if (seconds === null && el.getAttribute('data-countdown') === '') return; // waits for setTarget()
        // Stamped only on success, so reinit() retries a target filled in later.
        if (track(el, seconds !== null ? parseInt(seconds, 10) : el.getAttribute('data-countdown'))) el.setAttribute(WIRED_ATTRIBUTE, '');
    }

    // A page with no countdown at load never runs init(), so setTarget() binds this too.
    function addVisibilityListeners() {
        if (visibilityBound) return;
        visibilityBound = true;
        document.addEventListener('visibilitychange', () => { document.hidden ? stopTimer() : tick(); });
    }

    function init() {
        document.querySelectorAll(SELECTOR).forEach(setupCountdown);
        addVisibilityListeners();
    }

    NDS.Countdown = {
        init,
        reinit: init,
        setTarget(el, target) { if (el) { addVisibilityListeners(); track(el, target); } }
    };
})();
