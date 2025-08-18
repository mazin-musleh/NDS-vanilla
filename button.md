---
layout: page
title: Buttons
hero_title: Button Components - National Design System
hero_description: A comprehensive collection of different button styles according to Figma specifications
hero_image: /assets/img/sliderShapeGray.svg
breadcrumb: ["Components", "Buttons"]
lang: en
direction: ltr
---

<!-- Button Types Overview -->
<section id="buttonTypesOverview" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">Six Button Types</h2>
            <p class="desc">All button types available in the National Design System</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Primary Button</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                        <button class="nds-btn nds-btn-primary nds-btn-lg" disabled><span class="label">Disabled</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;&lt;span class="label"&gt;Primary Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Neutral Button</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" disabled><span class="label">Disabled</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-neutral nds-btn-lg"&gt;&lt;span class="label"&gt;Neutral Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Solid</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" disabled><span class="label">Disabled</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg"&gt;&lt;span class="label"&gt;Secondary Solid Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Outline</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" disabled><span class="label">Disabled</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-lg"&gt;&lt;span class="label"&gt;Secondary Outline Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Subtle Button</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" disabled><span class="label">Disabled</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-lg"&gt;&lt;span class="label"&gt;Subtle Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Transparent Button</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" disabled><span class="label">Disabled</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-lg"&gt;&lt;span class="label"&gt;Transparent Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
            </div>

            <div class="sectionContent">
                <div class="showcase-bgcolor-switcher">
                    <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="default"><span class="label">Green background</span></button>
                    <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="default"><span class="label">Black background</span></button>
                </div>
                <div class="button-showcase bgcolor-switch dark-bg ">
                    <div class="button-card">
                        <div class="button-label">Primary Button</div>
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" disabled><span class="label">Disabled</span></button>
                        </div>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg"&gt;&lt;span class="label"&gt;Primary Button&lt;/span&gt;&lt;/button&gt;</code>
                        </div>
                    </div>
                    <div class="button-card">
                        <div class="button-label">Neutral Button</div>
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" disabled><span class="label">Disabled</span></button>
                        </div>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg"&gt;&lt;span class="label"&gt;Neutral Button&lt;/span&gt;&lt;/button&gt;</code>
                        </div>
                    </div>
                    <div class="button-card">
                        <div class="button-label">Secondary Solid</div>
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" disabled><span class="label">Disabled</span></button>
                        </div>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg"&gt;&lt;span class="label"&gt;Secondary Solid Button&lt;/span&gt;&lt;/button&gt;</code>
                        </div>
                    </div>
                    <div class="button-card">
                        <div class="button-label">Secondary Outline</div>
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" disabled><span class="label">Disabled</span></button>
                        </div>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg"&gt;&lt;span class="label"&gt;Secondary Outline Button&lt;/span&gt;&lt;/button&gt;</code>
                        </div>
                    </div>
                    <div class="button-card">
                        <div class="button-label">Subtle Button</div>
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" disabled><span class="label">Disabled</span></button>
                        </div>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg"&gt;&lt;span class="label"&gt;Subtle Button&lt;/span&gt;&lt;/button&gt;</code>
                        </div>
                    </div>
                    <div class="button-card">
                        <div class="button-label">Transparent Button</div>
                        <div class="state-demo">
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                            <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" disabled><span class="label">Disabled</span></button>
                        </div>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg"&gt;&lt;span class="label"&gt;Transparent Button&lt;/span&gt;&lt;/button&gt;</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Destructive Buttons with States -->
<section id="buttonDestructive" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">Destructive Buttons</h2>
            <p class="desc">Buttons for destructive actions like delete and cancel</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Destructive Primary</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Delete Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Secondary Solid</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Delete Account&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Outline</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Remove Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Subtle</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Clear Data&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Transparent</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Cancel Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
            </div>

            <!-- Background Switcher for On-Color Destructive Buttons -->
            <div class="showcase-bgcolor-switcher">
                <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="default"><span class="label">Green background</span></button>
                <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="default"><span class="label">Black background</span></button>
            </div>

            <!-- On-Color Destructive Buttons with States -->
            <div class="button-showcase bgcolor-switch dark-bg">
                <div class="button-card">
                    <div class="button-label">Destructive Primary On-Color</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Delete Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Secondary Solid On-Color</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Delete Account&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Outline On-Color</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Remove Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Subtle On-Color</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Clear Data&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <div class="button-card">
                    <div class="button-label">Destructive Transparent On-Color</div>
                    <div class="state-demo">
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="default"><span class="label">Default</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="hover"><span class="label">Hover</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg" data-state="active"><span class="label">Active</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-destructive nds-btn-lg"&gt;&lt;span class="label"&gt;Cancel Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Icon Buttons -->
<section id="buttonIcons" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">Buttons with Icons</h2>
            <p class="desc">Buttons containing icons in different positions</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <!-- Lead Icon -->
                <div class="button-card">
                    <div class="button-label">Lead Icon (Icon + Text)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg">
                        <i class="hgi hgi-stroke hgi-plus-sign"></i>
                        <span class="label">Add Item</span>
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;&lt;i class="hgi hgi-stroke hgi-plus-sign"&gt;&lt;/i&gt;&lt;span class="label"&gt;Add Item&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <!-- Trail Icon -->
                <div class="button-card">
                    <div class="button-label">Trail Icon (Text + Icon)</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-lg nds-btn-trail-icon">
                        <i class="hgi hgi-stroke hgi-download-02"></i>
                        <span class="label">Download</span>
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg nds-btn-trail-icon"&gt;&lt;i class="hgi hgi-stroke hgi-download-01"&gt;&lt;/i&gt;&lt;span class="label"&gt;Download&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <!-- Icon Only -->
                <div class="button-card">
                    <div class="button-label">Icon Only Buttons</div>
                    <button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-lg" aria-label="Settings">
                        <i class="hgi hgi-stroke hgi-settings-02"></i>
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-lg" aria-label="Settings"&gt;&lt;i class="hgi hgi-stroke hgi-settings-02"&gt;&lt;/i&gt;&lt;/button&gt;</code>
                    </div>
                </div>

                <!-- menu -->
                <div class="button-card">
                    <div class="button-label">Menu Buttons</div>
                    <button class="nds-btn nds-btn-menu nds-btn-primary nds-btn-icon-only nds-btn-lg" aria-label="Settings">
                        <i class="hgi hgi-stroke hgi-folder-library"></i>
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-lg" aria-label="Menu"&gt;&lt;i class="hgi hgi-stroke hgi-folder-library"&gt;&lt;/i&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <!-- menu with Label -->
                <div class="button-card">
                    <div class="button-label">Menu Buttons</div>
                    <button class="nds-btn nds-btn-menu nds-btn-primary nds-btn-lg" aria-label="Settings">
                        <i class="hgi hgi-stroke hgi-folder-library"></i>
                        <span class="label">Menu</span>
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg" aria-label="Menu"&gt;&lt;i class="hgi hgi-stroke hgi-folder-library"&gt;&lt;/i&gt;&lt;span class="label"&gt;Menu&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Button Sizes -->
<section id="buttonSizes" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">Button Sizes</h2>
            <p class="desc">Four sizes: Small (24px), Medium (32px), Large (40px)</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Small (24px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-sm"><span class="label">Small Button</span></button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-sm"&gt;&lt;span class="label"&gt;Small Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Medium (32px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-md"><span class="label">Medium Button</span></button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-md"&gt;&lt;span class="label"&gt;Medium Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Large (40px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg"><span class="label">Large Button</span></button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;&lt;span class="label"&gt;Large Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Full Width Primary</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg nds-btn-full"><span class="label">Full Width Primary Button</span></button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg nds-btn-full"&gt;&lt;span class="label"&gt;Full Width Primary Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Loading State -->
<section id="buttonLoading" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">Loading State</h2>
            <p class="desc">Buttons in loading state with spinning indicator</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Loading States</div>
                    <div class="button-row">
                        <button class="nds-btn nds-btn-primary nds-btn-loading nds-btn-lg"><span class="label">Loading Button</span></button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-loading nds-btn-lg"><span class="label">Processing Button</span></button>
                        <button class="nds-btn nds-btn-transparent nds-btn-loading nds-btn-lg"><span class="label">Saving Button</span></button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-loading nds-btn-lg"&gt;&lt;span class="label"&gt;Loading Button&lt;/span&gt;&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>

    // Function to initialize a single switcher
    function initializeSwitcher(switcherElement) {
        // Find the target element - closest .bgcolor-switch to this switcher
        const targetElement = switcherElement.closest('.bgcolor-switch') ||
            switcherElement.parentElement.querySelector('.bgcolor-switch');

        // Get both buttons within this specific switcher
        const greenBtn = switcherElement.querySelector('button:first-child');
        const blackBtn = switcherElement.querySelector('button:last-child');

        // Function to set background color for this specific target
        function setBackgroundColor(color) {
            if (color === 'green') {
                targetElement.classList.remove('black-bg');
                targetElement.classList.add('green-bg');
            } else if (color === 'black') {
                targetElement.classList.remove('green-bg');
                targetElement.classList.add('black-bg');
            }
        }

        // Add click event listeners for this switcher
        greenBtn.addEventListener('click', () => {
            setBackgroundColor('green');
        });

        blackBtn.addEventListener('click', () => {
            setBackgroundColor('black');
        });

        // Initialize with green as default
        setBackgroundColor('green');
    }

    // Initialize all switchers on the page
    function initializeAllSwitchers() {
        const allSwitchers = document.querySelectorAll('.showcase-bgcolor-switcher');
        allSwitchers.forEach(switcher => {
            initializeSwitcher(switcher);
        });
    }

    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAllSwitchers);
    } else {
        initializeAllSwitchers();
    }
    // Button interaction functionality
    document.addEventListener('DOMContentLoaded', function () {

        // Copy to clipboard functionality
        window.copyButtonHTML = function (button) {
            const buttonCard = button.closest('.button-card');
            const codeElement = buttonCard.querySelector('code');

            // Get the clean HTML from the code element
            const htmlToCopy = codeElement.textContent;

            navigator.clipboard.writeText(htmlToCopy).then(function () {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>';
                button.classList.add('copied');

                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(function (err) {
                console.error('Failed to copy HTML: ', err);
            });
        };
    });
</script>