---
layout: page
title: Avatar
hero_title: Avatar - National Design System
hero_description: Avatars represent users or entities with initials, icons, or images in various sizes and shapes
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Initials -->
<section id="avatarInitials" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Initials</h2>
            <p class="nds-section-description">Display user initials as a text-based avatar</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-avatar", "avatarSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-avatar", "avatarSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-avatar", "avatarSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-avatar", "avatarSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-avatar", "avatarSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-avatar", "avatarSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-3xl", ".nds-avatar", "avatarSize"]'>
                                            <span class="nds-label">3XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "avatarShape"]'>
                                <span class="nds-label">Square</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar nds-lg">
                                <span class="nds-label">AB</span>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-avatar-initials-1" id="tab-avatar-initials-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-avatar-initials-1"
                                    aria-labelledby="tab-avatar-initials-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code"><div class="nds-avatar nds-lg">
  <span class="nds-label">AB</span>
</div></code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Icon -->
<section id="avatarIcon" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Icon</h2>
            <p class="nds-section-description">Use an icon as the avatar content for generic user placeholders</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-avatar", "iconAvatarSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-avatar", "iconAvatarSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-avatar", "iconAvatarSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-avatar", "iconAvatarSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-avatar", "iconAvatarSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-avatar", "iconAvatarSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-3xl", ".nds-avatar", "iconAvatarSize"]'>
                                            <span class="nds-label">3XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "iconAvatarShape"]'>
                                <span class="nds-label">Square</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar nds-lg">
                                <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-avatar-icon-1" id="tab-avatar-icon-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-avatar-icon-1"
                                    aria-labelledby="tab-avatar-icon-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code"><div class="nds-avatar nds-lg">
  <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
</div></code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Image -->
<section id="avatarImage" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Image</h2>
            <p class="nds-section-description">Display a user photo with optional image border</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-avatar", "imgAvatarSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-avatar", "imgAvatarSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-avatar", "imgAvatarSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-avatar", "imgAvatarSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-avatar", "imgAvatarSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-avatar", "imgAvatarSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-3xl", ".nds-avatar", "imgAvatarSize"]'>
                                            <span class="nds-label">3XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-image-border", ".nds-avatar", "imageBorder"]'>
                                <span class="nds-label">Image Border</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "imgAvatarShape"]'>
                                <span class="nds-label">Square</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar nds-lg">
                                <img src="{{ 'assets/img/avatar1.png' | relative_url }}" alt="User Avatar">
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-avatar-image-1" id="tab-avatar-image-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-avatar-image-1"
                                    aria-labelledby="tab-avatar-image-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code"><div class="nds-avatar nds-lg">
  <img src="path/to/avatar.jpg" alt="User Avatar">
</div></code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Link -->
<section id="avatarLink" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Link</h2>
            <p class="nds-section-description">Wrap in an anchor tag for clickable profile navigation</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-avatar", "linkAvatarSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-avatar", "linkAvatarSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-avatar", "linkAvatarSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-avatar", "linkAvatarSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-avatar", "linkAvatarSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-avatar", "linkAvatarSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-3xl", ".nds-avatar", "linkAvatarSize"]'>
                                            <span class="nds-label">3XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "linkAvatarShape"]'>
                                <span class="nds-label">Square</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <a href="#" class="nds-avatar nds-lg">
                                <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-avatar-link-1" id="tab-avatar-link-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-avatar-link-1"
                                    aria-labelledby="tab-avatar-link-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code"><a href="/user/profile" class="nds-avatar nds-lg">
  <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
</a></code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Dropmenu Trigger -->
<section id="avatarDropmenu" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dropmenu Trigger</h2>
            <p class="nds-section-description">Avatar as a dropmenu trigger for user menus and profile actions</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">LG</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-avatar", "btnAvatarSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-avatar", "btnAvatarSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-avatar", "btnAvatarSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-lg", ".nds-avatar", "btnAvatarSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-avatar", "btnAvatarSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-avatar", "btnAvatarSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-3xl", ".nds-avatar", "btnAvatarSize"]'>
                                            <span class="nds-label">3XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-square", ".nds-avatar", "btnAvatarShape"]'>
                                <span class="nds-label">Square</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu">
                                <button type="button" class="nds-avatar nds-lg nds-dropmenu-trigger" aria-label="Open user menu">
                                    <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <span class="nds-label">Profile</span>
                                        </a>
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <span class="nds-label">Settings</span>
                                        </a>
                                        <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                                            <span class="nds-label">Sign out</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-avatar-dropmenu-1" id="tab-avatar-dropmenu-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-left-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-avatar-dropmenu-1"
                                    aria-labelledby="tab-avatar-dropmenu-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-dropmenu">
    <button type="button" class="nds-avatar nds-lg nds-dropmenu-trigger" aria-label="Open user menu">
        <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
    </button>
    <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
            <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                <span class="nds-label">Profile</span>
            </a>
            <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                <span class="nds-label">Settings</span>
            </a>
            <a href="#" class="nds-btn nds-subtle nds-dropmenu-item">
                <span class="nds-label">Sign out</span>
            </a>
        </div>
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
        </div>
    </div>
</section>

<!-- Group -->
<section id="avatarGroup" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Group</h2>
            <p class="nds-section-description">Stack multiple avatars together with overlapping or spaced layouts</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">MD</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xs", ".nds-avatar-group", "groupSize"]'>
                                            <span class="nds-label">XS</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-avatar-group", "groupSize"]'>
                                            <span class="nds-label">SM</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["nds-md", ".nds-avatar-group", "groupSize"]'>
                                            <span class="nds-label">MD</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-avatar-group", "groupSize"]'>
                                            <span class="nds-label">LG</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-avatar-group", "groupSize"]'>
                                            <span class="nds-label">XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-2xl", ".nds-avatar-group", "groupSize"]'>
                                            <span class="nds-label">2XL</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-3xl", ".nds-avatar-group", "groupSize"]'>
                                            <span class="nds-label">3XL</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stacked", ".nds-avatar-group", "stackedVariant"]'>
                                <span class="nds-label">Stacked</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-avatar-group nds-stacked nds-md">
                                <div class="nds-avatar">
                                    <img src="{{ 'assets/img/avatar1.png' | relative_url }}" alt="User 1">
                                </div>
                                <div class="nds-avatar">
                                    <img src="{{ 'assets/img/avatar2.png' | relative_url }}" alt="User 2">
                                </div>
                                <div class="nds-avatar">
                                    <img src="{{ 'assets/img/avatar3.png' | relative_url }}" alt="User 3">
                                </div>
                                <div class="nds-avatar">
                                    <img src="{{ 'assets/img/avatar4.png' | relative_url }}" alt="User 4">
                                </div>
                                <div class="nds-avatar">
                                    <img src="{{ 'assets/img/avatar5.png' | relative_url }}" alt="User 5">
                                </div>
                                <div class="nds-avatar nds-lg">
                                    <span class="nds-label">+99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-avatar-group-1" id="tab-avatar-group-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-left-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-avatar-group-1"
                                    aria-labelledby="tab-avatar-group-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-avatar-group nds-stacked nds-md">
    <div class="nds-avatar">
        <img src="path/to/avatar1.jpg" alt="User 1">
    </div>
    <div class="nds-avatar">
        <img src="path/to/avatar2.jpg" alt="User 2">
    </div>
    <div class="nds-avatar">
        <img src="path/to/avatar3.jpg" alt="User 3">
    </div>
    <div class="nds-avatar">
        <img src="path/to/avatar4.jpg" alt="User 4">
    </div>
    <div class="nds-avatar">
        <img src="path/to/avatar5.jpg" alt="User 5">
    </div>
    <div class="nds-avatar">
        <span class="nds-label">+99</span>
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
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="avatarFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01"></i>
                        <span class="nds-label">Pure CSS</span>
                    </span>
                    <p class="nds-item-desc">No JavaScript required. Renders immediately from HTML markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01"></i>
                        <span class="nds-label">Seven Sizes</span>
                    </span>
                    <p class="nds-item-desc">From 24px (XS) to 120px (3XL). Font and icon scale proportionally.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-puzzle"></i>
                        <span class="nds-label">Element Agnostic</span>
                    </span>
                    <p class="nds-item-desc">Works on div, a, or button elements for display, navigation, or actions.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-user-group"></i>
                        <span class="nds-label">Group Layout</span>
                    </span>
                    <p class="nds-item-desc">Stack avatars with overlapping or spaced arrangement and overflow count.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="avatarGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use initials when no profile image is available. Two letters from the user's name</li>
                    <li>Use icon avatars for anonymous or system-level users where no identity is needed</li>
                    <li>Use image avatars when a real photo is available. Always include alt text</li>
                    <li>Use groups to show participants, collaborators, or team members in a compact space</li>
                    <li>Choose the size based on context: XS/SM for inline mentions, MD/LG for cards, XL+ for profile headers</li>
                </ul>
            </div>

        </div>
    </div>
</section>
