/* NDS.ScrollMore — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-scroll-more needs .nds-scroll-more-content — no overflow state
 * Methods:
 *   NDS.ScrollMore.init() / .reinit()      scan + initialize .nds-scroll-more
 *   NDS.ScrollMore.create(wrapper)         initialize one wrapper
 *   NDS.ScrollMore.refresh(wrapper)        re-measure it now
 *   NDS.ScrollMore.destroy(wrapper)        detach and un-stamp
 * Events:
 *   (none — read the state the component writes, below)
 * Hooks:
 *   (none to author — markup only: .nds-scroll-more wrapping .nds-scroll-more-content,
 *    plus an optional .nds-show-more button)
 *   written by the component, on the WRAPPER: data-axis="vertical|horizontal" and
 *   data-state tokens has-more · at-start · at-end
 * Gotchas:
 *   - The axis is detected from the overflow; when both axes overflow, vertical wins.
 *   - A .nds-divider is injected before the button, so .nds-divided works without you
 *     authoring one.
 *   - One click scrolls about one viewport minus one item; a click at the end loops back
 *     to the start.
 *   - --mask-fade-distance on the content sets the edge fade the step allows for.
 *   - Content that scrolls with nothing focusable inside gets tabindex="0", so the keyboard
 *     can scroll it; an authored tabindex is left alone.
 */
/**
 * NDS Scroll More Component
 * General-purpose wrapper: when content overflows (vertical or horizontal),
 * applies an edge mask-fade and shows a sticky button that scrolls ~80% of
 * the visible length per click (loops to start once at end).
 * Axis is auto-detected from overflow; no axis attribute required.
 */

(function () {
    'use strict';

    const config = {
        selectors: {
            wrapper: '.nds-scroll-more',
            content: '.nds-scroll-more-content',
            btn: '.nds-show-more'
        },
        overflow: {
            hasMore: 'has-more',
            atStart: 'at-start',
            atEnd: 'at-end'
        },
        scrollThreshold: 2,
        scrollAmount: 0.8
    };

    const { add: addState, remove: removeState, has: hasState } = NDS.state;

    // Return 'vertical' | 'horizontal' | null.
    // If both axes overflow, prefer vertical (more common list case).
    function detectAxis(content) {
        const vertical = content.scrollHeight > content.clientHeight + config.scrollThreshold;
        const horizontal = content.scrollWidth > content.clientWidth + config.scrollThreshold;
        if (vertical) return 'vertical';
        if (horizontal) return 'horizontal';
        return null;
    }

    // Horizontal: scrollLeft can be negative in RTL; normalize.
    const getScrollPosition = (content, axis) => axis === 'vertical' ? content.scrollTop : Math.abs(content.scrollLeft);
    // Read max-scroll fresh each time — cached values go stale when the
    // content or viewport resizes between ResizeObserver ticks (e.g. sticky
    // nav collapse as hero leaves the viewport on sidemenu pages).
    const getMaxScroll = (content, axis) => axis === 'vertical'
        ? content.scrollHeight - content.clientHeight
        : content.scrollWidth - content.clientWidth;

    function syncEdges(wrapper, position, maxScroll) {
        const atStart = position <= config.scrollThreshold;
        const atEnd = maxScroll - position <= config.scrollThreshold;
        if (atStart) addState(wrapper, config.overflow.atStart); else removeState(wrapper, config.overflow.atStart);
        if (atEnd)   addState(wrapper, config.overflow.atEnd);   else removeState(wrapper, config.overflow.atEnd);
    }

    // A scroller with nothing focusable inside takes a tab stop so the keyboard can
    // scroll it (Chrome does this itself, Safari does not). Only our own tabindex moves.
    function scrollStop(content, on) {
        if (content.hasAttribute('tabindex') && !content._ndsScrollStop) return;
        on = on && !content.querySelector(NDS.focusableSel);
        content._ndsScrollStop = on;
        if (on) content.setAttribute('tabindex', '0'); else content.removeAttribute('tabindex');
    }

    // Reads only; returns the writes, so the pooled ResizeObserver runs every
    // wrapper's reads before any write (a write between reads forces a layout
    // per wrapper — 68ms@6.6x on a page with 34 of them).
    function measure(wrapper) {
        const content = wrapper._content || wrapper.querySelector(config.selectors.content);
        if (!content) return;
        const axis = detectAxis(content);
        if (!axis) return wrapper.hasAttribute('data-axis') ? Object.assign(() => {
            wrapper.removeAttribute('data-axis');
            scrollStop(content, false);
            removeState(wrapper, config.overflow.hasMore, config.overflow.atStart, config.overflow.atEnd);
        }, { clears: true }) : undefined;
        const position = getScrollPosition(content, axis), maxScroll = getMaxScroll(content, axis);
        return () => {
            wrapper.setAttribute('data-axis', axis);
            scrollStop(content, true);
            addState(wrapper, config.overflow.hasMore);
            syncEdges(wrapper, position, maxScroll);
        };
    }

    function checkOverflow(wrapper) {
        const write = measure(wrapper);
        if (write) write();
    }

    function checkScrollPosition(wrapper) {
        const content = wrapper._content || wrapper.querySelector(config.selectors.content);
        const axis = wrapper.getAttribute('data-axis');
        if (!content || !axis) return;
        syncEdges(wrapper, getScrollPosition(content, axis), getMaxScroll(content, axis));
    }

    function scrollStep(wrapper) {
        const content = wrapper._content;
        if (!content) return;
        const axis = wrapper.getAttribute('data-axis');
        if (!axis) return;

        const atEnd = hasState(wrapper, config.overflow.atEnd);

        const isVertical = axis === 'vertical';
        const positionKey = isVertical ? 'top' : 'left';
        const position = isVertical ? content.scrollTop : content.scrollLeft;
        const size = isVertical ? content.clientHeight : content.clientWidth;
        const sign = !isVertical && NDS.isRTL ? -1 : 1;

        // Step = viewport minus one item AND the mask fade distance, so the anchor
        // item lands in the fully-opaque zone rather than under the fade.
        // Falls back to size * scrollAmount if no child or child is larger than viewport.
        const child = content.firstElementChild;
        const childSize = child
            ? (isVertical ? child.getBoundingClientRect().height : child.getBoundingClientRect().width)
            : 0;
        const fade = parseFloat(getComputedStyle(content).getPropertyValue('--mask-fade-distance')) || 0;
        const step = childSize > 0 && childSize < size
            ? Math.max(size - childSize - fade, childSize)
            : size * config.scrollAmount;

        // Clamp target to the absolute scroll bounds so the last click lands
        // exactly at the end (browsers never settle there via momentum alone).
        const maxScroll = isVertical
            ? content.scrollHeight - content.clientHeight
            : content.scrollWidth - content.clientWidth;

        let target;
        if (atEnd) {
            target = 0;
        } else {
            target = position + step * sign;
            target = sign === 1
                ? Math.min(target, maxScroll)
                : Math.max(target, -maxScroll);
        }

        content.scrollTo({ [positionKey]: target, behavior: NDS.prefersReducedMotion ? 'auto' : 'smooth' });
    }

    function setupElement(wrapper) {
        if (wrapper.hasAttribute('data-nds-scroll-more-initialized')) return;
        const content = wrapper.querySelector(config.selectors.content);
        if (!content) return;

        wrapper._content = content;
        // The content can hold a nested scroll-more, whose button comes first in document order.
        const btn = [...wrapper.querySelectorAll(config.selectors.btn)].find(candidate => candidate.closest(config.selectors.wrapper) === wrapper);

        // Auto-inject a separator between the content and the show-more button
        // so authors opting in via .nds-divided don't have to. Always inject —
        // the CSS gates visibility on .nds-divided + has-more, so this stays
        // inert until the class is present (including when toggled at runtime).
        if (btn && !wrapper.querySelector(':scope > .nds-divider')) {
            const divider = document.createElement('div');
            divider.className = 'nds-divider';
            wrapper.insertBefore(divider, btn);
            wrapper._builtDivider = divider;
        }

        wrapper._abortController = new AbortController();
        const { signal } = wrapper._abortController;

        content.addEventListener('scroll', NDS.rafThrottle(() => checkScrollPosition(wrapper)), { passive: true, signal });

        if (btn) {
            btn.addEventListener('click', () => scrollStep(wrapper), { signal });
        }

        // Cold init: no synchronous checkOverflow() here — this observer's
        // initial callback runs the first measure, so init stays free of
        // forced layout and hidden (display:none) instances measure on reveal.
        // Watch the wrapper: the button and padding measure() stamps shrink the content, a self-resize (RO loop error).
        // Clearing them shrinks a wrapper its content sizes, so that write lands next frame, re-checked.
        wrapper._offResizeObs = NDS.onElementResize(wrapper, () => {
            const write = measure(wrapper);
            if (!write?.clears) return write;
            requestAnimationFrame(() => { if (wrapper._offResizeObs) checkOverflow(wrapper); });
        });
        // NDS.init.destroy(view) finds instances through an nds* backref on the element.
        wrapper.ndsScrollMore = { destroy: () => destroy(wrapper) };
        wrapper.setAttribute('data-nds-scroll-more-initialized', 'true');
    }

    function setupAll() {
        document.querySelectorAll(config.selectors.wrapper).forEach(wrapper => {
            if (wrapper.closest('code')) return;
            setupElement(wrapper);
        });
    }

    function destroy(wrapper) {
        if (wrapper._abortController) {
            wrapper._abortController.abort();
            delete wrapper._abortController;
        }
        if (wrapper._offResizeObs) {
            wrapper._offResizeObs();
            delete wrapper._offResizeObs;
        }
        if (wrapper._content) scrollStop(wrapper._content, false);
        delete wrapper._content;
        wrapper._builtDivider?.remove();
        delete wrapper._builtDivider;
        // What measure() wrote: a re-create measures again.
        wrapper.removeAttribute('data-axis');
        removeState(wrapper, config.overflow.hasMore, config.overflow.atStart, config.overflow.atEnd);
        delete wrapper.ndsScrollMore;
        wrapper.removeAttribute('data-nds-scroll-more-initialized');
    }

    NDS.ScrollMore = {
        init: setupAll,
        reinit: setupAll,
        create: setupElement,
        refresh: checkOverflow,
        destroy
    };

})();
