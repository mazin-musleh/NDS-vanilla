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
                        <button class="nds-btn nds-btn-primary nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-primary nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-primary nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-primary nds-btn-md" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-md"&gt;Primary Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Neutral Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-neutral nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-md" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-neutral.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-neutral nds-btn-md"&gt;Neutral Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Solid</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-md" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-solid.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-md"&gt;Secondary Solid Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Outline</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-md"&gt;Secondary Outline Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Subtle Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-subtle nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-subtle nds-btn-md" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-subtle.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-subtle nds-btn-md"&gt;Subtle Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Transparent Button</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-transparent nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-md" disabled>Disabled</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-transparent.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-md"&gt;Transparent Button&lt;/button&gt;</code>
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
            <p class="desc">أربعة أحجام: صغير (36px)، متوسط (44px)، كبير (52px)، كبير جداً (60px)</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase" style="grid-template-columns: repeat(4, 1fr);">
                <div class="button-card">
                    <div class="button-label">Small (36px)</div>
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
                    <div class="button-label">Medium (44px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-md">Medium Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-md"&gt;Medium Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Large (52px)</div>
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
                <div class="button-card">
                    <div class="button-label">Extra Large (60px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-xl">Extra Large Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-xl">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-xl"&gt;Extra Large Button&lt;/button&gt;</code>
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
                    <button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-md">Delete Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-destructive.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-destructive nds-btn-md"&gt;Delete Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Outline</div>
                    <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-md">Remove Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-destructive.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-md"&gt;Remove Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Transparent</div>
                    <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-md">Cancel Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-transparent.nds-btn-destructive.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-md"&gt;Cancel Button&lt;/button&gt;</code>
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
            <h2 class="title">أزرار على الخلفيات الملونة</h2>
            <p class="desc">أزرار مصممة للاستخدام على الخلفيات الداكنة</p>
        </div>
        <div class="sectionContent">
            <div class="dark-bg">
                <div class="button-showcase" style="grid-template-columns: repeat(3, 1fr);">
                    <div class="button-card" style="background: transparent; border: 1px solid rgba(255,255,255,0.2);">
                        <div class="button-label" style="color: white;">On-color Primary</div>
                        <button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-md">Primary Button</button>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-oncolor.nds-btn-md">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-primary nds-btn-oncolor nds-btn-md"&gt;Primary Button&lt;/button&gt;</code>
                        </div>
                    </div>
                    <div class="button-card" style="background: transparent; border: 1px solid rgba(255,255,255,0.2);">
                        <div class="button-label" style="color: white;">On-color Outline</div>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-md">Outline Button</button>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-oncolor.nds-btn-md">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-md"&gt;Outline Button&lt;/button&gt;</code>
                        </div>
                    </div>
                    <div class="button-card" style="background: transparent; border: 1px solid rgba(255,255,255,0.2);">
                        <div class="button-label" style="color: white;">On-color Transparent</div>
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-md">Transparent Button</button>
                        <div class="button-classes">
                            <div class="usage-header">
                                <span>Usage</span>
                                <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-transparent.nds-btn-oncolor.nds-btn-md">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code>&lt;button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-md"&gt;Transparent Button&lt;/button&gt;</code>
                        </div>
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
                    <button class="nds-btn nds-btn-primary nds-btn-md">
                        <i class="hgi hgi-stroke hgi-plus-sign"></i>
                        Add Item
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-md"&gt;&lt;i class="hgi hgi-stroke hgi-plus-sign"&gt;&lt;/i&gt;Add Item&lt;/button&gt;</code>
                    </div>
                </div>
                
                <!-- Trail Icon -->
                <div class="button-card">
                    <div class="button-label">Trail Icon (Text + Icon)</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-md nds-btn-trail-icon">
                        <i class="hgi hgi-stroke hgi-download-01"></i>
                        Download
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-solid.nds-btn-md.nds-btn-trail-icon">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-md nds-btn-trail-icon"&gt;&lt;i class="hgi hgi-stroke hgi-download-01"&gt;&lt;/i&gt;Download&lt;/button&gt;</code>
                    </div>
                </div>
                
                <!-- Icon Only -->
                <div class="button-card">
                    <div class="button-label">Icon Only Buttons</div>
                    <button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-md" aria-label="Settings">
                        <i class="hgi hgi-stroke hgi-settings-02"></i>
                    </button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-icon-only.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-md" aria-label="Settings"&gt;&lt;i class="hgi hgi-stroke hgi-settings-02"&gt;&lt;/i&gt;&lt;/button&gt;</code>
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
                    <button class="nds-btn nds-btn-primary nds-btn-md nds-btn-full">Full Width Primary Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-md.nds-btn-full">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-md nds-btn-full"&gt;Full Width Primary Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Full Width Secondary</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-md nds-btn-full">Full Width Secondary Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-solid.nds-btn-md.nds-btn-full">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-md nds-btn-full"&gt;Full Width Secondary Button&lt;/button&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Full Width Outline</div>
                    <button class="nds-btn nds-btn-secondary-outline nds-btn-md nds-btn-full">Full Width Outline Button</button>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-secondary-outline.nds-btn-md.nds-btn-full">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-md nds-btn-full"&gt;Full Width Outline Button&lt;/button&gt;</code>
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
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-md">First</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-md nds-btn-active">Second</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-md">Third</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn-group">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;div class="nds-btn-group"&gt;&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-md"&gt;First&lt;/button&gt;&lt;button class="nds-btn nds-btn-secondary-solid nds-btn-md"&gt;Second&lt;/button&gt;&lt;/div&gt;</code>
                    </div>
                </div>
                <div class="button-card">
                    <div class="button-label">Button Group - Outline</div>
                    <div class="nds-btn-group">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Option A</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Option B</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Option C</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn-group">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;div class="nds-btn-group"&gt;&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-md"&gt;Option A&lt;/button&gt;&lt;button class="nds-btn nds-btn-secondary-outline nds-btn-md"&gt;Option B&lt;/button&gt;&lt;/div&gt;</code>
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
                        <button class="nds-btn nds-btn-primary nds-btn-loading nds-btn-md">Loading Button</button>
                        <button class="nds-btn nds-btn-secondary-solid nds-btn-loading nds-btn-md">Processing Button</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-loading nds-btn-md">Saving Button</button>
                    </div>
                    <div class="button-classes">
                        <div class="usage-header">
                            <span>Usage</span>
                            <button class="copy-btn" onclick="copyButtonHTML(this)" data-button-selector=".nds-btn.nds-btn-primary.nds-btn-loading.nds-btn-md">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <code>&lt;button class="nds-btn nds-btn-primary nds-btn-loading nds-btn-md"&gt;Loading Button&lt;/button&gt;</code>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
// Button interaction functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for button classes display
    const style = document.createElement('style');
    style.textContent = `
        .button-classes {
            margin-top: var(--spacing-sm);
            background-color: var(--background-neutral-25);
            padding: var(--spacing-md);
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-neutral-secondary);
        }
        
       .usage-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-sm);
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-default);
        }
        
       .button-classes code {
            display: block;
            background-color: var(--background-white);
            color: var(--text-default);
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.75rem;
            line-height: 1.4;
            padding: var(--spacing-sm);
            border-radius: var(--radius-xs);
            border: 1px solid var(--border-neutral-tertiary);
            overflow-x: auto;
            direction: ltr;
        }
        
        .copy-btn {
            background-color: var(--background-neutral-100);
            color: var(--text-default);
            border: none;
            padding: var(--spacing-xs);
            border-radius: var(--radius-sm);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 1px solid var(--border-neutral-secondary);
            transition: all 0.15s ease;
       }
       
       .copy-btn i {
            font-size: 16px;
        }
        
        .copy-btn:hover {
            background-color: var(--background-neutral-200);
            border-color: var(--border-neutral-primary);
        }
        
        .copy-btn:active {
            background-color: var(--background-neutral-300);
        }
        
        .copy-btn.copied {
            background-color: var(--colors-green-600);
            color: var(--text-oncolor-primary);
            border-color: var(--colors-green-600);
        }
    `;
    document.head.appendChild(style);
    
    // Add CSS for demo states
    const demoStyle = document.createElement('style');
    demoStyle.textContent = `
        .hover-demo.nds-btn-primary { background-color: var(--button-background-primary-hovered); border-color: var(--button-background-primary-hovered); }
        .active-demo.nds-btn-primary { background-color: var(--button-background-primary-pressed); border-color: var(--button-background-primary-pressed); }
        .hover-demo.nds-btn-neutral { background-color: var(--button-background-black-hovered); border-color: var(--button-background-black-hovered); }
        .active-demo.nds-btn-neutral { background-color: var(--button-background-black-pressed); border-color: var(--button-background-black-pressed); }
        .hover-demo.nds-btn-secondary-solid { background-color: var(--button-background-neutral-hovered); border-color: var(--button-background-neutral-hovered); }
        .active-demo.nds-btn-secondary-solid { background-color: var(--button-background-neutral-pressed); border-color: var(--button-background-neutral-pressed); }
        .hover-demo.nds-btn-secondary-outline { background-color: var(--button-background-neutral-default); border-color: var(--border-neutral-secondary); }
        .active-demo.nds-btn-secondary-outline { background-color: var(--button-background-neutral-pressed); border-color: var(--border-neutral-primary); }
        .hover-demo.nds-btn-subtle { background-color: var(--button-background-neutral-default); border-color: var(--button-background-neutral-default); }
        .active-demo.nds-btn-subtle { background-color: var(--button-background-neutral-pressed); border-color: var(--border-neutral-secondary); }
        .hover-demo.nds-btn-transparent { background-color: var(--button-background-transparent-hovered); color: var(--button-label-transparent-hovered-on-color); }
        .active-demo.nds-btn-transparent { background-color: var(--button-background-transparent-pressed); color: var(--button-label-transparent-pressed-on-color); }
        .nds-btn-active { background-color: var(--button-background-primary-selected) !important; color: var(--text-oncolor-primary) !important; border-color: var(--button-background-primary-selected) !important; }
    `;
    document.head.appendChild(demoStyle);
    
    // Loading button demo
    const loadingButtons = document.querySelectorAll('.nds-btn-loading');
    loadingButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('nds-btn-loading');
            setTimeout(() => {
                this.classList.remove('nds-btn-loading');
            }, 3000);
        });
    });
    
    // Button group functionality
    const buttonGroups = document.querySelectorAll('.nds-btn-group');
    buttonGroups.forEach(group => {
        const buttons = group.querySelectorAll('.nds-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active state from all buttons in group
                buttons.forEach(btn => {
                    btn.classList.remove('nds-btn-active');
                });
                
                // Add active state to clicked button
                this.classList.add('nds-btn-active');
            });
        });
    });
    
    // Copy to clipboard functionality
   window.copyButtonHTML = function(button) {
        const buttonCard = button.closest('.button-card');
        const targetButton = buttonCard.querySelector('button:not(.copy-btn)');
        const targetGroup = buttonCard.querySelector('.nds-btn-group');
        
        let htmlToCopy = '';
        
        if (targetGroup) {
            // For button groups, copy the entire group
            htmlToCopy = targetGroup.outerHTML;
        } else if (targetButton) {
            // For individual buttons, copy the button HTML
            htmlToCopy = targetButton.outerHTML;
        }
        
        // Clean up the HTML (remove demo classes)
        htmlToCopy = htmlToCopy
            .replace(/\s+class="([^"]*?)(?:\s+(?:hover-demo|active-demo|nds-btn-active))([^"]*?)"/g, ' class="$1$2"')
            .replace(/\s+class="([^"]*?)(?:hover-demo|active-demo|nds-btn-active)\s*([^"]*?)"/g, ' class="$1$2"')
            .replace(/\s+class="(?:hover-demo|active-demo|nds-btn-active)\s*([^"]*?)"/g, ' class="$1"')
            .replace(/\s+class="(?:hover-demo|active-demo|nds-btn-active)"/g, '')
            .replace(/\s+class=""/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
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