/* NDS.typing — public surface (internal: the shaped typing of Date Picker, Time Picker, phone and IBAN)
 * Rides: (none — a base: each field passes its format's units)
 * Methods:
 *   NDS.typing.compile(format, tokens, getUnit)  the format as a mask, cached per format: tokens a regex
 *                                     with one group around the format's tokens, getUnit(token) its unit:
 *                                     { size, first, valid, open } for digits (no first: a fixed run, as a
 *                                     year), or { words(), keys, label(name) } for a word (AM/PM)
 *   NDS.typing.type(mask, value, caret, end, keys)  keys typed over [caret, end] → { value, caret }
 *   NDS.typing.addTypingListeners(input, options)  shaped typing and paste on the input: options { getMask(), read(text)
 *                                     (the text in the field's format, or null), adopt() (commit what the
 *                                     read just found; true when it did), signal, decimal }
 *   NDS.typing.group(text, caret, format, loose)  text in a slot format ("00 000 0000": 0 a digit, A a capital,
 *                                     a a small letter, * either as typed, ح an Arabic letter; loose, any in any slot)
 *                                     → { value, caret, dropped, open }: what a phone or an IBAN field
 *                                     shows, the indexes of the letters and digits it left out, and
 *                                     the slots still empty
 *   NDS.typing.isSlotCharacter(char)  true for a character some slot takes: a Latin or Arabic letter, a digit (Arabic too)
 * Events:
 *   (none — a write goes through NDS.setValue, so Forms hears it)
 * Hooks:
 *   (none — inputmode="decimal" when options.decimal and the input sets none; removed on abort)
 * Gotchas:
 *   - A digit unit's size is its most digits; open takes one or two ("D", "H"). first is the highest
 *     first digit a second can follow: past it the unit ends at once ("4" → "04/").
 *   - Arabic digits are read as Latin ones. A mask's units take digits only; group() takes letters too.
 *   - type() types over a whole value, as a date field does; group() inserts and moves the rest along,
 *     as a plain text box does.
 *   - A field it shaped gets a bubbling change on blur: WebKit sends none when a script wrote the last edit.
 */
(() => {
    'use strict';

    const toLatinDigits = NDS.toLatinDigits;
    const countDigits = (text) => toLatinDigits(text).replace(/\D/g, '').length;
    const isDigit = (char) => /\d/.test(char);
    const masks = new Map();   // tokens.source + format → mask

    function compile(format, tokens, getUnit) {
        const id = tokens.source + '\n' + format;
        if (masks.has(id)) return masks.get(id);
        const pieces = format.split(tokens).map((piece, index) => (index % 2 ? Object.assign({ token: piece }, getUnit(piece)) : piece));
        const units = pieces.filter((_, index) => index % 2);
        const digitUnits = units.filter((unit) => !unit.words);
        const mask = {
            pieces, digitUnits,
            separators: pieces.filter((_, index) => !(index % 2)).join(''),
            maxDigits: digitUnits.reduce((sum, unit) => sum + unit.size, 0),
            open: digitUnits.some((unit) => unit.open),
            word: units.find((unit) => unit.words),
        };
        masks.set(id, mask);
        return mask;
    }

    // The word the text holds at `at`, or ''.
    const getWordAt = (unit, text, at) => unit.words().find((word) => text.startsWith(word, at)) || '';
    // The word key last typed in the text: a typed "p" after a shown "AM" switches it.
    const getLastKey = (unit, text) => unit.keys[[...text].reverse().find((char) => unit.keys[char])];

    // Typing at the end → the format's shape: digits fill the units, separators appear on their own, a
    // word key fills its word. A lone digit is padded when no second can follow it ("4" → "04/") or a
    // typed separator closes it ("4/" → "04/"). Stops at the first unit not typed yet.
    function formatTyped(mask, text) {
        const latinText = toLatinDigits(text), closed = new Set();
        let digits = '';
        for (let index = 0; index < latinText.length; index++) {
            if (isDigit(latinText[index])) digits += latinText[index];
            else if (isDigit(latinText[index - 1])) closed.add(digits.length - 1);
        }
        let out = '', i = 0;
        for (const [index, piece] of mask.pieces.entries()) {
            if (!(index % 2)) { out += piece; continue; }
            if (piece.words) {
                const key = getLastKey(piece, latinText);
                if (!key) break;
                out += piece.label(key);
                continue;
            }
            if (i >= digits.length) break;
            let unit;
            if (piece.first === undefined) {
                unit = digits.slice(i, i += piece.size);
                out += unit;
                if (unit.length < piece.size) break;
                continue;
            }
            const ends = +digits[i] > piece.first || closed.has(i);
            // An open unit keeps a lone digit as it is ("9/5/2026"); the others pad it.
            unit = ends ? (piece.open ? '' : '0') + digits[i++] : digits.slice(i, i += piece.size);
            // A second digit past the unit ("32", "13", "25") is refused.
            if (unit.length === 2 && !piece.valid(unit)) unit = unit[0];
            out += unit;
            if (!ends && unit.length < 2) break;
        }
        return out;
    }

    // The units of a value that holds every separator of the format in order, as
    // [{ start, text, unit }]; null when one is missing or something else is there.
    function splitUnits(mask, value) {
        const units = [];
        let at = 0;
        for (const [index, piece] of mask.pieces.entries()) {
            if (!(index % 2)) {
                if (value.substr(at, piece.length) !== piece) return null;
                at += piece.length;
                continue;
            }
            const text = piece.words ? getWordAt(piece, value, at) : value.slice(at).match(/^\d*/)[0];
            units.push({ start: at, text, unit: piece });
            at += text.length;
        }
        return at === value.length ? units : null;
    }

    // The whole format, each unit at its width (an open one takes one digit or two), the word one of its words.
    function isComplete(mask, value) {
        const units = splitUnits(mask, value);
        return !!units && units.every(({ text, unit }) => text.length > 0
            && (unit.words || (text.length <= unit.size && (unit.open || text.length === unit.size))));
    }

    // Digits that fill a fixed-width format exactly, in its shape, with the word the text holds:
    // "28/051983" → "28/05/1983". Null when they do not, when a unit would not exist, or when an
    // open unit leaves the width open.
    function getFilled(mask, text) {
        const digits = toLatinDigits(text).replace(/\D/g, '');
        if (mask.open || digits.length !== mask.maxDigits) return null;
        let i = 0, fits = true;
        const filled = mask.pieces.map((piece, index) => {
            if (!(index % 2)) return piece;
            if (piece.words) {
                const word = piece.words().find((candidate) => text.includes(candidate));
                if (!word) fits = false;
                return word || '';
            }
            const unit = digits.slice(i, i += piece.size);
            if (piece.valid && !piece.valid(unit)) fits = false;
            return unit;
        }).join('');
        return fits ? filled : null;
    }

    // Typing inside a value an edit broke ("2/1983" after deleting "8/05") inserts the key at the caret,
    // as a plain text box does, up to the digits and separators the format holds. With every separator
    // in, a digit that makes its unit too long or impossible is refused. Once the digits fill the
    // format again, they take its shape (getFilled).
    function getTypedIn(mask, value, start, end, character) {
        const separator = /\D/.test(character), rest = value.slice(0, start) + value.slice(end);
        const count = (text) => text.split(character).length - 1;
        if (separator ? count(rest) >= count(mask.separators) : countDigits(rest) >= mask.maxDigits) return null;
        const typed = value.slice(0, start) + character + value.slice(end);
        const found = !separator && (splitUnits(mask, typed) || []).find((candidate) =>
            candidate.start <= start && start < candidate.start + candidate.text.length);
        if (found && (found.text.length > found.unit.size
            || (found.text.length === 2 && found.unit.valid && !found.unit.valid(found.text)))) return null;
        const filled = getFilled(mask, typed);
        if (filled === null) return { value: typed, caret: start + 1 };
        // The caret stays after the same digits, and after the separator when one was typed.
        const digitsBefore = countDigits(typed.slice(0, start + 1));
        let caret = 0;
        for (let seen = 0; caret < filled.length && seen < digitsBefore; caret++) if (isDigit(filled[caret])) seen++;
        if (separator && filled[caret] === character) caret++;
        return { value: filled, caret };
    }

    // The digit runs of a value, in the format's units, and its word. Any other character
    // ("." in hh.mm) is stepped over, not a run.
    function getRuns(mask, value) {
        const runs = [];
        let next = 0;
        for (let at = 0; at < value.length;) {
            const word = mask.word ? getWordAt(mask.word, value, at) : '';
            const text = word || value.slice(at).match(/^\d*/)[0];
            if (!text) { at++; continue; }
            const unit = word ? mask.word : mask.digitUnits[next++] || mask.digitUnits[mask.digitUnits.length - 1];
            runs.push({ start: at, end: at + text.length, text, unit });
            at += text.length;
        }
        return runs;
    }

    // Typing inside a whole value types over it, as a native date or time field does: the digit
    // replaces the one at the caret, the caret steps over separators, and a digit that makes an
    // impossible unit is refused. Returns { value, caret } or null.
    function getTypedOver(mask, value, position, end, character) {
        // Arabic digits keep their places as 0-9, so the caret and the runs below line up.
        character = toLatinDigits(character);
        value = toLatinDigits(value);
        const key = mask.word && mask.word.keys[character];
        if (!key && !isComplete(mask, value)) return getTypedIn(mask, value, position, end, character);
        const runs = getRuns(mask, value);
        const i = runs.findIndex((candidate) => candidate.end > position);
        // A one-digit open unit grows when the two digits fit ("|9/5" + "1" → "19/5", "1|/5" + "2" → "12/5"),
        // and a key at its start replaces it when they do not ("|9/5" + "4" → "4/5"): two digits can go where one was.
        const single = runs.findIndex((candidate) => candidate.unit.open && candidate.text.length === 1
            && candidate.start <= position && position <= candidate.end);
        if (single >= 0 && /^\d$/.test(character)) {
            const { unit, start, end: unitEnd, text } = runs[single], after = runs[single + 1] ? runs[single + 1].start : value.length;
            const insert = (caret) => ({ value: value.slice(0, position) + character + value.slice(position), caret });
            if (position === start && unit.valid(character + text)) return insert(position + 1);
            if (position === start) {
                return { value: value.slice(0, position) + character + value.slice(unitEnd), caret: +character > unit.first ? after : position + 1 };
            }
            if (unit.valid(text + character)) return insert(runs[single + 1] ? after + 1 : position + 1);
        }
        // Past the last unit: the same shaping as typing at the end.
        if (i < 0) return { value: formatTyped(mask, value + character), caret: null };
        const run = runs[i];
        const set = (text, caret) => ({ value: value.slice(0, run.start) + text + value.slice(run.end), caret });
        if (key) {
            const wordRun = runs.find((candidate) => candidate.unit.words);
            if (!wordRun) return null;
            return { value: value.slice(0, wordRun.start) + mask.word.label(key) + value.slice(wordRun.end), caret: position };
        }
        // A typed separator steps over the one at the caret; any other key is refused.
        if (!/^\d$/.test(character) || run.unit.words) return value[position] === character ? { value, caret: position + 1 } : null;

        const unit = run.unit, next = runs[i + 1] ? runs[i + 1].start : value.length;
        const offset = Math.max(0, position - run.start);
        const text = run.text.slice(0, offset) + character + run.text.slice(offset + 1);
        const step = offset >= text.length - 1 ? next : run.start + offset + 1;
        if (unit.first === undefined) return text.length > unit.size ? null : set(text, step);
        if (offset === 0 && run.text.length === 2 && !unit.valid(text)) {
            // No second digit can follow ("4" → "04"), or the old one can't: take the lowest that can ("39" → "30").
            if (+character > unit.first) return set('0' + character, next);
            return set(character + [...'0123456789'].find((digit) => unit.valid(character + digit)), run.start + 1);
        }
        return unit.valid(text) ? set(text, step) : null;
    }

    // Keys typed from the caret on, one by one as the user types them: at the end they are shaped
    // (formatTyped, or getTypedIn on a broken value, whose tail reshaping would drop), inside the
    // value they type over or go in (getTypedOver). A refused key is skipped. Returns { value, caret }.
    function type(mask, value, caret, end, keys) {
        value = toLatinDigits(value);
        for (const [index, character] of [...keys].entries()) {
            const key = toLatinDigits(character);
            let result;
            if ((index ? caret : end) >= value.length) {
                const head = value.slice(0, caret);
                result = formatTyped(mask, head).startsWith(head)
                    ? { value: formatTyped(mask, head + key) }
                    : getTypedIn(mask, head, head.length, head.length, key) || { value: head };
                result.caret = null;
            } else {
                result = getTypedOver(mask, value, caret, index ? caret : end, key);
                if (!result) continue;
            }
            value = result.value;
            caret = result.caret ?? value.length;
        }
        return { value, caret };
    }

    // Typing at the end is shaped; typing inside the value types over it. A delete keeps what the user
    // wrote, so Backspace can remove an added separator. A paste that reads as a value (read(text) → the
    // text in the field's format, or null) is that value, which adopt() may commit (true); anything
    // else goes in as if typed, under the same limits.
    function addTypingListeners(input, { getMask, read, adopt, signal, decimal }) {
        let shaped = false;
        // decimal, not numeric: its keypad has a separator key, and forms blocks non-digits under numeric.
        if (decimal && !input.hasAttribute('inputmode')) {
            input.inputMode = 'decimal';
            signal.addEventListener('abort', () => input.removeAttribute('inputmode'), { once: true });
        }
        const write = ({ value, caret }) => {
            if (value !== input.value) {
                shaped = true;
                // No inputType, so the shaping handler below skips it; Forms still hears it.
                NDS.setValue(input, value, { change: false });
            }
            input.setSelectionRange(caret, caret);
        };
        const take = (text) => {
            if (adopt && adopt()) return;
            write({ value: text, caret: text.length });
        };
        input.addEventListener('change', () => { shaped = false; }, { signal });
        input.addEventListener('input', (e) => {
            // A paste with no text to read in beforeinput: read what landed.
            if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop') {
                const text = read(input.value);
                if (text !== null) take(text);
                return;
            }
            if (e.inputType !== 'insertText' || e.isComposing || input.selectionEnd !== input.value.length) return;
            const before = input.value.slice(0, -e.data.length);
            const { value } = type(getMask(), before, before.length, before.length, e.data);
            // The prototype setter, as NDS.setValue writes: React's own would record the value, and the
            // input event in flight would then reach its onChange as no change.
            if (value !== input.value) { Object.getOwnPropertyDescriptor(Object.getPrototypeOf(input), 'value').set.call(input, value); shaped = true; }
        }, { signal });
        // A composed word (a phone keyboard) is shaped once it commits, as if typed at the end.
        input.addEventListener('compositionend', (e) => {
            if (!e.data || input.readOnly || input.selectionEnd !== input.value.length) return;
            const before = input.value.slice(0, -e.data.length);
            write(type(getMask(), before, before.length, before.length, e.data));
        }, { signal });
        input.addEventListener('beforeinput', (e) => {
            // Chrome sends beforeinput on a readonly field too.
            if (e.isComposing || input.readOnly) return;
            const { selectionStart: start, selectionEnd: end, value } = input;
            if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop') {
                const pasted = e.dataTransfer?.getData('text/plain') || e.data;
                if (!pasted) return;
                // The whole field's text, or the pasted text's own (a value dropped beside another).
                e.preventDefault();
                const text = read(value.slice(0, start) + pasted + value.slice(end)) ?? read(pasted);
                if (text !== null) take(text);
                else write(type(getMask(), value, start, end, pasted));
                return;
            }
            if (e.inputType !== 'insertText' || !e.data || end >= value.length) return;
            e.preventDefault();
            write(type(getMask(), value, start, end, e.data));
        }, { signal });
        // WebKit sends no change on blur when a script wrote the last edit: send it here.
        input.addEventListener('blur', () => {
            if (shaped) input.dispatchEvent(new Event('change', { bubbles: true }));
        }, { signal });
    }

    // Text laid into a slot format ("00 000 0000"): 0 takes a digit, A a letter written as a capital, a one
    // written small, * a letter or a digit as typed, ح an Arabic letter, and anything else is written as it is once a later slot
    // is filled, or once the user types it after the last character ("AB-"). A character the next slot does not take is dropped,
    // and so is everything past the last slot. The caret stays after the same characters, and past a
    // separator a later one follows. loose: every slot takes any character a slot takes, as typed. Returns
    // { value, caret, dropped, open }: dropped, the indexes of the letters and digits left out; open, the
    // slots left.
    const SLOTS = Object.freeze({ 0: /\d/, A: /[A-Za-z]/, a: /[A-Za-z]/, '*': /[A-Za-z\d]/, 'ح': /[ء-غف-ي]/ });
    // Arabic digits too: a field may show them (a plate in Arabic).
    const SLOT_CHARACTER = /[A-Za-z\dء-غف-ي٠-٩۰-۹]/;
    const isSlotCharacter = (char) => SLOT_CHARACTER.test(char);
    function group(text, caret, format, loose) {
        text = toLatinDigits(text);
        const slots = [...format].filter((char) => SLOTS[char]);
        // The fixed characters before each slot ("REF-" in "REF-0000"): the value carries them, and they fill no slot.
        const fixed = format.split(/[0Aa*ح]/);
        const kept = [], dropped = [];
        let before = 0, last = -1, read = 0;
        for (let index = 0; index < text.length; index++) {
            const slot = slots[kept.length];
            if (text[index] === fixed[kept.length][read]) { read++; continue; }
            if (!slot || !(loose ? SLOT_CHARACTER : SLOTS[slot]).test(text[index])) {
                if (isSlotCharacter(text[index])) dropped.push(index);
                continue;
            }
            let char = text[index];
            if (!loose && slot === 'A') char = char.toUpperCase();
            else if (!loose && slot === 'a') char = char.toLowerCase();
            kept.push(char);
            read = 0;
            if (index < caret) before = kept.length;
            last = index;
        }
        let value = '', placed = 0, at = 0, next = 0;
        for (; next < format.length && placed < kept.length; next++) {
            value += SLOTS[format[next]] ? kept[placed++] : format[next];
            if (placed === before) at = value.length;
        }
        // The separators before the next slot, when the user typed one of them after the last character.
        let gap = '';
        for (let index = next; index < format.length && !SLOTS[format[index]]; index++) gap += format[index];
        if (gap && [...text.slice(last + 1)].some((char) => gap.includes(char))) {
            value += gap;
            if (caret > last) at = value.length;
        }
        return { value, caret: at, dropped, open: slots.length - kept.length };
    }

    NDS.typing ={ compile, type, addTypingListeners, group, isSlotCharacter };
})();
