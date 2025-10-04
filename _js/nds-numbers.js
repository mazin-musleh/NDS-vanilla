// Numbers and Counter Formatting
(() => {
    'use strict';

    function formatThousands() {
        const ThousandsNumbers = document.querySelectorAll('.nds-number-format');
        if (ThousandsNumbers.length > 0) {
            ThousandsNumbers.forEach(el => {
                const num = parseInt(el.textContent.replace(/,/g, ''), 10);
                if (!isNaN(num)) {
                    el.textContent = num.toLocaleString();
                }
            });
        }
    }

    function setupCounterAnimations() {
        const counters = document.querySelectorAll('.nds-counter-value');

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
                        // normalize sibling suffix to the remainder only
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

            // Detect sign and allow prefix attr override
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

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const el = entry.target;
                    const cfg = parseTarget(el);
                    const start = parseFloat(el.getAttribute('data-start') || '0') || 0;
                    const duration = parseInt(el.getAttribute('data-duration') || '1000', 10);
                    const startTime = performance.now();

                    function formatNumber(value) {
                        return value.toLocaleString(undefined, {
                            minimumFractionDigits: cfg.decimals,
                            maximumFractionDigits: cfg.decimals
                        });
                    }

                    function updateCounter(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const currentValue = start + (cfg.target - start) * progress;
                        const rounded = cfg.decimals > 0
                            ? Math.round(currentValue * Math.pow(10, cfg.decimals)) / Math.pow(10, cfg.decimals)
                            : Math.round(currentValue);
                        const formatted = formatNumber(rounded);

                        if (cfg.useSiblingSuffix && cfg.suffixEl) {
                            el.textContent = `${cfg.prefix}${formatted}`;
                            // suffix element already holds remainder suffix
                        } else {
                            el.textContent = `${cfg.prefix}${formatted}${cfg.suffix}`;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach((counter) => observer.observe(counter));
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
