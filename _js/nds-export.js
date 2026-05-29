/**
 * NDS Export — source-agnostic CSV / Excel / PDF export.
 *
 * Declarative: place a [data-export] button (data-export="csv|xls|pdf",
 * data-export-target="<selector>") and the loader-registered init() wires a
 * delegated click handler. Imperative API also available — consumers call:
 *   NDS.Export.export(source, format, scope?, opts?)
 *     source: Element | selector  (a <table>, .nds-table, or any container with data-export-rows)
 *     format: 'csv' | 'xls' | 'pdf'
 *     scope : 'selected' | 'all' | 'auto'  default 'auto'
 *             auto → 'selected' if any [data-state~="selected"] row, else 'all'
 *     opts  : { filename?, title?, dir? }
 *
 * Two adapters:
 *   - tableAdapter   auto-picked for <table> / .nds-table; reads thead/tbody, respects
 *                    pagination (.nds-paged-content), skips checkbox + [data-export-skip] cols.
 *   - genericAdapter for any container with data-export-rows="<selector>" — discovers fields
 *                    from [data-export-field="key"] descendants per row.
 *
 * Cell value precedence (both adapters):
 *   data-export-value > data-sort-value (tables only) > NDS.Tables.getCellText / textContent
 */
(function () {
    'use strict';

    // A row counts as selected when it carries data-state="selected" (the NDS
    // convention nds-tables.js maintains for table rows) OR when a checkbox
    // with the .nds-check class inside it is checked. The second path lets
    // card lists, definition lists, and any custom container "just work" with
    // the canonical .nds-card-checkbox / nds-form-control markup — consumers
    // don't need to wire a change listener that mirrors the checkbox state
    // back onto a data-state attribute.
    function isRowSelected(row) {
        if (NDS.State.has(row, 'selected')) return true;
        const cb = row.querySelector('input.nds-check');
        return !!(cb && cb.checked);
    }

    // ── adapters ────────────────────────────────────────────────────────

    const tableAdapter = {
        getColumns(source) {
            const ths = source.querySelectorAll('thead th');
            const cols = [];
            ths.forEach((th, index) => {
                if (th.hasAttribute('data-export-skip')) return;
                // Skip the row-selection checkbox column (auto-detected)
                if (th.querySelector('input[type="checkbox"].nds-check')) return;
                const label = th.dataset.exportLabel
                    || NDS.Tables.getCellText(th)
                    || ('col_' + index);
                cols.push({ index, key: 'c' + index, label });
            });
            return cols;
        },

        getRows(source, scope) {
            const tbody = source.querySelector('tbody');
            if (!tbody) return [];
            // Paginated tables hide off-page rows via .nds-page-item + [hidden].
            // Export must see every page, so reach for the source list and ignore the hidden flag.
            const paged = tbody.closest('.nds-paged-content');
            const rows = paged
                ? Array.from(source.querySelectorAll('tbody tr.nds-page-item'))
                : Array.from(tbody.children).filter(el => el.tagName === 'TR');
            if (scope === 'selected') return rows.filter(isRowSelected);
            return rows;
        },

        getCell(row, col) {
            const td = row.children[col.index];
            if (!td) return '';
            // data-sort-value is deliberately NOT consulted here — it's a
            // sort-comparison signal, not an export override. Authors who want
            // a raw value in exports (e.g. an ISO date when the cell shows a
            // localized one) use data-export-value; otherwise the rendered
            // text is exported. Per-cell currency suffixes are deliberately
            // NOT injected — currency belongs in the column header label,
            // cells should hold raw numbers so CSV/Excel can do math on them.
            const override = td.getAttribute('data-export-value');
            if (override !== null) return override;
            return NDS.Tables.getCellText(td);
        },

        anySelected(source) {
            const tbody = source.querySelector('tbody');
            if (!tbody) return false;
            return Array.from(tbody.children).some(tr => tr.tagName === 'TR' && isRowSelected(tr));
        }
    };

    const genericAdapter = {
        getRows(source, scope) {
            const sel = source.dataset.exportRows;
            const rows = sel
                ? NDS.queryAll(source, sel)
                : Array.from(source.children);
            if (scope === 'selected') return rows.filter(isRowSelected);
            return rows;
        },

        getColumns(source) {
            const skipKeys = new Set(
                (source.dataset.exportSkip || '').split(/\s+/).filter(Boolean)
            );
            const rows = this.getRows(source, 'all');
            const cols = [];
            const seen = new Set();
            rows.forEach(row => {
                const fields = NDS.queryAll(row, '[data-export-field]');
                fields.forEach(el => {
                    if (el.hasAttribute('data-export-skip')) return;
                    const key = el.dataset.exportField;
                    if (!key || seen.has(key) || skipKeys.has(key)) return;
                    seen.add(key);
                    cols.push({ key, label: el.dataset.exportLabel || key });
                });
            });
            return cols;
        },

        getCell(row, col) {
            const el = NDS.querySelector(row, '[data-export-field="' + col.key + '"]');
            if (!el || el.hasAttribute('data-export-skip')) return '';
            const override = el.getAttribute('data-export-value');
            if (override !== null) return override;
            return el.textContent.trim();
        },

        anySelected(source) {
            const sel = source.dataset.exportRows;
            const rows = sel ? NDS.queryAll(source, sel) : Array.from(source.children);
            return rows.some(isRowSelected);
        }
    };

    // ── core ────────────────────────────────────────────────────────────

    function resolveSource(source) {
        if (!source) return null;
        if (typeof source === 'string') {
            const el = document.querySelector(source);
            if (!el) console.warn('[NDS.Export] source not found:', source);
            return el;
        }
        return source;
    }

    function pickAdapter(source) {
        return source.matches('table, .nds-table') ? tableAdapter : genericAdapter;
    }

    function inferScope(source, adapter) {
        return adapter.anySelected(source) ? 'selected' : 'all';
    }

    function collect(source, scope) {
        const el = resolveSource(source);
        if (!el) return { columns: [], rows: [] };
        const adapter = pickAdapter(el);
        const effective = scope === 'auto' || !scope ? inferScope(el, adapter) : scope;
        const columns = adapter.getColumns(el);
        const rawRows = adapter.getRows(el, effective);
        const rows = rawRows.map(row => {
            const rec = {};
            columns.forEach(col => { rec[col.key] = adapter.getCell(row, col); });
            return rec;
        });
        return { columns, rows };
    }

    // ── formatters ──────────────────────────────────────────────────────

    const BOM = '﻿';

    // CSV / spreadsheet formula-injection guard (CWE-1236 / OWASP).
    // Excel, LibreOffice Calc, and Google Sheets evaluate any cell starting
    // with =  +  -  @  TAB  or  CR  as a formula — opening a maliciously
    // crafted export can exfiltrate data via =HYPERLINK / =WEBSERVICE / etc.
    // Prefix risky values with a leading apostrophe — the standard guard. Excel
    // hides the apostrophe and treats the rest as text; CSV parsers see it.
    function spreadsheetSafe(value) {
        const s = value == null ? '' : String(value);
        if (!s) return s;
        const c = s.charCodeAt(0);
        // = + - @ \t \r
        if (c === 0x3D || c === 0x2B || c === 0x2D || c === 0x40 || c === 0x09 || c === 0x0D) {
            return "'" + s;
        }
        return s;
    }

    function csvField(value) {
        const s = spreadsheetSafe(value);
        return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }

    function toCSV(data) {
        const { columns, rows } = data;
        const header = columns.map(c => csvField(c.label)).join(',');
        const body = rows.map(r => columns.map(c => csvField(r[c.key])).join(','));
        return BOM + [header].concat(body).join('\r\n');
    }

    function buildHeadBody(data) {
        const { columns, rows } = data;
        const esc = NDS.escapeHtml;
        const thead = '<thead><tr>'
            + columns.map(c => '<th>' + esc(c.label) + '</th>').join('')
            + '</tr></thead>';
        const tbody = '<tbody>'
            + rows.map(r => '<tr>'
                + columns.map(c => '<td>' + esc(spreadsheetSafe(r[c.key])) + '</td>').join('')
                + '</tr>').join('')
            + '</tbody>';
        return thead + tbody;
    }

    function toXLSHtml(data, opts) {
        opts = opts || {};
        const dir = opts.dir || (NDS.isRTL ? 'rtl' : 'ltr');
        const lang = NDS.lang || 'en';
        const esc = NDS.escapeHtml;
        return BOM + '<!doctype html><html lang="' + esc(lang) + '" dir="' + esc(dir) + '">'
            + '<head><meta charset="utf-8"><meta name="ProgId" content="Excel.Sheet"></head>'
            + '<body><table>' + buildHeadBody(data) + '</table></body></html>';
    }

    // Read the NDS table tokens from the parent page at export time so the
    // printed PDF matches the on-screen table colors. Print output is always
    // forced to LIGHT-mode tokens — dark backgrounds waste ink and read poorly
    // on paper — so we temporarily flip data-theme on <html>, read, restore.
    // The two attribute writes bookend a single synchronous read; no paint
    // occurs between them, so the user never sees the flip.
    function readTableTokens() {
        const root = document.documentElement;
        const prevTheme = root.getAttribute('data-theme');
        const needsFlip = prevTheme && prevTheme !== 'light';
        if (needsFlip) root.setAttribute('data-theme', 'light');
        const cs = getComputedStyle(root);
        const v = (name, fallback) => cs.getPropertyValue(name).trim() || fallback;
        const tokens = {
            border:    v('--table-cell-border',           '#ddd'),
            headBg:    v('--table-background-header',     '#f3f3f3'),
            headText:  v('--table-text-head',             '#333'),
            cellBg:    v('--table-background-cell',       '#fff'),
            cellText:  v('--table-text-body',             '#222'),
            rowBg:     v('--table-background-row',        '#fafafa'),
        };
        if (needsFlip) root.setAttribute('data-theme', prevTheme);
        return tokens;
    }

    // PDF via the browser's native print dialog. Renders the normalized data into a
    // hidden iframe so the source's checkbox / sort / card chrome doesn't leak in, and
    // so a card list and a <dl> both print as the same tidy grid.
    function openPrint(data, opts) {
        opts = opts || {};
        const dir = opts.dir || (NDS.isRTL ? 'rtl' : 'ltr');
        const lang = NDS.lang || 'en';
        const title = opts.title || 'nds-export';
        const esc = NDS.escapeHtml;
        const t = readTableTokens();

        // print-color-adjust forces the browser to honor backgrounds in print
        // output (default behavior is to strip them for ink saving).
        const html = '<!doctype html>'
            + '<html lang="' + esc(lang) + '" dir="' + esc(dir) + '">'
            + '<head><meta charset="utf-8"><title>' + esc(title) + '</title>'
            + '<style>'
            + '@page { size: A4; margin: 16mm; }'
            + 'html { font-family: "IBM Plex Sans Arabic", system-ui, sans-serif; color: ' + t.cellText + '; }'
            + 'body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }'
            + 'h1 { font-size: 14pt; margin: 0 0 12px; }'
            + 'table { width: 100%; border-collapse: collapse; font-size: 10.5pt; border: 1px solid ' + t.border + '; }'
            + 'th, td { padding: 8px 12px; text-align: start; vertical-align: middle; border-bottom: 1px solid ' + t.border + '; }'
            + 'thead { display: table-header-group; }'
            + 'thead th { background: ' + t.headBg + '; color: ' + t.headText + '; font-weight: 600; border-bottom: 1px solid ' + t.border + '; }'
            + 'tbody td { background: ' + t.cellBg + '; }'
            + 'tbody tr:nth-child(even) td { background: ' + t.rowBg + '; }'
            + 'tbody tr:last-child td { border-bottom: 0; }'
            + 'tr { page-break-inside: avoid; }'
            + '</style></head>'
            + '<body><h1>' + esc(title) + '</h1>'
            + '<table>' + buildHeadBody(data) + '</table>'
            + '</body></html>';

        const iframe = document.createElement('iframe');
        iframe.id = NDS.uniqueId('nds-export-pdf-');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.style.cssText = 'position:fixed;left:-9999px;top:0;width:0;height:0;border:0;';
        document.body.appendChild(iframe);

        const doc = iframe.contentDocument;
        doc.open();
        doc.write(html);
        doc.close();

        const win = iframe.contentWindow;
        // Track focus so we can restore it to the triggering button after the
        // print dialog closes. Without this, focus lands on <body>.
        const previouslyFocused = document.activeElement;

        let done = false;
        let fallbackTimer;
        const cleanup = () => {
            if (done) return;
            done = true;
            clearTimeout(fallbackTimer);
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
            if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
                previouslyFocused.focus();
            }
        };
        win.addEventListener('afterprint', cleanup, { once: true });
        // Safety net: most engines fire afterprint reliably, but Safari's PDF
        // preview path and a few WebView variants have skipped it historically.
        // 10 minutes is well past any realistic dialog lifespan and keeps the
        // hidden iframe from leaking if afterprint never lands.
        fallbackTimer = setTimeout(cleanup, 600000);

        // Give the iframe a tick to lay out before the print dialog blocks the thread.
        setTimeout(() => {
            try {
                win.focus();
                win.print();
            } catch (err) {
                console.warn('[NDS.Export] print failed', err);
                cleanup();
            }
        }, 0);
    }

    function downloadBlob(blob, filename, rowCount) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        // Safari needs the URL alive until after the click navigates; revoking on the
        // next tick is safe across engines.
        setTimeout(() => URL.revokeObjectURL(url), 0);
        if (typeof rowCount === 'number') {
            NDS.announce('Exported ' + rowCount + ' row' + (rowCount === 1 ? '' : 's'));
        }
    }

    // Strip path separators, control chars, and the cross-platform reserved set
    // (Windows: \ / : * ? " < > | ; macOS/Linux: / NUL). Leading dots can
    // produce hidden files or path traversal — strip them too. Clamp to 64
    // chars so a runaway data-export-name doesn't trip filesystem limits.
    function sanitizeFilename(name) {
        if (!name) return 'nds-export';
        let s = String(name).replace(/[\\/:*?"<>|\x00-\x1f]/g, '_').replace(/^\.+/, '');
        if (s.length > 64) s = s.slice(0, 64);
        return s || 'nds-export';
    }

    function defaultFilename(source, ext) {
        const raw = source && source.dataset && source.dataset.exportName;
        const name = sanitizeFilename(raw);
        return name + '-' + new Date().toISOString().slice(0, 10) + '.' + ext;
    }

    function download(data, format, opts) {
        opts = opts || {};
        const ext = format === 'pdf' ? 'pdf' : format === 'xls' ? 'xls' : 'csv';
        const rawName = opts.filename || ('nds-export-' + new Date().toISOString().slice(0, 10) + '.' + ext);
        // sanitize the stem (before extension) — keep the trailing extension as-is.
        const stem = rawName.replace(/\.[a-z]+$/i, '');
        const filename = sanitizeFilename(stem) + (rawName.match(/\.[a-z]+$/i)?.[0] || '.' + ext);
        const title = opts.title || filename.replace(/\.[a-z]+$/i, '');
        if (format === 'csv') {
            downloadBlob(new Blob([toCSV(data)], { type: 'text/csv;charset=utf-8' }), filename, data.rows.length);
        } else if (format === 'xls') {
            downloadBlob(new Blob([toXLSHtml(data, opts)], { type: 'application/vnd.ms-excel;charset=utf-8' }), filename, data.rows.length);
        } else if (format === 'pdf') {
            openPrint(data, Object.assign({}, opts, { title }));
        } else {
            console.warn('[NDS.Export] unknown format:', format);
        }
    }

    function exportFrom(source, format, scope, opts) {
        const el = resolveSource(source);
        if (!el) return;
        opts = opts || {};
        const data = collect(el, scope || 'auto');
        const ext = format === 'pdf' ? 'pdf' : format === 'xls' ? 'xls' : 'csv';
        const filename = opts.filename || defaultFilename(el, ext);
        const title = opts.title || filename.replace(/\.[a-z]+$/i, '');
        download(data, format, Object.assign({}, opts, { filename, title }));
    }

    // ── Declarative button delegation ──────────────────────────────────
    // Single document-level click listener for [data-export] buttons.
    // Resolves the target source in priority order:
    //   1. data-export-target="<selector>"  — explicit pointer
    //   2. nearest enclosing <table> / .nds-table / [data-export-rows]
    //      ancestor (button lives inside the source)
    // Optional data-export-scope="all|selected" forces the scope; default is
    // 'auto' (selected if any, else all).
    //
    // The listener is installed lazily — pages without any [data-export]
    // button pay nothing. NDS bundles ship with `defer` (or at end-of-body),
    // so the IIFE-time querySelector sees everything statically present;
    // NDS.onDOMAdd covers buttons injected later (modals, dropmenus, dynamic
    // toolbars).
    const VALID_FORMATS = { csv: 1, xls: 1, pdf: 1 };
    let _clickInstalled = false;

    function onExportClick(e) {
        const btn = e.target.closest && e.target.closest('[data-export]');
        if (!btn) return;
        const format = btn.dataset.export;
        if (!VALID_FORMATS[format]) return;
        const sel = btn.dataset.exportTarget;
        const target = sel
            ? document.querySelector(sel)
            : btn.closest('table, .nds-table, [data-export-rows]');
        if (!target) {
            console.warn('[NDS.Export] no source resolved for', btn);
            return;
        }
        exportFrom(target, format, btn.dataset.exportScope || 'auto');
    }

    function installClickListener() {
        if (_clickInstalled) return;
        _clickInstalled = true;
        document.addEventListener('click', onExportClick);
    }

    // Loader-driven (registered on selector [data-export], extras bundle):
    // install the delegated click handler + watch for buttons added later.
    function init() {
        installClickListener();
        if (NDS.onDOMAdd) NDS.onDOMAdd('[data-export]', installClickListener);
    }

    NDS.Export = {
        init,
        export: exportFrom,
        // Per-format shortcuts — thin wrappers around export() so callers can
        // write NDS.Export.csv('#orders') instead of .export('#orders','csv').
        csv: (source, scope, opts) => exportFrom(source, 'csv', scope, opts),
        xls: (source, scope, opts) => exportFrom(source, 'xls', scope, opts),
        pdf: (source, scope, opts) => exportFrom(source, 'pdf', scope, opts),
        collect,
        toCSV,
        toXLSHtml,
        openPrint,
        download
    };
})();
