---
layout: page
title: Avatar
hero_title: Avatar - National Design System
hero_description: A round picture of a person or an account, with a photo, initials or an icon.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 06:27 PM"
---

<section id="avatarOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

An avatar is an element with the `nds-avatar` class that holds one item: a photo (`<img>`), initials (`nds-label`) or an icon. It is round by default. The element can be a `<div>`, a link or a button. Several avatars sit together in an `nds-avatar-group`, spaced apart or stacked so they overlap.

Pick another component when:

- the picture sits beside a name and a role: [Persona](../components/persona)
- the icon marks a status or a type, not a person: [Featured Icons](../components/featured-icons)

</div>
  </div>
</section>

<section id="avatarMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="avatar-icon" data-canon data-variants="avatarVariantsTable">
<div class="nds-avatar nds-xl">
  <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
</div>
</script>
<script type="text/html" id="avatar-initials" data-canon>
<div class="nds-avatar nds-xl">
  <span class="nds-label">NQ</span>
</div>
</script>
<script type="text/html" id="avatar-image" data-canon>
<div class="nds-avatar nds-xl">
  <img src="../docs-assets/img/avatar2.webp" alt="Noura Al-Qahtani">
</div>
</script>
<script type="text/html" id="avatar-link" data-canon>
<a href="#" class="nds-avatar nds-xl">
  <img src="../docs-assets/img/avatar3.webp" alt="Faisal Al-Harbi">
</a>
</script>
<script type="text/html" id="avatar-menu" data-canon>
<div class="nds-dropmenu">
  <button type="button" class="nds-avatar nds-xl nds-dropmenu-trigger" aria-label="Open the user menu">
    <span class="nds-label">NQ</span>
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
</script>
<script type="text/html" id="avatar-button" data-canon>
<button type="button" class="nds-avatar nds-xl">
  <img src="../docs-assets/img/avatar2.webp" alt="Noura Al-Qahtani">
</button>
</script>
<script type="text/html" id="avatar-group" data-canon>
<div class="nds-avatar-group nds-stacked nds-xl">
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar2.webp" alt="Noura Al-Qahtani">
  </div>
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar3.webp" alt="Faisal Al-Harbi">
  </div>
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar4.webp" alt="Reem Al-Otaibi">
  </div>
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar5.webp" alt="Sara Al-Dosari">
  </div>
  <div class="nds-avatar">
    <span class="nds-label">+9</span>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="avatarVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Link, Menu trigger and Button structures take any of the three contents: a photo, initials or an icon. Each size has two rows: the first sizes a single avatar, the second a group. Make the change that fits the markup. A row on `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` changes a single avatar only, not one inside a group. `:has(> img)` means the avatar holds a photo.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Icon (default) | — | — | A person icon, for an anonymous user or a system account |
| Structure | Initials | canon `#avatar-initials` | — | Two letters from the person's name, when there is no photo |
| Structure | Image | canon `#avatar-image` | — | A photo of the person. The `alt` text names them |
| Structure | Link | canon `#avatar-link` | — | An avatar that opens a profile. The image `alt` names the link |
| Structure | Menu trigger | canon `#avatar-menu` | — | An avatar that opens the user menu, as the trigger of a [Dropmenu](../components/dropmenu). `aria-label` names the button |
| Structure | Button | canon `#avatar-button` | — | An avatar that runs an action on the page, such as opening a profile panel. The image `alt` names the button |
| Structure | Group | canon `#avatar-group` | — | Several avatars in a row, such as the members of a team. The last one counts the people it does not show |
| Size | XS | `.nds-xs` | `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` | 24px, for a line of text or a dense list |
| Size | XS | `.nds-xs` | `.nds-avatar-group` | The same size for every avatar in the group, 2px apart |
| Size | SM | `.nds-sm` | `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` | 32px, for a table row |
| Size | SM | `.nds-sm` | `.nds-avatar-group` | The same size for every avatar in the group, 4px apart |
| Size | MD | `.nds-md` | `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` | 40px, the same as no size class |
| Size | MD | `.nds-md` | `.nds-avatar-group` | The same size for every avatar in the group, 6px apart |
| Size | LG | `.nds-lg` | `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` | 48px, for a card |
| Size | LG | `.nds-lg` | `.nds-avatar-group` | The same size for every avatar in the group, 8px apart |
| Size | XL (default) | `.nds-xl` | `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` | 64px, for a card header |
| Size | XL (default) | `.nds-xl` | `.nds-avatar-group` | The same size for every avatar in the group, 10px apart |
| Size | 2XL | `.nds-2xl` | `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` | 80px, for a profile card |
| Size | 2XL | `.nds-2xl` | `.nds-avatar-group` | The same size for every avatar in the group, 12px apart |
| Size | 3XL | `.nds-3xl` | `.nds-avatar:not(.nds-avatar-group > .nds-avatar)` | 120px with a 4px ring, for a profile header |
| Size | 3XL | `.nds-3xl` | `.nds-avatar-group` | The same size and ring for every avatar in the group, 14px apart |
| Square | Square | `.nds-square` | `.nds-avatar` | Rounded corners in place of a circle, for an organization or a service account. In a group, give it to every avatar |
| Image border | Image border | `.nds-image-border` | `.nds-avatar:has(> img)` | A thin dark line inside the edge of the photo, so a light photo stays apart from a light page |
| Stacked | Stacked (default) | `.nds-stacked` | `.nds-avatar-group` | The avatars overlap. Leave it out to space them apart by the group gap. Each stacked avatar has a ring in the border color. The ring is 1px at XS and SM, 2px at MD and LG, and 4px at XL and larger. At 3XL it replaces the border, so the photo keeps its full size |
{: #avatarVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="avatarFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Pure CSS</span>
          </span>
          <p class="nds-item-desc">Avatars need no JavaScript. They show at the first paint, from the markup alone.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Seven Sizes</span>
          </span>
          <p class="nds-item-desc">From 24px (XS) to 120px (3XL). The initials are a third of the size and the icon is half, so both scale with it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">Any Element</span>
          </span>
          <p class="nds-item-desc">The same class works on a <code class="nds-inline-code lang-html">&lt;div&gt;</code>, a link or a button. A link avatar keeps the avatar colors, not the link color.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-user-group"></i>
            <span class="nds-label">Group Layout</span>
          </span>
          <p class="nds-item-desc">A size class on the group sets the size of every avatar in it, and the gap grows with the size.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-contrast"></i>
            <span class="nds-label">High Contrast Ring</span>
          </span>
          <p class="nds-item-desc">In high contrast mode, every avatar gets a solid ring inside its edge, so a photo stays apart from the page.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="avatarPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Show a photo when one is available. When there is none, show two letters from the person's name.
- Use an icon avatar for an anonymous user or a system account, where no one is named.
- Write `alt` text that names the person. Use `alt=""` only when the name shows in text next to the avatar.
- Give a link or button avatar a name. A photo names it through its `alt`. An avatar with initials or an icon needs `aria-label`, such as `aria-label="Open the user menu"`.
- Pick the size by place: XS or SM in a line of text or a table row, MD or LG in a card, XL and larger in a profile header.
- In a group, set the size on `nds-avatar-group`. The group size replaces a size class on an avatar inside it.
- Use a group to show the members of a team or the people on a task in little space.
- End a long group with an initials avatar that counts the people it does not show, such as `+9`.

</div>
  </div>
</section>

<section id="avatarApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--avatar-size` | `40px` | Width and height. The size classes set it. Set it on the avatar, or on a parent to size every avatar inside |
| `--avatar-gap` | `6px` | Space between the avatars of a group. A stacked group overlaps them by twice this value. Set it on the group |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every avatar inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../components/tokens). The border is the ring of a 3XL avatar and of each avatar in a stacked group.

{{ site.data.tokens.components.avatar.html }}

</div>
  </div>
</section>

<section id="avatarRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Admin Console Demo](../examples/console-demo): a 2XL avatar in each card of the team directory, with an icon when there is no photo.
- [Faculty Profile](../examples/faculty): a 3XL photo with an image border beside the page title.
- [Faculty CV](../examples/faculty-cv): a photo avatar in the hero, set by `hero_avatar`.
- [Cards](../components/cards): an avatar in the card header.
- [Persona](../components/persona): an avatar beside a name and a role.
- [Quote](../components/quote): the avatar of the person quoted.
- [Section](../layout/section): an avatar as the section image.

</div>
  </div>
</section>
