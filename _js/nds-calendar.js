/* NDS.Calendar — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-calendar needs .nds-calendar-events — there are no events
 * Methods:
 *   NDS.Calendar.init() / .reinit()     instance every .nds-calendar
 *   NDS.Calendar.create(el)             instance one calendar (the live one if it has one)
 *   NDS.Calendar.destroy(idOrEl)        undo create()
 *   NDS.Calendar.getInstance(idOrEl)    the calendar's instance, or null
 *   instance.next() / .prev()           the next or the previous week, or month in the month view
 *   instance.goTo(date)                 the week or month that holds date (a Date or YYYY-MM-DD)
 *   instance.setView(view)              grid | rows | month
 *   instance.setDay(date)               that day's events only; null shows the week or month
 *   instance.refresh()                  read the events again
 *   instance.destroy()
 * Events (bubble from the .nds-calendar):
 *   nds:calendar:change   detail {start, end, view, day} — the shown week or month's first and last
 *                         day, and the picked day, as YYYY-MM-DD (day null: the whole week or month)
 * Hooks:
 *   data-date                any day of the shown week or month, YYYY-MM-DD (none: today); the
 *                            script writes the first day back
 *   data-view                grid | rows | month (none: grid). A calendar under 860px wide shows
 *                            grid as rows
 *   data-day                 the picked day, YYYY-MM-DD (none: the whole week or month)
 *   data-date-param          the date's key in the address (none: date). The date stays there as
 *                            ?date=YYYY-MM-DD, as a Filter's filters do: read once at load, before
 *                            data-date; the opening week or month drops it. Two calendars on a page take two keys
 *   data-view-param          the view's key in the address (none: view): ?view=month, the same way;
 *                            the opening view drops it
 *   data-calendar-action     on a button: prev | next | today. Its calendar.previous_week (or next_week)
 *                            label marker becomes previous_month in the month view, and back
 *   data-calendar-view       on a button: grid | rows | month. The current one is pressed (rows
 *                            for grid in a narrow calendar)
 *   data-calendar-second     hijri | gregory: the title and each day button also show the dates
 *                            in that calendar
 *   .nds-calendar-title      the script writes the week's dates, or the month, into it
 *   .nds-calendar-days       the script writes the weekday names and a button per day into it
 *   .nds-calendar-events     a list: each <li> is an event, on the day of its first time[datetime]
 *   .nds-calendar-empty      shows while the week or month, or the picked day, has no events
 *   data-calendar · data-week-start   read through NDS.Date, the nearest wins
 *   written by the component: data-calendar-day on an event (its column, 0–6) ·
 *                             an event's Date Tile, when its first time[datetime] is one: weekday,
 *                             day and month in the calendar and language, and the parts in an empty tile ·
 *                             data-state="empty" on the root · data-state="other-month" on a
 *                             month's day button from the month before or after
 * Gotchas:
 *   - Write the events in time order: a day stacks its events in the order written.
 *   - An event outside the shown week or month, or off the picked day, is hidden, never removed.
 *   - Events added or removed later are read again by themselves.
 *   - A Filter on the same list hides events with data-filtered: they count as none for the
 *     empty message and the day buttons.
 *   - The address changes with replaceState: no Back-button step per week, as Pagination.
 *   - A press on a day or a week button says the day or week and its event count (NDS.announce).
 *   - The days are one Tab stop (the picked day, else today, else the first); the arrow keys move
 *     between them (Up and Down a week in the month view), Home and End to the ends.
 *   - Loading: nds-loading (or data-state="loading") on the .nds-calendar, while a server loads the
 *     week: the Loading spinner. The empty message waits, and so does the announcement.
 *   - Moving to another week or month drops the picked day; a day of the month before or after
 *     moves there and picks it.
 *   - The month follows the calendar: a Hijri calendar shows a Hijri month.
 *   - ponytail: no hour axis, no multi-day bars (an event shows on its first day), no events in the
 *     month's day boxes (the list shows them); add each when a site asks.
 */
(() => {
    'use strict';

    const SELECTOR = '.nds-calendar';
    const INIT_ATTRIBUTE = 'data-nds-calendar-initialized';
    const VIEWS = Object.freeze(['grid', 'rows', 'month']);
    // The width the CSS container query gives the grid; under it grid draws as rows.
    const GRID_MIN_WIDTH = 860;
    // Six weeks hold any month, with any first day.
    const MAX_DAYS = 42;

    const getIso = (date) => NDS.Date.format(date, { format: 'YYYY-MM-DD' });
    const addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    const getDayCount = (from, to) => Math.round((to - from) / 864e5);
    // A Date or a datetime value → a local day, or null.
    const toDay = (value) => (value instanceof Date ? (isNaN(value) ? null : addDays(value, 0)) : value ? NDS.Date.readDay(String(value)) : null);
    const getLang = (el) => el.closest('[lang]')?.lang || 'en';
    const isSameDay = (a, b) => (a && b ? +a === +b : a === b);
    // In the week or the picked day, and not hidden by a Filter.
    const isShown = ({ item }) => item.hasAttribute('data-calendar-day') && !item.hasAttribute('data-filtered');

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('calendar', {
        events: { one: '1 event', other: '{n} events' },
        previous_week: 'Previous week',
        next_week: 'Next week',
        previous_month: 'Previous month',
        next_month: 'Next month',
    });
    // The step buttons' label keys, by action and by range.
    const STEP_LABELS = Object.freeze({
        prev: { week: 'previous_week', month: 'previous_month' },
        next: { week: 'next_week', month: 'next_month' },
    });

    let globalsWired = false;

    // Page-wide and shared by every calendar, so create(el) wires them too.
    function addGlobalListeners() {
        if (globalsWired) return;
        globalsWired = true;
        // A host writes the state back; the instance's own writes match its fields and change nothing.
        NDS.onAttributeChange(SELECTOR, ['data-date', 'data-view', 'data-day'], (elements) => {
            elements.forEach((el) => el.ndsCalendar?._readState());
        });
        NDS.onChildrenChange('.nds-calendar-events', (lists) => {
            lists.forEach((list) => list.closest(SELECTOR)?.ndsCalendar?.refresh());
        });
        NDS.state.onToggle('loading', SELECTOR, (el, on) => el.ndsCalendar?._setLoading(on), { className: 'nds-loading' });
        // A Filter on the list hides events: the empty message and the day buttons count what is left.
        NDS.onAttributeChange('.nds-calendar-events > li', ['data-filtered'], (items) => {
            new Set(items.map((item) => item.closest(SELECTOR)?.ndsCalendar)).forEach((calendar) => calendar?._sync());
        });
    }

    class NdsCalendar {
        constructor(el) {
            this._element = el;
            this.abortController = new AbortController();
            this._start = null;
            this._end = null;
            this._view = null;
            this._day = null;
            this._dayCount = 7;
            this._isNarrow = false;
            this._buildDays();
            // The grid has 1px rows and each event spans its own height, so a day stacks its events
            // without the gap a taller event in another day leaves in shared rows.
            this._offResizes = [];
            // Grid draws as rows in a narrow calendar: the Rows button is the one pressed there.
            this._offWidth = NDS.onElementResize(el, ({ contentBoxSize }) => {
                const isNarrow = contentBoxSize[0].inlineSize < GRID_MIN_WIDTH;
                if (isNarrow !== this._isNarrow) return () => {
                    this._isNarrow = isNarrow;
                    this._syncViewButtons();
                };
            });
            // Debounced, so a server's new events land before the count is read.
            this._announce = NDS.debounce(() => this._sayChange(), 400);
            this._announcePending = false;
            this._loading = el.classList.contains('nds-loading') || NDS.state.has(el, 'loading');
            this._readEvents();
            el.addEventListener('click', (e) => this._handleClick(e), { signal: this.abortController.signal });
            el.addEventListener('keydown', (e) => this._handleDayKey(e), { signal: this.abortController.signal });
            this._readState(true);
            // Hijri month names come from the page's pack: write the dates again once it lands.
            const lang = getLang(el);
            if (!strings.ready(lang)) strings.load(lang).then(() => {
                if (this.abortController.signal.aborted) return;
                this._tilesKey = null;
                this._sync();
            });
        }

        // The weekday names head the month; each button names its own day in a week.
        _buildDays() {
            const box = this._element.querySelector('.nds-calendar-days');
            this._weekdays = [];
            this._dayButtons = [];
            if (!box) return;
            // The initial stands in for the name in a narrow calendar: Arabic short names are whole words.
            const makeParts = (parts) => parts.map((part) => {
                const span = document.createElement('span');
                span.className = 'nds-calendar-day-' + part;
                return span;
            });
            this._weekdays = Array.from({ length: 7 }, () => {
                const head = document.createElement('span');
                head.className = 'nds-calendar-weekday';
                // Each day button's description names its weekday.
                NDS.aria.hidden(head, true);
                head.append(...makeParts(['name', 'initial']));
                return head;
            });
            this._dayButtons = Array.from({ length: MAX_DAYS }, () => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-indicator nds-calendar-day';
                const [name, initial, number, second, dot] = makeParts(['name', 'initial', 'number', 'second', 'dot']);
                // The description names the second date in full and the count; the bare marks would read as noise.
                [initial, second, dot].forEach((span) => NDS.aria.hidden(span, true));
                btn.append(name, initial, number, second, dot);
                return btn;
            });
            box.replaceChildren(...this._weekdays, ...this._dayButtons);
        }

        _readEvents() {
            this._offResizes.forEach((off) => off());
            this._offResizes = [];
            this._events = [];
            this._tilesKey = null;
            this._element.querySelectorAll('.nds-calendar-events > li:not([data-nds-empty-placeholder])').forEach((item) => {
                const time = item.querySelector('time[datetime]');
                const day = NDS.Date.readDay(time?.getAttribute('datetime') || '');
                if (!day) console.warn('NDS Calendar: an event needs a time with a datetime such as 2026-10-20; it stays hidden', item);
                this._events.push({ item, day, tile: time?.classList.contains('nds-date-tile') ? time : null });
                this._offResizes.push(NDS.onElementResize(item, (entry) => this._getRowsWrite(entry)));
            });
        }

        // Read now, write with the batch: the gap below an event is part of its span, as the grid's row gap is 0.
        _getRowsWrite({ target, borderBoxSize }) {
            const gap = parseFloat(getComputedStyle(target.parentElement).columnGap) || 0;
            const rows = String(Math.ceil(borderBoxSize[0].blockSize + gap));
            if (target.style.getPropertyValue('--_calendar-rows') !== rows) return () => target.style.setProperty('--_calendar-rows', rows);
        }

        // The week, or the month in the calendar's calendar, that holds date.
        _getRange(date, view) {
            const el = this._element;
            if (view !== 'month') {
                const start = NDS.Date.getStartOfWeek(date, NDS.Date.getWeekStart(el));
                return { start, end: addDays(start, 6) };
            }
            const calendar = NDS.Date.getCalendar(el);
            const { year, month } = NDS.Date.toParts(date, calendar);
            const start = NDS.Date.fromParts({ year, month, day: 1 }, calendar);
            return { start, end: addDays(start, NDS.Date.getMonthLength({ year, month }, calendar) - 1) };
        }

        // What a view switch keeps in view: the picked day, else today when shown, else the first day.
        _getAnchor() {
            const today = NDS.Date.getToday();
            return this._day || (today >= this._start && today <= this._end ? today : this._start);
        }

        // From the hooks. `first` is create(): it always syncs, and fires no change.
        _readState(first) {
            const el = this._element;
            const day = toDay(el.dataset.day);
            const date = toDay(el.dataset.date);
            let view = VIEWS.includes(el.dataset.view) ? el.dataset.view : 'grid';
            let anchor;
            if (first) {
                // The date and view the page opens on without ?date= and ?view=: they drop the keys.
                const params = new URLSearchParams(location.search);
                this._openingDate = date || NDS.Date.getToday();
                this._openingView = view;
                anchor = day || toDay(params.get(this._getParamName('date'))) || this._openingDate;
                const paramView = params.get(this._getParamName('view'));
                if (VIEWS.includes(paramView)) view = paramView;
            } else {
                // A host that writes a date outside the shown range moves there, and a picked day outside it drops.
                const isNewRange = date && !isSameDay(this._getRange(date, this._view).start, this._start);
                anchor = isNewRange ? date : day || this._getAnchor();
            }
            this._setState(anchor, view, day, first);
        }

        _setState(anchor, view, day, first) {
            const { start, end } = this._getRange(anchor, view);
            // A picked day outside the range drops: the range wins.
            if (day && (day < start || day > end)) day = null;
            const changed = !isSameDay(start, this._start) || view !== this._view || !isSameDay(day, this._day);
            if (!changed && !first) return false;
            this._start = start;
            this._end = end;
            this._view = view;
            this._day = day;
            this._sync();
            if (!first) {
                this._writeParams();
                this._dispatchChange();
            }
            return changed;
        }

        // Always on, as Filter: data-date-param and data-view-param only rename the keys.
        _getParamName(key) {
            return this._element.getAttribute('data-' + key + '-param') || key;
        }

        _writeParams() {
            const params = new URLSearchParams(location.search);
            const dateName = this._getParamName('date');
            const viewName = this._getParamName('view');
            if (this._openingDate >= this._start && this._openingDate <= this._end) params.delete(dateName);
            else params.set(dateName, getIso(this._start));
            if (this._view === this._openingView) params.delete(viewName);
            else params.set(viewName, this._view);
            NDS.writeUrlParams(params);
        }

        _sync() {
            const el = this._element;
            const calendar = NDS.Date.getCalendar(el);
            const second = el.getAttribute('data-calendar-second');
            const secondCalendar = second && second !== calendar ? second : null;
            const lang = getLang(el);
            const isMonth = this._view === 'month';
            // Written only when it differs: each write reaches the hooks' observer.
            const state = { date: getIso(this._start), view: this._view, day: this._day && getIso(this._day) };
            for (const key in state) {
                if (!state[key]) el.removeAttribute('data-' + key);
                else if (el.dataset[key] !== state[key]) el.dataset[key] = state[key];
            }

            const title = el.querySelector('.nds-calendar-title');
            if (title) {
                title.textContent = this._getTitle(calendar, lang, isMonth);
                if (secondCalendar) {
                    const sub = document.createElement('span');
                    sub.className = 'nds-calendar-title-second';
                    sub.textContent = this._getTitle(secondCalendar, lang, false);
                    title.append(sub);
                }
            }

            el.querySelectorAll('[data-calendar-action="prev"], [data-calendar-action="next"]').forEach((btn) => {
                const keys = STEP_LABELS[btn.dataset.calendarAction];
                const key = keys[isMonth ? 'month' : 'week'];
                // Only the canon's words: a label of the page's own stays.
                const mark = btn.getAttribute('data-i18n-aria-label');
                if ((mark === 'calendar.' + keys.week || mark === 'calendar.' + keys.month) && mark !== 'calendar.' + key) strings.set(btn, 'aria-label', key);
            });

            // A month shows whole weeks, from the week that holds its first day.
            const gridStart = NDS.Date.getStartOfWeek(this._start, NDS.Date.getWeekStart(el));
            this._dayCount = isMonth ? Math.ceil((getDayCount(gridStart, this._end) + 1) / 7) * 7 : 7;
            // From the grid itself: a data-week-start changed since it was read cannot misname a day.
            const names = NDS.Date.getWeekdayNames(lang, gridStart.getDay());
            this._weekdays.forEach((head, i) => {
                const [name, initial] = head.children;
                name.textContent = names[i];
                initial.textContent = NDS.Date.format(addDays(gridStart, i), { locale: lang, weekday: 'narrow' });
            });
            const counts = new Map();
            for (const { item, day } of this._events) {
                if (day && !item.hasAttribute('data-filtered')) counts.set(+day, (counts.get(+day) || 0) + 1);
            }
            const today = NDS.Date.getToday();
            this._dayButtons.forEach((btn, i) => {
                btn.hidden = i >= this._dayCount;
                if (btn.hidden) return;
                const date = addDays(gridStart, i);
                const picked = isSameDay(date, this._day);
                const count = counts.get(+date) || 0;
                const [name, initial, number, second, dot] = btn.children;
                name.textContent = names[i % 7];
                initial.textContent = this._weekdays[i % 7].lastChild.textContent;
                number.textContent = NDS.Date.toParts(date, calendar).day;
                second.hidden = !secondCalendar;
                second.textContent = secondCalendar ? NDS.Date.toParts(date, secondCalendar).day : '';
                dot.hidden = !count;
                btn.setAttribute('aria-description', NDS.Date.getDayLabel(date, { calendar, locale: lang })
                    + (secondCalendar ? ', ' + NDS.Date.format(date, { calendar: secondCalendar, locale: lang, format: 'D MMMM YYYY', era: true }) : '')
                    + (count ? ', ' + strings.text('events', { n: count }, lang) : ''));
                // The bar marks a day in a row of seven; a month's grid shows the pick by its fill.
                btn.classList.toggle('nds-indicator', !isMonth);
                NDS.aria.pressed(btn, picked);
                NDS.state[picked ? 'add' : 'remove'](btn, 'selected');
                NDS.state[date < this._start || date > this._end ? 'add' : 'remove'](btn, 'other-month');
                NDS.aria.current(btn, isSameDay(date, today) ? 'date' : null);
            });
            // One Tab stop for the days, as the Date Picker's grid: the picked day, else today, else the first.
            const shown = this._dayButtons.slice(0, this._dayCount);
            const stop = shown.find((btn) => NDS.state.has(btn, 'selected'))
                || shown.find((btn) => btn.hasAttribute('aria-current')) || shown[0];
            this._dayButtons.forEach((btn) => { btn.tabIndex = btn === stop ? 0 : -1; });

            this._syncViewButtons();

            for (const { item, day } of this._events) {
                const offset = day ? getDayCount(gridStart, day) : -1;
                const isInRange = day && day >= this._start && day <= this._end;
                if (isInRange && (!this._day || isSameDay(day, this._day))) item.setAttribute('data-calendar-day', offset % 7);
                else item.removeAttribute('data-calendar-day');
            }
            this._fillTiles(calendar, lang);
            this._syncEmpty();
        }

        _syncViewButtons() {
            const pressed = this._view === 'grid' && this._isNarrow ? 'rows' : this._view;
            this._element.querySelectorAll('[data-calendar-view]').forEach((btn) => {
                const current = btn.dataset.calendarView === pressed;
                NDS.aria.pressed(btn, current);
                NDS.state[current ? 'add' : 'remove'](btn, 'selected');
            });
        }

        // Each event's Date Tile in the calendar's calendar and language, from its datetime. Once per
        // events, calendar and language.
        _fillTiles(calendar, lang) {
            const key = calendar + ' ' + lang;
            if (this._tilesKey === key) return;
            this._tilesKey = key;
            for (const { tile } of this._events) {
                if (tile) NDS.Date.fillTile(tile, { calendar, locale: lang });
            }
        }

        _setLoading(on) {
            this._loading = on;
            this._syncEmpty();
            if (!on && this._announcePending) this._announce();
        }

        _syncEmpty() {
            const shown = this._loading || this._events.some(isShown);
            NDS.state[shown ? 'remove' : 'add'](this._element, 'empty');
        }

        // The month: "October 2026". A week, or a month in the second calendar: "18 – 24 Oct 2026";
        // the start names its month or year only when it differs from the end's.
        _getTitle(calendar, lang, isMonth) {
            if (isMonth) return NDS.Date.format(this._start, { calendar, locale: lang, format: 'MMMM YYYY', era: true });
            const start = NDS.Date.toParts(this._start, calendar);
            const end = NDS.Date.toParts(this._end, calendar);
            const startFormat = start.year !== end.year ? 'D MMM YYYY' : start.month !== end.month ? 'D MMM' : 'D';
            return NDS.Date.format(this._start, { calendar, locale: lang, format: startFormat })
                + ' – ' + NDS.Date.format(this._end, { calendar, locale: lang, format: 'D MMM YYYY', era: true });
        }

        // Arrows move along the days (in reading order, so Left is the next day in RTL), Up and Down
        // a week in the month, Home and End to the ends.
        _handleDayKey(e) {
            const index = this._dayButtons.indexOf(e.target);
            if (index < 0) return;
            const step = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
            const last = this._dayCount - 1;
            let target;
            if (step) target = (index + (getComputedStyle(e.target).direction === 'rtl' ? -step : step) + last + 1) % (last + 1);
            else if (this._view === 'month' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) target = Math.min(last, Math.max(0, index + (e.key === 'ArrowUp' ? -7 : 7)));
            else if (e.key === 'Home') target = 0;
            else if (e.key === 'End') target = last;
            else return;
            e.preventDefault();
            this._dayButtons.forEach((btn, i) => { btn.tabIndex = i === target ? 0 : -1; });
            this._dayButtons[target].focus();
        }

        _handleClick(e) {
            const target = e.target.closest('[data-calendar-action], [data-calendar-view], .nds-calendar-day');
            if (!target || target.closest(SELECTOR) !== this._element) return;
            const index = this._dayButtons.indexOf(target);
            let moved = false;
            if (index > -1) {
                const date = addDays(NDS.Date.getStartOfWeek(this._start, NDS.Date.getWeekStart(this._element)), index);
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

        // "Thursday 22 October 2026: 3 events", or the week's dates, or the month. Waits while the list loads.
        _sayChange() {
            if (!this._announcePending || this._loading) return;
            this._announcePending = false;
            const el = this._element;
            const lang = getLang(el);
            const calendar = NDS.Date.getCalendar(el);
            const count = this._events.filter(isShown).length;
            const label = this._day ? NDS.Date.getDayLabel(this._day, { calendar, locale: lang }) : this._getTitle(calendar, lang, this._view === 'month');
            // An empty week says the page's own message, so the words fit what the calendar holds.
            const empty = el.querySelector('.nds-calendar-empty')?.textContent.trim();
            NDS.announce(label + ': ' + (count || !empty ? strings.text('events', { n: count }, lang) : empty));
        }

        _dispatchChange() {
            this._element.dispatchEvent(new CustomEvent('nds:calendar:change', {
                bubbles: true,
                detail: { start: getIso(this._start), end: getIso(this._end), view: this._view, day: this._day ? getIso(this._day) : null }
            }));
        }

        goTo(date) {
            const day = toDay(date);
            return !!day && this._setState(day, this._view, null);
        }

        next() { return this.goTo(addDays(this._end, 1)); }

        prev() { return this.goTo(addDays(this._start, -1)); }

        setView(view) {
            return VIEWS.includes(view) && this._setState(this._getAnchor(), view, this._day);
        }

        setDay(date) {
            const day = toDay(date);
            if (date != null && !day) return false;
            return this._setState(day || this._start, this._view, day);
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
            this._offWidth();
            this._weekdays.forEach((head) => head.remove());
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
