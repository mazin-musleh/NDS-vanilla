/* NDS.CookieConsent — public surface
 * Rides: nds-panel (the bottom sheet) · nds-cookies (the consent store) · nds-scroll-more
 *        · nds-switch (the categories)
 * Methods:
 *   NDS.CookieConsent.init()               open the panel after 6 seconds when no choice is
 *                                          stored and the visitor did not close it lately
 *   NDS.CookieConsent.open(view?, opener?) open on 'notice' (default) or 'manage'
 *   NDS.CookieConsent.close()
 * Events:
 *   (none — the choice fires nds:cookies:consent from NDS.Cookies.save)
 * Hooks:
 *   #ndsCookiesPanel               a page's own panel, in the DOM or a <template>, replaces the
 *                                  built one: text, links and categories are then the page's
 *   data-cookies-toggle[="manage"] on any button outside the panel — opens it (armed by the loader)
 *   data-cookies-view              notice | manage | done — the views inside the panel
 *   data-cookies-action            accept | reject | save (then done) · manage · undo (back to notice)
 *   data-cookies-category          on a switch input in the manage view — the category it allows
 * Gotchas:
 *   - A lazy BUNDLE like Accessibility, on every page: fetched only for a visitor with no stored
 *     choice (the loader entry's eager()) or on the first data-cookies-toggle press.
 *   - The built panel's text comes from assets/i18n/cookies/{lang}.json, loaded before it is
 *     built, so it never shows English first. A page's own panel keeps its own text.
 *   - Closing without a choice stores none and hides the auto-open for 30 minutes under
 *     cookieConsentDismissed. That key is never read as consent.
 *   - The auto-open never takes focus, and waits while another panel is open: Panel shows
 *     one at a time, and would close it.
 */
(() => {
    'use strict';

    const PANEL_ID = 'ndsCookiesPanel';
    const DISMISS_KEY = 'cookieConsentDismissed';
    const DELAY = 6000;
    const CATEGORIES = ['performance', 'functional', 'targeting'];

    // English defaults; assets/i18n/cookies/{lang}.json overrides them.
    const STR = {
        panel_label: 'Cookie settings',
        title: 'Cookies',
        description: 'Use of Cookies by this site is just to guarantee Ease of Access and better user experience while browsing. Continuation of your browsing acknowledges your approval for Terms and Conditions of this site and its use of Cookies.',
        accept: 'Accept',
        reject: 'Reject',
        manage: 'Manage Cookies',
        close: 'Close',
        scroll_panel: 'Scroll panel',
        manage_title: 'Manage Cookies',
        manage_description: 'When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device, and is mostly used to make the site work as you expect it to. The information does not usually identify you directly, but it can give you a more personalized web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies. However, blocking some types of cookies may affect your experience of the site and the services we are able to offer.',
        types: 'Cookie types',
        necessary: 'Necessary Cookies',
        necessary_info: 'Always active',
        performance: 'Performance Cookies',
        functional: 'Functional Cookies',
        targeting: 'Targeting Cookies',
        confirm: 'Confirm My Choices',
        reject_all: 'Reject All',
        done_title: 'Thank you!',
        done: 'Your response has been successfully recorded. If you wish to modify or change your answer, you can go back by clicking the Undo button.',
        undo: 'Undo',
    };

    let strings = null;
    const loadStrings = () => strings || (strings = NDS.i18n.load('cookies', [])
        .then(data => { NDS.i18n.safeMerge(STR, data); }));

    const t = (key) => NDS.escapeHtml(STR[key]);
    const closeBtn = () => `<div class="nds-panel-action">
          <button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="${t('close')}">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
          </button>
        </div>`;
    // Scroll More, as in the a11y panel: a long view scrolls, and a button brings the rest up.
    const scrollBody = (inner) => `<div class="nds-scroll-more">
      <div class="nds-scroll-more-content nds-panel-body nds-flex nds-col">${inner}
      </div>
      <button type="button" class="nds-btn nds-subtle nds-show-more" aria-label="${t('scroll_panel')}">
        <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
      </button>
    </div>`;
    const category = (name, locked) => `<div class="nds-form-container nds-switch-container">
            <div class="nds-form-header">
              <label for="ndsCookies-${name}"><span class="nds-label">${t(name)}</span>${locked ? `<span class="nds-info">${t(name + '_info')}</span>` : ''}</label>
            </div>
            <div class="nds-form-control">
              <div class="nds-switch">
                <input type="checkbox" id="ndsCookies-${name}" class="nds-switch-input" data-cookies-category="${name}"${locked ? ' checked disabled' : ''}>
                <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
              </div>
            </div>
          </div>`;

    function panelMarkup() {
        return `<aside id="${PANEL_ID}" class="nds-panel nds-cookies" data-panel-side="bottom" data-panel-static aria-label="${t('panel_label')}" hidden>
  <div class="nds-cookies-view" data-cookies-view="notice">
    <div class="nds-panel-header">
      <span class="nds-featured-icon nds-circle"><i class="nds-icon nds-hgi-cookie" aria-hidden="true"></i></span>
      <div class="nds-panel-text"><span class="nds-panel-title">${t('title')}</span></div>
      ${closeBtn()}
    </div>
    ${scrollBody(`
      <p>${t('description')}</p>
      <div class="nds-flex nds-col">
        <button type="button" class="nds-btn nds-primary nds-full" data-cookies-action="accept"><span class="nds-label">${t('accept')}</span></button>
        <button type="button" class="nds-btn nds-secondary-outline nds-full" data-cookies-action="reject"><span class="nds-label">${t('reject')}</span></button>
        <button type="button" class="nds-btn nds-subtle nds-full" data-cookies-action="manage"><span class="nds-label">${t('manage')}</span></button>
      </div>`)}
  </div>
  <div class="nds-cookies-view" data-cookies-view="manage" hidden>
    <div class="nds-panel-header">
      <span class="nds-featured-icon nds-circle"><i class="nds-icon nds-hgi-cookie" aria-hidden="true"></i></span>
      <div class="nds-panel-text"><span class="nds-panel-title">${t('manage_title')}</span></div>
      ${closeBtn()}
    </div>
    ${scrollBody(`
      <p>${t('manage_description')}</p>
      <fieldset class="nds-form-group nds-switch-group" aria-label="${t('types')}">
        ${category('necessary', true)}
        ${CATEGORIES.map(c => category(c)).join('')}
      </fieldset>
      <div class="nds-flex nds-col">
        <button type="button" class="nds-btn nds-primary nds-full" data-cookies-action="save"><span class="nds-label">${t('confirm')}</span></button>
        <button type="button" class="nds-btn nds-secondary-outline nds-full" data-cookies-action="reject"><span class="nds-label">${t('reject_all')}</span></button>
      </div>`)}
  </div>
  <div class="nds-cookies-view" data-cookies-view="done" hidden>
    <div class="nds-panel-header">
      <span class="nds-featured-icon nds-circle" data-status="success"><i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i></span>
      <div class="nds-panel-text"><span class="nds-panel-title">${t('done_title')}</span></div>
      ${closeBtn()}
    </div>
    ${scrollBody(`
      <p role="status">${t('done')}</p>
      <button type="button" class="nds-btn nds-subtle nds-full" data-cookies-action="undo"><span class="nds-label">${t('undo')}</span></button>`)}
  </div>
</aside>`;
    }

    // A page's own panel wins; otherwise the built one joins the page as a template would.
    async function resolvePanel() {
        const own = NDS.fromTemplate(PANEL_ID);
        if (own) return own;
        await loadStrings();
        if (!document.getElementById(PANEL_ID)) {
            const tpl = document.createElement('template');
            tpl.innerHTML = panelMarkup();
            document.body.appendChild(tpl);
        }
        return NDS.fromTemplate(PANEL_ID);
    }

    let wired = false;
    let chose = false;
    let opener = null;

    function showView(panel, name) {
        panel.querySelectorAll('[data-cookies-view]').forEach(v => { v.hidden = v.dataset.cookiesView !== name; });
        if (name === 'manage') {
            // A stored choice shows as it is; with none, every optional category starts off.
            panel.querySelectorAll('[data-cookies-category]').forEach(input => {
                if (!input.disabled) input.checked = NDS.Cookies.allowed(input.dataset.cookiesCategory);
            });
        }
    }

    async function open(view = 'notice', from = null, { focus = true } = {}) {
        wire();
        const panel = await resolvePanel();
        if (!panel) return;
        chose = false;
        opener = from;
        showView(panel, view === 'manage' ? 'manage' : 'notice');
        NDS.Panel.open(panel, { focus });
    }

    function close() {
        const panel = document.getElementById(PANEL_ID);
        if (panel) NDS.Panel.close(panel);
    }

    function onAction(btn) {
        const panel = btn.closest('#' + PANEL_ID);
        const action = btn.dataset.cookiesAction;
        if (!['accept', 'reject', 'save', 'manage', 'undo'].includes(action)) return;
        if (action === 'save') {
            NDS.Cookies.save(Array.from(panel.querySelectorAll('[data-cookies-category]:checked'), i => i.dataset.cookiesCategory));
        } else if (action === 'accept' || action === 'reject') {
            NDS.Cookies.save(action === 'accept');
        }
        if (action !== 'manage' && action !== 'undo') chose = true;
        // Undo goes back to the choice: the stored one stays until the next replaces it.
        const view = action === 'manage' ? 'manage' : action === 'undo' ? 'notice' : 'done';
        showView(panel, view);
        panel.querySelector('[data-cookies-view="' + view + '"] [data-panel-close]')?.focus();
    }

    function wire() {
        if (wired) return;
        wired = true;
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('#' + PANEL_ID + ' [data-cookies-action]');
            if (btn) onAction(btn);
        });
        document.addEventListener('nds:panel:closed', (e) => {
            if (e.detail.panel.id !== PANEL_ID) return;
            // Closed with no choice: ask again later, not on every page.
            if (!chose && !NDS.Cookies.getConsent()) NDS.Cookies.set(DISMISS_KEY, '1', 30 / 1440);
            if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
            opener = null;
        });
    }

    // Panel shows one at a time: wait for an open one to close rather than shut it.
    function autoOpen() {
        if (NDS.Cookies.getConsent() || NDS.Cookies.get(DISMISS_KEY)) return;
        if (document.querySelector('.nds-panel[data-state~="open"]')) {
            document.addEventListener('nds:panel:closed', autoOpen, { once: true });
            return;
        }
        open('notice', null, { focus: false });
    }

    let _initDone = false;
    function init() {
        if (_initDone) return;
        _initDone = true;
        wire();
        if (NDS.Cookies.getConsent() || NDS.Cookies.get(DISMISS_KEY)) return;
        // The strings load during the wait, so the panel is ready when it opens.
        if (!document.getElementById(PANEL_ID)) loadStrings();
        setTimeout(autoOpen, DELAY);
    }

    NDS.CookieConsent = { init, open, close };
})();
