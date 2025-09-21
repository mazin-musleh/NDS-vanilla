/**
 * National Design System - Code Processing JavaScript
 * Functionality for processing and converting code examples
 * 
 * Features:
 * - HTML to text conversion with entity encoding
 * - Supports different language processors
 * - Extensible for additional code transformations
 */

(function() {
    'use strict';

    // Main initialization function
    function initializeCodeProcessing() {
        convertHtmlToTextInCode(); // This now includes syntax highlighting
        processCode(); // Process all registered language types
        addLineNumbers();
        initializeCopyButtons();
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSCode = {
            convertHtmlToTextInCode: convertHtmlToTextInCode,
            htmlToText: htmlToText,
            formatHtmlAsText: formatHtmlAsText,
            encodeHtmlEntities: encodeHtmlEntities,
            processCode: processCode,
            addLanguageProcessor: addLanguageProcessor,
            initializeCopyButtons: initializeCopyButtons,
            addLineNumbers: addLineNumbers,
            addSyntaxHighlighting: addSyntaxHighlighting,
            highlightHTMLSafe: highlightHTMLSafe,
            detectLanguage: detectLanguage,
            init: initializeCodeProcessing
        };
    }

    // Note: Initialization now handled by nds-init.js unified system

    // Language processors registry for future expansion
    var languageProcessors = {
        'html': {
            selector: 'code.lang-html',
            processor: convertHtmlToEntities
        },
        'javascript': { 
            selector: 'code.lang-javascript, code.lang-js', 
            processor: processJavaScript 
        },
        // Future processors can be added here:
        // 'css': { selector: 'code.lang-css', processor: processCss }
    };

    // Main function to process all code elements
    function processCode() {
        for (var lang in languageProcessors) {
            var config = languageProcessors[lang];
            var elements = document.querySelectorAll(config.selector);
            
            elements.forEach(function(element) {
                if (element.dataset.processed !== 'true') {
                    config.processor(element);
                    element.dataset.processed = 'true';
                }
            });
        }
    }

    // Add new language processor (for future expansion)
    function addLanguageProcessor(language, selector, processor) {
        languageProcessors[language] = {
            selector: selector,
            processor: processor
        };
    }

    // HTML-specific processor
    function convertHtmlToEntities(codeElement) {
        if (!codeElement.innerHTML.includes('<')) {
            return;
        }
        
        const htmlContent = codeElement.innerHTML;
        const textWithEntities = htmlToText(htmlContent);
        const cleanText = decodeHtmlEntities(textWithEntities);
        
        // Note: Text for copying is now stored in hidden copy system
        // Display clean version for viewing
        codeElement.textContent = cleanText;
    }

    // JavaScript-specific processor
    function processJavaScript(codeElement) {
        // Note: Text for copying is now stored in hidden copy system
        
        // Apply JavaScript syntax highlighting
        highlightJavaScript(codeElement);
    }

    // Main HTML to text conversion function for lang-html code elements
    function convertHtmlToTextInCode() {
        const codeElements = document.querySelectorAll('code.lang-html');
        
        codeElements.forEach(function(codeElement) {
            // Skip if already processed
            if (codeElement.dataset.processed === 'true') {
                return;
            }
            
            const htmlContent = codeElement.innerHTML;
            
            // Check if this contains raw HTML (needs conversion) or entities (ready for highlighting)
            const containsRawHTML = htmlContent.includes('<');
            const containsEntities = htmlContent.includes('&lt;');
            
            let cleanText;
            
            if (containsRawHTML) {
                // Raw HTML case - needs full conversion
                const textWithEntities = htmlToText(htmlContent);
                cleanText = decodeHtmlEntities(textWithEntities);
                
                // Note: Text for copying is now stored in hidden copy system
                codeElement.textContent = cleanText;
            } else if (containsEntities) {
                // Entity-encoded case - extract and decode for copying, keep entities for display
                const textContent = codeElement.textContent;
                cleanText = decodeHtmlEntities(textContent);
                
                // Note: Text for copying is now stored in hidden copy system
                // Don't change textContent - it's already entities
            } else {
                // Plain text case - no processing needed
                cleanText = codeElement.textContent;
                // Note: Text for copying is now stored in hidden copy system
            }
            
            // Apply safe DOM-based syntax highlighting
            const lang = detectLanguage(codeElement);
            if (lang === 'html') {
                highlightHTMLSafe(codeElement);
            }
            
            codeElement.dataset.processed = 'true';
        });
    }

    // Helper function to convert HTML string to readable text
    function htmlToText(html) {
        // Create a temporary div to work with the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Convert to formatted text with proper indentation
        return formatHtmlAsText(tempDiv, 0);
    }

    // Recursive function to format HTML elements as text with indentation using HTML entities
    function formatHtmlAsText(element, indentLevel) {
        let result = '';
        const indent = '    '.repeat(indentLevel); // 4 spaces per indent level
        
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent.trim();
                if (text) {
                    result += indent + encodeHtmlEntities(text) + '\n';
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Format opening tag with HTML entities
                let tag = '&lt;' + node.tagName.toLowerCase();
                
                // Add attributes
                for (let attr of node.attributes) {
                    tag += ' ' + attr.name + '="' + encodeHtmlEntities(attr.value) + '"';
                }
                
                // List of tags that should never be self-closing in HTML
                const neverSelfClosing = ['i', 'span', 'div', 'button', 'a', 'script', 'style'];
                // List of tags that should stay inline (single line)
                // Remove 'span' from inline elements to prevent nested span issues
                const inlineElements = ['i', 'a', 'strong', 'em', 'code'];
                const tagName = node.tagName.toLowerCase();
                
                if (node.children.length === 0 && !node.textContent.trim() && !neverSelfClosing.includes(tagName)) {
                    // Self-closing tag (only for appropriate elements like img, br, hr, etc.)
                    tag += ' /&gt;';
                    result += indent + tag + '\n';
                } else if (inlineElements.includes(tagName)) {
                    // Inline element - keep everything on one line
                    tag += '&gt;';
                    if (node.textContent.trim()) {
                        tag += encodeHtmlEntities(node.textContent.trim());
                    }
                    tag += '&lt;/' + tagName + '&gt;';
                    result += indent + tag + '\n';
                } else {
                    // Check if this is an element with simple text content or empty
                    const isSimpleElement = node.children.length === 0;

                    if (isSimpleElement) {
                        // Simple element (with text or empty) - keep on same line
                        tag += '&gt;';
                        if (node.textContent.trim()) {
                            tag += encodeHtmlEntities(node.textContent.trim());
                        }
                        tag += '&lt;/' + node.tagName.toLowerCase() + '&gt;';
                        result += indent + tag + '\n';
                    } else {
                        // Block element with children
                        tag += '&gt;';
                        result += indent + tag + '\n';

                        // Process children
                        result += formatHtmlAsText(node, indentLevel + 1);

                        // Closing tag
                        result += indent + '&lt;/' + node.tagName.toLowerCase() + '&gt;' + '\n';
                    }
                }
            }
        }
        
        return result;
    }

    // Helper function to encode HTML entities
    function encodeHtmlEntities(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#x27;');
    }

    // Helper function to decode HTML entities for display
    function decodeHtmlEntities(str) {
        return str.replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&#x27;/g, "'")
                  .replace(/&amp;/g, '&');
    }

    // Line numbering functionality
    function addLineNumbers() {
        const codeElements = document.querySelectorAll('code');
        
        codeElements.forEach(function(codeElement) {
            // Skip if already has line numbers or is empty
            if (codeElement.dataset.lineNumbers === 'true' || !codeElement.textContent.trim()) {
                return;
            }
            
            // Get the current HTML content (which may include syntax highlighting)
            const htmlContent = codeElement.innerHTML;
            const textContent = codeElement.textContent;
            
            const lines = textContent.split('\n');
            // Remove empty last line if it exists (common with code blocks)
            if (lines[lines.length - 1].trim() === '') {
                lines.pop();
            }
            
            // Skip single line code blocks
            if (lines.length <= 1) {
                return;
            }
            
            // Note: Text for copying is now stored in hidden copy system
            
            // If content has syntax highlighting, preserve it
            if (htmlContent !== textContent) {
                // Split HTML content by lines while preserving highlighting
                const htmlLines = splitHtmlByLines(htmlContent);
                let numberedContent = '';
                
                htmlLines.forEach(function(lineHtml, index) {
                    const lineNumber = index + 1;
                    numberedContent += '<span class="code-line" data-line="' + lineNumber + '">' + 
                                     lineHtml + '</span>\n';
                });
                
                codeElement.innerHTML = numberedContent.trim();
            } else {
                // Create line-numbered content without highlighting
                let numberedContent = '';
                lines.forEach(function(line, index) {
                    const lineNumber = index + 1;
                    numberedContent += '<span class="code-line" data-line="' + lineNumber + '">' + 
                                     escapeHtml(line) + '</span>\n';
                });
                
                codeElement.innerHTML = numberedContent.trim();
            }
            codeElement.classList.add('line-numbers');
            codeElement.dataset.lineNumbers = 'true';
        });
    }
    
    // Helper function to escape HTML in line content
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Helper function to split HTML content by lines while preserving syntax highlighting
    function splitHtmlByLines(htmlContent) {
        // Create a temporary element to work with
        const temp = document.createElement('div');
        temp.innerHTML = htmlContent;
        
        // Get the text content and split by lines
        const textContent = temp.textContent || temp.innerText;
        const textLines = textContent.split('\n');
        
        // Remove empty last line if exists
        if (textLines[textLines.length - 1].trim() === '') {
            textLines.pop();
        }
        
        // Simple approach: try to match HTML structure to text lines
        // This works for most cases where syntax highlighting doesn't break across lines
        const htmlLines = [];
        let currentHtml = htmlContent;
        
        textLines.forEach(function(textLine, index) {
            if (index === textLines.length - 1) {
                // Last line gets remaining HTML
                htmlLines.push(currentHtml);
            } else {
                // Find where this line ends and split HTML accordingly
                const lineEndIndex = currentHtml.indexOf('\n');
                if (lineEndIndex !== -1) {
                    htmlLines.push(currentHtml.substring(0, lineEndIndex));
                    currentHtml = currentHtml.substring(lineEndIndex + 1);
                } else {
                    htmlLines.push(currentHtml);
                    currentHtml = '';
                }
            }
        });
        
        return htmlLines;
    }

    // Syntax highlighting functionality
    function addSyntaxHighlighting() {
        const codeElements = document.querySelectorAll('code');
        
        codeElements.forEach(function(codeElement) {
            // Skip if already highlighted
            if (codeElement.dataset.highlighted === 'true') {
                return;
            }
            
            // Detect language from class
            const lang = detectLanguage(codeElement);
            if (!lang) return;
            
            // Apply highlighting based on language
            if (lang === 'html') {
                highlightHTML(codeElement);
            } else if (lang === 'css') {
                highlightCSS(codeElement);
            } else if (lang === 'javascript') {
                highlightJavaScript(codeElement);
            }
            
            codeElement.dataset.highlighted = 'true';
        });
    }

    // Detect programming language from class names
    function detectLanguage(codeElement) {
        const classList = codeElement.className;
        
        if (classList.includes('lang-html') || classList.includes('language-html')) return 'html';
        if (classList.includes('lang-css') || classList.includes('language-css')) return 'css';
        if (classList.includes('lang-javascript') || classList.includes('language-javascript') || 
            classList.includes('lang-js') || classList.includes('language-js')) return 'javascript';
        
        return null;
    }

    // HTML syntax highlighting
    function highlightHTML(codeElement) {
        const text = codeElement.textContent;
        codeElement.innerHTML = highlightHTMLText(text);
    }

    // Safe DOM-based HTML syntax highlighting
    function highlightHTMLSafe(codeElement) {
        const text = codeElement.textContent;
        let highlightedHTML = '';
        
        // Split text into lines for processing
        const lines = text.split('\n');
        
        lines.forEach(function(line, lineIndex) {
            let processedLine = '';
            let i = 0;
            
            while (i < line.length) {
                // Look for HTML tag start
                if (line.charAt(i) === '<') {
                    // Find the end of the tag
                    let tagEnd = line.indexOf('>', i);
                    if (tagEnd !== -1) {
                        let tagContent = line.substring(i, tagEnd + 1);
                        processedLine += highlightSingleTag(tagContent);
                        i = tagEnd + 1;
                    } else {
                        processedLine += escapeHtml(line.charAt(i));
                        i++;
                    }
                } else {
                    processedLine += escapeHtml(line.charAt(i));
                    i++;
                }
            }
            
            highlightedHTML += processedLine;
            if (lineIndex < lines.length - 1) {
                highlightedHTML += '\n';
            }
        });
        
        codeElement.innerHTML = highlightedHTML;
    }
    
    // Highlight a single HTML tag safely
    function highlightSingleTag(tag) {
        // Simple character-by-character processing
        let result = '';
        let inQuotes = false;
        let quoteChar = '';
        let currentToken = '';
        let tokenType = 'text';
        
        for (let i = 0; i < tag.length; i++) {
            const char = tag.charAt(i);
            
            if (!inQuotes && (char === '"' || char === "'")) {
                // Start of quoted string
                if (currentToken) {
                    result += wrapToken(currentToken, tokenType);
                    currentToken = '';
                }
                inQuotes = true;
                quoteChar = char;
                currentToken = char;
                tokenType = 'value';
            } else if (inQuotes && char === quoteChar) {
                // End of quoted string
                currentToken += char;
                result += wrapToken(currentToken, tokenType);
                currentToken = '';
                tokenType = 'text';
                inQuotes = false;
                quoteChar = '';
            } else if (inQuotes) {
                // Inside quotes
                currentToken += char;
            } else {
                // Outside quotes
                currentToken += char;
            }
        }
        
        if (currentToken) {
            result += wrapToken(currentToken, tokenType);
        }
        
        return result;
    }
    
    // Wrap tokens with appropriate CSS classes
    function wrapToken(token, type) {
        const escaped = escapeHtml(token);
        
        if (type === 'value') {
            return '<span class="syntax-value">' + escaped + '</span>';
        }
        
        // Simple tag name detection
        const tagMatch = token.match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)/);
        if (tagMatch) {
            return escaped.replace(tagMatch[1], '<span class="syntax-tag">' + tagMatch[1] + '</span>');
        }
        
        // Simple attribute name detection
        const attrMatch = token.match(/\b([a-zA-Z-]+)=/g);
        if (attrMatch) {
            let result = escaped;
            attrMatch.forEach(function(match) {
                const attrName = match.slice(0, -1); // Remove the =
                result = result.replace(attrName + '=', '<span class="syntax-attr">' + attrName + '</span>=');
            });
            return result;
        }
        
        return escaped;
    }

    // CSS syntax highlighting
    function highlightCSS(codeElement) {
        const text = codeElement.textContent;
        const highlighted = text
            .replace(/(\/\*.*?\*\/)/g, '<span class="syntax-comment">$1</span>')
            .replace(/([.#][a-zA-Z-_][a-zA-Z0-9-_]*)/g, '<span class="syntax-selector">$1</span>')
            .replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="syntax-property">$1</span>$2')
            .replace(/(:)(\s*[^;]+)/g, '$1<span class="syntax-value">$2</span>');
        
        codeElement.innerHTML = highlighted;
    }

    // JavaScript syntax highlighting
    function highlightJavaScript(codeElement) {
        const text = codeElement.textContent;
        
        // Enhanced keyword lists
        const keywords = [
            'abstract', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
            'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else',
            'enum', 'export', 'extends', 'final', 'finally', 'float', 'for', 'function',
            'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface',
            'let', 'long', 'native', 'new', 'package', 'private', 'protected', 'public',
            'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this',
            'throw', 'throws', 'transient', 'try', 'typeof', 'var', 'void', 'volatile',
            'while', 'with', 'yield'
        ];
        
        const literals = ['true', 'false', 'null', 'undefined', 'Infinity', 'NaN'];
        const builtins = [
            'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Math',
            'JSON', 'console', 'window', 'document', 'Promise', 'Set', 'Map', 'Symbol',
            'Error', 'TypeError', 'ReferenceError', 'SyntaxError'
        ];
        
        // Use a safer token-based approach to avoid nested spans
        const tokens = [];
        let currentIndex = 0;
        
        // Function to add a token and return placeholder
        function addToken(content, type) {
            const placeholder = '__TOKEN_' + tokens.length + '__';
            tokens.push({ content: content, type: type, placeholder: placeholder });
            return placeholder;
        }
        
        let highlighted = text;
        
        // 1. Comments (highest priority - protect content from other processing)
        highlighted = highlighted.replace(/(\/\/.*$)/gm, function(match) {
            return addToken(match, 'comment');
        });
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, function(match) {
            return addToken(match, 'comment');
        });
        
        // 2. Template literals
        highlighted = highlighted.replace(/(`)((?:[^`\\]|\\.)*)(`)/g, function(match) {
            return addToken(match, 'template');
        });
        
        // 3. Regular expressions
        highlighted = highlighted.replace(/(\/(?![*\/])(?:[^\r\n\[\/\\]|\\.|\[(?:[^\r\n\]\\]|\\.)*\])+\/[gimuy]*)/g, function(match) {
            return addToken(match, 'regex');
        });
        
        // 4. Strings
        highlighted = highlighted.replace(/(['"])((?:\\.|(?!\1)[^\\])*?)\1/g, function(match) {
            return addToken(match, 'string');
        });
        
        // 5. Numbers (comprehensive patterns)
        // First catch special formats
        highlighted = highlighted.replace(/\b(0x[a-fA-F0-9]+|0b[01]+|0o[0-7]+)\b/g, function(match) {
            return addToken(match, 'number');
        });
        // Then catch regular numbers including floats and scientific notation
        highlighted = highlighted.replace(/\b(\d+\.?\d*([eE][+-]?\d+)?)\b/g, function(match) {
            return addToken(match, 'number');
        });
        
        // 6. Keywords
        keywords.forEach(function(keyword) {
            const regex = new RegExp('\\b(' + keyword + ')\\b', 'g');
            highlighted = highlighted.replace(regex, function(match) {
                return addToken(match, 'keyword');
            });
        });
        
        // 7. Literals
        literals.forEach(function(literal) {
            const regex = new RegExp('\\b(' + literal + ')\\b', 'g');
            highlighted = highlighted.replace(regex, function(match) {
                return addToken(match, 'literal');
            });
        });
        
        // 8. Built-in objects
        builtins.forEach(function(builtin) {
            const regex = new RegExp('\\b(' + builtin + ')\\b', 'g');
            highlighted = highlighted.replace(regex, function(match) {
                return addToken(match, 'builtin');
            });
        });
        
        // Now replace all tokens with their highlighted versions
        tokens.forEach(function(token) {
            const className = 'syntax-' + token.type;
            const replacement = '<span class="' + className + '">' + escapeHtml(token.content) + '</span>';
            highlighted = highlighted.replace(token.placeholder, replacement);
        });
        
        codeElement.innerHTML = highlighted;
    }

    // Copy functionality helper functions (defined first)
    function handleCopyClick(button) {
        const codeBlock = button.closest('.nds-code').querySelector('code');
        if (!codeBlock) {
            return;
        }

        // Get text from hidden copy if available, otherwise fallback to stored copy text or displayed text
        const hiddenCopy = codeBlock.parentNode.querySelector('.original-code-content');
        const textToCopy = hiddenCopy ? hiddenCopy.textContent : (codeBlock.dataset.copyText || codeBlock.textContent);
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopyFeedback(button);
            }).catch(err => {
                fallbackCopy(textToCopy, button);
            });
        } else {
            fallbackCopy(textToCopy, button);
        }
    }

    function fallbackCopy(text, button) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback(button);
        } catch (err) {
        }
        
        document.body.removeChild(textArea);
    }

    function showCopyFeedback(button) {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>';
        button.classList.add('copied');

        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.classList.remove('copied');
        }, 2000);
    }

    // Copy functionality initialization
    function initializeCopyButtons() {
        // Event delegation for all copy buttons
        document.addEventListener('click', function(e) {
            const copyBtn = e.target.closest('.copy-btn');
            if (copyBtn) {
                handleCopyClick(copyBtn);
            }
        });
    }

})();