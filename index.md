---
layout: home
title_key: site.title
hero_title_key: site.hero_title
hero_description_key: site.hero_description
hero_image_pos: 50% 10%
# Remove hardcoded lang - will be set dynamically
---

<!-- Single content file with translation keys -->
<section id="whoWeAre" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 id="whoWeAreHeading" class="nds-section-title" data-i18n="sections.who_we_are">{% include localize.html key="sections.who_we_are" %}</h2>
            <p class="nds-section-description" data-i18n="sections.who_we_are_desc">{% include localize.html key="sections.who_we_are_desc" %}</p>
            <button type="button" class="nds-btn nds-btn-primary nds-btn-readMore" aria-label="Read More">
                <span class="label" data-i18n="buttons.read_more">{% include localize.html key="buttons.read_more" %}</span>
                <i class="hgi hgi-stroke hgi-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
        <div class="nds-section-content">
            <div class="nds-statistics">
                <div class="nds-statistic-card">
                    <i class="hgi hgi-stroke hgi-component nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">45</span>
                    <span class="nds-statistic-text" data-i18n="stats.components">{% include localize.html key="stats.components" %}</span>
                </div>
                <div class="nds-statistic-card">
                    <i class="hgi hgi-stroke hgi-color-picker nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">120</span>
                    <span class="nds-statistic-text" data-i18n="stats.design_tokens">{% include localize.html key="stats.design_tokens" %}</span>
                </div>
                <div class="nds-statistic-card">
                    <i class="hgi hgi-stroke hgi-book-03 nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">25</span>
                    <span class="nds-statistic-text" data-i18n="stats.guidelines">{% include localize.html key="stats.guidelines" %}</span>
                </div>
                <div class="nds-statistic-card">
                    <i class="hgi hgi-stroke hgi-government nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">50+</span>
                    <span class="nds-statistic-text" data-i18n="stats.agencies">{% include localize.html key="stats.agencies" %}</span>
                </div>
            </div>
        </div>
    </div>
</section>