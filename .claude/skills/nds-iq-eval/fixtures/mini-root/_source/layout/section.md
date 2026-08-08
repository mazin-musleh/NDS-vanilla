---
layout: page
title: Section
since: "1.0.0"
updated: "1.7.0"
---

Fixture doc source (`.md`). Chrome-free twin of `_site/layout/section.html`. Section tiers: minimal = title, description, `.nds-section-body` as direct children; standard adds `.nds-section-wrapper` + `.nds-section-head`. Every section lives inside `.nds-content-layout > .nds-main-content`.

```html
<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head"><span class="nds-section-title">Title</span></div>
        <div class="nds-section-body">…</div>
    </div>
</section>
```
