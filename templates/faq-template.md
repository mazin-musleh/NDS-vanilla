---
layout: page
title: FAQ Template
hero_style: "nds-flat"
hero_title: FAQs
hero_description: Find answers to common questions about our products, services, and policies.
breadcrumb:
- ["DGA Templates", "/templates"]
lang: en
direction: ltr
sidemenu_mode: false
---
{% assign faqs = site.data.content.faqs %}
{% assign categories = "general,services,account,technical" | split: "," %}
{% assign category_labels = "General,Services,Account,Technical" | split: "," %}

<section id="faqList" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-form-container nds-search-box" data-filter-target="faq-all-items">
            <div class="nds-search-content">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input id="faqSearch" type="text" class="nds-search-input" name="q" autocomplete="off"
                        placeholder="Search">
                    <div class="nds-form-action">
                        <button type="button" class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear">
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                        <button type="button" class="nds-btn nds-subtle nds-voice-input" aria-label="Voice input">
                            <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <button type="button" class="nds-btn nds-primary nds-search-btn">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <span class="nds-label">Search</span>
                </button>
                <div class="nds-dropmenu nds-filter" data-filter-target="faq-all-items">
                    <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Filter</span>
                    </button>
                    <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                        <div class="nds-dropmenu-scroll">
                            <div data-filter="tag" data-filter-legend="Tags"
                                data-filter-type="checkbox" data-no-auto-close></div>
                        </div>
                        <div class="nds-dropmenu-footer">
                            <hr class="nds-divider">
                            <div class="nds-dropmenu-action nds-grid">
                                <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                    data-filter-action="clear" data-no-auto-close>
                                    <span class="nds-label">Reset</span>
                                </button>
                                <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                    data-filter-action="apply">
                                    <span class="nds-label">Filter</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-filter-applied" data-filter-target="faq-all-items" hidden>
                <span class="nds-label">Applied Filters:</span>
                <div class="nds-chips"></div>
            </div>
        </div>

        <div class="nds-section-body">
            <div class="nds-tabs nds-divided" id="faq-tabs">
                <div class="nds-tab-list-container nds-scroll-more">
                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="FAQ categories">
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                            aria-controls="panel-faq-all" id="tab-faq-all" tabindex="0">
                            <span class="nds-label">All</span>
                        </button>
                        {% for category in categories %}
                        {% assign label = category_labels[forloop.index0] %}
                        <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                            aria-controls="panel-faq-{{ category }}" id="tab-faq-{{ category }}" tabindex="-1">
                            <span class="nds-label">{{ label }}</span>
                        </button>
                        {% endfor %}
                    </nav>
                    <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i></button>
                </div>

                <div class="nds-tab-content">

                    <div class="nds-tab-panel" role="tabpanel" id="panel-faq-all" aria-labelledby="tab-faq-all" tabindex="0">
                        <div class="nds-accordion nds-lg" id="faq-all-items" data-filter-items=".nds-accordion-item">
                            {% for item in faqs %}
                            {% assign hid = "faq-all-h-" | append: item.id %}
                            {% assign cid = "faq-all-c-" | append: item.id %}
                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="{{ hid }}">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="{{ cid }}">
                                        <span class="nds-accordion-title">{{ item.question }}</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="{{ cid }}" aria-labelledby="{{ hid }}">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>{{ item.answer }}</p>
                                            <div class="nds-tags">
                                                {% for tag in item.tags %}
                                                <span class="nds-tag nds-{{ tag.color }} nds-sm"><span class="nds-label" data-filter="tag">{{ tag.label }}</span></span>
                                                {% endfor %}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>

                    {% for category in categories %}
                    <div class="nds-tab-panel" role="tabpanel" id="panel-faq-{{ category }}" aria-labelledby="tab-faq-{{ category }}"
                        aria-hidden="true" tabindex="-1" hidden>
                        <div class="nds-accordion nds-lg" id="faq-{{ category }}-items">
                            {% for item in faqs %}
                            {% if item.category == category %}
                            {% assign hid = "faq-" | append: category | append: "-h-" | append: item.id %}
                            {% assign cid = "faq-" | append: category | append: "-c-" | append: item.id %}
                            <div class="nds-accordion-item">
                                <h3 class="nds-accordion-header" id="{{ hid }}">
                                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button"
                                        aria-expanded="false" aria-controls="{{ cid }}">
                                        <span class="nds-accordion-title">{{ item.question }}</span>
                                    </button>
                                </h3>
                                <div class="nds-accordion-collapse" id="{{ cid }}" aria-labelledby="{{ hid }}">
                                    <div class="nds-accordion-content">
                                        <div class="nds-accordion-body">
                                            <p>{{ item.answer }}</p>
                                            <div class="nds-tags">
                                                {% for tag in item.tags %}
                                                <span class="nds-tag nds-{{ tag.color }} nds-sm"><span class="nds-label" data-filter="tag">{{ tag.label }}</span></span>
                                                {% endfor %}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {% endif %}
                            {% endfor %}
                        </div>
                    </div>
                    {% endfor %}

                </div>
            </div>
        </div>
    </div>
</section>

<script>
(function () {
    const searchBox = document.querySelector('.nds-search-box[data-filter-target="faq-all-items"]');
    const filterDropmenu = document.querySelector('.nds-filter[data-filter-target="faq-all-items"]');
    const allTabBtn = document.getElementById('tab-faq-all');
    if (!allTabBtn) return;

    function switchToAll() {
        if (allTabBtn.getAttribute('aria-selected') === 'true') return;
        allTabBtn.click();
    }

    const searchInput = document.getElementById('faqSearch');
    if (searchInput) searchInput.addEventListener('input', switchToAll);
    if (searchBox) {
        searchBox.addEventListener('click', function (e) {
            if (e.target.closest('.nds-search-btn, .nds-clear, .nds-voice-input')) switchToAll();
        });
    }
    if (filterDropmenu) {
        filterDropmenu.addEventListener('click', function (e) {
            if (e.target.closest('[data-filter-action="apply"]')) switchToAll();
        });
    }
})();
</script>

<section id="faqFeedback" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-body">
            <div class="nds-card nds-stroke" style="--card-width: 100%;">
                <div class="nds-card-header">
                    <div class="nds-card-featured-icon">
                        <span class="nds-featured-icon nds-circle nds-xl">
                            <i class="hgi hgi-stroke hgi-mail-01"></i>
                        </span>
                    </div>
                </div>
                <div class="nds-card-content">
                    <div class="nds-card-text">
                        <h3 class="nds-card-title">Comments &amp; suggestions</h3>
                        <p class="nds-card-description">For any inquiry or feedback on Government Services, please fill the required information.</p>
                    </div>
                </div>
                <div class="nds-card-actions">
                    <a href="{{ '/templates/contact-us-template' | relative_url }}" class="nds-btn nds-primary">
                        <span class="nds-label">Contact us</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
