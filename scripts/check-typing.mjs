// Typing patterns: what a shaped field does to real keys. Each pattern below mounts its fields in a
// built page and runs two kinds of check, in Chromium or WebKit:
//
//   CASES      a written case: start value, keys, expected value — one line each
//   ROUNDTRIP  generated: for each listed value, every span is deleted (Backspace) and typed back, once
//              as deleted and once as its digits alone (not for a field in noDigits); the field must
//              come back to the value
//   INITIAL    the value a field holds once built, from the value its markup ships (initial)
//   SUBMIT     what new FormData(form) sends for a field showing a value (submit)
//   EVENTS     keys typed into an empty field: the nds:phone:change count and the last detail (events)
//   MESSAGES   keys typed into an empty field and the field left: the message it shows (messages)
//   VALIDITY   keys typed into an empty field: its validationMessage, '' when valid (validity)
//   prepare / ready: a function a pattern runs in each page before its fields mount / once they are built
//   FUZZ       generated: random typing, pastes and Backspace on each field in limits ([most digits,
//              each other character as often as it may appear]); the field must stay inside them. FUZZ=<runs per
//              field, default 60>, SEED=<n> repeats a run
//
// Case notation: `|` is the caret and `[…]` a selection in `from`; `|` in `want` checks the caret too.
// Keys are typed as text, and `{Name}` presses a key: '{Backspace}05'. `{Paste:text}` pastes text as the browser
// does (beforeinput, insert, input as insertFromPaste; never the clipboard: it is the machine's, and the
// parallel pages would share it). `{Blur}` leaves the field, and `{Insert:text}` sends text as one insert,
// as a phone keyboard or dictation does. `{Compose:a|ab}` composes a word step by step and commits it, as
// an Android keyboard does (WebKit, with no IME to drive, sends the word as one insert). A new pattern is one more
// PATTERNS entry: the field markup, its instance property, cases and round-trip values.
//
//   node scripts/check-typing.mjs [pattern …]     ENGINE=webkit · PAGES=<parallel pages, default 4>
// Needs the dev server on :4002 (SITE=<base url> for another).
import { launch, log, step, cdp, ENGINE } from './lib/browser.mjs';

const SITE = (process.env.SITE || 'http://localhost:4002/NDS-vanilla/').replace(/\/?$/, '/');
const PAGES = +process.env.PAGES || 4;

const dateField = (format, extra = '') => `<div class="nds-form-container nds-date-picker${extra ? ' ' + extra : ''}" data-format="${format}">
  <div class="nds-form-control"><input type="text" class="nds-input nds-date-input" placeholder="${format}"></div></div>`;
const timeField = (format) => `<div class="nds-form-container nds-time-picker" data-format="${format}">
  <div class="nds-form-control"><input type="text" class="nds-input nds-time-input" placeholder="${format}"></div></div>`;

// A Form field: phone and IBAN shape through Forms, with no instance to wait for. kind: its container's class.
const formField = (kind, input, extra = '') => `<div class="nds-form-container nds-formatted"${kind === 'formatted' ? '' : ` data-format="${kind}"`}${extra}>
  <div class="nds-form-control">${input}</div></div>`;

const PATTERNS = {
    date: {
        instance: 'ndsDatePicker',
        fields: {
            dmy: dateField('DD/MM/YYYY'), iso: dateField('YYYY-MM-DD'), month: dateField('MM/YYYY'), year: dateField('YYYY'),
            short: dateField('D/M/YYYY'), mshort: dateField('M/YYYY'),
            readonly: dateField('DD/MM/YYYY').replace('<input', '<input readonly'),
            gregory: dateField('DD/MM/YYYY').replace('nds-date-picker"', 'nds-date-picker" data-calendar="gregory"'),
            hijri: dateField('DD/MM/YYYY').replace('nds-date-picker"', 'nds-date-picker" data-calendar="hijri"'),
            served: dateField('DD/MM/YYYY').replace('<input', '<input value="15/09/1447"'),
            servedHijri: dateField('DD/MM/YYYY').replace('nds-date-picker"', 'nds-date-picker" data-calendar="hijri"').replace('<input', '<input value="04/03/2026"'),
            servedIso: dateField('DD/MM/YYYY').replace('<input', '<input value="2026-03-04"'), dots: dateField('DD.MM.YY'), range: dateField('DD/MM/YYYY', 'nds-date-range'),
        },
        cases: [
            // At the end: the format's shape.
            ['dmy', '', '28051983', '28/05/1983|'],
            ['dmy', '', '28', '28/|'],
            ['dmy', '', '4', '04/|'],
            ['dmy', '', '4/5/', '04/05/|'],
            ['dmy', '', '32', '3|'],
            ['dmy', '', '2813', '28/1|'],
            ['dmy', '', '2x8', '02/08/|'],
            ['dmy', '', '٢٨٠٥١٩٨٣', '28/05/1983|'],
            ['iso', '', '19830528', '1983-05-28|'],
            ['range', '', '0103202615032026', '01/03/2026 - 15/03/2026|'],
            ['month', '', '52026', '05/2026|'],
            ['year', '', '2026', '2026|'],
            ['short', '', '9', '9/|'],
            ['dots', '', '280583', '28.05.83|'],
            // Inside a whole date: type-over.
            ['dmy', '|28/05/1983', '1', '1|8/05/1983'],
            ['dmy', '|28/05/1983', '15', '15/|05/1983'],
            ['dmy', '28/|05/1983', '07', '28/07/|1983'],
            ['dmy', '28/|05/1983', '9', '28/09/|1983'],
            ['dmy', '|28/05/1983', '3', '3|0/05/1983'],
            ['dmy', '28/1|2/1983', '3', '28/1|2/1983'],
            ['dmy', '28/05/|1983', '2026', '28/05/2026|'],
            ['dmy', '28|/05/1983', '07', '28/07/1983'],
            ['dmy', '28/[05]/1983', '11', '28/11/1983'],
            ['dmy', '28/05/19[83]', '4', '28/05/194|'],
            ['range', '01/03/2026 - 1|5/03/2026', '2', '01/03/2026 - 12/|03/2026'],
            ['short', '9/|5/2026', '7', '9/7/|2026'],
            ['short', '1|/5/2026', '5', '15/|5/2026'],
            // Inside a date an edit broke: insert.
            ['dmy', '2|/1983', '805', '28/05|/1983'],
            ['dmy', '2|/1983', '8/05/', '28/05/|1983'],
            ['dmy', '28/05|1983', '/', '28/05/|1983'],
            ['dmy', '01/|3/2026', '0', '01/0|3/2026'],
            ['dmy', '01/|3/2026', '1', '01/|3/2026'],
            ['dmy', '|8/05/1983', '2', '2|8/05/1983'],
            ['dmy', '3|/05/2026', '7', '3|/05/2026'],
            ['dmy', '2/1983|', '4', '2/19834|'],
            ['range', '01/03/2026 - 1|/03/2026', '5', '01/03/2026 - 15|/03/2026'],
            ['dmy', '28/05/1983', '{Backspace}', '28/05/198|'],
            // Found by the adversarial pass (2026-10-22).
            ['readonly', '|15/06/2026', '2', '15/06/2026'],
            ['readonly', '28/0|', '7', '28/0'],
            ['short', '|9/5/2026', '12', '12/|5/2026'],
            ['short', '|1/5/2026', '12', '12/|5/2026'],
            ['short', '9/|5/2026', '11', '9/11/|2026'],
            ['short', '|9/5/2026', '1', '1|9/5/2026'],
            ['short', '|9/5/2026', '4', '4/|5/2026'],
            ['short', '9/5/2026|', '7', '9/5/2026|'],
            ['short', '9/5/20|26', '30', '9/5/2030|'],
            ['mshort', '|5/2026', '11', '11/|2026'],
            ['mshort', '5/2026|', '7', '5/2026|'],
            ['dmy', '٢٨/|٠٥/١٩٨٣', '7', '28/07/|1983'],
            ['dmy', '28/|٠٥/1983', '7', '28/07/|1983'],
            ['dmy', '2|/1983', 'D', '2|/1983'],
            // Never more than the format holds (2026-10-22: "55/58/198355/58/1983" got in).
            ['dmy', '55/58/1983|', '7', '55/58/1983|'],
            ['dmy', '55/58/1983|', '/', '55/58/1983|'],
            ['dmy', '2/1983|', 'x', '2/1983|'],
            ['dmy', '5|/58/1983', '5', '5|/58/1983'],
            ['dmy', '28/05/1983|', '{Paste:28/05/1983}', '28/05/1983'],
            ['dmy', '55/58/1983|', '{Paste:28/05/1983}', '28/05/1983'],
            ['range', '01/03/2026 - 15/03/2026|', '{Paste:01/03/2026 - 15/03/2026}', '01/03/2026 - 15/03/2026'],
            // A paste that is not a date goes in as if typed (2026-10-22: "55-58-198355-58-1983" got in by paste).
            ['dmy', '', '{Paste:55-58-1983}{Paste:55-58-1983}', '05/05/5819|'],
            ['dmy', '', '{Paste:hello}', ''],
            ['dmy', '', '{Paste:28/05}', '28/05/|'],
            ['dmy', '28/05/1983|', '{Paste:55-58-1983}', '28/05/1983|'],
            // A set data-calendar keeps its calendar: a date in the other one is converted when the user leaves
            // the field, typed or pasted, never switching the field.
            ['gregory', '', '{Paste:15/09/1447}', '15/09/1447|'],
            ['gregory', '', '{Paste:15/09/1447}{Blur}', '04/03/2026'],
            ['gregory', '', '{Paste:1447-09-15}{Blur}', '04/03/2026'],
            ['gregory', '', '15091447{Blur}', '04/03/2026'],
            ['gregory', '', '{Paste:04/03/2026}', '04/03/2026'],
            ['hijri', '', '{Paste:04/03/2026}{Blur}', '15/09/1447'],
            ['hijri', '', '{Paste:2026-03-04T09:00}{Blur}', '15/09/1447'],
            ['hijri', '', '{Paste:15/09/1447 هـ}', '15/09/1447'],
            ['hijri', '', '04032026{Blur}', '15/09/1447'],
            ['dmy', '', '{Paste:15/09/1447}{Blur}', '04/03/2026'],
            // Both Arabic digit sets: Arabic-Indic (U+0660) and Persian / Urdu (U+06F0).
            ['dmy', '', '۲۸۰۵۱۹۸۳', '28/05/1983|'],
            ['dmy', '28/|05/1983', '۰۷', '28/07/|1983'],
            ['dmy', '۲۸/|۰۵/۱۹۸۳', '٧', '28/07/|1983'],
            ['dmy', '2|/1983', '۸۰۵', '28/05|/1983'],
            ['dmy', '', '{Paste:۲۸/۰۵/۱۹۸۳}', '28/05/1983'],
            ['dmy', '', '{Paste:٢٨-۰۵-١٩٨٣}', '28/05/1983'],
            ['dmy', '', '01010500{Blur}', '01/01/0500'],
            ['dmy', '|28/05/1983', '{Insert:15/07/2000}', '15/07/2000|'],
            ['dmy', '', '{Compose:2|28|280|2805}', '28/05/|'],
            ['dmy', '|28/05/198', '1', '|28/05/198'],
            ['iso', '|1983-05-2', '8', '|1983-05-2'],
            // Paste, and a typed date read when the field is left: written another common way → the format.
            ['dmy', '', '{Paste:28/05/1983}', '28/05/1983'],
            ['dmy', '', '{Paste:28051983}', '28/05/1983'],
            ['dmy', '', '{Paste:٢٨/٠٥/١٩٨٣}', '28/05/1983'],
            ['dmy', '', '{Paste: 28-5-1983 }', '28/05/1983'],
            ['dmy', '', '{Paste:28.05.1983}', '28/05/1983'],
            ['dmy', '', '{Paste:1983-05-28}', '28/05/1983'],
            ['dmy', '', '{Paste:1983-05-28T10:30:00Z}', '28/05/1983'],
            ['dmy', '', '{Paste:05/28/1983}', '28/05/1983'],
            ['dmy', '', '{Paste:05/06/2026}', '05/06/2026'],
            ['dmy', '', '{Paste:15/09/1447 هـ}{Blur}', '04/03/2026'],
            ['dmy', '', '{Paste:31/02/2026}', '31/02/2026'],
            ['dmy', '', '{Paste:28/05/83}', '28/05/83'],
            ['dmy', '', '{Paste:28/05/1983 extra}', '28/05/1983|'],
            ['dmy', '28/[05]/1983', '{Paste:07}', '28/07/1983'],
            ['dmy', '28/[05]/1983', '{Backspace}5{Blur}', '28/05/1983'],
            ['iso', '', '{Paste:28/05/1983}', '1983-05-28'],
            ['short', '', '{Paste:09/05/2026}', '9/5/2026'],
            ['dots', '', '{Paste:28/05/2083}', '28.05.83'],
            ['month', '', '{Paste:2026-05}', '05/2026'],
            ['year', '', '{Paste:2026}', '2026'],
            ['range', '', '{Paste:2026-03-01 - 2026-03-15}', '01/03/2026 - 15/03/2026'],
            ['range', '', '{Paste:1/3/2026 to 15/3/2026}', '01/03/2026 - 15/03/2026'],
        ],
        roundTrip: {
            dmy: ['28/05/1983', '01/01/2000', '31/12/2026', '10/10/1010'],
            iso: ['1983-05-28', '2026-12-31'],
            month: ['05/2026', '12/1999'],
            year: ['2026'],
            dots: ['28.05.83', '01.10.20'],
            short: ['9/5/2026', '19/11/2026'],
            range: ['01/03/2026 - 15/03/2026'],
        },
        noDigits: ['short'],   // 1911 is 19/11 or 1/9/11: an open-width format needs its separators
        // A value the page ships takes the field's format and calendar (data-calendar, else Gregorian) when it builds.
        initial: { served: '04/03/2026', servedHijri: '15/09/1447', servedIso: '04/03/2026' },
        // Keys, then the field left: the message it shows ('' none). A converted date names the one the user wrote.
        messages: [['gregory', '{Paste:15/09/1447}{Blur}', 'Converted from the Hijri date 15/09/1447'],
            ['hijri', '04032026{Blur}', 'Converted from the Gregorian date 04/03/2026'],
            ['range', '{Paste:1/9/1447 - 15/9/1447}{Blur}', 'Converted from the Hijri date 01/09/1447 - 15/09/1447'],
            ['gregory', '{Paste:04/03/2026}{Blur}', ''], ['dmy', '{Paste:1983-05-28}{Blur}', '']],
        limits: {
            dmy: [8, '//'], iso: [8, '--'], month: [6, '/'], year: [4, ''], short: [8, '//'], mshort: [6, '/'],
            dots: [6, '..'], range: [16, '//// - ////'],
        },
    },
    time: {
        instance: 'ndsTimePicker',
        fields: {
            h24: timeField('HH:mm'), h12: timeField('hh:mm A'), secs: timeField('HH:mm:ss'), open: timeField('H:mm'),
            readonly: timeField('HH:mm').replace('<input', '<input readonly'),
        },
        cases: [
            ['h24', '', '1430', '14:30|'],
            ['h24', '', '9', '09:|'],
            ['h24', '', '2:', '02:|'],
            ['h24', '', '25', '2|'],
            ['h24', '', '٠٩٣٠', '09:30|'],
            ['h24', '', '۱۴۳۰', '14:30|'],
            ['h12', '', '0230p', '02:30 PM|'],
            ['h12', '', '{Compose:0230|0230p}', '02:30 PM|'],
            ['h12', '', '13', '1|'],
            ['secs', '', '143005', '14:30:05|'],
            ['h24', '|14:30', '0', '0|4:30'],
            ['h24', '14:|30', '45', '14:45|'],
            ['h24', '|14:30', '9', '09:|30'],
            ['h12', '02:30 |AM', 'p', '02:30 |PM'],
            // The date picker's fixes, in time (2026-10-22).
            ['readonly', '|14:30', '2', '14:30'],
            ['h24', '10:|3', '0', '10:0|3'],
            ['h24', '1|:30', '4', '14|:30'],
            ['h24', '|14:30', '{Insert:09:45}', '09:45|'],
            ['h24', '١٤:|٣٠', '4', '14:4|0'],
            ['h24', '1|:30', 'H', '1|:30'],
            ['open', '', '9', '9:|'],
            ['open', '|9:30', '12', '12:|30'],
            ['open', '|9:30', '4', '4:|30'],
            ['open', '9:30|', '5', '9:30|'],
            ['h24', '', '{Paste:2:30 PM}', '14:30'],
            ['h24', '75:99|', '1', '75:99|'],
            ['h24', '7|:99', '5', '7|:99'],
            ['h24', '10:3|', '05', '10:30|'],
            ['h24', '14:30|', '{Paste:09:15}', '09:15'],
            ['h24', '75:99|', '{Paste:09:15}', '09:15'],
            ['h24', '', '{Paste:75-99-75-99}{Paste:75-99}', '07:05|'],
            ['h24', '14:30|', '{Paste:7599}', '14:30|'],
            ['h24', '', '{Paste:۱۴:۳۰}', '14:30'],
            ['h12', '', '{Paste:٢:٣٠ م}', '02:30 PM'],
        ],
        roundTrip: { h24: ['14:30', '09:05', '23:59'], secs: ['14:30:05'], h12: ['02:30 PM', '11:05 AM'], open: ['9:30', '19:05'] },
        noDigits: ['open'],
        limits: { h24: [4, ':'], h12: [4, ': AMP'], secs: [6, '::'], open: [4, ':'] },
    },
    group: {
        instance: null,
        fields: {
            // maxlength as old markup wrote it: the groups must still fit.
            iban: formField('iban', '<input type="text" class="nds-input" maxlength="34">'),
            phone: formField('phone', '<div class="nds-form-action nds-prefix"><input type="hidden" value="+966"></div><input type="tel" class="nds-input" inputmode="numeric" maxlength="9">', ' data-groups="00 000 0000"'),
            // No country code: the number as typed, its 0 kept, up to maxlength (free: up to 15).
            plain: formField('phone', '<input type="tel" class="nds-input" inputmode="numeric" maxlength="10">'),
            free: formField('phone', '<input type="tel" class="nds-input" inputmode="numeric">'),
            // A picker on Saudi Arabia that also lists the UAE: a pasted UAE number picks it.
            world: formField('phone', `<div class="nds-form-action nds-prefix nds-dropmenu" data-select-name="country-code" data-select-value="+966">
  <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger"><span class="nds-label">+966</span></button>
  <div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">
    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+966" data-trigger-label="+966" data-groups="00 000 0000"><span class="nds-label">SA</span></button>
    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+971" data-trigger-label="+971"><span class="nds-label">AE</span></button>
  </div></div></div><input type="tel" class="nds-input" inputmode="numeric">`),
            // A fixed code in the prefix, and a picker on Italy, whose numbers keep their 0.
            saudi: formField('phone', '<div class="nds-form-action nds-prefix"><span class="nds-btn nds-subtle"><span class="nds-label">+966</span></span><input type="hidden" name="country-code" value="+966"></div><input type="tel" class="nds-input" inputmode="numeric">', ' data-groups="00 000 0000"'),
            italy: formField('phone', `<div class="nds-form-action nds-prefix nds-dropmenu" data-select-name="country-code" data-select-value="+39">
  <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger"><span class="nds-label">+39</span></button>
  <div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">
    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+966" data-trigger-label="+966" data-groups="00 000 0000"><span class="nds-label">SA</span></button>
    <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+39" data-trigger-label="+39"><span class="nds-label">IT</span></button>
  </div></div></div><input type="tel" class="nds-input" inputmode="numeric">`),
            // .nds-formatted: the author's slots: digits only, capitals then digits, small letters, either as typed.
            border: formField('formatted', '<input type="text" class="nds-input">', ' data-format="0 000 000 000"'),
            plate: formField('formatted', '<input type="text" class="nds-input">', ' data-format="AA-0000"'),
            small: formField('formatted', '<input type="text" class="nds-input">', ' data-format="aa-**"'),
            // A Saudi plate: three Arabic letters, four digits.
            arabic: formField('formatted', '<input type="text" class="nds-input">', ' data-format="ححح 0000"'),
            // data-format="plate": a Saudi plate in its input's lang, a car's or a motorcycle's.
            plateEn: formField('plate', '<input type="text" class="nds-input" lang="en" maxlength="7">'),
            plateAr: formField('plate', '<input type="text" class="nds-input" lang="ar">'),
            plateMoto: formField('plate', '<input type="text" class="nds-input" lang="en">', ' data-vehicle="motorcycle"'),
            // A saved value, as a server writes it back: shaped at load in the field's letters.
            // No lang: the first letter typed picks the script.
            plateAuto: formField('plate', '<input type="text" class="nds-input">'),
            card: formField('formatted', '<input type="text" class="nds-input" inputmode="numeric">', ' data-format="card"'),
            cardLate: formField('formatted', '<input type="text" class="nds-input" value="4111111111111111">', ' data-format="late-card"'),
            plateSubmitAr: formField('plate', '<input type="text" class="nds-input" lang="en">', ' data-submit="arabic"'),
            plateServedAr: formField('plate', '<input type="text" class="nds-input" lang="ar" value="ABJ1234">'),
            plateServedEn: formField('plate', '<input type="text" class="nds-input" lang="en" value="أبح١٢٣٤">'),
        },
        // A named format: 'card' added before the fields mount, 'late-card' after (a script that loads late).
        prepare: () => NDS.FormattedInput.addFormat('card', {
            format: '0000 0000 0000 0000',
            check: (value) => [...value].reverse().reduce((sum, char, i) => sum + (i % 2 ? (2 * char > 9 ? 2 * char - 9 : 2 * char) : +char), 0) % 10 === 0,
            message: 'Check the card number',
        }),
        ready: () => NDS.FormattedInput.addFormat('late-card', { format: '0000 0000 0000 0000' }),
        validity: [['card', '4111111111111111', ''], ['card', '4111111111111112', 'Check the card number'], ['card', '4111', 'Incomplete value']],
        initial: { cardLate: '4111 1111 1111 1111', plateServedAr: 'أ ب ح ١٢٣٤', plateServedEn: 'ABJ 1234' },
        cases: [
            ['iban', '', 'sa0380000000608010167519', 'SA03 8000 0000 6080 1016 7519|'],
            ['iban', '', '0380000000608010167519', 'SA03 8000 0000 6080 1016 7519|'],
            ['iban', '', '{Paste:SA03 8000 0000 6080 1016 7519}', 'SA03 8000 0000 6080 1016 7519|'],
            ['iban', '', '{Paste:sa03-8000-0000-6080-1016-7519}', 'SA03 8000 0000 6080 1016 7519|'],
            ['iban', 'SA03 80|00', '1', 'SA03 801|0 0'],
            // A composed word is shaped once it commits: rewritten mid-word, Android doubled it ("SSAS A0…").
            ['iban', '', '{Compose:s|sa|sa0|sa03}', 'SA03|'],
            ['iban', 'SA03|', '{Compose:8|80|800|8000}', 'SA03 8000|'],
            ['iban', '', '{Compose:8|80|800|8000}', 'SA80 00|'],
            ['phone', '', '{Compose:0|05|055}', '55|'],
            ['iban', '[SA]03 8000', '{Backspace}', '|0380 00'],
            ['iban', 'SA03 |8000', '{Backspace}', 'SA0|8 000'],
            ['iban', 'SA03| 8000', '{Delete}', 'SA03 |000'],
            // Letters only in the country: a Saudi IBAN is 22 digits after SA, another country's up to 34 characters.
            ['iban', '', '1234567890123456789012345678901234567890', 'SA12 3456 7890 1234 5678 9012|'],
            ['iban', '', 'SA03X8000', 'SA03 8000|'],
            ['iban', '', 'gb29nwbk60161331926819', 'GB29 NWBK 6016 1331 9268 19|'],
            ['iban', '', 'GB1234567890123456789012345678901234567890', 'GB12 3456 7890 1234 5678 9012 3456 7890 12|'],
            ['border', '', '3a000٠٠٠0000999', '3 000 000 000|'],
            ['border', '', '{Paste:3-000-000-000}', '3 000 000 000'],
            ['border', '3 000 |000', '{Backspace}', '3 00|0 00'],
            // Characters already there are kept when a delete moves letters onto digit slots.
            ['iban', '[GB29 ]NWBK 6016', '{Backspace}', '|NWBK 6016'],
            ['plate', '[AB-]1234', '{Backspace}', '|12-34'],
            ['iban', 'SA03 8000|', 'X', 'SA03 8000|'],
            ['plate', '', 'ab1234', 'AB-1234|'],
            ['plate', '', '1ab', 'AB|'],
            ['small', '', 'ABcD', 'ab-cD|'],
            ['arabic', '', 'أبج1234', 'أبج 1234|'],
            ['arabic', '', 'أبج١٢٣٤', 'أبج 1234|'],
            ['arabic', '', 'ab1أبج', 'أبج|'],
            // An Arabic letter is not a separator: a backspace takes it alone.
            ['arabic', 'أبج| 1234', '{Backspace}', 'أب|1 234'],
            ['arabic', 'أبج |1234', '{Backspace}', 'أب|1 234'],
            ['arabic', 'أ|بج 1234', '{Backspace}', '|بج1 234'],
            // A plate: its 17 letters in either script, letters before digits, as many as the vehicle has.
            ['plateEn', '', 'abj1234', 'ABJ 1234|'],
            ['plateEn', '', 'أبح1234', 'ABJ 1234|'],
            ['plateEn', '', 'abjk12345', 'ABJ 1234|'],
            ['plateEn', '', 'cfi', '|'],
            ['plateEn', '', '1a', 'A| 1'],
            ['plateEn', '', '{Paste:1234 ABJ}', 'ABJ 1234'],
            ['plateEn', 'AB| 1234', '{Backspace}', 'A| 1234'],
            ['plateEn', 'AB |1234', '{Backspace}', 'A| 1234'],
            ['plateAr', '', 'أبح1234', 'أ ب ح ١٢٣٤|'],
            ['plateAr', '', 'abj١٢٣٤', 'أ ب ح ١٢٣٤|'],
            ['plateAr', '', 'اي1', 'أ ى ١|'],
            ['plateAr', '', 'ه1', 'هـ ١|'],
            ['plateAr', 'هـ| ١', '{Backspace}', '|١'],
            ['plateAr', 'أ ب| ١', '{Backspace}', 'أ| ١'],
            // Arabic digits are digits, not separators: a backspace takes one.
            ['plateAr', 'أ ب ح ١٢|٣٤', '{Backspace}', 'أ ب ح ١|٣٤'],
            ['plateAr', 'أ |ب', '{Backspace}', '|ب'],
            ['plateMoto', '', 'abj12345', 'AB 123|'],
            ['plateAuto', '', 'أب1', 'أ ب ١|'],
            ['plateAuto', '', 'ab1', 'AB 1|'],
            ['plateAuto', '', '1أ', 'أ| ١'],
            ['plateAuto', '', 'aب', 'AB|'],
            ['card', '', '4111111111111111', '4111 1111 1111 1111|'],
            ['card', '', '{Paste:4111-1111-1111-1111}', '4111 1111 1111 1111'],
            // A separator the user types after the last character stays; a backspace takes it alone.
            ['plate', '', 'ab-', 'AB-|'],
            ['plate', '', 'ab-1', 'AB-1|'],
            ['plate', '', 'ab/', 'AB|'],
            ['plate', 'AB-|', '{Backspace}', 'AB|'],
            ['phone', '', '55 ', '55 |'],
            ['iban', '', 'SA03 ', 'SA03 |'],
            ['phone', '', '0551234567', '55 123 4567|'],
            ['phone', '', '٠٥٥١٢٣٤٥٦٧', '55 123 4567|'],
            ['phone', '', '5512345678', '55 123 4567|'],
            ['phone', '', '{Paste:055-123-4567}', '55 123 4567|'],
            ['phone', '55 |123', '9', '55 9|12 3'],
            ['phone', '55 |123', '{Backspace}', '5|1 23'],
            ['phone', '55 1|23', '{Backspace}', '55 |23'],
            ['plain', '', '0551234567', '0551234567|'],
            ['plain', '', '05512345678', '0551234567|'],
            ['plain', '', '{Paste:055 123 4567}', '0551234567'],
            ['free', '', '{Paste:+966 55 123 4567}', '966551234567'],
            ['free', '', '12345678901234567890', '123456789012345|'],
            ['saudi', '', '{Paste:+966 55 123 4567}', '55 123 4567'],
            ['saudi', '', '{Paste:00966551234567}', '55 123 4567'],
            ['saudi', '', '{Paste:+966 055 123 4567}', '55 123 4567'],
            ['saudi', '', '0551234567', '55 123 4567|'],
            ['saudi', '', '{Paste:966551234567}', '55 123 4567'],
            ['saudi', '', '{Paste:9660551234567}', '55 123 4567'],
            ['world', '', '{Paste:+971 50 123 4567}', '501234567'],
            ['italy', '', '0612345678', '0612345678|'],
            ['italy', '', '{Paste:+39 06 1234 5678}', '0612345678'],
        ],
        // What new FormData(form) sends for a field showing a value: E.164 when the field shows a code.
        submit: [['saudi', '55 123 4567', '+966551234567'], ['italy', '0612345678', '+390612345678'], ['saudi', '', ''],
            ['plain', '0551234567', '0551234567'], ['iban', 'SA03 8000 0000 6080 1016 7519', 'SA0380000000608010167519'],
            ['border', '3 000 000 000', '3000000000'], ['plate', 'AB-1234', 'AB1234'], ['arabic', 'أبج 1234', 'أبج1234'],
            ['plateAr', 'أ ب ح ١٢٣٤', 'ABJ1234'], ['plateEn', 'ABJ 1234', 'ABJ1234'], ['plateSubmitAr', 'AHJ 1234', 'أهح1234'], ['card', '4111 1111 1111 1111', '4111111111111111']],        // Keys typed into an empty field: how many nds:phone:change it fires, and the last one's detail.
        events: [['saudi', '0551234567', 9, { value: '+966551234567', countryCode: '+966', nationalNumber: '551234567' }],
            ['plain', '0551234567', 10, { value: '0551234567', countryCode: null, nationalNumber: null }]],
        roundTrip: { iban: ['SA03 8000 0000 6080 1016 7519', 'GB29 NWBK 6016 1331 9268 19'], phone: ['55 123 4567'], border: ['3 000 000 000'], plate: ['AB-1234'], arabic: ['أبج 1234'], plateEn: ['ABJ 1234'], plateAr: ['أ ب ح ١٢٣٤'] },
        limits: { phone: [9, '  '] },
    },
};

// '28/[05]/1983' → { value, start, end }; '28/|05' → caret only.
function parseMarked(marked) {
    const start = marked.search(/[|[]/);
    if (start < 0) return { value: marked, start: null, end: null };
    const value = marked.replace(/[|[\]]/g, '');
    const close = marked.indexOf(']');
    return { value, start, end: close < 0 ? start : close - 1 };
}
const mark = (value, caret) => caret === null ? value : value.slice(0, caret) + '|' + value.slice(caret);

const wanted = process.argv.slice(2);
const unknown = wanted.filter((name) => !PATTERNS[name]);
if (unknown.length) { console.error(`unknown pattern: ${unknown.join(', ')} — have ${Object.keys(PATTERNS).join(', ')}`); process.exit(1); }
const patterns = wanted.length ? wanted : Object.keys(PATTERNS);

// Every check as one job: { pattern, field, from, keys, want, kind }.
const jobs = [];
for (const name of patterns) {
    const pattern = PATTERNS[name];
    for (const [field, from, keys, want] of pattern.cases) jobs.push({ pattern: name, field, from, keys, want, kind: 'case' });
    for (const [field, values] of Object.entries(pattern.roundTrip)) {
        for (const value of values) {
            for (let a = 0; a < value.length; a++) {
                for (let b = a + 1; b <= value.length; b++) {
                    const from = value.slice(0, a) + '[' + value.slice(a, b) + ']' + value.slice(b);
                    const cut = value.slice(a, b), digits = cut.replace(/\D/g, '');
                    jobs.push({ pattern: name, field, from, keys: '{Backspace}' + cut, want: value, kind: 'roundtrip' });
                    // Digits alone cannot bring back a word (a meridiem), so a cut holding letters gets no digits run.
                    if (digits && digits !== cut && !/\p{L}/u.test(cut) && !pattern.noDigits?.includes(field)) jobs.push({ pattern: name, field, from, keys: '{Backspace}' + digits, want: value, kind: 'roundtrip digits' });
                }
            }
        }
    }
}
// A small seeded generator, so a failing fuzz run repeats with the same SEED.
const SEED = +process.env.SEED || Date.now() % 100000;
let state = SEED;
const random = () => { state = (state * 1103515245 + 12345) % 2147483648; return state / 2147483648; };
const pick = (items) => items[Math.floor(random() * items.length)];
const KEYS = '0123456789012345678901234567890123456789/-.: xAPap٢۵';
const chunk = (most) => Array.from({ length: 1 + Math.floor(random() * most) }, () => pick(KEYS)).join('');
for (const name of patterns) {
    const pattern = PATTERNS[name];
    for (const [field, limit] of Object.entries(pattern.limits || {})) {
        const starts = ['', ...(pattern.roundTrip[field] || [])];
        for (let run = 0; run < (+process.env.FUZZ || 60); run++) {
            const start = pick(starts), caret = Math.floor(random() * (start.length + 1));
            const keys = Array.from({ length: 1 + Math.floor(random() * 4) }, () => {
                const kind = random();
                return kind < 0.5 ? chunk(12) : kind < 0.85 ? '{Paste:' + chunk(20) + '}' : '{Backspace}';
            }).join('');
            jobs.push({ pattern: name, field, from: start.slice(0, caret) + '|' + start.slice(caret), keys, limit, kind: 'fuzz' });
        }
    }
}
log(`seed ${SEED}`);
log(`${jobs.length} checks over ${patterns.join(', ')} on ${PAGES} pages`);

const browser = await step('launch', () => launch());

async function openPage() {
    const page = await browser.newPage();
    await step('load ' + SITE, () => page.goto(SITE, { waitUntil: 'load' }));
    await step('NDS ready', () => page.waitForFunction(() => window.NDS?.init?.mount));
    const fields = patterns.flatMap((name) => Object.entries(PATTERNS[name].fields).map(([field, html]) => ({ id: `${name}-${field}`, html, instance: PATTERNS[name].instance })));
    for (const name of patterns) if (PATTERNS[name].prepare) await page.evaluate(PATTERNS[name].prepare);
    await page.evaluate((fields) => {
        const host = document.createElement('div');
        host.id = 'typing-fixture';
        for (const { id, html } of fields) {
            const box = document.createElement('div');
            box.innerHTML = html;
            box.querySelector('input:not([type="hidden"])').id = id;
            host.append(box);
        }
        (document.querySelector('main') || document.body).prepend(host);
        NDS.init.mount(host);
    }, fields);
    await step('fields built', () => page.waitForFunction((fields) => fields.every(({ id, instance }) => {
        const input = document.getElementById(id);
        return !instance || input[instance] || input.closest('.nds-form-container')[instance];
    }), fields));
    for (const name of patterns) if (PATTERNS[name].ready) await page.evaluate(PATTERNS[name].ready);
    return page;
}

const paste = (page, id, text) => page.evaluate(([id, text]) => {
    const input = document.getElementById(id);
    const init = { inputType: 'insertFromPaste', data: text, bubbles: true, cancelable: true };
    if (!input.dispatchEvent(new InputEvent('beforeinput', init))) return;
    input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
    input.dispatchEvent(new InputEvent('input', init));
}, [id, text]);

async function run(page, job) {
    const id = `${job.pattern}-${job.field}`;
    const from = parseMarked(job.from);
    await page.evaluate(({ id, from }) => {
        const input = document.getElementById(id);
        input.focus();
        input.value = from.value;
        const at = from.start ?? from.value.length;
        input.setSelectionRange(at, from.end ?? at);
    }, { id, from });
    for (const part of job.keys.split(/(\{\w+(?::[^}]*)?\})/)) {
        if (!part) continue;
        if (part.startsWith('{Paste:')) await paste(page, id, part.slice(7, -1));
        else if (part.startsWith('{Insert:')) await page.keyboard.insertText(part.slice(8, -1));
        else if (part.startsWith('{Compose:')) {
            const words = part.slice(9, -1).split('|');
            if (ENGINE === 'chromium') {
                const session = await cdp(page);
                for (const text of words) await session.send('Input.imeSetComposition', { text, selectionStart: text.length, selectionEnd: text.length });
                await session.send('Input.insertText', { text: words.at(-1) });
                await session.detach();
            } else await page.keyboard.insertText(words.at(-1));
        }
        else if (part === '{Blur}') await page.evaluate((id) => document.getElementById(id).blur(), id);
        else if (/^\{\w+\}$/.test(part)) await page.keyboard.press(part.slice(1, -1));
        else await page.keyboard.type(part);
    }
    const [value, caret] = await page.evaluate((id) => { const input = document.getElementById(id); return [input.value, input.selectionStart]; }, id);
    if (job.limit) {
        // Each other character at most as often as the limit lists it: '//' allows two slashes.
        const [most, others] = job.limit, digit = /[\d٠-٩۰-۹]/, count = (text, char) => text.split(char).length - 1;
        const digits = [...value].filter((char) => digit.test(char)).length;
        const extra = [...new Set(value)].filter((char) => !digit.test(char) && count(value, char) > count(others, char));
        if (digits <= most && !extra.length) return null;
        return `${job.pattern}/${job.field} fuzz: "${job.from}" + ${JSON.stringify(job.keys)} → "${value}" (${digits} digits, most ${most}${extra.length ? ', too many ' + JSON.stringify(extra.join('')) : ''})`;
    }
    const want = parseMarked(job.want);
    const pass = value === want.value && (want.start === null || caret === want.start);
    return pass ? null : `${job.pattern}/${job.field} ${job.kind}: "${job.from}" + ${JSON.stringify(job.keys)} → "${mark(value, caret)}", want "${job.want}"`;
}

const pages = await Promise.all(Array.from({ length: Math.min(PAGES, jobs.length) }, openPage)).catch((e) => {
    console.error(`${e.message.split('\n')[0]} — is the dev server up? (bundle exec jekyll serve, or SITE=<base url>)`);
    process.exit(1);
});
log('fields built');
const failures = [];
// INITIAL: the value each listed field holds once built, before any check writes to it.
for (const name of patterns) {
    for (const [field, want] of Object.entries(PATTERNS[name].initial || {})) {
        const value = await pages[0].evaluate((id) => document.getElementById(id).value, `${name}-${field}`);
        if (value !== want) failures.push(`${name}/${field} initial: "${value}", want "${want}"`);
    }
}
// SUBMIT: the field put in a form for one new FormData(form), then back where it was.
for (const name of patterns) {
    for (const [field, shown, want] of PATTERNS[name].submit || []) {
        const sent = await pages[0].evaluate(([id, shown]) => {
            const input = document.getElementById(id), box = input.closest('.nds-form-container'), form = document.createElement('form');
            box.before(form);
            form.append(box);
            input.name = 'probe';
            input.value = shown;
            const sent = new FormData(form).get('probe');
            form.replaceWith(box);
            input.removeAttribute('name');
            input.value = '';
            return sent;
        }, [`${name}-${field}`, shown]);
        if (sent !== want) failures.push(`${name}/${field} submit: "${shown}" sends "${sent}", want "${want}"`);
    }
}
// EVENTS: keys typed with a listener on the input, then the field emptied again.
for (const name of patterns) {
    for (const [field, keys, count, want] of PATTERNS[name].events || []) {
        const id = `${name}-${field}`;
        await pages[0].evaluate((id) => {
            window.__phone = [];
            document.getElementById(id).addEventListener('nds:phone:change', (e) => window.__phone.push(e.detail));
        }, id);
        await pages[0].focus('#' + id);
        await pages[0].keyboard.type(keys);
        const got = await pages[0].evaluate((id) => { const input = document.getElementById(id); input.select(); return window.__phone; }, id);
        await pages[0].keyboard.press('Backspace');
        const last = JSON.stringify(got.at(-1)), wanted = JSON.stringify(want);
        if (got.length !== count || last !== wanted) failures.push(`${name}/${field} events: "${keys}" fired ${got.length}, last ${last}; want ${count}, last ${wanted}`);
    }
}
// MESSAGES: the keys run as a case, then the field's message read and cleared.
for (const name of patterns) {
    for (const [field, keys, want] of PATTERNS[name].messages || []) {
        const id = `${name}-${field}`;
        await run(pages[0], { pattern: name, field, from: '', keys, want: '' });
        const message = await pages[0].evaluate((id) => {
            const box = document.getElementById(id).closest('.nds-form-container'), { message } = NDS.Form.getStatus(box);
            NDS.Form.clearStatus(box);
            return message;
        }, id);
        if (message !== want) failures.push(`${name}/${field} message: ${JSON.stringify(keys)} shows "${message}", want "${want}"`);
    }
}
// VALIDITY: the keys run as a case, then the input's validationMessage read.
for (const name of patterns) {
    for (const [field, keys, want] of PATTERNS[name].validity || []) {
        await run(pages[0], { pattern: name, field, from: '', keys, want: '' });
        const message = await pages[0].evaluate((id) => document.getElementById(id).validationMessage, `${name}-${field}`);
        if (message !== want) failures.push(`${name}/${field} validity: ${JSON.stringify(keys)} → "${message}", want "${want}"`);
    }
}
await Promise.all(pages.map(async (page, p) => {
    for (let j = p; j < jobs.length; j += pages.length) {
        const failure = await step(`check ${jobs[j].from} + ${jobs[j].keys}`, () => run(page, jobs[j]));
        if (failure) failures.push(failure);
    }
}));
await browser.close();

for (const name of patterns) {
    const mine = failures.filter((line) => line.startsWith(name + '/'));
    const total = jobs.filter((job) => job.pattern === name).length;
    console.log(`${mine.length ? 'FAIL' : 'PASS'}  ${name}: ${total - mine.length}/${total}`);
    for (const line of mine.slice(0, 40)) console.log('   ' + line);
    if (mine.length > 40) console.log(`   … ${mine.length - 40} more`);
}
log(failures.length ? `${failures.length} failed` : 'all passed');
process.exit(failures.length ? 1 : 0);
