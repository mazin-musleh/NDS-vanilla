// Console-shape chrome: topbar + main nav + side menu + footer.
// Copied from NDS_ROOT/_source/ui-shell/{topbar,mainnav,sidemenu,footer}.md canonical
// markup (built twin: _site/examples/console-demo.html). Content edits only —
// see NDS-PLAN.md. Demo-only nav-actions (search/notifications/login/language) are
// omitted: this project has nothing to back them (Build §"wire project-backed controls").
const h = React.createElement
const { useEffect } = React

const HEADER_HTML = `
<div class="nds-topbar nds-content-wrapper" role="region" aria-label="Top bar utilities">
  <button class="nds-btn nds-menu-btn nds-digital-stamp-tab" role="button" aria-expanded="false" aria-controls="nds-digital-stamp">
    <img class="nds-flag" src="/public/assets/icon/SAflag.min.svg" width="20" height="14" loading="lazy" alt="Logo of Saudi Arabia Flag">
    <span class="nds-digital-stamp-lg-text nds-truncate">A government website registered with the Digital Government Authority.</span>
    <span class="nds-digital-stamp-sm-text nds-truncate">Government website registered with DGA</span>
    <span class="nds-link nds-primary">How you know?</span>
  </button>
  <div class="nds-topbar-info">
    <span id="nds-date" class="nds-text-icon" data-calendar="hijri" data-hidden="sm md"></span>
    <span id="nds-real-time-clock" class="nds-text-icon" data-hidden="sm"></span>
    <button class="nds-btn nds-subtle nds-theme-toggle-wrap" data-theme-toggle aria-label="Toggle dark mode">
      <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
    </button>
  </div>
</div>
<div id="nds-digital-stamp" role="region" aria-label="Digital government stamp" hidden>
  <div class="nds-content-wrapper">
    <div class="nds-digital-stamp-notices">
      <div class="nds-digital-stamp-card">
        <div class="nds-digital-stamp-icon"><i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i></div>
        <div class="nds-digital-stamp-content">
          <div class="nds-digital-stamp-heading">Official Saudi Government website URL ends with <span class="nds-digital-stamp-highlight">gov.sa</span></div>
          <div class="nds-digital-stamp-description">Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .</div>
        </div>
      </div>
      <div class="nds-digital-stamp-card">
        <div class="nds-digital-stamp-icon"><i class="nds-icon nds-hgi-square-lock-01" aria-hidden="true"></i></div>
        <div class="nds-digital-stamp-content">
          <div class="nds-digital-stamp-heading">Official Secure websites use <span class="nds-digital-stamp-highlight">HTTPS</span></div>
          <div class="nds-digital-stamp-description">Secured governments websites in the Kingdom of Saudi Arabia use Https encryption.</div>
        </div>
      </div>
    </div>
    <div class="nds-digital-stamp-register">
      <img src="/public/assets/img/dga-logo-icon.svg" width="21" height="31" alt="Digital Government Authority" loading="lazy">
      <div>
        <span>Registered on Digital Government Authority: </span>
        <a class="nds-digital-stamp-registration nds-primary nds-underline" href="#" target="_blank">00000000000</a>
      </div>
    </div>
  </div>
</div>
<nav class="nds-main-nav nds-content-wrapper" id="nds-main-nav" aria-label="Primary navigation">
  <div class="nds-nav-container">
    <a href="#/nds" class="nds-brand">
      <span class="nds-brand-name">Records Portal</span>
    </a>
    <ul class="nds-nav-minimal" hidden>
      <li class="nds-nav-toggler nds-nav-item">
        <button class="nds-nav-link nds-btn nds-subtle nds-indicator" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nds-nav-collapse">
          <i class="nds-icon nds-hgi-menu-01" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
    <div class="nds-nav-collapse" id="nds-nav-collapse" hidden>
      <div class="nds-nav-collapse-content">
        <ul class="nds-nav-primary"></ul>
        <ul class="nds-nav-actions"></ul>
      </div>
    </div>
  </div>
</nav>
`

const SIDEMENU_HTML = `
<button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" hidden>
  <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
  <span class="nds-label nds-truncate" hidden>Side menu</span>
</button>
<nav class="nds-drawer nds-divided nds-full-height">
  <div class="nds-scroll-more nds-divided">
    <ul class="nds-drawer-list nds-scroll-more-content">
      <li data-state="active">
        <a class="nds-btn nds-subtle nds-indicator" href="#/nds/records">
          <span class="nds-label">Records</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
`
// Only Records ships this gate — plan §Open items grows this list as later
// gates land (Reports/Home/About/Contact/Settings), never a link to a dead route.

const FOOTER_HTML = `
<nav class="nds-footer-content" aria-label="Footer navigation">
  <div class="nds-footer-column">
    <span class="nds-footer-heading" id="nds-footer-col-1">Main Links</span>
    <ul class="nds-footer-list" aria-labelledby="nds-footer-col-1">
      <li><a class="nds-link nds-footer-link" href="#/nds"><span class="nds-label">Home</span></a></li>
      <li><a class="nds-link nds-footer-link" href="#/nds/records"><span class="nds-label">Records</span></a></li>
    </ul>
  </div>
  <div class="nds-footer-column">
    <span class="nds-footer-heading" id="nds-footer-col-2">Contact &amp; Support</span>
    <ul class="nds-footer-list" aria-labelledby="nds-footer-col-2">
      <li><a class="nds-link nds-footer-link" href="tel:920000000"><i class="nds-icon nds-hgi-headphones" aria-hidden="true"></i><span class="nds-label">920 000 000</span></a></li>
      <li><a class="nds-link nds-footer-link" href="mailto:support@example.gov.sa"><i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i><span class="nds-label">support@example.gov.sa</span></a></li>
    </ul>
  </div>
</nav>
<hr class="nds-divider nds-lg">
<div class="nds-footer-bottom">
  <div class="nds-footer-meta">
    <div class="nds-footer-legal">
      <div class="nds-footer-copyright"><span>All Rights Reserved Records Portal &copy; 2026</span></div>
      <div class="nds-footer-policy">
        <a class="nds-link" href="#"><span class="nds-label">Terms &amp; Conditions</span></a>
        <a class="nds-link" href="#"><span class="nds-label">Privacy Policy</span></a>
      </div>
    </div>
  </div>
</div>
`

export default function Shell({ children }) {
  useEffect(() => {
    // Framework Views contract (core/refresh.md) says refresh() is the whole
    // mount contract, but component banners are more precise for cold content:
    // Filter/Pagination stay un-init'd after refresh() on markup that didn't
    // exist during nds-main.min.js's own DOMContentLoaded scan — confirmed via
    // NDS.Init.audit() (data-filter-items/paged-content stayed "skeleton-held").
    // components/filter.md and pagination.md both route new instances through
    // their own init(), which is what NDS.Init.initialize() (the "whole page
    // body replaced" sweep) drives — the right call for this SPA's first NDS
    // paint, where #root goes from empty to the full console page in one shot.
    window.NDS?.Init.initialize()
    return () => window.NDS?.Init.destroy(document.body)
  }, [])

  return h(
    React.Fragment,
    null,
    h('header', { dangerouslySetInnerHTML: { __html: HEADER_HTML } }),
    h(
      'main',
      null,
      h(
        'div',
        { className: 'nds-content-layout nds-has-sidemenu' },
        h('aside', {
          className: 'nds-sidemenu',
          'aria-label': 'Sidebar',
          dangerouslySetInnerHTML: { __html: SIDEMENU_HTML },
        }),
        h('div', { className: 'nds-content' }, children)
      )
    ),
    h('footer', {
      className: 'nds-footer nds-content-wrapper nds-brand',
      role: 'contentinfo',
      'aria-label': 'Site Footer',
      dangerouslySetInnerHTML: { __html: FOOTER_HTML },
    })
  )
}
