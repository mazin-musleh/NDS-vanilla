---
layout: home
sitemap: false  # internal dev/test page — keep out of the public sitemap
noindex: true   # also tell crawlers not to index it if reached via a link
title: "نظام التصميم الموحد لكود المنصات السعودي"
hero_title: "النظام الوطني للتصميم"
hero_description: "نظام تصميم شامل يُمكِّن من بناء تجارب رقمية حكومية متّسقة وقابلة للوصول وعالية الأداء."
hero_image_pos: 50% 10%
lang: ar
direction: rtl
---

<!-- Internal dev/test scratch page. Drop components here to test in isolation. -->

<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">nds-editor (prototype)</h2>
      <p class="nds-section-description">Contenteditable rich text editor prototyped inline; iterating on playground.md before promoting to a real component.</p>
    </div>
    <div class="nds-section-body">

    <form class="nds-flex nds-col" onsubmit="event.preventDefault(); const fd = new FormData(this); console.log('form submit →', Object.fromEntries(fd));">

      <div class="nds-form-container nds-textarea nds-editor" data-nds-editor>
        <div class="nds-form-header">
          <label for="story"><span class="nds-label">Story</span></label>
        </div>

        <div class="nds-toolbar" role="toolbar" aria-label="Formatting">
          <div class="nds-bar-row">
          <div class="nds-bar-info">
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="bold"      aria-pressed="false" aria-label="Bold"><i class="hgi hgi-stroke hgi-text-bold" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="italic"    aria-pressed="false" aria-label="Italic"><i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="underline" aria-pressed="false" aria-label="Underline"><i class="hgi hgi-stroke hgi-text-underline" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="strike"    aria-pressed="false" aria-label="Strikethrough"><i class="hgi hgi-stroke hgi-text-strikethrough" aria-hidden="true"></i></button>
            </div>
            <div class="nds-dropmenu" data-nds-editor-link-dropmenu>
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" data-cmd="link" aria-pressed="false" aria-label="Insert link"><i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i></button>
              <div class="nds-dropmenu-menu" hidden>
                <div class="nds-dropmenu-scroll nds-flex nds-col" style="--gap: var(--spacing-md); padding: var(--spacing-md); min-inline-size: 20rem;">
                  <div class="nds-form-container nds-input">
                    <div class="nds-form-header"><label><span class="nds-label">URL</span></label></div>
                    <div class="nds-form-control">
                      <input type="url" class="nds-input" placeholder="https://" autocomplete="off" data-nds-editor-link-url />
                    </div>
                  </div>
                  <div class="nds-flex" style="--gap: var(--spacing-sm); --justify: flex-end;">
                    <button type="button" class="nds-btn nds-subtle" data-nds-editor-link-unlink hidden><span class="nds-label">Unlink</span></button>
                    <button type="button" class="nds-btn nds-primary" data-nds-editor-link-confirm data-dropmenu-primary><span class="nds-label">Insert</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="h1" aria-pressed="false" aria-label="Heading 1"><i class="hgi hgi-stroke hgi-heading-01" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="h2" aria-pressed="false" aria-label="Heading 2"><i class="hgi hgi-stroke hgi-heading-02" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="h3" aria-pressed="false" aria-label="Heading 3"><i class="hgi hgi-stroke hgi-heading-03" aria-hidden="true"></i></button>
            </div>
            <div class="nds-btn-group">
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="ul" aria-pressed="false" aria-label="Bulleted list"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></button>
              <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-cmd="ol" aria-pressed="false" aria-label="Numbered list"><i class="hgi hgi-stroke hgi-left-to-right-list-number" aria-hidden="true"></i></button>
            </div>
          </div>
          <div class="nds-bar-actions">
            <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" data-source-toggle aria-pressed="false" aria-label="View HTML source"><i class="hgi hgi-stroke hgi-source-code" aria-hidden="true"></i></button>
          </div>
          </div>
        </div>

        <div class="nds-form-control">
          <div class="nds-editor__editable"
               contenteditable="true"
               role="textbox"
               aria-multiline="true"
               aria-labelledby="story"
               data-placeholder="اكتب هنا…"><p><br></p></div>
          <textarea class="nds-textarea nds-editor__source" name="story" id="story" hidden></textarea>
        </div>
      </div>

      <div>
        <button type="submit" class="nds-btn nds-primary"><span class="nds-label">Submit (logs to console)</span></button>
      </div>
    </form>

    </div>
  </div>
</section>

<style>
  /* nds-editor prototype — only rules NDS chrome doesn't already provide. */

  /* Editable & source share the .nds-form-control chrome (border, focus underline, background) from NDS. */
  .nds-editor__editable {
    position: relative;
    min-block-size: 12rem;
    inline-size: 100%;
    padding: var(--spacing-md);
    line-height: 1.6;
    outline: none;
    overflow-wrap: break-word;
  }
  .nds-editor__editable.is-empty::before {
    content: attr(data-placeholder);
    color: var(--form-field-text-placeholder);
    pointer-events: none;
    position: absolute;
    inset-block-start: var(--spacing-md);
    inset-inline-start: var(--spacing-md);
  }
  .nds-editor__editable :is(h1, h2, h3, p, ul, ol) { margin-block: var(--spacing-sm); }
  .nds-editor__editable :is(ul, ol) { margin-inline-start: var(--spacing-lg); padding-inline-start: var(--spacing-md); }
  .nds-editor__editable :is(h1, h2, h3, p, ul, ol):first-child { margin-block-start: 0; }
  .nds-editor__editable :is(h1, h2, h3, p, ul, ol):last-child  { margin-block-end: 0; }
  /* Transient <div> Chrome may inject during editing — sanitizer strips it from form value; keep it flush visually. */
  .nds-editor__editable div { margin: 0; }

  /* Pressed state for icon toolbar buttons — aria-pressed is standard ARIA; NDS buttons don't style it natively. */
  .nds-editor .nds-toolbar .nds-btn[aria-pressed="true"] {
    background: var(--form-field-background-darker);
  }

  /* Source view: swap editable for textarea. Textarea inherits .nds-textarea chrome from the form-control. */
  .nds-editor.is-source .nds-editor__editable { display: none; }
  .nds-editor.is-source .nds-toolbar .nds-btn[data-cmd] { opacity: 0.5; pointer-events: none; }
  .nds-editor__source {
    /* Code always reads LTR, even on an RTL page. */
    direction: ltr;
    text-align: left;
    unicode-bidi: isolate;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.875rem;
    min-block-size: 12rem;
  }
</style>

<script>
  /* nds-editor prototype — iterate here, promote to _js/nds-editor.js when stable */
  (() => {
    const LOG_PREFIX = 'NDS Editor';
    const INIT_ATTR  = 'data-nds-editor-initialized';

    // ponytail: tag-whitelist paste sanitizer. Upgrade to DOMPurify if a security review demands attribute scrubbing or fuller spec compliance.
    // <p> is allowed as a top-level wrapper for bare text. Sanitizer flattens any <p> that nests a block child or another <p>.
    const ALLOWED_TAGS   = new Set(['P','BR','STRONG','EM','B','I','U','S','STRIKE','A','H1','H2','H3','UL','OL','LI']);
    const BLOCK_TAGS     = new Set(['P','H1','H2','H3','LI']);
    const INLINE_OK_IN_P = new Set(['BR','STRONG','EM','B','I','U','S','STRIKE','A']);
    const CMD_BLOCK_MAP  = { h1: 'H1', h2: 'H2', h3: 'H3' };
    // Safe URL protocols for <a href>. javascript:, data:, vbscript: rejected.
    const SAFE_URL = /^(?:https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/i;

    class Editor {
      constructor(root) {
        this.root     = root;
        this.editable = root.querySelector('.nds-editor__editable');
        this.source   = root.querySelector('.nds-editor__source');
        this.toolbar  = root.querySelector('.nds-toolbar');
        this.buttons  = Array.from(this.toolbar.querySelectorAll('[data-cmd]'));
        this.abortController = new AbortController();
        this._rafId = 0;
        this.init();
      }

      init() {
        if (this.root.hasAttribute(INIT_ATTR)) return;
        this.root.setAttribute(INIT_ATTR, '');
        const { signal } = this.abortController;

        // ponytail: use <p> as new-block separator. Native Enter now gives clean <p>-per-paragraph.
        try { document.execCommand('defaultParagraphSeparator', false, 'p'); } catch { /* older UAs */ }

        if (this.source.value) {
          this.editable.innerHTML = this._sanitizeHtml(this.source.value);
        }
        this._syncSource();

        this.toolbar.addEventListener('mousedown', (e) => {
          // ponytail: preventDefault on mousedown keeps the editable's selection intact when a toolbar button is clicked.
          const cmdBtn = e.target.closest('[data-cmd]');
          if (!cmdBtn) return;
          e.preventDefault();
          // NDS.Dropmenu's trigger click stopPropagations, so our toolbar-level click delegate never fires for the link button.
          // Prep the dropmenu on mousedown instead — the trigger's click will then open the (already-prepped) menu.
          if (cmdBtn.dataset.cmd === 'link') this._applyLink();
        }, { signal });

        this.toolbar.addEventListener('click', this._onToolbarClick.bind(this), { signal });
        this.editable.addEventListener('input', this._onInput.bind(this), { signal });
        this.editable.addEventListener('paste', this._onPaste.bind(this), { signal });
        this.editable.addEventListener('keydown', this._onKeydown.bind(this), { signal });
        document.addEventListener('selectionchange', this._scheduleToolbarSync.bind(this), { signal });

        // Mirror NDS.Forms interactive states on the container for the contenteditable
        // (NDS.Forms only delegates to <input>/<textarea>/<select>, so the div is skipped).
        // ponytail: NDS.State.add/remove return undefined, so `?? fallback` runs the fallback too — that clobbers other tokens. Branch on existence instead.
        const useNDSState = !!(window.NDS && NDS.State && NDS.State.add && NDS.State.remove);
        const setState = (name) => {
          if (useNDSState) { NDS.State.add(this.root, name); return; }
          const cur = new Set((this.root.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));
          cur.add(name);
          this.root.setAttribute('data-state', [...cur].join(' '));
        };
        const clearState = (name) => {
          if (useNDSState) { NDS.State.remove(this.root, name); return; }
          const cur = new Set((this.root.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));
          cur.delete(name);
          if (cur.size) this.root.setAttribute('data-state', [...cur].join(' '));
          else this.root.removeAttribute('data-state');
        };
        this.editable.addEventListener('focus', () => { setState('focus'); this._valueAtFocus = this.source.value; }, { signal });
        this.editable.addEventListener('blur',  () => {
          clearState('focus');
          clearState('typing');
          if (this.source.value !== this._valueAtFocus) {
            this.source.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }, { signal });
        this.editable.addEventListener('keydown',   () => setState('typing'), { signal });
        this.editable.addEventListener('paste',     () => setState('typing'), { signal });
        this.editable.addEventListener('mousedown', () => setState('active'), { signal });
        this.editable.addEventListener('mouseup',   () => clearState('active'), { signal });
        this.editable.addEventListener('mouseleave',() => clearState('active'), { signal });

        // Link dropmenu wiring (menu lives inside the editor root, next to the trigger button).
        const linkMenu = this.root.querySelector('[data-nds-editor-link-dropmenu] .nds-dropmenu-menu');
        if (linkMenu) {
          linkMenu.addEventListener('click', (e) => {
            if (e.target.closest('[data-nds-editor-link-confirm]')) this._confirmLink();
            else if (e.target.closest('[data-nds-editor-link-unlink]')) this._unlinkFromMenu();
          }, { signal });
          const urlInput = linkMenu.querySelector('[data-nds-editor-link-url]');
          urlInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); this._confirmLink(); }
          }, { signal });
        }
      }

      destroy() {
        this.abortController.abort();
        this.root.removeAttribute(INIT_ATTR);
      }

      _onToolbarClick(e) {
        const sourceBtn = e.target.closest('[data-source-toggle]');
        if (sourceBtn) { this._toggleSourceView(); return; }
        const btn = e.target.closest('[data-cmd]');
        if (!btn || this.root.classList.contains('is-source')) return;
        this.editable.focus();
        this._applyCommand(btn.dataset.cmd);
        this._syncSource();
        this._updateToolbarState();
      }

      _toggleSourceView() {
        const btn = this.toolbar.querySelector('[data-source-toggle]');
        const entering = !this.root.classList.contains('is-source');
        if (entering) {
          // Sync sanitized HTML into the textarea BEFORE showing it, so the user sees the same clean value that would be submitted.
          this._syncSource();
          this.source.removeAttribute('hidden');
          this.root.classList.add('is-source');
          btn.setAttribute('aria-pressed', 'true');
          this.source.focus();
        } else {
          // Sanitize whatever the user typed in source view before it becomes visual DOM.
          const clean = this._sanitizeHtml(this.source.value);
          this.editable.innerHTML = clean || '<p><br></p>';
          this.source.setAttribute('hidden', '');
          this.root.classList.remove('is-source');
          btn.setAttribute('aria-pressed', 'false');
          this._syncSource();
          this._updateToolbarState();
          this.editable.focus();
        }
      }

      _onInput() {
        this._syncSource();
        this._scheduleToolbarSync();
      }

      _onKeydown(e) {
        // Cmd/Ctrl + B / I keyboard shortcuts.
        if ((e.ctrlKey || e.metaKey) && !e.altKey) {
          const key = e.key.toLowerCase();
          if (key === 'b') { e.preventDefault(); this._applyCommand('bold');      this._syncSource(); this._updateToolbarState(); return; }
          if (key === 'i') { e.preventDefault(); this._applyCommand('italic');    this._syncSource(); this._updateToolbarState(); return; }
          if (key === 'u') { e.preventDefault(); this._applyCommand('underline'); this._syncSource(); this._updateToolbarState(); return; }
        }
        // Native Enter (with defaultParagraphSeparator=p) gives clean <p> per paragraph; no override needed.
      }

      _onPaste(e) {
        e.preventDefault();
        const html = e.clipboardData.getData('text/html');
        const text = e.clipboardData.getData('text/plain');
        let insert;
        if (html) {
          insert = this._sanitizeHtml(html);
        } else {
          insert = this._escapeText(text).replace(/\n/g, '<br>');
        }
        if (!insert) return;
        // ponytail: execCommand('insertHTML') keeps the native undo stack. Fallback below if a UA removes it.
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

      _applyCommand(cmd) {
        // ponytail: execCommand for writes. Deprecated but universally supported, native undo integration, RTL/bidi selection handled by the browser. Replace one command at a time only if a specific browser misbehaves.
        switch (cmd) {
          case 'bold':      document.execCommand('bold');          break;
          case 'italic':    document.execCommand('italic');        break;
          case 'underline': document.execCommand('underline');     break;
          case 'strike':    document.execCommand('strikeThrough'); break;
          case 'link':      /* handled by mousedown + dropmenu — no-op here. */ break;
          case 'ul':        document.execCommand('insertUnorderedList'); break;
          case 'ol':        document.execCommand('insertOrderedList');   break;
          case 'h1':
          case 'h2':
          case 'h3': {
            const targetTag = CMD_BLOCK_MAP[cmd];
            const currentBlock = this._getBlockContext();
            const nextTag = (currentBlock && currentBlock.tagName === targetTag) ? 'P' : targetTag;
            document.execCommand('formatBlock', false, nextTag);
            break;
          }
          default:
            console.warn(`${LOG_PREFIX}: unknown command "${cmd}"`);
        }
      }

      _applyLink() {
        // The link button is also the dropmenu trigger — NDS.Dropmenu opens the menu on click.
        // Our job here is just to prep the menu (pre-fill URL, show/hide unlink) and save the current selection.
        const sel = window.getSelection();
        this._pendingLinkRange = (sel.rangeCount && this.editable.contains(sel.anchorNode))
          ? sel.getRangeAt(0).cloneRange()
          : null;

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
          console.warn(`${LOG_PREFIX}: rejected unsafe or empty URL`, url);
          return;
        }
        dropmenu?.ndsDropmenu?.close?.();

        this.editable.focus();
        const range = this._pendingLinkRange;
        this._pendingLinkRange = null;
        const sel = window.getSelection();
        if (range) { sel.removeAllRanges(); sel.addRange(range); }

        const existing = this._getAncestorTag('A');
        if (existing) {
          // Updating an existing link — set the href in place.
          existing.setAttribute('href', url);
        } else if (sel.rangeCount && !sel.isCollapsed) {
          // Wrap the selection.
          document.execCommand('createLink', false, url);
        } else {
          // No selection — insert the URL as its own link text.
          const escaped = url.replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
          document.execCommand('insertHTML', false, `<a href="${escaped}">${escaped}</a>`);
        }
        this._syncSource();
        this._updateToolbarState();
      }

      _unlinkFromMenu() {
        const dropmenu = this.root.querySelector('[data-nds-editor-link-dropmenu]');
        dropmenu?.ndsDropmenu?.close?.();
        this.editable.focus();
        const range = this._pendingLinkRange;
        this._pendingLinkRange = null;
        if (range) { const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); }
        document.execCommand('unlink');
        this._syncSource();
        this._updateToolbarState();
      }

      _getAncestorTag(tagName) {
        const sel = window.getSelection();
        if (!sel.rangeCount) return null;
        let node = sel.anchorNode;
        if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
        while (node && node !== this.editable) {
          if (node.tagName === tagName) return node;
          node = node.parentElement;
        }
        return null;
      }

      _getBlockContext() {
        const sel = window.getSelection();
        if (!sel.rangeCount) return null;
        let node = sel.anchorNode;
        if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement;
        while (node && node !== this.editable) {
          if (BLOCK_TAGS.has(node.tagName)) return node;
          node = node.parentElement;
        }
        return null;
      }

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
        const inList = block && block.tagName === 'LI'
          ? block.closest('ul,ol')?.tagName
          : null;

        for (const btn of this.buttons) {
          const cmd = btn.dataset.cmd;
          let pressed = false;
          if (cmd === 'bold')          pressed = this._safeQueryState('bold');
          else if (cmd === 'italic')   pressed = this._safeQueryState('italic');
          else if (cmd === 'underline') pressed = this._safeQueryState('underline');
          else if (cmd === 'strike')   pressed = this._safeQueryState('strikeThrough');
          else if (cmd === 'link')     pressed = !!this._getAncestorTag('A');
          else if (cmd === 'h1' || cmd === 'h2' || cmd === 'h3') pressed = blockTag === CMD_BLOCK_MAP[cmd];
          else if (cmd === 'ul')   pressed = inList === 'UL';
          else if (cmd === 'ol')   pressed = inList === 'OL';
          btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        }
      }

      _safeQueryState(name) {
        try { return document.queryCommandState(name); } catch { return false; }
      }

      _syncSource() {
        const empty = this._isEditableEffectivelyEmpty();
        this.editable.classList.toggle('is-empty', empty);
        const next = empty
          ? ''
          // ponytail: sanitize on every sync so <div> and invalid <p> nesting Chrome injects during typing never reach the form value.
          : this._prettyPrintHtml(this._sanitizeHtml(this.editable.innerHTML));
        if (this.source.value === next) return;
        this.source.value = next;
        // Programmatic .value = "..." does NOT fire 'input'; dispatch it so NDS.Forms and any parent validator see the change.
        this.source.dispatchEvent(new Event('input', { bubbles: true }));
      }

      _prettyPrintHtml(html) {
        const doc  = new DOMParser().parseFromString(`<div id="r">${html}</div>`, 'text/html');
        const root = doc.getElementById('r');
        return this._formatNode(root, 0).replace(/\n+$/, '');
      }

      _formatNode(node, depth) {
        const pad = '  '.repeat(depth);
        let out = '';
        for (const child of node.childNodes) {
          if (child.nodeType === Node.TEXT_NODE) {
            const t = child.textContent.replace(/\s+/g, ' ').trim();
            if (t) out += pad + t + '\n';
            continue;
          }
          if (child.nodeType !== Node.ELEMENT_NODE) continue;
          const tag = child.tagName.toLowerCase();
          if (tag === 'ul' || tag === 'ol') {
            out += `${pad}<${tag}>\n`;
            out += this._formatNode(child, depth + 1);
            out += `${pad}</${tag}>\n`;
          } else {
            // Block with inline content — render self-contained on one line.
            out += `${pad}<${tag}>${child.innerHTML}</${tag}>\n`;
          }
        }
        return out;
      }

      _isEditableEffectivelyEmpty() {
        return this.editable.textContent.trim() === ''
          && this.editable.querySelectorAll('ul, ol, h1, h2, h3, img').length === 0;
      }

      _escapeText(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }

      _sanitizeHtml(dirty) {
        const doc = new DOMParser().parseFromString(`<div id="root">${dirty}</div>`, 'text/html');
        const root = doc.getElementById('root');
        this._sanitizeNode(root);
        // Strip attributes; keep only href on <a> when the URL protocol is safe. Unwrap <a> that ends up hrefless.
        for (const el of root.querySelectorAll('*')) {
          const isAnchor = el.tagName === 'A';
          const href = isAnchor ? el.getAttribute('href') : null;
          for (const attr of Array.from(el.attributes)) el.removeAttribute(attr.name);
          if (isAnchor) {
            if (href && SAFE_URL.test(href)) {
              el.setAttribute('href', href);
              el.setAttribute('rel', 'noopener noreferrer');
            } else {
              while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
              el.remove();
            }
          }
        }
        this._flattenBadPWrappers(root);
        return root.innerHTML;
      }

      _flattenBadPWrappers(root) {
        // <p> may only contain inline children. Any <p> wrapping a block (ol/ul/h1-3/li) or another <p> gets unwrapped.
        // querySelectorAll returns document order; unwrapping an outer <p> hoists its children up, and any inner <p> now standalone is already in our snapshot so it gets checked on its own turn.
        const ps = Array.from(root.querySelectorAll('p'));
        for (const p of ps) {
          if (!p.parentNode) continue;
          let bad = false;
          for (const child of p.children) {
            if (!INLINE_OK_IN_P.has(child.tagName)) { bad = true; break; }
          }
          if (bad) {
            while (p.firstChild) p.parentNode.insertBefore(p.firstChild, p);
            p.remove();
          }
        }
      }

      _sanitizeNode(node) {
        for (const child of Array.from(node.childNodes)) {
          if (child.nodeType === Node.TEXT_NODE) continue;
          if (child.nodeType !== Node.ELEMENT_NODE) { child.remove(); continue; }
          // Recurse first so nested disallowed tags resolve on one pass.
          this._sanitizeNode(child);
          if (!ALLOWED_TAGS.has(child.tagName)) {
            while (child.firstChild) node.insertBefore(child.firstChild, child);
            child.remove();
          }
        }
      }
    }

    const boot = () => {
      document.querySelectorAll('[data-nds-editor]').forEach(el => {
        try { new Editor(el); }
        catch (err) { console.error(`${LOG_PREFIX}: init failed`, err); }
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
      boot();
    }
  })();
</script>
