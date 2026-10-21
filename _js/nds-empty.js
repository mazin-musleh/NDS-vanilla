/* NDS.Empty — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Empty.init()                fill every empty .nds-empty now, then keep watching
 *   NDS.Empty.refresh(container)    re-evaluate one container by hand; also resyncs a table
 *                                   placeholder's colspan to the current column count
 * Events:
 *   (none)
 * Hooks:
 *   data-empty-message   replace the localized default text
 *   data-empty-icon      the value is written straight onto the placeholder's <i>
 *                        className, so any icon system works
 * Gotchas:
 *   - Put .nds-empty on the CONTAINER. It works on a div, a ul/ol, a table or a tbody, and
 *     builds a placeholder that fits that element.
 *   - In a table only non-placeholder rows inside a tbody count as content — thead, tfoot
 *     and caption do not.
 *   - init() runs once. Added and removed children, and changes to the two attributes, are
 *     picked up by the shared observers, so there is no reinit().
 */
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

  // English defaults; the assets/i18n/{lang}.json pack overrides them.
  const strings = NDS.i18n.getStrings('empty', {
    message: 'No content to show',
  });
  const PLACEHOLDER_ATTRIBUTE = 'data-nds-empty-placeholder';
  const DEFAULT_ICON_CLASS = 'nds-icon nds-hgi-desert';

  function getMessage(container) {
    const custom = container.getAttribute('data-empty-message');
    return custom && custom.trim() ? custom : strings.text('message');
  }

  function getIconClass(container) {
    const custom = container.getAttribute('data-empty-icon');
    return custom && custom.trim() ? custom.trim() : DEFAULT_ICON_CLASS;
  }

  function isPlaceholder(el) {
    return el.hasAttribute(PLACEHOLDER_ATTRIBUTE);
  }

  function countRealChildren(container) {
    let count = 0;
    for (const child of container.children) if (!isPlaceholder(child)) count++;
    return count;
  }

  // "Empty" means: no content rows. For a table, thead/tfoot/caption don't
  // count as content — only non-placeholder rows inside tbody do.
  function isEmpty(container) {
    if (container.tagName === 'TABLE') {
      const bodies = [];
      for (const child of container.children) {
        if (child.tagName === 'TBODY' && !isPlaceholder(child)) bodies.push(child);
      }
      if (bodies.length === 0) return true;
      return bodies.every(tbody => countRealChildren(tbody) === 0);
    }
    return countRealChildren(container) === 0;
  }

  function findPlaceholder(container) {
    if (container.tagName === 'TABLE') {
      return container.querySelector(
        ':scope > [' + PLACEHOLDER_ATTRIBUTE + '], :scope > tbody > [' + PLACEHOLDER_ATTRIBUTE + ']'
      );
    }
    for (const child of container.children) if (isPlaceholder(child)) return child;
    return null;
  }

  function getColspan(table) {
    const headRow = table.querySelector(':scope > thead > tr');
    if (headRow && headRow.children.length) return headRow.children.length;
    const firstRow = table.querySelector('tr');
    return (firstRow && firstRow.children.length) || 1;
  }

  function buildInner(message, iconClass) {
    const icon = document.createElement('i');
    icon.className = iconClass;
    NDS.aria.hidden(icon, true);
    const span = document.createElement('span');
    span.className = 'nds-empty-message';
    span.textContent = message;
    return [icon, span];
  }

  function buildListItem(message, iconClass) {
    const item = document.createElement('li');
    item.className = 'nds-empty-placeholder';
    item.setAttribute(PLACEHOLDER_ATTRIBUTE, '');
    buildInner(message, iconClass).forEach(node => item.appendChild(node));
    return item;
  }

  function buildRow(colspan, message, iconClass) {
    const tr = document.createElement('tr');
    tr.setAttribute(PLACEHOLDER_ATTRIBUTE, '');
    const td = document.createElement('td');
    td.colSpan = colspan;
    buildInner(message, iconClass).forEach(node => td.appendChild(node));
    tr.appendChild(td);
    return tr;
  }

  function buildDiv(message, iconClass) {
    const div = document.createElement('div');
    div.className = 'nds-empty-placeholder';
    div.setAttribute(PLACEHOLDER_ATTRIBUTE, '');
    buildInner(message, iconClass).forEach(node => div.appendChild(node));
    return div;
  }

  function inject(container) {
    place(container);
    if ((container.getAttribute('data-empty-message') || '').trim()) return;
    // The default text is a marker: core writes it in the page language, as a bar until it lands.
    strings.set(findPlaceholder(container).querySelector('.nds-empty-message'), 'text', 'message');
  }

  function place(container) {
    const message = getMessage(container);
    const iconClass = getIconClass(container);
    const tag = container.tagName;

    if (tag === 'UL' || tag === 'OL') {
      container.appendChild(buildListItem(message, iconClass));
      return;
    }
    if (tag === 'TBODY') {
      container.appendChild(buildRow(getColspan(container.closest('table') || container), message, iconClass));
      return;
    }
    if (tag === 'TABLE') {
      const existingTbody = container.querySelector(':scope > tbody:not([' + PLACEHOLDER_ATTRIBUTE + '])');
      if (existingTbody) {
        existingTbody.appendChild(buildRow(getColspan(container), message, iconClass));
        return;
      }
      const tbody = document.createElement('tbody');
      tbody.setAttribute(PLACEHOLDER_ATTRIBUTE, '');
      tbody.appendChild(buildRow(getColspan(container), message, iconClass));
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
    if (existing) {
      // A table's column count can change after the row went in.
      const td = existing.querySelector('td');
      if (td) td.colSpan = getColspan(container.closest('table') || container);
      return;
    }
    inject(container);
  }

  function syncMessage(container) {
    const placeholder = findPlaceholder(container);
    if (!placeholder) return;
    const span = placeholder.querySelector('.nds-empty-message');
    if (span) span.textContent = getMessage(container);
  }

  function syncIcon(container) {
    const placeholder = findPlaceholder(container);
    if (!placeholder) return;
    const icon = placeholder.querySelector('i');
    if (icon) icon.className = getIconClass(container);
  }

  // One-shot init guard. A re-run of init (e.g. NDS.init.initialize()) would
  // otherwise re-stack the four pool subscriptions below on every
  // re-call — onDomAdd / onChildrenChange / onAttributeChange all push
  // unconditionally with no (selector, fn) dedup in core. The single init at
  // page load wires the subscribers; subsequent .nds-empty mutations are
  // already handled by those long-lived subscribers, so a re-call has nothing
  // to do beyond what they're already doing.
  let initDone = false;

  const api = {
    init() {
      if (initDone) return;
      initDone = true;
      document.querySelectorAll('.nds-empty').forEach(evaluate);
      NDS.onDomAdd('.nds-empty', hits => hits.forEach(evaluate));
      NDS.onChildrenChange('.nds-empty', hits => hits.forEach(evaluate));
      NDS.onChildrenChange('table.nds-empty > tbody', hits => {
        hits.forEach(tbody => evaluate(tbody.parentElement));
      });
      NDS.onAttributeChange('.nds-empty', ['data-empty-message', 'data-empty-icon'], hits => {
        hits.forEach(container => { syncMessage(container); syncIcon(container); });
      });
    },
    refresh: evaluate,
  };

  window.NDS.Empty = api;
})();
