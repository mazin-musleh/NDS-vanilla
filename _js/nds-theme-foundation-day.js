// Foundation Day theme behaviour — injects the event hero slide into the page's
// hero swiper while the theme is active, and removes it on teardown. Loaded on
// demand by NDS.Brand (ensureThemeJS) only when brand = foundation-day; torn down
// when switching away. Structure mirrors _includes/hero-main.html (the canonical
// NDS hero swiper) so NDS.Swiper.create() initializes it.
(function () {
    'use strict';

    // ── Editable event content ───────────────────────────────────────────────
    // Drop the referenced assets into assets/events/foundation_day/.
    // Strings can be a plain value or a { ar, en } map (picked by <html lang>).
    var HERO = {
        title: { ar: 'يوم بدينا', en: 'Our Story' },
        description: { ar: 'تأسيس نعتز به، ومستقبل نصنعه', en: 'A founding we cherish, a future we shape' },
        image: 'Hero_bg.webp',            // hero photo (under assets/events/foundation_day/); '' = brown bg + heroContentBg block
        cta: {
            url: 'https://www.foundingday.sa/',
            label: { ar: 'منصة يوم التأسيس', en: 'Foundation Day Platform' },
            icon: 'founding-icon.svg',    // add this file to assets/events/foundation_day/ (or set '' to omit)
        },
    };
    // ─────────────────────────────────────────────────────────────────────────

    // Page language (ar | en); resolve a string or a { ar, en } field to text.
    var LANG = (document.documentElement.lang || 'en').slice(0, 2);
    function t(v) {
        if (v && typeof v === 'object') return v[LANG] || v.en || v.ar || '';
        return v || '';
    }

    var SWIPER_SEL = '.nds-hero-section .nds-swiper.nds-hero';
    var SLIDE_CLASS = 'nds-foundingDay';

    // This script ships beside its assets (…/assets/events/foundation_day/), so its
    // own folder is the asset base. Captured at load — currentScript is null inside
    // the later hook calls.
    var BASE = (function () {
        var s = document.currentScript ||
            document.querySelector('script[src*="nds-theme-foundation-day"]');
        return s && s.src ? s.src.slice(0, s.src.lastIndexOf('/') + 1) : '';
    })();

    // Static, theme-controlled markup (no user input) → safe innerHTML. Under a
    // require-trusted-types-for:'script' CSP, swap to DOM construction.
    function buildSlide() {
        var base = BASE;
        var img = HERO.image
            ? '<picture><img src="' + base + HERO.image + '" class="nds-hero-image" alt="" ' +
              'style="width:100%;height:100%;object-fit:cover;display:block;" fetchpriority="high"></picture>'
            : '';
        var desc = t(HERO.description) ? '<p class="nds-section-description">' + t(HERO.description) + '</p>' : '';
        var cta = HERO.cta
            ? '<div class="nds-section-action">' +
                '<a class="nds-btn nds-primary nds-oncolor" href="' + HERO.cta.url + '" target="_blank" rel="noopener noreferrer">' +
                  (HERO.cta.icon ? '<img src="' + base + HERO.cta.icon + '" class="nds-icon" width="24" height="24" alt="">' : '') +
                  '<span class="nds-label">' + t(HERO.cta.label) + '</span>' +
                '</a>' +
              '</div>'
            : '';

        var slide = document.createElement('div');
        slide.className = 'nds-swiper-slide nds-content-wrapper ' + SLIDE_CLASS;
        slide.innerHTML =
            '<div class="nds-hero-image-wrapper nds-full-width" style="--overlay:0;position:absolute;inset:0;">' + img + '</div>' +
            '<div class="nds-section-body nds-full-width" style="position:relative;z-index:3;">' +
              '<div class="nds-block nds-content-wrapper"><div>' +
                '<h1 class="nds-section-title">' + t(HERO.title) + '</h1>' +
                desc + cta +
              '</div></div>' +
            '</div>';
        return slide;
    }

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

    function inject() {
        var swiper = document.querySelector(SWIPER_SEL);
        if (!swiper) return;
        var wrapper = swiper.querySelector('.nds-swiper-wrapper');
        if (!wrapper || wrapper.querySelector('.' + SLIDE_CLASS)) return;   // idempotent
        wrapper.insertBefore(buildSlide(), wrapper.firstChild);
        var total = parseInt(swiper.style.getPropertyValue('--total'), 10) || (wrapper.children.length - 1);
        swiper.style.setProperty('--total', String(total + 1));
        // The loader inits Swiper very early, so this async-loaded script usually runs
        // AFTER init → re-init to pick up the new slide. But if it won the race and ran
        // first, leave it: Swiper.init will include the new first slide on its own pass
        // (no re-init, no goTo, no flash).
        if (swiper.hasAttribute('data-nds-swiper-initialized')) reinit(swiper);
    }

    function teardown() {
        var swiper = document.querySelector(SWIPER_SEL);
        if (!swiper) return;
        var slide = swiper.querySelector('.nds-swiper-slide.' + SLIDE_CLASS);
        if (!slide) return;
        slide.remove();
        var total = parseInt(swiper.style.getPropertyValue('--total'), 10) || (swiper.querySelectorAll('.nds-swiper-slide').length + 1);
        swiper.style.setProperty('--total', String(Math.max(1, total - 1)));
        if (swiper.hasAttribute('data-nds-swiper-initialized')) reinit(swiper);
    }

    // Register hooks so NDS.Brand can re-inject on re-activation (the script only
    // auto-injects once, below) and remove the slide on switch-away.
    window.__NDS_THEME_HOOKS = window.__NDS_THEME_HOOKS || {};
    window.__NDS_THEME_HOOKS['foundation-day'] = { inject: inject, teardown: teardown };

    inject();
})();
