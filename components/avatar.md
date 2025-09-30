---
layout: page
title: Avatar
hero_title: Avatar Components - National Design System
hero_description: Avatars represent users or entities with initials, icons, or images in various sizes and shapes
breadcrumb: ["Components", "Avatar"]
lang: en
direction: ltr
---

<!-- Avatar Sizes -->
<section id="avatarSizes" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Avatar Sizes</h2>
            <p class="nds-section-description">Avatars are available in 7 sizes ranging from 24px to 120px</p>
        </div>
        <div class="nds-section-content">
            <div class="avatar-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Avatar Sizes</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "avatarShape"]'>
                                <span class="label">Square</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo" style="gap: 24px; align-items: flex-end;">
                            <div class="nds-avatar nds-xs nds-initials">
                                <span class="initials">AB</span>
                            </div>
                            <div class="nds-avatar nds-sm nds-initials">
                                <span class="initials">AB</span>
                            </div>
                            <div class="nds-avatar nds-md nds-initials">
                                <span class="initials">AB</span>
                            </div>
                            <div class="nds-avatar nds-lg nds-initials">
                                <span class="initials">AB</span>
                            </div>
                            <div class="nds-avatar nds-xl nds-initials">
                                <span class="initials">AB</span>
                            </div>
                            <div class="nds-avatar nds-2xl nds-initials">
                                <span class="initials">AB</span>
                            </div>
                            <div class="nds-avatar nds-3xl nds-initials">
                                <span class="initials">AB</span>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-sizes-1" id="tab-sizes-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sizes-1"
                                aria-labelledby="tab-sizes-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code"><!-- Extra Small (24px) -->
<div class="nds-avatar nds-xs nds-initials">
  <span class="initials">AB</span>
</div>

<!-- Small (32px) -->
<div class="nds-avatar nds-sm nds-initials">
  <span class="initials">AB</span>
</div>

<!-- Medium (40px - default) -->
<div class="nds-avatar nds-md nds-initials">
  <span class="initials">AB</span>
</div>

<!-- Large (56px) -->
<div class="nds-avatar nds-lg nds-initials">
  <span class="initials">AB</span>
</div>

<!-- Extra Large (80px) -->
<div class="nds-avatar nds-xl nds-initials">
  <span class="initials">AB</span>
</div>

<!-- 2X Extra Large (96px) -->
<div class="nds-avatar nds-2xl nds-initials">
  <span class="initials">AB</span>
</div>

<!-- 3X Extra Large (120px) -->
<div class="nds-avatar nds-3xl nds-initials">
  <span class="initials">AB</span>
</div></code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Avatar Types -->
<section id="avatarTypes" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Avatar Types</h2>
            <p class="nds-section-description">Avatars support three content types: initials, icons, and images</p>
        </div>
        <div class="nds-section-content">
            <div class="avatar-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Initials Avatar</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "avatarShape"]'>
                                <span class="label">Square</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar nds-lg nds-initials">
                                <span class="initials">AB</span>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-initials-1" id="tab-initials-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-initials-1"
                                aria-labelledby="tab-initials-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code"><div class="nds-avatar nds-lg nds-initials">
  <span class="initials">AB</span>
</div></code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Icon Avatar</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "avatarShape"]'>
                                <span class="label">Square</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar nds-lg nds-icon">
                                <i class="hgi hgi-stroke hgi-user"></i>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-icon-1" id="tab-icon-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-icon-1"
                                aria-labelledby="tab-icon-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code"><div class="nds-avatar nds-lg nds-icon">
  <i class="hgi hgi-stroke hgi-user"></i>
</div></code>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Image Avatar</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-image-border", ".nds-avatar", "imageBorder"]'>
                                <span class="label">Image Border</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "avatarShape"]'>
                                <span class="label">Square</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar nds-lg nds-image">
                                <img src="{{ '/assets/img/avatar1.png' | relative_url }}" alt="User Avatar">
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-image-1" id="tab-image-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-image-1"
                                aria-labelledby="tab-image-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code"><div class="nds-avatar nds-lg nds-image">
  <img src="path/to/avatar.jpg" alt="User Avatar">
</div></code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Avatar Group -->
<section id="avatarGroup" class="nds-content-section">
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Avatar Group</h2>
            <p class="nds-section-description">Group multiple avatars together with stacked or spaced layouts</p>
        </div>
        <div class="nds-section-content">
            <div class="avatar-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Avatar Group</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-stacked", ".nds-avatar-group", "stackedVariant"]'>
                                <span class="label">Stacked</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xs", ".nds-avatar-group", "avatarSize"]'>
                                <span class="label">XS</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-avatar-group", "avatarSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-md", ".nds-avatar-group", "avatarSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-avatar-group", "avatarSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-xl", ".nds-avatar-group", "avatarSize"]'>
                                <span class="label">XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-2xl", ".nds-avatar-group", "avatarSize"]'>
                                <span class="label">2XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-3xl", ".nds-avatar-group", "avatarSize"]'>
                                <span class="label">3XL</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar-group nds-stacked nds-md">
                                <div class="nds-avatar nds-image">
                                    <img src="{{ '/assets/img/avatar1.png' | relative_url }}" alt="User 1">
                                </div>
                                <div class="nds-avatar nds-image">
                                    <img src="{{ '/assets/img/avatar2.png' | relative_url }}" alt="User 2">
                                </div>
                                <div class="nds-avatar nds-image">
                                    <img src="{{ '/assets/img/avatar3.png' | relative_url }}" alt="User 3">
                                </div>
                                <div class="nds-avatar nds-image">
                                    <img src="{{ '/assets/img/avatar4.png' | relative_url }}" alt="User 4">
                                </div>
                                <div class="nds-avatar nds-image">
                                    <img src="{{ '/assets/img/avatar5.png' | relative_url }}" alt="User 5">
                                </div>
                                <div class="nds-avatar nds-lg nds-initials">
                                    <span class="initials">+99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code withDivider">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-group-1" id="tab-group-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-group-1"
                                aria-labelledby="tab-group-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code"><!-- Stacked Avatar Group -->
<div class="nds-avatar-group nds-stacked nds-md">
  <div class="nds-avatar nds-image">
    <img src="path/to/avatar1.jpg" alt="User 1">
  </div>
  <div class="nds-avatar nds-image">
    <img src="path/to/avatar2.jpg" alt="User 2">
  </div>
  <div class="nds-avatar nds-image">
    <img src="path/to/avatar3.jpg" alt="User 3">
  </div>
  <div class="nds-avatar nds-image">
    <img src="path/to/avatar4.jpg" alt="User 4">
  </div>
  <div class="nds-avatar nds-image">
    <img src="path/to/avatar5.jpg" alt="User 5">
  </div>
  <div class="nds-avatar nds-initials">
    <span class="initials">+99</span>
  </div>
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