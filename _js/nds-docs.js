/**
 * NDS Docs — builder wiring for doc-page canon blocks (docs site only, no public surface).
 * _plugins/docs_canon.rb writes each builder's controls, preview, code block and options sheet at
 * build time; this file only answers them. A choice re-renders the preview FROM the code it shows
 * (one serialized source), then re-inits it, so preview and code cannot differ.
 *
 * Variants table Markup cell (CSS selector syntax):
 *   .cls  class · [attr]  bare attribute · [attr="v"]  attribute · [data-state~="t"]  token
 *   --prop: v  inline custom property · .prop = v  JS property · remove  delete "On element"
 *   canon #id  in the Structure (or Example) group: swap the whole markup; elsewhere: insert that part block
 *              into "On element", at its end, its start with "(start)", or right
 *              after it with "(after)"
 * `data-js="id"` on the base canon names its JS form, one create() call, shown in a JS code tab
 * beside the HTML one. JS rows target `create()`, or `create({ key: value })` to apply only
 * while that option is set:  key: value  set an option · canon #id  add a part's options.
 * A JS-only structure (data-lang="js", e.g. a toast) previews as a Run button.
 * The section action holds Options; the sheet holds Reset and a chip row per group. A chip that does not apply
 * stays in place, disabled, and its row label says why (data-needs).
 * Rows sharing Group + Option are one choice.
 */
(function () {
    'use strict';

    var VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
    // The group whose rows swap the whole markup. A reference page (grid) names it Example.
    var STRUCT = /^(Structure|Example)$/;

    // An option's name without its markers: (default), (demo: + Other), (hint: text).
    function label(o) { return o.replace(/\s*\((default|demo:\s*\+[^)]*|hint:[^)]*)\)/g, ''); }

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
        if (s === 'remove') return { kind: 'remove' };
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
    // `create():not({ key: value })` matches any call without that option.
    function callMatches(call, target) {
        var m = target.match(/^create\((?:\{\s*(\w+)\s*:\s*(.+?)\s*\})?\)(?::not\(\{\s*(\w+)\s*:\s*(.+?)\s*\}\))?$/);
        var has = function (k, v) { return call.entries.some(function (e) { return e.key === k && e.value === v; }); };
        return !!m && (!m[1] || has(m[1], m[2])) && !(m[3] && has(m[3], m[4]));
    }

    function applyJs(call, o) {
        var op = o.op;
        if (!callMatches(call, o.target)) return;
        if (op.kind === 'js') jsSet(call, op.name, op.value);
        else if (op.kind === 'insert') partOf(op.id).entries.forEach(function (e) { jsSet(call, e.key, e.value); });
    }

    // A JS part canon is a run of options, `actions: [...]`.
    function partOf(id) { return parseCall('{' + document.getElementById(id).textContent + '}'); }

    function targets(root, sel) {
        return !sel || sel === '—' ? [root.firstElementChild] : Array.prototype.slice.call(root.querySelectorAll(sel));
    }

    // Insert a part block as el's first or last child, indented to match its siblings.
    // `after` puts it right after el instead, as el's next sibling.
    function insert(el, html, pos) {
        var kids = el.childNodes, first = kids[0], last = kids[kids.length - 1];
        var tail = function (n) { return n && n.nodeType === 3 ? (n.textContent.match(/\n([ \t]*)$/) || [])[1] : null; };
        var ind = pos === 'after' ? tail(el.previousSibling) || '' : tail(first);
        // An empty element (a badge into an icon) opens onto its own lines, one level in.
        if (!first && pos !== 'after') {
            var own = tail(el.previousSibling) || '';
            ind = own + '  ';
            el.appendChild(document.createTextNode('\n' + own));
            first = last = el.firstChild;
            pos = 'end';
        }
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
            // JS rows change a create() call, HTML rows the markup; each skips the other mode.
            if (isJs(o.target) || root.entries) { if (isJs(o.target) && root.entries) applyJs(root, o); return; }
            targets(root, o.target).forEach(function (el) {
                if (op.kind === 'insert') insert(el, dedent(document.getElementById(op.id).textContent), o.pos);
                else if (op.kind === 'remove') {
                    // Take the line break before it too, so the code keeps its indentation.
                    if (el.previousSibling && el.previousSibling.nodeType === 3) el.previousSibling.remove();
                    el.remove();
                }
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
                if (!isJs(o.target) || !root.entries) return;
                var keys = op.kind === 'js' ? [op.name] : op.kind === 'insert' ? partOf(op.id).entries.map(function (e) { return e.key; }) : [];
                root.entries = root.entries.filter(function (e) { return keys.indexOf(e.key) < 0; });
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
            // `canon #id` swaps the markup in the Structure (or Example) group; anywhere else it inserts a part block.
            if (op && op.kind === 'structure' && !STRUCT.test(group)) op.kind = 'insert';
            var at = c[3].textContent.trim().match(/^(.*?)\s*(?:\((start|end|after)\))?$/);
            if (!byKey[key]) { byKey[key] = { key: key, group: group, option: option, ops: [] }; choices.push(byKey[key]); }
            byKey[key].ops.push({ op: op, target: at[1], pos: at[2] || 'end' });
            if (op && op.kind === 'structure') byKey[key].structure = op.id;
        });
        return choices;
    }

    function wire(bar) {
        var script = document.getElementById(bar.getAttribute('data-builder-for'));
        var jsEl = script.hasAttribute('data-js') ? document.getElementById(script.getAttribute('data-js')) : null;
        // The build writes the Preview divider, the preview and the code right after the canon.
        // A data-live canon changes the page's own copy instead (its footer), rebuilt from a clean clone.
        var liveEl = script.hasAttribute('data-live') ? document.querySelector(script.getAttribute('data-live')) : null;
        var liveOrig = liveEl && liveEl.cloneNode(true);
        var preview = liveEl ? null : script.nextElementSibling.nextElementSibling;
        var block = liveEl ? script.nextElementSibling : preview.nextElementSibling;
        var codeHtml = block.querySelector('code.lang-html'), codeJs = block.querySelector('code.lang-js');
        var tabHtml = block.querySelector('[role="tab"][aria-controls$="-html"]');
        // The options sheet holds every choice.
        var sheet = document.getElementById(script.id + '-options');
        var reset = sheet.querySelector('[data-builder-reset]');
        var controls = function () { return Array.prototype.slice.call(sheet.querySelectorAll('[data-builder-option]')); };
        // The sheet covers the lower part of the screen: bring the preview up above it, unless
        // enough of it (160px, or all of a shorter one) already shows between header and sheet.
        sheet.addEventListener('nds:panel:opened', function () {
            // A live copy sits below a top sheet: bring it up unless it already shows below the sheet.
            if (liveEl) {
                var lb = liveEl.getBoundingClientRect();
                if (lb.top < sheet.getBoundingClientRect().bottom || lb.top > window.innerHeight - 160) {
                    backTo = window.scrollY;
                    liveEl.scrollIntoView({ block: 'end', behavior: 'smooth' });
                }
                return;
            }
            var box = preview.getBoundingClientRect(), top = box.top, head = NDS.stickyHeaderBottom();
            if (top >= head && top + Math.min(box.height, 160) <= sheet.getBoundingClientRect().top) return;
            window.scrollTo({ top: top + window.scrollY - head - 16, behavior: 'smooth' });
        });
        // Scrolling away to the live copy on open is undone on close, back to the markup.
        var backTo = null;
        sheet.addEventListener('nds:panel:closed', function () {
            if (backTo != null) window.scrollTo({ top: backTo, behavior: 'smooth' });
            backTo = null;
        });
        var byKey = {}, order = [], active = {}, defaults = {}, sizes = {}, combos = {}, picks = {};
        readTable(script.getAttribute('data-variants')).forEach(function (c) {
            byKey[c.key] = c;
            sizes[c.group] = (sizes[c.group] || 0) + 1;
            if (order.indexOf(c.group) < 0) order.push(c.group);
            if (/\(default\)/.test(c.option)) defaults[c.group] = c;
            // "Tags + Rating": the markup for those chips on together, so the group is multi-select.
            if (/ \+ /.test(label(c.option))) (combos[c.group] = combos[c.group] || []).push(c);
        });
        sheet.querySelectorAll('[data-builder-option][data-state~="selected"]').forEach(function (it) {
            var c = byKey[it.getAttribute('data-builder-option')];
            if (c) active[c.group] = c;
        });
        // A group with no chip on starts on its default (None has no chip).
        order.forEach(function (g) { if (!active[g] && defaults[g]) active[g] = defaults[g]; });
        var pristine = document.createElement('div'), call = null, html = false;

        // A choice is enabled only when the element it changes is in the current markup ("Row" needs a group).
        function live(c) { return c.structure || c.ops.some(function (o) { return o.op; }); }
        function applies(c) {
            if (c.structure) return true;
            var ops = c.ops.filter(function (o) { return o.op; });
            return !ops.length || ops.some(function (o) {
                if (isJs(o.target)) return !!call && callMatches(call, o.target);
                return html && (!o.target || o.target === '—' || !!pristine.querySelector(o.target));
            });
        }
        function showApplicable() {
            controls().forEach(function (btn) {
                btn.disabled = !applies(byKey[btn.getAttribute('data-builder-option')]);
            });
            // A row whose options all do not apply says why in its label (touch screens have no hover).
            sheet.querySelectorAll('[data-builder-group]').forEach(function (d) {
                var off = !Array.prototype.some.call(d.nextElementSibling.querySelectorAll('[data-builder-option]:not(:disabled)'), function (b) {
                    return live(byKey[b.getAttribute('data-builder-option')]);
                });
                var need = d.getAttribute('data-needs');
                d.textContent = d.getAttribute('data-builder-group') + (off && need ? ' · ' + need : '');
            });
            reset.disabled = order.every(function (g) { return (active[g] || null) === (defaults[g] || null); });
        }

        function render() {
            var sg = order.filter(function (g) { return STRUCT.test(g); })[0];
            var struct = sg && active[sg] && active[sg].structure;
            var srcEl = struct ? document.getElementById(struct) : script;
            // A JS-only structure (a toast) has no HTML form.
            html = srcEl.getAttribute('data-lang') !== 'js';
            var callEl = html ? jsEl : srcEl;
            pristine.innerHTML = html ? dedent(srcEl.textContent) : '';
            call = callEl ? parseCall(dedent(callEl.textContent)) : null;
            [html && pristine, call].forEach(function (root) {
                if (!root) return;
                order.forEach(function (g) { if (defaults[g] && active[g] !== defaults[g]) unapply(root, defaults[g], active[g]); });
                // A default choice is the canon as written, so it adds nothing.
                order.forEach(function (g) { if (active[g] && active[g] !== defaults[g]) apply(root, active[g], 'insert'); });
                order.forEach(function (g) { if (active[g] && active[g] !== defaults[g]) apply(root, active[g], 'markup'); });
            });
            showApplicable();

            var out = html ? serialize(pristine) : '', js = call ? printCall(call) : '';
            [[codeHtml, out], [codeJs, js]].forEach(function (pair) {
                if (!pair[0] || !pair[1]) return;
                pair[0].textContent = pair[1];
                if (pair[0].dataset.ndsCodeInitialized) NDS.Code.reprocessCodeElement(pair[0]);
            });
            if (tabHtml) {
                tabHtml.hidden = !html;
                // Through the Tabs API: a synthetic click lands outside the open sheet and closes it.
                if (!html && tabHtml.getAttribute('aria-selected') === 'true' && block.ndsTabs) block.ndsTabs.switchTo(1);
            }

            if (liveEl) return renderLive();
            NDS.Init.destroy(preview);
            preview.style.removeProperty('--card-bg');
            if (!html) return runButton(js);
            preview.innerHTML = out;
            order.forEach(function (g) { if (active[g]) apply(preview, active[g], 'prop'); });
            // On-color markup needs the deep surface behind it (the build sets it for the default state).
            if (preview.querySelector('.nds-oncolor')) preview.style.setProperty('--card-bg', 'var(--background-primary-strong)');
            NDS.Init.mount(preview);
        }

        // The live copy is rebuilt from its clean clone, then gets the same choices as the code.
        function renderLive() {
            NDS.Init.destroy(liveEl);
            var fresh = liveOrig.cloneNode(true);
            liveEl.replaceWith(fresh);
            liveEl = fresh;
            var root = {
                firstElementChild: liveEl,
                querySelectorAll: function (s) { return [liveEl].concat(Array.prototype.slice.call(liveEl.querySelectorAll(s))).filter(function (e) { return e.matches(s); }); }
            };
            order.forEach(function (g) { if (defaults[g] && active[g] !== defaults[g]) unapply(root, defaults[g], active[g]); });
            order.forEach(function (g) { if (active[g] && active[g] !== defaults[g]) apply(root, active[g], 'insert'); });
            order.forEach(function (g) { if (active[g] && active[g] !== defaults[g]) apply(root, active[g], 'markup'); });
            NDS.Init.mount(liveEl);
        }

        // A JS-only structure previews as a Run button that runs the code shown:
        // the page's own canon, never user input.
        function runButton(code) {
            preview.innerHTML = '<button type="button" class="nds-btn nds-primary nds-md"><span class="nds-label">Run</span></button>';
            preview.firstChild.addEventListener('click', function () { new Function(code)(); });
        }

        function set(c, on) {
            active[c.group] = on ? c : null;
            if (combos[c.group]) picks[c.group] = on && c !== defaults[c.group] ? [c] : [];
            paint(c.group);
        }
        function paint(g) {
            controls().forEach(function (btn) {
                var o = byKey[btn.getAttribute('data-builder-option')];
                if (o.group !== g) return;
                var sel = combos[g] ? (picks[g] || []).indexOf(o) >= 0 : active[g] === o;
                sel ? btn.setAttribute('data-state', 'selected') : btn.removeAttribute('data-state');
                btn.setAttribute('aria-pressed', String(sel));
            });
        }
        var isNone = function (c) { return !!c && label(c.option) === 'None'; };
        // Several chips on at once resolve to the combo row made of exactly them.
        function toggle(c) {
            var g = c.group, list = (picks[g] || []).slice(), i = list.indexOf(c);
            i >= 0 ? list.splice(i, 1) : list.push(c);
            var names = list.map(function (o) { return label(o.option); }).sort().join('|');
            var combo = combos[g].filter(function (k) { return label(k.option).split(' + ').sort().join('|') === names; })[0];
            if (list.length > 1 && !combo) list = [c];
            picks[g] = list;
            active[g] = list.length > 1 ? combo : list[0] || defaults[g] || null;
            paint(g);
        }

        reset.addEventListener('click', function () {
            order.forEach(function (g) {
                if (defaults[g]) set(defaults[g], true);
                else if (active[g] || (picks[g] || []).length) set(active[g] || picks[g][0], false);
            });
            render();
        });

        // `Option (demo: + Other)` also turns on option "Other" — a demo aid (Neutral shows only when checked).
        function choose(e) {
            var btn = e.target.closest('[data-builder-option]');
            var c = btn && byKey[btn.getAttribute('data-builder-option')];
            if (!c) return;
            // A multi-select group toggles each chip; a group whose default is None turns off when
            // its chosen chip is tapped again; any other group is pick-one; a single option toggles.
            var on = true;
            if (combos[c.group]) toggle(c);
            else if (sizes[c.group] > 1 && active[c.group] === c && isNone(defaults[c.group])) set(defaults[c.group], true);
            else { on = sizes[c.group] > 1 || active[c.group] !== c; set(c, on); }
            var plus = on && c.option.match(/\(demo:\s*\+\s*([^)]+)\)/);
            if (plus) Object.keys(byKey).forEach(function (k) {
                var oc = byKey[k];
                if (oc !== c && label(oc.option) === plus[1].trim()) set(oc, true);
            });
            render();
        }
        sheet.addEventListener('click', choose);
    }

    // The chips are built at site build; the Variants table is read only when the sheet first opens.
    document.querySelectorAll('[data-builder-for]').forEach(function (bar) {
        bar.querySelector('[data-panel-toggle]').addEventListener('click', function () { wire(bar); }, { once: true });
    });

})();
