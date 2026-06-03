---
layout: page
title: Accessibility
hero_title: Accessibility - National Design System
hero_description: A site-wide floating panel that lets visitors apply accessibility presets, tune typography, and switch visual filters, with every choice persisted across pages.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Trigger -->
<section id="accessibilityTrigger" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Floating Action Button</h2>
            <p class="nds-section-description">A circular FAB in the corner opens the disclosure panel. The button ships with the default layout, so every page on the site exposes the same controls without per-page wiring.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Open the global panel</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display:flex; flex-direction:column; align-items:center; gap: var(--spacing-md); padding: var(--spacing-2xl);">
                            <button class="nds-btn nds-primary nds-circle nds-accessibility-toggle"
                                    type="button"
                                    data-accessibility-demo-open
                                    aria-label="Open accessibility panel"
                                    style="position: static;">
                                <i class="nds-icon nds-hgi-accessibility" aria-hidden="true"></i>
                            </button>
                            <span class="nds-feedback nds-sm nds-outline" data-status="neutral">
                                <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
                                The same button is also pinned to the corner of every page.
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-a11y-trigger-1" id="tab-a11y-trigger-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-a11y-trigger-fouc" id="tab-a11y-trigger-fouc">
                                        <span class="nds-tab-label">Head</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-a11y-trigger-1"
                                    aria-labelledby="tab-a11y-trigger-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;button class="nds-btn nds-primary nds-circle nds-accessibility-toggle"
        type="button"
        aria-label="Accessibility settings"
        data-i18n-attr="aria-label:panel_label"
        aria-controls="ndsAccessibilityPanel"
        aria-expanded="false"
        data-a11y-pos="end"
        data-accessibility-toggle&gt;
    &lt;i class="nds-icon nds-hgi-accessibility" aria-hidden="true"&gt;&lt;/i&gt;
&lt;/button&gt;

&lt;aside id="ndsAccessibilityPanel"
       class="nds-accessibility-panel"
       aria-label="Accessibility settings"
       data-i18n-attr="aria-label:panel_label"
       data-accessibility-panel
       hidden&gt;

    &lt;div class="nds-accessibility-panel-header"&gt;
        &lt;h2 class="nds-accessibility-panel-title" data-i18n="panel_title"&gt;Accessibility Tools&lt;/h2&gt;
        &lt;button class="nds-btn nds-subtle nds-icon-only"
                data-accessibility-close
                type="button"
                aria-label="Close accessibility panel"
                data-i18n-attr="aria-label:close_panel"&gt;
            &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;

    &lt;div class="nds-scroll-more nds-divided"&gt;
        &lt;div class="nds-scroll-more-content"&gt;
            &lt;div class="nds-accessibility-panel-body"&gt;

                &lt;div class="nds-sr-only" data-a11y-status role="status" aria-live="polite" aria-atomic="true"&gt;&lt;/div&gt;

                &lt;!-- Display &amp; Language — quick toggles --&gt;
                &lt;div class="nds-accessibility-panel-quick"&gt;
                    &lt;button class="nds-btn nds-subtle nds-icon-only nds-theme-toggle-wrap"
                            data-theme-toggle
                            type="button"
                            aria-label="Toggle theme"
                            data-i18n-attr="aria-label:toggle_theme"&gt;
                        &lt;i class="nds-icon nds-hgi-moon-02" aria-hidden="true"&gt;&lt;/i&gt;
                    &lt;/button&gt;

                    &lt;a class="nds-btn nds-subtle nds-icon-only"
                       href="/ar/"
                       aria-label="التبديل إلى العربية"
                       data-i18n-attr="aria-label:switch_lang"&gt;
                        &lt;i class="nds-icon nds-hgi-translation" aria-hidden="true"&gt;&lt;/i&gt;
                    &lt;/a&gt;
                &lt;/div&gt;

        &lt;!-- Accessibility settings — one accordion, three items:
             Modes (switches), Readable Experience (tile grid), Visually
             Pleasing (tile grid). First item open by default; the other
             two collapsed to keep the panel compact on first open. --&gt;
        &lt;div class="nds-accordion nds-lg nds-accessibility-modes" id="a11yAccordion"&gt;

            &lt;!-- Item 1: Accessibility Modes (bundle switches) --&gt;
            &lt;div class="nds-accordion-item"&gt;
                &lt;h3 class="nds-accordion-header"&gt;
                    &lt;button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                            type="button"
                            aria-expanded="true"
                            data-state="open"
                            aria-controls="a11yModesCollapse"&gt;
                        &lt;span class="nds-accordion-title"&gt;&lt;span data-i18n="section_modes"&gt;Accessibility Modes&lt;/span&gt; &lt;span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="modes" aria-hidden="true"&gt;&lt;/span&gt;&lt;span class="nds-sr-only" data-a11y-count-sr="modes"&gt;&lt;/span&gt;&lt;/span&gt;
                    &lt;/button&gt;
                &lt;/h3&gt;
                &lt;div class="nds-accordion-collapse"
                     id="a11yModesCollapse"
                     data-state="open"&gt;
                    &lt;div class="nds-accordion-content"&gt;
                        &lt;div class="nds-accordion-body"&gt;
                            &lt;fieldset class="nds-form-group nds-switch-group"&gt;

                                &lt;div class="nds-form-container nds-switch-container" data-mode-id="epilepsy-safe"&gt;
                                    &lt;div class="nds-form-header"&gt;
                                        &lt;label for="a11y-mode-epilepsy-safe"&gt;
                                            &lt;span class="nds-label" data-i18n-name&gt;&lt;/span&gt;
                                            &lt;span class="nds-info"  data-i18n-desc&gt;&lt;/span&gt;
                                        &lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-form-control"&gt;
                                        &lt;div class="nds-switch"&gt;
                                            &lt;input type="checkbox" id="a11y-mode-epilepsy-safe" class="nds-switch-input" data-a11y-mode="epilepsy-safe"&gt;
                                            &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class="nds-form-container nds-switch-container" data-mode-id="visually-impaired"&gt;
                                    &lt;div class="nds-form-header"&gt;
                                        &lt;label for="a11y-mode-visually-impaired"&gt;
                                            &lt;span class="nds-label" data-i18n-name&gt;&lt;/span&gt;
                                            &lt;span class="nds-info"  data-i18n-desc&gt;&lt;/span&gt;
                                        &lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-form-control"&gt;
                                        &lt;div class="nds-switch"&gt;
                                            &lt;input type="checkbox" id="a11y-mode-visually-impaired" class="nds-switch-input" data-a11y-mode="visually-impaired"&gt;
                                            &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class="nds-form-container nds-switch-container" data-mode-id="cognitive-disability"&gt;
                                    &lt;div class="nds-form-header"&gt;
                                        &lt;label for="a11y-mode-cognitive-disability"&gt;
                                            &lt;span class="nds-label" data-i18n-name&gt;&lt;/span&gt;
                                            &lt;span class="nds-info"  data-i18n-desc&gt;&lt;/span&gt;
                                        &lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-form-control"&gt;
                                        &lt;div class="nds-switch"&gt;
                                            &lt;input type="checkbox" id="a11y-mode-cognitive-disability" class="nds-switch-input" data-a11y-mode="cognitive-disability"&gt;
                                            &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class="nds-form-container nds-switch-container" data-mode-id="motor-impaired"&gt;
                                    &lt;div class="nds-form-header"&gt;
                                        &lt;label for="a11y-mode-motor-impaired"&gt;
                                            &lt;span class="nds-label" data-i18n-name&gt;&lt;/span&gt;
                                            &lt;span class="nds-info"  data-i18n-desc&gt;&lt;/span&gt;
                                        &lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-form-control"&gt;
                                        &lt;div class="nds-switch"&gt;
                                            &lt;input type="checkbox" id="a11y-mode-motor-impaired" class="nds-switch-input" data-a11y-mode="motor-impaired"&gt;
                                            &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class="nds-form-container nds-switch-container" data-mode-id="colorblind"&gt;
                                    &lt;div class="nds-form-header"&gt;
                                        &lt;label for="a11y-mode-colorblind"&gt;
                                            &lt;span class="nds-label" data-i18n-name&gt;&lt;/span&gt;
                                            &lt;span class="nds-info"  data-i18n-desc&gt;&lt;/span&gt;
                                        &lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-form-control"&gt;
                                        &lt;div class="nds-switch"&gt;
                                            &lt;input type="checkbox" id="a11y-mode-colorblind" class="nds-switch-input" data-a11y-mode="colorblind"&gt;
                                            &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class="nds-form-container nds-switch-container" data-mode-id="dyslexia-friendly"&gt;
                                    &lt;div class="nds-form-header"&gt;
                                        &lt;label for="a11y-mode-dyslexia-friendly"&gt;
                                            &lt;span class="nds-label" data-i18n-name&gt;&lt;/span&gt;
                                            &lt;span class="nds-info"  data-i18n-desc&gt;&lt;/span&gt;
                                        &lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-form-control"&gt;
                                        &lt;div class="nds-switch"&gt;
                                            &lt;input type="checkbox" id="a11y-mode-dyslexia-friendly" class="nds-switch-input" data-a11y-mode="dyslexia-friendly"&gt;
                                            &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                                &lt;div class="nds-form-container nds-switch-container" data-mode-id="adhd-friendly"&gt;
                                    &lt;div class="nds-form-header"&gt;
                                        &lt;label for="a11y-mode-adhd-friendly"&gt;
                                            &lt;span class="nds-label" data-i18n-name&gt;&lt;/span&gt;
                                            &lt;span class="nds-info"  data-i18n-desc&gt;&lt;/span&gt;
                                        &lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div class="nds-form-control"&gt;
                                        &lt;div class="nds-switch"&gt;
                                            &lt;input type="checkbox" id="a11y-mode-adhd-friendly" class="nds-switch-input" data-a11y-mode="adhd-friendly"&gt;
                                            &lt;div class="nds-switch-track"&gt;&lt;div class="nds-switch-thumb"&gt;&lt;/div&gt;&lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                &lt;/div&gt;

                            &lt;/fieldset&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;!-- Item 2: Readable Experience (tile grid) --&gt;
            &lt;div class="nds-accordion-item"&gt;
                &lt;h3 class="nds-accordion-header"&gt;
                    &lt;button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                            type="button"
                            aria-expanded="false"
                            aria-controls="a11yReadableCollapse"&gt;
                        &lt;span class="nds-accordion-title"&gt;&lt;span data-i18n="section_readable"&gt;Readable Experience&lt;/span&gt; &lt;span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="readable" aria-hidden="true"&gt;&lt;/span&gt;&lt;span class="nds-sr-only" data-a11y-count-sr="readable"&gt;&lt;/span&gt;&lt;/span&gt;
                    &lt;/button&gt;
                &lt;/h3&gt;
                &lt;div class="nds-accordion-collapse"
                     id="a11yReadableCollapse"&gt;
                    &lt;div class="nds-accordion-content"&gt;
                        &lt;div class="nds-accordion-body"&gt;
                            &lt;div class="nds-grid" role="group" aria-label="Readable experience controls" data-i18n-attr="aria-label:aria_readable"&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="font-step" data-a11y-cycle="0,1,2,3" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-text-font" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="font_sizing"&gt;Font Sizing&lt;/span&gt;
                                    &lt;span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"&gt;&lt;/span&gt;
                                    &lt;span class="nds-sr-only" data-a11y-value data-i18n="default"&gt;Default&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="dyslexia" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-text-italic" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="dyslexia"&gt;Dyslexia Friendly&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="highlight-titles" aria-pressed="false"&gt;
                                    &lt;i class="nds-icon nds-hgi-highlighter" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="highlight_titles"&gt;Highlight Titles&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="highlight-links" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-link-04" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="highlight_links"&gt;Highlight Links&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="reading-mask" aria-pressed="false"&gt;
                                    &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="reading_mask"&gt;Reading Mask&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="reduce-motion" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-pause" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="pause_motion"&gt;Pause Motion&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="text-align" data-a11y-cycle="default,end,start,justify" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-text-align-left" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="text_align"&gt;Text Alignment&lt;/span&gt;
                                    &lt;span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"&gt;&lt;/span&gt;
                                    &lt;span class="nds-sr-only" data-a11y-value data-i18n="default"&gt;Default&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="line-height" data-a11y-cycle="normal,1.6,1.8,2.0" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-paragraph-spacing" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="line_height"&gt;Line Height&lt;/span&gt;
                                    &lt;span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"&gt;&lt;/span&gt;
                                    &lt;span class="nds-sr-only" data-a11y-value data-i18n="default"&gt;Default&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="letter-spacing" data-a11y-cycle="0,0.04em,0.08em,0.12em" data-a11y-exclude-token="letter-spacing" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-letter-spacing" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="letter_spacing"&gt;Letter Spacing&lt;/span&gt;
                                    &lt;span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"&gt;&lt;/span&gt;
                                    &lt;span class="nds-sr-only" data-a11y-value data-i18n="default"&gt;Default&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="word-spacing" data-a11y-cycle="0,0.16em,0.32em,0.48em" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-text-kerning" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n="word_spacing"&gt;Word Spacing&lt;/span&gt;
                                    &lt;span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"&gt;&lt;/span&gt;
                                    &lt;span class="nds-sr-only" data-a11y-value data-i18n="default"&gt;Default&lt;/span&gt;
                                &lt;/button&gt;

                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;!-- Item 3: Visually Pleasing Experience (single-pick filters + colorblind primitive) --&gt;
            &lt;div class="nds-accordion-item"&gt;
                &lt;h3 class="nds-accordion-header"&gt;
                    &lt;button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                            type="button"
                            aria-expanded="false"
                            aria-controls="a11yVisualCollapse"&gt;
                        &lt;span class="nds-accordion-title"&gt;&lt;span data-i18n="section_visual"&gt;Visually Pleasing Experience&lt;/span&gt; &lt;span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="visual" aria-hidden="true"&gt;&lt;/span&gt;&lt;span class="nds-sr-only" data-a11y-count-sr="visual"&gt;&lt;/span&gt;&lt;/span&gt;
                    &lt;/button&gt;
                &lt;/h3&gt;
                &lt;div class="nds-accordion-collapse"
                     id="a11yVisualCollapse"&gt;
                    &lt;div class="nds-accordion-content"&gt;
                        &lt;div class="nds-accordion-body"&gt;
                            &lt;div class="nds-grid" role="group" aria-label="Visual adjustments" data-i18n-attr="aria-label:aria_visual"&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="boost-contrast" data-visual-id="boost-contrast" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-flash" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n-label&gt;&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="monochrome" data-visual-id="monochrome" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-color-picker" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n-label&gt;&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="high-contrast" data-visual-id="high-contrast" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-blur" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n-label&gt;&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="high-saturation" data-visual-id="high-saturation" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-sparkles" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n-label&gt;&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="low-saturation" data-visual-id="low-saturation" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-droplet" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n-label&gt;&lt;/span&gt;
                                &lt;/button&gt;

                                &lt;button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="cvd-deutan" data-visual-id="cvd-deutan" aria-pressed="false"&gt;
                                    &lt;i class="hgi hgi-stroke hgi-eye" aria-hidden="true"&gt;&lt;/i&gt;
                                    &lt;span class="nds-label" data-i18n-label&gt;&lt;/span&gt;
                                &lt;/button&gt;

                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;

        &lt;/div&gt;

            &lt;/div&gt;
        &lt;/div&gt;
        &lt;button class="nds-btn nds-subtle nds-show-more" type="button" aria-label="Scroll panel" data-i18n-attr="aria-label:scroll_panel"&gt;
            &lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
    &lt;/div&gt;

    &lt;div class="nds-accessibility-panel-footer"&gt;
        &lt;button class="nds-btn nds-secondary-outline" type="button" data-accessibility-action="reset"&gt;
            &lt;span class="nds-label" data-i18n="reset"&gt;Reset Settings&lt;/span&gt;
            &lt;div class="nds-progress-circle"&gt;
                &lt;svg width="100%" height="100%" viewBox="0 0 24 24"&gt;
                    &lt;circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"&gt;&lt;/circle&gt;
                    &lt;circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"&gt;&lt;/circle&gt;
                &lt;/svg&gt;
            &lt;/div&gt;
        &lt;/button&gt;
    &lt;/div&gt;
&lt;/aside&gt;
                                        </code>
                                    </div>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-a11y-trigger-fouc"
                                    aria-labelledby="tab-a11y-trigger-fouc" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;!-- Inline and synchronous inside &lt;head&gt; so the cached tokens land on
     &lt;html&gt; before first paint. Place after &lt;link rel="preload"&gt; tags so
     stylesheet fetches start first. The bundle table mirrors MODE_BUNDLES
     in nds-accessibility.js: keep the two in sync. --&gt;
&lt;script&gt;
(() =&gt; { try {
    const s = JSON.parse(localStorage.getItem('nds-a11y') || '{}');
    const R = {
        'epilepsy-safe':        ['reduce-motion','low-saturation'],
        'visually-impaired':    ['high-contrast'],
        'cognitive-disability': ['highlight-titles','reduce-motion'],
        'motor-impaired':       [],
        'colorblind':           ['cvd-deutan'],
        'dyslexia-friendly':    ['dyslexia','highlight-links'],
        'adhd-friendly':        ['reduce-motion','highlight-titles','reading-mask'],
    };
    const t = new Set([
        ...(s.modes || []),
        ...(s.bundles || []).flatMap(b =&gt; b in R ? (R[b].length ? R[b] : [b]) : []),
    ]);
    (s.excluded || []).forEach(e =&gt; t.delete(e));
    const c = s.settings || {};
    const step = parseInt(c['font-step'], 10) || 0;
    if (step &gt; 0 &amp;&amp; step &lt; 4) t.add('font-step-' + step);
    if (c['text-align'] &amp;&amp; c['text-align'] !== 'default') t.add('text-align-' + c['text-align']);
    if (t.size) document.documentElement.setAttribute('data-a11y', [...t].join(' '));
} catch {} })();
&lt;/script&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Custom Trigger -->
<section id="accessibilityCustomTrigger" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Custom Trigger</h2>
            <p class="nds-section-description">Wire a footer link, header menu item, or in-page CTA to open the same panel by calling <code class="nds-inline-code lang-js">NDS.Accessibility.open()</code> from your own click handler. The <code class="nds-inline-code lang-html">data-accessibility-toggle</code> attribute is only honored on the first match in the DOM, so use the JS API for every additional trigger.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Programmatic open</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="display:flex; align-items:center; gap: var(--spacing-md); padding: var(--spacing-2xl);">
                            <a href="#" class="nds-link" data-accessibility-demo-open>Accessibility settings</a>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-a11y-custom-1" id="tab-a11y-custom-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-a11y-custom-js" id="tab-a11y-custom-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-a11y-custom-1"
                                    aria-labelledby="tab-a11y-custom-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;a href="#" class="nds-link" id="open-a11y"&gt;Accessibility settings&lt;/a&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-a11y-custom-js"
                                    aria-labelledby="tab-a11y-custom-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">document.getElementById('open-a11y').addEventListener('click', (e) =&gt; {
    e.preventDefault();
    e.stopPropagation();   // Panel's outside-click-close listener also lives on document.
    NDS.Accessibility.open();
});</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- FAB Position -->
<section id="accessibilityPosition" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">FAB Position</h2>
            <p class="nds-section-description">Anchor the FAB to either edge so it does not collide with chat widgets, cookie banners, or layouts that already pin content to a corner. The slide-in panel mirrors the FAB side automatically.</p>
        </div>
        <div class="nds-section-body">
            <table class="nds-table nds-responsive">
                <thead><tr><th>Value</th><th>Type</th><th>Behavior</th></tr></thead>
                <tbody>
                    <tr><td><code class="nds-inline-code lang-html">data-a11y-pos="end"</code></td><td>Logical</td><td>Default. Anchors to the inline-end corner: bottom-right in LTR, bottom-left in RTL. Panel slides in from the same side.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">data-a11y-pos="start"</code></td><td>Logical</td><td>Anchors to the inline-start corner: bottom-left in LTR, bottom-right in RTL. Flips with text direction.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">data-a11y-pos="left"</code></td><td>Physical</td><td>Always pins to bottom-left regardless of direction. Use when chrome on the right edge would clash.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">data-a11y-pos="right"</code></td><td>Physical</td><td>Always pins to bottom-right regardless of direction.</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- Accessibility Modes -->
<section id="accessibilityModes" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Accessibility Modes</h2>
            <p class="nds-section-description">Bundle switches in the first accordion section. Each one is a recipe of primitives plus an optional opening typography stance, so a single tap covers the most common access needs without forcing visitors to compose the controls themselves.</p>
        </div>
        <div class="nds-section-body">
            <table class="nds-table nds-responsive">
                <thead><tr><th>Bundle</th><th>WCAG</th><th>What it activates</th></tr></thead>
                <tbody>
                    <tr><td><code class="nds-inline-code lang-html">epilepsy-safe</code></td><td>2.3.1</td><td>Pauses motion and drops saturation to half so flashing media and oversaturated palettes cannot trigger seizures.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">visually-impaired</code></td><td>1.4.6</td><td>Forces a high-contrast palette swap and bumps font sizing to 1.30×, the AAA contrast plus large-text combination.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">cognitive-disability</code></td><td>2.2, 2.3</td><td>Highlights every heading and pauses motion so the page reads as a clear, static outline.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">motor-impaired</code></td><td>2.5.5</td><td>Promotes every button, link, and form control to a 48×48px hit-target.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">colorblind</code></td><td>1.4.1</td><td>Applies a deuteranopia simulation filter for designer empathy QA. Color-deficient users themselves should rely on OS-level daltonization.</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">dyslexia-friendly</code></td><td>1.4.8, 1.4.12</td><td>Swaps the font stack to OpenDyslexic plus Maqroo, underlines every link, and applies the WCAG 1.4.8 spacing recipe (1.6 line-height, 0.12em letter-spacing in non-cursive scripts, 0.16em word-spacing).</td></tr>
                    <tr><td><code class="nds-inline-code lang-html">adhd-friendly</code></td><td>2.2, 2.3</td><td>Pauses motion, highlights titles, and turns on the reading mask so the visitor controls focus one paragraph at a time.</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- Readable Experience -->
<section id="accessibilityReadable" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Readable Experience</h2>
            <p class="nds-section-description">Tile grid in the second accordion section. Each tile is an independent control: cycling tiles step through 4 levels (default plus 3) and toggle tiles flip on or off. Every change writes a token onto <code class="nds-inline-code lang-html">&lt;html data-a11y&gt;</code> so author CSS can react.</p>
        </div>
        <div class="nds-section-body">
            <table class="nds-table nds-responsive">
                <thead><tr><th>Tile</th><th>Mechanism</th><th>Effect</th></tr></thead>
                <tbody>
                    <tr><td>Font Sizing</td><td>Cycle: 0, 1, 2, 3</td><td>Scales every <code class="nds-inline-code lang-html">--typo-*</code> token by 1.15×, 1.30×, or 1.50× via <code class="nds-inline-code lang-html">--user-font-scale</code>. Stamps <code class="nds-inline-code lang-html">font-step-N</code>.</td></tr>
                    <tr><td>Dyslexia Friendly</td><td>Toggle</td><td>Swaps <code class="nds-inline-code lang-js">--nds-font-family</code> to the OpenDyslexic plus Maqroo stack and bumps body-copy weight.</td></tr>
                    <tr><td>Highlight Titles</td><td>Toggle</td><td>Outlines every <code class="nds-inline-code lang-html">h1</code> through <code class="nds-inline-code lang-html">h6</code> with the warning palette so the document outline becomes scannable.</td></tr>
                    <tr><td>Highlight Links</td><td>Toggle</td><td>Adds a dashed warning outline plus underline to every text link, leaving button-styled anchors untouched.</td></tr>
                    <tr><td>Reading Mask</td><td>Toggle</td><td>Activates the draggable focus band described in the next section.</td></tr>
                    <tr><td>Pause Motion</td><td>Toggle</td><td>Mutes animations and transitions site-wide and pauses every <code class="nds-inline-code lang-html">autoplay</code> media element on activation.</td></tr>
                    <tr><td>Text Alignment</td><td>Cycle: default, end, start, justify</td><td>Forces alignment on body content via logical <code class="nds-inline-code lang-js">start</code> and <code class="nds-inline-code lang-js">end</code> so RTL and LTR both read naturally.</td></tr>
                    <tr><td>Line Height</td><td>Cycle: normal, 1.6, 1.8, 2.0</td><td>Sets <code class="nds-inline-code lang-html">--user-line-height</code> on body copy. Headings keep their typographic ratios.</td></tr>
                    <tr><td>Letter Spacing</td><td>Cycle: 0, 0.04em, 0.08em, 0.12em</td><td>Sets <code class="nds-inline-code lang-html">--user-letter-spacing</code>. Tile is hidden on Arabic pages because letter-spacing breaks cursive ligatures.</td></tr>
                    <tr><td>Word Spacing</td><td>Cycle: 0, 0.16em, 0.32em, 0.48em</td><td>Sets <code class="nds-inline-code lang-html">--user-word-spacing</code> on body copy.</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- Visual Filters -->
<section id="accessibilityVisuals" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Visual Filters</h2>
            <p class="nds-section-description">Tile grid in the third accordion section. Filters are mutex: turning one on automatically mutes the others, since composing CSS filters multiplicatively never produces what visitors expect. Every filter is wrapped in <code class="nds-inline-code lang-js">@media not (forced-colors: active)</code> so Windows High Contrast users are not double-treated.</p>
        </div>
        <div class="nds-section-body">
            <table class="nds-table nds-responsive">
                <thead><tr><th>Filter</th><th>CSS</th><th>Use case</th></tr></thead>
                <tbody>
                    <tr><td>Boost Contrast</td><td><code class="nds-inline-code lang-js">contrast(1.15)</code></td><td>Sharpens edges across the whole page without swapping the palette.</td></tr>
                    <tr><td>Monochrome</td><td><code class="nds-inline-code lang-js">grayscale(1)</code></td><td>Removes color cues so the visitor can verify the page still works without them.</td></tr>
                    <tr><td>High Contrast</td><td>Token-level palette swap</td><td>Replaces every semantic background, text, link, and border token with a black-on-white (or inverted) palette. Independent of the filter pipeline so chrome contrast can be tuned per theme.</td></tr>
                    <tr><td>High Saturation</td><td><code class="nds-inline-code lang-js">saturate(2)</code></td><td>Doubles vividness for visitors who perceive low-chroma palettes as washed out.</td></tr>
                    <tr><td>Low Saturation</td><td><code class="nds-inline-code lang-js">saturate(0.5)</code></td><td>Halves vividness for visitors with light sensitivity or migraine triggers.</td></tr>
                    <tr><td>Deuteranopia</td><td>SVG <code class="nds-inline-code lang-js">feColorMatrix</code></td><td>Machado-Oliveira-Fernandes 2009 simulation matrix at severity 1.0. Matches Chrome DevTools' "Emulate vision deficiencies" panel so QA results align with the on-page filter.</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- Reading Mask -->
<section id="accessibilityMask" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Reading Mask</h2>
            <p class="nds-section-description">A telescope-style focus band that dims everything except a configurable horizontal stripe. The stripe stays where the visitor leaves it: it only moves on grab-handle drag or arrow-key nudge, never on scroll, so cognitively-loaded users never lose their place.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <h3 class="nds-block-title">Toolbar</h3>
                <p>Activated from the Readable Experience tile. A floating toolbar attaches to the band with four icon buttons: decrease band height, drag handle, increase band height, and close. The toolbar flips above the band automatically when there is no room below it.</p>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Keyboard</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Key</th><th>Action</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">Arrow Up</code> / <code class="nds-inline-code lang-html">Arrow Down</code></td><td>Nudge the band by 20px.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Page Up</code> / <code class="nds-inline-code lang-html">Page Down</code></td><td>Move the band by 100px.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Home</code> / <code class="nds-inline-code lang-html">End</code></td><td>Jump to the top or bottom of the viewport.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">Escape</code></td><td>Close the mask. Routed through <code class="nds-inline-code lang-js">toggleMode</code> so a bundle-supplied mask lands in <code class="nds-inline-code lang-js">state.excluded</code>.</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="nds-block">
                <h3 class="nds-block-title">Settings</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Setting</th><th>Range</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">mask-band</code></td><td>20px to 160px, 20px steps</td><td>Half-height of the unmasked band. Persists per visitor.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">mask-y</code></td><td>0 to viewport height</td><td>Center Y of the band. Saved on drag-end and on every keyboard nudge so reload restores the same position.</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="accessibilityFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates as soon as the panel markup is on the page. Drop the FAB plus aside snippet into your base template once and every page picks it up without further wiring.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-package"></i>
                        <span class="nds-label">Seven Accessibility Bundles</span>
                    </span>
                    <p class="nds-item-desc">One-tap presets for epilepsy, visual impairment, cognitive load, motor impairment, colorblindness, dyslexia, and ADHD. Activating a bundle composes its primitives without clobbering settings the visitor already tuned by hand.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-font"></i>
                        <span class="nds-label">Ten Readable Tiles</span>
                    </span>
                    <p class="nds-item-desc">Cycling and toggle tiles cover font sizing, dyslexia font, link and title highlights, reading mask, motion, alignment, line height, letter spacing, and word spacing.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-color-picker"></i>
                        <span class="nds-label">Mutex Visual Filters</span>
                    </span>
                    <p class="nds-item-desc">Six color treatments behave as a single-pick group: boost contrast, monochrome, high contrast, high saturation, low saturation, and deuteranopia simulation.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-search-01"></i>
                        <span class="nds-label">Telescope Reading Mask</span>
                    </span>
                    <p class="nds-item-desc">A draggable focus band with size controls, pointer-capture dragging, and arrow-key nudging. The position survives reload so visitors can resume reading where they left off.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-database"></i>
                        <span class="nds-label">Cross-Page Persistence</span>
                    </span>
                    <p class="nds-item-desc">Every choice writes to <code class="nds-inline-code lang-html">localStorage['nds-a11y']</code> and a FOUC guard re-applies it before paint, so navigating between pages never reverts the visitor's setup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-browser"></i>
                        <span class="nds-label">OS Preference Sync</span>
                    </span>
                    <p class="nds-item-desc">Honors <code class="nds-inline-code lang-js">prefers-reduced-motion</code> and <code class="nds-inline-code lang-js">prefers-contrast</code> automatically, and re-applies whenever the visitor flips them in their OS mid-session.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-megaphone-01"></i>
                        <span class="nds-label">Localized Live Announcements</span>
                    </span>
                    <p class="nds-item-desc">A polite live region announces every toggle, tile cycle, and reset in the visitor's language. Strings load lazily from <code class="nds-inline-code lang-html">assets/i18n/accessibility/{lang}.json</code>.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="accessibilityGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Treat the FAB as part of the site chrome. Keep it on every page so visitors who tuned the panel on one page do not lose their entry point on the next</li>
                    <li>Add a redundant entry point in the footer or main menu (a link that calls <code class="nds-inline-code lang-js">NDS.Accessibility.open()</code>) so keyboard users can reach the panel from the natural tab order without hunting for a corner</li>
                    <li>Place custom triggers near content visitors are likely to return to. The panel returns focus to the opener on close (W3C APG Disclosure requirement), and the browser scrolls that element into view if it is offscreen, so a trigger high on the page will yank the visitor back to it after they close the panel</li>
                    <li>Move the FAB with <code class="nds-inline-code lang-html">data-a11y-pos</code> when chat widgets, cookie banners, or sticky CTAs already occupy a corner. Logical <code class="nds-inline-code lang-html">start</code> and <code class="nds-inline-code lang-html">end</code> flip with text direction; physical <code class="nds-inline-code lang-html">left</code> and <code class="nds-inline-code lang-html">right</code> stay put</li>
                    <li>Do not duplicate the panel markup. The component initializes the first <code class="nds-inline-code lang-html">[data-accessibility-panel]</code> it finds and ignores any siblings, so a second include silently falls back to a dead element</li>
                    <li>Do not put bundle-equivalent toggles in your own settings page. They will fight the panel's persistence and confuse visitors who tuned modes elsewhere. Link to the panel instead</li>
                    <li>If your design overrides body typography, scope <code class="nds-inline-code lang-html">--user-line-height</code>, <code class="nds-inline-code lang-html">--user-letter-spacing</code>, and <code class="nds-inline-code lang-html">--user-word-spacing</code> consumers behind the matching <code class="nds-inline-code lang-html">[data-a11y~="has-{prop}"]</code> selectors so untouched pages stay at your defaults</li>
                    <li>When you ship custom <code class="nds-inline-code lang-html">--typo-*</code> tokens, wrap their values in <code class="nds-inline-code lang-js">calc(value * var(--user-font-scale, 1))</code> so the Font Sizing tile scales them too</li>
                    <li>Test in <a class="nds-color" href="{{ 'components/dark-mode' | relative_url }}">dark mode</a>: every visual filter and the high-contrast palette have dark-aware overrides, and your custom tokens should follow the same pattern</li>
                    <li>Place dynamic content (modals, drawers, toasts) outside the masked band's host or accept that the reading mask will dim them. The mask sits at <code class="nds-inline-code lang-html">z-index: 850</code>, below the FAB and panel but above page content</li>
                    <li>Do not rely on the deuteranopia filter as an actual accommodation. It is a designer empathy QA tool. Color-deficient visitors get correct daltonization from their OS settings, not from a CSS filter applied to an already-decoded page</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility-toggle</code></td><td>Floating action button. Combine with <code class="nds-inline-code lang-html">nds-btn nds-primary nds-circle</code> for the default visual.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility-panel</code></td><td>Slide-in panel container. Pin a fixed inline-start position; the panel handles its own slide direction off the FAB's <code class="nds-inline-code lang-html">data-a11y-pos</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility-panel-header</code></td><td>Title row plus close button.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility-panel-body</code></td><td>Scrollable section list with the accessibility accordion.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility-panel-footer</code></td><td>Sticky footer that hosts the reset action.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-accessibility-modes</code></td><td>Sized accordion modifier used by the Modes section. Adjusts switch-row padding to match the tile grids.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-a11y-count</code></td><td>Tag pill next to each accordion title showing how many controls in that section are active. Hides itself when empty.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-accessibility-toggle</code></td><td>Mark a button as the panel opener. The first match in DOM order is the canonical trigger; additional buttons should call <code class="nds-inline-code lang-js">NDS.Accessibility.open()</code> instead.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-accessibility-panel</code></td><td>Mark the panel root. Required for auto-init.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-accessibility-close</code></td><td>Mark a button inside the panel to close it.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-accessibility-action="reset"</code></td><td>Mark the reset button. Two-click confirmation with a 5-second arming window is wired automatically.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-a11y-pos</code></td><td>Set on the FAB to position the FAB plus panel pair. Values: <code class="nds-inline-code lang-html">end</code>, <code class="nds-inline-code lang-html">start</code>, <code class="nds-inline-code lang-html">left</code>, <code class="nds-inline-code lang-html">right</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-a11y-mode</code></td><td>Mark a switch or button as a bundle or primitive toggle. Value matches a key from <code class="nds-inline-code lang-js">MODE_BUNDLES</code> or a primitive token name.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-a11y-visual</code></td><td>Mark a button as a visual-filter selector. Joining the mutex group: clicking it mutes every other filter automatically.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-a11y-setting</code></td><td>Mark a button as a cycling setting. Pair with <code class="nds-inline-code lang-html">data-a11y-cycle</code> to declare the value sequence.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-a11y-cycle</code></td><td>Comma-separated list of values the setting tile cycles through. The first value is "off" and renders no active tile-bars.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-a11y-exclude-token</code></td><td>Drop a tile from the rendered panel when the loaded i18n file lists the token in <code class="nds-inline-code lang-js">exclude_controls</code>. Used to hide letter-spacing on Arabic.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Tokens Stamped on <code class="nds-inline-code lang-html">&lt;html&gt;</code></h3>
                <p>Author CSS can react to active modes by reading <code class="nds-inline-code lang-html">[data-a11y~="..."]</code> on the document root. Tokens compose, so multiple values appear space-separated.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Token</th><th>Source</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">epilepsy-safe</code>, <code class="nds-inline-code lang-html">visually-impaired</code>, <code class="nds-inline-code lang-html">cognitive-disability</code>, <code class="nds-inline-code lang-html">motor-impaired</code>, <code class="nds-inline-code lang-html">colorblind</code>, <code class="nds-inline-code lang-html">dyslexia-friendly</code>, <code class="nds-inline-code lang-html">adhd-friendly</code></td><td>Active bundle marker. Stamped while the bundle's switch is on.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">reduce-motion</code>, <code class="nds-inline-code lang-html">high-contrast</code>, <code class="nds-inline-code lang-html">low-saturation</code>, <code class="nds-inline-code lang-html">high-saturation</code>, <code class="nds-inline-code lang-html">monochrome</code>, <code class="nds-inline-code lang-html">boost-contrast</code>, <code class="nds-inline-code lang-html">cvd-deutan</code>, <code class="nds-inline-code lang-html">dyslexia</code>, <code class="nds-inline-code lang-html">highlight-titles</code>, <code class="nds-inline-code lang-html">highlight-links</code>, <code class="nds-inline-code lang-html">reading-mask</code></td><td>Primitive markers. Set by direct toggle, by bundle composition, or by an OS preference for reduce-motion and high-contrast.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">font-step-1</code>, <code class="nds-inline-code lang-html">font-step-2</code>, <code class="nds-inline-code lang-html">font-step-3</code></td><td>Discrete font scaling tier. Maps to 1.15×, 1.30×, and 1.50× via <code class="nds-inline-code lang-html">--user-font-scale</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">text-align-start</code>, <code class="nds-inline-code lang-html">text-align-end</code>, <code class="nds-inline-code lang-html">text-align-justify</code></td><td>Forces alignment on body content.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">has-line-height</code>, <code class="nds-inline-code lang-html">has-letter-spacing</code>, <code class="nds-inline-code lang-html">has-word-spacing</code></td><td>Presence flags for the matching <code class="nds-inline-code lang-html">--user-*</code> CSS variable. Stamped only when the value is non-default so author rules are never clobbered when an unrelated mod is on.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--user-font-scale</code></td><td>1</td><td>Set on <code class="nds-inline-code lang-html">:root</code> by font-step. Wrap your <code class="nds-inline-code lang-html">--typo-*</code> tokens in <code class="nds-inline-code lang-js">calc(value * var(--user-font-scale, 1))</code> to opt in.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--user-line-height</code></td><td>normal</td><td>Visitor-tuned line-height applied to body copy when <code class="nds-inline-code lang-html">has-line-height</code> is on.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--user-letter-spacing</code></td><td>0</td><td>Visitor-tuned letter-spacing applied when <code class="nds-inline-code lang-html">has-letter-spacing</code> is on.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--user-word-spacing</code></td><td>0</td><td>Visitor-tuned word-spacing applied when <code class="nds-inline-code lang-html">has-word-spacing</code> is on.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--a11y-fab-offset</code></td><td><code class="nds-inline-code lang-html">--spacing-2xl</code></td><td>Distance from the viewport edge for the FAB. Drops to <code class="nds-inline-code lang-html">--spacing-xl</code> on mobile.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--a11y-panel-width</code></td><td><code class="nds-inline-code lang-js">min(420px, 100vw)</code></td><td>Panel width. Falls back to full viewport on narrow screens.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--a11y-panel-top</code></td><td><code class="nds-inline-code lang-html">--nds-nav-height</code></td><td>Top inset of the panel. JS overrides at runtime by measuring the visible bottom edge of the topbar plus mainnav so a sticky header is never overlapped.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Accessibility</strong> API exposes the panel's lifecycle, the four state mutators, and a read-only state snapshot. Auto-init runs on first paint via the loader, so most pages never need to call <code class="nds-inline-code lang-js">NDS.Accessibility.init()</code> directly.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Lifecycle ────────────────────────────────────────
NDS.Accessibility.init();    // Idempotent. Re-init tears down listeners + remounts.
NDS.Accessibility.open();    // Slides the panel in. Saves the opener for focus return.
NDS.Accessibility.close();   // Slides out. Returns focus to the element that opened it.
NDS.Accessibility.toggle();  // Open if closed, close if open.

// ── State mutators ───────────────────────────────────
// Toggle a bundle by name OR a primitive token. Bundles compose
// their primitives; toggling a primitive separately respects the
// supply slot (modes / bundle / OS) and never double-counts.
NDS.Accessibility.toggleMode('dyslexia-friendly'); // bundle
NDS.Accessibility.toggleMode('reduce-motion');     // primitive

// Pick exactly one visual filter. Mutex: every other filter is
// muted automatically across user, bundle, and OS supply slots.
NDS.Accessibility.setVisualFilter('high-contrast');
// Pass the same name again to turn the filter off.
NDS.Accessibility.setVisualFilter('high-contrast');

// Cycle a setting key through the supplied value array. The first
// entry is treated as "off" by syncUI() (no active tile-bars).
NDS.Accessibility.cycleSetting('font-step', [0, 1, 2, 3]);
NDS.Accessibility.cycleSetting('text-align', ['default', 'end', 'start', 'justify']);
NDS.Accessibility.cycleSetting('line-height', ['normal', '1.6', '1.8', '2.0']);

// Wipe everything back to defaults. Bypasses the panel's two-click
// confirmation, so reserve this for programmatic flows (e.g. a
// "factory reset" button in your own settings UI).
NDS.Accessibility.reset();

// ── Read-only state snapshot ─────────────────────────
// Returns a deep clone, so mutations do not leak back into the panel.
const snapshot = NDS.Accessibility.state;
// {
//   modes: ['highlight-titles'],
//   bundles: ['dyslexia-friendly'],
//   excluded: [],
//   settings: {
//     'font-step': 2,
//     'text-align': 'default',
//     'line-height': '1.6',
//     'letter-spacing': '0.12em',
//     'word-spacing': '0.16em',
//     'mask-band': 60,
//     'mask-y': 420
//   },
//   settingsSnapshots: { 'dyslexia-friendly': { 'line-height': 'normal', ... } }
// }

// ── Persistence ──────────────────────────────────────
// State is auto-persisted to localStorage['nds-a11y'] on every mutation.
// Clearing it manually re-syncs on the next init() or reset() call.
localStorage.removeItem('nds-a11y');
NDS.Accessibility.reset();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<script>
    // Defer open() past the current click cycle. Otherwise the panel's own
    // outside-click-to-close listener (also bound on document) sees the
    // just-opened state and immediately closes it on the same click.
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-accessibility-demo-open]');
        if (!trigger) return;
        e.preventDefault();
        setTimeout(() => {
            if (window.NDS && NDS.Accessibility && typeof NDS.Accessibility.open === 'function') {
                NDS.Accessibility.open();
            }
        }, 0);
    });
</script>
