---
layout: page
title: Multiselect
hero_title: Multiselect - National Design System
hero_description: A form field for picking multiple options from grouped lists, with selections shown as removable chips and committed on Apply.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Grouped Options -->
<section id="multiselectDefault" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Grouped Options</h2>
            <p class="nds-section-description">Checkboxes live inside labeled fieldsets. Changes stage in a draft set and only commit when the user clicks Apply, so rapid toggling never churns the outer state.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Multi-option select</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-multiselect" data-multiselect-name="interests">
                                <div class="nds-form-header">
                                    <label><span class="nds-label">Interests</span></label>
                                </div>
                                <div class="nds-form-control">
                                    <div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu>
                                        <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
                                            <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
                                            <span class="nds-label">Select</span>
                                        </button>
                                        <div class="nds-dropmenu-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                                    <legend class="nds-label">Technology</legend>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-ai"><span class="nds-label">AI &amp; ML</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-ai" class="nds-check" value="ai" data-label="AI &amp; ML">
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-cloud"><span class="nds-label">Cloud</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-cloud" class="nds-check" value="cloud" data-label="Cloud">
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-security"><span class="nds-label">Cybersecurity</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-security" class="nds-check" value="security" data-label="Cybersecurity">
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <hr class="nds-divider">
                                                <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close>
                                                    <legend class="nds-label">Design</legend>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-ux"><span class="nds-label">UX Research</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-ux" class="nds-check" value="ux" data-label="UX Research">
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-brand"><span class="nds-label">Brand Identity</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-brand" class="nds-check" value="brand" data-label="Brand Identity">
                                                        </div>
                                                    </div>
                                                    <div class="nds-form-container nds-check-container">
                                                        <div class="nds-form-header">
                                                            <label for="ms-default-motion"><span class="nds-label">Motion</span></label>
                                                        </div>
                                                        <div class="nds-form-control">
                                                            <input type="checkbox" id="ms-default-motion" class="nds-check" value="motion" data-label="Motion">
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <div class="nds-dropmenu-footer">
                                                <hr class="nds-divider">
                                                <div class="nds-dropmenu-action nds-grid">
                                                    <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close>
                                                        <span class="nds-label">Reset</span>
                                                    </button>
                                                    <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply">
                                                        <span class="nds-label">Apply</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nds-chips nds-multiselect-chips" data-multiselect-chips></div>
                                    <span class="nds-multiselect-placeholder">Select options&hellip;</span>
                                </div>
                                <div class="nds-form-footer" data-feedback-target hidden></div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-multiselect-default-1" id="tab-multiselect-default-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-multiselect-default-1"
                                    aria-labelledby="tab-multiselect-default-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-form-container nds-multiselect" data-multiselect-name="interests"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label&gt;&lt;span class="nds-label"&gt;Interests&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;div class="nds-form-action nds-prefix nds-dropmenu" data-multiselect-dropmenu&gt;
      &lt;button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button"&gt;
        &lt;i class="nds-icon nds-hgi-menu-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Select&lt;/span&gt;
      &lt;/button&gt;
      &lt;div class="nds-dropmenu-menu" hidden&gt;
        &lt;div class="nds-dropmenu-scroll"&gt;
          &lt;fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close&gt;
            &lt;legend class="nds-label"&gt;Technology&lt;/legend&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-ai"&gt;&lt;span class="nds-label"&gt;AI &amp;amp; ML&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-ai" class="nds-check" value="ai" data-label="AI &amp;amp; ML"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-cloud"&gt;&lt;span class="nds-label"&gt;Cloud&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-cloud" class="nds-check" value="cloud" data-label="Cloud"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-security"&gt;&lt;span class="nds-label"&gt;Cybersecurity&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-security" class="nds-check" value="security" data-label="Cybersecurity"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/fieldset&gt;
          &lt;hr class="nds-divider"&gt;
          &lt;fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-no-auto-close&gt;
            &lt;legend class="nds-label"&gt;Design&lt;/legend&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-ux"&gt;&lt;span class="nds-label"&gt;UX Research&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-ux" class="nds-check" value="ux" data-label="UX Research"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-brand"&gt;&lt;span class="nds-label"&gt;Brand Identity&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-brand" class="nds-check" value="brand" data-label="Brand Identity"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
              &lt;div class="nds-form-header"&gt;
                &lt;label for="ms-default-motion"&gt;&lt;span class="nds-label"&gt;Motion&lt;/span&gt;&lt;/label&gt;
              &lt;/div&gt;
              &lt;div class="nds-form-control"&gt;
                &lt;input type="checkbox" id="ms-default-motion" class="nds-check" value="motion" data-label="Motion"&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/fieldset&gt;
        &lt;/div&gt;
        &lt;div class="nds-dropmenu-footer"&gt;
          &lt;hr class="nds-divider"&gt;
          &lt;div class="nds-dropmenu-action nds-grid"&gt;
            &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-multiselect-action="reset" data-no-auto-close&gt;
              &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-multiselect-action="apply"&gt;
              &lt;span class="nds-label"&gt;Apply&lt;/span&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-chips nds-multiselect-chips" data-multiselect-chips&gt;&lt;/div&gt;
    &lt;span class="nds-multiselect-placeholder"&gt;Select options&amp;hellip;&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-footer" data-feedback-target hidden&gt;&lt;/div&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="multiselectFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Any <code class="nds-inline-code lang-html">.nds-multiselect</code> on the page wires up on load. The inner dropmenu boots itself so the trigger, panel, and keyboard flow work without extra JS.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-refresh"></i>
                        <span class="nds-label">Draft and Apply Commit</span>
                    </span>
                    <p class="nds-item-desc">Checkbox toggles stage into a draft set and only commit when the user clicks Apply. Closing the panel without applying discards the draft, so rapid exploration never churns the chips or change events.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01"></i>
                        <span class="nds-label">Removable Chips</span>
                    </span>
                    <p class="nds-item-desc">Applied values render as chips inside the form-control. Clicking a chip drops the value and fires a change event immediately, no need to reopen the panel.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-file-validation"></i>
                        <span class="nds-label">Form-Ready Submission</span>
                    </span>
                    <p class="nds-item-desc">Applied values ship as <code class="nds-inline-code lang-html">&lt;input type="hidden" name="field[]"&gt;</code> entries inside the form-control, so wrapping the field in a <code class="nds-inline-code lang-html">&lt;form&gt;</code> posts the selection as an array without extra wiring.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard"></i>
                        <span class="nds-label">Full Keyboard Navigation</span>
                    </span>
                    <p class="nds-item-desc">Arrow keys walk the checkboxes, Space toggles, Enter triggers Apply, and Escape closes the panel and returns focus to the trigger. A visible focus ring follows each option.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Every field exposes an instance on the DOM node with <code class="nds-inline-code lang-js">apply()</code>, <code class="nds-inline-code lang-js">reset()</code>, and <code class="nds-inline-code lang-js">removeValue()</code>. Listen for <code class="nds-inline-code lang-js">nds:multiselect:change</code> to react to committed selections.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="multiselectGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use multiselect for form fields where users pick <strong>several values from a list of ten or more options</strong> and benefit from seeing the applied set as chips they can remove individually</li>
                    <li>Group related options inside <code class="nds-inline-code lang-html">&lt;fieldset&gt;</code> elements with a <code class="nds-inline-code lang-html">&lt;legend&gt;</code>. Groups make long lists scannable and let assistive technology announce the category</li>
                    <li>For a short, flat list (three to six options) without a category axis, reach for a plain <a class="nds-color" href="{{ 'components/checkbox' | relative_url }}">Checkbox Group</a> instead. Multiselect's overhead (dropmenu trigger, Apply button, chip track) adds friction when the options fit inline</li>
                    <li>For a single-value choice, use <a class="nds-color" href="{{ 'components/radio' | relative_url }}">Radio Button</a> or the select-mode of <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a>. Multiselect's draft/apply pattern is wasted on single-pick fields</li>
                    <li>Set <code class="nds-inline-code lang-html">data-multiselect-name</code> when the field lives inside a <code class="nds-inline-code lang-html">&lt;form&gt;</code>. Without it, no hidden inputs are rendered and the selection does not post</li>
                    <li>Set a meaningful <code class="nds-inline-code lang-html">data-label</code> on each checkbox so chip text stays readable when the surrounding label changes, wraps, or contains extra markup</li>
                    <li>Keep the placeholder short (two to four words). It shares the row with chips once any are applied, so a long placeholder fights for space</li>
                    <li>Add a <code class="nds-inline-code lang-html">&lt;hr class="nds-divider"&gt;</code> between fieldsets in the panel to make the grouping visually clear, matching the provided markup contract</li>
                    <li>When the number of selections carries meaning (quota, pricing tier), listen for <code class="nds-inline-code lang-js">nds:multiselect:change</code> and show a count or validation hint outside the field rather than overloading the placeholder</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-name</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-multiselect</code>. Name used for hidden form inputs, posted as <code class="nds-inline-code lang-html">name[]</code>. Omit to opt out of form submission</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-chip-class</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-multiselect</code>. Classes applied to generated chips. Defaults to <code class="nds-inline-code lang-html">nds-primary nds-sm</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-dropmenu</code></td><td>Marks the wrapping <code class="nds-inline-code lang-html">.nds-form-action.nds-prefix.nds-dropmenu</code> as the host of the options panel</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-chips</code></td><td>Marks the container that receives rendered chips. Required inside <code class="nds-inline-code lang-html">.nds-form-control</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-multiselect-action</code></td><td>Set on footer buttons. Values: <code class="nds-inline-code lang-html">apply</code> commits the draft and fires <code class="nds-inline-code lang-js">nds:multiselect:change</code>; <code class="nds-inline-code lang-html">reset</code> clears the draft without touching the applied set</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-label</code></td><td>Set on each checkbox input. Overrides the visible label text when rendering chips, useful when the visible label contains extra markup or context</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-no-auto-close</code></td><td>Set on the checkbox fieldset and the Reset button so the dropmenu stays open while the user toggles options or clears the draft</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Multiselect</strong> namespace initializes all <code class="nds-inline-code lang-html">.nds-multiselect</code> fields on load. Each instance lives on its DOM node as <code class="nds-inline-code lang-js">element.ndsMultiselect</code> and exposes methods for programmatic control. Listen for <code class="nds-inline-code lang-js">nds:multiselect:change</code> to react to committed selections.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize (auto-runs on load) ─────────────────────
// Call again after injecting multiselect HTML dynamically.
NDS.Multiselect.init();

// ── Create an instance manually ────────────────────────
// Returns the NDSMultiselect instance. Useful for markup
// added after the initial page load.
const field = document.querySelector('.nds-multiselect');
NDS.Multiselect.create(field);

// ── Access the instance on a live field ────────────────
// Every auto-initialized root stores its instance here.
const instance = field.ndsMultiselect;

// ── Read the applied selection ─────────────────────────
instance.applied;   // ['ai', 'cloud']  // committed values
instance.draft;     // ['ai', 'cloud']  // in-panel staging set

// ── Commit, clear, or remove programmatically ──────────
instance.apply();               // promote draft → applied, emit change
instance.reset();               // clear draft only (applied untouched)
instance.removeValue('cloud');  // drop value from both sets, emit change

// ── Listen for committed selection changes ─────────────
// Fires on apply() and on chip removal, never on draft toggles.
field.addEventListener('nds:multiselect:change', (e) => {
    const { name, values, labels } = e.detail;
    // name:   form field name (from data-multiselect-name)
    // values: array of applied checkbox values
    // labels: array of display labels in the same order
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
