/* NDS.Code — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Code.init()                          highlight every `.nds-code code` and size the
 *                                            action-bar buttons
 *   NDS.Code.reprocessCodeElement(codeEl)    re-highlight one block after you replaced its
 *                                            text
 *   NDS.Code.detectLanguage(codeEl, source)  the language it would use for that block
 * Events:
 *   (none)
 * Hooks:
 *   (none — the language comes from a `lang-*` or `language-*` class on the <code>)
 * Gotchas:
 *   - It lexes HTML, CSS, JavaScript (including CSS and JS embedded in an HTML block) and
 *     Markdown. A language class it does not know renders as plain text.
 *   - Only a block with NO language class at all is sniffed.
 *   - There is no reinit(): a block is highlighted once. Call reprocessCodeElement() after
 *     you change its content.
 *   - The copy button in the action bar belongs to nds-copy (.nds-copy), not to this file.
 */
/**
 * National Design System - Code Processing JavaScript
 * Syntax highlighting + line numbers for documentation code blocks.
 *
 * Pipeline (one pass, one innerHTML write per block):
 *   source text -> lex(lang) -> Token[] -> split into lines -> render
 *
 * A Token is { type, value }: `type` is a syntax class suffix ('tag', 'attr',
 * 'value', 'comment', 'property', 'selector', 'keyword', 'string', 'template',
 * 'number', 'literal', 'builtin') or null for plain text. `value` is the RAW
 * (un-escaped) substring — escaping happens exactly once, at render. Working in
 * tokens (not HTML strings) lets line-numbering split at token boundaries, so a
 * span can never straddle a line, and lets the HTML lexer splice CSS/JS tokens
 * for embedded <style>/<script> bodies.
 *
 * Languages: HTML, CSS, JavaScript (+ CSS/JS embedded inside an HTML block),
 * Markdown.
 * Language is taken from a `lang-*`/`language-*` class when present; a class we
 * don't lex renders plain, and only a block with no lang class at all is sniffed.
 *
 * Rides the extras bundle, so this lands AFTER the page reveal. It must stay
 * geometry-neutral: the line-number gutter is reserved by _code.scss with no JS
 * (see its `code` rule), and inline code is coloured entirely in CSS from its
 * authored lang class. All this adds is token colour and the line digits.
 */

(function() {
    'use strict';

    // ==============================================
    // INITIALIZATION
    // ==============================================

    // Every .code-example is a tab panel inside .nds-code, so one query covers both.
    function initializeCodeProcessing() {
        document.querySelectorAll('.nds-code code').forEach(processCodeElement);
        sizeActionButtons();
    }

    // The action bar's button is component chrome, not content: a 32px icon
    // square. Stamped here rather than required in markup, so every block that
    // already ships gets it. A button carrying a visible label is left alone —
    // nds-icon-only would hide that label (and nds-copy's "Copied" swap with it).
    function sizeActionButtons() {
        document.querySelectorAll('.nds-code-action .nds-btn').forEach(function(button) {
            if (!button.querySelector('.nds-label')) {
                button.classList.add('nds-icon-only', 'nds-md');
            }
        });
    }

    function processCodeElement(codeElement) {
        if (codeElement.dataset.ndsCodeProcessed === 'true') return;

        const source = getSourceText(codeElement);
        const lang = detectLanguage(codeElement, source);
        const tokens = lexByLanguage(lang, source);
        const lines = splitTokensIntoLines(tokens);

        if (lines.length === 0) {
            codeElement.dataset.ndsCodeProcessed = 'true';
            return;
        }

        let html = '';
        for (let i = 0; i < lines.length; i++) {
            html += '<span class="nds-code-line">' + renderTokens(lines[i]) + '</span>\n';
        }
        codeElement.innerHTML = html.trim();
        labelLanguage(codeElement, lang);
        codeElement.dataset.ndsCodeProcessed = 'true';
    }

    // ==============================================
    // LANGUAGE LABEL
    // ==============================================

    // Casing the class name can't give us.
    const LANG_LABELS = {
        html: 'HTML', css: 'CSS', scss: 'SCSS', js: 'JavaScript', javascript: 'JavaScript',
        json: 'JSON', yaml: 'YAML', yml: 'YAML', md: 'Markdown', php: 'PHP', sql: 'SQL'
    };

    // Name the block from the class the author wrote, so the label can't drift
    // from the highlighting — and so a language we don't lex (bash, json) still
    // labels correctly. Absolutely positioned in the block's top corner, so the
    // late-loading label costs no layout. Tabbed blocks already name their
    // languages on the tabs, and a sniffed block is a guess we won't print.
    function labelLanguage(codeElement, detected) {
        const wrapper = codeElement.closest('.nds-code');
        if (!wrapper) return;

        // Inside tabs the panel is the anchor — the wrapper's top strip belongs
        // to the tab list. Panels are positioned against .nds-tab-content, the
        // same box the action bar uses, so both land on one strip.
        const panel = codeElement.closest('.nds-tab-panel');
        const host = panel || wrapper;
        // Re-init stamps once; an authored .nds-code-lang (e.g. inside a
        // .nds-code-tags strip with extra badges) suppresses the stamp too.
        if (host.querySelector('.nds-code-lang')) return;

        // The authored class names it; with no class, the sniffed language does.
        const authored = /\blang(?:uage)?-([\w-]+)/.exec(codeElement.className);
        const name = (authored ? authored[1] : detected).toLowerCase();
        const labelText = LANG_LABELS[name] || name.charAt(0).toUpperCase() + name.slice(1);

        // The lang class rides along: it is how the tag knows whether the block
        // has a gutter to clear (see $prose-langs in _code.scss).
        const tag = document.createElement('span');
        tag.className = 'nds-tag nds-gray nds-xs nds-code-lang lang-' + name;
        const text = document.createElement('span');
        text.className = 'nds-label';
        text.textContent = labelText;
        tag.appendChild(text);
        host.insertBefore(tag, host.firstChild);
    }

    // Re-lex in place. No source snapshot is kept: highlighting preserves
    // textContent (bar the leading newline and trailing blanks getSourceText and
    // splitTokensIntoLines already drop), so re-reading it is idempotent.
    function reprocessCodeElement(codeElement) {
        codeElement.dataset.ndsCodeProcessed = 'false';
        processCodeElement(codeElement);
    }

    // ==============================================
    // SOURCE EXTRACTION
    // ==============================================

    // The authored corpus is entity-escaped (`&lt;…&gt;`), so textContent already
    // holds the decoded source with the author's indentation — no reparse needed.
    // Strip one leading newline (the <code> tag sits on its own line).
    //
    // ponytail: this strip (plus the trailing-blank pop in splitTokensIntoLines)
    // makes the highlighted block SHORTER than the pre-highlight paint — ~100px on
    // a long block, since `white-space: pre` renders whitespace we then discard.
    // Harmless today: init rides extras and lands ~1s post-reveal, by which point
    // the blocks are off-screen, so measured CLS is 0.0000-0.0055. The real fix is
    // normalizing the authored whitespace (388 of 421 blocks open with a newline
    // and/or close on an indented line) so both strips become no-ops.
    function getSourceText(codeElement) {
        const text = codeElement.textContent;
        return text.charCodeAt(0) === 10 ? text.slice(1) : text;
    }

    // ==============================================
    // LANGUAGE DETECTION
    // ==============================================

    function languageFromClass(className) {
        if (/\blang(?:uage)?-html\b/.test(className)) return 'html';
        if (/\blang(?:uage)?-css\b/.test(className)) return 'css';
        if (/\blang(?:uage)?-(?:javascript|js)\b/.test(className)) return 'javascript';
        if (/\blang(?:uage)?-(?:markdown|md)\b/.test(className)) return 'markdown';
        if (/\blang(?:uage)?-prompt\b/.test(className)) return 'prompt';
        return null;
    }

    // Class wins (explicit override, back-compat); a class we don't lex renders
    // plain rather than being guessed at; only a block with NO lang class at all
    // falls through to content sniffing. Returns null for "plain, don't lex".
    function detectLanguage(codeElement, source) {
        const byClass = languageFromClass(codeElement.className);
        if (byClass) return byClass;
        if (/\blang(?:uage)?-[\w-]+/.test(codeElement.className)) return null;
        const text = source != null ? source : codeElement.textContent;
        return sniffLanguage(text);
    }

    function sniffLanguage(source) {
        const s = source.trim();
        if (s === '' || s[0] === '<') return 'html';
        // JS first — an object/array literal would otherwise read as a CSS block.
        if (/\b(?:function|const|let|var|import|export)\b|=>|console\.|document\.|window\./.test(s)) {
            return 'javascript';
        }
        // CSS — a `selector { … : … }` rule or a bare `prop: value;` declaration.
        if (/[.#:\[\]\w-]+\s*\{[\s\S]*:/.test(s) || /^[\w-]+\s*:\s*[^;{}]+;/.test(s)) return 'css';
        return 'html';
    }

    function lexByLanguage(lang, source) {
        if (lang === 'html') return lexHtml(source);
        if (lang === 'css') return lexCss(source);
        if (lang === 'javascript') return lexJs(source);
        if (lang === 'markdown') return lexMarkdown(source);
        if (lang === 'prompt') return lexPrompt(source);
        return [{ type: null, value: source }];
    }

    // ==============================================
    // RENDER + LINE SPLITTING (shared by all languages)
    // ==============================================

    function renderTokens(tokens) {
        let html = '';
        for (let i = 0; i < tokens.length; i++) {
            const t = tokens[i];
            const esc = NDS.escapeHtml(t.value);
            html += t.type ? '<span class="nds-syntax-' + t.type + '">' + esc + '</span>' : esc;
        }
        return html;
    }

    // Split a flat token stream into per-line token arrays. Any token that spans a
    // newline is broken at the '\n', so a syntax span never crosses a line — this
    // is what removes the old "value can't span a newline" lexer constraint.
    function splitTokensIntoLines(tokens) {
        const lines = [[]];
        for (let i = 0; i < tokens.length; i++) {
            const t = tokens[i];
            if (t.value.indexOf('\n') === -1) {
                if (t.value !== '') lines[lines.length - 1].push(t);
                continue;
            }
            const parts = t.value.split('\n');
            for (let p = 0; p < parts.length; p++) {
                if (p > 0) lines.push([]);
                if (parts[p] !== '') lines[lines.length - 1].push({ type: t.type, value: parts[p] });
            }
        }
        // Drop trailing blank lines (indentation before the closing </code>).
        while (lines.length > 0 && lineIsBlank(lines[lines.length - 1])) lines.pop();
        return lines;
    }

    function lineIsBlank(lineTokens) {
        for (let i = 0; i < lineTokens.length; i++) {
            if (lineTokens[i].value.trim() !== '') return false;
        }
        return true;
    }

    // ==============================================
    // HTML LEXER (delegates <style>/<script> bodies to CSS/JS)
    // ==============================================

    // Tags whose body is a foreign language. Lower-cased tag name -> sub-lexer key.
    const EMBEDDED_LANG = { style: 'css', script: 'javascript' };

    function lexHtml(source) {
        const tokens = [];
        const len = source.length;
        let i = 0;

        while (i < len) {
            const open = source.indexOf('<', i);
            if (open === -1) {
                tokens.push({ type: null, value: source.slice(i) });
                break;
            }
            if (open > i) tokens.push({ type: null, value: source.slice(i, open) });

            // HTML comment — consume through `-->` (which may itself contain `>`).
            if (source.startsWith('<!--', open)) {
                const close = source.indexOf('-->', open + 4);
                const end = close === -1 ? len : close + 3;
                tokens.push({ type: 'comment', value: source.slice(open, end) });
                i = end;
                continue;
            }

            const tagEnd = source.indexOf('>', open);
            if (tagEnd === -1) {
                tokens.push({ type: null, value: source.slice(open) });
                break;
            }
            const tagText = source.slice(open, tagEnd + 1);
            lexHtmlTag(tagText, tokens);
            i = tagEnd + 1;

            // <style>/<script>: splice the body's CSS/JS tokens, then let the loop
            // pick up the closing tag as an ordinary tag on its next pass.
            const name = /^<([a-zA-Z][a-zA-Z0-9-]*)/.exec(tagText);
            const sub = name && EMBEDDED_LANG[name[1].toLowerCase()];
            if (sub && tagText.charAt(tagText.length - 2) !== '/') {
                const rel = source.slice(i).search(new RegExp('</' + name[1] + '\\s*>', 'i'));
                const bodyEnd = rel === -1 ? len : i + rel;
                const body = source.slice(i, bodyEnd);
                if (body) {
                    const subTokens = sub === 'css' ? lexCss(body) : lexJs(body);
                    for (let k = 0; k < subTokens.length; k++) tokens.push(subTokens[k]);
                }
                i = bodyEnd;
            }
        }

        return tokens;
    }

    // Lex a single `<…>` tag into tokens: the `<`/`</`/`>` punctuation stays plain,
    // the tag name is `tag`, attribute names are `attr`, quoted values are `value`.
    function lexHtmlTag(tag, tokens) {
        const close = tag.charAt(1) === '/';
        const prefixEnd = close ? 2 : 1;
        tokens.push({ type: null, value: tag.slice(0, prefixEnd) });

        let i = prefixEnd;
        const name = /^[a-zA-Z][a-zA-Z0-9-]*/.exec(tag.slice(i));
        if (name) {
            tokens.push({ type: 'tag', value: name[0] });
            i += name[0].length;
        }

        let buffer = '';
        const flush = function() {
            if (buffer) { tokens.push({ type: null, value: buffer }); buffer = ''; }
        };

        while (i < tag.length) {
            const ch = tag.charAt(i);

            // Quoted attribute value.
            if (ch === '"' || ch === "'") {
                flush();
                const q = tag.indexOf(ch, i + 1);
                const end = q === -1 ? tag.length : q + 1;
                tokens.push({ type: 'value', value: tag.slice(i, end) });
                i = end;
                continue;
            }

            // Attribute name: a word that follows whitespace and is bounded by
            // `=`, whitespace, `/`, `>` or end (covers both valued and boolean attrs).
            // `i` is always past the tag name here, so the prev char always exists.
            if (/[a-zA-Z]/.test(ch) && /\s/.test(tag.charAt(i - 1))) {
                const attr = /^[a-zA-Z][a-zA-Z0-9-]*/.exec(tag.slice(i));
                if (attr) {
                    const after = tag.charAt(i + attr[0].length);
                    if (after === '' || after === '=' || /[\s/>]/.test(after)) {
                        flush();
                        tokens.push({ type: 'attr', value: attr[0] });
                        i += attr[0].length;
                        continue;
                    }
                }
            }

            buffer += ch;
            i++;
        }
        flush();
    }

    // ==============================================
    // CSS LEXER (state machine — selector <-> declaration context)
    // ==============================================
    //
    // Walking contexts (not lines) highlights single-line rules
    // (`a { color: red; }`) and multi-line rules identically, and keeps `#hex`
    // inside the value context so it can't be misread as an `#id` selector.

    // At-rules whose `{ }` body holds nested rules, not declarations.
    const CSS_GROUP_AT_RULE = /^@(?:media|supports|container|layer|scope|document)\b/i;

    function lexCss(source) {
        const tokens = [];
        const n = source.length;
        let i = 0;
        // Block kinds we're nested in: 'decl' = declaration block, 'rules' = a
        // group at-rule body. Top level (empty stack) holds rules.
        const blockStack = [];

        while (i < n) {
            const ch = source.charAt(i);

            // Comment anywhere (may span lines; split-into-lines breaks it safely).
            if (ch === '/' && source.charAt(i + 1) === '*') {
                const end = source.indexOf('*/', i + 2);
                const stop = end === -1 ? n : end + 2;
                tokens.push({ type: 'comment', value: source.slice(i, stop) });
                i = stop;
                continue;
            }

            // Close the current block.
            if (ch === '}') {
                tokens.push({ type: null, value: '}' });
                blockStack.pop();
                i++;
                continue;
            }

            if (blockStack[blockStack.length - 1] === 'decl') {
                const j = scanCss(source, i, ':;{}');
                const d = source.charAt(j);
                if (d === ':') {
                    emitCssRun(tokens, source, i, j, 'property');
                    tokens.push({ type: null, value: ':' });
                    const k = scanCss(source, j + 1, ';}'); // value up to ';' or block end
                    emitCssRun(tokens, source, j + 1, k, 'value');
                    i = k;
                    if (source.charAt(i) === ';') { tokens.push({ type: null, value: ';' }); i++; }
                } else if (d === '{') {
                    // Nested rule (CSS nesting) — the run before '{' is its selector.
                    emitCssRun(tokens, source, i, j, 'selector');
                    tokens.push({ type: null, value: '{' });
                    blockStack.push(CSS_GROUP_AT_RULE.test(source.slice(i, j).trim()) ? 'rules' : 'decl');
                    i = j + 1;
                } else {
                    // ';' (stray), '}' (handled next loop), comment-open, or end.
                    emitCssRun(tokens, source, i, j, null);
                    i = j;
                    if (source.charAt(i) === ';') { tokens.push({ type: null, value: ';' }); i++; }
                }
                continue;
            }

            // Rule context: selector / at-rule prelude up to '{' or statement ';'.
            const j = scanCss(source, i, '{};');
            const delim = source.charAt(j);
            emitCssRun(tokens, source, i, j, delim === '' ? null : 'selector');
            if (delim === '{') {
                tokens.push({ type: null, value: '{' });
                blockStack.push(CSS_GROUP_AT_RULE.test(source.slice(i, j).trim()) ? 'rules' : 'decl');
                i = j + 1;
            } else if (delim === ';') {
                tokens.push({ type: null, value: ';' }); // at-rule statement (@import, @charset, …)
                i = j + 1;
            } else {
                i = j; // comment-open or end of source
            }
        }

        return tokens;
    }

    // Index of the next char in `stops`, the next comment-open, or end of source.
    function scanCss(source, from, stops) {
        const n = source.length;
        let j = from;
        while (j < n) {
            const c = source.charAt(j);
            if (stops.indexOf(c) !== -1 || (c === '/' && source.charAt(j + 1) === '*')) break;
            j++;
        }
        return j;
    }

    // Emit source[from,to) as `type`, keeping surrounding whitespace as plain
    // tokens so colored spans hug their text (and newlines stay in plain runs).
    // A `selector` run is sub-tokenized for readability (classes vs attributes vs
    // pseudo-classes get distinct colors); at-rule preludes (`@…`) are left whole.
    function emitCssRun(tokens, source, from, to, type) {
        let a = from, b = to;
        while (a < b && isWhitespace(source.charAt(a))) a++;
        while (b > a && isWhitespace(source.charAt(b - 1))) b--;
        if (a > from) tokens.push({ type: null, value: source.slice(from, a) });
        if (b > a) {
            const text = source.slice(a, b);
            if (type === 'selector' && text.charAt(0) !== '@') {
                pushSelectorTokens(tokens, text);
            } else {
                tokens.push({ type: type, value: text });
            }
        }
        if (to > b) tokens.push({ type: null, value: source.slice(b, to) });
    }

    // Split a selector into readable sub-tokens: attribute selectors -> 'attr',
    // pseudo-class/element -> 'keyword', class/id/tag names -> 'selector',
    // combinators/commas/parens/`*` -> plain. Values round-trip to the input.
    function pushSelectorTokens(tokens, text) {
        const n = text.length;
        let i = 0;
        while (i < n) {
            const ch = text.charAt(i);
            if (ch === '[') {                                   // attribute selector
                const close = text.indexOf(']', i + 1);
                const end = close === -1 ? n : close + 1;
                tokens.push({ type: 'attr', value: text.slice(i, end) });
                i = end;
            } else if (ch === ':') {                            // pseudo-class / element
                let j = i + 1;
                if (text.charAt(j) === ':') j++;
                const m = /^[a-zA-Z-]+/.exec(text.slice(j));
                const end = m ? j + m[0].length : j;
                tokens.push({ type: 'keyword', value: text.slice(i, end) });
                i = end;
            } else if (ch === '.' || ch === '#') {              // class / id
                const m = /^[\w-]+/.exec(text.slice(i + 1));
                const end = m ? i + 1 + m[0].length : i + 1;
                tokens.push({ type: 'selector', value: text.slice(i, end) });
                i = end;
            } else if (/[a-zA-Z]/.test(ch)) {                   // tag / element name
                const m = /^[\w-]+/.exec(text.slice(i));
                tokens.push({ type: 'selector', value: m[0] });
                i += m[0].length;
            } else {                                            // combinators, commas, *, ( ), whitespace
                let j = i + 1;
                while (j < n && '[:.#'.indexOf(text.charAt(j)) === -1 && !/[a-zA-Z]/.test(text.charAt(j))) j++;
                tokens.push({ type: null, value: text.slice(i, j) });
                i = j;
            }
        }
    }

    function isWhitespace(c) {
        return c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\f';
    }

    // ==============================================
    // REGEX LEXER (shared by JavaScript and Markdown)
    // ==============================================

    // Scan a master regex left to right; each alternative is one capture group,
    // and groupTypes[g] is the token type for group g. Gaps between matches are
    // plain text, so the token values always round-trip to the source.
    function lexByRegex(source, re, groupTypes) {
        const tokens = [];
        let last = 0;
        let m;
        re.lastIndex = 0;
        while ((m = re.exec(source)) !== null) {
            if (m.index > last) tokens.push({ type: null, value: source.slice(last, m.index) });
            let type = null;
            for (let g = 1; g < groupTypes.length; g++) {
                if (m[g] !== undefined) { type = groupTypes[g]; break; }
            }
            tokens.push({ type: type, value: m[0] });
            last = re.lastIndex;
            if (m.index === re.lastIndex) re.lastIndex++; // zero-length guard
        }
        if (last < source.length) tokens.push({ type: null, value: source.slice(last) });
        return tokens;
    }

    // ==============================================
    // JAVASCRIPT LEXER
    // ==============================================

    // One master regex, scanned left to right. Alternatives are ordered by
    // priority (a keyword inside a string is swallowed by the string branch since
    // exec jumps past the whole match). Gaps between matches are plain text.
    const JS_TOKEN_RE = new RegExp(
        '(\\/\\/[^\\n]*)' +                                       // 1 line comment
        '|(\\/\\*[\\s\\S]*?\\*\\/)' +                             // 2 block comment
        '|(`(?:\\\\.|[^`\\\\])*`)' +                              // 3 template literal
        '|("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')' +     // 4 string
        '|(\\b\\d+\\.?\\d*(?:[eE][+-]?\\d+)?\\b)' +               // 5 number
        // (?<!\.) so a member property named like a word token (`.catch`,
        // `.finally`, `x.Promise`) stays plain instead of coloring as the token.
        '|(?<!\\.)\\b(const|let|var|function|if|else|for|while|return|break|continue|switch|case|default|try|catch|finally|throw|class|extends|import|export|await|async|new|typeof|instanceof|in|of|delete|void|this|super)\\b' + // 6 keyword
        '|(?<!\\.)\\b(true|false|null|undefined|NaN|Infinity)\\b' + // 7 literal
        '|(?<!\\.)\\b(console|window|document|Array|Object|String|Number|Boolean|Math|JSON|Date|Promise|Set|Map)\\b', // 8 builtin
        'g'
    );

    const JS_GROUP_TYPE = [null, 'comment', 'comment', 'template', 'string', 'number', 'keyword', 'literal', 'builtin'];

    function lexJs(source) {
        return lexByRegex(source, JS_TOKEN_RE, JS_GROUP_TYPE);
    }

    // ==============================================
    // MARKDOWN LEXER
    // ==============================================

    // Block constructs are line-anchored (`m` flag), inline ones are not. Earlier
    // alternatives win at the same position, so a heading colours whole-line and
    // inline code inside bold reads as bold. Types reuse the shared syntax
    // palette — no markdown-specific CSS.
    const MD_TOKEN_RE = new RegExp(
        '(^```+[^\\n]*\\n[\\s\\S]*?^```+[ \\t]*$)' + // 1 fenced code block
        '|(^#{1,6} [^\\n]*)' +                       // 2 heading
        '|(^[ \\t]*>[ \\t]?)' +                      // 3 blockquote marker
        '|(^[ \\t]*(?:[-*+]|\\d+[.)]) )' +           // 4 list marker
        '|(!?\\[[^\\]\\n]*\\]\\([^)\\n]*\\))' +      // 5 link / image
        '|(\\*\\*[^\\n]+?\\*\\*|__[^\\n]+?__)' +     // 6 bold
        '|(`[^`\\n]+`)',                             // 7 inline code
        'gm'
    );

    // 'fence' is a sentinel — lexMarkdown expands it, it never reaches render.
    const MD_GROUP_TYPE = [null, 'fence', 'tag', 'attr', 'attr', 'property', 'keyword', 'string'];

    function lexMarkdown(source) {
        const tokens = [];
        const scanned = lexByRegex(source, MD_TOKEN_RE, MD_GROUP_TYPE);
        for (let i = 0; i < scanned.length; i++) {
            if (scanned[i].type === 'fence') pushFenceTokens(tokens, scanned[i].value);
            else tokens.push(scanned[i]);
        }
        return tokens;
    }

    // ```lang … ``` — the fence lines stay code-coloured and the body is spliced
    // from its own lexer, mirroring <style>/<script> bodies in the HTML lexer. An
    // info string we don't lex (```bash) leaves the body a flat code run.
    function pushFenceTokens(tokens, value) {
        const m = /^(```+[^\n]*\n)([\s\S]*)(\n```+[ \t]*)$/.exec(value);
        if (!m) {
            tokens.push({ type: 'string', value: value });
            return;
        }
        const lang = languageFromClass('lang-' + m[1].replace(/`/g, '').trim());
        const body = lang ? lexByLanguage(lang, m[2]) : [{ type: 'string', value: m[2] }];
        tokens.push({ type: 'string', value: m[1] });
        for (let i = 0; i < body.length; i++) tokens.push(body[i]);
        tokens.push({ type: 'string', value: m[3] });
    }

    // ==============================================
    // PROMPT LEXER
    // ==============================================

    // An agent prompt is prose, so markdown lexing leaves it flat. What carries
    // meaning here is what the reader must edit or verify before pasting: the
    // paths, the placeholder names, and the phrases quoted from a doc.
    const PROMPT_TOKEN_RE = new RegExp(
        '("[^"\\n]*")' +                                        // 1 quoted phrase
        '|((?:https?:\\/\\/)?\\/?(?:[\\w.-]+\\/)+[\\w-]*(?:\\.\\w+)*' + // 2 path (optional scheme) …
        '|\\b[\\w-]+\\.(?:md|html|js|css|json|ya?ml|scss|txt|zip)\\b)' + //   … or bare filename
        '|(\\b[A-Z][A-Z0-9_]{2,}\\b)',                          // 3 placeholder / marker
        'g'
    );

    const PROMPT_GROUP_TYPE = [null, 'string', 'property', 'attr'];

    function lexPrompt(source) {
        return lexByRegex(source, PROMPT_TOKEN_RE, PROMPT_GROUP_TYPE);
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    NDS.Code = {
        init: initializeCodeProcessing,
        reprocessCodeElement: reprocessCodeElement,
        detectLanguage: detectLanguage
    };

})();
