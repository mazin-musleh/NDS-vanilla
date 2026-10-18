---
layout: page
title: Timeline
hero_title: Timeline - National Design System
hero_description: A timeline lists dated events in order, such as the history of a request, with the events done, the current one and the ones to come.
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "18/10/2026 - 10:01 PM"
---

<section id="timeline-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A timeline is a vertical [Stepper](../components/stepper) with small dots or icons, where each step is one event. It uses the Stepper markup, classes and script, so it has no class of its own. A [Divider](../components/divider) at the start of a step, or a [Meta](../components/meta) line under its title, gives the event its date. The script colors each event done, current or to come from the stepper's `data-current`.

Pick another component when:

- the user moves through the steps of a flow, such as a form: [Stepper](../components/stepper)
- the dated items have no order between them, such as a list of exam dates: [Drawer](../components/drawer) rows with a [Date Tile](../components/date-tile)
- the progress is a percentage: [Progress](../components/progress)

</div>
  </div>
</section>

<section id="timeline-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="timeline-shipment" data-canon data-variants="timeline-variants-table">
<div class="nds-stepper nds-vertical nds-dot nds-reverse" id="shipment-timeline" data-current="4">
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Document issued</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
            Riyadh
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            12 March, 9:20 AM
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Handed to the courier</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
            Riyadh
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            12 March, 2:05 PM
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">At the sorting center</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
            Jeddah
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            13 March, 7:40 AM
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Out for delivery</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
            Jeddah
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            13 March, 10:15 AM
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Delivered</span>
        <span class="nds-stepper-description">Expected today by 6:00 PM</span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="timeline-request" data-canon>
<div class="nds-stepper nds-vertical nds-dot nds-reverse" id="request-timeline" data-current="5">
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">4 January 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Request submitted</span>
        <span class="nds-stepper-description">Reference 2026-118204</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">6 January 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Under review</span>
        <span class="nds-stepper-description">Licensing department</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">8 January 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Changes requested</span>
        <span class="nds-stepper-description">Upload a clearer copy of the national ID</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">9 January 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Documents updated</span>
        <span class="nds-stepper-description">A new copy of the national ID was uploaded</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">Pending</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Decision</span>
        <span class="nds-stepper-description">Usually within 5 working days</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">Next</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Permit issued</span>
        <span class="nds-stepper-description">Sent to your email after approval</span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="timeline-activity" data-canon>
<div class="nds-stepper nds-vertical nds-static nds-icons nds-reverse" id="activity-timeline">
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-edit-02" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Request created</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-user" aria-hidden="true"></i>
            Fahad Al-Otaibi
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            Yesterday, 11:05 AM
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-file-upload" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Document uploaded</span>
        <span class="nds-stepper-description">Commercial register.pdf</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-user" aria-hidden="true"></i>
            Fahad Al-Otaibi
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            Yesterday, 4:30 PM
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-comment-01" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Comment added</span>
        <span class="nds-stepper-description">Please confirm the start date.</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-user" aria-hidden="true"></i>
            Sara Al-Qahtani
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            Today, 9:15 AM
          </span>
        </span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-checkmark-circle-02" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Request approved</span>
        <span class="nds-meta">
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-user" aria-hidden="true"></i>
            Sara Al-Qahtani
          </span>
          <span class="nds-meta-item">
            <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
            Today, 10:42 AM
          </span>
        </span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="timeline-agenda" data-canon>
<div class="nds-stepper nds-vertical nds-dot" id="agenda-timeline" data-current="2">
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content nds-row nds-middle">
      <time class="nds-date-tile nds-sm" datetime="2026-12-13">
        <span class="nds-date-tile-weekday">Sun</span>
        <span class="nds-date-tile-day">13</span>
        <span class="nds-date-tile-month">Dec</span>
      </time>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Registration</span>
        <span class="nds-stepper-description">8:00 AM, Main entrance</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content nds-row nds-middle">
      <time class="nds-date-tile nds-sm" datetime="2026-12-14">
        <span class="nds-date-tile-weekday">Mon</span>
        <span class="nds-date-tile-day">14</span>
        <span class="nds-date-tile-month">Dec</span>
      </time>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Opening session</span>
        <span class="nds-stepper-description">9:00 AM, Main Hall</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content nds-row nds-middle">
      <time class="nds-date-tile nds-sm" datetime="2026-12-15">
        <span class="nds-date-tile-weekday">Tue</span>
        <span class="nds-date-tile-day">15</span>
        <span class="nds-date-tile-month">Dec</span>
      </time>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Workshops</span>
        <span class="nds-stepper-description">10:00 AM, Rooms A to D</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content nds-row nds-middle">
      <time class="nds-date-tile nds-sm" datetime="2026-12-16">
        <span class="nds-date-tile-weekday">Wed</span>
        <span class="nds-date-tile-day">16</span>
        <span class="nds-date-tile-month">Dec</span>
      </time>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Closing and awards</span>
        <span class="nds-stepper-description">7:00 PM, Main Hall</span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="timeline-milestones" data-canon>
<div class="nds-stepper nds-vertical nds-icons" id="milestones-timeline" data-current="3">
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-idea-01" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">Q1 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Planning</span>
        <span class="nds-stepper-description">Scope, budget and partners approved</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-test-tube-01" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">Q2 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Pilot</span>
        <span class="nds-stepper-description">The service runs in two regions</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-rocket-01" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">Q3 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">National rollout</span>
        <span class="nds-stepper-description">Every region, in four waves</span>
      </div>
      <div class="nds-stepper-action">
        <button type="button" class="nds-btn nds-primary nds-sm">
          <span class="nds-label">Track the rollout</span>
        </button>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle">
        <i class="hgi hgi-stroke hgi-chart-evaluation" aria-hidden="true"></i>
      </div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-divider">Q4 2026</div>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Review</span>
        <span class="nds-stepper-description">Results published and the project handed over</span>
      </div>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="timeline-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each Structure is one use of the timeline, with its order and its labels written in. The Content card goes on every step's content. Size applies to a timeline with icons, since a dot has one size.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Shipment (default) (hint: Tracking with a place and a time per event) | — | — | Delivery or document tracking. A [Meta](../components/meta) line gives the place and the time of each event |
| Structure | Request (hint: A request's history, newest on top) | canon `#timeline-request` | — | The history of one request or case, with the decision pending and the permit to come. A divider dates each event |
| Structure | Activity (hint: A log of who did what, with an icon per kind of event) | canon `#timeline-activity` | — | A log with nothing to come, such as the actions on a record. `nds-static` gives every event the same look, and `nds-icons` shows the kind of event. Each event's Meta line gives who did it and when |
| Structure | Agenda (hint: Dated sessions with a Date Tile, first on top) (id: agenda) | canon `#timeline-agenda` | — | A plan read from the start, such as an event program. `nds-row` on each step's content puts a [Date Tile](../components/date-tile) beside the text, and `nds-middle` lines the text up on the tile's middle. The tile follows the event's state: a solid fill for the current event, gray for the events to come |
| Structure | Milestones (hint: The phases of a plan, with an icon each and a button on the current one) (id: milestones) | canon `#timeline-milestones` | — | The phases of a project or a plan, first on top. `nds-icons` gives each phase its icon, and a done phase shows a check mark in its place. The current phase holds a button in `nds-stepper-action` |
| Order | Newest on top (default) (hint: The last event on top) (not: agenda, milestones) | `.nds-reverse` | `.nds-stepper` | The last event on top. Write the events oldest first, and add a new event at the end. See Order under Behavior |
| Order | Oldest on top (hint: The first event on top) (not: agenda, milestones) | — | — | The first event on top. Agenda and Milestones always read this way |
| Size | MD (default) | — | — | 32px circles. A dot has one size: 16px |
| Size | LG | `.nds-lg` | `.nds-stepper:not(.nds-dot)` | 40px circles. Not with dots |
| Size | XL | `.nds-xl` | `.nds-stepper:not(.nds-dot)` | 48px circles. Not with dots |
| Card (any) | Timeline (hint: The whole timeline in one card. Turns on Stroke) (limit: 1 card) (demo: + stroke) | `.nds-card` | `.nds-stepper` | The whole timeline in one [Card](../components/cards). For a timeline in a side column or a dashboard panel. Write Stroke too |
| Card (any) | Content (hint: Each event in a card beside its dot, with the line kept) (limit: 1 card) | `.nds-card` | `.nds-stepper-content` | The content of each event in a card beside its dot. The line stays, and the card border takes the color of the event's state. Put the class on every step's content. Add Stroke for the card's own border color |
| Card (any) | Stroke (hint: A border in the card's own color) (id: stroke) | `.nds-stroke` | `.nds-stepper.nds-card` | A border around the timeline card |
| Card (any) | Stroke (hint: A border in the card's own color) (id: stroke) | `.nds-stroke` | `.nds-stepper-content.nds-card` | On every content card: the card's own border color in place of the event's state color |
| Card (any) | Shadow (hint: A shadow under each card) | `.nds-shadow` | `.nds-card` | An elevation shadow under each card. It combines with the border |
| On color | On color (hint: For a dark or brand background. Not with Meta) | `.nds-oncolor` | `.nds-stepper:not(:has(.nds-meta))` | Light dots, lines and text, for a dark or brand background. Write `nds-oncolor` on every label divider too. Not with a [Meta](../components/meta) line, which has no on-color look |
| On color | On color (hint: For a dark or brand background. Not with Meta) | `.nds-oncolor` | `.nds-stepper:not(:has(.nds-meta)) .nds-divider` | The same class on every label divider |
| Middle | Middle (default) (hint: The text on the middle of the Date Tile) | `.nds-middle` | `.nds-stepper-content.nds-row` | Lines the text up on the middle of the tile. Off, the text starts at the top of the tile. See [Flex](../layout/flex) |
| Loading | Loading (hint: Skeleton placeholders while the data loads) | `.nds-loading` | `.nds-stepper` | Every event shows as a skeleton while its data loads. Keep steps in the markup for the skeleton to cover, and remove the class when the data is in |
{: #timeline-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="timeline-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Order
{: .nds-block-title}

`nds-reverse` shows the last step on top. Write the events oldest first, and add a new event at the end. Without it, the first step is on top: use that for a plan read from the start, such as an agenda.

### Progress
{: .nds-block-title}

`data-current` names the current event, from 1: the one in progress or the next to happen, such as a decision not yet made. The script marks the events before it done and the events after it to come. When nothing is left to come, write the number of events plus 1, and every event shows done.

### Static
{: .nds-block-title}

`nds-static` drops the progress, so every event has the same look. Use it for a log with nothing to come, such as the actions on a record. With `nds-icons` and no `nds-dot`, each event gets a circle with an icon for the kind of event.

### Date Labels
{: .nds-block-title}

A [Divider](../components/divider) at the start of a step's content labels the event: a date, a quarter, or a word such as Today or Pending. Its line runs on as the separator between events. Give every event a label, or none: labels on only some events read unevenly.

</div>
  </div>
</section>

<section id="timeline-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-workflow-circle-06"></i>
            <span class="nds-label">Automatic State</span>
          </span>
          <p class="nds-item-desc">Write <code class="nds-inline-code lang-html">data-current</code> and the script marks every event done, current or to come. Write a new number later and the events change with it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-dashed-line-circle"></i>
            <span class="nds-label">Placeholders Before Start</span>
          </span>
          <p class="nds-item-desc">Until the script starts, each event shows as a skeleton in its final layout.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-add-circle"></i>
            <span class="nds-label">New Events</span>
          </span>
          <p class="nds-item-desc">Add a step and write the new count in <code class="nds-inline-code lang-html">data-total</code>, and the script reads the events again.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-03"></i>
            <span class="nds-label">Change Events</span>
          </span>
          <p class="nds-item-desc">The timeline fires <code class="nds-inline-code lang-js">nds:stepper:change</code> after <code class="nds-inline-code lang-html">data-current</code> or <code class="nds-inline-code lang-html">data-total</code> changes.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="timeline-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Write the events oldest first and add `nds-reverse` for newest on top. A new event then goes at the end.
- Write every date label in one format, such as `4 January 2026`.
- Keep a title to what happened, in 2 to 4 words. Put who, where and when in the description, or in a [Meta](../components/meta) line inside `nds-stepper-text`, so it stays close to the title.
- Say in the text when an event is still to come, such as "Pending". The dot shows the state to the eye only, and a screen reader does not announce it.
- Give the timeline an `id` when a script changes it. The Stepper methods find it by its id.
- Give a circle icon `aria-hidden="true"`. The title names the event.
- Put a timeline that can grow long in a [Scroll More](../components/scroll-more), so the page keeps its length.
- Use `nds-dot` or `nds-icons`, not both. A dot shows no icon.

</div>
  </div>
</section>

<section id="timeline-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A timeline is a Stepper. Its methods, events, custom properties and tokens are on the [Stepper](../components/stepper#stepper-api) page.

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-vertical` | `.nds-stepper` | The events in a column. A timeline needs it |
| `nds-dot` | `.nds-stepper` | A small dot with no number for each event |
| `nds-reverse` | `.nds-stepper` | The last step on top. See Order under Behavior |
| `nds-static` | `.nds-stepper` | Every event has the same look, with no progress. See Static under Behavior |
| `nds-row` | `.nds-stepper-content` | The parts of the event side by side, such as a Date Tile beside the text |
| `nds-middle` | `.nds-stepper-content.nds-row` | The parts on their middles, top to bottom. A [Flex](../layout/flex) class |
| `nds-icons` | `.nds-stepper` | A circle with an icon for each event, in place of the dot. Write one icon in every `.nds-stepper-circle`. Not with `nds-dot` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-current` | `.nds-stepper` | The current event, from 1: the one in progress or the next to happen. Write it at page load: without it, event 1 is current. The number of events plus 1 shows every event done. A static timeline ignores it |
| `data-total` | `.nds-stepper` | The number of events. The script writes it when it starts. After you add or remove events, write the new count in it |
| `data-state` | `.nds-stepper-step` | The script writes `completed`, `current` or `upcoming` on each event from `data-current`. Do not write it yourself |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="timeline-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Faculty CV](../examples/faculty-cv): a career timeline, newest role on top, with year ranges as labels.
- [Student Portal](../examples/student-portal): today's classes as a timeline with a card on each event.
- [Stepper](../components/stepper): the component a timeline is built on.

</div>
  </div>
</section>
