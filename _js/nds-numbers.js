// Numbers and Counter Formatting
(() => {
    'use strict';

    function formatThousands() {
        const ThousandsNumbers = document.querySelectorAll('.nds-number-format');
        if (ThousandsNumbers.length > 0) {
            ThousandsNumbers.forEach(el => {
                const text = el.textContent.trim();
                // Extract prefix (including + or - sign), number, and suffix
                const match = text.match(/^([^\d]*)([-+]?\d[\d,]*\.?\d*)(.*)$/);
                if (match) {
                    const prefix = match[1] || '';
                    const numStr = match[2].replace(/,/g, '');
                    const suffix = match[3] || '';
                    const num = parseFloat(numStr);

                    if (!isNaN(num)) {
                        const sign = numStr.startsWith('+') ? '+' : (numStr.startsWith('-') ? '-' : '');
                        const formatted = Math.abs(num).toLocaleString();
                        el.textContent = `${prefix}${sign}${formatted}${suffix}`;
                    }
                }
            });
        }
    }

    function setupCounterAnimations() {
        const counters = document.querySelectorAll('.nds-counter-value');
        if (!counters.length) return;

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;

        function parseTarget(el) {
            // Attributes take precedence
            let targetStr = el.getAttribute('data-target');
            let suffixAttr = el.getAttribute('data-suffix') || '';
            let prefixAttr = el.getAttribute('data-prefix') || '';
            let decimalsAttr = el.getAttribute('data-decimals');
            let useSiblingSuffix = false;
            let suffixEl = null;

            // Auto-extract prefix/suffix from data-target if present
            if (targetStr && !suffixAttr && !prefixAttr) {
                const targetMatch = targetStr.match(/^([^\d.-]*)([-+]?\d*\.?\d+)(.*)$/);
                if (targetMatch) {
                    prefixAttr = targetMatch[1] || '';
                    targetStr = targetMatch[2];
                    suffixAttr = targetMatch[3] || '';
                }
            }

            if (!targetStr) {
                // Handle split suffix pattern: <span.nds-counter-value>98</span><span.suffix>.2%</span>
                const next = el.nextElementSibling;
                if (next && next.classList.contains('suffix')) {
                    suffixEl = next;
                    const m = next.textContent.trim().match(/^([.,](\d+))?(.*)$/);
                    const decimalDigits = m && m[2] ? m[2] : '';
                    const remainderSuffix = m ? (m[3] || '') : '';
                    if (decimalDigits) {
                        targetStr = `${el.textContent.trim().replace(/,/g, '')}.${decimalDigits}`;
                        suffixAttr = suffixAttr || remainderSuffix;
                        useSiblingSuffix = true;
                        next.textContent = remainderSuffix;
                    } else {
                        targetStr = el.textContent.trim().replace(/,/g, '');
                        suffixAttr = suffixAttr || next.textContent.trim();
                        useSiblingSuffix = true;
                    }
                } else {
                    // Fallback: parse number and suffix from own text
                    const full = el.textContent.trim();
                    const match = full.replace(/,/g, '').match(/([-+]?\d*\.?\d+)/);
                    targetStr = match ? match[1] : '0';
                    const idx = full.indexOf(match ? match[0] : '');
                    const after = idx >= 0 ? full.slice(idx + (match ? match[0].length : 0)) : '';
                    if (!suffixAttr && after) suffixAttr = after.trim();
                }
            }

            const target = parseFloat(targetStr || '0') || 0;
            let decimals = 0;
            if (decimalsAttr != null) {
                decimals = Math.max(0, parseInt(decimalsAttr, 10) || 0);
            } else if (String(targetStr).includes('.')) {
                decimals = String(targetStr).split('.')[1].length;
            }

            const sign = target < 0 ? '-' : '';
            return {
                target: Math.abs(target),
                decimals,
                prefix: prefixAttr || sign,
                suffix: suffixAttr || '',
                useSiblingSuffix,
                suffixEl
            };
        }

        // Pre-parse all counters on initialization (avoid work during scroll)
        const counterConfigs = new WeakMap();

        counters.forEach(counter => {
            const cfg = parseTarget(counter);
            const start = parseFloat(counter.getAttribute('data-start') || '0') || 0;
            const duration = parseInt(counter.getAttribute('data-duration') || '1000', 10);
            const threshold = parseFloat(counter.getAttribute('data-threshold')) || 0.5;

            // Pre-format target value to avoid toLocaleString() during animation
            const formatNumber = (value) => value.toLocaleString(undefined, {
                minimumFractionDigits: cfg.decimals,
                maximumFractionDigits: cfg.decimals
            });

            counterConfigs.set(counter, {
                cfg,
                start,
                duration,
                threshold,
                formatNumber,
                preFormattedTarget: formatNumber(cfg.target)
            });
        });

        // Helper to update counter text
        const updateText = (el, cfg, formattedValue) => {
            if (cfg.useSiblingSuffix && cfg.suffixEl) {
                el.textContent = `${cfg.prefix}${formattedValue}`;
            } else {
                el.textContent = `${cfg.prefix}${formattedValue}${cfg.suffix}`;
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

        // Group counters by threshold to minimize observers
        const observersByThreshold = new Map();

        counters.forEach(counter => {
            const config = counterConfigs.get(counter);
            if (!config) return;

            const { threshold } = config;

            if (!observersByThreshold.has(threshold)) {
                const observer = new IntersectionObserver(
                    (entries, obs) => {
                        // Defer callback to avoid blocking scroll
                        requestAnimationFrame(() => {
                            entries.forEach((entry) => {
                                if (!entry.isIntersecting || entry.target.hasAttribute('data-animated')) {
                                    if (entry.target.hasAttribute('data-animated')) {
                                        obs.unobserve(entry.target);
                                    }
                                    return;
                                }

                                const el = entry.target;
                                const config = counterConfigs.get(el);
                                if (!config) return;

                                const { cfg, start, duration, formatNumber, preFormattedTarget } = config;
                                const animDuration = prefersReducedMotion ? 0 : duration;

                                // Instant display for reduced motion
                                if (animDuration === 0) {
                                    updateText(el, cfg, preFormattedTarget);
                                    el.setAttribute('data-animated', 'true');
                                    obs.unobserve(el);
                                    return;
                                }

                                const startTime = performance.now();
                                const formattedCache = new Map();
                                let rafId = null;

                                function updateCounter(now) {
                                    // Early exit if element removed from DOM
                                    if (!document.body.contains(el)) {
                                        if (rafId) cancelAnimationFrame(rafId);
                                        return;
                                    }

                                    const elapsed = now - startTime;
                                    const progress = Math.min(elapsed / animDuration, 1);
                                    const currentValue = start + (cfg.target - start) * progress;

                                    if (progress < 1) {
                                        // Use smart cache key for better hit rate
                                        const cacheKey = getCacheKey(currentValue, cfg.target, cfg.decimals);

                                        if (!formattedCache.has(cacheKey)) {
                                            formattedCache.set(cacheKey, formatNumber(cacheKey));
                                        }

                                        updateText(el, cfg, formattedCache.get(cacheKey));
                                        rafId = requestAnimationFrame(updateCounter);
                                    } else {
                                        // Final frame: use pre-formatted exact value
                                        updateText(el, cfg, preFormattedTarget);
                                        el.setAttribute('data-animated', 'true');
                                        formattedCache.clear();
                                        rafId = null;
                                    }
                                }

                                rafId = requestAnimationFrame(updateCounter);
                                obs.unobserve(el);
                            });
                        });
                    },
                    { threshold }
                );

                observersByThreshold.set(threshold, observer);
            }

            observersByThreshold.get(threshold).observe(counter);
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSNumbers = {
            formatThousands,
            setupCounterAnimations
        };
    }

    // Note: Initialization now handled by nds-init.js unified system
})();
