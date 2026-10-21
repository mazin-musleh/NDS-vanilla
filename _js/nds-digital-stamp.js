/* NDS.DigitalStamp — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-digital-stamp-tab with #nds-digital-stamp — the tab opens nothing without its panel
 * Methods:
 *   NDS.DigitalStamp.init()      wire the tab, outside-click and Escape
 *   NDS.DigitalStamp.open()      expand the banner
 *   NDS.DigitalStamp.close()     collapse it
 *   NDS.DigitalStamp.toggle()
 *   NDS.DigitalStamp.isOpen()    open and not closing?
 * Events (bubble from the panel):
 *   nds:digital-stamp:opened  detail (none)
 *   nds:digital-stamp:closed  detail (none) — after the collapse animation
 * Hooks:
 *   .nds-digital-stamp-tab is the trigger, #nds-digital-stamp the panel
 *   data-digital-stamp-domain  on the panel: gov.sa · edu.sa · sch.sa · med.sa · org.sa · sa —
 *                              picks the address card's wording. Without it, the site's own
 *                              address picks it; a non-.sa address shows gov.sa
 * Gotchas:
 *   - DGA's wording is in the markup as data-i18n markers: core writes it in the page
 *     language. A word whose marker the page removed stays as the page wrote it.
 *   - One per page, resolved by id at init. A re-init after the tab or panel is replaced
 *     re-wires to the new elements.
 *   - It closes itself when a click lands outside the tab and panel, which is also what
 *     closes it when the nav opens — the two need no cross-component call.
 *   - A click during the close animation RE-OPENS it rather than doing nothing.
 */
/**
 * NDS Digital Stamp
 *
 * Saudi government trust banner that expands from the topbar. Fully standalone:
 * owns its own open/close, dismisses on outside-click or Escape, and animates via
 * the grid-template-rows lifecycle in _digital-stamp.scss. No shared animation
 * lock with the nav — mutual exclusion with the nav drawer/dropdowns falls out of
 * each surface's own outside-click handler (clicking the tab is "outside" the nav,
 * so the nav closes whatever it has open; clicking the hamburger is "outside" the
 * stamp, so the stamp closes), letting the two animate independently.
 */
(function () {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.state;

    // DGA's wording, in English; the assets/i18n/{lang}.json pack overrides it. The markup carries
    // the same words as markers: this is their baseline.
    NDS.i18n.strings('digital-stamp', {
        tab: 'A government website registered with the Digital Government Authority.',
        tab_short: 'Government website registered with DGA',
        verify: 'How you know?',
        label: 'Digital government stamp',
        flag: 'Saudi Arabia flag',
        dga: 'Digital Government Authority',
        register: 'Registered on Digital Government Authority:',
        https_title: 'Official Reliable websites use',
        https_desc: 'Ensure the website is using the HTTPS protocol.',
        gov_title: 'Official Saudi Government websites URL ends with', gov_mark: '.gov.sa',
        gov_desc: 'Website belongs to an official government organization in the Kingdom of Saudi Arabia always ends with .gov.sa .',
        edu_title: 'Official Saudi educational websites URL ends with', edu_mark: '.edu.sa',
        edu_desc: 'Website belongs to an official educational in the Kingdom of Saudi Arabia always ends with .edu.sa or sch.sa .',
        sch_title: 'Official Saudi educational websites URL ends with', sch_mark: '.sch.sa',
        sch_desc: 'Website belongs to an official educational in the Kingdom of Saudi Arabia always ends with .edu.sa or sch.sa .',
        med_title: 'Official Saudi medical websites URL ends with', med_mark: '.med.sa',
        med_desc: 'Website belongs to an official medical in the Kingdom of Saudi Arabia always ends with .med.sa .',
        org_title: 'Official Saudi non-profit organizations websites URL ends with', org_mark: '.org.sa',
        org_desc: 'Website belongs to an official non-profit organizations in the Kingdom of Saudi Arabia always ends with .org.sa .',
        sa_title: 'Official Saudi activities and initiatives websites URL ends with', sa_mark: '.sa',
        sa_desc: 'Website belongs to an official activities and initiatives in the Kingdom of Saudi Arabia always ends with .sa .',
    });
    const DOMAINS = ['gov', 'edu', 'sch', 'med', 'org', 'sa'];

    // The site's own address picks the card: iu.edu.sa → edu, vision.sa → sa. Anything
    // else (localhost, a .com.sa, a preview host) is gov.
    function domainOfHost() {
        const labels = location.hostname.split('.');
        if (labels.length < 2 || labels.at(-1) !== 'sa') return 'gov';
        const second = labels.at(-2);
        if (DOMAINS.includes(second)) return second;
        return second === 'com' || second === 'net' ? 'gov' : 'sa';
    }

    // The address card follows the site's domain. The canon marks the gov.sa words; on another
    // domain the script points those markers at its words, and core writes them. A word the page
    // wrote itself has no marker, so it stays.
    function pickDomain() {
        // 'edu.sa', '.edu.sa' and 'edu' all name the edu card; '.sa' and 'sa' the sa one.
        let domain = (panel.getAttribute('data-digital-stamp-domain') || domainOfHost()).replace(/^\./, '');
        if (domain !== 'sa') domain = domain.replace(/\.sa$/, '');
        if (!DOMAINS.includes(domain)) {
            console.warn('NDS DigitalStamp: data-digital-stamp-domain "' + domain + '" is not one of ' + DOMAINS.join(', ') + '; showing gov');
            domain = 'gov';
        }
        if (domain === 'gov') return;
        panel.querySelectorAll('[data-i18n^="digital-stamp.gov_"]').forEach(el => {
            el.setAttribute('data-i18n', el.getAttribute('data-i18n').replace('.gov_', '.' + domain + '_'));
        });
    }

    let tab = null;
    let panel = null;
    let abortController = null;
    // Cancel handle for the in-flight close cleanup, so a re-open mid-close
    // discards the pending hide() instead of letting it fire late.
    let cancelClose = null;

    // "open" stays set through the close animation (paired with "closing"), so
    // gate on the absence of "closing" — that treats a closing panel as not-open,
    // making a click during close re-open rather than no-op.
    const isOpen = () => !!panel && hasState(panel, 'open') && !hasState(panel, 'closing');

    function open() {
        if (!panel || !tab || isOpen()) return;
        cancelClose?.();
        cancelClose = null;

        // Reveal, then start collapsed: "open opening" paints display:grid at
        // rows:0fr. Two frames later drop "opening" so grid-template-rows
        // transitions 0fr → 1fr.
        panel.removeAttribute('hidden');
        addState(panel, 'open', 'opening');
        removeState(panel, 'closing');
        NDS.aria.expanded(tab, true);
        addState(tab, 'expanded');

        NDS.afterPaint(() => removeState(panel, 'opening'));

        panel.dispatchEvent(new CustomEvent('nds:digital-stamp:opened', { bubbles: true }));
    }

    function close() {
        if (!isOpen()) return;

        // "open closing" holds display:grid while rows animates 1fr → 0fr; the
        // panel is re-hidden only after the transition settles.
        addState(panel, 'closing');
        NDS.aria.expanded(tab, false);
        removeState(tab, 'expanded');

        cancelClose = NDS.onTransitionEnd(panel, () => {
            cancelClose = null;
            clearState(panel);
            panel.setAttribute('hidden', '');
            panel.dispatchEvent(new CustomEvent('nds:digital-stamp:closed', { bubbles: true }));
        });
    }

    function toggle() {
        isOpen() ? close() : open();
    }

    function init() {
        const t = document.querySelector('.nds-digital-stamp-tab');
        const p = document.getElementById('nds-digital-stamp');
        // Re-wire only when the tab or panel was replaced.
        if (!t || !p || (t === tab && p === panel)) return;
        tab = t;
        panel = p;
        cancelClose?.();
        cancelClose = null;

        // Scope all listeners to one AbortController so a re-init detaches the
        // prior batch atomically instead of stacking handlers on document.
        if (abortController) abortController.abort();
        abortController = new AbortController();
        const { signal } = abortController;

        pickDomain();

        tab.addEventListener('click', toggle, { signal });

        // Outside-click dismiss. Also what closes the stamp when the user opens
        // the nav: the hamburger / nav link is outside tab+panel, so the same
        // handler fires — no cross-component call needed.
        document.addEventListener('click', (e) => {
            if (!isOpen()) return;
            if (tab.contains(e.target) || panel.contains(e.target)) return;
            close();
        }, { signal });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen()) close();
        }, { signal });
    }

    NDS.DigitalStamp = { init, open, close, toggle, isOpen };
})();
