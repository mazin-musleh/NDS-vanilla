/* NDS.FormattedInput — public surface (a .nds-formatted field: the class on the .nds-form-container, and its
 * data-format there: a built-in kind (phone, national-id, iban, plate), a name addFormat() added, or a slot
 * format of its own; the field's input is the one its .nds-form-control holds)
 * Rides: nds-field (its part) · nds-typing (group) · nds-dropmenu (a phone's country picker)
 * Methods:
 *   NDS.FormattedInput.isNationalId(str, country) / .isIban(str)   the checks behind national-id / iban;
 *                                     country defaults to SA, and one with no rule passes
 *   NDS.FormattedInput.addIdRule(country, { check(value), digits, length })   a national ID rule for a
 *                                     country ("AE"): check gets the clean value; digits, digits only (else
 *                                     capitals and digits); length, the most characters. Replaces one set before
 *   NDS.FormattedInput.addFormat(name, { format, check(value), message })   a named format, for
 *                                     data-format="name": format, its slots; check gets the value the form
 *                                     submits and returns true when it is valid; message, shown when it is not
 *                                     ("Invalid value" by default). Replaces one set before; refuses a built-in kind
 * Events:
 *   nds:phone:change            detail {value, countryCode, nationalNumber} — from a phone field's input,
 *                               when the number it submits changes (typing, a paste, a country pick, a reset)
 * Hooks:
 *   data-format on a .nds-formatted field's container: phone, national-id, iban, plate, vat, a name addFormat()
 *   added ("card"), or its slots (0 a digit, A a capital, a a small letter,
 *   * a letter or a digit as typed, ح an Arabic letter: "AA-0000", "ححح 0000"), or the name of one addFormat()
 *   added ("card": small letters, digits and dashes, with a letter other than a)
 *   data-groups on a phone field's container, or on each item of its country picker: the groups the
 *   number shows (0 a digit: "00 000 0000"); an item without one shows the number as typed
 *   a hidden input in a phone field's .nds-prefix: its value is the code the phone submits before its
 *   number ("+966"); a country picker's is the one Dropmenu writes, from the picked item's data-value
 *   data-country on any element, <html> for the site ("AE"): the country a national ID and an IBAN
 *   inside it follow; the nearest wins, SA without one; "any" takes an ID of any country, unchecked
 *   data-vehicle="motorcycle" on a plate field's container: 1 or 2 letters and 1 to 3 digits (a car: 3 and 4)
 *   data-submit="arabic" on a plate field's container: it submits Arabic letters ("أبح1234")
 *   lang on a plate field's .nds-form-control (or its input): "ar" flips the row and shows the Arabic letters
 *   apart with Arabic digits, right to left ("أ ب ح ١٢٣٤"); any other, the Latin ones ("ABJ 1234").
 *   Without it, the first letter typed picks the script, and the field writes it as lang on its .nds-form-control;
 *   empty, the page's lang applies
 * Gotchas:
 *   - Layers: NDS.typing shapes the text; Date Picker and Time Picker add a picker menu; this file is a
 *     formatted field with no picker. A type part of the form field: no init() and no loader entry.
 *   - national-id and iban stamp setCustomValidity on input (and at init), so the
 *     checksum fails the field through checkValidity like any native rule. A pattern on the same
 *     input is redundant.
 *   - iban shows groups of four (letters only in the country; an SA one is 22 digits after it), and a phone with data-groups or a slot format shows its groups: input.value
 *     holds the spaces; a submit and new FormData(form) send the value without them. Inserts go
 *     through this file there, and a maxlength shorter than the format is removed: the format sets the most.
 *   - A phone with a code drops its leading 0 (not +39/+378/+379) and a pasted
 *     "+966…" (another country its picker lists picks that country), and submits E.164
 *     ("+966551234567"); without one it keeps the number as typed, 0 included, up to 15 digits. The code joins in the formdata event only: input.value keeps the
 *     local number, so code reading it (jQuery serialize(), framework state) gets no code: it
 *     listens for nds:phone:change instead.
 *   - A national ID of a country with no rule keeps capitals and digits and checks nothing; SA's rule ships.
 *     An IBAN starting with a digit gets the country's letters, SA's by default.
 *   - A phone with data-groups, or a slot or named format, fails a value that leaves a slot empty ("Incomplete
 *     value"); a pattern on its input adds a rule, checked on the value as shown, separators included.
 *   - plate takes the 17 letters of a Saudi plate in either script (ا for أ, ي for ى, ه for هـ) and
 *     shows them in its script (see lang); letters always come before digits. It submits the Latin letters, then the
 *     digits ("ABJ1234"), and fails a value with no letter or no digit ("Incomplete value"). Without a
 *     placeholder, it writes one that follows its letters and vehicle ("ABJ 1234", "أ ب ١٢٣").
 *   - vat takes a Saudi VAT number: 15 digits, the first and the last 3 ("Invalid VAT number"). Its check
 *     digit's rule is not published, so the field cannot check it.
 *   - A data-format name not added yet keeps the value as typed, unchecked; addFormat() then shapes the fields
 *     that name it. A full value that fails check() shows the format's message; an empty slot shows "Incomplete value" first.
 *   - NDS.Form.refresh() re-stamps the field: a phone sends nds:phone:change when its number changed
 *     (a full number may pick its country).
 */

(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    var strings = NDS.i18n.getStrings('formatted-input', {
        invalid_national_id: 'Invalid national ID number',
        invalid_iban:        'Invalid IBAN',
        invalid_vat:         'Invalid VAT number',
        incomplete:          'Incomplete value',
        invalid:             'Invalid value',
    });

    // Saudi national ID / iqama: 10 digits, first 1 or 2, Luhn check digit.
    function isSaudiId(value) {
        if (!/^[12]\d{9}$/.test(value)) return false;
        var sum = 0;
        for (var i = 0; i < 10; i++) {
            var digit = +value[i];
            if (i % 2 === 0) { digit *= 2; if (digit > 9) digit -= 9; }
            sum += digit;
        }
        return sum % 10 === 0;
    }

    // National ID rules by country: check(value) on the clean value; digits, digits only (else capitals
    // and digits); length, the most characters. A country without one keeps capitals and digits, unchecked.
    var idRules = new Map([['SA', { check: isSaudiId, digits: true, length: 10 }]]);

    function addIdRule(country, rule) {
        country = String(country).toUpperCase();
        if (!/^[A-Z]{2}$/.test(country) || !rule || typeof rule.check !== 'function') {
            console.warn('NDS FormattedInput: addIdRule needs a two-letter country and a check function');
            return;
        }
        idRules.set(country, rule);
        // A field already stamped takes the new rule.
        document.querySelectorAll('.nds-formatted[data-format="national-id"] .nds-form-control > input').forEach(function(input) {
            if (getKind(input) === 'national-id' && getCountry(input) === country) stampIdentifier(input, { quiet: true });
        });
    }

    // Named formats (data-format="card"): a slot format and an optional check of the value the form submits. A
    // name is small letters, digits and dashes with a letter other than a, so it never reads as a slot format.
    var formats = new Map();
    function isFormatName(text) { return /^[a-z][a-z\d]*(-[a-z\d]+)*$/.test(text) && /[b-z]/.test(text); }

    // Built in: a Saudi VAT number, 15 digits, the first and the last 3. Its check digit's rule is not published.
    formats.set('vat', {
        format: '000000000000000',
        check: function(value) { return /^3\d{13}3$/.test(value); },
        get message() { return strings.text('invalid_vat'); },
    });
    var builtInFormats = Array.from(formats.keys());

    function addFormat(name, rule) {
        if (presets.indexOf(name) >= 0 || builtInFormats.indexOf(name) >= 0) {
            console.warn('NDS FormattedInput: "' + name + '" is built in; addFormat takes another name');
            return;
        }
        if (!isFormatName(String(name)) || !rule || typeof rule.format !== 'string' || (rule.check && typeof rule.check !== 'function')) {
            console.warn('NDS FormattedInput: addFormat needs a name of small letters and dashes ("card") and a format');
            return;
        }
        formats.set(name, rule);
        // A field already on the page takes it: until now it kept its value as typed.
        document.querySelectorAll('.nds-formatted[data-format="' + name + '"] .nds-form-control > input').forEach(function(input) {
            if (getKind(input) === 'formatted') stampIdentifier(input, { quiet: true });
        });
    }

    // A field's data-format that is no built-in kind: a named format's rule, or { format } for a slot format of its own.
    // Null: none, or a name not added yet.
    function getFormatRule(input) {
        var written = input.closest('.nds-form-container').getAttribute('data-format');
        if (!written) return null;
        return isFormatName(written) ? formats.get(written) || null : { format: written };
    }

    function isNationalId(value, country) {
        var rule = idRules.get(String(country || 'SA').toUpperCase());
        return rule ? !!rule.check(value) : true;
    }

    // The country a field's ID and IBAN follow: the nearest data-country (<html> sets the site's), else SA.
    // ANY: an ID of any country, a passport too, unchecked.
    var warnedCountries = new Set();
    function getCountry(input) {
        var el = input.closest('[data-country]:not([data-country=""])');
        var written = el ? el.getAttribute('data-country') : 'SA', country = written.trim().toUpperCase();
        if (/^[A-Z]{2}$/.test(country) || country === 'ANY') return country;
        if (!warnedCountries.has(written)) {
            warnedCountries.add(written);
            console.warn('NDS FormattedInput: data-country "' + written + '" is not a two-letter country code; using SA');
        }
        return 'SA';
    }

    // IBAN: country + check digits, then mod-97 of the rearranged, letters-to-numbers string === 1.
    function isIban(value) {
        if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value)) return false;
        var digits = (value.slice(4) + value.slice(0, 4)).replace(/[A-Z]/g, function (char) { return char.charCodeAt(0) - 55; });
        var remainder = 0;
        for (var i = 0; i < digits.length; i++) remainder = (remainder * 10 + +digits[i]) % 97;
        return remainder === 1;
    }

    // Saudi plates: 17 Arabic letters, each with its Latin twin; a car has 1 to 3 letters and 1 to 4 digits.
    var PLATE_LETTERS = 'أA بB حJ دD رR سS صX طT عE قG كK لL مZ نN هH وU ىV';
    var PLATE_SIZES = Object.freeze({ car: { letters: 3, digits: 4 }, motorcycle: { letters: 2, digits: 3 } });
    // A typed letter, either script, any case → [as the Arabic row shows it, Latin]. ه shows as هـ, as on the plate.
    var plateLetters = {};
    PLATE_LETTERS.split(' ').forEach(function(pair) {
        var letter = [pair[0] === 'ه' ? 'هـ' : pair[0], pair[1]];
        plateLetters[pair[0]] = plateLetters[pair[1]] = plateLetters[pair[1].toLowerCase()] = letter;
    });
    // The letters a keyboard gives for أ and ى.
    var PLATE_ALIASES = 'اأ إأ آأ يى';
    PLATE_ALIASES.split(' ').forEach(function(pair) { plateLetters[pair[0]] = plateLetters[pair[1]]; });

    // A plate's letters, then its digits, from text in any order and script; the caret stays after the same
    // character. Arabic: the letters apart and Arabic digits, as the plate's Arabic row ("أ ب ح ١٢٣٤"); else "ABJ 1234".
    function formatPlate(input, text, caret) {
        var container = input.closest('.nds-form-container');
        var size = PLATE_SIZES[container.getAttribute('data-vehicle') === 'motorcycle' ? 'motorcycle' : 'car'];
        // data-submit="arabic": the letters submit in Arabic, هـ as ه.
        var submitArabic = container.getAttribute('data-submit') === 'arabic';
        var letters = [], digits = '', last = null, lettersBefore = 0, digitsBefore = 0;
        text = NDS.toLatinDigits(text);
        var arabic = isPlateArabic(input, text);
        for (var i = 0; i < text.length; i++) {
            var letter = plateLetters[text[i]];
            if (letter && letters.length < size.letters) letters.push(letter);
            else if (/\d/.test(text[i]) && digits.length < size.digits) digits += text[i];
            else continue;
            if (i >= caret) continue;
            last = letter ? 'letter' : 'digit';
            lettersBefore = letters.length;
            digitsBefore = digits.length;
        }
        var join = function(count) { return letters.slice(0, count).map(function(pair) { return arabic ? pair[0] : pair[1]; }).join(arabic ? ' ' : ''); };
        var shown = join(letters.length), lead = shown && digits ? shown.length + 1 : 0;
        return {
            value: shown + (lead ? ' ' : '') + (arabic ? digits.replace(/\d/g, function(digit) { return String.fromCharCode(0x0660 + +digit); }) : digits),
            caret: last === 'letter' ? join(lettersBefore).length : last === 'digit' ? lead + digitsBefore : 0,
            complete: letters.length > 0 && digits.length > 0,
            submitted: letters.map(function(pair) { return submitArabic ? pair[0][0] : pair[1]; }).join('') + digits,
            arabic: arabic,
        };
    }

    // A plate's script: the lang the page wrote on its .nds-form-control or input; without one, the first
    // letter typed, and before that the page's lang. The lang syncPlateLang writes on the control is not the page's.
    var ownLangs = new WeakMap();
    function isAutoLang(input) {
        var control = input.closest('.nds-form-control'), written = control.getAttribute('lang');
        return !input.hasAttribute('lang') && (!written || ownLangs.get(control) === written);
    }

    // :lang(ar), as the plate CSS reads it (_form.scss).
    function isPlateArabic(input, text) {
        if (!isAutoLang(input)) return input.matches(':lang(ar)');
        var first = [].find.call(text, function(char) { return plateLetters[char]; });
        if (first) return first.charCodeAt(0) > 127;
        var page = input.closest('.nds-form-control').parentElement;
        return !!page && page.matches(':lang(ar)');
    }

    // An auto field writes its script on its .nds-form-control, so the row flips with it (_form.scss); empty, the page's applies.
    function syncPlateLang(input, shown) {
        if (!isAutoLang(input)) return;
        var control = input.closest('.nds-form-control');
        if (!shown.value) { control.removeAttribute('lang'); ownLangs.delete(control); return; }
        var lang = shown.arabic ? 'ar' : 'en';
        control.setAttribute('lang', lang);
        ownLangs.set(control, lang);
    }

    // A placeholder the page left out shows a sample plate in the field's letters and size ("AB 123").
    var ownPlaceholders = new WeakMap();
    function syncPlatePlaceholder(input, arabic) {
        if (input.placeholder && ownPlaceholders.get(input) !== input.placeholder) return;
        var sample = formatPlate(input, ['A', 'B', 'J'].map(function(letter) { return plateLetters[letter][arabic ? 0 : 1]; }).join('') + '1234', 0).value;
        input.placeholder = sample;
        ownPlaceholders.set(input, sample);
    }

    // The field an input is the text box of: its .nds-formatted container's built-in kind, its data-format
    // ('phone', 'iban', 'national-id', 'plate'), else 'formatted'. Null: none.
    var presets = ['phone', 'iban', 'national-id', 'plate'];
    function getKind(input) {
        var control = input.parentElement;
        if (input.type === 'hidden' || !control || !control.classList.contains('nds-form-control')) return null;
        var container = control.closest('.nds-formatted');
        if (!container) return null;
        var kind = container.getAttribute('data-format');
        return presets.indexOf(kind) >= 0 ? kind : 'formatted';
    }

    // Groups of four: two letters, two check digits, then up to the longest IBAN (34). A Saudi one is 22 digits after SA.
    var IBAN_FORMAT = 'AA00 **** **** **** **** **** **** **** **';
    var IBAN_FORMATS = Object.freeze({ SA: 'AA00 0000 0000 0000 0000 0000' });
    function getIbanFormat(text) {
        return IBAN_FORMATS[text.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase()] || IBAN_FORMAT;
    }

    // text in its slots, dropping only what was just inserted (it ends at the caret): when the letter and digit
    // slots would drop characters already there (a deleted country moves letters onto digit slots), every
    // slot takes either until the value fits again.
    function shapeSlots(text, caret, format, inserted) {
        var shown = NDS.typing.group(text, caret, format);
        var from = caret - (inserted || '').length;
        if (shown.dropped.every(function(index) { return index >= from && index < caret; })) return shown;
        return NDS.typing.group(text, caret, format, true);
    }

    // The slot format a field shows (NDS.typing.group): an IBAN's groups of four, a .nds-formatted field's
    // data-format, or a phone's data-groups, read from the picked country when the field has a country picker. Null: the value as typed.
    function getGroupFormat(input) {
        var kind = getKind(input);
        if (kind === 'iban') return getIbanFormat(input.value);
        if (kind === 'formatted') {
            var rule = getFormatRule(input);
            return rule && rule.format;
        }
        if (kind !== 'phone') return null;
        var source = getPhoneSetup(input).source;
        return (source && source.getAttribute('data-groups')) || null;
    }

    // The picked country item: the one whose data-value Dropmenu holds in its hidden input. Before Dropmenu
    // builds that input, the item it will pick first: data-select-value beats a selected item, as there.
    function getPickedItem(picker) {
        var hidden = picker.querySelector('input[type="hidden"]');
        var value = hidden ? hidden.value : picker.getAttribute('data-select-value');
        var items = picker.querySelectorAll('.nds-dropmenu-item');
        return [].find.call(items, function(item) { return value && item.getAttribute('data-value') === value; })
            || [].find.call(items, function(item) { return NDS.state.has(item, 'selected'); });
    }

    function getCountryPicker(input) {
        var control = input.closest('.nds-form-control');
        return control && control.querySelector('.nds-dropmenu[data-select-name]');
    }

    // A dialing code from a value ("+966", "00966", Arabic digits) → "+966". Null: none.
    function readDialCode(value) {
        var digits = NDS.toLatinDigits(value || '').replace(/\D/g, '');
        return digits ? '+' + digits : null;
    }

    // A phone's code and where its data-groups live: with a picker, the picked country item; else the hidden
    // input in its prefix and the field's container.
    function getPhoneSetup(input) {
        var picker = getCountryPicker(input);
        if (picker) {
            var item = getPickedItem(picker);
            return { code: item ? readDialCode(item.getAttribute('data-value')) : null, source: item };
        }
        var control = input.closest('.nds-form-control');
        var hidden = control && control.querySelector('.nds-prefix input[type="hidden"]');
        return { code: hidden ? readDialCode(hidden.value) : null, source: input.closest('.nds-form-container') };
    }

    // A full number ("+971 50…", "00971 50…"): the code it starts with, the field's own or a country its picker
    // lists (the longest that fits), its source, and where the national number starts. Null: no code the field takes.
    function readFullNumber(input, text) {
        var lead = text.match(/^\s*(?:\+|00)\s*/);
        if (!lead) return null;
        var picker = getCountryPicker(input);
        var sources = picker ? picker.querySelectorAll('.nds-dropmenu-item') : [null];
        var best = null;
        [].forEach.call(sources, function(source) {
            var code = source ? readDialCode(source.getAttribute('data-value')) : getPhoneSetup(input).code;
            if (code && text.startsWith(code.slice(1), lead[0].length) && (!best || code.length > best.code.length)) best = { code: code, source: source };
        });
        if (best) {
            var end = lead[0].length + best.code.length - 1;
            best.from = end + text.slice(end).match(/^[\s-]*/)[0].length;
        }
        return best;
    }

    // A full number from another listed country picks that country. Its nds:dropmenu:select must not
    // re-stamp the field with the value this stamp is replacing. Forms runs before Dropmenu at load: the
    // picker is built here, or the code this stamp strips would submit with the default country's.
    var pickingCountry = false;
    function pickCountry(input, item) {
        var picker = getCountryPicker(input);
        var dropmenu = picker && NDS.Dropmenu.create(picker);
        if (!dropmenu) return;
        pickingCountry = true;
        try { dropmenu.setSelection(item); } finally { pickingCountry = false; }
    }

    // The number a phone submits: its country code, then its digits ("+966551234567"). Without a code, the digits
    // alone and a null nationalNumber: a 0 typed there may or may not be a trunk prefix.
    function getPhoneNumber(input) {
        var digits = input.value.replace(/\D/g, ''), code = digits && getPhoneSetup(input).code;
        return { value: code ? code + digits : digits, countryCode: code || null, nationalNumber: code ? digits : null };
    }

    // nds:phone:change when the submitted number changes; the first stamp (setup) only records it.
    var phoneNumbers = new WeakMap();
    function reportPhone(input) {
        var number = getPhoneNumber(input), first = !phoneNumbers.has(input);
        if (phoneNumbers.get(input) === number.value) return;
        phoneNumbers.set(input, number.value);
        if (!first) input.dispatchEvent(new CustomEvent('nds:phone:change', { bubbles: true, detail: number }));
    }

    // Countries whose numbers keep their leading 0 after the code (Italy: +39 06 …); elsewhere it is a trunk prefix.
    var keepZero = ['+39', '+378', '+379'];

    // The characters keep matches, from index from, and where the caret lands among them; dropZero drops a leading 0.
    function keepCharacters(text, caret, from, keep, dropZero) {
        var kept = '', before = 0;
        for (var i = from; i < text.length; i++) {
            if (!keep.test(text[i]) || (dropZero && !kept && text[i] === '0')) continue;
            kept += text[i];
            if (i < caret) before = kept.length;
        }
        return { text: kept, caret: before };
    }

    // Banking apps copy an IBAN without its country (a Saudi one without SA): a value starting with a digit
    // gets country back, when one is given.
    function formatIban(text, caret, country) {
        text = text.toUpperCase();
        var lead = text.search(/[A-Z0-9]/);
        if (country && country !== 'ANY' && lead >= 0 && /\d/.test(text[lead])) {
            text = text.slice(0, lead) + country + text.slice(lead);
            if (caret > lead) caret += 2;
        }
        return { text: text, caret: caret };
    }

    // A phone's digits, its code and its group format. A phone with a code drops the code of a full number
    // ("+966 55…", "00966 55…"), picking its country when a picker lists it, and its leading zero, the
    // trunk prefix. A paste may bring spaces, dashes or +.
    function formatPhone(input, text, caret, opts) {
        var setup = getPhoneSetup(input), code = setup.code, source = setup.source, from = 0;
        var full = code && readFullNumber(input, text);
        if (full) {
            from = full.from;
            if (full.code !== code) {
                if (!opts.dry) pickCountry(input, full.source);
                source = full.source;
            }
            code = full.code;
        }
        var format = (source && source.getAttribute('data-groups')) || null;
        // A whole value with the code but no + ("966551234567"): too long for the field, so the code goes.
        var room = code && format ? format.replace(/[^0A*]/g, '').length : input.maxLength;
        var typed = text.slice(from).replace(/\D/g, '');
        if (code && !full && opts.country && room > 0 && typed.length > room && typed.startsWith(code.slice(1))) {
            for (var seen = 0; seen < code.length - 1; from++) if (/\d/.test(text[from])) seen++;
        }
        var kept = keepCharacters(text, caret, from, /\d/, code && keepZero.indexOf(code) < 0);
        // A separator typed after the last digit reaches the groups, which show it ("55 ").
        var tail = format && kept.text ? text.match(/\D*$/)[0] : '';
        return { text: kept.text + tail, caret: kept.caret + (caret === text.length ? tail.length : 0), code: code, groupFormat: format };
    }

    // A value that leaves a slot of its format empty, or does not fit it, fails as incomplete; a whole one fails
    // its named format's check, with the format's message. Only this file's message is cleared here: a page's
    // own setCustomValidity stays.
    function checkFilled(input, value, format, rule) {
        var shape = format && NDS.typing.group(value, 0, format);
        var sent = [].filter.call(NDS.toLatinDigits(value), NDS.typing.isSlotCharacter).join('');
        // A letter or digit in the value is a start, even a fixed one ("REF-" with no slot filled).
        if (shape && sent && (shape.open > 0 || shape.dropped.length > 0)) setOwnMessage(input, strings.text('incomplete'));
        else if (rule && rule.check && sent && !rule.check(sent)) setOwnMessage(input, rule.message || strings.text('invalid'));
        else setOwnMessage(input, '');
    }

    var ownMessages = new WeakMap();
    function setOwnMessage(input, message) {
        // Its own record, not validationMessage: a disabled or readonly field reports none.
        if (message) { input.setCustomValidity(message); ownMessages.set(input, message); return; }
        var own = ownMessages.get(input);
        if (ownMessages.delete(input) && (!input.willValidate || input.validationMessage === own)) input.setCustomValidity('');
    }

    // A .nds-formatted field: the value in its shape, then the checksum result, so
    // checkValidity() (blur and submit) fails the field with a localized message. Empty = valid. opts:
    // text and caret, an edit to write in place of the value; inserted, the text that edit typed or pasted
    // (the slots may drop it, never what was there); quiet, write it without an input event;
    // country, a whole value that may lack an IBAN's country (a paste, a first key, the page's own value).
    function stampIdentifier(input, opts) {
        var kind = getKind(input);
        if (!kind) return;
        var iban = kind === 'iban', phone = kind === 'phone', nationalId = kind === 'national-id', generic = kind === 'formatted', plate = kind === 'plate';
        opts = opts || {};
        var focused = document.activeElement === input, text = opts.text, caret = opts.caret;
        if (text === undefined) {
            text = input.value;
            caret = focused ? input.selectionStart : text.length;
        }
        var country = (iban || nationalId) && getCountry(input), rule = nationalId && idRules.get(country);
        text = NDS.toLatinDigits(text);
        var formatted, format = null, shown;
        if (plate) {
            // The plate sets the most characters, its letters apart included.
            if (input.maxLength >= 0) input.removeAttribute('maxlength');
            shown = formatPlate(input, text, caret);
        } else {
            if (phone) formatted = formatPhone(input, text, caret, opts);
            // The slots keep what fits them, in their case (NDS.typing.group).
            else if (generic) formatted = { text: text, caret: caret, groupFormat: getGroupFormat(input) };
            else if (iban) formatted = formatIban(text, caret, opts.country && country);
            // An ID keeps digits only, or capitals and digits when its rule lets it have letters.
            else formatted = keepCharacters(text.toUpperCase(), caret, 0, rule && rule.digits ? /\d/ : /[A-Z\d]/);
            format = iban ? getIbanFormat(formatted.text) : formatted.groupFormat || null;
            // The format sets the most characters: Safari's maxlength would stop the groups before the browser asks.
            if (format && input.maxLength >= 0 && input.maxLength < format.length) input.removeAttribute('maxlength');
            // With no format, a maxlength holds: a script write would skip it.
            var most = input.maxLength >= 0 ? input.maxLength : Infinity;
            // A phone holds at most 15 digits, its country code included (E.164).
            if (phone && most === Infinity) most = 15 - (formatted.code ? formatted.code.length - 1 : 0);
            if (rule && rule.length < most) most = rule.length;
            shown = format ? shapeSlots(formatted.text, formatted.caret, format, opts.inserted)
                : { value: formatted.text.slice(0, most), caret: Math.min(formatted.caret, most) };
        }
        if (opts.dry) return shown;
        if (shown.value !== input.value) {
            if (opts.quiet) input.value = shown.value;
            else NDS.setValue(input, shown.value, { change: false });
        }
        if (focused) try { input.setSelectionRange(shown.caret, shown.caret); } catch (_) {}
        if (phone) reportPhone(input);
        if (plate) {
            syncPlateLang(input, shown);
            syncPlatePlaceholder(input, shown.arabic);
        }
        stampMessage(input, kind, shown, format, rule);
    }

    // The field's own message for the value it shows; every kind goes through setOwnMessage.
    function stampMessage(input, kind, shown, format, rule) {
        if (kind === 'plate') setOwnMessage(input, shown.value && !shown.complete ? strings.text('incomplete') : '');
        else if (kind === 'phone' || kind === 'formatted') checkFilled(input, shown.value, format, kind === 'formatted' && getFormatRule(input));
        else {
            var clean = shown.value.replace(/\s/g, ''), iban = kind === 'iban';
            var ok = iban ? isIban(clean) : !rule || !!rule.check(clean);
            setOwnMessage(input, clean && !ok ? strings.text(iban ? 'invalid_iban' : 'invalid_national_id') : '');
        }
    }

    // Registered before Form's parts (this file loads first), so its beforeinput runs before Form's digits part.
    NDS.field.addType('formatted', {
        setupInput: function(input) { stampIdentifier(input, { country: true }); },
        refresh: function(input) { stampIdentifier(input, { quiet: true, country: true }); },
        on: {
            beforeinput: function(e, context) {
                if (!context) return;
                var field = context.input;
                if (e.isComposing || field.readOnly || !getKind(field)) return;
                var data = e.data || (e.dataTransfer && e.dataTransfer.getData('text/plain'));
                var start = field.selectionStart, value = field.value;
                // An identifier takes every insert here: the browser's maxlength would count a group's spaces,
                // and a numeric field would block a paste with one.
                if (data && /^insert/.test(e.inputType)) {
                    var edit = {
                        text: value.slice(0, start) + data + value.slice(field.selectionEnd), caret: start + data.length,
                        country: !value || /^insertFrom(Paste|Drop)$/.test(e.inputType), inserted: data,
                    };
                    // Already in shape: the browser inserts it, faster than a script write.
                    var shown = stampIdentifier(field, Object.assign({ dry: true }, edit));
                    if (shown.value === edit.text && shown.caret === edit.caret) return;
                    e.preventDefault();
                    stampIdentifier(field, edit);
                    return;
                }
                // A delete that meets a group's space takes the character past it too, as the space comes back
                // (a plate's هـ is two characters). A space at the end, one the user typed, goes alone; a plate has none.
                var back = e.inputType === 'deleteContentBackward', at = back ? start - 1 : start, isSlotCharacter = NDS.typing.isSlotCharacter;
                var plate = getKind(field) === 'plate';
                if ((plate || getGroupFormat(field)) && /^deleteContent(Backward|Forward)$/.test(e.inputType) && start === field.selectionEnd
                    && value[at] && !isSlotCharacter(value[at]) && (plate || [].some.call(value.slice(at), isSlotCharacter))) {
                    var from = at, to = at + 1;
                    if (back) { while (from > 0 && !isSlotCharacter(value[from - 1])) from--; from--; }
                    else { while (to < value.length && !isSlotCharacter(value[to])) to++; to++; }
                    if (from < 0 || to > value.length) return;
                    e.preventDefault();
                    stampIdentifier(field, { text: value.slice(0, from) + value.slice(back ? start : to), caret: from });
                }
            },
            // A keyboard composing a word owns its text until it commits (Android): a rewrite then doubles it.
            input: function(e, context) {
                if (context && !e.isComposing) stampIdentifier(context.input, { country: /^insertFrom(Paste|Drop)$/.test(e.inputType), inserted: e.data });
            },
            // A word composed into an empty field takes the country, as one typed does.
            compositionend: function(e, context) {
                if (context) stampIdentifier(context.input, { country: e.data === context.input.value, inserted: e.data });
            },
            // Submit and new FormData(form) send the value without its groups ("SA03 8000 …" → "SA038000…"),
            // a phone the whole number, its country code first (E.164: "+966551234567"), and a plate its Latin
            // letters, then its digits ("أ ب ح 1234" → "ABJ1234").
            // ponytail: a name two fields share keeps what the browser wrote.
            'formdata:capture': function(e) {
                [].forEach.call(e.target.elements || [], function(el) {
                    var kind = el.name && getKind(el);
                    if (!kind || kind === 'national-id' || (kind === 'formatted' && !getGroupFormat(el)) || e.formData.getAll(el.name).length !== 1) return;
                    var sent = [].filter.call(el.value, NDS.typing.isSlotCharacter).join('');
                    if (kind === 'phone') sent = getPhoneNumber(el).value;
                    else if (kind === 'plate') sent = formatPlate(el, el.value, 0).submitted;
                    e.formData.set(el.name, sent);
                });
            }
        }
    });
    // A new country: the number takes its format.
    document.addEventListener('nds:dropmenu:select', function(e) {
        if (pickingCountry) return;
        var control = e.target.closest('.nds-form-control');
        var input = control && control.querySelector(':scope > input:not([type="hidden"])');
        if (input && getKind(input) === 'phone') stampIdentifier(input);
    });

    NDS.FormattedInput = {
        addIdRule: addIdRule,
        addFormat: addFormat,
        isNationalId: isNationalId,
        isIban: isIban
    };

})();
