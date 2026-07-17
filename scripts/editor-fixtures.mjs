// Scratch: drive editor paste-pipeline fixtures through the real browser sanitize.
// Run: node scratch-editor-fixtures.mjs  (dev server must be up on :4002)
import puppeteer from 'puppeteer-core';

const FIXTURES = [
    {
        name: 'gdocs-fake-bold+style-formatting',
        html: '<b style="font-weight:normal" id="docs-internal-guid-1"><p dir="rtl"><span style="font-weight:700">غامق</span><span> عادي </span><span style="font-style:italic">مائل</span> <span style="text-decoration:underline">تحته خط</span></p></b>',
        expect: [
            ['contains', '<strong>غامق</strong>'],
            ['contains', '<em>مائل</em>'],
            ['contains', '<u>تحته خط</u>'],
            ['not', '<b'],
            ['not', 'style='],
            ['not', 'docs-internal-guid'],
        ],
    },
    {
        name: 'div-paragraph-boundaries',
        html: '<div>الفقرة الأولى</div><div>الفقرة الثانية</div>',
        expect: [
            ['contains', '<p>الفقرة الأولى</p>'],
            ['contains', '<p>الفقرة الثانية</p>'],
            ['not', '<div'],
        ],
    },
    {
        name: 'word-paragraph+b/i-normalize',
        html: '<p class="MsoNormal" style="margin:0cm"><b>عنوان</b> نص عادي <i>مائل</i> <strike>محذوف</strike></p>',
        expect: [
            ['contains', '<strong>عنوان</strong>'],
            ['contains', '<em>مائل</em>'],
            ['contains', '<s>محذوف</s>'],
            ['not', 'MsoNormal'],
            ['not', '<b>'],
            ['not', '<i>'],
            ['not', '<strike>'],
        ],
    },
    {
        name: 'plain-table→nds-table',
        html: '<table border="1" style="width:50%"><thead><tr><th style="background:#eee">العمود</th></tr></thead><tbody><tr><td colspan="2" width="100">خلية</td></tr></tbody></table>',
        expect: [
            ['contains', 'class="nds-table"'],
            ['contains', 'colspan="2"'],
            ['contains', '<thead>'],
            ['not', 'border='],
            ['not', 'width='],
            ['not', 'background'],
        ],
    },
    {
        name: 'nds-card-kept+knob+junk-scrubbed',
        html: '<div class="nds-card demo-junk" style="--card-width: 20rem; color: red" data-foo="x" id="steal"><span class="nds-card-title">عنوان البطاقة</span><button class="nds-btn nds-primary" onclick="evil()"><span class="nds-label">زر</span></button></div>',
        expect: [
            ['contains', 'class="nds-card"'],
            ['contains', '--card-width'],
            ['contains', 'nds-card-title'],
            ['contains', 'type="button"'],
            ['not', 'demo-junk'],
            ['not', 'color'],
            ['not', 'data-foo'],
            ['not', 'id='],
            ['not', 'onclick'],
        ],
    },
    {
        name: 'nds-tag-inline-in-paragraph',
        html: '<p>حالة الطلب <span class="nds-tag nds-sm" data-status="success"><span class="nds-label">نشط</span></span> ضمن النص.</p>',
        expect: [
            ['contains', '<p>'],
            ['contains', 'data-status="success"'],
            ['contains', 'nds-tag'],
        ],
    },
    {
        name: 'evil-payloads-neutralized',
        html: '<img src="x" onerror="alert(1)"><a href="javascript:alert(1)">اضغط</a><script>alert(2)</script><p style="position:absolute;inset:0">نص</p><svg onload="alert(3)"></svg>',
        expect: [
            ['not', '<img'],
            ['not', 'javascript:'],
            ['not', '<script'],
            ['not', 'onerror'],
            ['not', 'onload'],
            ['not', 'position'],
            ['contains', '<p>نص</p>'],
        ],
    },
    {
        name: 'idempotent-round-trip',
        html: '<p><strong>غامق</strong></p><table class="nds-table"><tbody><tr><td>خلية</td></tr></tbody></table>',
        expect: [['roundtrip', null]],
    },
    {
        name: 'legacy-block-wrapper-degrades-to-region',
        html: '<div class="nds-editor-block" data-nds-block="nonexistent"><p>محتوى محفوظ</p><span onclick="x()">نص</span></div>',
        expect: [
            ['contains', 'محتوى محفوظ'],
            ['not', 'onclick'],
        ],
    },
    {
        name: 'root-level-br-no-duplication',
        paste: true,
        html: 'سطر أول<br>سطر ثانٍ',
        expect: [
            ['contains', '<br>'],
            ['not', '</br>'],
            ['count', '<br', 1],
        ],
    },
    {
        name: 'word-full-clipboard',
        paste: true,
        html: `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta http-equiv=Content-Type content="text/html; charset=windows-1252"><style><!--
p.MsoNormal, li.MsoNormal {margin:0cm; font-size:11.0pt; font-family:"Calibri",sans-serif;}
p.MsoListParagraph {margin-left:36.0pt; mso-add-space:auto;}
--></style></head><body lang=AR-SA style='tab-interval:36.0pt'>
<p class=MsoNormal><b>عنوان التقرير<o:p></o:p></b></p>
<p class=MsoNormal>نص عادي مع <i>مائل</i> و<span style='font-weight:700'>غامق بالنمط</span> و<span style='color:red'>ملون</span>.<o:p></o:p></p>
<p class=MsoListParagraph style='text-indent:-18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-family:Symbol;mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;&nbsp;</span></span><![endif]>البند الأول<o:p></o:p></p>
<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 style='border-collapse:collapse;mso-yfti-tbllook:1184'>
 <tr><td width=301 valign=top style='width:225.4pt;border:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal>الخلية الأولى<o:p></o:p></p></td>
 <td width=301 valign=top style='width:225.4pt;border:solid windowtext 1.0pt'><p class=MsoNormal><b>خلية غامقة</b><o:p></o:p></p></td></tr>
</table>
</body></html>`,
        expect: [
            ['contains', '<strong>عنوان التقرير</strong>'],
            ['contains', '<em>مائل</em>'],
            ['contains', '<strong>غامق بالنمط</strong>'],
            ['contains', 'ملون'],
            ['contains', '<li>البند الأول</li>'],
            ['contains', '<ul>'],
            ['not', '·'],
            ['contains', 'class="nds-table"'],
            ['contains', '<td>الخلية الأولى</td>'],
            ['contains', '<td><strong>خلية غامقة</strong></td>'],
            ['not', '<p><br></p>'], // caret-escape p is live-DOM only, never in the value
            ['not', 'MsoNormal'],
            ['not', 'mso-'],
            ['not', 'font-family'],
            ['not', 'Calibri'],
            ['not', '<style'],
            ['not', 'windowtext'],
            ['not', '<o:p'],
            ['not', 'style='],
        ],
    },
    {
        name: 'word-nested-numbered-lists',
        paste: true,
        html: `<html xmlns:o="urn:schemas-microsoft-com:office:office"><body>
<p class=MsoListParagraphCxSpFirst style='text-indent:-18.0pt;mso-list:l1 level1 lfo2'><![if !supportLists]><span style='mso-list:Ignore'>1.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;</span></span><![endif]>الخطوة الأولى<o:p></o:p></p>
<p class=MsoListParagraphCxSpMiddle style='text-indent:-18.0pt;mso-list:l1 level1 lfo2'><![if !supportLists]><span style='mso-list:Ignore'>2.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;</span></span><![endif]>الخطوة الثانية<o:p></o:p></p>
<p class=MsoListParagraphCxSpMiddle style='margin-left:72.0pt;text-indent:-18.0pt;mso-list:l1 level2 lfo2'><![if !supportLists]><span style='mso-list:Ignore'>a.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;</span></span><![endif]>تفصيل فرعي<o:p></o:p></p>
<p class=MsoListParagraphCxSpMiddle style='margin-left:72.0pt;text-indent:-18.0pt;mso-list:l1 level2 lfo2'><![if !supportLists]><span style='mso-list:Ignore'>b.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;</span></span><![endif]>تفصيل آخر<o:p></o:p></p>
<p class=MsoListParagraphCxSpLast style='text-indent:-18.0pt;mso-list:l1 level1 lfo2'><![if !supportLists]><span style='mso-list:Ignore'>3.<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;&nbsp;</span></span><![endif]>الخطوة الثالثة<o:p></o:p></p>
<p class=MsoNormal>فقرة عادية بعد القائمة.<o:p></o:p></p>
<p class=MsoListParagraph style='text-indent:-18.0pt;mso-list:l0 level1 lfo1'><![if !supportLists]><span style='font-family:Symbol;mso-list:Ignore'>·<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;</span></span><![endif]>نقطة منفصلة<o:p></o:p></p>
</body></html>`,
        expect: [
            ['contains', '<ol>'],
            ['contains', '<li>الخطوة الأولى</li>'],
            ['contains', '<li>تفصيل فرعي</li>'],
            ['contains', '<li>الخطوة الثالثة</li>'],
            ['contains', '<p>فقرة عادية بعد القائمة.</p>'],
            ['contains', '<ul>'],
            ['contains', '<li>نقطة منفصلة</li>'],
            ['not', 'mso-'],
            ['not', '·'],
            ['not', '1.'],
            ['not', 'a.'],
        ],
    },
    {
        name: 'gdocs-full-clipboard',
        paste: true,
        html: `<meta charset='utf-8'><b style="font-weight:normal;" id="docs-internal-guid-06e3a1f7"><p dir="rtl" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000000;font-weight:700;font-style:normal;text-decoration:none;white-space:pre-wrap;">عنوان غامق</span><span style="font-size:11pt;font-weight:400;white-space:pre-wrap;"> نص عادي </span><span style="font-size:11pt;font-weight:400;font-style:italic;white-space:pre-wrap;">مائل</span><span style="font-size:11pt;font-weight:400;text-decoration:underline;white-space:pre-wrap;"> تحته خط</span></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="rtl" style="list-style-type:disc;font-size:11pt;" aria-level="1"><p dir="rtl" style="line-height:1.38;" role="presentation"><span style="font-size:11pt;white-space:pre-wrap;">البند الأول</span></p></li><li dir="rtl" style="list-style-type:disc;" aria-level="1"><p dir="rtl" role="presentation"><span style="white-space:pre-wrap;">البند الثاني</span></p></li></ul><table style="border:none;border-collapse:collapse;"><colgroup><col width="185"><col width="185"></colgroup><tbody><tr style="height:0pt;"><td style="border:solid #000000 1pt;padding:5pt;vertical-align:top;"><p dir="rtl"><span style="white-space:pre-wrap;">خلية ١</span></p></td><td style="border:solid #000000 1pt;"><p dir="rtl"><span style="font-weight:700;white-space:pre-wrap;">خلية غامقة</span></p></td></tr></tbody></table></b>`,
        expect: [
            ['contains', '<strong>عنوان غامق</strong>'],
            ['contains', '<em>مائل</em>'],
            ['contains', '<u> تحته خط</u>'],
            ['contains', '<li>البند الأول</li>'],
            ['contains', '<li>البند الثاني</li>'],
            ['contains', 'class="nds-table"'],
            ['contains', '<td>خلية ١</td>'],
            ['contains', '<td><strong>خلية غامقة</strong></td>'],
            ['not', 'docs-internal-guid'],
            ['not', '<b>'],
            ['not', '<b '],
            ['not', 'aria-level'],
            ['not', '<col'],
            ['not', 'white-space'],
            ['not', 'style='],
            ['not', '<span'],
        ],
    },
    {
        // sanitizeHtml parses `<div id="root">${dirty}</div>`, so a stray </div>
        // closes root early and the tail parses as root's SIBLING — dropped by
        // `return root.innerHTML`. Safe (nothing escapes) but lossy; source view
        // is where a hand-typed unbalanced tag silently eats content.
        name: 'unbalanced-close-keeps-tail',
        html: '<div>أول</div></div><p>ثانٍ</p>',
        expect: [
            ['contains', 'أول'],
            ['contains', 'ثانٍ'],
        ],
    },
    {
        // interpretMarkup stamps nds-table on every classless table, promoting it
        // to a region — so its contents filter against NDS_TAGS (which has IMG)
        // instead of ALLOWED_TAGS (which doesn't). Same <img> at top level is
        // stripped; see evil-payloads-neutralized.
        name: 'img-in-plain-table-stripped',
        html: '<table><tbody><tr><td><img src="https://example.com/x.png" alt="صورة">خلية</td></tr></tbody></table>',
        expect: [
            ['contains', 'class="nds-table"'],
            ['contains', 'خلية'],
            ['not', '<img'],
        ],
    },
    {
        // Counterpart to the above: a table the AUTHOR claimed as NDS keeps full
        // NDS_TAGS trust, image included. Auto-converted vs authored is the whole
        // distinction CONVERTED_TAGS draws — this is the half that must not regress.
        name: 'authored-nds-table-keeps-img',
        html: '<table class="nds-table"><tbody><tr><td><img src="https://example.com/x.png" alt="صورة">خلية</td></tr></tbody></table>',
        expect: [
            ['contains', 'class="nds-table"'],
            ['contains', '<img'],
            ['contains', 'src="https://example.com/x.png"'],
            ['contains', 'alt="صورة"'],
        ],
    },
    {
        // With an empty textarea, init used to leave the editable's server DOM raw
        // and sanitize only into the form value — so what you saw wasn't what you
        // submitted. The editable must come out canonical on its own.
        name: 'init-canonicalizes-server-rendered-editable',
        init: true,
        html: '<div style="color:red" onclick="evil()">مسودة</div><script>alert(1)</script>',
        expect: [
            ['contains', 'مسودة'],
            ['contains', '<p>'],
            ['not', 'style='],
            ['not', 'onclick'],
            ['not', '<div'],
            ['not', '<script'],
        ],
    },
    {
        // The docs ARE the component palette: select a live demo on components/alert.md,
        // copy, paste here. Verbatim from that page — the docs→editor contract, which is
        // the insertion path that makes registerBlock unnecessary. Structure, status,
        // role and icon must all land intact.
        name: 'docs-live-demo-alert-round-trips',
        paste: true,
        html: `<div class="nds-alert nds-card" data-status="success" role="alert"><span class="nds-feedback nds-alert-icon nds-outline"><span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span></span><div class="nds-alert-content"><div class="nds-alert-text"><span class="nds-alert-title">Success</span><p class="nds-alert-description">Operation completed successfully!</p></div></div><button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button></div>`,
        expect: [
            ['contains', 'class="nds-alert nds-card"'],
            ['contains', 'data-status="success"'],
            ['contains', 'role="alert"'],
            ['contains', 'nds-alert-title'],
            ['contains', 'Operation completed successfully!'],
            ['contains', 'nds-hgi-cancel-01'],
            ['contains', 'type="button"'],
            ['contains', 'aria-label="Close alert"'],
        ],
    },
];

const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: 'new',
});
try {
    const page = await browser.newPage();
    await page.goto('http://localhost:4002/NDS-vanilla/playground.html', { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('.nds-editor[data-nds-editor-initialized]', { timeout: 20000 });

    // Fixtures marked paste:true go through the REAL paste path: a synthetic
    // ClipboardEvent on the editable → _onPaste → insertHTML → _syncSource,
    // read back from the form textarea. Others call the sanitize hook directly.
    async function runFixture(f) {
        // init:true builds the divergent shape — content server-rendered into the
        // editable, textarea empty — then returns what the editable holds after a
        // real NDS.Editor.create(). Proves init canonicalizes what it DISPLAYS,
        // not just what it syncs to the form value.
        if (f.init) return page.evaluate((html) => {
            const host = document.createElement('div');
            host.className = 'nds-form-container nds-textarea nds-editor';
            host.innerHTML = '<div class="nds-toolbar"></div>'
                + '<div class="nds-form-control">'
                + '<div class="nds-editor-editable" contenteditable="true"></div>'
                + '<textarea class="nds-editor-source"></textarea></div>';
            host.querySelector('.nds-editor-editable').innerHTML = html;
            document.body.appendChild(host);
            NDS.Editor.create(host);
            const out = host.querySelector('.nds-editor-editable').innerHTML;
            NDS.Editor.destroy(host);
            host.remove();
            return out;
        }, f.html);
        if (!f.paste) return page.evaluate((html) => NDS.Editor._sanitize(html), f.html);
        return page.evaluate(({ html, plainOnly }) => {
            const source = document.getElementById('story');
            const editable = source.closest('.nds-form-control').querySelector('.nds-editor-editable');
            editable.innerHTML = '<p><br></p>';
            editable.focus();
            const r = document.createRange();
            r.selectNodeContents(editable);
            r.collapse(false);
            const sel = getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
            const dt = new DataTransfer();
            if (!plainOnly) dt.setData('text/html', html);
            dt.setData('text/plain', plainOnly ? html : 'plain-fallback');
            editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
            return source.value;
        }, { html: f.html, plainOnly: !!f.plainOnly });
    }

    let failures = 0;
    for (const f of FIXTURES) {
        const out = await runFixture(f);
        const problems = [];
        for (const [kind, needle, n] of f.expect) {
            if (kind === 'contains' && !out.includes(needle)) problems.push(`MISSING ${needle}`);
            if (kind === 'not' && out.includes(needle)) problems.push(`LEAKED ${needle}`);
            if (kind === 'count') {
                const c = out.split(needle).length - 1;
                if (c !== n) problems.push(`COUNT ${needle}: expected ${n}, got ${c}`);
            }
            if (kind === 'roundtrip') {
                const again = await page.evaluate((h) => NDS.Editor._sanitize(h), out);
                if (again !== out) problems.push(`NOT IDEMPOTENT:\n  1st: ${out}\n  2nd: ${again}`);
            }
        }
        if (problems.length) {
            failures++;
            console.log(`FAIL ${f.name}`);
            problems.forEach(p => console.log(`  ${p}`));
            console.log(`  OUT: ${out}`);
        } else {
            console.log(`PASS ${f.name}`);
        }
    }
    // E2E: Tab indents in source view (caret insert + line-wise + outdent),
    // through the real keydown path.
    const tabOut = await page.evaluate(() => {
        const root = document.getElementById('story').closest('.nds-editor');
        const src = document.getElementById('story');
        const editable = root.querySelector('.nds-editor-editable');
        editable.innerHTML = '<p>سطر أول</p><p>سطر ثانٍ</p>';
        editable.dispatchEvent(new Event('input', { bubbles: true }));
        root.querySelector('[data-source-toggle]').click(); // enter source
        const tab = (shift) => src.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: !!shift, bubbles: true, cancelable: true }));
        src.setSelectionRange(0, 0);
        tab(false); // caret indent
        const afterCaret = src.value.startsWith('  <p>');
        src.setSelectionRange(0, src.value.length);
        tab(false); // line-wise indent (both lines)
        const lines = src.value.split('\n');
        const allIndented = lines.every(l => l.startsWith('  '));
        src.setSelectionRange(0, src.value.length);
        tab(true); // outdent
        tab(true); // outdent (removes the caret indent remnant too)
        const outdented = !src.value.split('\n').some(l => l.startsWith('  '));
        root.querySelector('[data-source-toggle]').click(); // back
        return { afterCaret, allIndented, outdented };
    });
    const tabProblems = Object.entries(tabOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (tabProblems.length) {
        failures++;
        console.log('FAIL source-tab-indent-e2e');
        tabProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS source-tab-indent-e2e');
    }

    // E2E: an editor selection carries into source view — the same text ends
    // up selected in the textarea.
    const carryOut = await page.evaluate(() => {
        const root = document.getElementById('story').closest('.nds-editor');
        const src = document.getElementById('story');
        const editable = root.querySelector('.nds-editor-editable');
        editable.innerHTML = '<p>فقرة أولى للتجربة</p><p>هدف <strong>التحديد</strong> هنا</p>';
        editable.dispatchEvent(new Event('input', { bubbles: true }));
        const target = editable.querySelector('strong').firstChild;
        const r = document.createRange();
        r.selectNodeContents(target);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        root.querySelector('[data-source-toggle]').click(); // enter source
        const picked = src.value.slice(src.selectionStart, src.selectionEnd);
        root.querySelector('[data-source-toggle]').click(); // back
        return { picked };
    });
    if (carryOut.picked !== 'التحديد') {
        failures++;
        console.log('FAIL selection-carry-e2e');
        console.log(`  expected "التحديد", got "${carryOut.picked}"`);
    } else {
        console.log('PASS selection-carry-e2e');
    }

    // E2E: clicking the editor's empty space (below content) yields a fresh
    // line with the caret in it — and repeated clicks don't stack empties.
    const emptyClickOut = await page.evaluate(() => {
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        editable.innerHTML = '<p>سطر موجود</p>';
        editable.dispatchEvent(new Event('input', { bubbles: true }));
        const clickBelow = () => {
            const rect = editable.getBoundingClientRect();
            editable.dispatchEvent(new MouseEvent('click', { clientX: rect.left + 10, clientY: rect.bottom - 5, bubbles: true }));
        };
        const valueBefore = document.getElementById('story').value;
        clickBelow();
        const pCount1 = editable.querySelectorAll('p').length;
        const valueClean = document.getElementById('story').value === valueBefore;
        const n = getSelection().anchorNode;
        const el = n && (n.nodeType === 3 ? n.parentElement : n);
        const caretInFreshP = !!el && el.tagName === 'P' && !el.textContent.trim();
        clickBelow();
        const pCount2 = editable.querySelectorAll('p').length;
        return { added: pCount1 === 2, caretInFreshP, noStacking: pCount2 === 2, valueClean };
    });
    const emptyClickProblems = Object.entries(emptyClickOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (emptyClickProblems.length) {
        failures++;
        console.log('FAIL empty-space-click-e2e');
        emptyClickProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS empty-space-click-e2e');
    }

    // E2E: the container's focus state follows real focus and drops only on
    // leaving the editor.
    const focusOut = await page.evaluate(() => {
        const root = document.getElementById('composed').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const has = () => (root.getAttribute('data-state') || '').split(/\s+/).includes('focus');
        editable.focus();
        const onSurface = has();
        document.getElementById('story').closest('.nds-editor').querySelector('.nds-editor-editable').focus();
        const afterLeave = !has();
        return { onSurface, afterLeave };
    });
    const focusProblems = Object.entries(focusOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (focusProblems.length) {
        failures++;
        console.log('FAIL focus-state-mirroring-e2e');
        focusProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS focus-state-mirroring-e2e');
    }

    console.log(failures ? `\n${failures} fixture(s) failed` : '\nAll fixtures passed');
    process.exitCode = failures ? 1 : 0;
} finally {
    await browser.close();
}
