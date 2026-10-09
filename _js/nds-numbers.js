/* NDS.Numbers — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Numbers.init() / .reinit()        format every number and arm every counter
 *   NDS.Numbers.format(el)                format one .nds-number-format element
 *   NDS.Numbers.formatNumbers()           format all of them
 *   NDS.Numbers.setupCounterAnimations()  re-arm the counters only
 * Events:
 *   (none)
 * Hooks:
 *   .nds-number-format   class on any element holding a number — its text gets the page
 *                        lang's separators, in Latin digits (NDS.formatNumber), with the
 *                        decimals as written ("1250.50" → "1,250.50")
 *   data-counter         on a counting element: the end value; a prefix or suffix in it is kept
 *                        ("$75,000", "98.6%"). Empty: the number written in the element.
 *                        The counter formats its own output, so it needs no .nds-number-format
 *   data-counter-start   the start value, default 0
 *   data-counter-duration  milliseconds, default 1000
 *   written by the component: data-animated once a counter has finished
 * Gotchas:
 *   - format() is idempotent — it remembers the text it wrote and re-reads the source,
 *     so a caller like the slider can run it after every value write, in any locale.
 *   - It rewrites the TEXT NODE holding the number, so icons and other children survive.
 *   - format() skips a counter: the counter owns its text.
 *   - A counter runs when it scrolls into view, once. Reduced motion jumps to the target.
 *     To run it again, remove data-animated and call reinit().
 */
(() => {
    'use strict';

    // prefix · sign · digits (commas allowed) · suffix
    const NUMBER = /^(.*?)([-+]?)((?:\d[\d,]*)?\.?\d+)(.*)$/s;
    const COUNTER = '[data-counter]';
    const attr = (el, name) => el.getAttribute('data-counter-' + name);

    // text node → [text we wrote, the text it came from]: a re-run reads the source, never
    // our own output, which other locales group with "." ("3.240.000").
    const written = new WeakMap();

    function source(node) {
        const w = written.get(node);
        return w && w[0] === node.textContent ? w[1] : node.textContent;
    }

    function write(node, text) {
        written.set(node, [text, source(node)]);
        node.textContent = text;
    }

    // The written decimals are kept: both min and max, so 1250.50 keeps its zero.
    const places = (n) => ({ minimumFractionDigits: n.decimals, maximumFractionDigits: n.decimals });

    function parse(text) {
        const m = text.trim().match(NUMBER);
        if (!m) return null;
        const digits = m[3].replace(/,/g, '');
        return { prefix: m[1] + m[2], value: parseFloat(digits), decimals: (digits.split('.')[1] || '').length, suffix: m[4] };
    }

    // The text node holding the number; icons and other children stay.
    function numberNode(el) {
        for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && /\d/.test(node.textContent)) return node;
        }
        return null;
    }

    function format(el) {
        if (!el || el.closest('code') || el.matches(COUNTER)) return;
        const node = numberNode(el);
        const n = node && parse(source(node));
        if (n) write(node, n.prefix + NDS.formatNumber(n.value, places(n)) + n.suffix);
    }

    function formatNumbers() {
        document.querySelectorAll('.nds-number-format').forEach(format);
    }

    function count(el, reduced) {
        const node = numberNode(el);
        const n = parse(el.getAttribute('data-counter') || (node ? source(node) : '')) || { prefix: '', value: 0, decimals: 0, suffix: '' };
        const opts = places(n);
        const start = parseFloat(attr(el, 'start')) || 0;
        const ms = parseInt(attr(el, 'duration'), 10);
        const duration = reduced ? 0 : (isNaN(ms) ? 1000 : ms);

        const show = (value) => {
            const text = n.prefix + NDS.formatNumber(value, opts) + n.suffix;
            const target = numberNode(el);
            if (!target) el.appendChild(document.createTextNode(text));
            else if (target.textContent !== text) write(target, text);
        };
        const done = () => {
            show(n.value);
            el.setAttribute('data-animated', 'true');
            delete el._ndsCounting;
        };

        el._ndsCounting = true;
        if (!duration) return done();
        const t0 = performance.now();
        const tick = (now) => {
            const p = (now - t0) / duration;
            if (p >= 1) return done();
            show(start + (n.value - start) * p);
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    function setupCounterAnimations() {
        const reduced = NDS.prefersReducedMotion;
        document.querySelectorAll(COUNTER).forEach(el => {
            // reinit() re-arms: release a subscription that has not fired yet.
            if (el._ndsCounterOff) el._ndsCounterOff();
            delete el._ndsCounterOff;
            if (el.closest('code') || el.hasAttribute('data-animated') || el._ndsCounting) return;
            el._ndsCounterOff = NDS.onIntersect(el, (entry) => {
                if (!entry.isIntersecting) return;
                el._ndsCounterOff();
                delete el._ndsCounterOff;
                count(el, reduced);
            }, { threshold: 0.5 });
        });
    }

    // Exposed at once: the loader's init system calls it.
    NDS.Numbers = {
        format,
        formatNumbers,
        setupCounterAnimations,
        init() {
            formatNumbers();
            setupCounterAnimations();
        },
        reinit() {
            formatNumbers();
            setupCounterAnimations();
        }
    };
})();
