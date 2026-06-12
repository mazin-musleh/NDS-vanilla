// Hajj event theme PACK — Hayyakom welcome skin. Self-contained entry point,
// modelled on the Foundation Day pack but KEEPING THE DGA PALETTE: it only
// injects its stylesheet + marker token + a hero slide (Saudi-font title, a
// top-start Hayyakom logo, a direction-aware background). Colours stay DGA.
//
// Two ways to activate, one code path:
//   1. Downstream one-tag: a site drops a single <script src=".../nds-theme-
//      hajj.min.js"> tag. Placed synchronously in <head>, the stylesheet it
//      injects is render-blocking → themed first paint, zero FOUC (with `defer`
//      it still works, with a brief default-theme flash). The pack injects its
//      own <link>, stamps the marker token on <html data-theme>, and injects the
//      event hero slide. Deleting the tag ends the event cleanly.
//   2. Showcase switcher: _js/nds-theme.js loads this file on demand and drives
//      it via the hooks below; its own link/token writes overlap ours idempotently.
//
// Hooks contract: window.__NDS_THEME_HOOKS[THEME] = { inject, teardown }, both
// idempotent and self-contained — inject = link + token + slide, teardown removes
// all three. Token writes are attribute-only; persistence stays the switcher's job.
//
// Per-deployment content overrides via data-* attributes on the script tag
// (all optional; bare filenames resolve against this script's own folder):
//   data-title-ar / data-title-en
//   data-description-ar / data-description-en
//   data-logo             ('' = omit the logo)
//   data-cta-url          https or path-relative only ('' = no CTA)
//   data-cta-label-ar / data-cta-label-en
//   data-cta-icon         ('' = omit)
(function () {
    'use strict';

    var THEME = 'hajj';
    var LINK_ID = 'nds-theme-stylesheet';   // shared slot: nds-theme.js LINK_ID + head.html brand path
    var SWIPER_SEL = '.nds-hero-section .nds-swiper.nds-hero';
    var SLIDE_CLASS = 'nds-hajj';

    // This script ships beside its assets (…/assets/events/Hajj/), so its own
    // folder is the asset base. Captured at load — currentScript is null inside
    // the later hook calls.
    var SCRIPT = document.currentScript ||
        document.querySelector('script[src*="nds-theme-hajj"]');
    var BASE = SCRIPT && SCRIPT.src ? SCRIPT.src.slice(0, SCRIPT.src.lastIndexOf('/') + 1) : '';
    var CSS_HREF = BASE + 'nds-theme-' + THEME + '.min.css';
    var DATA = SCRIPT ? SCRIPT.dataset : {};

    function pick(key, fallback) {
        return DATA[key] !== undefined ? DATA[key] : fallback;
    }
    // Reject any explicit scheme except http(s) — config lands in src/href attributes.
    function safeUrl(v) {
        return /^[a-z][a-z0-9+.-]*:/i.test(v) ? /^https?:/i.test(v) : true;
    }
    // Bare filename → this pack's folder; absolute URL / rooted path → verbatim.
    function assetUrl(v) {
        if (!v || !safeUrl(v)) return '';
        return (/^https?:/i.test(v) || v.charAt(0) === '/' || v.charAt(0) === '.') ? v : BASE + v;
    }

    // No CTA by default — a downstream site can opt in via data-cta-url.
    var ctaUrl = pick('ctaUrl', '');
    if (!safeUrl(ctaUrl)) {
        console.warn('NDS Hajj: data-cta-url rejected (https or path-relative only)');
        ctaUrl = '';
    }

    // ── Event content (defaults; overridden by the data-* attributes above) ──
    // Strings can be a plain value or a { ar, en } map (picked by <html lang>).
    var HERO = {
        title: { ar: pick('titleAr', 'خلق رحلة روحانية خالدة'), en: pick('titleEn', 'Creating a Lasting Spiritual Journey') },
        description: {
            ar: pick('descriptionAr', 'رؤيتنا خلق رحلة روحانية خالدة تفوق تطلعات ضيوف الرحمن'),
            en: pick('descriptionEn', 'Our vision is to create a lasting spiritual journey that exceeds the expectations of the Guests of the Most Merciful.'),
        },
        logo: pick('logo', 'hayyakom.svg'),
        logoAlt: { ar: 'حياكم', en: 'Hayyakom' },
        cta: ctaUrl ? {
            url: ctaUrl,
            label: { ar: pick('ctaLabelAr', 'منصة نسك'), en: pick('ctaLabelEn', 'Nusuk Platform') },
            icon: pick('ctaIcon', ''),
        } : null,
    };
    // ─────────────────────────────────────────────────────────────────────────

    // Page language (ar | en); resolve a string or a { ar, en } field to text.
    var LANG = (document.documentElement.lang || 'en').slice(0, 2);
    function t(v) {
        if (v && typeof v === 'object') return v[LANG] || v.en || v.ar || '';
        return v || '';
    }
    // Content is externally configurable (data-*) → escape everything interpolated.
    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function buildSlide() {
        var logoUrl = assetUrl(HERO.logo);
        var logo = logoUrl
            ? '<img src="' + esc(logoUrl) + '" class="nds-hajj-logo" alt="' + esc(t(HERO.logoAlt)) + '">'
            : '';
        var desc = t(HERO.description) ? '<p class="nds-section-description">' + esc(t(HERO.description)) + '</p>' : '';
        var iconUrl = HERO.cta ? assetUrl(HERO.cta.icon) : '';
        var cta = HERO.cta
            ? '<div class="nds-section-action">' +
                '<a class="nds-btn nds-primary nds-oncolor nds-lg" href="' + esc(HERO.cta.url) + '" target="_blank" rel="noopener noreferrer">' +
                  (iconUrl ? '<img src="' + esc(iconUrl) + '" class="nds-icon" width="24" height="24" alt="">' : '') +
                  '<span class="nds-label">' + esc(t(HERO.cta.label)) + '</span>' +
                '</a>' +
              '</div>'
            : '';

        var slide = document.createElement('div');
        slide.className = 'nds-swiper-slide nds-content-wrapper ' + SLIDE_CLASS;
        slide.innerHTML =
            '<div class="nds-section-body">' +
              logo +
              '<h1 class="nds-section-title">' + esc(t(HERO.title)) + '</h1>' +
              desc + cta +
            '</div>';
        return slide;
    }

    // ── Stylesheet link (shared #nds-theme-stylesheet slot) ─────────────────
    // Create only if absent: in the switcher/brand paths the link already exists
    // (ensureStylesheet / head.html) — leave its href (incl. ?ver=) alone.
    function ensureLink() {
        if (document.getElementById(LINK_ID)) return;
        if (document.readyState === 'loading') {
            // Parser-inserted = render-blocking in every browser; script-created
            // links are NOT, so appendChild alone flashes the default theme.
            document.write('<link id="' + LINK_ID + '" rel="stylesheet" href="' + CSS_HREF + '">');
            if (document.getElementById(LINK_ID)) return;
        }
        var l = document.createElement('link');
        l.rel = 'stylesheet'; l.id = LINK_ID; l.href = CSS_HREF;
        l.blocking = 'render';
        document.head.appendChild(l);
    }
    function removeLink() {
        var l = document.getElementById(LINK_ID);
        if (l) l.remove();
    }

    // ── Marker token on <html data-theme> (attribute-only, no storage) ──────
    function tokens() {
        return (document.documentElement.getAttribute('data-theme') || '').split(/\s+/).filter(Boolean);
    }
    function writeTokens(toks) {
        if (toks.length) document.documentElement.setAttribute('data-theme', toks.join(' '));
        else document.documentElement.removeAttribute('data-theme');
    }
    function addToken() {
        var toks = tokens();
        if (toks.indexOf(THEME) === -1) { toks.push(THEME); writeTokens(toks); }
    }
    function removeToken() {
        writeTokens(tokens().filter(function (x) { return x !== THEME; }));
    }

    // ── Hero slide ──────────────────────────────────────────────────────────
    function reinit(swiper) {
        if (swiper._ndsSwiper) swiper._ndsSwiper.destroy();
        if (!(window.NDS && NDS.Swiper)) return;
        var inst = NDS.Swiper.create(swiper);
        // A fresh instance detects its index from the re-used DOM's scroll position,
        // so it won't auto-land on the new first slide — move to it once layout settles.
        if (inst && typeof inst.goTo === 'function') {
            requestAnimationFrame(function () { inst.goTo(0); });
        }
    }

    function injectSlide() {
        var swiper = document.querySelector(SWIPER_SEL);
        if (!swiper) return;
        var wrapper = swiper.querySelector('.nds-swiper-wrapper');
        if (!wrapper || wrapper.querySelector('.' + SLIDE_CLASS)) return;   // idempotent
        wrapper.insertBefore(buildSlide(), wrapper.firstChild);
        var total = parseInt(swiper.style.getPropertyValue('--total'), 10) || (wrapper.children.length - 1);
        swiper.style.setProperty('--total', String(total + 1));
        // Swiper init lives in the delegated bundle, so a sync-in-head pack always
        // wins the race and init includes the new first slide on its own pass (no
        // re-init, no goTo, no flash). But when the switcher loads this file
        // mid-session Swiper is already live → re-init to pick up the slide.
        if (swiper.hasAttribute('data-nds-swiper-initialized')) reinit(swiper);
    }

    // Sync-in-head the body doesn't exist yet at execute time: watch the parser and
    // inject the moment the hero wrapper enters the DOM (before first paint, before
    // delegated Swiper init). DOMContentLoaded is the no-hero/missed-race fallback;
    // it no-ops if the observer was already cancelled (injected or torn down).
    var _observer = null;
    function cancelPending() {
        if (_observer) { _observer.disconnect(); _observer = null; }
    }
    function scheduleSlide() {
        if (document.readyState !== 'loading') { injectSlide(); return; }
        if (_observer) return;
        _observer = new MutationObserver(function () {
            if (document.querySelector(SWIPER_SEL + ' .nds-swiper-wrapper')) {
                cancelPending();
                injectSlide();
            }
        });
        _observer.observe(document.documentElement, { childList: true, subtree: true });
        document.addEventListener('DOMContentLoaded', function () {
            if (!_observer) return;
            cancelPending();
            injectSlide();
        }, { once: true });
    }

    function removeSlide() {
        var swiper = document.querySelector(SWIPER_SEL);
        if (!swiper) return;
        var slide = swiper.querySelector('.nds-swiper-slide.' + SLIDE_CLASS);
        if (!slide) return;
        slide.remove();
        var total = parseInt(swiper.style.getPropertyValue('--total'), 10) || (swiper.querySelectorAll('.nds-swiper-slide').length + 1);
        swiper.style.setProperty('--total', String(Math.max(1, total - 1)));
        if (swiper.hasAttribute('data-nds-swiper-initialized')) reinit(swiper);
    }

    // ── Hooks (own link + token + slide) + self-activation ──────────────────
    function inject() {
        ensureLink();
        addToken();
        scheduleSlide();
    }
    function teardown() {
        cancelPending();
        removeSlide();
        removeToken();
        removeLink();
    }

    window.__NDS_THEME_HOOKS = window.__NDS_THEME_HOOKS || {};
    window.__NDS_THEME_HOOKS[THEME] = { inject: inject, teardown: teardown };

    // undefined → no switcher orchestration on this page (downstream one-tag): self-activate.
    // === THEME → the switcher activated us (first-load fetch race resolved): activate.
    // anything else ('' / another theme) → user switched away mid-fetch: register hooks only.
    var active = window.__NDS_THEME_ACTIVE;
    if (active === undefined || active === THEME) {
        window.__NDS_THEME_ACTIVE = THEME;
        inject();
    }
})();
