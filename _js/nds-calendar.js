/* NDS.Calendar — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-calendar needs .nds-calendar-events — there are no events
 * Methods:
 *   NDS.Calendar.init() / .reinit()     instance every .nds-calendar
 *   NDS.Calendar.create(el)             instance one calendar (the live one if it has one)
 *   NDS.Calendar.destroy(idOrEl)        undo create()
 *   NDS.Calendar.getInstance(idOrEl)    the calendar's instance, or null
 *   instance.next() / .prev()           the next or the previous week
 *   instance.goTo(date)                 the week that holds date (a Date or YYYY-MM-DD)
 *   instance.setView(view)              grid | rows
 *   instance.setDay(date)               that day's events only; null shows the week
 *   instance.refresh()                  read the events again
 *   instance.destroy()
 * Events (bubble from the .nds-calendar):
 *   nds:calendar:change   detail {week, view, day} — week is its first day and day the picked
 *                         day, as YYYY-MM-DD (day null: the whole week)
 * Hooks:
 *   data-week                any day of the shown week, YYYY-MM-DD (none: this week); the
 *                            script writes the week's first day back
 *   data-view                grid | rows (none: grid). A calendar under 640px wide shows rows
 *   data-day                 the picked day, YYYY-MM-DD (none: the whole week)
 *   data-week-param          keep the week in the address: ?week=YYYY-MM-DD (a value names another
 *                            key). Read once at load, before data-week; the opening week drops it
 *   data-calendar-action     on a button: prev | next | today
 *   data-calendar-view       on a button: grid | rows. The current one is pressed
 *   .nds-calendar-title      the script writes the week's dates into it
 *   .nds-calendar-days       the script writes a button per day into it
 *   .nds-calendar-events     a list: each <li> is an event, on the day of its first time[datetime]
 *   .nds-calendar-empty      shows while the week, or the picked day, has no events
 *   data-calendar · data-week-start   read through NDS.Date, the nearest wins
 *   written by the component: data-calendar-day on an event (its column, 0–6) ·
 *                             data-state="empty" on the root
 * Gotchas:
 *   - Write the events in time order: a day stacks its events in the order written.
 *   - An event outside the shown week, or off the picked day, is hidden, never removed.
 *   - Events added or removed later are read again by themselves.
 *   - A Filter on the same list hides events with data-filtered: they count as none for the
 *     empty message.
 *   - The address changes with replaceState: no Back-button step per week, as Pagination.
 *   - A press on a day or a week button says the day or week and its event count (NDS.announce).
 *   - Loading: nds-loading (or data-state="loading") on the list's drawer, while a server loads the
 *     week. The old events stay for the Drawer's skeleton, the empty message waits, and so does the
 *     announcement.
 *   - Moving to another week drops the picked day.
 *   - ponytail: one week. No month view, no hour axis, no multi-day bars (an event shows on its
 *     first day); add each when a site asks.
 */
(() => {
    'use strict';

    const SELECTOR = '.nds-calendar';
    const INIT_ATTRIBUTE = 'data-nds-calendar-initialized';
    const VIEWS = Object.freeze(['grid', 'rows']);

    const getIso = (date) => NDS.Date.format(date, { format: 'YYYY-MM-DD' });
    const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    // A Date or a datetime value → a local day, or null.
    const toDay = (value) => (value instanceof Date ? (isNaN(value) ? null : addDays(value, 0)) : value ? NDS.Date.readDay(String(value)) : null);
    const isSameDay = (a, b) => (a && b ? +a === +b : a === b);
    // "Monday 8 Jumada al-Ula 1448": NDS.Date's month names, as Intl's Hijri names differ by browser.
    const getDayLabel = (date, calendar, lang) => NDS.Date.format(date, { locale: lang, weekday: 'long' })
        + ' ' + NDS.Date.format(date, { calendar, locale: lang, format: 'D MMMM YYYY' });

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('calendar', {
        events: { one: '1 event', other: '{n} events' },
        no_events: 'No events',
    });

    let globalsWired = false;

    // Page-wide and shared by every calendar, so create(el) wires them too.
    function addGlobalListeners() {
        if (globalsWired) return;
        globalsWired = true;
        // A host writes the state back; the instance's own writes match its fields and change nothing.
        NDS.onAttributeChange(SELECTOR, ['data-week', 'data-view', 'data-day'], (elements) => {
            elements.forEach((el) => el.ndsCalendar?._readState());
        });
        NDS.onChildrenChange('.nds-calendar-events', (lists) => {
            lists.forEach((list) => list.closest(SELECTOR)?.ndsCalendar?.refresh());
        });
        NDS.state.onToggle('loading', '.nds-calendar .nds-drawer', (drawer, on) => drawer.closest(SELECTOR)?.ndsCalendar?._setLoading(on), { className: 'nds-loading' });
        // A Filter on the list hides events: the empty message counts what is left.
        NDS.onAttributeChange('.nds-calendar-events > li', ['data-filtered'], (items) => {
            new Set(items.map((item) => item.closest(SELECTOR)?.ndsCalendar)).forEach((calendar) => calendar?._syncEmpty());
        });
    }

    class NdsCalendar {
        constructor(el) {
            this._element = el;
            this.abortController = new AbortController();
            this._week = null;
            this._view = null;
            this._day = null;
            this._dayButtons = this._buildDayButtons();
            // The grid has 1px rows and each event spans its own height, so a day stacks its events
            // without the gap a taller event in another day leaves in shared rows.
            this._offResizes = [];
            // Debounced, so a server's new events land before the count is read.
            this._announce = NDS.debounce(() => this._sayChange(), 400);
            this._announcePending = false;
            this._loading = !!el.querySelector('.nds-drawer:is(.nds-loading, [data-state~="loading"])');
            this._readEvents();
            el.addEventListener('click', (e) => this._handleClick(e), { signal: this.abortController.signal });
            this._readState(true);
        }

        _buildDayButtons() {
            const box = this._element.querySelector('.nds-calendar-days');
            if (!box) return [];
            const buttons = Array.from({ length: 7 }, () => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-indicator nds-calendar-day';
                // The initial stands in for the name in a narrow calendar: Arabic short names are whole words.
                const [name, initial, number] = ['name', 'initial', 'number'].map((part) => {
                    const span = document.createElement('span');
                    span.className = 'nds-calendar-day-' + part;
                    return span;
                });
                NDS.aria.hidden(initial, true);
                btn.append(name, initial, number);
                return btn;
            });
            box.replaceChildren(...buttons);
            return buttons;
        }

        _readEvents() {
            this._offResizes.forEach((off) => off());
            this._offResizes = [];
            this._events = [];
            this._element.querySelectorAll('.nds-calendar-events > li:not([data-nds-empty-placeholder])').forEach((item) => {
                const day = NDS.Date.readDay(item.querySelector('time[datetime]')?.getAttribute('datetime') || '');
                if (!day) console.warn('NDS Calendar: an event needs a time with a datetime such as 2026-10-20; it stays hidden', item);
                this._events.push({ item, day });
                this._offResizes.push(NDS.onElementResize(item, (entry) => this._getRowsWrite(entry)));
            });
        }

        // Read now, write with the batch: the gap below an event is part of its span, as the grid's row gap is 0.
        _getRowsWrite({ target, borderBoxSize }) {
            const gap = parseFloat(getComputedStyle(target.parentElement).columnGap) || 0;
            const rows = String(Math.ceil(borderBoxSize[0].blockSize + gap));
            if (target.style.getPropertyValue('--_calendar-rows') !== rows) return () => target.style.setProperty('--_calendar-rows', rows);
        }

        // From the hooks. `first` is create(): it always syncs, and fires no change.
        _readState(first) {
            const el = this._element;
            const day = toDay(el.dataset.day);
            const weekStart = NDS.Date.getWeekStart(el);
            let fromUrl = null;
            if (first) {
                // The week the page opens on without ?week=: writing it back drops the key.
                this._openingWeek = NDS.Date.getStartOfWeek(toDay(el.dataset.week) || NDS.Date.getToday(), weekStart);
                fromUrl = this._getParamName() && toDay(new URLSearchParams(location.search).get(this._getParamName()));
            }
            const anchor = day || fromUrl || toDay(el.dataset.week) || NDS.Date.getToday();
            const view = VIEWS.includes(el.dataset.view) ? el.dataset.view : 'grid';
            this._setState(NDS.Date.getStartOfWeek(anchor, weekStart), view, day, first);
        }

        _setState(week, view, day, first) {
            // A picked day outside the week drops: the week wins.
            if (day && (day < week || day > addDays(week, 6))) day = null;
            const changed = !isSameDay(week, this._week) || view !== this._view || !isSameDay(day, this._day);
            if (!changed && !first) return false;
            this._week = week;
            this._view = view;
            this._day = day;
            this._sync();
            if (!first) {
                this._writeParam();
                this._dispatchChange();
            }
            return changed;
        }

        // data-week-param: '' or bare is the key `week`; no attribute, no address.
        _getParamName() {
            const name = this._element.getAttribute('data-week-param');
            return name === null ? null : name || 'week';
        }

        _writeParam() {
            const name = this._getParamName();
            if (!name) return;
            const params = new URLSearchParams(location.search);
            if (isSameDay(this._week, this._openingWeek)) params.delete(name);
            else params.set(name, getIso(this._week));
            NDS.writeUrlParams(params);
        }

        _sync() {
            const el = this._element;
            const calendar = NDS.Date.getCalendar(el);
            const lang = el.closest('[lang]')?.lang || 'en';
            // Written only when it differs: each write reaches the hooks' observer.
            const state = { week: getIso(this._week), view: this._view, day: this._day && getIso(this._day) };
            for (const key in state) {
                if (!state[key]) el.removeAttribute('data-' + key);
                else if (el.dataset[key] !== state[key]) el.dataset[key] = state[key];
            }

            const title = el.querySelector('.nds-calendar-title');
            if (title) title.textContent = this._getTitle(calendar, lang);

            const names = NDS.Date.getWeekdayNames(lang, NDS.Date.getWeekStart(el));
            const today = NDS.Date.getToday();
            this._dayButtons.forEach((btn, i) => {
                const date = addDays(this._week, i);
                const picked = isSameDay(date, this._day);
                const [name, initial, number] = btn.children;
                name.textContent = names[i];
                initial.textContent = NDS.Date.format(date, { locale: lang, weekday: 'narrow' });
                number.textContent = NDS.Date.toParts(date, calendar).day;
                btn.setAttribute('aria-description', getDayLabel(date, calendar, lang));
                NDS.aria.pressed(btn, picked);
                NDS.state[picked ? 'add' : 'remove'](btn, 'selected');
                NDS.aria.current(btn, isSameDay(date, today) ? 'date' : null);
            });

            el.querySelectorAll('[data-calendar-view]').forEach((btn) => {
                const current = btn.dataset.calendarView === this._view;
                NDS.aria.pressed(btn, current);
                NDS.state[current ? 'add' : 'remove'](btn, 'selected');
            });

            for (const { item, day } of this._events) {
                const column = day ? Math.round((day - this._week) / 864e5) : -1;
                if (column >= 0 && column < 7 && (!this._day || isSameDay(day, this._day))) item.setAttribute('data-calendar-day', column);
                else item.removeAttribute('data-calendar-day');
            }
            this._syncEmpty();
        }

        _setLoading(on) {
            this._loading = on;
            this._syncEmpty();
            if (!on && this._announcePending) this._announce();
        }

        _syncEmpty() {
            const shown = this._loading || this._events.some(({ item }) => item.hasAttribute('data-calendar-day') && !item.hasAttribute('data-filtered'));
            NDS.state[shown ? 'remove' : 'add'](this._element, 'empty');
        }

        // "18 – 24 Oct 2026"; the start names its month or year only when it differs from the end's.
        _getTitle(calendar, lang) {
            const last = addDays(this._week, 6);
            const start = NDS.Date.toParts(this._week, calendar);
            const end = NDS.Date.toParts(last, calendar);
            const startFormat = start.year !== end.year ? 'D MMM YYYY' : start.month !== end.month ? 'D MMM' : 'D';
            return NDS.Date.format(this._week, { calendar, locale: lang, format: startFormat })
                + ' – ' + NDS.Date.format(last, { calendar, locale: lang, format: 'D MMM YYYY' });
        }

        _handleClick(e) {
            const target = e.target.closest('[data-calendar-action], [data-calendar-view], .nds-calendar-day');
            if (!target || target.closest(SELECTOR) !== this._element) return;
            const index = this._dayButtons.indexOf(target);
            let moved = false;
            if (index > -1) {
                const date = addDays(this._week, index);
                moved = this.setDay(isSameDay(date, this._day) ? null : date);
            } else if (target.dataset.calendarView) {
                this.setView(target.dataset.calendarView);
            } else {
                const action = target.dataset.calendarAction;
                if (action === 'next') moved = this.next();
                else if (action === 'prev') moved = this.prev();
                else if (action === 'today') moved = this.goTo(NDS.Date.getToday());
            }
            // The press changed what the list holds: say it, once the events are in.
            if (moved) {
                this._announcePending = true;
                this._announce();
            }
        }

        // "Thursday 22 October 2026: 3 events", or the week's dates. Waits while the list loads.
        _sayChange() {
            if (!this._announcePending || this._loading) return;
            this._announcePending = false;
            const el = this._element;
            const lang = el.closest('[lang]')?.lang || 'en';
            const calendar = NDS.Date.getCalendar(el);
            const count = this._events.filter(({ item }) => item.hasAttribute('data-calendar-day') && !item.hasAttribute('data-filtered')).length;
            const label = this._day ? getDayLabel(this._day, calendar, lang) : this._getTitle(calendar, lang);
            NDS.announce(label + ': ' + (count ? strings.text('events', { n: count }, lang) : strings.text('no_events', null, lang)));
        }

        _dispatchChange() {
            this._element.dispatchEvent(new CustomEvent('nds:calendar:change', {
                bubbles: true,
                detail: { week: getIso(this._week), view: this._view, day: this._day ? getIso(this._day) : null }
            }));
        }

        goTo(date) {
            const day = toDay(date);
            if (!day) return false;
            return this._setState(NDS.Date.getStartOfWeek(day, NDS.Date.getWeekStart(this._element)), this._view, null);
        }

        next() { return this.goTo(addDays(this._week, 7)); }

        prev() { return this.goTo(addDays(this._week, -7)); }

        setView(view) {
            return VIEWS.includes(view) && this._setState(this._week, view, this._day);
        }

        setDay(date) {
            const day = date == null ? null : toDay(date);
            if (date != null && !day) return false;
            const week = day ? NDS.Date.getStartOfWeek(day, NDS.Date.getWeekStart(this._element)) : this._week;
            return this._setState(week, this._view, day);
        }

        refresh() {
            this._readEvents();
            this._sync();
            if (this._announcePending) this._announce();
        }

        destroy() {
            const el = this._element;
            this.abortController.abort();
            this._announce.cancel();
            this._offResizes.forEach((off) => off());
            this._dayButtons.forEach((btn) => btn.remove());
            this._events.forEach(({ item }) => {
                item.removeAttribute('data-calendar-day');
                item.style.removeProperty('--_calendar-rows');
            });
            el.querySelectorAll('[data-calendar-view]').forEach((btn) => {
                btn.removeAttribute('aria-pressed');
                NDS.state.remove(btn, 'selected');
            });
            NDS.state.remove(el, 'empty');
            el.removeAttribute(INIT_ATTRIBUTE);
            delete el.ndsCalendar;
        }
    }

    // Read off the element, so an unmounted calendar (a framework removing it without destroy()) is gone.
    function getInstance(target) {
        return (typeof target === 'string' ? document.getElementById(target) : target)?.ndsCalendar || null;
    }

    function create(el) {
        if (el.ndsCalendar) return el.ndsCalendar;
        addGlobalListeners();
        const calendar = new NdsCalendar(el);
        el.setAttribute(INIT_ATTRIBUTE, 'true');
        el.ndsCalendar = calendar;
        return calendar;
    }

    function init() {
        addGlobalListeners();
        document.querySelectorAll(`${SELECTOR}:not([${INIT_ATTRIBUTE}])`).forEach((el) => {
            if (!el.closest('code')) create(el);
        });
    }

    NDS.Calendar = {
        init,
        reinit: init,
        create,
        destroy: (target) => getInstance(target)?.destroy(),
        getInstance,
    };
})();
