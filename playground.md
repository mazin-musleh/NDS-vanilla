---
layout: home
title: "National Design System for Saudi Arabia"
hero_title: "National Design System for Saudi Arabia"
hero_description: "A comprehensive design system empowering consistent, accessible, and high-performance digital
government experiences across the Kingdom."
#hero_image: assets/img/riyadhcenter.webp
hero_image_pos: 50% 10%
lang: en
direction: ltr
---

<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Playground</h2>
            <p class="nds-section-description">Component testing area</p>
        </div>
        <div class="nds-section-content">

            <div class="nds-table-wrapper nds-paged-content" style="--max-width: 100%; --per-page: 5;">
                <table class="nds-table nds-sortable">
                    <thead>
                        <tr>
                            <th class="nds-sortable-col">
                                <button class="nds-sort-header nds-btn" data-sort-type="number">#<span class="nds-sort-icon">↕</span></button>
                            </th>
                            <th class="nds-sortable-col">
                                <button class="nds-sort-header nds-btn" data-sort-type="string">Service<span class="nds-sort-icon">↕</span></button>
                            </th>
                            <th>Description</th>
                            <th class="nds-sortable-col">
                                <button class="nds-sort-header nds-btn" data-sort-type="string">System<span class="nds-sort-icon">↕</span></button>
                            </th>
                            <th>Most Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for service in site.data.content.services %}
                        <tr class="nds-page-item" hidden>
                            <td>{{ forloop.index }}</td>
                            <td>{{ service.title }}</td>
                            <td>{{ service.description }}</td>
                            <td>{{ service.system }}</td>
                            <td>{% if service.most_used %}Yes{% else %}—{% endif %}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </div>
            <nav class="nds-auto-pagination"></nav>

        </div>
    </div>
</section>
