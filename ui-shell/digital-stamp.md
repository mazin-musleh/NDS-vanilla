---
layout: page
title: Digital Stamp
hero_title: Digital Stamp - National Design System
hero_description: The DGA digital stamp in the top bar. Its tab opens an expander that shows how to check the site and its DGA registration number.
breadcrumb: [["UI Shell", "/components/?shelf=UI%20Shell"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "01/11/2026 - 08:07 PM"
---

<section id="digital-stamp-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The digital stamp tells people that the site is a government website registered with the Digital Government Authority (DGA). Its tab sits first in the [Top Bar](../ui-shell/topbar). The tab opens the stamp below the bar: two cards, one on the site's address and one on HTTPS, and the site's DGA registration number.

The stamp is a top bar expander: the top bar opens and closes it. This page covers its content and its text.

The stamp is a page shell part. The preview shows it open, in a frame of its own, so it does not clash with this page's own stamp. The tab's markup is in the [Top Bar](../ui-shell/topbar) canon.

</div>
  </div>
</section>

<section id="digital-stamp-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="digital-stamp-canon" data-canon data-preview="page" data-preview-height="fit" data-preview-style="#nds-digital-stamp[hidden] { display: grid !important; grid-template-rows: 1fr; }" data-variants="digital-stamp-variants-table">
<div id="nds-digital-stamp" class="nds-topbar-expander" role="region" aria-label="Digital government stamp" data-i18n-aria-label="digital-stamp.label" hidden>
  <div class="nds-content-wrapper">
    <div class="nds-topbar-expander-content">
      <div class="nds-digital-stamp-notices">
        <div class="nds-digital-stamp-card">
          <div class="nds-digital-stamp-icon">
            <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
          </div>
          <div class="nds-digital-stamp-content">
            <div class="nds-digital-stamp-heading"><span data-i18n="digital-stamp.gov_title">Official Saudi Government websites URL ends with</span> <span class="nds-digital-stamp-highlight" data-i18n="digital-stamp.gov_mark">.gov.sa</span></div>
            <div class="nds-digital-stamp-description" data-i18n="digital-stamp.gov_desc">Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .</div>
          </div>
        </div>
        <div class="nds-digital-stamp-card">
          <div class="nds-digital-stamp-icon">
            <i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"></i>
          </div>
          <div class="nds-digital-stamp-content">
            <div class="nds-digital-stamp-heading"><span data-i18n="digital-stamp.https_title">Official Reliable websites use</span> <span class="nds-digital-stamp-highlight">HTTPS</span></div>
            <div class="nds-digital-stamp-description" data-i18n="digital-stamp.https_desc">Ensure the website is using the HTTPS protocol.</div>
          </div>
        </div>
      </div>
      <div class="nds-digital-stamp-register">
        <img src="../assets/img/dga-logo-icon.svg" width="21" height="31" alt="Digital Government Authority" data-i18n-alt="digital-stamp.dga" loading="lazy">
        <div>
          <span class="nds-digital-stamp-register-text" data-i18n="digital-stamp.register">Registered on Digital Government Authority:</span>
          <a class="nds-digital-stamp-registration nds-primary nds-underline" href="#" target="_blank">00000000000</a>
        </div>
      </div>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="digital-stamp-parts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `button.nds-digital-stamp-tab` | The tab, first in `.nds-topbar`: the flag, the long text (`.nds-digital-stamp-lg-text`), the short text (`.nds-digital-stamp-sm-text`) and `#nds-digital-stamp-verify-text`. It is a [top bar toggle](../ui-shell/topbar#topbar-expanders): `aria-controls` names the stamp | Yes |
| `#nds-digital-stamp` | The stamp, a `.nds-topbar-expander` right after the bar. It ships `hidden` | Yes |
| `.nds-topbar-expander-content` | Inside the stamp's `.nds-content-wrapper`: the notices and the register, with the stamp's space above and below them | Yes |
| `.nds-digital-stamp-notices` | Two `.nds-digital-stamp-card` cards: the site's address, then HTTPS | Yes |
| `.nds-digital-stamp-card` | `.nds-digital-stamp-icon`, then `.nds-digital-stamp-content` with a `.nds-digital-stamp-heading` and a `.nds-digital-stamp-description`. The heading holds two spans: the words, then the domain or `HTTPS` in `.nds-digital-stamp-highlight` | Yes |
| `.nds-digital-stamp-register` | The DGA logo, `.nds-digital-stamp-register-text` and the registration number, a link `a.nds-digital-stamp-registration`. Its number and `href="#"` are samples: write your DGA registration number and link | Yes |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="digital-stamp-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Domain picks the address card's words. The default writes nothing: the script reads the site's own address.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Domain | From the address (default) (hint: The site's own domain) | — | — | The stamp reads the site's address: `iu.edu.sa` shows the `.edu.sa` card. An address outside `.sa`, such as a test server, shows `.gov.sa` |
| Domain | Government (hint: .gov.sa) | `[data-digital-stamp-domain="gov.sa"]` | `#nds-digital-stamp` | A government body |
| Domain | Education (hint: .edu.sa) | `[data-digital-stamp-domain="edu.sa"]` | `#nds-digital-stamp` | A university or another educational site |
| Domain | School (hint: .sch.sa) | `[data-digital-stamp-domain="sch.sa"]` | `#nds-digital-stamp` | A school |
| Domain | Medical (hint: .med.sa) | `[data-digital-stamp-domain="med.sa"]` | `#nds-digital-stamp` | A hospital or another medical site |
| Domain | Non-profit (hint: .org.sa) | `[data-digital-stamp-domain="org.sa"]` | `#nds-digital-stamp` | A non-profit organization |
| Domain | Activities and initiatives (hint: .sa) | `[data-digital-stamp-domain="sa"]` | `#nds-digital-stamp` | An activity or an initiative on a `.sa` address |
{: #digital-stamp-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="digital-stamp-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Stamp Text
{: .nds-block-title #stamp-text}

The stamp's text is DGA's, and each word carries a `data-i18n` marker: NDS writes it in the page language from the `digital-stamp` section of the [string pack](../core/i18n). That covers the tab's texts, the two cards, `.nds-digital-stamp-register-text`, the flag's and the logo's `alt` and the stamp's `aria-label`.

### Address Card
{: .nds-block-title #stamp-domain}

The canon's address card holds the `.gov.sa` text. The stamp follows the site's own domain: on `iu.edu.sa` it points the card's markers at the `.edu.sa` text. An address outside `.sa`, such as `localhost`, keeps `.gov.sa`. `data-digital-stamp-domain` on `#nds-digital-stamp` picks the card instead.

</div>
  </div>
</section>

<section id="digital-stamp-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-shield-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Short Stamp Text</span>
              <p class="nds-card-description">The tab shows its long text at 960px and up, and its short text below that.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-translate" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">DGA Text</span>
              <p class="nds-card-description">The stamp ships DGA's text in Arabic and English, with an address card for each <code class="nds-inline-code lang-html">.sa</code> domain.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="digital-stamp-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Include the stamp on every government website. DGA requires it.
- Keep the stamp's `data-i18n` markers. A word whose marker you remove stays as you wrote it.
- On a test server, write `data-digital-stamp-domain` with the site's own domain, so the address card matches the live site.
- Remove the stamp on a site that DGA has not registered.

</div>
  </div>
</section>

<section id="digital-stamp-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-digital-stamp-domain` | `#nds-digital-stamp` | `gov.sa`, `edu.sa`, `sch.sa`, `med.sa`, `org.sa` or `sa`: the address card's text. Any other value warns in the console and shows `gov.sa`. See [Address Card](#stamp-domain) |
| `data-i18n` | Each word in the tab and the stamp | The word's key in the `digital-stamp` section of the [string pack](../core/i18n). The address card's keys start with `gov_`: the script changes them to the domain's |
{: .nds-table .nds-responsive}

The attributes that open and close the stamp are on [Top Bar](../ui-shell/topbar#topbar-api).

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.DigitalStamp.init()` | Points the address card at the site's domain. The loader runs it when `#nds-digital-stamp` is on the page |
{: .nds-table .nds-responsive}

Open and close the stamp with [`NDS.Topbar`](../ui-shell/topbar#topbar-api). The top bar fires `nds:topbar:opened` and `nds:topbar:closed` on `#nds-digital-stamp`, with the stamp in `detail.expander`.

<script type="text/html" id="digital-stamp-js" data-canon data-lang="js" data-preview="none">
NDS.Topbar.open('nds-digital-stamp');
</script>

The full API is in the banner of `_js/nds-digital-stamp.js`.

</div>
  </div>
</section>

<section id="digital-stamp-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Top Bar](../ui-shell/topbar): holds the tab, and opens and closes the stamp.
- [Internationalization](../core/i18n): the `digital-stamp` words in Arabic and English.

</div>
  </div>
</section>
