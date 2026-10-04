/**
 * NDS Docs — builder wiring for doc-page canon blocks (docs site only, no public surface).
 * _plugins/docs_canon.rb writes each builder's controls, options, preview and code block at
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
 * data-preview="run" on an HTML canon does the same for markup that leaves the card (a FAB), with Clear.
 * data-preview="js" runs the JS tab after each render, for a component with no init (Sort).
 * data-preview="page": the canon is a whole <body>, or a part of one (the top bar), previewed as a page of its own in a frame.
 * data-harness="form" renders the preview inside a form with Validate and Reset buttons, outside the code.
 * The section action holds Reset and Options; Options shows a chip row per group, inline or in a panel. A chip that does not apply
 * stays in place, disabled, and its tooltip says why.
 * Rows sharing Group + Option are one choice.
 * Each preview card has Dark mode and Grid lines toggles in its corner. On a builder card, Dark puts
 * data-theme="dark" on the markup's outer element (code and preview) and on the card; elsewhere, on the card only.
 */
(function () {
    'use strict';

    var VOID = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
    // The group whose rows swap the whole markup. A reference page (grid) names it Example.
    var STRUCT = /^(Structure|Example)$/;
    // Markup that a form harness can fail on (docs_canon.rb RULE_RE is the same list).
    var RULES = '[data-required], [data-strict], .nds-required, [data-min-checked], [data-max-checked], [required], [pattern], [minlength], [min], [max], [type="email"], [type="url"], .nds-date-input';

    // An option's name without its markers: (default), (demo: + id), (hint: text), (id: name), (not: ids), (limit: n name).
    function label(o) { return o.replace(/\s*\((default|limit:[^)]*|demo:\s*\+[^)]*|hint:[^)]*|id:[^)]*|not:[^)]*)\)/g, ''); }

    function dedent(s) {
        s = s.replace(/^\s*\n/, '').replace(/\s+$/, '');
        var m = s.match(/^[ \t]*(?=\S)/gm) || [''];
        var n = Math.min.apply(null, m.map(function (x) { return x.length; }));
        return s.replace(new RegExp('^[ \\t]{' + n + '}', 'gm'), '');
    }

    // innerHTML writes bare attributes as attr="" — keep them bare, keep text verbatim.
    function serialize(node) {
        var out = '';
        // A textarea, script or style holds its text raw: an escaped <h2> there shows as &lt;h2>.
        var raw = /^(TEXTAREA|SCRIPT|STYLE)$/.test(node.nodeName);
        node.childNodes.forEach(function (c) {
            if (c.nodeType === 3) { out += raw ? c.textContent : c.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;'); return; }
            if (c.nodeType === 8) { out += '<!--' + c.data + '-->'; return; }
            if (c.nodeType !== 1) return;
            var tag = c.tagName.toLowerCase();
            out += '<' + tag;
            Array.prototype.forEach.call(c.attributes, function (a) {
                if (a.value === '') { out += ' ' + a.name; return; }
                var v = a.value.replace(/&/g, '&amp;');
                // A JSON value keeps its own quotes readable inside single quotes, as the canon writes it.
                out += /"/.test(v) && !/'/.test(v) ? ' ' + a.name + "='" + v + "'" : ' ' + a.name + '="' + v.replace(/"/g, '&quot;') + '"';
            });
            out += '>';
            if (VOID.test(tag)) return;
            // A <template> keeps its markup in .content, not in its child nodes.
            out += serialize(tag === 'template' ? c.content : c) + '</' + tag + '>';
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

    // A lazy canon keeps its element in a <template>, which querySelectorAll does not enter.
    function targets(root, sel) {
        // A page canon parses to a document: its outer element is <body>.
        if (!sel || sel === '—') return [root.body || root.firstElementChild];
        var found = Array.prototype.slice.call(root.querySelectorAll(sel));
        Array.prototype.forEach.call(root.querySelectorAll('template'), function (t) {
            found = found.concat(targets(t.content, sel));
        });
        return found;
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

    // A default part (the canon carries a copy): remove the copy, found by its markup.
    function removePart(root, id) {
        var flat = function (h) { return h.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim(); };
        var t = document.createElement('template');
        t.innerHTML = dedent(document.getElementById(id).textContent);
        Array.prototype.forEach.call(t.content.children, function (k) {
            var el = Array.prototype.filter.call(root.querySelectorAll(k.tagName), function (x) { return flat(x.outerHTML) === flat(k.outerHTML); })[0];
            if (!el) return;
            // Its own line goes with it.
            if (el.previousSibling && el.previousSibling.nodeType === 3) el.previousSibling.remove();
            el.remove();
        });
    }

    function readTable(id) {
        var table = document.getElementById(id);
        if (!table) { console.warn('[NDS Docs] no Variants table #' + id); return []; }
        var byKey = {}, choices = [];
        Array.prototype.forEach.call(table.tBodies[0].rows, function (tr) {
            var c = tr.cells, group = c[0].textContent.trim(), option = c[1].textContent.trim();
            // kramdown keeps the backslash of a cell's `\|` inside a code span.
            var key = group + '|' + option, op = parseOp(c[2].textContent.replace(/\\\|/g, '|'));
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
        // The build writes the options, the Preview divider, the preview and the code right after the canon.
        // A data-live canon changes the page's own copy instead (its footer), rebuilt from a clean clone.
        var liveEl = script.hasAttribute('data-live') ? document.querySelector(script.getAttribute('data-live')) : null;
        var liveOrig = liveEl && liveEl.cloneNode(true);
        // The options sit inline or in a panel (4 rows or more).
        var sheet = script.nextElementSibling;
        var preview = sheet.nextElementSibling.nextElementSibling;
        var block = preview.nextElementSibling;
        var codeHtml = block.querySelector('code.lang-html'), codeJs = block.querySelector('code.lang-js');
        var tabHtml = block.querySelector('[role="tab"][aria-controls$="-html"]');
        var reset = bar.querySelector('[data-builder-reset]');
        var controls = function () { return Array.prototype.slice.call(sheet.querySelectorAll('[data-builder-option]')); };
        // The panel covers the lower part of the screen: bring the preview into the space between
        // header and panel. One that fits is centered there, unless it already shows whole; a taller
        // one goes up under the header, unless 160px of it already shows.
        sheet.addEventListener('nds:panel:opened', function () {
            // A live copy sits below a top panel: bring it up unless it already shows below the panel.
            if (liveEl) {
                var lb = liveEl.getBoundingClientRect();
                if (lb.top < sheet.getBoundingClientRect().bottom || lb.top > window.innerHeight - 160) {
                    backTo = window.scrollY;
                    liveEl.scrollIntoView({ block: 'end', behavior: 'smooth' });
                }
                return;
            }
            // The free space is below a top panel, or between the header and a bottom panel.
            var box = preview.getBoundingClientRect(), top = box.top, s = sheet.getBoundingClientRect();
            var down = sheet.getAttribute('data-panel-side') === 'top';
            var head = down ? s.bottom : NDS.stickyHeaderBottom();
            var room = (down ? window.innerHeight : s.top) - head, fits = box.height <= room - 32;
            if (top >= head && top + (fits ? box.height : 160) <= head + room) return;
            var at = fits ? head + (room - box.height) / 2 : head + 16;
            window.scrollTo({ top: top + window.scrollY - at, behavior: 'smooth' });
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
            // `Group (any)`: each chip is its own on/off group, so any mix of them stacks.
            if (/ \(any\)$/.test(c.group)) c.group += '|' + c.option;
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
        var pristine = document.createElement('div'), call = null, html = false, dark = false, darkWins = false, wasOncolor = false;
        var page = script.getAttribute('data-preview') === 'page';

        // A choice is enabled only when the element it changes is in the current markup ("Row" needs a group).
        // `(not: home)`: off while the structure marked `(id: home)` is chosen.
        function excluded(c) {
            var not = c.option.match(/\(not:\s*([^)]*)\)/), sg = order.filter(function (g) { return STRUCT.test(g); })[0];
            var id = not && sg && active[sg] && (active[sg].option.match(/\(id:\s*([\w-]+)\)/) || [])[1];
            return !!id && not[1].split(/[\s,]+/).indexOf(id) >= 0;
        }
        // `(limit: 2 widgets)`: once that many chips sharing it are on, the others stay off.
        var limitOf = function (c) { var m = c.option.match(/\(limit:\s*([^)]+)\)/); return m && m[1]; };
        function applies(c) {
            if (c.structure) return true;
            if (excluded(c)) return false;
            var lim = limitOf(c);
            if (lim && active[c.group] !== c && order.filter(function (g) { return active[g] && limitOf(active[g]) === lim; }).length >= parseInt(lim, 10)) return false;
            // A `—` row with a target (a default that fits only some structures) is checked too.
            var ops = c.ops.filter(function (o) { return o.op || (o.target && o.target !== '—'); });
            // Like the build, a descendant target never gates when the choice has a one-element target.
            var own = ops.filter(function (o) { return !/[\s>+~]/.test((o.target || '').replace(/\([^)]*\)/g, '')); });
            if (own.length) ops = own;
            return !ops.length || ops.some(function (o) {
                if (isJs(o.target)) return !!call && callMatches(call, o.target);
                // A chosen `remove` row took its own target away: it stays on, so it can be turned off.
                if (o.op && o.op.kind === 'remove' && active[c.group] === c) return true;
                return html && (!o.target || o.target === '—' || targets(pristine, o.target).length > 0);
            });
        }
        function showApplicable() {
            controls().forEach(function (btn) {
                var off = !applies(byKey[btn.getAttribute('data-builder-option')]);
                NDS.State[off ? 'add' : 'remove'](btn, 'disabled');
                off ? btn.setAttribute('aria-disabled', 'true') : btn.removeAttribute('aria-disabled');
                if (!off && btn.ndsTooltip) btn.ndsTooltip.close();
                // One balloon serves both texts: the hint while on, the reason while off.
                var msg = btn.getAttribute(off ? 'data-reason' : 'data-hint');
                var p = msg && btn.ndsTooltip && btn.ndsTooltip.balloon && btn.ndsTooltip.balloon.querySelector('.nds-tooltip-message');
                if (p) p.textContent = msg;
                // A reason shows at once, a hint after a pause.
                // ponytail: Tooltip reads the delay only at init, so the instance field is set too; drop it once Tooltip reads the attribute per hover.
                if (btn.hasAttribute('data-tooltip-hover')) btn.setAttribute('data-tooltip-hover', off ? '0' : '500');
                if (btn.ndsTooltip) btn.ndsTooltip._hoverDelay = off ? 0 : 500;
            });
        }

        var partIds = function (c) { return c.ops.filter(function (o) { return o.op && o.op.kind === 'insert'; }).map(function (o) { return o.op.id; }); };
        var isPart = function (c) { return !!c && partIds(c).length > 0; };

        function render() {
            var sg = order.filter(function (g) { return STRUCT.test(g); })[0];
            var struct = sg && active[sg] && active[sg].structure;
            var srcEl = struct ? document.getElementById(struct) : script;
            // A JS-only structure (a toast) has no HTML form.
            html = srcEl.getAttribute('data-lang') !== 'js';
            var callEl = html ? jsEl : srcEl;
            // A page canon is a whole <body>, which innerHTML drops: it parses as a document.
            if (page) pristine = new DOMParser().parseFromString(dedent(srcEl.textContent), 'text/html');
            else pristine.innerHTML = html ? dedent(srcEl.textContent) : '';
            call = callEl ? parseCall(dedent(callEl.textContent)) : null;
            [html && pristine, call].forEach(function (root) {
                if (!root) return;
                var dom = root !== call;
                // A default part comes out first and goes back in with the chosen parts, in table order,
                // so any mix keeps one order.
                if (dom) order.forEach(function (g) { if (isPart(defaults[g])) partIds(defaults[g]).forEach(function (id) { removePart(root, id); }); });
                var undo = function () { order.forEach(function (g) { if (defaults[g] && active[g] !== defaults[g] && !(dom && isPart(defaults[g]))) unapply(root, defaults[g], active[g]); }); };
                // A JS call drops a default before the parts go in; markup drops it after, so it leaves a part put back too.
                if (!dom) undo();
                // A default choice is the canon as written, so it adds nothing.
                // An option the structure excludes stays chosen, but adds nothing until a structure takes it.
                var on = function (g) { var c = active[g]; return c && (c !== defaults[g] || (dom && isPart(c))) && !excluded(c); };
                order.forEach(function (g) { if (on(g)) apply(root, active[g], 'insert'); });
                if (dom) undo();
                order.forEach(function (g) { if (on(g)) apply(root, active[g], 'markup'); });
                // A JS part whose create({ k: v }) target a markup row just set lands on a second pass.
                if (!dom) order.forEach(function (g) { if (on(g)) apply(root, active[g], 'insert'); });
            });
            showApplicable();
            // A page canon without <body> is a part of a page (the top bar): its code is the part alone.
            var whole = page && /<body[\s>]/i.test(srcEl.textContent);
            // Dark: data-theme="dark" on the markup's outer element, so the copied code carries it.
            if (dark) Array.prototype.forEach.call(whole ? [pristine.body] : page ? pristine.body.children : pristine.children, function (el) { el.setAttribute('data-theme', 'dark'); });

            var out = whole ? serialize(pristine.documentElement).replace(/^<head><\/head>/, '') : page ? serialize(pristine.body) : html ? serialize(pristine) : '', js = call ? printCall(call) : '';
            [[codeHtml, out], [codeJs, js]].forEach(function (pair) {
                if (!pair[0] || !pair[1]) return;
                pair[0].textContent = pair[1];
                if (pair[0].dataset.ndsCodeInitialized) NDS.Code.reprocessCodeElement(pair[0]);
            });
            if (tabHtml) {
                tabHtml.hidden = !html;
                // Through the Tabs API: a synthetic click lands outside an open options panel and closes it.
                if (!html && tabHtml.getAttribute('aria-selected') === 'true' && block.ndsTabs) block.ndsTabs.switchTo(1);
            }

            if (liveEl) return renderLive();
            // The frame goes dark too, so a dark component is not shown on a light card.
            dark ? preview.setAttribute('data-theme', 'dark') : preview.removeAttribute('data-theme');
            if (page) { preview.ndsOut = out; return frame(preview); }
            // A run card keeps its Run and Clear buttons: the next Run adds the code shown.
            // A choice also rebuilds the last copy added, so it changes on the spot.
            if (script.getAttribute('data-preview') === 'run') {
                preview.ndsRunCode = out;
                if (preview.ndsLastRun) fillRun(preview, preview.ndsLastRun);
                return;
            }
            // A panel card keeps its Preview button: the next open mounts the code shown.
            if (script.getAttribute('data-preview') === 'panel') {
                preview.ndsRunCode = out;
                return;
            }
            // A form harness keeps its form and Validate button; only the slot inside it re-renders.
            var slot = preview.querySelector('[data-demo-slot]') || preview;
            NDS.Init.destroy(slot);
            preview.style.removeProperty('--card-bg');
            // A JS-only structure (a toast) runs on the page: back to Desktop.
            if (!html) { var desk = preview.querySelector('[data-preview-screen=""]'); if (desk && preview.hasAttribute('data-screen')) desk.click(); return runButton(slot, js); }
            slot.innerHTML = out;
            order.forEach(function (g) { if (active[g]) apply(slot, active[g], 'prop'); });
            // On-color markup sits on the deep primary surface; data-theme gives the grid and toggles their look on it.
            // The last tap wins: On color turned on shows primary, Dark turned on after it shows the dark card.
            var oncolor = !!slot.querySelector('.nds-oncolor');
            if (oncolor && !wasOncolor) darkWins = false;
            wasOncolor = oncolor;
            if (oncolor && !darkWins) {
                preview.style.setProperty('--card-bg', 'var(--background-primary-strong)');
                preview.setAttribute('data-theme', 'dark');
            }
            NDS.Init.mount(slot);
            if (script.getAttribute('data-preview') === 'js') new Function(js)();
            // The Validate and Reset buttons show only while the field has a rule that can fail.
            var acts = preview.querySelector('[data-demo-actions]');
            if (acts) acts.hidden = !slot.querySelector(RULES);
            dropAlert(slot.closest('form'));
            preview.ndsOut = out;
            frame(preview);
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
        function runButton(slot, code) {
            slot.innerHTML = '<button type="button" class="nds-btn nds-primary nds-md"><span class="nds-label">Run</span></button>';
            slot.firstChild.addEventListener('click', function () { new Function(code)(); });
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
                NDS.State[sel ? 'add' : 'remove'](btn, 'selected');
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
            // An off chip answers a click or tap with its reason (the tooltip closes itself on a button click).
            if (btn.hasAttribute('aria-disabled')) { if (btn.ndsTooltip) btn.ndsTooltip.open(); return; }
            // A multi-select group toggles each chip; a group whose default is None turns off when
            // its chosen chip is tapped again; any other group is pick-one; a single option toggles.
            var on = true;
            if (combos[c.group]) toggle(c);
            else if (sizes[c.group] > 1 && active[c.group] === c && isNone(defaults[c.group])) set(defaults[c.group], true);
            else { on = sizes[c.group] > 1 || active[c.group] !== c; set(c, on); }
            // `(demo: + x)` turns on the row marked `(id: x)`, by id so a translated page keeps
            // working. An option can carry several.
            (on && c.option.match(/\(demo:\s*\+\s*[^)]+\)/g) || []).forEach(function (m) {
                var id = m.replace(/^\(demo:\s*\+\s*|\)$/g, '').trim();
                Object.keys(byKey).forEach(function (k) {
                    var oc = byKey[k], own = oc.option.match(/\(id:\s*([\w-]+)\)/);
                    if (oc !== c && own && own[1] === id) set(oc, true);
                });
            });
            render();
        }
        sheet.addEventListener('click', choose);

        return {
            dark: function (btn) {
                dark = darkWins = !dark;
                pressed(btn, dark);
                btn.querySelector('.nds-icon').className = 'nds-icon ' + (dark ? 'nds-hgi-sun-03' : 'nds-hgi-moon-02');
                render();
            }
        };
    }

    // A form harness's Reset puts the fields back as drawn and clears their messages, so the
    // validation can be tried again.
    document.addEventListener('reset', function (e) {
        var slot = e.target.querySelector && e.target.querySelector('[data-demo-slot]');
        if (slot) slot.querySelectorAll('[data-status]').forEach(function (el) { NDS.Forms.clearStatus(el); });
        if (slot) dropAlert(e.target);
    });

    // A chip's tooltip shows only when it has text for the chip's state: a hint while on, a reason while off.
    document.addEventListener('nds:tooltip:opened', function (e) {
        var btn = e.target;
        if (btn.matches('[data-builder-option]') && !btn.hasAttribute(btn.hasAttribute('aria-disabled') ? 'data-reason' : 'data-hint')) btn.ndsTooltip.close();
    });

    // A link in a preview stays on the doc page: the component still gets the click, the browser
    // does not follow it. NDS.closest also reaches a menu that moved to <body>.
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (a && NDS.closest(a, '[data-demo-slot]')) e.preventDefault();
    });

    // A form harness that passes answers as a real page does: an inline success alert under the
    // buttons. Fields carry errors only, so the alert is the success signal. A new check, a
    // failed one, Reset and any builder choice remove it.
    function dropAlert(form) {
        if (form) form.querySelectorAll(':scope > .nds-alert').forEach(function (a) { a.remove(); });
    }
    document.addEventListener('nds:formValid', function (e) {
        var form = e.target;
        if (!form.querySelector('[data-demo-slot]')) return;
        dropAlert(form);
        NDS.Alert.create({ variant: 'success', display: 'inline', title: 'Valid:', description: 'every rule passes.', target: form });
    });
    document.addEventListener('nds:formInvalid', function (e) { dropAlert(e.target); });

    // The chips are built at site build; the Variants table is read only when the options first open.
    // A builder card's Dark button wires its builder on first use too.
    var builders = {};
    document.querySelectorAll('[data-builder-for]').forEach(function (bar) {
        var api, get = builders[bar.getAttribute('data-builder-for')] = function () { return api || (api = wire(bar)); };
        var toggle = bar.querySelector('[data-builder-toggle]');
        // A panel opens itself (data-panel-toggle); inline options are shown here.
        if (!toggle) bar.querySelector('[data-panel-toggle]').addEventListener('click', get, { once: true });
        else toggle.addEventListener('click', function () {
            get();
            var box = document.getElementById(toggle.getAttribute('aria-controls'));
            box.hidden = !box.hidden;
            toggle.setAttribute('aria-expanded', String(!box.hidden));
        });
    });

    // data-preview="js": a component with no init (Sort) starts from its JS tab's call, the page's own canon.
    document.querySelectorAll('script[data-canon][data-preview="js"]').forEach(function (s) {
        new Function(dedent(document.getElementById(s.getAttribute('data-js')).textContent))();
    });

    // A view toggle's on state: pressed for screen readers, the selected look for the eye.
    function pressed(btn, on) {
        btn.setAttribute('aria-pressed', String(on));
        NDS.State[on ? 'add' : 'remove'](btn, 'selected');
    }

    // Each preview card's view toggles. Dark on a builder card goes through the builder, so the
    // code carries it; on a plain card it darkens the card only. Grid lines is a class on the card,
    // which a re-render keeps (only the slot is replaced).
    document.querySelectorAll('.nds-doc-view').forEach(function (view) {
        var card = view.parentElement, dark = view.querySelector('[data-preview-dark]'), grid = view.querySelector('[data-preview-grid]');
        dark.addEventListener('click', function () {
            var id = card.getAttribute('data-builder-card');
            if (id) return builders[id]().dark(dark);
            // Read the button, not the card: an on-color card is dark from the start.
            var on = dark.getAttribute('aria-pressed') !== 'true';
            on || card.querySelector('.nds-oncolor') ? card.setAttribute('data-theme', 'dark') : card.removeAttribute('data-theme');
            frame(card);
            pressed(dark, on);
            dark.querySelector('.nds-icon').className = 'nds-icon ' + (on ? 'nds-hgi-sun-03' : 'nds-hgi-moon-02');
        });
        grid.addEventListener('click', function () {
            var on = card.classList.toggle('nds-doc-grid');
            pressed(grid, on);
            grid.querySelector('i').className = 'hgi hgi-stroke ' + (on ? 'hgi-grid-off' : 'hgi-grid');
        });
        // Desktop, Tablet, Phone: the frame takes the code last shown (a builder's render keeps it current),
        // so the hidden card preview is not rebuilt.
        var screens = view.querySelectorAll('[data-preview-screen]');
        Array.prototype.forEach.call(screens, function (b) {
            b.addEventListener('click', function () {
                Array.prototype.forEach.call(screens, function (x) { pressed(x, x === b); });
                var w = b.getAttribute('data-preview-screen');
                w ? card.setAttribute('data-screen', w) : card.removeAttribute('data-screen');
                frame(card);
            });
        });
        // A device shows only at full size: one wider than the card hides its button (a tablet on a
        // phone), and the card goes back to Desktop. With no device left, the buttons hide too.
        // Desktop names the device the reader is on: on a tablet it takes the Tablet button's name and
        // icon, and the Tablet button hides.
        var desk = screens.length && [screens[0].getAttribute('aria-label'), screens[0].querySelector('i').className];
        if (screens.length) NDS.onElementResize(card, function () {
            if (!card.clientWidth) return;
            // A page preview scales every screen to fit, so none hides.
            if (card.hasAttribute('data-preview-page')) return function () { fit(card); };
            var cs = getComputedStyle(card), room = card.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2 * BEZEL;
            var tier = matchMedia(NDS.breakpoints.desktop).matches ? null : screens[matchMedia(NDS.breakpoints.tablet).matches ? 1 : 2];
            return function () {
                var left = 0;
                Array.prototype.forEach.call(screens, function (b) {
                    var w = b.getAttribute('data-preview-screen'), off = !!w && (+w.split('x')[0] > room || b === tier);
                    b.hidden = off;
                    if (w && !off) left++;
                    if (off && card.getAttribute('data-screen') === w) screens[0].click();
                });
                screens[0].parentNode.hidden = !left;
                var name = tier ? [tier.getAttribute('aria-label'), tier.querySelector('i').className] : desk, d = screens[0];
                d.setAttribute('aria-label', name[0]);
                d.setAttribute('data-tooltip-message', name[0]);
                d.querySelector('i').className = name[1];
                var tip = d.ndsTooltip && d.ndsTooltip.balloon && d.ndsTooltip.balloon.querySelector('.nds-tooltip-message');
                if (tip) tip.textContent = name[0];
            };
        });
    });

    // Desktop, Tablet, Phone: at a tablet or phone size the preview shows in a device screen that big,
    // so the media queries behind breakpoint classes fire on a desktop too, and a popup has a real
    // screen to open in. The screen loads the page's own head and runtime scripts, gets the code
    // shown in its slot, and keeps the card's other parts (a harness).
    var GUTTER = 24, BEZEL = 12, RADIUS = 36;
    function frame(card) {
        // A plain card shows its canon as written; a builder's render keeps ndsOut current.
        if (card.ndsOut == null) card.ndsOut = dedent(document.getElementById(card.getAttribute('data-preview-of')).textContent);
        if (card.hasAttribute('data-preview-page')) return pageFrame(card);
        var w = card.getAttribute('data-screen'), dev = card.querySelector('.nds-doc-device'), f = dev && dev.firstChild;
        if (!w) { if (dev) dev.remove(); return; }
        // The card's dark goes on the frame's body, so the harness around the markup goes dark too.
        var theme = function (d) { var t = card.getAttribute('data-theme'); t ? d.body.setAttribute('data-theme', t) : d.body.removeAttribute('data-theme'); };
        var win = f && f.ndsSize === w && f.contentWindow, slot = win && win.NDS && f.contentDocument.querySelector('[data-demo-slot]');
        // The screen is up: re-render its slot in place, with no reload.
        if (slot) {
            win.NDS.Init.destroy(slot);
            slot.innerHTML = card.ndsOut;
            win.NDS.Init.mount(slot);
            theme(f.contentDocument);
            return;
        }
        if (!dev) {
            dev = document.createElement('div');
            dev.className = 'nds-doc-device';
            f = document.createElement('iframe');
            f.className = 'nds-doc-screen';
            f.title = 'Preview';
            dev.appendChild(f);
            card.appendChild(dev);
        }
        f.ndsSize = w;
        var size = w.split('x');
        dev.style.cssText = 'width:' + (+size[0] + 2 * BEZEL) + 'px;height:' + (+size[1] + 2 * BEZEL) + 'px;border-radius:' + RADIUS + 'px';
        f.style.cssText = 'top:' + BEZEL + 'px;left:' + BEZEL + 'px;width:' + size[0] + 'px;height:' + size[1] + 'px;border-radius:' + (RADIUS - BEZEL) + 'px';
        // Hidden until it loads, so it never shows a blank screen.
        f.style.visibility = 'hidden';
        var parts = Array.prototype.filter.call(card.children, function (el) { return !el.matches('.nds-doc-view, .nds-doc-device'); }).map(function (el) {
            var copy = el.cloneNode(true);
            // The slot is the child itself, or sits in a form harness.
            var slot = copy.matches('[data-demo-slot]') ? copy : copy.querySelector('[data-demo-slot]');
            if (slot) slot.innerHTML = card.ndsOut;
            // Run stamps would stop the frame's own init.
            [copy].concat(Array.prototype.slice.call(copy.querySelectorAll('*'))).forEach(function (x) {
                Array.prototype.slice.call(x.attributes).forEach(function (a) { if (/^data-nds-/.test(a.name)) x.removeAttribute(a.name); });
            });
            return copy.outerHTML;
        }).join('');
        var runtime = runtimeScripts(), root = rootAttrs();
        f.onload = function () {
            theme(f.contentDocument);
            f.style.visibility = '';
        };
        // The body lays the demo out as the card does, over the whole screen: a longer demo scrolls in it.
        var cs = getComputedStyle(card), lay = ['display', 'flex-direction', 'flex-wrap', 'align-items', 'justify-content', 'gap']
            .map(function (k) { return k + ':' + cs.getPropertyValue(k); }).join(';');
        // base target: a link opens its page in the window, not in the frame.
        f.srcdoc = '<!doctype html><html ' + root + '><head><base target="_top">' + document.head.innerHTML +
            '<style>:root{color-scheme:normal!important;height:100%;scrollbar-width:none}html,body{background:transparent!important}body{margin:0;min-height:100%;padding:' + GUTTER + 'px;' + lay + ';justify-content:flex-start}</style>' +
            '</head><body class="nds-doc-preview">' + parts + runtime + '</body></html>';
    }

    // The NDS runtime: the page's own deferred scripts from assets/js (not docs-assets).
    function runtimeScripts() {
        return Array.prototype.filter.call(document.querySelectorAll('script[defer][src]'), function (x) { return /\/assets\/js\//.test(x.src); })
            .map(function (x) { return '<script defer src="' + x.src + '"></' + 'script>'; }).join('');
    }
    // dark: the preview is dark, so the whole frame page is too (its background, backdrop and menus).
    function rootAttrs(dark) {
        var html = document.documentElement, out = Array.prototype.filter.call(html.attributes, function (a) { return !/^data-nds-/.test(a.name); })
            .map(function (a) {
                var v = a.name === 'data-theme' && dark && !/(^|\s)dark(\s|$)/.test(a.value) ? (a.value + ' dark').trim() : a.value;
                return a.name + '="' + v.replace(/"/g, '&quot;') + '"';
            });
        if (dark && !html.hasAttribute('data-theme')) out.push('data-theme="dark"');
        return out.join(' ');
    }

    // data-preview="page": the code is a whole <body>, so it previews as a page of its own, at the
    // chosen screen's size (Desktop is 1280 wide), scaled down to fit the card. The header and
    // footer are left out: only the code shows them. Each render loads a fresh frame over the old
    // one and swaps when it is ready, so the preview never blanks.
    // data-preview-height sets the Desktop height (a short part, the top bar); a page is 800.
    var PAGE = '1280x800';
    function pageFrame(card) {
        var dev = card.querySelector('.nds-doc-device');
        if (!dev) {
            dev = document.createElement('div');
            dev.className = 'nds-doc-device';
            card.appendChild(dev);
        }
        var doc = new DOMParser().parseFromString(card.ndsOut, 'text/html');
        doc.querySelectorAll('body > header, body > footer').forEach(function (el) { el.remove(); });
        var f = document.createElement('iframe');
        f.className = 'nds-doc-screen';
        f.title = 'Preview';
        f.style.visibility = 'hidden';
        f.onload = function () {
            dev.querySelectorAll('iframe').forEach(function (x) { if (x !== f) x.remove(); });
            f.style.visibility = '';
        };
        dev.appendChild(f);
        fit(card);
        var dark = card.getAttribute('data-theme') === 'dark' || !!doc.querySelector('body > [data-theme~="dark"]');
        f.srcdoc = '<!doctype html><html ' + rootAttrs(dark) + '><head><base target="_top">' + document.head.innerHTML +
            // No nav in the frame: sticky parts pin at its top, not under a missing nav. A nav part keeps its height.
            // data-preview-style on the canon: CSS for the preview only, never in the code.
            '<style>:root{color-scheme:normal!important;scrollbar-width:none' + (doc.querySelector('.nds-main-nav') ? '' : ';--nds-nav-height:0px') + '}' +
            (document.getElementById(card.getAttribute('data-preview-of')).getAttribute('data-preview-style') || '') + '</style></head>' + doc.body.outerHTML.replace(/<\/body>$/, runtimeScripts() + '</body>') + '</html>';
    }
    function fit(card) {
        var dev = card.querySelector('.nds-doc-device');
        if (!dev) return;
        // Desktop is the reader's own screen: a plain frame, no device around it.
        var desk = !card.getAttribute('data-screen'), b = desk ? 0 : BEZEL;
        var size = (card.getAttribute('data-screen') || PAGE).split('x'), w = +size[0], h = +size[1];
        var cs = getComputedStyle(card), room = card.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2 * b;
        if (desk) h = +document.getElementById(card.getAttribute('data-preview-of')).getAttribute('data-preview-height') || h;
        var s = Math.min(1, room / w);
        dev.style.cssText = 'width:' + (w * s + 2 * b) + 'px;height:' + (h * s + 2 * b) + 'px;' +
            (desk ? 'background:none;box-shadow:none' : 'border-radius:' + RADIUS + 'px');
        dev.querySelectorAll('iframe').forEach(function (f) {
            f.style.top = f.style.left = b + 'px';
            f.style.width = w + 'px';
            f.style.height = h + 'px';
            f.style.borderRadius = desk ? '' : (RADIUS - BEZEL) / s + 'px';
            f.style.transform = 'scale(' + s + ')';
            f.style.transformOrigin = '0 0';
        });
    }
    // A page card has no slot: its first frame loads with the page.
    document.querySelectorAll('[data-preview-page]').forEach(frame);

    // data-preview="run": Run mounts a copy of the code shown in the card's held box, where it can
    // leave the card (a FAB docks at the screen edge). Each copy's ids get its own suffix, so each
    // keeps its own panel. Clear takes every copy away.
    function fillRun(card, box) {
        NDS.Init.destroy(box);
        box.innerHTML = card.ndsRunCode || dedent(document.getElementById(card.getAttribute('data-builder-card')).textContent);
        box.querySelectorAll('[id]').forEach(function (el) {
            var id = el.id;
            box.querySelectorAll('*').forEach(function (x) {
                Array.prototype.forEach.call(x.attributes, function (a) { if (a.value === id) a.value = id + '-' + box.ndsRun; });
            });
        });
        NDS.Init.mount(box);
    }
    var runs = 0;
    document.querySelectorAll('[data-demo-run]').forEach(function (bar) {
        var card = bar.closest('[data-builder-card]'), held = card.querySelector('[data-demo-held]');
        bar.querySelector('[data-run]').addEventListener('click', function () {
            var box = document.createElement('div');
            box.ndsRun = ++runs;
            held.appendChild(box);
            card.ndsLastRun = box;
            fillRun(card, box);
        });
        bar.querySelector('[data-run-clear]').addEventListener('click', function () {
            NDS.Init.destroy(held);
            held.innerHTML = '';
            card.ndsLastRun = null;
        });
    });

    // data-preview="panel": Preview mounts the code shown in its tall bottom panel, before the panel
    // opens, so the demo builds on a page of its own. Closing the panel takes the copy away.
    function fillStage(card) {
        var stage = card.ndsStage;
        NDS.Init.destroy(stage);
        stage.innerHTML = card.ndsRunCode || dedent(document.getElementById(stage.closest('.nds-panel').id.replace(/-stage$/, '')).textContent);
        NDS.Init.mount(stage);
    }
    document.querySelectorAll('[data-demo-stage]').forEach(function (stage) {
        var panel = stage.closest('.nds-panel'), button = document.querySelector('[data-panel-toggle="' + panel.id + '"]');
        var card = button.closest('.nds-doc-frame');
        card.ndsStage = stage;
        // Out of the doc layout: its card-view rules would give the staged section a shadow and padding.
        document.body.appendChild(panel);
        button.addEventListener('click', function () { fillStage(card); });
        panel.addEventListener('nds:panel:closed', function () {
            NDS.Init.destroy(stage);
            stage.innerHTML = '';
        });
    });

    // A live canon's preview button opens its options, which scroll to the page's own copy;
    // with them already open it just scrolls (re-queried: a choice replaces the copy).
    document.querySelectorAll('[data-builder-live]').forEach(function (b) {
        var id = b.getAttribute('data-builder-live');
        b.addEventListener('click', function () {
            if (document.getElementById(id + '-options').hidden) document.querySelector('[data-builder-for="' + id + '"] [data-panel-toggle]').click();
            else document.querySelector(document.getElementById(id).getAttribute('data-live')).scrollIntoView({ block: 'end', behavior: 'smooth' });
        });
    });

})();
