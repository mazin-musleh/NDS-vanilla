---
layout: page
title: الأزرار
hero_title: مكونات الأزرار - نظام التصميم الموحد
hero_description: مجموعة شاملة من أنماط الأزرار المختلفة وفقاً لمواصفات Figma
hero_image: /assets/img/sliderShapeGray.svg
breadcrumb: ["المكونات", "الأزرار"]
lang: ar
direction: rtl
---

<!-- Button Types Overview -->
<section id="buttonTypesOverview" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">الأنواع الستة للأزرار</h2>
            <p class="desc">جميع أنواع الأزرار المتاحة في نظام التصميم الموحد</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Primary Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-primary nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;Primary Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Neutral Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-neutral.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-neutral nds-btn-lg"&gt;Neutral Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Solid</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-solid.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg"&gt;Secondary Solid Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Outline</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-lg"&gt;Secondary Outline Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Subtle Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-subtle.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-lg"&gt;Subtle Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Transparent Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-transparent.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-lg"&gt;Transparent Button&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- On-color Buttons -->
<section id="buttonOnColor" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">جميع أنواع الأزرار على الخلفيات الملونة</h2>
            <p class="desc">عرض شامل لجميع أنواع الأزرار بحالاتها المختلفة على الخلفيات الداكنة</p>
        </div>
        <div class="sectionContent">
            <div class="showcase-color-switcher">
                <button class="nds-btn nds-btn-primary nds-btn-lg" data-state="default">Green background</button>
                <button class="nds-btn nds-btn-neutral nds-btn-lg" data-state="default">Black background</button>
            </div>
            <div class="button-showcase dark-bg">
                <div class="button-card">
                    <div class="button-label">Primary Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;Primary Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Neutral Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-oncolor nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-neutral.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-neutral nds-btn-lg"&gt;Neutral Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Solid</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-oncolor nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-solid.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg"&gt;Secondary Solid Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Outline</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-lg"&gt;Secondary Outline Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Subtle Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-oncolor nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-subtle.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-lg"&gt;Subtle Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Transparent Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" data-state="default">Default</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" data-state="hover">Hover</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" data-state="active">Active</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-lg" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-transparent.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-lg"&gt;Transparent Button&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Destructive Buttons -->
<section id="buttonDestructive" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">الأزرار التدميرية</h2>
            <p class="desc">أزرار للإجراءات التدميرية مثل الحذف والإلغاء</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Destructive Primary</div>
                    <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg">Delete Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-destructive.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-lg"&gt;Delete Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Outline</div>
                    <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg">Remove Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-destructive.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-lg"&gt;Remove Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Transparent</div>
                    <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg">Cancel Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-lg"&gt;Cancel Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Secondary Solid</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-destructive nds-btn-lg">Delete Account</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-destructive nds-btn-lg"&gt;Delete Account&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Subtle</div>
                    <button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg">Clear Data</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-destructive nds-btn-lg"&gt;Clear Data&lt;/button&gt;</code>
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
            <h2 class="title">أزرار مع الأيقونات</h2>
            <p class="desc">أزرار تحتوي على أيقونات بمواضع مختلفة</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <!-- Lead Icon -->
                <div class="button-card">
                    <div class="button-label">Lead Icon (Icon + Text)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg">
                        <i class="hgi hgi-stroke hgi-plus-sign"></i>
                        Add Item
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;&lt;i class="hgi hgi-stroke hgi-plus-sign"&gt;&lt;/i&gt;Add Item&lt;/button&gt;</code>
                    </div>
                </div>
                
                <!-- Trail Icon -->
                <div class="button-card">
                    <div class="button-label">Trail Icon (Text + Icon)</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-lg nds-btn-trail-icon">
                        <i class="hgi hgi-stroke hgi-download-01"></i>
                        Download
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-solid.nds-btn-lg.nds-btn-trail-icon">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg nds-btn-trail-icon"&gt;&lt;i class="hgi hgi-stroke hgi-download-01"&gt;&lt;/i&gt;Download&lt;/button&gt;</code>
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
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-icon-only.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-lg" aria-label="Settings"&gt;&lt;i class="hgi hgi-stroke hgi-settings-02"&gt;&lt;/i&gt;&lt;/button&gt;</code>
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
            <h2 class="title">أحجام الأزرار</h2>
            <p class="desc">أربعة أحجام: صغير (24px)، متوسط (32px)، كبير (40px)</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase" style="grid-template-columns: repeat(4, 1fr);">
                <div class="button-card">
                    <div class="button-label">Small (24px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-sm">Small Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-sm">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-sm"&gt;Small Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Medium (32px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg">Medium Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;Medium Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Large (40px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg">Large Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg"&gt;Large Button&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Full Width Buttons -->
<section id="buttonFullWidth" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">أزرار بعرض كامل</h2>
            <p class="desc">أزرار تمتد لتشغل العرض الكامل للحاوي</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase" style="flex-direction: column; max-width: 600px; margin: 0 auto;">
                <div class="button-card">
                    <div class="button-label">Full Width Primary</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg nds-btn-full">Full Width Primary Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-lg.nds-btn-full">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-lg nds-btn-full"&gt;Full Width Primary Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Full Width Secondary</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-lg nds-btn-full">Full Width Secondary Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-solid.nds-btn-lg.nds-btn-full">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg nds-btn-full"&gt;Full Width Secondary Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Full Width Outline</div>
                    <button class="nds-btn nds-btn-secondary-outline nds-btn-lg nds-btn-full">Full Width Outline Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-lg.nds-btn-full">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-lg nds-btn-full"&gt;Full Width Outline Button&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Button Groups -->
<section id="buttonGroups" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">مجموعات الأزرار</h2>
            <p class="desc">أزرار مجمعة معاً لتشكيل وحدة واحدة</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Button Group - Secondary</div>
                    <div class="nds-btn-group">
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg">First</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg nds-btn-active">Second</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-lg">Third</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn-group">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;div class="nds-btn-group"&gt;&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg"&gt;First&lt;/button&gt;&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-lg"&gt;Second&lt;/button&gt;&lt;/div&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Button Group - Outline</div>
                    <div class="nds-btn-group">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg">Option A</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg">Option B</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-lg">Option C</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn-group">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;div class="nds-btn-group"&gt;&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-lg"&gt;Option A&lt;/button&gt;&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-lg"&gt;Option B&lt;/button&gt;&lt;/div&gt;</code>
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
            <h2 class="title">حالة التحميل</h2>
            <p class="desc">أزرار في حالة التحميل مع مؤشر دوار</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <div class="button-card">
                    <div class="button-label">Loading States</div>
                    <div class="button-row">
                        <button class="nds-btn nds-btn-primary nds-btn-loading nds-btn-lg">Loading Button</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-loading nds-btn-lg">Processing Button</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-loading nds-btn-lg">Saving Button</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-loading.nds-btn-lg">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-loading nds-btn-lg"&gt;Loading Button&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
// Button interaction functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Copy to clipboard functionality
   window.copyButtonHTML = function(button) {
        const buttonCard = button.closest('.button-card');
        const codeElement = buttonCard.querySelector('code');
        
        // Get the clean HTML from the code element
        const htmlToCopy = codeElement.textContent;
        
        navigator.clipboard.writeText(htmlToCopy).then(function() {
            const originalIcon = button.innerHTML;
            button.innerHTML = '<i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalIcon;
                button.classList.remove('copied');
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy HTML: ', err);
        });
    };
});
</script>