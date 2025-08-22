---
layout: page
title: Buttons
hero_title: Button Components - National Design System
hero_description: A comprehensive collection of different button styles according to Figma specifications
breadcrumb: ["Components", "Buttons"]
lang: en
direction: ltr
---

<!-- Button Types Overview -->
<section id="buttonTypesOverview" class="nds-content-section">
    <div class="nds-section-content-container">
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
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-lg selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-lg focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;
  &lt;span class="label"&gt;Primary Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-lg selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-lg focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-neutral nds-btn-lg"&gt;
  &lt;span class="label"&gt;Neutral Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary nds-btn-lg" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-lg focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary nds-btn-lg"&gt;
  &lt;span class="label"&gt;Secondary Button Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Outline</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-lg"&gt;
  &lt;span class="label"&gt;Secondary Outline Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Subtle Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-lg selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-lg focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-lg"&gt;
  &lt;span class="label"&gt;Subtle Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Transparent Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-lg selected" data-state="selected"><span
                                    class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-lg focus" data-state="focused"><span
                                    class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-lg"&gt;
  &lt;span class="label"&gt;Transparent Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
            </div>

            <div class="button-showcase oncolor-buttons">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Primary Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg"&gt;
  &lt;span class="label"&gt;Primary Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Neutral Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg"&gt;
  &lt;span class="label"&gt;Neutral Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-lg"&gt;
  &lt;span class="label"&gt;Secondary Button Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Secondary Outline On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg"&gt;
  &lt;span class="label"&gt;Secondary Outline Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Subtle Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="default"><span
                                    class="label">Default</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="hover"><span
                                    class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="active"><span
                                    class="label">Active</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg"&gt;
  &lt;span class="label"&gt;Subtle Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Transparent Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg selected"
                                data-state="selected"><span class="label">Selected</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" disabled><span
                                    class="label">Disabled</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg"&gt;
  &lt;span class="label"&gt;Transparent Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Destructive Buttons with States -->
<section id="buttonDestructive" class="nds-content-section">
    <div class="nds-section-content-container">
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
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Delete Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Secondary Button</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Delete Account&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Outline</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Remove Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Subtle</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Clear Data&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Transparent</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Cancel Button&lt;/span&gt;
&lt;/button&gt;</code>
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

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Delete Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Secondary Button On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button
                                class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button
                                class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button
                                class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button
                                class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Delete Account&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Outline On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button
                                class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button
                                class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button
                                class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button
                                class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Remove Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Subtle On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Clear Data&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Destructive Transparent On-Color</div>
                        <div class="demo-action">

                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["black-bg", ".demo-container", "containerBg"]'>
                                <span class="label">Black</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container dark-bg">
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg"
                                data-state="active"><span class="label">Active</span></button>
                            <button
                                class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg focus"
                                data-state="focused"><span class="label">Focused</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;
  &lt;span class="label"&gt;Cancel Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Icon Buttons -->
<section id="buttonIcons" class="nds-content-section">
    <div class="nds-section-content-container">
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
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["nds-btn-trail-icon", ".nds-btn-demo", "trailIcon"]'>
                                <span class="label">Trail icon</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-btn-primary nds-btn-demo nds-btn-lg">
                            <i class="hgi hgi-stroke hgi-plus-sign"></i>
                            <span class="label">Add Item</span>
                        </button>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;
  &lt;i class="hgi hgi-stroke hgi-plus-sign"&gt;&lt;/i&gt;
  &lt;span class="label"&gt;Add Item&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <!-- Icon Only -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Icon Only Buttons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-lg" aria-label="Settings">
                            <i class="hgi hgi-stroke hgi-settings-02"></i>
                        </button>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-lg" aria-label="Settings"&gt;
  &lt;i class="hgi hgi-stroke hgi-settings-02"&gt;&lt;/i&gt;
&lt;/button&gt;</code>
                    </div>
                </div>

                <!-- menu -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Menu Buttons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["nds-btn-icon-only", ".nds-btn-demo", "labelIconToggle"]'>
                                <span class="label">icon only</span>
                            </button>
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["nds-btn-label-only", ".nds-btn-demo", "labelIconToggle"]'>
                                <span class="label">label only</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-btn-menu nds-btn-primary nds-btn-demo nds-btn-lg" aria-label="Menu">
                            <i class="hgi hgi-stroke hgi-folder-library"></i>
                            <span class="label">Menu</span>
                        </button>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg" aria-label="Menu"&gt;
  &lt;i class="hgi hgi-stroke hgi-folder-library"&gt;&lt;/i&gt;
  &lt;span class="label"&gt;Menu&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <!-- menu with Label -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Menu Buttons</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-btn-menu nds-btn-primary nds-btn-lg" aria-label="Menu">
                            <i class="hgi hgi-stroke hgi-folder-library"></i>
                            <span class="label">Menu</span>
                        </button>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg" aria-label="Menu"&gt;
  &lt;i class="hgi hgi-stroke hgi-folder-library"&gt;&lt;/i&gt;
  &lt;span class="label"&gt;Menu&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Button Sizes -->
<section id="buttonSizes" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Button Sizes</h2>
            <p class="nds-section-description">Four sizes: Small (24px), Medium (32px), Large (40px)</p>
        </div>
        <div class="nds-section-content">
            <div class="button-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Default Large (40px)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn selected"
                                data-toggler='["nds-btn-lg", ".nds-btn-demo", "sizeToggle"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["nds-btn-md", ".nds-btn-demo", "sizeToggle"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["nds-btn-sm", ".nds-btn-demo", "sizeToggle"]'>
                                <span class="label">SM</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-btn-primary nds-btn-demo nds-btn-lg"><span class="label">Primary
                                Button</span></button>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-sm"&gt;
  &lt;span class="label"&gt;Small Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Full Width Primary</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <button class="nds-btn nds-btn-primary nds-btn-lg nds-btn-full"><span class="label">Full
                                Width Primary Button</span></button>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg nds-btn-full"&gt;
  &lt;span class="label"&gt;Full Width Primary Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Loading State -->
<section id="buttonLoading" class="nds-content-section">
    <div class="nds-section-content-container">
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
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn selected"
                                data-toggler='["nds-btn-lg", ".nds-btn-demo", "sizeToggle"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["nds-btn-md", ".nds-btn-demo", "sizeToggle"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["nds-btn-sm", ".nds-btn-demo", "sizeToggle"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-btn-sm nds-btn-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="button-row">
                            <button class="nds-btn nds-btn-primary nds-btn-demo nds-btn-loading nds-btn-lg"><span
                                    class="label">Loading Button</span></button>
                            <button class="nds-btn nds-btn-secondary nds-btn-demo nds-btn-loading nds-btn-lg"><span
                                    class="label">Processing Button</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-demo nds-btn-loading nds-btn-lg"><span
                                    class="label">Saving Button</span></button>
                        </div>
                    </div>
                    <div class="code-example">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-loading nds-btn-lg"&gt;
  &lt;span class="label"&gt;Loading Button&lt;/span&gt;
&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>