---
layout: page
title: Tag Input
hero_title: Tag Input - National Design System
hero_description: A form field that turns typed text into removable chips and submits them as an array
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="taginput-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A tag input is a text field that holds its values as [Chips](../components/chips). The user types a value and presses Enter or a comma, and the value becomes a chip before the text box. The script keeps one hidden input per tag, so the form submits the tags as an array.

Pick another component when:

- the user picks from a fixed list: [Multiselect](../components/multiselect)
- the user types one value: a text field in [Forms](../components/forms)
- the user picks one value from suggestions: [Autocomplete](../components/autocomplete)

</div>
  </div>
</section>

<section id="taginput-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="taginput-field" data-canon data-variants="taginput-variants-table" data-harness="form" data-demo-width="100%">
<div class="nds-form-container nds-taginput" data-taginput-name="skills">
  <div class="nds-form-header">
    <label for="taginput-skills"><span class="nds-label">Skills</span></label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="taginput-skills" placeholder="Add a skill">
  </div>
</div>
</script>
<script type="text/html" id="taginput-assist" data-canon>
<div class="nds-form-container nds-taginput" data-taginput-name="services" data-url="../docs-assets/data/services-autocomplete.json" data-fetch="once" data-min-chars="2">
  <div class="nds-form-header">
    <label for="taginput-services">
      <span class="nds-label">Services</span>
      <span class="nds-info">Type part of a service name, such as "visa"</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="taginput-services" autocomplete="on" placeholder="Search services">
  </div>
</div>
</script>
<script type="text/html" id="taginput-prefilled" data-canon>
<input type="hidden" name="skills[]" value="Data analysis">
<input type="hidden" name="skills[]" value="Project management">
</script>
    </div>
  </div>
</section>

<section id="taginput-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Prefilled tags inserts two hidden inputs right after the text box `#taginput-skills`. Write one hidden input per tag, with the field's name and `[]`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Free text (default) | — | — | The user types each tag. Use it for values the user makes up, such as skills or keywords |
| Structure | Suggestions | canon `#taginput-assist` | — | A menu suggests tags from `data-url` as the user types. Typed text still becomes a tag. See Suggestions |
| Strict | Strict (hint: Only picked suggestions become tags) | `[data-strict]` | `.nds-taginput[data-url]` | Only a picked suggestion becomes a tag. Use it for a known list, such as people or categories. See Strict Mode |
| Prefilled tags | Prefilled tags (id: prefilled) (hint: Tags the field shows at load) | canon `#taginput-prefilled` | `#taginput-skills` (after) | The field shows these tags as chips at load. Use it on a form that edits saved data. See Prefilled Tags |
| Tag limit | Max 3 tags | `[data-max-tags="3"]` | `.nds-taginput` | The field takes 3 tags at most. Use the limit that the server uses. See Tag Limit |
| Chip color | Primary (default) | — | — | Chips in the primary color |
| Chip color | Neutral | `[data-chip-class="nds-neutral nds-sm"]` | `.nds-taginput` | Chips in the neutral color, for tags that are not a brand action |
| State (any) | Disabled (demo: + prefilled) | `[data-state~="disabled"]` | `.nds-taginput:not([data-state~="readonly"])` | The user cannot type or remove a chip, and the tags do not post. Not with Read-only |
| State (any) | Read-only (demo: + prefilled) | `[data-state~="readonly"]` | `.nds-taginput:not([data-state~="disabled"])` | The user sees the tags but cannot change them. The tags post. Not with Disabled |
| Validation | Required (hint: Press Validate with no tags) | `[data-required]` | `.nds-taginput` | The form needs at least one tag. See Validation |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #taginput-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="taginput-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Suggestions
{: .nds-block-title}

`data-url` on `.nds-taginput` and `autocomplete="on"` on the text box add an [Autocomplete](../components/autocomplete) menu to the field. A picked suggestion becomes a tag, and typed text still becomes a tag on Enter or a comma. The menu opens only when a suggestion matches. When the user leaves the field while the menu is open, the typed text stays in the box. Set the fetch with the Autocomplete attributes, such as `data-fetch`, `data-min-chars` and `data-name`.

### Strict Mode
{: .nds-block-title}

`data-strict` on a field with `data-url` makes only picked suggestions become tags. On Enter, a comma or a paste, the field shows "Choose from the suggestions" and keeps the text in the box. Leaving the field keeps the text there too. When nothing matches, the menu shows "No results". Without `data-url`, `data-strict` does nothing. `addTag()` still adds any value.

### Prefilled Tags
{: .nds-block-title}

A form that edits saved data shows the tags the user saved before. For each tag, write one hidden input in `.nds-form-control`, such as `<input type="hidden" name="skills[]" value="Data analysis">`. The field turns each one into a chip when it starts, with no script on the page. Without `data-taginput-name`, the field takes its name from these inputs.

### Tag Limit
{: .nds-block-title}

`data-max-tags` on `.nds-taginput` sets how many tags the field takes at most. A tag past the limit is not added, and the field shows "Maximum limit 3". The message clears at the next change.

### Disabled and Read-only
{: .nds-block-title}

`data-state~="disabled"` on `.nds-taginput` disables the text box, every chip and the hidden inputs, so the tags do not post. With `data-state~="readonly"`, the user cannot type, remove a chip or edit the last tag with Backspace. The tags still post. Code can still change the tags with `addTag()`, `removeTag()` and `clear()`.

### Validation
{: .nds-block-title}

`data-required` on `.nds-taginput` makes the form need at least one tag. The class `nds-required` does the same. At submit, an empty field shows "Please add at least one tag". The error clears at the next change. The form does not check the tag limit at submit: the field blocks extra tags as the user adds them.

</div>
  </div>
</section>

<section id="taginput-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-taginput</code> on the page starts on load. A click anywhere on the field, except on a chip, puts the cursor in the text box.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Flexible Commit Keys</span>
          </span>
          <p class="nds-item-desc">Enter, a comma or the Arabic comma (،) adds the typed text as a tag. Pasted text splits into one tag per comma or line. Leaving the field adds the typed text. Enter in an empty box submits the form.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-edit-02"></i>
            <span class="nds-label">Backspace to Edit</span>
          </span>
          <p class="nds-item-desc">Backspace in an empty box moves the last tag back into the box as text. The user fixes a typo and presses Enter again.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-file-validation"></i>
            <span class="nds-label">Form Submission</span>
          </span>
          <p class="nds-item-desc">The script keeps one <code class="nds-inline-code lang-html">&lt;input type="hidden" name="skills[]"&gt;</code> per tag, named from <code class="nds-inline-code lang-html">data-taginput-name</code>. The form submits the tags as an array, in the order the user added them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-alert-circle"></i>
            <span class="nds-label">Rejection Feedback</span>
          </span>
          <p class="nds-item-desc">A tag the field already holds, in any letter case, is not added. The field shows "Already added", and the message clears at the next change.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-voice"></i>
            <span class="nds-label">Screen Reader Support</span>
          </span>
          <p class="nds-item-desc">A screen reader reads each change and each rejected tag, such as "Added Data analysis" or "Already added", in English or Arabic.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Removable Chips</span>
          </span>
          <p class="nds-item-desc">Each chip is a button: a click, Enter or Space removes its tag. Focus moves to the chip in its place, or to the text box after the last one.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Each field has an instance with <code class="nds-inline-code lang-js">getValues()</code>, <code class="nds-inline-code lang-js">addTag()</code>, <code class="nds-inline-code lang-js">removeTag()</code> and <code class="nds-inline-code lang-js">clear()</code>. The <code class="nds-inline-code lang-js">nds:taginput:change</code> event fires after each change.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="taginput-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a tag input for values the user makes up, such as skills, keywords or reference numbers.
- Give the field a `data-taginput-name`. With no name and no prefilled tags, the tags do not post.
- Set `data-max-tags` to the limit that the server uses. The user then sees the limit as they type, not after submit.
- Keep tags to one to three words. For longer text, use a textarea.
- The field rejects a repeat in any letter case, but keeps the case the user typed. Change the case on the server if the stored values must match.
- Add Suggestions when tags must match a shared list. The user then picks an existing tag instead of typing a new spelling.
- Say a limit in the label, such as "Topics (up to 3)", not in the placeholder.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="taginput-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-taginput-name` | `.nds-taginput` | The field name. The script names each hidden input with it and `[]`. Without it, the script takes the name from the first prefilled hidden input. It is also `name` in the change event |
| `data-max-tags` | `.nds-taginput` | How many tags the field takes at most. See Tag Limit |
| `data-chip-class` | `.nds-taginput` | The classes on each chip. The default is `nds-primary nds-sm`. See [Chips](../components/chips) |
| `data-url` | `.nds-taginput` | The URL of the suggestions. Needs `autocomplete="on"` on the text box. See Suggestions |
| `data-strict` | `.nds-taginput` with `data-url` | Only picked suggestions become tags. See Strict Mode |
| `data-required` | `.nds-taginput` | The form needs at least one tag. See Validation |
| `data-state~="filled"` | `.nds-taginput` | The script sets it when the field holds a tag, and removes it when the last tag goes. No NDS style reads it: it is for your CSS |
| `data-state~="disabled"`, `data-state~="readonly"` | `.nds-taginput` | Set it yourself. See Disabled and Read-only |
| `data-taginput-value` | each chip | The script writes the tag's text on each chip it builds. Use it to select one chip in your code or tests |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.TagInput.init()` | Starts every `.nds-taginput` that has not started. The loader calls it on load. Call it again after you add a field to the page |
| `NDS.TagInput.reinit()` | The same as `init()` |
| `NDS.TagInput.create(el)` | Starts one field, and returns its instance. On a field that has started, it returns the same instance. It returns `null` when the field has no `.nds-form-control` or no text box in it |
| `NDS.TagInput.destroy(el)` | Removes the listeners. The chips and the hidden inputs stay, and `init()` can start the field again. Call it before you remove the field from the page |
| `el.ndsTagInput` | The instance of a field that has started |
| `instance.getValues()` | Returns the tags, in the order they were added |
| `instance.addTag(value)` | Adds one tag. It trims spaces and commas, and rejects a repeat or a tag past the limit with the same message as typing |
| `instance.removeTag(value)` | Removes the tag with this exact text |
| `instance.clear()` | Removes every tag |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:taginput:change` | `.nds-taginput`, and it bubbles | `{ name, values }`, after each tag the field adds or removes, the Backspace edit included, and after `clear()`. `name` is `data-taginput-name`, or `''` for a field with no name. `values` is the tags, in order |
{: .nds-table .nds-responsive}

<script type="text/html" id="taginput-js" data-canon data-lang="js">
var field = document.querySelector('.nds-taginput[data-taginput-name="skills"]');

// Show the count next to the field
field.addEventListener('nds:taginput:change', function (e) {
  document.querySelector('#skill-count').textContent = e.detail.values.length + ' skills';
});

// Add a tag from code
field.ndsTagInput.addTag('Accessibility');
</script>

The full API is in the banner of `_js/nds-taginput.js`.

</div>
  </div>
</section>
