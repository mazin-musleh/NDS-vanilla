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
                                <code class="lang-html code">&lt;!-- Extra Small (24px) --&gt;
&lt;div class="nds-avatar nds-xs nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;

&lt;!-- Small (32px) --&gt;
&lt;div class="nds-avatar nds-sm nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;

&lt;!-- Medium (40px - default) --&gt;
&lt;div class="nds-avatar nds-md nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;

&lt;!-- Large (56px) --&gt;
&lt;div class="nds-avatar nds-lg nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;

&lt;!-- Extra Large (80px) --&gt;
&lt;div class="nds-avatar nds-xl nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;

&lt;!-- 2X Extra Large (96px) --&gt;
&lt;div class="nds-avatar nds-2xl nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;

&lt;!-- 3X Extra Large (120px) --&gt;
&lt;div class="nds-avatar nds-3xl nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;</code>
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
                                <code class="lang-html code">&lt;div class="nds-avatar nds-lg nds-initials"&gt;
  &lt;span class="initials"&gt;AB&lt;/span&gt;
&lt;/div&gt;</code>
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
                                <code class="lang-html code">&lt;div class="nds-avatar nds-lg nds-icon"&gt;
  &lt;i class="hgi hgi-stroke hgi-user"&gt;&lt;/i&gt;
&lt;/div&gt;</code>
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
                                <code class="lang-html code">&lt;div class="nds-avatar nds-lg nds-image"&gt;
  &lt;img src="path/to/avatar.jpg" alt="User Avatar"&gt;
&lt;/div&gt;</code>
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
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-stacked", ".nds-avatar-group", "stackedVariant"]'>
                                <span class="label">Toggle Stacked</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar-group nds-stacked">
                                <div class="nds-avatar nds-sm nds-image">
                                    <img src="{{ '/assets/img/avatar1.png' | relative_url }}" alt="User 1">
                                </div>
                                <div class="nds-avatar nds-sm nds-image">
                                    <img src="{{ '/assets/img/avatar2.png' | relative_url }}" alt="User 2">
                                </div>
                                <div class="nds-avatar nds-sm nds-image">
                                    <img src="{{ '/assets/img/avatar3.png' | relative_url }}" alt="User 3">
                                </div>
                                <div class="nds-avatar nds-sm nds-image">
                                    <img src="{{ '/assets/img/avatar4.png' | relative_url }}" alt="User 4">
                                </div>
                                <div class="nds-avatar nds-sm nds-image">
                                    <img src="{{ '/assets/img/avatar5.png' | relative_url }}" alt="User 5">
                                </div>
                                <div class="nds-avatar nds-sm nds-initials">
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
                                <code class="lang-html code">&lt;!-- Stacked Avatar Group --&gt;
&lt;div class="nds-avatar-group nds-stacked"&gt;
  &lt;div class="nds-avatar nds-sm nds-image"&gt;
    &lt;img src="path/to/avatar1.jpg" alt="User 1"&gt;
  &lt;/div&gt;
  &lt;div class="nds-avatar nds-sm nds-image"&gt;
    &lt;img src="path/to/avatar2.jpg" alt="User 2"&gt;
  &lt;/div&gt;
  &lt;div class="nds-avatar nds-sm nds-image"&gt;
    &lt;img src="path/to/avatar3.jpg" alt="User 3"&gt;
  &lt;/div&gt;
  &lt;div class="nds-avatar nds-sm nds-image"&gt;
    &lt;img src="path/to/avatar4.jpg" alt="User 4"&gt;
  &lt;/div&gt;
  &lt;div class="nds-avatar nds-sm nds-image"&gt;
    &lt;img src="path/to/avatar5.jpg" alt="User 5"&gt;
  &lt;/div&gt;
  &lt;div class="nds-avatar nds-sm nds-initials"&gt;
    &lt;span class="initials"&gt;+99&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Non-stacked Avatar Group (default with gap) --&gt;
&lt;div class="nds-avatar-group"&gt;
  &lt;div class="nds-avatar nds-sm nds-image"&gt;
    &lt;img src="path/to/avatar1.jpg" alt="User 1"&gt;
  &lt;/div&gt;
  &lt;div class="nds-avatar nds-sm nds-image"&gt;
    &lt;img src="path/to/avatar2.jpg" alt="User 2"&gt;
  &lt;/div&gt;
  &lt;div class="nds-avatar nds-sm nds-initials"&gt;
    &lt;span class="initials"&gt;+99&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

