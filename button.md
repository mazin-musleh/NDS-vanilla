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
                    <button class="nds-btn nds-btn-primary nds-btn-md">Primary Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Neutral Button</div>
                    <button class="nds-btn nds-btn-neutral nds-btn-md">Neutral Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Solid</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-md">Secondary Solid Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Secondary Outline</div>
                    <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Secondary Outline Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Subtle Button</div>
                    <button class="nds-btn nds-btn-subtle nds-btn-md">Subtle Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Transparent Button</div>
                    <button class="nds-btn nds-btn-transparent nds-btn-md">Transparent Button</button>
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
                </div>
                <div class="button-card">
                    <div class="button-label">Medium (44px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-md">Medium Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Large (52px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-lg">Large Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Extra Large (60px)</div>
                    <button class="nds-btn nds-btn-primary nds-btn-xl">Extra Large Button</button>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Interactive States -->
<section id="buttonStates" class="content-section">
    <div class="container">
        <div class="sectionHead">
            <h2 class="title">الحالات التفاعلية</h2>
            <p class="desc">جميع الحالات: عادي، تمرير، نشط، معطل</p>
        </div>
        <div class="sectionContent">
            <div class="button-showcase">
                <!-- Primary States -->
                <div class="button-card">
                    <div class="button-label">Primary Button States</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-primary nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-primary nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-primary nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-primary nds-btn-md" disabled>Disabled</button>
                    </div>
                </div>
                
                <!-- Neutral States -->
                <div class="button-card">
                    <div class="button-label">Neutral Button States</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-neutral nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-neutral nds-btn-md" disabled>Disabled</button>
                    </div>
                </div>
                
                <!-- Secondary Outline States -->
                <div class="button-card">
                    <div class="button-label">Secondary Outline States</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md" disabled>Disabled</button>
                    </div>
                </div>
                
                <!-- Transparent States -->
                <div class="button-card">
                    <div class="button-label">Transparent Button States</div>
                    <div class="state-demo" style="grid-template-columns: repeat(4, 1fr);">
                        <button class="nds-btn nds-btn-transparent nds-btn-md">Default</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-md hover-demo">Hover</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-md active-demo">Active</button>
                        <button class="nds-btn nds-btn-transparent nds-btn-md" disabled>Disabled</button>
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
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Outline</div>
                    <button class="nds-btn nds-btn-secondary-outline nds-btn-destructive nds-btn-md">Remove Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Destructive Transparent</div>
                    <button class="nds-btn nds-btn-transparent nds-btn-destructive nds-btn-md">Cancel Button</button>
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
                    </div>
                    <div class="button-card" style="background: transparent; border: 1px solid rgba(255,255,255,0.2);">
                        <div class="button-label" style="color: white;">On-color Outline</div>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-oncolor nds-btn-md">Outline Button</button>
                    </div>
                    <div class="button-card" style="background: transparent; border: 1px solid rgba(255,255,255,0.2);">
                        <div class="button-label" style="color: white;">On-color Transparent</div>
                        <button class="nds-btn nds-btn-transparent nds-btn-oncolor nds-btn-md">Transparent Button</button>
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
                </div>
                
                <!-- Trail Icon -->
                <div class="button-card">
                    <div class="button-label">Trail Icon (Text + Icon)</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-md nds-btn-trail-icon">
                        <i class="hgi hgi-stroke hgi-download-01"></i>
                        Download
                    </button>
                </div>
                
                <!-- Icon Only -->
                <div class="button-card">
                    <div class="button-label">Icon Only Buttons</div>
                    <button class="nds-btn nds-btn-primary nds-btn-icon-only nds-btn-md" aria-label="Settings">
                        <i class="hgi hgi-stroke hgi-settings-02"></i>
                    </button>
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
            <div class="button-showcase" style="grid-template-columns: 1fr; max-width: 600px; margin: 0 auto;">
                <div class="button-card">
                    <div class="button-label">Full Width Primary</div>
                    <button class="nds-btn nds-btn-primary nds-btn-md nds-btn-full">Full Width Primary Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Full Width Secondary</div>
                    <button class="nds-btn nds-btn-secondary-solid nds-btn-md nds-btn-full">Full Width Secondary Button</button>
                </div>
                <div class="button-card">
                    <div class="button-label">Full Width Outline</div>
                    <button class="nds-btn nds-btn-secondary-outline nds-btn-md nds-btn-full">Full Width Outline Button</button>
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
                </div>
                <div class="button-card">
                    <div class="button-label">Button Group - Outline</div>
                    <div class="nds-btn-group">
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Option A</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Option B</button>
                        <button class="nds-btn nds-btn-secondary-outline nds-btn-md">Option C</button>
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
                </div>
            </div>
        </div>
    </div>
</section>

<script>
// Button interaction functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for demo states
    const style = document.createElement('style');
    style.textContent = `
        .hover-demo.nds-btn-primary { background-color: var(--colors-primary-sa-flag-700); border-color: var(--colors-primary-sa-flag-700); }
        .active-demo.nds-btn-primary { background-color: var(--colors-primary-sa-flag-800); border-color: var(--colors-primary-sa-flag-800); }
        .hover-demo.nds-btn-neutral { background-color: var(--colors-neutral-900); border-color: var(--colors-neutral-900); }
        .active-demo.nds-btn-neutral { background-color: var(--colors-neutral-950); border-color: var(--colors-neutral-950); }
        .hover-demo.nds-btn-secondary-outline { background-color: var(--colors-neutral-50); border-color: var(--border-neutral-secondary); }
        .active-demo.nds-btn-secondary-outline { background-color: var(--colors-neutral-100); border-color: var(--colors-neutral-400); }
        .hover-demo.nds-btn-transparent { background-color: var(--colors-primary-sa-flag-50); color: var(--colors-primary-sa-flag-700); }
        .active-demo.nds-btn-transparent { background-color: var(--colors-primary-sa-flag-100); color: var(--colors-primary-sa-flag-800); }
        .nds-btn-active { background-color: var(--colors-primary-sa-flag-600-primary) !important; color: var(--text-oncolor-primary) !important; border-color: var(--colors-primary-sa-flag-600-primary) !important; }
    `;
    document.head.appendChild(style);
    
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
    
    // Demonstrate hover states on state demo buttons
    const stateDemoButtons = document.querySelectorAll('.state-demo .nds-btn');
    stateDemoButtons.forEach(button => {
        if (!button.disabled && !button.textContent.includes('Hover') && !button.textContent.includes('Active')) {
            button.addEventListener('mouseenter', function() {
                // Add visual feedback for demonstration
                this.style.transform = 'translateY(-1px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
    });
});
</script>