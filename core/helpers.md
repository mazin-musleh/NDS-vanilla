---
layout: page
title: Helpers
hero_title: Helpers - National Design System
hero_description: The shared functions that NDS components use, and that your page code can call too
breadcrumb: [["Core", "/components/?shelf=Core"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "31/10/2026 - 11:09 PM"
---

<section id="helpers-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The helpers are functions on `NDS` that your page code can call. They write states and ARIA attributes, read facts about the page, watch elements, time your code, handle scroll and focus, work with text, and add validation rules. The API below follows this order. They are in the main bundle, so every page has them. They need no `init()`.

Pick another page when:

- you need to load data from a server: [Request](../core/request)
- you need dates in Gregorian or Hijri: [Date](../core/date)
- you need words in the page language, or a screen reader message: [i18n](../core/i18n)
- you need to start components on new content: [Init](../core/init)

</div>
  </div>
</section>

<section id="helpers-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### NDS.state and NDS.aria
{: .nds-block-title}

Write a state token and an ARIA attribute. Then run code each time the token changes.

<script type="text/html" id="helpers-state" data-canon data-lang="js" data-preview="none">
const card = document.getElementById('order-card');
const button = card.querySelector('.nds-btn');

NDS.state.add(card, 'selected');
NDS.state.has(card, 'selected'); // true
NDS.aria.pressed(button, true);

// Run code each time a card gains or loses the token, whoever writes it
const offSelected = NDS.state.onToggle('selected', '.nds-card', (el, on) => {
  console.log(el.id, on);
});
</script>

### NDS.onElementResize
{: .nds-block-title}

Run code when an element changes size. Read the size in your function, and return a second function for the writes. Stop watching when the element is removed.

<script type="text/html" id="helpers-observer" data-canon data-lang="js" data-preview="none">
const chart = document.getElementById('sales-chart');
const label = chart.querySelector('.chart-label');

const offResize = NDS.onElementResize(chart, (entry) => {
  const width = entry.contentRect.width;       // read here
  return () => { label.hidden = width < 300; }; // write in the returned function
});

// When the chart is removed
offResize();
</script>

### NDS.validation.addRule
{: .nds-block-title}

Check a field that no NDS component owns, here a group of color buttons. [Forms](../components/form) then shows its message on submit.

<script type="text/html" id="helpers-rule" data-canon data-lang="js" data-preview="none">
NDS.validation.addRule('.nds-form-group[data-color-choice]', (group) => {
  const picked = group.querySelectorAll('button[aria-pressed="true"]').length;
  const required = NDS.validation.isRequired(group);
  return {
    valid: !required || picked > 0,
    message: picked ? '' : 'Pick a color',
    empty: picked === 0,
    focus: group.querySelector('button')
  };
}, { on: ['click'] });
</script>

</div>
  </div>
</section>

<section id="helpers-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Write `data-state` through `NDS.state`, never with `setAttribute`. The attribute holds a list, and a direct write drops the other tokens.
- Call each observer's `off()` when the element it watches is removed. A missed `off()` keeps your function for the life of the page.
- Pair each `NDS.scrollLock.lock()` with one `unlock()`, or the page stays locked.
- For content that opens over the page, use [Modal](../components/modal) or [Panel](../components/panel), not an overlay of your own.

</div>
  </div>
</section>

<section id="helpers-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### State and ARIA
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.state.add(el, ...tokens)`, `.remove(el, ...tokens)` | Adds or removes tokens in `data-state`. The other tokens stay |
| `NDS.state.set(el, ...tokens)` | Replaces every token with these |
| `NDS.state.has(el, token)` | `true` when `el` holds the token |
| `NDS.state.get(el)` | The `data-state` value as written |
| `NDS.state.parse(el)` | The tokens as a `Set` |
| `NDS.state.clear(el)` | Removes `data-state` |
| `NDS.state.refresh(el, ...tokens)` | Runs the hooks for the tokens `el` holds, after your code re-renders it |
| `NDS.state.onAdd(token, scope, fn)`, `.onRemove(token, scope, fn)` | Calls `fn(el)` when an `NDS.state` call adds or removes the token on an element that matches `scope`. Returns `off()` |
| `NDS.state.onToggle(token, scope, fn, { className })` | Calls `fn(el, on)` once per real change, whoever wrote the token: a script, the markup at load or added markup. With `className`, that class counts as the token too. Returns `off()` |
| `NDS.status.set(el, status)`, `.get(el)`, `.clear(el)` | Writes, reads or removes the one `data-status` value |
| `NDS.aria.expanded`, `.hidden`, `.pressed`, `.selected`, `.disabled`, `.label`, `.current`, `.sort` | Each takes `(el, value)` and writes that ARIA attribute. `null` removes it |
{: .nds-table .nds-responsive}

### Page Facts
{: .nds-block-title}

Each one is read when you ask, so it follows a change of language or setting.

| Property | Value |
|---|---|
| `NDS.lang` | The page language, such as `'ar'` |
| `NDS.isArabic`, `NDS.isRtl` | `true` on an Arabic page, or a right-to-left one |
| `NDS.prefersReducedMotion` | `true` when the visitor asked for less motion |
| `NDS.breakpoints` | The media queries the components share, such as `NDS.breakpoints.desktop` |
{: .nds-table .nds-responsive}

### Observers
{: .nds-block-title}

One observer of each kind serves the whole page. Each call returns an `off()` function.

| Method | Effect |
|---|---|
| `NDS.onResize(fn)` | Calls `fn` when the window resizes |
| `NDS.onElementResize(el, fn)` | Calls `fn(entry)` when `el` changes size. A function that `fn` returns runs after every read in the batch. An element in a section that has not drawn yet is watched once it draws |
| `NDS.onIntersect(el, fn, { threshold, rootMargin })` | Calls `fn(entry)` when `el` enters or leaves the screen |
| `NDS.onDomAdd(selector, fn)`, `NDS.onDomRemove(selector, fn)` | Calls `fn(nodes)` when elements that match `selector` are added or removed |
| `NDS.onChildrenChange(selector, fn)` | Calls `fn(parents)` when the direct children of a matching element change |
| `NDS.onAttributeChange(selector, attributes, fn)` | Calls `fn(elements)` when one of the `attributes` changes on a matching element |
| `NDS.onOutsideScroll(el, fn)` | Calls `fn` when the page scrolls outside `el`. A menu uses it to close |
{: .nds-table .nds-responsive}

### Timers
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.debounce(fn, ms)` | Returns a function that calls `fn` once calls stop for `ms`. Its `.cancel()` drops a call that is waiting |
| `NDS.throttleToFrame(fn)` | Returns a function that calls `fn` at most once per frame |
| `NDS.onIdle(fn, timeout)` | Calls `fn` when the browser is idle, or after `timeout` ms (2000 by default) |
| `NDS.onNextPaint(fn)` | Calls `fn` after the next paint |
| `NDS.onTransitionEnd(el, fn, { fallbackMs })` | Calls `fn` when the transition on `el` ends, or after `fallbackMs` when none runs. Returns a function that cancels it |
| `NDS.whenDrawn(el, fn)` | Calls `fn` now, or when the section that holds `el` first draws. Returns a function that cancels it |
| `NDS.transitionSpeed()` | The transition duration from the tokens, in ms |
{: .nds-table .nds-responsive}

### Elements, Scroll and Focus
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.resolveElement(ref)` | Returns the element for an `id` or a selector, or `null` when none matches. Anything that is not a string comes back as is, so an element stays an element and a missing argument stays `undefined` |
| `NDS.getStickyHeaderBottom()` | The bottom edge of the sticky header, in px |
| `NDS.getVisibleBox()` | The part of the screen the visitor sees: `{ top, left, right, bottom }`. A zoom or an on-screen keyboard makes it smaller |
| `NDS.scrollBelowNav(el, { offsetVar, offsetEl })` | Scrolls `el` into view below the sticky header, when the header covers it. The gap comes from the custom property `offsetVar`, 120px without one |
| `NDS.scrollLock.lock()`, `.unlock()` | Stops and restores the page scroll. The calls are counted: the last `unlock()` restores it |
| `NDS.trapFocus(getEl)` | Returns a `keydown` handler for `document` that keeps Tab inside the element `getEl()` returns. When it returns `null`, Tab moves as usual |
| `NDS.focusableSel` | A selector for the elements that can take focus |
{: .nds-table .nds-responsive}

### Text and Data
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.splitList(text)` | The items of a list attribute. Spaces and commas both split |
| `NDS.readFlag(el, name)` | `true` when the attribute is present, unless its value is `false`, `0`, `no` or `off` |
| `NDS.toLatinDigits(text)` | The text with Arabic-Indic digits written as 0 to 9 |
| `NDS.toSafeUrl(url)` | The full URL when it is `http`, `https`, `mailto` or `tel`, else `null`. A `javascript:` link returns `null` |
| `NDS.getUniqueId(prefix)` | A new unique id, with the prefix in front |
| `NDS.writeUrlParams(params)` | Writes the query string in place, from a `URLSearchParams` or a string. The path, the hash and `history.state` stay |
| `NDS.cache.get(key)`, `.set(key, value, minutes)`, `.clear(key)` | A value in `localStorage` that expires after `minutes` |
{: .nds-table .nds-responsive}

### Validation Rules
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.validation.addRule(selector, fn, { on })` | Adds a rule for a field no NDS component owns. `fn(el)` returns `null` when `el` is not its field, else `{ valid, message, empty, focus }`. `empty: true` shows the field's `data-error-message`, when it has one. `focus` takes focus on a failed submit. The `on` events check a field again while it shows an error |
| `NDS.validation.isRequired(el)` | `true` when `el` has `data-required` or the `nds-required` class |
{: .nds-table .nds-responsive}

### Helpers on Other Pages
{: .nds-block-title}


- `NDS.request`: [Request](../core/request)
- `NDS.Date`: [Date](../core/date)
- `NDS.i18n`, `NDS.announce`: [i18n](../core/i18n)
- `NDS.setValue`: [Init](../core/init)
- `NDS.cookie`, `NDS.consent`: [Cookies](../ui-shell/cookies)
- `NDS.formatNumber`: [Numbers](../utilities/numbers)
- `NDS.getCellText`: [Tables](../components/table)
- `NDS.setBadge`: [Button](../components/button)
- `NDS.buildChip`, `NDS.keepChipFocus`: [Chips](../components/chips)
- `NDS.escapeHtml`: [Autocomplete](../components/autocomplete)

The full API is in the banners of `_js/nds-core.js` and `_js/nds-validation.js`.

</div>
  </div>
</section>

<section id="helpers-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Forms](../components/form): the messages and states that validation rules feed.
- [Init](../core/init): start, refresh and release components when the page changes.

</div>
  </div>
</section>
