---
layout: page
title: Switch
hero_title: Switch - National Design System
hero_description: A switch turns one setting on or off, and the change applies at once
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "25/09/2026 - 11:05 PM"
---

<section id="switchOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A switch turns one setting on or off. The change takes effect at once. It is a checkbox input drawn as a track and a thumb, inside a form field with a label and optional info text. Related switches go in a group under one legend.

Pick another component when:

- the change applies only after the user submits a form: [Checkbox](../components/checkbox)
- the user picks one of three or more options: [Radio buttons](../components/radio)

</div>
  </div>
</section>

<section id="switchMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="switch-single" data-canon data-variants="switchVariantsTable">
<div class="nds-form-container nds-switch-container">
  <div class="nds-form-header" data-feedback-target>
    <label for="switch-1">
      <span class="nds-label">Enable notifications</span>
      <span class="nds-info">Receive push notifications for important updates</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-switch">
      <input type="checkbox" id="switch-1" name="notifications" value="enabled" class="nds-switch-input">
      <div class="nds-switch-track">
        <div class="nds-switch-thumb"></div>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="switch-group" data-canon>
<fieldset class="nds-form-group nds-switch-group">
  <legend class="nds-label">Notification preferences</legend>
  <div class="nds-form-container nds-switch-container">
    <div class="nds-form-header">
      <label for="switch1">
        <span class="nds-label">Email alerts</span>
      </label>
    </div>
    <div class="nds-form-control">
      <div class="nds-switch">
        <input type="checkbox" id="switch1" name="notifications" value="email" class="nds-switch-input">
        <div class="nds-switch-track">
          <div class="nds-switch-thumb"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-form-container nds-switch-container">
    <div class="nds-form-header">
      <label for="switch2">
        <span class="nds-label">Push notifications</span>
        <span class="nds-info">Instant alerts on your device</span>
      </label>
    </div>
    <div class="nds-form-control">
      <div class="nds-switch">
        <input type="checkbox" id="switch2" name="notifications" value="push" class="nds-switch-input">
        <div class="nds-switch-track">
          <div class="nds-switch-thumb"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-form-container nds-switch-container">
    <div class="nds-form-header">
      <label for="switch3">
        <span class="nds-label">SMS alerts</span>
      </label>
    </div>
    <div class="nds-form-control">
      <div class="nds-switch">
        <input type="checkbox" id="switch3" name="notifications" value="sms" class="nds-switch-input">
        <div class="nds-switch-track">
          <div class="nds-switch-thumb"></div>
        </div>
      </div>
    </div>
  </div>
</fieldset>
</script>
    </div>
  </div>
</section>

<section id="switchVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Single (default) | — | — | One setting on its own |
| Structure | Group | canon `#switch-group` | — | Related settings under one legend |
| Size | SM | `.nds-sm` | `.nds-switch-container` | 36×18px track, 12px thumb. Dense forms and tables |
| Size | MD (default) | — | — | 48×24px track, 16px thumb. Most forms |
| Size | LG | `.nds-lg` | `.nds-switch-container` | 56×28px track, 20px thumb. Touch-first screens |
| Color | Neutral (demo: + Checked) | `.nds-neutral` | `.nds-switch` | The on state uses the neutral color, not the primary color. Use it when the setting is not a brand action. The color shows only when the switch is on, so the demo also turns on Checked |
| Checked | Checked | `[checked]` | `.nds-switch-input` | The switch is on when the page loads |
| Disabled | Disabled | `[disabled]` | `.nds-switch-input` | The user cannot change the setting now |
| Layout | Row | `.nds-rowView` | `.nds-switch-group` | Group only. The switches sit side by side and wrap |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #switchVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="switchFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Form Integration</span>
          </span>
          <p class="nds-item-desc">The forms script starts every switch. No switch script or init call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Toggle Input</span>
          </span>
          <p class="nds-item-desc">A click on the track or the label toggles the switch. Space and Enter toggle it from the keyboard. Each toggle fires <code class="nds-inline-code lang-js">nds:switchChange</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-square-lock-02"></i>
            <span class="nds-label">Disabled Sync</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">disabled</code> on the input and <code class="nds-inline-code lang-html">data-state="disabled"</code> on the container stay in sync, in both directions.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02"></i>
            <span class="nds-label">Visual Feedback</span>
          </span>
          <p class="nds-item-desc">A ripple grows around the track on hover. The thumb widens while the track is pressed, and slides to the other end when the switch toggles.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-align-right"></i>
            <span class="nds-label">RTL Direction</span>
          </span>
          <p class="nds-item-desc">The thumb moves toward the end of the line. In Arabic the on position is on the left.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Mobile Spacing</span>
          </span>
          <p class="nds-item-desc">On phones, the gap between a switch and its label is smaller, and so is the gap between rows in a group.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="switchPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Write the label as the setting, not the action: "Email alerts", not "Turn on email alerts".
- Apply the change as soon as the switch moves. Do not add a Save button for a switch.
- Use `nds-sm` in dense forms and tables, and `nds-lg` on touch-first screens.
- Use `nds-neutral` when the setting is not a brand action.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.
- If the change fails, turn the switch back and show feedback on the field.

</div>
  </div>
</section>

<section id="switchApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state~="disabled"` | `.nds-switch-container` | Not-allowed cursor and muted track and thumb. Also disables the input |
| `data-state~="disabled"` | `.nds-switch-group` | Half opacity and no pointer events. Also disables every input in the group |
| `data-feedback-target` | `.nds-form-header` | Receives the feedback message of the field |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-switch-container`. The size classes set the first five.

| Property | Default | Controls |
|---|---|---|
| `--switch-width` | `48px` | Track width |
| `--switch-height` | `24px` | Track height |
| `--switch-thumb-size` | `16px` | Thumb diameter |
| `--switch-thumb-offset` | `4px` | Gap between the thumb and the track edge |
| `--nds-input-size` | `20px` | Label line height |
| `--switch-track-bg` | `var(--background-default)` | Track background when off |
| `--switch-track-border` | `var(--switch-neutral-default)` | Track border when off |
| `--switch-thumb-bg` | `var(--switch-neutral-default)` | Thumb color when off |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Event | Fired on | Detail |
|---|---|---|
| `nds:switchChange` | `.nds-switch` (bubbles) | `{ checked, value, input }` |
{: .nds-table .nds-responsive}

To change a switch from code, set `checked` on the input and dispatch `change`. The full API is in the banner of `_js/nds-forms.js`.

<script type="text/html" id="switch-js" data-canon data-lang="js">
document.querySelector('.nds-switch').addEventListener('nds:switchChange', function (e) {
  console.log(e.detail.checked, e.detail.value);
});

var input = document.querySelector('.nds-switch-input');
input.checked = !input.checked;
input.dispatchEvent(new Event('change'));
</script>

</div>
  </div>
</section>
