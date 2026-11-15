# NDS IQ motion infographic — plan

Status (2026-11-15): proposed, not started. Owner answers pending (see Open).

## Why

Get Started explains the NDS IQ flow in text. A short 2D animation shows the same flow at a glance, on the guide and as a shareable video.

## Storyboard (one loop, 30–40 s)

1. **One prompt.** The dev pastes the setup prompt into the agent chat.
2. **Install.** `NDS-IQ.md` lands at the project root, the anchor goes into `CLAUDE.md` / `AGENTS.md`, the template unpacks into `.nds/`.
3. **Plan.** The agent opens `NDS-INDEX.md`, writes `NDS-PLAN.md`, asks its questions once (including `NDS_ASSETS`).
4. **Build.** Markup comes from the doc pages; a "path from memory" is crossed out (red lines).
5. **Verify.** A browser frame runs the audit; checks pass before any claim.
6. **Upgrade.** A new `NDS-IQ.md` replaces the old one; anchor and paths stay.

Optional second loop for "How It Is Built" (`guides/integration-quality.md`): real failure → scenario → fail, fix, pass → `IQv` tag.

## Approach

- **Inline SVG + CSS keyframes.** No Lottie, video player or library. Uses NDS tokens, follows light/dark.
- **RTL default, mirrored for LTR.** Labels are text, not baked into shapes.
- **Reduced motion:** static 6-step diagram. Pause control and a text alternative.
- **Deterministic timeline:** `?t=<ms>` freezes any frame, so the video export is exact.

## Steps

1. Prototype as a private Artifact (one language first). Owner reviews timing and look.
2. Revision rounds (plan 2–4), timing and wording only once the storyboard is approved.
3. Video export: `scripts/render-motion.mjs` (playwright-core, already installed) captures PNG frames at 30 fps, 1920×1080 and 1080×1080 → ffmpeg → MP4 (H.264), WebM, optional GIF. Output in `tmp/`. Render AR and EN. Silent; add an audio track with ffmpeg if supplied.
4. Optional: port into `guides/get-started.md` above the setup prompt, as an include (read `_includes/includes.md`, `_sass/sass.md`, `EDITORIAL.md` first).

## Prerequisites

- **ffmpeg is not installed.** `winget install Gyan.FFmpeg`. Fallback for a quick draft: Playwright `recordVideo` (WebM, may drop frames on this machine).

## Token estimate

| Phase | Read | Write |
|---|---|---|
| Prototype | ~25–35k | ~25–40k |
| Each revision | ~5–10k | ~3–10k |
| Video export | ~5k | ~3–5k |
| Port to guide | ~20–30k | ~8–12k |

Prototype + video: ~60–100k. Everything: ~100–160k (plus cached context re-reads). Cheapest useful path, one language + MP4, no port: ~50–70k. Hand the export script to a `sonnet` subagent.

## Open (owner)

- Audience: devs only, or add the "how it's built" loop?
- Language: Arabic first, English first, or both?
- Style: NDS UI chrome (cards, files, terminal) or more illustrative?
- Formats: 16:9, square, or both?
