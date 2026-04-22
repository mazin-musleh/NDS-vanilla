---
layout: page
title: Layout
hero_title: Layout
hero_description: Structural primitives for arranging page content — sections and the responsive grid.
lang: en
direction: ltr
sidemenu_mode: false
---

<section id="layout" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Layout Primitives</h2>
            <p class="nds-section-description">The building blocks every page is composed from.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-grid" style="--max-col:2;--mid-col:2;--min-col:1;">

                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-layout-03"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <h3 class="nds-card-title">Section</h3>
                            <p class="nds-card-description">Structured container for page content with head, body, action areas, color themes, and full-width breakouts.</p>
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ '/layout/section.html' | relative_url }}" class="nds-btn nds-primary">
                                <span class="nds-label">View Docs</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nds-card nds-stroke">
                    <div class="nds-card-header">
                        <div class="nds-card-featured-icon">
                            <span class="nds-featured-icon nds-circle nds-xl">
                                <i class="hgi hgi-stroke hgi-grid"></i>
                            </span>
                        </div>
                    </div>
                    <div class="nds-card-content">
                        <div class="nds-card-text">
                            <h3 class="nds-card-title">Grid</h3>
                            <p class="nds-card-description">Responsive CSS grid with auto-fit or explicit columns, per-breakpoint counts, and adaptive gap scaling.</p>
                        </div>
                        <div class="nds-card-actions">
                            <a href="{{ '/layout/grid.html' | relative_url }}" class="nds-btn nds-primary">
                                <span class="nds-label">View Docs</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
