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
 *              after it with "(after)", or in place of the whole markup with "(replace)" while
 *              that element is in it (an HTML alert → its create() call)
 * A JS canon (data-lang="js") is one create() call. Its rows target `create()`, or
 * `create({ key: value })` to apply only while that option is set:
 *   key: value  set an option · canon #id  add a part's options
 * A JS call with a target previews in the card; one without (a toast) gets a Run button.
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
        if ((m = s.match(/^([a-z]\w*)\s*:\s*(.+)$/i))) return { kind: 'js', name: m[1], value: m[2] };
        return null;
    }

    // A JS canon is one call around one options object: keep the text around it, split the
    // object into its top-level entries. ponytail: no comments holding quotes or commas in a value.
    function parseCall(src) {
        var open = src.indexOf('{'), close = src.lastIndexOf('}'), body = src.slice(open + 1, close);
        var entries = [], depth = 0, q = null, start = 0;
        for (var i = 0; i <= body.length; i++) {
            var ch = body.charAt(i);
            if (q) { if (ch === '\\') i++; else if (ch === q) q = null; continue; }
            if (ch && '\'"`'.indexOf(ch) >= 0) q = ch;
            else if (ch && '([{'.indexOf(ch) >= 0) depth++;
            else if (ch && ')]}'.indexOf(ch) >= 0) depth--;
            else if ((ch === ',' && !depth) || i === body.length) {
                var m = body.slice(start, i).trim().match(/^(\w+)\s*:\s*([\s\S]+)$/);
                if (m) entries.push({ key: m[1], value: dedentTail(m[2]) });
                start = i + 1;
            }
        }
        return { head: src.slice(0, open + 1), tail: src.slice(close), entries: entries };
    }

    // A multi-line value keeps its lines relative to its closing bracket.
    function dedentTail(v) {
        var lines = v.split('\n');
        if (lines.length < 2) return v;
        var n = Math.min.apply(null, lines.slice(1).filter(function (l) { return l.trim(); }).map(function (l) { return l.match(/^ */)[0].length; }));
        return [lines[0]].concat(lines.slice(1).map(function (l) { return l.slice(n); })).join('\n');
    }

    function printCall(call) {
        return call.head + '\n' + call.entries.map(function (e) {
            return '  ' + e.key + ': ' + e.value.split('\n').join('\n  ');
        }).join(',\n') + '\n' + call.tail;
    }

    function jsSet(call, key, value) {
        var e = call.entries.filter(function (x) { return x.key === key; })[0];
        if (e) e.value = value; else call.entries.push({ key: key, value: value });
    }

    var isJs = function (target) { return /^create\(/.test(target || ''); };
    // `create()` matches any call; `create({ display: 'toast' })` only one with that option set.
    function callMatches(call, target) {
        var m = target.match(/^create\((?:\{\s*(\w+)\s*:\s*(.+?)\s*\})?\)$/);
        return !!m && (!m[1] || call.entries.some(function (e) { return e.key === m[1] && e.value === m[2]; }));
    }

    function applyJs(call, o) {
        var op = o.op;
        if (!callMatches(call, o.target)) return;
        if (op.kind === 'js') jsSet(call, op.name, op.value);
        else if (op.kind === 'insert') parseCall('{' + document.getElementById(op.id).textContent + '}').entries.forEach(function (e) { jsSet(call, e.key, e.value); });
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
            if (!op || op.kind === 'structure' || o.pos === 'replace') return;
            if ((op.kind === 'insert' ? 'insert' : op.kind === 'prop' ? 'prop' : 'markup') !== phase) return;
            // JS rows change a create() call, HTML rows the markup; each skips the other mode.
            if (isJs(o.target) || root.entries) { if (isJs(o.target) && root.entries) applyJs(root, o); return; }
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
    // An attribute the next choice sets again stays, so it keeps its place in the code.
    function unapply(root, choice, next) {
        choice.ops.forEach(function (o) {
            var op = o.op;
            if (!op) return;
            var again = next && next.ops.some(function (n) { return n.op && n.op.kind === op.kind && n.op.name === op.name && n.target === o.target; });
            if (again && (op.kind === 'attr' || op.kind === 'js')) return;
            if (isJs(o.target) || root.entries) {
                if (isJs(o.target) && root.entries && op.kind === 'js') root.entries = root.entries.filter(function (e) { return e.key !== op.name; });
                return;
            }
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
            var at = c[3].textContent.trim().match(/^(.*?)\s*(?:\((start|end|after|replace)\))?$/);
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
        var pristine = document.createElement('div'), base = document.createElement('div'), call = null;

        // A choice shows only when the element it changes is in the current markup ("Row" needs a group).
        function live(c) { return c.structure || c.ops.some(function (o) { return o.op; }); }
        function applies(c) {
            if (c.structure) return true;
            var ops = c.ops.filter(function (o) { return o.op && o.op.kind !== 'structure'; });
            return !ops.length || ops.some(function (o) {
                if (isJs(o.target)) return !!call && callMatches(call, o.target);
                // A replace shows while its element is in the markup it replaces.
                if (o.pos === 'replace') return !!base.querySelector(o.target);
                return !call && (!o.target || o.target === '—' || !!pristine.querySelector(o.target));
            });
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
            var srcEl = struct ? document.getElementById(struct) : script;
            base.innerHTML = srcEl.getAttribute('data-lang') === 'js' ? '' : dedent(srcEl.textContent);
            // ponytail: a (replace) swaps the whole markup, so it fits a target that is the root.
            order.forEach(function (g) {
                (active[g] ? active[g].ops : []).forEach(function (o) {
                    if (o.pos === 'replace' && base.querySelector(o.target)) srcEl = document.getElementById(o.op.id);
                });
            });
            var js = srcEl.getAttribute('data-lang') === 'js';
            call = js ? parseCall(dedent(srcEl.textContent)) : null;
            if (!js) pristine.innerHTML = dedent(srcEl.textContent);
            var root = call || pristine;
            order.forEach(function (g) { if (defaults[g] && active[g] !== defaults[g]) unapply(root, defaults[g], active[g]); });
            order.forEach(function (g) { if (active[g]) apply(root, active[g], 'insert'); });
            order.forEach(function (g) { if (active[g]) apply(root, active[g], 'markup'); });
            showApplicable();
            var html = js ? printCall(call) : serialize(pristine);

            NDS.Init.destroy(preview);
            // The code block names its language, so a swap between HTML and JS relabels it.
            var lang = js ? 'js' : 'html';
            if (!codeEl.classList.contains('lang-' + lang)) {
                codeEl.className = codeEl.className.replace(/\blang-\w+/, 'lang-' + lang);
                var tag = codeEl.closest('.nds-code').querySelector('.nds-code-lang');
                if (tag) tag.remove();
            }
            codeEl.textContent = html;
            if (codeEl.dataset.ndsCodeInitialized) NDS.Code.reprocessCodeElement(codeEl);
            preview.style.removeProperty('--card-bg');
            if (js) return renderCall(html);

            preview.innerHTML = html;
            order.forEach(function (g) { if (active[g]) apply(preview, active[g], 'prop'); });
            // On-color markup needs the deep surface behind it (the build sets it for the default state).
            preview.querySelector('.nds-oncolor') ? preview.style.setProperty('--card-bg', 'var(--background-primary-strong)') : preview.style.removeProperty('--card-bg');
            NDS.Init.mount(preview);
        }

        // A call with a target renders into the preview; one without (a toast) waits for Run.
        // Both run the code shown: the page's own canon, never user input.
        function renderCall(code) {
            preview.innerHTML = '';
            if (call.entries.some(function (e) { return e.key === 'target'; })) {
                jsSet(call, 'target', '__preview');
                new Function('__preview', printCall(call))(preview);
                return;
            }
            var run = document.createElement('button');
            run.type = 'button';
            run.className = 'nds-btn nds-primary nds-md';
            run.innerHTML = '<span class="nds-label">Run</span>';
            run.addEventListener('click', function () { new Function(code)(); });
            preview.appendChild(run);
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
