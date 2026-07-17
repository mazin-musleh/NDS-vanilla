/**
 * NDS Editor — rich-text editing surface (contenteditable) mirrored into a
 * textarea form field. Toolbar formatting (bold/italic/underline/strike,
 * headings, lists), link popover, source view, and paste sanitization.
 *
 * Status: BETA — ships with v1.4.0. Under heavy testing and real-project
 * hardening; API and markup contract may still change.
 *
 * Form carrier: the .nds-editor-source textarea (direct child of
 * .nds-form-control, clip-hidden — never [hidden], so NDS.Forms validation
 * still sees it) holds the sanitized pretty-printed HTML; bubbling
 * input/change events keep forms delegation and consumer listeners native.
 *
 * NDS-specific: pasted or source-typed NDS component markup (nds-* classed
 * regions — buttons, tags, tables, cards, alerts…) is kept through sanitize
 * with a filtered class/attribute set; foreign markup still reduces to the
 * plain formatting vocabulary.
 *
 * Event: `nds:editor:ready` with { instance } after init.
 */

(function () {
    'use strict';

    // ponytail: tag-whitelist sanitizer. Upgrade to DOMPurify only if a security review demands fuller spec compliance.
    const ALLOWED_TAGS = new Set(['P', 'BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A', 'H1', 'H2', 'H3', 'UL', 'OL', 'LI']);
    // Dropped whole, never unwrapped — unwrapping would leak their TEXT into
    // content (a Word clipboard ships a <style> block whose CSS would become
    // visible text) or keep active/embedded surfaces.
    const DROP_TAGS = new Set(['STYLE', 'SCRIPT', 'HEAD', 'META', 'LINK', 'TITLE', 'XML', 'TEMPLATE', 'NOSCRIPT', 'IFRAME', 'FRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'SELECT', 'TEXTAREA', 'INPUT', 'AUDIO', 'VIDEO', 'CANVAS', 'MAP', 'BASE']);
    const INLINE_TAGS  = new Set(['BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A']);
    const BLOCK_TAGS   = new Set(['P', 'H1', 'H2', 'H3', 'LI']);
    const CMD_BLOCK_MAP = { h1: 'H1', h2: 'H2', h3: 'H3' };
    // Safe URL protocols for <a href>. javascript:, data:, vbscript: rejected.
    const SAFE_URL = /^(?:https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/i;
    const SAFE_SRC = /^(?:https?:|\/|\.\/|\.\.\/)/i;

    // NDS component regions — the editor is NDS-specific, so pasted/typed NDS
    // component markup (buttons, tags, tables, cards, alerts…) is kept, not
    // stripped. An element in NDS_TAGS carrying an nds-* class roots a region;
    // inside it structural tags survive, classes filter to the NDS/HGI
    // vocabulary, and attributes reduce to the styling/a11y set in
    // scrubRegionElement — never style/on*/id, so the trust boundary holds.
    const NDS_TAGS = new Set(['DIV', 'SPAN', 'BUTTON', 'A', 'I', 'P', 'BR', 'HR', 'STRONG', 'EM', 'B', 'U', 'S', 'STRIKE', 'SMALL',
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'TABLE', 'CAPTION', 'THEAD', 'TBODY', 'TFOOT', 'TR', 'TH', 'TD',
        'FIGURE', 'FIGCAPTION', 'BLOCKQUOTE', 'CITE', 'IMG', 'DL', 'DT', 'DD']);
    const NDS_CLASS = /^(?:nds-|hgi$|hgi-)/;
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
    const CONTAINER_SEL = 'div, section, article, aside, header, footer, main, center';

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

    // Strip attributes; keep only safe-protocol href on <a> (unwrap hrefless anchors).
    function stripAttributes(root, trusted) {
        for (const el of root.querySelectorAll('*')) {
            if (trusted && isInTrusted(el, trusted)) continue;
            const isAnchor = el.tagName === 'A';
            const href = isAnchor ? el.getAttribute('href') : null;
            for (const attr of Array.from(el.attributes)) el.removeAttribute(attr.name);
            if (isAnchor) {
                if (href && SAFE_URL.test(href)) {
                    el.setAttribute('href', href);
                    el.setAttribute('rel', 'noopener noreferrer');
                } else {
                    unwrapEl(el);
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
                const inlineOk = INLINE_TAGS.has(child.tagName)
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
        const href = tag === 'A' ? el.getAttribute('href') : null;
        const src = tag === 'IMG' ? el.getAttribute('src') : null;
        const knobs = [];
        for (let i = 0; i < el.style.length; i++) {
            const prop = el.style.item(i);
            if (prop.startsWith('--')) knobs.push([prop, el.style.getPropertyValue(prop)]);
        }
        const kept = [];
        for (const attr of Array.from(el.attributes)) {
            const n = attr.name;
            if (/^aria-/i.test(n) || n === 'role' || n === 'data-status' || n === 'data-state'
                || (tag === 'IMG' && n === 'alt')
                || ((tag === 'TD' || tag === 'TH') && (n === 'colspan' || n === 'rowspan' || n === 'scope'))) {
                kept.push([n, attr.value]);
            }
            el.removeAttribute(n);
        }
        for (const [n, v] of kept) el.setAttribute(n, v);
        for (const [p, v] of knobs) el.style.setProperty(p, v);
        if (classes.length) el.setAttribute('class', classes.join(' '));
        if (tag === 'A' && href && SAFE_URL.test(href)) {
            el.setAttribute('href', href);
            el.setAttribute('rel', 'noopener noreferrer');
        }
        // A pasted default-type (submit) button would submit the host form.
        if (tag === 'BUTTON') el.setAttribute('type', 'button');
        if (tag === 'IMG') {
            if (src && SAFE_SRC.test(src)) el.setAttribute('src', src);
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
        // carry nothing. Intentional blank lines (<p><br></p>) are kept.
        for (const pEl of Array.from(root.querySelectorAll('p'))) {
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
    const FLOW_EXIT_TAGS = /^(?:P|H[1-3]|UL|OL)$/;

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
            && !editable.querySelector('ul, ol, h1, h2, h3, table, [class*="nds-"]');
    }

    // The editable and toolbar buttons aren't native form controls, so the
    // forms disabled/readonly hooks don't reach them (same rationale as the
    // taginput chip hooks) — react to the container state tokens instead.
    ['disabled', 'readonly'].forEach(token => {
        NDS.State.onAdd(token, '.nds-editor', el => el.ndsEditor?._applyAccessState());
        NDS.State.onRemove(token, '.nds-editor', el => el.ndsEditor?._applyAccessState());
    });

    // ---------- Editor ----------

    class NDSEditor {
        constructor(root) {
            this.root = root;
            // Success signal — init() only runs (and registers root.ndsEditor) when construction succeeds.
            this.valid = false;
            if (root.hasAttribute('data-nds-editor-initialized')) return;

            this.editable = root.querySelector('.nds-editor-editable');
            this.source   = root.querySelector('.nds-editor-source');
            this.toolbar  = root.querySelector('.nds-toolbar');
            if (!this.editable || !this.source || !this.toolbar) {
                console.warn('NDS Editor: missing required elements', root);
                return;
            }

            this.buttons = Array.from(this.toolbar.querySelectorAll('[data-cmd]'));
            this.abortController = new AbortController();
            this._rafId = 0;
            this._savedRange = null;
            this._focusWithin = false;
            this.valid = true;
            this.init();
        }

        init() {
            this.root.setAttribute('data-nds-editor-initialized', 'true');
            this.root.ndsEditor = this;
            const { signal } = this.abortController;

            // ponytail: <p> as new-block separator — native Enter gives clean <p> per paragraph.
            try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* older UAs */ }

            // Hydrate from a server-filled textarea (the restore path), else
            // canonicalize whatever the editable was server-rendered with — the
            // editable must show what the form value holds, not a richer original.
            const seed = this.source.value.trim() ? this.source.value : this.editable.innerHTML;
            const clean = sanitizeHtml(seed) || '<p><br></p>';
            // Only rewrite on an actual difference: typing in the pre-bundle gap is
            // native contenteditable, and reassigning innerHTML would drop the caret.
            if (clean !== this.editable.innerHTML) this.editable.innerHTML = clean;
            this._syncSource();

            // preventDefault on mousedown keeps the editable's selection when a
            // toolbar button is clicked. The link command preps here too —
            // NDS.Dropmenu's trigger click stopPropagations, so the toolbar click
            // delegate below never fires for it.
            this.toolbar.addEventListener('mousedown', (e) => {
                const cmdBtn = e.target.closest('[data-cmd]');
                if (!cmdBtn) return;
                e.preventDefault();
                if (cmdBtn.dataset.cmd === 'link') this._prepLinkMenu();
            }, { signal });

            this.toolbar.addEventListener('click', this._onToolbarClick.bind(this), { signal });
            this.editable.addEventListener('input', this._onInput.bind(this), { signal });
            this.editable.addEventListener('paste', this._onPaste.bind(this), { signal });
            this.editable.addEventListener('keydown', this._onKeydown.bind(this), { signal });
            document.addEventListener('selectionchange', this._scheduleToolbarSync.bind(this), { signal });

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

            const linkMenu = this.root.querySelector('[data-nds-editor-link-dropmenu] .nds-dropmenu-menu');
            if (linkMenu) {
                linkMenu.addEventListener('click', (e) => {
                    if (e.target.closest('[data-nds-editor-link-confirm]')) this._confirmLink();
                    else if (e.target.closest('[data-nds-editor-link-unlink]')) this._unlink();
                }, { signal });
                linkMenu.querySelector('[data-nds-editor-link-url]')?.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { e.preventDefault(); this._confirmLink(); }
                }, { signal });
            }


            // Server-shipped data-state="disabled|readonly" applies at init;
            // later toggles arrive through the NDS.State hooks above.
            this._applyAccessState();

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
            this.source.disabled = disabled;
            this.source.readOnly = readonly;
            this.toolbar.querySelectorAll('[data-cmd]').forEach(btn => { btn.disabled = !editable; });
            const srcBtn = this.toolbar.querySelector('[data-source-toggle]');
            if (srcBtn) srcBtn.disabled = disabled; // readonly may still view source
        }

        destroy() {
            if (this._rafId) cancelAnimationFrame(this._rafId);
            this.abortController.abort();
            this.root.removeAttribute('data-nds-editor-initialized');
            delete this.root.ndsEditor;
        }

        // ---------- Toolbar ----------

        _onToolbarClick(e) {
            if (e.target.closest('[data-source-toggle]')) { this._toggleSourceView(); return; }
            const btn = e.target.closest('[data-cmd]');
            if (!btn || this.root.classList.contains('is-source')) return;
            const cmd = btn.dataset.cmd;
            if (cmd === 'link') return; // dropmenu-backed — handled via mousedown prep + menu clicks
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
                case 'undo':      document.execCommand('undo'); break;
                case 'redo':      document.execCommand('redo'); break;
                case 'h1':
                case 'h2':
                case 'h3': {
                    const targetTag = CMD_BLOCK_MAP[cmd];
                    const block = this._getBlockContext();
                    document.execCommand('formatBlock', false, (block && block.tagName === targetTag) ? 'P' : targetTag);
                    break;
                }
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
            this._syncSource();
            this._scheduleToolbarSync();
        }

        _onKeydown(e) {
            if ((e.ctrlKey || e.metaKey) && !e.altKey) {
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
            if (text && /^\s*<[a-z!]/i.test(text) && /<\/[a-z][^>]*>|\/>/.test(text)) {
                // Raw HTML source pasted as text (IDE, doc-page code blocks):
                // the plain flavor IS markup — parse it through the pipeline
                // instead of escaping it into visible tags.
                insert = sanitizeHtml(text);
            } else if (html) {
                insert = sanitizeHtml(html);
            } else if (text) {
                insert = escapeHtml(text).replace(/\n/g, '<br>');
            }
            if (!insert) return;
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

        _getAncestorTag(tagName) { return this._selAncestor(n => n.tagName === tagName); }

        _getBlockContext() { return this._selAncestor(n => BLOCK_TAGS.has(n.tagName)); }

        // ---------- Link popover ----------

        _prepLinkMenu() {
            this._saveSelection();
            const dropmenu = this.root.querySelector('[data-nds-editor-link-dropmenu]');
            const urlInput = dropmenu?.querySelector('[data-nds-editor-link-url]');
            const unlinkBtn = dropmenu?.querySelector('[data-nds-editor-link-unlink]');
            const existing = this._getAncestorTag('A');
            if (urlInput) urlInput.value = existing?.getAttribute('href') || 'https://';
            if (unlinkBtn) unlinkBtn.hidden = !existing;
            // After the dropmenu opens (next frame), select the URL for quick overwrite.
            setTimeout(() => urlInput?.select?.(), 60);
        }

        _confirmLink() {
            const dropmenu = this.root.querySelector('[data-nds-editor-link-dropmenu]');
            const urlInput = dropmenu?.querySelector('[data-nds-editor-link-url]');
            const url = urlInput ? urlInput.value.trim() : '';
            if (!url || !SAFE_URL.test(url)) {
                console.warn('NDS Editor: rejected unsafe or empty URL', url);
                return;
            }
            dropmenu?.ndsDropmenu?.close?.();

            this.editable.focus();
            this._restoreSelection();
            const sel = window.getSelection();
            const existing = this._getAncestorTag('A');
            if (existing) {
                existing.setAttribute('href', url);
            } else if (sel.rangeCount && !sel.isCollapsed) {
                document.execCommand('createLink', false, url);
            } else {
                // No selection — insert the URL as its own link text.
                const escaped = escapeHtml(url);
                document.execCommand('insertHTML', false, `<a href="${escaped}">${escaped}</a>`);
            }
            this._syncSource();
            this._updateToolbarState();
        }

        _unlink() {
            this.root.querySelector('[data-nds-editor-link-dropmenu]')?.ndsDropmenu?.close?.();
            this.editable.focus();
            this._restoreSelection();
            document.execCommand('unlink');
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
                if (!sel.rangeCount) return;
                if (!this.editable.contains(sel.anchorNode)) return;
                this._updateToolbarState();
            });
        }

        _updateToolbarState() {
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
                else if (cmd === 'h1' || cmd === 'h2' || cmd === 'h3') pressed = blockTag === CMD_BLOCK_MAP[cmd];
                else if (cmd === 'ul')        pressed = inList === 'UL';
                else if (cmd === 'ol')        pressed = inList === 'OL';
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

        _syncSource() {
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
