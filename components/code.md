---
layout: page
title: Code
hero_title: Code - National Design System
hero_description: A code block shows source code with syntax colors, line numbers and a copy button, and inline code marks a code reference in a sentence.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 07:41 PM"
---

<section id="codeOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A code block is a `nds-code` wrapper around a `<code>` element. A `lang-*` class on the `<code>` names the language, and the action bar `nds-code-action` holds the copy button. A block with several files uses tabs. Inline code is a `<code class="nds-inline-code">` in a sentence.

Pick another component when:

- the text is a value to copy, such as a reference number or a link: [Copy](../utilities/copy)
- the text is long prose that needs a "Show more" button, not code: [Expandable Content](../utilities/expandable-content)

</div>
  </div>
</section>

<section id="codeMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="code-block" data-canon data-variants="codeVariantsTable">
<div class="nds-code nds-expandable">
  <div class="nds-code-action">
    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code">
      <i class="nds-icon nds-hgi-copy-01"></i>
    </button>
  </div>
  <div class="nds-expandable-content">
    <code class="lang-js">
async function submitRequest(form) {
  const container = document.getElementById('request-alerts');
  NDS.Alert.dismissAll(container);

  const response = await fetch('/api/requests', {
    method: 'POST',
    body: new FormData(form)
  });

  NDS.Alert.create({
    variant: response.ok ? 'success' : 'error',
    title: response.ok ? 'Request sent' : 'Request failed',
    description: 'Request number 20481',
    target: container
  });
}</code>
  </div>
</div>
</script>
<script type="text/html" id="code-tabs" data-canon>
<div class="nds-tabs nds-code nds-divided">
  <div class="nds-tab-list-container nds-scroll-more">
    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Code language">
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="code-panel-css" id="code-tab-css" tabindex="0">
        <span class="nds-label">CSS</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="code-panel-js" id="code-tab-js" tabindex="-1">
        <span class="nds-label">JavaScript</span>
      </button>
    </nav>
    <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more">
      <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-tab-content">
    <div class="nds-tab-panel code-example" role="tabpanel" id="code-panel-css" aria-labelledby="code-tab-css" tabindex="0">
      <div class="nds-code-action">
        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code">
          <i class="nds-icon nds-hgi-copy-01"></i>
        </button>
      </div>
      <code class="lang-css">
.request-summary {
  --card-width: 100%;
  margin-block-end: var(--spacing-xl);
}</code>
    </div>
    <div class="nds-tab-panel code-example" role="tabpanel" id="code-panel-js" aria-labelledby="code-tab-js" tabindex="-1" hidden>
      <div class="nds-code-action">
        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code">
          <i class="nds-icon nds-hgi-copy-01"></i>
        </button>
      </div>
      <code class="lang-js">
document.querySelector('.request-summary')
  .addEventListener('click', function () {
    document.getElementById('request-details').hidden = false;
  });</code>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="code-markdown" data-canon>
<div class="nds-code">
  <div class="nds-code-action">
    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code">
      <i class="nds-icon nds-hgi-copy-01"></i>
    </button>
  </div>
  <code class="lang-markdown">
## Service Request

Send the request from your **account page**. The review takes up to five working days, and the result arrives by text message.

- Attach a copy of your national ID.
- See [the fees](fees.html) before you pay.</code>
</div>
</script>
<script type="text/html" id="code-inline" data-canon>
<p>Put the block in a <code class="nds-inline-code lang-html">nds-code</code> wrapper, then call <code class="nds-inline-code lang-js">NDS.Code.init()</code>.</p>
</script>
<script type="text/html" id="code-tags" data-canon>
<span class="nds-code-tags lang-js">
  <span class="nds-tag nds-gray nds-xs nds-code-lang lang-js"><span class="nds-label">JavaScript</span></span>
  <span class="nds-tag nds-green nds-xs"><span class="nds-label">v2</span></span>
</span>
</script>
    </div>
  </div>
</section>

<section id="codeVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The language of every structure comes from the `lang-*` class on its `<code>`. The API lists every language class.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Block (default) | — | — | One file of code. `nds-expandable` clamps a long block and adds a "Show more" button |
| Structure | Tabs | canon `#code-tabs` | — | Several files or languages for one example, one tab each. Each panel has its own action bar |
| Structure | Markdown | canon `#code-markdown` | — | Markdown or a prompt for an AI agent (`lang-markdown`, `lang-prompt`). The lines wrap and have no line numbers |
| Structure | Inline | canon `#code-inline` | — | A short code reference in a sentence: a class name, a method, a value |
| Tag strip | Tag strip | canon `#code-tags` | `.nds-code.nds-expandable` (start) | Extra tags beside the language tag, such as a version |
{: #codeVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="codeFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-source-code"></i>
            <span class="nds-label">Syntax Highlighting</span>
          </span>
          <p class="nds-item-desc">HTML, CSS, JavaScript, Markdown and AI agent prompts get syntax colors. In an HTML block, the body of a <code class="nds-inline-code lang-html">&lt;style&gt;</code> or <code class="nds-inline-code lang-html">&lt;script&gt;</code> gets CSS or JavaScript colors.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Line Numbers</span>
          </span>
          <p class="nds-item-desc">Every code block gets line numbers, with no class, except a Markdown or prompt block. The CSS reserves their column before the script loads, so the code does not move when the numbers appear.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view"></i>
            <span class="nds-label">Highlight on Approach</span>
          </span>
          <p class="nds-item-desc">The script colors each block as it comes near the screen, not all blocks at page load. A block in a hidden tab is colored when its tab opens.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Language Tag</span>
          </span>
          <p class="nds-item-desc">The script adds a tag with the language name to each block, from its <code class="nds-inline-code lang-html">lang-*</code> class. It also names languages that get no colors, such as <code class="nds-inline-code lang-html">lang-bash</code> or <code class="nds-inline-code lang-html">lang-json</code>. In tabs, each panel gets its own tag.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-01"></i>
            <span class="nds-label">Language Detection</span>
          </span>
          <p class="nds-item-desc">A block with no <code class="nds-inline-code lang-html">lang-*</code> class gets its language from its content: a leading <code class="nds-inline-code lang-html">&lt;</code> means HTML, a JavaScript keyword means JavaScript, and a CSS rule means CSS. A class always wins over the guess.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-copy-01"></i>
            <span class="nds-label">Copy Button</span>
          </span>
          <p class="nds-item-desc">A <code class="nds-inline-code lang-html">nds-copy</code> button in the action bar copies the source text of its block, or of its own tab panel. The button shows a short confirmation after a copy. The script adds <code class="nds-inline-code lang-html">nds-icon-only nds-md</code> to the button, unless it has a visible label, so the markup needs neither class.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-wrap"></i>
            <span class="nds-label">Wrapped Prose</span>
          </span>
          <p class="nds-item-desc">Markdown and prompt lines wrap at the width of body text, so they need no side scroll. A Markdown table row does not wrap. The copied text keeps the original lines.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">Inline Code</span>
          </span>
          <p class="nds-item-desc">The CSS colors inline code from its <code class="nds-inline-code lang-html">lang-*</code> class, with no script. In a table, inline code does not break at its hyphens.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Syntax Colors</span>
          </span>
          <p class="nds-item-desc">Six <code class="nds-inline-code lang-css">--syntax-*</code> properties set the syntax colors for a page or one block. The default colors are designed to meet WCAG AA contrast in light and dark mode.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="codePractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put a `lang-*` class on every `<code>`. The guess from the content knows only HTML, CSS and JavaScript.
- Escape the HTML in a code block: write `&lt;` for `<` and `&amp;` for `&`. The browser otherwise reads the sample as real markup.
- Start the code lines at the left edge, not indented to match the HTML around them. The block shows every space.
- Give the copy button an `aria-label`, such as "Copy code". The button shows only an icon.
- Use tabs only for files that belong to one example. Keep the tab and panel ids unique on the page.
- Use `lang-markdown` or `lang-prompt` for text that people read or paste whole. Use a code language for code that people cite by line.
- Keep inline code short: a name, a value or one call. Put a longer sample in a code block.
- Do not expect a component inside a `<code>` element to work. The scripts skip it, so a sample stays static.

</div>
  </div>
</section>

<section id="codeApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Language Classes
{: .nds-block-title}

Set one on the `<code>` element. The `language-*` form of each class works too (`language-html`).

| Class | Language | Effect |
|---|---|---|
| `lang-html` | HTML | Tags, attributes and values get colors. The body of a `<style>` or `<script>` gets CSS or JavaScript colors |
| `lang-css` | CSS | Selectors, properties and values get colors. SCSS syntax (`$vars`, `@mixin`, `//` comments) gets no colors of its own |
| `lang-js`, `lang-javascript` | JavaScript | Keywords, strings, numbers and comments get colors |
| `lang-markdown`, `lang-md` | Markdown | Headings, list and quote markers, links, bold and inline code get colors. A fenced block with `html`, `css` or `js` gets that language's colors, and any other fenced block shows as plain code |
| `lang-prompt` | AI agent prompt | Paths, file names, `UPPER_CASE` placeholders and markers, and quoted phrases get colors, so the reader checks them before sending |
| any other `lang-*` | its name | The tag shows the name, such as `lang-bash` or `lang-json`. The code shows as plain text |
| none | a guess | The script guesses HTML, CSS or JavaScript from the content |
{: .nds-table .nds-responsive}

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-code-action` | `div` in `.nds-code`, or in each tab panel | The action bar in the top corner. It holds the copy button |
| `code-example` | `.nds-tab-panel` in `.nds-tabs.nds-code` | Removes the panel padding, so the code fills the panel |
| `nds-code-tags` | `span` in `.nds-code` | A strip of tags in the top corner, beside the language tag. It takes the block's `lang-*` class, so it clears the line numbers the same way |
| `nds-code-lang` | `.nds-tag` in `.nds-code-tags` | The language tag. An authored one stops the script from adding its own |
| `nds-inline-code` | `code` in text | Inline code. With `lang-js` it takes the keyword color, and with any other class the attribute color |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the block, on a parent, or on `:root`. The `--syntax-*` properties also color inline code. One value covers light and dark mode.

| Property | Default | Controls |
|---|---|---|
| `--syntax-tag` | `--colors-red-600` (dark: `--colors-red-400`) | HTML tags and CSS selectors |
| `--syntax-attr` | `--colors-yellow-700` (dark: `--colors-yellow-400`) | Attribute names and numbers |
| `--syntax-string` | `--colors-green-700` (dark: `--colors-green-400`) | Attribute values, strings and template strings |
| `--syntax-property` | `--colors-blue-700` (dark: `--colors-blue-400`) | CSS property names |
| `--syntax-keyword` | `--colors-tertiary-500` (dark: `--colors-tertiary-300`) | Keywords, literals and built-in globals |
| `--syntax-comment` | `--colors-neutral-500` (dark: `--colors-neutral-400`) | Comments |
| `--code-max-height` | `60svh` | Height of the code area. A longer block scrolls inside it |
| `--code-bg` | `var(--background-stripe)` | Background of a Markdown or prompt block |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The script colors every code block on the page by itself. Call it again for a code block that you add or change later.

| Method | Effect |
|---|---|
| `NDS.Code.init()` | Colors every `.nds-code code` on the page that is not colored yet, as it nears the screen. Call it after you add code blocks |
| `NDS.Code.reprocessCodeElement(codeEl)` | Colors one `<code>` again from its text. Call it after you change the text. It is safe to call more than once |
| `NDS.Code.detectLanguage(codeEl, source)` | Returns the language the block gets: `html`, `css`, `javascript`, `markdown` or `prompt`. Returns `null` for a `lang-*` class with no colors |
{: .nds-table .nds-responsive}

<script type="text/html" id="code-js" data-canon data-lang="js">
var code = document.querySelector('#request-sample code');
code.textContent = "NDS.Alert.dismissAll(document.body);";
NDS.Code.reprocessCodeElement(code);
</script>

The full API is in the banner of `_js/nds-code.js`.

</div>
  </div>
</section>

<section id="codeRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Every component page: the code under each preview is a code block, and the HTML and JS forms are a tabbed block.
- [Get Started](../guides/get-started): prompts in `lang-prompt` blocks, and a tag strip with the rules version.
- [Copy](../utilities/copy): the copy button in the action bar.
- [Tabs](../components/tabs): the tab set of a tabbed block.

</div>
  </div>
</section>
