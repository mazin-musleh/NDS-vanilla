/* NDS.Chart — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Chart.init() / .reinit()      scan .nds-chart and build the ones that declare a
 *                                     type or a series
 *   NDS.Chart.create(elOrSel, opts)   build one chart — replaces any chart already on the
 *                                     element. Returns the instance. No opts: the data-chart-*
 *                                     its markup declares (null when it declares no series)
 *   NDS.Chart.destroy(elOrSel)        undo create()
 *   instance.setOptions(newOpts)      MERGE new options in and re-render
 *   instance.render()                 redraw in place from the current options
 *   instance.destroy()                empty the element and release its observers
 * Events:
 *   (none)
 * Hooks (on the .nds-chart element):
 *   data-chart-type     bar | line | pie | donut
 *   data-chart-series   JSON, the same value as opts.series
 *   data-chart-labels   JSON, the same value as opts.labels
 *   data-chart-config   JSON, a whole options object (the three above win over it)
 * Gotchas:
 *   - Declarative and programmatic are one path: the data-* attributes are parsed into the
 *     options object create() takes.
 *   - Each type carries its own defaults (bar gaps, line smoothing and dots, donut size)
 *     and your options are merged over them.
 *   - Colours come from --chart-color-1…6 on the element and repeat past six. Pass
 *     opts.colors to override.
 *   - The instance lives on the element as el.ndsChart.
 */
/**
 * NDS Chart Component — Vanilla SVG Charts
 * Supports: bar, line, pie, donut
 * Zero external dependencies
 * Colors: CSS custom properties (--chart-color-1…6), auto-wraps beyond 6
 */
(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('chart', {
        chart: 'Chart',
        bar: 'Bar chart',
        line: 'Line chart',
    });

    const SVG_NS = 'http://www.w3.org/2000/svg';
    let uid = 0;

    // ── Utilities ──────────────────────────────────────────────────

    function mergeDeep(target, source) {
        const out = Object.assign({}, target);
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
                && target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
                out[key] = mergeDeep(target[key], source[key]);
            } else {
                out[key] = source[key];
            }
        }
        return out;
    }

    function buildSvgElement(tag, attributes) {
        const el = document.createElementNS(SVG_NS, tag);
        if (attributes) for (const key in attributes) el.setAttribute(key, attributes[key]);
        return el;
    }

    function buildHtmlElement(tag, cls, text) {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        if (text !== undefined) el.textContent = text;
        return el;
    }

    function toCartesian(cx, cy, radius, angleDeg) {
        const rad = (angleDeg - 90) * Math.PI / 180;
        return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
    }

    function getNiceScale(min, max, ticks) {
        if (max === min) max = min + 1;
        const range = max - min;
        const roughStep = range / (ticks || 5);
        const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
        const normalized = roughStep / mag;
        let step;
        if (normalized <= 1) step = mag;
        else if (normalized <= 2) step = 2 * mag;
        else if (normalized <= 5) step = 5 * mag;
        else step = 10 * mag;
        const niceMin = Math.floor(min / step) * step;
        const niceMax = Math.ceil(max / step) * step;
        const steps = [];
        for (let value = niceMin; value <= niceMax + step * 0.01; value += step) {
            steps.push(Math.round(value * 1e10) / 1e10);
        }
        return { min: niceMin, max: niceMax, step, steps };
    }

    // Compact notation for the K/M tiers in the page's language (e.g. "1.2K", Arabic "1.2 ألف");
    // values below 1000 keep the old full-precision String(n) path.
    function formatNumber(value) {
        return Math.abs(value) >= 1e3 ? NDS.formatNumber(value, { notation: 'compact', maximumFractionDigits: 1 }) : String(value);
    }

    function getChartColor(index) {
        return 'var(--_chart-color-' + (index % 6 + 1) + ')';
    }

    function tryParse(text) {
        try { return JSON.parse(text); } catch { return null; }
    }

    // ── Tooltip data store ──────────────────────────────────────────
    const tipData = new WeakMap();

    // ── Default options ─────────────────────────────────────────────

    const pieBase = {
        height: 300,
        legend: { show: true, position: 'bottom' },
        dataLabels: { show: true },
        tooltip: { show: true },
        stroke: { show: false, width: 2, color: 'var(--_chart-dot-fill)' },
        startAngle: 0,
    };

    const axisBase = {
        height: 350,
        legend: { show: true, position: 'top' },
        tooltip: { show: true },
        grid: { show: true },
        yaxis: { show: true, title: '' },
        // labelRotate: 'auto' | 0 | 45 | 90 | <number>  — auto picks 0 or 45 based on fit
        // labelDecimate: false | true | 'auto' | <number>  — true/'auto' computes step; number forces every-Nth
        xaxis: { show: true, title: '', labelRotate: 'auto', labelDecimate: false },
    };

    const typeDefaults = {
        pie: pieBase,
        donut: { ...pieBase, donut: { size: 0.50 } },
        bar: { ...axisBase, bar: { borderRadius: 6, gap: 0.3, stacked: false }, dataLabels: { show: false } },
        line: { ...axisBase, line: { width: 3, smooth: true, dots: true, dotRadius: 4, area: false, crosshair: true } },
    };

    // ── Chart class ────────────────────────────────────────────────

    class NdsChart {
        constructor(el, opts) {
            this._element = el;
            this._options = this._resolveOptions(opts);
            this._tooltip = null;
            this._lastW = 0;
            this._activeHover = null;
            this.abortController = new AbortController();
            this._setupDelegation();
            // Holds the drawing's height until the first render, so a chart mounted into a live view does not collapse for two frames.
            if (!el.firstElementChild) { this._heldMin = el.style.minHeight; el.style.minHeight = this._options.height + 'px'; }
            // The first render is triggered by the ResizeObserver's initial
            // delivery (_setupResize): it reads clientWidth post-layout and
            // schedules render() off a rAF, so construction never forces a
            // synchronous reflow during the component-init burst.
            this._setupResize();
        }

        _resolveOptions(opts) {
            const type = opts.type || 'bar';
            const defaults = typeDefaults[type] || typeDefaults.bar;
            const merged = mergeDeep(defaults, opts);
            merged.type = type;
            return merged;
        }

        _formatValue(value) {
            const formatter = this._options.dataLabels?.format;
            if (typeof formatter === 'function') return formatter(value);
            if (typeof formatter === 'string') return formatNumber(value) + formatter;
            return formatNumber(value);
        }

        _getColor(index) {
            if (this._options.colors) return this._options.colors[index % this._options.colors.length];
            return getChartColor(index);
        }

        // ── Public API ─────────────────────────────────────────────

        setOptions(newOpts) {
            this._options = this._resolveOptions(mergeDeep(this._options, newOpts));
            this.render();
        }

        destroy() {
            this._destroyed = true;
            this.abortController.abort();
            if (this.renderAbortController) { this.renderAbortController.abort(); this.renderAbortController = null; }
            if (this._offResize) { this._offResize(); this._offResize = null; }
            this._element.innerHTML = '';
            if (this._heldMin != null) this._element.style.minHeight = this._heldMin;
            // Drop the init sentinel with the instance: leaving it on makes teardown
            // one-way — the init sweep skips a stamped element, so a view that unmounts
            // and mounts again gets an emptied chart no instance will ever claim.
            this._element.removeAttribute('data-nds-chart-initialized');
            delete this._element.ndsChart;
        }

        // ── Event delegation ──────────────────────────────────────

        _setupDelegation() {
            const signal = this.abortController.signal;

            this._element.addEventListener('mouseover', (e) => {
                const data = tipData.get(e.target);
                if (!data) return;
                this._clearHover();
                this._activeHover = { target: e.target, ...data };
                this._showTooltip(e, data.html);
                const el = data.activeEl || e.target;
                if (data.activeClass) el.classList.add(data.activeClass);
            }, { signal });

            this._element.addEventListener('mousemove', (e) => {
                if (this._activeHover) this._moveTooltip(e);
            }, { signal });

            this._element.addEventListener('mouseout', (e) => {
                if (!this._activeHover) return;
                if (e.relatedTarget && tipData.has(e.relatedTarget)) return;
                this._clearHover();
            }, { signal });
        }

        _clearHover() {
            if (!this._activeHover) return;
            const { target, activeEl, activeClass } = this._activeHover;
            if (activeClass) (activeEl || target).classList.remove(activeClass);
            this._hideTooltip();
            this._activeHover = null;
        }

        _addTipListeners(el, html, activeEl, activeClass) {
            tipData.set(el, { html, activeEl, activeClass });
        }

        // ── ResizeObserver ────────────────────────────────────────

        // The first drawing waits a frame, off the init burst. A later resize draws in the
        // observer's write phase, before paint: a frame late, the old drawing showed at the
        // new width (a metric chart flashed when its container query flipped).
        _setupResize() {
            const renderLater = NDS.throttleToFrame(() => this.render());
            this._offResize = NDS.onElementResize(this._element, () => {
                const width = this._element.clientWidth;
                if (!width || width === this._lastW) return;
                const first = !this._lastW;
                this._lastW = width;
                if (first) renderLater();
                else return () => this.render();
            });
        }

        // ── Layout helpers ────────────────────────────────────────

        _normalizeSeries(series) {
            return series.map((entry, i) => ({
                name: entry.name || `Series ${i + 1}`,
                data: Array.isArray(entry.data) ? entry.data : [entry],
            }));
        }

        _computeLayout(wrap, height, extraPadBottom = 0, startReach = 0) {
            const isRtl = this._isRtl;
            const totalWidth = wrap.clientWidth || this._element.clientWidth || 600;
            const totalHeight = height || 350;
            const hasY = this._options.yaxis?.show !== false;
            const pad = this._options.padding || {};
            const axisPad = hasY ? 55 : 20;
            const padTop = pad.top ?? 20;
            const padBottom = (pad.bottom ?? 40) + extraPadBottom;
            const baseLeft = pad.left ?? (isRtl ? 20 : axisPad);
            const baseRight = pad.right ?? (isRtl ? axisPad : 20);
            // A tilted first label leans out past the y-axis side: widen that side to hold it.
            const extraStart = Math.max(0, startReach - (isRtl ? baseRight : baseLeft));
            const padLeft = baseLeft + (isRtl ? 0 : extraStart);
            const padRight = baseRight + (isRtl ? extraStart : 0);
            return {
                w: totalWidth, h: totalHeight, padTop, padBottom, padLeft, padRight, isRTL: isRtl, extraStart,
                plotW: totalWidth - padLeft - padRight,
                plotH: totalHeight - padTop - padBottom,
            };
        }

        // Decide whether x-axis labels should be decimated and/or rotated.
        // Returns { step, rotate, extraPad, startReach }. Char width is estimated, not measured —
        // an explicit labelRotate/labelDecimate overrides the auto decision.
        _getXAxisStrategy(catLabels, plotW) {
            const xaxis = this._options.xaxis || {};
            // Hidden labels take no room: a tilt reserved for them shrank a sparkline's plot.
            if (!xaxis.show) return { step: 1, rotate: 0, extraPad: 0, startReach: 0 };
            const isMobile = window.matchMedia(NDS.breakpoints['tablet-max']).matches;
            const fontSize = isMobile ? 11 : 13;
            const charW = fontSize * 0.6;
            const padding = 8;

            const labelStrs = catLabels.map(label => String(label));
            const maxLength = Math.max(1, ...labelStrs.map(labelText => labelText.length));
            const maxLabelW = maxLength * charW;

            let step = 1;
            const dec = xaxis.labelDecimate;
            if (typeof dec === 'number' && dec > 1) {
                step = Math.floor(dec);
            } else if (dec === true || dec === 'auto') {
                const slotNeeded = maxLabelW + padding;
                const fits = Math.max(1, Math.floor(plotW / slotNeeded));
                step = Math.max(1, Math.ceil(catLabels.length / fits));
            }

            const effectiveSlot = (plotW / Math.max(1, catLabels.length)) * step;
            let rotate = xaxis.labelRotate;
            if (rotate === undefined || rotate === 'auto') {
                rotate = maxLabelW > effectiveSlot - padding ? 45 : 0;
            } else if (rotate === true) {
                rotate = 45;
            } else if (rotate === false) {
                rotate = 0;
            }
            rotate = Math.max(0, Math.min(90, Number(rotate) || 0));

            const extraPad = rotate
                ? Math.max(0, Math.ceil(maxLabelW * Math.sin(rotate * Math.PI / 180)) - 14)
                : 0;

            // How far the tilted first label reaches sideways past the plot's edge; one font size spare,
            // since the width is a guess. A bar's label sits half a slot in from the edge.
            const rad = rotate * Math.PI / 180;
            const inset = this._options.type === 'bar' ? plotW / Math.max(1, catLabels.length) / 2 : 0;
            const startReach = rotate ? Math.ceil(String(catLabels[0] ?? '').length * charW * Math.cos(rad) + fontSize - inset) : 0;

            return { step, rotate, extraPad, startReach };
        }

        _getValueY(value, scale, layout) {
            return layout.padTop + layout.plotH - ((value - scale.min) / (scale.max - scale.min)) * layout.plotH;
        }

        _buildSvg(layout, ariaLabel) {
            return buildSvgElement('svg', {
                width: layout.w, height: layout.h,
                class: 'nds-chart-svg',
                role: 'img',
                // The chart element's own aria-label names what it shows; the type is the fallback.
                'aria-label': this._element.getAttribute('aria-label') || ariaLabel,
            });
        }

        // ── Shared axis chart setup (bar + line) ──────────────────

        _renderAxisChart(wrap, ariaLabel, computeScale) {
            const { series, labels, height } = this._options;
            if (!series?.length) return null;

            const seriesList = this._normalizeSeries(series);
            const catCount = Math.max(...seriesList.map(entry => entry.data.length));
            const catLabels = labels || Array.from({ length: catCount }, (_, i) => `${i + 1}`);

            // Two-step layout: provisional plotW → x-axis strategy → final layout with extraPad
            const provisional = this._computeLayout(wrap, height);
            const xStrategy = this._getXAxisStrategy(catLabels, provisional.plotW);
            const layout = this._computeLayout(wrap, height, xStrategy.extraPad, xStrategy.startReach);

            const scale = computeScale(seriesList, catCount);
            const svg = this._buildSvg(layout, ariaLabel);

            if (this._options.grid?.show) this._renderGrid(svg, scale, layout);
            if (this._options.yaxis?.show) this._renderYAxis(svg, scale, layout);

            return { seriesArr: seriesList, catCount, catLabels, L: layout, scale, svg, xStrategy };
        }

        _renderGrid(svg, scale, layout) {
            scale.steps.forEach(value => {
                const y = this._getValueY(value, scale, layout);
                svg.appendChild(buildSvgElement('line', {
                    x1: layout.padLeft, y1: y,
                    x2: layout.padLeft + layout.plotW, y2: y,
                    class: 'nds-chart-gridline',
                }));
            });
        }

        _renderYAxis(svg, scale, layout) {
            scale.steps.forEach(value => {
                const textElement = buildSvgElement('text', {
                    x: layout.isRTL ? layout.w - 8 - layout.extraStart : layout.padLeft - 8,
                    y: this._getValueY(value, scale, layout) + 4,
                    class: 'nds-chart-axis-label',
                    'text-anchor': layout.isRTL ? 'start' : 'end',
                });
                textElement.textContent = this._formatValue(value);
                svg.appendChild(textElement);
            });
        }

        // edges: the first and last points sit on the plot's edges (a line chart), so their flat labels
        // run inward from the point instead of centring over it and spilling past the SVG.
        _renderXLabels(svg, catLabels, xPositions, layout, xStrategy, edges = false) {
            const { step = 1, rotate = 0 } = xStrategy || {};
            const baseY = layout.padTop + layout.plotH;
            const y = rotate ? baseY + 14 : baseY + 30;
            const last = catLabels.length - 1;

            catLabels.forEach((label, i) => {
                if (step > 1 && i % step !== 0) return;

                const x = xPositions[i];
                const attributes = { x, y, class: 'nds-chart-axis-label' };

                if (rotate === 0) {
                    attributes['text-anchor'] = (edges && last > 0 && (i === 0 ? 'start' : i === last && 'end')) || 'middle';
                } else {
                    attributes['text-anchor'] = 'end';
                    attributes.transform = `rotate(${layout.isRTL ? rotate : -rotate} ${x} ${y})`;
                }

                const textElement = buildSvgElement('text', attributes);
                textElement.textContent = label;
                svg.appendChild(textElement);
            });
        }

        // ── Render orchestrator ──────────────────────────────────

        render() {
            // A deferred or throttled frame can land after destroy(); it must not draw into the emptied element.
            if (this._destroyed) return;
            if (!this._element.clientWidth) {
                this._deferCount = (this._deferCount || 0) + 1;
                if (this._deferCount < 10) {
                    requestAnimationFrame(() => this.render());
                    return;
                }
            }
            this._deferCount = 0;
            this._activeHover = null;
            // Per-render AbortController: overlay pointer listeners attach to this
            // signal so the prior overlay's listener entries release on each rebuild
            // instead of accumulating on the instance-lifetime this.abortController until destroy.
            if (this.renderAbortController) this.renderAbortController.abort();
            this.renderAbortController = new AbortController();
            this._element.innerHTML = '';
            if (this._heldMin != null) { this._element.style.minHeight = this._heldMin; this._heldMin = null; }
            this._element.classList.add('nds-chart');
            this._element.setAttribute('data-chart-type', this._options.type);

            const { type } = this._options;
            // Direction resolution:
            //   1. opts.direction              — explicit config override ('ltr' | 'rtl')
            //   2. computed CSS direction      — covers both `dir="…"` attribute on any
            //      ancestor AND CSS `direction: …` set on a wrapper (e.g. metric chart)
            // Computed direction always returns 'ltr' or 'rtl' (HTML default is ltr),
            // so no explicit page fallback is needed.
            if (this._options.direction) {
                this._isRtl = this._options.direction === 'rtl';
            } else {
                this._isRtl = getComputedStyle(this._element).direction === 'rtl';
            }

            const hasAxes = type === 'bar' || type === 'line';
            const yTitle = this._options.yaxis?.title;
            const xTitle = this._options.xaxis?.title;

            const body = buildHtmlElement('div', 'nds-chart-body');
            if (hasAxes && yTitle) {
                body.appendChild(buildHtmlElement('span', 'nds-chart-axis-title nds-chart-axis-title--y', yTitle));
            }

            const canvasWrap = buildHtmlElement('div', 'nds-chart-canvas-wrap');
            const canvas = buildHtmlElement('div', 'nds-chart-canvas');

            if (this._options.legend?.show && this._options.legend.position === 'top') {
                canvasWrap.appendChild(this._buildLegend());
            }

            canvasWrap.appendChild(canvas);

            if (hasAxes && xTitle) {
                canvasWrap.appendChild(buildHtmlElement('div', 'nds-chart-axis-title nds-chart-axis-title--x', xTitle));
            }

            if (this._options.legend?.show && this._options.legend.position === 'bottom') {
                canvasWrap.appendChild(this._buildLegend());
            }

            body.appendChild(canvasWrap);
            this._element.appendChild(body);

            if (type === 'pie' || type === 'donut') this._renderPie(canvas);
            else if (type === 'bar') this._renderBar(canvas);
            else if (type === 'line') this._renderLine(canvas);

            this._tooltip = buildHtmlElement('div', 'nds-chart-tooltip');
            this._element.appendChild(this._tooltip);
            this._lastW = this._element.clientWidth;
        }

        // ── Pie / Donut ──────────────────────────────────────────

        _renderPie(wrap) {
            const { series, labels, height, stroke, startAngle } = this._options;
            const data = Array.isArray(series) ? series : [];
            const total = data.reduce((sum, value) => sum + (typeof value === 'number' ? value : 0), 0);
            if (!total) return;

            const size = height || 300;
            const cx = size / 2, cy = size / 2;
            const outerR = size / 2 - 10;
            const isDonut = this._options.type === 'donut';
            const innerR = isDonut ? outerR * (this._options.donut?.size || 0.5) : 0;

            const svg = buildSvgElement('svg', {
                viewBox: `0 0 ${size} ${size}`,
                class: 'nds-chart-svg',
                role: 'img',
                'aria-label': this._element.getAttribute('aria-label') || strings.text('chart'),
                style: `max-height:${size}px`,
            });

            let current = startAngle || 0;

            data.forEach((value, i) => {
                if (value <= 0) return;
                const angle = (value / total) * 360;
                const end = current + angle;

                const slice = buildSvgElement('path', {
                    d: this._buildArcPath(cx, cy, outerR, innerR, current, end),
                    fill: this._getColor(i),
                    class: 'nds-chart-slice',
                });

                if (stroke?.show) {
                    slice.setAttribute('stroke', stroke.color || '#fff');
                    slice.setAttribute('stroke-width', stroke.width || 2);
                }

                const label = labels?.[i] || `Item ${i + 1}`;
                const percent = ((value / total) * 100).toFixed(1) + '%';
                this._addTipListeners(slice,
                    `<strong>${NDS.escapeHtml(label)}</strong><br>${NDS.escapeHtml(formatNumber(value))} (${NDS.escapeHtml(percent)})`,
                    null, 'nds-chart-slice--active');
                svg.appendChild(slice);

                if (this._options.dataLabels?.show && angle > 20) {
                    const labelR = isDonut ? (outerR + innerR) / 2 : outerR * 0.65;
                    const position = toCartesian(cx, cy, labelR, current + angle / 2);
                    const textElement = buildSvgElement('text', {
                        x: position.x, y: position.y,
                        class: 'nds-chart-pie-label',
                        fill: 'var(--_chart-pie-label-' + (i % 6 + 1) + ')',
                        'text-anchor': 'middle',
                        'dominant-baseline': 'central',
                    });
                    textElement.textContent = percent;
                    svg.appendChild(textElement);
                }

                current = end;
            });

            wrap.appendChild(svg);
        }

        _buildArcPath(cx, cy, outerR, innerR, startAngle, endAngle) {
            const sweep = Math.min(endAngle - startAngle, 359.999);
            const end = startAngle + sweep;
            const outerStart = toCartesian(cx, cy, outerR, startAngle);
            const outerEnd = toCartesian(cx, cy, outerR, end);
            const largeArc = sweep > 180 ? 1 : 0;

            if (innerR <= 0) {
                return [
                    `M ${cx} ${cy}`,
                    `L ${outerStart.x} ${outerStart.y}`,
                    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
                    'Z',
                ].join(' ');
            }

            const innerStart = toCartesian(cx, cy, innerR, startAngle);
            const innerEnd = toCartesian(cx, cy, innerR, end);
            return [
                `M ${outerStart.x} ${outerStart.y}`,
                `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
                `L ${innerEnd.x} ${innerEnd.y}`,
                `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
                'Z',
            ].join(' ');
        }

        // ── Bar Chart ────────────────────────────────────────────

        _renderBar(wrap) {
            const { bar, dataLabels } = this._options;
            const stacked = bar?.stacked || false;

            const context = this._renderAxisChart(wrap, strings.text('bar'), (seriesEntries, catCount) => {
                let maxValue = 0;
                if (stacked) {
                    for (let category = 0; category < catCount; category++) {
                        let sum = 0;
                        seriesEntries.forEach(entry => { sum += (entry.data[category] || 0); });
                        if (sum > maxValue) maxValue = sum;
                    }
                } else {
                    seriesEntries.forEach(entry => entry.data.forEach(value => { if (value > maxValue) maxValue = value; }));
                }
                return getNiceScale(0, maxValue, 5);
            });
            if (!context) return;

            const { seriesArr: seriesList, catCount, catLabels, L: layout, scale, svg, xStrategy } = context;
            const groupW = layout.plotW / catCount;
            const gapOffset = (groupW * (bar?.gap ?? 0.3)) / 2;
            const usableW = groupW - gapOffset * 2;
            const barCount = stacked ? 1 : seriesList.length;
            const barW = usableW / barCount;
            const radius = Math.min(bar?.borderRadius || 6, barW / 2);

            for (let category = 0; category < catCount; category++) {
                const ci = layout.isRTL ? catCount - 1 - category : category;
                const groupX = layout.padLeft + ci * groupW + gapOffset;
                let stackY = 0, stackTotal = 0, topIndex = -1;

                if (stacked) {
                    for (let si = seriesList.length - 1; si >= 0; si--) {
                        if ((seriesList[si].data[category] || 0) > 0) { topIndex = si; break; }
                    }
                    seriesList.forEach(entry => { stackTotal += (entry.data[category] || 0); });
                }

                seriesList.forEach((entry, si) => {
                    const value = entry.data[category] || 0;
                    const barH = (value / scale.max) * layout.plotH;
                    const x = groupX + (stacked ? 0 : si * barW);
                    const y = stacked
                        ? layout.padTop + layout.plotH - stackY - barH
                        : layout.padTop + layout.plotH - barH;

                    const cornerRadius = stacked ? (si === topIndex ? radius : 0) : radius;
                    const rectWidth = stacked ? usableW : barW;
                    const rect = this._buildRoundedRect(x, y, rectWidth, barH, cornerRadius);
                    rect.setAttribute('fill', this._getColor(si));
                    rect.setAttribute('class', 'nds-chart-bar');

                    this._addTipListeners(rect,
                        `<strong>${NDS.escapeHtml(entry.name)}</strong><br>${NDS.escapeHtml(catLabels[category])}: ${NDS.escapeHtml(this._formatValue(value))}`,
                        null, 'nds-chart-bar--active');
                    svg.appendChild(rect);

                    if (dataLabels?.show && (!stacked || si === topIndex)) {
                        const labelElement = buildSvgElement('text', {
                            x: x + rectWidth / 2, y: y - 6,
                            class: 'nds-chart-data-label',
                            'text-anchor': 'middle',
                        });
                        labelElement.textContent = this._formatValue(stacked ? stackTotal : value);
                        svg.appendChild(labelElement);
                    }

                    if (stacked) stackY += barH;
                });
            }

            if (this._options.xaxis?.show) {
                const xPositions = catLabels.map((_, category) => {
                    const ci = layout.isRTL ? catCount - 1 - category : category;
                    return layout.padLeft + ci * groupW + groupW / 2;
                });
                this._renderXLabels(svg, catLabels, xPositions, layout, xStrategy);
            }

            wrap.appendChild(svg);
        }

        _buildRoundedRect(x, y, width, height, radius) {
            if (height <= 0) return buildSvgElement('path', { d: '' });
            radius = Math.min(radius, height / 2, width / 2);
            return buildSvgElement('path', { d: [
                `M ${x + radius} ${y}`,
                `L ${x + width - radius} ${y}`,
                `Q ${x + width} ${y} ${x + width} ${y + radius}`,
                `L ${x + width} ${y + height}`,
                `L ${x} ${y + height}`,
                `L ${x} ${y + radius}`,
                `Q ${x} ${y} ${x + radius} ${y}`,
                'Z',
            ].join(' ') });
        }

        // ── Line Chart ───────────────────────────────────────────

        _renderLine(wrap) {
            const { line } = this._options;
            const smooth = line?.smooth !== false;
            const showDots = line?.dots !== false;
            const dotR = line?.dotRadius || 4;
            const lineW = line?.width || 2;
            const showArea = line?.area || false;

            const context = this._renderAxisChart(wrap, strings.text('line'), (seriesEntries) => {
                let maxValue = 0, minValue = 0;
                seriesEntries.forEach(entry => entry.data.forEach(value => {
                    if (value > maxValue) maxValue = value;
                    if (value < minValue) minValue = value;
                }));
                return getNiceScale(Math.min(0, minValue), maxValue, 5);
            });
            if (!context) return;

            const { seriesArr: seriesList, catCount, catLabels, L: layout, scale, svg, xStrategy } = context;

            // Pre-compute x-positions (shared by points and x-labels)
            const xPositions = catLabels.map((_, category) => {
                const ratio = catCount === 1 ? 0.5 : category / (catCount - 1);
                return layout.isRTL
                    ? layout.padLeft + layout.plotW - ratio * layout.plotW
                    : layout.padLeft + ratio * layout.plotW;
            });

            const computed = seriesList.map((entry, si) => {
                const pts = entry.data.map((value, index) => ({
                    x: xPositions[index], y: this._getValueY(value, scale, layout), val: value, idx: index,
                }));
                return { s: entry, pts, pathD: this._buildPath(pts, smooth), color: this._getColor(si) };
            });

            // Layer 1: Areas (gradient mask fades from peaks to baseline)
            if (showArea) {
                const id = 'nds-af-' + uid++;
                const baseline = layout.padTop + layout.plotH;
                const topY = Math.min(...computed.flatMap(computedSeries => computedSeries.pts.map(point => point.y))) - layout.plotH * 0.05;

                const defs = buildSvgElement('defs');
                const grad = buildSvgElement('linearGradient', {
                    id, gradientUnits: 'userSpaceOnUse',
                    x1: 0, y1: topY, x2: 0, y2: baseline,
                });
                grad.appendChild(buildSvgElement('stop', { offset: '0%', class: 'nds-chart-area-top' }));
                grad.appendChild(buildSvgElement('stop', { offset: '50%', class: 'nds-chart-area-top' }));
                grad.appendChild(buildSvgElement('stop', { offset: '100%', class: 'nds-chart-area-bottom' }));
                defs.appendChild(grad);

                const mask = buildSvgElement('mask', { id: id + '-m' });
                mask.appendChild(buildSvgElement('rect', {
                    x: 0, y: topY, width: layout.w, height: baseline - topY, fill: `url(#${id})`,
                }));
                defs.appendChild(mask);
                svg.insertBefore(defs, svg.firstChild);

                const group = buildSvgElement('g', { mask: `url(#${id}-m)` });
                computed.forEach(({ pts, pathD, color }) => {
                    if (pts.length > 1) {
                        const areaD = pathD
                            + ` L ${pts[pts.length - 1].x} ${baseline}`
                            + ` L ${pts[0].x} ${baseline} Z`;
                        group.appendChild(buildSvgElement('path', { d: areaD, fill: color }));
                    }
                });
                svg.appendChild(group);
            }

            // Layer 2: Lines
            computed.forEach(({ pathD, color }) => {
                svg.appendChild(buildSvgElement('path', {
                    d: pathD, stroke: color, 'stroke-width': lineW,
                    fill: 'none', class: 'nds-chart-line',
                }));
            });

            // Layer 2.5: Spotlight halo — persistent indicator, fixed at the configured
            // index (e.g. 'last'). Only the inner dot at that index gets the --spotlight
            // class to inflate via CSS; hover --active dots elsewhere on the line do NOT
            // get a halo (transient hover ≠ persistent marker).
            const spotlightOption = line?.spotlight;
            let spotlightHomeIndex = -1;
            if (spotlightOption !== undefined && spotlightOption !== false && spotlightOption !== null) {
                const index = spotlightOption === 'last' ? catLabels.length - 1
                    : spotlightOption === 'first' ? 0
                    : Number(spotlightOption);
                if (Number.isFinite(index) && index >= 0 && index < catLabels.length) {
                    spotlightHomeIndex = index;
                    computed.forEach(({ pts, color }) => {
                        const pt = pts.find(point => point.idx === index);
                        if (!pt) return;
                        svg.appendChild(buildSvgElement('circle', {
                            cx: pt.x, cy: pt.y, r: dotR * 2.5,
                            fill: color, 'fill-opacity': 0.18,
                            class: 'nds-chart-spotlight-halo',
                            style: 'pointer-events:none;',
                        }));
                    });
                }
            }

            // Layer 3: Dots (always rendered; CSS hides all but --active/--spotlight when
            // showDots is false). Single rendering path covers both visible and sparkline modes.
            const enableCrosshair = line?.crosshair !== false;
            const dotsByIndex = catLabels.map(() => []);
            this._element.classList.toggle('nds-chart--show-dots', showDots);

            computed.forEach(({ s: entry, pts, color }) => {
                pts.forEach(point => {
                    const dot = buildSvgElement('circle', {
                        cx: point.x, cy: point.y, r: dotR,
                        fill: 'var(--_chart-dot-fill)', stroke: color, 'stroke-width': 2,
                        class: 'nds-chart-dot',
                    });
                    svg.appendChild(dot);
                    dotsByIndex[point.idx].push(dot);

                    // Per-dot tooltips only when crosshair is off (and only when dots are visible —
                    // hidden dots have no surface to hover, so the hit area would be misleading).
                    if (!enableCrosshair && showDots) {
                        const hitArea = buildSvgElement('circle', {
                            cx: point.x, cy: point.y, r: dotR * 3,
                            fill: 'transparent', class: 'nds-chart-dot-hit',
                        });
                        this._addTipListeners(hitArea,
                            `<strong>${NDS.escapeHtml(entry.name)}</strong><br>${NDS.escapeHtml(catLabels[point.idx])}: ${NDS.escapeHtml(this._formatValue(point.val))}`,
                            dot, 'nds-chart-dot--active');
                        svg.appendChild(hitArea);
                    }
                });
            });

            // Mark the spotlight home index (visible via --spotlight class). Stays put;
            // hover only toggles --active on the nearest dot, leaving the spotlight alone.
            if (spotlightHomeIndex >= 0) {
                (dotsByIndex[spotlightHomeIndex] || []).forEach(dot =>
                    dot.classList.add('nds-chart-dot--spotlight'));
            }

            // Layer 4: Crosshair line + plot-area overlay (snaps to nearest x-index on hover)
            if (enableCrosshair && catCount > 0) {
                // touch-action on SVG <rect> is unreliable in mobile browsers — they walk
                // up to the SVG element to decide gesture ownership, so set it here too.
                // pan-y reserves only horizontal drags for the crosshair and lets vertical
                // swipes scroll the page (a bare 'none' trapped page scroll on mobile).
                svg.style.touchAction = 'pan-y';

                const colors = computed.map(computedSeries => computedSeries.color);
                const crosshair = buildSvgElement('line', {
                    x1: 0, y1: layout.padTop, x2: 0, y2: layout.padTop + layout.plotH,
                    class: 'nds-chart-crosshair',
                    style: 'display:none',
                });
                svg.appendChild(crosshair);


                const overlay = buildSvgElement('rect', {
                    x: layout.padLeft, y: layout.padTop,
                    width: layout.plotW, height: layout.plotH,
                    fill: 'transparent',
                    class: 'nds-chart-overlay',
                });
                svg.appendChild(overlay);

                let lastIndex = -1, tapStartIndex = -1;
                const signal = this.renderAbortController.signal;

                // Touch tooltips pin to the top of the chart and follow the crosshair X
                // so the user's finger never covers them. Mouse keeps the cursor-follow
                // behavior since that is not the same problem.
                const setTipPosition = (e, crosshairX) => {
                    if (!this._tooltip) return;
                    const rect = this._element.getBoundingClientRect();
                    const tw = this._tooltip.offsetWidth;
                    if (e.pointerType && e.pointerType !== 'mouse') {
                        const gap = 8;
                        const svgRect = svg.getBoundingClientRect();
                        const chartX = svgRect.left + (crosshairX / layout.w) * svgRect.width - rect.left;
                        // Place tooltip on the side with more room so it never covers the line
                        let x = chartX < rect.width / 2 ? chartX + gap : chartX - tw - gap;
                        x = Math.max(4, Math.min(x, rect.width - tw - 4));
                        this._tooltip.style.left = x + 'px';
                        // Anchor to the SVG's top edge so a top-positioned legend
                        // is not covered. Falls inside the SVG's padTop band.
                        this._tooltip.style.top = (svgRect.top - rect.top) + 'px';
                    } else {
                        this._moveTooltip(e);
                    }
                };

                const dismiss = () => {
                    lastIndex = -1;
                    crosshair.style.display = 'none';
                    dotsByIndex.forEach(dots => dots.forEach(dot => dot.classList.remove('nds-chart-dot--active')));
                    this._hideTooltip();
                };

                // Build the tip as DOM so caller-supplied colors[] flow through
                // marker.style.backgroundColor (a CSSOM setter) instead of an
                // HTML style-attribute interpolation.
                const fillTip = (index) => {
                    this._tooltip.replaceChildren();
                    const title = document.createElement('strong');
                    title.textContent = catLabels[index] ?? '';
                    this._tooltip.appendChild(title);
                    for (let si = 0; si < seriesList.length; si++) {
                        const entry = seriesList[si];
                        const value = entry.data[index];
                        if (value === undefined) continue;
                        this._tooltip.appendChild(document.createElement('br'));
                        const marker = document.createElement('span');
                        marker.className = 'nds-chart-tip-marker';
                        marker.style.backgroundColor = colors[si];
                        this._tooltip.appendChild(marker);
                        this._tooltip.appendChild(document.createTextNode(entry.name + ': ' + this._formatValue(value)));
                    }
                    this._tooltip.classList.add('nds-chart-tooltip--visible');
                };

                // Snap the crosshair to the nearest x-index under the pointer.
                const setCrosshair = (e) => {
                    const rect = svg.getBoundingClientRect();
                    if (!rect.width) return;
                    const mouseSvgX = ((e.clientX - rect.left) / rect.width) * layout.w;

                    let nearest = 0, minDist = Infinity;
                    for (let i = 0; i < xPositions.length; i++) {
                        const distance = Math.abs(xPositions[i] - mouseSvgX);
                        if (distance < minDist) { minDist = distance; nearest = i; }
                    }

                    if (nearest === lastIndex) { setTipPosition(e, xPositions[lastIndex]); return; }
                    lastIndex = nearest;
                    crosshair.setAttribute('x1', xPositions[nearest]);
                    crosshair.setAttribute('x2', xPositions[nearest]);
                    crosshair.style.display = '';

                    for (let i = 0; i < dotsByIndex.length; i++) {
                        const action = i === nearest ? 'add' : 'remove';
                        dotsByIndex[i].forEach(dot => dot.classList[action]('nds-chart-dot--active'));
                    }

                    if (this._options.tooltip?.show !== false && this._tooltip) {
                        fillTip(nearest);
                        setTipPosition(e, xPositions[nearest]);
                    }
                };

                // Pointer Events unify mouse + touch + pen. setPointerCapture keeps
                // events flowing when a finger drags outside the overlay bounds —
                // preventDefault suppresses text-selection/callout during a horizontal
                // scrub (scroll ownership is decided by touch-action: pan-y, not here).
                overlay.addEventListener('pointerdown', (e) => {
                    if (e.pointerType !== 'mouse') {
                        e.preventDefault();
                        tapStartIndex = lastIndex; // remember the pin (if any) before this touch, for toggle-on-tap
                        try { overlay.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
                    }
                    setCrosshair(e); // show on a press/click even without an x move
                }, { signal });

                overlay.addEventListener('pointermove', setCrosshair, { signal });

                // pointerleave fires on actual boundary crossing even when captured,
                // so dismiss it only for mouse — touch is tap-to-pin (below).
                overlay.addEventListener('pointerleave', (e) => {
                    if (e.pointerType === 'mouse') dismiss();
                }, { signal });

                // Tap-to-pin (touch): a tap pins the crosshair and it persists — including
                // through taps outside the chart. Tapping the already-pinned point clears it
                // (lastIdx unchanged from the pre-touch pin); tapping/scrubbing to a different
                // point moves the pin. pointercancel clears it when a vertical scroll claims
                // the gesture. Mouse is unaffected (hover-to-show / leave-to-hide).
                overlay.addEventListener('pointercancel', dismiss, { signal });
                overlay.addEventListener('pointerup', (e) => {
                    if (e.pointerType !== 'mouse' && lastIndex === tapStartIndex) dismiss();
                }, { signal });
            }

            if (this._options.xaxis?.show) {
                this._renderXLabels(svg, catLabels, xPositions, layout, xStrategy, true);
            }

            wrap.appendChild(svg);
        }

        _buildPath(pts, smooth) {
            if (!pts.length) return '';
            if (!smooth || pts.length < 2) {
                return pts.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
            }
            let path = `M ${pts[0].x} ${pts[0].y}`;
            for (let i = 0; i < pts.length - 1; i++) {
                const p0 = pts[Math.max(i - 1, 0)];
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const p3 = pts[Math.min(i + 2, pts.length - 1)];
                const divisor = 8;
                const cp1x = p1.x + (p2.x - p0.x) / divisor;
                const cp1y = p1.y + (p2.y - p0.y) / divisor;
                const cp2x = p2.x - (p3.x - p1.x) / divisor;
                const cp2y = p2.y - (p3.y - p1.y) / divisor;
                path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
            }
            return path;
        }

        // ── Legend ────────────────────────────────────────────────

        _buildLegend() {
            const { series, labels, type } = this._options;
            const legend = buildHtmlElement('div', 'nds-chart-legend');
            const isPie = type === 'pie' || type === 'donut';
            const items = isPie
                ? (labels || series.map((_, i) => `Item ${i + 1}`))
                : series.map((entry, i) => entry.name || `Series ${i + 1}`);

            items.forEach((name, i) => {
                const item = buildHtmlElement('div', 'nds-chart-legend-item');
                const marker = buildHtmlElement('span', 'nds-chart-legend-marker');
                marker.style.backgroundColor = this._getColor(i);
                item.appendChild(marker);
                item.appendChild(buildHtmlElement('span', 'nds-chart-legend-label', name));
                legend.appendChild(item);
            });

            return legend;
        }

        // ── Tooltip ──────────────────────────────────────────────

        _showTooltip(e, html) {
            if (!this._options.tooltip?.show || !this._tooltip) return;
            this._tooltip.innerHTML = html;
            this._tooltip.classList.add('nds-chart-tooltip--visible');
            this._moveTooltip(e);
        }

        _moveTooltip(e) {
            if (!this._tooltip) return;
            const rect = this._element.getBoundingClientRect();
            let x = e.clientX - rect.left + 12;
            let y = e.clientY - rect.top - 10;
            const tw = this._tooltip.offsetWidth;
            const th = this._tooltip.offsetHeight;
            if (x + tw > rect.width) x = x - tw - 24;
            if (y + th > rect.height) y = y - th;
            if (y < 0) y = 4;
            this._tooltip.style.left = x + 'px';
            this._tooltip.style.top = y + 'px';
        }

        _hideTooltip() {
            if (this._tooltip) {
                this._tooltip.classList.remove('nds-chart-tooltip--visible');
            }
        }
    }

    // ── Public interface ───────────────────────────────────────────

    // Re-render every chart instance when document direction or lang changes.
    // Lang switcher uses View Transitions; the shared NDS.onAttributeChange dispatch fires
    // before the new snapshot is captured, so the new render is animated cleanly.
    let dirObserverReady = false;
    function setupDirObserver() {
        if (dirObserverReady) return;
        dirObserverReady = true;
        NDS.onAttributeChange('html', ['dir', 'lang'], () => {
            document.querySelectorAll('.nds-chart[data-nds-chart-initialized]').forEach(el => {
                if (el.ndsChart) el.ndsChart.render();
            });
        });
    }

    function setupCharts() {
        setupDirObserver();
        // Every root, stamped or not: the instance backref is the truth. A re-render
        // that keeps the element but wipes its SVG (stamp and instance intact) gets
        // redrawn here; a cloned root (stamp, no instance) gets claimed.
        document.querySelectorAll('.nds-chart').forEach(el => {
            if (el.ndsChart) {
                if (!el.firstElementChild && !el.ndsChart._deferCount) el.ndsChart.render();
                return;
            }
            const config = readChartConfig(el);

            // Series, not type: every render path reads series (the legend maps it even
            // for pie), so claiming an element on data-chart-type alone builds an instance
            // that throws. The markup for a JS-created chart carries the type as a hint
            // and gets its data from NDS.Chart.create — this sweep must leave those alone.
            if (config.series) {
                el.ndsChart = new NdsChart(el, config);
                el.setAttribute('data-nds-chart-initialized', '');
            }
        });
    }

    // The chart a markup element declares in its data-chart-* attributes.
    function readChartConfig(el) {
        const dataset = el.dataset;
        const config = tryParse(dataset.chartConfig) || {};
        if (dataset.chartType) config.type = dataset.chartType;
        if (dataset.chartSeries) config.series = tryParse(dataset.chartSeries) || config.series;
        if (dataset.chartLabels) config.labels = tryParse(dataset.chartLabels) || config.labels;
        return config;
    }

    function createChart(el, opts) {
        if (typeof el === 'string') el = document.querySelector(el);
        if (!el) return null;
        // No options: the chart its markup declares, so destroy → create rebuilds it.
        if (!opts) {
            opts = readChartConfig(el);
            if (!opts.series) return null;
        }
        setupDirObserver();
        if (el.ndsChart) el.ndsChart.destroy();
        el.ndsChart = new NdsChart(el, opts);
        el.setAttribute('data-nds-chart-initialized', '');
        return el.ndsChart;
    }

    NDS.Chart = {
        init: setupCharts,
        reinit: setupCharts,
        create: createChart,
        destroy: (el) => (typeof el === 'string' ? document.querySelector(el) : el)?.ndsChart?.destroy(),
    };
})();
