---
layout: page
title: Button
hero_title: Button - National Design System
hero_description: A button runs an action, such as save, submit or open a menu
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 12:17 AM"
---

<section id="btnOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A button is a `<button>` or an `<a>` with the `nds-btn` class, a variant class and a label. Add an icon before or after the label, or show the icon only. The variant sets the emphasis, from primary for the main action to transparent for the least. Size and shape are more classes, and a state is an attribute, such as `disabled`. A button needs no JavaScript.

A button can also open a [Dropmenu](../components/dropmenu) or copy text with [Copy](../utilities/copy).

Pick another component when:

- the click only switches the view on the page: [Content Switcher](../components/content-switcher)
- the action must wait before the next press, such as resend code: [Cooldown Button](../components/cooldown-button)

</div>
  </div>
</section>

<section id="btnMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="btn-standard" data-canon data-variants="btnVariantsTable">
<button type="button" class="nds-btn nds-primary">
  <span class="nds-label">Add item</span>
</button>
</script>
<script type="text/html" id="btn-group" data-canon>
<div class="nds-btn-group">
  <button type="button" class="nds-btn nds-primary">
    <span class="nds-label">Day</span>
  </button>
  <button type="button" class="nds-btn nds-primary">
    <span class="nds-label">Week</span>
  </button>
  <button type="button" class="nds-btn nds-primary">
    <span class="nds-label">Month</span>
  </button>
</div>
</script>
<script type="text/html" id="btn-progress" data-canon>
<button type="button" class="nds-btn nds-primary nds-icon-only nds-progress" style="--progress-duration: 4000ms;">
  <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
  <span class="nds-label">Close</span>
  <span class="nds-progress-circle" aria-hidden="true">
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
      <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
    </svg>
  </span>
</button>
</script>
<script type="text/html" id="btn-icon" data-canon>
<i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
</script>
<script type="text/html" id="btn-badge" data-canon>
<span class="nds-badge">3</span>
</script>
    </div>
  </div>
</section>

<section id="btnVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A row on `.nds-btn` changes every button in a group. A row on `.nds-btn:first-child` changes one button. The builder uses the first one, but on a page it goes on the button you mean, such as the chosen one in a group. Two rows with the same Group and Option are one choice: write both. `:not(.nds-progress)` means the option is not for a progress button.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) | — | — | One button |
| Structure | Group | canon `#btn-group` | — | A row of related buttons joined into one strip. The two ends keep the rounded corners |
| Structure | Progress (hint: A ring around an icon button) | canon `#btn-progress` | — | A ring around an icon-only button, such as the close button of a toast that closes itself. The ring is `aria-hidden`, so the label names the action. A disabled progress button keeps its colors, so `disabled` can stop a second press while the ring runs |
| Variant | Primary (default) | `.nds-primary` | `.nds-btn` | The main action in a view. Use one per view |
| Variant | Neutral | `.nds-neutral` | `.nds-btn` | A strong action next to the primary one |
| Variant | Secondary | `.nds-secondary` | `.nds-btn` | A supporting action, with a light fill |
| Variant | Secondary outline | `.nds-secondary-outline` | `.nds-btn` | A supporting action, with a border and no fill |
| Variant | Subtle | `.nds-subtle` | `.nds-btn` | A low-emphasis action, such as cancel or dismiss. The fill shows on hover |
| Variant | Transparent | `.nds-transparent` | `.nds-btn` | The lowest emphasis. No fill in any state. Only the text color changes on hover |
| Size | LG (default) | — | — | 40px high. It needs no class |
| Size | MD | `.nds-md` | `.nds-btn` | 32px high |
| Size | SM | `.nds-sm` | `.nds-btn` | 24px high |
| Content | Label (default) | — | — | Text only |
| Content | Icon and label | canon `#btn-icon` | `.nds-btn:not(.nds-progress)` (start) | An icon before the label |
| Content | Label and icon | canon `#btn-icon` | `.nds-btn:not(.nds-progress)` | An icon after the label. `.nds-trail-icon` does the same with the icon first in the markup |
| Content | Icon above label | canon `#btn-icon` | `.nds-btn:not(.nds-progress)` (start) | The icon stacks above the label |
| Content | Icon above label | `.nds-col` | `.nds-btn:not(.nds-progress)` | The same. The padding is equal on all sides, the label can wrap to two lines, and the button fills the height of its row |
| Content | Icon only | canon `#btn-icon` | `.nds-btn:not(.nds-progress)` (start) | A square button with only the icon |
| Content | Icon only | `.nds-icon-only` | `.nds-btn:not(.nds-progress)` | The same. Keep the label: it is hidden on screen and names the button for screen readers |
| Built-in icon | None (default) | — | — | No drawn icon |
| Built-in icon | Menu | `.nds-menu-btn` | `.nds-btn:not(.nds-progress)` | A chevron after the label. It turns when the button has `data-state~="open"` or `aria-expanded="true"`, which the [Dropmenu](../components/dropmenu) sets |
| Built-in icon | Next | `.nds-next` | `.nds-btn:not(.nds-progress)` | An arrow that points forward in the reading direction |
| Built-in icon | Previous | `.nds-prev` | `.nds-btn:not(.nds-progress)` | An arrow that points back in the reading direction. The arrow comes before the label |
| Built-in icon | Up | `.nds-up` | `.nds-btn:not(.nds-progress)` | An arrow that points up |
| Built-in icon | Down | `.nds-down` | `.nds-btn:not(.nds-progress)` | An arrow that points down |
| Built-in icon | More (hint: Three dots, for a menu of more actions) | `.nds-ellipsis` | `.nds-btn:not(.nds-progress)` | A square button with three dots |
| Built-in icon | More (hint: Three dots, for a menu of more actions) | `.nds-icon-only` | `.nds-btn:not(.nds-progress)` | The same. The label is hidden and names the button for screen readers |
| State | None (default) | — | — | Ready to press |
| State | Selected | `[data-state~="selected"]` | `.nds-btn:first-child:not(.nds-progress)` | The chosen button, such as a pressed toggle or the chosen button in a group |
| State | Selected | `[aria-pressed="true"]` | `.nds-btn:first-child:not(.nds-progress)` | Set it with `data-state~="selected"`. It tells screen readers the button is on |
| State | Disabled | `[disabled]` | `.nds-btn:first-child:not(.nds-progress)` | The action is not available. On an `<a>`, use `aria-disabled="true"` |
| State | Loading | `.nds-loading` | `.nds-btn:first-child:not(.nds-progress)` | A spinner replaces the content while a request runs. The button keeps its width. In JavaScript, call `NDS.State.add(btn, 'loading')` |
| State | Loading | `[disabled]` | `.nds-btn:first-child:not(.nds-progress)` | The same. `disabled` stops a second press, and a loading button keeps its colors |
| Ring | Countdown (default) | `--progress-duration: 4000ms` | `.nds-progress` | The ring fills once over this time |
| Ring | Fixed value | `.nds-progress-static` | `.nds-progress` | The ring shows a fixed part, such as upload progress |
| Ring | Fixed value | `--progress-value: 25` | `.nds-progress` | The same. The value is a percentage, from 0 to 100 |
| Direction | Horizontal (default) | — | — | The buttons sit in a row |
| Direction | Vertical | `.nds-vertical` | `.nds-btn-group` | The buttons stack in a column. The top and bottom keep the rounded corners |
| Destructive | Destructive (hint: Not with Neutral) | `.nds-destructive` | `.nds-btn:not(.nds-neutral)` | Error colors, for delete, remove or any action that cannot be undone. It works with every variant except neutral |
| On color | On color | `.nds-oncolor` | `.nds-btn` | For a button on a deep primary or dark background |
| Indicator | Indicator | `.nds-indicator` | `.nds-btn` | A bar at the bottom edge. It shows on hover, focus and the selected state, as in a tab or a menu bar |
| Circle | Circle (hint: Not in a group) | `.nds-circle` | `.nds-btn:not(.nds-btn-group > .nds-btn)` | Round ends. An icon-only button becomes a circle. No effect in a group, which owns its corners |
| Full width | Full width | `.nds-full` | `.nds-btn:not(.nds-btn-group > .nds-btn)` | Fills the width of its container, with the content centered |
| Full width | Full width | `.nds-full` | `.nds-btn-group` | On a group, the group fills the width and its buttons share it equally. Put it on the group, not on its buttons |
| Primary text | Primary text (hint: Transparent only) | `.nds-color` | `.nds-transparent` | The text takes the brand primary color, and goes back to the default color on hover |
| Badge | Badge (hint: Needs an icon) | canon `#btn-badge` | `i.nds-icon` | A count over the corner of the icon. It goes inside the `<i>` icon element, never beside it. The icon is `aria-hidden`, so screen readers skip the count: put it in the label too |
{: #btnVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="btnFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Pure CSS</span>
          </span>
          <p class="nds-item-desc">No JavaScript needed. Every variant, size and state comes from classes and attributes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Six Variants</span>
          </span>
          <p class="nds-item-desc">Primary, neutral, secondary, secondary outline, subtle and transparent, each with its hover, pressed, selected, focused and disabled look.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Three Sizes</span>
          </span>
          <p class="nds-item-desc">24px, 32px and 40px high. The label, the icon and the indicator scale with the size.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-01"></i>
            <span class="nds-label">Layout Options</span>
          </span>
          <p class="nds-item-desc">An icon before or after the label, icon only, label only, stacked, circle and full width, and a loading state.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="nds-icon nds-hgi-eye" aria-hidden="true"></i>
            <span class="nds-label">Accessibility</span>
          </span>
          <p class="nds-item-desc">A focus ring for keyboard users, thicker borders in high contrast mode, no motion when the user asks for reduced motion, and plain print styles.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">Composable</span>
          </span>
          <p class="nds-item-desc">Combines with destructive, on color, loading, progress, status, badge, indicator and groups.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="btnPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a `<button>` for an action on the page, and an `<a class="nds-btn">` when the click opens another page. The classes are the same.
- Use a button group for a short row of related actions.
- Use one primary button per view, for the main action. Use neutral, secondary or secondary outline for the actions beside it, and subtle or transparent for cancel and dismiss.
- Use destructive for delete and other actions that cannot be undone. Ask the user to confirm in a [Modal](../components/modal) first.
- Add `nds-oncolor` to a button on a deep primary or dark background. Without it, the button can be hard to see.
- Write `type="submit"` on the button that sends a form. Write `type="button"` on every other button in a form, or it sends the form too.
- Keep the `nds-label` span on an icon-only button. It is hidden on screen and names the button for screen readers. A button with no label element needs an `aria-label`.
- Add `nds-loading` and `disabled` while a request runs, so a second press does not send it again.
- Keep labels short: a verb and a noun, such as "Save draft". A long label does not wrap, except in a stacked button.
- Use a status for feedback on the button itself, and remove it after about two seconds. For a message the user must read, use an [Alert](../components/alert).

</div>
  </div>
</section>

<section id="btnApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-trail-icon` | `.nds-btn` | Puts the icon after the label, with the icon first in the markup |
| `nds-lead-icon` | `.nds-btn` | Puts the icon before the label. Use it to undo a reversed order, such as the one `nds-prev` sets |
| `nds-label-only` | `.nds-btn`, or any parent | Hides every icon inside, so the same markup shows labels only |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state` | `.nds-btn` | `selected`, `open`, `active` or `current` gives the selected look. `open` and `opening` also turn the menu chevron. `loading` is the same as `nds-loading`, and `disabled` the same as the `disabled` attribute. `hover`, `pressed` and `focused` show that look without a pointer or a keyboard, for a design review |
| `data-status` | `.nds-btn` | Feedback for a moment after an action: `success`, `error`, `info` or `warning`. It sets the colors in every state, swaps each `nds-icon` icon for the status icon, and colors the border of a secondary outline button. [Copy](../utilities/copy), Share and the accessibility panel set `success` for about two seconds. Set it for your own actions with `NDS.Status`, as in the example below. Do not write it in the markup |
| `aria-expanded` | `.nds-menu-btn` | `true` turns the chevron, the same as `data-state~="open"` |
| `aria-disabled` | `.nds-btn` | `true` gives the disabled look and blocks clicks. Use it on an `<a>`, which has no `disabled` attribute |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the button itself. The size and variant classes set many of them on the button, so a value set on a parent does not reach it.

| Property | Default | Controls |
|---|---|---|
| `--btn-size` | `40px` | Height, and the width of an icon-only button. The label and icon sizes follow it. `nds-md` and `nds-sm` set 32px and 24px |
| `--btn-height` | `var(--btn-size)` | Height alone, without the label and icon sizes |
| `--btn-width` | `auto` | Width |
| `--btn-padding` | `(size - 8px) / 2` | Padding on the start and end sides |
| `--btn-gap` | `var(--spacing-md)` | Space between the icon and the label |
| `--btn-radius` | `var(--radius-sm)` | Corner radius |
| `--btn-FS`, `--btn-LH` | from `--btn-size` | Label font size and line height |
| `--btn-icon-size` | `size / 2 + 4px` | Icon size |
| `--btn-bg`, `--btn-bg-hover`, `--btn-bg-active`, `--btn-bg-selected`, `--btn-bg-disabled` | set by the variant | Background in each state |
| `--btn-color`, `--btn-color-hover`, `--btn-color-disabled` | set by the variant | Text and icon color |
| `--btn-border`, `--btn-border-hover`, `--btn-border-active`, `--btn-border-selected`, `--btn-border-disabled` | set by the variant | Border color in each state |
| `--btn-indicator-size` | `3px`, `2px` on SM | Height of the indicator bar |
| `--btn-loading-color`, `--btn-loading-track` | set by the variant | Spinner colors |
| `--btn-group-radius` | `var(--radius-md)` | Corner radius of a group. It is `var(--radius-sm)` when the group holds MD or SM buttons |
| `--progress-duration` | `4000ms` | Time the ring takes to fill |
| `--progress-value` | `0` | Fill of a `nds-progress-static` ring, from 0 to 100 |
| `--progress-size` | `size - 8px` | Size of the ring |
| `--progress-circumference` | `62.83` | Length of the ring for a fixed value. It matches `stroke-dasharray` on the circle: change it only with the circle's radius |
{: .nds-table .nds-responsive}

The theme-wide button colors are the `--button-*` tokens. See [Tokens](../components/tokens).

### JavaScript
{: .nds-block-title}

A button has no script of its own. Set its state with `NDS.State` and its status with `NDS.Status`.

<script type="text/html" id="btn-state-js" data-canon data-lang="js">
var btn = document.querySelector('#save');

// Lock the button while the request runs
NDS.State.add(btn, 'loading');
btn.disabled = true;

save().then(function () {
  // Show success for two seconds
  NDS.Status.set(btn, 'success');
  setTimeout(function () { NDS.Status.clear(btn); }, 2000);
}).finally(function () {
  NDS.State.remove(btn, 'loading');
  btn.disabled = false;
});
</script>

</div>
  </div>
</section>

<section id="btnRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Sign In](../examples/sign-in): full-width submit buttons, a link styled as a button, and a button group.
- [Home Page Template](../templates/home-template): on-color buttons over the hero.
- [Cooldown Button](../components/cooldown-button): a button that waits before the next press.
- [Dropmenu](../components/dropmenu) and [Toolbar](../components/toolbar): menu buttons and rows of icon buttons.

</div>
  </div>
</section>
