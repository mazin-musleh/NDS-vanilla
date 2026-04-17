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
 * Override the default icon with data-empty-icon="..." — the value is written
 * straight onto the placeholder's <i> className, so any icon system works
 * (e.g. "nds-icon nds-hgi-search-01" or "hgi hgi-stroke hgi-notification-off-01").
 */
(() => {
  'use strict';

  const STRINGS = {
    ar: 'لا يوجد محتوى',
    en: 'No content to show',
  };
  const PLACEHOLDER_ATTR = 'data-nds-empty-placeholder';
  const DEFAULT_ICON_CLASS = 'nds-icon nds-hgi-desert';

  function pickLang() {
    return NDS.isArabic ? 'ar' : 'en';
  }

  function getMessage(container) {
    const custom = container.getAttribute('data-empty-message');
    return custom && custom.trim() ? custom : STRINGS[pickLang()];
  }

  function getIconClass(container) {
    const custom = container.getAttribute('data-empty-icon');
    return custom && custom.trim() ? custom.trim() : DEFAULT_ICON_CLASS;
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

  function buildInner(message, iconClass) {
    const icon = document.createElement('i');
    icon.className = iconClass;
    icon.setAttribute('aria-hidden', 'true');
    const span = document.createElement('span');
    span.className = 'nds-empty-message';
    span.textContent = message;
    return [icon, span];
  }

  function buildListItem(message, iconClass) {
    const li = document.createElement('li');
    li.className = 'nds-empty-placeholder';
    li.setAttribute(PLACEHOLDER_ATTR, '');
    buildInner(message, iconClass).forEach(n => li.appendChild(n));
    return li;
  }

  function buildRow(colspan, message, iconClass) {
    const tr = document.createElement('tr');
    tr.setAttribute(PLACEHOLDER_ATTR, '');
    const td = document.createElement('td');
    td.colSpan = colspan;
    buildInner(message, iconClass).forEach(n => td.appendChild(n));
    tr.appendChild(td);
    return tr;
  }

  function buildDiv(message, iconClass) {
    const div = document.createElement('div');
    div.className = 'nds-empty-placeholder';
    div.setAttribute(PLACEHOLDER_ATTR, '');
    buildInner(message, iconClass).forEach(n => div.appendChild(n));
    return div;
  }

  function inject(container) {
    const message = getMessage(container);
    const iconClass = getIconClass(container);
    const tag = container.tagName;

    if (tag === 'UL' || tag === 'OL') {
      container.appendChild(buildListItem(message, iconClass));
      return;
    }
    if (tag === 'TBODY') {
      container.appendChild(buildRow(colspanFor(container.closest('table') || container), message, iconClass));
      return;
    }
    if (tag === 'TABLE') {
      const existingTbody = container.querySelector(':scope > tbody:not([' + PLACEHOLDER_ATTR + '])');
      if (existingTbody) {
        existingTbody.appendChild(buildRow(colspanFor(container), message, iconClass));
        return;
      }
      const tbody = document.createElement('tbody');
      tbody.setAttribute(PLACEHOLDER_ATTR, '');
      tbody.appendChild(buildRow(colspanFor(container), message, iconClass));
      container.appendChild(tbody);
      return;
    }
    container.appendChild(buildDiv(message, iconClass));
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

  function refreshIcon(container) {
    const ph = findPlaceholder(container);
    if (!ph) return;
    const icon = ph.querySelector('i');
    if (icon) icon.className = getIconClass(container);
  }

  const NDSEmpty = {
    init() {
      document.querySelectorAll('.nds-empty').forEach(evaluate);
      NDS.onDOMAdd('.nds-empty', hits => hits.forEach(evaluate));
      NDS.onChildrenChange('.nds-empty', hits => hits.forEach(evaluate));
      NDS.onChildrenChange('table.nds-empty > tbody', hits => {
        hits.forEach(tb => evaluate(tb.parentElement));
      });
      NDS.onAttrChange('.nds-empty', ['data-empty-message', 'data-empty-icon'], hits => {
        hits.forEach(c => { refreshMessage(c); refreshIcon(c); });
      });
    },
    refresh: evaluate,
  };

  window.NDS = window.NDS || {};
  window.NDS.Empty = NDSEmpty;
})();
