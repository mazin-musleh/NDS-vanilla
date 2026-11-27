# NDS → guide map

Which guides to retrieve for each NDS page. `scripts/web-guidance.mjs update` reads this table to say which pages a changed guide touches, so keep one row per page and the ids in backticks.

**Every run also retrieves `accessibility`** (~50 KB): grep its `##` headings and Read only the sections the page touches. Add `forms` for any field, `motion` for anything that animates, and `dark-mode` or `color` when the finding is about color. A page with no row: `search` once by its UI pattern, then add the row.

## Components

| Page | Guides |
|---|---|
| accordion | `accordion` `search-hidden-content` `interactive-content-reveal` `animate-to-intrinsic-sizes` |
| alert | `persistent-toast-notifications` `accessible-generated-content` |
| autocomplete | `forms` `ime-safe-enter-submit` `viewport-aware-dropdowns` `menu` |
| avatar | `deliver-optimized-decorative-images` `icons` |
| breadcrumb | `breadcrumbs` `single-line-overflow` |
| button | `custom-button-actions` `icons` `copy-button` |
| calendar | `support-global-calendar-systems` `calculate-event-differentials` `capture-location-agnostic-data` |
| card | `card` `size-aware-styling` `usage-aware-component-variations` |
| chart | `expose-canvas-content-to-browser-features` `accessible-generated-content` |
| checkbox | `checkbox` `forms` |
| chips | `toolbar` `single-line-overflow` |
| clock | `capture-location-agnostic-data` `support-global-calendar-systems` |
| code | `copy-button` `overflow-clipping-control` |
| content-placeholder | `motion` `animate-element-entry-exit` |
| content-switcher | `tabs` `anchor-positioning-tab-underline` |
| countdown | `calculate-event-differentials` `capture-location-agnostic-data` |
| custom-select | `branded-select-styling` `select-menu-interaction` `viewport-aware-dropdowns` `rich-media-picker` |
| date | `support-global-calendar-systems` `capture-location-agnostic-data` |
| date-picker | `support-global-calendar-systems` `capture-location-agnostic-data` `forms` `viewport-aware-dropdowns` |
| date-tile | `support-global-calendar-systems` |
| drawer | `navigation-drawer` `dialog` `prevent-page-scroll-under-modal-dialog` `animate-to-from-top-layer` |
| dropmenu | `menu` `viewport-aware-dropdowns` `persistent-top-layer-ui` `ime-safe-enter-submit` |
| editor | `sanitize-untrusted-html` `ime-safe-enter-submit` `toolbar` `highlight-text-ranges` |
| export | `copy-button` |
| fab | `scroll-position-aware-elements` `custom-button-actions` |
| feedback | `accessible-error-announcement` `required-field-feedback` |
| filter | `forms` `ime-safe-enter-submit` `dynamic-sort` |
| form | `forms` `validate-input-after-interaction` `required-field-feedback` `accessible-error-announcement` `autofill-address-form` `autofill-sign-in-form` `autofill-sign-up-form` `autofill-highlight-inputs` `brand-consistent-forms` |
| formatted-input | `forms` `ime-safe-enter-submit` `autofill-payment-form` |
| image | `optimize-image-priority` `deliver-optimized-decorative-images` |
| ipv | `dialog` `2d-panning` `animate-to-from-top-layer` |
| link | `html` |
| list | `card` `size-aware-styling` |
| loading | `spinner` `progress` `motion` |
| modal | `dialog` `light-dismiss-a-dialog` `platform-controls-dismiss-dialog` `prevent-page-scroll-under-modal-dialog` `animate-to-from-top-layer` `declarative-dialog-popover-control` |
| multiselect | `branded-select-styling` `select-menu-interaction` `viewport-aware-dropdowns` |
| otp | `sms-otp-form` `forms` |
| pagination | `html` |
| persona | `deliver-optimized-decorative-images` |
| panel | `dialog` `navigation-drawer` `prevent-page-scroll-under-modal-dialog` |
| password | `autofill-sign-in-form` `autofill-sign-up-form` `forms` |
| progress | `progress` `progress-ring` |
| quote | `typography` |
| radio | `forms` `checkbox` |
| rating | `forms` |
| scroll-more | `scrollability-affordance-hints` |
| selection | `checkbox` `forms` |
| share | `copy-button` |
| slider | `slider` |
| sort | `dynamic-sort` `sortable-table` |
| stepper | `progress` |
| swiper | `carousel` `carousel-snap-highlights` `scroll-snap-state-sync` `scroll-snap-realtime-feedback` |
| switch | `switch` `checkbox` |
| table | `responsive-table` `sortable-table` `state-aware-sticky-headers` |
| tabs | `tabs` `search-hidden-content` `anchor-positioning-tab-underline` |
| tag | `single-line-overflow` |
| taginput | `forms` `ime-safe-enter-submit` |
| time-picker | `capture-location-agnostic-data` `forms` |
| timeline | `progress` |
| toc | `scrollspy` `scroll-target-on-load` |
| toolbar | `toolbar` |
| tooltip | `position-aware-tooltips` `interest-triggered-tooltips` `hovercard` |
| upload | `forms` `drag-and-drop` |
| voice-input | `forms` |

No guide fits, so `sweep` skips them: cooldown, definition-list, divider, empty, featured-icon, index, meta, metric, user-feedback, weather. Recheck this line on every `update`.

## UI shell, layout, foundations and utilities

| Page | Guides |
|---|---|
| accessibility | `respect-os-text-scale` `adapt-scrollbar-to-contrast-preferences` `typography` |
| head | `optimize-preload-priority` `optimize-script-priority` `visually-stable-font-fallbacks` `browser-ui-theming` `secure-external-subresources` |
| header | `navbar` `shrinking-header-on-scroll` `state-aware-sticky-headers` |
| main-nav | `navbar` `app-menus` `menu` |
| sidemenu | `navigation-drawer` `navbar` |
| session-timeout | `dialog` `detect-initial-visibility-state` |
| section | `defer-rendering-heavy-content` `css-layout` `responsive-design` |
| themes | `dark-mode` `dark-mode-toggle` `component-specific-light-dark-theme` `browser-ui-theming` `customize-scrollbar-color-and-thickness` |
| tokens | `typography` `improve-text-layout-and-legibility` `visually-stable-mixed-fonts` `respect-os-text-scale` `design-token-reactivity` |
| icons | `icons` |
| expandable | `interactive-content-reveal` `animate-to-intrinsic-sizes` `search-hidden-content` |
| truncate-text | `single-line-overflow` |
| copy | `copy-button` |
