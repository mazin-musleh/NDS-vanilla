/**
 * NDS Chart Component — Vanilla SVG Charts
 * Supports: bar, line, pie, donut
 * Zero external dependencies
 * Colors: CSS custom properties (--chart-color-1…6), auto-wraps beyond 6
 */
(function () {
    'use strict';

    const SVG_NS = 'http://www.w3.org/2000/svg';
    let uid = 0;

    // ── Utilities ──────────────────────────────────────────────────

    function deepMerge(target, source) {
        const out = Object.assign({}, target);
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
                && target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
                out[key] = deepMerge(target[key], source[key]);
            } else {
                out[key] = source[key];
            }
        }
        return out;
    }

    function svgEl(tag, attrs) {
        const el = document.createElementNS(SVG_NS, tag);
        if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
        return el;
    }

    function htmlEl(tag, cls, text) {
        const el = document.createElement(tag);
        if (cls) el.className = cls;
        if (text !== undefined) el.textContent = text;
        return el;
    }

    function polarToCart(cx, cy, r, angleDeg) {
        const rad = (angleDeg - 90) * Math.PI / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }

    function niceScale(min, max, ticks) {
        if (max === min) max = min + 1;
        const range = max - min;
        const roughStep = range / (ticks || 5);
        const mag = Math.pow(10, Math.floor(Math.log10(roughStep)));
        const norm = roughStep / mag;
        let step;
        if (norm <= 1) step = mag;
        else if (norm <= 2) step = 2 * mag;
        else if (norm <= 5) step = 5 * mag;
        else step = 10 * mag;
        const niceMin = Math.floor(min / step) * step;
        const niceMax = Math.ceil(max / step) * step;
        const steps = [];
        for (let v = niceMin; v <= niceMax + step * 0.01; v += step) {
            steps.push(Math.round(v * 1e10) / 1e10);
        }
        return { min: niceMin, max: niceMax, step, steps };
    }

    function formatNumber(n) {
        if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
        if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
        return String(n);
    }

    function chartColor(index) {
        return 'var(--_chart-color-' + (index % 6 + 1) + ')';
    }

    function tryParse(str) {
        try { return JSON.parse(str); } catch { return null; }
    }

    // ── Tooltip data store ──────────────────────────────────────────
    const tipData = new WeakMap();

    // ── Default options ─────────────────────────────────────────────

    const PIE_BASE = {
        height: 300,
        legend: { show: true, position: 'bottom' },
        dataLabels: { show: true },
        tooltip: { show: true },
        stroke: { show: false, width: 2, color: 'var(--_chart-dot-fill)' },
        startAngle: 0,
    };

    const AXIS_BASE = {
        height: 350,
        legend: { show: true, position: 'top' },
        tooltip: { show: true },
        grid: { show: true },
        yaxis: { show: true, title: '' },
        // labelRotate: 'auto' | 0 | 45 | 90 | <number>  — auto picks 0 or 45 based on fit
        // labelDecimate: false | true | 'auto' | <number>  — true/'auto' computes step; number forces every-Nth
        xaxis: { show: true, title: '', labelRotate: 'auto', labelDecimate: false },
    };

    const TYPE_DEFAULTS = {
        pie: PIE_BASE,
        donut: { ...PIE_BASE, donut: { size: 0.50 } },
        bar: { ...AXIS_BASE, bar: { borderRadius: 6, gap: 0.3, stacked: false }, dataLabels: { show: false } },
        line: { ...AXIS_BASE, line: { width: 3, smooth: true, dots: true, dotRadius: 4, area: false, crosshair: true } },
    };

    // ── Chart class ────────────────────────────────────────────────

    class NDSChartInstance {
        constructor(el, opts) {
            this.el = el;
            this.opts = this._resolveOpts(opts);
            this._tooltip = null;
            this._lastW = 0;
            this._rafPending = false;
            this._activeHover = null;
            this._ac = new AbortController();
            this._setupDelegation();
            this._setupResize();
            this.render();
        }

        _resolveOpts(opts) {
            const type = opts.type || 'bar';
            const defaults = TYPE_DEFAULTS[type] || TYPE_DEFAULTS.bar;
            const merged = deepMerge(defaults, opts);
            merged.type = type;
            return merged;
        }

        _fmtVal(v) {
            const f = this.opts.dataLabels?.format;
            if (typeof f === 'function') return f(v);
            if (typeof f === 'string') return formatNumber(v) + f;
            return formatNumber(v);
        }

        _color(index) {
            if (this.opts.colors) return this.opts.colors[index % this.opts.colors.length];
            return chartColor(index);
        }

        // ── Public API ─────────────────────────────────────────────

        update(newOpts) {
            this.opts = this._resolveOpts(deepMerge(this.opts, newOpts));
            this.render();
        }

        destroy() {
            this._ac.abort();
            if (this._offResize) { this._offResize(); this._offResize = null; }
            this.el.innerHTML = '';
            delete this.el.ndsChart;
        }

        // ── Event delegation ──────────────────────────────────────

        _setupDelegation() {
            const signal = this._ac.signal;

            this.el.addEventListener('mouseover', (e) => {
                const data = tipData.get(e.target);
                if (!data) return;
                this._clearHover();
                this._activeHover = { target: e.target, ...data };
                this._showTooltip(e, data.html);
                const el = data.activeEl || e.target;
                if (data.activeClass) el.classList.add(data.activeClass);
            }, { signal });

            this.el.addEventListener('mousemove', (e) => {
                if (this._activeHover) this._moveTooltip(e);
            }, { signal });

            this.el.addEventListener('mouseout', (e) => {
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

        _bindTip(el, html, activeEl, activeClass) {
            tipData.set(el, { html, activeEl, activeClass });
        }

        // ── ResizeObserver ────────────────────────────────────────

        _setupResize() {
            this._offResize = NDS.onElementResize(this.el, () => {
                const w = this.el.clientWidth;
                if (w && w !== this._lastW) {
                    this._lastW = w;
                    if (!this._rafPending) {
                        this._rafPending = true;
                        requestAnimationFrame(() => {
                            this._rafPending = false;
                            this.render();
                        });
                    }
                }
            });
        }

        // ── Layout helpers ────────────────────────────────────────

        _normSeries(series) {
            return series.map((s, i) => ({
                name: s.name || `Series ${i + 1}`,
                data: Array.isArray(s.data) ? s.data : [s],
            }));
        }

        _layout(wrap, height, extraPadBottom = 0) {
            const isRTL = this._isRTL;
            const w = wrap.clientWidth || this.el.clientWidth || 600;
            const h = height || 350;
            const hasY = this.opts.yaxis?.show !== false;
            const padTop = 20, padBottom = 40 + extraPadBottom;
            const axisPad = hasY ? 55 : 20;
            const padLeft = isRTL ? 20 : axisPad;
            const padRight = isRTL ? axisPad : 20;
            return {
                w, h, padTop, padBottom, padLeft, padRight, isRTL,
                plotW: w - padLeft - padRight,
                plotH: h - padTop - padBottom,
            };
        }

        // Decide whether x-axis labels should be decimated and/or rotated.
        // Returns { step, rotate, extraPad }. Char width is estimated, not measured —
        // an explicit labelRotate/labelDecimate overrides the auto decision.
        _xaxisStrategy(catLabels, plotW) {
            const xaxis = this.opts.xaxis || {};
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const fontSize = isMobile ? 11 : 13;
            const charW = fontSize * 0.6;
            const padding = 8;

            const labelStrs = catLabels.map(l => String(l));
            const maxLen = Math.max(1, ...labelStrs.map(s => s.length));
            const maxLabelW = maxLen * charW;

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

            return { step, rotate, extraPad };
        }

        _valToY(val, scale, L) {
            return L.padTop + L.plotH - ((val - scale.min) / (scale.max - scale.min)) * L.plotH;
        }

        _createSvg(L, ariaLabel) {
            return svgEl('svg', {
                width: L.w, height: L.h,
                class: 'nds-chart-svg',
                role: 'img',
                'aria-label': ariaLabel,
            });
        }

        // ── Shared axis chart setup (bar + line) ──────────────────

        _axisChart(wrap, ariaLabel, computeScale) {
            const { series, labels, height } = this.opts;
            if (!series?.length) return null;

            const seriesArr = this._normSeries(series);
            const catCount = Math.max(...seriesArr.map(s => s.data.length));
            const catLabels = labels || Array.from({ length: catCount }, (_, i) => `${i + 1}`);

            // Two-step layout: provisional plotW → x-axis strategy → final layout with extraPad
            const provisional = this._layout(wrap, height);
            const xStrategy = this._xaxisStrategy(catLabels, provisional.plotW);
            const L = this._layout(wrap, height, xStrategy.extraPad);

            const scale = computeScale(seriesArr, catCount);
            const svg = this._createSvg(L, ariaLabel);

            if (this.opts.grid?.show) this._renderGrid(svg, scale, L);
            if (this.opts.yaxis?.show) this._renderYAxis(svg, scale, L);

            return { seriesArr, catCount, catLabels, L, scale, svg, xStrategy };
        }

        _renderGrid(svg, scale, L) {
            scale.steps.forEach(v => {
                const y = this._valToY(v, scale, L);
                svg.appendChild(svgEl('line', {
                    x1: L.padLeft, y1: y,
                    x2: L.padLeft + L.plotW, y2: y,
                    class: 'nds-chart-gridline',
                }));
            });
        }

        _renderYAxis(svg, scale, L) {
            scale.steps.forEach(v => {
                const txt = svgEl('text', {
                    x: L.isRTL ? L.w - 8 : L.padLeft - 8,
                    y: this._valToY(v, scale, L) + 4,
                    class: 'nds-chart-axis-label',
                    'text-anchor': L.isRTL ? 'start' : 'end',
                });
                txt.textContent = this._fmtVal(v);
                svg.appendChild(txt);
            });
        }

        _renderXLabels(svg, catLabels, xPositions, L, xStrategy) {
            const { step = 1, rotate = 0 } = xStrategy || {};
            const baseY = L.padTop + L.plotH;
            const y = rotate ? baseY + 14 : baseY + 30;

            catLabels.forEach((label, i) => {
                if (step > 1 && i % step !== 0) return;

                const x = xPositions[i];
                const attrs = { x, y, class: 'nds-chart-axis-label' };

                if (rotate === 0) {
                    attrs['text-anchor'] = 'middle';
                } else {
                    attrs['text-anchor'] = 'end';
                    attrs.transform = `rotate(${L.isRTL ? rotate : -rotate} ${x} ${y})`;
                }

                const txt = svgEl('text', attrs);
                txt.textContent = label;
                svg.appendChild(txt);
            });
        }

        // ── Render orchestrator ──────────────────────────────────

        render() {
            if (!this.el.clientWidth) {
                this._deferCount = (this._deferCount || 0) + 1;
                if (this._deferCount < 10) {
                    requestAnimationFrame(() => this.render());
                    return;
                }
            }
            this._deferCount = 0;
            this._activeHover = null;
            this.el.innerHTML = '';
            this.el.classList.add('nds-chart');
            this.el.setAttribute('data-chart-type', this.opts.type);

            const { type } = this.opts;
            this._isRTL = NDS.isRTL;

            const hasAxes = type === 'bar' || type === 'line';
            const yTitle = this.opts.yaxis?.title;
            const xTitle = this.opts.xaxis?.title;

            const body = htmlEl('div', 'nds-chart-body');
            if (hasAxes && yTitle) {
                body.appendChild(htmlEl('span', 'nds-chart-axis-title nds-chart-axis-title--y', yTitle));
            }

            const canvasWrap = htmlEl('div', 'nds-chart-canvas-wrap');
            const canvas = htmlEl('div', 'nds-chart-canvas');

            if (this.opts.legend?.show && this.opts.legend.position === 'top') {
                canvasWrap.appendChild(this._buildLegend());
            }

            canvasWrap.appendChild(canvas);

            if (hasAxes && xTitle) {
                canvasWrap.appendChild(htmlEl('div', 'nds-chart-axis-title nds-chart-axis-title--x', xTitle));
            }

            if (this.opts.legend?.show && this.opts.legend.position === 'bottom') {
                canvasWrap.appendChild(this._buildLegend());
            }

            body.appendChild(canvasWrap);
            this.el.appendChild(body);

            if (type === 'pie' || type === 'donut') this._renderPie(canvas);
            else if (type === 'bar') this._renderBar(canvas);
            else if (type === 'line') this._renderLine(canvas);

            this._tooltip = htmlEl('div', 'nds-chart-tooltip');
            this.el.appendChild(this._tooltip);
            this._lastW = this.el.clientWidth;
        }

        // ── Pie / Donut ──────────────────────────────────────────

        _renderPie(wrap) {
            const { series, labels, height, stroke, startAngle } = this.opts;
            const data = Array.isArray(series) ? series : [];
            const total = data.reduce((s, v) => s + (typeof v === 'number' ? v : 0), 0);
            if (!total) return;

            const size = height || 300;
            const cx = size / 2, cy = size / 2;
            const outerR = size / 2 - 10;
            const isDonut = this.opts.type === 'donut';
            const innerR = isDonut ? outerR * (this.opts.donut?.size || 0.5) : 0;

            const svg = svgEl('svg', {
                viewBox: `0 0 ${size} ${size}`,
                class: 'nds-chart-svg',
                role: 'img',
                'aria-label': 'Chart',
                style: `max-height:${size}px`,
            });

            let current = startAngle || 0;

            data.forEach((val, i) => {
                if (val <= 0) return;
                const angle = (val / total) * 360;
                const end = current + angle;

                const slice = svgEl('path', {
                    d: this._arcPath(cx, cy, outerR, innerR, current, end),
                    fill: this._color(i),
                    class: 'nds-chart-slice',
                });

                if (stroke?.show) {
                    slice.setAttribute('stroke', stroke.color || '#fff');
                    slice.setAttribute('stroke-width', stroke.width || 2);
                }

                const label = labels?.[i] || `Item ${i + 1}`;
                const pct = ((val / total) * 100).toFixed(1) + '%';
                this._bindTip(slice,
                    `<strong>${NDS.escapeHtml(label)}</strong><br>${NDS.escapeHtml(formatNumber(val))} (${NDS.escapeHtml(pct)})`,
                    null, 'nds-chart-slice--active');
                svg.appendChild(slice);

                if (this.opts.dataLabels?.show && angle > 20) {
                    const labelR = isDonut ? (outerR + innerR) / 2 : outerR * 0.65;
                    const pos = polarToCart(cx, cy, labelR, current + angle / 2);
                    const txt = svgEl('text', {
                        x: pos.x, y: pos.y,
                        class: 'nds-chart-pie-label',
                        fill: 'var(--_chart-pie-label-' + (i % 6 + 1) + ')',
                        'text-anchor': 'middle',
                        'dominant-baseline': 'central',
                    });
                    txt.textContent = pct;
                    svg.appendChild(txt);
                }

                current = end;
            });

            wrap.appendChild(svg);
        }

        _arcPath(cx, cy, outerR, innerR, startAngle, endAngle) {
            const sweep = Math.min(endAngle - startAngle, 359.999);
            const end = startAngle + sweep;
            const outerStart = polarToCart(cx, cy, outerR, startAngle);
            const outerEnd = polarToCart(cx, cy, outerR, end);
            const largeArc = sweep > 180 ? 1 : 0;

            if (innerR <= 0) {
                return [
                    `M ${cx} ${cy}`,
                    `L ${outerStart.x} ${outerStart.y}`,
                    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
                    'Z',
                ].join(' ');
            }

            const innerStart = polarToCart(cx, cy, innerR, startAngle);
            const innerEnd = polarToCart(cx, cy, innerR, end);
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
            const { bar, dataLabels } = this.opts;
            const stacked = bar?.stacked || false;

            const ctx = this._axisChart(wrap, 'Bar chart', (seriesArr, catCount) => {
                let maxVal = 0;
                if (stacked) {
                    for (let c = 0; c < catCount; c++) {
                        let sum = 0;
                        seriesArr.forEach(s => { sum += (s.data[c] || 0); });
                        if (sum > maxVal) maxVal = sum;
                    }
                } else {
                    seriesArr.forEach(s => s.data.forEach(v => { if (v > maxVal) maxVal = v; }));
                }
                return niceScale(0, maxVal, 5);
            });
            if (!ctx) return;

            const { seriesArr, catCount, catLabels, L, scale, svg, xStrategy } = ctx;
            const groupW = L.plotW / catCount;
            const gapOffset = (groupW * (bar?.gap ?? 0.3)) / 2;
            const usableW = groupW - gapOffset * 2;
            const barCount = stacked ? 1 : seriesArr.length;
            const barW = usableW / barCount;
            const radius = Math.min(bar?.borderRadius || 6, barW / 2);

            for (let c = 0; c < catCount; c++) {
                const ci = L.isRTL ? catCount - 1 - c : c;
                const groupX = L.padLeft + ci * groupW + gapOffset;
                let stackY = 0, stackTotal = 0, topIdx = -1;

                if (stacked) {
                    for (let si = seriesArr.length - 1; si >= 0; si--) {
                        if ((seriesArr[si].data[c] || 0) > 0) { topIdx = si; break; }
                    }
                    seriesArr.forEach(s => { stackTotal += (s.data[c] || 0); });
                }

                seriesArr.forEach((s, si) => {
                    const val = s.data[c] || 0;
                    const barH = (val / scale.max) * L.plotH;
                    const x = groupX + (stacked ? 0 : si * barW);
                    const y = stacked
                        ? L.padTop + L.plotH - stackY - barH
                        : L.padTop + L.plotH - barH;

                    const r = stacked ? (si === topIdx ? radius : 0) : radius;
                    const w = stacked ? usableW : barW;
                    const rect = this._roundedRect(x, y, w, barH, r);
                    rect.setAttribute('fill', this._color(si));
                    rect.setAttribute('class', 'nds-chart-bar');

                    this._bindTip(rect,
                        `<strong>${NDS.escapeHtml(s.name)}</strong><br>${NDS.escapeHtml(catLabels[c])}: ${NDS.escapeHtml(this._fmtVal(val))}`,
                        null, 'nds-chart-bar--active');
                    svg.appendChild(rect);

                    if (dataLabels?.show && (!stacked || si === topIdx)) {
                        const lbl = svgEl('text', {
                            x: x + w / 2, y: y - 6,
                            class: 'nds-chart-data-label',
                            'text-anchor': 'middle',
                        });
                        lbl.textContent = this._fmtVal(stacked ? stackTotal : val);
                        svg.appendChild(lbl);
                    }

                    if (stacked) stackY += barH;
                });
            }

            if (this.opts.xaxis?.show) {
                const xPositions = catLabels.map((_, c) => {
                    const ci = L.isRTL ? catCount - 1 - c : c;
                    return L.padLeft + ci * groupW + groupW / 2;
                });
                this._renderXLabels(svg, catLabels, xPositions, L, xStrategy);
            }

            wrap.appendChild(svg);
        }

        _roundedRect(x, y, w, h, r) {
            if (h <= 0) return svgEl('path', { d: '' });
            r = Math.min(r, h / 2, w / 2);
            return svgEl('path', { d: [
                `M ${x + r} ${y}`,
                `L ${x + w - r} ${y}`,
                `Q ${x + w} ${y} ${x + w} ${y + r}`,
                `L ${x + w} ${y + h}`,
                `L ${x} ${y + h}`,
                `L ${x} ${y + r}`,
                `Q ${x} ${y} ${x + r} ${y}`,
                'Z',
            ].join(' ') });
        }

        // ── Line Chart ───────────────────────────────────────────

        _renderLine(wrap) {
            const { line } = this.opts;
            const smooth = line?.smooth !== false;
            const showDots = line?.dots !== false;
            const dotR = line?.dotRadius || 4;
            const lineW = line?.width || 2;
            const showArea = line?.area || false;

            const ctx = this._axisChart(wrap, 'Line chart', (seriesArr) => {
                let maxVal = 0, minVal = 0;
                seriesArr.forEach(s => s.data.forEach(v => {
                    if (v > maxVal) maxVal = v;
                    if (v < minVal) minVal = v;
                }));
                return niceScale(Math.min(0, minVal), maxVal, 5);
            });
            if (!ctx) return;

            const { seriesArr, catCount, catLabels, L, scale, svg, xStrategy } = ctx;

            // Pre-compute x-positions (shared by points and x-labels)
            const xPositions = catLabels.map((_, c) => {
                const ratio = catCount === 1 ? 0.5 : c / (catCount - 1);
                return L.isRTL
                    ? L.padLeft + L.plotW - ratio * L.plotW
                    : L.padLeft + ratio * L.plotW;
            });

            const computed = seriesArr.map((s, si) => {
                const pts = s.data.map((v, idx) => ({
                    x: xPositions[idx], y: this._valToY(v, scale, L), val: v, idx,
                }));
                return { s, pts, pathD: this._buildPath(pts, smooth), color: this._color(si) };
            });

            // Layer 1: Areas (gradient mask fades from peaks to baseline)
            if (showArea) {
                const id = 'nds-af-' + uid++;
                const baseline = L.padTop + L.plotH;
                const topY = Math.min(...computed.flatMap(c => c.pts.map(p => p.y))) - L.plotH * 0.05;

                const defs = svgEl('defs');
                const grad = svgEl('linearGradient', {
                    id, gradientUnits: 'userSpaceOnUse',
                    x1: 0, y1: topY, x2: 0, y2: baseline,
                });
                grad.appendChild(svgEl('stop', { offset: '0%', class: 'nds-chart-area-top' }));
                grad.appendChild(svgEl('stop', { offset: '50%', class: 'nds-chart-area-top' }));
                grad.appendChild(svgEl('stop', { offset: '100%', class: 'nds-chart-area-bottom' }));
                defs.appendChild(grad);

                const mask = svgEl('mask', { id: id + '-m' });
                mask.appendChild(svgEl('rect', {
                    x: 0, y: topY, width: L.w, height: baseline - topY, fill: `url(#${id})`,
                }));
                defs.appendChild(mask);
                svg.insertBefore(defs, svg.firstChild);

                const g = svgEl('g', { mask: `url(#${id}-m)` });
                computed.forEach(({ pts, pathD, color }) => {
                    if (pts.length > 1) {
                        const areaD = pathD
                            + ` L ${pts[pts.length - 1].x} ${baseline}`
                            + ` L ${pts[0].x} ${baseline} Z`;
                        g.appendChild(svgEl('path', { d: areaD, fill: color }));
                    }
                });
                svg.appendChild(g);
            }

            // Layer 2: Lines
            computed.forEach(({ pathD, color }) => {
                svg.appendChild(svgEl('path', {
                    d: pathD, stroke: color, 'stroke-width': lineW,
                    fill: 'none', class: 'nds-chart-line',
                }));
            });

            // Layer 3: Dots (refs collected per index for crosshair activation)
            const enableCrosshair = line?.crosshair !== false;
            const dotsByIdx = catLabels.map(() => []);

            if (showDots) {
                computed.forEach(({ s, pts, color }) => {
                    pts.forEach(p => {
                        const dot = svgEl('circle', {
                            cx: p.x, cy: p.y, r: dotR,
                            fill: 'var(--_chart-dot-fill)', stroke: color, 'stroke-width': 2,
                            class: 'nds-chart-dot',
                        });
                        svg.appendChild(dot);
                        dotsByIdx[p.idx].push(dot);

                        // Per-dot tooltips only when crosshair is off
                        if (!enableCrosshair) {
                            const hitArea = svgEl('circle', {
                                cx: p.x, cy: p.y, r: dotR * 3,
                                fill: 'transparent', class: 'nds-chart-dot-hit',
                            });
                            this._bindTip(hitArea,
                                `<strong>${NDS.escapeHtml(s.name)}</strong><br>${NDS.escapeHtml(catLabels[p.idx])}: ${NDS.escapeHtml(this._fmtVal(p.val))}`,
                                dot, 'nds-chart-dot--active');
                            svg.appendChild(hitArea);
                        }
                    });
                });
            }

            // Layer 4: Crosshair line + plot-area overlay (snaps to nearest x-index on hover)
            if (enableCrosshair && catCount > 0) {
                // touch-action on SVG <rect> is unreliable in mobile browsers — they walk
                // up to the SVG element to decide gesture ownership. Setting it here
                // stops Chrome/Safari from firing pointercancel after a few moves.
                svg.style.touchAction = 'none';

                const colors = computed.map(c => c.color);
                const crosshair = svgEl('line', {
                    x1: 0, y1: L.padTop, x2: 0, y2: L.padTop + L.plotH,
                    class: 'nds-chart-crosshair',
                    style: 'display:none',
                });
                svg.appendChild(crosshair);

                const overlay = svgEl('rect', {
                    x: L.padLeft, y: L.padTop,
                    width: L.plotW, height: L.plotH,
                    fill: 'transparent',
                    class: 'nds-chart-overlay',
                });
                svg.appendChild(overlay);

                let lastIdx = -1;
                const signal = this._ac.signal;

                // Touch tooltips pin to the top of the chart and follow the crosshair X
                // so the user's finger never covers them. Mouse keeps the cursor-follow
                // behavior since that is not the same problem.
                const positionTip = (e, crosshairX) => {
                    if (!this._tooltip) return;
                    const rect = this.el.getBoundingClientRect();
                    const tw = this._tooltip.offsetWidth;
                    const th = this._tooltip.offsetHeight;
                    if (e.pointerType && e.pointerType !== 'mouse') {
                        const gap = 8;
                        const svgRect = svg.getBoundingClientRect();
                        const chartX = svgRect.left + (crosshairX / L.w) * svgRect.width - rect.left;
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
                    lastIdx = -1;
                    crosshair.style.display = 'none';
                    dotsByIdx.forEach(arr => arr.forEach(d => d.classList.remove('nds-chart-dot--active')));
                    this._hideTooltip();
                };

                // Pointer Events unify mouse + touch + pen. setPointerCapture keeps
                // events flowing when a finger drags outside the overlay bounds —
                // preventDefault stops the browser from claiming the gesture as scroll.
                overlay.addEventListener('pointerdown', (e) => {
                    if (e.pointerType !== 'mouse') {
                        e.preventDefault();
                        if (overlay.setPointerCapture) {
                            try { overlay.setPointerCapture(e.pointerId); } catch (_) { /* ignore */ }
                        }
                    }
                }, { signal });

                overlay.addEventListener('pointermove', (e) => {
                    const rect = svg.getBoundingClientRect();
                    if (!rect.width) return;
                    const mouseSvgX = ((e.clientX - rect.left) / rect.width) * L.w;

                    let nearest = 0, minDist = Infinity;
                    for (let i = 0; i < xPositions.length; i++) {
                        const d = Math.abs(xPositions[i] - mouseSvgX);
                        if (d < minDist) { minDist = d; nearest = i; }
                    }

                    if (nearest !== lastIdx) {
                        lastIdx = nearest;
                        crosshair.setAttribute('x1', xPositions[nearest]);
                        crosshair.setAttribute('x2', xPositions[nearest]);
                        crosshair.style.display = '';

                        for (let i = 0; i < dotsByIdx.length; i++) {
                            const action = i === nearest ? 'add' : 'remove';
                            dotsByIdx[i].forEach(d => d.classList[action]('nds-chart-dot--active'));
                        }

                        const tipLines = seriesArr.map((s, si) => {
                            const v = s.data[nearest];
                            if (v === undefined) return '';
                            return `<span class="nds-chart-tip-marker" style="background:${colors[si]}"></span>`
                                + NDS.escapeHtml(s.name) + ': ' + NDS.escapeHtml(this._fmtVal(v));
                        }).filter(Boolean).join('<br>');
                        const html = '<strong>' + NDS.escapeHtml(catLabels[nearest]) + '</strong><br>' + tipLines;
                        if (this.opts.tooltip?.show !== false && this._tooltip) {
                            this._tooltip.innerHTML = html;
                            this._tooltip.classList.add('nds-chart-tooltip--visible');
                            positionTip(e, xPositions[nearest]);
                        }
                    } else {
                        positionTip(e, xPositions[lastIdx]);
                    }
                }, { signal });

                // pointerleave fires on actual boundary crossing even when captured,
                // so dismiss it only for mouse — touch dismissal goes through pointerup/cancel.
                overlay.addEventListener('pointerleave', (e) => {
                    if (e.pointerType === 'mouse') dismiss();
                }, { signal });
                overlay.addEventListener('pointercancel', dismiss, { signal });
                overlay.addEventListener('pointerup', (e) => {
                    if (e.pointerType !== 'mouse') dismiss();
                }, { signal });
            }

            if (this.opts.xaxis?.show) {
                this._renderXLabels(svg, catLabels, xPositions, L, xStrategy);
            }

            wrap.appendChild(svg);
        }

        _buildPath(pts, smooth) {
            if (!pts.length) return '';
            if (!smooth || pts.length < 2) {
                return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
            }
            let d = `M ${pts[0].x} ${pts[0].y}`;
            for (let i = 0; i < pts.length - 1; i++) {
                const p0 = pts[Math.max(i - 1, 0)];
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const p3 = pts[Math.min(i + 2, pts.length - 1)];
                const t = 8;
                const cp1x = p1.x + (p2.x - p0.x) / t;
                const cp1y = p1.y + (p2.y - p0.y) / t;
                const cp2x = p2.x - (p3.x - p1.x) / t;
                const cp2y = p2.y - (p3.y - p1.y) / t;
                d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
            }
            return d;
        }

        // ── Legend ────────────────────────────────────────────────

        _buildLegend() {
            const { series, labels, type } = this.opts;
            const legend = htmlEl('div', 'nds-chart-legend');
            const isPie = type === 'pie' || type === 'donut';
            const items = isPie
                ? (labels || series.map((_, i) => `Item ${i + 1}`))
                : series.map((s, i) => s.name || `Series ${i + 1}`);

            items.forEach((name, i) => {
                const item = htmlEl('div', 'nds-chart-legend-item');
                const marker = htmlEl('span', 'nds-chart-legend-marker');
                marker.style.backgroundColor = this._color(i);
                item.appendChild(marker);
                item.appendChild(htmlEl('span', 'nds-chart-legend-label', name));
                legend.appendChild(item);
            });

            return legend;
        }

        // ── Tooltip ──────────────────────────────────────────────

        _showTooltip(e, html) {
            if (!this.opts.tooltip?.show || !this._tooltip) return;
            this._tooltip.innerHTML = html;
            this._tooltip.classList.add('nds-chart-tooltip--visible');
            this._moveTooltip(e);
        }

        _moveTooltip(e) {
            if (!this._tooltip) return;
            const rect = this.el.getBoundingClientRect();
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
    // Lang switcher uses View Transitions; the shared NDS.onAttrChange dispatch fires
    // before the new snapshot is captured, so the new render is animated cleanly.
    let _dirObserverReady = false;
    function setupDirObserver() {
        if (_dirObserverReady) return;
        _dirObserverReady = true;
        NDS.onAttrChange('html', ['dir', 'lang'], () => {
            document.querySelectorAll('.nds-chart[data-nds-init]').forEach(el => {
                if (el.ndsChart) el.ndsChart.render();
            });
        });
    }

    function initCharts() {
        setupDirObserver();
        document.querySelectorAll('.nds-chart:not([data-nds-init])').forEach(el => {
            if (el.ndsChart) return;
            const d = el.dataset;
            const config = tryParse(d.chartConfig) || {};
            if (d.chartType) config.type = d.chartType;
            if (d.chartSeries) config.series = tryParse(d.chartSeries) || config.series;
            if (d.chartLabels) config.labels = tryParse(d.chartLabels) || config.labels;

            if (config.type || config.series) {
                el.ndsChart = new NDSChartInstance(el, config);
                el.setAttribute('data-nds-init', '');
            }
        });
    }

    function createChart(el, opts) {
        if (typeof el === 'string') el = document.querySelector(el);
        if (!el) return null;
        setupDirObserver();
        if (el.ndsChart) el.ndsChart.destroy();
        el.ndsChart = new NDSChartInstance(el, opts);
        el.setAttribute('data-nds-init', '');
        return el.ndsChart;
    }

    NDS.Chart = {
        init: initCharts,
        reinit: initCharts,
        create: createChart,
    };
})();
