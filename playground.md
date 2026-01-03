---
layout: home
title: "National Design System for Saudi Arabia"
hero_title: "National Design System for Saudi Arabia"
hero_description: "A comprehensive design system empowering consistent, accessible, and high-performance digital
government experiences across the Kingdom."
#hero_image: /assets/img/riyadhcenter.webp
hero_image_pos: 50% 10%
lang: en
direction: ltr
---

<style>
    .nds-btn-list {
        display: flex;
        flex-direction: column;


        &>li:not(:last-child) {
            border-bottom: 1px solid var(--border-neutral-secondary);
        }

        .nds-btn {
            --nds-btn-height: var(--spacing-6xl);
            width: 100%;
            padding-inline: var(--spacing-sm);

            &>.nds-featured-icon {
                margin-inline-end: 2px;
            }
        }

        .nds-btn .label {
            width: 100%;
        }
    }
</style>
<section id="ads" class="nds-content-section">
    <div class="nds-section-head">
        <h2 class="nds-section-title">الاعلانات</h2>
        <p class="nds-section-description">
            أهم الإعلانات التي تهم جميع منسوبي الجامعة
        </p>
        <div class="nds-section-action">
            <button class="nds-btn nds-secondary-outline nds-oncolor nds-center">
                <span class="label">عرض الكل</span>
            </button>
        </div>
    </div>
    <div class="nds-section-content">
        <nav class="nds-card nds-stroke">
            <ul class="nds-btn-list">
                <li>
                    <button class="nds-btn nds-subtle">
                        <span class="nds-featured-icon nds-brand nds-sm">
                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                        </span>
                        <span class="label nds-truncate">جدول فعاليات الجامعة الإسلامية بمناسبة اليوم العالمي للغة
                            العربي</span>
                        <span class="nds-tag nds-info nds-xs">
                            <span class="label">17/12/2025</span>
                        </span>
                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                    </button>
                </li>
                <li>
                    <button class="nds-btn nds-subtle">
                        <span class="nds-featured-icon nds-brand nds-sm">
                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                        </span>
                        <span class="label nds-truncate">جدول فعاليات الجامعة الإسلامية بمناسبة اليوم العالمي للغة
                            العربي</span>
                        <span class="nds-tag nds-info nds-xs">
                            <span class="label">17/12/2025</span>
                        </span>
                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                    </button>
                </li>
                <li>
                    <button class="nds-btn nds-subtle">
                        <span class="nds-featured-icon nds-brand nds-sm">
                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                        </span>
                        <span class="label nds-truncate">جدول فعاليات الجامعة الإسلامية بمناسبة اليوم العالمي للغة
                            العربي</span>
                        <span class="nds-tag nds-info nds-xs">
                            <span class="label">17/12/2025</span>
                        </span>
                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                    </button>
                </li>
                <li>
                    <button class="nds-btn nds-subtle">
                        <span class="nds-featured-icon nds-brand nds-sm">
                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                        </span>
                        <span class="label nds-truncate">جدول فعاليات الجامعة الإسلامية بمناسبة اليوم العالمي للغة
                            العربي</span>
                        <span class="nds-tag nds-info nds-xs">
                            <span class="label">17/12/2025</span>
                        </span>
                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                    </button>
                </li>
                <li>
                    <button class="nds-btn nds-subtle">
                        <span class="nds-featured-icon nds-brand nds-sm">
                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                        </span>
                        <span class="label nds-truncate">جدول فعاليات الجامعة الإسلامية بمناسبة اليوم العالمي للغة
                            العربي</span>
                        <span class="nds-tag nds-info nds-xs">
                            <span class="label">17/12/2025</span>
                        </span>
                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                    </button>
                </li>


            </ul>
        </nav>

    </div>
</section>

<section id="drawer-test" class="nds-content-section">
    <div class="nds-section-head">
        <h2 class="nds-section-title">Drawer Component Test</h2>
        <p class="nds-section-description">Testing the new nds-drawer component with nested menus</p>
    </div>
    <div class="nds-section-content">
        <div class="nds-grid">

            <!-- Basic Drawer -->
            <div class="nds-card nds-stroke">
                <h4>Basic Drawer</h4>
                <nav class="nds-drawer">
                    <ul class="nds-drawer-list">
                        <li class="active">
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-featured-icon nds-brand nds-sm">
                                    <i class="hgi hgi-stroke hgi-home-01 icon"></i>
                                </span>
                                <span class="label">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                <span class="nds-featured-icon nds-brand nds-sm">
                                </span>
                                <span class="label">Components</span>
                            </button>
                            <ul>
                                <li>
                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                        <span class="label">Buttons</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                        <span class="label">Cards</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                        <span class="label">Forms</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                <span class="nds-featured-icon nds-brand nds-sm">
                                </span>
                                <span class="label">Settings</span>
                            </button>
                            <ul>
                                <li>
                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                        <span class="label">Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                        <span class="label">Security</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="nds-featured-icon nds-brand nds-sm">
                                    <i class="hgi hgi-stroke hgi-help-circle icon"></i>
                                </span>
                                <span class="label">Help</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <!-- Small Size -->
            <div class="nds-card nds-stroke">
                <h4>Small Size (nds-sm)</h4>
                <nav class="nds-drawer nds-sm">
                    <ul class="nds-drawer-list">
                        <li class="active">
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="label">Home</span>
                            </a>
                        </li>
                        <li>
                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                <span class="label">Menu Item</span>
                            </button>
                            <ul>
                                <li><a href="#" class="nds-btn nds-subtle"><span class="label">Sub Item 1</span></a>
                                </li>
                                <li><a href="#" class="nds-btn nds-subtle"><span class="label">Sub Item 2</span></a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="label">Contact</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <!-- Large Size -->
            <div class="nds-card nds-stroke">
                <h4>Large Size (nds-lg)</h4>
                <nav class="nds-drawer nds-lg">
                    <ul class="nds-drawer-list">
                        <li class="active">
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="label">Overview</span>
                            </a>
                        </li>
                        <li>
                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                <span class="label">Reports</span>
                            </button>
                            <ul>
                                <li><a href="#" class="nds-btn nds-subtle"><span class="label">Monthly</span></a></li>
                                <li><a href="#" class="nds-btn nds-subtle"><span class="label">Yearly</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>

            <!-- Divided Variant -->
            <div class="nds-card nds-stroke">
                <h4>Divided Variant</h4>
                <nav class="nds-drawer nds-divided">
                    <ul class="nds-drawer-list">
                        <li class="active">
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="label">Account</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="label">Notifications</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="label">Privacy</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                <span class="label">Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>

        <!-- Constrained with hasMore -->
        <div style="margin-top: var(--spacing-2xl);">
            <h4>Constrained with hasMore (max-height: 200px)</h4>
            <div class="nds-card nds-stroke" style="max-width: 320px;">
                <nav class="nds-drawer nds-divided" style="--drawer-max-height: 200px;">
                    <div class="nds-drawer-scroll">
                        <ul class="nds-drawer-list">
                            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item
                                        1</span></a></li>
                            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item
                                        2</span></a></li>
                            <li class="active"><a href="#" class="nds-btn nds-subtle nds-indicator"><span
                                        class="label">Item 3 (Active)</span></a></li>
                            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item
                                        4</span></a></li>
                            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item
                                        5</span></a></li>
                            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item
                                        6</span></a></li>
                            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item
                                        7</span></a></li>
                            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item
                                        8</span></a></li>
                        </ul>
                    </div>
                    <button class="nds-drawer-more nds-btn nds-subtle">
                        <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
                        <span class="label">Show more</span>
                    </button>
                </nav>
            </div>
        </div>

    </div>
</section>