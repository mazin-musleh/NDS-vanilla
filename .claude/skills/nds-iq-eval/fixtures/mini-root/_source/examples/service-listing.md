---
layout: page
title: Service Listing
since: "1.0.0"
updated: "1.7.0"
---

Fixture example source (`.md`). Filterable, paginated card catalog: a `[data-filter-items]` region driven by Filter, paged by Pagination (`data-paged-target`).

```html
<div class="nds-content-section">
    <div class="nds-grid" data-filter-items id="services">
        <div class="nds-card">
            <span class="nds-card-title">Service name</span>
            <p>Service description.</p>
        </div>
    </div>
    <nav class="nds-pagination" data-auto-pagination data-paged-target="services"></nav>
</div>
```
