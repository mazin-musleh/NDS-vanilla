---
layout: page
title: Persona
hero_title: Persona - National Design System
hero_description: Persona shows a person's avatar, name and role, with an optional row of actions or details
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:12 PM"
---

<section id="personaOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A Persona holds an [Avatar](../components/avatar) and up to three lines of text: the name, the role and a short description, such as an email address. After a divider, it can hold a row of actions or a [Definition List](../components/definition-list) of details.

Pick another component when:

- the person is one of many items in a grid or a list: [Cards](../components/cards), with an avatar header.
- you show only a photo or initials: [Avatar](../components/avatar).
- the person is the author of a quotation: [Quote](../components/quote), which holds its own small Persona.

</div>
  </div>
</section>

<section id="personaMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="persona-base" data-canon data-variants="personaVariantsTable">
<div class="nds-persona">
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar2.webp" alt="">
  </div>
  <div class="nds-persona-info">
    <span class="nds-persona-name">Noura Al-Qahtani</span>
    <span class="nds-persona-role nds-truncate">System Administrator</span>
    <span class="nds-persona-desc">noura@example.gov.sa</span>
  </div>
</div>
</script>
<script type="text/html" id="persona-actions" data-canon>
<hr class="nds-divider">
<div class="nds-persona-action">
  <a href="#" class="nds-btn nds-subtle">
    <i class="nds-icon nds-hgi-identity-card" aria-hidden="true"></i>
    <span class="nds-label">Portal</span>
  </a>
  <a href="#" class="nds-btn nds-subtle">
    <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
    <span class="nds-label">Change Password</span>
  </a>
  <a href="#" class="nds-btn nds-subtle nds-destructive">
    <i class="nds-icon nds-hgi-door-01" aria-hidden="true"></i>
    <span class="nds-label">Logout</span>
  </a>
</div>
</script>
<script type="text/html" id="persona-details" data-canon>
<hr class="nds-divider">
<dl class="nds-definition-list nds-divided nds-grid" style="--max-col: 2; --min-col: 1;">
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-building-02"></i>
      <span class="nds-label">Department</span>
    </dt>
    <dd>Digital Services</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-id"></i>
      <span class="nds-label">Employee ID</span>
    </dt>
    <dd>DGA-4827</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-location-01"></i>
      <span class="nds-label">Location</span>
    </dt>
    <dd>Riyadh</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-calendar-01"></i>
      <span class="nds-label">Joined</span>
    </dt>
    <dd>March 2021</dd>
  </div>
</dl>
</script>
    </div>
  </div>
</section>

<section id="personaVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Actions and Details parts go at the end of `.nds-persona`, after the info block. Each part starts with its own divider.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Size | LG (default) | — | — | An 80px avatar. For a profile page or a team page |
| Size | MD | `.nds-md` | `.nds-persona` | A 64px avatar and smaller text. For a side panel, a drawer or a list |
| Size | SM | `.nds-sm` | `.nds-persona` | A 48px avatar and the smallest text. For a menu or a narrow card. The site header's user menu uses it |
| Layout | Row (default) | — | — | The avatar beside the text |
| Layout | Column (hint: Avatar above the text, aligned to the start) | `.nds-colView` | `.nds-persona` | The avatar above the text, aligned to the start |
| Layout | Center (hint: Avatar above the text, everything centered) | `.nds-center` | `.nds-persona` | The avatar above the text, everything centered. For a profile header or a greeting |
| Avatar | No avatar | `remove` | `.nds-avatar` | Text only. For a menu where the user's photo is already on the trigger |
| Extra | None (default) | — | — | Identity only |
| Extra | Actions | canon `#persona-actions` | `.nds-persona` | A row of links or buttons for this person's account. Each button is as wide as its label |
| Extra | Details | canon `#persona-details` | `.nds-persona` | A definition list of facts about the person, such as a department or a location. For a directory entry |
{: #personaVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="personaFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-expand"></i>
            <span class="nds-label">One Size Class for Every Part</span>
          </span>
          <p class="nds-item-desc">A size class sets the size of the avatar and of all three lines together. You change one class, not four sizes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-user-circle"></i>
            <span class="nds-label">Avatar Size From the Persona</span>
          </span>
          <p class="nds-item-desc">The avatar inside takes its size from the Persona, so it needs no size class. A size class on the avatar still wins.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-hierarchy"></i>
            <span class="nds-label">Full Row After the Divider</span>
          </span>
          <p class="nds-item-desc">Every element after the <code class="nds-inline-code lang-html">nds-divider</code> takes its own full row, below the avatar and the text: an action row, a definition list, or your own content.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-variable"></i>
            <span class="nds-label">Knobs for Each Line</span>
          </span>
          <p class="nds-item-desc">The name, the role and the description each have a font size, a line height and a color knob, such as <code class="nds-inline-code lang-css">--persona-name-color</code>. Restyle one line and keep the others.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="personaPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Give the avatar photo `alt=""`. The name is next to it, so a screen reader would read the name twice.
- Keep the name, the role and the description to one line each. The description is one short identifier, such as an email address or a job code, not a sentence.
- Leave out any text line the person does not have. Do not write an empty `<span>`.
- Add actions only when they act on this person or this account. A directory entry that only shows a person needs no actions.
- Put the divider before the actions or the details. Without it, nothing separates them from the name above.
- For a byline with only a name, write the name as text. The full Persona adds weight that a byline does not need.

</div>
  </div>
</section>

<section id="personaApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

Set these knobs in the `style` attribute of `.nds-persona`. The MD and SM classes set the size knobs on the same element, so a rule in your stylesheet can lose to them.

| Property | Default | Controls |
|---|---|---|
| `--persona-name-FS` | `var(--typo-text-xl-FS)` | Name font size |
| `--persona-name-LH` | `var(--typo-text-xl-LH)` | Name line height |
| `--persona-name-color` | `var(--text-default)` | Name color |
| `--persona-role-FS` | `var(--typo-text-lg-FS)` | Role font size |
| `--persona-role-LH` | `var(--typo-text-lg-LH)` | Role line height |
| `--persona-role-color` | `var(--text-primary-paragraph)` | Role color |
| `--persona-desc-FS` | `var(--typo-text-md-FS)` | Description font size |
| `--persona-desc-LH` | `var(--typo-text-md-LH)` | Description line height |
| `--persona-desc-color` | `var(--text-secondary-paragraph)` | Description color |
| `--avatar-size` | `80px` (MD `64px`, SM `48px`) | The avatar size. See [Avatar](../components/avatar) |
{: .nds-table .nds-responsive}

MD takes every text one step down the type scale, and SM two steps.

</div>
  </div>
</section>

<section id="personaRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Main Navigation](../ui-shell/mainnav): the user menu is a small Persona with no avatar and an action row.
- [Quote](../components/quote): the author under a quotation is a small Persona.

</div>
  </div>
</section>
