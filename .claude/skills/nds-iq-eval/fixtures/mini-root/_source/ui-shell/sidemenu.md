---
title: Side Menu
---

# Side Menu

A vertical navigation column beside the main content.

Layout-coupled: it only works inside its page wrapper chain. The standalone
block below shows the component, not the page. Copy the markup from a full
template or example page that already uses it, and read this page to understand
what you copied.

<code class="lang-html code">
&lt;aside class="nds-sidemenu"&gt;
  &lt;nav class="nds-sidemenu-nav" aria-label="Side navigation"&gt;
    &lt;ul class="nds-sidemenu-list"&gt;
      &lt;li class="nds-sidemenu-item" data-state="selected"&gt;&lt;a href="#"&gt;Home&lt;/a&gt;&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/nav&gt;
&lt;/aside&gt;
</code>

## Data Attributes

| Attribute | Description |
|---|---|
| `data-state="selected"` | Marks the item for the current page. One per list. |
