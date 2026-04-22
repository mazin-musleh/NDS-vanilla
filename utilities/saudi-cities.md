---
layout: page
title: Saudi Cities
hero_title: Saudi Cities Dataset - National Design System
hero_description: Bundled JSON dataset of 132 Saudi Arabian cities across all 13 administrative regions, with bilingual (English + Arabic) names. Drop into autocomplete inputs, region selectors, or any address flow.
breadcrumb: [["Utilities", "/utilities?category=Utilities"]]
lang: en
direction: ltr
---

<!-- Overview -->
<section id="saudiCitiesOverview" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
      <p class="nds-section-description">A static JSON file at <code class="nds-inline-code lang-html">/assets/data/saudi-cities.json</code> that any page can fetch. Designed as a drop-in source for the autocomplete component, but plain enough to feed into selects, maps, filters, or any other lookup UI.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1;">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database"></i>
            <span class="nds-label">132 cities</span>
          </span>
          <p class="nds-item-desc">Major cities and regional towns. Capital cities of each region, governorate seats, and well-known towns are included; very small villages are not.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-globe-02"></i>
            <span class="nds-label">13 regions</span>
          </span>
          <p class="nds-item-desc">Covers all administrative regions of the Kingdom: Riyadh, Makkah, Madinah, Eastern Province, Asir, Tabuk, Hail, Northern Borders, Jazan, Najran, Al Bahah, Al Jouf, Al Qassim.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Bilingual</span>
          </span>
          <p class="nds-item-desc">Each entry carries both English (<code class="nds-inline-code lang-html">Name</code>) and Arabic (<code class="nds-inline-code lang-html">NameAr</code>) names. Switch which language drives display by changing <code class="nds-inline-code lang-html">data-name</code> on the consuming component.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-package"></i>
            <span class="nds-label">No build step</span>
          </span>
          <p class="nds-item-desc">Static JSON served alongside the rest of the assets. Works with any consumer that can <code class="nds-inline-code lang-html">fetch()</code> a URL — no Jekyll dependency, no rebuild required.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Schema -->
<section id="saudiCitiesSchema" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Schema</h2>
      <p class="nds-section-description">Each entry in the array follows this shape</p>
    </div>
    <div class="nds-section-body">
      <table class="nds-table nds-responsive">
        <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code class="nds-inline-code lang-html">Id</code></td><td>integer</td><td>Stable numeric identifier. Use as a row key when caching or submitting.</td></tr>
          <tr><td><code class="nds-inline-code lang-html">Region</code></td><td>string</td><td>Administrative region the city belongs to, in English.</td></tr>
          <tr><td><code class="nds-inline-code lang-html">RegionAr</code></td><td>string</td><td>Administrative region the city belongs to, in Arabic.</td></tr>
          <tr><td><code class="nds-inline-code lang-html">Name</code></td><td>string</td><td>City name in English (Latin transliteration).</td></tr>
          <tr><td><code class="nds-inline-code lang-html">NameAr</code></td><td>string</td><td>City name in Arabic.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Autocomplete Demo -->
<section id="saudiCitiesAutocomplete" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">With Autocomplete</h2>
      <p class="nds-section-description">Point an <a href="{{ '/components/autocomplete' | relative_url }}" class="nds-color">autocomplete input</a> at the JSON, set <code class="nds-inline-code lang-html">data-fetch="once"</code>, and you get an instant city picker that loads the dataset on first keystroke and filters it client-side</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Live demo — type a city name</div>
          </div>
          <div class="demo-container">
            <div class="state-demo" style="max-width: 480px;">
              <div class="nds-form-container"
                data-url="{{ '/assets/data/saudi-cities.json' | relative_url }}"
                data-name="Name" data-fetch="once" data-min-chars="1">
                <div class="nds-form-header">
                  <label for="demo-saudiCity"><span class="nds-label">City</span></label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                  <input type="text" id="demo-saudiCity" autocomplete="on" placeholder="Type to search Saudi cities">
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
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-saudi-cities-1" id="tab-saudi-cities-1">
                    <span class="nds-tab-label">HTML</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-saudi-cities-1"
                  aria-labelledby="tab-saudi-cities-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-html code">
&lt;div class="nds-form-container"
  data-url="/assets/data/saudi-cities.json"
  data-name="Name" data-fetch="once" data-min-chars="1"&gt;
  &lt;div class="nds-form-header"&gt;
    &lt;label for="city"&gt;&lt;span class="nds-label"&gt;City&lt;/span&gt;&lt;/label&gt;
  &lt;/div&gt;
  &lt;div class="nds-form-control"&gt;
    &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;input type="text" id="city" autocomplete="on"
      placeholder="Type to search Saudi cities"&gt;
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

<!-- Bilingual + Custom Render Demo -->
<section id="saudiCitiesBilingual" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Bilingual Search &amp; Custom Display</h2>
      <p class="nds-section-description">Pass <code class="nds-inline-code lang-html">filter</code> and <code class="nds-inline-code lang-html">renderItem</code> callbacks to <code class="nds-inline-code lang-html">NDS.Autocomplete.create()</code> to match across both languages and show a richer label. The selected value still comes from <code class="nds-inline-code lang-html">data-name</code>.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Live demo — type "Riy" or "الر"</div>
          </div>
          <div class="demo-container">
            <div class="state-demo" style="max-width: 480px;">
              <div class="nds-form-container" id="demo-saudiCityBilingual"
                data-url="{{ '/assets/data/saudi-cities.json' | relative_url }}"
                data-name="Name" data-fetch="once" data-min-chars="1">
                <div class="nds-form-header">
                  <label for="demo-saudiCityBilingualInput"><span class="nds-label">City</span></label>
                </div>
                <div class="nds-form-control">
                  <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                  <input type="text" id="demo-saudiCityBilingualInput" autocomplete="on" placeholder="ابحث / Type a city">
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
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-saudi-cities-bi-1" id="tab-saudi-cities-bi-1">
                    <span class="nds-tab-label">JS</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-saudi-cities-bi-1"
                  aria-labelledby="tab-saudi-cities-bi-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-js code">
const el = document.getElementById('city-container');
const escape = (s) =&gt; String(s).replace(/[&amp;&lt;&gt;"']/g, c =&gt;
  ({'&amp;':'&amp;amp;','&lt;':'&amp;lt;','&gt;':'&amp;gt;','"':'&amp;quot;',"'":'&amp;#39;'}[c]));

NDS.Autocomplete.create(el, {
  filter: (items, q) =&gt; {
    const lc = q.toLowerCase();
    return items.filter(c =&gt;
      c.Name.toLowerCase().includes(lc) ||
      c.NameAr.includes(q)
    );
  },
  renderItem: (item) =&gt;
    `&lt;strong&gt;${escape(item.Name)}&lt;/strong&gt;
     &lt;span style="color: var(--text-secondary)"&gt;
       · ${escape(item.NameAr)} · ${escape(item.Region)}
     &lt;/span&gt;`
});
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

<!-- Programmatic Access -->
<section id="saudiCitiesFetch" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Direct Access</h2>
      <p class="nds-section-description">For non-autocomplete use — populate a select, build a region tree, draw a map, etc.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Fetch + group by region</div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided" hidden>
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                    aria-controls="panel-saudi-cities-fetch-1" id="tab-saudi-cities-fetch-1">
                    <span class="nds-tab-label">JS</span>
                  </button>
                </nav>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-saudi-cities-fetch-1"
                  aria-labelledby="tab-saudi-cities-fetch-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <div class="nds-expandable-content">
                    <code class="lang-js code">
const cities = await fetch('/assets/data/saudi-cities.json').then(r =&gt; r.json());

// Group by region
const byRegion = cities.reduce((map, city) =&gt; {
  (map[city.Region] = map[city.Region] || []).push(city);
  return map;
}, {});

// e.g. byRegion["Eastern Province"] → [Dammam, Al Khobar, Dhahran, ...]
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

<!-- Notes -->
<section id="saudiCitiesNotes" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Notes</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-block">
        <ul>
          <li>The dataset is editorial — it favors administrative seats and well-known towns over an exhaustive census of every village. Expect to extend it for use cases that need full coverage.</li>
          <li>Latin transliterations follow common English-language conventions, not a strict standard. Searches may need to handle alternate spellings (e.g., <em>Mecca</em> vs <em>Makkah</em>) — wire that into your <code class="nds-inline-code lang-html">filter</code> callback rather than duplicating entries.</li>
          <li>Total response size is well under the autocomplete component's 1 MB cap. Safe to load with <code class="nds-inline-code lang-html">data-fetch="once"</code> on any device.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<script>
  // Wire up the bilingual demo programmatically.
  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('demo-saudiCityBilingual');
    if (!el || !window.NDS || !NDS.Autocomplete) return;
    const escape = (s) => String(s).replace(/[&<>"']/g, c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    NDS.Autocomplete.create(el, {
      filter: (items, q) => {
        const lc = q.toLowerCase();
        return items.filter(c =>
          c.Name.toLowerCase().includes(lc) ||
          c.NameAr.includes(q)
        );
      },
      renderItem: (item) =>
        `<strong>${escape(item.Name)}</strong>` +
        ` <span style="color: var(--text-secondary)">` +
        `· ${escape(item.NameAr)} · ${escape(item.Region)}</span>`
    });
  });
</script>
