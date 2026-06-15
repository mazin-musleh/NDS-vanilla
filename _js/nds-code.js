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
 * Languages: HTML, CSS, JavaScript (+ CSS/JS embedded inside an HTML block).
 * Language is taken from a `lang-*`/`language-*` class when present; otherwise
 * it is sniffed from the content.
 */

(function() {
    'use strict';

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function initializeCodeProcessing() {
        document.querySelectorAll('.code-example code, .nds-code code').forEach(processCodeElement);
        document.querySelectorAll('code.nds-inline-code').forEach(processInlineCodeElement);
    }

    function processCodeElement(codeElement) {
        if (codeElement.dataset.processed === 'true') return;

        // Keep the server markup so reprocess (e.g. a theme switch) can restart.
        if (!codeElement.dataset.originalContent) {
            codeElement.dataset.originalContent = codeElement.innerHTML;
        }

        const source = getSourceText(codeElement);
        const lang = detectLanguage(codeElement, source);
        const tokens = lexByLanguage(lang, source);
        const lines = splitTokensIntoLines(tokens);

        if (lines.length === 0) {
            codeElement.dataset.processed = 'true';
            return;
        }

        let html = '';
        for (let i = 0; i < lines.length; i++) {
            html += '<span class="code-line">' + renderTokens(lines[i]) + '</span>\n';
        }
        codeElement.innerHTML = html.trim();

        // line-numbers gutter only for multi-line blocks (CSS counter reads the class).
        if (lines.length > 1) codeElement.classList.add('line-numbers');
        codeElement.dataset.processed = 'true';
    }

    function processInlineCodeElement(codeElement) {
        if (codeElement.dataset.processed === 'true') return;

        const text = codeElement.textContent;
        // Inline code is a single token — trust an explicit class, default to html.
        const lang = languageFromClass(codeElement.className) || 'html';
        const syntaxClass = lang === 'javascript' ? 'syntax-keyword' : 'syntax-attr';
        codeElement.innerHTML = '<span class="' + syntaxClass + '">' + NDS.escapeHtml(text) + '</span>';
        codeElement.dataset.processed = 'true';
    }

    function reprocessCodeElement(codeElement) {
        if (codeElement.dataset.originalContent != null) {
            codeElement.innerHTML = codeElement.dataset.originalContent;
        }
        codeElement.dataset.processed = 'false';
        codeElement.classList.remove('line-numbers');
        processCodeElement(codeElement);
    }

    // ==============================================
    // SOURCE EXTRACTION
    // ==============================================

    // The authored corpus is entity-escaped (`&lt;…&gt;`), so textContent already
    // holds the decoded source with the author's indentation — no reparse needed.
    // Strip one leading newline (the <code> tag sits on its own line).
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
        return null;
    }

    // Class wins (explicit override, back-compat); otherwise sniff the content so
    // a block can omit the class entirely.
    function detectLanguage(codeElement, source) {
        const byClass = languageFromClass(codeElement.className);
        if (byClass) return byClass;
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
            html += t.type ? '<span class="syntax-' + t.type + '">' + esc + '</span>' : esc;
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
    // JAVASCRIPT LEXER
    // ==============================================

    // One master regex, scanned left to right. Alternatives are ordered by
    // priority (a keyword inside a string is swallowed by the string branch since
    // exec jumps past the whole match). Gaps between matches are plain text.
    const JS_TOKEN_RE = new RegExp(
        '(\\/\\/[^\\n]*)' +                                       // 1 line comment
        '|(\\/\\*[\\s\\S]*?\\*\\/)' +                             // 2 block comment
        '|(`[^`]*`)' +                                            // 3 template literal
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
        const tokens = [];
        let last = 0;
        let m;
        JS_TOKEN_RE.lastIndex = 0;
        while ((m = JS_TOKEN_RE.exec(source)) !== null) {
            if (m.index > last) tokens.push({ type: null, value: source.slice(last, m.index) });
            let type = null;
            for (let g = 1; g < JS_GROUP_TYPE.length; g++) {
                if (m[g] !== undefined) { type = JS_GROUP_TYPE[g]; break; }
            }
            tokens.push({ type: type, value: m[0] });
            last = JS_TOKEN_RE.lastIndex;
            if (m.index === JS_TOKEN_RE.lastIndex) JS_TOKEN_RE.lastIndex++; // zero-length guard
        }
        if (last < source.length) tokens.push({ type: null, value: source.slice(last) });
        return tokens;
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    if (typeof window !== 'undefined') {
        NDS.Code = {
            init: initializeCodeProcessing,
            reprocessCodeElement: reprocessCodeElement,
            detectLanguage: detectLanguage
        };
    }

})();
