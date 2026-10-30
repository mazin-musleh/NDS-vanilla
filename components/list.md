---
layout: page
title: List
hero_title: List - National Design System
hero_description: A set of like items in a grid or in rows that fill, each a card that shares the list's look
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "30/10/2026 - 08:28 PM"
---

<section id="list-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A list shows a set of like items, such as services, features, courses or people, in a [grid](../layout/grid) of equal columns, or in [flex](../layout/flex) rows that the items grow to fill. The list is a `ul` with `nds-grid` or `nds-flex`, and each item is a [card](../components/card). An item holds any card parts: a [featured icon](../components/featured-icon), an image, an avatar, tags, a price or actions. Classes on the list give every item the same look: the size, the item layout (stacked or row), and either no box (`nds-flat`) or a card box (`nds-stroke`, `nds-shadow`).

Pick another component when:

- the item stands alone: [Card](../components/card)
- each item is a name and its value: [Definition List](../components/definition-list)
- the items slide in a carousel: [Swiper](../components/swiper)
- each item is a navigation tile, one link: a [Grid](../layout/grid) of link cards
- each item is a page link in a column: [Drawer](../components/drawer)

</div>
  </div>
</section>

<section id="list-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="list-base" data-canon data-variants="list-variants-table">
<ul class="nds-list nds-grid nds-stroke nds-shadow" style="--max-col: 2; --min-col: 1;">
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-file-edit" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Apply Online</span>
        <p class="nds-card-description">Send the request and its documents from one form, with no office visit.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Track Your Request</span>
        <p class="nds-card-description">See each step of the review and the date of the decision.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-notification-01" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Instant Alerts</span>
        <p class="nds-card-description">Get a text message when the request needs an action from you.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-square-lock-02" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Secure Sign-in</span>
        <p class="nds-card-description">Sign in with your national digital identity.</p>
      </div>
    </div>
  </li>
</ul>
</script>
<script type="text/html" id="list-flex" data-canon>
<ul class="nds-list nds-flex nds-stroke nds-shadow" style="--card-width: 240px;">
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-file-edit" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Apply Online</span>
        <p class="nds-card-description">Send the request and its documents from one form, with no office visit.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Track Your Request</span>
        <p class="nds-card-description">See each step of the review and the date of the decision.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-notification-01" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Instant Alerts</span>
        <p class="nds-card-description">Get a text message when the request needs an action from you.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-square-lock-02" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Secure Sign-in</span>
        <p class="nds-card-description">Sign in with your national digital identity.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Book an Appointment</span>
        <p class="nds-card-description">Pick a branch and a time that suits you.</p>
      </div>
    </div>
  </li>
</ul>
</script>
<script type="text/html" id="list-part-person-1-avatar" data-canon>
<div class="nds-card-header">
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar2.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-person-1" data-canon>
<div class="nds-card-text">
  <div class="nds-card-corner">
    <span class="nds-tag nds-xs" data-status="success">
      <span class="nds-label">Active</span>
    </span>
  </div>
  <span class="nds-card-title">Noura Al-Qahtani</span>
  <p class="nds-card-description">Service Design Lead</p>
</div>
</script>
<script type="text/html" id="list-part-person-2-avatar" data-canon>
<div class="nds-card-header">
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar3.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-person-2" data-canon>
<div class="nds-card-text">
  <div class="nds-card-corner">
    <span class="nds-tag nds-xs" data-status="warning">
      <span class="nds-label">Away</span>
    </span>
  </div>
  <span class="nds-card-title">Faisal Al-Harbi</span>
  <p class="nds-card-description">Front-End Developer</p>
</div>
</script>
<script type="text/html" id="list-part-person-3-avatar" data-canon>
<div class="nds-card-header">
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar4.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-person-3" data-canon>
<div class="nds-card-text">
  <div class="nds-card-corner">
    <span class="nds-tag nds-xs" data-status="success">
      <span class="nds-label">Active</span>
    </span>
  </div>
  <span class="nds-card-title">Reem Al-Otaibi</span>
  <p class="nds-card-description">Content Designer</p>
</div>
</script>
<script type="text/html" id="list-part-person-4-avatar" data-canon>
<div class="nds-card-header">
  <div class="nds-avatar">
    <img src="../docs-assets/img/avatar5.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-person-4" data-canon>
<div class="nds-card-text">
  <div class="nds-card-corner">
    <span class="nds-tag nds-xs" data-status="neutral">
      <span class="nds-label">Offline</span>
    </span>
  </div>
  <span class="nds-card-title">Sara Al-Dosari</span>
  <p class="nds-card-description">Accessibility Tester</p>
</div>
</script>
<script type="text/html" id="list-part-person-5-avatar" data-canon>
<div class="nds-card-header">
  <div class="nds-avatar">
    <span class="nds-label">KM</span>
  </div>
</div>
</script>
<script type="text/html" id="list-part-person-5" data-canon>
<div class="nds-card-text">
  <div class="nds-card-corner">
    <span class="nds-tag nds-xs" data-status="success">
      <span class="nds-label">Active</span>
    </span>
  </div>
  <span class="nds-card-title">Khalid Al-Mutairi</span>
  <p class="nds-card-description">Data Analyst</p>
</div>
</script>
<script type="text/html" id="list-part-course-1-image" data-canon>
<div class="nds-card-header">
  <div class="nds-card-image">
    <img src="../assets/img/journy_students.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-1" data-canon>
<div class="nds-card-content">
  <div class="nds-card-text">
    <span class="nds-card-title">Data Analysis for Decision Makers</span>
    <p class="nds-card-description">Read a dashboard and turn its numbers into a plan.</p>
  </div>
  <div class="nds-card-value">
    <span class="nds-number-format" data-currency="SAR">2400</span>
  </div>
  <div class="nds-card-tags">
    <span class="nds-tag nds-blue">
      <span class="nds-label">Intermediate</span>
    </span>
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-2-image" data-canon>
<div class="nds-card-header">
  <div class="nds-card-image">
    <img src="../docs-assets/img/card_img.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-2" data-canon>
<div class="nds-card-content">
  <div class="nds-card-text">
    <span class="nds-card-title">Writing for Government Services</span>
    <p class="nds-card-description">Write service pages that people read and act on.</p>
  </div>
  <div class="nds-card-value">
    <span class="nds-number-format" data-currency="SAR">1800</span>
  </div>
  <div class="nds-card-tags">
    <span class="nds-tag nds-green">
      <span class="nds-label">Beginner</span>
    </span>
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-3-image" data-canon>
<div class="nds-card-header">
  <div class="nds-card-image">
    <img src="../assets/img/riyadhcenter.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-3" data-canon>
<div class="nds-card-content">
  <div class="nds-card-text">
    <span class="nds-card-title">Project Management Basics</span>
    <p class="nds-card-description">Plan a project, track its risks and report its progress.</p>
  </div>
  <div class="nds-card-value">
    <span class="nds-number-format" data-currency="SAR">3100</span>
  </div>
  <div class="nds-card-tags">
    <span class="nds-tag nds-green">
      <span class="nds-label">Beginner</span>
    </span>
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-4-image" data-canon>
<div class="nds-card-header">
  <div class="nds-card-image">
    <img src="../assets/img/riyadhcenter_ai.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-4" data-canon>
<div class="nds-card-content">
  <div class="nds-card-text">
    <span class="nds-card-title">AI in Public Services</span>
    <p class="nds-card-description">Find where AI saves time in a service, and where it does not.</p>
  </div>
  <div class="nds-card-value">
    <span class="nds-number-format" data-currency="SAR">2900</span>
  </div>
  <div class="nds-card-tags">
    <span class="nds-tag nds-yellow">
      <span class="nds-label">Advanced</span>
    </span>
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-5-image" data-canon>
<div class="nds-card-header">
  <div class="nds-card-image">
    <img src="../assets/img/riyadhcenter3s.webp" alt="">
  </div>
</div>
</script>
<script type="text/html" id="list-part-course-5" data-canon>
<div class="nds-card-content">
  <div class="nds-card-text">
    <span class="nds-card-title">Accessible Digital Content</span>
    <p class="nds-card-description">Make documents and pages that everyone can use.</p>
  </div>
  <div class="nds-card-value">
    <span class="nds-number-format" data-currency="SAR">1500</span>
  </div>
  <div class="nds-card-tags">
    <span class="nds-tag nds-blue">
      <span class="nds-label">Intermediate</span>
    </span>
  </div>
</div>
</script>
<script type="text/html" id="list-part-actions" data-canon>
<div class="nds-card-actions">
  <a href="#" class="nds-btn nds-primary">
    <span class="nds-label">Enroll</span>
  </a>
</div>
</script>
    </div>
  </div>
</section>

<section id="list-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Most options go on the list. Items puts its parts in every item. Icons and Icon color go on each `.nds-featured-icon`, and Featured item goes on the one item it features. Columns (Grid) and Lines (Grid) are for a grid list, and Item width (Flex) is for a flex list: each group is off on the other structure. Two rows with the same Group and Option are one choice: write both.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Grid (default) | — | — | Equal columns, and rows that line up. Use it for most lists, and for lines between the items |
| Structure | Flex (hint: Items that grow to fill each row) | canon `#list-flex` | — | Rows that wrap: each item starts at `--card-width` and grows to fill its row, the last row too. Use it when a short last row must not leave a gap, or for one featured item |
| Items | Icon (default) | — | — | The canon's items: a featured icon, a title and one line |
| Items | Person (hint: An avatar, a name, a role and a status tag) | remove | `.nds-list > .nds-card > .nds-card-header:has(> .nds-card-featured-icon)` | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | remove | `.nds-list .nds-card-text:not(:has(> .nds-card-corner))` | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-1-avatar` | `.nds-list > .nds-card:nth-child(1)` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-1` | `.nds-list > .nds-card:nth-child(1) > .nds-card-content` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-2-avatar` | `.nds-list > .nds-card:nth-child(2)` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-2` | `.nds-list > .nds-card:nth-child(2) > .nds-card-content` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-3-avatar` | `.nds-list > .nds-card:nth-child(3)` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-3` | `.nds-list > .nds-card:nth-child(3) > .nds-card-content` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-4-avatar` | `.nds-list > .nds-card:nth-child(4)` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-4` | `.nds-list > .nds-card:nth-child(4) > .nds-card-content` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-5-avatar` | `.nds-list > .nds-card:nth-child(5)` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Person (hint: An avatar, a name, a role and a status tag) | canon `#list-part-person-5` | `.nds-list > .nds-card:nth-child(5) > .nds-card-content` (start) | Each item takes a person: an avatar in place of the icon, then a name, a role and a status tag in `.nds-card-corner`. The list sizes the avatar, so it takes no size class. The status tag keeps `nds-xs`. The rows here write one sample person into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-1` | `.nds-list > .nds-card:nth-child(1)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-1-image` | `.nds-list > .nds-card:nth-child(1)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-2` | `.nds-list > .nds-card:nth-child(2)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-2-image` | `.nds-list > .nds-card:nth-child(2)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-3` | `.nds-list > .nds-card:nth-child(3)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-3-image` | `.nds-list > .nds-card:nth-child(3)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-4` | `.nds-list > .nds-card:nth-child(4)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-4-image` | `.nds-list > .nds-card:nth-child(4)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-5` | `.nds-list > .nds-card:nth-child(5)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-course-5-image` | `.nds-list > .nds-card:nth-child(5)` (start) | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | canon `#list-part-actions` | `.nds-list > .nds-card` | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | remove | `.nds-list > .nds-card > .nds-card-header:has(> .nds-card-featured-icon) + .nds-card-content` | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Items | Course (hint: An image, a title, a price, a level tag and an action) | remove | `.nds-list > .nds-card > .nds-card-header:has(> .nds-card-featured-icon)` | Each item takes a course: an image in place of the icon, then a title, a line, a price and a level tag, and an action after the content. Each part sits where the [Card](../components/card) page puts it. The rows here write one sample course into each item |
| Columns (Grid) | Two (default) | `--max-col: 2` | `.nds-list.nds-grid` | Two columns, and one on phones. Tablets take `--max-col` unless the list sets `--mid-col` |
| Columns (Grid) | Two (default) | `--min-col: 1` | `.nds-list.nds-grid` | Two columns, and one on phones. Tablets take `--max-col` unless the list sets `--mid-col` |
| Columns (Grid) | Three (hint: Three, then two on tablets, then one on phones) | `--max-col: 3` | `.nds-list.nds-grid` | Three columns on desktops, two on tablets, one on phones. Each screen size has its own count, and a missing one takes the next larger |
| Columns (Grid) | Three (hint: Three, then two on tablets, then one on phones) | `--mid-col: 2` | `.nds-list.nds-grid` | Three columns on desktops, two on tablets, one on phones. Each screen size has its own count, and a missing one takes the next larger |
| Columns (Grid) | Three (hint: Three, then two on tablets, then one on phones) | `--min-col: 1` | `.nds-list.nds-grid` | Three columns on desktops, two on tablets, one on phones. Each screen size has its own count, and a missing one takes the next larger |
| Columns (Grid) | One (hint: One item per row) | `--max-col: 1` | `.nds-list.nds-grid` | One item per row. A list with no `--max-col` and no `--min-width` gets it too |
| Columns (Grid) | Fit (hint: As many 220px columns as fit; the rest wrap) | `--min-width: 220px` | `.nds-list.nds-grid` | As many columns as fit, each at least `--min-width` wide, on every screen. Write no column count with it: a count wins over `--min-width`. The style must hold `--min-width`: there it turns off the one-column default |
| Columns (Grid) | Uneven (hint: Columns of different widths, here 2fr 1fr) | `--max-track: 2fr 1fr` | `.nds-list.nds-grid` | Columns of set widths, as a `grid-template-columns` value: `2fr 1fr` makes the first column twice the second. `--mid-track: 1fr` stacks them below 960px. A track value wins over the column counts |
| Columns (Grid) | Uneven (hint: Columns of different widths, here 2fr 1fr) | `--mid-track: 1fr` | `.nds-list.nds-grid` | Columns of set widths, as a `grid-template-columns` value: `2fr 1fr` makes the first column twice the second. `--mid-track: 1fr` stacks them below 960px. A track value wins over the column counts |
| Item width (Flex) | Fill (default) | — | `.nds-list.nds-flex` | Each item grows from `--card-width` to fill its row. A lone item in the last row takes the whole row |
| Item width (Flex) | Fill with a cap (hint: Items stop at a width, and a short row centers) (limit: 1 width choice) | `--card-width-max: 320px` | `.nds-list.nds-flex` | Items grow up to the cap, and a short last row sits in the middle. Use it when a lone last item would be too wide |
| Item width (Flex) | Fill with a cap (hint: Items stop at a width, and a short row centers) (limit: 1 width choice) | `--justify: center` | `.nds-list.nds-flex` | Items grow up to the cap, and a short last row sits in the middle. Use it when a lone last item would be too wide |
| Item width (Flex) | Own width (hint: Items keep their width, and the rows center) (limit: 1 width choice) | `--grow: 0` | `.nds-list.nds-flex` | Every item stays at `--card-width`, and each row sits in the middle. Use it for logos or numbers |
| Item width (Flex) | Own width (hint: Items keep their width, and the rows center) (limit: 1 width choice) | `--justify: center` | `.nds-list.nds-flex` | Every item stays at `--card-width`, and each row sits in the middle. Use it for logos or numbers |
| Featured item | Featured item (hint: The first item twice as wide) (limit: 1 width choice) | `--card-width: 480px` | `.nds-list.nds-flex > .nds-card:first-child` | The item starts at twice the list's `--card-width` and grows twice as fast. Write both values on that item. Not with Fill with a cap, which holds it to the others' width, or Own width, where it alone grows |
| Featured item | Featured item (hint: The first item twice as wide) (limit: 1 width choice) | `--grow: 2` | `.nds-list.nds-flex > .nds-card:first-child` | The item starts at twice the list's `--card-width` and grows twice as fast. Write both values on that item. Not with Fill with a cap, which holds it to the others' width, or Own width, where it alone grows |
| Layout | Stacked (default) | — | — | The icon above the text |
| Layout | Row (hint: The header beside the text) | `.nds-horizontal` | `.nds-list` | The header beside the text. Use it for a long list. An item under 324px wide puts its header back on top, and an image drops under the text when it does not fit beside it. On a flex list, write a wider `--card-width` too, such as `360px` |
| Layout | Row (hint: The header beside the text) | `--card-width: 360px` | `.nds-list.nds-flex` | The header beside the text. Use it for a long list. An item under 324px wide puts its header back on top, and an image drops under the text when it does not fit beside it. On a flex list, write a wider `--card-width` too, such as `360px` |
| Layout | Centered | `.nds-center` | `.nds-list` | The icon and the text centered. Use it for a short list of three or four items |
| Size | SM | `.nds-sm` | `.nds-list` | Smaller icons, text and gaps, for a list in a card or a side column |
| Size | MD (default) | — | — | The card's own sizes: a 40px icon |
| Size | LG | `.nds-lg` | `.nds-list` | Larger icons, text and gaps, for a list that leads a page |
| Icons (any) | Default (default) (hint: A light fill in the icon's color) | — | — | The icon as the canon writes it: a light fill in its color, with square corners |
| Icons (any) | Outline (limit: 1 icon style) | `.nds-outline` | `.nds-list .nds-featured-icon` | No fill and a border in the icon's color. Not with Dark or Subtle |
| Icons (any) | Dark (limit: 1 icon style) (hint: A solid fill and a white icon) | `.nds-dark` | `.nds-list .nds-featured-icon` | A solid fill and a white icon. Not with Outline or Subtle |
| Icons (any) | Subtle (limit: 1 icon style) (hint: The icon alone, with no container) | `.nds-subtle` | `.nds-list .nds-featured-icon` | The icon alone, one size smaller. Use it where the list sits beside other content and must read lighter. Not with Outline, Dark or Circle |
| Icons (any) | Circle (hint: Round icons) | `.nds-circle` | `.nds-list .nds-featured-icon:not(.nds-subtle)` | Round icons. It combines with Outline and Dark |
| Icons (any) | None (hint: A title and a description only) | remove | `.nds-list > .nds-card > .nds-card-header:has(> .nds-card-featured-icon)` | Items with no header: a title and a description only |
| Icon color | Brand (default) | — | `.nds-list .nds-featured-icon` | The brand color on the icons |
| Icon color | Neutral | `.nds-neutral` | `.nds-list .nds-featured-icon` | A neutral icon. Also `.nds-gray` |
| Icon color | Green | `.nds-green` | `.nds-list .nds-featured-icon` | A green icon |
| Icon color | Yellow | `.nds-yellow` | `.nds-list .nds-featured-icon` | A yellow icon |
| Icon color | Red | `.nds-red` | `.nds-list .nds-featured-icon` | A red icon |
| Icon color | Blue | `.nds-blue` | `.nds-list .nds-featured-icon` | A blue icon |
| Lines (Grid) | None (default) | — | `.nds-list.nds-grid` | No lines between the items |
| Lines (Grid) | Row lines (hint: A line between rows) | `.nds-divided` | `.nds-list.nds-grid` | A line between rows, in the middle of the gap, never under the last row |
| Box (any) | Flat (hint: No fill and no padding) | `.nds-flat` | `.nds-list:not(.nds-stroke, .nds-shadow)` | No fill and no padding, and a muted description: the items read as text, not boxes. Not with Stroke or Shadow |
| Box (any) | Stroke (default) (hint: A card box with a border) | `.nds-stroke` | `.nds-list:not(.nds-flat)` | Every item is a card box with a 1px border. Not with Flat. It combines with Shadow |
| Box (any) | Shadow (default) (hint: A card box with a shadow) | `.nds-shadow` | `.nds-list:not(.nds-flat)` | Every item is a card box with a shadow. Not with Flat. It combines with Stroke |
{: #list-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="list-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-layers-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Real Cards</span>
              <p class="nds-card-description">Each item is a card. Its knobs and its icon's classes still work, so one item can differ from the others.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-grid-view" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Grid or Flex</span>
              <p class="nds-card-description">A grid list takes Grid's columns, gaps and lines. A flex list grows its items to fill each row, the last row too.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-text-font" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Size for All Items</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">nds-sm</code> and <code class="nds-inline-code lang-html">nds-lg</code> on the list change every part of every item together: icons, avatars, date tiles, tags, buttons, prices, numbers, text and gaps.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Fits Narrow Columns</span>
              <p class="nds-card-description">A list under 400px wide makes its icons, avatars, date tiles and gaps smaller. The text keeps its size. A size class written on the list stays as written.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-colors" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Look for Every Item</span>
              <p class="nds-card-description">One class on the list gives every item the same box and layout: flat, a border, a shadow, a row or centered.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-package" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Lists Inside Cards</span>
              <p class="nds-card-description">In a card, the items take the list's look and knobs, not the outer card's.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-accessibility" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">A Real List</span>
              <p class="nds-card-description">A screen reader announces a list and its number of items. The list shows no bullets.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="list-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Build each item as the [Card](../components/card) page writes its parts: the header holds an icon, an image or an avatar, and the content holds the text, tags, a price and actions.
- Keep link cards out of a list. A set of navigation tiles, each one link, is a [Grid](../layout/grid) of link cards.
- Pick Grid for equal columns, one column, rows that line up or lines between the items. Pick Flex for rows that fill, the last one too, or for one featured item. A flex list always wraps and has no lines.
- In a grid list, set `--max-col` for more than one column. Without it, the items stack in one column.
- In a flex list, a lone item in the last row takes the whole row. Set `--card-width-max` to stop it, and `--justify: center` to center the row.
- A row list (`nds-horizontal`) needs wide items. An item under 324px wide puts its header back on top of the text, and an image drops under the text when it does not fit beside it. Give a row list fewer columns, or on a flex list a `--card-width` of about `360px`, never `auto`.
- On a flex list, `nds-center`, `nds-middle` and `nds-reverse` change the items only. To move the rows, set `--justify` and `--align`.
- A list fills its parent's width. In a box that sizes to its content (an inline block, a table cell), give the list a width: it measures itself to step down when narrow, so it cannot size the box.
- Set the size, the item layout and the box on the list, never on one item: the list's class wins, and the items line up.
- Give each icon its own look and color classes (`nds-subtle`, `nds-green`, …), so one icon can differ. An item may hold an avatar or an image instead of an icon.
- Leave the size class off an icon, an avatar, a tag, a rating or a button: the list sizes it. An avatar is XL, LG in a small list (`nds-sm`) and 2XL in a large one (`nds-lg`). A tag or a rating is SM, XS in a small list and MD in a large one. A status tag in `.nds-card-corner` is the exception: it keeps `nds-xs`, as in a single card, so it stays small at every list size.
- Hide every icon from screen readers with `aria-hidden="true"`. The title names the item.
- Put the list after a heading that says what the items are for.

</div>
  </div>
</section>

<section id="list-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

These card and icon knobs set on the list reach every item. Set one on one card or icon to change that item only. The list's classes change the defaults as the table says.

| Property | Default | Controls |
|---|---|---|
| `--card-bg` | the card's. `nds-flat`: `transparent` | Item fill |
| `--card-padding` | the card's. `nds-flat`: `0` | Item padding |
| `--card-text-color` | the card's. `nds-flat`: `var(--text-secondary-paragraph)` | Description color |
| `--card-title-FS`, `--card-title-LH` | the card's: `--typo-text-lg-*` | Title size. `nds-sm` sets `--typo-text-md-*`, `nds-lg` sets `--typo-text-xl-*` |
| `--card-description-FS`, `--card-description-LH` | the card's: `--typo-text-md-*` | Description size. `nds-sm` sets `--typo-text-sm-*`, `nds-lg` sets `--typo-text-lg-*` |
| `--card-gap` | the card's: `var(--spacing-3xl)`, `var(--spacing-xl)` on phones | Space between the icon and the text. `nds-sm` and a list under 400px wide set `var(--spacing-lg)`, `nds-lg` sets `var(--spacing-4xl)` |
| `--featuredicon-size` | `40px` | Icon size. `nds-sm` and a list under 400px wide set `32px`, `nds-lg` sets `48px` |
{: .nds-table .nds-responsive}

### Grid List
{: .nds-block-title}

A grid list's columns and gaps are the [grid's](../layout/grid#grid-api) knobs. One default differs: `--max-col` is `1`, unless the list's `style` writes `--min-width`.

### Flex List
{: .nds-block-title}

Set these on the list for every item, or on one item. `--gap` and `--align` are the [flex](../layout/flex#flex-api) knobs.

| Property | Default | Controls |
|---|---|---|
| `--card-width` | `320px` | The width an item starts at, before it grows. `auto`: the width of its content |
| `--card-width-max` | none | The widest an item grows. The card's own 360px cap is off in a flex list |
| `--grow` | `1` | How fast an item grows. `0` keeps it at `--card-width`. `2` grows twice as fast as `1` |
| `--justify` | `flex-start` | Where a short row sits: `center` or `flex-end` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

List has no script of its own. With `nds-divided`, the [grid](../layout/grid) script marks the last row, so no line shows under it.

</div>
  </div>
</section>

<section id="list-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Training Academy](../examples/training-academy): the "Why train with us" section, with subtle icons in three columns.
- [Services List](../examples/services-list): service cards with tags and actions, filtered and split into pages.
- [Admin Console Demo](../examples/console-demo): the team directory, row cards with an avatar, a status tag and a Meta line.

</div>
  </div>
</section>
