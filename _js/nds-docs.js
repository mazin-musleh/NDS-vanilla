/**
 * NDS Docs — builder wiring for doc-page canon blocks (docs site only, no public surface).
 * _plugins/docs_canon.rb writes each builder's toolbar, preview and code block at build time;
 * this file only answers the toolbar. A choice re-renders the preview FROM the code it shows
 * (one serialized source), then re-inits it, so preview and code cannot differ.
 *
 * Variants table Markup cell (CSS selector syntax):
 *   .cls  class · [attr]  bare attribute · [attr="v"]  attribute · [data-state~="t"]  token
 *   --prop: v  inline custom property · .prop = v  JS property
 *   canon #id  in the Structure group: swap the whole markup; elsewhere: insert that part block
 *              into "On element", at its end, its start with "(start)", or right
 *              after it with "(after)"
 * Rows sharing Group + Option are one choice.
 */
(function () {
    'use strict';

    var VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;

    function dedent(s) {
        s = s.replace(/^\s*\n/, '').replace(/\s+$/, '');
        var m = s.match(/^[ \t]*(?=\S)/gm) || [''];
        var n = Math.min.apply(null, m.map(function (x) { return x.length; }));
        return s.replace(new RegExp('^[ \\t]{' + n + '}', 'gm'), '');
    }

    // innerHTML writes bare attributes as attr="" — keep them bare, keep text verbatim.
    function serialize(node) {
        var out = '';
        node.childNodes.forEach(function (c) {
            if (c.nodeType === 3) { out += c.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;'); return; }
            if (c.nodeType === 8) { out += '<!--' + c.data + '-->'; return; }
            if (c.nodeType !== 1) return;
            var tag = c.tagName.toLowerCase();
            out += '<' + tag;
            Array.prototype.forEach.call(c.attributes, function (a) {
                out += a.value === '' ? ' ' + a.name : ' ' + a.name + '="' + a.value.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"';
            });
            out += '>';
            if (VOID.test(tag)) return;
            out += serialize(c) + '</' + tag + '>';
        });
        return out;
    }

    function parseOp(cell) {
        var s = cell.trim(), m;
        if ((m = s.match(/^\.([\w-]+)\s*=\s*(.+)$/))) return { kind: 'prop', name: m[1], value: JSON.parse(m[2]) };
        if ((m = s.match(/^\.([\w-]+)$/))) return { kind: 'class', name: m[1] };
        if ((m = s.match(/^\[([\w-]+)~="([^"]*)"\]$/))) return { kind: 'token', name: m[1], value: m[2] };
        if ((m = s.match(/^\[([\w-]+)(?:="([^"]*)")?\]$/))) return { kind: 'attr', name: m[1], value: m[2] == null ? '' : m[2] };
        if ((m = s.match(/^(--[\w-]+)\s*:\s*(.+)$/))) return { kind: 'style', name: m[1], value: m[2] };
        if ((m = s.match(/^canon #([\w-]+)$/))) return { kind: 'structure', id: m[1] };
        return null;
    }

    function targets(root, sel) {
        return !sel || sel === '—' ? [root.firstElementChild] : Array.prototype.slice.call(root.querySelectorAll(sel));
    }

    // Insert a part block as el's first or last child, indented to match its siblings.
    // `after` puts it right after el instead, as el's next sibling.
    function insert(el, html, pos) {
        var kids = el.childNodes, first = kids[0], last = kids[kids.length - 1];
        var tail = function (n) { return n && n.nodeType === 3 ? (n.textContent.match(/\n([ \t]*)$/) || [])[1] : null; };
        var ind = pos === 'after' ? tail(el.previousSibling) || '' : tail(first);
        if (ind == null) ind = (tail(last) || '') + '  ';
        var t = document.createElement('template');
        t.innerHTML = html.split('\n').join('\n' + ind);
        if (pos === 'after') {
            var next = el.nextSibling;
            el.parentNode.insertBefore(document.createTextNode('\n' + ind), next);
            el.parentNode.insertBefore(t.content, next);
        } else if (pos === 'start') {
            t.content.appendChild(document.createTextNode('\n' + ind));
            el.insertBefore(t.content, first && first.nodeType === 3 ? first.nextSibling : first);
        } else {
            var ref = last && last.nodeType === 3 ? last : null;
            el.insertBefore(document.createTextNode('\n' + ind), ref);
            el.insertBefore(t.content, ref);
        }
    }

    // Phase 'insert' adds part blocks, 'markup' the rest; JS properties ('prop') go on the live preview only.
    function apply(root, choice, phase) {
        choice.ops.forEach(function (o) {
            var op = o.op;
            if (!op || op.kind === 'structure') return;
            if ((op.kind === 'insert' ? 'insert' : op.kind === 'prop' ? 'prop' : 'markup') !== phase) return;
            targets(root, o.target).forEach(function (el) {
                if (op.kind === 'insert') insert(el, dedent(document.getElementById(op.id).textContent), o.pos);
                else if (op.kind === 'class') el.classList.add(op.name);
                else if (op.kind === 'attr') el.setAttribute(op.name, op.value);
                else if (op.kind === 'token') {
                    var set = (el.getAttribute(op.name) || '').split(/\s+/).filter(Boolean);
                    if (set.indexOf(op.value) < 0) set.push(op.value);
                    el.setAttribute(op.name, set.join(' '));
                } else if (op.kind === 'style') el.style.setProperty(op.name, op.value);
                else if (op.kind === 'prop') el[op.name] = op.value;
            });
        });
    }

    // A `(default)` row describes the canon as written; picking another option in its group removes it.
    function unapply(root, choice) {
        choice.ops.forEach(function (o) {
            var op = o.op;
            if (!op) return;
            targets(root, o.target).forEach(function (el) {
                if (op.kind === 'class') el.classList.remove(op.name);
                else if (op.kind === 'attr') el.removeAttribute(op.name);
                else if (op.kind === 'token') {
                    var set = (el.getAttribute(op.name) || '').split(/\s+/).filter(function (t) { return t && t !== op.value; });
                    set.length ? el.setAttribute(op.name, set.join(' ')) : el.removeAttribute(op.name);
                } else if (op.kind === 'style') el.style.removeProperty(op.name);
            });
        });
    }

    function readTable(id) {
        var table = document.getElementById(id);
        if (!table) { console.warn('[NDS Docs] no Variants table #' + id); return []; }
        var byKey = {}, choices = [];
        Array.prototype.forEach.call(table.tBodies[0].rows, function (tr) {
            var c = tr.cells, group = c[0].textContent.trim(), option = c[1].textContent.trim();
            var key = group + '|' + option, op = parseOp(c[2].textContent);
            if (!op && c[2].textContent.trim() !== '—') console.warn('[NDS Docs] unparsed Markup cell:', c[2].textContent.trim());
            // `canon #id` swaps the markup in the Structure group; anywhere else it inserts a part block.
            if (op && op.kind === 'structure' && group !== 'Structure') op.kind = 'insert';
            var at = c[3].textContent.trim().match(/^(.*?)\s*(?:\((start|end|after)\))?$/);
            if (!byKey[key]) { byKey[key] = { key: key, group: group, option: option, ops: [] }; choices.push(byKey[key]); }
            byKey[key].ops.push({ op: op, target: at[1], pos: at[2] || 'end' });
            if (op && op.kind === 'structure') byKey[key].structure = op.id;
        });
        return choices;
    }

    function wire(bar) {
        var script = document.getElementById(bar.getAttribute('data-builder-for'));
        var baseSrc = dedent(script.textContent);
        var preview = bar.nextElementSibling.nextElementSibling;
        var codeEl = preview.nextElementSibling.querySelector('code');
        var byKey = {}, order = [], active = {}, defaults = {};
        readTable(script.getAttribute('data-variants')).forEach(function (c) {
            byKey[c.key] = c;
            if (order.indexOf(c.group) < 0) order.push(c.group);
            if (/\(default\)/.test(c.option)) defaults[c.group] = c;
        });
        bar.querySelectorAll('.nds-dropmenu-item[data-state~="selected"]').forEach(function (it) {
            var c = byKey[it.getAttribute('data-builder-option')];
            if (c) active[c.group] = c;
        });
        var pristine = document.createElement('div');

        // A choice shows only when the element it changes is in the current markup ("Row" needs a group).
        function live(c) { return c.structure || c.ops.some(function (o) { return o.op; }); }
        function applies(c) {
            var ops = c.ops.filter(function (o) { return o.op && o.op.kind !== 'structure'; });
            return !ops.length || ops.some(function (o) { return !o.target || o.target === '—' || pristine.querySelector(o.target); });
        }
        function showApplicable() {
            bar.querySelectorAll('[data-builder-option]').forEach(function (btn) {
                btn.hidden = !applies(byKey[btn.getAttribute('data-builder-option')]);
            });
            bar.querySelectorAll('.nds-dropmenu').forEach(function (dm) {
                dm.hidden = !Array.prototype.some.call(dm.querySelectorAll('.nds-dropmenu-item:not([hidden])'), function (it) {
                    return live(byKey[it.getAttribute('data-builder-option')]);
                });
            });
        }

        function render() {
            var struct = active.Structure && active.Structure.structure;
            pristine.innerHTML = struct ? dedent(document.getElementById(struct).textContent) : baseSrc;
            order.forEach(function (g) { if (defaults[g] && active[g] !== defaults[g]) unapply(pristine, defaults[g]); });
            order.forEach(function (g) { if (active[g]) apply(pristine, active[g], 'insert'); });
            showApplicable();
            order.forEach(function (g) { if (active[g]) apply(pristine, active[g], 'markup'); });
            var html = serialize(pristine);

            NDS.Init.destroy(preview);
            preview.innerHTML = html;
            order.forEach(function (g) { if (active[g]) apply(preview, active[g], 'prop'); });
            // On-color markup needs the deep surface behind it (the build sets it for the default state).
            preview.querySelector('.nds-oncolor') ? preview.style.setProperty('--card-bg', 'var(--background-primary-strong)') : preview.style.removeProperty('--card-bg');
            NDS.Init.mount(preview);

            codeEl.textContent = html;
            if (codeEl.dataset.ndsCodeInitialized) NDS.Code.reprocessCodeElement(codeEl);
        }

        function set(btn, on) {
            var c = byKey[btn.getAttribute('data-builder-option')];
            if (btn.classList.contains('nds-dropmenu-item')) {
                btn.parentNode.querySelectorAll('[data-state~="selected"]').forEach(function (x) { x.removeAttribute('data-state'); });
                btn.setAttribute('data-state', 'selected');
                btn.closest('.nds-dropmenu').querySelector('.nds-dropmenu-trigger .nds-label').textContent = c.group + ': ' + btn.textContent;
                active[c.group] = c;
            } else {
                btn.setAttribute('aria-pressed', String(on));
                on ? btn.setAttribute('data-state', 'selected') : btn.removeAttribute('data-state');
                active[c.group] = on ? c : null;
            }
        }

        // `Option (demo: + Other)` also turns on option "Other" — a demo aid (Neutral shows only when checked).
        var label = function (o) { return o.replace(/\s*\((default|demo:\s*\+[^)]*)\)/g, ''); };
        bar.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-builder-option]');
            var c = btn && byKey[btn.getAttribute('data-builder-option')];
            if (!c) return;
            var on = btn.classList.contains('nds-dropmenu-item') || btn.getAttribute('aria-pressed') !== 'true';
            set(btn, on);
            var plus = on && c.option.match(/\(demo:\s*\+\s*([^)]+)\)/);
            if (plus) {
                bar.querySelectorAll('[data-builder-option]').forEach(function (other) {
                    var oc = byKey[other.getAttribute('data-builder-option')];
                    if (oc !== c && label(oc.option) === plus[1].trim()) set(other, true);
                });
            }
            render();
        });
    }

    document.querySelectorAll('.nds-toolbar[data-builder-for]').forEach(wire);
})();
