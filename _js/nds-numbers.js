// Numbers and Counter Formatting
(() => {
    'use strict';

    function formatNumbers() {
        document.querySelectorAll('.nds-number-format').forEach(el => {
            if (el.closest('code, .code-example')) return;
            // Find the text node containing the number (preserves child elements like icons)
            const textNodes = [];
            for (const node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    textNodes.push(node);
                }
            }

            const targetNode = textNodes.find(n => /\d/.test(n.textContent));
            if (!targetNode) return;

            const text = targetNode.textContent.trim();
            const match = text.match(/^([^\d]*)([-+]?\d[\d,]*\.?\d*)(.*)$/);
            if (match) {
                const prefix = match[1] || '';
                const numStr = match[2].replace(/,/g, '');
                const suffix = match[3] || '';
                const num = parseFloat(numStr);

                if (!isNaN(num)) {
                    targetNode.textContent = `${prefix}${num.toLocaleString()}${suffix}`;
                }
            }
        });
    }

    function setupCounterAnimations() {
        const counters = document.querySelectorAll('.nds-counter-value');
        if (!counters.length) return;

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;

        function parseTarget(el) {
            let targetStr = el.getAttribute('data-target');
            let decimalsAttr = el.getAttribute('data-decimals');
            let prefix = '';
            let suffix = '';

            if (targetStr) {
                // Extract prefix/suffix from data-target (e.g. "$75,000", "98.6%")
                const m = targetStr.match(/^([^\d.-]*)([-+]?\d*\.?\d+)(.*)$/);
                if (m) {
                    prefix = m[1] || '';
                    targetStr = m[2];
                    suffix = m[3] || '';
                }
            } else {
                // Fallback: parse from element text
                const full = el.textContent.trim();
                const m = full.replace(/,/g, '').match(/([-+]?\d*\.?\d+)/);
                targetStr = m ? m[1] : '0';
            }

            const target = parseFloat(targetStr || '0') || 0;
            let decimals = 0;
            if (decimalsAttr != null) {
                decimals = Math.max(0, parseInt(decimalsAttr, 10) || 0);
            } else if (String(targetStr).includes('.')) {
                decimals = String(targetStr).split('.')[1].length;
            }

            if (target < 0) prefix = prefix || '-';
            return {
                target: Math.abs(target),
                decimals,
                prefix,
                suffix
            };
        }

        // Pre-parse all counters on initialization (avoid work during scroll)
        const counterConfigs = new WeakMap();

        counters.forEach(counter => {
            if (counter.closest('code, .code-example')) return;
            const cfg = parseTarget(counter);
            const start = parseFloat(counter.getAttribute('data-start') || '0') || 0;
            const duration = parseInt(counter.getAttribute('data-duration') || '1000', 10);
            // Pre-format target value to avoid toLocaleString() during animation
            const formatNumber = (value) => value.toLocaleString(undefined, {
                minimumFractionDigits: cfg.decimals,
                maximumFractionDigits: cfg.decimals
            });

            counterConfigs.set(counter, {
                cfg,
                start,
                duration,
                formatNumber,
                preFormattedTarget: formatNumber(cfg.target)
            });
        });

        // Helper to update counter text (preserves child elements like icons)
        const updateText = (el, cfg, formattedValue) => {
            const text = `${cfg.prefix}${formattedValue}${cfg.suffix}`;

            // Find existing text node with a number, or the last text node
            const textNodes = [];
            for (const node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) textNodes.push(node);
            }
            const targetNode = textNodes.find(n => /\d/.test(n.textContent)) || textNodes[textNodes.length - 1];
            if (targetNode) {
                targetNode.textContent = text;
            } else {
                el.appendChild(document.createTextNode(text));
            }
        };

        // Smart cache key based on target magnitude for better cache hit rate
        const getCacheKey = (value, target, decimals) => {
            if (decimals > 0) {
                return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
            }

            const absTarget = Math.abs(target);
            if (absTarget >= 1000000000) return Math.round(value / 10000) * 10000;
            if (absTarget >= 1000000) return Math.round(value / 1000) * 1000;
            if (absTarget >= 100000) return Math.round(value / 100) * 100;
            if (absTarget >= 10000) return Math.round(value / 10) * 10;
            return Math.round(value);
        };

        let remaining = 0;
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting || entry.target.hasAttribute('data-animated')) return;

                const el = entry.target;
                obs.unobserve(el);
                if (--remaining <= 0) obs.disconnect();

                const config = counterConfigs.get(el);
                if (!config) return;

                const { cfg, start, duration, formatNumber, preFormattedTarget } = config;
                const animDuration = prefersReducedMotion ? 0 : duration;

                if (animDuration === 0) {
                    updateText(el, cfg, preFormattedTarget);
                    el.setAttribute('data-animated', 'true');
                    return;
                }

                const startTime = performance.now();
                const formattedCache = new Map();
                let lastCacheKey = null;

                function updateCounter(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / animDuration, 1);

                    if (progress < 1) {
                        const currentValue = start + (cfg.target - start) * progress;
                        const cacheKey = getCacheKey(currentValue, cfg.target, cfg.decimals);

                        if (cacheKey !== lastCacheKey) {
                            lastCacheKey = cacheKey;
                            if (!formattedCache.has(cacheKey)) {
                                formattedCache.set(cacheKey, formatNumber(cacheKey));
                            }
                            updateText(el, cfg, formattedCache.get(cacheKey));
                        }

                        requestAnimationFrame(updateCounter);
                    } else {
                        updateText(el, cfg, preFormattedTarget);
                        el.setAttribute('data-animated', 'true');
                        formattedCache.clear();
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            if (counterConfigs.has(counter)) {
                remaining++;
                observer.observe(counter);
            }
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSNumbers = {
            formatNumbers,
            setupCounterAnimations
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system
})();
