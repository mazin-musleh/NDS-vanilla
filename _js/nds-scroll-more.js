/**
 * NDS Scroll More Component
 * General-purpose wrapper: when content overflows (vertical or horizontal),
 * applies an edge mask-fade and shows a sticky button that scrolls ~80% of
 * the visible length per click (loops to start once at end).
 * Axis is auto-detected from overflow; no axis attribute required.
 */

(function () {
    'use strict';

    const CONFIG = {
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

    const { add: addState, remove: removeState, has: hasState } = NDS.State;

    // Return 'vertical' | 'horizontal' | null.
    // If both axes overflow, prefer vertical (more common list case).
    function detectAxis(content) {
        const vertical = content.scrollHeight > content.clientHeight + CONFIG.scrollThreshold;
        const horizontal = content.scrollWidth > content.clientWidth + CONFIG.scrollThreshold;
        if (vertical) return 'vertical';
        if (horizontal) return 'horizontal';
        return null;
    }

    function checkOverflow(wrapper) {
        const content = wrapper._content || wrapper.querySelector(CONFIG.selectors.content);
        if (!content) return;

        const axis = detectAxis(content);

        if (!axis) {
            wrapper.removeAttribute('data-axis');
            removeState(wrapper, CONFIG.overflow.hasMore, CONFIG.overflow.atStart, CONFIG.overflow.atEnd);
            return;
        }

        wrapper.setAttribute('data-axis', axis);
        addState(wrapper, CONFIG.overflow.hasMore);
        checkScrollPosition(wrapper, content, axis);
    }

    function checkScrollPosition(wrapper, content, axis) {
        content = content || wrapper._content || wrapper.querySelector(CONFIG.selectors.content);
        if (!content) return;
        axis = axis || wrapper.getAttribute('data-axis');
        if (!axis) return;

        // Horizontal: scrollLeft can be negative in RTL; normalize.
        const pos = axis === 'vertical' ? content.scrollTop : Math.abs(content.scrollLeft);
        // Read max-scroll fresh each time — cached values go stale when the
        // content or viewport resizes between ResizeObserver ticks (e.g. sticky
        // nav collapse as hero leaves the viewport on sidemenu pages).
        const maxScroll = axis === 'vertical'
            ? content.scrollHeight - content.clientHeight
            : content.scrollWidth - content.clientWidth;

        const atStart = pos <= CONFIG.scrollThreshold;
        const atEnd = maxScroll - pos <= CONFIG.scrollThreshold;

        if (atStart) addState(wrapper, CONFIG.overflow.atStart); else removeState(wrapper, CONFIG.overflow.atStart);
        if (atEnd)   addState(wrapper, CONFIG.overflow.atEnd);   else removeState(wrapper, CONFIG.overflow.atEnd);
    }

    function scrollStep(wrapper) {
        const content = wrapper._content;
        if (!content) return;
        const axis = wrapper.getAttribute('data-axis');
        if (!axis) return;

        const atEnd = hasState(wrapper, CONFIG.overflow.atEnd);

        const isVertical = axis === 'vertical';
        const posKey = isVertical ? 'top' : 'left';
        const pos = isVertical ? content.scrollTop : content.scrollLeft;
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
            : size * CONFIG.scrollAmount;

        // Clamp target to the absolute scroll bounds so the last click lands
        // exactly at the end (browsers never settle there via momentum alone).
        const maxScroll = isVertical
            ? content.scrollHeight - content.clientHeight
            : content.scrollWidth - content.clientWidth;

        let target;
        if (atEnd) {
            target = 0;
        } else {
            target = pos + step * sign;
            target = sign === 1
                ? Math.min(target, maxScroll)
                : Math.max(target, -maxScroll);
        }

        content.scrollTo({ [posKey]: target, behavior: 'smooth' });
    }

    function initElement(wrapper) {
        if (wrapper._ndsScrollMoreInitialized) return;
        const content = wrapper.querySelector(CONFIG.selectors.content);
        if (!content) return;

        wrapper._content = content;
        const btn = wrapper.querySelector(CONFIG.selectors.btn);

        // Auto-inject a separator between the content and the show-more button
        // so authors opting in via .nds-divided don't have to. Always inject —
        // the CSS gates visibility on .nds-divided + has-more, so this stays
        // inert until the class is present (including when toggled at runtime).
        if (btn && !wrapper.querySelector(':scope > .nds-divider')) {
            const divider = document.createElement('div');
            divider.className = 'nds-divider';
            wrapper.insertBefore(divider, btn);
        }

        checkOverflow(wrapper);

        wrapper._ac = new AbortController();
        const { signal } = wrapper._ac;

        content.addEventListener('scroll', NDS.rafThrottle(() => checkScrollPosition(wrapper)), { passive: true, signal });

        if (btn) {
            btn.addEventListener('click', () => scrollStep(wrapper), { signal });
        }

        wrapper._offResizeObs = NDS.onElementResize(content, () => checkOverflow(wrapper));
        wrapper._ndsScrollMoreInitialized = true;
    }

    function initAll() {
        document.querySelectorAll(CONFIG.selectors.wrapper).forEach(wrapper => {
            if (wrapper.closest('code, .code-example')) return;
            initElement(wrapper);
        });
    }

    function destroy(wrapper) {
        if (wrapper._ac) {
            wrapper._ac.abort();
            delete wrapper._ac;
        }
        if (wrapper._offResizeObs) {
            wrapper._offResizeObs();
            delete wrapper._offResizeObs;
        }
        delete wrapper._content;
        delete wrapper._ndsScrollMoreInitialized;
    }

    NDS.ScrollMore = {
        init: initAll,
        reinit: initAll,
        create: initElement,
        initElement,
        checkOverflow,
        destroy
    };

})();
