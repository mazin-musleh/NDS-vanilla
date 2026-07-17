/**
 * NDS Editor Blocks — the built-in insertable components (alert, quote,
 * table), and the BLUEPRINT for extending the editor with new blocks.
 *
 * Status: BETA — ships with v1.4.0 alongside nds-editor.js.
 *
 * The editor core ships no block definitions: everything here goes through
 * the public NDS.Editor.registerBlock(def) API, so a project can add its own
 * blocks by shipping a file just like this one — no core changes.
 *
 * The def contract:
 *   name      registry key; becomes data-nds-block on the wrapper.
 *   label     insert-menu row text (localize like STRINGS below).
 *   icon      hgi stroke class for the insert-menu row.
 *   variants  OPTIONAL enum map {key: label}; first key is the default at
 *             insert time. Enum-validated on every round-trip — the ONLY
 *             prop safe to interpolate into an attribute in render().
 *             Expose variant switching as ops with pressed() (see the
 *             alert's status ops) — the insert menu stays one row per block.
 *   slots     prop keys holding user content (string or nested arrays).
 *             Mark the matching elements in render() with
 *             data-nds-slot="<key>" — that makes them editable islands in
 *             the editor AND the parse anchors on round-trip.
 *   slotContent  OPTIONAL content policy for slot values: 'inline'
 *             (default — formatting tags only), 'rich' (the editor's NDS
 *             vocabulary: nds-* components like tags/buttons survive, but
 *             never nested blocks), or 'text' (plain text). A string covers
 *             every slot; a map keys by slot name for mixed policies
 *             (e.g. { title: 'text', body: 'rich' }). Paste into a slot
 *             honors the same policy.
 *   defaults  OPTIONAL insert-time seed content.
 *   render(props) -> HTML string. Canonical component markup (copy it from
 *             the component's doc page), WITHOUT the wrapper div. Every
 *             slot value arrives inline-sanitized — interpolate as ELEMENT
 *             CONTENT only, never into attributes.
 *   parse(blockEl) -> props | null. OPTIONAL. Omit it to get the generic
 *             parse (variant from the wrapper + innerHTML per slot). Needed
 *             only for variable structure (see table). Return null when the
 *             markup is unrecognizable — the block then degrades safely.
 *   ops       OPTIONAL {cmd: {icon, label, destructive?, pressed?, run(props, ctx) -> props|null}}.
 *             destructive: true renders the button in the destructive style
 *             (removal-flavored ops). pressed(props) -> bool marks the
 *             button aria-pressed — for stateful ops like the alert's
 *             current status.
 *             Structure commands surfaced in the editor toolbar's
 *             block-controls group while a block of this type is active.
 *             run() is DATA-LEVEL: transform the parsed props (return null
 *             to no-op) — the editor re-renders and swaps the block.
 *             ctx = { blockEl, lastCell } for position-aware ops. Never
 *             touch the DOM from run(). Design ops as SELF-INVERSE pairs
 *             (add row ↔ remove row): Chrome drops the swap's undo entry in
 *             real sessions, so the inverse op is the user's recovery path.
 *
 * Rules that keep blocks safe and undo-friendly (learned the hard way):
 * - Blocks are CONTENT, not widgets: no buttons, no listeners, no runtime
 *   state inside the block. Script-inserted nodes in the editable corrupt
 *   the browser's native undo stack (measured). Deletion = select the block
 *   + Backspace; structure edits happen in source view.
 * - Serialization always re-renders from the template, so nothing that
 *   happens to a block at runtime can leak into the form value.
 * - Register BEFORE the editor initializes when pages ship pre-seeded block
 *   content (same bundle as the editor = always safe; early consumer calls
 *   are also safe — the loader's lazy stub replays them).
 */

(function () {
    'use strict';

    const STRINGS = {
        en: {
            alert: 'Alert', quote: 'Quote', table: 'Table',
            variants: { success: 'Success', info: 'Info', warning: 'Warning', error: 'Error' },
            alertTitle: 'Alert title', alertDesc: 'Alert text goes here.',
            quoteTitle: 'Quote title', quoteText: 'Quote text goes here.', quoteAuthor: 'Name', quoteRole: 'Role',
            col: 'Column',
            addRow: 'Add row', delRow: 'Remove row', addCol: 'Add column', delCol: 'Remove column'
        },
        ar: {
            alert: 'تنبيه', quote: 'اقتباس', table: 'جدول',
            variants: { success: 'نجاح', info: 'معلومة', warning: 'تحذير', error: 'خطأ' },
            alertTitle: 'عنوان التنبيه', alertDesc: 'نص التنبيه يظهر هنا.',
            quoteTitle: 'عنوان الاقتباس', quoteText: 'نص الاقتباس يظهر هنا.', quoteAuthor: 'الاسم', quoteRole: 'الصفة',
            col: 'عمود',
            addRow: 'إضافة صف', delRow: 'حذف صف', addCol: 'إضافة عمود', delCol: 'حذف عمود'
        }
    };
    const S = () => STRINGS[NDS.langKey];

    // One status op per variant — the current status shows as pressed, and
    // switching is a no-op when already there.
    const STATUS_ICONS = {
        success: 'hgi-checkmark-circle-02',
        info: 'hgi-information-circle',
        warning: 'hgi-alert-02',
        error: 'hgi-alert-circle'
    };
    const statusOps = {};
    for (const [v, label] of Object.entries(S().variants)) {
        statusOps[`status-${v}`] = {
            icon: STATUS_ICONS[v],
            label,
            pressed: (p) => p.variant === v,
            run: (p) => p.variant === v ? null : (p.variant = v, p)
        };
    }

    // Close button intentionally omitted: NDS.Alert's dismiss would delete
    // authored content outside the undo stack, and serialized output
    // shouldn't be dismissible either.
    NDS.Editor.registerBlock({
        name: 'alert',
        label: S().alert,
        icon: 'hgi-alert-02',
        variants: S().variants,
        slots: ['title', 'description'],
        defaults: { title: S().alertTitle, description: S().alertDesc },
        ops: statusOps,
        render: (p) => `<div class="nds-alert nds-card" data-status="${p.variant}" role="alert">` +
            `<span class="nds-feedback nds-alert-icon nds-outline"><span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span></span>` +
            `<div class="nds-alert-content"><div class="nds-alert-text">` +
            `<span class="nds-alert-title" data-nds-slot="title">${p.title}</span>` +
            `<p class="nds-alert-description" data-nds-slot="description">${p.description}</p>` +
            `</div></div></div>`
    });

    NDS.Editor.registerBlock({
        name: 'quote',
        label: S().quote,
        icon: 'hgi-quote-down',
        slots: ['title', 'text', 'author', 'role'],
        defaults: { title: S().quoteTitle, text: S().quoteText, author: S().quoteAuthor, role: S().quoteRole },
        render: (p) => `<figure class="nds-quote">` +
            `<blockquote class="nds-quote-body">` +
            `<span class="nds-quote-title" data-nds-slot="title">${p.title}</span>` +
            `<p class="nds-quote-text" data-nds-slot="text">${p.text}</p>` +
            `</blockquote>` +
            `<figcaption class="nds-quote-author"><div class="nds-persona nds-sm">` +
            `<div class="nds-avatar"><i class="nds-icon nds-icon-avatar" aria-hidden="true"></i></div>` +
            `<div class="nds-persona-info">` +
            `<cite class="nds-persona-name" data-nds-slot="author">${p.author}</cite>` +
            `<span class="nds-persona-desc" data-nds-slot="role">${p.role}</span>` +
            `</div></div></figcaption></figure>`
    });

    // Position helpers for the table ops: act on the last-focused cell,
    // falling back to the end of the table.
    const liveCell = (ctx) => {
        const c = ctx.lastCell;
        return (c && c.isConnected && ctx.blockEl.contains(c)) ? c : null;
    };
    const colIdx = (ctx, p) => {
        const c = liveCell(ctx);
        const cols = p.head.length || 1;
        return (c && c.cellIndex !== undefined) ? Math.min(c.cellIndex, cols - 1) : cols - 1;
    };
    const rowIdx = (ctx, p) => {
        const c = liveCell(ctx);
        if (!c) return p.rows.length - 1;
        const i = [...ctx.blockEl.querySelectorAll('tbody tr')].indexOf(c.closest('tr'));
        return i === -1 ? p.rows.length - 1 : i;
    };

    // Variable structure — the custom parse reads the DOM (wrapper-tolerant:
    // NDS.Tables may have reparented the table), render rebuilds any row
    // count. Cell text edits happen in place; structure changes go through
    // the data-level ops below (toolbar block-controls group).
    NDS.Editor.registerBlock({
        name: 'table',
        label: S().table,
        icon: 'hgi-layout-table-01',
        slots: ['head', 'rows'],
        // Cells accept NDS content (tags, buttons…) like real NDS tables do.
        slotContent: 'rich',
        defaults: { head: [`${S().col} 1`, `${S().col} 2`, `${S().col} 3`], rows: [['', '', ''], ['', '', '']] },
        render: (p) => `<table class="nds-table"><thead><tr>${
            p.head.map(h => `<th data-nds-slot="cell">${h}</th>`).join('')
        }</tr></thead><tbody>${
            p.rows.map(r => `<tr>${r.map(c => `<td data-nds-slot="cell">${c}</td>`).join('')}</tr>`).join('')
        }</tbody></table>`,
        parse: (el) => {
            const t = el.querySelector('table');
            if (!t) return null;
            return {
                head: [...t.querySelectorAll('thead th')].map(th => th.innerHTML),
                rows: [...t.querySelectorAll('tbody tr')].map(tr => [...tr.children].map(td => td.innerHTML))
            };
        },
        ops: {
            'row-add': {
                icon: 'hgi-insert-row', label: S().addRow,
                run: (p, ctx) => {
                    p.rows.splice(rowIdx(ctx, p) + 1, 0, new Array(p.head.length || 1).fill(''));
                    return p;
                }
            },
            'row-del': {
                icon: 'hgi-delete-row', label: S().delRow, destructive: true,
                run: (p, ctx) => {
                    if (p.rows.length <= 1) return null; // keep at least one body row
                    p.rows.splice(rowIdx(ctx, p), 1);
                    return p;
                }
            },
            'col-add': {
                icon: 'hgi-insert-column', label: S().addCol,
                run: (p, ctx) => {
                    const at = colIdx(ctx, p) + 1;
                    p.head.splice(at, 0, '');
                    p.rows.forEach(r => r.splice(at, 0, ''));
                    return p;
                }
            },
            'col-del': {
                icon: 'hgi-delete-column', label: S().delCol, destructive: true,
                run: (p, ctx) => {
                    if (p.head.length <= 1) return null; // keep at least one column
                    const at = colIdx(ctx, p);
                    p.head.splice(at, 1);
                    p.rows.forEach(r => r.splice(at, 1));
                    return p;
                }
            },
        }
    });
})();
