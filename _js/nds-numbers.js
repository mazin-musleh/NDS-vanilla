/* NDS.Numbers — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Numbers.init() / .reinit()        format every number and arm every counter
 *   NDS.Numbers.format(el)                format one .nds-number-format element
 *   NDS.Numbers.formatAll()               format all of them
 *   NDS.Numbers.initCounters()            re-arm the counters only
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
    const getCounterAttribute = (el, name) => el.getAttribute('data-counter-' + name);

    // text node → [text we wrote, the text it came from]: a re-run reads the source, never
    // our own output, which other locales group with "." ("3.240.000").
    const written = new WeakMap();

    // Counters mid-animation; a reinit() leaves them alone.
    const countingElements = new WeakSet();

    function getSourceText(node) {
        const record = written.get(node);
        return record && record[0] === node.textContent ? record[1] : node.textContent;
    }

    function write(node, text) {
        written.set(node, [text, getSourceText(node)]);
        node.textContent = text;
    }

    // The written decimals are kept: both min and max, so 1250.50 keeps its zero.
    const toFractionOptions = (parsed) => ({ minimumFractionDigits: parsed.decimals, maximumFractionDigits: parsed.decimals });

    function parse(text) {
        const match = text.trim().match(NUMBER);
        if (!match) return null;
        const digits = match[3].replace(/,/g, '');
        return { prefix: match[1] + match[2], value: parseFloat(digits), decimals: (digits.split('.')[1] || '').length, suffix: match[4] };
    }

    // The text node holding the number; icons and other children stay.
    function findNumberNode(el) {
        for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && /\d/.test(node.textContent)) return node;
        }
        return null;
    }

    function format(el) {
        if (!el || el.closest('code') || el.matches(COUNTER)) return;
        const node = findNumberNode(el);
        const parsed = node && parse(getSourceText(node));
        if (parsed) write(node, parsed.prefix + NDS.formatNumber(parsed.value, toFractionOptions(parsed)) + parsed.suffix);
    }

    function formatNumbers() {
        document.querySelectorAll('.nds-number-format').forEach(format);
    }

    function count(el, reduced) {
        const node = findNumberNode(el);
        const parsed = parse(el.getAttribute('data-counter') || (node ? getSourceText(node) : '')) || { prefix: '', value: 0, decimals: 0, suffix: '' };
        const opts = toFractionOptions(parsed);
        const start = parseFloat(getCounterAttribute(el, 'start')) || 0;
        const ms = parseInt(getCounterAttribute(el, 'duration'), 10);
        const duration = reduced ? 0 : (isNaN(ms) ? 1000 : ms);

        const show = (value) => {
            const text = parsed.prefix + NDS.formatNumber(value, opts) + parsed.suffix;
            const target = findNumberNode(el);
            if (!target) el.appendChild(document.createTextNode(text));
            else if (target.textContent !== text) write(target, text);
        };
        const finish = () => {
            show(parsed.value);
            el.setAttribute('data-animated', 'true');
            countingElements.delete(el);
        };

        countingElements.add(el);
        if (!duration) return finish();
        const t0 = performance.now();
        const tick = (now) => {
            const progress = (now - t0) / duration;
            if (progress >= 1) return finish();
            show(start + (parsed.value - start) * progress);
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    function initCounters() {
        const reduced = NDS.prefersReducedMotion;
        document.querySelectorAll(COUNTER).forEach(el => {
            // reinit() re-arms: release a subscription that has not fired yet.
            el.ndsCounter?.destroy();
            if (el.closest('code') || el.hasAttribute('data-animated') || countingElements.has(el)) return;
            // A backref, so NDS.init.destroy(view) releases a counter that never scrolled into view.
            const off = NDS.onIntersect(el, (entry) => {
                if (!entry.isIntersecting) return;
                el.ndsCounter.destroy();
                count(el, reduced);
            }, { threshold: 0.5 });
            el.ndsCounter = { destroy() { off(); delete el.ndsCounter; } };
        });
    }

    // Exposed at once: the loader's init system calls it.
    function init() {
        formatNumbers();
        initCounters();
    }

    NDS.Numbers = {
        format,
        formatAll: formatNumbers,
        initCounters,
        init,
        reinit: init
    };
})();
