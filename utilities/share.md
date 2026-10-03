---
layout: page
title: Share
hero_title: Share - National Design System
hero_description: A set of buttons that share a page link to X, LinkedIn, WhatsApp and other sites, or copy it to the clipboard
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "03/10/2026 - 11:35 PM"
---

<section id="shareOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Share is a `.nds-share` wrapper of share buttons, in a [Dropmenu](../components/dropmenu) or in a row. Four buttons are built in: X, LinkedIn, WhatsApp and Copy Link. The script finds each one by its class. `data-share-href` adds any other target, such as Facebook or email. By default, every button shares the current page.

Pick another component when:

- the user copies a value that is not a link, such as a reference number: [Copy](../utilities/copy)
- the menu holds other actions, such as Print or Download: [Dropmenu](../components/dropmenu)

</div>
  </div>
</section>

<section id="shareMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="share-menu" data-canon data-variants="shareVariantsTable">
<div class="nds-share nds-dropmenu">
  <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page">
    <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
    <span class="nds-label">Share Page</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X">
      <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
      <span class="nds-label">X</span>
    </button>
    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
      <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
      <span class="nds-label">LinkedIn</span>
    </button>
    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
      <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
      <span class="nds-label">WhatsApp</span>
    </button>
    <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link" data-copy-label="Link Copied!" data-copy-announce="Page link copied to clipboard" data-no-auto-close>
      <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
      <span class="nds-label">Copy Link</span>
    </button>
  </div>
</div>
</script>

<script type="text/html" id="share-inline" data-canon>
<div class="nds-share">
  <button class="nds-btn nds-secondary-outline nds-share-x" type="button" aria-label="Share on X">
    <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
    <span class="nds-label">X</span>
  </button>
  <button class="nds-btn nds-secondary-outline nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
    <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
    <span class="nds-label">LinkedIn</span>
  </button>
  <button class="nds-btn nds-secondary-outline nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
    <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
    <span class="nds-label">WhatsApp</span>
  </button>
  <button class="nds-btn nds-secondary-outline nds-share-copy" type="button" aria-label="Copy Link" data-copy-label="Link Copied!" data-copy-announce="Page link copied to clipboard">
    <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
    <span class="nds-label">Copy Link</span>
  </button>
</div>
</script>

<script type="text/html" id="share-inline-icons" data-canon>
<div class="nds-share">
  <button class="nds-btn nds-secondary-outline nds-icon-only nds-share-x nds-tooltip" type="button" aria-label="Share on X" title="Share on X" data-tooltip-hover="500">
    <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
    <span class="nds-label">X</span>
  </button>
  <button class="nds-btn nds-secondary-outline nds-icon-only nds-share-linkedin nds-tooltip" type="button" aria-label="Share on LinkedIn" title="Share on LinkedIn" data-tooltip-hover="500">
    <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
    <span class="nds-label">LinkedIn</span>
  </button>
  <button class="nds-btn nds-secondary-outline nds-icon-only nds-share-whatsapp nds-tooltip" type="button" aria-label="Share on WhatsApp" title="Share on WhatsApp" data-tooltip-hover="500">
    <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
    <span class="nds-label">WhatsApp</span>
  </button>
  <button class="nds-btn nds-secondary-outline nds-icon-only nds-share-copy nds-tooltip" type="button" aria-label="Copy Link" title="Copy Link" data-tooltip-hover="500" data-copy-announce="Page link copied to clipboard">
    <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
    <span class="nds-label">Copy Link</span>
  </button>
</div>
</script>

<script type="text/html" id="share-facebook-item" data-canon>
<button class="nds-btn nds-subtle nds-dropmenu-item" type="button" aria-label="Share on Facebook" data-share-href="https://www.facebook.com/sharer/sharer.php?u={url}">
  <i class="nds-icon nds-hgi-facebook-02" aria-hidden="true"></i>
  <span class="nds-label">Facebook</span>
</button>
</script>

<script type="text/html" id="share-facebook-button" data-canon>
<button class="nds-btn nds-secondary-outline" type="button" aria-label="Share on Facebook" data-share-href="https://www.facebook.com/sharer/sharer.php?u={url}">
  <i class="nds-icon nds-hgi-facebook-02" aria-hidden="true"></i>
  <span class="nds-label">Facebook</span>
</button>
</script>

<script type="text/html" id="share-facebook-icon" data-canon>
<button class="nds-btn nds-secondary-outline nds-icon-only nds-tooltip" type="button" aria-label="Share on Facebook" title="Share on Facebook" data-tooltip-hover="500" data-share-href="https://www.facebook.com/sharer/sharer.php?u={url}">
  <i class="nds-icon nds-hgi-facebook-02" aria-hidden="true"></i>
  <span class="nds-label">Facebook</span>
</button>
</script>

<script type="text/html" id="share-telegram-item" data-canon>
<button class="nds-btn nds-subtle nds-dropmenu-item" type="button" aria-label="Share on Telegram" data-share-href="https://t.me/share/url?url={url}&text={title}">
  <i class="hgi hgi-stroke hgi-telegram" aria-hidden="true"></i>
  <span class="nds-label">Telegram</span>
</button>
</script>

<script type="text/html" id="share-telegram-button" data-canon>
<button class="nds-btn nds-secondary-outline" type="button" aria-label="Share on Telegram" data-share-href="https://t.me/share/url?url={url}&text={title}">
  <i class="hgi hgi-stroke hgi-telegram" aria-hidden="true"></i>
  <span class="nds-label">Telegram</span>
</button>
</script>

<script type="text/html" id="share-telegram-icon" data-canon>
<button class="nds-btn nds-secondary-outline nds-icon-only nds-tooltip" type="button" aria-label="Share on Telegram" title="Share on Telegram" data-tooltip-hover="500" data-share-href="https://t.me/share/url?url={url}&text={title}">
  <i class="hgi hgi-stroke hgi-telegram" aria-hidden="true"></i>
  <span class="nds-label">Telegram</span>
</button>
</script>

<script type="text/html" id="share-email-item" data-canon>
<button class="nds-btn nds-subtle nds-dropmenu-item" type="button" aria-label="Share by email" data-share-href="mailto:?subject={title}&body={url}">
  <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
  <span class="nds-label">Email</span>
</button>
</script>

<script type="text/html" id="share-email-button" data-canon>
<button class="nds-btn nds-secondary-outline" type="button" aria-label="Share by email" data-share-href="mailto:?subject={title}&body={url}">
  <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
  <span class="nds-label">Email</span>
</button>
</script>

<script type="text/html" id="share-email-icon" data-canon>
<button class="nds-btn nds-secondary-outline nds-icon-only nds-tooltip" type="button" aria-label="Share by email" title="Share by email" data-tooltip-hover="500" data-share-href="mailto:?subject={title}&body={url}">
  <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
  <span class="nds-label">Email</span>
</button>
</script>

    </div>
  </div>
</section>

<section id="shareVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Custom Link is two rows of one choice: write both attributes on `.nds-share`. Icon Only Trigger is four rows of one choice on the menu's trigger button, so it is off on the Inline structures. Each Custom Target is three rows of one choice, one per structure: a menu item at the end of the menu, or a button after Copy Link in the Inline row or in Inline Icons.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Menu (default) | — | — | A button that opens a menu of the share buttons. Use it where space is short, such as a hero or a toolbar |
| Structure | Inline | canon `#share-inline` | — | The share buttons in a row, visible at all times. Use it at the end of an article |
| Structure | Inline Icons | canon `#share-inline-icons` | — | The row with icons only, for a card or a narrow space. Each button keeps its `aria-label`, and its `title` shows as a tooltip on hover |
| Custom Link | Custom Link (hint: Share another page, not the current one) | `[data-share-url="https://www.example.gov.sa/news/eid-service-hours"]` | `.nds-share` | Shares the link and title of another page, such as a news card or a search result |
| Custom Link | Custom Link (hint: Share another page, not the current one) | `[data-share-title="Service Hours During Eid"]` | `.nds-share` | The title that X and WhatsApp send with the link |
| Icon Only Trigger | Icon Only Trigger (hint: Hide the trigger's label) | `.nds-icon-only` | `.nds-dropmenu-trigger` | The trigger shows the share icon only, with a tooltip on hover. Its `aria-label` names what is shared |
| Icon Only Trigger | Icon Only Trigger (hint: Hide the trigger's label) | `.nds-tooltip` | `.nds-dropmenu-trigger` | The tooltip that names the hidden label |
| Icon Only Trigger | Icon Only Trigger (hint: Hide the trigger's label) | `[data-tooltip-hover="500"]` | `.nds-dropmenu-trigger` | Opens the tooltip on hover, so a click still opens the menu |
| Icon Only Trigger | Icon Only Trigger (hint: Hide the trigger's label) | `[title="Share Page"]` | `.nds-dropmenu-trigger` | The tooltip text: the same words as the `aria-label` |
| Custom Target (any) | Facebook (hint: Share on Facebook) | canon `#share-facebook-item` | `.nds-dropmenu-menu` | A target added with `data-share-href`, as a menu item |
| Custom Target (any) | Facebook (hint: Share on Facebook) | canon `#share-facebook-button` | `.nds-share-copy:not(.nds-dropmenu-item):not(.nds-icon-only)` (after) | The same target as a button in the Inline row |
| Custom Target (any) | Facebook (hint: Share on Facebook) | canon `#share-facebook-icon` | `.nds-share-copy.nds-icon-only` (after) | The same target as an icon-only button in Inline Icons |
| Custom Target (any) | Telegram (hint: Share on Telegram) | canon `#share-telegram-item` | `.nds-dropmenu-menu` | A target added with `data-share-href`, as a menu item |
| Custom Target (any) | Telegram (hint: Share on Telegram) | canon `#share-telegram-button` | `.nds-share-copy:not(.nds-dropmenu-item):not(.nds-icon-only)` (after) | The same target as a button in the Inline row |
| Custom Target (any) | Telegram (hint: Share on Telegram) | canon `#share-telegram-icon` | `.nds-share-copy.nds-icon-only` (after) | The same target as an icon-only button in Inline Icons |
| Custom Target (any) | Email (hint: Open the mail app with the link) | canon `#share-email-item` | `.nds-dropmenu-menu` | A target added with `data-share-href`, as a menu item |
| Custom Target (any) | Email (hint: Open the mail app with the link) | canon `#share-email-button` | `.nds-share-copy:not(.nds-dropmenu-item):not(.nds-icon-only)` (after) | The same target as a button in the Inline row |
| Custom Target (any) | Email (hint: Open the mail app with the link) | canon `#share-email-icon` | `.nds-share-copy.nds-icon-only` (after) | The same target as an icon-only button in Inline Icons |
{: #shareVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="shareBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Copy Link in a Menu
{: #shareCopyInMenu}

`data-no-auto-close` on the Copy Link item keeps the menu open after the click. The item shows the checkmark for 2 seconds, then the script closes the menu. In the Inline structures, nothing closes, so the attribute is not needed.

### Custom Link
{: #shareCustomLink}

`data-share-url` and `data-share-title` on `.nds-share` replace the page link and the page title. A relative link, such as `/news/12`, becomes a full link on the current site. A link whose scheme is not `http`, `https`, `mailto` or `tel` is ignored, and the buttons share the current page.

### Custom Target
{: #shareCustomTarget}

`data-share-href` on a button in `.nds-share` adds a target that the built-in buttons do not cover. It holds the target's share link. The script replaces `{url}` and `{title}` with the encoded link and title, then opens the link in a 600×400 window. A `mailto:` or `tel:` link opens the mail or phone app instead. The Custom Target options in the builder show the links for Facebook, Telegram and email.
</div>
  </div>
</section>

<section id="shareFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Automatic Start</span>
          </span>
          <p class="nds-item-desc">One click listener on the page serves every share button, including the buttons you add later. You write no script.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-share-04"></i>
            <span class="nds-label">Social Targets</span>
          </span>
          <p class="nds-item-desc">X, LinkedIn and WhatsApp open their share page in a 600×400 window. X and WhatsApp send the title with the link. LinkedIn sends the link only.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-link-04"></i>
            <span class="nds-label">Copy Link Feedback</span>
          </span>
          <p class="nds-item-desc">Copy Link uses the <a href="../utilities/copy">Copy</a> script: a checkmark for 2 seconds, the label swap and a screen reader announcement.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-copy-01"></i>
            <span class="nds-label">Multiple Instances</span>
          </span>
          <p class="nds-item-desc">A page can hold any number of <code class="nds-inline-code lang-html">.nds-share</code> wrappers. Each reads its own <code class="nds-inline-code lang-html">data-share-url</code> and <code class="nds-inline-code lang-html">data-share-title</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-menu-01"></i>
            <span class="nds-label">Portal-Safe Menu</span>
          </span>
          <p class="nds-item-desc">The script adds <code class="nds-inline-code lang-html">.nds-share-menu</code> to each share menu. The menu keeps its style when Dropmenu moves it to <code class="nds-inline-code lang-html">&lt;body&gt;</code>, and the buttons in it still share the wrapper's link.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="sharePractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use the default, with no attributes, to share the current page, such as in the hero. It reads the link and title of each page, so no page needs its own setting.
- Use Custom Link to share one item on a page: a news card, a search result, a file.
- In a list, put one share in each row. Do not put a page share next to a row share.
- Give the trigger an `aria-label` that names what is shared: "Share Page", "Share Article", "Share Report".
- Give every icon-only button a [Tooltip](../components/tooltip): `nds-tooltip`, `data-tooltip-hover="500"` and a `title` with the same words as the `aria-label`. The label is hidden, so the tooltip shows a sighted user what the icon does.
- Keep `data-no-auto-close` on the Copy Link item in a menu. Without it, the menu closes before the user sees the checkmark.
- Keep `data-copy-label` and `data-copy-announce` on the Copy Link item. The label confirms the copy to a sighted user, and the announcement to a screen reader user.
- Keep the `nds-share-*` class on each built-in button. The script finds each one by its class. Leave out a button you do not need.
- Give a custom target an icon, a label and an `aria-label`, like the built-in buttons.
- The Inline buttons take any [Button](../components/button) style, such as `nds-subtle`. Use one style for all of them.

</div>
  </div>
</section>

<section id="shareApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-share` | the wrapper | Holds the buttons in a row with a small gap. Add `.nds-dropmenu` for the Menu structure |
| `.nds-share-x` | a button in `.nds-share` | Opens the X share page with the title and the link |
| `.nds-share-linkedin` | a button in `.nds-share` | Opens the LinkedIn share page with the link |
| `.nds-share-whatsapp` | a button in `.nds-share` | Opens WhatsApp with the title and the link in one message |
| `.nds-share-copy` | a button in `.nds-share` | Copies the link and shows the checkmark |
| `.nds-share-menu` | the `.nds-dropmenu-menu` in `.nds-share` | The script adds it at `init()`. Labels in the menu stay on one line |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-share-url` | `.nds-share` | The link to share. Default: the current page. A relative link becomes a full link. A scheme other than `http`, `https`, `mailto` or `tel` falls back to the current page |
| `data-share-title` | `.nds-share` | The title that X and WhatsApp send, and that fills `{title}`. Default: `document.title` |
| `data-share-href` | a button in `.nds-share` | The share link of a custom target. The script replaces `{url}` and `{title}` with the encoded values. A scheme other than `http`, `https`, `mailto` or `tel` does nothing. An `nds-share-*` class on the same button wins |
| `data-copy-label` | `.nds-share-copy` | The label text while the checkmark shows. Read by [Copy](../utilities/copy) |
| `data-copy-announce` | `.nds-share-copy` | The text the live region announces after the copy. Default: `data-copy-label`, then "Copied" («تم النسخ» on an Arabic page). Read by Copy |
| `data-no-auto-close` | `.nds-share-copy` in a menu | Read by Dropmenu: a click on the item leaves the menu open. Share closes the menu when the checkmark ends |
| `data-status="success"` | `.nds-share-copy` | Copy sets it after a copy, and removes it after 2 seconds. While it is set, the button shows the success color |
| `aria-disabled="true"` | `.nds-share-copy` | Copy sets and removes it with `data-status` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Share.init()` | Adds `.nds-share-menu` to every share menu and listens for clicks on the share buttons. The loader calls it. A second call replaces the listener |
{: .nds-table .nds-responsive}

Share fires no events. After you add a share menu to the page, call `init()` again, so the new menu gets `.nds-share-menu`. New buttons need no call.

<script type="text/html" id="share-api-js" data-canon data-lang="js">
var card = document.querySelector('#news-card-12');
card.insertAdjacentHTML('beforeend', shareMenuHtml);
NDS.Share.init();
</script>

The full API is in the banner of `_js/nds-share.js`.

</div>
  </div>
</section>

<section id="shareRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Hero](../ui-shell/hero): the sub hero's Share Page menu, which uses the Menu structure.
- [Copy](../utilities/copy): the checkmark, label swap and announcement of Copy Link.
- [Dropmenu](../components/dropmenu): opens and closes the Menu structure, and moves the menu to `<body>` with `data-portal`.

</div>
  </div>
</section>
