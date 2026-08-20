# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.8.1] - 2026-08-18

### Added
- **Ticker** — a single-line status strip for dashboards. It takes a list of items and shows one at a time.
- **`nds-quiet` modifier on Ribbon** — a ribbon that keeps its layout but drops its background fill.

### Changed
- **Splitview keeps its divider position across a reload** — the position is stored per view id. A view with no id behaves as before.
- **Waymark markers read their label from the step, not from the marker** — a marker with its own label still wins.

### Fixed
- **Chiplist no longer drops the last chip on a narrow screen** — the overflow count claimed one chip too many.
- **Gauge paints its track in dark mode** — the track shared a token with the page background, so it disappeared.

### Migrating from v1.8.0
- Replace the runtime bundles.
- **Ribbon's `nds-flat` modifier is now `nds-quiet`.** The old class still renders, and it will be removed in 2.0.0. Rename it where you use it.
- **Splitview writes to `sessionStorage`.** If your page blocks storage, the divider falls back to its authored position and nothing else changes.

## [1.8.0] - 2026-08-16

### Added
- **Splitview** — a two-pane layout with a divider the reader can drag. Both panes scroll on their own.
- **`data-ticker-pause` on Ticker** — holds the current item while a pointer rests on the strip.

### Changed
- **Waymark counts its steps from the markup** — the `data-waymark-total` attribute is no longer read.
- **Chiplist truncates a long chip label instead of wrapping it** — the full label stays in the title attribute.

### Fixed
- **Ribbon returns focus to the control that opened it** — focus landed on the page body.
- **Gauge reports a value above its maximum as the maximum** — it used to render past the end of the track.

### Migrating from v1.7.1
- Replace the runtime bundles.
- **`data-waymark-total` is ignored.** Remove it. A waymark with a total that disagreed with its markup now counts the markup.
- **Chiplist labels need no `title` attribute of your own.** One you set is kept; one you leave out is written for you.
