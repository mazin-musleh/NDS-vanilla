---
layout: page
title: Content Page
since: "1.0.0"
updated: "1.7.0"
---

Fixture template source (`.md`). Chrome-free twin of `_site/templates/content.html`. The side-menu wrapper chain below is the layout-coupled copy source.

```html
<div class="nds-content-layout nds-with-sidemenu">
    <aside class="nds-sidemenu">
        <nav class="nds-sidemenu-nav" aria-label="Side navigation">
            <ul class="nds-sidemenu-list">
                <li class="nds-sidemenu-item" data-state="selected"><a href="#">Home</a></li>
                <li class="nds-sidemenu-item"><a href="#">Services</a></li>
            </ul>
        </nav>
    </aside>
    <div class="nds-main-content">
        <section class="nds-content-section">
            <div class="nds-section-wrapper">
                <div class="nds-section-head"><span class="nds-section-title">Content Page</span></div>
                <div class="nds-section-body"><p>Sample template body text.</p></div>
            </div>
        </section>
    </div>
</div>
```
