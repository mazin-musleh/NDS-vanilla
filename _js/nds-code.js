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

        initializeCopyButtons();
    }

    function processCodeElement(codeElement) {
        if (codeElement.dataset.processed === 'true') return;

        // Store original content for later restoration
        if (!codeElement.dataset.originalContent) {
            codeElement.dataset.originalContent = codeElement.innerHTML;
        }

        // 1. Get original text content
        const originalText = getOriginalText(codeElement);

        // 2. Apply syntax highlighting
        const lang = detectLanguage(codeElement);
        if (lang) {
            applySyntaxHighlighting(codeElement, lang, originalText);
        }

        // 3. Add line numbers
        addLineNumbers(codeElement);

        // 4. Set display mode
        codeElement.style.display = 'flex';
        codeElement.dataset.processed = 'true';
    }

    function processInlineCodeElement(codeElement) {
        if (codeElement.dataset.processed === 'true') return;

        const text = codeElement.textContent;
        const lang = detectLanguage(codeElement) || 'html';

        // Inline code gets a single syntax class based on language
        const syntaxClass = lang === 'javascript' ? 'syntax-keyword' : 'syntax-attr';
        codeElement.innerHTML = '<span class="' + syntaxClass + '">' + escapeHtml(text) + '</span>';
        codeElement.dataset.processed = 'true';
    }

    function reprocessCodeElement(codeElement) {
        // Reset to original content
        if (codeElement.dataset.originalContent) {
            codeElement.innerHTML = codeElement.dataset.originalContent;
        }

        // Clear processed flag
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
                    const booleanAttrs = ['hidden', 'disabled', 'checked', 'readonly', 'required', 'autofocus', 'autoplay', 'controls', 'loop', 'muted', 'novalidate', 'open', 'selected', 'multiple', 'defer', 'async'];
                    let openTag = '<' + tag;
                    for (let attr of child.attributes) {
                        if (booleanAttrs.includes(attr.name) && (attr.value === '' || attr.value === attr.name)) {
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

    function encodeEntities(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#x27;');
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
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

    // HTML Syntax Highlighting
    function highlightHTML(text) {
        let result = '';
        let i = 0;

        while (i < text.length) {
            // Find HTML tags
            if (text[i] === '<') {
                const tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    const tag = text.substring(i, tagEnd + 1);
                    result += highlightHTMLTag(tag);
                    i = tagEnd + 1;
                } else {
                    result += escapeHtml(text[i]);
                    i++;
                }
            } else {
                result += escapeHtml(text[i]);
                i++;
            }
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
                result += '<span class="syntax-value">' + escapeHtml(buffer) + '</span>';
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
        const escaped = escapeHtml(token);

        // Tag name (opening or closing)
        const tagMatch = token.match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)/);
        if (tagMatch) {
            return escaped.replace(tagMatch[1], '<span class="syntax-tag">' + tagMatch[1] + '</span>');
        }

        // Attribute names (with value)
        const attrMatch = token.match(/\b([a-zA-Z-]+)=/);
        if (attrMatch) {
            return escaped.replace(attrMatch[1] + '=', '<span class="syntax-attr">' + attrMatch[1] + '</span>=');
        }

        // Boolean attributes (no value, e.g., hidden, disabled)
        const boolMatch = token.match(/\s([a-zA-Z-]+)(?=[>\s])/);
        if (boolMatch) {
            return escaped.replace(boolMatch[1], '<span class="syntax-attr">' + boolMatch[1] + '</span>');
        }

        return escaped;
    }

    // CSS Syntax Highlighting
    function highlightCSS(text) {
        let highlighted = escapeHtml(text);

        // Comments
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="syntax-comment">$1</span>');

        // Selectors
        highlighted = highlighted.replace(/([.#][a-zA-Z-_][a-zA-Z0-9-_]*)/g, '<span class="syntax-selector">$1</span>');

        // Properties
        highlighted = highlighted.replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="syntax-property">$1</span>$2');

        // Values
        highlighted = highlighted.replace(/(:)(\s*[^;]+)/g, '$1<span class="syntax-value">$2</span>');

        return highlighted;
    }

    // JavaScript Syntax Highlighting
    function highlightJavaScript(text) {
        const tokens = [];
        let highlighted = text;

        function tokenize(match, type) {
            const placeholder = '__TOKEN_' + tokens.length + '__';
            tokens.push({ placeholder: placeholder, content: escapeHtml(match), type: type });
            return placeholder;
        }

        // Tokenize in priority order
        highlighted = highlighted.replace(/(\/\/.*$)/gm, function(m) { return tokenize(m, 'comment'); });
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, function(m) { return tokenize(m, 'comment'); });
        highlighted = highlighted.replace(/(`[^`]*`)/g, function(m) { return tokenize(m, 'template'); });
        highlighted = highlighted.replace(/(['"])((?:\\.|(?!\1)[^\\])*?)\1/g, function(m) { return tokenize(m, 'string'); });
        highlighted = highlighted.replace(/\b(\d+\.?\d*([eE][+-]?\d+)?)\b/g, function(m) { return tokenize(m, 'number'); });

        // Keywords
        const keywords = ['const', 'let', 'var', 'function', 'if', 'else', 'for', 'while', 'return',
                         'break', 'continue', 'switch', 'case', 'default', 'try', 'catch', 'finally',
                         'throw', 'class', 'extends', 'import', 'export', 'await', 'async', 'new',
                         'typeof', 'instanceof', 'in', 'of', 'delete', 'void', 'this', 'super'];
        keywords.forEach(function(kw) {
            const regex = new RegExp('\\b(' + kw + ')\\b', 'g');
            highlighted = highlighted.replace(regex, function(m) { return tokenize(m, 'keyword'); });
        });

        // Literals
        const literals = ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'];
        literals.forEach(function(lit) {
            const regex = new RegExp('\\b(' + lit + ')\\b', 'g');
            highlighted = highlighted.replace(regex, function(m) { return tokenize(m, 'literal'); });
        });

        // Built-ins
        const builtins = ['console', 'window', 'document', 'Array', 'Object', 'String', 'Number',
                         'Boolean', 'Math', 'JSON', 'Date', 'Promise', 'Set', 'Map'];
        builtins.forEach(function(bi) {
            const regex = new RegExp('\\b(' + bi + ')\\b', 'g');
            highlighted = highlighted.replace(regex, function(m) { return tokenize(m, 'builtin'); });
        });

        // Escape remaining text
        highlighted = escapeHtml(highlighted);

        // Replace tokens
        tokens.forEach(function(token) {
            const wrapped = '<span class="syntax-' + token.type + '">' + token.content + '</span>';
            highlighted = highlighted.replace(token.placeholder, wrapped);
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
    // COPY FUNCTIONALITY
    // ==============================================

    function initializeCopyButtons() {
        document.addEventListener('click', function(e) {
            const copyBtn = e.target.closest('.copy-btn');
            if (copyBtn) {
                handleCopyClick(copyBtn);
            }
        });
    }

    function handleCopyClick(button) {
        const codeBlock = button.closest('.nds-code').querySelector('code');
        if (!codeBlock) return;

        // Get plain text content
        const textToCopy = codeBlock.textContent;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(function() {
                showCopyFeedback(button);
            }).catch(function() {
                fallbackCopy(textToCopy, button);
            });
        } else {
            fallbackCopy(textToCopy, button);
        }
    }

    function fallbackCopy(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            showCopyFeedback(button);
        } catch (err) {
            // Silent fail
        }

        document.body.removeChild(textArea);
    }

    function showCopyFeedback(button) {
        button.dataset.status = 'success';

        setTimeout(function() {
            delete button.dataset.status;
        }, 2000);
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    if (typeof window !== 'undefined') {
        NDS.Code = {
            init: initializeCodeProcessing,
            reprocessCodeElement: reprocessCodeElement,
            detectLanguage: detectLanguage,
            encodeEntities: encodeEntities,
            decodeEntities: decodeEntities
        };
    }

})();
