---
layout: page
title: Buttons
hero_title: Button Components - National Design System
hero_description: A comprehensive collection of different button styles according to Figma specifications
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Button Types Overview -->
<section id="buttonTypesOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Six Button Types</h2>
            <p class="nds-section-description">All button types available in the National Design System</p>
        </div>
        <div class="nds-section-content">
            <div class="button-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Primary Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-btn", "indicator"]'>
                                <span class="label">Toggle Indicator</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-primary" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-primary" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-primary selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-primary focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-primary" disabled><span class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-primary-1" id="tab-primary-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-primary-1"
                                aria-labelledby="tab-primary-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary ">
                                      <span class="label">Primary Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "indicator"]'>
                                <span class="label">Toggle Indicator</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-neutral nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-neutral nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-neutral nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-neutral nds-demo selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-neutral nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-neutral nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-neutral-1" id="tab-neutral-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-neutral-1"
                                aria-labelledby="tab-neutral-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-neutral ">
                                      <span class="label">Neutral Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "indicator"]'>
                                <span class="label">Toggle Indicator</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-secondary nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-secondary nds-demo selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-secondary nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-secondary nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-secondary-1" id="tab-secondary-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-secondary-1"
                                aria-labelledby="tab-secondary-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary ">
                                      <span class="label">Secondary Button Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Outline</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "indicator"]'>
                                <span class="label">Toggle Indicator</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary-outline nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-secondary-outline nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary-outline nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-secondary-outline nds-demo selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-secondary-outline nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-secondary-outline nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-secondary-outline-1" id="tab-secondary-outline-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-secondary-outline-1"
                                aria-labelledby="tab-secondary-outline-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary-outline ">
                                      <span class="label">Secondary Outline Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Subtle Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "indicator"]'>
                                <span class="label">Toggle Indicator</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-subtle nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-subtle nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-subtle nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-subtle nds-demo selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-subtle nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-subtle nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-subtle-1" id="tab-subtle-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-subtle-1"
                                aria-labelledby="tab-subtle-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-subtle ">
                                      <span class="label">Subtle Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Transparent Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "indicator"]'>
                                <span class="label">Toggle Indicator</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-transparent nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-transparent nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-transparent nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-transparent nds-demo selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-transparent nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-transparent nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-transparent-1" id="tab-transparent-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-transparent-1"
                                aria-labelledby="tab-transparent-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-transparent ">
                                      <span class="label">Transparent Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="button-showcase oncolor-buttons">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Primary Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary nds-oncolor nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-demo selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-primary-oncolor-1" id="tab-primary-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-primary-oncolor-1"
                                aria-labelledby="tab-primary-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary nds-oncolor ">
                                      <span class="label">Primary Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-neutral nds-oncolor nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-neutral nds-oncolor nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-neutral nds-oncolor nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-neutral nds-oncolor nds-demo selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-neutral nds-oncolor nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-neutral nds-oncolor nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-neutral-oncolor-1" id="tab-neutral-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-neutral-oncolor-1"
                                aria-labelledby="tab-neutral-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-neutral nds-oncolor ">
                                      <span class="label">Neutral Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary nds-oncolor nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-demo selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-secondary-oncolor-1" id="tab-secondary-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-secondary-oncolor-1"
                                aria-labelledby="tab-secondary-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary nds-oncolor ">
                                      <span class="label">Secondary Button Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Outline On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-demo"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-demo selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-secondary-outline-oncolor-1"
                                    id="tab-secondary-outline-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel"
                                id="panel-secondary-outline-oncolor-1"
                                aria-labelledby="tab-secondary-outline-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary-outline nds-oncolor ">
                                      <span class="label">Secondary Outline Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Subtle Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-subtle nds-oncolor nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-demo selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-subtle-oncolor-1" id="tab-subtle-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-subtle-oncolor-1"
                                aria-labelledby="tab-subtle-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-subtle nds-oncolor ">
                                      <span class="label">Subtle Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Transparent Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-transparent nds-oncolor nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-demo selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-demo" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-transparent-oncolor-1" id="tab-transparent-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-transparent-oncolor-1"
                                aria-labelledby="tab-transparent-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-transparent nds-oncolor ">
                                      <span class="label">Transparent Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Destructive Buttons with States -->
<section id="buttonDestructive" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Destructive Buttons</h2>
            <p class="nds-section-description">Buttons for destructive actions like delete and cancel</p>
        </div>
        <div class="nds-section-content">
            <div class="button-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Primary</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary nds-destructive nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-primary nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-primary-1" id="tab-destructive-primary-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-destructive-primary-1"
                                aria-labelledby="tab-destructive-primary-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary nds-destructive ">
                                      <span class="label">Delete Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Secondary Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary nds-destructive nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-secondary nds-destructive nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary nds-destructive nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-secondary nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-secondary-1" id="tab-destructive-secondary-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-destructive-secondary-1"
                                aria-labelledby="tab-destructive-secondary-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary nds-destructive ">
                                      <span class="label">Delete Account</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Outline</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary-outline nds-destructive nds-demo"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-secondary-outline nds-destructive nds-demo"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary-outline nds-destructive nds-demo"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-secondary-outline nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-outline-1" id="tab-destructive-outline-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-destructive-outline-1"
                                aria-labelledby="tab-destructive-outline-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary-outline nds-destructive ">
                                      <span class="label">Remove Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Subtle</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-subtle nds-destructive nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-subtle nds-destructive nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-subtle nds-destructive nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-subtle nds-destructive nds-demo focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-subtle-1" id="tab-destructive-subtle-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-destructive-subtle-1"
                                aria-labelledby="tab-destructive-subtle-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-subtle nds-destructive ">
                                      <span class="label">Clear Data</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Transparent</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-transparent nds-destructive nds-demo" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-transparent nds-destructive nds-demo" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-transparent nds-destructive nds-demo" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-transparent nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-transparent-1" id="tab-destructive-transparent-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-destructive-transparent-1"
                                aria-labelledby="tab-destructive-transparent-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-transparent nds-destructive ">
                                      <span class="label">Cancel Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Background Switcher for On-Color Destructive Buttons -->

            <!-- On-Color Destructive Buttons with States -->
            <div class="button-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Primary On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary nds-oncolor nds-destructive nds-demo"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-destructive nds-demo"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-destructive nds-demo"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-primary nds-oncolor nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-primary-oncolor-1"
                                    id="tab-destructive-primary-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel"
                                id="panel-destructive-primary-oncolor-1"
                                aria-labelledby="tab-destructive-primary-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary nds-oncolor nds-destructive ">
                                      <span class="label">Delete Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Secondary Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary nds-oncolor nds-destructive nds-demo"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-destructive nds-demo"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-destructive nds-demo"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-secondary nds-oncolor nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-secondary-oncolor-1"
                                    id="tab-destructive-secondary-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel"
                                id="panel-destructive-secondary-oncolor-1"
                                aria-labelledby="tab-destructive-secondary-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary nds-oncolor nds-destructive ">
                                      <span class="label">Delete Account</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Outline On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-destructive nds-demo"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-destructive nds-demo"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-destructive nds-demo"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-secondary-outline nds-oncolor nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-outline-oncolor-1"
                                    id="tab-destructive-outline-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel"
                                id="panel-destructive-outline-oncolor-1"
                                aria-labelledby="tab-destructive-outline-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-secondary-outline nds-oncolor nds-destructive ">
                                      <span class="label">Remove Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Subtle On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-subtle nds-oncolor nds-destructive nds-demo"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-destructive nds-demo"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-destructive nds-demo"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-subtle nds-oncolor nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-subtle-oncolor-1"
                                    id="tab-destructive-subtle-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel"
                                id="panel-destructive-subtle-oncolor-1"
                                aria-labelledby="tab-destructive-subtle-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-subtle nds-oncolor nds-destructive ">
                                      <span class="label">Clear Data</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Transparent On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-transparent nds-oncolor nds-destructive nds-demo"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-destructive nds-demo"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-destructive nds-demo"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-transparent nds-oncolor nds-destructive nds-demo focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-destructive-transparent-oncolor-1"
                                    id="tab-destructive-transparent-oncolor-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel"
                                id="panel-destructive-transparent-oncolor-1"
                                aria-labelledby="tab-destructive-transparent-oncolor-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-transparent nds-oncolor nds-destructive ">
                                      <span class="label">Cancel Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Icon Buttons -->
<section id="buttonIcons" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Buttons with Icons</h2>
            <p class="nds-section-description">Buttons containing icons in different positions</p>
        </div>
        <div class="nds-section-content">
            <div class="button-showcase">
                <!-- Lead Icon -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Lead/Trail Icon (Icon + Text)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-trail-icon", ".nds-demo", "trailIcon"]'>
                                <span class="label">Trail icon</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-primary nds-demo nds-demo">
                            <i class="hgi hgi-stroke hgi-plus-sign"></i>
                            <span class="label">Add Item</span>
                        </button>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-icon-text-1" id="tab-icon-text-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-icon-text-1"
                                aria-labelledby="tab-icon-text-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary ">
                                      <i class="hgi hgi-stroke hgi-plus-sign"></i>
                                      <span class="label">Add Item</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Icon Only -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Icon Only Buttons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-circle", ".nds-btn", "CircleBtn"]'>
                                <span class="label">Circle</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-primary nds-icon-only nds-lg nds-demo" aria-label="Settings">
                            <i class="hgi hgi-stroke hgi-settings-02"></i>
                        </button>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-icon-only-1" id="tab-icon-only-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-icon-only-1"
                                aria-labelledby="tab-icon-only-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary nds-icon-only" aria-label="Settings">
                                      <i class="hgi hgi-stroke hgi-settings-02"></i>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- menu -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Menu Buttons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle nds-menu-btn demo-toggle-btn"
                                data-toggler='["nds-icon-only", ".nds-demo", "labelIconToggle"]'>
                                <span class="label">icon only</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-label-only", ".nds-demo", "labelIconToggle"]'>
                                <span class="label">label only</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-menu-btn nds-primary nds-demo" aria-label="Menu">
                            <i class="hgi hgi-stroke hgi-folder-library"></i>
                            <span class="label">Menu</span>
                        </button>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-menu-primary-1" id="tab-menu-primary-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-menu-primary-1"
                                aria-labelledby="tab-menu-primary-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary nds-menu-btn" aria-label="Menu">
                                      <i class="hgi hgi-stroke hgi-folder-library"></i>
                                      <span class="label">Menu</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Button Sizes -->
<section id="buttonSizes" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Button Sizes</h2>
            <p class="nds-section-description">Four sizes: Small (24px), Medium (32px), Large (40px), Extra Large (48px)
            </p>
        </div>
        <div class="nds-section-content">
            <div class="button-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Default Large (40px)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-demo", "sizeToggle"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-lg", ".nds-demo", "sizeToggle"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-demo", "sizeToggle"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-demo", "sizeToggle"]'>
                                <span class="label">SM</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-primary nds-demo"><span class="label">Primary
                                Button</span></button>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-size-1" id="tab-size-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-size-1"
                                aria-labelledby="tab-size-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary">
                                      <span class="label">Primary Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Full Width Primary</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-primary nds-full"><span class="label">Full
                                Width Primary Button</span></button>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-full-width-1" id="tab-full-width-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-full-width-1"
                                aria-labelledby="tab-full-width-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary nds-full">
                                      <span class="label">Full Width Primary Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- Button Group -->
<section id="buttonSizes" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Button Group</h2>
            <p class="nds-section-description">Group multiple buttons together in a horizontal layout with consistent
                spacing and alignment. Button groups support all button sizes and variants.
            </p>
        </div>
        <div class="nds-section-content">
            <div class="button-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Button Group</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-indicator", ".nds-demo", "indicator"]'>
                                <span class="label">Toggle Indicator</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-demo", "sizeToggle"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-lg", ".nds-demo", "sizeToggle"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-demo", "sizeToggle"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-demo", "sizeToggle"]'>
                                <span class="label">SM</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-btn-group nds-center">
                            <button class="nds-btn nds-primary nds-demo"><span class="label">Button</span></button>
                            <button class="nds-btn nds-primary nds-demo"><span class="label">Button</span></button>
                            <button class="nds-btn nds-primary nds-demo"><span class="label">Button</span></button>
                            <button class="nds-btn nds-primary nds-demo"><span class="label">Button</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-size-1" id="tab-size-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-size-1"
                                aria-labelledby="tab-size-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <div class="nds-btn-group nds-center">
                                        <button class="nds-btn nds-primary"><span class="label">Button</span></button>
                                        <button class="nds-btn nds-primary"><span class="label">Button</span></button>
                                        <button class="nds-btn nds-primary"><span class="label">Button</span></button>
                                        <button class="nds-btn nds-primary"><span class="label">Button</span></button>
                                    </div>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- Loading State -->
<section id="buttonLoading" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Loading State</h2>
            <p class="nds-section-description">Buttons in loading state with spinning indicator</p>
        </div>
        <div class="nds-section-content">
            <div class="button-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Loading States</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-demo", "sizeToggle"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-lg", ".nds-demo", "sizeToggle"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-demo", "sizeToggle"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-demo", "sizeToggle"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="button-row">
                            <button class="nds-btn nds-primary nds-demo nds-loading"><span class="label">Loading
                                    Button</span></button>
                            <button class="nds-btn nds-secondary nds-demo nds-loading"><span class="label">Processing
                                    Button</span></button>
                            <button class="nds-btn nds-transparent nds-demo nds-loading"><span class="label">Saving
                                    Button</span></button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-loading-1" id="tab-loading-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                                <button class="nds-btn nds-subtle nds-tab showMore"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 toggleArrow icon"></i>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-loading-1"
                                aria-labelledby="tab-loading-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
                                    <button class="nds-btn nds-primary nds-loading">
                                      <span class="label">Loading Button</span>
                                    </button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Button Progress States -->
<section id="buttonProgress" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Button Progress States</h2>
            <p class="nds-section-description">Buttons can show circular progress indicators using the progress-circle
                component. Supports both animated countdown (--progress-duration) and static percentage
                (--progress-value)</p>
        </div>
        <div class="nds-section-content">
            <div class="tag-showcase">
                <!-- Progress Buttons -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Animated Progress (Duration)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-progress", "progressSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-progress", "progressSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-progress", "progressSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-circle", ".nds-progress", "progressCircle"]'>
                                <span class="label">Circle</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-action-btn"
                                data-action="reset-progress-duration">
                                <span class="label">Reset Duration</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="button-row">
                            <button class="nds-btn nds-primary nds-icon-only nds-progress nds-md"
                                style="--progress-duration: 4000ms;" aria-label="Close">
                                <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                <div class="nds-progress-circle" hidden>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24">
                                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2">
                                        </circle>
                                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round">
                                        </circle>
                                    </svg>
                                </div>
                            </button>
                            <button class="nds-btn nds-subtle nds-icon-only nds-progress nds-md"
                                style="--progress-duration: 5000ms;" aria-label="Close">
                                <i class="hgi hgi-stroke hgi-cancel-01"></i>
                                <div class="nds-progress-circle" hidden>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24">
                                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2">
                                        </circle>
                                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round">
                                        </circle>
                                    </svg>
                                </div>
                            </button>
                            <button class="nds-btn nds-neutral nds-icon-only nds-progress nds-md"
                                style="--progress-duration: 6000ms;" aria-label="Delete">
                                <i class="hgi hgi-stroke hgi-trash-01"></i>
                                <div class="nds-progress-circle" hidden>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24">
                                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2">
                                        </circle>
                                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round">
                                        </circle>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist"
                                aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-progress-bar-1" id="tab-progress-bar-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-progress-bar-1"
                                aria-labelledby="tab-progress-bar-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<!-- Progress button with circle indicator -->
<button class="nds-btn nds-primary nds-icon-only nds-progress"
        style="--progress-duration: 4000ms;"
        aria-label="Close">
  <i class="hgi hgi-stroke hgi-cancel-01"></i>
  <div class="nds-progress-circle" hidden>
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
      <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
              stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
    </svg>
  </div>
</button>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Static Progress Value -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Static Progress (Value)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-progress-static", "progressStaticSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-md", ".nds-progress-static", "progressStaticSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-progress-static", "progressStaticSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-circle", ".nds-progress-static", "progressStaticCircle"]'>
                                <span class="label">Circle</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-action-btn"
                                data-action="random-progress-value">
                                <span class="label">Random Value</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="button-row">
                            <button class="nds-btn nds-primary nds-icon-only nds-progress nds-progress-static nds-md"
                                style="--progress-value: 25;" aria-label="Upload">
                                <i class="hgi hgi-stroke hgi-upload-02"></i>
                                <div class="nds-progress-circle" hidden>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24">
                                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2">
                                        </circle>
                                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round">
                                        </circle>
                                    </svg>
                                </div>
                            </button>
                            <button class="nds-btn nds-subtle nds-icon-only nds-progress nds-progress-static nds-md"
                                style="--progress-value: 50;" aria-label="Download">
                                <i class="hgi hgi-stroke hgi-download-02"></i>
                                <div class="nds-progress-circle" hidden>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24">
                                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2">
                                        </circle>
                                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round">
                                        </circle>
                                    </svg>
                                </div>
                            </button>
                            <button class="nds-btn nds-neutral nds-icon-only nds-progress nds-progress-static nds-md"
                                style="--progress-value: 75;" aria-label="Processing">
                                <i class="hgi hgi-stroke hgi-refresh-ccw-02"></i>
                                <div class="nds-progress-circle" hidden>
                                    <svg width="100%" height="100%" viewBox="0 0 24 24">
                                        <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2">
                                        </circle>
                                        <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round">
                                        </circle>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist"
                                aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-progress-value-1" id="tab-progress-value-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-progress-value-1"
                                aria-labelledby="tab-progress-value-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<!-- Progress button with static value (25%) -->
<button class="nds-btn nds-primary nds-icon-only nds-progress"
        style="--progress-value: 25;"
        aria-label="Upload">
  <i class="hgi hgi-stroke hgi-upload-02"></i>
  <div class="nds-progress-circle" hidden>
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <circle class="progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
      <circle class="progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="2"
              stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
    </svg>
  </div>
</button>

<!-- Update progress dynamically with JavaScript -->
<script>
    const button = document.querySelector('.nds-progress');
    button.style.setProperty('--progress-value', 50); // Update to 50%
</script>
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>