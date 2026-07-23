---
layout: page
title: Autocomplete
hero_title: Autocomplete - National Design System
hero_description: Remote typeahead search input with keyboard navigation, result highlighting, and debounced API fetching
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.4.x"
last_edit: "15/07/2026 - 01:15 AM"
---

<!-- Autocomplete Input -->
<section id="autocompleteOverview" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Autocomplete Input</h2>
      <p class="nds-section-description">Type-ahead search with remote data fetching and dropdown results</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["data-required", ".nds-form-container", "requiredToggle", "attr"]'>
                <span class="nds-label">Required</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-form-container", "disabledToggle", "data-state"]'>
                <span class="nds-label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                <span class="nds-label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container" id="autocomplete-demo" data-url="{{ '/assets/data/services-autocomplete.json' | relative_url }}"
                data-name="Title" data-query-param="q">
                <div class="nds-form-header">
                  <label for="demo-autocompleteInput">
                    <span class="nds-label">Search services</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                  <input type="text" id="demo-autocompleteInput" autocomplete="on"
                    placeholder="Type to search...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
                      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided">
            <div class="nds-tab-list-container nds-scroll-more">
              <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                  aria-controls="panel-autocomplete-1" id="tab-autocomplete-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
              <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
              </button>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-autocomplete-1"
                aria-labelledby="tab-autocomplete-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                    <i class="nds-icon nds-hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
&lt;div class="nds-form-container" data-url="/api/services" data-name="Title"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="autocomplete-1"&gt;
      &lt;span class="nds-label"&gt;Search services&lt;/span&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;input type="text" id="autocomplete-1" autocomplete="on"
      placeholder="Type to search..."&gt;
    &lt;div class="nds-form-action"&gt;
      &lt;button class="nds-btn nds-subtle nds-clear" type="button"
        aria-label="Clear input" hidden&gt;
        &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
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
<section id="autocompleteFeatures" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
      <p class="nds-section-description">What you get out of the box with zero configuration</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Initializes automatically on any input with <code class="nds-inline-code lang-html">autocomplete="on"</code> inside a container with <code class="nds-inline-code lang-html">data-url</code>. For dynamic content, call <code class="nds-inline-code lang-js">NDS.Autocomplete.reinit()</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-list-01"></i>
            <span class="nds-label">Result Highlighting</span>
          </span>
          <p class="nds-item-desc">Matching characters in results are highlighted with <code class="nds-inline-code lang-html">&lt;mark&gt;</code> tags. Results display in a dropdown built on the NDS Dropmenu component.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">Arrow keys navigate results, Enter selects the active item, Escape closes the dropdown, Tab closes without selecting, Home jumps to the first item, End jumps to the last item. The active item scrolls into view automatically.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Debounced Fetching</span>
          </span>
          <p class="nds-item-desc">API requests are debounced at 300ms. Previous in-flight requests are cancelled via AbortController. Loading state shows on the input during fetch.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-globe-02"></i>
            <span class="nds-label">Bilingual Support</span>
          </span>
          <p class="nds-item-desc">Works with Arabic and English content. Empty state message adapts to the page language. RTL and LTR layouts supported.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
            <span class="nds-label">Form Integration</span>
          </span>
          <p class="nds-item-desc">Selected values sync to the input. Clear button resets the selection. Works with the forms validation and status API.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-list-01"></i>
            <span class="nds-label">Search Box Auto-submit</span>
          </span>
          <p class="nds-item-desc">When the container also has class <code class="nds-inline-code lang-html">nds-search-box</code>, selecting a result automatically clicks the nearest <code class="nds-inline-code lang-html">.nds-search-btn</code> to submit the search without extra interaction.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="autocompleteGuidelines" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use autocomplete inputs effectively</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Search fields that query a remote API for suggestions as the user types</li>
          <li>Large datasets where showing all options in a <a href="{{ 'components/forms' | relative_url }}" class="nds-color">select dropdown</a> is impractical</li>
          <li>Service search, city lookup, product search, or any entity search</li>
          <li>Set <code class="nds-inline-code lang-html">data-min-chars</code> to control when fetching begins (default: 3 characters)</li>
          <li>For static option lists, use a <a href="{{ 'components/forms' | relative_url }}" class="nds-color">select dropdown</a> instead</li>
        </ul>
      </div>
      <div class="nds-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                  <i class="nds-icon nds-hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-javascript code">
// Auto-initializes on .nds-form-container[data-url] with autocomplete="on"
// For dynamic content:
NDS.Autocomplete.reinit();

// Create an instance programmatically (options are optional)
var instance = NDS.Autocomplete.create(containerElement, {
  // Override client-side filtering (used in both fetch modes)
  filter: function(items, query) { return items.filter(/* … */); },
  // Override per-row label rendering; developer owns escaping
  renderItem: function(item, query) { return '&lt;strong&gt;' + item.Title + '&lt;/strong&gt;'; }
});

// Destroy an instance
instance.destroy();

// Listen for selection
container.addEventListener('nds:autocomplete:select', function(e) {
  console.log('Selected item object:', e.detail.item);
  console.log('Display text:', e.detail.text);
});

// Listen for results fetched
container.addEventListener('nds:autocomplete:fetch', function(e) {
  console.log('Query:', e.detail.query);
  console.log('Results:', e.detail.results);
});

// Listen for clear
container.addEventListener('nds:autocomplete:clear', function(e) {
  console.log('Input cleared');
});
                </code>
              </div>
        </div>
      </div>
      <div class="nds-block">
        <h3 class="nds-block-title">Configuration Attributes</h3>
        <ul>
          <li><code class="nds-inline-code lang-html">data-url</code> on the container: API endpoint that returns JSON</li>
          <li><code class="nds-inline-code lang-html">data-name</code>: JSON field name to display in results (default: "Title")</li>
          <li><code class="nds-inline-code lang-html">data-min-chars</code>: minimum characters before fetching starts (default: 3)</li>
          <li><code class="nds-inline-code lang-html">data-query-param</code>: query string parameter name sent to the API (default: "q")</li>
          <li><code class="nds-inline-code lang-html">data-results-path</code>: dot notation path to the results array in the response (e.g. "response.items"). Without it, the component auto-detects flat arrays or objects with <code class="nds-inline-code lang-js">results</code> or <code class="nds-inline-code lang-js">data</code> keys</li>
          <li><code class="nds-inline-code lang-html">data-fetch</code>: fetch mode, either <code class="nds-inline-code lang-js">"each"</code> (default) or <code class="nds-inline-code lang-js">"once"</code>. With <code class="nds-inline-code lang-js">"each"</code> the API is called on every keystroke and the server filters results. With <code class="nds-inline-code lang-js">"once"</code> the full list is fetched once on first input, cached, and filtered client-side on each keystroke. Use <code class="nds-inline-code lang-js">"once"</code> for small static datasets such as countries, currencies, or departments.</li>
          <li><code class="nds-inline-code lang-html">data-empty-message</code>: custom text for the "no results" placeholder shown when a query matches nothing (default: localized "No results")</li>
          <li><code class="nds-inline-code lang-html">data-empty-icon</code>: icon classes for the "no results" placeholder (default: <code class="nds-inline-code lang-html">nds-icon nds-hgi-search-01</code>)</li>
        </ul>
      </div>
      <div class="nds-block">
        <h3 class="nds-block-title">API Response Format</h3>
        <p>With the default <code class="nds-inline-code lang-js">data-fetch="each"</code> mode, the component sends a GET request per keystroke (e.g. <code class="nds-inline-code lang-html">/api/services?q=term</code>) and the server handles filtering. With <code class="nds-inline-code lang-js">data-fetch="once"</code>, the full URL is fetched once with no query parameter and filtering is done client-side. Both modes expect JSON in one of these formats:</p>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                  <i class="nds-icon nds-hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-javascript code">
// Flat array
[{ "Title": "Item one" }, { "Title": "Item two" }]

// Object with "results" or "data" key
{ "results": [{ "Title": "Item one" }] }
{ "data": [{ "Title": "Item one" }] }

// The display field matches data-name (default: "Title")
// Extra fields are passed through in event detail on selection
[{ "Id": 1, "Title": "Request a service", "Category": "Services" }]

// Nested response: use data-results-path="response.items"
{ "response": { "items": [{ "Title": "Item one" }], "total": 42 } }

// The component renders up to 20 results
// Filtering: server-side with data-fetch="each" (default), client-side with data-fetch="once"
                </code>
              </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('autocomplete-demo');
    if (container && window.NDS && NDS.Forms) {
      NDS.Forms.setStatus({ element: container, status: 'neutral', message: 'Try typing "request" or "طلب"', permanent: true });
    }
  });
</script>
