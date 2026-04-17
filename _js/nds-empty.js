/**
 * NDS Empty Component
 * Auto-fills empty containers with a localized "no content" placeholder.
 *
 *   <div class="nds-empty"></div>
 *   <ul class="nds-empty"></ul>
 *   <table class="nds-empty"><thead>...</thead></table>
 *   <tbody class="nds-empty"></tbody>
 *
 * Override the default message with data-empty-message="..." on the container.
 */
(() => {
  'use strict';

  const STRINGS = {
    ar: 'لا يوجد محتوى',
    en: 'No content to show',
  };
  const PLACEHOLDER_ATTR = 'data-nds-empty-placeholder';
  const observers = new WeakMap();

  function pickLang() {
    return NDS.isArabic ? 'ar' : 'en';
  }

  function getMessage(container) {
    const custom = container.getAttribute('data-empty-message');
    return custom && custom.trim() ? custom : STRINGS[pickLang()];
  }

  function isPlaceholder(el) {
    return el.nodeType === 1 && el.hasAttribute(PLACEHOLDER_ATTR);
  }

  function realChildCount(container) {
    let n = 0;
    for (const c of container.children) if (!isPlaceholder(c)) n++;
    return n;
  }

  // "Empty" means: no content rows. For a table, thead/tfoot/caption don't
  // count as content — only non-placeholder rows inside tbody do.
  function isEmpty(container) {
    if (container.tagName === 'TABLE') {
      const bodies = [];
      for (const c of container.children) {
        if (c.tagName === 'TBODY' && !isPlaceholder(c)) bodies.push(c);
      }
      if (bodies.length === 0) return true;
      return bodies.every(tb => realChildCount(tb) === 0);
    }
    return realChildCount(container) === 0;
  }

  function findPlaceholder(container) {
    if (container.tagName === 'TABLE') {
      return container.querySelector(
        ':scope > [' + PLACEHOLDER_ATTR + '], :scope > tbody > [' + PLACEHOLDER_ATTR + ']'
      );
    }
    for (const c of container.children) if (isPlaceholder(c)) return c;
    return null;
  }

  function colspanFor(table) {
    const headRow = table.querySelector(':scope > thead > tr');
    if (headRow && headRow.children.length) return headRow.children.length;
    const firstRow = table.querySelector('tr');
    return (firstRow && firstRow.children.length) || 1;
  }

  function buildInner(message) {
    const icon = document.createElement('i');
    icon.className = 'nds-icon nds-hgi-desert';
    icon.setAttribute('aria-hidden', 'true');
    const span = document.createElement('span');
    span.className = 'nds-empty-message';
    span.textContent = message;
    return [icon, span];
  }

  function buildListItem(message) {
    const li = document.createElement('li');
    li.className = 'nds-empty-placeholder';
    li.setAttribute(PLACEHOLDER_ATTR, '');
    buildInner(message).forEach(n => li.appendChild(n));
    return li;
  }

  function buildRow(colspan, message) {
    const tr = document.createElement('tr');
    tr.setAttribute(PLACEHOLDER_ATTR, '');
    const td = document.createElement('td');
    td.colSpan = colspan;
    buildInner(message).forEach(n => td.appendChild(n));
    tr.appendChild(td);
    return tr;
  }

  function buildDiv(message) {
    const div = document.createElement('div');
    div.className = 'nds-empty-placeholder';
    div.setAttribute(PLACEHOLDER_ATTR, '');
    buildInner(message).forEach(n => div.appendChild(n));
    return div;
  }

  function inject(container) {
    const message = getMessage(container);
    const tag = container.tagName;

    if (tag === 'UL' || tag === 'OL') {
      container.appendChild(buildListItem(message));
      return;
    }
    if (tag === 'TBODY') {
      container.appendChild(buildRow(colspanFor(container.closest('table') || container), message));
      return;
    }
    if (tag === 'TABLE') {
      const existingTbody = container.querySelector(':scope > tbody:not([' + PLACEHOLDER_ATTR + '])');
      if (existingTbody) {
        existingTbody.appendChild(buildRow(colspanFor(container), message));
        return;
      }
      const tbody = document.createElement('tbody');
      tbody.setAttribute(PLACEHOLDER_ATTR, '');
      tbody.appendChild(buildRow(colspanFor(container), message));
      container.appendChild(tbody);
      return;
    }
    container.appendChild(buildDiv(message));
  }

  function evaluate(container) {
    if (!container || !container.classList.contains('nds-empty')) return;
    const existing = findPlaceholder(container);

    if (!isEmpty(container)) {
      if (existing) existing.remove();
      return;
    }
    if (existing) return;
    inject(container);
  }

  function refreshMessage(container) {
    const ph = findPlaceholder(container);
    if (!ph) return;
    const span = ph.querySelector('.nds-empty-message');
    if (span) span.textContent = getMessage(container);
  }

  function attach(container) {
    if (observers.has(container)) return;
    const subtree = container.tagName === 'TABLE';
    // Local per-container MutationObserver — the shared NDS.onDOMAdd/onDOMRemove
    // pool cannot cover add-AND-remove detection here because it matches via
    // selectors like '.nds-empty > *' which use the '>' combinator. That
    // combinator requires a parent context, which removed nodes no longer have
    // (parentNode is null after detachment). A per-container childList observer
    // sees removals directly without relying on detached-node selector matching.
    const obs = new MutationObserver(() => evaluate(container));
    obs.observe(container, { childList: true, subtree });
    observers.set(container, obs);
    evaluate(container);
  }

  const NDSEmpty = {
    init() {
      document.querySelectorAll('.nds-empty').forEach(attach);
      NDS.onDOMAdd('.nds-empty', hits => hits.forEach(attach));
      NDS.onAttrChange('.nds-empty', ['data-empty-message'], hits => hits.forEach(refreshMessage));
    },
    refresh: evaluate,
  };

  window.NDS = window.NDS || {};
  window.NDS.Empty = NDSEmpty;
})();
