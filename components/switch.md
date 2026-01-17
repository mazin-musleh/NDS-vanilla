---
layout: page
title: Switch
hero_title: Switch - National Design System
hero_description: Toggle switches for binary choices with clear visual feedback and accessibility support
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Switch Overview -->
<section id="switchOverview" class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Switch Component</h2>
      <p class="nds-section-description">
        Binary toggle switches for enabling and disabling options with visual feedback
      </p>
    </div>
    <div class="nds-section-content">
      <div class="form-showcase">

        <!-- Single Switch -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Single Switch</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-md", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-neutral", ".nds-switch", "variantToggle"]'>
                <span class="label">Neutral</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input.nds-switch-input", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <div class="nds-form-container nds-switch-container">
                <div class="nds-form-header">
                  <label for="demo-switch-single">
                    <span class="label">Enable notifications</span>
                    <span class="info">Receive push notifications for important updates</span>
                  </label>
                </div>
                <div class="nds-form-control">
                  <div class="nds-switch">
                    <input type="checkbox" id="demo-switch-single" name="notifications" value="enabled"
                      class="nds-switch-input">
                    <div class="nds-switch-track">
                      <div class="nds-switch-thumb"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nds-tabs nds-code nds-divided">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-switch-single-1" id="tab-switch-single-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-switch-single-1"
                aria-labelledby="tab-switch-single-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
                <div class="nds-form-container nds-switch-container">
                  <div class="nds-form-header">
                    <label for="switch-single">
                      <span class="label">Enable notifications</span>
                      <span class="info">Receive push notifications for important updates</span>
                    </label>
                  </div>
                  <div class="nds-form-control">
                    <div class="nds-switch">
                      <input type="checkbox" id="switch-single" name="notifications" value="enabled" class="nds-switch-input">
                      <div class="nds-switch-track">
                        <div class="nds-switch-thumb"></div>
                      </div>
                    </div>
                  </div>
                </div>
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Multiple Switch Group -->
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Switch Group</div>
            <div class="demo-action">
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-lg", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">LG</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                data-toggler='["nds-md", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">MD</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["nds-sm", ".nds-switch-container", "sizeToggle"]'>
                <span class="label">SM</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["disabled", "input.nds-switch-input", "stateToggle", "attr"]'>
                <span class="label">Disabled</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["rowView", ".nds-switch-group", "layoutToggle"]'>
                <span class="label">RowView</span>
              </button>
              <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                <span class="label">Remove bg</span>
              </button>
            </div>
          </div>
          <div class="demo-container">
            <div class="state-demo">
              <fieldset>
                <legend class="label">Switch Group</legend>
                <div class="nds-switch-group">
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="switch1">
                        <span class="label">Neutral Switch</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch nds-neutral">
                        <input type="checkbox" id="switch1" name="switchGroup" value="option1" class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="switch2">
                        <span class="label">Primary Switch</span>
                        <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch">
                        <input type="checkbox" id="switch2" name="switchGroup" value="option2" checked
                          class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="nds-form-container nds-switch-container">
                    <div class="nds-form-header">
                      <label for="switch3">
                        <span class="label">Disabled Switch</span>
                      </label>
                    </div>
                    <div class="nds-form-control">
                      <div class="nds-switch disabled">
                        <input type="checkbox" id="switch3" name="switchGroup" value="option3" disabled
                          class="nds-switch-input">
                        <div class="nds-switch-track">
                          <div class="nds-switch-thumb"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="nds-tabs nds-code nds-divided">
            <div class="nds-tab-list-container">
              <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                  aria-controls="panel-switch-1" id="tab-switch-1">
                  <span class="nds-tab-label">HTML</span>
                </button>
                <button class="nds-btn nds-subtle nds-tab showMore"><i
                    class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                </button>
              </nav>
            </div>
            <div class="nds-tab-content">
              <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-switch-1"
                aria-labelledby="tab-switch-1">
                <div class="nds-code-action">
                  <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                  </button>
                </div>
                <div class="nds-expandable-content">
                  <code class="lang-html code">
                  <fieldset class="nds-switch-group">
                    <legend class="label">Switch Group</legend>
                    <div class="nds-form-container nds-switch-container">
                      <div class="nds-form-header">
                        <label for="switch1">
                          <span class="label">Neutral Switch</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <div class="nds-switch">
                          <input type="checkbox" id="switch1" name="switchGroup" value="option1" class="nds-switch-input">
                          <div class="nds-switch-track">
                            <div class="nds-switch-thumb"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="nds-form-container nds-switch-container">
                      <div class="nds-form-header">
                        <label for="switch2">
                          <span class="label">Primary Switch</span>
                          <span class="info">When a selection needs a further detailed explanation, it goes here.</span>
                        </label>
                      </div>
                      <div class="nds-form-control">
                        <div class="nds-switch primary">
                          <input type="checkbox" id="switch2" name="switchGroup" value="option2" checked class="nds-switch-input">
                          <div class="nds-switch-track">
                            <div class="nds-switch-thumb"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                    </code>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>