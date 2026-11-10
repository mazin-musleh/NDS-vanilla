/* NDS.DigitalStamp — public surface
 * Rides: nds-topbar (open, close, Escape, outside click: NDS.Topbar.open('nds-digital-stamp'))
 * Methods:
 *   NDS.DigitalStamp.init()      point the address card at the site's domain
 * Events:
 *   (none)
 * Hooks:
 *   #nds-digital-stamp, a .nds-topbar-expander; its tab is a [data-topbar-toggle]
 *   data-digital-stamp-domain  on the stamp: gov.sa · edu.sa · sch.sa · med.sa · org.sa · sa —
 *                              picks the address card's wording. Without it, the site's own
 *                              address picks it; a non-.sa address shows gov.sa
 * Gotchas:
 *   - DGA's wording is in the markup as data-i18n markers: core writes it in the page
 *     language. A word whose marker the page removed stays as the page wrote it.
 *   - One per page, by id.
 */
(function () {
    'use strict';

    // DGA's wording, in English; the assets/i18n/{lang}.json pack overrides it. The markup carries
    // the same words as markers: this is their baseline.
    NDS.i18n.getStrings('digital-stamp', {
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
    const domains = ['gov', 'edu', 'sch', 'med', 'org', 'sa'];

    // The site's own address picks the card: iu.edu.sa → edu, vision.sa → sa. Anything
    // else (localhost, a .com.sa, a preview host) is gov.
    function getHostDomain() {
        const labels = location.hostname.split('.');
        // Index, not .at(): .at() needs Chrome 92.
        if (labels.length < 2 || labels[labels.length - 1] !== 'sa') return 'gov';
        const second = labels[labels.length - 2];
        if (domains.includes(second)) return second;
        return second === 'com' || second === 'net' ? 'gov' : 'sa';
    }

    // The address card follows the site's domain. The canon marks the gov.sa words; on another
    // domain the script points those markers at its words, and core writes them. A word the page
    // wrote itself has no marker, so it stays.
    function pickDomain(panel) {
        // 'edu.sa', '.edu.sa' and 'edu' all name the edu card; '.sa' and 'sa' the sa one.
        let domain = (panel.getAttribute('data-digital-stamp-domain') || getHostDomain()).replace(/^\./, '');
        if (domain !== 'sa') domain = domain.replace(/\.sa$/, '');
        if (!domains.includes(domain)) {
            console.warn('NDS DigitalStamp: data-digital-stamp-domain "' + domain + '" is not one of ' + domains.join(', ') + '; showing gov');
            domain = 'gov';
        }
        if (domain === 'gov') return;
        panel.querySelectorAll('[data-i18n^="digital-stamp.gov_"]').forEach(el => {
            el.setAttribute('data-i18n', el.getAttribute('data-i18n').replace('.gov_', '.' + domain + '_'));
        });
    }

    function init() {
        const panel = document.getElementById('nds-digital-stamp');
        if (panel) pickDomain(panel);
    }

    NDS.DigitalStamp = { init };
})();
