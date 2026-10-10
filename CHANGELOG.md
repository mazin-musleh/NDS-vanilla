# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Audit** — `NDS.Init.audit()` lists what fails silently on a page, such as a filter that binds to nothing, an id a target names that does not exist, or one id on two elements. It also finds every class, attribute, id, custom property and window setting a release renamed or removed, in the markup and the site's CSS, and returns an array. See the [Audit](https://mazin-musleh.github.io/NDS-vanilla/core/audit.html) and [Migration](https://mazin-musleh.github.io/NDS-vanilla/core/migration.html) pages.
- **Button** — an `nds-avatar` in a button takes the icon size, 24px on a large button, and hides under the spinner while loading. `nds-vertical` on a More button (`nds-ellipsis`) stands its dots in a column.
- **Button** — `.nds-seamless` on a `.nds-btn-group` drops the divider between its buttons, for subtle icon buttons that read as one set of tools. See the [Button](https://mazin-musleh.github.io/NDS-vanilla/components/button.html) page.
- **Cards** — `nds-center` on `nds-flex` centers its children (and across, with `nds-col`) without an inline `--justify`.
- **Code** — A CSS color value in a code block gets a swatch before it. Copy skips it. See the [Code](https://mazin-musleh.github.io/NDS-vanilla/components/code.html) page.
- **Cookies** — a Manage view with one switch per category (necessary, performance, functional, targeting), and a Done view with Undo. `NDS.Cookies.allowed(category)` and `NDS.Cookies.save(choice)` serve a consumer's own consent UI. Text comes from the `cookies` section of `assets/i18n/{lang}.json` (moved there by the localization sweep). The panel script loads only for a visitor with no stored choice, or on the first `data-cookies-toggle` press.
- **Countdown** — The time left until a deadline or until a duration ends, as text or statistic cards. The script writes the numbers, and the unit word into an empty label, in the page language. An empty `data-countdown` waits for `NDS.Countdown.set()`. See the [Countdown](https://mazin-musleh.github.io/NDS-vanilla/components/countdown.html) page.
- **Dark areas** — `data-theme="dark"` on any element renders it and its content in dark mode. Page-level DGA colors are unchanged. See the Themes page, Dark Areas.
- **Date** — `NDS.date` in core: `parse`, `format`, `convert` and `today()` for Gregorian and Hijri dates (`calendar: 'hijri'`, Umm al-Qura). `data-timezone` and `data-date-format` on `<html>` set the site's timezone and format; `data-date-format` on any element sets it for its content (`NDS.date.formatFor(el)`). Docs: [Date](https://mazin-musleh.github.io/NDS-vanilla/core/date.html).
- **Date Picker** — a hidden `<input class="nds-date-value">` in `.nds-date-picker` holds the date for the server, in its own `data-date-format` and `data-calendar`, or the picker's: `data-date-format="YYYY-MM-DD" data-calendar="gregory"` sends an ISO day from a Hijri field. In a range, the first holds the start and the second the end. Text that is not a date leaves it empty; a form reset clears it.
- **Date Picker** — `data-min-date="today"` and `data-max-date="today"` use the current day in the site's timezone and the field's calendar.
- **Dates** — `NDS.date.calendarFor(el, fallback)`. Sort reads the nearest calendar; `NDS.Sort.detectType`, `parseValue` and `compare` take the calendar as a new last argument.
- **Divider** — `nds-primary` and `nds-oncolor` colours. See the [Divider](https://mazin-musleh.github.io/NDS-vanilla/utilities/divider.html) page.
- **Editor** — `data-editor-upload-url` on `.nds-editor` adds the image file picker in markup (a server URL, or `embed`), with `data-editor-upload-auto-upload`, `-max-file-size`, `-allowed-types` and `-allowed-mime-types`. `setImageUpload()` still works.
- **FAB** — `data-fab-gap="sm|md|lg"` adds 8px, 16px or 32px between a FAB and the one before it in the dock; `--fab-gap` sets any other amount.
- **Feedback Icons** — `nds-lg` (and `size: 'lg'` in `NDS.Feedback.create()`): a 32px icon with large text.
- **File Upload** — `response` on each file object (the server's reply); `data-field-name` (`fieldName`) names the request field, default `file`; `data-upload-timeout` (`uploadTimeout`) ends an upload as an error after that many seconds, and `retry()` can resend it.
- **File Upload** — each row shows the file size in `.nds-file-size`; a file added with no content shows none. A custom `.nds-file-item-template` shows it once it holds a `.nds-file-size`.
- **Filter** — a group with no `data-filter-type` that holds your own range slider (`.nds-slider-container`) is a range filter on that slider.
- **Forms** — `data-required` on a Dropmenu picker (`data-select-name`) now stops the form until a value is picked. A required File Upload passes once it holds a file that passed its checks. A form does not submit while a file is uploading. `NDS.Forms.setState(el, 'required')` no longer puts `required` on a Tag Input's or a File Upload's inputs.
- **Forms** — National ID and IBAN checks: `.nds-national-id` and `.nds-iban` clean the value and fail the field on a wrong checksum, at blur and submit. See the [Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html) page.
- **Hero** — `--overlay` on the sub hero tints its photo as on a main hero slide; the default `0.5` shows the photo at half strength, and `--overlay: 0` gives the old full photo. `--hero-image-position` picks the part of the photo in view (default `left center`).
- **Images** — `assets/img/placeholder.svg`, a neutral gray image with a picture mark, for a photo slot the project has no image for yet. The template photos live in `docs-assets/`, which does not ship.
- **Internationalization** — every component reads its text from one pack per language, `assets/i18n/en.json` and `ar.json`, one section per component; a new language is one more file. Accessibility keeps `assets/i18n/accessibility/`. `window.NDS_I18N` overrides key by key. `NDS.i18n.strings()` gives a site's own component its text; `NDS.date.monthNames()` / `.weekdayNames()` name months and days in any language. Screen reader labels that had only English now have Arabic. New page: [Internationalization](https://mazin-musleh.github.io/NDS-vanilla/core/i18n.html).
- **Main Navigation** — `NDS.Mainnav.destroy()`, the `nds:mainnav:opened` and `nds:mainnav:closed` events, and the `data-nav-open` and `data-nav-actions-open` flags.
- **National Day 96** — Type 2, the official campaign hero: six slides, each with its own card, colour and typed word, moving on by themselves. It is the pack's default and runs on older NDS runtimes too. See the [National Day 96](https://mazin-musleh.github.io/NDS-vanilla/events/national-day-96.html) page.
- **NDS IQ v4.0** — Rules for AI coding agents, 13% shorter. They name no NDS file, class or API. See [NDS IQ](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).
- **NDS-INDEX.md** — Ships at the template zip root and maps each need (a component, the head, page shapes, an upgrade) to this release's files. NDS IQ v4.0 reads it first.
- **Page Layout** — a skip link, first in `body`: `<a class="nds-skip-link" href="#main-content">`, with `id="main-content"` on `.nds-content`. Every layout writes it. `<main>` keeps the hero, the side menu and the page feedback.
- **Panel** — `NDS.Panel.open(ref, { focus: false })` opens a panel without moving focus.
- **Panels** — `.nds-panel-action` groups several header buttons, such as a reset beside the close button. See the [Panels](https://mazin-musleh.github.io/NDS-vanilla/components/panels.html) page.
- **Rating** — A required score: `data-required` on the `.nds-form-group` that holds a rating makes [Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html) validation treat `data-rating="0"` as empty and focus the first star. A pick clears the message. See the [Rating](https://mazin-musleh.github.io/NDS-vanilla/components/rating.html) page.
- **Section** — A title icon: a featured icon with `.nds-section-icon` inside `.nds-section-title`, before the title text, which goes in a `<span>`. `--section-icon-size` sets its height. See the [Section](https://mazin-musleh.github.io/NDS-vanilla/layout/section.html) page.
- **Selection** — Select-all, `data-state="selected"` and the `nds:selection:change` event work on any list: table rows, cards or a checkbox list. Select-all takes the current page; the counter's Select all and Clear all buttons take every page. See the [Selection](https://mazin-musleh.github.io/NDS-vanilla/components/selection.html) page.
- **Session Timeout** — a warning modal before an idle session ends, with a countdown (WCAG 2.2.1). `NDS.SessionTimeout.init({ timeout, warn, extend, logout })` starts it, with English and Arabic text. Activity renews the session, tabs share one deadline, `extend` posts a keep-alive, and `left` takes the time left from the server. Events: `nds:session:extend`, `nds:session:end`. Methods: `extend()`, `reset()`, `end()`, `destroy()`. Docs: [Session Timeout](https://mazin-musleh.github.io/NDS-vanilla/components/session-timeout.html).
- **Share** — `data-share-href` on a button in `.nds-share` adds any other target, such as Facebook or email: a share link with `{url}` and `{title}`, which the script fills in.
- **Sort** — markup wiring with no `create()` call: `data-sort-target="listId"` on a trigger names the list, and `data-sort-mode="cycle"` picks cycle mode. Sort writes `sorted-asc` or `sorted-desc` on the active trigger (on the header cell in a table), and an icon with `nds-sort-icon` turns with it. Written in the markup, the state marks a list the server sent sorted. New methods `NDS.Sort.init()` and `NDS.Sort.refresh(root)`; `NDS.Init.audit()` warns about a `data-sort-target` that names no element, or a list a Filter or table sorts.
- **Time Picker** — A time field the user types into, or picks from hour, minute and second lists. `data-format` sets 12 or 24-hour and seconds, `data-step` the minute steps, `data-min-time` and `data-max-time` the bounds. A hidden `.nds-time-value` submits a 24-hour value. See the [Time Picker](https://mazin-musleh.github.io/NDS-vanilla/components/time-picker.html) page.
- **User Feedback** — Submit sends the form data to the form's `action` with `NDS.request`, with a spinner until the reply. A failure shows the error message (`data-error-message`) and keeps the form open. `nds:userfeedback:submit` fires on the widget after validation, with `{ form, data }`: cancel it to send the data yourself, then call the new `NDS.UserFeedback.showStatus(el, 'success'|'error')`.
- **User Feedback** — A Rating structure, `nds-user-feedback-rating`: a star score for a service, with a comment, in the same three steps as the survey. It shows its prompt while the form is open and a recap of the score after a success. See the [User Feedback](https://mazin-musleh.github.io/NDS-vanilla/components/user-feedback.html) page.

### Changed
- **Avatar** — a stacked group draws a ring in `--avatar-border` around each avatar: 1px at XS and SM, 2px at MD and LG, 4px at XL and larger; at 3XL it replaces the border.
- **Backdrop** — Removed: the `--backdrop-z-index` knob, which never applied.
- **Button** — A button fits its content in a column layout again; in 1.12 it stretched to the column's width. `.nds-full` makes one fill its container.
- **Cards** — `nds-center` on a card centers its content only; the card no longer moves to the middle of its container (the global `nds-center` utility's `margin-inline: auto` leaked onto it). To center a card, use `nds-grid nds-center`, or `nds-flex nds-center` for a single card. A modal is unchanged.
- **Dark areas** — `nds-oncolor` no longer applies to a status tag. A dark surface takes `data-theme="dark"` instead.
- **Date Picker** — The calendar opens from its button, not from a click in the field, so it no longer covers the text being typed. A field with no button still opens from the input. The select caret is gone.
- **File Upload** — a server upload goes `uploading` → `processing` (every byte sent) → `complete`; `create()` on a started field merges its options.
- **Forms** — A field's built-in icon buttons (clear, show password, voice input, the date and time picker toggles, number + and −) carry `nds-icon-only` in their markup, and so do the Code copy button and the modal close. Without it a field's icon button kept its text padding and drew wider than tall: add the class to yours. `NDS.Init.audit()` names any icon-only button that lacks it.
- **Hero** — the 550px height cap is gone: `--hero-height` can make the main hero taller, and a sub hero with a lot of content grows.
- **Image Popup Viewer** — the viewer's buttons are NDS buttons in a dark area, 40px on every screen (50px on desktop before). `viewer.destroy()` also removes the viewer and frees `window.ndsIPV`, so `NDS.Ipv.init()` can start a new one. Right-click on the full image opens the browser menu again. The viewer no longer blurs the page.
- **JavaScript API** — `create()` returns the live instance, or `null` when it cannot build one.
- **Link** — a link is primary by default everywhere, not only in a content section; `nds-neutral` makes it neutral anywhere. Breadcrumb, footer and alert keep neutral links, and a link that is an avatar keeps its look. A plain `<a>` outside a section that relied on the neutral default turns primary: add `nds-neutral` to keep it neutral.
- **Links** — `NDS.Link` no longer adds `rel="noopener noreferrer"` to an external link: it adds the `.nds-external` badge class and `target="_blank"` only. Set `rel` yourself if you want `noreferrer`. See the [Link](https://mazin-musleh.github.io/NDS-vanilla/components/link.html) page.
- **Numbers** — Deprecated: `data-free`: for a free price, write the label with no `data-currency`.
- **Password** — A failing rule blocks submit through its red rule chip; Forms adds no error message under the field. See the [Password](https://mazin-musleh.github.io/NDS-vanilla/components/password.html) page.
- **Persona** — every element after the divider takes its own full row; a definition list after it needs no inline `flex`.
- **Scroll More** — `--scroll-max-width` defaults to `100%` (was `none`), so wide content scrolls; set `none` for the old behavior.
- **Section** — Removed: the `--section-image-MB` knob, which nothing read.
- **Sort** — with no sort attribute, a date in the text reads in the nearest `data-date-format` around the list (`<html>`, or `DD/MM/YYYY` by default), in Latin or Arabic digits, or as `YYYY-MM-DD`. Other text with `/` or `:` between digits sorts as text (`12/31/2026` sorted as 12 before). A day-first date with dashes or a 2-digit year (`15-03-26`) now sorts as text on a `DD/MM/YYYY` site: write `data-sort-value="2026-03-15"`.
- **Stepper** — CSS alone sets the layout, so the script no longer adds or removes `nds-vertical` and `nds-radial`. `next()` on the last step of a radial stepper marks it completed, and the last step stays in view with a full ring.
- **Stepper** — `completed` is written only by `next()` on the last step, or by a `data-current` past it, not on arriving at the last step.
- **Swiper** — the four knobs no longer pass down: a swiper inside another one takes only its own.
- **Tags** — The default side padding is `--spacing-lg`.
- **Tooltip** — A tooltip has one look: its help icon needs no `data-status`. Existing markup with a status keeps its look. See the [Tooltip](https://mazin-musleh.github.io/NDS-vanilla/components/tooltip.html) page.
- **Top Bar** — the date and the clock follow `data-timezone`; the Arabic Gregorian date uses Latin digits, like the Hijri date.

### Fixed
- **Accordion** — The loading bar stays next to a leading icon.
- **Autocomplete** — "No results" shows only on a `data-strict` field. `destroy()` cleans the field so it can start again. A menu moved to `<body>` (`data-portal`, or inside a drawer or modal) keeps its highlight and no-results style.
- **Avatar** — an avatar that is also an `nds-btn` shows its photo.
- **Breadcrumb** — `destroy()` restores the collapsed levels and removes the overflow menu.
- **Breakpoints** — A width between two tiers, such as 959.5px under browser zoom or Windows display scaling, now matches one of them.
- **Button** — A loading button keeps its colours behind the spinner, and so does a disabled progress button. Status colours hold on hover, press and selected. The copy button's success flash stays green. An on-color button's progress ring follows its label colour. An icon-only button fits a built-in icon with even padding. In a group, a circle no longer rounds the seams, and `nds-full` fits.
- **Cards** — A block or prose card is full width, with no doubled gap. Card loading bars skip accordion buttons. `nds-truncate` clips a card title. In a row card the status tag stays under the icon. The price skeleton and padding are fixed.
- **Chips** — A chip fits its content in a column layout, and a disabled chip's icon takes the disabled colour.
- **Content Placeholder** — It fills a centering parent's width, and `nds-sm` is one control tall, with roomier padding.
- **Cookies** — Reject clears trackers set on a parent domain (`_ga` on `.example.com` survived a Reject on `www.`).
- **Cooldown Button** — The count keeps time in a hidden tab. The end of a cycle no longer enables a button the page disabled. A button with no `.nds-label` warns in the console.
- **Copy** — the default announcement is «تم النسخ» on an Arabic page; it was always "Copied".
- **Copy** — A second press during the "Copied" flash is ignored, so the button no longer stays "Copied".
- **Core** — markup added after page load with `loading`, `hidden`, `has-more`, `always-open` or `dropbox` already in its `data-state` now gets its styles.
- **Core** — `NDS.escapeHtml` escapes quotes too, so its output is safe in attribute values. The focus trap skips hidden inputs and `tabindex="-1"` ends, so Tab stays inside a modal. The scroll lock restores fractional scroll offsets, and positioned popups handle 3D transforms.
- **Custom Select** — A read-only select does not open from the keyboard, and the keyboard opens the menu on the selected item.
- **Date Picker** — Hijri dates follow Umm al-Qura exactly; before, most were 1 or 2 days off.
- **Date Picker** — A read-only field keeps the calendar closed. Opening a field with a Gregorian value no longer fires a stray `change`, and Clear drops the old converted date.
- **Definition list** — `nds-md` and `nds-sm` titles keep 16px and 14px on phones instead of shrinking.
- **Divider** — A labelled divider's text lines up with its lines, and a vertical divider spaces sideways.
- **Dropmenu** — a dropmenu in a row that centers its items is centered too. It still fills a column section action.
- **Dropmenu** — `data-search` no longer hides the footer buttons (Apply, Reset): it narrows only the items in `.nds-dropmenu-scroll`.
- **Dropmenu** — `data-search` hides a group with no matches, and its divider. The mouse wheel scrolls the page over a menu that fits.
- **Editor** — in dark mode, disabled toolbar buttons match the field's label.
- **Editor** — an image or a link inserted before the user clicks in the text lands at the end; it was dropped. Insert with a file that is still uploading or failed says so.
- **Editor** — The link, image and remove-component popups no longer show old data after a fast reopen, and a fast double-click on Insert or Unlink no longer loses the selection. Enter keeps a button label whose whole text is selected. Buttons, tags, chips, featured icons and avatar links stay on one line through cleanup, the toolbar and Enter. Undo puts the caret back in the right place. A read-only or disabled editor keeps its toolbar disabled. A selected image shows the focus ring.
- **Empty** — The placeholder spans every column of an `.nds-grid`, and `refresh()` updates a table placeholder's `colspan` when the columns change.
- **Event themes** — Switching theme removes the real event slide, not a loop clone, and the pack's tab labels keep their bold selected look.
- **Expandable Content** — The Show More / Show Less text is the button's accessible name, in the page language. `recheckHeight()` reads a runtime change to `--max-height`. A box added after page load gets its fade and button at once, and the fade no longer shows behind the button.
- **Export** — the date in a file name is today in the site's timezone, not the UTC date.
- **Export** — A negative number stays a number in CSV and Excel, so the column sums.
- **FAB** — a FAB with `data-fab-pos="auto"` docks on its toggle's `data-panel-side` when the panel is built on first press. `data-panel-side` alone now moves the accessibility FAB and panel.
- **Featured Icons** — In dark mode a dark-style icon follows its parent's status, and the neutral fill is darker for contrast.
- **File Upload** — a long file name stays on one line, ends in an ellipsis, keeps the extension, and shows in full on hover.
- **File Upload** — a disabled drop zone took dropped files; `retry()` uploaded a file the checks had rejected; Single kept uploading the file it replaced.
- **Filter** — a form-mode filter without `data-ajax` now submits the form when a chip is removed, on the menu's Reset and on `reset()`. A generated radio group submits as `filter-{name}`, like checkbox and switch groups. `data-search` on a filter menu narrows the generated options.
- **Forms** — a required field with a picker in its prefix (a phone number with a country code) is checked again.
- **Forms** — A read-only checkbox, radio or switch holds its value against Space and the arrow keys. A disabled one, and a disabled field's buttons in dark mode, take the disabled colours. `data-state="loading"` written in the HTML shows the spinner from the start, in its own slot.
- **Forms** — A required `data-strict` Autocomplete submitted empty shows its "required" message: the strict check cleared it, leaving the form blocked with no message.
- **Forms** — An icon-only button in a field's action slot is square: it takes its width from the slot's height.
- **Forms** — A field's message sits right after its input row, so a search box's suggestions stay below it.
- **Grid** — `hidden` and `.nds-hidden` hide an `.nds-grid`: its own `display: grid !important` kept it showing.
- **Hero** — a relative path in it loads from the page, not from the stylesheet's folder.
- **Image Popup Viewer** — the image counter reads `1 / 5` in Arabic; it read `5 / 1`. A thumbnail added after page load opens the viewer, and `NDS.Ipv.reinit()` gives it keyboard access. In Arabic, Left moves to the next image and Right to the previous.
- **Internationalization** — a `window.NDS_I18N` override no longer leaves a component's other text in English. A language file may leave sections out: they read `en.json`. The language files find `nds-main.min.js` as the bundles do, so a module script or a folder not named `js/` works. Voice input, the top bar date and city, and the audit follow any page language.
- **JavaScript API** — Tabs, Breadcrumb, Expandable Content, Pagination and responsive Tables built with `create()` mark themselves as the page sweep does: a later `init()` no longer builds a second instance, and a created pagination can be destroyed.
- **Link** — The focus padding no longer applies to `.nds-brand`.
- **Loader** — with `enableLogging`, the audit now runs 3 seconds after load, not 13. A main CSS with another name, such as `nds-main.3f2a.min.css`, gets its icon and accessibility sheets.
- **Loader** — A negative `--per-page` falls back to 6 instead of throwing before the page shows.
- **Main Navigation** — a row-list menu stacks its links in a column below 960px; the brand gives way below 960px so the menu button stays on screen; the brand name and slogan have default colors; the drawer's show more arrow no longer covers the last link when every action is pinned; an avatar with initials in an icon-only item shows its initials.
- **Modal** — Focus moves into the modal when it opens and back to its trigger when it closes.
- **Multiselect** — a multiselect written with `data-state="disabled"` disables its menu button too.
- **Multiselect** — A read-only multiselect's chips and Reset cannot change it. `destroy()` removes the chips. An icon-only menu button takes its name from `aria-label`.
- **Numbers** — a number formatted twice in a language that groups with a period (German, Turkish, Spanish) broke (`3.240.000` became `3,24.000`) because every `NDS.Init.refresh()` formatted the page again. An `.nds-icon` inside `nds-number-format` no longer turns dark in dark mode. A `+` sign and a prefix before a minus sign in `data-target` are kept. A number keeps its decimals as written: `1250.50` shows as `1,250.50`.
- **OTP Input** — `nds:otpComplete` fires when the boxes are filled out of order.
- **Page Layout** — In card view with no side menu, the cards center under the hero on a wide screen; they sat at the start edge. A ghost section keeps the cards' column.
- **Panels** — Closing a panel returns focus to its opener without scrolling the page. A panel with no footer keeps its space below the body, and a divider that opens the body keeps a small gap above it.
- **Password** — Arabic letters are removed before the rules run, so they no longer count as a symbol.
- **Popups** — Page menus and tooltips open under the main navigation and an open panel; one inside the navigation, a panel or a modal still opens on top of it.
- **Progress** — The value reaches screen readers: the script adds `role="progressbar"` when it is missing and keeps `aria-valuemin`, `aria-valuemax` and `aria-valuenow` in step with `data-value`, `data-num`, `data-max` and `data-status`. Small circles use a smaller "out of" number.
- **Prose** — The gap before the first and after the last shown child is trimmed, nested ones too; headings `h4` to `h6` get their gap above; long words break.
- **Prose** — List-item rules weigh like one class, so a component class overrides them. The block gap is on the end side only. A definition list description, pagination items and Scroll More content inside prose drop its paragraph and list spacing.
- **Rating** — A rating that started disabled gets its hover and press styles back when `enable()` turns it on.
- **Scroll More** — No more "ResizeObserver loop completed with undelivered notifications" console errors, from Scroll More and from divided grids.
- **Section** — A breakout body stops at the max width plus one gutter on wide screens.
- **Share** — the menu labels stay on one line when the menu moves to `<body>`.
- **Side Menu** — moving `data-state="active"` to another `li` after load (a client-side route) highlights its link, opens its groups and renames the top bar.
- **Slider** — A disabled or read-only slider is locked, its keys included.
- **Sort** — the active trigger keeps its other `data-state` tokens; Sort replaced them with `selected`.
- **Status Section** — a button with an icon no longer shows the icon above its label, and two buttons in the action no longer stack. **Section — Fixed:** an `nds-center` section with an image centers its title and description.
- **Stepper** — `nds-reverse`, `nds-cardView` and `nds-center` follow the layout of each screen size, so a responsive stepper no longer jumps. The radial counter reads `1 / 3` in Arabic; it read `3 / 1`.
- **Stepper** — On-color step text stays hidden under the loading skeleton.
- **Swiper** — `--max-slides`, `--mid-slides`, `--min-slides` and `--peek` set in a class work as they do inline, so a strict-CSP page gets its slide count.
- **Swiper** — A looping row no longer jumps back on fast arrow clicks, runs out of clones during a run of swipes, or stops mid-move, and `goTo()` clamps on a loop. A loop clone on screen answers a click while its controls stay out of the tab order. Card borders and shadows stay inside the row, passing cards are no longer cut, and inside `nds-max-width` the next card stays hidden with `--peek: 0px`. Arrow keys stay with a focused field while the mouse rests on a swiper.
- **Tables** — `--table-row-height` sets the row height of a standard table too; it worked only with `nds-compact`.
- **Tabs** — a tab set in a card no longer doubles the panel padding; Home and End go to the first and last tab in RTL too; a tab set in a column that centers its items keeps its full width; a vertical divided tab keeps its icon before the label and starts at the edge. A tab set inside a tab panel or a Content Switcher panel keeps its own look.
- **Tabs** — In a ghost section on small screens, the tab divider spans the content.
- **Tag Input** — A read-only field blocks chip removal and the Backspace edit.
- **Tags** — A tag fits its content in a column layout, and a ghost status tag on color keeps light text.
- **Templates** — The Form and Contact Us templates no longer give their section and their form one id. The Contact Us "send another" reset runs again, and keeps the chosen country code and category. Its Custom Select options carry `.nds-label`, as the canon does.
- **TOC** — A heading shallower than the first no longer drops the headings after it. Headings inside a scrolling panel or modal body track and scroll that box, not the page.
- **Toolbar** — The counter text is centered in its cluster.
- **Tooltip** — Long unbroken text wraps inside the balloon, also when the trigger sits in a `nowrap` host.
- **Top Bar** — the date no longer shows the previous day when the visitor's day and Riyadh's differ, and a tab left open changes day at midnight.
- **Top Bar** — A re-rendered top bar fills in its widgets again and re-wires the digital stamp.
- **User Feedback** — Submit now sends the form, and the error message can show.
- **Voice Input** — Dictation goes in at the caret, or over the selected text, and keeps the rest of the field; it replaced the whole value. Its messages (no speech, no permission, timeout) show under the field as a neutral message for 4 seconds; they were in the placeholder, hidden once the field had text.

### Documentation
- **Every doc page** — Rewritten for people and AI agents: 90 → 98 pages and 42% fewer lines. Each page has the same sections: Overview, Markup, Variants, Behavior, Built-in Features, Best Practices, API, Related. Its markup lives once, as a copy-ready canon block, and a live builder shows every option. New pages: [Countdown](https://mazin-musleh.github.io/NDS-vanilla/components/countdown.html), [Custom Select](https://mazin-musleh.github.io/NDS-vanilla/components/custom-select.html), [Session Timeout](https://mazin-musleh.github.io/NDS-vanilla/components/session-timeout.html), [Time Picker](https://mazin-musleh.github.io/NDS-vanilla/components/time-picker.html), [Audit](https://mazin-musleh.github.io/NDS-vanilla/core/audit.html), [Date](https://mazin-musleh.github.io/NDS-vanilla/core/date.html), [Internationalization](https://mazin-musleh.github.io/NDS-vanilla/core/i18n.html), [Migration](https://mazin-musleh.github.io/NDS-vanilla/core/migration.html), [Page Layout](https://mazin-musleh.github.io/NDS-vanilla/layout/page-layout.html).
- **Tables** — `nds-sortable`, which nothing reads: a sort button in the header turns sorting on.
- **Image Popup Viewer** — `nds-ipv-gallery` and `nds-ipv-image-item`, which had no styles and no script; markup that uses them renders the same.
- **[Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html)** — Before a component's bundle arrives, `NDS.X.method()` loads it and returns a Promise of the result: `await` a call whose result you use. `NDS-INDEX.md` says the same for agents.
- **[Page Layout](https://mazin-musleh.github.io/NDS-vanilla/layout/page-layout.html)** — The sub hero in each page canon carries its required description and points to the [Hero](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/hero.html) page for Share and the other forms. The Hero page wins.
- **FAQ Template** — Its tags use NDS tag colours; the purple tags it showed have no NDS style and rendered plain. See the [FAQ Template](https://mazin-musleh.github.io/NDS-vanilla/templates/faq-template.html) page.
- **[Alert](https://mazin-musleh.github.io/NDS-vanilla/components/alert.html) and [Status Section](https://mazin-musleh.github.io/NDS-vanilla/layout/status-section.html)** — A page or view the user cannot use (sign in first, no permission, not found) takes a Status Section, never an alert in its place. Both pages, the Empty page and the component catalog now say so, and `NDS.Init.audit()` warns about a view whose only content is an alert.
- **[Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html) and [Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html)** — Slides that arrive after a swiper started need a restart: `NDS.Init.destroy(swiper)`, append the slides, then `NDS.Init.mount(swiper)`. A refresh does not add them.
- **[Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html)** — Rows built from JSON: one row's markup in a `<template>`, each copy filled with `textContent`, then `NDS.Init.mount()`.

### Migrating from v1.12.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- Run `NDS.Init.audit()` on every page. It lists each old name the page still uses, with its replacement. The full list by release is on the [Migration](https://mazin-musleh.github.io/NDS-vanilla/core/migration.html) page.
- **Button** — A button no longer stretches to fill a column. Add `.nds-full` to one that should fill its container.
- **camelCase classes** — every camelCase class is renamed to kebab case, with no aliases: `nds-wSideMenu` → `nds-has-sidemenu`, `nds-wSideInfo` → `nds-has-sideinfo`, `nds-cardView` → `nds-card-view`, `nds-rowView` → `nds-horizontal` and `nds-colView` → `nds-vertical` (`nds-row` and `nds-col` stay the flex helper), `nds-tableView` (and `-sm`, `-md`, `-lg`) → `nds-table-view` (and the same), `nds-digitalStamp` and every `nds-digitalStamp-*` part → `nds-digital-stamp-*` (the panel id `nds-digitalStamp` too, and the button's `aria-controls`), `nds-foundingDay` → `nds-founding-day`, `nds-nationalDay` (and `-logo`) → `nds-national-day` (and `-logo`), `showZoom` → `nds-zoom-badge`, `dateRange` → `nds-date-range`. The source files `_DGAdigitalStamp.scss` and `nds-digitalStamp.js` are renamed `_digital-stamp.scss` and `nds-digital-stamp.js`. Events: `nds:digitalStamp:opened` → `nds:digital-stamp:opened`, `nds:digitalStamp:closed` → `nds:digital-stamp:closed`. Top bar ids: `nds-realTimeClock` → `nds-real-time-clock`, `nds-cityName` → `nds-city-name`, `nds-weatherInfo` → `nds-weather-info`; `NDS.Init.audit()` names each. The source files `nds-timeDate.js` and `nds-cityWeather.js` are renamed `nds-time-date.js` and `nds-city-weather.js`. The width token `--nds-content-MaxWidth` is renamed `--nds-content-max-width`. Ids: `ndsAccessibilityPanel` → `nds-accessibility-panel` (and its button's `data-panel-toggle`), `ndsCookiesPanel` → `nds-cookies-panel`, the cookie switches `ndsCookies-<category>` → `nds-cookies-<category>`, and the image viewer's `ndsIpvPopupOverlay`, `ndsIpvPopupImage`, `ndsIpvZoomInfo` and `ndsIpvImageCounter` → `nds-ipv-popup-overlay`, `nds-ipv-popup-image`, `nds-ipv-zoom-info` and `nds-ipv-image-counter`. The accessibility panel's `a11yModesCollapse`, `a11yReadableCollapse` and `a11yVisualCollapse` → `a11y-modes-collapse`, `a11y-readable-collapse` and `a11y-visual-collapse`: a custom panel needs the new ids for its active counts. Removed: the `generalInfo` top bar rule, which no markup used, and `id="ndsThemeToggle"`: use the `data-theme-toggle` attribute.
- **Cards** — `.nds-card-status` became the header status slot; `.nds-full-width` on a card is removed for `.nds-full` (see Deprecations below); `.nds-user` was removed (user cards went from 224px to 360px); centred cards lost the 1.5× block padding.
- **Code** — the `code-example` class on a code tab panel does nothing: a panel in `.nds-tabs.nds-code` has no padding by itself. Component scripts still skip anything inside `<code>`, but no longer skip an element only because it is inside `.code-example`.
- **Code** — `data-nds-code-processed` is now `data-nds-code-highlighted`. To highlight a block again after you change its text, call `NDS.Code.reprocessCodeElement(code)`.
- **Cookies** — The cookie popup markup and `#ndsCookiesPopup` are removed: the script builds the panel, and a page's own `#nds-cookies-panel` in a `<template class="nds-panel-template">` replaces it. `#ndsCookiesAcceptBtn` and `#ndsCookiesDeclineBtn` become `data-cookies-action="accept|reject"`, and close is `data-panel-close`. `.nds-cookie-popup`, `.nds-cookie-popup-links` and `.nds-compact` are removed. `data-accept-title`, `data-accept-message`, `data-decline-title` and `data-decline-message` are removed: the Done view text is the `done_title` and `done` i18n keys. `getConsent()` may return `'custom'`. `nds:cookies:consent` fires on `document`, and a listener on the old popup never runs. The panel is `data-panel-static`, so an outside click does not close it. `NDS.Cookies.init()` is removed; `NDS.CookieConsent.init()` runs it.
- **Cookies** — If you copied the Google Analytics consent snippet, copy it again from the [Cookies](https://mazin-musleh.github.io/NDS-vanilla/components/cookies.html) page. It now sets all six consent keys, denies functionality and personalization storage by default, and applies a returning visitor's stored choice.
- **Copy** — on a copy button, `data-label` is renamed `data-copy-label` and `data-message` is renamed `data-copy-announce`. No aliases. Multiselect keeps its own `data-label`.
- **Date Picker** — "today" follows the visitor's timezone, or `data-timezone` on `<html>`. Before, it was always Riyadh: set `data-timezone="Asia/Riyadh"` to keep that. A picker with no `data-format` uses the nearest `data-date-format`, then `DD/MM/YYYY` as before.
- **Date Picker** — `CalendarConfig.hijri.gregorianToHijri(d)` → `NDS.date.format(d, { calendar: 'hijri', format: 'DD/MM/YYYY' })`. `CalendarConfig.hijri.hijriToGregorian(y, m, d)` → `NDS.date.parse(text, { calendar: 'hijri', format: … })`. `NDS.DatePicker.createHijriDate()` → no replacement: write a `{ day, month, year }` object.
- **Dates** — one `data-calendar="hijri|gregory"` sets the calendar for the content inside it, like `data-date-format`: on `<html>` for the site, or on any element. Date Picker, the top bar date and Sort read it. `.nds-hijri` on a Date Picker is removed: write `data-calendar="hijri"`. On the top bar date, `data-calendar="gregorian"` becomes `gregory`. No aliases; `NDS.Init.audit()` names both.
- **Deprecations** — v2.0.0 removes every name 1.x deprecated, with no alias. The Migration page and `NDS.Init.audit()` list each one with its fix. Swiper: the `slides-max`, `slides-mid`, `slides-min` and `peek` attributes (set `--max-slides`, `--mid-slides`, `--min-slides`, `--peek` inline). Cards: `.nds-full-width` (use `.nds-full`), `.nds-statistic` (use `.nds-center`, and `.nds-card-number` on the number), `.nds-card-price` (use `.nds-card-value`); a counter or number format in a card takes `.nds-card-number` for the number's look. Numbers: `data-target`, `data-start` and `data-duration` on a counter (use `data-counter`, `data-counter-start`, `data-counter-duration`), and `data-free` on `.nds-number-format` (leave out `data-currency` and write the label). Slider: `[data-loading]` (use `.nds-loading`). Toolbar: `.nds-filter-bar` (use `.nds-toolbar`). Section and footer: `.nds-green` (use `.nds-primary` or `.nds-brand`; the tag color class stays) and `.nds-gradient-green` (use `.nds-gradient-primary`). Forms: `.nds-focus` and `.focus`. Filter: the `.nds-card-tags` fallback for `data-filter="tags"` (mark each tag label), the `setSelectedTags(tags)` method (use `setFilterValues('tags', tags)`), the unprefixed `.filter-btn` trigger (use `.nds-filter-btn`), and the reset a filter guessed from a button with "refresh" in its class or a refresh icon (write `data-filter-action="reset"` on it). Drawer: `data-open-on` and `data-always-open-on` (a drawer no longer opens or locks by screen width: write `data-state="open"` on an item to start it open), the `open` class on an item (use `data-state="open"`), and `NDS.Drawer.initDrawer()` (use `create()`). Menus: `.nds-rating-dropmenu` is `.nds-rating-menu`, and `.nds-date-picker-dropdown` is `.nds-date-picker-menu`. Icons: the 16 HGI names HugeIcons renamed (`hgi-sorting-1-9` is `hgi-sorting-one-9`, `hgi-cplusplus` is `hgi-cpp`, and so on).
- **Drawer** — the `--drawer-indicator-active` and `--drawer-indicator-hover` knobs, with no alias. The drawer's buttons draw the button indicator: set `--btn-indicator-selected` or `--btn-indicator-color` on `.nds-drawer .nds-btn`.
- **File Upload** — `nds:upload:removed` now also fires for `clearAllFiles()`, a form reset and Single replacing a file, so a listener that deletes server copies sees each of them; a form reset empties the list; code that waits on `status === 'uploading'` at the end of an upload sees `processing` first; file rows no longer carry `data-index`.
- **Flex and Grid** — `--gap`, `--row-gap`, `--col-gap`, `--justify` and `--align` do not pass down: each one styles only the element it is set on. Before, a value on a Flex or Grid also reached every Flex, Grid, Stepper, Swiper and Definition list inside it. A layout that relied on that sets it on each inner element. A horizontal Section and a Definition list still take `--gap` from their own root.
- **Head** — Copy the head's inline script again from the [Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) page: a browser that blocks storage no longer blanks the page.
- **Helper Classes** — `.nds-required-notice` is removed: use `.nds-note` with `data-status="error"`. The note has no space below it; add `nds-block` for a 32px gap.
- **Hero** — the sub hero's image knob `--hero_image` is renamed `--hero-image`, and `--hero-mask-angle`, `--hero-mask-from` and `--hero-mask-to` are renamed `--hero-image-fade-angle`, `--hero-image-fade-from` and `--hero-image-fade-to`. No aliases.
- **Hidden** — the `data-hidden` tokens `mobile`, `tablet` and `desktop` are removed: use `sm`, `md` and `lg`. `.sr-only` is removed: use `.nds-sr-only`.
- **Internationalization** — `NDS.langKey` is removed: use `NDS.lang`. `assets/i18n/cookies/`, `ipv/` and `session-timeout/` moved into the `cookies`, `ipv` and `session-timeout` sections of `assets/i18n/{lang}.json`: a site that edited or added a file there moves its text into the pack, or into `window.NDS_I18N`. `window.NDS_I18N.<component>` now replaces only the keys it sets (it replaced the whole set). Filter finds a search box's clear button by `.nds-clear` only (it also matched an `aria-label` with "clear" or "مسح"). Swiper bullets say "Go to page N". Upload file sizes are written by `Intl` ("2 MB", "2 م.ب"). The date picker's `data-lang` takes any language. The Motor Impaired mode reads "Enlarges click targets".
- **Loader** — `window.NDSAssetBase` and `window.NDS_ASSETS_BASE` are replaced by `window.NDS_ASSETS_PATH`, with no alias. Set it to the `assets/` folder: the value `NDS_ASSETS_BASE` took, one level above the `js/` folder `NDSAssetBase` named. It sets where the bundles and the language files load from, and it wins over the folder of `nds-main.min.js`. The name matches `NDS_I18N_PATH`.
- **Loader** — `NDS.loadExtras()` is removed: use `NDS.Init.mount(el)`, or `NDS.loadBundle(name)`. Editor, Chart and Code left the extras bundle for their own (`nds-editor.min.js`, `nds-chart.min.js`, `nds-code.min.js`): ship the three new files beside the others, and change `NDS.loadBundle('extras')` before a Chart call to `NDS.loadBundle('chart')`. A registry entry in `NDS.Init.components` may now leave out `init` (it defaults to `NDS[name].init()`); `universal` is gone, and `selector: null` means every page.
- **Main Navigation** — classes `nds-dropdown` → `nds-has-menu`, `nds-dropdown-menu` → `nds-nav-menu`, `nds-dropdown-content` → `nds-nav-menu-content`, `nds-dropdown-item` → `nds-nav-menu-item`, `nds-dropdown-columns` → `nds-nav-columns` and `nds-dropdown-title` → `nds-nav-title`; `nds-PAB` → `nds-pinned`, `nds-mainNav-toggler` → `nds-nav-toggler`, `nds-CTA` → `nds-nav-cta`; a menu's `nds-nav-columns nds-colView` → `nds-nav-columns`, and `nds-nav-columns nds-rowView` → `nds-nav-row` (the nav no longer uses `nds-colView` or `nds-rowView`); `nds-collapse` → `nds-nav-collapse`, `nds-collapse-content` → `nds-nav-collapse-content`, `nds-column` → `nds-nav-column`, `nds-list` → `nds-nav-list`, `nds-multi-column-list` → `nds-multi-col`; the ids `ndsMainNav` and `ndsNavCollapse` are renamed `nds-main-nav` and `nds-nav-collapse` (the menu button's `aria-controls` too). A menu trigger writes `data-state="open"` while its menu is open, not `active`. `NDS.Mainnav.toggleNavbar()` and `toggleDropdown(event)` are removed: use `open()`, `close()`, `toggle()`, `openMenu(trigger)` and `closeMenus()`. No aliases: `NDS.Init.audit()` names every old class or id still in a page's nav, with its new name.
- **National Day 96** — Type 2 is the pack's new default hero. To keep the single slide, add `data-type="1"` to the pack's `<script>` tag.
- **Numbers** — numbers follow the `lang` of the page, in Latin digits (0 to 9) (before, the browser's language, so an Arabic browser showed Arabic-Indic digits on an English page). This covers `NDS.formatNumber`, so Pagination, Selection, Slider and Filter numbers change with it. `nds-number-format` no longer formats a `nds-counter-value`: the counter formats its own number.
- **Numbers** — `data-decimals` on a counter: write `data-target` with the decimals you want.
- **Page Layout** — `.nds-main-content` is renamed `.nds-content`, and its knobs `--main-padding-block`, `--main-padding-inline` and `--main-gap` are renamed `--content-padding-block`, `--content-padding-inline` and `--content-gap`. No aliases.
- **Section** — `nds-noBg` on a section is removed, with no alias: use `nds-ghost`. On a page with no side column, `nds-noBg` also added space above and below a run of such sections; `nds-ghost` does not, so set `--section-margin-block-start` and `--section-margin-block-end` where you need it.
- **Selection** — the `nds:table:selection` event. Listen for `nds:selection:change` on the list: its `detail` is `{ list, items, count, total }` (it was `{ selectedCount, totalCount, selectedRows, selectedIndexes }`).
- **Side Info** — `nds-sm`, `nds-md` and `nds-lg` on `.nds-sideinfo` are removed, with no alias. The column is 400px wide, or 300px when it holds a table of contents: set `--nds-sideinfo-width` for another width. `--nds-sideinfo-width` is no longer set on `:root`. Below 960px the column is always full width. `nds-sticky-sm` and `nds-sticky-md` work without `nds-sticky`. Fixed: a sticky column beside the title stayed sticky only while short. Added: several cards in one column stack with a gap, set by the new `--nds-sideinfo-gap` knob (default `--spacing-4xl`).
- **Side Info** — Set `--card-width` on the element with `.nds-card`, not on the aside: on the aside it no longer reaches nested cards.
- **Side Menu** — the `--toggle-height` knob is renamed `--nds-sidemenu-toggle-height`, and `--toggle-transform` is removed. No aliases.
- **Status Section** — `.nds-404` is removed: use `.nds-status-section`.
- **Stepper** — `NDS.Stepper.setFallback()` and `getFallback()` are removed: write `nds-vertical` or `nds-radial` on the stepper instead. The `nds-horizontal-lg`, `nds-vertical-lg` and `nds-radial-lg` classes are removed: the layout class is the desktop layout, and `-sm` / `-md` set phones and tablets. `nds-radial nds-vertical-lg` becomes `nds-vertical nds-radial-sm nds-radial-md`. The deprecated `NDS.Stepper._applyLayout()` and `NDS.Stepper._stamp()` are removed: call `NDS.Stepper.init()`.
- **Tables** — the `nds:table:sort` event. Listen for `nds:sort:change` on the table: `detail.key` is the column index and `detail.dir` the direction.
- **Tables** — `table-actions`, `actions-column` and `checkbox-column` are renamed `nds-table-actions`, `nds-actions-column` and `nds-checkbox-column`. No aliases.
- **Tables** — `nds-mask` (the scroll-edge fade) and its `--mask-fade-distance` knob are removed, with no replacement: delete the class. The scroll box still writes `has-more`, `at-start` and `at-end` in its `data-state`.
- **Tags** — normal tags no longer take `nds-inverted` or `nds-ghost`, and status tags no longer take `nds-outline`. An icon-only tag now keeps its `.nds-label` readable by screen readers; existing icon-only markup renders the same, and adding a label to it is recommended, not required.
- **Toolbar** — `nds-bar-row`, `nds-bar-start`, `nds-bar-end` and `nds-bar-text` are renamed `nds-toolbar-row`, `nds-toolbar-start`, `nds-toolbar-end` and `nds-toolbar-text`. No aliases; `NDS.Init.audit()` names each, and its new `toolbar-part` check flags a part outside a `.nds-toolbar`.
- **Top Bar** — `NDS.TimeDate.getHijriDate()` → `NDS.date.format(NDS.date.today(), { calendar: 'hijri', format: 'D M YYYY' })`.
- **User Feedback** — the widget's form no longer has `action="/submit" method="POST"`: add your endpoint as `action`, or nothing is sent. The answer and Submit buttons lose `aria-label`s that repeated their text, and Submit loses the unused `data-answer="submit"`. A dismissed success message no longer resets the widget.

## [1.12.0] - 2026-09-05

### Added
- **Swiper loop** — `data-swiper-loop` makes the row endless. Two pages of clones sit at each end, and a silent jump to the real twin when a scroll rests on a clone keeps the wrap invisible by finger, arrow or key. Clones are `aria-hidden`, inert and id-free; public indices stay real; `destroy()` drops them. Ignored when the deck has no more slides than the largest tier shows, since a page would show a slide twice. See the [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html) page.
- **Swiper skeleton and lazy shimmer** — `nds-loading` on a deck renders the cards as bars with the pulse, the way a loading grid does. An `img[data-src]` slide shimmers until its source lands instead of painting a blank box or the broken-image icon; the box is the author's, so give it a size. See the [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html) page.
- **Main nav icon-only actions name themselves in a hover tooltip** — built from the `title` the action already carries, on a native-title delay; `label-hidden` keeps the accessible name once the tooltip strips it. In hover mode a tap on a link or button runs the action instead of toggling the balloon, so a phone still reaches Search and Login. The topbar's theme switcher and dark-mode toggle, and the footer's social and app links, carry the same tooltip. See the [Main Navigation](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html), [Topbar](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/topbar.html) and [Footer](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/footer.html) pages.
- **Featured icon `-forced` knobs** — `--featuredicon-bg-forced`, `--featuredicon-color-forced` and `--featuredicon-dark-bg-forced` are read ahead of the icon's own knobs, so a host such as the drawer button re-tints the icon inside it from the outside. See the [Featured Icons](https://mazin-musleh.github.io/NDS-vanilla/components/featured-icons.html) page.
- **Tooltip keyboard toggle and `title` fallback** — a click-mode text trigger gets `role="button"` and toggles on Enter and Space; a `title` attribute is a fallback message source, stripped at init, and its balloon is built on the first open; `data-tooltip-hover="0"` is honoured instead of falling back to 120 ms; the declarative root reserves its chip box until init. See the [Tooltip](https://mazin-musleh.github.io/NDS-vanilla/components/tooltip.html) page.

### Changed
- **Swiper slides per view and peek are inline knobs CSS can read.** `slides-max`, `slides-mid`, `slides-min` and `peek` were bare attributes only JS could read, so the row waited for the deferred loader and jumped on a long page. The knobs now sit inline as `--max-slides`, `--mid-slides`, `--min-slides` and `--peek`, and main CSS sizes the row from them in every browser from the first paint; the loader also presets `--slides` before the reveal stamp, so nothing moves at init (CLS 0.15 → 0.003 with a card deck in view). The attributes still work through JS and are deprecated. JS no longer wipes an author's `--peek` or `--gap`; `--peek: 0px` means no peek. See the [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html) page.
- **Swiper: the max-width gutter is one gap.** The gutter was the viewport padding while the gap stayed the token, and a clip, an end-space branch, a peek-reserve term and a JS gap rule existed only to reconcile the two. The gutter is one gap at every width, the row runs to the breakout edge, a neighbour never shows in the gutters, the peek rests at the end on every page, and the last page of a peek deck shows a full mirrored peek. `nds-oncolor` on the root now reaches the arrows, so the class stacked on each arrow by hand is dropped from the canonical markup. See the [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html) page.
- **Loading has one CSS spelling, `.nds-loading`.** Every loading rule listed both the class and `[data-state="loading"]`, and the attribute rules ending in `> *` marked Chrome's whole `data-state` invalidation set, so every state write anywhere restyled its full subtree. CSS keys on the class alone; core mirrors the `loading` token onto it, so the documented attribute keeps working. The slider's own `data-loading` joins the class spelling and stays as a deprecated alias. See the [Loading](https://mazin-musleh.github.io/NDS-vanilla/components/loading.html) page.
- **State styles its host.** A `[data-state]` or `[data-status]` rule no longer reaches a descendant through a tag, an attribute or a shared class; the descendant reads a custom property the stateful element sets. A `data-state` write on a 3,000-row table wrapper went from 140 ms to 0.2 ms, on a section above a 2,000-row table from 99 to 1.8 ms, on a 300-card filter region from 3.7 to 0.1 ms; 209 computed-style checks are unchanged.
- **The scroll lock is its own attribute.** Overlays stamped `data-state="backdrop"` on `<body>`, which restyled about half the page at the end of every open and again on close, a ~500 ms freeze on a mid-range phone. The lock now writes `data-nds-scroll-lock`, which only the one body rule reads.
- **Main nav minimal mode is a class on the nav, not `<body>`.** Only mainnav reads it, and a flip on `<body>` restyled the whole page at every breakpoint crossing (300–370 ms → 10–58 ms at 20×).
- **The menu-button arrow follows the button's own `aria-expanded`.** The rule that rotated `.nds-menu-btn::after` from the parent's `data-state~="open"` is gone; main nav dropdown links and side menu submenu toggles carry `aria-expanded`, and NDS stamps it at init and toggles it on open and close, so copied markup needs no edit. Only custom JS that flips a parent's state and expects the child arrow to follow has to write the attribute itself. See the [Main Navigation](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html) and [Side Menu](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sidemenu.html) pages.
- **Closed main nav menus leave the render tree again.** Keeping the drawer and the dropdowns laid out while closed (1.11.0) put ~670 elements into every page's reveal recalc, the longest task 600 → 1,100 ms at 6.6× on the home page. The first open pays its own layout, 152 / 112 ms at 6.6×, under the 200 ms line.
- **Breakpoints have one truth.** The SCSS mixins said 601/961/1281 while `NDS.breakpoints` said 600/960/1280, so CSS and JS disagreed by one pixel at every edge. Both now derive from the same three numbers, and the tablet and desktop max ranges stop overlapping the next tier. See the [Grid](https://mazin-musleh.github.io/NDS-vanilla/layout/grid.html) page.
- **Tooltip rides the delegated bundle, not extras.** A nav-link tooltip pulled the whole extras bundle onto every page that had one; the native `title` covers the pre-init gap. In hover mode only touch taps toggle; a mouse click on a link or button trigger dismisses and the action proceeds, and any click during the hover delay cancels the pending open. The `--tooltip-*-inverse` tokens are removed; the `-default` names re-bind in the dark block. See the [Tooltip](https://mazin-musleh.github.io/NDS-vanilla/components/tooltip.html) page.
- **The HGI `@font-face` ships in the critical CSS, and the icon sheet is requested at loader init.** A face landing after the reveal rebuilds Chrome's font cache and relays out every text box (3,075 layout objects on a table-heavy page). Nothing fetches the font until `.hgi-stroke` applies, and on a warm load the sheet's `:root` write rides the reveal's own pass. Longest task 1.27 → 1.01 s at 6.6×. See the [Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) page.
- **Skeleton: one pulse per held region, not per bar.** Blink ticks the opacity animation on the main thread, and every bar carried its own: 258 animated pseudos a frame during the pre-init hold. The pulse lives on the hold root; bars stay static. About 10 % of load blocking at 6.6×, and most run-to-run variance.
- **Code blocks highlight on approach, not in one init sweep.** Ten blocks lexed at init was the largest style recalc on the page; each block now processes one viewport before it scrolls in, and a hidden tab panel processes on open.
- **Pagination hides off-page rows before init and defaults to 6 per page.** Rows past page one were `visibility: collapse`, which still lays out, so a 100-row table paid full-table layout on each of six pre-init passes. The loader hides items past an inline `--per-page` before the reveal; the critical "first N" rule and `readPerPage` both say 6, so they never disagree. See the [Pagination](https://mazin-musleh.github.io/NDS-vanilla/components/pagination.html) page.
- **The topbar date and clock skip their work while hidden.** The topbar hides the date on small and medium screens and the clock on small ones, yet every phone visit paid the Hijri `Intl.DateTimeFormat` (~19 ms) and a per-minute tick for text it never showed. A breakpoint crossing re-runs both.
- **The main nav minimal-mode actions row is see-through** — it painted its own background with a bottom-only radius, which some design importers cannot express; the sheet behind it already carries the corners.
- **Core does less at init.** The ResizeObserver pool runs every handler's reads first, then the writes together (34 scroll-mores: 68 → 5.5 ms at 6.6× on the first frame after reveal). The attribute observer filters by the subscribed names (records during a load 429 → 56). `State.has` no longer builds a Set per call. Link init prefilters `a[href*="//"]` before the hostname parse (a page with ~235 links: 6.9 → 3.0 ms at 6.6×). The grid last-row scan marks from the observer instead of a scheduled first read that forced a full pre-reveal layout. The unreachable `typeof window` guards are gone from nine exports.

### Fixed
- **Icons show on iPhone.** WebKit serializes a CSS-declared `FontFace.family` with its quotes, so the loaded-face scan never matched and the gate expired into the safe-hidden fail: blank icons in every iPhone browser. The compare is quote-free, a download that finishes after the window still stamps, and a face that registers late is polled while the window runs.
- **Modal content keeps its height in Safari.** The card's `flex: 1` is a zero basis, and WebKit sizes the modal's `fit-content` column from the bases, so the content area collapsed to 0 on Safari and iPhone.
- **`NDS.request` works on Safari before 17.4.** It composes its abort signal by hand where `AbortSignal.any` is missing; the `TimeoutError` / `AbortError` contract callers check still holds.
- **The code highlighter no longer ends the extras bundle on Safari before 16.4.** The lexer regex builds on first use, with a lookbehind-free fallback where the guards fail to compile.
- **RTL swiper tracks open on the first page in Safari.** WebKit lands an RTL scroll container at its end when it first overflows after a layout; the loader pins the track to the start after the reveal stamp. The end space is a flex spacer, not wrapper padding, since Safari leaves an RTL scroll container's inline-end padding out of the scrollable overflow.
- **A nested swiper owns its own controls.** The constructor took any descendant slide and the first nav in document order, and the shared keydown took the outer deck. Arrow keys now move the deck (they called `click()` on buttons that listen for `pointerdown`). Reduced motion is honoured, since `'auto'` deferred to the smooth `scroll-behavior`. `destroy()` keeps an author's `tabindex` and clears the at-start and at-end tokens.
- **Loop navigation always moves a full view** and targets stay in the current cycle, so a rapid click that lands on a clone no longer animates a whole cycle the wrong way. Bullets light the page whose start is at or before the lead slide.
- **A swiper's pre-init nav reserve matches the row init keeps.** The reserve read `--btn-size` where nothing sets it, so the canonical 32px nav row shrank every multi-page swiper 8px at init; a single-page deck drops the reserve before the reveal; `.nds-middle` drops it too (it carried ~52px that collapsed at init). A single-page peek deck drops its peek geometry everywhere.
- **Reload deep in a page lands on the saved section, not the one above.** Sections had `flex: 1`, a zero basis, so in the pre-stamp frame every section got the same height and the restored offset landed ~300px off; scroll anchoring then moved it during the hidden layout. Sections are `flex: 1 1 auto`, and the inline gate holds anchoring at `none` until main CSS restores it. Reload CLS 0.071 → 0.031.
- **Paged skeletons paint the right count in every load order.** A paged accordion sat hidden until init while its bar rules ran unseen; another painted a sixth bar that vanished in view; the tabs skeleton turned a panel's pagination nav into a full-width plank. The split runs first thing at init, the pagination nav draws its own placeholder of six button blocks, and the nav reserve stays `display: block` (the flip back from flex was a 0.04 layout shift). See the [Loading](https://mazin-musleh.github.io/NDS-vanilla/components/loading.html) page.
- **Every JS-driven scroll honours reduced motion.** `NDS.prefersReducedMotion` read only the OS query, so the accessibility panel's reduce-motion mode never reached JS, and eight scroll calls in main nav, tabs, scroll-more and side menu passed `behavior: 'smooth'` unconditionally.
- **Main nav reinit no longer stacks interaction listeners.** A reinit on a kept root doubled wheel scroll and left a second document listener pair after each drag.
- **The main nav brand logo ignores the reset's `img` max-width.**
- **A popup triggered from inside the main nav skips the nav clamp** — its own tooltip sat 16px below the nav instead of 8px below the trigger.
- **FAB side docks lift off the bottom edge on touch screens.** A phone's rounded corner clips a FAB half a gutter off the bottom; left and right docks double the block inset under `pointer: coarse`. See the [FAB](https://mazin-musleh.github.io/NDS-vanilla/components/fab.html) page.
- **The external-link badge stays on the text line inside block content.** Editors emit `<a><p>…</p></a>`, and the anchor's `::after` then landed on a line of its own. The link gets `.nds-external-block` and the deepest last block `.nds-external-badge`. See the [Link](https://mazin-musleh.github.io/NDS-vanilla/components/link.html) page.
- **An autocomplete fetch inside the debounce window is cancelled at destroy**, and a grid that leaves the DOM releases its last-row watcher, so an SPA that remounts grids stops retaining every discarded one.

### Documentation
- **[Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html)** — submit buttons sit in `.nds-form-actions`; a lone button as a direct grid child stretches to the column.
- **[Grid](https://mazin-musleh.github.io/NDS-vanilla/layout/grid.html)**, **[Topbar](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/topbar.html)**, **[Hidden](https://mazin-musleh.github.io/NDS-vanilla/utilities/hidden.html)** and **[Definition List](https://mazin-musleh.github.io/NDS-vanilla/components/definition-list.html)** — the breakpoint edges are 600, 960 and 1280; the pages restated the mixin values, one pixel off.

### Migrating from v1.11.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- **`--tooltip-background-inverse`, `--tooltip-text-heading-inverse` and `--tooltip-text-paragraph-inverse` are removed.** A value you set on one goes on the matching `-default` token under `:root[data-theme~="dark"]`.

## [1.11.0] - 2026-09-02

### Added
- **National Day 96 event theme** — the third event pack, applied by one `<script>` tag. It keeps the DGA palette and the standard hero slide markup, swaps in the event photo, rotates three artworks through the section identity bars, and adds the event mark to the footer strip. See the [National Day 96](https://mazin-musleh.github.io/NDS-vanilla/events/national-day-96.html) page.
- **`NDS.fromTemplate(id)` and the `nds:template:ready` event** — the helper finds an id asleep in a `<template>`, stamps the content into place and wakes it through `NDS.Init.refresh`, which now matches the stamped root itself and not only its descendants. The event fires on `document` after the arrivals are wired, so page JS that looks a templated surface up at load has a cue instead of bailing silently. See the [Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html) page.
- **Modals and panels open from a `<template>`** — wrap the markup in `<template class="nds-modal-template">` or `.nds-panel-template` and the open and toggle paths stamp it in on first use. The template class keeps the loader's presence gate true on a page whose only instances are templated. See the [Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html) and [Panels](https://mazin-musleh.github.io/NDS-vanilla/components/panels.html) pages.
- **Dropmenu takes a lazy authored menu** — a wrapper whose menu ships in its own `<template>` child is skipped at scan; the first trigger click stamps the markup, runs the untouched constructor on real DOM and opens. This is opt-in, not canon: it covers only menus dropmenu alone drives. See the [Dropmenu](https://mazin-musleh.github.io/NDS-vanilla/components/dropmenu.html) page.
- **`nds:cookies:consent`** — fires on Accept and Reject with `detail.consent`, so a tool NDS knows nothing about can gate on the choice inside the same page view. Dismissing is not a choice and fires nothing. See the [Cookies](https://mazin-musleh.github.io/NDS-vanilla/components/cookies.html) page.
- **Stepper `nds-xs` and `nds-md`, and text knobs in front of the variant** — `--stepper-title-FS`/`-LH` and `--stepper-description-FS`/`-LH` set a large label beside a small ring. See the [Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html) page.
- **`--card-image-width`** — a row card's image asks for the width it wants instead of stretching to the line. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **`--brand-logo-height`** — the brand logo height is a knob, 40px by default, in the nav too. See the [Header](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/header.html) page.
- **Every event pack has a download zip** and a download button on its doc page.

### Changed
- **The cookies banner denies by default.** Closing it with the X writes `cookieConsentDismissed` for 30 minutes and applies the same denial as Reject, without recording a consent value — the popup used to return on every page load. The load-time check now denies for anything but a stored `accepted`, and accepting clears the `ga-disable` flags so it takes effect without a reload. See the [Cookies](https://mazin-musleh.github.io/NDS-vanilla/components/cookies.html) page.
- **`.nds-card-price` becomes `.nds-card-value`** — the pattern is a value line, a price or a rate or a size, and only the name said money. The old class rides along as an alias. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **A row card sizes off its header** — the header hugs its content, which is right for an avatar or a featured icon that carries its own size. A single container query on the card decides the line break, since nothing in flexbox can tell that a line wrapped. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **Radial stepper text is sized per variant, off the type ladder.** The old clamps were keyed to `--stepper-size` and written in raw px, so the default 64px ring rendered a 14.4px title and a 10.9px description, and `--user-font-scale` never reached them. `nds-lg` is now 80px, not 96px. The ring gap goes flat per variant. See the [Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html) page.
- **The sideinfo aside is a bare track; the content carries the surface.** `.nds-sideinfo` owned both the column geometry and the card surface, so a consumer could not style the companion content without fighting the track. Border, radius, shadow and padding now route to `&.nds-card, > .nds-card`, and the background became the `--card-bg` knob. The old aside-as-card pairing renders unchanged. See the [Side Info](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sideinfo.html) page.
- **The accessibility panel ships inert in a `<template>`** and stamps in when it is armed — about 190 DOM nodes off every page for a visitor who never opens it. A saved all-defaults state deletes its own `localStorage` key so it stops arming the boot for nothing. Bare `<aside>` markup keeps working. See the [Accessibility](https://mazin-musleh.github.io/NDS-vanilla/components/accessibility.html) page.
- **The image viewer builds its overlay on first open** — about 50 nodes, the control listeners and the i18n fetch now wait for the first thumbnail click, so a gallery page nobody opens carries none of it. The overlay moves from z-index 1000 to the backdrop tier at 1100; it is the dimming layer and sat under the topbar. See the [Image Viewer](https://mazin-musleh.github.io/NDS-vanilla/components/ipv.html) page.
- **The base `.nds-icon` rule is zero-specificity.** The icons sheet loads after main CSS, so `i.nds-icon`'s 1em won every tie and `.nds-avatar i` rendered a third of the size it asked for. `:where()` makes it a default a component can override.
- **The shipped SVG and raster assets are smaller** — `assets/` drops from 37K to 18K gzipped, the Foundation Day and Hajj packs from 279K to 51K, and the National Day rasters are WebP. Every file was checked by rendering it before and after, so nothing draws differently.
- **FAQ accordion bodies take `nds-prose`.** See the [FAQ Template](https://mazin-musleh.github.io/NDS-vanilla/templates/faq-template.html) page.
- **The home template's hero swiper drops `nds-middle`** — that modifier centres the nav on the slide, where it overlaps the slide text. It suits a textless slider, or slides with centred text.

### Fixed
- **A component built with `create()` is now registered.** The constructor owns `el.nds{Name}`, so every expando-routed surface reaches it — pagination's public `destroy()` could not tear one down at all. Covers pagination, expandable, tabs and tables.
- **Multiselect validation reads a portaled menu.** Re-validation fires while the menu is open, and a multiselect in a modal, drawer or table cell has portaled it to `<body>` by then, so the walk found 0 of 2 ticked boxes and reported `checked: 0` through the validation payload.
- **Pagination survives a portaled ellipsis menu.** Four paths assumed the menu never leaves the wrapper: both click handlers read the page off `e.target`, which is the wrapper on the re-dispatch; `setActivePage` lost the active page once the menu closed; the lazy-range lookup returned null and let a builder guard fail open; and a discarded wrapper stranded its menu at `<body>`. A standalone `.nds-pagination-list` root also releases its paged-content skeleton now.
- **Nested tabs and accordions keep their own parts.** Both slots hold arbitrary consumer content, so an outer controller claimed a nested instance's parts, and the two lists interleave differently — `tabs[i]` and `panels[i]` desynchronized. Every derivation routes through one containment guard.
- **Dropmenu select mode only claims its own items.** A nested sub-dropmenu's item click wrote the child's value into the parent's hidden input, relabelled its trigger and fired `nds:dropmenu:selected` with the wrong item.
- **Dropmenu stops leaking on Arrow keys** — `open()` re-entered and overwrote its subscription handles, so `close()` released only the last pair. Thirty pooled subscribers were stranded over ten open cycles.
- **A dropmenu closed twice fires one `nds:dropmenu:closed`.** A second close re-armed the transition handle over a live one, so both fired.
- **A hero swiper re-measures its scroll step when the slides reveal.** A hero that inits off-screen measured the step from a hidden slide and cached the wrapper's inline padding instead of the slide stride, so the nav read at-end one slide early.
- **The mainnav show-more no longer flashes on the desktop-to-minimal flip.** A discrete `visibility` transition keeps an element painted for its duration, long enough to ride the closed drawer's transform to the top of the viewport.
- **`nds-truncate` caps a breadcrumb crumb at 45ch.**
- **A top-anchored toast sits under the real header.** The offset reads `NDS.stickyHeaderBottom()`, so a page with a topbar and no main nav stops falling back to a 72px nav height it does not have — measured 32px too low.
- **Password rule chips route through `NDS.Status`** instead of writing `dataset.status` raw.
- **An event pack's hero slide is an `<h2>`.** Every pack injected its title as an `<h1>`, so a themed page carried two.
- **Reinit and refresh restore post-init state** — mainnav reinit re-runs under a kept root, `Filter.refresh` re-detects the search box and re-stamps its container, forms pair `aria-describedby` with the feedback message, a reopened modal no longer self-closes, the loader kicks the icon font fetch when its sheet applies, and `Chart.reinit` redraws a wiped root. From an SPA adopter's report.
- **Core's grid scan runs when the bundle loads late.** It waited on `DOMContentLoaded`, which a bundle injected after load — an SPA host — never sees.
- **The stepper's look-ahead line is blank during the skeleton** — its radial colour rule outranked the skeleton bar's transparent-text rule.
- **The stranded form-field status border tokens are gone.** `--form-field-border-success`, `-warning` and `-info` survived the reduction to error and help, and nothing read them, so setting one had no effect.

### Documentation
- **[Side Menu](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sidemenu.html)** — `nds-drawer-group` is dropped. It appears in no SCSS or JS; third-level group headers are styled structurally, which the Drawer page already documents as "no class needed". This site's own drawer opts into `nds-lined`, so a consumer copying the rendered DOM gets a rail the sample here does not show.
- **[Cookies](https://mazin-musleh.github.io/NDS-vanilla/components/cookies.html)** — NDS signals consent, it does not block anything. The banner runs deferred, after the consumer's head snippet, and the consumer's Consent Mode default is what stops the first page view.
- **[Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html)** — bind `nds:template:ready` on `document`, reach an instance by its `el.nds{Name}` property, and the head-diffing framework note.
- **[Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html)** — where `nds-middle` puts the arrows on a hero. Neither the modifier table nor Best Practices said.
- **[Accordion](https://mazin-musleh.github.io/NDS-vanilla/components/accordion.html)** — the collapse panel is role-less on purpose; naming a generic div fails an ARIA audit.
- **[Chart](https://mazin-musleh.github.io/NDS-vanilla/components/chart.html)** and **[Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html)** — `chart.render()` and the modal's `data-state` are documented paths now.
- **[Sign In](https://mazin-musleh.github.io/NDS-vanilla/examples/sign-in.html)** and **[Registration](https://mazin-musleh.github.io/NDS-vanilla/examples/registration.html)** — the auth shells are reworked: the logo is a `.nds-brand` home link, the language switch is an icon-only button in the first card header, field errors stay inline through `setStatus`, and a server rejection is created on demand with `NDS.Alert.create` instead of a hardcoded block.
- **Page-script samples take a `readyState` guard** across the component, example and template pages — the sample runs when a router injects the markup after load, instead of waiting for a `DOMContentLoaded` that already fired.
- **[Event pages](https://mazin-musleh.github.io/NDS-vanilla/events/national-day-96.html)** — the bare `<script>` tag leads as the canonical install, since every value has a default. The override form keeps its own tab.

### Migrating from v1.10.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- **The cookies banner now denies by default.** Before this release, a visitor with no stored choice was not denied. If you relied on that, set your own Consent Mode default in your head snippet — NDS signals the choice, it does not block the tool.
- **`--form-field-border-success`, `--form-field-border-warning` and `--form-field-border-info` are removed.** Nothing read them, so a value set on one never applied. `--border-success`, `--border-warning` and `--border-info` are still there.

## [1.10.0] - 2026-08-25

### Added
- **Status Section** — an outcome message as a whole page or as one section: not found, submitted, failed. `data-status` colours the title and the feedback chip, and `.nds-section-icon` takes a chip or an illustration. Both 404 templates move onto it; `.nds-404` stays as an alias. See the [Status Section](https://mazin-musleh.github.io/NDS-vanilla/layout/status-section.html) page.
- **The neutral hue takes both `.nds-gray` and `.nds-neutral`** on tags, alerts and featured icons. Featured icons take the colour classes as canon, the way tags already do. See the [Featured Icons](https://mazin-musleh.github.io/NDS-vanilla/components/featured-icons.html) and [Tags](https://mazin-musleh.github.io/NDS-vanilla/components/tags.html) pages.

### Changed
- **Running text no longer caps at `--paragraph-max-width`** — the cap sized the whole box, not the text, so an image inside a `<p>` stopped sitting centred. `.nds-section-title` takes the cap instead, with the `.nds-full` escape. See the [Prose](https://mazin-musleh.github.io/NDS-vanilla/layout/prose.html) page.
- **Tags drop their neutral rung** — it restated the base defaults. No colour changes, and an author's own `--tag-bg` now wins on a plain tag. See the [Tags](https://mazin-musleh.github.io/NDS-vanilla/components/tags.html) page.

### Fixed
- **The mainnav's first menu open no longer stalls** — `display: none` kept the menus out of the render tree, so the first open paid layout and paint inside the interaction window. Closed menus now hide with `visibility`.
- **Section, card and alert variants no longer clobber their own public knobs** — a variant rule on the component root wrote the documented `--section-*` or `--card-*` knob, so a consumer who set it on that element lost. Variants now retune a private `-base` name.
- **A plain alert's title takes the text colour, not the status tint** — the reset wrote the public knob, where `initial` falls through to the base. Dark mode too.
- **Featured icons keep their status colour in dark mode** — the `.nds-dark` rules keyed on `[data-status]` alone, so `.nds-dark.nds-green` fell back to the primary hue. `critical` joins the error row.
- **A hero slider emits one `<h1>` per page** — every slide emitted one. Slides after the first now emit `<h2>`.
- **`nds-truncate` clamps the current-page breadcrumb** — the list item's `flex` outranked the zero-specificity `:where(.nds-truncate)`.
- **A bare image in prose gets the sibling gap** — direct children only, so a `<figure>` keeps its caption.

### Documentation
- **[Breadcrumb](https://mazin-musleh.github.io/NDS-vanilla/components/breadcrumb.html)** — truncation is for the current-page crumb; on a middle crumb the `::after` arrow pulls into the clamp box.
- **[Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html)** — NDS needs JavaScript, with no `noscript` fallback by design. The stale v1.3.0 note points to its v1.7.0 replacement.
- **[Prose](https://mazin-musleh.github.io/NDS-vanilla/layout/prose.html)** — `img` joins the structure tree.
- **v1.4.0's migration heading is now `### Migrating from v1.3.0`** — the only one of 18 that missed the heading NDS IQ searches for, so an upgrade run never saw its steps. Its two missing notes are back.

### Migrating from v1.9.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- **A hero slider's slides after the first take `<h2>`, not `<h1>`.** Change hand-authored slide content. Semantic only, nothing moves.

## [1.9.0] - 2026-08-22

### Added
- **Home Page Template** — the official DGA home composition on a new `shell` layout: a main hero slider, an About row with counting figures, a Services card deck, a news deck, a partner logo strip and the last-modified line. The `shell` layout emits the document and the scripts only, so the page source shows the whole page shape in order instead of an inner fragment. See the [Home Page Template](https://mazin-musleh.github.io/NDS-vanilla/templates/home-template.html) and [Page Shell](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html) pages.
- **Swiper `nds-middle`** — the arrows leave the navigation row and flank the slides at their vertical centre, with the bullets hidden. Tablet and up only: below 601px every rule drops and the normal row returns, so a phone falls back to a known layout instead of a special case. On `nds-hero` the arrows overlay at the viewport padding and the bullets pin bottom-centre. See the [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html) page.
- **Modal `data-modal-static`** — drops ESC and backdrop-click closing, so `[data-modal-close]` is the only way out. This is the contract `data-panel-static` already gives a panel. A centred status modal demo shows the shape. See the [Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html) page.
- **Card padding knobs per axis** — `--card-padding-block` and `--card-padding-inline` each fall back to `--card-padding`, so a variant retunes one axis without overwriting both. See the [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) page.
- **Dropmenu portals itself when an ancestor clips it** — the test is vertical clipping, not fixed-position trapping, so a menu inside a scrolling wrapper escapes on its own. `data-portal` forces the move and `data-no-portal` refuses it, for a wrapper whose CSS or DOM walks need the menu to stay a descendant. See the [Dropmenu](https://mazin-musleh.github.io/NDS-vanilla/components/dropmenu.html) page.
- **`nds-audit.min.js`, an on-demand audit bundle** — the debug checks left the main bundle. It is never auto-injected: the loader pulls it when `enableLogging` schedules the post-init sweep, or on the first `NDS.Init.audit()` call, so a production page that never asks for it downloads zero bytes of it. That first call returns a promise while the bundle loads. Three checks ship with it — a nav link that should be marked current, a stepper control that fights its form's submit, and a framework wrapper that breaks the shell's layout chain. See the [Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html) page.
- **NDS IQ v3.0** — the rulebook is restructured around work modes, an authority table and phase gates, and is about a third shorter than v2.2. See [NDS IQ](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Cooldown Button dropped the two states it could not observe. BREAKING.** `data-sent-title` and `data-sent-message` raised a "sent" toast on the click, so a failed request showed success beside the caller's own error toast. `data-cooldown-loading` held a spinner for a fixed count that matched no real response, and under the documented wiring it delayed the send. Both are gone, and the `nds:cooldown:loading` event with them. The page now owns the request, its `data-state="loading"` and its confirmation, all from one event. See the [Cooldown Button](https://mazin-musleh.github.io/NDS-vanilla/components/cooldown-button.html) page.
- **Section striping is opt-in** — `.nds-main-content` takes `.nds-stripe` to tint alternating sections, and `.nds-odd` beside it flips which parity carries the tint. Striping used to be on by default for every plain layout, so a page that wanted flat sections had no way out. The opt-in also retires the `.nds-wSideMenu` exclusion, so an author who asks for stripes gets them at every width. See the [Section](https://mazin-musleh.github.io/NDS-vanilla/layout/section.html) page.
- **Statistic card numbers inherit their weight** — the number is 48px and reads heavy on its own, so the medium-weight declaration is removed rather than lowered. This affects every statistic card.
- **The template zip no longer ships `NDS-IQ.md`.** The rules file versions independently of the template, so a copy frozen at the release cut goes stale as soon as the next revision lands, and a runner that finds two copies has to work out which one wins. Install it from raw main, which is the source the file's own Install section already tells you to compare against.

### Fixed
- **Dropmenu flips against the space it actually has** — the sticky-nav ceiling was applied to menus that paint over the nav, so inside a modal a tall menu measured the space above it about 120px short, stayed down, and ran off the viewport with room to spare above it. The date-picker calendar clipping off the bottom of the viewport was the visible case. A menu that fits neither side now clamps and scrolls instead of overflowing, and the calendar re-places when it switches to the month or year grid.
- **Pagination reads its ellipsis items portal-aware** — a pagination inside a modal or a scrolling wrapper now portals its menu to `<body>`, which a plain descendant walk cannot reach.
- **Zebra striping counts visible rows only** — hidden rows kept their parity, so a filtered or paged table striped in blocks. The hide set mirrors the canonical one rather than patching filter and pagination alone.
- **An emptied `.nds-nav-actions` drops out of the mainnav layout** — the row kept its border after it lost its last item.
- **A centred card centres its text block and its header** — `.nds-center` reached the children but not `.nds-card-text` itself, and the header stayed pinned to the start because the `.nds-close` space-between rule sits later in source at equal specificity.
- **Stepper stops cancelling form submits** — a submit-typed control inside a form is handed to that form: no `preventDefault`, no move. `data-stepper-control` stays an unconditional mover, and a gated step is driven by `NDS.Stepper.next()` from whatever knows the answer. See the [Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html) page.
- **`.nds-grid` no longer stretches to its parent's height** — the row tracks already sized themselves, so the stretched box only added trailing height when the parent was taller than the content.
- **A persona's info column centres against the avatar** — it sat top-aligned whenever the avatar was the taller of the two.
- **A countdown label with no `{s}` placeholder warns** — the label rendered frozen with nothing to say why.

### Documentation
- **[Page Shell](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html)** — the console modifier's reach (inert outside `nds-*` regions, no per-route toggle), the three `--bg-*` knobs, an `nds-page-bg` row, and the `shell` layout in the shape table.
- **[Section](https://mazin-musleh.github.io/NDS-vanilla/layout/section.html)** — the `nds-full-width` breakout row, a meaning that was documented nowhere.
- **[Block](https://mazin-musleh.github.io/NDS-vanilla/layout/block.html)** — `nds-block` is a spacing unit, not a content grouping primitive. It sets width and `margin-block-end` only, so the class belongs straight on a stepper, a tab set or a table rather than on a wrapper around them.
- **[Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html)** — the custom-select ranking now sits at the Native Select demo instead of 730 lines below it, and `nds-select` and `nds-textarea` have Modifier Classes rows naming what breaks without them.
- **[Stepper](https://mazin-musleh.github.io/NDS-vanilla/components/stepper.html)** — all three advance paths, and horizontal paired with radial on small screens.
- **[Document Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html)** and **[Hero](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/hero.html)** — the hero image preload is in the canonical head block, with the breakpoint-matching rule beside it. The hero sample matches the slider in the Home Page Template, and the photo-free recipe is replaced: keep the `<picture>` and point it at a placeholder rather than hand-setting a semantic token.
- **[Main Navigation](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html)** — the `current` and `active` `data-state` meanings are separate rows.
- **[Tags](https://mazin-musleh.github.io/NDS-vanilla/components/tags.html)** — the Tag Group example shows labels, not states. It demoed Approved / In Review / Blocked on colour classes, which contradicts the page's own rule that a state takes `data-status`.
- **[Filter](https://mazin-musleh.github.io/NDS-vanilla/components/filter.html)** — `getInstance` and `getByTarget` hand back a promise until the delegated bundle lands; resolve through `whenReady` instead.
- **[Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html)** — when `nds-card-meta` is needed, and when a bare `nds-card-tags` is enough.
- **[Manage Records](https://mazin-musleh.github.io/NDS-vanilla/examples/manage-records.html)** — the port is split by what touches data: filtering, sorting, pagination, export, column visibility and per-page are client-side and port as they are; create, edit, delete and the expandable rows read and write.
- **[Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html)** and **[Chart](https://mazin-musleh.github.io/NDS-vanilla/components/chart.html)** — two wrong token values and a stale palette claim corrected.
- **The primary colour family is described by role, not by hue,** across eleven pages. A brand palette is themeable, so naming its shade in prose dates the page.

### Migrating from v1.8.1
- Replace the runtime: copy `_site/assets/` over your assets folder. It carries one new file, `nds-audit.min.js`.
- **Cooldown Button: remove `data-sent-title`, `data-sent-message` and `data-cooldown-loading`, and stop listening for `nds:cooldown:loading`.** The attributes are inert and the event never fires. Move the confirmation into your own handler on `nds:cooldown:triggered`, which is where the request goes out, and set `data-state="loading"` on the button yourself while it is in flight. The component never sets or clears that state.
- **Add `.nds-stripe` to `.nds-main-content` if you relied on automatic section striping.** Without it every section renders flat. Add `.nds-odd` beside it to tint the other parity.

## [1.8.1] - 2026-08-18

### Added
- **`NDS.Init.audit()` reports `lang` and `dir` disagreement** — `NDS.isRTL` reads `dir` alone, so `<html lang="ar">` with no `dir` runs every direction-aware component left to right under Arabic content, with nothing else reporting it.
- **NDS IQ v2.2** — client-rendered apps get proper coverage, direction and language are a required pair, a compacted context counts as a new session, and a matched source ships all its members. See [NDS IQ](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Field status is error and help only** — a field's outline and its message are error signals, so `setStatus` now folds `success`, `warning` and `info` to neutral on both the container and the feedback it creates. Existing calls still run; they render neutral. See the [Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html) page.
- **The feedback slot is opt-in, not required** — `setStatus` inserts into the container when no `data-feedback-target` exists, so an empty hidden slot is scaffolding rather than a requirement. The empty slots were removed from canonical markup; populated slots and header placements stay.

### Fixed
- **Filter and Pagination no longer drop the URL hash** — all three URL writers rebuilt the address from path and query alone, so the first filter change or page click wiped the route of a hash-routed app.
- **Filter reclaims a target id from a detached instance** — a view unmounted without `NDS.Init.destroy()` left its instance holding the `data-filter-target` id, so every remount was skipped and the region stayed hidden. A detached instance is now destroyed, the id freed, and one warning names the missing teardown.
- **Inline styles removed from shipped JS** — four components wrote a custom property through a `style` attribute, which a strict Content-Security-Policy blocks. Pagination's page menu could not scroll past its first window, the editor's remove menu lost its indent, and toast progress never animated. All four now write through the CSSOM. See [Document Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) for the policy notes.
- **OTP digits paint their status** — an OTP group set to error left its digit boxes neutral while the message rendered.

### Documentation
- **[Page Shell](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html)** — framework wrappers and modifier timing: what a mount element and per-component wrappers do to the shell's layout, and why a layout-affecting class must be in the initial HTML.
- **[Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html)** — the framework-view lifecycle contract: `refresh` on mount, `destroy` on unmount, no readiness check and no polling.
- **[Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html)** — server-rendered errors: the loop that sets a status per field and focuses the first invalid one, including the fieldset case a group cannot focus.
- **[Forms](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html)** — where feedback goes: the slot is opt-in, and a hidden target shows and hides itself.
- **[Password](https://mazin-musleh.github.io/NDS-vanilla/components/password.html)** — both confirm patterns: with a match chip beside strength rules, and chipless when confirm is the only check.

### Migrating from v1.8.0
- Replace the runtime: copy `_site/assets/` over your assets folder.
- **Field status calls that used `success`, `warning` or `info` now render neutral.** The calls still run and nothing breaks; if a field relied on a green or amber outline, move that signal to page-level copy or an [Alert](https://mazin-musleh.github.io/NDS-vanilla/components/alert.html).
- **If you copied a form's canonical markup with an empty hidden `data-feedback-target` element, you may remove it.** Leaving it in place is harmless — it renders nothing and feedback still lands there.

## [1.8.0] - 2026-08-16

### Added
- **`NDS.Init.destroy(container)`** — the teardown mirror of `refresh`. It releases every component instance inside a container before that container is removed and returns the count, so a framework can free NDS state on unmount. Teardown restores a relocated node as well: a docked FAB returns to the element that authored it, a portaled dropmenu returns to its wrapper, and an open modal releases its backdrop and scroll lock, so a view removed mid-open cannot strand an overlay the app is unable to dismiss. Five components gained their own `destroy()` so the walk can reach them — see the [Refresh](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html), [FAB](https://mazin-musleh.github.io/NDS-vanilla/components/fab.html), [Modal](https://mazin-musleh.github.io/NDS-vanilla/components/modal.html), [Swiper](https://mazin-musleh.github.io/NDS-vanilla/components/swiper.html), [Table of Contents](https://mazin-musleh.github.io/NDS-vanilla/components/toc.html) and [Side Info](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sideinfo.html) pages.
- **Main Navigation** — `reinit()` recovers a nav that mounted after the deferred bundle ran. It is registered as a `refresh` hook and acts only when the node actually changed. Before this, a framework that rendered the chrome late left every reference null for the session: CSS painted the nav, nothing worked, and no warning appeared. See the [Main Navigation page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html).
- **Main Navigation page** — the nav is now its own reference instead of a section inside Document Header.
- **Page Shell reference** — names the page shapes, the wrapper classes each one carries, how the side menu and side info nest, and which built page to copy for each shape. See the [Page Shell page](https://mazin-musleh.github.io/NDS-vanilla/layout/page-shell.html).
- **NDS IQ v2.0** — §Build copies the page skeleton from a built page instead of writing it from prose, and routes to the Page Shell reference. §Verify is headless-first: one browser sets its own viewport, so the desktop and mobile passes are the same run. See the [Integration Quality guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Document Head** — the gated critical-CSS setup is now the default HTML tab, so anyone copying canon gets it without reading the prose first. The blocking `<link>` sits below it as the swap to make when a strict CSP cannot grant the inline block a nonce or hash. See the [Document Head page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html).
- **Side Menu, Document Header** — both now name the layout parent an aside needs, `nds-wSideMenu` on `.nds-content-layout`, without which the layout hides the aside. The Jekyll front-matter steps drop to site notes: a consumer project has no front matter. See the [Side Menu page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/sidemenu.html).
- **Hero, Main Navigation** — the Jekyll-only sections open with a site note, so a consumer knows the mechanism is this site's and not the system's.

### Fixed
- **Chart** — `initCharts` claimed any `.nds-chart` carrying `data-chart-type` even when the series comes from `NDS.Chart.create`, then threw while building the legend. It fires on plain init, so a chart built through `create` on a marked element has never worked.
- **Filter** — `whenReady` now fires for sibling surfaces that were already ready when init ran.
- **Tables** — `nds-responsive` is documented as what it is: a legacy marker with no effect. Every table is wrapped in the horizontal-scroll container automatically, with or without the class, and the modifier row still credited the class with the wrap. See the [Tables page](https://mazin-musleh.github.io/NDS-vanilla/components/tables.html).
- **Block** — the doc claimed every block establishes a named CSS container. It does not. `container-type` is opt-in through `.nds-cq`, deliberately not on every block, because a container traps `position: fixed` descendants such as modals and dropmenus. See the [Block page](https://mazin-musleh.github.io/NDS-vanilla/layout/block.html).
- **Documentation markup** — a block sweep had wrapped each definition item and each demo card in its own `.nds-block`. Definition lists lost every divider, because the item became the only child of its wrapper and `:last-child` matched every time. Showcases doubled the gap between demo cards. Four tables carried a `<div>` between `<table>` and `<thead>`, which the browser hoists out of the table.

### Migrating from v1.7.2
- Replace `assets/css/` and `assets/js/` with the new bundles.

## [1.7.2] - 2026-08-15

### Added
- **NDS IQ v1.0** — the consumer rules leave beta, rewritten whole: an agent-timeline structure, five standing principles, and tables for the sanctioned edit kinds, the bans, and the states that are reported rather than resolved. 69.6K → 41.4K characters, then 40.4K after the first gated trim. See the [Integration Quality guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).
- **Filter** — every active criteria now reaches the server. Criteria that no control carries, such as a range filter's encoded value, are written into `.nds-filter-hidden-inputs` on each submit and keyed like the URL param, so AJAX and native GET both send them. See the [Filter page](https://mazin-musleh.github.io/NDS-vanilla/components/filter.html).

### Changed
- **Grid, Card, Scroll-more** — public knob resets drop to zero specificity through `:where()`, so a consumer stylesheet class wins whatever the load order. Before this, the deferred main CSS re-inserted at the end of `<head>` and beat any single-class consumer rule, and an external knob sheet lost every knob.
- **Docs** — `data-status` on [Cards](https://mazin-musleh.github.io/NDS-vanilla/components/cards.html) and [Featured Icons](https://mazin-musleh.github.io/NDS-vanilla/components/featured-icons.html) declares the state the element is in, not a colour: it renders as the matching variant, but a tint with no state belongs on the colour class. Cards' modifier and data-attribute tables now name the element each entry sits on. [Sort](https://mazin-musleh.github.io/NDS-vanilla/components/sort.html) names who owns row order once the server pages the rows, and [Document Head](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) covers inline knobs under a strict CSP.

### Fixed
- **Icon fonts** — icons no longer stay invisible when every glyph of the family starts hidden, for example inside an unselected tab panel. The browser never began the fetch, so no load event fired and the miss became permanent. The fetch is now forced once on expiry.
- **Tabs** — a horizontal strip's own `--scroll-padding: 0` opt-out applies again, dropping an unintended 4px end padding.
- **Filter** — `setFilterValues` and `setSearchValue` re-fetch in AJAX form mode. They previously repainted the chips, badge, and URL from new criteria without submitting, so the page stated a filter the results were never filtered by. A run of setters coalesces into one request.
- **Filter** — the dropmenu Clear button zeroes the search box, and the change event carries a snapshot.
- **Filter** — controls outside the submitting form are associated with it, so their criteria are no longer dropped silently.
- **Counter** — a target written with grouping separators, such as `3,742`, counts to 3742 instead of 3.
- **Code** — a markdown table row inside a prose block keeps its authored line instead of wrapping into what looks like a new row.
- **Examples** — loading buttons stay clickable and abort on cancel.

### Migrating from v1.7.1
- Replace `assets/css/` and `assets/js/` with the new bundles.
- **Filter in AJAX form mode now sends criteria your handler did not receive before.** A range filter, and any other control the component renders without a name, arrives as a hidden input keyed like its URL param. If your endpoint rejects or logs unknown parameters, accept these before upgrading.
- **Knob resets dropped to zero specificity.** If you relied on an NDS knob reset beating your own class, your class now wins instead. Check any stylesheet that sets `--gap`, `--max-col`, or another public knob on Grid, Card, or Scroll-more.

## [1.7.1] - 2026-08-12

### Added
- Custom select — an option can now carry a description line under its label, plus free decoration such as an icon or a coloured dot. The canonical shape nests `.nds-label` inside `.nds-option-text`, with an optional `.nds-description` beside it. Flat options keep working unchanged: the label reader falls back to the option text's own content, so the trigger never shows the description glued to the label. See the [Forms doc page](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html#customSelect).
- **FAQ template** — each tab's accordion paginates, five entries per page.
- **NDS IQ v0.8** — the consumer rules became version-agnostic. They no longer require a minimum template version, `_source/` is populated from the matching release tag, the update check compares file content with a first-line check that catches a corrupt download, and the revision number is now a display indicator. Also adds a catalog check before any native element or hand-built control, a Content-Security-Policy check at install, and an adoption sweep of each release's Added, Changed, and Fixed notes during an upgrade. See the [NDS IQ guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).

### Changed
- **Alert, Card, Definition List** — running text caps at `--paragraph-max-width`, so long copy keeps a readable line length.
- **Dropmenu** — menus render a thin scrollbar. A classic bar is most of a compact menu's width, and `max-content` sizing ignores it, so items overflowed and clipped.
- **Date Picker** — the dropdown no longer reserves a scrollbar gutter; the thin scrollbar above replaces it.
- **JS source banners** — Filter and Tables now document the DOM shape their generators emit (`_buildFilterInput()` and `buildRow()`), so hand-written filter options and column-menu rows match what the component builds. Filter also documents `data-filter-submit` form mode and its two-line markup.
- **Docs** — Pagination and Autocomplete cross-reference [Toolbar](https://mazin-musleh.github.io/NDS-vanilla/components/toolbar.html). Pagination states that the container and item markers are canonical for every mode, and cross-references `nds-empty` from its server-pagination section.

### Fixed
- **Accordion** — `destroy()` releases the container backref and the init stamp, so `create()` and `init()` rebuild the accordion instead of handing back a dead controller.
- **Button** — a disabled button inside a button group no longer keeps an enabled-coloured inner seam.
- **Forms** — the `.nds-prefix` and `.nds-suffix` radius override is scoped to `.nds-btn`, so it no longer reaches other prefix content.
- **Foundation Day theme** — the mobile section-title override is scoped to its slide instead of the whole page.
- **Filter banner** — corrected: `refresh()` skips form-mode filters whether or not they carry `data-ajax`. A `data-filter-submit` form without `data-ajax` is server-driven too, and re-scanning it would rebuild the options from the rendered rows and drop the applied filter.
- **Release zip** — the bundled `NDS-IQ.md` copy ships with LF line endings.

### Migrating from v1.7.0

- Replace all runtime assets: copy `_site/assets/` from the release zip over `NDS_ASSETS/`. Every file carries the new version banner, so overwrite everything rather than merging.

## [1.7.0] - 2026-08-10

### Added
- **Password** — new component: a password field that checks strength rules on every keystroke, confirms a retyped password matches, and blocks submit until both pass. Rule chips take a built-in rule, a `data-rule-pattern` regex, or a rule registered with `NDS.Password.addRule()`; `data-password-strength` on the container is the CSS hook for a strength meter. See the [Password doc page](https://mazin-musleh.github.io/NDS-vanilla/components/password.html).
- **NDS.Init.refresh** — one call after a list mutates: `NDS.Init.refresh(container)` tells every live component that the container's contents changed, so filters, counters, sorting, and row controls follow the new rows. It walks the loader registry, so a component updates because it is registered, not because the caller remembered it. See the [Refresh doc page](https://mazin-musleh.github.io/NDS-vanilla/core/refresh.html).
- **Prose** — new layout layer: a classless flowing-content region for editor and CMS output. `.nds-prose` styles bare headings, paragraphs, lists, blockquotes, tables, and `<hr>` with no per-element classes. See the [Prose doc page](https://mazin-musleh.github.io/NDS-vanilla/layout/prose.html).
- **NDS IQ v0.7** — the consumer rules ship as a file, not a pasted block. `NDS-IQ.md` sits at the zip top level and on raw main, and the agent reads it on demand, once a session. Only a small anchor with the project's two paths goes into the project's own instruction file. See the [NDS IQ guide](https://mazin-musleh.github.io/NDS-vanilla/guides/integration-quality.html).
- **JS source banners** — every runtime JS file opens with a public-surface banner listing its methods, events, hooks, and gotchas, so the `_source/` copy answers API questions without a full read. The release build fails on a missing or drifted banner.
- Release zip — `_source/` now carries the raw page sources for docs, templates, and examples (`components/`, `utilities/`, `layout/`, `ui-shell/`, `core/`, `templates/`, `examples/`) beside the JS and SCSS.
- Catalogs — every entry in `components.yml`, `templates.yml`, and `examples.yml` carries `use_when`, the job the entry does in the words developers use.
- Examples — Sign In: national single sign-on with a credentials fallback, captcha on a cooldown refresh, delivery-method choice, one-time code, change password, change mobile, and sign out. See the [Sign In example](https://mazin-musleh.github.io/NDS-vanilla/examples/sign-in.html).
- Examples — Manage Records: a CRUD screen built on table sub-rows, with create, edit, delete, bulk delete, and CSV export. See the [Manage Records example](https://mazin-musleh.github.io/NDS-vanilla/examples/manage-records.html).
- Examples — Faculty CV: a long-form profile with stacked wrappers on one card, a reversed vertical stepper as a career timeline, and a paginated publication list. See the [Faculty CV example](https://mazin-musleh.github.io/NDS-vanilla/examples/faculty-cv.html).
- Filter — `NDS.Filter.refresh(root)` re-resolves items and regenerates auto filters after the DOM changes. A refresh holds the user's page; a real criteria change still resets to page 1.
- Selection — `NDS.Selection.refresh()` recounts every selection target.
- Sort — `NDS.Sort.refresh()` re-runs the active sort after items arrive.
- Sort — a selector string that matches in the document but not inside the root now warns once, instead of silently sorting nothing.
- Custom select — `NDS.CustomSelect.setValue(el, value)` and `NDS.CustomSelect.clear(el)`. Both work before the menu is built and while it is portaled open; `setValue` returns `false` for an unknown value, so display and submit value never diverge.
- Dropmenu — `NDS.Dropmenu.destroy(element)` is now public, so a consumer discarding a wrapper has a supported teardown.
- Autocomplete — `data-strict`: typed text must match a picked suggestion, enforced at submit through a hidden nameless value carrier. The submitted form data does not change.
- Stepper — `nds-cardView` cards each step's content in vertical layout and the whole widget in radial. `--stepper-gap`, `--stepper-card-lift`, and `--stepper-content-width` are real knobs a consumer stylesheet can win against.
- Stepper — a divider used as a step label, aligned to the circle centre through `--divider-lift`.
- Divider — `nds-start` and `nds-end` drop one flanking line so the label sits flush. `--divider-line-start` and `--divider-line-end` cap either line.
- Section — `--section-wrapper-gap` sets the space between stacked wrappers in one section. See the [Section doc page](https://mazin-musleh.github.io/NDS-vanilla/layout/section.html).
- Buttons — `.nds-btn.nds-col` stacks the icon above the label and fills its slot.
- Code — `.nds-code-tags`, an authored chip strip beside the language tag.
- Tags — `--tag-label-max` dials the label cap; a long label truncates instead of escaping its container.
- Scroll more — `--scroll-padding` pads the scroll end so the last child's border and focus ring are not clipped.
- Table of contents — `--toc-skeleton-rows` reserves the auto-populated list height and a loading skeleton fills it until init.
- Hero — the sub hero can carry a portrait beside its title, separate from the existing background image (`hero_avatar` on the Jekyll sources in `_source/`).

### Changed
- Events — the five remaining legacy event names now follow `nds:<component>:<verb>`, matching multiselect, filter, pagination, and dropmenu. Listeners on the old names stop firing; see Migrating below.
- Document Head — deferred stylesheets ship as `data-nds-defer` preloads that one head script converts to real links. The inline `onload` handlers are gone, so a nonce or hash can grant the head script; the `<noscript>` fallbacks are gone with them. The icon sheets load from `nds-main.min.js` and need no CSP grant, and the `use_hgi_font` config key is removed. A head kept from 1.6.0 still works — the loader falls back to the stylesheet filename and skips any icon sheet the head already added — so re-copying the head is an improvement, not a migration step.
- Prose — `.nds-section-body` no longer styles bare prose. Prose surfaces opt in with `.nds-prose`, and component internals get nothing by default; the list rhythm, sub-list spacing, and `ol` marker cycle move into the prose layer, so `.nds-prose` and the editor match.
- Prose — paragraph flow moves to `--spacing-xl`, headings are restated as multiples of that gap, and running text caps at `--paragraph-max-width`. Tables, code, and demos keep the full column.
- Cards — canonical markup keeps `.nds-card-actions` a sibling of `.nds-card-content`, so a long form scrolls without taking its buttons out of reach. Actions nested inside the content still work; a modal pins them.
- Utilities — `nds-note` is a standalone utility with the four status tints. `nds-required-notice` stays as the legacy alias.
- Utilities — `nds-center-sm`, `-md`, `-lg`, and `-xl` are removed.
- Toolbar — `.nds-bar-text` and `.nds-results-count` read the primary paragraph colour, and a toolbar inside `.nds-sub` takes a tighter default bottom margin.
- Mainnav — the desktop nav container gap widens from `lg` to `4xl`. Mobile stays at `lg`.
- Focus — the reset ring folds into `:where()`, so a component box-shadow overrides it on source order. A focused link gains padding for the outline without shifting the text around it.
- Code — the light-mode syntax property colour moves to blue-700 for stronger contrast on cards, and the prompt lexer colours a full URL as one token.
- Password ships in the delegated bundle. Chips are server-rendered neutral, and init recovers any keystroke typed before the bundle lands.
- Filter — `NDS.Filter.create()` now registers exactly like the loader path: init stamp, backref, target registry, and the ready event.
- Date picker — panel listeners hang off a per-open `AbortController`, and the instance-lifetime ones off the instance controller.

### Fixed
- Icon font — the load budget is measured from the download, not from init, so the HGI icon font no longer times out and leaves every content icon invisible for the life of the page. Under slow-4G the sheet landed well past the old 15s deadline.
- Sort — the original order is snapshotted on first apply, not at init, so items that arrive late can still be restored. Reset no longer re-attaches a deleted row.
- Sort — triggers authored inside a portaled dropmenu resolve through the portal-aware walk, so the trigger icon keeps tracking the active sort.
- Filter — every control inside a portaled menu stays reachable to `refresh()`, the live sort-trigger getter, the count slot, and the accordion count tags.
- Filter — the "All" radio is restored when a chip is cleared and when `setFilterValues()` empties a group. A radio option whose own value holds commas now matches on URL replay.
- Filter — all four `nds:filterForm*` events and the relayed `nds:formValid` / `nds:formInvalid` bubble, so a form-level listener fires.
- Filter — `showNoResultsAlert()` is guarded against a missing filter target, which is the normal shape in form and AJAX modes.
- Filter and Sort — an AJAX swap no longer leaves the sort engine rooted on the replaced container, and the swapped-in container is stamped so it is not held hidden.
- Accordion — a group built after the first pass wires its header, and the toggle index resolves at click time so a late item cannot misdirect earlier buttons.
- Date picker — the hour cycle is pinned, so 00:00 to 00:59 Riyadh no longer reads as a day forward and break "today", the Today button, and the year window.
- Date picker — closing one picker no longer wipes every other picker's conversion memo, and `destroy()` releases the two lifecycle listeners it used to leave behind.
- Tables — row checkboxes are read live, so rows created or deleted at runtime enter the counts and `nds:table:selection` reports them. `selectedIndexes` reports DOM order, as the doc page already stated, and a table that starts empty and gains rows still wires up.
- Export — a sub-row's nested table no longer walks up to the outer paged container and exports zero rows.
- Forms — a required custom select validates through its hidden value carrier, instead of passing whatever it held.
- Forms — `type="number"` inside an NDS field no longer paints the browser's spin buttons.
- Forms — the clear button hands focus back to the field it emptied instead of dropping it to `<body>`.
- Autocomplete — a programmatic `input` dispatch triggers the fetch, and an autocomplete outside a forms-managed container fetches at all.
- Buttons — a cooldown button reserves the widest of its three labels from first paint, so the box no longer resizes under the user's finger.
- Hero — the sub-hero background image no longer creates a stacking context that traps overflowing content, so an open dropmenu paints above the section below.
- Layout — the side-info flex rule is scoped to its own section body, so nested wrappers keep their block layout. Wrapper spacing no longer relies on margin collapsing.
- Table of contents — no entry reads as active until a heading is reached, and the auto-populated list reserves its height so the article does not jump on mobile.
- Scroll more — the scroll end is padded, so the last item's border and focus ring are not clipped. Tab strips opt out.
- Content switcher — the panel drops its inline padding, since the strip is `fit-content` and there is no edge to align to. A panel that is itself a card keeps its own gutter.
- Loader — injected bundles go into the body, not the head. Injection is post-reveal, so a body-tail script is the right slot.
- Tags — a label wider than its card or cell truncates instead of overflowing.
- Modal — actions that consumer markup still nests inside the scrolling content are pinned, so a long form cannot push them out of reach.
- High contrast — the sub-hero image suppression follows the image to its new pseudo-element.

### Migrating from v1.6.0

- Replace all runtime assets: copy `_site/assets/` from the release zip over `NDS_ASSETS/`. Every file carries the new version banner, so overwrite everything rather than cherry-picking the changed bundles.
- Events — five legacy names now carry the `nds:` prefix. Listeners on the old names stop firing. Rename them: `selectChange` → `nds:customselect:change`, `ratingChange` → `nds:rating:change`, `nds-modal-opened` / `nds-modal-closed` → `nds:modal:opened` / `nds:modal:closed`, `nds-digitalStamp-opened` / `nds-digitalStamp-closed` → `nds:digitalStamp:opened` / `nds:digitalStamp:closed`, and `switchChange` → `nds:switchChange`.
- Prose — `.nds-section-body` no longer styles bare `<p>`, `<ul>`, `<ol>`, `<table>`, or `<pre>`. Add `nds-prose` to the wrapper that holds them, or wrap them in `<div class="nds-block nds-prose">`. Component internals are unaffected.
- `.nds-card-form` is removed, along with the `.nds-card > .nds-form` flex override. A `<form class="nds-form">` inside a card stays `display: contents`, so the card's own column reaches `.nds-card-content` directly. Replace `.nds-card-form` with `.nds-card-meta` where you used it as a column wrapper.
- `.nds-center-sm`, `.nds-center-md`, `.nds-center-lg`, and `.nds-center-xl` are removed. Write the media query in your own stylesheet; `.nds-center` is unchanged.
- NDS IQ — the rules are no longer a block pasted into your agent instruction file. Save `NDS-IQ.md` at your project root and replace the pasted block with the anchor. Delete everything from the old block's `## Design system: NDS Vanilla` heading through its `<!-- end NDS instructions -->` marker; the anchor and the full steps are in the file's "Install and upgrade this file" section. The rules require template 1.7.0 or later.

## [1.6.0] - 2026-08-02

### Added
- **Content Switcher** — new component: DGA segmented control built on tabs. See the [Content Switcher doc page](https://mazin-musleh.github.io/NDS-vanilla/components/content-switcher.html).
- **Get Started guide** — hosted adoption workflow with an agent instruction block, replacing the in-zip integration docs. See the [Get Started guide](https://mazin-musleh.github.io/NDS-vanilla/guides/get-started.html).
- **NDS.request** — a fetch wrapper with a 15s default timeout, a response-size cap, and errors carrying `.status`, `.url`, and a capped `.body`. See the [Request doc page](https://mazin-musleh.github.io/NDS-vanilla/core/request.html).
- Tables — expandable sub-rows.
- Pagination — windowed lazy ellipsis picker, URL sync, and a jump-to-page field.
- Pagination — `data-pagination-no-scroll` opts a nav out of the page-change scroll; `NDS.Pagination.scrollToContent()` runs it manually.
- Tabs — `sm` size rung; `--btn-size` drives the real button height.
- Code — prompt highlighting, markdown highlighting, language tag, roomier action bar, expandable/scrollable blocks, and a `--code-bg` knob for prose blocks.
- Toolbar — `.nds-bar-text` as the canonical class for a bar's text item.
- Tags — `data-status="critical"` alias for `error`.
- Visibility — canonical `sm/md/lg` tokens for `data-hidden`.
- Copy — the flash window is inert to keyboard and mouse.
- Release zip — ships `_source/` (readable JS/SCSS + machine-readable catalogs) alongside the compiled `_site/`.

### Changed
- Assets — files consumed only by the doc site moved into `docs-assets/`; the consumer runtime stays under `assets/`.
- Layout — edge-to-edge chrome and content driven from `body.nds-full-width`, no per-layout modifier.
- Layout — prose list spacing, indent, and markers reworked for a cleaner rhythm.
- Buttons — dark `secondary` keeps its alpha wash by default; solid dark is opt-in.
- Panels — sheet corner radius and tighter mobile header.
- Editor — image popover scroll capped at 70svh.
- Drawer — `sm` size variant removed.
- Toolbar — default bottom gap widened to `4xl`.
- Autocomplete — regex hoisted, DOM writes batched, clicks delegated, items cached.
- Backdrop — default `blur(2px)` fallback removed.
- Code — the syntax highlighter moved off the critical path into the extras bundle.
- Core — `onAttrChange` checks watched attrs before running `matches()`.

### Fixed
- Pagination — paged tables in background tabs initialize when the tab is activated.
- Alert — card alert descriptions read in the primary paragraph color.
- Dropmenu — close and delayed-open state settles during destroy; own-element walks scope to the instance; auto-populated rows opt into search and wire the clear button.
- Editor — component delete, cut, and paste no longer corrupt the document.
- Forms — the actions row's top margin is zero when it leads the form.
- Expandable — the clamp is preserved on unmeasured panels.
- Chips — numeric labels no longer clip mid-glyph.
- Backdrop — stack ownership tracked so nested owners restore correctly on unstack.
- Layout — trailing space dropped from `content-layout` class; empty body class attribute suppressed when unset.
- JS lifecycle — pagination teardown, stepper reinit, and loader diagnostics + debug audits corrected.

### Migrating from v1.5.0

- Replace all runtime assets: copy `_site/assets/` from the release zip over `NDS_ASSETS/`. Every file carries the new version banner, so overwrite everything rather than cherry-picking the changed bundles.

## [1.5.0] - 2026-07-25

### Added
- Panels — new component: a slide-in surface on any side plus top and bottom sheets, with an optional modal backdrop and focus trap. See the [Panels doc page](https://mazin-musleh.github.io/NDS-vanilla/components/panels.html).
- Floating Action Button — new component: FABs that dock themselves by `data-fab-pos`, in a size ladder, grouped clusters, and edge thumbs that ride their panel open. See the [FAB doc page](https://mazin-musleh.github.io/NDS-vanilla/components/fab.html).
- Content placeholder — new utility: a dashed slot marker for a region awaiting a real component. See the [Content placeholder doc page](https://mazin-musleh.github.io/NDS-vanilla/utilities/content-placeholder.html).
- Dropmenu — `data-search` adds a search box that filters items, diacritic-insensitive.
- Dropmenu — `nds-center` centers item labels.
- Dropmenu — component-owned menus carry a `.nds-{component}-menu` class that survives portaling.
- Pagination — `data-per-page-target="<id>"` turns any dropmenu into a per-page picker.
- Pagination — `data-pagination-no-scroll` opts a nav out of the page-change scroll; `NDS.Pagination.scrollToContent()` runs it manually.
- Buttons — `nds-vertical` stacks a button group.
- Tabs — `--tab-panel-padding`, `--tab-panel-padding-inline` and `--tab-panel-padding-block` knobs.
- Forms — `data-state="loading"` on a form container, group or control renders the spinner shell. See the [Forms doc page](https://mazin-musleh.github.io/NDS-vanilla/components/forms.html).
- Alert — toasts ship with a shadow and stroke by default.
- Upload — `--upload-background-dropbox-default`, `--upload-background-dropbox-active` and `--upload-background-file-item` tokens.
- Editor — toolbar menus portal out of a clipping ancestor.
- Tokens — the reference page now covers the app-shell, transition and font-weight tiers.

### Changed
- Tokens — one file per tier (`tokens/_primitives`, `_semantic`, `_components`), each with its dark block colocated. Compiled output is unchanged.
- Tokens — nine spacing dials moved off `:root` onto their components: `--tooltip-padding`, `--tooltip-gap`, `--table-cell-padding-block`, `--table-cell-padding-inline`, `--tab-button-gap`, `--tab-button-padding-block`, `--tab-button-padding-inline`, `--stepper-indicator-gap`, `--stepper-text-padding`. Setting them works as before.
- Accessibility — the panel and FAB are now the shared Panels and FAB components, and the 500 ms open delay is gone.
- Cards — wider header gap, and titles top-pad to sit level with a leading avatar or icon. Modal inherits both.
- Buttons — dark `secondary` reads its own colour family instead of the shared alpha wash, restoring its hover feedback.
- Autocomplete — `setLoading()` uses the shared form loading state.
- Modal — only the card content scrolls; header and actions stay pinned.
- Hero — tighter bottom padding on the flat sub-hero.

### Fixed
- Buttons — the group seam is visible on `secondary` and takes the right colour on outline.
- Dropmenu — percentage widths survive portaling instead of blowing up to viewport width.
- Custom select — options still select once the menu portals.
- Tables — sorting no longer tears apart a table nested in a cell.
- Tabs — loading cards keep the tab skeleton, the divided vertical indicator sits level, and an overflowing centered list stays scroll-reachable.
- Scroll more — horizontal overflow is detected when the wrapper sets `align-items`.
- Hero — the sub-hero's background image no longer paints behind an ancestor.
- Mainnav — the brand no longer stretches across the nav row.
- Featured icons — `oncolor` reaches an inline `<svg>`.
- Editor — loose top-level text gets a paragraph so alignment, direction and headings apply to it; pasted whitespace collapses.
- Form template — the pinned stepper strip sits flush under the nav on mobile.
- Tokens — `--border-neutral-light` is defined in light mode; `--background-surface-elevated` and `-sunken` gain dark rebinds.
- JS lifecycle — listeners release through `AbortController`, fixing dropmenu re-init after `destroy()`, taginput's `create()`/`destroy()` pairing, and date-picker leaving orphan menus behind.
- SEO — `sitemap.xml` emits `lastmod` from each page's `last_edit`.
- Docs — index grids tag unreleased components "Next release"; the FAB and IPV cards are findable by abbreviation.

### Migrating from v1.4.1

- Replace the built bundles (`nds-main.min.*` and the loader-injected `nds-delegated`/`nds-extras`, plus the `nds-accessibility`/`nds-showcase`/theme bundles).
- Accessibility panel — reworked onto the shared Panels and FAB components. Copy the new markup from the [Accessibility doc page](https://mazin-musleh.github.io/NDS-vanilla/components/accessibility.html).

## [1.4.1] - 2026-07-20

### Added
- Editor — image support: insert by URL from a popover (with alt, width, height), click an image to select it for edit-in-place, link wrapping, or removal, plus paste and drag-in uploads through an embedded NDS Upload. `setImageUpload()` configures both modes; the default policy is URL-only, and the `'embed'` upload-URL sentinel opts into base64 embedding behind a 2 MB cap. See the [Editor doc page](https://mazin-musleh.github.io/NDS-vanilla/components/editor.html).
- Editor — link now wraps a whole atom (button, tag, chip, featured icon, avatar, image) as an `<a>` and unwraps it again, never nesting; `data-no-external` opts an atom out. A selection ring marks the selected or remove-armed component, Enter escapes an inline atom, and clicking a textless atom selects it whole.
- Editor — RTL/LTR direction command writing a native `dir` per block, physical alignment (left, right, center, justify), and new pilcrow direction icons.
- Upload — `NDS.Upload.validateFile()` public API for size, type, and MIME validation.
- Upload — a failed upload surfaces the server's JSON `{error}` in the file chip, falling back to `statusText` and then a localized generic message; `nds:upload:error` carries the raw response.

### Changed
- Dropmenu — `.nds-dropmenu-action` owns its layout (flex row, `--spacing-md` gap, children sharing the row equally without crushing their labels). The `nds-grid` pairing is dropped from its canonical markup.
- Upload — in the non-dropbox row layout, `.nds-file-upload`'s form control sizes to its content (`--input-size: fit-content`) instead of a fixed 40px, and the action no longer stretches past its button.

### Fixed
- Dropmenu — a portaled menu now takes its trigger's stacking layer, so a trigger inside a modal or the topbar no longer paints over its own menu.
- Forms — focus and active states reach a control nested under a layout wrapper again (the mainnav and homepage search boxes lost their focus effect).
- Forms — feedback resolves to the owning container, so a nested container's target (the editor's popover fields) no longer claims it.
- Button — `[data-state~="focused"]` paints the focus ring on `.nds-btn`, matching the hover/pressed/selected convention.

### Migrating from v1.4.0

- Replace the built bundles (`nds-main.min.*` and the loader-injected `nds-delegated`/`nds-extras`, plus the `nds-accessibility`/`nds-showcase`/theme bundles).
- Dropmenu — markup still pairing `nds-grid` with `.nds-dropmenu-action` keeps working, but the action bar's `--gap` override is gone, so those buttons now sit at the grid's default `--spacing-2xl` gap. Drop `nds-grid` from the element to get the built-in spacing.

## [1.4.0] - 2026-07-18

### Added
- Editor (Beta) — new rich-text component: a standard NDS textarea upgraded into a contenteditable editing surface with a generated, localized toolbar. Pastes from Word, Google Docs, and the web convert to clean NDS markup, and pasted NDS components stay intact while editing. Ships as beta. See the [Editor doc page](https://mazin-musleh.github.io/NDS-vanilla/components/editor.html).
- Tag Input — new component: free-text tags committed as removable chips while typing, posted natively as an array, with optional autocomplete assist/strict modes. See the [Tag Input doc page](https://mazin-musleh.github.io/NDS-vanilla/components/taginput.html).
- Toolbar — new unified controls bar above tables, lists, and grids (search, filter, sort, column visibility, pagination). See the [Toolbar doc page](https://mazin-musleh.github.io/NDS-vanilla/components/toolbar.html).
- Selection count — new component showing the number of selected rows/cards, paired with pagination's new x-of-y record slots.
- Last edit — new component rendering the DGA "last modified" line from a page's `last_edit`.
- Multiselect — options populated from JSON, apply-mode staging (staged or instant commit), and removable chips.
- Date Picker — custom date formats, month/year grid modes, save-to-commit, min/max bounds, and a form-validation bridge.
- Alert — pausable toast timer (hover to hold), corner positions, and copy actions.
- Tables — column-visibility menu with hidden columns persisted across reloads, per-column alignment, and a count badge on the filter/columns triggers.
- Tables — `data-align="center|start|end"` on a `<th>` aligns that whole column, header and body, including rows that arrive later from sorting, filtering, or pagination. See the [Tables doc page](https://mazin-musleh.github.io/NDS-vanilla/components/tables.html).
- Filter — opt-in per-group accordion with an applied-count tag, and a loading spinner on the trigger during form submit.
- Dropmenu — `data-anchor="start|end"` edge alignment with automatic viewport flip.
- Cards — `nds-card-price` product pricing built on the numbers utility.
- Forms — contenteditable elements receive form-control styling (backs the editor surface).
- Hidden — new CSS-only visibility utility: the native `hidden` attribute now wins over any `display` value, and `data-hidden="mobile|tablet|…"` hides an element within exact viewport ranges. See the [Hidden doc page](https://mazin-musleh.github.io/NDS-vanilla/utilities/hidden.html).
- Mainnav — `--nds-brand-width` knob on the brand link.
- Side info — background fill and opt-in `nds-sticky-sm/md` pinning.
- Chips / Tags — `.nds-center` list modifier.
- Featured Icons — `nds-subtle` style (flush glyph, no background or padding).
- Versioning — release-anchored version tracking: `since` / `updated` / `last_edit` doc front matter, an index version filter, and "Added in vX" / "Updated in vX" hero tags.
- Critical CSS — `critical_inline: 'minimal'` mode: a self-releasing one-line body hold.
- Icons — documentation page covering both icon layers, a click-to-copy catalog of every inline UI icon, and the license terms. See the [Icons doc page](https://mazin-musleh.github.io/NDS-vanilla/components/icons.html).
- Icons — logical arrows `nds-hgi-arrow-{next,prev}-{01,02}`: they follow reading direction, so one class means forward (or back) in both Arabic and English.
- Icons — cart UI icon; `.nds-icon-checkmark` custom thicker glyph.
- License — third-party notice for the bundled Hugeicons free set (MIT), previously shipped with no attribution.

### Changed
- Flex — promoted to a layout primitive; the default cross-axis alignment changed from `center` to `stretch` (matches the CSS default; override per-container with `--align: center`). `nds-reverse` now also reverses a bare `.nds-flex` (`row-reverse`), not just `.nds-row` / `.nds-col`.
- Forms — `.nds-form` decoupled from the layout flex chain; interactive-state styling and validation scope to a container's own control, so nested containers validate independently.
- Layout — `main` uses `overflow-x: clip` instead of `auto` (auto broke sticky descendants).
- Tables — a single init sentinel, and pagination binds to the `<tbody>` so rows added later still paginate.
- Icons — the literal arrow classes (`nds-hgi-arrow-{left,right}-{01,02}` and the HGI font equivalents) no longer mirror on LTR pages. They now point where their name says, in both directions; direction-aware behavior moved to the new `next`/`prev` classes.
- Icons — the filled status symbols are token-only (`--nds-icon-{alert,cancel,checkmark-solid,disc,help,info}`). Their `nds-hgi-solid-*` classes are removed: each is one layer of a mark the feedback icon composes over a disc, not a standalone icon.
- Icons — the theme-toggle glyph is now `--nds-icon-paint-board`, exposed as `nds-hgi-paint-board`; the chrome alias `.nds-theme` is renamed `.nds-icon-theme`.
- Icons — `nds-hgi-sun-01` removed; the dark-mode toggle uses `nds-hgi-sun-03`, the same sun the weather icons use.

### Fixed
- Dropmenu — skip `[hidden]` items in the keyboard focus walk; flip on the real menu height and never cover the trigger; park the menu before revealing it.
- Forms — an unbounded number input can no longer step past its initial value; native select OS-popup options align with the closed value; `.nds-form-action` stays clickable in readonly; taginput validates at the wrapper, not the typing field.
- Button — loading state keeps its default background.
- Multiselect / Editor — the instance is registered in `init()` so `create()` returns a destroyable instance with hooks.
- Alert — wider icon→content gap.
- Cards — flattened subtitle color; oncolor border shadow.
- Mainnav — brand logo inverts in dark mode.
- Pagination — `nds-md` control sizing below 360px.
- Feedback Icons — inline-flex so the glyph flows inline.
- Digital stamp — z-index so an open stamp covers the content beneath.
- Icons — the theme-toggle glyph hardcoded its fill (`#161616`) instead of `currentColor`, so it ignored `color` and stayed near-black in dark mode.

### Migrating from v1.3.0

- Multiselect — now a UI layer over a native checkbox group, so the checkboxes *are* the form value. Migrate old markup: add `name="…[]"` to each `<input class="nds-check">`, use `checked` for pre-selection, and remove the hidden CSV carrier inputs (`<input type="hidden" name="…[]">`).
- Flex — `.nds-flex`'s default cross-axis alignment changed from `center` to `stretch`. Containers that relied on the implicit centering now stretch their children; set `--align: center` to restore the previous look.
- Hidden — `.hidden`, `.nds-desktop-only` and `.nds-mobile-only` are removed. Replace them with `data-hidden="mobile"` / `data-hidden="tablet"` / `data-hidden="desktop"`, or the native `hidden` attribute for an always-hidden element. See the [Hidden doc page](https://mazin-musleh.github.io/NDS-vanilla/utilities/hidden.html).
- Topbar, Mainnav, Search and Toolbar — breakpoint hiding moved out of the stylesheets and onto `data-hidden` stamps in the markup. The old rules are deleted, so copied chrome markup keeps every widget visible at every width until you re-copy it. Take the current markup from the [Topbar](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/topbar.html) and [Main Navigation](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/mainnav.html) doc pages, or add the stamps yourself.

## [1.3.0] - 2026-07-04

### Added
- Themes — font-weight seeds (`data-seed-weight-{regular,medium,semibold,bold}` / `--font-weight-*`) for inline custom themes whose brand font reads lighter or heavier than IBM Plex at the same nominal weight.
- Tokens — `--button-indicator-*` family (one dial for the active-indicator trio, value-identical across light/dark/HC) and `--border-oncolor` (translucent border on colored fills).
- Dropmenu — trigger stretches to fill a column-flex parent (e.g. a hero action wrap); inline/row contexts unchanged.

### Changed
- Tokens — design-token layer restructured to enforce the four-tier naming grammar: numeric scale rungs replaced by size names, the `--alpha-*` alias tier folded into palette alphas, color-named/shade-numbered semantic tokens renamed, and several component tokens renamed to the property grammar. Component output is unchanged.
- Hero — structural styles (position, inset, sizing) moved from inline markup into blocking-crit CSS; markup now emits only per-instance knobs (`--overlay`, `object-position`). The `--overlay` default is unified to `0.7` in CSS (was `0.20` in CSS vs `0.7` in the template/data).
- Icon — `--icon-primary` now brightens to `primary-400` in dark mode (previously frozen at `primary-600`); primary-colored icons route through it instead of `--text-primary`. A consumer overriding `--icon-primary` globally is now re-bound by NDS in dark theme.
- Drawer — active/selected item label uses `--text-primary-strong` (`primary-700`) for AA contrast on the neutral-100 surface.
- Forms — dark-mode input backgrounds on lighter/darker surfaces shift: `--form-field-background-lighter` → `neutral-700`, `--form-field-background-darker` → `neutral-900`.

### Fixed
- Featured icon — a default `.nds-featured-icon.nds-dark` (no status) filled green in light mode; it now fills the brand color.
- Slider — focus outline and inner ring scale with thumb size instead of hardcoded widths, staying proportional when the thumb is resized.
- Core — scroll restoration uses native `'auto'` (pre-paint restore), killing the reload top-flash; hash URLs and back-forward navigation restore correctly.
- Feedback / Progress — a status-less `.nds-feedback` now renders neutral (info glyph + dark outline brightening) via `var()` defaults; removed a stale progress information-circle override that double-stamped the glyph.

### Migrating from v1.2.0

- Replace the built bundles (`nds-main.min.*` and the loader-injected `nds-delegated`/`nds-extras`, plus the `nds-accessibility`/`nds-showcase`/theme bundles).
- Token overrides — only consumers who **override or reference NDS token custom properties** in their own CSS are affected; classes and component rendering are otherwise unchanged. See the [Token Migration Reference](https://github.com/mazin-musleh/NDS-vanilla/blob/main/TOKEN-MIGRATION.md) for the full old→new name map.
- Hero — copied hero markup with inline structural styles still works but those styles are now redundant (CSS owns them); a slide that doesn't stamp `--overlay` now renders at `0.7` (was `0.20`) — stamp an explicit value to pin it.
- Head — v1.2.0 pages shipped an inline critical-gate `<style>` + async-loaded critical `<link>` (preload/`onload` swap + `<noscript>`). A copied `<head>` still works, but the inline snapshot can drift from the 1.3.0 crit file; the canonical, drift-proof setup is a single render-blocking `<link rel="stylesheet" href="assets/css/nds.critical.min.css">` (first paint stays theme/dark-correct). Redundant but harmless if left. **Superseded in 1.7.0** — every sheet now ships as a `data-nds-defer` preload that one head script converts to a real link; copy the current head from the [Document Head doc page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html) rather than following this note.

## [1.2.0] - 2026-07-01

### Added
- Slider — new range input component: single value or dual-thumb min–max, full keyboard control (arrows, Home/End, Page Up/Down), proportional sizes, and a `.nds-stacked` layout. See the [Slider doc page](https://mazin-musleh.github.io/NDS-vanilla/components/slider.html).
- Filter — slider/range filter type and a standard `nds-filter-bar` layout. See the [Filter doc page](https://mazin-musleh.github.io/NDS-vanilla/components/filter.html).
- Pagination — `setTotalPages()`, a `page-change` event, id-based binding between a nav and its content via `data-*`, `data-page-url` page links, plus live collapse and auto-refresh when items are added or removed.
- Numbers — `data-unit` on `nds-number-format` appends an arbitrary unit suffix.
- Upload — `NDS.Upload.create(el, options)` for JS configuration (overrides the declarative `data-*`), a built-in fallback file-item template, and opt-in `addFile` validation. See the [Upload doc page](https://mazin-musleh.github.io/NDS-vanilla/components/upload.html).
- IPV (ID/passport input) — added full keyboard accessibility and English/Arabic localization. See the [IPV doc page](https://mazin-musleh.github.io/NDS-vanilla/components/ipv.html).
- Rating — loading skeleton state.
- Progress — circular ring fills when scrolled into view.

### Changed
- Code — syntax highlighter rewritten as a token-stream lexer with embedded-language support and language auto-detection.
- Filter — `data-filter-items` accepts a bare class name, not only a full selector.
- Buttons — `--btn-gap` scales per size; icon-only and minimal-collapse buttons route padding through the `--btn-padding` token; the loading-spinner inset is decoupled from padding so a zero-padding button keeps a correctly sized spinner.
- Upload — event payloads are now uniformly shaped `{file, id, status, progress, error}`.
- Alert — links inside alerts render in the neutral link color instead of being promoted to the primary color.
- Tokens — added `--text-primary-strong` (`primary-700`) for AA-contrast brand text on tinted surfaces; `--text-brand` is now an alias of `--text-primary` (`primary-600`).

### Fixed
- Filter — negative range bounds now decode from the URL and match items correctly.
- Chart — touch page-scroll restored; tap pins the crosshair on line charts.
- Loader — recovers from a transient first-load failure when fetching an injected bundle.
- Date — Hijri dates are built from numeric parts, fixing component and separator ordering.
- Mainnav — dropdown column sizes to its content (`fit-content`).
- Buttons — the indicator on dark/oncolor buttons is brightened to white.
- Progress — `stroke-dashoffset` / `stroke-dasharray` values are correctly unitized.
- Breadcrumb — collapsed-ellipsis loading skeleton renders correctly.
- Tabs — loading-state skeleton spans the full panel width and no longer covers code-block action buttons.
- Featured icon — stays square (`aspect-ratio: 1`) instead of distorting in flex/grid containers.
- Layout — hero stack is vertically centered; main content aligns to the start.
- Layout — `.nds-content-layout` reliably fills the remaining height regardless of how many sections precede it.

### Migrating from v1.1.0

- Replace `nds-main.min.css` and `nds-main.min.js`, plus the loader-injected `nds-delegated.min.js` and `nds-extras.min.js` (the new Slider ships in `nds-delegated`).
- Code-block tabs: if you copied the old tab markup, re-copy it from a doc page — the dead `oneRowContent` class is gone and an overflow `nds-show-more` button now follows the tab `<nav>`. Old markup keeps working; the update just restores the overflow control.
- Upload — if your event handlers read a payload shape other than `{file, id, status, progress, error}`, update them. The declarative `data-*` API is unchanged.

## [1.1.0] - 2026-06-13

### Changed
- Performance — major pass across the loader, head, and components: inlined critical CSS with asynchronous asset loading, lower init-time blocking, and off-screen sections skip rendering. See the [Document Head page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/head.html).
- JavaScript restructured into three bundles — `nds-main.min.js` plus loader-injected `nds-delegated.min.js` and `nds-extras.min.js`. Public API (`NDS.X.method()`) unchanged. See migration.

### Added
- Theming — easily re-brand the template for general (non-DGA) use: predefined + event themes, dark mode, and custom brand palettes. See the [Themes doc page](https://mazin-musleh.github.io/NDS-vanilla/components/themes.html).
- Export — `NDS.Export` for CSV / Excel / PDF download.
- Templates — Social Media and KPIs (DGA).

### Migrating from v1.0.5

- Replace `nds-main.min.css` and `nds-main.min.js`, and ship the two new bundles `nds-delegated.min.js` and `nds-extras.min.js` alongside `nds-main.min.js` — the loader injects them at runtime; without them, deferred components won't load.
- If a component no longer appears, remove its `hidden` attribute — the show/hide system changed.

## [1.0.5] - 2026-05-16

### Added
- Accessibility — new optional site-wide Accessibility Panel: presets, typography tuning (text size, spacing, line-height, font), high-contrast mode, reduced-animations, and dyslexia-friendly fonts (Maqroo, OpenDyslexic). Bilingual (English/Arabic). Ships as a separate `nds-accessibility.min.js` bundle — see the [Accessibility doc page](https://mazin-musleh.github.io/NDS-vanilla/components/accessibility.html).

### Fixed
- Button — long labels grow instead of clipping.
- Link — long links wrap instead of overflowing their container.
- Grid — only the default gap halves at the tablet breakpoint; custom gaps keep their value.
- Scroll-more — vertical show-more button height clamps to its content.

### Changed
- Performance — broad pass across the loader and components: components cold-init (register cheaply, defer measurement until shown), a smaller eager-init burst, shared observers in swiper, cached DOM lookups and delegated hover in mainnav, a debounced resize bus, and deferred topbar widget calls. Lower init-time total blocking time — pages now score 100 for Performance on Google PageSpeed Insights. No markup changes.

### Migrating from v1.0.4

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.5 versions.

## [1.0.4] - 2026-05-04

### Fixed
- Mainnav — hamburger toggler and Persistent Action Buttons now appear correctly on mobile when the page server-renders with `body class="nds-minimal"`. The init was returning early because the body class already matched, leaving `.nds-nav-minimal[hidden]` untoggled.
- Drawer — fit-mode columns now share row space via `flex: 1` instead of collapsing under `height: 100%`.
- Drawer doc — show-more buttons in the drawer doc page now match scroll-more's canonical chrome (correct class list, `type`, `aria-label`, inline CSS-mask icon) so consumers who copy from the docs no longer get an HGI font icon that flashes before font-load.
- Scroll-more — vertical show-more height clamps to its content instead of stretching.

### Changed
- Language switcher — JS module replaced by a tiny inline `<script>` next to the toggle button in the navigation. The previous module flipped direction only and never translated content, which made it misleading. The demo toggle still flips `<html lang/dir>` in place.
- Theme switcher — activated by the loader only when a `[data-theme-toggle]` element exists. Toggle-less pages skip the global click/change listeners entirely. Public API (`NDS.Theme.set/get/toggle`) unchanged.
- Button indicator — bottom and vertical bars on `.nds-indicator` buttons now scale their inset margins with button size instead of a fixed `var(--spacing-md)`, so the indicator looks proportional on small and large buttons alike.

### Migrating from v1.0.3

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.4 versions.

## [1.0.3] - 2026-05-03

### Fixed
- Section — variant/layout demo togglers in the docs were targeting the wrong element due to a broken descendant selector; togglers now hit the demo section.

### Changed
- Footer — restructured for DGA compliance. See the [Footer doc page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/footer.html) for the current markup and class names.
- Section — when `.nds-section-image` precedes `.nds-section-head`, the head now stacks as a column with the image flush below; previously had a margin gap.

### Migrating from v1.0.2

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.3 versions, then re-copy your footer markup from the [Footer doc page](https://mazin-musleh.github.io/NDS-vanilla/ui-shell/footer.html) — the old footer structure is no longer supported.

## [1.0.2] - 2026-05-02

### Added
- Metric — new card+chart composite component for KPI tiles.
- Chart — `spotlight`, `padding`, and `direction` options; x-axis labels auto-rotate and decimate when crowded; line charts get a touch-friendly snap crosshair.
- Fonts — IBM Plex Sans Latin1 faces (Regular / Medium / SemiBold / Bold) ship locally so each weight renders truly instead of being synthesized.
- Icons — `trade-up`, `arrow-up-02`, and `arrow-down-02` selectable on the inline icon set.

### Fixed
- Scroll-more — divider always renders; flex children no longer jitter in width on re-bind.
- Components no longer leak listeners on teardown or after being moved into a portal — chart, dropmenu, tooltip, and mainnav release cleanly.
- Lang-switcher — direction toggle reflects live `dir` / `lang` attribute changes.
- Mainnav — drawer and open dropdowns close when a modal opens; `.nds-fit` dropdowns stay clamped inside the viewport on narrow screens.
- Topbar — no flash of the Saudi flag SVG and digital-stamp tab on load; both stay hidden until the loader reveals them.
- Tables, pagination, and console — icon-only sort buttons expose accessible labels.
- Dark theme — `--text-oncolor-primary` corrected for proper contrast.

### Changed
- Buttons — size math reworked; pixel sizes shift slightly.
- Hero swiper — navigation rebuilt: arrow buttons and pagination now group under `.nds-swiper-navigation` (with arrows nested in `.nds-swiper-buttons`); `.nds-swiper-button-prev` / `.nds-swiper-button-next` classes are gone — see migration.
- Hero — slider preloads only on home pages (was preloading on every page); first hero image and FOUC scripts reorder for faster perceived paint elsewhere.
- `NDS.scrollLock` is now a public helper for components that need to lock body scroll.
- Scrollbars — light and dark themes use a unified scrollbar color.

### Migrating from v1.0.1

**Required step**

Replace your bundled `nds-main.min.css` and `nds-main.min.js` (and the matching `assets/fonts/` IBM Plex Sans files, if you self-host) with the v1.0.2 versions.

**Markup updates required in your pages**

- **Hero swiper navigation** — wrap your existing arrow buttons and pagination in two new containers, and drop the `.nds-swiper-button-prev` / `.nds-swiper-button-next` classes. The arrow `<button>` elements keep the same `nds-btn nds-subtle nds-icon-only nds-oncolor` styling classes plus `nds-prev` / `nds-next`; only the surrounding structure and the redundant `swiper-button-*` classes change.

  **Before (v1.0.1):**
  ```html
  <button class="nds-btn nds-subtle nds-oncolor nds-icon-only nds-prev nds-swiper-button-prev"
          aria-label="Previous slide" hidden></button>
  <button class="nds-btn nds-subtle nds-oncolor nds-icon-only nds-next nds-swiper-button-next"
          aria-label="Next slide" hidden></button>
  <div class="nds-swiper-pagination" hidden></div>
  ```

  **After (v1.0.2):**
  ```html
  <div class="nds-swiper-navigation">
      <div class="nds-swiper-buttons">
          <button class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-prev"
                  aria-label="Previous slide" hidden></button>
          <button class="nds-btn nds-subtle nds-icon-only nds-oncolor nds-next"
                  aria-label="Next slide" hidden></button>
      </div>
      <div class="nds-swiper-pagination" hidden></div>
  </div>
  ```

  The slide structure (`.nds-swiper-wrapper > .nds-swiper-slide`) is unchanged.

**Visual shifts to verify (no markup change needed)**

- **Button pixel sizes** shift slightly with the new size math.
- **Hero slider arrow buttons** sit at a different position after the markup update — the swiper-wide arrow rebuild changed how arrows position relative to the slider edges.
- **Card text alignment** — `.nds-card-text` pins to `flex-start`; cards whose copy was centering by inheritance will now left-align.
- **Inline `<i>` icons** align to `text-bottom` so they sit on the text baseline.

## [1.0.1] - 2026-04-28

### Added
- `--typo-text-2xs-FS` / `--typo-text-2xs-LH` — a new smallest step on the type scale; badges and other tight UI chrome migrate to it.
- Filter — "All" radio is auto-prepended so radio filters can be cleared.
- Link — external-link badge is now skipped on icon-only / image-only anchors.

### Fixed
- Service template — rating dropmenu's label + stars now stack (previously rendered on one line — a layout bug in the rate-this-service prompt).
- Link `:visited` / `:focus` colors apply everywhere. Previously gated to `.nds-content-section` only; footer, alert, breadcrumb, side-nav etc. now color on those states.
- `.nds-oncolor` is honored inside content sections (was silently overridden by the primary fallback).
- `.nds-accordion.nds-card` honors the accordion's gap and full width. Previously the card's `var(--_card-gap)` (3xl) leaked over the accordion's `gap: 0`, and the card's 360px default `max-width` capped the accordion. Now spans full width with no gap between items.
- Forms — Chrome a11y warnings silenced: autocomplete hints and field names added.
- Forms — autofill no longer bleeds through inputs, and the focus ring no longer collides with the autofill state.
- Forms — voice-input button no longer stacks click listeners when re-initialized.
- Components reparented to portals preserve state across the move (impacts modals, dropmenus, tooltips, mainnav).
- Footer — standalone `<hr>` divider is visible on the green variant.
- Services-list — Details button points at `service-template` and the trailing-slash 404 is gone.

### Changed
- Hero slider only preloads on the home layout (was preloading on every page).
- First hero image preloads and FOUC-prevention scripts have been reordered for faster perceived paint.
- Inline `<i>` icons align to `text-bottom` so they sit cleanly on the text baseline.
- Footer copyright is bolder (`font-weight: 600`) and reads on the green background without a custom dim color.
- Footer — "Template developed by..." author credit removed from rendering.

### Migrating from v1.0.0

**Required step**

Replace your bundled `nds-main.min.css` and `nds-main.min.js` with the v1.0.1 versions.

**Markup updates required in your pages:** None.

## [1.0.0] - 2026-04-26

### Added
- Initial public release.
- 70+ components across UI, Forms, UI Shell, Plugins, Data, Layout, and Utilities categories.
- RTL/LTR native support via CSS Logical Properties.
- 3-tier design token system (color, semantic, component).
- Smart component loader with on-demand initialization.
- Six example pages: Service, Console, Registration, Academic Profile, Services List, 404.
- Jekyll-based development environment with custom Ruby plugins for JS bundling, HTML compression, and baseurl resolution.
- GitHub Actions workflow for Pages deployment.
- Five project-specific Claude Code skills for contributors.
- MIT license, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY policies.

[Unreleased]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.9.0...HEAD
[1.9.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.8.1...v1.9.0
[1.8.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.7.2...v1.8.0
[1.7.2]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.5...v1.1.0
[1.0.5]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/mazin-musleh/NDS-vanilla/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/mazin-musleh/NDS-vanilla/releases/tag/v1.0.0
