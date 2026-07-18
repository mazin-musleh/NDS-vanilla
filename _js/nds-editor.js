/**
 * NDS Editor — rich-text editing surface (contenteditable) mirrored into a
 * textarea form field. Toolbar formatting (bold/italic/underline/strike,
 * headings, lists), link and image popovers (direct URL or uploaded file
 * embedded as data:image), source view, and paste sanitization (pasted
 * images ride through it; clipboard image files paste as data:image).
 *
 * ADOPT-A-TEXTAREA: the markup contract is a standard NDS textarea field
 * wearing .nds-editor on its container — nothing editor-specific is authored.
 * Init adopts the field's textarea (adds .nds-editor-source + tabindex=-1,
 * never replacing it, so name/id/required and consumer listeners survive),
 * generates the contenteditable surface in front of it (placeholder and
 * accessible name derived from the field, value hydrated from textarea.value
 * through sanitize), and derives readonly/disabled container state from the
 * native attrs.
 *
 * The toolbar is GENERATED too: data-editor-toolbar on the root picks the
 * commands (space-separated data-cmd tokens, "|" starts a new button group,
 * "source" renders at the bar's end, "none" opts out; absent = the full
 * default set). ARIA labels resolve ar/en via NDS.lang. Pre-init the
 * skeleton in _editor.scss holds the field until the stamp lands.
 *
 * Status: BETA — ships with v1.4.0. Under heavy testing and real-project
 * hardening; API and markup contract may still change.
 *
 * Form carrier: the adopted textarea (clip-hidden post-init — never [hidden],
 * so NDS.Forms validation still sees it) holds the sanitized pretty-printed
 * HTML; bubbling input/change events keep forms delegation and consumer
 * listeners native.
 *
 * NDS-specific: pasted or source-typed NDS component markup (nds-* classed
 * regions — buttons, tags, tables, cards, alerts…) is kept through sanitize
 * with a filtered class/attribute set; foreign markup still reduces to the
 * plain formatting vocabulary.
 *
 * Event: `nds:editor:ready` with { instance } after init.
 *
 * Tests: scripts/editor-fixtures.mjs drives the real sanitize/paste/shell-guard/
 * history/link pipeline in a browser (`node scripts/editor-fixtures.mjs`, dev
 * server on :4002). It is the editor's regression gate — EXTEND it with a fixture
 * on ANY pipeline change (sanitizer, allowlists, paste, shell guards, toolbar),
 * don't hand-roll a throwaway check.
 */

(function () {
    'use strict';

    // ponytail: tag-whitelist sanitizer. Upgrade to DOMPurify only if a security review demands fuller spec compliance.
    const ALLOWED_TAGS = new Set(['P', 'BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A', 'IMG', 'H1', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI']);
    // Dropped whole, never unwrapped — unwrapping would leak their TEXT into
    // content (a Word clipboard ships a <style> block whose CSS would become
    // visible text) or keep active/embedded surfaces.
    const DROP_TAGS = new Set(['STYLE', 'SCRIPT', 'HEAD', 'META', 'LINK', 'TITLE', 'XML', 'TEMPLATE', 'NOSCRIPT', 'IFRAME', 'FRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'SELECT', 'TEXTAREA', 'INPUT', 'AUDIO', 'VIDEO', 'CANVAS', 'MAP', 'BASE']);
    const INLINE_TAGS  = new Set(['BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A']);
    const BLOCK_TAGS   = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'LI']);
    // The one style sanitize keeps on generic blocks: the toolbar's LOGICAL
    // alignment. start is the default (never serialized); physical left/right
    // — foreign paste junk — strips with everything else.
    const ALIGN_VALUES = new Set(['center', 'end', 'justify']);
    const CMD_BLOCK_MAP = { h1: 'H1', h2: 'H2', h3: 'H3', h4: 'H4' };
    // One trust decision for every URL the editor keeps: scheme-less URLs
    // (relative — path/to/img.jpg, page.html, #anchor — doc-example canon)
    // pass; an explicit scheme must be allowlisted, so javascript:,
    // vbscript: and data:text/html die on the scheme test. data:image/ is
    // src-only: inside <img src> it can't script (uploads/screenshots embed
    // as data URLs), unlike data: in an href. cleanUrl first strips what
    // browsers strip before resolving (tab/CR/LF anywhere, controls/space
    // at the ends) — without it "jav\tascript:" reads as scheme-less.
    const HAS_SCHEME = /^[a-z][\w+.-]*:/i;
    const URL_SCHEMES = /^(?:https?|mailto|tel):/i;
    const SRC_SCHEMES = /^(?:https?:|data:image\/)/i;
    const cleanUrl = (u) => u.replace(/^[\u0000-\u0020]+|[\u0000-\u0020]+$/g, '').replace(/[\t\n\r]/g, '');
    const safeUrl = (u) => URL_SCHEMES.test(u) || !HAS_SCHEME.test(u);
    const safeSrc = (u) => SRC_SCHEMES.test(u) || !HAS_SCHEME.test(u);

    // NDS component regions — the editor is NDS-specific, so pasted/typed NDS
    // component markup (buttons, tags, tables, cards, alerts…) is kept, not
    // stripped. An element in NDS_TAGS carrying an nds-* class roots a region;
    // inside it structural tags survive, classes filter to the NDS/HGI
    // vocabulary, and attributes reduce to the styling/a11y set in
    // scrubRegionElement — never style/on*/id, so the trust boundary holds.
    const NDS_TAGS = new Set(['DIV', 'SPAN', 'BUTTON', 'A', 'I', 'P', 'BR', 'HR', 'STRONG', 'EM', 'B', 'U', 'S', 'STRIKE', 'SMALL',
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'TABLE', 'CAPTION', 'THEAD', 'TBODY', 'TFOOT', 'TR', 'TH', 'TD',
        'FIGURE', 'FIGCAPTION', 'BLOCKQUOTE', 'CITE', 'IMG', 'DL', 'DT', 'DD']);
    // Full-token validation, not a prefix test: a whitespace-free token can
    // carry markup (nds-x<img…>), so trust requires the WHOLE token to be
    // word-safe with real content after the prefix (`hgi` alone is the one
    // bare base class) — hostile and empty-prefix tokens both die here.
    const NDS_CLASS = /^(?:nds-[\w-]+|hgi(?:-[\w-]+)?)$/;
    // Region roots that may legitimately sit inline inside a <p>.
    const INLINE_REGION_TAGS = new Set(['SPAN', 'BUTTON', 'A', 'I']);
    // A table interpretMarkup stamped nds-table on is foreign content wearing an
    // NDS class, not markup an author claimed as NDS — so it gets table structure
    // plus the plain vocabulary, never NDS_TAGS' IMG/BUTTON/DIV (which the generic
    // whitelist strips, and which a converted table must not smuggle back in).
    const CONVERTED_TAGS = new Set(['TABLE', 'CAPTION', 'THEAD', 'TBODY', 'TFOOT', 'TR', 'TH', 'TD', ...ALLOWED_TAGS]);

    function hasNdsClass(el) {
        for (const c of el.classList) if (NDS_CLASS.test(c)) return true;
        return false;
    }

    // Local fork — also escapes quotes for attribute contexts (openTag); NDS.escapeHtml doesn't. Do not swap.
    const escapeHtml = (s) => s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

    // ---------- Interpret (normal markup → NDS vocabulary) ----------
    // Runs first inside sanitizeHtml: translate foreign dialects into the
    // editor's vocabulary so enforcement keeps meaning instead of junk.
    // Every step skips NDS-classed markup — that's already canon.

    const PHRASING_TAGS = new Set(['BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A', 'SPAN', 'IMG', 'CODE', 'SUP', 'SUB', 'SMALL', 'FONT', 'MARK']);
    // figure/figcaption ride along so captioned article images degrade to
    // img + caption paragraph instead of leaking bare caption text.
    const CONTAINER_SEL = 'div, section, article, aside, header, footer, main, center, figure, figcaption';

    function unwrapEl(el) {
        while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
        el.remove();
    }

    function renameEl(el, tag) {
        const next = el.ownerDocument.createElement(tag);
        while (el.firstChild) next.appendChild(el.firstChild);
        el.replaceWith(next);
        return next;
    }

    const inNdsMarkup = (el) => !!el.closest('[class*="nds-"]');

    // Word lists arrive as flat MsoListParagraph <p>s: the bullet/number glyph
    // sits in an mso-list:Ignore marker span, the depth in "mso-list:lN levelN".
    // Rebuild real nested ul/ol — ol when the marker reads as a number/letter.
    // The raw style attribute is regex-read: browsers drop unknown mso-*
    // properties from el.style, so CSSStyleDeclaration can't see them.
    function rebuildWordLists(root) {
        const doc = root.ownerDocument;
        const listInfo = (node) => {
            if (!node || node.nodeType !== Node.ELEMENT_NODE || node.tagName !== 'P') return null;
            const m = /mso-list:\s*l\d+\s+level(\d+)/i.exec(node.getAttribute('style') || '');
            if (m) return { level: parseInt(m[1], 10) };
            return /\bMsoListParagraph/.test(node.getAttribute('class') || '') ? { level: 1 } : null;
        };
        const extractMarker = (p) => {
            for (const span of Array.from(p.querySelectorAll('span'))) {
                if (/mso-list:\s*ignore/i.test(span.getAttribute('style') || '')) {
                    const text = span.textContent.replace(/ /g, ' ').trim();
                    span.remove();
                    return text;
                }
            }
            return '';
        };

        for (const start of Array.from(root.querySelectorAll('p'))) {
            if (!start.isConnected || !listInfo(start)) continue;
            // Consecutive sibling run of list paragraphs = one list.
            const run = [];
            let node = start;
            while (node) {
                const info = listInfo(node);
                if (!info) break;
                run.push({ p: node, level: info.level });
                let next = node.nextSibling;
                while (next && next.nodeType === Node.TEXT_NODE && !next.textContent.trim()) next = next.nextSibling;
                node = next;
            }

            const stack = []; // open lists, outermost→deepest
            for (const { p, level } of run) {
                const marker = extractMarker(p);
                const ordered = /^[0-9٠-٩]/.test(marker) || /^[a-z][.)]/i.test(marker);
                while (stack.length && stack[stack.length - 1].level > level) stack.pop();
                let top = stack[stack.length - 1];
                if (!top || top.level < level) {
                    const list = doc.createElement(ordered ? 'ol' : 'ul');
                    if (!top) p.parentNode.insertBefore(list, p);
                    else (top.list.lastElementChild || top.list).appendChild(list);
                    top = { list, level };
                    stack.push(top);
                }
                const li = doc.createElement('li');
                while (p.firstChild) li.appendChild(p.firstChild);
                top.list.appendChild(li);
                p.remove();
            }
        }
    }

    function interpretMarkup(root) {
        // Google Docs wraps the whole clipboard in a fake-bold <b> — unwrap it
        // before the generic pass reads <b> as real bold (everything-bold bug).
        for (const b of Array.from(root.querySelectorAll('b'))) {
            if (b.style.fontWeight === 'normal' || /^docs-internal-guid/.test(b.id)) unwrapEl(b);
        }

        // Word list paragraphs → real nested ul/ol (marker spans removed
        // before the style→tag pass sees them).
        rebuildWordLists(root);

        // Inline-style formatting → semantic tags. Google Docs (and Word spans)
        // mark bold/italic/underline as styles; plain attr-stripping would
        // silently drop the formatting. Wrap the element's children, then let
        // enforcement strip the carrier element/attribute as usual.
        for (const el of Array.from(root.querySelectorAll('[style]'))) {
            if (inNdsMarkup(el)) continue;
            const st = el.style;
            const deco = `${st.textDecoration} ${st.textDecorationLine}`;
            const wraps = [];
            if (st.fontWeight === 'bold' || st.fontWeight === 'bolder' || parseInt(st.fontWeight, 10) >= 600) wraps.push('strong');
            if (st.fontStyle === 'italic' || st.fontStyle === 'oblique') wraps.push('em');
            if (deco.includes('underline')) wraps.push('u');
            if (deco.includes('line-through')) wraps.push('s');
            let host = el;
            for (const tag of wraps) {
                const w = el.ownerDocument.createElement(tag);
                while (host.firstChild) w.appendChild(host.firstChild);
                host.appendChild(w);
                host = w;
            }
        }

        // Canonical inline vocabulary: b→strong, i→em, strike→s.
        // NDS-classed <i> is the icon element — skipped via inNdsMarkup.
        for (const el of Array.from(root.querySelectorAll('b, i, strike'))) {
            if (inNdsMarkup(el)) continue;
            renameEl(el, { B: 'strong', I: 'em', STRIKE: 's' }[el.tagName]);
        }

        // Block containers are the paragraph unit in Word/web content —
        // phrasing-only ones become <p> (children-first via reverse doc order)
        // so adjacent paragraphs don't merge into one blob when the container
        // is stripped; mixed ones unwrap generically and their block children
        // stand on their own.
        for (const el of Array.from(root.querySelectorAll(CONTAINER_SEL)).reverse()) {
            if (inNdsMarkup(el)) continue;
            let phrasingOnly = true;
            for (const child of el.children) {
                if (!PHRASING_TAGS.has(child.tagName)) { phrasingOnly = false; break; }
            }
            if (phrasingOnly && (el.children.length || el.textContent.trim())) renameEl(el, 'p');
        }

        // Google Docs wraps every li/cell's text in a <p> — unwrap to match
        // NDS canon (bare text in li/td). Consecutive paragraphs keep a <br>
        // boundary. Runs BEFORE table stamping so freshly-converted tables
        // are covered; authored NDS markup is skipped as usual.
        for (const p of Array.from(root.querySelectorAll('li > p, td > p, th > p'))) {
            if (inNdsMarkup(p)) continue;
            if (p.nextElementSibling && p.nextElementSibling.tagName === 'P') {
                p.parentNode.insertBefore(p.ownerDocument.createElement('br'), p.nextSibling);
            }
            unwrapEl(p);
        }

        // Plain tables become NDS tables — the flagship convert. The class
        // makes them an NDS region, so their structure survives enforcement.
        // Returned so Pass A can hold them to CONVERTED_TAGS.
        const converted = new Set();
        for (const t of root.querySelectorAll('table')) {
            if (!hasNdsClass(t)) { t.classList.add('nds-table'); converted.add(t); }
        }
        return converted;
    }

    // ---------- Sanitizer (the trust boundary — all content routes through here) ----------

    // Walk up probing the Set — scanning every trusted root and calling
    // contains() per element is O(n × trusted) on the per-keystroke path.
    function isInTrusted(el, trusted) {
        for (let n = el; n; n = n.parentElement) if (trusted.has(n)) return true;
        return false;
    }

    function sanitizeNode(node, allowed, trusted) {
        for (const child of Array.from(node.childNodes)) {
            if (trusted && trusted.has(child)) continue;
            if (child.nodeType === Node.TEXT_NODE) continue;
            if (child.nodeType !== Node.ELEMENT_NODE) { child.remove(); continue; }
            // toUpperCase: SVG/MathML elements report lowercase tagName.
            if (DROP_TAGS.has(child.tagName.toUpperCase())) { child.remove(); continue; }
            // Recurse first so nested disallowed tags resolve in one pass.
            sanitizeNode(child, allowed, trusted);
            if (!allowed.has(child.tagName)) unwrapEl(child);
        }
    }

    // Strip attributes; keep only safe-protocol href (and _blank target — the
    // one target the editor writes; rel pairs it against tabnabbing) on <a>,
    // safe-protocol src + alt on <img>. Hrefless anchors unwrap; srcless or
    // unsafe images drop whole (an <img> is nothing but its src).
    function stripAttributes(root, trusted) {
        for (const el of root.querySelectorAll('*')) {
            if (trusted && isInTrusted(el, trusted)) continue;
            const isAnchor = el.tagName === 'A';
            const isImg = el.tagName === 'IMG';
            const href = isAnchor ? cleanUrl(el.getAttribute('href') || '') : null;
            const external = isAnchor && el.getAttribute('target') === '_blank';
            const src = isImg ? cleanUrl(el.getAttribute('src') || '') : null;
            const alt = isImg ? el.getAttribute('alt') : null;
            // Numeric width/height survive — the popover writes them, and
            // pasted content keeps its ratios (aspect + CLS).
            const dims = isImg
                ? ['width', 'height'].map(n => [n, el.getAttribute(n)]).filter(([, v]) => /^\d+$/.test(v || ''))
                : [];
            // Legacy Word markup carries align="center" as an attribute.
            const align = BLOCK_TAGS.has(el.tagName)
                ? (el.style.textAlign || el.getAttribute('align') || '').toLowerCase() : '';
            for (const attr of Array.from(el.attributes)) el.removeAttribute(attr.name);
            if (ALIGN_VALUES.has(align)) el.style.textAlign = align;
            if (isAnchor) {
                if (href && safeUrl(href)) {
                    el.setAttribute('href', href);
                    if (external) el.setAttribute('target', '_blank');
                    el.setAttribute('rel', 'noopener noreferrer');
                } else {
                    unwrapEl(el);
                }
            }
            if (isImg) {
                if (src && safeSrc(src)) {
                    el.setAttribute('src', src);
                    if (alt != null) el.setAttribute('alt', alt);
                    for (const [n, v] of dims) el.setAttribute(n, v);
                } else {
                    el.remove();
                }
            }
        }
    }

    // <p> may only contain inline children; a <p> wrapping a block gets
    // unwrapped — which also hoists a block-level NDS region out of the <p>.
    // Inline NDS regions (a tag span, a button) may stay inside their <p>.
    function flattenBadPWrappers(root, trusted) {
        for (const p of Array.from(root.querySelectorAll('p'))) {
            if (!p.parentNode || (trusted && isInTrusted(p, trusted))) continue;
            let bad = false;
            for (const child of p.children) {
                const inlineOk = INLINE_TAGS.has(child.tagName) || child.tagName === 'IMG'
                    || (trusted && trusted.has(child) && INLINE_REGION_TAGS.has(child.tagName));
                if (!inlineOk) { bad = true; break; }
            }
            if (bad) unwrapEl(p);
        }
    }

    // NDS-region attribute policy: nds-/hgi classes, aria/role, the styling
    // data attrs, checked href/src, and custom-property declarations from
    // style (NDS knobs like --card-width — inert until a component's own CSS
    // consumes them via var()). Everything else — normal CSS properties, on*,
    // id, behavior-wiring data-* (incl. init sentinels) — drops.
    // Returns false when the element itself was removed.
    function scrubRegionElement(el) {
        const tag = el.tagName;
        const classes = (el.getAttribute('class') || '').split(/\s+/).filter(c => NDS_CLASS.test(c));
        const href = tag === 'A' ? cleanUrl(el.getAttribute('href') || '') : null;
        const external = tag === 'A' && el.getAttribute('target') === '_blank';
        const src = tag === 'IMG' ? cleanUrl(el.getAttribute('src') || '') : null;
        const knobs = [];
        for (let i = 0; i < el.style.length; i++) {
            const prop = el.style.item(i);
            if (prop.startsWith('--')) knobs.push([prop, el.style.getPropertyValue(prop)]);
        }
        const kept = [];
        for (const attr of Array.from(el.attributes)) {
            const n = attr.name;
            if (/^aria-/i.test(n) || n === 'role' || n === 'data-status' || n === 'data-state'
                || (tag === 'IMG' && (n === 'alt' || ((n === 'width' || n === 'height') && /^\d+$/.test(attr.value))))
                || ((tag === 'TD' || tag === 'TH') && (n === 'colspan' || n === 'rowspan' || n === 'scope'))) {
                kept.push([n, attr.value]);
            }
            el.removeAttribute(n);
        }
        for (const [n, v] of kept) el.setAttribute(n, v);
        for (const [p, v] of knobs) el.style.setProperty(p, v);
        if (classes.length) el.setAttribute('class', classes.join(' '));
        if (tag === 'A' && href && safeUrl(href)) {
            el.setAttribute('href', href);
            if (external) el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        }
        // A pasted default-type (submit) button would submit the host form.
        if (tag === 'BUTTON') el.setAttribute('type', 'button');
        if (tag === 'IMG') {
            if (src && safeSrc(src)) el.setAttribute('src', src);
            else { el.remove(); return false; }
        }
        return true;
    }

    function sanitizeRegion(rootEl, allowed) {
        sanitizeNode(rootEl, allowed);
        if (!scrubRegionElement(rootEl)) return false;
        for (const el of Array.from(rootEl.querySelectorAll('*'))) {
            if (!scrubRegionElement(el)) continue;
            // A span left with no attributes carries nothing — unwrap (GDocs
            // formatting spans inside converted tables end up here).
            if (el.tagName === 'SPAN' && !el.attributes.length) unwrapEl(el);
        }
        return true;
    }

    function sanitizeHtml(dirty) {
        // Parse bare into <body>: wrapping in a root element lets a stray </div>
        // close it early and strand the tail outside what we serialize back.
        const doc = new DOMParser().parseFromString(dirty, 'text/html');
        const root = doc.body;

        const converted = interpretMarkup(root);

        const trusted = new Set(); // JS refs — unspoofable by input markup

        // Pass A — NDS component regions survive with their structure.
        // Pre-order doc order: only the most recently accepted region can contain a later match.
        let lastRegion = null;
        for (const el of Array.from(root.querySelectorAll('[class*="nds-"]'))) {
            if (!el.isConnected) continue; // removed inside an earlier region
            if (lastRegion && lastRegion.contains(el)) continue; // top-most roots only
            if (!NDS_TAGS.has(el.tagName) || !hasNdsClass(el)) continue;
            if (sanitizeRegion(el, converted.has(el) ? CONVERTED_TAGS : NDS_TAGS)) { trusted.add(el); lastRegion = el; }
        }

        // Pass B — generic whitelist outside trusted subtrees.
        sanitizeNode(root, ALLOWED_TAGS, trusted);
        stripAttributes(root, trusted);
        flattenBadPWrappers(root, trusted);

        // Whitespace-only text between table structure elements is legal to
        // the parser but Chrome's editing-mode insertHTML fosters it OUT of
        // the table as junk paragraphs — strip it at the source.
        for (const el of root.querySelectorAll('table, thead, tbody, tfoot, tr')) {
            for (const n of Array.from(el.childNodes)) {
                if (n.nodeType === Node.TEXT_NODE && !n.textContent.trim()) n.remove();
            }
        }
        // Same story for whitespace between top-level blocks; spacing that
        // separates inline runs is kept.
        for (const n of Array.from(root.childNodes)) {
            if (n.nodeType !== Node.TEXT_NODE || n.textContent.trim()) continue;
            const blocky = (sib) => !sib || (sib.nodeType === Node.ELEMENT_NODE && !INLINE_TAGS.has(sib.tagName));
            if (blocky(n.previousSibling) && blocky(n.nextSibling)) n.remove();
        }
        // Dead-empty paragraphs (no children, no text — editing-split debris)
        // carry nothing. Intentional blank lines (<p><br></p>) are kept —
        // and so are emptied COMPONENT parts (an alert description cleared by
        // editing must survive the value round-trip, not vanish from the shell).
        for (const pEl of Array.from(root.querySelectorAll('p'))) {
            if (trusted.size && isInTrusted(pEl, trusted)) continue;
            if (!pEl.firstElementChild && !pEl.textContent.trim()) pEl.remove();
        }
        return root.innerHTML;
    }

    // ---------- Pretty printer (source view / form value) ----------

    function prettyPrintHtml(html) {
        const doc = new DOMParser().parseFromString(`<div id="r">${html}</div>`, 'text/html');
        return formatNode(doc.getElementById('r'), 0).replace(/\n+$/, '');
    }

    function openTag(el) {
        let s = el.tagName.toLowerCase();
        for (const attr of el.attributes) s += ` ${attr.name}="${escapeHtml(attr.value)}"`;
        return s;
    }

    // Structural container = only element children, at least one non-inline —
    // renders indented multi-line; text-bearing elements render on one line.
    function isContainer(el) {
        if (!el.firstElementChild) return false;
        for (const n of el.childNodes) {
            if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) return false;
        }
        for (const child of el.children) {
            if (!INLINE_TAGS.has(child.tagName)) return true;
        }
        return false;
    }

    const VOID_TAGS = new Set(['BR', 'HR', 'IMG', 'WBR']);
    // Elements typing can continue in — anything else as a trailing node
    // traps the caret (component regions, tables, block wrappers).
    const FLOW_EXIT_TAGS = /^(?:P|H[1-4]|UL|OL)$/;

    function formatNode(node, depth) {
        const pad = '  '.repeat(depth);
        let out = '';
        for (const child of node.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                // textContent is DECODED — re-escape or a literal "<" in root
                // text corrupts the value's round-trip.
                const t = child.textContent.replace(/\s+/g, ' ').trim();
                if (t) out += pad + escapeHtml(t) + '\n';
                continue;
            }
            if (child.nodeType !== Node.ELEMENT_NODE) continue;
            const tag = child.tagName.toLowerCase();
            // Void elements get no closing tag — `<br></br>` would re-parse as
            // TWO brs (the parser treats a stray </br> as another <br>) and
            // duplicate on every source round-trip.
            if (VOID_TAGS.has(child.tagName)) {
                out += `${pad}<${openTag(child)}>\n`;
                continue;
            }
            if (isContainer(child)) {
                out += `${pad}<${openTag(child)}>\n`;
                out += formatNode(child, depth + 1);
                out += `${pad}</${tag}>\n`;
            } else {
                out += `${pad}<${openTag(child)}>${child.innerHTML}</${tag}>\n`;
            }
        }
        return out;
    }

    function isEffectivelyEmpty(editable) {
        return editable.textContent.trim() === ''
            && !editable.querySelector('ul, ol, h1, h2, h3, h4, table, img, [class*="nds-"]');
    }

    // The editable and toolbar buttons aren't native form controls, so the
    // forms disabled/readonly hooks don't reach them (same rationale as the
    // taginput chip hooks) — react to the container state tokens instead.
    ['disabled', 'readonly'].forEach(token => {
        NDS.State.onAdd(token, '.nds-editor', el => el.ndsEditor?._applyAccessState());
        NDS.State.onRemove(token, '.nds-editor', el => el.ndsEditor?._applyAccessState());
    });

    // ---------- Toolbar generation ----------

    const TOOLBAR_DEFAULT = 'undo redo | bold italic underline strike clear | link image | h2 h3 h4 | align-start align-center align-end align-justify | ul ol | remove | source';
    const TOOLBAR_CMDS = {
        undo:      { icon: 'arrow-turn-backward',                     en: 'Undo',             ar: 'تراجع' },
        redo:      { icon: 'arrow-turn-forward',                      en: 'Redo',             ar: 'إعادة' },
        bold:      { icon: 'text-bold',                 toggle: true, en: 'Bold',             ar: 'غامق' },
        italic:    { icon: 'text-italic',               toggle: true, en: 'Italic',           ar: 'مائل' },
        underline: { icon: 'text-underline',            toggle: true, en: 'Underline',        ar: 'تسطير' },
        strike:    { icon: 'text-strikethrough',        toggle: true, en: 'Strikethrough',    ar: 'يتوسطه خط' },
        clear:     { icon: 'text-clear',                              en: 'Clear formatting', ar: 'مسح التنسيق' },
        link:      { icon: 'link-01',                   toggle: true, en: 'Insert link',      ar: 'إدراج رابط' },
        image:     { icon: 'image-add-01',              toggle: true, en: 'Insert image',     ar: 'إدراج صورة' },
        // h1 is deliberately OUT of the default set (the page owns its h1) —
        // available via data-editor-toolbar for full-page authoring fields.
        h1:        { icon: 'heading-01',                toggle: true, en: 'Heading 1',        ar: 'عنوان 1' },
        h2:        { icon: 'heading-02',                toggle: true, en: 'Heading 2',        ar: 'عنوان 2' },
        h3:        { icon: 'heading-03',                toggle: true, en: 'Heading 3',        ar: 'عنوان 3' },
        h4:        { icon: 'heading-04',                toggle: true, en: 'Heading 4',        ar: 'عنوان 4' },
        ul:        { icon: 'left-to-right-list-bullet', toggle: true, en: 'Bulleted list',    ar: 'قائمة نقطية' },
        ol:        { icon: 'left-to-right-list-number', toggle: true, en: 'Numbered list',    ar: 'قائمة رقمية' },
        // Alignment is LOGICAL (start/end) — icons flip with document direction.
        'align-start':   { icon: { ltr: 'text-align-left', rtl: 'text-align-right' },  toggle: true, en: 'Align start',  ar: 'محاذاة البداية' },
        'align-center':  { icon: 'text-align-center',                                  toggle: true, en: 'Align center', ar: 'توسيط' },
        'align-end':     { icon: { ltr: 'text-align-right', rtl: 'text-align-left' },  toggle: true, en: 'Align end',    ar: 'محاذاة النهاية' },
        'align-justify': { icon: 'text-align-justify-center',                          toggle: true, en: 'Justify',      ar: 'ضبط' },
        // Caret-gated: enabled only while the caret sits inside a pasted
        // component — the explicit removal path the shell guards point to.
        remove:    { icon: 'delete-02',                               en: 'Remove component', ar: 'إزالة المكون' },
    };
    const TOOLBAR_STRINGS = {
        source:   { en: 'View HTML source', ar: 'عرض مصدر HTML' },
        url:      { en: 'URL',    ar: 'الرابط' },
        text:     { en: 'Text',   ar: 'النص' },
        external: { en: 'Open in new tab', ar: 'فتح في تبويب جديد' },
        colored:  { en: 'Colored link', ar: 'رابط ملون' },
        fromLink: { en: 'From link', ar: 'من رابط' },
        or:       { en: 'OR', ar: 'أو' },
        attrs:    { en: 'Attributes', ar: 'الخصائص' },
        invalidImageUrl: { en: 'Enter a valid image URL', ar: 'أدخل رابط صورة صالحًا' },
        invalidUrl:      { en: 'Enter a valid URL', ar: 'أدخل رابطًا صالحًا' },
        pasteBlocked:    { en: 'Pasting images is not available — use the image dialog', ar: 'لصق الصور غير متاح — استخدم نافذة إدراج الصورة' },
        imageTooLarge:   { en: 'Image exceeds the size limit', ar: 'الصورة تتجاوز الحد المسموح للحجم' },
        alt:      { en: 'Alt text', ar: 'النص البديل' },
        width:    { en: 'Width (px)', ar: 'العرض (بكسل)' },
        height:   { en: 'Height (px)', ar: 'الارتفاع (بكسل)' },
        upload:   { en: 'Upload image', ar: 'رفع صورة' },
        cancel:   { en: 'Cancel', ar: 'إلغاء' },
        insert:   { en: 'Insert', ar: 'إدراج' },
        unlink:   { en: 'Unlink', ar: 'إزالة الرابط' },
        removePrompt:  { en: 'Remove the component:', ar: 'إزالة المكون:' },
    };

    const uiLabel = (s) => (NDS.lang === 'ar' ? s.ar : s.en);

    let uid = 0; // minted label ids for adopted fields whose textarea has no id

    // Every command button doubles as a declarative NDS tooltip (the button's
    // own content is the trigger; nds-tooltip.js generates the balloon).
    function cmdButtonHtml(cmd, extraClass = '') {
        const c = TOOLBAR_CMDS[cmd];
        const label = uiLabel(c);
        const icon = typeof c.icon === 'string' ? c.icon : (NDS.isRTL ? c.icon.rtl : c.icon.ltr);
        return `<button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-tooltip${extraClass}" data-cmd="${cmd}"${c.toggle ? ' aria-pressed="false"' : ''} aria-label="${label}" data-tooltip-message="${label}" data-tooltip-hover="500"><i class="hgi hgi-stroke hgi-${icon}" aria-hidden="true"></i></button>`;
    }

    function textFieldHtml(id, labelStr, type, dataAttr, placeholder, extraClass = '') {
        return `<div class="nds-form-container nds-input${extraClass}"><div class="nds-form-header"><label for="${id}"><span class="nds-label">${labelStr}</span></label></div>`
            + `<div class="nds-form-control"><input type="${type}" id="${id}" class="nds-input"${placeholder ? ` placeholder="${placeholder}"` : ''} autocomplete="off" ${dataAttr} /></div>`
            + '<div class="nds-form-footer" data-feedback-target hidden></div></div>';
    }

    function linkDropmenuHtml(idBase) {
        const S = TOOLBAR_STRINGS;
        return `<div class="nds-dropmenu" data-editor-link-dropmenu>${cmdButtonHtml('link', ' nds-dropmenu-trigger')}`
            + '<div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">'
            + '<div class="nds-dropmenu-group nds-editor-link-form">'
            + textFieldHtml(`${idBase}-link-text`, uiLabel(S.text), 'text', 'data-editor-link-text')
            + textFieldHtml(`${idBase}-link-url`, uiLabel(S.url), 'url', 'data-editor-link-url', 'https://')
            + `<div class="nds-form-container nds-check-container"><div class="nds-form-header"><label for="${idBase}-link-external"><span class="nds-label">${uiLabel(S.external)}</span></label></div>`
            + `<div class="nds-form-control"><input type="checkbox" id="${idBase}-link-external" class="nds-check" data-editor-link-external /></div></div>`
            + `<div class="nds-form-container nds-check-container"><div class="nds-form-header"><label for="${idBase}-link-colored"><span class="nds-label">${uiLabel(S.colored)}</span></label></div>`
            + `<div class="nds-form-control"><input type="checkbox" id="${idBase}-link-colored" class="nds-check" data-editor-link-colored /></div></div>`
            + '</div></div>'
            + '<div class="nds-dropmenu-footer"><hr class="nds-divider"><div class="nds-dropmenu-action nds-grid">'
            + `<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-editor-link-cancel><span class="nds-label">${uiLabel(S.cancel)}</span></button>`
            + `<button type="button" class="nds-btn nds-destructive nds-secondary-outline nds-dropmenu-item" data-editor-link-unlink hidden><span class="nds-label">${uiLabel(S.unlink)}</span></button>`
            + `<button type="button" class="nds-btn nds-primary nds-dropmenu-item" data-editor-link-confirm data-dropmenu-primary data-no-auto-close><span class="nds-label">${uiLabel(S.insert)}</span></button>`
            + '</div></div></div></div>';
    }

    // Image popover: direct URL or a local file — the chosen file lands in
    // the URL field as a data:image URL, so Insert is the one commit path.
    function imageDropmenuHtml(idBase) {
        const S = TOOLBAR_STRINGS;
        return `<div class="nds-dropmenu" data-editor-image-dropmenu>${cmdButtonHtml('image', ' nds-dropmenu-trigger')}`
            + '<div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">'
            + '<div class="nds-dropmenu-group nds-editor-image-form">'
            + textFieldHtml(`${idBase}-image-url`, uiLabel(S.fromLink), 'url', 'data-editor-image-url', 'https://')
            + `<div class="nds-divider" data-editor-image-or>${uiLabel(S.or)}</div>`
            // Canonical single-file nds-upload (no dropzone) — NDS.Upload owns
            // picking, extension enforcement, and the file chip; the editor
            // only listens for nds:upload:selected.
            + '<div class="nds-form-container nds-file-upload" data-state="single" data-allowed-types="jpg,jpeg,png,gif,webp,svg" data-max-file-size="2097152" data-editor-image-upload>'
            + '<div class="nds-form-control nds-center">'
            + `<input type="file" id="${idBase}-image-file" class="nds-file-input" data-editor-image-file />`
            + `<div class="nds-form-action"><button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn"><i class="hgi hgi-stroke hgi-folder-01"></i><span class="nds-label">${uiLabel(S.upload)}</span></button></div>`
            + '</div>'
            + '<div class="nds-file-list"></div>'
            + '</div>'
            + `<div class="nds-divider">${uiLabel(S.attrs)}</div>`
            + textFieldHtml(`${idBase}-image-alt`, uiLabel(S.alt), 'text', 'data-editor-image-alt', '', ' nds-md')
            + '<div class="nds-editor-image-dims">'
            + textFieldHtml(`${idBase}-image-width`, uiLabel(S.width), 'text', 'inputmode="numeric" data-editor-image-width', 'auto', ' nds-md')
            + textFieldHtml(`${idBase}-image-height`, uiLabel(S.height), 'text', 'inputmode="numeric" data-editor-image-height', 'auto', ' nds-md')
            + '</div>'
            + '</div></div>'
            + '<div class="nds-dropmenu-footer"><hr class="nds-divider"><div class="nds-dropmenu-action nds-grid">'
            + `<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-editor-image-cancel><span class="nds-label">${uiLabel(S.cancel)}</span></button>`
            + `<button type="button" class="nds-btn nds-primary nds-dropmenu-item" data-editor-image-confirm data-dropmenu-primary data-no-auto-close><span class="nds-label">${uiLabel(S.insert)}</span></button>`
            + '</div></div></div></div>';
    }

    // Shared vocabulary atoms — never independent components in the remove
    // picker (extend if a new atom class enters the paste vocabulary).
    const NDS_ATOM_CLASSES = new Set(['nds-label', 'nds-icon', 'nds-divider']);

    // The component name a shell shows in the remove picker — its first
    // nds class that isn't a generic atom.
    const componentNameOf = (el) =>
        Array.from(el.classList).find(c => /^nds-[\w-]+$/.test(c) && !NDS_ATOM_CLASSES.has(c)) || 'NDS';

    // Destructive with confirmation — the trigger opens a confirm popover
    // whose rows are filled per caret position (one destructive row per
    // removable level: nested components, then the shell).
    function removeDropmenuHtml() {
        const S = TOOLBAR_STRINGS;
        return `<div class="nds-dropmenu" data-editor-remove-dropmenu>${cmdButtonHtml('remove', ' nds-dropmenu-trigger nds-destructive')}`
            + '<div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">'
            + `<div class="nds-dropmenu-group"><span class="nds-label">${uiLabel(S.removePrompt)}</span></div>`
            + '<div data-editor-remove-levels></div>'
            + '</div>'
            + '<div class="nds-dropmenu-footer"><hr class="nds-divider"><div class="nds-dropmenu-action nds-grid">'
            + `<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-editor-remove-cancel><span class="nds-label">${uiLabel(S.cancel)}</span></button>`
            + '</div></div></div></div>';
    }

    function buildToolbarHtml(spec, idBase) {
        let start = '', end = '';
        for (const group of spec.split('|')) {
            let cluster = '';
            const flush = () => { if (cluster) { start += `<div class="nds-btn-group">${cluster}</div>`; cluster = ''; } };
            for (const cmd of group.trim().split(/\s+/).filter(Boolean)) {
                if (cmd === 'source') {
                    const label = uiLabel(TOOLBAR_STRINGS.source);
                    end = `<button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-tooltip" data-source-toggle aria-pressed="false" aria-label="${label}" data-tooltip-message="${label}" data-tooltip-hover="500"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>`;
                } else if (cmd === 'link') {
                    flush(); // the dropmenu wrapper sits outside any button group
                    start += linkDropmenuHtml(idBase);
                } else if (cmd === 'image') {
                    flush();
                    start += imageDropmenuHtml(idBase);
                } else if (cmd === 'remove') {
                    flush();
                    start += removeDropmenuHtml();
                } else if (TOOLBAR_CMDS[cmd]) {
                    cluster += cmdButtonHtml(cmd);
                } else {
                    console.warn(`NDS Editor: unknown toolbar command "${cmd}"`);
                }
            }
            flush();
        }
        if (!start && !end) return '';
        return `<div class="nds-toolbar">${start ? `<div class="nds-bar-start">${start}</div>` : ''}${end ? `<div class="nds-bar-end">${end}</div>` : ''}</div>`;
    }

    // ---------- Editor ----------

    class NDSEditor {
        constructor(root) {
            this.root = root;
            // Success signal — init() only runs (and registers root.ndsEditor) when construction succeeds.
            this.valid = false;
            if (root.hasAttribute('data-nds-editor-initialized')) return;

            this.source = root.querySelector('.nds-form-control textarea');
            if (!this.source) {
                console.warn('NDS Editor: no textarea to adopt', root);
                return;
            }

            this.editable = this._buildEditable();
            this.toolbar = this._buildToolbar(); // null when data-editor-toolbar="none"
            this.buttons = this.toolbar ? Array.from(this.toolbar.querySelectorAll('[data-cmd]')) : [];
            this.abortController = new AbortController();
            this._rafId = 0;
            this._savedRange = null;
            this._focusWithin = false;
            // Editor-owned undo history ({v, caret} value snapshots). The
            // native stack is unusable here: structural DOM ops (component
            // removal, popover edits) corrupt its replay, so ALL undo/redo
            // routes through _historyStep for uniform coverage.
            this._history = [];
            this._histIdx = -1;
            this._histLast = 0;
            this._histSuspend = false;
            this.valid = true;
            this.init();
        }

        init() {
            this.root.setAttribute('data-nds-editor-initialized', 'true');
            this.root.ndsEditor = this;
            const { signal } = this.abortController;

            // ponytail: <p> as new-block separator — native Enter gives clean <p> per paragraph.
            try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* older UAs */ }

            // Hydrate from the adopted textarea's value (server-filled or empty).
            this.editable.innerHTML = sanitizeHtml(this.source.value) || '<p><br></p>';
            this._refreshLinks();
            this._syncSource();
            // Seed the history base — the initial value stays reachable even
            // when hydration didn't change the value (sync early-returned).
            if (this._histIdx < 0) this._pushHistory(false);

            // preventDefault on mousedown keeps the editable's selection when a
            // toolbar button is clicked. The link command preps here too —
            // NDS.Dropmenu's trigger click stopPropagations, so the toolbar click
            // delegate below never fires for it.
            if (this.toolbar) {
                this.toolbar.addEventListener('mousedown', (e) => {
                    const cmdBtn = e.target.closest('[data-cmd]');
                    if (!cmdBtn) return;
                    e.preventDefault();
                    if (cmdBtn.dataset.cmd === 'link') this._prepLinkMenu();
                    else if (cmdBtn.dataset.cmd === 'image') this._prepImageMenu();
                    else if (cmdBtn.dataset.cmd === 'remove') this._prepRemoveMenu();
                }, { signal });

                // Keyboard activation opens the popovers without a mousedown —
                // prep on the trigger's keydown so the content is never stale.
                this.toolbar.querySelectorAll('[data-cmd="link"], [data-cmd="image"], [data-cmd="remove"]').forEach(btn => {
                    btn.addEventListener('keydown', (e) => {
                        if (e.key !== 'Enter' && e.key !== ' ') return;
                        if (btn.dataset.cmd === 'link') this._prepLinkMenu();
                        else if (btn.dataset.cmd === 'image') this._prepImageMenu();
                        else this._prepRemoveMenu();
                    }, { signal });
                });

                this.toolbar.addEventListener('click', this._onToolbarClick.bind(this), { signal });
            }
            this.editable.addEventListener('input', this._onInput.bind(this), { signal });
            // Route native history gestures (context-menu undo) into the
            // editor history; where the event isn't cancelable the mutation
            // lands and the following input syncs it as a fresh entry.
            this.editable.addEventListener('beforeinput', (e) => {
                if (e.inputType !== 'historyUndo' && e.inputType !== 'historyRedo') return;
                e.preventDefault();
                this._historyStep(e.inputType === 'historyUndo' ? -1 : 1);
            }, { signal });
            this.editable.addEventListener('paste', this._onPaste.bind(this), { signal });
            // Ctrl+X with a shell-clipping selection is the same leak as Delete.
            this.editable.addEventListener('cut', (e) => {
                const sel = window.getSelection();
                if (sel.rangeCount && this._selectionClipsShell(sel.getRangeAt(0))) e.preventDefault();
            }, { signal });
            this.editable.addEventListener('keydown', this._onKeydown.bind(this), { signal });
            document.addEventListener('selectionchange', this._scheduleToolbarSync.bind(this), { signal });

            // Chrome only places the caret BESIDE a clicked image — select it
            // whole instead: the selection shape the image popover
            // (edit-in-place), the link popover (wrap in <a>), the remove
            // gate, and plain Backspace all key on.
            this.editable.addEventListener('click', (e) => {
                if (e.target.tagName !== 'IMG') return;
                const r = document.createRange();
                r.selectNode(e.target);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(r);
            }, { signal });

            // Click-to-escape: clicks on the editor's empty space below the
            // content yield a fresh line at the end (reusing a trailing empty
            // paragraph — clicks don't stack them).
            this.editable.addEventListener('click', (e) => {
                if (e.target !== this.editable) return;
                const last = this.editable.lastElementChild;
                if (!last || e.clientY > last.getBoundingClientRect().bottom) this._placeCaretAtEnd();
            }, { signal });

            // Mirror NDS.Forms interactive states on the container — forms only
            // delegates to input/textarea/select, so the contenteditable is
            // skipped. Tracked with focusin/focusout on the ROOT: the source
            // textarea and the link popover's URL input are separate focus
            // targets inside the editor, so an editable-only focus/blur pair
            // drops the field's focus state (and fires a premature change
            // event) the moment the user moves to one of them.
            this.root.addEventListener('focusin', () => {
                if (this._focusWithin) return;
                this._focusWithin = true;
                NDS.State.add(this.root, 'focus');
                this._valueAtFocus = this.source.value;
            }, { signal });
            this.root.addEventListener('focusout', (e) => {
                if (this.root.contains(e.relatedTarget)) return; // moving within the editor
                this._focusWithin = false;
                NDS.State.remove(this.root, 'focus');
                NDS.State.remove(this.root, 'typing');
                if (this.source.value !== this._valueAtFocus) {
                    this.source.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, { signal });
            this.editable.addEventListener('keydown',    () => NDS.State.add(this.root, 'typing'), { signal });
            this.editable.addEventListener('paste',      () => NDS.State.add(this.root, 'typing'), { signal });
            this.editable.addEventListener('mousedown',  () => NDS.State.add(this.root, 'active'), { signal });
            this.editable.addEventListener('mouseup',    () => NDS.State.remove(this.root, 'active'), { signal });
            this.editable.addEventListener('mouseleave', () => NDS.State.remove(this.root, 'active'), { signal });

            // Forms' invalid-focus and label clicks land on the clipped textarea — redirect.
            this.source.addEventListener('focus', () => {
                if (!this.root.classList.contains('is-source')) this.editable.focus();
            }, { signal });
            this.source.addEventListener('keydown', this._onSourceKeydown.bind(this), { signal });

            // Typing in a popover field clears its inline validation error.
            this.root.querySelectorAll('[data-editor-link-dropmenu] .nds-dropmenu-menu, [data-editor-image-dropmenu] .nds-dropmenu-menu').forEach(menu => {
                menu.addEventListener('input', (e) => {
                    const field = e.target.closest('.nds-form-container');
                    if (field?.hasAttribute('data-status')) NDS.Forms?.clearStatus?.(field);
                    const primary = menu.querySelector('[data-dropmenu-primary]');
                    if (primary) primary.disabled = false;
                }, { signal });
            });

            const linkMenu = this.root.querySelector('[data-editor-link-dropmenu] .nds-dropmenu-menu');
            if (linkMenu) {
                linkMenu.addEventListener('click', (e) => {
                    if (e.target.closest('[data-editor-link-confirm]')) this._confirmLink();
                    else if (e.target.closest('[data-editor-link-unlink]')) this._unlink();
                    else if (e.target.closest('[data-editor-link-cancel]')) this._cancelLink();
                }, { signal });
                // Enter in either text field confirms.
                linkMenu.querySelectorAll('[data-editor-link-text], [data-editor-link-url]').forEach(inp => {
                    inp.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') { e.preventDefault(); this._confirmLink(); }
                    }, { signal });
                });
            }

            const imageMenu = this.root.querySelector('[data-editor-image-dropmenu] .nds-dropmenu-menu');
            if (imageMenu) {
                imageMenu.addEventListener('click', (e) => {
                    if (e.target.closest('[data-editor-image-confirm]')) this._confirmImage();
                    else if (e.target.closest('[data-editor-image-cancel]')) this._cancelImage();
                }, { signal });
                const uploadHost = imageMenu.querySelector('[data-editor-image-upload]');
                if (uploadHost) {
                    // Generated after the loader's sweep — init is idempotent.
                    NDS.Upload?.init?.();
                    // Chosen file → URL field (alt seeds from the file name).
                    // The upload container is a plain nds-upload — consumers
                    // configure server upload with ITS own API (data-upload-url
                    // / data-auto-upload, stamped e.g. on nds:editor:ready).
                    // With an uploadUrl the URL arrives via nds:upload:success;
                    // without one the file embeds as a data:image URL.
                    uploadHost.addEventListener('nds:upload:selected', (e) => {
                        const file = e.detail.files[0];
                        if (!file) return;
                        const altInput = imageMenu.querySelector('[data-editor-image-alt]');
                        if (altInput && !altInput.value) altInput.value = file.name.replace(/\.[^.]+$/, '');
                        if (uploadHost.ndsUpload?.getConfig?.().uploadUrl) return;
                        const fr = new FileReader();
                        fr.onload = () => {
                            const urlInput = imageMenu.querySelector('[data-editor-image-url]');
                            if (urlInput) urlInput.value = fr.result;
                            // Staged locally IS this flow's success ('complete'
                            // is the status the chip renders the check for).
                            uploadHost.ndsUpload?.setFileStatus?.(e.detail.fileData?.[0]?.id, 'complete');
                        };
                        fr.readAsDataURL(file);
                    }, { signal });
                    // Server mode: JSON {url: "..."} or a bare URL string body.
                    uploadHost.addEventListener('nds:upload:success', (e) => {
                        let url = '';
                        try { url = JSON.parse(e.detail.response)?.url || ''; }
                        catch { url = String(e.detail.response || '').trim(); }
                        const urlInput = imageMenu.querySelector('[data-editor-image-url]');
                        url = cleanUrl(url);
                        if (urlInput && url && safeSrc(url)) urlInput.value = url;
                    }, { signal });
                    // Removing the chip invalidates an embedded data: URL.
                    uploadHost.addEventListener('nds:upload:removed', () => {
                        const urlInput = imageMenu.querySelector('[data-editor-image-url]');
                        if (urlInput && urlInput.value.startsWith('data:')) urlInput.value = 'https://';
                    }, { signal });
                }
                imageMenu.querySelectorAll('[data-editor-image-url], [data-editor-image-alt], [data-editor-image-width], [data-editor-image-height]').forEach(inp => {
                    inp.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') { e.preventDefault(); this._confirmImage(); }
                    }, { signal });
                });
            }

            const removeMenu = this.root.querySelector('[data-editor-remove-dropmenu] .nds-dropmenu-menu');
            if (removeMenu) {
                removeMenu.addEventListener('click', (e) => {
                    const level = e.target.closest('[data-editor-remove-level]');
                    if (level) this._confirmRemove(parseInt(level.dataset.editorRemoveLevel, 10));
                    else if (e.target.closest('[data-editor-remove-cancel]')) this._cancelRemove();
                }, { signal });
            }


            // Server-shipped data-state="disabled|readonly" applies at init;
            // later toggles arrive through the NDS.State hooks above.
            this._applyAccessState();
            // Settle caret-gated button states (remove starts disabled) and
            // the image upload affordance (URL-only unless embed/endpoint).
            this._updateToolbarState();
            this._syncImageUploadVisibility();

            this.root.dispatchEvent(new CustomEvent('nds:editor:ready', { detail: { instance: this }, bubbles: true }));
        }

        // Disabled: inert surface, nothing submits (native disabled-field
        // semantics via the carrier textarea). Readonly: content selectable,
        // source viewable, nothing editable, value still submits.
        _applyAccessState() {
            const disabled = NDS.State.has(this.root, 'disabled');
            const readonly = NDS.State.has(this.root, 'readonly');
            const editable = !disabled && !readonly;
            this.editable.setAttribute('contenteditable', editable ? 'true' : 'false');
            this.editable.setAttribute('aria-readonly', readonly ? 'true' : 'false');
            this.source.disabled = disabled;
            this.source.readOnly = readonly;
            if (this.toolbar) {
                this.toolbar.querySelectorAll('[data-cmd]').forEach(btn => { btn.disabled = !editable; });
                const srcBtn = this.toolbar.querySelector('[data-source-toggle]');
                if (srcBtn) srcBtn.disabled = disabled; // readonly may still view source
                this._syncRemoveState(); // remove stays caret-gated, not blanket-enabled
            }
        }

        destroy() {
            if (this._rafId) cancelAnimationFrame(this._rafId);
            clearTimeout(this._noticeTimer);
            this.abortController.abort();
            // Generated surfaces go; the adopted textarea reverts to a plain,
            // working field.
            this.toolbar?.querySelectorAll('.nds-dropmenu').forEach(el => el.ndsDropmenu?.destroy?.());
            this.toolbar?.querySelectorAll('.nds-tooltip').forEach(el => el.ndsTooltip?.destroy?.());
            this.toolbar?.querySelectorAll('.nds-file-upload').forEach(el => el.ndsUpload?.destroy?.());
            this.toolbar?.remove();
            this.toolbar = null;
            this.editable.remove();
            this.source.classList.remove('nds-editor-source');
            this.source.removeAttribute('tabindex');
            this.root.classList.remove('is-source');
            this._history = [];
            this._histIdx = -1;
            this.root.removeAttribute('data-nds-editor-initialized');
            delete this.root.ndsEditor;
        }

        // ---------- Field adoption ----------

        // The editable is generated, never authored: placeholder from the
        // textarea's own placeholder, accessible name from the field's label
        // (id minted when missing), value hydrated from the textarea in init().
        // The textarea is decorated in place — never replaced.
        _buildEditable() {
            this.source.classList.add('nds-editor-source');
            this.source.setAttribute('tabindex', '-1');
            // Base for every generated id (label, link popover fields).
            this._idBase = this.source.id || `nds-editor-${++uid}`;
            // Native field attrs are the single source of truth for initial state.
            if (this.source.readOnly) NDS.State.add(this.root, 'readonly');
            if (this.source.disabled) NDS.State.add(this.root, 'disabled');
            const editable = document.createElement('div');
            editable.className = 'nds-editor-editable';
            editable.setAttribute('contenteditable', 'true');
            editable.setAttribute('role', 'textbox');
            editable.setAttribute('aria-multiline', 'true');
            if (this.source.placeholder) editable.setAttribute('data-placeholder', this.source.placeholder);
            const label = this.root.querySelector('.nds-form-header label');
            if (label) {
                if (!label.id) label.id = `${this._idBase}-label`;
                editable.setAttribute('aria-labelledby', label.id);
            }
            this.source.before(editable);
            return editable;
        }

        // ---------- Toolbar ----------

        // One HTML string, one parse, no layout reads — inserted right before
        // the editable's form-control (the slot the skeleton bar reserves).
        _buildToolbar() {
            const spec = (this.root.dataset.editorToolbar || TOOLBAR_DEFAULT).trim();
            if (spec === 'none') return null;
            const html = buildToolbarHtml(spec, this._idBase);
            if (!html) return null;
            const anchor = this.editable.closest('.nds-form-control') || this.editable;
            anchor.insertAdjacentHTML('beforebegin', html);
            const toolbar = anchor.previousElementSibling;
            // Dropmenu (main) and Tooltip (earlier in this extras bundle) both
            // finished their sweeps before editor init — wire the generated
            // elements directly. Soft dependencies: the toolbar's dropmenus and
            // tooltips stay inert if NDS.Dropmenu / NDS.Tooltip aren't bundled.
            toolbar.querySelectorAll('.nds-dropmenu').forEach(el => NDS.Dropmenu?.create?.(el));
            toolbar.querySelectorAll('.nds-tooltip').forEach(el => NDS.Tooltip?.create?.(el));
            return toolbar;
        }

        _onToolbarClick(e) {
            if (e.target.closest('[data-source-toggle]')) { this._toggleSourceView(); return; }
            const btn = e.target.closest('[data-cmd]');
            if (!btn || this.root.classList.contains('is-source')) return;
            const cmd = btn.dataset.cmd;
            if (cmd === 'link' || cmd === 'image' || cmd === 'remove') return; // dropmenu-backed — handled via mousedown prep + menu clicks
            this.editable.focus();
            this._applyCommand(cmd);
            this._syncSource();
            this._updateToolbarState();
        }

        _applyCommand(cmd) {
            // ponytail: execCommand for writes — deprecated but universally supported, native
            // undo integration, browser-handled RTL/bidi. Replace per-command only if a UA misbehaves.
            switch (cmd) {
                case 'bold':      document.execCommand('bold');          break;
                case 'italic':    document.execCommand('italic');        break;
                case 'underline': document.execCommand('underline');     break;
                case 'strike':    document.execCommand('strikeThrough'); break;
                case 'ul':        document.execCommand('insertUnorderedList'); break;
                case 'ol':        document.execCommand('insertOrderedList');   break;
                case 'clear':     document.execCommand('removeFormat'); break;
                case 'undo':      this._historyStep(-1); break;
                case 'redo':      this._historyStep(1);  break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4': {
                    const targetTag = CMD_BLOCK_MAP[cmd];
                    const block = this._getBlockContext();
                    document.execCommand('formatBlock', false, (block && block.tagName === targetTag) ? 'P' : targetTag);
                    break;
                }
                case 'align-start':   this._applyAlignment('');        break;
                case 'align-center':  this._applyAlignment('center');  break;
                case 'align-end':     this._applyAlignment('end');     break;
                case 'align-justify': this._applyAlignment('justify'); break;
                default:
                    console.warn(`NDS Editor: unknown command "${cmd}"`);
            }
        }

        _toggleSourceView() {
            const btn = this.toolbar.querySelector('[data-source-toggle]');
            const entering = !this.root.classList.contains('is-source');
            if (entering) {
                // Sync BEFORE showing so the user sees the exact value that would submit.
                this._syncSource();
                // Read the editor selection while it still exists — carried
                // into the source so the user lands where they meant to edit.
                const carry = this._computeSourceSelection();
                // Match the source view to the rendered editable height (read
                // before is-source hides it) — a long document would otherwise
                // switch into a min-height-sized textarea.
                this.source.style.blockSize = `${this.editable.offsetHeight}px`;
                this.root.classList.add('is-source');
                this.source.removeAttribute('tabindex');
                btn?.setAttribute('aria-pressed', 'true');
                this.source.focus();
                if (carry) {
                    this.source.setSelectionRange(carry.start, carry.end);
                    // Rough line-based scroll — enough to bring the selection into view.
                    const line = this.source.value.slice(0, carry.start).split('\n').length;
                    const lh = parseFloat(getComputedStyle(this.source).lineHeight) || 24;
                    this.source.scrollTop = Math.max(0, (line - 3) * lh);
                }
            } else {
                // Sanitize whatever was typed in source view before it becomes visual DOM.
                this.editable.innerHTML = sanitizeHtml(this.source.value) || '<p><br></p>';
                this._refreshLinks();
                this.root.classList.remove('is-source');
                this.source.setAttribute('tabindex', '-1');
                btn?.setAttribute('aria-pressed', 'false');
                this._syncSource();
                this._updateToolbarState();
                this.editable.focus();
            }
        }

        // Map the editor selection to a source-view range. Heuristic by
        // design: the value is a TRANSFORMED document (rebuild + pretty
        // print), so no exact DOM→source mapping exists — the selected text's
        // occurrence index disambiguates repeats, and structure-heavy
        // selections degrade to no carry. Never chase the exact version.
        _computeSourceSelection() {
            const sel = window.getSelection();
            if (!sel.rangeCount || !this.editable.contains(sel.anchorNode)) return null;
            const norm = (s) => s.replace(/\s+/g, ' ').trim();

            let needle = norm(sel.toString());
            if (!needle) {
                // Collapsed caret — use the word around it.
                const node = sel.anchorNode;
                if (node.nodeType !== Node.TEXT_NODE) return null;
                const text = node.textContent;
                const at = sel.anchorOffset;
                const before = /\S*$/.exec(text.slice(0, at))[0];
                const after = /^\S*/.exec(text.slice(at))[0];
                needle = norm(before + after);
                if (!needle) return null;
            }

            // How many times does the needle occur BEFORE the selection? The
            // same occurrence index locates it in the source string.
            const range = sel.getRangeAt(0);
            const pre = document.createRange();
            pre.selectNodeContents(this.editable);
            pre.setEnd(range.startContainer, range.startOffset);
            const preText = norm(pre.toString());
            let occ = 0;
            for (let i = preText.indexOf(needle); i !== -1; i = preText.indexOf(needle, i + 1)) occ++;

            const value = this.source.value;
            let idx = -1, from = 0;
            for (let k = 0; k <= occ; k++) {
                idx = value.indexOf(needle, from);
                if (idx === -1) break;
                from = idx + 1;
            }
            if (idx === -1) idx = value.indexOf(needle); // fallback: first occurrence
            if (idx === -1 && needle.length > 24) {
                // Selection spans structure the printer reshaped — retry with its head.
                needle = needle.slice(0, 24);
                idx = value.indexOf(needle);
            }
            if (idx === -1) return null;
            return { start: idx, end: idx + needle.length };
        }

        // Tab indents in source view (line-wise over a selection, Shift+Tab
        // outdents); Escape-then-Tab releases the trap and moves focus — the
        // code-editor convention. Edits go through execCommand('insertText')
        // so the textarea's native undo survives.
        _onSourceKeydown(e) {
            if (e.key === 'Escape') { this._sourceTabEscape = true; return; }
            if (e.key !== 'Tab') { this._sourceTabEscape = false; return; }
            if (this._sourceTabEscape) { this._sourceTabEscape = false; return; }
            e.preventDefault();
            const ta = this.source;
            const INDENT = '  ';
            const { selectionStart: start, selectionEnd: end, value } = ta;
            if (start === end && !e.shiftKey) {
                document.execCommand('insertText', false, INDENT);
                return;
            }
            // Line-wise: extend to the start of the first selected line.
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            const block = value.slice(lineStart, end);
            const next = e.shiftKey
                ? block.replace(/^ {1,2}/gm, '')
                : block.replace(/^/gm, INDENT);
            if (next === block) return;
            ta.setSelectionRange(lineStart, end);
            document.execCommand('insertText', false, next);
            // Re-select the affected lines so repeated Tab/Shift+Tab flows.
            ta.setSelectionRange(lineStart, lineStart + next.length);
        }

        // ---------- Editing events ----------

        _onInput() {
            this._syncSource(true); // typing coalesces into one history entry
            this._scheduleToolbarSync();
        }

        _onKeydown(e) {
            // NDS component shells are atomic to boundary deletes — a
            // Backspace/Delete that would cross a shell edge must not merge
            // content through it.
            if ((e.key === 'Backspace' || e.key === 'Delete') && this._guardRegionDelete(e)) return;
            if (e.key === 'Enter' && this._guardRegionEnter(e)) return;
            if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                const k = e.key.toLowerCase();
                if (k === 'z' || k === 'y') {
                    e.preventDefault();
                    this._historyStep(k === 'y' || e.shiftKey ? 1 : -1);
                    return;
                }
                const cmd = { b: 'bold', i: 'italic', u: 'underline' }[e.key.toLowerCase()];
                if (cmd) {
                    e.preventDefault();
                    this._applyCommand(cmd);
                    this._syncSource();
                    this._updateToolbarState();
                }
                return;
            }
            // Tab nests list items; outside lists it keeps its native focus-move
            // (never trap keyboard users inside the editor).
            if (e.key === 'Tab') {
                const block = this._getBlockContext();
                if (block && block.tagName === 'LI') {
                    e.preventDefault();
                    document.execCommand(e.shiftKey ? 'outdent' : 'indent');
                    this._syncSource();
                    this._updateToolbarState();
                }
            }
        }

        _onPaste(e) {
            e.preventDefault();
            const html = e.clipboardData.getData('text/html');
            const text = e.clipboardData.getData('text/plain');
            let insert;
            // Markup evidence: a closing tag, a self-close, or a void element
            // (a bare <img …> snippet has neither of the first two).
            if (text && /^\s*<[a-z!]/i.test(text) && /<\/[a-z][^>]*>|\/>|<(?:img|br|hr)\b/i.test(text)) {
                // Raw HTML source pasted as text (IDE, doc-page code blocks):
                // the plain flavor IS markup — parse it through the pipeline
                // instead of escaping it into visible tags.
                insert = sanitizeHtml(text);
            } else if (html) {
                insert = sanitizeHtml(html);
            } else if (text) {
                insert = escapeHtml(text).replace(/\n/g, '<br>');
            }
            if (!insert) {
                // No usable text flavor — a clipboard image FILE (screenshot,
                // copied bitmap) embeds as a data:image URL, but only in
                // embed mode; the default politely points at the image
                // dialog. Mixed text+image clipboards (Word) keep the text
                // flavor; the file is unplaceable there and stays dropped.
                const file = Array.from(e.clipboardData.files).find(f => f.type.startsWith('image/'));
                if (!file) return;
                if (!this._imageEmbedAllowed()) {
                    this._notice(uiLabel(TOOLBAR_STRINGS.pasteBlocked));
                    return;
                }
                // Same size cap as the popover upload (the container's
                // live-read NDS.Upload config; generated default 2MB) —
                // base64 inflates ~37% into the form value.
                const host = this.root.querySelector('[data-editor-image-upload]');
                const cap = host?.ndsUpload?.getConfig?.().maxFileSize || 2097152;
                if (file.size > cap) {
                    this._notice(uiLabel(TOOLBAR_STRINGS.imageTooLarge));
                    return;
                }
                const fr = new FileReader();
                fr.onload = () => this._insertImage(fr.result, '');
                fr.readAsDataURL(file);
                return;
            }
            // A pasted fragment ending in a block element (component region,
            // table…) leaves the caret trapped inside it — give typing a
            // paragraph to continue in. Trailing inline content is no trap;
            // trailing whitespace is trimmed so Chrome doesn't wrap it into a
            // junk paragraph.
            const last = new DOMParser().parseFromString(insert, 'text/html').body.lastElementChild;
            if (last && !FLOW_EXIT_TAGS.test(last.tagName) && !INLINE_TAGS.has(last.tagName)) {
                insert = insert.replace(/\s+$/, '') + '<p><br></p>';
            }
            if (isEffectivelyEmpty(this.editable)) {
                // Empty document: set the content directly — Chrome's
                // insertHTML insists on splitting the placeholder into a
                // blank first line around block inserts.
                // ponytail: this one paste isn't a native undo entry;
                // recovery in an empty doc is select-all + delete.
                const probe = new DOMParser().parseFromString(insert, 'text/html').body;
                const inlineOnly = [...probe.children].every(c => INLINE_TAGS.has(c.tagName));
                this.editable.innerHTML = inlineOnly ? `<p>${insert}</p>` : insert;
                const r = document.createRange();
                r.selectNodeContents(this.editable);
                r.collapse(false);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(r);
                this._refreshLinks();
                this._syncSource();
                this._updateToolbarState();
                return;
            }
            // ponytail: execCommand('insertHTML') keeps the native undo stack; range fallback below.
            if (!document.execCommand('insertHTML', false, insert)) {
                const sel = window.getSelection();
                if (!sel.rangeCount) return;
                const range = sel.getRangeAt(0);
                range.deleteContents();
                const tmp = document.createElement('div');
                tmp.innerHTML = insert;
                const frag = document.createDocumentFragment();
                while (tmp.firstChild) frag.appendChild(tmp.firstChild);
                range.insertNode(frag);
            }
            this._refreshLinks();
            this._syncSource();
            this._updateToolbarState();
        }

        // ---------- Selection helpers ----------

        _saveSelection() {
            const sel = window.getSelection();
            this._savedRange = (sel.rangeCount && this.editable.contains(sel.anchorNode))
                ? sel.getRangeAt(0).cloneRange()
                : null;
        }

        _restoreSelection() {
            const range = this._savedRange;
            this._savedRange = null;
            if (!range) return null;
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            return range;
        }

        // Nearest selection ancestor satisfying `match`, bounded by the
        // editable — closest() would escape it.
        _selAncestor(match) {
            const sel = window.getSelection();
            if (!sel.rangeCount) return null;
            let node = sel.anchorNode;
            if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
            while (node && node !== this.editable) {
                if (match(node)) return node;
                node = node.parentElement;
            }
            return null;
        }

        // Anchors created after load (link insert, paste, source edits,
        // hydration) miss the loader's eager NDS.Link pass — re-run it so
        // external links pick up their badge and target BEFORE the value
        // syncs, so the tagging round-trips into the form value. Soft
        // dependency: links keep their href but skip external-badge tagging
        // if NDS.Link isn't bundled.
        _refreshLinks() { NDS.Link?.init?.(); }

        _getAncestorTag(tagName) { return this._selAncestor(n => n.tagName === tagName); }

        _getBlockContext() { return this._selAncestor(n => BLOCK_TAGS.has(n.tagName)); }

        // ---------- Component-shell delete guard ----------

        // Top-most nds-classed ancestor under the editable — the shell
        // element. Nodes OUTSIDE the editable answer null: without the
        // containment bail the walk would climb the page DOM and treat page
        // chrome (nds-content-layout…) as removable shells.
        _regionRootOf(node) {
            let el = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
            if (!el || !this.editable.contains(el)) return null;
            let region = null;
            for (; el && el !== this.editable; el = el.parentElement) {
                if (hasNdsClass(el)) region = el;
            }
            return region;
        }

        // No text between the caret and the element's edge in the delete
        // direction (works for the shell root or any inner part).
        _atRegionEdge(range, region, back) {
            const r = document.createRange();
            r.selectNodeContents(region);
            if (back) r.setEnd(range.startContainer, range.startOffset);
            else r.setStart(range.startContainer, range.startOffset);
            return !r.toString().trim().length;
        }

        // First and last text nodes with a NON-EMPTY portion inside the range.
        // Raw endpoint containers over-reach (a full-part selection usually
        // ends at the NEXT element's offset 0), so boundary judgments key on
        // the text actually selected.
        _rangeTextEndpoints(range) {
            const walker = document.createTreeWalker(this.editable, NodeFilter.SHOW_TEXT);
            let first = null, last = null;
            for (let n = walker.nextNode(); n; n = walker.nextNode()) {
                if (!range.intersectsNode(n)) continue;
                const nr = document.createRange();
                nr.selectNodeContents(n);
                if (nr.compareBoundaryPoints(Range.START_TO_START, range) < 0) nr.setStart(range.startContainer, range.startOffset);
                if (nr.compareBoundaryPoints(Range.END_TO_END, range) > 0) nr.setEnd(range.endContainer, range.endOffset);
                // trim: a double-click word selection drags its trailing
                // whitespace along — inter-part whitespace is inert, not a
                // boundary crossing.
                if (!nr.toString().trim().length) continue;
                if (!first) first = n;
                last = n;
            }
            return { first, last };
        }

        // A selection clips a shell when the text it actually covers starts
        // or ends inside a component WITHOUT covering that component whole:
        // partial shell cuts and cross-part spans block; whole-shell
        // selections (explicit removal) and same-part text edits stay free.
        _selectionClipsShell(range) {
            const { first, last } = this._rangeTextEndpoints(range);
            if (!first) return false; // no real text selected — native is safe
            const containsWhole = (el) => {
                const r = document.createRange();
                r.selectNode(el);
                return range.compareBoundaryPoints(Range.START_TO_START, r) <= 0
                    && range.compareBoundaryPoints(Range.END_TO_END, r) >= 0;
            };
            const sr = this._regionRootOf(first);
            const er = this._regionRootOf(last);
            const startClips = sr && !containsWhole(sr);
            const endClips = er && !containsWhole(er);
            if (!startClips && !endClips) return false;
            if (sr === er) return this._partOf(first, sr) !== this._partOf(last, sr);
            return true;
        }

        // Innermost component part the caret sits in — the nearest ancestor
        // (bounded by the shell root) that is nds-classed or a structural
        // block. Its edges are deletion walls, so edits can't merge one part
        // of a component into another (description into title, cell into
        // cell). Falls back to the shell itself for bare text.
        _partOf(node, region) {
            let el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            for (; el && el !== region; el = el.parentElement) {
                if (hasNdsClass(el) || /^(?:P|LI|TD|TH|CAPTION|FIGCAPTION|DT|DD|H[1-6])$/.test(el.tagName)) return el;
            }
            return region;
        }

        // The element the delete would reach across the caret's boundary —
        // walks outward from the caret, skipping inert boundary nodes (blank
        // text, a paragraph's <br> filler) and climbing when a level is
        // exhausted; answers only for nds-classed shells (a chip, a card, a
        // table). Any real text/element in between means the delete is a
        // normal in-flow edit, not a boundary crossing.
        _adjacentRegion(range, back) {
            const node = range.startContainer;
            const off = range.startOffset;
            if (node.nodeType === Node.TEXT_NODE
                && (back ? off > 0 : off < node.textContent.length)) return null;
            let sib = node.nodeType === Node.ELEMENT_NODE
                ? (back ? node.childNodes[off - 1] : node.childNodes[off]) || null
                : null;
            let cur = node;
            while (true) {
                while (sib) {
                    if (sib.nodeType === Node.ELEMENT_NODE) {
                        if (hasNdsClass(sib)) return sib;
                        if (sib.tagName !== 'BR') return null;
                    } else if (sib.nodeType === Node.TEXT_NODE && sib.textContent.trim()) {
                        return null;
                    }
                    sib = back ? sib.previousSibling : sib.nextSibling;
                }
                if (!cur || cur === this.editable) return null;
                sib = back ? cur.previousSibling : cur.nextSibling;
                cur = cur.parentElement;
            }
        }

        // Explicit component removal — the toolbar's escape hatch from the
        // shell guards. A DIRECT DOM cut: execCommand('delete') can't remove
        // a whole element reliably (Chrome normalizes the selection to the
        // contents and leaves an emptied shell). Undo comes from the editor
        // history, not the native stack.
        _removeRegion(region) {
            const parent = region.parentNode;
            const idx = Array.prototype.indexOf.call(parent.childNodes, region);
            region.remove();
            const sel = window.getSelection();
            const r = document.createRange();
            if (!this.editable.firstElementChild && !this.editable.textContent.trim()) {
                this.editable.innerHTML = '<p><br></p>';
                r.selectNodeContents(this.editable.firstElementChild);
            } else {
                r.setStart(parent, Math.min(idx, parent.childNodes.length));
            }
            r.collapse(true);
            sel.removeAllRanges();
            sel.addRange(r);
        }

        // ---------- Editor history ----------

        _resolvePath(path) {
            let n = this.editable;
            for (const i of path) n = n.childNodes[i] || n;
            return n;
        }

        // Caret as a child-index path — value snapshots restore via a
        // deterministic re-parse, so paths resolve across restores.
        _caretSnapshot() {
            const sel = window.getSelection();
            if (!sel.rangeCount || !this.editable.contains(sel.anchorNode)) return null;
            const { startContainer, startOffset } = sel.getRangeAt(0);
            const path = [];
            for (let n = startContainer; n && n !== this.editable; n = n.parentNode) {
                path.unshift(Array.prototype.indexOf.call(n.parentNode.childNodes, n));
            }
            return { path, offset: startOffset };
        }

        // Value-snapshot history entry. Typing coalesces (sub-800ms bursts
        // rewrite the top entry); structural ops always cut a new one.
        // ponytail: 50-entry cap — full-value snapshots, not deltas.
        _pushHistory(coalesce) {
            if (this._histSuspend) return;
            const v = this.source.value;
            const h = this._history;
            if (h[this._histIdx]?.v === v) return;
            h.length = this._histIdx + 1; // any new edit drops the redo tail
            const now = Date.now();
            if (coalesce && this._histLast && now - this._histLast < 800 && this._histIdx > 0) {
                h[this._histIdx] = { v, caret: this._caretSnapshot() };
            } else {
                h.push({ v, caret: this._caretSnapshot() });
                this._histIdx++;
                if (h.length > 50) { h.shift(); this._histIdx--; }
            }
            this._histLast = coalesce ? now : 0;
        }

        // Undo/redo: restore a snapshot through the same hydrate path the
        // editor always uses, then put the caret back where it was recorded.
        _historyStep(dir) {
            const idx = this._histIdx + dir;
            if (idx < 0 || idx >= this._history.length) return;
            this._histIdx = idx;
            const snap = this._history[idx];
            this._histSuspend = true;
            this.editable.innerHTML = snap.v ? sanitizeHtml(snap.v) : '<p><br></p>';
            this._refreshLinks();
            this._syncSource();
            this._histSuspend = false;
            const sel = window.getSelection();
            const r = document.createRange();
            try {
                const node = this._resolvePath(snap.caret?.path || []);
                const max = node.nodeType === Node.TEXT_NODE ? node.textContent.length : node.childNodes.length;
                r.setStart(node, Math.min(snap.caret?.offset || 0, max));
            } catch {
                r.selectNodeContents(this.editable);
                r.collapse(false);
            }
            r.collapse(true);
            sel.removeAllRanges();
            sel.addRange(r);
            this._updateToolbarState();
        }

        // Removable levels at the caret, innermost→outermost: independent
        // nested components (an nds class NOT prefixed by any outer element's
        // base class — nds-tag inside nds-card) plus the top-most shell,
        // always. Structural parts (nds-alert-close inside nds-alert) and
        // icon-only elements never list — amputating parts is what the shell
        // guards exist to prevent.
        _removeLevels(node) {
            const els = [];
            let el = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
            if (!el || !this.editable.contains(el)) return [];
            for (; el && el !== this.editable; el = el.parentElement) {
                if (hasNdsClass(el)) els.push(el);
            }
            const levels = [];
            els.forEach((e, i) => {
                const isShell = i === els.length - 1;
                if (isShell) { levels.push(e); return; }
                if (componentNameOf(e) === 'NDS') return; // icon-only
                const outer = els.slice(i + 1);
                const isPart = Array.from(e.classList).some(c =>
                    c.startsWith('nds-') && outer.some(o => Array.from(o.classList).some(oc =>
                        oc.startsWith('nds-') && c.startsWith(oc + '-'))));
                if (!isPart) levels.push(e);
            });
            return levels;
        }

        // Save the selection and fill the picker — one destructive row per
        // removable level, rendered as a hierarchy: the shell first, nested
        // components indented under it (nds-card / – nds-tag).
        _prepRemoveMenu() {
            this._saveSelection();
            const sel = window.getSelection();
            this._removeChain = sel.rangeCount ? this._removeLevels(sel.getRangeAt(0).startContainer) : [];
            const list = this.root.querySelector('[data-editor-remove-levels]');
            if (!list) return;
            const chain = this._removeChain;
            list.innerHTML = chain.map((el, i) => ({ el, i })).reverse().map(({ el, i }, depth) =>
                `<button type="button" class="nds-btn nds-subtle nds-destructive nds-dropmenu-item" data-editor-remove-level="${i}" style="--_remove-depth: ${depth}"><span class="nds-label">${depth ? '– ' : ''}${escapeHtml(componentNameOf(el))}</span></button>`
            ).join('');
        }

        _confirmRemove(levelIndex) {
            this.root.querySelector('[data-editor-remove-dropmenu]')?.ndsDropmenu?.close?.();
            this.editable.focus();
            this._restoreSelection();
            const target = this._removeChain?.[levelIndex];
            if (target?.isConnected) this._removeRegion(target);
            this._syncSource();
            this._updateToolbarState();
        }

        _cancelRemove() {
            this.root.querySelector('[data-editor-remove-dropmenu]')?.ndsDropmenu?.close?.();
            this.editable.focus();
            this._restoreSelection();
        }

        // The remove command is caret-gated — live only when the caret sits
        // inside a component on an editable surface.
        _syncRemoveState() {
            const rm = this.toolbar?.querySelector('[data-cmd="remove"]');
            if (!rm) return;
            const sel = window.getSelection();
            const region = (this.editable.getAttribute('contenteditable') === 'true'
                && sel.rangeCount && this.editable.contains(sel.anchorNode))
                ? this._regionRootOf(sel.anchorNode) : null;
            rm.disabled = !region;
        }

        // Enter inside a shell would SPLIT the caret's block — the browser
        // clones it, classes and all, duplicating component parts. Convert it
        // to a line break inside the part; a shell-clipping selection blocks
        // entirely. Outside shells, native Enter (new paragraph) stands.
        _guardRegionEnter(e) {
            const sel = window.getSelection();
            if (!sel.rangeCount) return false;
            const range = sel.getRangeAt(0);
            if (!range.collapsed && this._selectionClipsShell(range)) {
                e.preventDefault();
                return true;
            }
            if (!this._regionRootOf(range.startContainer)) return false;
            e.preventDefault();
            // ponytail: insertLineBreak rides the native undo stack; Shift+
            // Enter lands here too and behaves identically.
            document.execCommand('insertLineBreak');
            this._syncSource();
            this._updateToolbarState();
            return true;
        }

        // Atomic-shell deletes: a Backspace/Delete that would cross a shell
        // boundary — from either side — simply STOPS there. Removing a
        // component is always explicit: select it, then delete (native, whole,
        // clean). Text editing inside the shell stays free.
        // ponytail: collapsed-caret guard only — a drag-selection clipping
        // half a shell still degrades through sanitize on the next sync.
        _guardRegionDelete(e) {
            const sel = window.getSelection();
            if (!sel.rangeCount) return false;
            const range = sel.getRangeAt(0);
            if (!range.collapsed) {
                // Selection deletes are legit fully inside one part (text
                // edit) or fully outside shells (contained shells go whole);
                // endpoints in different parts/shells cut through a boundary.
                const clips = this._selectionClipsShell(range);
                if (clips) e.preventDefault();
                return clips;
            }
            const back = e.key === 'Backspace';

            const caretRegion = this._regionRootOf(range.startContainer);
            const blocked = caretRegion
                // Inside a shell the wall is the innermost PART, not just the
                // shell edge — deletion can't leak between component parts.
                ? this._atRegionEdge(range, this._partOf(range.startContainer, caretRegion), back)
                : !!this._adjacentRegion(range, back);
            if (blocked) e.preventDefault();
            return blocked;
        }

        // Logical text-align inline on every block the selection touches;
        // start = cleared (the default). Native justify* commands write
        // physical left/right, which sanitize (rightly) strips — so this is
        // hand-rolled. ponytail: direct DOM writes — alignment ops don't
        // join the native undo stack.
        _applyAlignment(value) {
            const sel = window.getSelection();
            if (!sel.rangeCount) return;
            const range = sel.getRangeAt(0);
            let blocks = [];
            for (const el of this.editable.querySelectorAll('p, h1, h2, h3, h4, li')) {
                if (range.intersectsNode(el)) blocks.push(el);
            }
            if (!blocks.length) {
                const block = this._getBlockContext();
                if (block) blocks = [block];
            }
            for (const b of blocks) {
                if (value) b.style.textAlign = value;
                else b.style.removeProperty('text-align');
                if (!b.getAttribute('style')) b.removeAttribute('style');
            }
        }

        // ---------- Link popover ----------

        _prepLinkMenu() {
            this._saveSelection();
            const dropmenu = this.root.querySelector('[data-editor-link-dropmenu]');
            if (!dropmenu) return;
            const textInput = dropmenu.querySelector('[data-editor-link-text]');
            const urlInput = dropmenu.querySelector('[data-editor-link-url]');
            const externalInput = dropmenu.querySelector('[data-editor-link-external]');
            const unlinkBtn = dropmenu.querySelector('[data-editor-link-unlink]');
            const existing = this._getAncestorTag('A');
            const sel = window.getSelection();
            const selected = (sel.rangeCount && !sel.isCollapsed && this.editable.contains(sel.anchorNode))
                ? sel.toString().replace(/\s+/g, ' ').trim() : '';
            // Text shows the existing link's label, else the selection —
            // editable either way (typing it replaces the linked text).
            if (textInput) textInput.value = existing ? existing.textContent : selected;
            if (urlInput) urlInput.value = existing?.getAttribute('href') || 'https://';
            if (externalInput) externalInput.checked = existing?.getAttribute('target') === '_blank';
            const coloredInput = dropmenu.querySelector('[data-editor-link-colored]');
            if (coloredInput) coloredInput.checked = !!existing?.classList.contains('nds-primary');
            if (unlinkBtn) unlinkBtn.hidden = !existing;
            if (urlInput) NDS.Forms?.clearStatus?.(urlInput.closest('.nds-form-container'));
            dropmenu.querySelector('[data-dropmenu-primary]')?.removeAttribute('disabled');
            // After the dropmenu opens (next frame), select the URL for quick overwrite.
            setTimeout(() => urlInput?.select?.(), 60);
        }

        _confirmLink() {
            const dropmenu = this.root.querySelector('[data-editor-link-dropmenu]');
            const url = cleanUrl((dropmenu?.querySelector('[data-editor-link-url]')?.value || '').trim());
            const text = (dropmenu?.querySelector('[data-editor-link-text]')?.value || '').trim();
            const external = !!dropmenu?.querySelector('[data-editor-link-external]')?.checked;
            const colored = !!dropmenu?.querySelector('[data-editor-link-colored]')?.checked;
            if (!url || url === 'https://' || !safeUrl(url)) {
                this._fieldError(dropmenu?.querySelector('[data-editor-link-url]'), uiLabel(TOOLBAR_STRINGS.invalidUrl));
                return;
            }
            dropmenu?.ndsDropmenu?.close?.();

            this.editable.focus();
            this._restoreSelection();
            const sel = window.getSelection();
            // Canon stamp: nds-link always, nds-primary per the colored
            // checkbox, target/rel per the external checkbox (rel pairs every
            // _blank against tabnabbing; sanitize enforces the same).
            const applyCanon = (a) => {
                if (!a) return;
                a.classList.add('nds-link');
                a.classList.toggle('nds-primary', colored);
                if (external) a.setAttribute('target', '_blank');
                else a.removeAttribute('target');
                a.setAttribute('rel', 'noopener noreferrer');
            };
            const existing = this._getAncestorTag('A');
            if (existing) {
                existing.setAttribute('href', url);
                // Renaming replaces the linked text wholesale (inline formatting inside goes).
                if (text && text !== existing.textContent) existing.textContent = text;
                applyCanon(existing);
            } else if (sel.rangeCount && !sel.isCollapsed
                && (!text || text === sel.toString().replace(/\s+/g, ' ').trim())) {
                // Unchanged text: createLink keeps inline formatting inside the selection.
                document.execCommand('createLink', false, url);
                applyCanon(this._getAncestorTag('A'));
            } else {
                // Typed/changed text (or no selection): the anchor replaces the
                // selection whole — built complete so no post-insert lookup is needed.
                document.execCommand('insertHTML', false,
                    `<a class="nds-link${colored ? ' nds-primary' : ''}" href="${escapeHtml(url)}"${external ? ' target="_blank"' : ''} rel="noopener noreferrer">${escapeHtml(text || url)}</a>`);
            }
            this._refreshLinks();
            this._syncSource();
            this._updateToolbarState();
        }

        _unlink() {
            this.root.querySelector('[data-editor-link-dropmenu]')?.ndsDropmenu?.close?.();
            this.editable.focus();
            this._restoreSelection();
            // execCommand('unlink') needs a selection that intersects the
            // anchor — a collapsed caret inside the link no-ops. Select the
            // whole anchor first.
            const existing = this._getAncestorTag('A');
            if (existing) {
                const sel = window.getSelection();
                const r = document.createRange();
                r.selectNodeContents(existing);
                sel.removeAllRanges();
                sel.addRange(r);
            }
            document.execCommand('unlink');
            this._syncSource();
            this._updateToolbarState();
        }

        // Close without touching the document; hand focus and selection back.
        _cancelLink() {
            this.root.querySelector('[data-editor-link-dropmenu]')?.ndsDropmenu?.close?.();
            this.editable.focus();
            this._restoreSelection();
        }

        // ---------- Image popover ----------

        // Base64 embedding is the niche opt-in (demo docs, back-office, no
        // backend) — real deployments upload to a server or link out, so the
        // default popover is URL-only and pasted image FILES don't embed.
        _imageEmbedAllowed() { return this.root.dataset.editorImageEmbed === 'true'; }

        _imageUploadConfigured(host) {
            return !!(host?.ndsUpload?.getConfig?.().uploadUrl || host?.dataset.uploadUrl);
        }

        // The upload affordance shows only when it leads somewhere real:
        // embed opted in, or an endpoint configured on the container
        // (live-read, so consumer JS can stamp NDS.Upload attrs any time
        // before the menu opens).
        _syncImageUploadVisibility() {
            const dropmenu = this.root.querySelector('[data-editor-image-dropmenu]');
            const host = dropmenu?.querySelector('[data-editor-image-upload]');
            if (!host) return;
            const show = this._imageEmbedAllowed() || this._imageUploadConfigured(host);
            host.style.display = show ? '' : 'none';
            const divider = dropmenu.querySelector('[data-editor-image-or]');
            if (divider) divider.style.display = show ? '' : 'none';
        }

        // Public: forward NDS.Upload config (uploadUrl, autoUpload,
        // maxFileSize, allowedTypes…) to the image popover's upload container
        // as dataset keys — NDS.Upload reads them live. Value null/false
        // removes a key. Chainable.
        setImageUpload(config = {}) {
            const host = this.root.querySelector('[data-editor-image-upload]');
            if (host) {
                for (const [k, v] of Object.entries(config)) {
                    if (v == null || v === false) delete host.dataset[k];
                    else host.dataset[k] = String(v);
                }
                this._syncImageUploadVisibility();
            }
            return this;
        }

        // Transient author-facing notice through the field's native forms
        // feedback (the editor root IS a form container).
        _notice(message) {
            if (!NDS.Forms?.setStatus) return;
            NDS.Forms.setStatus({ element: this.root, status: 'warning', message });
            clearTimeout(this._noticeTimer);
            this._noticeTimer = setTimeout(() => NDS.Forms.clearStatus(this.root), 5000);
        }

        // Inline error on a popover field via the same forms mechanism; the
        // menu's primary (Insert) stays blocked until the error clears.
        _fieldError(input, message) {
            const field = input?.closest('.nds-form-container');
            if (!field) return;
            if (NDS.Forms?.setStatus) NDS.Forms.setStatus({ element: field, status: 'error', message });
            const primary = input.closest('.nds-dropmenu-menu')?.querySelector('[data-dropmenu-primary]');
            if (primary) primary.disabled = true;
        }

        // The "image is selected" selection shape browsers produce when an
        // <img> in the editable is clicked: a one-node range over the element.
        _selectedImage() {
            const sel = window.getSelection();
            if (!sel.rangeCount) return null;
            const r = sel.getRangeAt(0);
            if (r.collapsed || r.startContainer !== r.endContainer
                || r.startContainer.nodeType !== Node.ELEMENT_NODE
                || r.endOffset - r.startOffset !== 1) return null;
            const n = r.startContainer.childNodes[r.startOffset];
            return (n && n.tagName === 'IMG' && this.editable.contains(n)) ? n : null;
        }

        _prepImageMenu() {
            this._saveSelection();
            const dropmenu = this.root.querySelector('[data-editor-image-dropmenu]');
            if (!dropmenu) return;
            const urlInput = dropmenu.querySelector('[data-editor-image-url]');
            const altInput = dropmenu.querySelector('[data-editor-image-alt]');
            // A clicked (selected) image edits in place — url/alt prefill.
            const existing = this._selectedImage();
            if (urlInput) urlInput.value = existing?.getAttribute('src') || 'https://';
            if (altInput) altInput.value = existing?.getAttribute('alt') || '';
            const wInput = dropmenu.querySelector('[data-editor-image-width]');
            const hInput = dropmenu.querySelector('[data-editor-image-height]');
            if (wInput) wInput.value = existing?.getAttribute('width') || '';
            if (hInput) hInput.value = existing?.getAttribute('height') || '';
            // Fresh staging per open — a committed/abandoned chip never
            // lingers, stale field errors clear, and the upload affordance
            // reflects the CURRENT config.
            dropmenu.querySelector('[data-editor-image-upload]')?.ndsUpload?.clearAllFiles?.();
            if (urlInput) NDS.Forms?.clearStatus?.(urlInput.closest('.nds-form-container'));
            dropmenu.querySelector('[data-dropmenu-primary]')?.removeAttribute('disabled');
            this._syncImageUploadVisibility();
            setTimeout(() => urlInput?.select?.(), 60);
        }

        _confirmImage() {
            const dropmenu = this.root.querySelector('[data-editor-image-dropmenu]');
            const url = cleanUrl((dropmenu?.querySelector('[data-editor-image-url]')?.value || '').trim());
            const alt = (dropmenu?.querySelector('[data-editor-image-alt]')?.value || '').trim();
            // Dims are the numeric width/height ATTRIBUTES (aspect + CLS);
            // empty/invalid = natural size.
            const width = parseInt(dropmenu?.querySelector('[data-editor-image-width]')?.value, 10) || 0;
            const height = parseInt(dropmenu?.querySelector('[data-editor-image-height]')?.value, 10) || 0;
            // 'https://' alone is the untouched placeholder, not a URL; data:
            // srcs are embed-mode only.
            if (!url || url === 'https://' || !safeSrc(url)
                || (url.startsWith('data:') && !this._imageEmbedAllowed())) {
                this._fieldError(dropmenu?.querySelector('[data-editor-image-url]'), uiLabel(TOOLBAR_STRINGS.invalidImageUrl));
                return;
            }
            dropmenu?.ndsDropmenu?.close?.();
            // Committed — the staging chip's job is done.
            dropmenu?.querySelector('[data-editor-image-upload]')?.ndsUpload?.clearAllFiles?.();
            this.editable.focus();
            this._restoreSelection();
            const existing = this._selectedImage();
            if (existing) {
                existing.setAttribute('src', url);
                existing.setAttribute('alt', alt);
                width > 0 ? existing.setAttribute('width', width) : existing.removeAttribute('width');
                height > 0 ? existing.setAttribute('height', height) : existing.removeAttribute('height');
                this._syncSource();
                this._updateToolbarState();
            } else {
                this._insertImage(url, alt, width, height);
            }
        }

        _cancelImage() {
            this.root.querySelector('[data-editor-image-dropmenu]')?.ndsDropmenu?.close?.();
            this.editable.focus();
            this._restoreSelection();
        }

        // Inline <img> at the caret — popover confirm and pasted clipboard
        // image files both land here. execCommand keeps the native undo stack.
        _insertImage(src, alt, width, height) {
            this.editable.focus();
            document.execCommand('insertHTML', false,
                `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"`
                + `${width > 0 ? ` width="${width}"` : ''}${height > 0 ? ` height="${height}"` : ''}>`);
            this._syncSource();
            this._updateToolbarState();
        }

        // A fresh line at the end (or the existing trailing empty paragraph),
        // caret in it. New lines go through execCommand so the native undo
        // history stays intact — and since trailing empty paragraphs never
        // reach the form value, caret-escape clicks don't dirty the field.
        _placeCaretAtEnd() {
            const last = this.editable.lastElementChild;
            const sel = window.getSelection();
            this.editable.focus();
            const r = document.createRange();
            if (last && last.tagName === 'P' && !last.textContent.trim()) {
                r.selectNodeContents(last);
                r.collapse(false);
                sel.removeAllRanges();
                sel.addRange(r);
                return;
            }
            r.selectNodeContents(this.editable);
            r.collapse(false);
            sel.removeAllRanges();
            sel.addRange(r);
            document.execCommand('insertParagraph');
        }

        // ---------- Toolbar state ----------

        _scheduleToolbarSync() {
            if (this._rafId) return;
            this._rafId = requestAnimationFrame(() => {
                this._rafId = 0;
                const sel = window.getSelection();
                // The remove gate must react to the selection LEAVING the
                // editable too — a stale enabled state would let the picker
                // target whatever the outside selection sits in.
                this._syncRemoveState();
                if (!sel.rangeCount) return;
                if (!this.editable.contains(sel.anchorNode)) return;
                this._updateToolbarState();
            });
        }

        _updateToolbarState() {
            this._syncRemoveState();
            const block = this._getBlockContext();
            const blockTag = block ? block.tagName : null;
            const inList = (block && block.tagName === 'LI') ? block.closest('ul,ol')?.tagName : null;

            for (const btn of this.buttons) {
                // Only toggle commands carry aria-pressed in markup; action
                // buttons (undo/redo/clear) are momentary and stay untouched.
                if (!btn.hasAttribute('aria-pressed')) continue;
                const cmd = btn.dataset.cmd;
                let pressed = false;
                if (cmd === 'bold')           pressed = this._safeQueryState('bold');
                else if (cmd === 'italic')    pressed = this._safeQueryState('italic');
                else if (cmd === 'underline') pressed = this._safeQueryState('underline');
                else if (cmd === 'strike')    pressed = this._safeQueryState('strikeThrough');
                else if (cmd === 'link')      pressed = !!this._getAncestorTag('A');
                else if (cmd === 'image')     pressed = !!this._selectedImage();
                else if (CMD_BLOCK_MAP[cmd]) pressed = blockTag === CMD_BLOCK_MAP[cmd];
                else if (cmd === 'ul')        pressed = inList === 'UL';
                else if (cmd === 'ol')        pressed = inList === 'OL';
                else if (cmd.startsWith('align-')) pressed = (block?.style.textAlign || 'start') === cmd.slice(6);
                btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
            }
        }

        _safeQueryState(name) {
            try { return document.queryCommandState(name); } catch { return false; }
        }

        // ---------- Form value sync ----------

        // A block element (table, card, figure…) as the document's last node
        // traps the caret — there is nowhere to click/arrow to continue after
        // it. Keep an empty paragraph after any trailing block.
        _ensureTrailingParagraph() {
            const last = this.editable.lastElementChild;
            if (!last || FLOW_EXIT_TAGS.test(last.tagName)) return;
            const p = document.createElement('p');
            p.innerHTML = '<br>';
            this.editable.appendChild(p);
        }

        _syncSource(coalesce = false) {
            this._ensureTrailingParagraph();
            const empty = isEffectivelyEmpty(this.editable);
            this.editable.classList.toggle('is-empty', empty);
            const next = empty
                ? ''
                // ponytail: full sanitize+rebuild per input keeps the value canonical; debounce if profiling ever flags it.
                : prettyPrintHtml(sanitizeHtml(this.editable.innerHTML))
                    // The trailing caret-escape paragraph is an editing
                    // affordance, not content — it stays out of the value.
                    .replace(/\n?<p><br><\/p>$/, '');
            if (this.source.value === next) return;
            this.source.value = next;
            // Programmatic .value writes don't fire 'input' — dispatch so NDS.Forms delegation sees the change.
            this.source.dispatchEvent(new Event('input', { bubbles: true }));
            this._pushHistory(coalesce);
        }
    }

    // ---------- Init sweep + export ----------

    function initializeEditors() {
        document.querySelectorAll('.nds-editor').forEach(el => {
            if (el.closest('code, .code-example')) return;
            if (el.hasAttribute('data-nds-editor-initialized')) return;
            new NDSEditor(el);
        });
    }

    if (typeof window !== 'undefined') {
        window.NDS = window.NDS || {};
        NDS.Editor = {
            init: initializeEditors,
            reinit: initializeEditors,
            // Construction fails (missing required elements) → null, never a
            // dud instance whose every method throws.
            create: (element) => {
                if (element.ndsEditor) return element.ndsEditor;
                const inst = new NDSEditor(element);
                return inst.valid ? inst : null;
            },
            destroy: (element) => element.ndsEditor?.destroy(),
            _sanitize: sanitizeHtml // dev/test hook — the full interpret+enforce pipeline, consumed by scripts/editor-fixtures.mjs
        };
    }
})();
