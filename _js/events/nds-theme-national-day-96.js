// National Day 96 event theme PACK — self-contained entry point, modelled on the
// Hajj pack. KEEPS THE DGA PALETTE and the STANDARD HERO SLIDE: it injects its
// stylesheet (section bars, corner vector, footer bar) + marker token + a hero
// slide that is the normal slide markup with the event photo as its background +
// the event mark in the footer's own logo strip. No component-specific structure
// or styling anywhere — it reuses what the page already ships.
//
// Two ways to activate, one code path:
//   1. Downstream one-tag: a site drops a single <script src=".../nds-theme-
//      national-day-96.min.js"> tag. Placed synchronously in <head>, the
//      stylesheet it injects is render-blocking → themed first paint, zero FOUC
//      (with `defer` it still works, with a brief default-theme flash). The pack
//      injects its own <link>, stamps the marker token on <html data-theme>, and
//      injects the event hero slide. Deleting the tag ends the event cleanly.
//   2. Showcase switcher: _js/nds-theme.js loads this file on demand and drives
//      it via the hooks below; its own link/token writes overlap ours idempotently.
//
// Hooks contract: window.__NDS_THEME_HOOKS[THEME] = { inject, teardown }, both
// idempotent and self-contained — inject = link + token + slide, teardown removes
// all three. Token writes are attribute-only; persistence stays the switcher's job.
//
// Two hero types (data-type on the script tag):
//   2 (default) the official six-slide campaign hero on the swiper's deck mode —
//               the site's own slides step aside while the pack is on
//   1           one plain slide, the standard hero markup with the event photo
//
// Per-deployment content overrides via data-* attributes on the script tag
// (all optional; bare filenames resolve against this script's own folder):
//   data-type             2 | 1 (above)
//   data-title-ar / data-title-en                 type 1 only
//   data-description-ar / data-description-en     type 1 only
//   data-image            slide background photo  type 1 only
//   data-logo             event mark in the footer logo strip ('' = omit it)
//   data-cta-url          https or path-relative only ('' = no CTA), type 1 only
//   data-cta-label-ar / data-cta-label-en
//   data-cta-icon         ('' = omit)
(function () {
    'use strict';

    var THEME = 'national-day-96';
    // A page can load this file twice (an authored tag plus the switcher's own
    // fetch); the first copy owns the hooks and its data-* config, later copies
    // step aside so the switcher drives that one.
    if (window.__NDS_THEME_HOOKS && window.__NDS_THEME_HOOKS[THEME]) return;
    var LINK_ID = 'nds-theme-stylesheet';   // shared slot: nds-theme.js LINK_ID + head.html brand path
    var SWIPER_SEL = '.nds-hero-section .nds-swiper.nds-hero';
    // Both are injection/teardown hooks only — the stylesheet styles neither.
    var SLIDE_CLASS = 'nds-nationalDay';      // the type 1 slide
    var DECK_SLIDE = 'nds-nd96-slide';         // a type 2 slide
    var LOGO_CLASS = 'nds-nationalDay-logo';

    // This script ships beside its assets (…/docs-assets/events/national_day_96/), so
    // its own folder is the asset base. Captured at load — currentScript is null
    // inside the later hook calls.
    var SCRIPT = document.currentScript ||
        document.querySelector('script[src*="nds-theme-national-day-96"]');
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
        console.warn('NDS NationalDay96: data-cta-url rejected (https or path-relative only)');
        ctaUrl = '';
    }

    // ── Event content (defaults; overridden by the data-* attributes above) ──
    // Strings can be a plain value or a { ar, en } map (picked by <html lang>).
    var HERO = {
        title: { ar: pick('titleAr', 'اليوم الوطني السعودي 96'), en: pick('titleEn', 'Saudi National Day 96') },
        description: {
            ar: pick('descriptionAr', 'نحتفي بمرور 96 عامًا من العز والفخر لوطننا'),
            en: pick('descriptionEn', 'We celebrate 96 years of glory and pride for our nation.'),
        },
        image: pick('image', 'hero_bg.webp'),
        logo: pick('logo', 'national_day_logo.svg'),
        logoAlt: { ar: 'اليوم الوطني السعودي 96', en: 'Saudi National Day 96' },
        cta: ctaUrl ? {
            url: ctaUrl,
            label: { ar: pick('ctaLabelAr', 'اليوم الوطني'), en: pick('ctaLabelEn', 'National Day') },
            icon: pick('ctaIcon', ''),
        } : null,
    };

    // ── Type 2 content — the official campaign set (hrsd.gov.sa, 2026-09-06).
    //    Fixed by design: the words, bodies, cards and colours are the campaign's. ──
    var TYPE = pick('type', '2') === '1' ? 1 : 2;
    var LEAD = { ar: 'عِزّنا', en: 'Our pride in our' };
    var SLIDES = [
        {
            theme: 'heritage',
            card: 'card_heritage.webp',
            word: { ar: 'بأصالتنا', en: 'authenticity' },
            body: {
                ar: 'الأصالة في المجتمع السعودي تعكس ارتباط الناس بجذورهم وتاريخهم، واعتزازهم بموروثهم. فهي تظهر في التمسك بالعادات والتقاليد، واستمرار القيم التي تتوارثها الأجيال.',
                en: 'Authenticity in Saudi society reflects a deep connection to our roots, history, and heritage. It lives on in the customs and traditions we uphold, and in the values passed down from one generation to the next.'
            },
            short: {
                ar: 'الأصالة في المجتمع السعودي تعكس ارتباط الناس بجذورهم واعتزازهم بإرثهم.',
                en: 'Authenticity reflects our deep connection to our roots and pride in our heritage.'
            }
        },
        {
            theme: 'courage',
            card: 'card_courage.webp',
            word: { ar: 'بشجاعتنا', en: 'courage' },
            body: {
                ar: 'لأن الشجاعة في سلمنا وعرفنا قيمة أصيلة، نزع بلا تردد ونجد من استنجدنا، وهي صفة متجذرة فينا منذ القدم وامتدادًا عبر تاريخ هذه البلاد العظيمة، حيث كان أبناء الوطن دائمًا سندًا وعونًا لكل محتاج.',
                en: 'Courage is a deeply rooted value in our character and traditions. We answer the call without hesitation and stand by those in need. Passed down through generations, this spirit has endured throughout the history of our nation, whose people have always been known for their strength, support, and readiness to help others.'
            },
            short: {
                ar: 'الشجاعة في دمنا، نلبي النداء فورًا، ونساند المحتاجين، وهي صفة عريقة في تاريخ وطننا العظيم.',
                en: 'Courage is in our character: we answer the call and stand by those in need.'
            }
        },
        {
            theme: 'ambition',
            card: 'card_ambition.webp',
            word: { ar: 'بهمّتنا', en: 'drive' },
            body: {
                ar: 'الهمة من أبرز الصفات التي تميز الشخصية السعودية، فهي الدافع الذي يحرك الطموح ويقود نحو الإنجاز. وقد أصبحت الهمة جزءًا من ثقافتنا الوطنية، نستمدها من إيماننا بقدراتنا وثقتنا بمستقبلنا.',
                en: 'Drive is one of the defining qualities of the Saudi character. It fuels our ambition and inspires us to achieve more. It is part of our national spirit, strengthened by our belief in our abilities and our confidence in the future.'
            },
            short: {
                ar: 'الهمة من أبرز الصفات التي تميز الشخصية السعودية، فهي الدافع الذي يحرك الطموح ويقود نحو الإنجاز.',
                en: 'Drive defines the Saudi character, fueling our ambition and inspiring achievement.'
            }
        },
        {
            theme: 'generosity',
            card: 'card_generosity.webp',
            word: { ar: 'بجودنا', en: 'generosity' },
            body: {
                ar: 'الجود من أسمى الصفات في الهوية السعودية، ورثها السعوديون أبًا عن جد. الجود ليس فقط في المال، بل في الوقت والجهد والمواقف. في الثقافة السعودية، الجود يعني العطاء من القلب، وفتح الدار قبل السؤال، والفرح بالعطاء. هو طبع متأصل يظهر في الدلة التي لا تبرد، والباب المفتوح، والمبخرة التي لا تنطفئ.',
                en: 'Generosity is one of the most cherished qualities of Saudi identity, passed down through generations. It extends beyond material giving to our time, effort, and support for others. It means giving wholeheartedly, opening our homes before being asked, and finding joy in giving. It is reflected in the coffee pot that stays warm, the open door, and the incense that continues to burn.'
            },
            short: {
                ar: 'الجود صفة سامية في الهوية السعودية، ورثها السعوديون. تعني العطاء من القلب وفتح الدار.',
                en: 'Generosity is a cherished Saudi value: giving wholeheartedly and welcoming others with an open door.'
            }
        },
        {
            theme: 'kindness',
            card: 'card_kindness.webp',
            word: { ar: 'بكرمنا', en: 'hospitality' },
            body: {
                ar: 'الكرم من القيم الأساسية في ثقافتنا، ويعد من أبرز سمات الهوية السعودية، ويتجاوز مجرد حسن الضيافة، ليشمل حفاوة الاستقبال والمبادرة بالمساعدة. يعد الكرم رمزًا للأصالة والانتماء، ويربى عليه السعوديون منذ الصغر، مما يجعله جزءًا طبيعيًا من الحياة اليومية والعلاقات الاجتماعية.',
                en: 'Hospitality is a cornerstone of our culture and a defining part of Saudi identity. It goes beyond welcoming guests to include warmth, generosity, and a willingness to help. Saudis grow up with these values, making hospitality a natural part of everyday life and the way we connect with others.'
            },
            short: {
                ar: 'الكرم جزء من هويتنا السعودية يظهر في الضيافة والمساعدة.',
                en: 'Hospitality is part of our Saudi identity, reflected in the warmth of our welcome and our willingness to help.'
            }
        },
        {
            theme: 'vision',
            card: 'card_vision.webp',
            word: { ar: 'برؤيتنا', en: 'vision' },
            body: {
                ar: 'رؤية السعودية 2030، التي أطلقها ولي العهد الأمير محمد بن سلمان، تهدف لبناء مستقبل مزدهر ومستدام. تؤمن الرؤية بقدرتنا على التحول والتقدم وصناعة مستقبل أفضل لوطننا مع الحفاظ على هويتنا وقيمنا، مما يعكس وعيًا عميقًا وطموحًا لصناعة الغد.',
                en: 'Saudi Vision 2030, launched by Crown Prince Mohammed bin Salman, charts a path toward a prosperous and sustainable future. It reflects our ability to transform, progress, and shape a better future for our nation while preserving our identity and values.'
            },
            short: {
                ar: 'رؤية السعودية 2030 التي أطلقها ولي العهد تهدف لبناء مستقبل مزدهر ومستدام يعكس طموحنا وهويتنا.',
                en: 'Saudi Vision 2030 charts a path toward a prosperous, sustainable future rooted in our ambition and identity.'
            }
        }
    ];
    var TYPE_MS = 120;    // typewriter pace per letter, then
    var HOLD_MS = 5000;   // time to read the body before the next slide
    var SETTLE_MS = 600;  // the cards' slide (the swiper's deck motion); typing waits for it
    var WARM_MS = 200;    // compositor pre-warm before an auto move (see prewarm)
    // ─────────────────────────────────────────────────────────────────────────

    // Text follows the page direction, not its lang: RTL reads the Arabic set,
    // LTR the English one. NDS.isRTL when core is already here (switcher path);
    // its own definition otherwise — this runs in <head>, before the bundles.
    // Read live: the direction can flip in place (the docs' language toggle).
    function lang() {
        var rtl = window.NDS && 'isRTL' in NDS ? NDS.isRTL : document.documentElement.dir === 'rtl';
        return rtl ? 'ar' : 'en';
    }
    function t(v) {
        if (v && typeof v === 'object') return v[lang()] || v.en || v.ar || '';
        return v || '';
    }
    // Content is externally configurable (data-*) → escape everything interpolated.
    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Standard hero-slide markup (the shape _includes/hero-main.html emits), with the
    // event photo as the background — no slide-specific classes or inline styling.
    function buildSlide() {
        var imgUrl = assetUrl(HERO.image);
        var img = imgUrl
            ? '<div class="nds-hero-image-wrapper" style="--overlay:0;">' +   // photo carries its own wash; the default 0.7 would black it out
                '<picture><img src="' + esc(imgUrl) + '" class="nds-hero-image" alt="" fetchpriority="high"></picture>' +
              '</div>'
            : '';
        var desc = t(HERO.description) ? '<p class="nds-section-description">' + esc(t(HERO.description)) + '</p>' : '';
        var iconUrl = HERO.cta ? assetUrl(HERO.cta.icon) : '';
        var cta = HERO.cta
            ? '<a class="nds-btn nds-primary nds-oncolor nds-lg" href="' + esc(HERO.cta.url) + '" target="_blank" rel="noopener noreferrer">' +
                (iconUrl ? '<img src="' + esc(iconUrl) + '" class="nds-icon" width="24" height="24" alt="">' : '') +
                '<span class="nds-label">' + esc(t(HERO.cta.label)) + '</span>' +
              '</a>'
            : '';

        var slide = document.createElement('div');
        slide.className = 'nds-swiper-slide nds-content-wrapper ' + SLIDE_CLASS;
        slide.innerHTML =
            img +
            '<div class="nds-section-body">' +
              '<h2 class="nds-section-title">' + esc(t(HERO.title)) + '</h2>' +
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
        if (document.readyState !== 'loading') { injectHero(); return; }
        if (_observer) return;
        _observer = new MutationObserver(function () {
            if (document.querySelector(SWIPER_SEL + ' .nds-swiper-wrapper')) {
                cancelPending();
                injectHero();
            }
        });
        _observer.observe(document.documentElement, { childList: true, subtree: true });
        document.addEventListener('DOMContentLoaded', function () {
            if (!_observer) return;
            cancelPending();
            injectHero();
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

    // ── Type 2: six slides + the swiper's deck of cards ─────────────────────
    // Slides are standard hero markup; the cards are the deck mode's own markup
    // (components/swiper: .nds-deck). The section carries nds-nd96 + the active
    // slide's theme class, which is all the stylesheet keys on.
    var DECK_CLASS = 'nds-nd96';
    var _siteSlides = [], _siteTotal = '', _navHadCenter = false, _pageHadMd = false;
    var _deckAbort = null, _typeTimer = 0, _holdTimer = 0, _current = -1, _paused = false, _wordDone = false;
    var _settled = false;   // false until the first word: the first slide has no motion to wait for

    function fullTitle(s) { return t(LEAD) + ' ' + t(s.word); }

    function buildDeckSlide(s, i) {
        var h = i ? 'h2' : 'h1';   // the pack's first slide stands in for the site's h1
        var slide = document.createElement('div');
        slide.className = 'nds-swiper-slide nds-content-wrapper ' + DECK_SLIDE;
        if (i) slide.hidden = true;
        slide.innerHTML =
            '<div class="nds-section-body">' +
              '<' + h + ' class="nds-section-title" aria-label="' + esc(fullTitle(s)) + '">' +
                '<span aria-hidden="true">' + esc(t(LEAD)) + '</span> ' +
                '<span class="nds-nd96-typed" aria-hidden="true" data-word="' + esc(t(s.word)) + '"></span>' +
              '</' + h + '>' +
              '<p class="nds-section-description">' + esc(t(s.body)) + '</p>' +
              '<p class="nds-section-description nds-nd96-short">' + esc(t(s.short)) + '</p>' +
            '</div>';
        return slide;
    }

    function buildCard(s, i) {
        var card = document.createElement('button');
        card.type = 'button';
        card.className = 'nds-swiper-card';
        card.setAttribute('aria-label', fullTitle(s));
        // First-paint state (slide 0 open); JS owns it from init.
        var n = SLIDES.length, srel = i > n / 2 ? i - n : i;
        card.style.setProperty('--rel', i);
        card.style.setProperty('--srel', srel);
        if (!i) card.setAttribute('data-status', 'active');
        else if (Math.abs(srel) === 1) card.setAttribute('data-status', 'near');
        card.innerHTML = '<img src="' + esc(assetUrl(s.card)) + '" width="491" height="491" alt=""' +
            (i ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"') + '>';
        return card;
    }

    function deckSection() { return document.querySelector('.nds-hero-section.' + DECK_CLASS); }
    function deckSlides(section) { return section.querySelectorAll('.nds-swiper-slide.' + DECK_SLIDE + ':not(.nds-swiper-clone)'); }

    // The looping track shows a clone at the wrap for a frame: keep each clone a
    // copy of its twin, with the word whole.
    function syncClones(section) {
        var slides = deckSlides(section);
        Array.prototype.forEach.call(section.querySelectorAll('.nds-swiper-clone[data-swiper-clone]'), function (c) {
            var twin = slides[c.getAttribute('data-swiper-clone')];
            if (!twin) return;
            c.innerHTML = twin.innerHTML;
            var span = c.querySelector('.nds-nd96-typed');
            if (span) span.textContent = span.getAttribute('data-word');
        });
    }

    // The site's slides step aside for the event: detached, kept, restored on
    // teardown. Sync-in-head the parser may still be adding them after we run, so
    // the wrapper is swept until DOMContentLoaded.
    function stashSiteSlides(wrapper) {
        // Snapshot: removing from the live collection while walking it skips every other child.
        Array.prototype.slice.call(wrapper.children).forEach(function (el) {
            if (el.classList.contains(DECK_SLIDE)) return;
            _siteSlides.push(el);
            el.remove();
        });
    }

    function injectDeck() {
        var swiper = document.querySelector(SWIPER_SEL);
        if (!swiper) return;
        var wrapper = swiper.querySelector('.nds-swiper-wrapper');
        var section = swiper.closest('.nds-hero-section');
        if (!wrapper || !section || section.classList.contains(DECK_CLASS)) return;   // idempotent
        section.classList.add(DECK_CLASS);
        _siteTotal = swiper.style.getPropertyValue('--total');
        stashSiteSlides(wrapper);

        var deck = document.createElement('div');
        deck.className = 'nds-swiper-deck';
        SLIDES.forEach(function (s, i) {
            wrapper.appendChild(buildDeckSlide(s, i));
            deck.appendChild(buildCard(s, i));
        });
        wrapper.parentNode.insertBefore(deck, wrapper.nextSibling);
        swiper.classList.add('nds-deck');
        swiper.setAttribute('data-swiper-loop', '');   // deck mode loops on its own; older runtimes need the attribute
        swiper.style.setProperty('--total', String(SLIDES.length));
        var nav = swiper.querySelector('.nds-swiper-navigation'), page = swiper.querySelector('.nds-swiper-pagination');
        _navHadCenter = !!(nav && nav.classList.contains('nds-center'));
        _pageHadMd = !!(page && page.classList.contains('nds-md'));
        if (nav) nav.classList.add('nds-center');
        if (page) page.classList.add('nds-md');

        _deckAbort = new AbortController();
        var sig = _deckAbort.signal;
        swiper.addEventListener('nds:swiper:change', function (e) { setActive(e.detail.index); }, { signal: sig });
        section.addEventListener('pointerenter', pause, { signal: sig });
        section.addEventListener('pointerleave', resume, { signal: sig });
        document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); else resume(); }, { signal: sig });
        // The page direction can flip in place; the text follows it.
        var dirWatch = new MutationObserver(retext);
        dirWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
        sig.addEventListener('abort', function () { dirWatch.disconnect(); });
        // Runtimes older than deck mode: adopt the swiper once it initializes
        // (and again after every reinit — the attribute comes back each time).
        var initWatch = new MutationObserver(function () {
            if (swiper.hasAttribute('data-nds-swiper-initialized')) adoptDeck(swiper);
        });
        initWatch.observe(swiper, { attributes: true, attributeFilter: ['data-nds-swiper-initialized'] });
        sig.addEventListener('abort', function () { initWatch.disconnect(); });
        if (document.readyState === 'loading') {
            var sweep = new MutationObserver(function () { stashSiteSlides(wrapper); });
            sweep.observe(wrapper, { childList: true });
            document.addEventListener('DOMContentLoaded', function () { sweep.disconnect(); }, { once: true, signal: sig });
            sig.addEventListener('abort', function () { sweep.disconnect(); });
        }

        setActive(0);
        if (swiper.hasAttribute('data-nds-swiper-initialized')) reinit(swiper);
    }

    // Language flipped in place: refill every slide and card, then retype the open word.
    function retext() {
        var section = deckSection();
        if (!section) return;
        var slides = deckSlides(section), cards = section.querySelectorAll('.nds-swiper-card');
        SLIDES.forEach(function (s, i) {
            var slide = slides[i];
            if (!slide) return;
            var h = slide.querySelector('.nds-section-title');
            h.setAttribute('aria-label', fullTitle(s));
            h.firstElementChild.textContent = t(LEAD);
            var span = slide.querySelector('.nds-nd96-typed');
            span.setAttribute('data-word', t(s.word));
            span.textContent = t(s.word);
            slide.querySelector('.nds-section-description').textContent = t(s.body);
            slide.querySelector('.nds-nd96-short').textContent = t(s.short);
            if (cards[i]) cards[i].setAttribute('aria-label', fullTitle(s));
        });
        syncClones(section);
        if (_current >= 0) typeWord(slides[_current]);
    }

    function setActive(i) {
        if (i === _current) return;
        var section = deckSection();
        if (!section) return;
        var first = _current < 0;
        if (!first) {
            // Cross-fade: park the outgoing gradient on ::before, then fade it out
            // over the new one (compositor opacity, one repaint — see the stylesheet).
            var cs = getComputedStyle(section);
            section.style.setProperty('--_nd96-prev-from', cs.getPropertyValue('--_nd96-from'));
            section.style.setProperty('--_nd96-prev-to', cs.getPropertyValue('--_nd96-to'));
            section.classList.remove('nds-nd96-' + SLIDES[_current].theme);
        }
        _current = i;
        section.classList.add('nds-nd96-' + SLIDES[i].theme);
        if (!first && section.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            try { section.animate([{ opacity: 1 }, { opacity: 0 }], { duration: SETTLE_MS, easing: 'ease', pseudoElement: '::before' }); } catch (e) { /* no pseudo-element animation: the colour just snaps */ }
        }
        typeWord(deckSlides(section)[i]);
    }

    function stopTimers() {
        clearInterval(_typeTimer); clearTimeout(_holdTimer);
        _typeTimer = _holdTimer = 0;
    }

    // Types the slide's word one letter at a time (a mark rides its base letter),
    // holds, moves on. Typing always runs; a pause (hover, hidden tab) only holds
    // the move to the next slide.
    function typeWord(slide) {
        stopTimers();
        _wordDone = false;
        if (!slide) return;
        var span = slide.querySelector('.nds-nd96-typed');
        if (!span) return;
        var word = span.getAttribute('data-word');
        var chars = word.match(/\P{M}\p{M}*/gu) || [];
        var n = 0;
        function done() {
            _wordDone = true;
            var section = deckSection();
            if (section) syncClones(section);
            scheduleAdvance();
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            span.textContent = word;
            _typeTimer = setTimeout(done, chars.length * TYPE_MS);   // same beat, no letters
            return;
        }
        span.textContent = '';
        // The cards are still sliding when a slide changes: let that finish before
        // the per-letter DOM writes start, so the two never share frames.
        _typeTimer = setTimeout(function () {
            _typeTimer = setInterval(function () {
                span.textContent = chars.slice(0, ++n).join('');
                if (n >= chars.length) { clearInterval(_typeTimer); _typeTimer = 0; done(); }
            }, TYPE_MS);
        }, _settled ? SETTLE_MS : 0);
        _settled = true;
    }

    function scheduleAdvance() {
        clearTimeout(_holdTimer);
        _holdTimer = _paused ? 0 : setTimeout(prewarm, HOLD_MS - WARM_MS);
    }

    // A phone idling through the hold has clocked its GPU down, so the first
    // frames of an auto move stutter (a drag or tap never does: the gesture woke
    // it). An invisible compositor animation on the deck just before the move
    // brings the clocks up in time.
    function prewarm() {
        var deck = document.querySelector(SWIPER_SEL + ' .nds-swiper-deck');
        if (deck && deck.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            deck.animate([{ opacity: 1 }, { opacity: 0.999 }, { opacity: 1 }], { duration: WARM_MS + 100 });
        }
        _holdTimer = setTimeout(advance, WARM_MS);
    }

    function advance() {
        var swiper = document.querySelector(SWIPER_SEL);
        var inst = swiper && swiper._ndsSwiper;
        if (inst) inst.goTo((_current + 1) % SLIDES.length);   // by index: wraps with or without loop (the text switch is instant)
    }

    function pause() { _paused = true; clearTimeout(_holdTimer); _holdTimer = 0; }
    function resume() {
        if (!_paused) return;
        _paused = false;
        // Word already finished while paused: pick the hold back up.
        if (_wordDone) scheduleAdvance();
    }

    function removeDeck() {
        stopTimers();
        if (_deckAbort) { _deckAbort.abort(); _deckAbort = null; }
        var section = deckSection();
        if (!section) return;
        var swiper = section.querySelector('.nds-swiper.nds-hero');
        var wrapper = swiper.querySelector('.nds-swiper-wrapper');
        if (_current >= 0) section.classList.remove('nds-nd96-' + SLIDES[_current].theme);
        section.classList.remove(DECK_CLASS);
        _current = -1; _paused = false; _settled = false;

        var deck = swiper.querySelector('.nds-swiper-deck');
        if (deck) deck.remove();
        Array.prototype.forEach.call(section.querySelectorAll('.nds-swiper-slide.' + DECK_SLIDE), function (s) { s.remove(); });
        _siteSlides.forEach(function (s) { wrapper.appendChild(s); });
        _siteSlides = [];
        swiper.classList.remove('nds-deck');
        swiper.removeAttribute('data-swiper-loop');
        var nav = swiper.querySelector('.nds-swiper-navigation'), page = swiper.querySelector('.nds-swiper-pagination');
        if (nav && !_navHadCenter) nav.classList.remove('nds-center');
        if (page && !_pageHadMd) page.classList.remove('nds-md');
        if (_siteTotal) swiper.style.setProperty('--total', _siteTotal);
        else swiper.style.removeProperty('--total');
        if (swiper.hasAttribute('data-nds-swiper-initialized')) reinit(swiper);
    }

    // ── Older runtimes (before the swiper's deck mode, 1.13) ────────────────
    // The pack's stylesheet already carries the deck CSS. This drives what the
    // runtime lacks: card placement on every index change, the change event the
    // text follows, clone twins for syncClones (1.12 loops; earlier runtimes do
    // not, and there the arrows stop at the ends while auto-advance, drag and the
    // fan still wrap by index), the stacked-layout drag, and an instant text
    // switch. A runtime with deck mode is left alone.
    function adoptDeck(swiper) {
        var inst = swiper._ndsSwiper;
        if (!inst || inst.updateDeck || inst._nd96Adopted) return;
        inst._nd96Adopted = true;
        var cards = Array.prototype.slice.call(swiper.querySelectorAll('.nds-swiper-card'));
        var n = cards.length;
        if (!n) return;

        function place(active) {
            cards.forEach(function (card, k) {
                var rel = (k - active + n) % n, srel = rel > n / 2 ? rel - n : rel;
                card.style.setProperty('--rel', rel);
                card.style.setProperty('--srel', srel);
                var status = rel === 0 ? 'active' : Math.abs(srel) === 1 ? 'near' : '';
                if (status) card.setAttribute('data-status', status); else card.removeAttribute('data-status');
                if (rel === 0) card.setAttribute('aria-current', 'true'); else card.removeAttribute('aria-current');
            });
            swiper.dispatchEvent(new CustomEvent('nds:swiper:change', { bubbles: true, detail: { index: active } }));
        }
        // 1.12 loops with clones (a full-list index maps to a real one); 1.11 and
        // earlier have no loop, so the index is the position.
        function real() { return inst._realIndex !== undefined ? inst._realIndex : inst.currentIndex; }
        function realOf(full) {
            var r = inst._real;
            return r ? (((full - inst._head) % r) + r) % r : Math.max(0, Math.min(full, n - 1));
        }

        // Every index change the runtime settles on, plus the target the moment a
        // move starts: _goToFull carries every move in 1.12, goTo before that.
        var update = inst.updateState;
        inst.updateState = function () {
            var before = this.lastIndex;
            update.call(this);
            if (this.lastIndex !== before) place(real());
        };
        if (inst._goToFull) {
            var go = inst._goToFull;
            inst._goToFull = function (index, instant) { place(realOf(index)); return go.call(this, index, instant); };
        } else {
            var goTo = inst.goTo;
            inst.goTo = function (index) { place(((index % n) + n) % n); return goTo.call(this, index); };
        }

        // Clone twins, so syncClones can copy the right text into each clone.
        var slides = Array.prototype.slice.call(inst.wrapper.children);
        var reals = slides.filter(function (s) { return !s.classList.contains('nds-swiper-clone'); });
        var first = slides.indexOf(reals[0]);
        slides.forEach(function (s, i) {
            if (!s.classList.contains('nds-swiper-clone') || s.hasAttribute('data-swiper-clone')) return;
            s.setAttribute('data-swiper-clone', i < first ? reals.length - (first - i) : i - first - reals.length);
        });

        // The text switches in place: strip the forced smooth from the runtime's scrolls.
        var wrapper = inst.wrapper, scrollTo = wrapper.scrollTo;
        wrapper.scrollTo = function (o) {
            if (o && typeof o === 'object' && o.behavior === 'smooth') o = { left: o.left, top: o.top };
            return scrollTo.call(this, o);
        };

        // Stacked layout: the cards follow the finger, release pages or opens a card.
        var deck = swiper.querySelector('.nds-swiper-deck');
        if (deck && !deck._nd96Drag) {
            deck._nd96Drag = true;
            var mq = window.matchMedia((window.NDS && NDS.breakpoints && NDS.breakpoints.desktop) || '(min-width: 960px)');
            var sig = _deckAbort ? _deckAbort.signal : undefined;
            var x0 = null, dx = 0, pressed = -1;
            deck.addEventListener('pointerdown', function (e) {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                x0 = e.clientX; dx = 0;
                pressed = cards.indexOf(e.target.closest('.nds-swiper-card'));
                try { deck.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointer */ }
            }, { signal: sig });
            deck.addEventListener('pointermove', function (e) {
                if (x0 === null || mq.matches) return;
                dx = e.clientX - x0;
                if (Math.abs(dx) > 4) { deck.classList.add('nds-dragging'); deck.style.setProperty('--drag', dx + 'px'); }
            }, { signal: sig });
            var release = function (e) {
                if (x0 === null) return;
                x0 = null;
                deck.classList.remove('nds-dragging');
                deck.style.removeProperty('--drag');
                var live = swiper._ndsSwiper;
                if (!live) return;
                // By index, so the ends wrap on a runtime without loop too.
                if (Math.abs(dx) >= 40) { var fwd = (window.NDS && NDS.isRTL) ? dx > 0 : dx < 0; live.goTo((real() + (fwd ? 1 : n - 1)) % n); return; }
                if (e.type === 'pointerup' && pressed >= 0) live.goTo(pressed);
            };
            deck.addEventListener('pointerup', release, { signal: sig });
            deck.addEventListener('pointercancel', release, { signal: sig });
            cards.forEach(function (card, i) {
                card.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); var live = swiper._ndsSwiper; if (live) live.goTo(i); }
                }, { signal: sig });
            });
        }

        place(real());
    }

    function injectHero() { if (TYPE === 1) injectSlide(); else injectDeck(); }
    function removeHero() { if (TYPE === 1) removeSlide(); else removeDeck(); }

    // ── Footer mark ─────────────────────────────────────────────────────────
    // Rides .nds-footer-logos, the footer's own strip of partner marks — it already
    // sizes every img to 40px, so the event mark lands beside them with no CSS of
    // ours. Only footers without the strip get one built.
    function injectLogo() {
        var footer = document.querySelector('.nds-footer');
        var logoUrl = assetUrl(HERO.logo);
        if (!footer || !logoUrl || footer.querySelector('.' + LOGO_CLASS)) return;   // idempotent

        var strip = footer.querySelector('.nds-footer-logos');
        if (!strip) {
            strip = document.createElement('div');
            strip.className = 'nds-footer-logos ' + LOGO_CLASS + '-strip';   // marked so teardown can drop it again
            (footer.querySelector('.nds-footer-bottom') || footer).appendChild(strip);
        }

        var img = document.createElement('img');
        img.className = LOGO_CLASS;
        img.src = logoUrl;
        img.width = 101;    // 106:42 artwork at the strip's 40px height — reserved so it can't shift the row
        img.height = 40;
        img.loading = 'lazy';
        img.alt = t(HERO.logoAlt);
        strip.appendChild(img);
    }

    // The footer sits at the end of the document and paints nothing above the fold,
    // so DOMContentLoaded is soon enough — no parser observer needed.
    var _logoAbort = null;
    function scheduleLogo() {
        if (document.readyState !== 'loading') { injectLogo(); return; }
        if (_logoAbort) return;
        _logoAbort = new AbortController();
        document.addEventListener('DOMContentLoaded', function () {
            _logoAbort = null;
            injectLogo();
        }, { once: true, signal: _logoAbort.signal });
    }

    function removeLogo() {
        if (_logoAbort) { _logoAbort.abort(); _logoAbort = null; }
        var img = document.querySelector('.' + LOGO_CLASS);
        if (!img) return;
        var strip = img.parentNode;
        img.remove();
        if (strip.classList.contains(LOGO_CLASS + '-strip')) strip.remove();
    }

    // ── Hooks (own link + token + slide + footer mark) + self-activation ─────
    function inject() {
        ensureLink();
        addToken();
        scheduleSlide();
        scheduleLogo();
    }
    function teardown() {
        cancelPending();
        removeHero();
        removeLogo();
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
