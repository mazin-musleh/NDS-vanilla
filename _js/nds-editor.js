/* NDS.Editor — public surface
 * Rides: nds-forms (the adopted textarea stays a normal field — validation and field
 *        chrome keep working) · nds-dropmenu (the link, image and remove popovers)
 *      · nds-upload (the image popover's file field) · nds-tooltip (toolbar button labels)
 *      · nds-link (link chrome refresh after an edit; soft)
 * Methods:
 *   NDS.Editor.init() / .reinit()   scan + initialize .nds-editor
 *   NDS.Editor.create(el)           instance one editor — null when the markup is
 *                                   incomplete; returns the live one if there is already one
 *   NDS.Editor.destroy(el)          tear one down
 *   instance.setImageUpload(config) set the image popover's file picker from code
 *   instance.source                 the hidden field that holds the HTML, read-only
 * Events (bubble from the .nds-editor root):
 *   nds:editor:ready   detail {instance} — after init finishes
 * Hooks:
 *   data-editor-toolbar   which commands the generated toolbar carries: space-separated
 *                         tokens, "|" starts a new group, "source" renders at the end,
 *                         "none" opts out. Leave it off for the full default set
 *   data-editor-upload-*  the image popover's file picker, read at init: url (a server
 *                         endpoint, or "embed" for data: URLs), auto-upload, max-file-size,
 *                         allowed-types, allowed-mime-types — setImageUpload() in markup
 * Instance:
 *   setImageUpload(config)   File Upload options for the image popover; chainable
 * Gotchas:
 *   - BETA: the API and the markup contract may still change.
 *   - Author a STANDARD NDS textarea field and put .nds-editor on its container. Nothing
 *     editor-specific is authored — the editing surface and the toolbar are generated.
 *   - The adopted textarea is still the form carrier and holds the sanitized HTML. Read
 *     and write THAT, not the contenteditable, with NDS.setValue(textarea, html)
 *     refills the surface. A form reset refills it too.
 *   - readonly and disabled are derived from the textarea's native attributes.
 *   - Pasted markup is reduced to the formatting vocabulary, but NDS component markup
 *     (nds-* regions) survives with a filtered class and attribute set.
 */
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
 * default set). Labels come from the editor section of the assets/i18n/{lang}.json pack. Pre-init the
 * skeleton in _editor.scss holds the field until the stamp lands.
 *
 * Status: BETA — ships with v1.4.0. Under heavy testing and real-project
 * hardening; API and markup contract may still change.
 *
 * Form carrier: the adopted textarea (clip-hidden post-init — never [hidden],
 * so NDS.Form validation still sees it) holds the sanitized pretty-printed
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
    const allowedTags = new Set(['P', 'BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A', 'IMG', 'H1', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI']);
    // Dropped whole, never unwrapped — unwrapping would leak their TEXT into
    // content (a Word clipboard ships a <style> block whose CSS would become
    // visible text) or keep active/embedded surfaces.
    const dropTags = new Set(['STYLE', 'SCRIPT', 'HEAD', 'META', 'LINK', 'TITLE', 'XML', 'TEMPLATE', 'NOSCRIPT', 'IFRAME', 'FRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH', 'SELECT', 'TEXTAREA', 'INPUT', 'AUDIO', 'VIDEO', 'CANVAS', 'MAP', 'BASE']);
    const inlineTags  = new Set(['BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A']);
    const blockTags   = new Set(['P', 'H1', 'H2', 'H3', 'H4', 'LI']);
    // Alignment values sanitize keeps on generic blocks: the toolbar writes
    // PHYSICAL left/right/center/justify (orthogonal to the dir command);
    // logical start/end are also accepted so already-saved content and
    // bidi-aware pastes round-trip unchanged.
    const alignValues = new Set(['left', 'right', 'center', 'justify', 'start', 'end']);
    // Table columns align per the table canon: data-align on the <th>.
    const columnAlign = new Set(['center', 'start', 'end']);
    const commandBlocks = { h1: 'H1', h2: 'H2', h3: 'H3', h4: 'H4' };
    const DRAG_TYPE = 'application/x-nds-editor';
    // Structural/formatting commands never touch an atom's content — it's a
    // label (+ icon), never a heading, a list, or formatted text. Native
    // execCommand doesn't understand the atom boundary any better here than
    // it does for Enter (_guardRegionEnter) or a document-end split
    // (_placeCaretAtEnd) — block at the source instead of cleaning up after.
    // Alignment/direction are exempt: they write to the CONTAINING block via
    // direct DOM properties, never into the atom itself.
    const atomLockedCommands = new Set(['bold', 'italic', 'underline', 'strike', 'clear', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4']);
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
    const cleanUrl = (url) => url.replace(/^[\u0000-\u0020]+|[\u0000-\u0020]+$/g, '').replace(/[\t\n\r]/g, '');
    // Local fork of the NDS.toSafeUrl name — answers a boolean and keeps a
    // relative URL exactly as authored, where core returns an absolutized
    // href; the doc-example canon above depends on that. Do not swap.
    const isSafeUrl = (url) => URL_SCHEMES.test(url) || !HAS_SCHEME.test(url);
    const isSafeSrc = (url) => SRC_SCHEMES.test(url) || !HAS_SCHEME.test(url);

    // NDS component regions — the editor is NDS-specific, so pasted/typed NDS
    // component markup (buttons, tags, tables, cards, alerts…) is kept, not
    // stripped. An element in ndsTags carrying an nds-* class roots a region;
    // inside it structural tags survive, classes filter to the NDS/HGI
    // vocabulary, and attributes reduce to the styling/a11y set in
    // scrubRegionElement — never style/on*/id, so the trust boundary holds.
    const ndsTags = new Set(['DIV', 'SPAN', 'BUTTON', 'A', 'I', 'P', 'BR', 'HR', 'STRONG', 'EM', 'B', 'U', 'S', 'STRIKE', 'SMALL',
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'TABLE', 'CAPTION', 'THEAD', 'TBODY', 'TFOOT', 'TR', 'TH', 'TD',
        'FIGURE', 'FIGCAPTION', 'BLOCKQUOTE', 'CITE', 'IMG', 'DL', 'DT', 'DD']);
    // Full-token validation, not a prefix test: a whitespace-free token can
    // carry markup (nds-x<img…>), so trust requires the WHOLE token to be
    // word-safe with real content after the prefix (`hgi` alone is the one
    // bare base class) — hostile and empty-prefix tokens both die here.
    const NDS_CLASS = /^(?:nds-[\w-]+|hgi(?:-[\w-]+)?)$/;
    // Region roots that may legitimately sit inline inside a <p>.
    const inlineRegionTags = new Set(['SPAN', 'BUTTON', 'A', 'I']);
    // Content that flows inline at the caret. Everything else is a block: it
    // needs its own line and cannot nest inside a <p>.
    const isInlineNode = (el) =>
        inlineTags.has(el.tagName) || el.tagName === 'IMG' || inlineRegionTags.has(el.tagName);
    // A table interpretMarkup stamped nds-table on is foreign content wearing an
    // NDS class, not markup an author claimed as NDS — so it gets table structure
    // plus the plain vocabulary, never ndsTags' IMG/BUTTON/DIV (which the generic
    // whitelist strips, and which a converted table must not smuggle back in).
    const convertedTags = new Set(['TABLE', 'CAPTION', 'THEAD', 'TBODY', 'TFOOT', 'TR', 'TH', 'TD', ...allowedTags]);

    function hasNdsClass(el) {
        for (const className of el.classList) if (NDS_CLASS.test(className)) return true;
        return false;
    }

    // Atoms are one line: a BUTTON, or an nds-classed SPAN/A/I (tag, chip,
    // featured icon, a converted button/avatar link…) — never a structural
    // shell (card, alert, table), which has block PARTS. Shared by the
    // sanitizer (atoms may carry only their label/icon, never block
    // structure) and the editor's _findLinkableAtom (Enter/Link key on the same
    // boundary) — one definition, not two that can drift apart.
    const isAtomTag = (el) => el.tagName === 'BUTTON' || (inlineRegionTags.has(el.tagName) && hasNdsClass(el));
    // No BR either — atoms never take a line break (see _guardRegionEnter);
    // a stray one smuggled in via paste/source unwraps like anything else.
    const atomTags = new Set(['SPAN', 'I', 'IMG']);

    // The editor's own link stamps aren't component identity — an anchor
    // carrying any OTHER nds class is a component wearing link duty (a
    // converted button/tag/chip/avatar…), which canon styling must not touch.
    const linkStampClasses = new Set(['nds-link', 'nds-primary', 'nds-external']);
    function isComponentAnchor(anchor) {
        for (const className of anchor.classList) if (!linkStampClasses.has(className) && NDS_CLASS.test(className)) return true;
        return false;
    }

    const escapeHtml = NDS.escapeHtml;

    // ---------- Interpret (normal markup → NDS vocabulary) ----------
    // Runs first inside sanitizeHtml: translate foreign dialects into the
    // editor's vocabulary so enforcement keeps meaning instead of junk.
    // Every step skips NDS-classed markup — that's already canon.

    const phrasingTags = new Set(['BR', 'STRONG', 'EM', 'B', 'I', 'U', 'S', 'STRIKE', 'A', 'SPAN', 'IMG', 'CODE', 'SUP', 'SUB', 'SMALL', 'FONT', 'MARK']);
    // figure/figcaption ride along so captioned article images degrade to
    // img + caption paragraph instead of leaking bare caption text.
    const CONTAINER_SELECTOR = 'div, section, article, aside, header, footer, main, center, figure, figcaption';

    function unwrapElement(el) {
        while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
        el.remove();
    }

    function renameElement(el, tag) {
        const next = el.ownerDocument.createElement(tag);
        while (el.firstChild) next.appendChild(el.firstChild);
        el.replaceWith(next);
        return next;
    }

    // renameElement + attribute carry-over minus `drop` — for tag swaps that keep
    // component identity (the button ⇄ anchor link conversion).
    function convertTag(el, tag, drop) {
        const next = renameElement(el, tag);
        for (const { name, value } of el.attributes) {
            if (!drop.includes(name)) next.setAttribute(name, value);
        }
        return next;
    }

    const isInNdsMarkup = (el) => !!el.closest('[class*="nds-"]');

    // Word lists arrive as flat MsoListParagraph <p>s: the bullet/number glyph
    // sits in an mso-list:Ignore marker span, the depth in "mso-list:lN levelN".
    // Rebuild real nested ul/ol — ol when the marker reads as a number/letter.
    // The raw style attribute is regex-read: browsers drop unknown mso-*
    // properties from el.style, so CSSStyleDeclaration can't see them.
    function rebuildWordLists(root) {
        const ownerDocument = root.ownerDocument;
        const readListInfo = (node) => {
            if (!node || node.nodeType !== Node.ELEMENT_NODE || node.tagName !== 'P') return null;
            const match = /mso-list:\s*l\d+\s+level(\d+)/i.exec(node.getAttribute('style') || '');
            if (match) return { level: parseInt(match[1], 10) };
            return /\bMsoListParagraph/.test(node.getAttribute('class') || '') ? { level: 1 } : null;
        };
        const extractMarker = (paragraph) => {
            for (const span of Array.from(paragraph.querySelectorAll('span'))) {
                if (/mso-list:\s*ignore/i.test(span.getAttribute('style') || '')) {
                    const text = span.textContent.replace(/ /g, ' ').trim();
                    span.remove();
                    return text;
                }
            }
            return '';
        };

        for (const start of Array.from(root.querySelectorAll('p'))) {
            if (!start.isConnected || !readListInfo(start)) continue;
            // Consecutive sibling run of list paragraphs = one list.
            const run = [];
            let node = start;
            while (node) {
                const info = readListInfo(node);
                if (!info) break;
                run.push({ p: node, level: info.level });
                let next = node.nextSibling;
                while (next && next.nodeType === Node.TEXT_NODE && !next.textContent.trim()) next = next.nextSibling;
                node = next;
            }

            const stack = []; // open lists, outermost→deepest
            for (const { p: paragraph, level } of run) {
                const marker = extractMarker(paragraph);
                const ordered = /^[0-9٠-٩]/.test(marker) || /^[a-z][.)]/i.test(marker);
                while (stack.length && stack[stack.length - 1].level > level) stack.pop();
                let top = stack[stack.length - 1];
                if (!top || top.level < level) {
                    const list = ownerDocument.createElement(ordered ? 'ol' : 'ul');
                    if (!top) paragraph.parentNode.insertBefore(list, paragraph);
                    else (top.list.lastElementChild || top.list).appendChild(list);
                    top = { list, level };
                    stack.push(top);
                }
                const listItem = ownerDocument.createElement('li');
                while (paragraph.firstChild) listItem.appendChild(paragraph.firstChild);
                top.list.appendChild(listItem);
                paragraph.remove();
            }
        }
    }

    function interpretMarkup(root) {
        // Google Docs wraps the whole clipboard in a fake-bold <b> — unwrap it
        // before the generic pass reads <b> as real bold (everything-bold bug).
        for (const bold of Array.from(root.querySelectorAll('b'))) {
            if (bold.style.fontWeight === 'normal' || /^docs-internal-guid/.test(bold.id)) unwrapElement(bold);
        }

        // Word list paragraphs → real nested ul/ol (marker spans removed
        // before the style→tag pass sees them).
        rebuildWordLists(root);

        // Inline-style formatting → semantic tags. Google Docs (and Word spans)
        // mark bold/italic/underline as styles; plain attr-stripping would
        // silently drop the formatting. Wrap the element's children, then let
        // enforcement strip the carrier element/attribute as usual.
        for (const el of Array.from(root.querySelectorAll('[style]'))) {
            if (isInNdsMarkup(el)) continue;
            const style = el.style;
            const decoration = `${style.textDecoration} ${style.textDecorationLine}`;
            const wraps = [];
            if (style.fontWeight === 'bold' || style.fontWeight === 'bolder' || parseInt(style.fontWeight, 10) >= 600) wraps.push('strong');
            if (style.fontStyle === 'italic' || style.fontStyle === 'oblique') wraps.push('em');
            if (decoration.includes('underline')) wraps.push('u');
            if (decoration.includes('line-through')) wraps.push('s');
            let host = el;
            for (const tag of wraps) {
                const wrapper = el.ownerDocument.createElement(tag);
                while (host.firstChild) wrapper.appendChild(host.firstChild);
                host.appendChild(wrapper);
                host = wrapper;
            }
        }

        // Canonical inline vocabulary: b→strong, i→em, strike→s.
        // NDS-classed <i> is the icon element — skipped via isInNdsMarkup.
        for (const el of Array.from(root.querySelectorAll('b, i, strike'))) {
            if (isInNdsMarkup(el)) continue;
            renameElement(el, { B: 'strong', I: 'em', STRIKE: 's' }[el.tagName]);
        }

        // Block containers are the paragraph unit in Word/web content —
        // phrasing-only ones become <p> (children-first via reverse doc order)
        // so adjacent paragraphs don't merge into one blob when the container
        // is stripped; mixed ones unwrap generically and their block children
        // stand on their own.
        for (const el of Array.from(root.querySelectorAll(CONTAINER_SELECTOR)).reverse()) {
            if (isInNdsMarkup(el)) continue;
            let phrasingOnly = true;
            for (const child of el.children) {
                if (!phrasingTags.has(child.tagName)) { phrasingOnly = false; break; }
            }
            if (phrasingOnly && (el.children.length || el.textContent.trim())) renameElement(el, 'p');
        }

        // Google Docs wraps every li/cell's text in a <p> — unwrap to match
        // NDS canon (bare text in li/td). Consecutive paragraphs keep a <br>
        // boundary. Runs BEFORE table stamping so freshly-converted tables
        // are covered; authored NDS markup is skipped as usual.
        for (const paragraph of Array.from(root.querySelectorAll('li > p, td > p, th > p'))) {
            if (isInNdsMarkup(paragraph)) continue;
            if (paragraph.nextElementSibling && paragraph.nextElementSibling.tagName === 'P') {
                paragraph.parentNode.insertBefore(paragraph.ownerDocument.createElement('br'), paragraph.nextSibling);
            }
            unwrapElement(paragraph);
        }

        // Plain tables become NDS tables — the flagship convert. The class
        // makes them an NDS region, so their structure survives enforcement.
        // Returned so Pass A can hold them to convertedTags.
        const converted = new Set();
        for (const table of root.querySelectorAll('table')) {
            if (!hasNdsClass(table)) { table.classList.add('nds-table'); converted.add(table); }
        }
        return converted;
    }

    // ---------- Sanitizer (the trust boundary — all content routes through here) ----------

    // Walk up probing the Set — scanning every trusted root and calling
    // contains() per element is O(n × trusted) on the per-keystroke path.
    function isInTrusted(el, trusted) {
        for (let node = el; node; node = node.parentElement) if (trusted.has(node)) return true;
        return false;
    }

    function sanitizeNode(node, allowed, trusted) {
        for (const child of Array.from(node.childNodes)) {
            if (trusted && trusted.has(child)) continue;
            if (child.nodeType === Node.TEXT_NODE) continue;
            if (child.nodeType !== Node.ELEMENT_NODE) { child.remove(); continue; }
            // toUpperCase: SVG/MathML elements report lowercase tagName.
            if (dropTags.has(child.tagName.toUpperCase())) { child.remove(); continue; }
            // Recurse first so nested disallowed tags resolve in one pass.
            sanitizeNode(child, allowed, trusted);
            if (!allowed.has(child.tagName)) unwrapElement(child);
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
            const noExternal = isAnchor && el.hasAttribute('data-no-external');
            const src = isImg ? cleanUrl(el.getAttribute('src') || '') : null;
            const alt = isImg ? el.getAttribute('alt') : null;
            // Numeric width/height survive — the popover writes them, and
            // pasted content keeps its ratios (aspect + CLS).
            const dimensions = isImg
                ? ['width', 'height'].map(dimension => [dimension, el.getAttribute(dimension)]).filter(([, size]) => /^\d+$/.test(size || ''))
                : [];
            // Legacy Word markup carries align="center" as an attribute.
            const align = blockTags.has(el.tagName)
                ? (el.style.textAlign || el.getAttribute('align') || '').toLowerCase() : '';
            // Absolute text direction (toolbar dir command; pasted bidi
            // content) survives on blocks — the browser owns the flip.
            const dir = blockTags.has(el.tagName)
                ? (el.getAttribute('dir') || '').toLowerCase() : '';
            for (const attribute of Array.from(el.attributes)) el.removeAttribute(attribute.name);
            if (alignValues.has(align)) el.style.textAlign = align;
            if (dir === 'ltr' || dir === 'rtl') el.setAttribute('dir', dir);
            if (isAnchor) {
                if (href && isSafeUrl(href)) {
                    el.setAttribute('href', href);
                    if (external) el.setAttribute('target', '_blank');
                    el.setAttribute('rel', 'noopener noreferrer');
                    // Author badge opt-out (NDS.Link honors it) survives.
                    if (noExternal) el.setAttribute('data-no-external', '');
                } else {
                    unwrapElement(el);
                }
            }
            if (isImg) {
                if (src && isSafeSrc(src)) {
                    el.setAttribute('src', src);
                    if (alt != null) el.setAttribute('alt', alt);
                    for (const [dimension, size] of dimensions) el.setAttribute(dimension, size);
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
        for (const paragraph of Array.from(root.querySelectorAll('p'))) {
            if (!paragraph.parentNode || (trusted && isInTrusted(paragraph, trusted))) continue;
            let bad = false;
            for (const child of paragraph.children) {
                const inlineOk = inlineTags.has(child.tagName) || child.tagName === 'IMG'
                    || (trusted && trusted.has(child) && inlineRegionTags.has(child.tagName));
                if (!inlineOk) { bad = true; break; }
            }
            if (bad) unwrapElement(paragraph);
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
        const classes = (el.getAttribute('class') || '').split(/\s+/).filter(className => NDS_CLASS.test(className));
        const href = tag === 'A' ? cleanUrl(el.getAttribute('href') || '') : null;
        const external = tag === 'A' && el.getAttribute('target') === '_blank';
        const src = tag === 'IMG' ? cleanUrl(el.getAttribute('src') || '') : null;
        const knobs = [];
        for (let i = 0; i < el.style.length; i++) {
            const property = el.style.item(i);
            if (property.startsWith('--')) knobs.push([property, el.style.getPropertyValue(property)]);
        }
        const kept = [];
        for (const attribute of Array.from(el.attributes)) {
            const attributeName = attribute.name;
            // data-no-external rides with any region element — NDS.Link's
            // closest() honors it on containers, not just anchors.
            if (/^aria-/i.test(attributeName) || attributeName === 'role' || attributeName === 'data-status' || attributeName === 'data-state' || attributeName === 'data-no-external'
                || (tag === 'IMG' && (attributeName === 'alt' || ((attributeName === 'width' || attributeName === 'height') && /^\d+$/.test(attribute.value))))
                || ((tag === 'TD' || tag === 'TH') && (attributeName === 'colspan' || attributeName === 'rowspan' || attributeName === 'scope'))
                || (tag === 'TH' && attributeName === 'data-align' && columnAlign.has(attribute.value))) {
                kept.push([attributeName, attribute.value]);
            }
            el.removeAttribute(attributeName);
        }
        for (const [attributeName, attributeValue] of kept) el.setAttribute(attributeName, attributeValue);
        for (const [property, propertyValue] of knobs) el.style.setProperty(property, propertyValue);
        if (classes.length) el.setAttribute('class', classes.join(' '));
        if (tag === 'A' && href && isSafeUrl(href)) {
            el.setAttribute('href', href);
            if (external) el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        }
        // A pasted default-type (submit) button would submit the host form.
        if (tag === 'BUTTON') el.setAttribute('type', 'button');
        if (tag === 'IMG') {
            if (src && isSafeSrc(src)) el.setAttribute('src', src);
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
            if (el.tagName === 'SPAN' && !el.attributes.length) unwrapElement(el);
        }
        return true;
    }

    function sanitizeHtml(dirty) {
        // Parse bare into <body>: wrapping in a root element lets a stray </div>
        // close it early and strand the tail outside what we serialize back.
        const parsedDocument = new DOMParser().parseFromString(dirty, 'text/html');
        const root = parsedDocument.body;

        const converted = interpretMarkup(root);

        const trusted = new Set(); // JS refs — unspoofable by input markup

        // Pass A — NDS component regions survive with their structure.
        // Pre-order doc order: only the most recently accepted region can contain a later match.
        let lastRegion = null;
        for (const el of Array.from(root.querySelectorAll('[class*="nds-"]'))) {
            if (!el.isConnected) continue; // removed inside an earlier region
            if (lastRegion && lastRegion.contains(el)) continue; // top-most roots only
            if (!ndsTags.has(el.tagName) || !hasNdsClass(el)) continue;
            const allowed = converted.has(el) ? convertedTags : isAtomTag(el) ? atomTags : ndsTags;
            if (sanitizeRegion(el, allowed)) { trusted.add(el); lastRegion = el; }
        }

        // Pass B — generic whitelist outside trusted subtrees.
        sanitizeNode(root, allowedTags, trusted);
        stripAttributes(root, trusted);
        flattenBadPWrappers(root, trusted);

        // Whitespace-only text between table structure elements is legal to
        // the parser but Chrome's editing-mode insertHTML fosters it OUT of
        // the table as junk paragraphs — strip it at the source.
        for (const el of root.querySelectorAll('table, thead, tbody, tfoot, tr')) {
            for (const node of Array.from(el.childNodes)) {
                if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) node.remove();
            }
        }
        // Same story for whitespace between top-level blocks; spacing that
        // separates inline runs is kept.
        for (const node of Array.from(root.childNodes)) {
            if (node.nodeType !== Node.TEXT_NODE || node.textContent.trim()) continue;
            const isBlock = (sibling) => !sibling || (sibling.nodeType === Node.ELEMENT_NODE && !inlineTags.has(sibling.tagName));
            if (isBlock(node.previousSibling) && isBlock(node.nextSibling)) node.remove();
        }
        // Dead-empty paragraphs (no children, no text — editing-split debris)
        // carry nothing. Intentional blank lines (<p><br></p>) are kept —
        // and so are emptied COMPONENT parts (an alert description cleared by
        // editing must survive the value round-trip, not vanish from the shell).
        for (const pEl of Array.from(root.querySelectorAll('p'))) {
            if (trusted.size && isInTrusted(pEl, trusted)) continue;
            if (!pEl.firstElementChild && !pEl.textContent.trim()) pEl.remove();
        }
        // Collapse whitespace runs inside text-bearing blocks and trim the
        // block's leading/trailing text edges — pasted markup often carries
        // source-formatting newlines (`<p>\n  text\n</p>`) that render fine
        // in the browser but survive verbatim through the pretty printer,
        // bloating the source-view and stored form value.
        for (const el of root.querySelectorAll('p, h1, h2, h3, h4, li')) {
            if (trusted.size && isInTrusted(el, trusted)) continue;
            for (const node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) node.textContent = node.textContent.replace(/\s+/g, ' ');
            }
            const first = el.firstChild;
            if (first?.nodeType === Node.TEXT_NODE) first.textContent = first.textContent.replace(/^ /, '');
            const last = el.lastChild;
            if (last?.nodeType === Node.TEXT_NODE) last.textContent = last.textContent.replace(/ $/, '');
        }
        return root.innerHTML;
    }

    // ---------- Pretty printer (source view / form value) ----------

    function formatHtml(html) {
        const parsedDocument = new DOMParser().parseFromString(`<div id="r">${html}</div>`, 'text/html');
        return formatNode(parsedDocument.getElementById('r'), 0).replace(/\n+$/, '');
    }

    function openTag(el) {
        let text = el.tagName.toLowerCase();
        for (const attribute of el.attributes) text += ` ${attribute.name}="${escapeHtml(attribute.value)}"`;
        return text;
    }

    // Structural container = only element children, at least one non-inline —
    // renders indented multi-line; text-bearing elements render on one line.
    function isContainer(el) {
        if (!el.firstElementChild) return false;
        for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return false;
        }
        for (const child of el.children) {
            if (!inlineTags.has(child.tagName)) return true;
        }
        return false;
    }

    // formatNode's indentation: whitespace-only text carrying a newline.
    const isIndentNode = (node) => node.nodeType === Node.TEXT_NODE && node.textContent.includes('\n') && !node.textContent.trim();
    // Child index counted without indentation nodes, and its inverse.
    function getRealIndex(parent, index) {
        let count = 0;
        for (let i = 0; i < index && i < parent.childNodes.length; i++) if (!isIndentNode(parent.childNodes[i])) count++;
        return count;
    }
    function findRealChild(parent, remaining) {
        for (const child of parent.childNodes) {
            if (isIndentNode(child)) continue;
            if (remaining-- === 0) return child;
        }
        return null;
    }

    // A cell's column header: the last thead row carries the column's
    // data-align. Positional, like nds-table.js — a colspan shifts it.
    function findColumnHead(cell) {
        const rows = cell.closest('table')?.tHead?.rows;
        return rows?.length ? rows[rows.length - 1].cells[cell.cellIndex] || null : null;
    }
    // A header's logical data-align as the toolbar's physical value.
    function getPhysicalAlign(th) {
        const align = th.getAttribute('data-align');
        if (align === 'center') return 'center';
        if (align !== 'start' && align !== 'end') return '';
        return (align === 'start') !== (getComputedStyle(th).direction === 'rtl') ? 'left' : 'right';
    }

    const voidTags = new Set(['BR', 'HR', 'IMG', 'WBR']);
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
                const text = child.textContent.replace(/\s+/g, ' ').trim();
                if (text) out += pad + escapeHtml(text) + '\n';
                continue;
            }
            if (child.nodeType !== Node.ELEMENT_NODE) continue;
            const tag = child.tagName.toLowerCase();
            // Void elements get no closing tag — `<br></br>` would re-parse as
            // TWO brs (the parser treats a stray </br> as another <br>) and
            // duplicate on every source round-trip.
            if (voidTags.has(child.tagName)) {
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

    // The editable and toolbar aren't native form controls, so the field's
    // disabled/readonly effects don't reach them.
    ['disabled', 'readonly'].forEach(token =>
        NDS.state.onToggle(token, '.nds-editor', el => el.ndsEditor?._syncAccessState()));

    // ---------- Toolbar generation ----------

    const TOOLBAR_DEFAULT = 'undo redo | bold italic underline strike clear | link image | h2 h3 h4 | align-left align-center align-right align-justify | dir-ltr dir-rtl | ul ol | remove | source';
    const toolbarCommands = {
        undo:      { icon: 'arrow-turn-backward' },
        redo:      { icon: 'arrow-turn-forward' },
        bold:      { icon: 'text-bold',                 toggle: true },
        italic:    { icon: 'text-italic',               toggle: true },
        underline: { icon: 'text-underline',            toggle: true },
        strike:    { icon: 'text-strikethrough',        toggle: true },
        clear:     { icon: 'text-clear' },
        link:      { icon: 'link-01',                   toggle: true },
        image:     { icon: 'image-add-01',              toggle: true },
        // h1 is deliberately OUT of the default set (the page owns its h1) —
        // available via data-editor-toolbar for full-page authoring fields.
        h1:        { icon: 'heading-01',                toggle: true },
        h2:        { icon: 'heading-02',                toggle: true },
        h3:        { icon: 'heading-03',                toggle: true },
        h4:        { icon: 'heading-04',                toggle: true },
        ul:        { icon: 'left-to-right-list-bullet', toggle: true },
        ol:        { icon: 'left-to-right-list-number', toggle: true },
        // Alignment is PHYSICAL (left/right) — absolute icons, never flip;
        // orthogonal to the dir command. Re-clicking the active one clears it
        // back to natural (direction-following).
        'align-left':    { icon: 'text-align-left',                                    toggle: true },
        'align-center':  { icon: 'text-align-center',                                  toggle: true },
        'align-right':   { icon: 'text-align-right',                                   toggle: true },
        'align-justify': { icon: 'text-align-justify-center',                          toggle: true },
        // Direction is ABSOLUTE (ltr/rtl) — icons never flip; each writes the
        // native `dir` on the caret's block(s), toggling off clears it back
        // to the editor's inherited direction.
        // Direction buttons use the inline pilcrow glyphs (mask-based, not in
        // the HGI font): pilcrow-right = LTR, pilcrow-left = RTL.
        'dir-ltr':       { icon: 'pilcrow-right', inlineIcon: true,                    toggle: true },
        'dir-rtl':       { icon: 'pilcrow-left', inlineIcon: true,                     toggle: true },
        // Caret-gated: enabled only while the caret sits inside a pasted
        // component — the explicit removal path the shell guards point to.
        remove:    { icon: 'delete-02' },
    };
    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('editor', {
        undo: 'Undo',
        redo: 'Redo',
        clear: 'Clear formatting',
        remove: 'Remove component',
        bold: 'Bold',
        italic: 'Italic',
        underline: 'Underline',
        strike: 'Strikethrough',
        link: 'Insert link',
        image: 'Insert image',
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3',
        h4: 'Heading 4',
        ul: 'Bulleted list',
        ol: 'Numbered list',
        'align-left': 'Align left',
        'align-center': 'Align center',
        'align-right': 'Align right',
        'align-justify': 'Justify',
        'dir-ltr': 'Left to right',
        'dir-rtl': 'Right to left',
        source: 'View HTML source',
        url: 'URL',
        text: 'Text',
        external: 'Open in new tab',
        colored: 'Colored link',
        no_badge: 'Hide external badge',
        from_link: 'From link',
        or: 'OR',
        attrs: 'Attributes',
        invalid_image_url: 'Enter a valid image URL',
        invalid_url: 'Enter a valid URL',
        upload_pending: 'Wait for the upload to finish',
        upload_failed: 'The file was not uploaded. Choose another file or enter a link',
        paste_blocked: 'Pasting images is not available — use the image dialog',
        paste_clips_shell: 'Selection crosses a component — adjust it before pasting',
        alt: 'Alt text',
        width: 'Width (px)',
        height: 'Height (px)',
        upload: 'Upload image',
        cancel: 'Cancel',
        insert: 'Insert',
        unlink: 'Unlink',
        remove_prompt: 'Remove the component:',
    });
    // Escaped: the pack is site-editable, and these land in innerHTML.
    const html = (key) => NDS.escapeHtml(strings.text(key));


    let uid = 0; // minted label ids for adopted fields whose textarea has no id

    // Every command button doubles as a declarative NDS tooltip (the button's
    // own content is the trigger; nds-tooltip.js generates the balloon).
    function buildCommandButton(command, extraClass = '') {
        const definition = toolbarCommands[command];
        const label = html(command);
        const icon = definition.icon;
        // inlineIcon: paint from the mask-based UI-icon sheet (.nds-icon) rather
        // than the HGI font — for glyphs not (yet) in the font, e.g. pilcrow.
        const iconHtml = definition.inlineIcon
            ? `<i class="nds-icon nds-${icon}" aria-hidden="true"></i>`
            : `<i class="hgi hgi-stroke hgi-${icon}" aria-hidden="true"></i>`;
        return `<button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-tooltip${extraClass}" data-cmd="${command}"${definition.toggle ? ' aria-pressed="false"' : ''} aria-label="${label}" data-tooltip-message="${label}" data-tooltip-hover="500">${iconHtml}</button>`;
    }

    function buildTextField(id, labelText, type, dataAttribute, placeholder, extraClass = '') {
        return `<div class="nds-form-container nds-input${extraClass}"><div class="nds-form-header"><label for="${id}"><span class="nds-label">${labelText}</span></label></div>`
            + `<div class="nds-form-control"><input type="${type}" id="${id}" class="nds-input"${placeholder ? ` placeholder="${placeholder}"` : ''} autocomplete="off" ${dataAttribute} /></div>`
            + '<div class="nds-form-footer" data-feedback-target hidden></div></div>';
    }

    function buildLinkDropmenu(idBase) {
        return `<div class="nds-dropmenu" data-editor-link-dropmenu>${buildCommandButton('link', ' nds-dropmenu-trigger')}`
            + '<div class="nds-dropmenu-menu nds-editor-link-menu" hidden><div class="nds-dropmenu-scroll">'
            + '<div class="nds-dropmenu-group nds-form-group">'
            + buildTextField(`${idBase}-link-text`, html('text'), 'text', 'data-editor-link-text')
            + buildTextField(`${idBase}-link-url`, html('url'), 'url', 'data-editor-link-url', 'https://')
            + `<div class="nds-form-container nds-checkbox"><div class="nds-form-header"><label for="${idBase}-link-external"><span class="nds-label">${html('external')}</span></label></div>`
            + `<div class="nds-form-control"><input type="checkbox" id="${idBase}-link-external" class="nds-checkbox-input" data-editor-link-external /></div></div>`
            + `<div class="nds-form-container nds-checkbox"><div class="nds-form-header"><label for="${idBase}-link-noexternal"><span class="nds-label">${html('no_badge')}</span></label></div>`
            + `<div class="nds-form-control"><input type="checkbox" id="${idBase}-link-noexternal" class="nds-checkbox-input" data-editor-link-noexternal /></div></div>`
            + `<div class="nds-form-container nds-checkbox"><div class="nds-form-header"><label for="${idBase}-link-colored"><span class="nds-label">${html('colored')}</span></label></div>`
            + `<div class="nds-form-control"><input type="checkbox" id="${idBase}-link-colored" class="nds-checkbox-input" data-editor-link-colored /></div></div>`
            + '</div></div>'
            + '<div class="nds-dropmenu-footer"><hr class="nds-divider"><div class="nds-dropmenu-action">'
            + `<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-editor-link-cancel><span class="nds-label">${html('cancel')}</span></button>`
            + `<button type="button" class="nds-btn nds-destructive nds-secondary-outline nds-dropmenu-item" data-editor-link-unlink hidden><span class="nds-label">${html('unlink')}</span></button>`
            + `<button type="button" class="nds-btn nds-primary nds-dropmenu-item" data-editor-link-confirm data-dropmenu-primary data-no-auto-close><span class="nds-label">${html('insert')}</span></button>`
            + '</div></div></div></div>';
    }

    // Image popover: direct URL or a local file — the chosen file lands in
    // the URL field as a data:image URL, so Insert is the one commit path.
    function buildImageDropmenu(idBase) {
        return `<div class="nds-dropmenu" data-editor-image-dropmenu>${buildCommandButton('image', ' nds-dropmenu-trigger')}`
            + '<div class="nds-dropmenu-menu nds-editor-image-menu" hidden><div class="nds-dropmenu-scroll">'
            + '<div class="nds-dropmenu-group nds-form-group nds-editor-image-form">'
            + buildTextField(`${idBase}-image-url`, html('from_link'), 'url', 'data-editor-image-url', 'https://')
            + `<div class="nds-divider" data-editor-image-or>${html('or')}</div>`
            // Canonical single-file nds-upload (no dropzone) — NDS.Upload owns
            // picking, extension enforcement, and the file chip; the editor
            // only listens for nds:upload:select.
            + '<div class="nds-form-container nds-upload" data-state="single" data-allowed-types="jpg,jpeg,png,gif,webp,svg" data-max-file-size="2097152" data-editor-image-upload>'
            + '<div class="nds-form-control nds-center">'
            + `<input type="file" id="${idBase}-image-file" class="nds-file-input" data-editor-image-file />`
            + `<div class="nds-form-action"><button type="button" class="nds-btn nds-neutral nds-md nds-browse-btn"><i class="hgi hgi-stroke hgi-folder-01"></i><span class="nds-label">${html('upload')}</span></button></div>`
            + '</div>'
            + '<div class="nds-file-list"></div>'
            + '</div>'
            + `<div class="nds-divider">${html('attrs')}</div>`
            + buildTextField(`${idBase}-image-alt`, html('alt'), 'text', 'data-editor-image-alt', '', ' nds-md')
            + '<div class="nds-form-group nds-row">'
            + buildTextField(`${idBase}-image-width`, html('width'), 'text', 'inputmode="numeric" data-editor-image-width', 'auto', ' nds-md')
            + buildTextField(`${idBase}-image-height`, html('height'), 'text', 'inputmode="numeric" data-editor-image-height', 'auto', ' nds-md')
            + '</div>'
            + '</div></div>'
            + '<div class="nds-dropmenu-footer"><hr class="nds-divider"><div class="nds-dropmenu-action">'
            + `<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-editor-image-cancel><span class="nds-label">${html('cancel')}</span></button>`
            + `<button type="button" class="nds-btn nds-primary nds-dropmenu-item" data-editor-image-confirm data-dropmenu-primary data-no-auto-close><span class="nds-label">${html('insert')}</span></button>`
            + '</div></div></div></div>';
    }

    // Shared vocabulary atoms — never independent components in the remove
    // picker (extend if a new atom class enters the paste vocabulary).
    const ndsAtomClasses = new Set(['nds-label', 'nds-icon', 'nds-divider']);

    // The component name a shell shows in the remove picker — its first
    // nds class that isn't a generic atom.
    const getComponentName = (el) =>
        Array.from(el.classList).find(className => /^nds-[\w-]+$/.test(className) && !ndsAtomClasses.has(className)) || 'NDS';

    // Destructive with confirmation — the trigger opens a confirm popover
    // whose rows are filled per caret position (one destructive row per
    // removable level: nested components, then the shell).
    function removeDropmenuHtml() {
        return `<div class="nds-dropmenu" data-editor-remove-dropmenu>${buildCommandButton('remove', ' nds-dropmenu-trigger nds-destructive')}`
            + '<div class="nds-dropmenu-menu nds-editor-remove-menu" hidden><div class="nds-dropmenu-scroll">'
            + `<div class="nds-dropmenu-group"><span class="nds-label">${html('remove_prompt')}</span></div>`
            + '<div data-editor-remove-levels></div>'
            + '</div>'
            + '<div class="nds-dropmenu-footer"><hr class="nds-divider"><div class="nds-dropmenu-action">'
            + `<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-editor-remove-cancel><span class="nds-label">${html('cancel')}</span></button>`
            + '</div></div></div></div>';
    }

    function buildToolbarHtml(spec, idBase) {
        let start = '', end = '';
        for (const group of spec.split('|')) {
            let cluster = '';
            const flush = () => { if (cluster) { start += `<div class="nds-btn-group">${cluster}</div>`; cluster = ''; } };
            for (const command of group.trim().split(/\s+/).filter(Boolean)) {
                if (command === 'source') {
                    const label = html('source');
                    end = `<button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-tooltip" data-source-toggle aria-pressed="false" aria-label="${label}" data-tooltip-message="${label}" data-tooltip-hover="500"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>`;
                } else if (command === 'link') {
                    flush(); // the dropmenu wrapper sits outside any button group
                    start += buildLinkDropmenu(idBase);
                } else if (command === 'image') {
                    flush();
                    start += buildImageDropmenu(idBase);
                } else if (command === 'remove') {
                    flush();
                    start += removeDropmenuHtml();
                } else if (toolbarCommands[command]) {
                    cluster += buildCommandButton(command);
                } else {
                    console.warn(`NDS Editor: unknown toolbar command "${command}"`);
                }
            }
            flush();
        }
        if (!start && !end) return '';
        return `<div class="nds-toolbar">${start ? `<div class="nds-toolbar-start">${start}</div>` : ''}${end ? `<div class="nds-toolbar-end">${end}</div>` : ''}</div>`;
    }

    // ---------- Editor ----------

    class NdsEditor {
        constructor(root) {
            this._root = root;
            // Success signal — init() only runs (and registers root.ndsEditor) when construction succeeds.
            this._valid = false;
            if (root.hasAttribute('data-nds-editor-initialized')) return;

            this.source = root.querySelector('.nds-form-control textarea');
            if (!this.source) {
                console.warn('NDS Editor: no textarea to adopt', root);
                return;
            }

            this._editable = this._buildEditable();
            this._toolbar = this._buildToolbar(); // null when data-editor-toolbar="none"
            this._buttons = this._toolbar ? Array.from(this._toolbar.querySelectorAll('[data-cmd]')) : [];
            this.abortController = new AbortController();
            this._rafId = 0;
            this._savedRange = null;
            this._focusWithin = false;
            // Editor-owned undo history ({v, caret} value snapshots). The
            // native stack is unusable here: structural DOM ops (component
            // removal, popover edits) corrupt its replay, so ALL undo/redo
            // routes through _stepHistory for uniform coverage.
            this._history = [];
            this._historyIndex = -1;
            this._histLast = 0;
            this._histSuspend = false;
            this._valid = true;
            this.init();
        }

        init() {
            this._root.setAttribute('data-nds-editor-initialized', 'true');
            this._root.ndsEditor = this;
            const { signal } = this.abortController;

            // ponytail: <p> as new-block separator — native Enter gives clean <p> per paragraph.
            try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* older UAs */ }

            this._hydrate();
            // A script write (NDS.setValue) and a form reset refill the surface.
            // The editor's own leave-change carries the value it wrote, so it skips the refill (and keeps undo).
            const reload = () => {
                if (this.source.value === this._synced) return;
                this._hydrate(); this._syncToolbarState();
            };
            this.source.addEventListener('change', reload, { signal });
            // The browser restores the textarea's default value only after the reset event.
            NDS.field.onReset(this.source.form, reload, { signal });

            this._addToolbarListeners(signal);
            this._addEditableListeners(signal);
            this._addFieldStateListeners(signal);
            // Popover wiring — each menu's listeners sit with the rest of its
            // own _prep/_confirm/_cancel triad rather than inline here.
            this._addPopoverFieldListeners(signal);
            this._addLinkMenuListeners(signal);
            this._addImageMenuListeners(signal);
            this._addRemoveMenuListeners(signal);
            this._readUploadAttributes();

            // Server-shipped data-state="disabled|readonly" applies at init;
            // later toggles arrive through the NDS.state hooks above.
            this._syncAccessState();
            // Settle caret-gated button states (remove starts disabled) and
            // the image upload affordance (URL-only unless embed/endpoint).
            this._syncToolbarState();
            this._syncImageUploadVisibility();

            this._root.dispatchEvent(new CustomEvent('nds:editor:ready', { detail: { instance: this }, bubbles: true }));
        }

        // Fill the surface from the adopted textarea (server-filled or empty) and
        // start the history there.
        _hydrate() {
            this._history = [];
            this._historyIndex = -1;
            this._editable.innerHTML = sanitizeHtml(this.source.value) || '<p><br></p>';
            this._normalizeLooseBlocks();
            this._syncLinks();
            this._syncColumnAlign();
            this._syncSource();
            // Seed the history base — the value stays reachable even when
            // hydration didn't change it (sync early-returned).
            if (this._historyIndex < 0) this._pushHistory(false);
        }

        // preventDefault on mousedown keeps the editable's selection when a
        // toolbar button is clicked. The link command preps here too —
        // NDS.Dropmenu's trigger click stopPropagations, so the toolbar click
        // delegate below never fires for it.
        _addToolbarListeners(signal) {
            if (!this._toolbar) return;
            this._toolbar.addEventListener('mousedown', (e) => {
                const commandButton = e.target.closest('[data-cmd]');
                if (!commandButton) return;
                e.preventDefault();
                if (commandButton.dataset.cmd === 'link') this._prepareLinkMenu();
                else if (commandButton.dataset.cmd === 'image') this._prepareImageMenu();
                else if (commandButton.dataset.cmd === 'remove') this._prepareRemoveMenu();
            }, { signal });

            // Keyboard activation opens the popovers without a mousedown —
            // prep on the trigger's keydown so the content is never stale.
            this._toolbar.querySelectorAll('[data-cmd="link"], [data-cmd="image"], [data-cmd="remove"]').forEach(btn => {
                btn.addEventListener('keydown', (e) => {
                    if (e.key !== 'Enter' && e.key !== ' ') return;
                    if (btn.dataset.cmd === 'link') this._prepareLinkMenu();
                    else if (btn.dataset.cmd === 'image') this._prepareImageMenu();
                    else this._prepareRemoveMenu();
                }, { signal });
            });

            this._toolbar.addEventListener('click', this._handleToolbarClick.bind(this), { signal });
        }

        _addEditableListeners(signal) {
            this._editable.addEventListener('input', this._handleInput.bind(this), { signal });
            // Route native history gestures (context-menu undo) into the
            // editor history; where the event isn't cancelable the mutation
            // lands and the following input syncs it as a fresh entry.
            this._editable.addEventListener('beforeinput', (e) => {
                if (e.inputType !== 'historyUndo' && e.inputType !== 'historyRedo') return;
                e.preventDefault();
                this._stepHistory(e.inputType === 'historyUndo' ? -1 : 1);
            }, { signal });
            this._editable.addEventListener('paste', this._handlePaste.bind(this), { signal });
            // A drag from an NDS editor carries markup an editor already cleaned: it moves natively.
            this._editable.addEventListener('dragstart', (e) => e.dataTransfer?.setData(DRAG_TYPE, '1'), { signal });
            this._editable.addEventListener('drop', this._handleDrop.bind(this), { signal });
            this._editable.addEventListener('cut', this._handleCut.bind(this), { signal });
            this._editable.addEventListener('keydown', this._handleKeyDown.bind(this), { signal });
            document.addEventListener('selectionchange', this._scheduleToolbarSync.bind(this), { signal });

            // Chrome only places the caret BESIDE a clicked image — select it
            // whole instead: the selection shape the image popover
            // (edit-in-place), the link popover (wrap in <a>), the remove
            // gate, and plain Backspace all key on. Clicks inside a TEXTLESS
            // atom (featured icon, icon-only button) select the atom whole
            // for the same reason: no caret position inside is worth having —
            // typing or Enter there only breaks the component.
            this._editable.addEventListener('click', (e) => {
                let target = e.target.tagName === 'IMG' ? e.target : null;
                if (!target) {
                    let atom = null;
                    for (let el = e.target; el && el !== this._editable; el = el.parentElement) {
                        if (isAtomTag(el)) atom = el;
                    }
                    if (atom && !atom.textContent.trim()) target = atom;
                }
                if (!target) return;
                const range = document.createRange();
                range.selectNode(target);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }, { signal });

            // Click-to-escape: clicks on the editor's empty space below the
            // content yield a fresh line at the end (reusing a trailing empty
            // paragraph — clicks don't stack them).
            this._editable.addEventListener('click', (e) => {
                if (e.target !== this._editable) return;
                const last = this._editable.lastElementChild;
                if (!last || e.clientY > last.getBoundingClientRect().bottom) this._placeCaretAtEnd();
            }, { signal });
        }

        // Mirror NDS.Form interactive states on the container — forms only
        // delegates to input/textarea/select, so the contenteditable is
        // skipped. Tracked for the whole editor (focusin on the root, focusout below): the source
        // textarea and the link popover's URL input are separate focus
        // targets inside the editor, so an editable-only focus/blur pair
        // drops the field's focus state (and fires a premature change
        // event) the moment the user moves to one of them.
        _addFieldStateListeners(signal) {
            this._root.addEventListener('focusin', () => {
                if (this._focusWithin) return;
                this._focusWithin = true;
                NDS.state.add(this._root, 'focus');
                this._valueAtFocus = this.source.value;
            }, { signal });
            document.addEventListener('focusout', (e) => {
                if (!this._focusWithin || e.target.closest?.('.nds-editor') !== this._root) return;
                if (e.relatedTarget?.closest('.nds-editor') === this._root) return; // moving within the editor
                this._focusWithin = false;
                NDS.state.remove(this._root, 'focus');
                NDS.state.remove(this._root, 'typing');
                if (this.source.value !== this._valueAtFocus) {
                    this.source.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, { signal });
            this._editable.addEventListener('keydown',    () => NDS.state.add(this._root, 'typing'), { signal });
            this._editable.addEventListener('paste',      () => NDS.state.add(this._root, 'typing'), { signal });
            this._editable.addEventListener('mousedown',  () => NDS.state.add(this._root, 'active'), { signal });
            this._editable.addEventListener('mouseup',    () => NDS.state.remove(this._root, 'active'), { signal });
            this._editable.addEventListener('mouseleave', () => NDS.state.remove(this._root, 'active'), { signal });

            // Forms' invalid-focus and label clicks land on the clipped textarea — redirect.
            this.source.addEventListener('focus', () => {
                if (!this._root.classList.contains('is-source')) this._editable.focus();
            }, { signal });
            this.source.addEventListener('keydown', this._handleSourceKeyDown.bind(this), { signal });
        }

        // Typing in a popover field clears its inline validation error. Shared
        // by the link and image menus — both gate their primary on it.
        _addPopoverFieldListeners(signal) {
            this._root.querySelectorAll('[data-editor-link-dropmenu] .nds-dropmenu-menu, [data-editor-image-dropmenu] .nds-dropmenu-menu').forEach(menu => {
                menu.addEventListener('input', (e) => {
                    const field = e.target.closest('.nds-form-container');
                    if (field && NDS.status.get(field) !== '') NDS.Form.clearStatus(field);
                    const primary = menu.querySelector('[data-dropmenu-primary]');
                    if (primary) primary.disabled = false;
                }, { signal });
            });
        }

        _addLinkMenuListeners(signal) {
            const linkMenu = this._root.querySelector('[data-editor-link-dropmenu] .nds-dropmenu-menu');
            if (!linkMenu) return;
            linkMenu.addEventListener('click', (e) => {
                if (e.target.closest('[data-editor-link-confirm]')) this._confirmLink();
                else if (e.target.closest('[data-editor-link-unlink]')) this._unlink();
                else if (e.target.closest('[data-editor-link-cancel]')) this._cancelLink();
            }, { signal });
            // Enter in either text field confirms.
            linkMenu.querySelectorAll('[data-editor-link-text], [data-editor-link-url]').forEach(input => {
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { e.preventDefault(); this._confirmLink(); }
                }, { signal });
            });
        }

        _addImageMenuListeners(signal) {
            const imageMenu = this._root.querySelector('[data-editor-image-dropmenu] .nds-dropmenu-menu');
            if (!imageMenu) return;
            imageMenu.addEventListener('click', (e) => {
                if (e.target.closest('[data-editor-image-confirm]')) this._confirmImage();
                else if (e.target.closest('[data-editor-image-cancel]')) this._cancelImage();
            }, { signal });
            const uploadHost = imageMenu.querySelector('[data-editor-image-upload]');
            if (uploadHost) {
                // Generated after the loader's sweep — init is idempotent.
                NDS.Upload.init();
                // Chosen file → URL field (alt seeds from the file name).
                // Consumers configure the popover's upload container
                // through the editor's setImageUpload() (uploadUrl,
                // autoUpload, maxFileSize, allowedTypes…). uploadUrl:
                // 'embed' is a reserved sentinel — files embed as
                // data:image URLs; any other URL POSTs and the URL arrives
                // via nds:upload:success.
                uploadHost.addEventListener('nds:upload:select', (e) => {
                    const file = e.detail.files[0];
                    if (!file) return;
                    const altInput = imageMenu.querySelector('[data-editor-image-alt]');
                    if (altInput && !altInput.value) altInput.value = file.name.replace(/\.[^.]+$/, '');
                    // Server mode short-circuits (nds:upload:success drives
                    // the URL); embed mode falls through to the FileReader.
                    const url = uploadHost.ndsUpload?.getConfig?.().uploadUrl;
                    if (url && url !== 'embed') return;
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
                    if (urlInput && url && isSafeSrc(url)) urlInput.value = url;
                }, { signal });
                // Removing the chip invalidates an embedded data: URL.
                uploadHost.addEventListener('nds:upload:removed', () => {
                    const urlInput = imageMenu.querySelector('[data-editor-image-url]');
                    if (urlInput && urlInput.value.startsWith('data:')) urlInput.value = 'https://';
                }, { signal });
            }
            imageMenu.querySelectorAll('[data-editor-image-url], [data-editor-image-alt], [data-editor-image-width], [data-editor-image-height]').forEach(input => {
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') { e.preventDefault(); this._confirmImage(); }
                }, { signal });
            });
        }

        _addRemoveMenuListeners(signal) {
            const removeMenu = this._root.querySelector('[data-editor-remove-dropmenu] .nds-dropmenu-menu');
            if (!removeMenu) return;
            removeMenu.addEventListener('click', (e) => {
                const level = e.target.closest('[data-editor-remove-level]');
                if (level) this._confirmRemove(parseInt(level.dataset.editorRemoveLevel, 10));
                else if (e.target.closest('[data-editor-remove-cancel]')) this._cancelRemove();
            }, { signal });
        }

        // Disabled: inert surface, nothing submits (native disabled-field
        // semantics via the carrier textarea). Readonly: content selectable,
        // source viewable, nothing editable, value still submits.
        _syncAccessState() {
            const disabled = NDS.state.has(this._root, 'disabled');
            const readonly = NDS.state.has(this._root, 'readonly');
            const editable = !disabled && !readonly;
            this._editable.setAttribute('contenteditable', editable ? 'true' : 'false');
            this._editable.setAttribute('aria-readonly', readonly ? 'true' : 'false');
            this.source.disabled = disabled;
            this.source.readOnly = readonly;
            if (this._toolbar) {
                // Commands act on the visual view: off in source view too, as real disabled buttons.
                const commandsEnabled = editable && !this._root.classList.contains('is-source');
                this._toolbar.querySelectorAll('[data-cmd]').forEach(btn => { btn.disabled = !commandsEnabled; });
                const srcBtn = this._toolbar.querySelector('[data-source-toggle]');
                if (srcBtn) srcBtn.disabled = disabled; // readonly may still view source
                this._syncRemoveState(); // remove stays caret-gated, not blanket-enabled
            }
        }

        destroy() {
            if (this._rafId) cancelAnimationFrame(this._rafId);
            this._clearNotice?.cancel();
            this._selectedMark?.removeAttribute('data-editor-selected');
            this._selectedMark = null;
            this.abortController.abort();
            // Generated surfaces go; the adopted textarea reverts to a plain,
            // working field.
            this._toolbar?.querySelectorAll('.nds-dropmenu').forEach(el => el.ndsDropmenu?.destroy?.());
            this._toolbar?.querySelectorAll('.nds-tooltip').forEach(el => el.ndsTooltip?.destroy?.());
            this._toolbar?.querySelectorAll('.nds-upload').forEach(el => el.ndsUpload?.destroy?.());
            this._toolbar?.remove();
            this._toolbar = null;
            this._editable.remove();
            this.source.classList.remove('nds-editor-source');
            this.source.removeAttribute('tabindex');
            this._root.classList.remove('is-source');
            this._history = [];
            this._historyIndex = -1;
            this._root.removeAttribute('data-nds-editor-initialized');
            delete this._root.ndsEditor;
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
            if (this.source.readOnly) NDS.state.add(this._root, 'readonly');
            if (this.source.disabled) NDS.state.add(this._root, 'disabled');
            const editable = document.createElement('div');
            editable.className = 'nds-editor-editable';
            editable.setAttribute('contenteditable', 'true');
            editable.setAttribute('role', 'textbox');
            editable.setAttribute('aria-multiline', 'true');
            if (this.source.placeholder) editable.setAttribute('data-placeholder', this.source.placeholder);
            const label = this._root.querySelector('.nds-form-header label');
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
            const spec = (this._root.dataset.editorToolbar || TOOLBAR_DEFAULT).trim();
            if (spec === 'none') return null;
            const html = buildToolbarHtml(spec, NDS.escapeHtml(this._idBase));
            if (!html) return null;
            const anchor = this._editable.closest('.nds-form-control') || this._editable;
            anchor.insertAdjacentHTML('beforebegin', html);
            const toolbar = anchor.previousElementSibling;
            // Dropmenu (main) finished its sweep before editor init — wire the
            // generated elements directly. Tooltip rides the delegated bundle;
            // while that is still in flight NDS.Tooltip is the loader's lazy
            // stub, so create() lands once it arrives.
            toolbar.querySelectorAll('.nds-dropmenu').forEach(el => NDS.Dropmenu.create(el));
            toolbar.querySelectorAll('.nds-tooltip').forEach(el => NDS.Tooltip.create(el));
            return toolbar;
        }

        _handleToolbarClick(e) {
            if (e.target.closest('[data-source-toggle]')) { this._toggleSourceView(); return; }
            const btn = e.target.closest('[data-cmd]');
            if (!btn || this._root.classList.contains('is-source')) return;
            const command = btn.dataset.cmd;
            if (command === 'link' || command === 'image' || command === 'remove') return; // dropmenu-backed — handled via mousedown prep + menu clicks
            this._editable.focus();
            this._runCommand(command);
            this._syncSource();
            this._syncToolbarState();
        }

        _runCommand(command) {
            // Atoms are one line, label/icon only — a heading, a list or
            // inline formatting never lands inside one. Checked here, the one
            // choke point both the toolbar click and the Ctrl+B/I/U keyboard
            // shortcuts route through.
            if (atomLockedCommands.has(command) && this._findLinkableAtom()) return;
            // ponytail: execCommand for writes — deprecated but universally
            // supported, with browser-handled RTL/bidi. Replace per-command only if a UA misbehaves.
            switch (command) {
                case 'bold':      document.execCommand('bold');          break;
                case 'italic':    document.execCommand('italic');        break;
                case 'underline': document.execCommand('underline');     break;
                case 'strike':    document.execCommand('strikeThrough'); break;
                case 'ul':        document.execCommand('insertUnorderedList'); break;
                case 'ol':        document.execCommand('insertOrderedList');   break;
                case 'clear':     document.execCommand('removeFormat'); break;
                case 'undo':      this._stepHistory(-1); break;
                case 'redo':      this._stepHistory(1);  break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4': {
                    const targetTag = commandBlocks[command];
                    const block = this._getBlockContext();
                    document.execCommand('formatBlock', false, (block && block.tagName === targetTag) ? 'P' : targetTag);
                    break;
                }
                case 'align-left':    this._setAlignment('left');    break;
                case 'align-center':  this._setAlignment('center');  break;
                case 'align-right':   this._setAlignment('right');   break;
                case 'align-justify': this._setAlignment('justify'); break;
                case 'dir-ltr':       this._setDirection('ltr');     break;
                case 'dir-rtl':       this._setDirection('rtl');     break;
                default:
                    console.warn(`NDS Editor: unknown command "${command}"`);
            }
        }

        _toggleSourceView() {
            const btn = this._toolbar.querySelector('[data-source-toggle]');
            const entering = !this._root.classList.contains('is-source');
            if (entering) {
                // Sync BEFORE showing so the user sees the exact value that would submit.
                this._syncSource();
                // Read the editor selection while it still exists — carried
                // into the source so the user lands where they meant to edit.
                const carry = this._computeSourceSelection();
                // Match the source view to the rendered editable height (read
                // before is-source hides it) — a long document would otherwise
                // switch into a min-height-sized textarea.
                this.source.style.blockSize = `${this._editable.offsetHeight}px`;
                this._root.classList.add('is-source');
                this._syncAccessState();
                this.source.removeAttribute('tabindex');
                btn?.setAttribute('aria-pressed', 'true');
                this.source.focus();
                if (carry) {
                    this.source.setSelectionRange(carry.start, carry.end);
                    // Rough line-based scroll — enough to bring the selection into view.
                    const line = this.source.value.slice(0, carry.start).split('\n').length;
                    const lineHeight = parseFloat(getComputedStyle(this.source).lineHeight) || 24;
                    this.source.scrollTop = Math.max(0, (line - 3) * lineHeight);
                }
            } else {
                // Sanitize whatever was typed in source view before it becomes visual DOM.
                this._editable.innerHTML = sanitizeHtml(this.source.value) || '<p><br></p>';
                this._normalizeLooseBlocks();
                this._syncLinks();
                this._syncColumnAlign();
                this._root.classList.remove('is-source');
                this._syncAccessState();
                this.source.setAttribute('tabindex', '-1');
                btn?.setAttribute('aria-pressed', 'false');
                this._syncSource();
                this._syncToolbarState();
                this._editable.focus();
            }
        }

        // Map the editor selection to a source-view range. Heuristic by
        // design: the value is a TRANSFORMED document (rebuild + pretty
        // print), so no exact DOM→source mapping exists — the selected text's
        // occurrence index disambiguates repeats, and structure-heavy
        // selections degrade to no carry. Never chase the exact version.
        _computeSourceSelection() {
            const selection = window.getSelection();
            if (!selection.rangeCount || !this._editable.contains(selection.anchorNode)) return null;
            const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();

            let needle = normalizeText(selection.toString());
            if (!needle) {
                // Collapsed caret — use the word around it.
                const node = selection.anchorNode;
                if (node.nodeType !== Node.TEXT_NODE) return null;
                const text = node.textContent;
                const at = selection.anchorOffset;
                const before = /\S*$/.exec(text.slice(0, at))[0];
                const after = /^\S*/.exec(text.slice(at))[0];
                needle = normalizeText(before + after);
                if (!needle) return null;
            }

            // How many times does the needle occur BEFORE the selection? The
            // same occurrence index locates it in the source string.
            const range = selection.getRangeAt(0);
            const pre = document.createRange();
            pre.selectNodeContents(this._editable);
            pre.setEnd(range.startContainer, range.startOffset);
            const preText = normalizeText(pre.toString());
            let occurrences = 0;
            for (let i = preText.indexOf(needle); i !== -1; i = preText.indexOf(needle, i + 1)) occurrences++;

            const value = this.source.value;
            let index = -1, from = 0;
            for (let step = 0; step <= occurrences; step++) {
                index = value.indexOf(needle, from);
                if (index === -1) break;
                from = index + 1;
            }
            if (index === -1) index = value.indexOf(needle); // fallback: first occurrence
            if (index === -1 && needle.length > 24) {
                // Selection spans structure the printer reshaped — retry with its head.
                needle = needle.slice(0, 24);
                index = value.indexOf(needle);
            }
            if (index === -1) return null;
            return { start: index, end: index + needle.length };
        }

        // Tab indents in source view (line-wise over a selection, Shift+Tab
        // outdents); Escape-then-Tab releases the trap and moves focus — the
        // code-editor convention. Edits go through execCommand('insertText')
        // so the textarea's native undo survives.
        _handleSourceKeyDown(e) {
            if (e.key === 'Escape') { this._sourceTabEscape = true; return; }
            if (e.key !== 'Tab') { this._sourceTabEscape = false; return; }
            if (this._sourceTabEscape) { this._sourceTabEscape = false; return; }
            e.preventDefault();
            const textarea = this.source;
            const INDENT = '  ';
            const { selectionStart: start, selectionEnd: end, value } = textarea;
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
            textarea.setSelectionRange(lineStart, end);
            document.execCommand('insertText', false, next);
            // Re-select the affected lines so repeated Tab/Shift+Tab flows.
            textarea.setSelectionRange(lineStart, lineStart + next.length);
        }

        // ---------- Editing events ----------

        _handleInput() {
            this._syncSource(true); // typing coalesces into one history entry
            this._scheduleToolbarSync();
        }

        _handleKeyDown(e) {
            // NDS component shells are atomic to boundary deletes — a
            // Backspace/Delete that would cross a shell edge must not merge
            // content through it.
            if ((e.key === 'Backspace' || e.key === 'Delete') && this._guardRegionDelete(e)) return;
            if (e.key === 'Enter' && this._guardRegionEnter(e)) return;
            if ((e.ctrlKey || e.metaKey) && !e.altKey) {
                const key = e.key.toLowerCase();
                if (key === 'z' || key === 'y') {
                    e.preventDefault();
                    this._stepHistory(key === 'y' || e.shiftKey ? 1 : -1);
                    return;
                }
                const command = { b: 'bold', i: 'italic', u: 'underline' }[e.key.toLowerCase()];
                if (command) {
                    e.preventDefault();
                    this._runCommand(command);
                    this._syncSource();
                    this._syncToolbarState();
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
                    this._syncToolbarState();
                }
            }
        }

        // Ctrl+X mirrors the Delete guards: a shell-clipping selection is the
        // same leak, and a whole-component cut mangles the shell the same way —
        // so that one writes the clipboard itself (the flavors the browser
        // would have written) and then removes the component outright.
        // Clipboard first: a removal with no clipboard write is data loss, so
        // bail to native if the write surface is missing.
        _handleCut(e) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            const range = selection.getRangeAt(0);
            if (this._isSelectionClippingShell(range)) { e.preventDefault(); return; }
            const whole = this._getWholeSelectedRegion(range);
            if (!whole || !e.clipboardData) return;
            e.preventDefault();
            // Through sanitize, so the copy is canonical and editing-only
            // stamps (data-editor-selected) never ride to the clipboard.
            e.clipboardData.setData('text/html', sanitizeHtml(whole.outerHTML));
            e.clipboardData.setData('text/plain', whole.textContent.replace(/\s+/g, ' ').trim());
            this._removeRegion(whole);
            this._syncSource();
            this._syncToolbarState();
        }

        _handlePaste(e) {
            e.preventDefault();
            // Replacing a shell-clipping selection cuts through the very
            // component boundary the delete and cut guards stop at. Unlike a
            // blocked delete — where the surviving content IS the feedback — a
            // paste that silently does nothing reads as a broken editor, so say
            // why.
            const selection = window.getSelection();
            if (selection.rangeCount && this._isSelectionClippingShell(selection.getRangeAt(0))) {
                this._showNotice(strings.text('paste_clips_shell'));
                return;
            }
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
                // No usable text flavor — clipboard image FILES (screenshots,
                // copied bitmaps) embed as data:image URLs, but only in embed
                // mode; the default politely points at the image dialog.
                // Mixed text+image clipboards (Word) keep the text flavor; the
                // files are unplaceable there and stay dropped.
                const files = Array.from(e.clipboardData.files).filter(file => file.type.startsWith('image/'));
                if (!files.length) return;
                if (!this._isImageEmbedAllowed()) {
                    this._showNotice(strings.text('paste_blocked'));
                    return;
                }
                // Same size/type/MIME gates as the popover upload — full
                // parity via NDS.Upload's live validateFile(), so pasted files
                // honor allowedTypes/allowedMimeTypes too, not just size.
                const host = this._getImageUploadHost();
                let firstError = '';
                const valid = files.filter(file => {
                    const errors = host?.ndsUpload?.validateFile?.(file) || [];
                    if (errors.length) { firstError ||= errors[0]; return false; }
                    return true;
                });
                if (firstError) this._showNotice(firstError);
                // Reads chain sequentially — parallel FileReaders complete in
                // size order, not clipboard order. Each load inserts at the
                // current caret, so the chain preserves clipboard order.
                const embedNext = (i) => {
                    if (i >= valid.length) return;
                    const fr = new FileReader();
                    fr.onload = () => { this._insertImage(fr.result, ''); embedNext(i + 1); };
                    fr.onerror = () => embedNext(i + 1);
                    fr.readAsDataURL(valid[i]);
                };
                embedNext(0);
                return;
            }
            // A pasted fragment ending in a block element (component region,
            // table…) leaves the caret trapped inside it — give typing a
            // paragraph to continue in. Trailing inline content is no trap;
            // trailing whitespace is trimmed so Chrome doesn't wrap it into a
            // junk paragraph.
            const last = new DOMParser().parseFromString(insert, 'text/html').body.lastElementChild;
            if (last && !FLOW_EXIT_TAGS.test(last.tagName) && !isInlineNode(last)) {
                insert = insert.replace(/\s+$/, '') + '<p><br></p>';
            }
            if (isEffectivelyEmpty(this._editable)) {
                // Empty document: set the content directly — Chrome's
                // insertHTML insists on splitting the placeholder into a
                // blank first line around block inserts.
                // ponytail: bypasses execCommand, so this paste makes no native
                // undo entry — the editor history covers it (_syncSource snapshots).
                const probe = new DOMParser().parseFromString(insert, 'text/html').body;
                const inlineOnly = [...probe.children].every(child => inlineTags.has(child.tagName));
                this._editable.innerHTML = inlineOnly ? `<p>${insert}</p>` : insert;
                const range = document.createRange();
                range.selectNodeContents(this._editable);
                range.collapse(false);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                this._syncLinks();
                this._syncColumnAlign();
                this._syncSource();
                this._syncToolbarState();
                return;
            }
            if (!this._insertPasted(insert)) return;
            this._syncLinks();
            this._syncColumnAlign();
            this._syncSource();
            this._syncToolbarState();
        }

        // Anything else dropped goes in like a paste, sanitized, at the drop point.
        _handleDrop(e) {
            if (!e.dataTransfer || e.dataTransfer.types.includes(DRAG_TYPE)) return;
            e.preventDefault();
            const position = document.caretPositionFromPoint?.(e.clientX, e.clientY);
            const range = position ? document.createRange() : document.caretRangeFromPoint?.(e.clientX, e.clientY);
            if (position) range.setStart(position.offsetNode, position.offset);
            this._editable.focus({ preventScroll: true });
            if (range && this._editable.contains(range.startContainer)) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
            this._handlePaste({ preventDefault() {}, clipboardData: e.dataTransfer });
        }

        // Place pasted markup at the caret. Plain content rides
        // execCommand('insertHTML') so a paste continues the current paragraph
        // the way every editor does. Markup carrying an NDS region cannot use
        // that path: it merges the fragment's FIRST element into the caret's
        // block and re-expresses it as an inline style span, which strips the
        // component's classes — a single-part card or an inline atom is
        // destroyed outright. Those insert structurally instead: inline runs at
        // the caret, blocks between blocks, never nested inside a <p>.
        // Undo is unaffected: every undo path already routes through the
        // editor's own history (_handleKeyDown's Ctrl+Z, beforeinput's historyUndo).
        _insertPasted(html) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return false;
            const probe = new DOMParser().parseFromString(html, 'text/html').body;
            if (!probe.querySelector('[class*="nds-"]')
                && document.execCommand('insertHTML', false, html)) return true;

            const range = selection.getRangeAt(0);
            // Never mutate outside the editing host — a stray selection would
            // otherwise delete page content and climb past the editable below.
            if (!this._editable.contains(range.startContainer)) return false;
            range.deleteContents();
            const blocky = Array.from(probe.children).some(child => !isInlineNode(child));
            const fragment = document.createDocumentFragment();
            while (probe.firstChild) fragment.appendChild(probe.firstChild);
            const lastNode = fragment.lastChild;
            if (!lastNode) return false;

            // The caret's own top-level element — the split point for block
            // content (null when the caret sits loose at the editable root).
            const start = range.startContainer;
            let top = null;
            for (let el = start.nodeType === Node.ELEMENT_NODE ? start : start.parentElement;
                el && el !== this._editable; el = el.parentElement) top = el;

            const hasContent = (node) => node.textContent.trim() || node.querySelector('img, [class*="nds-"]');
            let landing = null; // block the caret should end up inside
            if (!blocky || !top) {
                range.insertNode(fragment);
            } else if (!/^(?:P|H[1-4])$/.test(top.tagName)) {
                // Not a simple text block (a list, a table, a component shell) —
                // land after it whole rather than splitting something structural.
                top.after(fragment);
            } else {
                // Split the caret's block so the pasted blocks sit between the
                // halves instead of nesting inside a <p>.
                const tail = range.cloneRange();
                tail.setEnd(top, top.childNodes.length);
                const tailContent = tail.extractContents();
                top.after(fragment);
                if (hasContent(tailContent)) {
                    const tailBlock = document.createElement(top.tagName.toLowerCase());
                    tailBlock.appendChild(tailContent);
                    lastNode.after(tailBlock);
                    // The payload's trailing blank paragraph only exists to give
                    // the caret somewhere to land; the tail block is that, so
                    // keeping it would just leave an empty line mid-document.
                    if (lastNode.tagName === 'P' && !hasContent(lastNode)) lastNode.remove();
                    landing = tailBlock;
                }
                if (!hasContent(top)) top.remove();
            }
            // A structural insert can leave the payload's own inline tail loose
            // at the root; the hydrate path's wrapper is the same fix.
            this._normalizeLooseBlocks();
            // Caret inside the block that continues the text, not stranded
            // between two blocks.
            const caretRange = document.createRange();
            if (landing) caretRange.setStart(landing, 0);
            else if (lastNode.nodeType === Node.ELEMENT_NODE && !hasContent(lastNode)) caretRange.selectNodeContents(lastNode);
            else caretRange.setStartAfter(lastNode);
            caretRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(caretRange);
            return true;
        }

        // ---------- Selection helpers ----------

        _saveSelection() {
            const selection = window.getSelection();
            if (selection.rangeCount && this._editable.contains(selection.anchorNode)) {
                this._savedRange = selection.getRangeAt(0).cloneRange();
                return;
            }
            // No caret in the text yet: a popover inserts at the end, never nowhere.
            const end = document.createRange();
            end.selectNodeContents(this._editable.lastElementChild || this._editable);
            end.collapse(false);
            this._savedRange = end;
        }

        _restoreSelection() {
            const range = this._savedRange;
            this._savedRange = null;
            if (!range) return null;
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            return range;
        }

        // Nearest selection ancestor satisfying `match`, bounded by the
        // editable — closest() would escape it.
        _findSelectionAncestor(match) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return null;
            let node = selection.anchorNode;
            if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
            while (node && node !== this._editable) {
                if (match(node)) return node;
                node = node.parentElement;
            }
            return null;
        }

        // Anchors created after load (link insert, paste, source edits,
        // hydration) miss the loader's eager NDS.Link pass — re-run it so
        // external links pick up their badge and target BEFORE the value
        // syncs, so the tagging round-trips into the form value.
        _syncLinks() { NDS.Link.init(); }

        _getAncestorTag(tagName) { return this._findSelectionAncestor(node => node.tagName === tagName); }

        // The linkable ATOM at the caret: ANY <button>, or the OUTERMOST
        // nds-classed inline element (tag, chip, featured-icon, label…) —
        // caret inside it, or the atom itself click-selected whole. Linking
        // converts the atom whole to <a … href> — an anchor nested inside an
        // atom is meaningless. Unlink converts back.
        _findLinkableAtom() {
            const picked = this._getSelectedNode();
            if (picked && isAtomTag(picked)) return picked;
            let atom = null;
            this._findSelectionAncestor(node => {
                if (isAtomTag(node)) atom = node;
                return false; // keep climbing — outermost match wins
            });
            return atom;
        }

        _getBlockContext() { return this._findSelectionAncestor(node => blockTags.has(node.tagName)); }

        // ---------- Component-shell delete guard ----------

        // Top-most nds-classed ancestor under the editable — the shell
        // element. Nodes OUTSIDE the editable answer null: without the
        // containment bail the walk would climb the page DOM and treat page
        // chrome (nds-content-layout…) as removable shells.
        _findRegionRoot(node) {
            let el = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
            if (!el || !this._editable.contains(el)) return null;
            let region = null;
            for (; el && el !== this._editable; el = el.parentElement) {
                if (hasNdsClass(el)) region = el;
            }
            return region;
        }

        // No text between the caret and the element's edge in the delete
        // direction (works for the shell root or any inner part).
        _isAtRegionEdge(range, region, back) {
            const edgeRange = document.createRange();
            edgeRange.selectNodeContents(region);
            if (back) edgeRange.setEnd(range.startContainer, range.startOffset);
            else edgeRange.setStart(range.startContainer, range.startOffset);
            return !edgeRange.toString().trim().length;
        }

        // First and last text nodes with a NON-EMPTY portion inside the range.
        // Raw endpoint containers over-reach (a full-part selection usually
        // ends at the NEXT element's offset 0), so boundary judgments key on
        // the text actually selected.
        _getRangeTextEndpoints(range) {
            // Walk the range's own subtree, not the whole editable — a node
            // that intersects the range always sits inside its common
            // ancestor, so the document's length stops driving the cost.
            // The editable is the ceiling: a drag can escape the editing host,
            // and rooting above it would let outside text answer as an
            // endpoint.
            const commonAncestor = range.commonAncestorContainer;
            const inner = (commonAncestor.nodeType === Node.ELEMENT_NODE ? commonAncestor : commonAncestor.parentElement) || this._editable;
            const scope = this._editable.contains(inner) ? inner : this._editable;
            const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
            let first = null, last = null;
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
                if (!range.intersectsNode(node)) continue;
                const nodeRange = document.createRange();
                nodeRange.selectNodeContents(node);
                if (nodeRange.compareBoundaryPoints(Range.START_TO_START, range) < 0) nodeRange.setStart(range.startContainer, range.startOffset);
                if (nodeRange.compareBoundaryPoints(Range.END_TO_END, range) > 0) nodeRange.setEnd(range.endContainer, range.endOffset);
                // trim: a double-click word selection drags its trailing
                // whitespace along — inter-part whitespace is inert, not a
                // boundary crossing.
                if (!nodeRange.toString().trim().length) continue;
                if (!first) first = node;
                last = node;
            }
            return { first, last };
        }

        // A selection clips a shell when the text it actually covers starts
        // or ends inside a component WITHOUT covering that component whole:
        // partial shell cuts and cross-part spans block; whole-shell
        // selections (explicit removal) and same-part text edits stay free.
        _isSelectionClippingShell(range) {
            const { first, last } = this._getRangeTextEndpoints(range);
            if (!first) return false; // no real text selected — native is safe
            const containsWhole = (el) => {
                const elementRange = document.createRange();
                elementRange.selectNode(el);
                return range.compareBoundaryPoints(Range.START_TO_START, elementRange) <= 0
                    && range.compareBoundaryPoints(Range.END_TO_END, elementRange) >= 0;
            };
            const startRegion = this._findRegionRoot(first);
            const endRegion = this._findRegionRoot(last);
            const startClips = startRegion && !containsWhole(startRegion);
            const endClips = endRegion && !containsWhole(endRegion);
            if (!startClips && !endClips) return false;
            if (startRegion === endRegion) return this._findPart(first, startRegion) !== this._findPart(last, startRegion);
            return true;
        }

        // Innermost component part the caret sits in — the nearest ancestor
        // (bounded by the shell root) that is nds-classed or a structural
        // block. Its edges are deletion walls, so edits can't merge one part
        // of a component into another (description into title, cell into
        // cell). Falls back to the shell itself for bare text.
        _findPart(node, region) {
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
        _findAdjacentRegion(range, back) {
            const node = range.startContainer;
            const off = range.startOffset;
            if (node.nodeType === Node.TEXT_NODE
                && (back ? off > 0 : off < node.textContent.length)) return null;
            let sibling = node.nodeType === Node.ELEMENT_NODE
                ? (back ? node.childNodes[off - 1] : node.childNodes[off]) || null
                : null;
            let current = node;
            while (true) {
                while (sibling) {
                    if (sibling.nodeType === Node.ELEMENT_NODE) {
                        if (hasNdsClass(sibling)) return sibling;
                        if (sibling.tagName !== 'BR') return null;
                    } else if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim()) {
                        return null;
                    }
                    sibling = back ? sibling.previousSibling : sibling.nextSibling;
                }
                if (!current || current === this._editable) return null;
                sibling = back ? current.previousSibling : current.nextSibling;
                current = current.parentElement;
            }
        }

        // Explicit component removal — the toolbar's escape hatch from the
        // shell guards. A DIRECT DOM cut: execCommand('delete') can't remove
        // a whole element reliably (Chrome normalizes the selection to the
        // contents and leaves an emptied shell). Undo comes from the editor
        // history, not the native stack.
        _removeRegion(region) {
            const parent = region.parentNode;
            const index = Array.prototype.indexOf.call(parent.childNodes, region);
            region.remove();
            const selection = window.getSelection();
            const range = document.createRange();
            if (!this._editable.firstElementChild && !this._editable.textContent.trim()) {
                this._editable.innerHTML = '<p><br></p>';
                range.selectNodeContents(this._editable.firstElementChild);
            } else {
                range.setStart(parent, Math.min(index, parent.childNodes.length));
            }
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // ---------- Editor history ----------

        _resolvePath(path) {
            let node = this._editable;
            for (const i of path) node = findRealChild(node, i) || node;
            return node;
        }

        // Caret as a child-index path. Indices skip the pretty-printer's
        // indentation nodes: the restore re-parses the formatted value, which
        // has them, while the live DOM that recorded the path does not.
        _captureCaret() {
            const selection = window.getSelection();
            if (!selection.rangeCount || !this._editable.contains(selection.anchorNode)) return null;
            const { startContainer, startOffset } = selection.getRangeAt(0);
            const path = [];
            for (let node = startContainer; node && node !== this._editable; node = node.parentNode) {
                path.unshift(getRealIndex(node.parentNode, Array.prototype.indexOf.call(node.parentNode.childNodes, node)));
            }
            const offset = startContainer.nodeType === Node.TEXT_NODE ? startOffset : getRealIndex(startContainer, startOffset);
            return { path, offset };
        }

        // Value-snapshot history entry. Typing coalesces (sub-800ms bursts
        // rewrite the top entry); structural ops always cut a new one.
        // ponytail: 50-entry cap — full-value snapshots, not deltas.
        _pushHistory(coalesce) {
            if (this._histSuspend) return;
            const value = this.source.value;
            const history = this._history;
            if (history[this._historyIndex]?.v === value) return;
            history.length = this._historyIndex + 1; // any new edit drops the redo tail
            const now = Date.now();
            if (coalesce && this._histLast && now - this._histLast < 800 && this._historyIndex > 0) {
                history[this._historyIndex] = { v: value, caret: this._captureCaret() };
            } else {
                history.push({ v: value, caret: this._captureCaret() });
                this._historyIndex++;
                if (history.length > 50) { history.shift(); this._historyIndex--; }
            }
            this._histLast = coalesce ? now : 0;
        }

        // Undo/redo: restore a snapshot through the same hydrate path the
        // editor always uses, then put the caret back where it was recorded.
        _stepHistory(dir) {
            const index = this._historyIndex + dir;
            if (index < 0 || index >= this._history.length) return;
            this._historyIndex = index;
            const snap = this._history[index];
            this._histSuspend = true;
            this._editable.innerHTML = snap.v ? sanitizeHtml(snap.v) : '<p><br></p>';
            this._normalizeLooseBlocks();
            this._syncLinks();
            this._syncColumnAlign();
            this._syncSource();
            this._histSuspend = false;
            const selection = window.getSelection();
            const range = document.createRange();
            try {
                const node = this._resolvePath(snap.caret?.path || []);
                const off = snap.caret?.offset || 0;
                if (node.nodeType === Node.TEXT_NODE) range.setStart(node, Math.min(off, node.textContent.length));
                else {
                    const child = findRealChild(node, off);
                    range.setStart(node, child ? Array.prototype.indexOf.call(node.childNodes, child) : node.childNodes.length);
                }
            } catch {
                range.selectNodeContents(this._editable);
                range.collapse(false);
            }
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            this._syncToolbarState();
        }

        // Removable levels at the caret, innermost→outermost: independent
        // nested components (an nds class NOT prefixed by any outer element's
        // base class — nds-tag inside nds-card) plus the top-most shell,
        // always. Structural parts (nds-alert-close inside nds-alert) and
        // icon-only elements never list — amputating parts is what the shell
        // guards exist to prevent.
        _removeLevels(node) {
            const elements = [];
            let el = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
            if (!el || !this._editable.contains(el)) return [];
            for (; el && el !== this._editable; el = el.parentElement) {
                if (hasNdsClass(el)) elements.push(el);
            }
            const levels = [];
            elements.forEach((e, i) => {
                const isShell = i === elements.length - 1;
                if (isShell) { levels.push(e); return; }
                if (getComponentName(e) === 'NDS') return; // icon-only
                const outer = elements.slice(i + 1);
                const isPart = Array.from(e.classList).some(className =>
                    className.startsWith('nds-') && outer.some(outerElement => Array.from(outerElement.classList).some(outerClass =>
                        outerClass.startsWith('nds-') && className.startsWith(outerClass + '-'))));
                if (!isPart) levels.push(e);
            });
            return levels;
        }

        // Save the selection and fill the picker — one destructive row per
        // removable level, rendered as a hierarchy: the shell first, nested
        // components indented under it (nds-card / – nds-tag).
        _prepareRemoveMenu() {
            this._saveSelection();
            const node = this._getComponentCaretNode();
            this._removeChain = node ? this._removeLevels(node) : [];
            const dropmenu = this._root.querySelector('[data-editor-remove-dropmenu]');
            const menu = this._getMenu(dropmenu);
            const list = menu?.querySelector('[data-editor-remove-levels]');
            if (!list) return;
            const chain = this._removeChain;
            list.innerHTML = chain.map((el, i) => ({ el, i })).reverse().map(({ el, i }, depth) =>
                `<button type="button" class="nds-btn nds-subtle nds-destructive nds-dropmenu-item" data-editor-remove-level="${i}"><span class="nds-label">${depth ? '– ' : ''}${escapeHtml(getComponentName(el))}</span></button>`
            ).join('');
            // Indent knob via CSSOM, never a style attribute — a strict style-src blocks the attribute form.
            list.querySelectorAll('[data-editor-remove-level]').forEach((btn, depth) => btn.style.setProperty('--_remove-depth', depth));
        }

        _confirmRemove(levelIndex) {
            this._root.querySelector('[data-editor-remove-dropmenu]')?.ndsDropmenu?.close?.();
            this._editable.focus();
            this._restoreSelection();
            const target = this._removeChain?.[levelIndex];
            if (target?.isConnected) this._removeRegion(target);
            this._syncSource();
            this._syncToolbarState();
        }

        _cancelRemove() {
            this._root.querySelector('[data-editor-remove-dropmenu]')?.ndsDropmenu?.close?.();
            this._editable.focus();
            this._restoreSelection();
        }

        // The node the component commands key on: a click-selected component
        // counts as its own caret position (the selection anchor is only its
        // PARENT, which would miss it).
        _getComponentCaretNode() {
            const picked = this._getSelectedNode();
            if (picked && hasNdsClass(picked)) return picked;
            const selection = window.getSelection();
            return (selection.rangeCount && this._editable.contains(selection.anchorNode)) ? selection.anchorNode : null;
        }

        // The remove command is caret-gated — live only when the caret sits
        // inside (or whole-selects) a component on an editable surface.
        _syncRemoveState() {
            const removeButton = this._toolbar?.querySelector('[data-cmd="remove"]');
            if (!removeButton) return;
            const node = this._editable.getAttribute('contenteditable') === 'true' && !this._root.classList.contains('is-source')
                ? this._getComponentCaretNode() : null;
            removeButton.disabled = !(node && this._findRegionRoot(node));
        }

        // Enter inside a shell would SPLIT the caret's block — the browser
        // clones it, classes and all, duplicating component parts. Convert it
        // to a line break inside the part; a shell-clipping selection blocks
        // entirely. Outside shells, native Enter (new paragraph) stands.
        _guardRegionEnter(e) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return false;
            const range = selection.getRangeAt(0);
            if (!range.collapsed && this._isSelectionClippingShell(range)) {
                e.preventDefault();
                return true;
            }
            // A caret — or a same-atom selection (e.g. double-click word-select
            // of a button's label) — inside an INLINE atom (chip, tag,
            // featured icon, button) never takes a line break — even a <br>
            // breaks its one-line shape, and insertLineBreak over a selection
            // whose bounds coincide with the atom's own (nothing else inside)
            // corrupts it instead of replacing the text. Enter ESCAPES to
            // after the atom instead. Not collapse-gated: a non-collapsed
            // selection already cleared _isSelectionClippingShell above, so if it
            // resolves to an atom here, the whole selection sits inside it.
            const atom = this._findLinkableAtom();
            if (atom) {
                e.preventDefault();
                const range = document.createRange();
                range.setStartAfter(atom);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                return true;
            }
            // A SECOND Enter, right where the escape above left the caret (or
            // any Enter in a block that merely CONTAINS an atom elsewhere),
            // still isn't safe to hand to native splitting: Chrome's own
            // paragraph-split doesn't handle a block boundary that touches an
            // interactive element correctly — it can nest a stray <p> INSIDE
            // the original instead of after it, corrupting the atom's parent
            // the same way an unguarded Enter used to corrupt the atom
            // itself. Split the block ourselves via Range.extractContents
            // (which already handles partial text-node boundaries) whenever
            // an atom sits anywhere in the block, regardless of exact caret
            // proximity to it.
            if (range.collapsed) {
                const block = this._getBlockContext();
                if (block && [...block.querySelectorAll('button, [class*="nds-"]')].some(isAtomTag)) {
                    e.preventDefault();
                    const newBlock = document.createElement(block.tagName);
                    const tail = document.createRange();
                    tail.setStart(range.startContainer, range.startOffset);
                    tail.setEndAfter(block.lastChild);
                    newBlock.appendChild(tail.extractContents());
                    if (!newBlock.hasChildNodes()) newBlock.innerHTML = '<br>';
                    if (!block.hasChildNodes()) block.innerHTML = '<br>';
                    block.parentNode.insertBefore(newBlock, block.nextSibling);
                    const caretRange = document.createRange();
                    caretRange.selectNodeContents(newBlock);
                    caretRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(caretRange);
                    this._syncSource();
                    this._syncToolbarState();
                    return true;
                }
            }
            if (!this._findRegionRoot(range.startContainer)) return false;
            e.preventDefault();
            // ponytail: insertLineBreak over a hand-rolled <br> + caret move;
            // Shift+Enter lands here too and behaves identically.
            document.execCommand('insertLineBreak');
            this._syncSource();
            this._syncToolbarState();
            return true;
        }

        // The component a selection covers EXACTLY — the shape the
        // click-select handler makes, and the one a user makes by selecting a
        // component to delete it. Resolved from the range's own boundary, not
        // from text endpoints: a textless shell (icon-only button) has none.
        // Exact boundaries, not containment — a selection reaching past the
        // shell keeps native delete, which merges the surrounding blocks
        // correctly; removing only the shell would silently spare the rest.
        _getWholeSelectedRegion(range) {
            const start = range.startContainer;
            const node = start.nodeType === Node.ELEMENT_NODE
                ? (start.childNodes[range.startOffset] || start) : start;
            const region = this._findRegionRoot(node);
            if (!region) return null;
            const regionRange = document.createRange();
            regionRange.selectNode(region);
            return range.compareBoundaryPoints(Range.START_TO_START, regionRange) === 0
                && range.compareBoundaryPoints(Range.END_TO_END, regionRange) === 0 ? region : null;
        }

        // Atomic-shell deletes: a Backspace/Delete that would cross a shell
        // boundary — from either side — simply STOPS there. Removing a
        // component is explicit: select it whole, then delete — routed through
        // _removeRegion, because native delete does NOT remove a selected
        // component (Chrome empties the shell and merges the following block
        // into it). Text editing inside the shell stays free and native.
        _guardRegionDelete(e) {
            const selection = window.getSelection();
            if (!selection.rangeCount) return false;
            const range = selection.getRangeAt(0);
            if (!range.collapsed) {
                // Selection deletes are legit fully inside one part (text
                // edit) or fully outside shells (contained shells go whole);
                // endpoints in different parts/shells cut through a boundary.
                if (this._isSelectionClippingShell(range)) {
                    e.preventDefault();
                    return true;
                }
                const whole = this._getWholeSelectedRegion(range);
                if (whole) {
                    e.preventDefault();
                    this._removeRegion(whole);
                    this._syncSource();
                    this._syncToolbarState();
                    return true;
                }
                return false;
            }
            const back = e.key === 'Backspace';

            const caretRegion = this._findRegionRoot(range.startContainer);
            const blocked = caretRegion
                // Inside a shell the wall is the innermost PART, not just the
                // shell edge — deletion can't leak between component parts.
                ? this._isAtRegionEdge(range, this._findPart(range.startContainer, caretRegion), back)
                : !!this._findAdjacentRegion(range, back);
            if (blocked) e.preventDefault();
            return blocked;
        }

        // Every block the selection touches — the unit both the alignment and
        // direction commands write to. Falls back to the caret's own block
        // when the selection spans none (a collapsed caret inside a <p>).
        _getSelectedBlocks() {
            const selection = window.getSelection();
            if (!selection.rangeCount) return [];
            const range = selection.getRangeAt(0);
            const blocks = [];
            for (const el of this._editable.querySelectorAll('p, h1, h2, h3, h4, li')) {
                if (range.intersectsNode(el)) blocks.push(el);
            }
            if (!blocks.length) {
                const block = this._getBlockContext();
                if (block) blocks.push(block);
            }
            return blocks;
        }

        // Physical text-align (left/right/center/justify) inline on every block
        // the selection touches. Re-clicking the active value clears it back to
        // natural (direction-following) — mirrors the dir toggle. Native justify* commands are
        // avoided (they write physical left/right unpredictably); this is a
        // direct DOM write.
        _setAlignment(value) {
            const cells = [...this._editable.querySelectorAll('td, th')].filter(cell => this._isTouchingSelection(cell));
            if (cells.length) this._alignColumns(cells, value);
            const blocks = this._getSelectedBlocks().filter(block => !block.closest('td, th'));
            const clear = blocks.length && blocks.every(block => block.style.textAlign === value);
            for (const block of blocks) {
                if (clear) block.style.removeProperty('text-align');
                else block.style.textAlign = value;
                if (!block.getAttribute('style')) block.removeAttribute('style');
            }
        }

        _isTouchingSelection(el) {
            const selection = window.getSelection();
            return !!selection.rangeCount && selection.getRangeAt(0).intersectsNode(el);
        }

        // A cell aligns its whole column the table way (tables.md): data-align
        // on the header — inline style would not survive sanitize in a region.
        // The toolbar is physical, the canon logical; the header's direction
        // maps one to the other. ponytail: justify has no column form — no-op.
        _alignColumns(cells, value) {
            if (value === 'justify') return;
            const heads = [...new Set(cells.map(cell => findColumnHead(cell)).filter(Boolean))];
            if (!heads.length) return;
            const toLogicalAlign = (th) => value === 'center' ? 'center'
                : (value === 'left') !== (getComputedStyle(th).direction === 'rtl') ? 'start' : 'end';
            const clear = heads.every(th => th.getAttribute('data-align') === toLogicalAlign(th));
            for (const th of heads) {
                if (clear) th.removeAttribute('data-align');
                else th.setAttribute('data-align', toLogicalAlign(th));
            }
            this._syncColumnAlign();
        }

        // Live preview of body-cell alignment. On the published page
        // nds-table.js does this from the same data-align; here the inline
        // style is editing-only — sanitize strips it from the value.
        _syncColumnAlign() {
            for (const table of this._editable.querySelectorAll('table')) {
                for (const body of table.tBodies) {
                    for (const tr of body.rows) {
                        for (const td of tr.cells) {
                            // Same lookup the toolbar reads, so the painted and pressed alignment agree.
                            const align = findColumnHead(td)?.getAttribute('data-align');
                            if (columnAlign.has(align)) td.style.textAlign = align;
                            else td.style.removeProperty('text-align');
                            if (!td.getAttribute('style')) td.removeAttribute('style');
                        }
                    }
                }
            }
        }

        // Absolute text direction via the native `dir` attribute on every
        // block the selection touches — the browser handles bidi/logical
        // flipping. Re-clicking the active direction clears it (revert to the
        // editor's inherited direction). Independent of alignment (its own
        // attribute), so the two coexist. ponytail: direct DOM write — no
        // execCommand path writes `dir`.
        _setDirection(value) {
            const blocks = this._getSelectedBlocks();
            const clear = blocks.length && blocks.every(block => block.getAttribute('dir') === value);
            for (const block of blocks) {
                if (clear) block.removeAttribute('dir');
                else block.setAttribute('dir', value);
            }
        }

        // Popover fields live in the menu.
        _getMenu(dropmenu) {
            return (dropmenu && NDS.Dropmenu.getMenu(dropmenu)) || dropmenu;
        }

        _getImageUploadHost() {
            return (this._getMenu(this._root.querySelector('[data-editor-image-dropmenu]')) || this._root)
                .querySelector('[data-editor-image-upload]');
        }

        // ---------- Link popover ----------

        // What the link applies to. One derivation for prep (what the popover
        // shows) and confirm (what it applies) — they must never disagree.
        _getLinkTarget() {
            const existing = this._getAncestorTag('A');
            const atom = existing ? null : this._findLinkableAtom();
            const img = existing || atom ? null : this._getSelectedImage();
            const target = existing || atom;
            return {
                existing, atom, img, target,
                asComponent: !!atom || !!(existing && isComponentAnchor(existing)),
                // Opaque targets — an image, an icon-only atom — have nothing
                // to rename, so the text field doesn't apply.
                asOpaque: !!img || !!(target && !target.querySelector('.nds-label') && !target.textContent.trim())
            };
        }

        _prepareLinkMenu() {
            this._saveSelection();
            const dropmenu = this._root.querySelector('[data-editor-link-dropmenu]');
            if (!dropmenu) return;
            const menu = this._getMenu(dropmenu);
            const textInput = menu.querySelector('[data-editor-link-text]');
            const urlInput = menu.querySelector('[data-editor-link-url]');
            const externalInput = menu.querySelector('[data-editor-link-external]');
            const unlinkBtn = menu.querySelector('[data-editor-link-unlink]');
            const { existing, target, asComponent, asOpaque } = this._getLinkTarget();
            const selection = window.getSelection();
            const selected = (selection.rangeCount && !selection.isCollapsed && this._editable.contains(selection.anchorNode))
                ? selection.toString().replace(/\s+/g, ' ').trim() : '';
            // Text shows the existing link's label, else the selection —
            // editable either way (typing it replaces the linked text). A
            // component reads its .nds-label (raw textContent carries the
            // markup's indentation).
            if (textInput) {
                if (asOpaque) textInput.value = '';
                else if (!target) textInput.value = selected;
                else if (asComponent) textInput.value = (target.querySelector('.nds-label') || target).textContent.trim();
                else textInput.value = target.textContent;
                textInput.closest('.nds-form-container').hidden = asOpaque;
            }
            if (urlInput) urlInput.value = existing?.getAttribute('href') || 'https://';
            if (externalInput) externalInput.checked = existing?.getAttribute('target') === '_blank';
            // Badge opt-out reads the target too (an unlinked button keeps the
            // stamp, so re-linking remembers it).
            const noExternalInput = menu.querySelector('[data-editor-link-noexternal]');
            if (noExternalInput) noExternalInput.checked = !!target?.hasAttribute('data-no-external');
            const coloredInput = menu.querySelector('[data-editor-link-colored]');
            if (coloredInput) {
                coloredInput.checked = !asComponent && !asOpaque && !!existing?.classList.contains('nds-primary');
                // On a component nds-primary is the VARIANT, not link color —
                // the checkbox would corrupt it, so it hides. Link color is
                // equally meaningless on an image wrapper.
                coloredInput.closest('.nds-form-container').hidden = asComponent || asOpaque;
            }
            if (unlinkBtn) unlinkBtn.hidden = !existing;
            if (urlInput) NDS.Form.clearStatus(urlInput.closest('.nds-form-container'));
            menu.querySelector('[data-dropmenu-primary]')?.removeAttribute('disabled');
            // After the dropmenu opens (next frame), select the URL for quick
            // overwrite — only if it's STILL open: a stale timer after a fast
            // unlink/cancel/confirm would steal focus AND the document
            // selection from whatever the user did next.
            setTimeout(() => { if (dropmenu.ndsDropmenu?.isOpen) urlInput?.select?.(); }, 60);
        }

        _confirmLink() {
            const dropmenu = this._root.querySelector('[data-editor-link-dropmenu]');
            const menu = this._getMenu(dropmenu);
            const url = cleanUrl((menu?.querySelector('[data-editor-link-url]')?.value || '').trim());
            const text = (menu?.querySelector('[data-editor-link-text]')?.value || '').trim();
            const external = !!menu?.querySelector('[data-editor-link-external]')?.checked;
            const noExternal = !!menu?.querySelector('[data-editor-link-noexternal]')?.checked;
            const colored = !!menu?.querySelector('[data-editor-link-colored]')?.checked;
            if (!url || url === 'https://' || !isSafeUrl(url)) {
                this._showFieldError(menu?.querySelector('[data-editor-link-url]'), strings.text('invalid_url'));
                return;
            }
            dropmenu?.ndsDropmenu?.close?.();

            this._editable.focus();
            // A stray re-entrant call (a fast double-click on Insert, or
            // Enter-in-field racing a click — data-no-auto-close keeps the
            // button live through an error) lands here after the first call
            // already consumed the saved selection: _restoreSelection()
            // returns null on that second call, and without this bail the
            // atom/existing-anchor lookups below go stale, falling through to
            // insertHTML and duplicating the link at whatever the DOM's
            // leftover caret happens to be. A saved selection to restore IS
            // the request — checked here, not via the dropmenu's isOpen,
            // since a delayed auto-close from an EARLIER, unrelated
            // dropmenu-item click (see nds-dropmenu.js's 100ms setTimeout)
            // can flip isOpen on this reused popover between two genuine uses.
            if (!this._restoreSelection()) return;
            const selection = window.getSelection();
            const { existing, atom, img, asComponent, asOpaque } = this._getLinkTarget();
            // Canon stamp: nds-link + nds-primary per the colored checkbox —
            // but never on a component (its classes ARE its identity) or an
            // image wrapper (text styling has nothing to color). target/rel
            // per the external checkbox (rel pairs every _blank against
            // tabnabbing; sanitize enforces the same).
            const setCanon = (anchor) => {
                if (!anchor) return;
                if (!asComponent && !asOpaque) {
                    anchor.classList.add('nds-link');
                    anchor.classList.toggle('nds-primary', colored);
                }
                if (external) anchor.setAttribute('target', '_blank');
                else { anchor.removeAttribute('target'); anchor.classList.remove('nds-external'); }
                anchor.setAttribute('rel', 'noopener noreferrer');
                // Badge opt-out: NDS.Link skips [data-no-external] on its
                // tagging pass (stamped before _syncLinks re-tags).
                if (noExternal) { anchor.setAttribute('data-no-external', ''); anchor.classList.remove('nds-external'); }
                else anchor.removeAttribute('data-no-external');
            };
            // Renaming retargets the .nds-label when the anchor wraps one
            // (converted buttons); a plain anchor replaces the linked text
            // wholesale (inline formatting goes).
            const setText = (el) => {
                if (!text) return;
                const label = el.querySelector('.nds-label');
                if (label) { if (text !== label.textContent) label.textContent = text; }
                else if (text !== el.textContent) el.textContent = text;
            };
            if (existing) {
                existing.setAttribute('href', url);
                setText(existing);
                setCanon(existing);
            } else if (atom) {
                // Whole-atom conversion: <button>/<span class="nds-tag…">… →
                // <a> with the same classes/attrs; type/disabled are
                // anchor-alien (sanitize re-stamps type if it ever pastes
                // back as a button).
                const anchor = convertTag(atom, 'a', ['type', 'disabled']);
                anchor.setAttribute('href', url);
                setText(anchor);
                setCanon(anchor);
            } else if (img) {
                // Link the component, not its img: climb textless nds-classed
                // shells (avatar…) and convert the outermost; a bare image
                // wraps instead — <img> itself can't become <a>.
                let shell = img;
                while (shell.parentElement && shell.parentElement !== this._editable
                    && hasNdsClass(shell.parentElement) && !shell.parentElement.textContent.trim()) {
                    shell = shell.parentElement;
                }
                let anchor;
                if (shell === img) {
                    anchor = document.createElement('a');
                    img.replaceWith(anchor);
                    anchor.appendChild(img);
                } else {
                    anchor = convertTag(shell, 'a', ['type', 'disabled']);
                }
                anchor.setAttribute('href', url);
                setCanon(anchor);
                // Re-select the image (the click-select shape) so follow-up
                // popover opens still see it.
                const range = document.createRange();
                range.selectNode(img);
                selection.removeAllRanges();
                selection.addRange(range);
            } else if (selection.rangeCount && !selection.isCollapsed
                && (!text || text === selection.toString().replace(/\s+/g, ' ').trim())) {
                // Unchanged text: createLink keeps inline formatting inside the selection.
                document.execCommand('createLink', false, url);
                setCanon(this._getAncestorTag('A'));
            } else {
                // Typed/changed text (or no selection): the anchor replaces the
                // selection whole — built complete so no post-insert lookup is needed.
                document.execCommand('insertHTML', false,
                    `<a class="nds-link${colored ? ' nds-primary' : ''}" href="${escapeHtml(url)}"${external ? ' target="_blank"' : ''}${noExternal ? ' data-no-external=""' : ''} rel="noopener noreferrer">${escapeHtml(text || url)}</a>`);
            }
            this._syncLinks();
            this._syncSource();
            this._syncToolbarState();
        }

        _unlink() {
            this._root.querySelector('[data-editor-link-dropmenu]')?.ndsDropmenu?.close?.();
            this._editable.focus();
            // Re-entrant guard — see _confirmLink.
            if (!this._restoreSelection()) return;
            const existing = this._getAncestorTag('A');
            // A component anchor reverts whole — execCommand('unlink') would
            // unwrap it and strand its children. nds-btn goes back to
            // <button>; other atoms re-root as <span> (identity lives in the
            // classes, not the tag).
            if (existing && isComponentAnchor(existing)) {
                const tag = existing.classList.contains('nds-btn') ? 'button' : 'span';
                const el = convertTag(existing, tag, ['href', 'target', 'rel']);
                el.classList.remove('nds-external'); // link-only stamp
                if (tag === 'button') el.setAttribute('type', 'button');
                this._syncSource();
                this._syncToolbarState();
                return;
            }
            // execCommand('unlink') needs a selection that intersects the
            // anchor — a collapsed caret inside the link no-ops. Select the
            // whole anchor first.
            if (existing) {
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(existing);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            document.execCommand('unlink');
            this._syncSource();
            this._syncToolbarState();
        }

        // Close without touching the document; hand focus and selection back.
        _cancelLink() {
            this._root.querySelector('[data-editor-link-dropmenu]')?.ndsDropmenu?.close?.();
            this._editable.focus();
            this._restoreSelection();
        }

        // ---------- Image popover ----------

        // Base64 embedding is the niche opt-in (demo docs, back-office, no
        // backend) — real deployments upload to a server or link out, so the
        // default popover is URL-only and pasted image FILES don't embed.
        // Opted in via setImageUpload({ uploadUrl: 'embed' }) — a reserved
        // sentinel that shares the container config with the server path.
        _isImageEmbedAllowed() { return this._getImageUploadUrl() === 'embed'; }

        _getImageUploadUrl() {
            const host = this._getImageUploadHost(); // read while the menu is open
            return host?.ndsUpload?.getConfig?.().uploadUrl || host?.dataset.uploadUrl || '';
        }

        // The upload affordance shows only when it leads somewhere real:
        // embed opted in, or an endpoint configured on the container
        // (live-read, so consumer JS can stamp NDS.Upload attrs any time
        // before the menu opens).
        _syncImageUploadVisibility() {
            const dropmenu = this._root.querySelector('[data-editor-image-dropmenu]');
            const menu = this._getMenu(dropmenu);
            const host = menu?.querySelector('[data-editor-image-upload]');
            if (!host) return;
            const show = !!this._getImageUploadUrl();
            host.style.display = show ? '' : 'none';
            const divider = menu.querySelector('[data-editor-image-or]');
            if (divider) divider.style.display = show ? '' : 'none';
        }

        // Public: forward NDS.Upload config (uploadUrl, autoUpload,
        // maxFileSize, allowedTypes…) to the image popover's upload container
        // as dataset keys — NDS.Upload reads them live. Value null/false
        // removes a key. Chainable.
        // uploadUrl: 'embed' is a reserved sentinel — files embed as data:image
        // URLs instead of POSTing. autoUpload is forced off in that mode so
        // NDS.Upload never sends an XHR to "/embed".
        setImageUpload(config = {}) {
            const host = this._getImageUploadHost();
            if (host) {
                for (const [key, value] of Object.entries(config)) {
                    if (value == null || value === false) delete host.dataset[key];
                    else host.dataset[key] = String(value);
                }
                // Effective-URL check, not just this call's keys — a later
                // setImageUpload({ autoUpload: true }) must not re-arm a POST
                // to "/embed" while the sentinel is in force.
                if (this._getImageUploadUrl() === 'embed') delete host.dataset.autoUpload;
                this._syncImageUploadVisibility();
            }
            return this;
        }

        // Markup twin of setImageUpload: data-editor-upload-{option} on the root,
        // the option in kebab case; `url` is uploadUrl.
        _readUploadAttributes() {
            const config = {};
            for (const { name, value } of this._root.attributes) {
                const match = /^data-editor-upload-(.+)$/.exec(name);
                if (match) config[match[1] === 'url' ? 'uploadUrl' : match[1].replace(/-(\w)/g, (_, letter) => letter.toUpperCase())] = value;
            }
            if (Object.keys(config).length) this.setImageUpload(config);
        }

        // Transient author-facing notice through the field's native forms
        // feedback (the editor root IS a form container).
        _showNotice(message) {
            NDS.Form.setStatus(this._root, 'neutral', { message });
            this._clearNotice ||= NDS.debounce(() => NDS.Form.clearStatus(this._root), 5000);
            this._clearNotice();
        }

        // Inline error on a popover field via the same forms mechanism; the
        // menu's primary (Insert) stays blocked until the error clears.
        _showFieldError(input, message) {
            const field = input?.closest('.nds-form-container');
            if (!field) return;
            NDS.Form.setStatus(field, 'error', { message });
            const primary = input.closest('.nds-dropmenu-menu')?.querySelector('[data-dropmenu-primary]');
            if (primary) primary.disabled = true;
        }

        // The "element is selected" shape the click-select handler (and
        // browsers, for images) produce: a one-node range over the element.
        _getSelectedNode() {
            const selection = window.getSelection();
            if (!selection.rangeCount) return null;
            const range = selection.getRangeAt(0);
            if (range.collapsed || range.startContainer !== range.endContainer
                || range.startContainer.nodeType !== Node.ELEMENT_NODE
                || range.endOffset - range.startOffset !== 1) return null;
            const node = range.startContainer.childNodes[range.startOffset];
            return (node && node.nodeType === Node.ELEMENT_NODE && this._editable.contains(node)) ? node : null;
        }

        _getSelectedImage() {
            const node = this._getSelectedNode();
            return node?.tagName === 'IMG' ? node : null;
        }

        _prepareImageMenu() {
            this._saveSelection();
            const dropmenu = this._root.querySelector('[data-editor-image-dropmenu]');
            if (!dropmenu) return;
            const menu = this._getMenu(dropmenu);
            const urlInput = menu.querySelector('[data-editor-image-url]');
            const altInput = menu.querySelector('[data-editor-image-alt]');
            // Fresh staging per open, BEFORE the prefill: clearing fires nds:upload:removed,
            // which resets a data: URL. A committed/abandoned chip never lingers.
            menu.querySelector('[data-editor-image-upload]')?.ndsUpload?.clearAllFiles?.();
            // A clicked (selected) image edits in place — url/alt prefill.
            const existing = this._getSelectedImage();
            if (urlInput) urlInput.value = existing?.getAttribute('src') || 'https://';
            if (altInput) altInput.value = existing?.getAttribute('alt') || '';
            const wInput = menu.querySelector('[data-editor-image-width]');
            const hInput = menu.querySelector('[data-editor-image-height]');
            if (wInput) wInput.value = existing?.getAttribute('width') || '';
            if (hInput) hInput.value = existing?.getAttribute('height') || '';
            if (urlInput) NDS.Form.clearStatus(urlInput.closest('.nds-form-container'));
            menu.querySelector('[data-dropmenu-primary]')?.removeAttribute('disabled');
            this._syncImageUploadVisibility();
            // Open-guarded like the link popover's — a stale timer would
            // steal focus and the document selection.
            setTimeout(() => { if (dropmenu.ndsDropmenu?.isOpen) urlInput?.select?.(); }, 60);
        }

        _confirmImage() {
            const dropmenu = this._root.querySelector('[data-editor-image-dropmenu]');
            const menu = this._getMenu(dropmenu);
            const url = cleanUrl((menu?.querySelector('[data-editor-image-url]')?.value || '').trim());
            const alt = (menu?.querySelector('[data-editor-image-alt]')?.value || '').trim();
            // Dims are the numeric width/height ATTRIBUTES (aspect + CLS);
            // empty/invalid = natural size.
            const width = parseInt(menu?.querySelector('[data-editor-image-width]')?.value, 10) || 0;
            const height = parseInt(menu?.querySelector('[data-editor-image-height]')?.value, 10) || 0;
            // 'https://' alone is the untouched placeholder, not a URL; data:
            // srcs are embed-mode only.
            if (!url || url === 'https://' || !isSafeSrc(url)
                || (url.startsWith('data:') && !this._isImageEmbedAllowed())) {
                // A picked file that gave no URL is the problem, not the link field.
                const file = this._getImageUploadHost()?.ndsUpload?.getAllFiles?.()[0];
                const message = !file || file.status === 'complete' ? 'invalid_image_url'
                    : file.status === 'error' ? 'upload_failed' : 'upload_pending';
                this._showFieldError(menu?.querySelector('[data-editor-image-url]'), strings.text(message));
                return;
            }
            dropmenu?.ndsDropmenu?.close?.();
            // Committed — the staging chip's job is done.
            menu?.querySelector('[data-editor-image-upload]')?.ndsUpload?.clearAllFiles?.();
            this._editable.focus();
            // Re-entrant guard — see _confirmLink.
            if (!this._restoreSelection()) return;
            const existing = this._getSelectedImage();
            if (existing) {
                existing.setAttribute('src', url);
                existing.setAttribute('alt', alt);
                width > 0 ? existing.setAttribute('width', width) : existing.removeAttribute('width');
                height > 0 ? existing.setAttribute('height', height) : existing.removeAttribute('height');
                this._syncSource();
                this._syncToolbarState();
            } else {
                this._insertImage(url, alt, width, height);
            }
        }

        _cancelImage() {
            this._root.querySelector('[data-editor-image-dropmenu]')?.ndsDropmenu?.close?.();
            this._editable.focus();
            this._restoreSelection();
        }

        // Inline <img> at the caret — popover confirm and pasted clipboard
        // image files both land here.
        _insertImage(src, alt, width, height) {
            this._editable.focus();
            document.execCommand('insertHTML', false,
                `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"`
                + `${width > 0 ? ` width="${width}"` : ''}${height > 0 ? ` height="${height}"` : ''}>`);
            this._syncSource();
            this._syncToolbarState();
        }

        // A fresh line at the end (or the existing trailing empty paragraph),
        // caret in it. Trailing empty paragraphs never reach the form value, so
        // caret-escape clicks don't dirty the field.
        _placeCaretAtEnd() {
            const last = this._editable.lastElementChild;
            const selection = window.getSelection();
            this._editable.focus();
            const range = document.createRange();
            if (last && last.tagName === 'P' && !last.textContent.trim()) {
                range.selectNodeContents(last);
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
                return;
            }
            // Build the fresh line structurally instead of collapsing to the
            // document end and calling execCommand('insertParagraph') — when
            // the trailing content is an inline atom (button, tag…), native
            // splitting there corrupts it the same way Enter would (guarded
            // for Enter by _guardRegionEnter; this click path has no caret to
            // guard, so it never even reaches the atom check).
            const paragraph = document.createElement('p');
            paragraph.innerHTML = '<br>';
            this._editable.appendChild(paragraph);
            range.selectNodeContents(paragraph);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            this._syncSource();
        }

        // ---------- Toolbar state ----------

        _scheduleToolbarSync() {
            if (this._rafId) return;
            this._rafId = requestAnimationFrame(() => {
                this._rafId = 0;
                const selection = window.getSelection();
                // The remove gate must react to the selection LEAVING the
                // editable too — a stale enabled state would let the picker
                // target whatever the outside selection sits in. Same for the
                // selected-component marker.
                this._syncRemoveState();
                this._syncSelectedMark();
                if (!selection.rangeCount) return;
                if (!this._editable.contains(selection.anchorNode)) return;
                this._syncToolbarState();
            });
        }

        // Selected/active-component feedback: a click-selected component
        // marks itself; a caret INSIDE a component marks the innermost
        // removable level — the same component the remove command targets
        // first, so the ring doubles as remove-is-armed feedback. CSS draws
        // the system focus ring on the marker (the native ::selection wash
        // only paints text runs — textless atoms would show nothing). The
        // marker never reaches the value: _syncSource re-sanitizes, which
        // drops it.
        _syncSelectedMark() {
            const picked = this._getSelectedNode();
            let next = null;
            if (picked && (picked.tagName === 'BUTTON' || hasNdsClass(picked))) next = picked;
            else {
                const node = this._getComponentCaretNode();
                next = node ? (this._removeLevels(node)[0] || null) : null;
                // A bare content image rings like a component — the selection
                // wash alone can vanish against the image.
                if (!next && picked?.tagName === 'IMG') next = picked;
            }
            if (next === this._selectedMark) return;
            this._selectedMark?.removeAttribute('data-editor-selected');
            next?.setAttribute('data-editor-selected', '');
            this._selectedMark = next;
        }

        _syncToolbarState() {
            this._syncRemoveState();
            const block = this._getBlockContext();
            const blockTag = block ? block.tagName : null;
            const inList = (block && block.tagName === 'LI') ? block.closest('ul,ol')?.tagName : null;
            const cell = this._findSelectionAncestor(node => node.tagName === 'TD' || node.tagName === 'TH');
            const cellHead = cell && findColumnHead(cell);
            // Heading/list/formatting buttons grey out inside an atom — same
            // reason _runCommand refuses them there. A separate pass since
            // it covers 'clear' too, which (like undo/redo) carries no
            // aria-pressed and skips the loop below.
            // Must not re-enable a disabled/readonly surface's buttons.
            const locked = !!this._findLinkableAtom() || this._editable.getAttribute('contenteditable') !== 'true';
            for (const btn of this._buttons) {
                if (atomLockedCommands.has(btn.dataset.cmd)) btn.disabled = locked;
            }

            for (const btn of this._buttons) {
                // Only toggle commands carry aria-pressed in markup; action
                // buttons (undo/redo/clear) are momentary and stay untouched.
                if (!btn.hasAttribute('aria-pressed')) continue;
                const command = btn.dataset.cmd;
                let pressed = false;
                if (command === 'bold')           pressed = this._queryStateSafely('bold');
                else if (command === 'italic')    pressed = this._queryStateSafely('italic');
                else if (command === 'underline') pressed = this._queryStateSafely('underline');
                else if (command === 'strike')    pressed = this._queryStateSafely('strikeThrough');
                else if (command === 'link')      pressed = !!this._getAncestorTag('A');
                else if (command === 'image')     pressed = !!this._getSelectedImage();
                else if (commandBlocks[command]) pressed = blockTag === commandBlocks[command];
                else if (command === 'ul')        pressed = inList === 'UL';
                else if (command === 'ol')        pressed = inList === 'OL';
                else if (command.startsWith('align-')) {
                    pressed = cell ? !!cellHead && getPhysicalAlign(cellHead) === command.slice(6)
                        : block?.style.textAlign === command.slice(6);
                }
                else if (command.startsWith('dir-')) pressed = block?.getAttribute('dir') === command.slice(4);
                btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
            }
        }

        _queryStateSafely(name) {
            try { return document.queryCommandState(name); } catch { return false; }
        }

        // ---------- Form value sync ----------

        // Loose top-level text / inline nodes (from a value the author wrote
        // as bare text — no <p> wrapper) can't take a block command:
        // _getBlockContext walks up looking for a blockTags ancestor and
        // hits the editable root, so alignment / dir / heading all no-op.
        // Wrap each run of loose siblings into a <p> after every hydrate.
        _normalizeLooseBlocks() {
            let group = null;
            const flush = () => {
                if (!group) return;
                const paragraph = document.createElement('p');
                this._editable.insertBefore(paragraph, group[0]);
                for (const node of group) paragraph.appendChild(node);
                group = null;
            };
            for (const node of Array.from(this._editable.childNodes)) {
                const isText = node.nodeType === Node.TEXT_NODE && node.textContent.trim();
                const isInline = node.nodeType === Node.ELEMENT_NODE && isInlineNode(node);
                if (isText || isInline) (group ||= []).push(node);
                else flush();
            }
            flush();
        }

        // A block element (table, card, figure…) as the document's last node
        // traps the caret — there is nowhere to click/arrow to continue after
        // it. Keep an empty paragraph after any trailing block.
        _ensureTrailingParagraph() {
            const last = this._editable.lastElementChild;
            if (!last || FLOW_EXIT_TAGS.test(last.tagName)) return;
            const paragraph = document.createElement('p');
            paragraph.innerHTML = '<br>';
            this._editable.appendChild(paragraph);
        }

        _syncSource(coalesce = false) {
            this._ensureTrailingParagraph();
            const empty = isEffectivelyEmpty(this._editable);
            this._editable.classList.toggle('is-empty', empty);
            const next = empty
                ? ''
                // ponytail: full sanitize+rebuild per input keeps the value canonical; debounce if profiling ever flags it.
                : formatHtml(sanitizeHtml(this._editable.innerHTML))
                    // The trailing caret-escape paragraph is an editing
                    // affordance, not content — it stays out of the value.
                    .replace(/\n?<p><br><\/p>$/, '');
            this._synced = next;
            if (this.source.value === next) return;
            NDS.setValue(this.source, next, { change: false });
            this._pushHistory(coalesce);
        }
    }

    // ---------- Init sweep + export ----------

    function setupEditors() {
        document.querySelectorAll('.nds-editor').forEach(el => {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-editor-initialized')) return;
            new NdsEditor(el);
        });
    }

    NDS.Editor = {
        init: setupEditors,
        reinit: setupEditors,
        // Construction fails (missing required elements) → null, never a
        // dud instance whose every method throws.
        create: (element) => {
            if (element.ndsEditor) return element.ndsEditor;
            const instance = new NdsEditor(element);
            return instance._valid ? instance : null;
        },
        destroy: (element) => element.ndsEditor?.destroy(),
        _sanitize: sanitizeHtml // dev/test hook — the full interpret+enforce pipeline, consumed by scripts/editor-fixtures.mjs
    };
})();
