/**
 * National Design System - Code Processing JavaScript
 * Simplified code display with syntax highlighting and line numbers
 *
 * Purpose: Show code content as-is with line numbers and syntax coloring
 * Supports: HTML, JavaScript, CSS
 */

(function() {
    'use strict';

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function initializeCodeProcessing() {
        const codeElements = document.querySelectorAll('.code-example code, .nds-code code');
        codeElements.forEach(function(codeElement) {
            processCodeElement(codeElement);
        });

        const inlineCodeElements = document.querySelectorAll('code.nds-inline-code');
        inlineCodeElements.forEach(function(codeElement) {
            processInlineCodeElement(codeElement);
        });
    }

    function processCodeElement(codeElement) {
        if (codeElement.dataset.processed === 'true') return;

        // Store original content for later restoration
        if (!codeElement.dataset.originalContent) {
            codeElement.dataset.originalContent = codeElement.innerHTML;
        }

        const originalText = getOriginalText(codeElement);

        const lang = detectLanguage(codeElement);
        if (lang) {
            applySyntaxHighlighting(codeElement, lang, originalText);
        }

        addLineNumbers(codeElement);

        // CSS reveals the block via code[data-processed="true"] (base is display:none)
        codeElement.dataset.processed = 'true';
    }

    function processInlineCodeElement(codeElement) {
        if (codeElement.dataset.processed === 'true') return;

        const text = codeElement.textContent;
        const lang = detectLanguage(codeElement) || 'html';

        // Inline code gets a single syntax class based on language
        const syntaxClass = lang === 'javascript' ? 'syntax-keyword' : 'syntax-attr';
        codeElement.innerHTML = '<span class="' + syntaxClass + '">' + NDS.escapeHtml(text) + '</span>';
        codeElement.dataset.processed = 'true';
    }

    function reprocessCodeElement(codeElement) {
        if (codeElement.dataset.originalContent) {
            codeElement.innerHTML = codeElement.dataset.originalContent;
        }

        codeElement.dataset.processed = 'false';
        codeElement.dataset.lineNumbers = 'false';
        codeElement.classList.remove('line-numbers');

        // Reprocess
        processCodeElement(codeElement);
    }

    // ==============================================
    // TEXT EXTRACTION
    // ==============================================

    function getOriginalText(codeElement) {
        const htmlContent = codeElement.innerHTML;
        const textContent = codeElement.textContent;

        // If content has HTML entities, decode for display
        if (htmlContent.includes('&lt;')) {
            return decodeEntities(textContent);
        }

        // Check if this is a lang-html code block with raw HTML that needs to be shown as text
        const isHtmlLang = detectLanguage(codeElement) === 'html';

        // If it's HTML language code with raw tags, format it properly
        if (isHtmlLang && htmlContent.includes('<')) {
            return formatHtmlContent(htmlContent);
        }

        // Plain text - return as-is
        return textContent;
    }

    function formatHtmlContent(html) {
        // Parse HTML and format with proper indentation
        const temp = document.createElement('div');
        temp.innerHTML = html.trim();

        let result = '';
        let depth = 0;

        function formatNode(node) {
            const indent = '    '.repeat(depth);

            for (let child of node.childNodes) {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent.trim();
                    if (text) {
                        result += indent + text + '\n';
                    }
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const tag = child.tagName.toLowerCase();
                    const hasChildren = child.children.length > 0;
                    const hasText = !hasChildren && child.textContent.trim();

                    // Build opening tag
                    let openTag = '<' + tag;
                    for (let attr of child.attributes) {
                        if (attr.value === '' || attr.value === attr.name) {
                            openTag += ' ' + attr.name;
                        } else {
                            openTag += ' ' + attr.name + '="' + attr.value + '"';
                        }
                    }

                    // Check if it's a void element
                    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img',
                                         'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
                    const isVoid = voidElements.includes(tag);

                    if (isVoid) {
                        // Void element - no closing tag
                        openTag += '>';
                        result += indent + openTag + '\n';
                    } else if (hasText) {
                        // Element with only text content - inline
                        openTag += '>';
                        result += indent + openTag + child.textContent.trim() + '</' + tag + '>\n';
                    } else if (hasChildren) {
                        // Element with children - block format
                        openTag += '>';
                        result += indent + openTag + '\n';
                        depth++;
                        formatNode(child);
                        depth--;
                        result += indent + '</' + tag + '>\n';
                    } else {
                        // Empty element
                        openTag += '>';
                        result += indent + openTag + '</' + tag + '>\n';
                    }
                }
            }
        }

        formatNode(temp);
        return result.trim();
    }

    function decodeEntities(str) {
        return str.replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&#x27;/g, "'")
                  .replace(/&amp;/g, '&');
    }

    // ==============================================
    // LANGUAGE DETECTION
    // ==============================================

    function detectLanguage(codeElement) {
        const className = codeElement.className;

        if (className.includes('lang-html') || className.includes('language-html')) {
            return 'html';
        }
        if (className.includes('lang-css') || className.includes('language-css')) {
            return 'css';
        }
        if (className.includes('lang-javascript') || className.includes('language-javascript') ||
            className.includes('lang-js') || className.includes('language-js')) {
            return 'javascript';
        }

        return null;
    }

    // ==============================================
    // SYNTAX HIGHLIGHTING
    // ==============================================

    function applySyntaxHighlighting(codeElement, lang, text) {
        let highlighted = '';

        if (lang === 'html') {
            highlighted = highlightHTML(text);
        } else if (lang === 'css') {
            highlighted = highlightCSS(text);
        } else if (lang === 'javascript') {
            highlighted = highlightJavaScript(text);
        }

        if (highlighted) {
            codeElement.innerHTML = highlighted;
        } else {
            codeElement.textContent = text;
        }
    }

    // HTML Syntax Highlighting — jumps between tags via indexOf and escapes
    // whole text runs (escaping is character-local, so one run-escape equals
    // the concatenation of per-character escapes at a fraction of the DOM cost).
    function highlightHTML(text) {
        let result = '';
        let i = 0;

        while (i < text.length) {
            const open = text.indexOf('<', i);
            if (open === -1) {
                result += NDS.escapeHtml(text.slice(i));
                break;
            }
            if (open > i) {
                result += NDS.escapeHtml(text.slice(i, open));
            }
            const tagEnd = text.indexOf('>', open);
            if (tagEnd === -1) {
                // Unterminated tag — the rest is plain text
                result += NDS.escapeHtml(text.slice(open));
                break;
            }
            result += highlightHTMLTag(text.substring(open, tagEnd + 1));
            i = tagEnd + 1;
        }

        return result;
    }

    function highlightHTMLTag(tag) {
        let result = '';
        let i = 0;
        let inQuotes = false;
        let quoteChar = '';
        let buffer = '';

        while (i < tag.length) {
            const char = tag[i];

            // Handle quotes (attribute values)
            if (!inQuotes && (char === '"' || char === "'")) {
                if (buffer) {
                    result += processHTMLToken(buffer);
                    buffer = '';
                }
                inQuotes = true;
                quoteChar = char;
                buffer = char;
            } else if (inQuotes && char === quoteChar) {
                buffer += char;
                result += '<span class="syntax-value">' + NDS.escapeHtml(buffer) + '</span>';
                buffer = '';
                inQuotes = false;
                quoteChar = '';
            } else if (inQuotes) {
                buffer += char;
            } else {
                buffer += char;
            }

            i++;
        }

        if (buffer) {
            result += processHTMLToken(buffer);
        }

        return result;
    }

    function processHTMLToken(token) {
        let result = NDS.escapeHtml(token);

        // Tag name (opening or closing)
        const tagMatch = token.match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)/);
        if (tagMatch) {
            return result.replace(tagMatch[1], '<span class="syntax-tag">' + tagMatch[1] + '</span>');
        }

        // Attribute names: with value (attr=) and boolean (attr followed by space, &gt; or end)
        result = result.replace(/(?<=\s)([a-zA-Z][a-zA-Z0-9-]*)(?==|\s|&gt;|&amp;|$)/g, '<span class="syntax-attr">$1</span>');
        return result;
    }

    // CSS Syntax Highlighting — line-aware. A global-regex pass mis-colors hex
    // values (`#fbf9f8` matches the `#id` selector pattern → selector colour) while
    // a digit-led hex (`#231f20`) falls through to the value colour, and it paints
    // pseudo-class selectors (`:root`) as values. It also lets a value span cross a
    // newline, which splitHtmlByLines then breaks into a blank line. Walking
    // line-by-line keeps selector / property / value colours consistent and every
    // span inside its own line.
    function highlightCSS(text) {
        const lines = text.split('\n');
        const out = [];
        let inComment = false;
        for (let i = 0; i < lines.length; i++) {
            const res = highlightCSSLine(lines[i], inComment);
            out.push(res.html);
            inComment = res.open;
        }
        return out.join('\n');
    }

    function cssEsc(s) { return NDS.escapeHtml(s); }
    function cssSpan(type, s) { return '<span class="syntax-' + type + '">' + NDS.escapeHtml(s) + '</span>'; }

    // Highlight one CSS line. `open` in = inside an unclosed `/* */` from a previous
    // line; returns whether the comment is still open after this line.
    function highlightCSSLine(line, open) {
        // Continuation / start of a block comment
        if (open) {
            const end = line.indexOf('*/');
            if (end === -1) return { html: cssSpan('comment', line), open: true };
            const after = highlightCSSLine(line.slice(end + 2), false);
            return { html: cssSpan('comment', line.slice(0, end + 2)) + after.html, open: after.open };
        }
        const start = line.indexOf('/*');
        if (start !== -1) {
            const before = highlightCSSLine(line.slice(0, start), false);
            const end = line.indexOf('*/', start + 2);
            if (end === -1) return { html: before.html + cssSpan('comment', line.slice(start)), open: true };
            const after = highlightCSSLine(line.slice(end + 2), false);
            return { html: before.html + cssSpan('comment', line.slice(start, end + 2)) + after.html, open: after.open };
        }

        // Declaration `prop: value;` — only when the line carries no block braces
        if (line.indexOf('{') === -1 && line.indexOf('}') === -1) {
            const decl = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.*?)(;?\s*)$/);
            if (decl) {
                return {
                    html: cssEsc(decl[1]) + cssSpan('property', decl[2]) + cssEsc(decl[3])
                        + cssSpan('value', decl[4]) + cssEsc(decl[5]),
                    open: false
                };
            }
        }

        // Selector line — everything before the `{` is the selector
        const brace = line.indexOf('{');
        if (brace !== -1) {
            const sel = line.slice(0, brace).match(/^(.*?)(\s*)$/);
            return { html: cssSpan('selector', sel[1]) + cssEsc(sel[2]) + cssEsc(line.slice(brace)), open: false };
        }

        // `}`, blank, or anything else — plain
        return { html: cssEsc(line), open: false };
    }

    // JavaScript Syntax Highlighting
    // Precompiled per-category alternations — one pass per category instead of
    // a fresh RegExp + full-text pass per word, per block. The trailing \b
    // forces whole-token matches, so alternative order is irrelevant (`in`
    // can't half-match `instanceof`).
    const JS_WORD_CATEGORIES = [
        ['keyword', /\b(const|let|var|function|if|else|for|while|return|break|continue|switch|case|default|try|catch|finally|throw|class|extends|import|export|await|async|new|typeof|instanceof|in|of|delete|void|this|super)\b/g],
        ['literal', /\b(true|false|null|undefined|NaN|Infinity)\b/g],
        ['builtin', /\b(console|window|document|Array|Object|String|Number|Boolean|Math|JSON|Date|Promise|Set|Map)\b/g]
    ];

    function highlightJavaScript(text) {
        const tokens = [];
        let highlighted = text;

        function tokenize(match, type) {
            const placeholder = '__TOKEN_' + tokens.length + '__';
            tokens.push({ placeholder: placeholder, content: NDS.escapeHtml(match), type: type });
            return placeholder;
        }

        // Tokenize in priority order
        highlighted = highlighted.replace(/(\/\/.*$)/gm, function(m) { return tokenize(m, 'comment'); });
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, function(m) { return tokenize(m, 'comment'); });
        highlighted = highlighted.replace(/(`[^`]*`)/g, function(m) { return tokenize(m, 'template'); });
        highlighted = highlighted.replace(/(['"])((?:\\.|(?!\1)[^\\])*?)\1/g, function(m) { return tokenize(m, 'string'); });
        highlighted = highlighted.replace(/\b(\d+\.?\d*([eE][+-]?\d+)?)\b/g, function(m) { return tokenize(m, 'number'); });

        // Word categories — keywords, literals, built-ins
        JS_WORD_CATEGORIES.forEach(function(cat) {
            highlighted = highlighted.replace(cat[1], function(m) { return tokenize(m, cat[0]); });
        });

        // Escape remaining text
        highlighted = NDS.escapeHtml(highlighted);

        // Replace tokens. Function replacement — a literal $& / $' in the
        // escaped code would otherwise be interpreted as a replacement pattern
        // and splice match text into the output.
        tokens.forEach(function(token) {
            const wrapped = '<span class="syntax-' + token.type + '">' + token.content + '</span>';
            highlighted = highlighted.replace(token.placeholder, function() { return wrapped; });
        });

        return highlighted;
    }

    // ==============================================
    // LINE NUMBERS
    // ==============================================

    function addLineNumbers(codeElement) {
        if (codeElement.dataset.lineNumbers === 'true') return;

        let htmlContent = codeElement.innerHTML;
        let textContent = codeElement.textContent;

        // Strip leading newline (from <code> tag on its own line)
        if (htmlContent.startsWith('\n')) {
            htmlContent = htmlContent.substring(1);
        }
        if (textContent.startsWith('\n')) {
            textContent = textContent.substring(1);
        }

        const lines = textContent.split('\n');

        // Remove trailing empty line
        if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
            lines.pop();
        }

        if (lines.length === 0) return;

        const hasMultipleLines = lines.length > 1;

        // Split HTML by lines
        const htmlLines = splitHtmlByLines(htmlContent, lines.length);

        // Wrap each line
        let numberedContent = '';
        htmlLines.forEach(function(lineHtml, index) {
            numberedContent += '<span class="code-line" data-line="' + (index + 1) + '">' +
                             lineHtml + '</span>\n';
        });

        codeElement.innerHTML = numberedContent.trim();

        // Add line-numbers class only for multi-line code
        if (hasMultipleLines) {
            codeElement.classList.add('line-numbers');
        }

        codeElement.dataset.lineNumbers = 'true';
    }

    function splitHtmlByLines(html, lineCount) {
        const lines = [];
        let remaining = html;

        for (let i = 0; i < lineCount; i++) {
            if (i === lineCount - 1) {
                // Last line gets all remaining content
                lines.push(remaining);
            } else {
                // Find first newline
                const newlineIndex = remaining.indexOf('\n');
                if (newlineIndex !== -1) {
                    lines.push(remaining.substring(0, newlineIndex));
                    remaining = remaining.substring(newlineIndex + 1);
                } else {
                    lines.push(remaining);
                    remaining = '';
                }
            }
        }

        return lines;
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    if (typeof window !== 'undefined') {
        NDS.Code = {
            init: initializeCodeProcessing,
            reprocessCodeElement: reprocessCodeElement,
            detectLanguage: detectLanguage,
            decodeEntities: decodeEntities
        };
    }

})();
