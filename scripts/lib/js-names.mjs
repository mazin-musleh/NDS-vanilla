// PERSONA entries 1, 10 and 12, the naming half: an acorn walk, since the rules hang on scope
// (module, function, class member) that check-js-rules.mjs's char scanner cannot see.
// checkNames(files, read) → [{ rule, file, line, what, verify? }]; the rule id is P<entry>.<rule>.
//
// Left to the reader: entry 12 rules 5 and 6 (whether a hook sits on the component's own element,
// whether a token names a state) and rule 15's "named for what it holds" beyond the AbortController suffix.
// ponytail: VERBS is a hand list, so a new verb reads as `verify` until it is added; a noun added
// by mistake hides a finding, so add only words that are verbs in every reading.

import { parse } from 'acorn';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { parseBanner } from '../check-banners.mjs';

// Entry 10's internal table: a replaced first word → its verb.
const BANNED = {
    generate: 'buildX', populate: 'renderX', update: 'syncX (no input) / setX(value)', apply: 'syncX (no input) / setX(value)',
    paint: 'syncX', recheck: 'syncX', bind: 'addXListeners', wire: 'addXListeners', attach: 'addXListeners',
    initialize: 'setupX', teardown: 'cleanupX', unwire: 'cleanupX', on: 'handleX', emit: 'dispatchX', unsub: 'offX',
    in: 'isX / hasX',
};
// Banned only with a suffix: the bare word is a loader hook.
const BANNED_PREFIX = { init: 'setupX', refresh: 'syncX (refresh() is the loader hook)' };
const BANNED_SUFFIX = { Handler: 'handleX', Exists: 'isX / hasX' };

// Verbs in every reading. Not here on purpose (noun first, so `verify`): page, item, row, menu,
// list, label, link, step, part, own, safe, real, scope, group, position, offset, max, total.
const VERBS = new Set(`get set is has sync handle build render remove show resolve ensure read dispatch parse format
toggle open stamp clear hide scroll write add schedule reset check validate detect lex load restore close save destroy
cancel sanitize activate deactivate drop focus blur run find warn stop to from go fetch fill push finish copy collect
share commit move announce dismiss normalize start mark guard track shift pick insert arm confirm reveal mirror adopt
count skip report print walk extract collapse expand process flush scan fire clamp convert dedent filter listen unlisten
wrap unwrap rebuild place download query rollback release settle resync capture reconcile resize enable disable recount
reserve trigger persist cycle animate pause resume say hit look highlight try change reprocess sniff split resend pack
translate compose subscribe unsubscribe swap delete lock unlock unguard pad tick append prepend cache cleanup setup
reposition serialize call unapply flatten limit undo choose fit visit wait leave clean rename interpret strip scrub
reload hydrate compute embed prevent align unlink evaluate infer export order register unregister ride make reapply audit control
refocus classify submit harvest associate enter exit describe repeat watch unwatch enhance queue mount unmount manage
distribute relabel park match matches contains repaint measure remeasure store renew extend recompute invalidate compare
fix calculate clone recenter jump repair switch complete relocalize slugify hover unstamp retry abort upload fail play
stash retext prewarm advance select navigate inject accept allow off next prev log observe unobserve notify sort merge
assign detach keep encode decode escape unescape trim join replace truncate estimate determine prepare begin end send
request receive post emit bump nudge snap zoom pan drag swipe press round sum localize debounce throttle defer preload
prefetch conceal mask unmask trace refresh init create destroy reinit dismiss coerce cast test lookup scroll install
uninstall flash drain trap flip attach bind wire paint apply update populate generate initialize teardown unwire recheck unsub`.split(/\s+/));
// Kept apart from VERBS so a banned word never reads as known.
for (const w of [...Object.keys(BANNED), ...Object.keys(BANNED_PREFIX)]) VERBS.delete(w);

// Entry 10 rule 8: abbreviations. LOCAL_OK is the locals' and parameters' short list.
const ABBREV = new Set(`fmt val vals norm sel sels msg msgs dtf cal ymd cmd pct pos idx len num nums str obj arr cb cbs
tmp cfg conf ctx evt ev err errs ac li lis el els elem elems btn btns opt opts doc docs cur curr mq esc inst attr attrs
prep res req resp calc dim dims lbl txt ctrl ctrls mgr util utils coll tpl tmpl fn dest ns
fc cs sw dm acc anim fd dd toks cls ch re dlg win op ops ext lo hi sec secs sib pts fns tz mer frag si inp sig st
rad ci dist lat lng ta ver mo tpls mi sr sg oc tb ph ei ico rs arg args mag strs dec grad pt temp cond ws perf vs ro io
bool qs tx ty greg dn cr fmts regs ind lim acts mcs vv deco cmds lh occ cac nr er rm rec le sep tt dup pab pabs sb ri
pag av bv cmp seq bg ds uf osc srel fwd desc col cols tw bp desk def dev prop props ti mr2 h12 alls`.split(/\s+/));
const LOCAL_OK = new Set(['el', 'e', 'i', 'j', 'x', 'y', 'fn', 'opts', 'btn']);
// A short word that is a word: English, a platform name (an HTML tag or attribute, a CSS unit, an SVG or canvas
// argument), or a standard acronym. Any other 2–4 letter word is a verify line: read it, then add it here or to ABBREV.
const SHORT_OK = new Set(`is get set has add end top on off to in at by of up go no or as and for not any all new old own
per raw run was now it ok can had out few two why use say try way may yes key id ids uid url api css js svg dom rtl
html json aria csv xls iban otp ipv ajax xhr mime a11y i18n toc fab cta ui bom gtag hgi nds iso md sm lg pm px ms vh
vw deg rem fr cx cy dx dy x0 y0 t0 t1 t2 p0 p1 p2 p3 cp1x cp1y cp2x cp2y th tr td ul div span img pre nav sub subs ths
src href alt rel dir lang role ref refs var vars name page text item list root node menu row rows date open sync data
init type max file form icon next find link last year rect min tag tags box step done unit left read from real prev
rule size code day days mode host base cell self path pad auto lazy bar bars tab tabs call card mask time line slot
body hour deck dark wrap chip live site hits edge band gap char stop head atom load axis lex view grid logo side main
area dot dots city map tail spec hero drop pick hide warn seed pair keys safe zoom fits drag only skip fix fill copy
hold tier save move kind hit tip push fire pack seen want arm back star bad same walk kept navs nice sum make held
swap zone with down room fit runs flip info snap rest lock jump keep full test best each here what home scan wall
tick week once void kids twin none undo demo like exit blob dock ride near low knob peek more hash pass half wait
over hook fail tone grab wire dead look lost verb need note deep plot font axes arc defs into pool bus miss zero era
away wins lay clip px flag bold flow stem ends diff mine idle when log park sign fade app mid busy sort meta play gain
lead warm loop also both even just last less most much must next once part show cat sum word mark pie tap
intl os lab outs offs high`.split(/\s+/));

// The hook names and entry 10's public verbs stand alone.
const EXACT_OK = new Set(['whenReady', 'getInstance', 'initialize', 'init', 'reinit', 'refresh', 'destroy', 'create', 'constructor', 'open', 'close', 'toggle',
    'show', 'hide', 'enable', 'disable', 'next', 'prev', 'goTo', 'clear', 'validate', 'mount', 'cleanup', 'setup']);

// camelCase words, an acronym run kept as one word: toCSVFile → to CSV File.
const words = (name) => name.replace(/^_+/, '').match(/[A-Z]+(?![a-z])|[A-Z]?[a-z0-9]+|[A-Z]/g) || [];
// Two or more capitals as one word; X / Y alone are axis names (renderXLabels).
const acronym = (name) => !/^[A-Z0-9_$]+$/.test(name) && words(name).some((w) => w.length > 1 && /^[A-Z]+$/.test(w));
const kindOf = (n) => ({ ObjectExpression: 'an object', ArrayExpression: 'an array', NewExpression: `a new ${n.callee?.name}` })[n.type] || 'a computed value';
const constCase = (n) => /^[A-Z][A-Z0-9_]*$/.test(n);
const isFn = (n) => n && /^(FunctionExpression|ArrowFunctionExpression)$/.test(n.type);
const isPrimitive = (n) => n && ((n.type === 'Literal' && !(n.value instanceof RegExp)) ||
    (n.type === 'TemplateLiteral' && !n.expressions.length) || (n.type === 'UnaryExpression' && n.argument.type === 'Literal'));
// A computed value that is a primitive whatever its parts: `a + b`, a template, `typeof x`, `k in o`.
const yieldsPrimitive = (n) => n && (isPrimitive(n) || /^(BinaryExpression|UnaryExpression|TemplateLiteral)$/.test(n.type) ||
    (n.type === 'ConditionalExpression' && yieldsPrimitive(n.consequent) && yieldsPrimitive(n.alternate)) ||
    (n.type === 'LogicalExpression' && yieldsPrimitive(n.left) && yieldsPrimitive(n.right)));
const rootName = (n) => { while (n && n.type === 'MemberExpression') n = n.object; return n?.type === 'Identifier' ? n.name : n?.type === 'ThisExpression' ? 'this' : ''; };
const propName = (m) => (m?.type !== 'MemberExpression' ? null : !m.computed && m.property.type === 'Identifier' ? m.property.name : m.computed && m.property.type === 'Literal' ? String(m.property.value) : null);

// Every identifier a pattern binds.
function bound(p, out = []) {
    if (!p) return out;
    if (p.type === 'Identifier') out.push(p);
    else if (p.type === 'ObjectPattern') p.properties.forEach((q) => bound(q.type === 'RestElement' ? q.argument : q.value, out));
    else if (p.type === 'ArrayPattern') p.elements.forEach((q) => bound(q, out));
    else if (p.type === 'AssignmentPattern') bound(p.left, out);
    else if (p.type === 'RestElement') bound(p.argument, out);
    return out;
}

// Public names: a call or member on the banner's Methods lines.
function bannerNames(source) {
    const methods = parseBanner(source)?.sections.find((s) => s.label === 'Methods')?.text || '';
    return new Set([...methods.matchAll(/\.([A-Za-z_$][\w$]*)|([A-Za-z_$][\w$]*)\s*\(/g)].map((m) => m[1] || m[2]));
}

function parseFile(file, source) {
    return parse(source, { ecmaVersion: 'latest', locations: true, allowHashBang: true });
}

// One file's facts: what it defines under `_`, and every finding that needs only the file.
function scanFile(file, source) {
    const name = basename(file);
    const out = [];
    const push = (rule, node, what, verify) => out.push({ rule, file: name, line: node.loc.start.line, what, ...(verify ? { verify } : {}) });
    let ast;
    try { ast = parseFile(file, source); } catch (e) {
        return { name, out: [{ rule: 'P12', file: name, line: e.loc?.line || 1, what: `cannot parse: ${e.message}` }], defines: new Set(), expandos: new Set(), uses: [] };
    }
    const banner = parseBanner(source) ? bannerNames(source) : null;
    const defines = new Set(); // `_x` members this file declares: class members, this._x, namespace keys
    const expandos = new Set(); // `_x` it writes on another object
    const uses = []; // { name, node }: `._x` member reads and writes
    const weakMaps = new Set();
    const topStrings = new Map(); // module const → string, for storage keys held in a constant
    const seen = new Set(); // one line per declaration
    const once = (key, fn) => { if (!seen.has(key)) { seen.add(key); fn(); } };

    const fnName = (node, id, { pub = false } = {}) => {
        const n = id.name;
        if (n.startsWith('#') || EXACT_OK.has(n) || /^[A-Z]/.test(n)) return; // PascalCase: a constructor, rule 7's
        const tag = pub ? ' (on the banner: section 3 decides)' : '';
        const ws = words(n);
        const first = ws[0]?.toLowerCase();
        const last = ws.at(-1);
        if (acronym(n)) push('P10.3', node, `\`${n}\` writes an acronym in capitals: one word (toCsv)${tag}`);
        const short = ws.map((w) => w.toLowerCase()).filter((w) => ABBREV.has(w));
        if (short.length) push('P10.8', node, `\`${n}\` shortens ${short.map((w) => `\`${w}\``).join(', ')}: whole words${tag}`);
        if (pub && first === 'on') return; // a public onX subscribes (NDS.onResize: entry 6); the ban is for listener functions
        if (pub && first === 'init') return; // a public initX runs init() for one part (entry 10 carve-out)
        if (BANNED[first]) return push('P10.4', node, `\`${n}\`: \`${first}\` → ${BANNED[first]}${tag}`);
        if (BANNED_PREFIX[first] && ws.length > 1) return push('P10.4', node, `\`${n}\`: \`${first}X\` → ${BANNED_PREFIX[first]}${tag}`);
        if (ws.length > 1 && BANNED_SUFFIX[last]) return push('P10.4', node, `\`${n}\`: \`…${last}\` → ${BANNED_SUFFIX[last]}${tag}`);
        if (first === 'create' && ws.length > 1) return push('P10.4', node, `\`${n}\`${tag}`, 'createX that returns DOM → buildX; an instance keeps create');
        if (!VERBS.has(first)) push('P10.0', node, `\`${n}\` starts with \`${first}\`${tag}`, 'not a known verb: verb first, or add the verb to VERBS');
    };

    // Rule 11, once per class and name: a method or a `this.x` field, written or read.
    const member = (ctx, p, node) => once(`11 ${ctx.cls.start} ${p}`, () => {
        const method = ctx.methods.has(p);
        if (banner && !banner.has(p) && !/(^a|A)bortController$/.test(p))
            push('P12.11', node, `${method ? 'member' : 'field'} \`${p}\` is not on the banner: add it there, or rename \`_${p}\``);
        if (!method) fieldWords(ctx, p, node); // fnName judges a method's words
    });
    const fieldWords = (ctx, p, node) => once(`words ${ctx.cls.start} ${p}`, () => {
        const short = words(p).map((w) => w.toLowerCase()).filter((w) => ABBREV.has(w));
        if (short.length) push('P10.8', node, `field \`this.${p}\` shortens ${short.map((w) => `\`${w}\``).join(', ')}: whole words`);
        if (acronym(p)) push('P10.3', node, `field \`this.${p}\` writes an acronym in capitals`);
    });

    const local = (id, node) => {
        const n = id.name;
        if (n === '_' ) return;
        const lower = n.replace(/^_+/, '');
        const ws = words(n).map((w) => w.toLowerCase());
        if (n.length === 1 ? !LOCAL_OK.has(n) : (ABBREV.has(lower.toLowerCase()) && !LOCAL_OK.has(lower)) ||
            (ws.length > 1 && ws.some((w) => ABBREV.has(w) && !LOCAL_OK.has(w))))
            push('P10.8', node, `local \`${n}\`: whole words (short list: ${[...LOCAL_OK].join(' ')})`);
        else {
            const unknown = ws.filter((w) => w.length >= 2 && w.length <= 4 && !LOCAL_OK.has(w) && !SHORT_OK.has(w) && !ABBREV.has(w));
            if (unknown.length) push('P10.8', node, `local \`${n}\`: is ${unknown.map((w) => `\`${w}\``).join(', ')} a word?`, 'a word → SHORT_OK; a shortening → ABBREV and rename');
        }
        if (acronym(n)) push('P10.3', node, `local \`${n}\` writes an acronym in capitals`);
    };

    // ctx: { module (declarations here are module scope), cls (enclosing class node), fnDepth }
    function walk(node, ctx, parent) {
        if (!node || typeof node.type !== 'string') return;
        const kid = (c, k = ctx) => walk(c, k, node);
        switch (node.type) {
            case 'ExpressionStatement': {
                // A top-level IIFE's body is module scope.
                let e = node.expression;
                if (e.type === 'UnaryExpression') e = e.argument;
                if (ctx.fnDepth === 0 && e.type === 'CallExpression' && isFn(e.callee)) {
                    e.callee.params.forEach((p) => bound(p).forEach((id) => local(id, p)));
                    if (e.callee.body.type === 'BlockStatement') e.callee.body.body.forEach((s) => kid(s, { ...ctx, module: true, fnDepth: 1 }));
                    e.arguments.forEach((a) => kid(a));
                    return;
                }
                break;
            }
            case 'VariableDeclaration':
                for (const d of node.declarations) {
                    for (const id of bound(d.id)) {
                        if (/^_[A-Za-z]/.test(id.name)) push('P12.13', id, `\`${id.name}\` is a binding: no \`_\` on a name nothing outside can reach`);
                        if (isFn(d.init)) fnName(d, id, { pub: ctx.module && exported.has(id.name) });
                        else if (ctx.module && d.id.type === 'Identifier') {
                            if (node.kind === 'const' && constCase(id.name) && d.init && !yieldsPrimitive(d.init) && !/^Object\.freeze/.test(source.slice(d.init.start, d.init.start + 13)) && !(d.init.type === 'NewExpression' && /^RegExp$/.test(d.init.callee.name)) && d.init.type !== 'Literal')
                                push('P12.8', id, `\`${id.name}\` is upper case but holds ${kindOf(d.init)}`, 'upper case only for a primitive or frozen value never reassigned');
                            if (node.kind === 'const' && !constCase(id.name) && isPrimitive(d.init))
                                push('P12.8', id, `\`${id.name}\` holds a primitive constant`, 'upper snake case, unless it is a setting read per call');
                            local(id, d); // module names take whole words too (entry 12 rule 8)
                            if (/^[A-Z][a-z]/.test(id.name) && d.init && d.init.type !== 'ClassExpression')
                                push('P12.8', id, `\`${id.name}\` is PascalCase but is not a class: camelCase`);
                            if (d.init?.type === 'Literal' && typeof d.init.value === 'string') topStrings.set(id.name, d.init.value);
                            if (d.init?.type === 'NewExpression' && /^Weak(Map|Set)$/.test(d.init.callee.name)) weakMaps.add(id.name);
                        } else if (!ctx.module && ctx.fnDepth) local(id, d);
                        else if (acronym(id.name)) push('P10.3', id, `\`${id.name}\` writes an acronym in capitals`);
                    }
                }
                break;
            case 'FunctionDeclaration':
                if (/^_[A-Za-z]/.test(node.id.name)) push('P12.13', node.id, `function \`${node.id.name}\`: no \`_\` on a name nothing outside can reach`);
                fnName(node, node.id, { pub: ctx.module && exported.has(node.id.name) });
                break;
            case 'ClassDeclaration':
            case 'ClassExpression':
                if (node.id && !/^Nds[A-Z][a-z0-9]*([A-Z][a-z0-9]+)*$/.test(node.id.name))
                    push('P12.7', node.id, `class \`${node.id.name}\` → \`Nds{Name}\`, an acronym as one word`);
                node.superClass && kid(node.superClass);
                {
                    const methods = new Set(node.body.body.filter((m) => m.type === 'MethodDefinition' && m.key.type === 'Identifier').map((m) => m.key.name));
                    node.body.body.forEach((m) => kid(m, { ...ctx, module: false, cls: node, methods }));
                }
                return;
            case 'MethodDefinition':
            case 'PropertyDefinition':
                if (node.key.type === 'PrivateIdentifier') push('P12.16', node.key, `\`#${node.key.name}\`: no \`#private\`, \`_\` is the one mark`);
                else if (node.key.type === 'Identifier') {
                    const n = node.key.name;
                    if (n.startsWith('_')) defines.add(n);
                    else if (n !== 'constructor') member(ctx, n, node.key);
                    if (node.type === 'MethodDefinition' && node.kind === 'method') fnName(node, node.key, { pub: banner?.has(n) && !n.startsWith('_') });
                }
                break;
            case 'AssignmentExpression': {
                const l = node.left;
                if (l.type === 'MemberExpression') {
                    const p = propName(l), root = rootName(l.object), objIsThis = l.object.type === 'ThisExpression';
                    if (p && /^(window|globalThis)$/.test(root) && l.object.type === 'Identifier' && p !== 'NDS' && !/^__NDS_[A-Z0-9_]+$/.test(p))
                        push('P12.1', node, `\`${root}.${p}\`: an internal global is \`__NDS_{NAME}\``);
                    if (p && p.startsWith('_')) {
                        (objIsThis || root === 'NDS' ? defines : expandos).add(p);
                        // `_nds…` is an element expando by name; any other `_x` may sit on a same-file instance.
                        if (!objIsThis && root !== 'NDS' && root !== 'window')
                            once(`14 ${p} ${node.loc.start.line}`, () => push('P12.14', node, `\`${source.slice(l.start, l.end)}\`: private data on an element goes in a module WeakMap`,
                                p.startsWith('_nds') ? undefined : 'an element or a foreign object → WeakMap; an instance of a class in this file keeps it'));
                    }
                    if (p && /^nds[A-Z]/.test(p) && !objIsThis && root !== 'window' && propName(l.object) !== 'dataset' && typeof node.right.value === 'boolean')
                        push('P12.14', node, `\`${source.slice(l.start, l.end)} = ${node.right.raw}\`: a guard on the element → a module WeakSet`);
                    if (objIsThis && p && node.right.type === 'NewExpression' && node.right.callee.name === 'AbortController' && !/(^a|A)bortController$/.test(p.replace(/^_/, '')))
                        push('P1', node, `\`this.${p}\` holds an AbortController: \`abortController\`, or a name ending in \`AbortController\``);
                    // NDS.X.y = function: a namespace member
                    if (p && root === 'NDS' && isFn(node.right)) fnName(node, { name: p }, { pub: banner?.has(p) && !p.startsWith('_') });
                }
                if (l.type === 'MemberExpression' && propName(l) === 'cookie' && rootName(l) === 'document') {
                    const r = node.right;
                    const head = r.type === 'Literal' ? String(r.value) : r.type === 'TemplateLiteral' ? r.quasis[0].value.cooked : null;
                    if (head && !/^nds-/.test(head)) push('P12.3', node, `cookie \`${head.split('=')[0] || '…'}\`: a key is \`nds-{name}\``);
                }
                break;
            }
            case 'MemberExpression': {
                const p = propName(node);
                if (p && p.startsWith('_')) {
                    uses.push({ name: p, node });
                    if (ctx.cls && node.object.type === 'ThisExpression' && !ctx.methods.has(p)) fieldWords(ctx, p, node); // `_` takes the banner rule off, not the words
                } else if (p && ctx.cls && node.object.type === 'ThisExpression') member(ctx, p, node);
                if (node.property.type === 'PrivateIdentifier') push('P12.16', node, `\`#${node.property.name}\`: no \`#private\``);
                break;
            }
            case 'CallExpression': {
                const c = node.callee;
                // Object.defineProperty(NDS, 'isRtl', …): a public value by another road.
                if (source.slice(c.start, c.end) === 'Object.defineProperty' && rootName(node.arguments[0]) === 'NDS' && typeof node.arguments[1]?.value === 'string') {
                    const k = node.arguments[1].value, tag = banner?.has(k) ? ' (on the banner: section 3 decides)' : '';
                    if (acronym(k)) push('P10.3', node, `\`${k}\` writes an acronym in capitals${tag}`);
                }
                if (c.type === 'MemberExpression' && ((/^(setItem|getItem|removeItem)$/.test(propName(c) || '') && /(local|session)Storage$/.test(source.slice(c.object.start, c.object.end))) ||
                    (/^(get|set|remove)$/.test(propName(c) || '') && source.slice(c.object.start, c.object.end) === 'NDS.cookie'))) {
                    const a = node.arguments[0];
                    const key = a?.type === 'Literal' ? String(a.value) : a?.type === 'TemplateLiteral' ? a.quasis[0].value.cooked : a?.type === 'Identifier' ? topStrings.get(a.name) : undefined;
                    if (key !== undefined && !/^nds-/.test(key)) once(`3 ${key}`, () => push('P12.3', node, `storage key \`${key}\`: a key is \`nds-{name}\``));
                }
                if (c.type === 'MemberExpression' && propName(c) === 'set' && c.object.type === 'Identifier' && weakMaps.has(c.object.name) &&
                    node.arguments[1]?.type === 'NewExpression' && node.arguments[1].callee.name === 'AbortController' && !/AbortControllers$/.test(c.object.name))
                    push('P12.15', node, `WeakMap \`${c.object.name}\` holds AbortControllers: end its name in \`AbortControllers\``);
                break;
            }
            case 'NewExpression':
                if (node.callee.name === 'CustomEvent') {
                    const detail = node.arguments[1]?.properties?.find((q) => q.key?.name === 'detail')?.value;
                    for (const q of detail?.type === 'ObjectExpression' ? detail.properties : []) {
                        const k = q.key?.type === 'Identifier' ? q.key.name : q.key?.value;
                        if (typeof k === 'string' && (!/^[a-z][a-zA-Z0-9]*$/.test(k) || acronym(k))) push('P12.10', q, `detail key \`${k}\`: camelCase whole words`);
                    }
                }
                break;
            case 'Literal':
                if (typeof node.value === 'string' && /^nds_/.test(node.value)) push('P12.3', node, `\`'${node.value}'\`: a key prefix is \`nds-\`, not \`nds_\``);
                break;
            case 'ObjectExpression':
                // A `_x` method on any object of this file is its own (a prototype: `_validateInput: function`).
                for (const q of node.properties)
                    if (q.type === 'Property' && q.key.type === 'Identifier' && q.key.name.startsWith('_') && (q.method || isFn(q.value))) defines.add(q.key.name);
                // A namespace object (an inner object literal is data, its keys are not names). A key whose
                // value names a function of this file is a method too: `{ updateDate }`.
                if (namespaces.has(node)) {
                    for (const q of node.properties) {
                        if (q.type !== 'Property' || q.key.type !== 'Identifier') continue;
                        if (q.key.name.startsWith('_')) defines.add(q.key.name);
                        if (q.kind !== 'init') continue; // a getter is a value (`get site()`)
                        if (/^[A-Z]/.test(q.key.name)) continue; // a class on a namespace (DatePicker.Calendar): entry 10 rule 1
                        if (isFn(q.value) || q.method || (q.value.type === 'Identifier' && fnBindings.has(q.value.name)))
                            fnName(q, q.key, { pub: !q.key.name.startsWith('_') });
                    }
                }
                break;
        }
        const inFn = isFn(node) || node.type === 'FunctionDeclaration';
        if (inFn) {
            node.params.forEach((p) => bound(p).forEach((id) => {
                if (/^_[A-Za-z]/.test(id.name)) push('P12.13', id, `parameter \`${id.name}\`: no \`_\` on a binding`);
                local(id, p);
            }));
            if (node.id && node.type === 'FunctionExpression') fnName(node, node.id);
        }
        if (node.type === 'CatchClause' && node.param) bound(node.param).forEach((id) => local(id, node.param));
        const next = inFn ? { ...ctx, module: false, fnDepth: ctx.fnDepth + 1 } : ctx;
        for (const k in node) {
            if (k === 'loc' || (inFn && k === 'params')) continue;
            const v = node[k];
            if (Array.isArray(v)) v.forEach((c) => walk(c, next, node));
            else if (v && typeof v.type === 'string') walk(v, next, node);
        }
    }
    // Before the walk: every function binding, and the namespace objects in their three shapes:
    // NDS.X = { … }; NDS.X = (function () { … return { … }; })(); const api = { … }; NDS.X = api.
    const fnBindings = new Set(), namespaces = new Set(), nsNames = new Set(), nsFns = new Set(), inits = [];
    (function scan(n) {
        if (!n || typeof n.type !== 'string') return;
        if (n.type === 'FunctionDeclaration' && n.id) fnBindings.add(n.id.name);
        if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier') {
            if (isFn(n.init)) fnBindings.add(n.id.name);
            if (n.init?.type === 'ObjectExpression') inits.push(n);
        }
        if (n.type === 'AssignmentExpression' && rootName(n.left) === 'NDS') {
            const r = n.right;
            if (r.type === 'ObjectExpression') namespaces.add(r);
            else if (r.type === 'Identifier') nsNames.add(r.name);
            else if (r.type === 'CallExpression' && isFn(r.callee)) nsFns.add(r.callee);
        }
        for (const k in n) { if (k === 'loc') continue; const v = n[k]; if (Array.isArray(v)) v.forEach(scan); else if (v && typeof v.type === 'string') scan(v); }
    })(ast);
    for (const d of inits) if (nsNames.has(d.id.name)) namespaces.add(d.init);
    for (const f of nsFns) for (const st of f.body.body || []) {
        if (st.type !== 'ReturnStatement') continue;
        if (st.argument?.type === 'ObjectExpression') namespaces.add(st.argument);
        // const api = { … }; return api;
        if (st.argument?.type === 'Identifier') for (const d of inits) if (d.id.name === st.argument.name && d.start > f.start && d.end < f.end) namespaces.add(d.init);
    }
    // A function a namespace exports under its own name is public where it is declared too: `{ onReset }`.
    const exported = new Set();
    for (const ns of namespaces) for (const q of ns.properties)
        if (q.type === 'Property' && q.key.type === 'Identifier' && q.value?.type === 'Identifier' && q.value.name === q.key.name && fnBindings.has(q.key.name)) exported.add(q.key.name);
    for (const s of ast.body) walk(s, { module: true, cls: null, fnDepth: 0 }, ast);
    return { name, out, defines, expandos, uses };
}

export function checkNames(files, read = (f) => readFileSync(f, 'utf8'), report = files) {
    const scans = [];
    const out = [];
    // A crash in the walk is a checker bug: it throws with the file named, never turns into a finding.
    for (const f of files) {
        try { scans.push(scanFile(f, read(f))); } catch (e) { e.message = `${basename(f)}: ${e.message}`; throw e; }
    }
    // Rule 12: a `_` name another file defines and this one does not.
    const owners = new Map();
    for (const s of scans) for (const n of new Set([...s.defines, ...s.expandos])) (owners.get(n) || owners.set(n, []).get(n)).push(s.name);
    const expandoFiles = new Map();
    for (const s of scans) for (const n of s.expandos) (expandoFiles.get(n) || expandoFiles.set(n, new Set()).get(n)).add(s.name);
    const wanted = new Set(report.map((f) => basename(f)));
    for (const s of scans) {
        if (!wanted.has(s.name)) continue;
        out.push(...s.out);
        const seen = new Set();
        for (const { name, node } of s.uses) {
            // Own when this file declares it. Its own expando is shared when another file writes the same
            // expando; when another file only declares a member of that name, only the types can tell.
            const others = (owners.get(name) || []).filter((f) => f !== s.name);
            if (s.defines.has(name) || seen.has(name) || !others.length || name.startsWith('__')) continue; // __NDS_*: rule 1's globals
            seen.add(name);
            const shared = !s.expandos.has(name) || others.some((f) => expandoFiles.get(name)?.has(f));
            out.push({ rule: 'P12.12', file: s.name, line: node.loc.start.line, what: `\`${name}\` is also used in ${others.join(', ')}: a public name, or a base or core (entry 11)`,
                ...(shared ? {} : { verify: 'written here on another object: a member of that file → public name; its own expando → a name of its own' }) });
        }
    }
    return out;
}
