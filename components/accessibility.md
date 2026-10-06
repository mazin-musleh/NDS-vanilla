---
layout: page
title: Accessibility
hero_title: Accessibility - National Design System
hero_description: A site-wide panel where visitors turn on accessibility modes, adjust text and pick a color filter, with every choice kept across pages
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.5"
updated: "1.12.x"
last_edit: "06/10/2026 - 08:10 AM"
---

<section id="accessibilityOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The accessibility panel is a [Panel](../components/panels) that a [FAB](../components/fab) opens on every page. It has three groups. Accessibility Modes are switches that turn on several settings at once. Readable Experience holds tiles for text size, spacing, alignment, highlights, motion and the reading mask. Visually Pleasing Experience holds the color filters. Each choice writes a token on `<html>`, and CSS changes the page from that token.

Pick another component when:

- the visitor only switches between light and dark: [Themes](../components/themes)
- the setting belongs to one form or page: [Switch](../components/switch)

</div>
  </div>
</section>

<section id="accessibilityMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

<script type="text/html" id="a11y-preview" data-canon data-code="none" data-screens="none">
<button type="button" class="nds-btn nds-secondary-outline" data-accessibility-toggle data-panel-toggle="ndsAccessibilityPanel">
  <i class="nds-icon nds-hgi-accessibility" aria-hidden="true"></i>
  <span class="nds-label">Open the accessibility panel</span>
</button>
</script>

<script type="text/html" id="a11y-fab" data-canon data-preview="none">
<!-- On every NDS page, after the footer -->
<button class="nds-btn nds-primary nds-circle nds-icon-only nds-fab nds-accessibility-toggle"
        type="button"
        aria-label="Accessibility settings"
        data-i18n-attr="aria-label:panel_label"
        aria-controls="ndsAccessibilityPanel"
        aria-expanded="false"
        data-fab-pos="auto"
        data-panel-side="end"
        data-panel-toggle="ndsAccessibilityPanel"
        data-accessibility-toggle
        hidden>
  <i class="nds-icon nds-hgi-accessibility" aria-hidden="true"></i>
</button>
</script>

The FAB ships `hidden`, and the FAB script shows it once it is docked. A new page needs its own copy, after the footer.

</div>
  </div>
</section>

<section id="accessibilityBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Triggers

Any button with `data-accessibility-toggle` and `data-panel-toggle` opens the panel, as the FAB does. The first attribute builds the panel on the first press, with a spinner on the button for about one second. The second opens and closes the panel after that. To open it from your own code, call `NDS.Accessibility.open()`, as in the API.

<script type="text/html" id="a11y-trigger" data-canon data-preview="none">
<button type="button" class="nds-btn nds-secondary-outline" data-accessibility-toggle data-panel-toggle="ndsAccessibilityPanel">
  <i class="nds-icon nds-hgi-accessibility" aria-hidden="true"></i>
  <span class="nds-label">Accessibility settings</span>
</button>
</script>

### Panel Position

The panel slides in from the end edge, and the FAB docks there too. To move both, set `data-fab-pos` and `data-panel-side` to the same side on the FAB. The FAB docks before the panel exists, so `auto` cannot follow the panel's side. The first button pressed builds the panel on its own `data-panel-side`, so give every trigger the same value. A custom panel uses the `data-panel-side` on its `<aside>`.

### Loading

The script loads at page load only for a visitor with saved settings, so their modes apply without a press. Its CSS loads with it, so the page can show without the saved modes for a moment. To stop that flash, add `<link rel="stylesheet" href="assets/css/nds-accessibility.min.css">` in `<head>`, after the main stylesheet. A preload does not stop it. The link blocks the first paint for every visitor.

### Custom Panel

To change the panel, put your own copy in a `<template class="nds-panel-template">` on every page that has the FAB. It replaces the panel the script builds. The copy below is that panel, with its English text. The language file still writes the text of every element that keeps a `data-i18n`, `data-i18n-attr`, `data-i18n-name`, `data-i18n-desc` or `data-i18n-label` attribute. Remove the attribute to keep your own text.

<script type="text/html" id="a11y-panel" data-canon data-preview="none">
<template class="nds-panel-template">
  <aside id="ndsAccessibilityPanel"
     class="nds-panel nds-accessibility-panel"
     data-panel-side="end"
     aria-label="Accessibility settings"
     data-i18n-attr="aria-label:panel_label"
     data-accessibility-panel
     hidden>

    <div class="nds-panel-header">
      <span class="nds-featured-icon nds-circle">
        <i class="nds-icon nds-hgi-accessibility" aria-hidden="true"></i>
      </span>
      <div class="nds-panel-text">
        <h2 class="nds-panel-title" data-i18n="panel_title">Accessibility Tools</h2>
      </div>
      <button class="nds-btn nds-subtle nds-icon-only"
          data-panel-close
          type="button"
          aria-label="Close accessibility panel"
          data-i18n-attr="aria-label:close_panel">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>

    <div class="nds-panel-body">
      <div class="nds-scroll-more nds-divided">
        <div class="nds-scroll-more-content">

          <div class="nds-sr-only" data-a11y-status role="status" aria-live="polite" aria-atomic="true"></div>

          <!-- Display — quick toggle -->
          <div class="nds-accessibility-quick">
            <button class="nds-btn nds-subtle nds-icon-only nds-theme-toggle-wrap"
                data-theme-toggle
                type="button"
                aria-label="Toggle theme"
                data-i18n-attr="aria-label:toggle_theme">
              <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
            </button>
          </div>

      <!-- Accessibility settings — one accordion, three items:
        Modes (switches), Readable Experience (tile grid), Visually
        Pleasing (tile grid). First item open by default; the other
        two collapsed to keep the panel compact on first open. -->
      <div class="nds-accordion nds-lg nds-accessibility-modes" id="a11yAccordion">

        <!-- Item 1: Accessibility Modes (bundle switches) -->
        <div class="nds-accordion-item">
          <h3 class="nds-accordion-header">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                type="button"
                aria-expanded="true"
                data-state="open"
                aria-controls="a11yModesCollapse">
              <span class="nds-accordion-title"><span data-i18n="section_modes">Accessibility Modes</span> <span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="modes" aria-hidden="true"></span><span class="nds-sr-only" data-a11y-count-sr="modes"></span></span>
            </button>
          </h3>
          <div class="nds-accordion-collapse" id="a11yModesCollapse" data-state="open">
            <div class="nds-accordion-content">
              <div class="nds-accordion-body">
                <fieldset class="nds-form-group nds-switch-group">

                  <div class="nds-form-container nds-switch-container" data-mode-id="epilepsy-safe">
                    <div class="nds-form-header">
                      <label for="a11y-mode-epilepsy-safe">
                        <span class="nds-label" data-i18n-name>Epilepsy Safe Mode</span>
                        <span class="nds-info"  data-i18n-desc>Stops motion and dampens color intensity</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="a11y-mode-epilepsy-safe" class="nds-switch-input" data-a11y-mode="epilepsy-safe">
                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="nds-form-container nds-switch-container" data-mode-id="visually-impaired">
                    <div class="nds-form-header">
                      <label for="a11y-mode-visually-impaired">
                        <span class="nds-label" data-i18n-name>Visually Impaired Mode</span>
                        <span class="nds-info"  data-i18n-desc>Enlarges text and boosts contrast for clearer reading</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="a11y-mode-visually-impaired" class="nds-switch-input" data-a11y-mode="visually-impaired">
                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="nds-form-container nds-switch-container" data-mode-id="cognitive-disability">
                    <div class="nds-form-header">
                      <label for="a11y-mode-cognitive-disability">
                        <span class="nds-label" data-i18n-name>Cognitive Disability Mode</span>
                        <span class="nds-info"  data-i18n-desc>Highlights titles and stops motion to reduce distraction</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="a11y-mode-cognitive-disability" class="nds-switch-input" data-a11y-mode="cognitive-disability">
                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="nds-form-container nds-switch-container" data-mode-id="motor-impaired">
                    <div class="nds-form-header">
                      <label for="a11y-mode-motor-impaired">
                        <span class="nds-label" data-i18n-name>Motor Impaired Mode</span>
                        <span class="nds-info"  data-i18n-desc>Enlarges click targets and emphasizes the focus indicator</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="a11y-mode-motor-impaired" class="nds-switch-input" data-a11y-mode="motor-impaired">
                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="nds-form-container nds-switch-container" data-mode-id="colorblind">
                    <div class="nds-form-header">
                      <label for="a11y-mode-colorblind">
                        <span class="nds-label" data-i18n-name>Colorblind Mode</span>
                        <span class="nds-info"  data-i18n-desc>Adjusts colors to distinguish red and green clearly</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="a11y-mode-colorblind" class="nds-switch-input" data-a11y-mode="colorblind">
                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="nds-form-container nds-switch-container" data-mode-id="dyslexia-friendly">
                    <div class="nds-form-header">
                      <label for="a11y-mode-dyslexia-friendly">
                        <span class="nds-label" data-i18n-name>Dyslexia Friendly Mode</span>
                        <span class="nds-info"  data-i18n-desc>Uses a clearer font and widens line and word spacing</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="a11y-mode-dyslexia-friendly" class="nds-switch-input" data-a11y-mode="dyslexia-friendly">
                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                      </div>
                    </div>
                  </div>

                  <div class="nds-form-container nds-switch-container" data-mode-id="adhd-friendly">
                    <div class="nds-form-header">
                      <label for="a11y-mode-adhd-friendly">
                        <span class="nds-label" data-i18n-name>ADHD Friendly Mode</span>
                        <span class="nds-info"  data-i18n-desc>Stops motion, highlights titles, and enables the reading mask</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="a11y-mode-adhd-friendly" class="nds-switch-input" data-a11y-mode="adhd-friendly">
                        <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                      </div>
                    </div>
                  </div>

                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <!-- Item 2: Readable Experience (tile grid) -->
        <div class="nds-accordion-item">
          <h3 class="nds-accordion-header">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                type="button"
                aria-expanded="false"
                aria-controls="a11yReadableCollapse">
              <span class="nds-accordion-title"><span data-i18n="section_readable">Readable Experience</span> <span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="readable" aria-hidden="true"></span><span class="nds-sr-only" data-a11y-count-sr="readable"></span></span>
            </button>
          </h3>
          <div class="nds-accordion-collapse" id="a11yReadableCollapse">
            <div class="nds-accordion-content">
              <div class="nds-accordion-body">
                <div class="nds-grid" role="group" aria-label="Readable experience controls" data-i18n-attr="aria-label:aria_readable">

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="font-step" data-a11y-cycle="0,1,2,3" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-text-smallcaps" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="font_sizing">Font Sizing</span>
                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="dyslexia" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-glasses" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="dyslexia">Dyslexia Friendly</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="highlight-titles" aria-pressed="false">
                    <i class="nds-icon nds-hgi-highlighter" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="highlight_titles">Highlight Titles</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="highlight-links" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-link-04" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="highlight_links">Highlight Links</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="reading-mask" aria-pressed="false">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="reading_mask">Reading Mask</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="reduce-motion" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-pause" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="pause_motion">Pause Motion</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="text-align" data-a11y-cycle="default,end,start,justify" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-text-align-left" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="text_align">Text Alignment</span>
                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="line-height" data-a11y-cycle="normal,1.6,1.8,2.0" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-paragraph-spacing" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="line_height">Line Height</span>
                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="letter-spacing" data-a11y-cycle="0,0.04em,0.08em,0.12em" data-a11y-exclude-token="letter-spacing" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-letter-spacing" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="letter_spacing">Letter Spacing</span>
                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="word-spacing" data-a11y-cycle="0,0.16em,0.32em,0.48em" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-text-kerning" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n="word_spacing">Word Spacing</span>
                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Item 3: Visually Pleasing Experience (single-pick filters + colorblind primitive) -->
        <div class="nds-accordion-item">
          <h3 class="nds-accordion-header">
            <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                type="button"
                aria-expanded="false"
                aria-controls="a11yVisualCollapse">
              <span class="nds-accordion-title"><span data-i18n="section_visual">Visually Pleasing Experience</span> <span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="visual" aria-hidden="true"></span><span class="nds-sr-only" data-a11y-count-sr="visual"></span></span>
            </button>
          </h3>
          <div class="nds-accordion-collapse" id="a11yVisualCollapse">
            <div class="nds-accordion-content">
              <div class="nds-accordion-body">
                <div class="nds-grid" role="group" aria-label="Visual adjustments" data-i18n-attr="aria-label:aria_visual">

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="boost-contrast" data-visual-id="boost-contrast" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-flash" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n-label>Boost Contrast</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="monochrome" data-visual-id="monochrome" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-color-picker" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n-label>Monochrome</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="high-contrast" data-visual-id="high-contrast" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-blur" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n-label>High Contrast</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="high-saturation" data-visual-id="high-saturation" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-sparkles" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n-label>High Saturation</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="low-saturation" data-visual-id="low-saturation" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-droplet" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n-label>Low Saturation</span>
                  </button>

                  <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="cvd-deutan" data-visual-id="cvd-deutan" aria-pressed="false">
                    <i class="hgi hgi-stroke hgi-colors" aria-hidden="true"></i>
                    <span class="nds-label" data-i18n-label>Deuteranopia</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

        </div>
        <button class="nds-btn nds-subtle nds-show-more" type="button" aria-label="Scroll panel" data-i18n-attr="aria-label:scroll_panel">
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </div>

    <div class="nds-panel-footer">
      <button class="nds-btn nds-secondary-outline" type="button" data-accessibility-action="reset">
        <span class="nds-label" data-i18n="reset">Reset Settings</span>
        <div class="nds-progress-circle">
          <svg width="100%" height="100%" viewBox="0 0 24 24">
            <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
            <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
          </svg>
        </div>
      </button>
    </div>
  </aside>
</template>
</script>

</div>
  </div>
</section>

<section id="accessibilityFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The page carries only the FAB. The script and the panel load on the first press, so a visitor who never opens the panel downloads none of it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-package"></i>
            <span class="nds-label">Seven Accessibility Modes</span>
          </span>
          <p class="nds-item-desc">One switch each for epilepsy, visual impairment, cognitive load, motor impairment, color blindness, dyslexia and ADHD. A mode changes only the settings the visitor left at default. Turning it off restores each one the visitor did not change since.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Ten Readable Tiles</span>
          </span>
          <p class="nds-item-desc">Font size, dyslexia font, title and link highlights, reading mask, motion pause, text alignment, line height, letter spacing and word spacing. A tile with levels shows a bar for each one.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-color-picker"></i>
            <span class="nds-label">One Color Filter at a Time</span>
          </span>
          <p class="nds-item-desc">Boost contrast, monochrome, high contrast, high saturation, low saturation and a deuteranopia simulation. Turning one on turns the others off. Except High Contrast, the filters do not apply while a Windows contrast theme is on.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-01"></i>
            <span class="nds-label">Reading Mask</span>
          </span>
          <p class="nds-item-desc">Dims the screen except for one band. The band stays put on scroll and moves only by drag or by key. Its toolbar changes the band's height or closes the mask, and moves above the band when there is no room below. The band keeps its place after a reload.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database"></i>
            <span class="nds-label">Cross-Page Persistence</span>
          </span>
          <p class="nds-item-desc">Every choice is saved in <code class="nds-inline-code lang-js">localStorage['nds-a11y']</code> and applies on every page. When every setting is back at default, the key is removed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-browser"></i>
            <span class="nds-label">OS Preference Sync</span>
          </span>
          <p class="nds-item-desc">The device's reduced motion and more contrast settings turn on Pause Motion and High Contrast. A change to them during the visit applies at once.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-megaphone-01"></i>
            <span class="nds-label">Localized Live Announcements</span>
          </span>
          <p class="nds-item-desc">A screen reader hears every change and reset in the page's language. The text comes from <code class="nds-inline-code lang-js">assets/i18n/accessibility/{lang}.json</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-refresh"></i>
            <span class="nds-label">Two-Press Reset</span>
          </span>
          <p class="nds-item-desc">The first press on Reset Settings starts a 5-second countdown on the button. A second press within it resets everything.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="accessibilityPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Keep the FAB on every page. A visitor who set the panel up on one page expects to find it on the next.
- Add a second trigger in the footer or the main menu. A keyboard user then reaches the panel in the normal tab order.
- Put a trigger where the visitor reads. Focus goes back to it when the panel closes, and the browser scrolls to it.
- Move the FAB and the panel to the start edge when a chat widget or a sticky button holds the end corner.
- Do not build your own switches for these modes. They would conflict with the saved settings. Link to the panel, or call `NDS.Accessibility.toggleMode()`.
- Write your own `--typo-*` tokens as `calc(value * var(--user-font-scale, 1))`, so Font Sizing scales them too.
- Check your own colors with High Contrast on, in light and dark mode. High Contrast swaps the semantic color tokens, so a color that does not use them stays the same.
- Do not offer the Deuteranopia filter as an aid. It shows what a visitor with deuteranopia sees, for design checks. Visitors get real correction from their device's color filters.

</div>
  </div>
</section>

<section id="accessibilityApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-accessibility-toggle` | the FAB | Names the FAB for your own CSS. NDS gives it no styles, and `nds-fab` docks it |
| `nds-accessibility-panel` | the panel `<aside>` | Fixes the panel's text sizes, so Font Sizing and the dyslexia font do not change the panel. Pair it with `nds-panel` |
| `nds-panel-template` | a `<template>` | Holds your own panel. See [Panels](../components/panels) |
| `nds-accessibility-modes` | the accordion in the panel | Sets the padding of the mode switches |
| `nds-accessibility-quick` | a row in the panel body | The row of quick buttons, such as the theme button |
| `nds-accessibility-tile-bars` | a span in a tile with levels | Holds the level bars. The script adds one `nds-accessibility-tile-bar` for each level |
| `nds-a11y-count` | a tag in an accordion title | Shows the number of controls that are on in that group. It hides while empty |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-accessibility-toggle` | the FAB, or any button outside the panel | The first press loads the script and builds the panel. Pair it with `data-panel-toggle` |
| `data-panel-toggle` | the same button | `="ndsAccessibilityPanel"`. Opens and closes the built panel and sets `aria-expanded`. See [Panels](../components/panels) |
| `data-panel-side` | every `data-accessibility-toggle` button | The edge the panel slides from: `end` (default), `start`, `left` or `right`. `start` and `end` flip with the text direction. The script copies it from the first button pressed onto the panel it builds |
| `data-fab-pos` | the FAB | The FAB's edge: `start`, `end`, `left`, `right` or `bottom`. `auto` docks at `end`. See [FAB](../components/fab) |
| `data-state~="loading"` | the pressed button | The script sets it while the panel loads, and removes it about one second later |
| `data-accessibility-panel` | the panel `<aside>` | Marks the panel. A panel already in the page is used instead of a template |
| `data-armed` | the panel `<aside>` | The script sets it when it builds the panel |
| `data-a11y-status` | a screen-reader `role="status"` element in the panel | The script writes each announcement in it |
| `data-a11y-count` | the count tag in an accordion title | `modes`, `readable` or `visual`. The script writes the group's count in it. It counts inside `#a11yModesCollapse`, `#a11yReadableCollapse` and `#a11yVisualCollapse`, so keep those ids |
| `data-a11y-count-sr` | a screen-reader span next to the tag | The same group names. The script writes the count as text for screen readers |
| `data-mode-id` | a mode switch container | The mode whose name and description the language file writes in it |
| `data-a11y-mode` | a mode switch input, or a tile button | The mode or token the control turns on and off: a name from Modes or from Tokens on `<html>` |
| `data-a11y-setting` | a tile button with levels | The setting the tile changes. The panel's values: `font-step` `0,1,2,3`, `text-align` `default,end,start,justify`, `line-height` `normal,1.6,1.8,2.0`, `letter-spacing` `0,0.04em,0.08em,0.12em`, `word-spacing` `0,0.16em,0.32em,0.48em` |
| `data-a11y-cycle` | the same tile button | The values a press steps through, separated by commas. The first value is the default |
| `data-a11y-bars` | a span in that tile | The script adds one bar for each value after the first |
| `data-a11y-value` | a screen-reader span in that tile | The script writes the current value in it |
| `data-a11y-visual` | a filter tile button | The filter the tile turns on. Turning it on turns the other filters off |
| `data-visual-id` | a filter tile button | The filter whose label the language file writes in it |
| `data-a11y-exclude-token` | a tile button | The script removes the tile when the language file lists this value in `exclude_controls`. The Arabic file lists `letter-spacing`, because letter spacing breaks Arabic's joined letters |
| `data-state~="selected"` | a tile button | The script sets it, with `aria-pressed="true"`, while the tile is on, and removes it when the tile turns off |
| `data-accessibility-action` | the reset button | `="reset"`. Two presses within 5 seconds reset every setting |
| `data-state~="arming"` | the reset button | The script sets it after the first press, and removes it after the second press or after 5 seconds |
| `data-a11y` | `<html>` | The script writes the tokens that are on, separated by spaces. See Tokens on `<html>` |
{: .nds-table .nds-responsive}

### Modes
{: .nds-block-title}

Pass the mode name to `toggleMode()`.

| Mode | Turns on | WCAG |
|---|---|---|
| `epilepsy-safe` | `reduce-motion`, `low-saturation` | 2.3.1 |
| `visually-impaired` | `high-contrast`, `font-step-2` | 1.4.6 |
| `cognitive-disability` | `highlight-titles`, `reduce-motion` | 2.2, 2.3 |
| `motor-impaired` | `motor-impaired` | 2.5.5 |
| `colorblind` | `cvd-deutan` | 1.4.1 |
| `dyslexia-friendly` | `dyslexia`, `highlight-links`, line height 1.6, letter spacing 0.12em, word spacing 0.16em | 1.4.8, 1.4.12 |
| `adhd-friendly` | `reduce-motion`, `highlight-titles`, `reading-mask` | 2.2, 2.3 |
{: .nds-table .nds-responsive}

### Tokens on `<html>`
{: .nds-block-title}

CSS reads these tokens with `[data-a11y~="…"]`. A mode writes the tokens of the settings it turns on, not its own name. Only Motor Impaired writes its own name.

| Token | Set by | Effect |
|---|---|---|
| `reduce-motion` | Pause Motion. The Epilepsy Safe, Cognitive Disability and ADHD Friendly modes. The device's reduced motion setting | Stops animations and transitions, and pauses autoplay video and audio once. Progress bars, progress rings and loading spinners keep moving |
| `high-contrast` | High Contrast. The Visually Impaired mode. The device's more contrast setting | Swaps the semantic color tokens for black on white, or white on black in dark mode |
| `boost-contrast` | Boost Contrast | `filter: contrast(1.15)` on the page |
| `monochrome` | Monochrome | `filter: grayscale(1)` on the page |
| `high-saturation` | High Saturation | `filter: saturate(2)` on the page |
| `low-saturation` | Low Saturation. The Epilepsy Safe mode | `filter: saturate(0.5)` on the page |
| `cvd-deutan` | Deuteranopia. The Colorblind mode | Shows the page as a visitor with deuteranopia sees it. It uses the color matrix of Chrome DevTools' vision deficiency emulation |
| `dyslexia` | Dyslexia Friendly. The Dyslexia Friendly mode | Changes the font to OpenDyslexic for Latin text and Maqroo for Arabic text, and sets body text to weight 500 |
| `highlight-titles` | Highlight Titles. The Cognitive Disability and ADHD Friendly modes | Outlines every heading in the warning colors |
| `highlight-links` | Highlight Links. The Dyslexia Friendly mode | Gives every link a dashed outline, and underlines text links |
| `reading-mask` | Reading Mask. The ADHD Friendly mode | Shows the reading mask at `z-index: 850`. A layer below that is dimmed with the page |
| `motor-impaired` | The Motor Impaired mode | Makes every button at least 48 × 48px |
| `font-step-1`, `font-step-2`, `font-step-3` | Font Sizing. The Visually Impaired mode sets step 2 | Sets `--user-font-scale` to 1.15, 1.30 or 1.50 |
| `text-align-start`, `text-align-end`, `text-align-justify` | Text Alignment | Aligns paragraphs and list items |
| `has-line-height`, `has-letter-spacing`, `has-word-spacing` | Line Height, Letter Spacing and Word Spacing. The Dyslexia Friendly mode sets 1.6, 0.12em and 0.16em, with no letter spacing on an Arabic page | Applies the matching `--user-*` value to paragraphs, lists and quotes |
{: .nds-table .nds-responsive}

The text and highlight rules reach only the page's `header`, `main` and `footer`, so the panel and the FAB keep their look.

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--user-font-scale` | `1` | The scale of every `--typo-*` token. The `font-step-*` tokens set it |
| `--user-line-height` | `normal` | The line height of body text. The script writes it on `<html>` |
| `--user-letter-spacing` | `0` | The letter spacing of body text. The script writes it on `<html>` |
| `--user-word-spacing` | `0` | The word spacing of body text. The script writes it on `<html>` |
{: .nds-table .nds-responsive}

The panel's width and top come from [Panels](../components/panels). The FAB's distance from the edge comes from [FAB](../components/fab).

### Reading Mask Keyboard
{: .nds-block-title}

| Key | Effect |
|---|---|
| `Arrow Up`, `Arrow Down` | Moves the band 20px. Focus must be on the move button in the mask toolbar |
| `Page Up`, `Page Down` | Moves the band 100px |
| `Home`, `End` | Moves the band to the top or the bottom of the screen |
| `Escape` | Turns the reading mask off, when the panel is closed |
{: .nds-table .nds-responsive}

The toolbar's size buttons change the band's height in 40px steps, from 40px to 320px.

### Removal
{: .nds-block-title}

To remove the panel from a page, delete its FAB and every other `data-accessibility-toggle` button. With none on the page, nothing of the panel loads, even for a visitor with saved settings.

### Text
{: .nds-block-title}

The panel reads its text from `assets/i18n/accessibility/en.json` and `ar.json`. To use your own text, set `window.NDS_I18N.accessibility` before the NDS scripts. It replaces the file, and a key it leaves out shows in English. Copy every key from `en.json`.

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Accessibility.open(trigger)` | Opens the panel. The first call builds it and shows the spinner on `trigger` |
| `NDS.Accessibility.close()` | Closes the panel |
| `NDS.Accessibility.toggle(trigger)` | Opens or closes the panel |
| `NDS.Accessibility.toggleMode(name)` | Turns a mode or a token on or off |
| `NDS.Accessibility.setVisualFilter(name)` | Turns on one filter and turns off the others. The same name again turns it off |
| `NDS.Accessibility.cycleSetting(key, values)` | Sets `key` to the value after its current one in `values` |
| `NDS.Accessibility.reset()` | Resets every setting at once, with no second press |
| `NDS.Accessibility.state` | A copy of the saved settings. Changing it changes nothing |
| `NDS.Accessibility.ready` | `true` once the panel is built and wired |
| `NDS.Accessibility.init(trigger)` | Builds and wires the panel. The first press calls it, so you rarely need it |
{: .nds-table .nds-responsive}

Before the script loads, `NDS.Accessibility` is a stub. A call to it loads the script, then runs. The component fires no events. Open the panel from a menu link:

<script type="text/html" id="a11y-js" data-canon data-lang="js">
document.getElementById('menu-a11y').addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation(); // the panel closes on an outside click
  NDS.Accessibility.open(e.currentTarget);
});
</script>

The full API is in the banner of `_js/nds-accessibility.js`.

</div>
  </div>
</section>
