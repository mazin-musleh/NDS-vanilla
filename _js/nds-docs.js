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
 * while that option is set:  key: value  set an option · a.b: value  set one key inside option a,
 * so chips stack (line.area, line.dots) · canon #id  add a part's options.
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
    // The group whose rows swap the whole markup. A reference page (grid) names it Example; the token catalog, Pack.
    var STRUCT = /^(Structure|Example|Pack)$/;
    // Markup that a form harness can fail on (docs_canon.rb RULE_RE is the same list).
    var RULES = '[data-required], [data-strict], .nds-required, [data-min-checked], [data-max-checked], [required], [pattern], [minlength], [min], [max], [type="email"], [type="url"], .nds-date-input, .nds-time-input, .nds-national-id, .nds-iban';

    // An option's name without its markers: (default), (demo: + id), (hint: text), (id: name), (not: ids), (limit: n name).
    function stripMarkers(option) { return option.replace(/\s*\((default|limit:[^)]*|demo:\s*\+[^)]*|hint:[^)]*|id:[^)]*|not:[^)]*)\)/g, ''); }

    function dedent(text) {
        text = text.replace(/^\s*\n/, '').replace(/\s+$/, '');
        var indents = text.match(/^[ \t]*(?=\S)/gm) || [''];
        var indent = Math.min.apply(null, indents.map(function (x) { return x.length; }));
        return text.replace(new RegExp('^[ \\t]{' + indent + '}', 'gm'), '');
    }

    // innerHTML writes bare attributes as attr="" — keep them bare, keep text verbatim.
    function serialize(node) {
        var out = '';
        // A textarea, script or style holds its text raw: an escaped <h2> there shows as &lt;h2>.
        var raw = /^(TEXTAREA|SCRIPT|STYLE)$/.test(node.nodeName);
        node.childNodes.forEach(function (child) {
            if (child.nodeType === 3) { out += raw ? child.textContent : child.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;'); return; }
            if (child.nodeType === 8) { out += '<!--' + child.data + '-->'; return; }
            if (child.nodeType !== 1) return;
            var tag = child.tagName.toLowerCase();
            out += '<' + tag;
            Array.prototype.forEach.call(child.attributes, function (attribute) {
                if (attribute.value === '') { out += ' ' + attribute.name; return; }
                var value = attribute.value.replace(/&/g, '&amp;');
                // A JSON value keeps its own quotes readable inside single quotes, as the canon writes it.
                out += /"/.test(value) && !/'/.test(value) ? ' ' + attribute.name + "='" + value + "'" : ' ' + attribute.name + '="' + value.replace(/"/g, '&quot;') + '"';
            });
            out += '>';
            if (VOID.test(tag)) return;
            // A <template> keeps its markup in .content, not in its child nodes.
            out += serialize(tag === 'template' ? child.content : child) + '</' + tag + '>';
        });
        return out;
    }

    function parseOp(cell) {
        var text = cell.trim(), match;
        if ((match = text.match(/^\.([\w-]+)\s*=\s*(.+)$/))) return { kind: 'prop', name: match[1], value: JSON.parse(match[2]) };
        if ((match = text.match(/^\.([\w-]+)$/))) return { kind: 'class', name: match[1] };
        if ((match = text.match(/^\[([\w-]+)~="([^"]*)"\]$/))) return { kind: 'token', name: match[1], value: match[2] };
        // A JSON value comes single-quoted, as the canon writes it: [data-filter-values='["a","b"]'].
        if ((match = text.match(/^\[([\w-]+)(?:="([^"]*)"|='([^']*)')?\]$/))) return { kind: 'attr', name: match[1], value: match[2] != null ? match[2] : match[3] != null ? match[3] : '' };
        if ((match = text.match(/^(--[\w-]+)\s*:\s*(.+)$/))) return { kind: 'style', name: match[1], value: match[2] };
        // A CSS declaration ends in `;`, which tells it from a create() option (`key: value`).
        if ((match = text.match(/^([a-z][a-z-]*)\s*:\s*([^;]+);$/))) return { kind: 'style', name: match[1], value: match[2].trim() };
        if ((match = text.match(/^canon #([\w-]+)$/))) return { kind: 'structure', id: match[1] };
        if (text === 'remove') return { kind: 'remove' };
        if ((match = text.match(/^([a-z][\w.]*)\s*:\s*(.+)$/i))) return { kind: 'js', name: match[1], value: match[2] };
        return null;
    }

    // A JS canon is one call around one options object: keep the text around it, split the
    // object into its top-level entries. ponytail: no comments holding quotes or commas in a value.
    function parseCall(src) {
        var open = src.indexOf('{'), close = src.lastIndexOf('}'), body = src.slice(open + 1, close);
        var entries = [], depth = 0, quote = null, start = 0;
        for (var i = 0; i <= body.length; i++) {
            var ch = body.charAt(i);
            if (quote) { if (ch === '\\') i++; else if (ch === quote) quote = null; continue; }
            if (ch && '\'"`'.indexOf(ch) >= 0) quote = ch;
            else if (ch && '([{'.indexOf(ch) >= 0) depth++;
            else if (ch && ')]}'.indexOf(ch) >= 0) depth--;
            else if ((ch === ',' && !depth) || i === body.length) {
                var match = body.slice(start, i).trim().match(/^(\w+)\s*:\s*([\s\S]+)$/);
                if (match) entries.push({ key: match[1], value: dedentTail(match[2]) });
                start = i + 1;
            }
        }
        return { head: src.slice(0, open + 1), tail: src.slice(close), entries: entries };
    }

    // A multi-line value keeps its lines relative to its closing bracket.
    function dedentTail(value) {
        var lines = value.split('\n');
        if (lines.length < 2) return value;
        var indent = Math.min.apply(null, lines.slice(1).filter(function (line) { return line.trim(); }).map(function (line) { return line.match(/^ */)[0].length; }));
        return [lines[0]].concat(lines.slice(1).map(function (line) { return line.slice(indent); })).join('\n');
    }

    function printCall(call) {
        return call.head + '\n' + call.entries.map(function (e) {
            return '  ' + e.key + ': ' + e.value.split('\n').join('\n  ');
        }).join(',\n') + '\n' + call.tail;
    }

    // `line.area` sets one key inside the `line` object, written on one line. No value removes the key.
    function setCallEntry(call, key, value) {
        var dot = key.indexOf('.'), name = dot < 0 ? key : key.slice(0, dot);
        var e = call.entries.filter(function (x) { return x.key === name; })[0];
        if (dot >= 0) {
            var sub = parseCall(e ? e.value : '{}');
            setCallEntry(sub, key.slice(dot + 1), value);
            value = sub.entries.length ? '{ ' + sub.entries.map(function (x) { return x.key + ': ' + x.value; }).join(', ') + ' }' : undefined;
        }
        if (value === undefined) call.entries = call.entries.filter(function (x) { return x !== e; });
        else if (e) e.value = value; else call.entries.push({ key: name, value: value });
    }

    var isJs = function (target) { return /^create\(/.test(target || ''); };
    // `create()` matches any call; `create({ display: 'toast' })` only one with that option set.
    // `create():not({ key: value })` matches any call without that option.
    function callMatches(call, target) {
        var match = target.match(/^create\((?:\{\s*(\w+)\s*:\s*(.+?)\s*\})?\)(?::not\(\{\s*(\w+)\s*:\s*(.+?)\s*\}\))?$/);
        var has = function (key, value) { return call.entries.some(function (e) { return e.key === key && e.value === value; }); };
        return !!match && (!match[1] || has(match[1], match[2])) && !(match[3] && has(match[3], match[4]));
    }

    function setCallFromOp(call, row) {
        var op = row.op;
        if (!callMatches(call, row.target)) return;
        if (op.kind === 'js') setCallEntry(call, op.name, op.value);
        else if (op.kind === 'insert') parsePart(op.id).entries.forEach(function (e) { setCallEntry(call, e.key, e.value); });
    }

    // A JS part canon is a run of options, `actions: [...]`.
    function parsePart(id) { return parseCall('{' + document.getElementById(id).textContent + '}'); }

    // A lazy canon keeps its element in a <template>, which querySelectorAll does not enter.
    function findTargets(root, selector) {
        // A page canon parses to a document: its outer element is <body>.
        if (!selector || selector === '—') return [root.body || root.firstElementChild];
        var found = Array.prototype.slice.call(root.querySelectorAll(selector));
        Array.prototype.forEach.call(root.querySelectorAll('template'), function (template) {
            found = found.concat(findTargets(template.content, selector));
        });
        return found;
    }

    // Insert a part block as el's first or last child, indented to match its siblings.
    // `after` puts it right after el instead, as el's next sibling.
    function insert(el, html, position) {
        var kids = el.childNodes, first = kids[0], last = kids[kids.length - 1];
        var readIndent = function (node) { return node && node.nodeType === 3 ? (node.textContent.match(/\n([ \t]*)$/) || [])[1] : null; };
        var ind = position === 'after' ? readIndent(el.previousSibling) || '' : readIndent(first);
        // An empty element (a badge into an icon) opens onto its own lines, one level in.
        if (!first && position !== 'after') {
            var own = readIndent(el.previousSibling) || '';
            ind = own + '  ';
            el.appendChild(document.createTextNode('\n' + own));
            first = last = el.firstChild;
            position = 'end';
        }
        if (ind == null) ind = (readIndent(last) || '') + '  ';
        var template = document.createElement('template');
        template.innerHTML = html.split('\n').join('\n' + ind);
        if (position === 'after') {
            var next = el.nextSibling;
            el.parentNode.insertBefore(document.createTextNode('\n' + ind), next);
            el.parentNode.insertBefore(template.content, next);
        } else if (position === 'start') {
            template.content.appendChild(document.createTextNode('\n' + ind));
            el.insertBefore(template.content, first && first.nodeType === 3 ? first.nextSibling : first);
        } else {
            var ref = last && last.nodeType === 3 ? last : null;
            el.insertBefore(document.createTextNode('\n' + ind), ref);
            el.insertBefore(template.content, ref);
        }
    }

    // Phase 'insert' adds part blocks, 'markup' the rest; JS properties ('prop') go on the live preview only.
    function setChoice(root, choice, phase) {
        choice.ops.forEach(function (row) {
            var op = row.op;
            if (!op || op.kind === 'structure') return;
            if ((op.kind === 'insert' ? 'insert' : op.kind === 'prop' ? 'prop' : 'markup') !== phase) return;
            // JS rows change a create() call, HTML rows the markup; each skips the other mode.
            if (isJs(row.target) || root.entries) { if (isJs(row.target) && root.entries) setCallFromOp(root, row); return; }
            findTargets(root, row.target).forEach(function (el) {
                if (op.kind === 'insert') insert(el, dedent(document.getElementById(op.id).textContent), row.pos);
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
        choice.ops.forEach(function (row) {
            var op = row.op;
            if (!op) return;
            var again = next && next.ops.some(function (nextRow) { return nextRow.op && nextRow.op.kind === op.kind && nextRow.op.name === op.name && nextRow.target === row.target; });
            if (again && (op.kind === 'attr' || op.kind === 'js')) return;
            if (isJs(row.target) || root.entries) {
                if (!isJs(row.target) || !root.entries) return;
                var keys = op.kind === 'js' ? [op.name] : op.kind === 'insert' ? parsePart(op.id).entries.map(function (e) { return e.key; }) : [];
                keys.forEach(function (key) { setCallEntry(root, key); });
                return;
            }
            findTargets(root, row.target).forEach(function (el) {
                if (op.kind === 'class') el.classList.remove(op.name);
                else if (op.kind === 'attr') el.removeAttribute(op.name);
                else if (op.kind === 'token') {
                    var set = (el.getAttribute(op.name) || '').split(/\s+/).filter(function (token) { return token && token !== op.value; });
                    set.length ? el.setAttribute(op.name, set.join(' ')) : el.removeAttribute(op.name);
                } else if (op.kind === 'style') el.style.removeProperty(op.name);
            });
        });
    }

    // A default part (the canon carries a copy): remove the copy, found by its markup.
    function removePart(root, id) {
        var flattenHtml = function (html) { return html.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim(); };
        var template = document.createElement('template');
        template.innerHTML = dedent(document.getElementById(id).textContent);
        Array.prototype.forEach.call(template.content.children, function (child) {
            var want = flattenHtml(child.outerHTML);
            var el = Array.prototype.find.call(root.querySelectorAll(child.tagName), function (x) { return flattenHtml(x.outerHTML) === want; });
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
            var cells = tr.cells, group = cells[0].textContent.trim(), option = cells[1].textContent.trim();
            // kramdown keeps the backslash of a cell's `\|` inside a code span.
            var key = group + '|' + option, op = parseOp(cells[2].textContent.replace(/\\\|/g, '|'));
            if (!op && cells[2].textContent.trim() !== '—') console.warn('[NDS Docs] unparsed Markup cell:', cells[2].textContent.trim());
            // `canon #id` swaps the markup in the Structure (or Example) group; anywhere else it inserts a part block.
            if (op && op.kind === 'structure' && !STRUCT.test(group)) op.kind = 'insert';
            var at = cells[3].textContent.trim().match(/^(.*?)\s*(?:\((start|end|after)\))?$/);
            if (!byKey[key]) { byKey[key] = { key: key, group: group, option: option, ops: [] }; choices.push(byKey[key]); }
            byKey[key].ops.push({ op: op, target: at[1], pos: at[2] || 'end' });
            if (op && op.kind === 'structure') byKey[key].structure = op.id;
        });
        return choices;
    }

    function setupBuilder(bar) {
        var script = document.getElementById(bar.getAttribute('data-builder-for'));
        var jsEl = script.hasAttribute('data-js') ? document.getElementById(script.getAttribute('data-js')) : null;
        // A CSS twin (the token catalog) is the code itself, not a create() call: each structure shows its own.
        var cssTwin = !!jsEl && jsEl.getAttribute('data-lang') === 'css';
        if (cssTwin) jsEl = null;
        // The build writes the options, the Preview divider, the preview and the code right after the canon.
        // The options sit inline or in a panel (4 rows or more).
        var sheet = script.nextElementSibling;
        var preview = sheet.nextElementSibling.nextElementSibling;
        var block = preview.nextElementSibling;
        var codeHtml = block.querySelector('code.lang-html'), codeJs = block.querySelector('code.lang-js'), codeCss = cssTwin && block.querySelector('code.lang-css');
        var tabHtml = block.querySelector('[role="tab"][aria-controls$="-html"]');
        var reset = bar.querySelector('[data-builder-reset]');
        var findControls = function () { return Array.prototype.slice.call(sheet.querySelectorAll('[data-builder-option]')); };
        // The panel covers the lower part of the screen: bring the preview into the space between
        // header and panel. One that fits is centered there, unless it already shows whole; a taller
        // one goes up under the header, unless 160px of it already shows.
        sheet.addEventListener('nds:panel:opened', function () {
            // The free space is below a top panel, or between the header and a bottom panel.
            var box = preview.getBoundingClientRect(), top = box.top, sheetRect = sheet.getBoundingClientRect();
            var down = sheet.getAttribute('data-panel-side') === 'top';
            var head = down ? sheetRect.bottom : NDS.getStickyHeaderBottom();
            var room = (down ? window.innerHeight : sheetRect.top) - head, fits = box.height <= room - 32;
            if (top >= head && top + (fits ? box.height : 160) <= head + room) return;
            var at = fits ? head + (room - box.height) / 2 : head + 16;
            window.scrollTo({ top: top + window.scrollY - at, behavior: NDS.prefersReducedMotion ? 'auto' : 'smooth' });
        });
        var byKey = {}, order = [], active = {}, defaults = {}, sizes = {}, combos = {}, picks = {};
        readTable(script.getAttribute('data-variants')).forEach(function (choice) {
            byKey[choice.key] = choice;
            // `Group (any)`: each chip is its own on/off group, so any mix of them stacks.
            if (/ \(any\)$/.test(choice.group)) choice.group += '|' + choice.option;
            sizes[choice.group] = (sizes[choice.group] || 0) + 1;
            if (order.indexOf(choice.group) < 0) order.push(choice.group);
            if (/\(default\)/.test(choice.option)) defaults[choice.group] = choice;
            // "Tags + Rating": the markup for those chips on together, so the group is multi-select.
            if (/ \+ /.test(stripMarkers(choice.option))) (combos[choice.group] = combos[choice.group] || []).push(choice);
        });
        sheet.querySelectorAll('[data-builder-option][data-state~="selected"]').forEach(function (it) {
            var choice = byKey[it.getAttribute('data-builder-option')];
            if (choice) active[choice.group] = choice;
        });
        // A group with no chip on starts on its default (None has no chip).
        order.forEach(function (group) { if (!active[group] && defaults[group]) active[group] = defaults[group]; });
        var pristine = document.createElement('div'), call = null, html = false, dark = false, darkWins = false, wasOncolor = false;
        var page = script.getAttribute('data-preview') === 'page';

        // A choice is enabled only when the element it changes is in the current markup ("Row" needs a group).
        // `(not: home)`: off while the structure marked `(id: home)` is chosen.
        function isExcluded(choice) {
            var not = choice.option.match(/\(not:\s*([^)]*)\)/), sg = order.filter(function (group) { return STRUCT.test(group); })[0];
            var id = not && sg && active[sg] && (active[sg].option.match(/\(id:\s*([\w-]+)\)/) || [])[1];
            return !!id && not[1].split(/[\s,]+/).indexOf(id) >= 0;
        }
        // `(limit: 2 widgets)`: once that many chips sharing it are on, the others stay off.
        var limitOf = function (choice) { var match = choice.option.match(/\(limit:\s*([^)]+)\)/); return match && match[1]; };
        function isApplicable(choice) {
            if (choice.structure) return true;
            if (isExcluded(choice)) return false;
            var lim = limitOf(choice);
            if (lim && active[choice.group] !== choice && order.filter(function (group) { return active[group] && limitOf(active[group]) === lim; }).length >= parseInt(lim, 10)) return false;
            // A `—` row with a target (a default that fits only some structures) is checked too.
            var ops = choice.ops.filter(function (row) { return row.op || (row.target && row.target !== '—'); });
            // Like the build, a descendant target never gates when the choice has a one-element target.
            var own = ops.filter(function (row) { return !/[\s>+~]/.test((row.target || '').replace(/\([^)]*\)|\[[^\]]*\]/g, '')); });
            if (own.length) ops = own;
            return !ops.length || ops.some(function (row) {
                if (isJs(row.target)) return !!call && callMatches(call, row.target);
                // A chosen `remove` row took its own target away: it stays on, so it can be turned off.
                if (row.op && row.op.kind === 'remove' && active[choice.group] === choice) return true;
                return html && (!row.target || row.target === '—' || findTargets(pristine, row.target).length > 0);
            });
        }
        function showApplicable() {
            findControls().forEach(function (btn) {
                var off = !isApplicable(byKey[btn.getAttribute('data-builder-option')]);
                NDS.state[off ? 'add' : 'remove'](btn, 'disabled');
                off ? btn.setAttribute('aria-disabled', 'true') : btn.removeAttribute('aria-disabled');
                if (!off && btn.ndsTooltip) btn.ndsTooltip.close();
                // One balloon serves both texts: the hint while on, the reason while off.
                var message = btn.getAttribute(off ? 'data-reason' : 'data-hint');
                var tooltipMessage = message && btn.ndsTooltip && btn.ndsTooltip.balloon && btn.ndsTooltip.balloon.querySelector('.nds-tooltip-message');
                if (tooltipMessage) tooltipMessage.textContent = message;
                // A reason shows at once, a hint after a pause.
                if (btn.hasAttribute('data-tooltip-hover')) btn.setAttribute('data-tooltip-hover', off ? '0' : '500');
            });
        }

        var getPartIds = function (choice) { return choice.ops.filter(function (row) { return row.op && row.op.kind === 'insert'; }).map(function (row) { return row.op.id; }); };
        var isPart = function (choice) { return !!choice && getPartIds(choice).length > 0; };

        function render() {
            var sg = order.filter(function (group) { return STRUCT.test(group); })[0];
            var struct = sg && active[sg] && active[sg].structure;
            var srcEl = struct ? document.getElementById(struct) : script;
            // A structure with no preview (a token pack of palette aliases) shows its code alone.
            var none = srcEl.getAttribute('data-preview') === 'none';
            preview.hidden = none;
            if (preview.previousElementSibling) preview.previousElementSibling.hidden = none;
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
                if (dom) order.forEach(function (group) { if (isPart(defaults[group])) getPartIds(defaults[group]).forEach(function (id) { removePart(root, id); }); });
                var undo = function () { order.forEach(function (group) { if (defaults[group] && active[group] !== defaults[group] && !(dom && isPart(defaults[group]))) unapply(root, defaults[group], active[group]); }); };
                // A JS call drops a default before the parts go in; markup drops it after, so it leaves a part put back too.
                if (!dom) undo();
                // A default choice is the canon as written, so it adds nothing.
                // An option the structure excludes stays chosen, but adds nothing until a structure takes it.
                var isChosen = function (group) { var choice = active[group]; return choice && (choice !== defaults[group] || (dom && isPart(choice))) && !isExcluded(choice); };
                order.forEach(function (group) { if (isChosen(group)) setChoice(root, active[group], 'insert'); });
                if (dom) undo();
                order.forEach(function (group) { if (isChosen(group)) setChoice(root, active[group], 'markup'); });
                // A JS part whose create({ k: v }) target a markup row just set lands on a second pass.
                if (!dom) order.forEach(function (group) { if (isChosen(group)) setChoice(root, active[group], 'insert'); });
            });
            showApplicable();
            // A page canon without <body> is a part of a page (the top bar): its code is the part alone.
            var whole = page && /<body[\s>]/i.test(srcEl.textContent);
            // Dark: data-theme="dark" on the markup's outer element, so the copied code carries it.
            if (dark) Array.prototype.forEach.call(whole ? [pristine.body] : page ? pristine.body.children : pristine.children, function (el) { el.setAttribute('data-theme', 'dark'); });

            var out = whole ? serialize(pristine.documentElement).replace(/^<head><\/head>/, '') : page ? serialize(pristine.body) : html ? serialize(pristine) : '', js = call ? printCall(call) : '';
            var css = codeCss ? dedent(document.getElementById(srcEl.getAttribute('data-js')).textContent) : '';
            [[codeHtml, out], [codeJs, js], [codeCss, css]].forEach(function (pair) {
                if (!pair[0] || !pair[1]) return;
                pair[0].textContent = pair[1];
                if (pair[0].dataset.ndsCodeHighlighted) NDS.Code.highlight(pair[0]);
            });
            if (tabHtml) {
                tabHtml.hidden = !html;
                // Through the Tabs API: a synthetic click lands outside an open options panel and closes it.
                if (!html && tabHtml.getAttribute('aria-selected') === 'true' && block.ndsTabs) block.ndsTabs.goTo(1);
            }

            // The frame goes dark too, so a dark component is not shown on a light card.
            dark ? preview.setAttribute('data-theme', 'dark') : preview.removeAttribute('data-theme');
            if (page) { preview.ndsOut = out; return renderFrame(preview); }
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
            NDS.init.destroy(slot);
            preview.style.removeProperty('--card-bg');
            // A JS-only structure (a toast) shows a Run button, on the page and in a screen.
            if (!html) {
                slot.innerHTML = preview.ndsOut = RUN;
                runButton(slot, preview.ndsRunJs = js, window);
                return renderFrame(preview);
            }
            slot.innerHTML = out;
            order.forEach(function (group) { if (active[group]) setChoice(slot, active[group], 'prop'); });
            // On-color markup sits on the deep primary surface; data-theme gives the grid and toggles their look on it.
            // The last tap wins: On color turned on shows primary, Dark turned on after it shows the dark card.
            // A page brings its own surfaces: an on-color logo in it is not on-color markup.
            var oncolor = !page && !!slot.querySelector('.nds-oncolor');
            if (oncolor && !wasOncolor) darkWins = false;
            wasOncolor = oncolor;
            if (oncolor && !darkWins) {
                preview.style.setProperty('--card-bg', 'var(--background-primary-strong)');
                preview.setAttribute('data-theme', 'dark');
            }
            NDS.init.mount(slot);
            if (script.getAttribute('data-preview') === 'js') new Function(js)();
            // The Validate and Reset buttons show only while the field has a rule that can fail.
            var acts = preview.querySelector('[data-demo-actions]');
            if (acts) acts.hidden = !slot.querySelector(RULES);
            // A static stepper has no step to move, so Back and Next hide.
            var steps = preview.querySelector('[data-demo-steps]');
            if (steps) steps.hidden = !!slot.querySelector('.nds-stepper.nds-static');
            dropAlert(slot.closest('form'));
            preview.ndsOut = out;
            if (script.getAttribute('data-preview') === 'js') preview.ndsJs = js;
            renderFrame(preview);
        }

        function set(choice, on) {
            active[choice.group] = on ? choice : null;
            if (combos[choice.group]) picks[choice.group] = on && choice !== defaults[choice.group] ? [choice] : [];
            syncChips(choice.group);
        }
        function syncChips(group) {
            findControls().forEach(function (btn) {
                var option = byKey[btn.getAttribute('data-builder-option')];
                if (option.group !== group) return;
                var selected = combos[group] ? (picks[group] || []).indexOf(option) >= 0 : active[group] === option;
                NDS.state[selected ? 'add' : 'remove'](btn, 'selected');
                btn.setAttribute('aria-pressed', String(selected));
            });
        }
        var isNone = function (choice) { return !!choice && stripMarkers(choice.option) === 'None'; };
        // Several chips on at once resolve to the combo row made of exactly them.
        function toggle(choice) {
            var group = choice.group, list = (picks[group] || []).slice(), i = list.indexOf(choice);
            i >= 0 ? list.splice(i, 1) : list.push(choice);
            var names = list.map(function (option) { return stripMarkers(option.option); }).sort().join('|');
            var combo = combos[group].filter(function (candidate) { return stripMarkers(candidate.option).split(' + ').sort().join('|') === names; })[0];
            if (list.length > 1 && !combo) list = [choice];
            picks[group] = list;
            active[group] = list.length > 1 ? combo : list[0] || defaults[group] || null;
            syncChips(group);
        }

        reset.addEventListener('click', function () {
            order.forEach(function (group) {
                if (defaults[group]) set(defaults[group], true);
                else if (active[group] || (picks[group] || []).length) set(active[group] || picks[group][0], false);
            });
            render();
        });

        // `Option (demo: + Other)` also turns on option "Other" — a demo aid (Neutral shows only when checked).
        function choose(e) {
            var btn = e.target.closest('[data-builder-option]');
            var choice = btn && byKey[btn.getAttribute('data-builder-option')];
            if (!choice) return;
            // An off chip answers a click or tap with its reason (the tooltip closes itself on a button click).
            if (btn.hasAttribute('aria-disabled')) { if (btn.ndsTooltip) btn.ndsTooltip.open(); return; }
            // A multi-select group toggles each chip; a group whose default is None turns off when
            // its chosen chip is tapped again; any other group is pick-one; a single option toggles.
            var on = true;
            if (combos[choice.group]) toggle(choice);
            else if (sizes[choice.group] > 1 && active[choice.group] === choice && isNone(defaults[choice.group])) set(defaults[choice.group], true);
            else { on = sizes[choice.group] > 1 || active[choice.group] !== choice; set(choice, on); }
            // `(demo: + x)` turns on the row marked `(id: x)`, by id so a translated page keeps
            // working. An option can carry several.
            (on && choice.option.match(/\(demo:\s*\+\s*[^)]+\)/g) || []).forEach(function (marker) {
                var id = marker.replace(/^\(demo:\s*\+\s*|\)$/g, '').trim();
                Object.keys(byKey).forEach(function (key) {
                    var oc = byKey[key], own = oc.option.match(/\(id:\s*([\w-]+)\)/);
                    if (oc !== choice && own && own[1] === id) set(oc, true);
                });
            });
            render();
        }
        sheet.addEventListener('click', choose);

        return {
            dark: function (btn) {
                dark = darkWins = !dark;
                setPressed(btn, dark);
                btn.querySelector('.nds-icon').className = 'nds-icon ' + (dark ? 'nds-hgi-sun-03' : 'nds-hgi-moon-02');
                render();
            }
        };
    }

    // A form harness's Reset puts the fields back as drawn and clears their messages, so the
    // validation can be tried again.
    document.addEventListener('reset', function (e) {
        var slot = e.target.querySelector && e.target.querySelector('[data-demo-slot]');
        if (slot) slot.querySelectorAll('[data-status]').forEach(function (el) { NDS.Form.clearStatus(el); });
        if (slot) dropAlert(e.target);
    });

    // A chip's tooltip shows only when it has text for the chip's state: a hint while on, a reason while off.
    document.addEventListener('nds:tooltip:opened', function (e) {
        var btn = e.target;
        if (btn.matches('[data-builder-option]') && !btn.hasAttribute(btn.hasAttribute('aria-disabled') ? 'data-reason' : 'data-hint')) btn.ndsTooltip.close();
    });

    // A link in a preview stays on the doc page: the component still gets the click, the browser
    // does not follow it.
    document.addEventListener('click', function (e) {
        var anchor = e.target.closest && e.target.closest('a[href]');
        if (anchor && anchor.closest('[data-demo-slot]')) e.preventDefault();
    });

    // A form harness that passes answers as a real page does: an inline success alert under the
    // buttons. Fields carry errors only, so the alert is the success signal. A new check, a
    // failed one, Reset and any builder choice remove it.
    function dropAlert(form) {
        if (form) form.querySelectorAll(':scope > .nds-alert').forEach(function (alertElement) { alertElement.remove(); });
    }
    document.addEventListener('nds:form:valid', function (e) {
        var form = e.target;
        if (!form.querySelector('[data-demo-slot]')) return;
        dropAlert(form);
        NDS.Alert.create({ variant: 'success', display: 'inline', title: 'Valid:', description: 'every rule passes.', target: form });
    });
    document.addEventListener('nds:form:invalid', function (e) { dropAlert(e.target); });

    // A preview has no server: an upload in one runs a fake, slow one, 1 in 10 fails. An image replies
    // with a sample image's URL (doc pages sit one folder deep), so the editor's image popover gets a src.
    // A preview field with no URL gets one on its first pick or drop (capture runs before Upload reads it).
    function handleDemoUpload(e) {
        var up = e.target.closest && e.target.closest('.nds-upload');
        if (!up || up.dataset.uploadUrl || !up.closest('[data-demo-slot]')) return;
        up.dataset.uploadUrl = '/demo/upload';
        up.dataset.autoUpload = 'true';
    }
    document.addEventListener('change', handleDemoUpload, true);
    document.addEventListener('drop', handleDemoUpload, true);
    document.addEventListener('nds:upload:start', function (e) {
        if (!e.target.closest('[data-demo-slot]')) return;
        e.preventDefault();
        var api = NDS.Upload.getInstance(e.target.closest('.nds-upload'));
        var file = e.detail.fileData;
        if (!api) return;
        var progress = 0;
        api.setFileStatus(file.id, 'uploading', { progress: 0 });
        var timer = setInterval(function () {
            progress = Math.min(100, progress + Math.random() * 8);
            api.setFileProgress(file.id, progress);
            if (progress < 100) return;
            clearInterval(timer);
            api.setFileStatus(file.id, 'processing');
            setTimeout(function () {
                if (Math.random() < 0.1) return api.setFileStatus(file.id, 'error', { error: 'Demo upload failed' });
                api.setFileStatus(file.id, 'complete');
                var reply = file.file.type.indexOf('image/') === 0 ? { url: '../assets/img/riyadhcenter3s.webp' } : {};
                api.container.dispatchEvent(new CustomEvent('nds:upload:success', { detail: { fileData: file, response: JSON.stringify(reply) }, bubbles: true }));
            }, 2000);
        }, 150);
    });

    // The chips are built at site build; the Variants table is read only when the options first open.
    // A builder card's Dark button wires its builder on first use too.
    var builders = {};
    document.querySelectorAll('[data-builder-for]').forEach(function (bar) {
        var api, get = builders[bar.getAttribute('data-builder-for')] = function () { return api || (api = setupBuilder(bar)); };
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
    document.querySelectorAll('script[data-canon][data-preview="js"]').forEach(function (script) {
        new Function(dedent(document.getElementById(script.getAttribute('data-js')).textContent))();
    });

    // A view toggle's on state: pressed for screen readers, the selected look for the eye.
    function setPressed(btn, on) {
        btn.setAttribute('aria-pressed', String(on));
        NDS.state[on ? 'add' : 'remove'](btn, 'selected');
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
            renderFrame(card);
            setPressed(dark, on);
            dark.querySelector('.nds-icon').className = 'nds-icon ' + (on ? 'nds-hgi-sun-03' : 'nds-hgi-moon-02');
        });
        grid.addEventListener('click', function () {
            var on = card.classList.toggle('nds-doc-grid');
            setPressed(grid, on);
            grid.querySelector('i').className = 'hgi hgi-stroke ' + (on ? 'hgi-grid-off' : 'hgi-grid');
        });
        // Desktop, Tablet, Phone: the frame takes the code last shown (a builder's render keeps it current),
        // so the hidden card preview is not rebuilt.
        var screens = view.querySelectorAll('[data-preview-screen]');
        Array.prototype.forEach.call(screens, function (screenButton) {
            screenButton.addEventListener('click', function () {
                // A run card's copies stop first: the screen gets the bare Run, and nothing runs behind it.
                var clear = card.querySelector('[data-demo-run] [data-run-clear]');
                if (clear) clear.click();
                Array.prototype.forEach.call(screens, function (x) { setPressed(x, x === screenButton); });
                var screenSize = screenButton.getAttribute('data-preview-screen');
                screenSize ? card.setAttribute('data-screen', screenSize) : card.removeAttribute('data-screen');
                renderFrame(card);
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
                Array.prototype.forEach.call(screens, function (screenButton) {
                    var screenSize = screenButton.getAttribute('data-preview-screen'), off = !!screenSize && (+screenSize.split('x')[0] > room || screenButton === tier);
                    screenButton.hidden = off;
                    if (screenSize && !off) left++;
                    if (off && card.getAttribute('data-screen') === screenSize) screens[0].click();
                });
                screens[0].parentNode.hidden = !left;
                var name = tier ? [tier.getAttribute('aria-label'), tier.querySelector('i').className] : desk, desktopButton = screens[0];
                desktopButton.setAttribute('aria-label', name[0]);
                desktopButton.setAttribute('data-tooltip-message', name[0]);
                desktopButton.querySelector('i').className = name[1];
                var tip = desktopButton.ndsTooltip && desktopButton.ndsTooltip.balloon && desktopButton.ndsTooltip.balloon.querySelector('.nds-tooltip-message');
                if (tip) tip.textContent = name[0];
            };
        });
    });

    // Desktop, Tablet, Phone: at a tablet or phone size the preview shows in a device screen that big,
    // so the media queries behind breakpoint classes fire on a desktop too, and a popup has a real
    // screen to open in. The screen loads the page's own head and runtime scripts, gets the code
    // shown in its slot, and keeps the card's other parts (a harness).
    var BEZEL = 12, RADIUS = 36;
    // A JS-only structure previews as a Run button that runs the code shown: the page's own canon,
    // never user input. In a screen it runs in the screen's window, so a toast floats over the screen.
    var RUN = '<button type="button" class="nds-btn nds-primary nds-md" data-run-js><span class="nds-label">Run</span></button>';
    function runButton(root, code, win) {
        var button = root.querySelector('[data-run-js]');
        if (button) button.addEventListener('click', function () { new win.Function(code)(); });
    }
    function renderFrame(card) {
        // A plain card shows its canon as written; a builder's render keeps ndsOut current.
        var canon = document.getElementById(card.getAttribute('data-preview-of'));
        if (card.ndsOut == null) card.ndsOut = dedent(canon.textContent);
        if (card.hasAttribute('data-preview-page')) return renderPageFrame(card);
        // data-preview="js": the screen runs the JS tab too, in its own window.
        if (card.ndsJs == null) card.ndsJs = canon.getAttribute('data-preview') === 'js' ? dedent(document.getElementById(canon.getAttribute('data-js')).textContent) : '';
        var run = function (targetWindow) { if (card.ndsJs) new targetWindow.Function(card.ndsJs)(); };
        var screenSize = card.getAttribute('data-screen'), dev = card.querySelector('.nds-doc-device'), iframe = dev && dev.firstChild;
        if (!screenSize) { if (dev) dev.remove(); return; }
        // The card's dark goes on the frame's body, so the harness around the markup goes dark too.
        var setTheme = function (frameDocument) { var cardTheme = card.getAttribute('data-theme'); cardTheme ? frameDocument.body.setAttribute('data-theme', cardTheme) : frameDocument.body.removeAttribute('data-theme'); };
        var win = iframe && iframe.ndsSize === screenSize && iframe.contentWindow, slot = win && win.NDS && iframe.contentDocument.querySelector('[data-demo-slot]');
        // The screen is up: re-render its slot in place, with no reload.
        if (slot) {
            win.NDS.init.destroy(slot);
            slot.innerHTML = card.ndsOut;
            win.NDS.init.mount(slot);
            run(win);
            runButton(slot, card.ndsRunJs, win);
            setTheme(iframe.contentDocument);
            return;
        }
        if (!dev) {
            dev = document.createElement('div');
            dev.className = 'nds-doc-device';
            iframe = document.createElement('iframe');
            iframe.className = 'nds-doc-screen';
            iframe.title = 'Preview';
            dev.appendChild(iframe);
            card.appendChild(dev);
        }
        iframe.ndsSize = screenSize;
        var size = screenSize.split('x');
        dev.style.cssText = 'width:' + (+size[0] + 2 * BEZEL) + 'px;height:' + (+size[1] + 2 * BEZEL) + 'px;border-radius:' + RADIUS + 'px';
        iframe.style.cssText = 'top:' + BEZEL + 'px;left:' + BEZEL + 'px;width:' + size[0] + 'px;height:' + size[1] + 'px;border-radius:' + (RADIUS - BEZEL) + 'px';
        // Hidden until it loads, so it never shows a blank screen.
        iframe.style.visibility = 'hidden';
        var parts = Array.prototype.filter.call(card.children, function (el) { return !el.matches('.nds-doc-view, .nds-doc-device'); }).map(function (el) {
            var copy = el.cloneNode(true);
            // The slot is the child itself, or sits in a form harness.
            var slot = copy.matches('[data-demo-slot]') ? copy : copy.querySelector('[data-demo-slot]');
            if (slot) slot.innerHTML = card.ndsOut;
            // Run stamps would stop the frame's own init.
            [copy].concat(Array.prototype.slice.call(copy.querySelectorAll('*'))).forEach(function (x) {
                Array.prototype.slice.call(x.attributes).forEach(function (attribute) { if (/^data-nds-/.test(attribute.name)) x.removeAttribute(attribute.name); });
            });
            return copy.outerHTML;
        }).join('');
        var runtime = getRuntimeScripts(), root = getRootAttributes();
        iframe.onload = function () {
            setTheme(iframe.contentDocument);
            run(iframe.contentWindow);
            runButton(iframe.contentDocument, card.ndsRunJs, iframe.contentWindow);
            var bar = iframe.contentDocument.querySelector('[data-demo-run]');
            if (bar) addRunListeners(card, bar, iframe.contentWindow);
            iframe.style.visibility = '';
        };
        // The body lays the demo out as the card does, over the whole screen: a longer demo scrolls in it.
        var cs = getComputedStyle(card), lay = ['display', 'flex-direction', 'flex-wrap', 'align-items', 'justify-content', 'gap']
            .map(function (property) { return property + ':' + cs.getPropertyValue(property); }).join(';');
        // The template's own page gutter, so a screen is as wide as a real page at that size.
        // data-preview-flush: the markup brings its own padding (a section), so it meets the screen edges.
        var pad = document.getElementById(card.getAttribute('data-preview-of')).hasAttribute('data-preview-flush') ? '0' : 'var(--nds-viewport-padding)';
        // base target: a link opens its page in the window, not in the frame.
        iframe.srcdoc = '<!doctype html><html ' + root + '><head><base target="_top">' + document.head.innerHTML +
            // No nav in the frame: a panel or sticky part starts at the screen top.
            '<style>:root{color-scheme:normal!important;height:100%;scrollbar-width:none;--nds-nav-height:0px}html,body{background:transparent!important}body{margin:0;min-height:100%;padding:' + pad + ';' + lay + ';justify-content:flex-start}</style>' +
            '</head><body class="nds-doc-preview">' + parts + runtime + getDemoScripts() + '</body></html>';
    }

    // A page's demo script (data-demo-script) runs in a screen too. Inline, so it runs before the
    // deferred runtime: it may only bind listeners at the top level.
    function getDemoScripts() {
        return Array.prototype.map.call(document.querySelectorAll('script[data-demo-script]'), function (x) { return '<script>' + x.textContent + '</' + 'script>'; }).join('');
    }

    // The NDS runtime: the page's own deferred scripts from assets/js (not docs-assets).
    function getRuntimeScripts() {
        return Array.prototype.filter.call(document.querySelectorAll('script[defer][src]'), function (x) { return /\/assets\/js\//.test(x.src); })
            .map(function (x) { return '<script defer src="' + x.src + '"></' + 'script>'; }).join('');
    }
    // dark: the preview is dark, so the whole frame page is too (its background, backdrop and menus).
    function getRootAttributes(dark) {
        var html = document.documentElement, out = Array.prototype.filter.call(html.attributes, function (attribute) { return !/^data-nds-/.test(attribute.name); })
            .map(function (attribute) {
                var value = attribute.name === 'data-theme' && dark && !/(^|\s)dark(\s|$)/.test(attribute.value) ? (attribute.value + ' dark').trim() : attribute.value;
                return attribute.name + '="' + value.replace(/"/g, '&quot;') + '"';
            });
        if (dark && !html.hasAttribute('data-theme')) out.push('data-theme="dark"');
        return out.join(' ');
    }

    // data-preview="page": the code is a whole <body>, so it previews as a page of its own, at the
    // chosen screen's size (Desktop is 1280 wide), scaled down to fit the card. The header and
    // footer are left out: only the code shows them. Each render loads a fresh frame over the old
    // one and swaps when it is ready, so the preview never blanks.
    // data-preview-height sets the Desktop height (a short part, the top bar); a page is 800.
    // "fit" sizes it to the content of each render, and follows the content as it grows.
    var PAGE = '1280x800';
    function renderPageFrame(card) {
        var dev = card.querySelector('.nds-doc-device');
        if (!dev) {
            dev = document.createElement('div');
            dev.className = 'nds-doc-device';
            card.appendChild(dev);
        }
        var pageDocument = new DOMParser().parseFromString(card.ndsOut, 'text/html');
        // Only a whole <body> loses them: a part canon (the footer) is the part itself.
        if (/<body[\s>]/i.test(card.ndsOut)) pageDocument.querySelectorAll('body > header, body > footer').forEach(function (el) { el.remove(); });
        var iframe = document.createElement('iframe');
        iframe.className = 'nds-doc-screen';
        iframe.title = 'Preview';
        iframe.style.visibility = 'hidden';
        var dark = card.getAttribute('data-theme') === 'dark' || !!pageDocument.querySelector('body > [data-theme~="dark"]');
        var canon = document.getElementById(card.getAttribute('data-preview-of'));
        iframe.onload = function () {
            // data-preview-light: drop the site's dark (the copied head script restores it), so a dark area shows on a light page.
            var root = iframe.contentDocument.documentElement;
            if (canon.hasAttribute('data-preview-light') && !dark) root.setAttribute('data-theme', (root.getAttribute('data-theme') || '').replace(/(^|\s)dark(?=\s|$)/g, '').trim());
            dev.querySelectorAll('iframe').forEach(function (x) { if (x !== iframe) x.remove(); });
            iframe.style.visibility = '';
            fit(card);
            var top = iframe.contentDocument.body && iframe.contentDocument.body.firstElementChild;
            if (top && canon.getAttribute('data-preview-height') === 'fit') new iframe.contentWindow.ResizeObserver(function () { fit(card); }).observe(top);
        };
        dev.appendChild(iframe);
        fit(card);
        // A light frame without screen buttons watches the card's width itself.
        if (canon.hasAttribute('data-preview-light') && !card.querySelector('[data-preview-screen]') && !card.ndsFitWatch) card.ndsFitWatch = NDS.onElementResize(card, function () { return function () { fit(card); }; });
        iframe.srcdoc = '<!doctype html><html ' + getRootAttributes(dark) + '><head><base target="_top">' + document.head.innerHTML +
            // No nav in the frame: sticky parts pin at its top, not under a missing nav. A nav part keeps its height.
            // data-preview-style on the canon: CSS for the preview only, never in the code.
            '<style>:root{color-scheme:normal!important;scrollbar-width:none' + (pageDocument.querySelector('.nds-main-nav') ? '' : ';--nds-nav-height:0px') + '}' +
            (document.getElementById(card.getAttribute('data-preview-of')).getAttribute('data-preview-style') || '') + '</style></head>' + pageDocument.body.outerHTML.replace(/<\/body>$/, getRuntimeScripts() + '</body>') + '</html>';
    }
    function fit(card) {
        var dev = card.querySelector('.nds-doc-device');
        if (!dev) return;
        // Desktop is the reader's own screen: a plain frame, no device around it.
        var desk = !card.getAttribute('data-screen'), bezel = desk ? 0 : BEZEL;
        var size = (card.getAttribute('data-screen') || PAGE).split('x'), width = +size[0], height = +size[1];
        var cs = getComputedStyle(card), room = card.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2 * bezel;
        var canon = document.getElementById(card.getAttribute('data-preview-of'));
        if (desk) height = +canon.getAttribute('data-preview-height') || height;
        if (desk && canon.getAttribute('data-preview-height') === 'fit') height = getContentHeight(dev, width) || height;
        // data-preview-light: the frame takes the card's width and its content's height, like a plain preview.
        if (desk && canon.hasAttribute('data-preview-light')) { width = room; height = getContentHeight(dev, width) || height; }
        var scale = Math.min(1, room / width);
        dev.style.cssText = 'width:' + (width * scale + 2 * bezel) + 'px;height:' + (height * scale + 2 * bezel) + 'px;' +
            (desk ? 'background:none;box-shadow:none' : 'border-radius:' + RADIUS + 'px');
        dev.querySelectorAll('iframe').forEach(function (iframe) {
            iframe.style.top = iframe.style.left = bezel + 'px';
            iframe.style.width = width + 'px';
            iframe.style.height = height + 'px';
            iframe.style.borderRadius = desk ? '' : (RADIUS - BEZEL) / scale + 'px';
            iframe.style.transform = 'scale(' + scale + ')';
            iframe.style.transformOrigin = '0 0';
        });
    }
    // The loaded frame's content height at width w; 0 before it loads.
    function getContentHeight(dev, width) {
        var iframe = dev.querySelector('iframe:last-of-type'), frameDocument = iframe && iframe.contentDocument, top = frameDocument && frameDocument.body && frameDocument.body.firstElementChild;
        if (!top) return 0;
        iframe.style.width = width + 'px';
        return Math.ceil(top.getBoundingClientRect().bottom + parseFloat(frameDocument.defaultView.getComputedStyle(frameDocument.body).paddingBottom));
    }
    // A page card has no slot: its first frame loads with the page.
    document.querySelectorAll('[data-preview-page]').forEach(renderFrame);

    // data-preview="run": Run mounts a copy of the code shown in the card's held box, where it can
    // leave the card (a FAB docks at the screen edge). Each copy's ids get its own suffix, so each
    // keeps its own panel. Clear takes every copy away.
    function fillRun(card, box, win) {
        var frameNds = (win || window).NDS;
        frameNds.init.destroy(box);
        box.innerHTML = card.ndsRunCode || dedent(document.getElementById(card.getAttribute('data-preview-of')).textContent);
        box.querySelectorAll('[id]').forEach(function (el) {
            var id = el.id;
            box.querySelectorAll('*').forEach(function (x) {
                Array.prototype.forEach.call(x.attributes, function (attribute) { if (attribute.value === id) attribute.value = id + '-' + box.ndsRun; });
            });
        });
        frameNds.init.mount(box);
    }
    var runs = 0;
    // The bar's held box is its next sibling, on the page and in a screen's copy. A screen's copies
    // mount in its own window; only the page's last copy is rebuilt on a choice.
    function addRunListeners(card, bar, win) {
        var held = bar.nextElementSibling, page = win === window;
        bar.querySelector('[data-run]').addEventListener('click', function () {
            var box = held.ownerDocument.createElement('div');
            box.ndsRun = ++runs;
            held.appendChild(box);
            if (page) card.ndsLastRun = box;
            fillRun(card, box, win);
        });
        bar.querySelector('[data-run-clear]').addEventListener('click', function () {
            win.NDS.init.destroy(held);
            held.innerHTML = '';
            if (page) card.ndsLastRun = null;
        });
    }
    // data-preview-of: every card has it; data-builder-card only one with a Variants table.
    document.querySelectorAll('[data-demo-run]').forEach(function (bar) { addRunListeners(bar.closest('[data-preview-of]'), bar, window); });

    // data-preview="panel": Preview mounts the code shown in its tall bottom panel, before the panel
    // opens, so the demo builds on a page of its own. Closing the panel takes the copy away.
    function fillStage(card) {
        var stage = card.ndsStage;
        NDS.init.destroy(stage);
        stage.innerHTML = card.ndsRunCode || dedent(document.getElementById(stage.closest('.nds-panel').id.replace(/-stage$/, '')).textContent);
        NDS.init.mount(stage);
    }
    document.querySelectorAll('[data-demo-stage]').forEach(function (stage) {
        var panel = stage.closest('.nds-panel'), button = document.querySelector('[data-panel-toggle="' + panel.id + '"]');
        var card = button.closest('.nds-doc-frame');
        card.ndsStage = stage;
        // Out of the doc layout: its card-view rules would give the staged section a shadow and padding.
        document.body.appendChild(panel);
        button.addEventListener('click', function () { fillStage(card); });
        panel.addEventListener('nds:panel:closed', function () {
            NDS.init.destroy(stage);
            stage.innerHTML = '';
        });
    });

})();
