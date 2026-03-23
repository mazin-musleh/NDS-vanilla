---
layout: page
title: Autocomplete
hero_title: Autocomplete - National Design System
hero_description: Remote typeahead search input with keyboard navigation, result highlighting, and debounced API fetching
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Autocomplete Input -->
<section id="autocompleteOverview" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Autocomplete Input</h2>
      <p class="nds-section-description">Type-ahead search with remote data fetching and dropdown results</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-action">
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["data-required", ".nds-form-container", "requiredToggle", "attr"]'>
                <span class="label">Required</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["disabled", ".nds-form-container", "disabledToggle", "data-state"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container" id="autocomplete-demo" data-url="{{ '/assets/data/services-autocomplete.json' | relative_url }}"
                data-name="Title" data-query-param="q">
                <div class="nds-form-header">
                  <label for="demo-autocompleteInput">
                    <span class="label">Search services</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                  <input type="text" id="demo-autocompleteInput" autocomplete="on"
                    placeholder="Type to search...">
                  <div class="nds-form-action">
                    <button class="nds-btn nds-subtle clear" type="button" aria-label="Clear input" hidden>
                      <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
                    </button>
                  </div>
                </div>
                <div class="nds-form-footer" data-feedback-target hidden></div>
              </div>
            </div>
          </div>
          <div class="demo-code">
          <div class="nds-tabs nds-code nds-divided" hidden>
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-autocomplete-1" id="tab-autocomplete-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-autocomplete-1"
                aria-labelledby="tab-autocomplete-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
<div class="nds-form-container" data-url="/api/services" data-name="Title">
  <div class="nds-form-header">
    <label for="autocomplete-1">
      <span class="label">Search services</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="hgi hgi-stroke hgi-search-01 icon"></i>
    <input type="text" id="autocomplete-1" autocomplete="on"
      placeholder="Type to search...">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle clear" type="button"
        aria-label="Clear input" hidden>
        <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target hidden></div>
</div>
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
<section id="autocompleteFeatures" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
      <p class="nds-section-description">What you get out of the box with zero configuration</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket icon"></i>
            <span class="label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Initializes automatically on any input with <code class="nds-inline-code lang-html">autocomplete="on"</code> inside a container with <code class="nds-inline-code lang-html">data-url</code>. For dynamic content, call <code class="nds-inline-code lang-js">NDS.Autocomplete.reinit()</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-list-01 icon"></i>
            <span class="label">Result Highlighting</span>
          </span>
          <p class="nds-item-desc">Matching characters in results are highlighted with <code class="nds-inline-code lang-html">&lt;mark&gt;</code> tags. Results display in a dropdown built on the NDS Dropmenu component.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard icon"></i>
            <span class="label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">Arrow keys navigate results, Enter selects the active item, Escape closes the dropdown. The active item scrolls into view automatically.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03 icon"></i>
            <span class="label">Debounced Fetching</span>
          </span>
          <p class="nds-item-desc">API requests are debounced at 300ms. Previous in-flight requests are cancelled via AbortController. Loading state shows on the input during fetch.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-globe-02 icon"></i>
            <span class="label">Bilingual Support</span>
          </span>
          <p class="nds-item-desc">Works with Arabic and English content. Empty state message adapts to the page language. RTL and LTR layouts supported.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-circle-02 icon"></i>
            <span class="label">Form Integration</span>
          </span>
          <p class="nds-item-desc">Selected values sync to the input. Clear button resets the selection. Works with the forms validation and status API.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<section id="autocompleteGuidelines" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
      <p class="nds-section-description">When and how to use autocomplete inputs effectively</p>
    </div>
    <div class="nds-section-content">
      <div class="nds-content-block">
        <h3 class="nds-block-title">When to Use</h3>
        <ul>
          <li>Search fields that query a remote API for suggestions as the user types</li>
          <li>Large datasets where showing all options in a <a href="{{ 'components/forms' | relative_url }}" class="nds-color">select dropdown</a> is impractical</li>
          <li>Service search, city lookup, product search, or any entity search</li>
          <li>Set <code class="nds-inline-code lang-html">data-min-chars</code> to control when fetching begins (default: 3 characters)</li>
          <li>For static option lists, use a <a href="{{ 'components/forms' | relative_url }}" class="nds-color">select dropdown</a> instead</li>
        </ul>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">JavaScript API</h3>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                  <i class="hgi hgi-stroke hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-javascript code">
// Auto-initializes on .nds-form-container[data-url] with autocomplete="on"
// For dynamic content:
NDS.Autocomplete.reinit();

// Create an instance programmatically
var instance = NDS.Autocomplete.create(containerElement);

// Destroy an instance
instance.destroy();

// Listen for selection
container.addEventListener('nds:autocomplete:select', function(e) {
  console.log('Selected:', e.detail.item);
  console.log('Value:', e.detail.value);
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
      <div class="nds-content-block">
        <h3 class="nds-block-title">Configuration Attributes</h3>
        <ul>
          <li><code class="nds-inline-code lang-html">data-url</code> on the container: API endpoint that returns JSON</li>
          <li><code class="nds-inline-code lang-html">data-name</code>: JSON field name to display in results (default: "Title")</li>
          <li><code class="nds-inline-code lang-html">data-min-chars</code>: minimum characters before fetching starts (default: 3)</li>
          <li><code class="nds-inline-code lang-html">data-query-param</code>: query string parameter name sent to the API (default: "q")</li>
          <li><code class="nds-inline-code lang-html">data-results-path</code>: dot notation path to the results array in the response (e.g. "response.items"). Without it, the component auto-detects flat arrays or objects with <code class="nds-inline-code lang-js">results</code> or <code class="nds-inline-code lang-js">data</code> keys</li>
        </ul>
      </div>
      <div class="nds-content-block">
        <h3 class="nds-block-title">API Response Format</h3>
        <p>The component sends a GET request with the query as a URL parameter (e.g. <code class="nds-inline-code lang-html">/api/services?q=term</code>). The API handles filtering and returns JSON in one of these formats:</p>
        <div class="nds-code nds-expandable">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                  <i class="hgi hgi-stroke hgi-copy-01"></i>
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
// Filtering is done server-side, not in the browser
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
