---
layout: page
title: Filter
hero_title: Filter - National Design System
hero_description: Filter narrows a list to the items that match a search term and the options the user picks.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:12 PM"
---

<section id="filterOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A filter is a set of elements that share one `data-filter-target`: the `id` of the container that holds the items. Each element is a surface of the filter: a search box, a `nds-filter` [Dropmenu](../components/dropmenu) of option groups, a row of applied filters, a count. The surfaces need no common parent, so a [Toolbar](../components/toolbar) usually holds them above the items. Each item carries `data-filter` marks with its values, and the menu's options match against them.

Pick another component when:

- the user moves between sections, not values in one list: [Tabs](../components/tabs) or [Side Menu](../ui-shell/sidemenu)
- the field suggests matches as the user types: [Autocomplete](../components/autocomplete)
- the user picks values for a form, not for a list: [Multiselect](../components/multiselect)

</div>
  </div>
</section>

<section id="filterMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="filter-bar" data-canon data-variants="filterVariantsTable">
<div class="nds-toolbar">
  <div class="nds-form-container nds-search-box" data-filter-target="flt-items">
    <div class="nds-search-content">
      <div class="nds-form-control">
        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
        <input type="text" id="flt-search-input" class="nds-search-input" placeholder="Search services..." aria-label="Search services">
        <div class="nds-form-action">
          <button class="nds-btn nds-subtle nds-clear" type="button" hidden aria-label="Clear search">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <button class="nds-btn nds-primary nds-search-btn" type="button">
        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
        <span class="nds-label" data-hidden="sm sr">Search</span>
      </button>
    </div>
  </div>
  <div class="nds-dropmenu nds-filter" data-filter-target="flt-items">
    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
      <i class="hgi hgi-stroke hgi-filter"></i>
      <span class="nds-label" data-hidden="sm sr">Filter</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
      <div class="nds-dropmenu-scroll">
        <div id="flt-sector" data-filter="sector" data-filter-type="checkbox" data-filter-legend="Sector"></div>
        <div data-filter="fee" data-filter-type="slider" data-filter-legend="Fee" data-filter-min="0" data-filter-max="3000" data-filter-step="100" data-filter-currency="SAR"></div>
      </div>
      <div class="nds-dropmenu-footer">
        <hr class="nds-divider">
        <div class="nds-dropmenu-action">
          <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear" data-no-auto-close>
            <span class="nds-label">Reset</span>
          </button>
          <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
            <span class="nds-label">Apply</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-filter-applied" data-filter-target="flt-items" hidden>
    <span class="nds-label">Applied Filters:</span>
    <div class="nds-chips"></div>
  </div>
</div>
<div id="flt-items" class="nds-grid nds-paged-content" data-filter-items="nds-card" style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 1;">
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Commercial registration</span>
      </div>
      <div class="nds-card-value">
        <span class="nds-number-format" data-currency="SAR" data-filter="fee" data-filter-value="200">200</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Business</span></span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Building permit</span>
      </div>
      <div class="nds-card-value">
        <span class="nds-number-format" data-currency="SAR" data-filter="fee" data-filter-value="1500">1500</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Housing</span></span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Vehicle registration renewal</span>
      </div>
      <div class="nds-card-value">
        <span class="nds-number-format" data-currency="SAR" data-filter="fee" data-filter-value="100">100</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Transport</span></span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Driver's license renewal</span>
      </div>
      <div class="nds-card-value">
        <span class="nds-number-format" data-currency="SAR" data-filter="fee" data-filter-value="400">400</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Transport</span></span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Municipal license</span>
      </div>
      <div class="nds-card-value">
        <span class="nds-number-format" data-currency="SAR" data-filter="fee" data-filter-value="800">800</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Business</span></span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Housing support request</span>
      </div>
      <div class="nds-card-value">
        <span data-filter="fee" data-filter-value="0">Free</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Housing</span></span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Trade name reservation</span>
      </div>
      <div class="nds-card-value">
        <span class="nds-number-format" data-currency="SAR" data-filter="fee" data-filter-value="200">200</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Business</span></span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Truck operating card</span>
      </div>
      <div class="nds-card-value">
        <span class="nds-number-format" data-currency="SAR" data-filter="fee" data-filter-value="2500">2500</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm"><span class="nds-label" data-filter="sector">Transport</span></span>
      </div>
    </div>
  </div>
</div>
<nav class="nds-pagination" data-auto-pagination="flt-items" aria-label="Services pagination"></nav>
</script>
<script type="text/html" id="filter-part-search" data-canon>
<div class="nds-form-container nds-search-box" data-filter-target="flt-items">
  <div class="nds-search-content">
    <div class="nds-form-control">
      <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
      <input type="text" id="flt-search-input" class="nds-search-input" placeholder="Search services..." aria-label="Search services">
      <div class="nds-form-action">
        <button class="nds-btn nds-subtle nds-clear" type="button" hidden aria-label="Clear search">
          <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <button class="nds-btn nds-primary nds-search-btn" type="button">
      <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
      <span class="nds-label" data-hidden="sm sr">Search</span>
    </button>
  </div>
</div>
</script>
<script type="text/html" id="filter-part-sector" data-canon>
<div id="flt-sector" data-filter="sector" data-filter-type="checkbox" data-filter-legend="Sector"></div>
</script>
<script type="text/html" id="filter-part-sector-manual" data-canon>
<fieldset id="flt-sector-manual" class="nds-form-group nds-check-group nds-dropmenu-group" data-filter="sector">
  <legend class="nds-label">Sector</legend>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="flt-sector-business">
        <span class="nds-label">Business</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="flt-sector-business" name="sector" value="Business" class="nds-check">
    </div>
  </div>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="flt-sector-housing">
        <span class="nds-label">Housing</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="flt-sector-housing" name="sector" value="Housing" class="nds-check">
    </div>
  </div>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="flt-sector-transport">
        <span class="nds-label">Transport</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="flt-sector-transport" name="sector" value="Transport" class="nds-check">
    </div>
  </div>
</fieldset>
</script>
<script type="text/html" id="filter-part-fee" data-canon>
<div data-filter="fee" data-filter-type="slider" data-filter-legend="Fee" data-filter-min="0" data-filter-max="3000" data-filter-step="100" data-filter-currency="SAR"></div>
</script>
<script type="text/html" id="filter-part-fee-manual" data-canon>
<fieldset class="nds-form-group nds-dropmenu-group" data-filter="fee" data-filter-currency="SAR">
  <legend class="nds-label">Fee</legend>
  <div class="nds-form-container nds-slider-container nds-stacked nds-slider-range">
    <div class="nds-form-control">
      <output class="nds-slider-value nds-slider-value-min nds-number-format" data-currency="SAR">0</output>
      <div class="nds-slider-track">
        <input type="range" class="nds-slider nds-slider-min" min="0" max="3000" step="100" value="0" aria-label="Lowest fee">
        <input type="range" class="nds-slider nds-slider-max" min="0" max="3000" step="100" value="3000" aria-label="Highest fee">
      </div>
      <output class="nds-slider-value nds-slider-value-max nds-number-format" data-currency="SAR">3000</output>
    </div>
  </div>
</fieldset>
</script>
<script type="text/html" id="filter-part-applied" data-canon>
<div class="nds-filter-applied" data-filter-target="flt-items" hidden>
  <span class="nds-label">Applied Filters:</span>
  <div class="nds-chips"></div>
</div>
</script>
<script type="text/html" id="filter-part-count" data-canon>
<span class="nds-bar-text" data-filter-target="flt-items"><span data-filter-count>8</span> services</span>
</script>
<script type="text/html" id="filter-part-suggest" data-canon>
<div class="nds-auto-fill" data-target="flt-search-input" data-filter-target="flt-items" data-autofill-apply>
  <span class="nds-label">Suggestions:</span>
  <div class="nds-chips">
    <button type="button" class="nds-chip nds-neutral nds-rounded nds-item">
      <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
      <span class="nds-label">Renewal</span>
    </button>
    <button type="button" class="nds-chip nds-neutral nds-rounded nds-item">
      <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
      <span class="nds-label">License</span>
    </button>
    <button type="button" class="nds-chip nds-neutral nds-rounded nds-item">
      <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
      <span class="nds-label">Registration</span>
    </button>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="filterVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every card carries two marks: `sector` and `fee`. A group in the menu filters by one of them, and a mark with no group is ignored, so the cards stay the same for every choice. `#flt-sector` is the Sector group built by the script: the Sector type, Fixed list and Collapsible rows need Auto. Each Group options choice is two rows, one per group: write both. Group and part rows go into `.nds-dropmenu-scroll` or `.nds-toolbar`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Group options | Auto (default) (hint: The script builds the groups) | canon `#filter-part-sector` | `.nds-dropmenu-scroll` | `data-filter-type` on empty groups: the script builds the Sector options from the cards' `sector` marks, and the Fee slider from its attributes |
| Group options | Auto (default) (hint: The script builds the groups) | canon `#filter-part-fee` | `.nds-dropmenu-scroll` | |
| Group options | Manual (hint: You write the groups in the HTML) | canon `#filter-part-sector-manual` | `.nds-dropmenu-scroll` | Groups you write, with no `data-filter-type`: a `<fieldset>` of checkboxes for Sector, and a range [Slider](../components/slider) for Fee. For options that need their own markup |
| Group options | Manual (hint: You write the groups in the HTML) | canon `#filter-part-fee-manual` | `.nds-dropmenu-scroll` | |
| Sector type | Checkbox (default) | — | `#flt-sector` | Any number of values. A card matches when it has one of them |
| Sector type | Radio | `[data-filter-type="radio"]` | `#flt-sector` | One value. The script adds All as the first option |
| Sector type | Switch | `[data-filter-type="switch"]` | `#flt-sector` | Matches like Checkbox, drawn as switches. For on/off features |
| Menu (any) | Fixed list (hint: The options are a list you write, not read from the cards) | `[data-filter-values='["Business","Health","Housing","Transport"]']` | `#flt-sector` | The options come from `data-filter-values`, in its order, also when no card has the value (Health). The script reads no cards for them. For a list the server owns |
| Menu (any) | Collapsible (hint: The Sector group opens and closes) | `[data-filter-accordion]` | `#flt-sector` | The group becomes an [Accordion](../components/accordion) item, closed, with a count of the picked values on its header. For a group with many options |
| Menu (any) | Option search (hint: A search box above the options) | `[data-search]` | `.nds-filter` | A search box at the top of the menu narrows the options. `data-search="10"` shows it only from 10 options |
| Menu (any) | Option search (hint: A search box above the options) | `[data-search-item]` | `.nds-check-container` | Only on a Sector group you write yourself: the search finds options that carry it |
| Menu (any) | No menu (hint: A search box alone is a filter) | remove | `.nds-filter` | Search only. The search box needs no `nds-filter` element |
| Search box | Search box (default) (id: search) | canon `#filter-part-search` | `.nds-toolbar` (start) | Searches the text of each card. Enter or the Search button applies it |
| Applied chips | Applied chips (default) | canon `#filter-part-applied` | `.nds-toolbar` | One removable chip per applied value and for the search term. Hidden while nothing is applied |
| Suggestions | Suggestions (demo: + search) (hint: Chips that fill the search box) | canon `#filter-part-suggest` | `.nds-toolbar` | Chips that write a search term into the search box. Hidden once a filter is applied. Needs the Search box |
| Result count | Result count | canon `#filter-part-count` | `.nds-toolbar` | The script writes the number of matching items into `[data-filter-count]` |
{: #filterVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="filterBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Option Groups
{: .nds-block-title}

An element with `data-filter` in the menu is a group. Its options come from one of four places: the marks on the items (`data-filter-type`), a list on the group (`data-filter-values`), inputs you write, or your script (`populateFilter()`). From the marks, the script makes one option per value it finds, sorted, in a `<fieldset>` that replaces the element.

The user picks values in the menu, and Apply applies them all at once. A checkbox or switch group matches an item that has any picked value. An item must match every group that has a value.

### Values and Labels
{: .nds-block-title}

A mark's text is its value. `data-filter-value` on the mark sets a value apart from the text: the URL and the match use the value, and the option and the chip show the text. `data-filter-values` on a group lists its options: an array of values, or an object of value-label pairs. The script then reads no items for that group.

### Range Slider
{: .nds-block-title}

`data-filter-type="slider"` builds a [Slider](../components/slider) over the number in each item's `data-filter-value`. With `data-filter-min` and `data-filter-max` it has two thumbs. With `data-filter-max` alone it has one thumb, "up to", from 0. The applied range shows as one chip, and removing it puts both thumbs back at the ends. In the URL a range reads `fee=200-1500`.

### Manual Options
{: .nds-block-title}

Leave out `data-filter-type` and write the inputs in the group yourself, as a [Checkbox](../components/checkbox) or [Radio](../components/radio) group. The script reads every checkbox, radio and `.nds-switch-input` in it, and the chip shows the option's `.nds-label`. Each `value` matches a mark's value, in any letter case. Inputs added later join the group by themselves. For Option search, add `data-search-item` to each `.nds-form-container`.

A group that holds a range [Slider](../components/slider) (`.nds-slider-container`) is a range filter on your slider: its `min` and `max` are the full range. Put `data-filter-currency` or `data-filter-unit` on the group for the chip.

### Options from a Script
{: .nds-block-title}

`populateFilter(name, values, type)` builds a group's options from values your script fetched, and a second call replaces them. Use it for cascading groups: call it again when the parent group changes. Leave `data-filter-type` off that group, as below. `refresh()` rebuilds every group that has it from the items, and would replace your values.

<script type="text/html" id="filter-populate-js" data-canon data-lang="js" data-preview="none">
// In the menu: <div data-filter="entity" data-filter-legend="Entity"></div>
NDS.Filter.whenReady('.nds-filter[data-filter-target="services-results"]', function (filter) {
  NDS.request('/api/entities', { json: true }).then(function (res) {
    filter.populateFilter('entity', res.data.map(function (entity) { return entity.name; }), 'checkbox');
  });
});
</script>

### Collapsible Groups
{: .nds-block-title}

`data-filter-accordion` turns one group into an [Accordion](../components/accordion) item, closed at load, with `data-filter-legend` as its header. A tag on the header counts the picked values and hides at zero. Each such group is its own accordion. Wrap several in one `<div class="nds-accordion">` to make them one.

### Applied Chips
{: .nds-block-title}

A `nds-filter-applied` row with a `nds-chips` element inside shows one chip per applied value, and one for the search term. Removing a chip removes its value and applies the rest at once. `data-chip-class` on the row sets the chips' classes. With a `[data-filter-query]` element on the filter, the search term shows there, in quotes, and gets no chip.

### Suggestions
{: .nds-block-title}

A `nds-auto-fill` row holds `nds-item` chips. A click writes the chip's text into the field named by `data-target`, and `data-autofill-apply` also runs the search. Give the row `data-filter-target` too. When the filter also has an applied-chips row, it hides the suggestions while a value or a search term is applied. For suggestions that come from a server as the user types, add [Autocomplete](../components/autocomplete) to the search box.

### Form Submission
{: .nds-block-title}

For results from a server, add a `<form>` with the same `data-filter-target` and `data-filter-submit`. Apply, the search box, the menu's Reset and every chip removal then submit the form, and the server returns the filtered page. The script writes the form's `id` into the `form` attribute of each control in the surfaces, so a surface outside the form still submits. Give the form an `id`. A slider range or an unnamed search field goes into hidden inputs, under the same name as in the URL.

<script type="text/html" id="filter-form" data-canon data-form data-preview="none">
<form id="services-form" data-filter-target="services-results" data-filter-submit method="get" action="/services">
  <div class="nds-toolbar">
    <div class="nds-form-container nds-search-box" data-filter-target="services-results">
      <div class="nds-search-content">
        <div class="nds-form-control">
          <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
          <input type="text" name="search" class="nds-search-input" placeholder="Search services..." aria-label="Search services">
        </div>
        <button class="nds-btn nds-primary nds-search-btn" type="button">
          <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
          <span class="nds-label" data-hidden="sm sr">Search</span>
        </button>
      </div>
    </div>
    <div class="nds-dropmenu nds-filter" data-filter-target="services-results">
      <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
        <i class="hgi hgi-stroke hgi-filter"></i>
        <span class="nds-label" data-hidden="sm sr">Filter</span>
      </button>
      <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
          <div data-filter="sector" data-filter-type="checkbox" data-filter-legend="Sector" data-filter-values='{"business":"Business","housing":"Housing","transport":"Transport"}'></div>
        </div>
        <div class="nds-dropmenu-footer">
          <hr class="nds-divider">
          <div class="nds-dropmenu-action">
            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear" data-no-auto-close>
              <span class="nds-label">Reset</span>
            </button>
            <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
              <span class="nds-label">Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="nds-filter-applied" data-filter-target="services-results" hidden>
      <span class="nds-label">Applied Filters:</span>
      <div class="nds-chips"></div>
    </div>
  </div>
</form>
<div id="services-results">
  <!-- The server writes the matching services here -->
</div>
</script>

A group on a server page lists its options with `data-filter-values`: the page holds only one page of results, and options read from it would miss the others. Generated options submit as `filter-{name}`.

### AJAX Submission
{: .nds-block-title}

`data-ajax` on the form sends the request without a page load. For an HTML response, the script swaps the item container for the element with the same `id` in the response. A response without that element counts as a failure. For a response with a JSON `Content-Type`, the script changes no items: render them in `nds:filterFormComplete`. While a request runs, the menu takes no clicks and the button that sent it shows a spinner. A newer request cancels the one in flight.

<script type="text/html" id="filter-json-js" data-canon data-lang="js" data-preview="none">
var filter = document.querySelector('.nds-filter[data-filter-target="services-results"]');
filter.addEventListener('nds:filterFormComplete', function (e) {
  if (!e.detail.isJson) return;
  var list = document.getElementById('services-results');
  list.replaceChildren();
  e.detail.data.records.forEach(function (record) {
    var card = document.createElement('div');
    card.className = 'nds-card nds-stroke';
    var title = document.createElement('span');
    title.className = 'nds-card-title';
    title.textContent = record.title;
    card.appendChild(title);
    list.appendChild(card);
  });
  list.setAttribute('data-total-count', e.detail.data.total);
});
</script>

On a failure the items stay as they were, and so do the chips, the badge, the options and the URL: the script puts them back to match the items. An unapplied pick in the open menu is lost. The script shows an error toast, unless a listener calls `preventDefault()` on `nds:filterFormError`. The no-results alert never shows in form mode: call `showNoResultsAlert()` from your response handler.

### Your Own Request
{: .nds-block-title}

Call `preventDefault()` on `nds:filterFormAjax` to send the request yourself, such as a POST with a JSON body. The event fires for Apply, a chip removal, the menu's Reset, `reset()` and the search box. The chips, the badge and the URL already show the new filters when it fires: call `detail.rollback()` if your request fails.

<script type="text/html" id="filter-request-js" data-canon data-lang="js" data-preview="none">
var form = document.getElementById('services-form');
form.addEventListener('nds:filterFormAjax', function (e) {
  e.preventDefault();
  NDS.request('/api/services', { method: 'POST', body: new FormData(form), json: true })
    .then(function (res) { renderServices(res.data.records); })
    .catch(function () { e.detail.rollback(); });
});
</script>

### Sort Ownership
{: .nds-block-title}

A filter also drives the [Sort](../components/sort) triggers that carry its `data-filter-target`. Sort is not a filter value and is never sent with the form. Decide by what the server returns. All matching items, paged in the browser: add `data-sort` triggers, and the browser sorts. One page of items: add no `data-sort`, and put a `<select name="sort">` in the form for the server.

</div>
  </div>
</section>

<section id="filterFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The script starts one filter for each <code class="nds-inline-code lang-html">data-filter-target</code> value and joins every element that carries it. A search box alone is a working filter.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-link-circle-02"></i>
            <span class="nds-label">Shareable URL State</span>
          </span>
          <p class="nds-item-desc">The search term and the applied values stay in the URL query, so a reload or a shared link opens the same list. A checkbox or switch group joins its values with commas, so its values must not contain one.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-01"></i>
            <span class="nds-label">No Results Alert</span>
          </span>
          <p class="nds-item-desc">When no item matches, a warning alert with a Clear Filter button shows in the item container. It closes when items match again.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Filter Count Badge</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-html">nds-filter-btn</code> trigger shows a badge with the number of applied values. The Apply button adds the number of picked values to its label.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-grid"></i>
            <span class="nds-label">Any Item Type</span>
          </span>
          <p class="nds-item-desc">Cards by default. <code class="nds-inline-code lang-html">data-filter-items</code> sets the items: a class, a tag such as <code class="nds-inline-code lang-html">tr</code>, or any selector. On a table, put it and the container's <code class="nds-inline-code lang-html">id</code> on the <code class="nds-inline-code lang-html">&lt;tbody&gt;</code>: it takes only the body's own rows.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Pagination Support</span>
          </span>
          <p class="nds-item-desc">In a <a href="../components/pagination">Pagination</a> container, the pages hold only the matching items, and a new filter goes back to page 1.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off"></i>
            <span class="nds-label">No Flash on Load</span>
          </span>
          <p class="nds-item-desc">A container with <code class="nds-inline-code lang-html">data-filter-items</code> stays hidden until its filter has applied the values in the URL. A shared link never shows the full list first.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-flash"></i>
            <span class="nds-label">Deferred Option Build</span>
          </span>
          <p class="nds-item-desc">Options for a group in the closed menu are built on its first open, not at page load. A group with a value in the URL is built at load.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard</span>
          </span>
          <p class="nds-item-desc">Enter in the search box runs the search. Enter in the open menu runs Apply. Every option is a real input in a <code class="nds-inline-code lang-html">&lt;fieldset&gt;</code> with its legend. Slider thumbs have labels and move with the arrow keys.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Set values and the search term, read the criteria and the matching items, or reset the filter from a script, through <code class="nds-inline-code lang-js">NDS.Filter</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="filterPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Filter in the browser when every item is on the page and the list is short, up to a few hundred items. For more, use form submission.
- Pick the group type by the question. Checkbox: any of several values. Radio: exactly one, with All to undo it. Switch: on/off features. Slider: a number range.
- Keep a Reset button (`data-filter-action="clear"`) next to Apply in the menu footer.
- Keep `hidden` on the applied-chips row. The script shows it once a value is applied.
- Keep legends to one or two words. `data-filter-legend` is the group's heading in the menu.
- Make a group with many options collapsible, and keep a group of 3 or 4 options open.
- Give each mark a value with `data-filter-value` when its text is translated or formatted, such as a price that reads "SAR 250".
- Put `data-filter-items` only on a container that has a filter. The container stays hidden until a filter starts on it.
- On a paged list, show the count with the [Pagination](../components/pagination) records counter in place of `data-filter-count`: it counts the matching items and adds the range shown.
- Give each filter on a page its own group names: the names are the URL keys, and two filters with one name share it.
- Add `data-filter-ignore` to a text field inside a surface that is not the filter's search, so the script does not take it as one.

</div>
  </div>
</section>

<section id="filterApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-filter` | the filter's `.nds-dropmenu` | Marks the menu of option groups. The filter's events fire on it |
| `nds-filter-btn` | the menu's trigger button | Shows the count badge, and the spinner while a form submits. `data-filter-btn` does the same |
| `nds-filter-applied` | a surface with a `.nds-chips` inside | The row of applied chips |
| `nds-auto-fill` | a surface with `.nds-item` chips | The row of suggestions. Hidden while a filter is applied, when the filter has an applied-chips row |
| `nds-filter-menu` | the filter's `.nds-dropmenu-menu` | The script adds it. Style the menu by this class: it can move to `<body>` |
| `nds-filter-range` | the `<fieldset>` of a slider group | The script builds it |
| `nds-filter-hidden-inputs` | a `<div>` in the submission form | The script builds it and writes the hidden inputs into it on each submit |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-filter-target` | every surface, and the submission `<form>` | The `id` of the item container. Every element with the same value is part of one filter |
| `data-search` | `.nds-filter` | A search box at the top of the menu narrows the options. A number shows it only from that many options. See [Dropmenu](../components/dropmenu) |
| `data-portal` | `.nds-filter` | Moves the open menu to `<body>`. A menu in a modal, a drawer or a scrolling box moves there without it. See [Dropmenu](../components/dropmenu) |
| `data-filter` | an element in a surface | A group. The value is the group's name and its URL key |
| `data-filter="search"` | a text field in a surface, or its wrapper | The search field. In the menu, Apply runs it. A `.nds-search-input` outside the menu needs no attribute |
| `data-filter-type` | a group | `checkbox`, `radio`, `switch` or `slider`: the script builds the options. Without it, the script uses the inputs you write in the group, or the options of `populateFilter()` |
| `data-filter-legend` | a group | The group's heading |
| `data-filter-values` | a group with `checkbox`, `radio` or `switch` | The options as JSON: an array of values, or an object of value-label pairs. The script reads no items for this group |
| `data-filter-variant` | a group | A class the script adds to each input (on a switch, to its `.nds-switch`), such as `nds-primary` |
| `data-filter-all-label` | a radio group | The label of the All option. The default is All, or الكل on an Arabic page |
| `data-filter-no-all` | a radio group | No All option |
| `data-filter-accordion` | a group | Makes it a collapsible [Accordion](../components/accordion) item |
| `data-filter-min`, `data-filter-max` | a slider group | The ends of the range. With `data-filter-max` alone, the slider has one thumb from 0. `data-filter-max` is required and must be above the minimum |
| `data-filter-step` | a slider group | The step of a thumb. The default is 1 |
| `data-filter-currency` | a slider group | A currency code, such as `SAR`, on the slider values and the chip |
| `data-filter-unit` | a slider group | A unit after the slider values and the chip, such as `km`. For a value that is not money |
| `data-filter-action` | a button in a surface | `apply` applies the picked values and closes the menu. `clear` clears the menu's values and applies the result, with the menu open. `reset` clears every value and the search term |
| `data-filter-count` | an element in a surface | The script writes the number of matching items into it |
| `data-filter-query` | an element in a surface | The script writes the search term into it, in quotes. The search term then gets no chip |
| `data-chip-class` | `.nds-filter-applied` | The classes of each chip. The default is `nds-primary nds-lg` |
| `data-target` | `.nds-auto-fill` | The `id` or `name` of the field a chip fills |
| `data-autofill-apply` | `.nds-auto-fill` | A chip click also runs the search |
| `data-filter-ignore` | a text field, or an element around it | The script does not use the field as the search field |
| `data-filter-items` | the item container | The items: a class name without the dot, a tag, or a selector. The default is `.nds-card`. With it, the container stays hidden until the filter starts |
| `data-total-count` | the item container | A count from the server. `[data-filter-count]` shows it in place of the matching items |
| `data-filter` | an item, or an element inside one | A mark: the item's value for the group with that name. Its text is the value |
| `data-filter-value` | a mark | The value in place of the text. A slider group reads it as a number |
| `data-filtered` | an item | The script sets it on an item that does not match, and removes it when the item matches again. CSS hides the item. Do not write it |
| `data-filter-submit` | a `<form>` with `data-filter-target` | The filter submits this form in place of filtering in the browser |
| `data-ajax` | the submission `<form>` | Sends it without a page load |
| `data-state="submitting"` | `.nds-filter` | The script sets it when the form submits, and removes it when the response arrives or fails. While it is set, the menu takes no clicks |
| `data-state="loading"` | `.nds-filter-btn`, or the search button | The script sets it on the button that submitted the form, and removes it when the response arrives or fails |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--dropmenu-min-width` | `250px` | The menu's minimum width. Set it on `.nds-filter`: the menu keeps it when it moves to `<body>` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

`NDS.Filter` loads after the page shows. Until then each call returns a Promise, so a sync read such as `getInstance()` returns no instance. Use `whenReady()` from your own scripts.

| Method | Effect |
|---|---|
| `NDS.Filter.init()` | Starts a filter for each `data-filter-target` value that has none. `reinit()` is the same |
| `NDS.Filter.create(element)` | Starts the filter of one surface and returns it. On a started filter, it returns that one |
| `NDS.Filter.getInstance(element)` | The filter of any surface, by element or selector |
| `NDS.Filter.getByTarget(id)` | The filter of an item container `id` |
| `NDS.Filter.whenReady(element, callback)` | Runs `callback` with the filter, now or once it starts |
| `NDS.Filter.refresh(container)` | Runs `refresh()` on each filter whose item container is `container`, is inside it, or holds it. Starts the filters of new surfaces in it first. Skips form-mode filters. `NDS.Init.refresh(container)` calls it for you |
| `setFilterValues(name, values)` | Picks these values in the group, and applies them. An empty array clears the group |
| `setSearchValue(text)` | Sets the search term, and applies it |
| `removeFilterValue(name, value)` | Removes one value, and applies the rest |
| `removeSearchFilter()` | Clears the search term, and applies |
| `resetRangeFilter(name)` | Puts a slider group back to its full range, and applies |
| `populateFilter(name, values, type)` | Builds the group's options from `values`. `type` is `checkbox` by default |
| `getCriteria()` | A copy of the criteria: `{ search, filters: { name: [values] } }` |
| `getVisibleItems()`, `getHiddenItems()` | The matching items, and the others |
| `applyFilters()` | Applies the picked values. In form mode it updates the chips, the badge and the URL, and does not submit |
| `submitForm()` | Submits the form in form mode |
| `clear()` | Clears every value, the search term and the sort, and applies nothing |
| `reset()` | Clears everything and shows every item. In form mode it submits the form again |
| `refresh()` | Reads the items again and rebuilds the groups that have `data-filter-type` and no `data-filter-values`, keeping the current page |
| `reapplyUrlParamsForFilter(name)` | Picks the URL's values in a group whose inputs you added after load |
| `showNoResultsAlert()`, `dismissNoResultsAlert()` | Shows or closes the no-results alert in the item container. Call them from your response handler in form mode. Without an item container they do nothing |
| `destroy()` | Removes the listeners and shows every item |
{: .nds-table .nds-responsive}

In form mode, each setter submits the form. Setters in one script run share one submit, and a `submitForm()` in that run replaces it.

| Event | Fired on | Detail |
|---|---|---|
| `nds:filter:ready` | `.nds-filter`, or the first surface | The filter |
| `nds:filter:change` | the same | `{ filter, criteria, totalItems, visibleItems, hiddenItems }`, after each apply, also when nothing is applied. The last three are numbers, `null` in form mode. The values are in `criteria.filters`, not in `criteria` |
| `nds:filter:reset` | the same | `{ filter, totalItems }` |
| `nds:filter:clear` | the same | `{ filter }`, on `clear()`, `reset()` and the menu's Reset |
| `nds:filterFormSubmit` | the same | `{ criteria, form }`, before a form submits with a page load, after its fields pass. `preventDefault()` stops it |
| `nds:filterFormAjax` | the same | `{ criteria, form, hiddenInputsContainer, rollback }`, before an AJAX request. `preventDefault()` stops the request. Add your own fields to `hiddenInputsContainer` here |
| `nds:filterFormComplete` | the same | `{ success, isJson, data, html, form }`, after an AJAX response. `data` is the JSON, `html` the new container's HTML, `form` the element the event fires on |
| `nds:filterFormError` | the same | `{ error, form }`, after a network error, an error status, a timeout, or a response without the item container. `preventDefault()` stops the error toast |
| `nds:formValid`, `nds:formInvalid` | the same | As in [Forms](../components/forms), for a submission form without `data-ajax` |
{: .nds-table .nds-responsive}

<script type="text/html" id="filter-api-js" data-canon data-lang="js" data-preview="none">
var menu = document.querySelector('.nds-filter[data-filter-target="flt-items"]');
menu.addEventListener('nds:filter:change', function (e) {
  console.log(e.detail.criteria.filters.sector, e.detail.visibleItems);
});
NDS.Filter.whenReady(menu, function (filter) {
  filter.setFilterValues('sector', ['Business']);
});
</script>

The full API is in the banner of `_js/nds-filter.js`.

</div>
  </div>
</section>

<section id="filterRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Admin Console Demo](../examples/console-demo): a filtered card grid and a filtered table, with a slider group and fixed options.
- [Manage Records](../examples/manage-records): a filtered table with checkbox, radio and slider groups.
- [Government Services](../examples/services-list): checkbox and switch groups with suggestions.
- [FAQ Template](../templates/faq-template): a filter over accordion items.
- [Search Template](../templates/search-template): search results with the search term in a query slot, and sort.
- [Toolbar](../components/toolbar): the bar that holds the surfaces.

</div>
  </div>
</section>
