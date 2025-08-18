---
layout: home
title_key: site.title
hero_title_key: site.hero_title
hero_description_key: site.hero_description
hero_image: /assets/img/riyadhcenter.jpg
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
                    <i class="hgi hgi-stroke hgi-square-lock-01 nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">+49160</span>
                    <span class="nds-statistic-text" data-i18n="stats.students">{% include localize.html key="stats.students" %}</span>
                </div>
                <div class="nds-statistic-card">
                    <i class="hgi hgi-stroke hgi-square-lock-01 nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">+1024</span>
                    <span class="nds-statistic-text" data-i18n="stats.faculty">{% include localize.html key="stats.faculty" %}</span>
                </div>
                <div class="nds-statistic-card">
                    <i class="hgi hgi-stroke hgi-square-lock-01 nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">+18506</span>
                    <span class="nds-statistic-text" data-i18n="stats.graduates">{% include localize.html key="stats.graduates" %}</span>
                </div>
                <div class="nds-statistic-card">
                    <i class="hgi hgi-stroke hgi-square-lock-01 nds-statistic-icon"></i>
                    <span class="nds-statistic-number nds-number-format nds-counter-value">15</span>
                    <span class="nds-statistic-text" data-i18n="stats.branches">{% include localize.html key="stats.branches" %}</span>
                </div>
            </div>
        </div>
    </div>
</section>