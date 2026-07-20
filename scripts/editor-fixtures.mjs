// Editor fixtures: drive the paste pipeline, shell guards, and history
// through the real browser. Runs against components/editor.html (its live
// demos pull the extras bundle) and injects its own two harness fields
// (#story, #report) — the playground stays a clean scratch page.
// Run: node scripts/editor-fixtures.mjs  (dev server must be up on :4002)
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
            ['contains', '<img src="x">'], // scheme-less src is a legal relative URL; the handler is what dies
            ['not', 'javascript:'],
            ['not', '<script'],
            ['not', 'onerror'],
            ['not', 'onload'],
            ['not', 'position'],
            ['contains', '<p>نص</p>'],
        ],
    },
    {
        name: 'img-safe-src-kept-junk-stripped',
        html: '<p>صورة <img src="https://example.com/a.png" alt="وصف" width="600" class="junk" loading="lazy" onerror="x()"> ضمن النص</p>',
        expect: [
            ['contains', '<img src="https://example.com/a.png" alt="وصف" width="600">'],
            ['contains', '<p>'],
            ['not', 'junk'],
            ['not', 'loading'],
            ['not', 'onerror'],
        ],
    },
    {
        // Only NUMERIC dims survive; percent/keyword junk goes.
        name: 'img-non-numeric-dims-stripped',
        html: '<img src="https://example.com/a.png" width="50%" height="auto">',
        expect: [
            ['contains', '<img src="https://example.com/a.png">'],
            ['not', 'width'],
            ['not', 'height'],
        ],
    },
    {
        // The reported case: canonical doc-example markup with a bare relative
        // src (no ./ prefix) — the image must survive the region scrub.
        name: 'nds-avatar-relative-src-kept',
        html: '<div class="nds-avatar nds-lg nds-image-border"> <img src="path/to/avatar.jpg" alt="User Avatar"> </div>',
        expect: [
            ['contains', 'nds-avatar'],
            ['contains', 'nds-image-border'],
            ['contains', 'src="path/to/avatar.jpg"'],
            ['contains', 'alt="User Avatar"'],
        ],
    },
    {
        // Relative trust must not open scheme smuggling: tab/newline inside
        // and whitespace around a URL are what browsers strip before
        // resolving — the scheme test sees the normalized form.
        name: 'url-scheme-smuggling-rejected',
        html: '<a href="jav' + String.fromCharCode(9) + 'ascript:alert(1)">رابط</a>'
            + '<a href="  javascript:alert(2)">آخر</a>'
            + '<img src="jav' + String.fromCharCode(10) + 'ascript:x">'
            + '<a href="details.html">صفحة</a>',
        expect: [
            ['not', 'ascript:'],
            ['not', 'javascript'],
            ['not', '<img'],
            ['contains', '<a href="details.html"'],
            ['contains', 'رابط'],
        ],
    },
    {
        // A bare void tag pasted as TEXT is markup, not literal text — the
        // raw-HTML heuristic must not demand a closing tag.
        name: 'bare-img-tag-pasted-as-text',
        paste: true,
        plainOnly: true,
        html: '<img src="data:image/png;base64,iVBORw0KGgo=" alt="لقطة">',
        expect: [
            ['contains', 'src="data:image/png;base64,iVBORw0KGgo="'],
            ['not', '&lt;img'],
        ],
    },
    {
        name: 'img-data-image-kept',
        html: '<img src="data:image/png;base64,iVBORw0KGgo=" alt="">',
        expect: [['contains', 'src="data:image/png;base64,iVBORw0KGgo="']],
    },
    {
        name: 'img-unsafe-src-dropped',
        html: '<p>قبل</p><img src="data:text/html;base64,PHNjcmlwdD4="><img src="file:///C:/clip_image001.png"><p>بعد</p>',
        expect: [
            ['not', '<img'],
            ['contains', '<p>قبل</p>'],
            ['contains', '<p>بعد</p>'],
        ],
    },
    {
        name: 'figure-degrades-to-img+caption-paragraph',
        html: '<figure><img src="https://example.com/i.jpg" alt="صورة"><figcaption>تعليق الصورة</figcaption></figure>',
        expect: [
            ['contains', '<img src="https://example.com/i.jpg" alt="صورة">'],
            ['contains', '<p>تعليق الصورة</p>'],
            ['not', '<figure'],
            ['not', '<figcaption'],
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
            // Per-block bidi direction survives (like Word's align=) — the
            // plain-vocabulary blocks keep dir; region cells scrub clean.
            ['contains', '<p dir="rtl">'],
            ['contains', '<li dir="rtl">البند الأول</li>'],
            ['contains', '<li dir="rtl">البند الثاني</li>'],
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
        // Images joined the plain vocabulary (1.4.1): a converted table keeps
        // a safe-src image, region-scrubbed; unsafe srcs still die whole.
        name: 'img-in-plain-table-kept-scrubbed',
        html: '<table><tbody><tr><td><img src="https://example.com/x.png" alt="صورة" width="80" onerror="x()">خلية</td><td><img src="file:///bad.png">أخرى</td></tr></tbody></table>',
        expect: [
            ['contains', 'class="nds-table"'],
            ['contains', 'src="https://example.com/x.png"'],
            ['contains', 'alt="صورة"'],
            ['contains', 'width="80"'],
            ['not', 'onerror'],
            ['count', '<img', 1],
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
        // A class token is trusted only when the WHOLE token is word-safe:
        // a markup-bearing token (nds-x<img…>) dies at the boundary instead
        // of relying on every sink (remove picker labels) to escape it.
        name: 'hostile-class-token-rejected',
        html: '<div class="nds-x<img/src=x/onerror=alert(1)>"><p>نص سليم</p></div>',
        expect: [
            ['contains', '<p>نص سليم</p>'],
            ['not', 'onerror'],
            ['not', 'nds-x'],
            ['not', '<img'],
        ],
    },
    {
        // Pasted external links pick up the NDS.Link badge treatment before
        // the value syncs; the tagging round-trips as a kept nds region.
        name: 'pasted-external-link-tagged',
        paste: true,
        html: '<p>راجع <a href="https://external.example/page">الدليل الخارجي</a> للمزيد.</p>',
        expect: [
            ['contains', 'nds-external'],
            ['contains', 'target="_blank"'],
            ['contains', 'rel="noopener noreferrer"'],
        ],
    },
    {
        // A linked atom (converted whole by the link command) round-trips
        // through the region scrub intact.
        name: 'linked-atom-region-round-trips',
        paste: true,
        html: '<p><a class="nds-featured-icon" href="https://example.com/f" rel="noopener noreferrer"><i class="hgi hgi-stroke hgi-stars"></i></a></p>',
        expect: [
            ['contains', 'nds-featured-icon'],
            ['contains', 'href="https://example.com/f"'],
            ['contains', 'hgi-stars'],
        ],
    },
    {
        // The author badge opt-out survives the plain-anchor scrub and
        // NDS.Link's tagging pass respects it — no nds-external stamped.
        name: 'anchor-no-external-optout-kept',
        paste: true,
        html: '<p>راجع <a href="https://external.example/page" data-no-external>الدليل</a> هنا.</p>',
        expect: [
            ['contains', 'data-no-external'],
            ['not', 'nds-external'],
        ],
    },
    {
        // Same opt-out through the NDS-region scrub (a linked button
        // component keeps the stamp).
        name: 'btn-anchor-region-keeps-no-external',
        paste: true,
        html: '<p><a class="nds-btn nds-primary" href="https://external.example/go" data-no-external><span class="nds-label">زر</span></a></p>',
        expect: [
            ['contains', 'data-no-external'],
            ['contains', 'nds-btn'],
            ['not', 'nds-external'],
        ],
    },
    {
        // The one target the editor writes survives sanitize (with the rel
        // pairing); every other target strips like any junk attribute.
        name: 'anchor-target-blank-kept-others-stripped',
        html: '<p><a href="https://a.example" target="_blank">خارجي</a> <a href="https://b.example" target="_top">داخلي</a></p>',
        expect: [
            ['contains', 'target="_blank"'],
            ['contains', 'rel="noopener noreferrer"'],
            ['not', '_top'],
        ],
    },
    {
        // An emptied component part survives the value round-trip (the
        // dead-empty-paragraph sweep exempts trusted regions); generic
        // empty paragraphs still drop.
        name: 'emptied-region-part-survives',
        html: '<div class="nds-alert nds-card"><p class="nds-alert-description"></p></div><p></p>',
        expect: [
            ['contains', 'nds-alert-description'],
            ['count', '<p', 1],
        ],
    },
    {
        // h4 joined the vocabulary (default heading set is h2-h4; h1 stays a
        // legal opt-in level); h5+ still unwraps to text.
        name: 'h4-in-vocabulary-h5-not',
        html: '<h4>عنوان رابع</h4><h5>خامس</h5>',
        expect: [
            ['contains', '<h4>عنوان رابع</h4>'],
            ['not', '<h5'],
        ],
    },
    {
        // Toolbar alignment is PHYSICAL (left/right/center/justify) — all
        // survive sanitize, incl. legacy Word align= attrs; logical start/end
        // stay accepted for already-saved content; non-alignment style strips.
        name: 'block-alignment-kept-junk-stripped',
        html: '<p style="text-align: center">وسط</p><p style="text-align: end">نهاية</p><h2 align="center">عنوان</h2><p style="text-align: left; color: red">يسار</p><p style="text-align: right">يمين</p>',
        expect: [
            ['count', 'text-align:', 5],
            ['contains', 'text-align: left'],
            ['contains', 'text-align: right'],
            ['contains', 'text-align: end'],
            ['not', 'color'],
        ],
    },
    {
        // Toolbar direction (native dir on blocks) survives; a bogus value and
        // dir on a non-block (inline) both strip. dir + align coexist.
        name: 'block-direction-kept-junk-stripped',
        html: '<p dir="rtl">يمين</p><h2 dir="ltr" style="text-align:center">left heading</h2><p dir="sideways">فقرة</p><p>نص <span dir="rtl">مضمّن</span></p>',
        expect: [
            ['contains', '<p dir="rtl">يمين</p>'],
            ['contains', 'dir="ltr"'],
            ['contains', 'text-align: center'],
            ['count', 'dir=', 2],
            ['not', 'sideways'],
        ],
    },
    {
        // Hydration canonicalizes what the generated editable DISPLAYS —
        // the textarea's dirty value must come out clean on the surface.
        name: 'init-canonicalizes-hydrated-value',
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
    await page.goto('http://localhost:4002/NDS-vanilla/components/editor.html', { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('.nds-editor[data-nds-editor-initialized]', { timeout: 20000 });

    // Inject the harness fields the fixtures drive by id — self-contained, so
    // no authored page has to carry them.
    await page.evaluate(() => {
        const host = document.createElement('div');
        host.innerHTML = `
          <div class="nds-form-container nds-textarea nds-editor" id="story-editor">
            <div class="nds-form-header"><label for="story"><span class="nds-label">القصة</span></label></div>
            <div class="nds-form-control"><textarea class="nds-textarea" name="story" id="story" placeholder="اكتب هنا"></textarea></div>
            <div class="nds-form-footer" data-feedback-target hidden></div>
          </div>
          <div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline strike | link | ul ol | source">
            <div class="nds-form-header"><label for="report"><span class="nds-label">التقرير</span></label></div>
            <div class="nds-form-control"><textarea class="nds-textarea" name="report" id="report" placeholder="اكتب هنا"></textarea></div>
            <div class="nds-form-footer" data-feedback-target hidden></div>
          </div>`;
        document.body.appendChild(host);
        host.querySelectorAll('.nds-editor').forEach(el => NDS.Editor.create(el));
        document.getElementById('story-editor').ndsEditor?.setImageUpload({ uploadUrl: 'embed' });
    });

    // Fixtures marked paste:true go through the REAL paste path: a synthetic
    // ClipboardEvent on the editable → _onPaste → insertHTML → _syncSource,
    // read back from the form textarea. Others call the sanitize hook directly.
    async function runFixture(f) {
        // init:true drives the adopt-a-textarea path — a standard field whose
        // textarea carries the (dirty) value — then returns what the GENERATED
        // editable displays after a real NDS.Editor.create(). Proves hydration
        // canonicalizes what it DISPLAYS, not just what it syncs back.
        if (f.init) return page.evaluate((html) => {
            const host = document.createElement('div');
            host.className = 'nds-form-container nds-textarea nds-editor';
            host.innerHTML = '<div class="nds-form-control"><textarea class="nds-textarea"></textarea></div>';
            host.querySelector('textarea').value = html;
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
        const root = document.getElementById('report').closest('.nds-editor');
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

    // E2E: component shells are atomic to boundary deletes — a Backspace/
    // Delete that would cross a shell edge (from either side) stops dead:
    // prevented, nothing selected, shell intact. Removal is explicit-select
    // only; inner text editing stays free.
    const shellOut = await page.evaluate(async () => {
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const sel = getSelection();
        const setCaret = (node, off) => {
            const r = document.createRange();
            r.setStart(node, off);
            r.collapse(true);
            sel.removeAllRanges();
            sel.addRange(r);
        };
        editable.innerHTML = '<div class="nds-card"><span class="nds-card-title">بطاقة</span></div><p>بعد</p>';
        editable.focus();

        setCaret(editable.querySelector('p').firstChild, 0);
        const evb = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evb);
        const cardIntact = !!editable.querySelector('.nds-card');
        const boundaryStops = evb.defaultPrevented && sel.isCollapsed;

        const title = editable.querySelector('.nds-card-title').firstChild;
        setCaret(title, 0);
        const ev = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(ev);
        const innerEdgeBlocked = ev.defaultPrevented;

        setCaret(title, 2);
        const ev2 = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(ev2);
        const innerEditFree = !ev2.defaultPrevented;

        // The reported alert cases: caret in the EMPTY paragraph after the
        // shell (element-container caret, not text) + Backspace, and in the
        // empty paragraph before it (br filler in the way) + Delete.
        // Whitespace between parts mirrors real pretty-printed pastes — it
        // survives inside regions and double-click selections drag it along.
        const ALERT = '<div class="nds-alert nds-card" data-status="success" role="alert">\n  <span class="nds-feedback nds-alert-icon nds-outline"><span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span></span>\n  <div class="nds-alert-content"><div class="nds-alert-text">\n    <span class="nds-alert-title">Success</span>\n    <p class="nds-alert-description">تم بنجاح</p>\n  </div></div>\n</div>';
        editable.innerHTML = `<p><br></p>${ALERT}<p><br></p>`;
        setCaret(editable.lastElementChild, 0);
        const eva = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(eva);
        const alertStopsFromAfter = eva.defaultPrevented && !!editable.querySelector('.nds-alert') && sel.isCollapsed;

        setCaret(editable.firstElementChild, 0);
        const evd = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true, cancelable: true });
        editable.dispatchEvent(evd);
        const alertStopsFromBefore = evd.defaultPrevented && !!editable.querySelector('.nds-alert') && sel.isCollapsed;

        // Inner PART walls: description start Backspace / end Delete can't
        // leak into sibling parts; mid-text editing stays free.
        const desc = editable.querySelector('.nds-alert-description').firstChild;
        setCaret(desc, 0);
        const evp1 = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evp1);
        const partStartBlocked = evp1.defaultPrevented;

        setCaret(desc, desc.textContent.length);
        const evp2 = new KeyboardEvent('keydown', { key: 'Delete', bubbles: true, cancelable: true });
        editable.dispatchEvent(evp2);
        const partEndBlocked = evp2.defaultPrevented;

        setCaret(desc, 2);
        const evp3 = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evp3);
        const partEditFree = !evp3.defaultPrevented;

        // Cross-part SELECTION deletes are blocked (title→description would
        // merge parts); a selection within one part stays a free text edit.
        const alertTitle = editable.querySelector('.nds-alert-title').firstChild;
        const r2 = document.createRange();
        r2.setStart(alertTitle, 0);
        r2.setEnd(desc, 2);
        sel.removeAllRanges();
        sel.addRange(r2);
        const evx = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evx);
        const crossPartSelectionBlocked = evx.defaultPrevented;

        const r3 = document.createRange();
        r3.setStart(desc, 0);
        r3.setEnd(desc, 3);
        sel.removeAllRanges();
        sel.addRange(r3);
        const evs = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evs);
        const samePartSelectionFree = !evs.defaultPrevented;

        // Full-part selection with the browser's over-reaching end boundary
        // (endContainer = the wrapper, past the part) is still a same-part
        // text edit — free; a drag spanning the whole shell from generic
        // content on both sides stays the explicit-removal path — free.
        const descP = editable.querySelector('.nds-alert-description');
        const r4 = document.createRange();
        r4.setStart(desc, 0);
        r4.setEndAfter(descP);
        sel.removeAllRanges();
        sel.addRange(r4);
        const evf = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evf);
        const fullPartSelectionFree = !evf.defaultPrevented;

        const r5 = document.createRange();
        r5.setStart(editable.firstElementChild, 0);
        r5.setEnd(editable.lastElementChild, 0);
        sel.removeAllRanges();
        sel.addRange(r5);
        const evw = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evw);
        const wholeShellDragFree = !evw.defaultPrevented;

        // Double-click word selection: the trailing whitespace it drags along
        // (the inter-part text node after the title span) must stay inert —
        // same-part edit, free.
        const wsAfterTitle = editable.querySelector('.nds-alert-title').nextSibling;
        const r6 = document.createRange();
        r6.setStart(alertTitle, 0);
        r6.setEnd(wsAfterTitle, 1);
        sel.removeAllRanges();
        sel.addRange(r6);
        const evdc = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true });
        editable.dispatchEvent(evdc);
        const wordSelectionFree = !evdc.defaultPrevented;

        // Enter inside a part becomes a <br> line break — no block split, no
        // duplicated part, caret stays inside.
        setCaret(desc, 2);
        const eve = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
        editable.dispatchEvent(eve);
        const descEl = editable.querySelectorAll('.nds-alert-description');
        const enterKeptPart = eve.defaultPrevented
            && descEl.length === 1
            && descEl[0].innerHTML.includes('<br>');

        // Toolbar remove: caret-gated (disabled outside a shell, enabled
        // inside); the destructive trigger opens a level-picker popover —
        // the shell survives until a level row is clicked.
        const removeBtn = root.querySelector('[data-cmd="remove"]');
        const removeMenu = root.querySelector('[data-editor-remove-dropmenu] .nds-dropmenu-menu');
        const raf = () => new Promise(requestAnimationFrame);
        setCaret(editable.firstElementChild, 0);
        document.dispatchEvent(new Event('selectionchange'));
        await raf(); await raf();
        const removeDisabledOutside = removeBtn.disabled;
        setCaret(desc, 1);
        document.dispatchEvent(new Event('selectionchange'));
        await raf(); await raf();
        const removeEnabledInside = !removeBtn.disabled;

        // Level picker: caret inside a nested component (tag chip in the
        // description) lists both levels, innermost first; structural parts
        // never list.
        const descPEl = editable.querySelector('.nds-alert-description');
        descPEl.innerHTML = 'تم <span class="nds-tag"><span class="nds-label">وسم</span></span> بنجاح';
        setCaret(descPEl.querySelector('.nds-tag .nds-label').firstChild, 1);
        removeBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        let rows = removeMenu.querySelectorAll('[data-editor-remove-level]');
        const nestedLevels = rows.length === 2
            && rows[0].textContent.includes('nds-alert')
            && rows[1].textContent.includes('nds-tag');

        // Removing the inner (indented) level keeps the shell.
        rows[1].click();
        const innerLevelRemoved = !editable.querySelector('.nds-tag') && !!editable.querySelector('.nds-alert');

        // Single level from plain part text; the shell survives the trigger
        // click and dies on its row. Re-query: the removal's history
        // neutralization re-parses the content, detaching old references.
        setCaret(editable.querySelector('.nds-alert-description').firstChild, 1);
        document.dispatchEvent(new Event('selectionchange'));
        await raf(); await raf();
        removeBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        removeBtn.click();
        await raf();
        const removeConfirmGate = !!editable.querySelector('.nds-alert');
        rows = removeMenu.querySelectorAll('[data-editor-remove-level]');
        const removeLevelNamed = rows.length === 1 && rows[0].textContent.includes('nds-alert');
        rows[0].click();
        const removeDeletesShell = !editable.querySelector('.nds-alert');

        // Ctrl+Z right after removal restores the component via the editor's
        // single-slot restore.
        editable.focus();
        editable.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true, cancelable: true }));
        const removeUndoRestores = !!editable.querySelector('.nds-alert');

        // Unified editor history: remove a nested tag, type, then walk back —
        // first undo lifts the typing, second restores the tag; redo re-runs
        // the removal. The shell survives every step.
        editable.innerHTML = '<div class="nds-alert nds-card"><p class="nds-alert-description">قبل <span class="nds-tag"><span class="nds-label">وسم</span></span> بعد</p></div><p>نص</p>';
        root.ndsEditor._syncSource(); // snapshot the setup (direct innerHTML bypasses tracking)
        setCaret(editable.querySelector('.nds-tag .nds-label').firstChild, 1);
        document.dispatchEvent(new Event('selectionchange'));
        await raf(); await raf();
        removeBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        const tagRow = [...removeMenu.querySelectorAll('[data-editor-remove-level]')].find(b => b.textContent.includes('nds-tag'));
        tagRow.click();
        const histTagRemoved = !editable.querySelector('.nds-tag');
        editable.focus();
        document.execCommand('insertText', false, 'xyz');
        const histTyped = editable.textContent.includes('xyz');
        const undoKey = (key) => editable.dispatchEvent(new KeyboardEvent('keydown', { key, ctrlKey: true, bubbles: true, cancelable: true }));
        undoKey('z');
        const histTypingUndone = !editable.textContent.includes('xyz') && !editable.querySelector('.nds-tag');
        undoKey('z');
        const removalHistorySafe = histTagRemoved && histTyped && histTypingUndone
            && !!editable.querySelector('.nds-alert');
        const removalChainRestore = !!editable.querySelector('.nds-tag') && !!editable.querySelector('.nds-alert');
        undoKey('y');
        const removalRedoWorks = !editable.querySelector('.nds-tag') && !!editable.querySelector('.nds-alert');

        // Selection OUTSIDE the editor: the gate disables and the picker
        // yields no levels — page chrome (nds-content-layout…) must never
        // list as removable.
        const outsideText = document.querySelector('.nds-section-title').firstChild;
        setCaret(outsideText, 0);
        document.dispatchEvent(new Event('selectionchange'));
        await raf(); await raf();
        removeBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        const outsideSelectionSafe = removeBtn.disabled
            && removeMenu.querySelectorAll('[data-editor-remove-level]').length === 0;

        return { cardIntact, boundaryStops, innerEdgeBlocked, innerEditFree, alertStopsFromAfter, alertStopsFromBefore, partStartBlocked, partEndBlocked, partEditFree, crossPartSelectionBlocked, samePartSelectionFree, fullPartSelectionFree, wholeShellDragFree, wordSelectionFree, enterKeptPart, removeDisabledOutside, removeEnabledInside, nestedLevels, innerLevelRemoved, removeConfirmGate, removeLevelNamed, removeDeletesShell, removeUndoRestores, removalHistorySafe, removalChainRestore, removalRedoWorks, outsideSelectionSafe };
    });
    const shellProblems = Object.entries(shellOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (shellProblems.length) {
        failures++;
        console.log('FAIL shell-delete-guard-e2e');
        shellProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS shell-delete-guard-e2e');
    }

    // E2E: the remove picker names a component by its well-formed nds- class
    // and IGNORES a malformed token — even on DOM that never went through
    // sanitize (componentNameOf's own /^nds-[\w-]+$/ gate, independent of the
    // NDS_CLASS boundary strip). No markup-bearing token reaches the label sink.
    const cnofOut = await page.evaluate(async () => {
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const removeBtn = root.querySelector('[data-cmd="remove"]');
        const removeMenu = root.querySelector('[data-editor-remove-dropmenu] .nds-dropmenu-menu');
        const levels = root.querySelector('[data-editor-remove-levels]');
        const raf = () => new Promise(requestAnimationFrame);
        const sel = getSelection();
        window.__cnofXss = undefined;

        // Build the region DIRECTLY (setAttribute bypasses the sanitizer) so the
        // hostile token is live on the element the picker reads its name from.
        editable.innerHTML = '';
        const region = document.createElement('div');
        region.setAttribute('class', 'nds-card nds-x<img/src=x/onerror=window.__cnofXss=1>');
        region.textContent = 'محتوى';
        editable.appendChild(region);

        const r = document.createRange();
        r.setStart(region.firstChild, 1);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
        document.dispatchEvent(new Event('selectionchange'));
        await raf(); await raf();
        removeBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));

        const rows = removeMenu.querySelectorAll('[data-editor-remove-level]');
        const label = rows.length === 1 ? rows[0].textContent : '';
        return {
            oneLevel: rows.length === 1,
            labelsWellFormedName: label.includes('nds-card'),
            ignoresHostileToken: !label.includes('nds-x'),
            noImgInPicker: !levels.querySelector('img'),
            noOnerrorInHtml: !/onerror/i.test(levels.innerHTML),
            noXssFired: window.__cnofXss !== 1,
        };
    });
    const cnofProblems = Object.entries(cnofOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (cnofProblems.length) {
        failures++;
        console.log('FAIL remove-picker-componentname-safe-e2e');
        cnofProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS remove-picker-componentname-safe-e2e');
    }

    // E2E: link popover Tab order skips the hidden Unlink — from Cancel, Tab
    // lands on Confirm (the dropmenu's focus walk must ignore [hidden] items).
    const linkTabOut = await page.evaluate(async () => {
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        editable.innerHTML = '<p>نص</p>';
        editable.focus();
        const sel = getSelection();
        const r = document.createRange();
        r.setStart(editable.querySelector('p').firstChild, 1);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
        const linkBtn = root.querySelector('[data-cmd="link"]');
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await new Promise(requestAnimationFrame);
        const menu = root.querySelector('[data-editor-link-dropmenu] .nds-dropmenu-menu');
        const cancel = menu.querySelector('[data-editor-link-cancel]');
        const confirm = menu.querySelector('[data-editor-link-confirm]');
        const unlinkHidden = menu.querySelector('[data-editor-link-unlink]').hidden;
        cancel.focus();
        cancel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
        const skipsHiddenUnlink = document.activeElement === confirm;

        // Confirm an external link: the inserted anchor is canon (nds-link)
        // and badge-tagged (nds-external + target), in DOM and value alike.
        menu.querySelector('[data-editor-link-text]').value = 'External guide';
        menu.querySelector('[data-editor-link-url]').value = 'https://external.example/guide';
        menu.querySelector('[data-editor-link-external]').checked = true;
        menu.querySelector('[data-editor-link-colored]').checked = true;
        confirm.click();
        const a = editable.querySelector('a');
        const insertedLinkCanon = !!a
            && a.classList.contains('nds-link')
            && a.classList.contains('nds-primary')
            && a.classList.contains('nds-external')
            && a.getAttribute('target') === '_blank'
            && root.querySelector('.nds-editor-source').value.includes('nds-primary');

        // Re-edit with the badge opt-out: data-no-external stamps, the auto
        // badge class clears, and NDS.Link's re-tag pass respects the stamp.
        const r2 = document.createRange();
        r2.setStart(a.firstChild, 1);
        r2.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r2);
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await new Promise(requestAnimationFrame);
        const noExtInput = menu.querySelector('[data-editor-link-noexternal]');
        const optOutUnchecked = !noExtInput.checked;
        noExtInput.checked = true;
        confirm.click();
        const badgeOptOut = a.hasAttribute('data-no-external')
            && !a.classList.contains('nds-external')
            && a.getAttribute('target') === '_blank'
            && root.querySelector('.nds-editor-source').value.includes('data-no-external');
        return { unlinkHidden, skipsHiddenUnlink, insertedLinkCanon, optOutUnchecked, badgeOptOut };
    });
    const linkTabProblems = Object.entries(linkTabOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (linkTabProblems.length) {
        failures++;
        console.log('FAIL link-popover-tab-e2e');
        linkTabProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS link-popover-tab-e2e');
    }

    // E2E: link on a .nds-btn component converts the element whole (button ⇄
    // anchor, classes/aria carried, label renamed in place) — never a
    // label-wrapping <a> inside the button. Unlink converts back.
    const linkBtnOut = await page.evaluate(async () => {
        const raf = () => new Promise(requestAnimationFrame);
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const source = root.querySelector('.nds-editor-source');
        editable.innerHTML = '<p>قبل <button class="nds-btn nds-primary" type="button" aria-label="زر"><span class="nds-label">زر</span></button> بعد</p>';
        editable.focus();
        // Caret inside the label text — the reported flow (clicking the button).
        const sel = getSelection();
        const r = document.createRange();
        r.setStart(editable.querySelector('.nds-label').firstChild, 1);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
        const linkBtn = root.querySelector('[data-cmd="link"]');
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        const menu = root.querySelector('[data-editor-link-dropmenu] .nds-dropmenu-menu');
        const prefills = menu.querySelector('[data-editor-link-text]').value === 'زر';
        const coloredHidden = menu.querySelector('[data-editor-link-colored]').closest('.nds-form-container').hidden;
        menu.querySelector('[data-editor-link-text]').value = 'رابط الزر';
        menu.querySelector('[data-editor-link-url]').value = 'https://example.com/action';
        menu.querySelector('[data-editor-link-external]').checked = true;
        menu.querySelector('[data-editor-link-confirm]').click();
        await raf();
        const a = editable.querySelector('a.nds-btn');
        const converted = !!a && !editable.querySelector('button')
            && a.classList.contains('nds-primary')
            && !a.classList.contains('nds-link')
            && a.getAttribute('href') === 'https://example.com/action'
            && a.getAttribute('target') === '_blank'
            && a.getAttribute('rel') === 'noopener noreferrer'
            && a.getAttribute('aria-label') === 'زر'
            && !a.hasAttribute('type');
        const labelRenamed = a?.querySelector('.nds-label')?.textContent === 'رابط الزر';
        const valueHasAnchor = /<a [^>]*nds-btn/.test(source.value);

        // Unlink converts back whole (execCommand unlink would unwrap the
        // element and strand its children).
        const r2 = document.createRange();
        r2.setStart(a.querySelector('.nds-label').firstChild, 1);
        r2.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r2);
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        const unlinkVisible = !menu.querySelector('[data-editor-link-unlink]').hidden;
        menu.querySelector('[data-editor-link-unlink]').click();
        await raf();
        const back = editable.querySelector('button.nds-btn');
        const reverted = !!back && !editable.querySelector('a')
            && back.getAttribute('type') === 'button'
            && !back.hasAttribute('href') && !back.hasAttribute('target') && !back.hasAttribute('rel')
            && !back.classList.contains('nds-external')
            && back.querySelector('.nds-label')?.textContent === 'رابط الزر';

        // ANY button converts, not just .nds-btn — a link nested inside a
        // button is meaningless, so a classless sub-button converts whole too.
        editable.innerHTML = '<p><button type="button"><span class="nds-label">إجراء</span></button></p>';
        const r3 = document.createRange();
        r3.setStart(editable.querySelector('.nds-label').firstChild, 1);
        r3.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r3);
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        menu.querySelector('[data-editor-link-url]').value = 'https://example.com/act';
        menu.querySelector('[data-editor-link-confirm]').click();
        await raf();
        const plainA = editable.querySelector('a');
        const anyBtnConverts = !!plainA && !editable.querySelector('button')
            && plainA.getAttribute('href') === 'https://example.com/act'
            && !plainA.hasAttribute('type')
            && plainA.querySelector('.nds-label')?.textContent === 'إجراء';

        // Inline atoms convert too — the OUTERMOST nds wrapper at the caret
        // (featured-icon around an <i>), never a link inside the atom. Its
        // icon-only content also hides the text field (nothing to rename).
        editable.innerHTML = '<p>ميزة <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-stars"></i></span> هنا</p>';
        const r4 = document.createRange();
        r4.setStart(editable.querySelector('.nds-featured-icon i'), 0);
        r4.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r4);
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        const atomTextHidden = menu.querySelector('[data-editor-link-text]').closest('.nds-form-container').hidden;
        menu.querySelector('[data-editor-link-url]').value = 'https://example.com/feature';
        menu.querySelector('[data-editor-link-confirm]').click();
        await raf();
        const featA = editable.querySelector('a.nds-featured-icon');
        const atomConverts = !!featA && !editable.querySelector('span.nds-featured-icon')
            && !!featA.querySelector('i.hgi-stars')
            && featA.getAttribute('href') === 'https://example.com/feature'
            && !featA.classList.contains('nds-link');

        // Atom unlink re-roots as <span> (identity lives in the classes).
        const r5 = document.createRange();
        r5.setStart(featA.querySelector('i'), 0);
        r5.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r5);
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        menu.querySelector('[data-editor-link-unlink]').click();
        await raf();
        const atomReverts = !!editable.querySelector('span.nds-featured-icon i.hgi-stars')
            && !editable.querySelector('a');

        // An avatar links via its image: the textless nds SHELL converts
        // whole — no anchor nested inside the component.
        editable.innerHTML = '<p>الملف</p><div class="nds-avatar nds-lg"><img src="/NDS-vanilla/assets/img/avatar1.webp" alt="صورة"></div>';
        const avImg = editable.querySelector('.nds-avatar img');
        avImg.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        await raf(); await raf();
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        menu.querySelector('[data-editor-link-url]').value = 'https://example.com/profile';
        menu.querySelector('[data-editor-link-confirm]').click();
        await raf();
        const avA = editable.querySelector('a.nds-avatar');
        const shellConverts = !!avA && !editable.querySelector('div.nds-avatar')
            && !!avA.querySelector('img')
            && avA.getAttribute('href') === 'https://example.com/profile'
            && !avA.querySelector('a');
        return { prefills, coloredHidden, converted, labelRenamed, valueHasAnchor, unlinkVisible, reverted, anyBtnConverts, atomTextHidden, atomConverts, atomReverts, shellConverts };
    });
    const linkBtnProblems = Object.entries(linkBtnOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (linkBtnProblems.length) {
        failures++;
        console.log('FAIL link-button-convert-e2e');
        linkBtnProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS link-button-convert-e2e');
    }

    // E2E: a selected (clicked) image accepts a link — wraps in <a href>
    // (no nds-link canon, text field hidden), edits in place on re-open,
    // unlink unwraps and frees the image.
    const linkImgOut = await page.evaluate(async () => {
        const raf = () => new Promise(requestAnimationFrame);
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const source = root.querySelector('.nds-editor-source');
        editable.innerHTML = '<p>صورة <img src="/NDS-vanilla/assets/img/avatar1.webp" alt="وصف"> هنا</p>';
        editable.focus();
        const img = editable.querySelector('img');
        img.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        await raf(); await raf();
        const linkBtn = root.querySelector('[data-cmd="link"]');
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        const menu = root.querySelector('[data-editor-link-dropmenu] .nds-dropmenu-menu');
        const textHidden = menu.querySelector('[data-editor-link-text]').closest('.nds-form-container').hidden;
        menu.querySelector('[data-editor-link-url]').value = 'https://example.com/full';
        menu.querySelector('[data-editor-link-external]').checked = true;
        menu.querySelector('[data-editor-link-confirm]').click();
        await raf();
        const a = editable.querySelector('a');
        const wrapped = !!a && a.querySelector('img') === img
            && a.getAttribute('href') === 'https://example.com/full'
            && a.getAttribute('target') === '_blank'
            && a.getAttribute('rel') === 'noopener noreferrer'
            && !a.classList.contains('nds-link')
            && source.value.includes('https://example.com/full');

        // Re-open on the wrapped image: prefills for edit-in-place; unlink
        // unwraps and frees the image.
        img.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        await raf(); await raf();
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        const prefilled = menu.querySelector('[data-editor-link-url]').value === 'https://example.com/full';
        const unlinkItem = menu.querySelector('[data-editor-link-unlink]');
        const unlinkShown = !unlinkItem.hidden;
        unlinkItem.click();
        await raf();
        const unwrapped = !editable.querySelector('a') && !!editable.querySelector('img');
        return { textHidden, wrapped, prefilled, unlinkShown, unwrapped };
    });
    const linkImgProblems = Object.entries(linkImgOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (linkImgProblems.length) {
        failures++;
        console.log('FAIL link-image-wrap-e2e');
        linkImgProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS link-image-wrap-e2e');
    }

    // E2E: atom caret guards — clicking a textless atom selects it whole (no
    // trapped caret), the whole-selected atom still links by conversion, and
    // Enter inside an inline atom ESCAPES to after it (no split, no <br>).
    const atomGuardOut = await page.evaluate(async () => {
        const raf = () => new Promise(requestAnimationFrame);
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const sel = getSelection();

        // 1 — click on the icon selects the featured-icon atom whole.
        editable.innerHTML = '<p>قبل <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-stars"></i></span> بعد</p>';
        editable.focus();
        const feat = editable.querySelector('.nds-featured-icon');
        feat.querySelector('i').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        await raf();
        const r0 = sel.rangeCount ? sel.getRangeAt(0) : null;
        const clickSelectsAtom = !!r0 && !r0.collapsed
            && r0.startContainer === feat.parentElement
            && r0.startContainer.childNodes[r0.startOffset] === feat;
        // Selected-component feedback marker (rAF-throttled selectionchange).
        await raf(); await raf();
        const markerStamped = feat.hasAttribute('data-editor-selected');
        // The whole-selected atom arms the remove command and lists in the
        // picker (the selection anchor alone — its parent — would miss it).
        const rmBtn = root.querySelector('[data-cmd="remove"]');
        const removeArmedForAtom = !rmBtn.disabled;
        rmBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        const removeListsAtom = Array.from(root.querySelectorAll('[data-editor-remove-level]'))
            .some(b => b.textContent.includes('nds-featured-icon'));

        // 2 — the whole-selected atom links by conversion.
        const linkBtn = root.querySelector('[data-cmd="link"]');
        const menu = root.querySelector('[data-editor-link-dropmenu] .nds-dropmenu-menu');
        linkBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        linkBtn.click();
        await raf();
        menu.querySelector('[data-editor-link-url]').value = 'https://example.com/star';
        menu.querySelector('[data-editor-link-confirm]').click();
        await raf();
        const selectedAtomConverts = !!editable.querySelector('a.nds-featured-icon[href="https://example.com/star"] i.hgi-stars')
            && !editable.querySelector('span.nds-featured-icon');
        // The marker is UI state, never value content (sanitize drops it).
        const markerNotInValue = !root.querySelector('.nds-editor-source').value.includes('data-editor-selected');

        // 3 — Enter inside a chip label escapes AFTER the chip, chip intact.
        editable.innerHTML = '<p>قبل <span class="nds-chip"><span class="nds-label">مكتمل</span></span> بعد</p>';
        const chip = editable.querySelector('.nds-chip');
        const rc = document.createRange();
        rc.setStart(chip.querySelector('.nds-label').firstChild, 2);
        rc.collapse(true);
        sel.removeAllRanges();
        sel.addRange(rc);
        // A caret INSIDE a component rings it too (remove-armed feedback).
        await raf(); await raf();
        const caretMarksChip = chip.hasAttribute('data-editor-selected');
        const beforeChip = editable.innerHTML;
        const prevented = !editable.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
        const afterChip = sel.getRangeAt(0);
        const chipEnterEscapes = prevented
            && editable.innerHTML === beforeChip
            && afterChip.collapsed
            && afterChip.startContainer === chip.parentElement
            && afterChip.startOffset === Array.prototype.indexOf.call(chip.parentElement.childNodes, chip) + 1;

        // 4 — Enter inside a featured-icon's <i> escapes too.
        editable.innerHTML = '<p>قبل <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-stars"></i></span> بعد</p>';
        const feat2 = editable.querySelector('.nds-featured-icon');
        const ri = document.createRange();
        ri.setStart(feat2.querySelector('i'), 0);
        ri.collapse(true);
        sel.removeAllRanges();
        sel.addRange(ri);
        const before2 = editable.innerHTML;
        const prevented2 = !editable.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
        const iconEnterEscapes = prevented2 && editable.innerHTML === before2
            && sel.getRangeAt(0).collapsed
            && sel.getRangeAt(0).startContainer === feat2.parentElement;
        // Caret escaped to plain text → no component context → marker cleared.
        await raf(); await raf();
        const markerCleared = !editable.querySelector('[data-editor-selected]');
        return { clickSelectsAtom, markerStamped, removeArmedForAtom, removeListsAtom, selectedAtomConverts, markerNotInValue, caretMarksChip, chipEnterEscapes, iconEnterEscapes, markerCleared };
    });
    const atomGuardProblems = Object.entries(atomGuardOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (atomGuardProblems.length) {
        failures++;
        console.log('FAIL atom-caret-guard-e2e');
        atomGuardProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS atom-caret-guard-e2e');
    }

    // E2E: toolbar direction command — dir-rtl/dir-ltr write the native dir on
    // the caret's block, re-click clears it, the buttons reflect pressed
    // state, and the direction round-trips into the form value.
    const dirOut = await page.evaluate(async () => {
        const raf = () => new Promise(requestAnimationFrame);
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const source = root.querySelector('.nds-editor-source');
        const dirLtr = root.querySelector('[data-cmd="dir-ltr"]');
        const dirRtl = root.querySelector('[data-cmd="dir-rtl"]');
        const toolbarHasButtons = !!dirLtr && !!dirRtl;
        const clickCmd = async (btn) => {
            btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
            btn.click();
            await raf();
        };
        const putCaret = () => {
            editable.focus();
            const p = editable.querySelector('p');
            const r = document.createRange();
            r.setStart(p.firstChild, 1);
            r.collapse(true);
            const sel = getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
        };
        editable.innerHTML = '<p>نص</p>';
        putCaret();
        await clickCmd(dirRtl);
        const setRtl = editable.querySelector('p').getAttribute('dir') === 'rtl'
            && dirRtl.getAttribute('aria-pressed') === 'true'
            && source.value.includes('dir="rtl"');
        // Switch to LTR (not additive — replaces rtl).
        putCaret();
        await clickCmd(dirLtr);
        const switchLtr = editable.querySelector('p').getAttribute('dir') === 'ltr'
            && dirLtr.getAttribute('aria-pressed') === 'true'
            && dirRtl.getAttribute('aria-pressed') === 'false';
        // Re-click the active direction clears it (revert to inherited).
        putCaret();
        await clickCmd(dirLtr);
        const toggleClears = !editable.querySelector('p').hasAttribute('dir')
            && dirLtr.getAttribute('aria-pressed') === 'false'
            && !source.value.includes('dir=');
        return { toolbarHasButtons, setRtl, switchLtr, toggleClears };
    });
    const dirProblems = Object.entries(dirOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (dirProblems.length) {
        failures++;
        console.log('FAIL toolbar-direction-e2e');
        dirProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS toolbar-direction-e2e');
    }

    // E2E: toolbar alignment is PHYSICAL — align-left/right write text-align
    // left/right (not logical start/end), buttons reflect pressed state, one
    // replaces the other, re-clicking the active one clears to natural, and it
    // round-trips into the value.
    const alignOut = await page.evaluate(async () => {
        const raf = () => new Promise(requestAnimationFrame);
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const source = root.querySelector('.nds-editor-source');
        const aLeft = root.querySelector('[data-cmd="align-left"]');
        const aRight = root.querySelector('[data-cmd="align-right"]');
        const noLogicalTokens = !root.querySelector('[data-cmd="align-start"], [data-cmd="align-end"]');
        const clickCmd = async (btn) => {
            btn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
            btn.click();
            await raf();
        };
        const putCaret = () => {
            editable.focus();
            const p = editable.querySelector('p');
            const r = document.createRange();
            r.setStart(p.firstChild, 1);
            r.collapse(true);
            const sel = getSelection();
            sel.removeAllRanges();
            sel.addRange(r);
        };
        editable.innerHTML = '<p>نص</p>';
        putCaret();
        await clickCmd(aLeft);
        const setLeft = editable.querySelector('p').style.textAlign === 'left'
            && aLeft.getAttribute('aria-pressed') === 'true'
            && source.value.includes('text-align: left');
        // Right replaces left (not additive).
        putCaret();
        await clickCmd(aRight);
        const p = editable.querySelector('p');
        const switchRight = p.style.textAlign === 'right'
            && aRight.getAttribute('aria-pressed') === 'true'
            && aLeft.getAttribute('aria-pressed') === 'false';
        // Re-click the active alignment clears it back to natural.
        putCaret();
        await clickCmd(aRight);
        const toggleClears = !editable.querySelector('p').style.textAlign
            && aRight.getAttribute('aria-pressed') === 'false'
            && !source.value.includes('text-align');
        return { noLogicalTokens, setLeft, switchRight, toggleClears };
    });
    const alignProblems = Object.entries(alignOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (alignProblems.length) {
        failures++;
        console.log('FAIL toolbar-alignment-e2e');
        alignProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS toolbar-alignment-e2e');
    }

    // E2E: image popover — insert by URL, upload a file (synthetic File
    // through the real change→FileReader→URL-field path), and paste a
    // clipboard image FILE (no text flavor) straight into the editable.
    const imageOut = await page.evaluate(async () => {
        const waitFor = async (fn) => {
            for (let i = 0; i < 40; i++) {
                if (fn()) return true;
                await new Promise(r => setTimeout(r, 50));
            }
            return false;
        };
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const source = root.querySelector('.nds-editor-source');
        const setCaret = () => {
            editable.innerHTML = '<p>نص</p>';
            editable.focus();
            const sel = getSelection();
            const r = document.createRange();
            r.setStart(editable.querySelector('p').firstChild, 1);
            r.collapse(true);
            sel.removeAllRanges();
            sel.addRange(r);
        };

        // 1 — insert by direct URL.
        setCaret();
        const imgBtn = root.querySelector('[data-cmd="image"]');
        imgBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        imgBtn.click();
        await new Promise(requestAnimationFrame);
        const menu = root.querySelector('[data-editor-image-dropmenu] .nds-dropmenu-menu');
        menu.querySelector('[data-editor-image-url]').value = 'https://example.com/pic.png';
        menu.querySelector('[data-editor-image-alt]').value = 'وصف الصورة';
        menu.querySelector('[data-editor-image-width]').value = '320';
        menu.querySelector('[data-editor-image-height]').value = '200';
        menu.querySelector('[data-editor-image-confirm]').click();
        const urlImg = editable.querySelector('img');
        const urlInsert = !!urlImg
            && urlImg.getAttribute('src') === 'https://example.com/pic.png'
            && urlImg.getAttribute('alt') === 'وصف الصورة'
            && urlImg.getAttribute('width') === '320'
            && urlImg.getAttribute('height') === '200'
            && source.value.includes('https://example.com/pic.png')
            && source.value.includes('width="320"');

        // 2 — upload path: synthetic file rides change → FileReader → URL field.
        setCaret();
        imgBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        imgBtn.click();
        await new Promise(requestAnimationFrame);
        const fileInput = menu.querySelector('[data-editor-image-file]');
        const dt = new DataTransfer();
        dt.items.add(new File([new Uint8Array([137, 80, 78, 71])], 'صورة-مرفوعة.png', { type: 'image/png' }));
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
        const urlField = menu.querySelector('[data-editor-image-url]');
        const uploadRead = await waitFor(() => urlField.value.startsWith('data:image/png'));
        const altSeeded = menu.querySelector('[data-editor-image-alt]').value === 'صورة-مرفوعة';
        menu.querySelector('[data-editor-image-confirm]').click();
        const uploadInsert = !!editable.querySelector('img[src^="data:image/png"]')
            && source.value.includes('data:image/png;base64');

        // 3 — paste a clipboard image file (screenshot shape: files only).
        editable.innerHTML = '<p><br></p>';
        editable.focus();
        const sel = getSelection();
        const r = document.createRange();
        r.selectNodeContents(editable.firstElementChild);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
        const pasteDt = new DataTransfer();
        pasteDt.items.add(new File([new Uint8Array([137, 80, 78, 71])], 'screenshot.png', { type: 'image/png' }));
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: pasteDt, bubbles: true, cancelable: true }));
        const pasteInsert = await waitFor(() =>
            !!editable.querySelector('img[src^="data:image/png"]')
            && source.value.includes('data:image/png;base64'));

        // 4 — clicking an image selects it whole (Chrome only sets a caret
        // beside it): popover prefills for edit-in-place, and the remove
        // picker can target the image's region (the avatar report).
        editable.innerHTML = '<p>قبل</p><div class="nds-avatar nds-lg nds-image-border"><img src="/NDS-vanilla/assets/img/avatar1.webp" alt="صورة المستخدم"></div><p>بعد</p>';
        const avatarImg = editable.querySelector('.nds-avatar img');
        avatarImg.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        const sel2 = getSelection();
        const clickSelects = sel2.rangeCount === 1 && !sel2.isCollapsed
            && sel2.getRangeAt(0).startContainer === avatarImg.parentElement;
        imgBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        imgBtn.click();
        await new Promise(requestAnimationFrame);
        const prefills = menu.querySelector('[data-editor-image-url]').value === '/NDS-vanilla/assets/img/avatar1.webp'
            && menu.querySelector('[data-editor-image-alt]').value === 'صورة المستخدم';
        menu.querySelector('[data-editor-image-cancel]').click();
        await new Promise(requestAnimationFrame);
        const rmBtn = root.querySelector('[data-cmd="remove"]');
        const removeEnabled = !rmBtn.disabled;
        rmBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        rmBtn.click();
        await new Promise(requestAnimationFrame);
        const level = root.querySelector('[data-editor-remove-level]');
        const removeListsAvatar = !!level && level.textContent.includes('nds-avatar');
        if (level) level.click();
        await new Promise(r => setTimeout(r, 200));
        const avatarRemoved = !editable.querySelector('.nds-avatar')
            && !source.value.includes('nds-avatar');

        // 5 — embed mode still enforces the size cap on screenshot paste
        // (container's live-read NDS.Upload config; generated default 2MB).
        editable.innerHTML = '<p><br></p>';
        editable.focus();
        const bigDt = new DataTransfer();
        bigDt.items.add(new File([new Uint8Array(3 * 1024 * 1024)], 'big.png', { type: 'image/png' }));
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: bigDt, bubbles: true, cancelable: true }));
        await new Promise(r => setTimeout(r, 400));
        const oversizePasteBlocked = !editable.querySelector('img')
            && root.getAttribute('data-status') === 'warning';

        // 6 — multi-image paste embeds every file in clipboard order (reads
        // chain sequentially; parallel readers would finish size-ordered, so
        // the big first file landing first proves the chain).
        editable.innerHTML = '<p><br></p>';
        editable.focus();
        const sel6 = getSelection();
        const r6 = document.createRange();
        r6.selectNodeContents(editable.firstElementChild);
        r6.collapse(true);
        sel6.removeAllRanges();
        sel6.addRange(r6);
        const multiDt = new DataTransfer();
        multiDt.items.add(new File([new Uint8Array(256 * 1024)], 'first.png', { type: 'image/png' }));
        multiDt.items.add(new File([new Uint8Array([137, 80, 78, 71])], 'second.png', { type: 'image/png' }));
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: multiDt, bubbles: true, cancelable: true }));
        await waitFor(() => editable.querySelectorAll('img').length === 2);
        const multiImgs = editable.querySelectorAll('img');
        const multiPasteOrdered = multiImgs.length === 2
            && multiImgs[0].src.length > multiImgs[1].src.length;

        // 7 — paste parity beyond size: a disallowed extension is rejected
        // through the same live validateFile() gates.
        NDS.Forms?.clearStatus?.(root);
        editable.innerHTML = '<p><br></p>';
        editable.focus();
        const bmpDt = new DataTransfer();
        bmpDt.items.add(new File([new Uint8Array([66, 77])], 'picture.bmp', { type: 'image/bmp' }));
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: bmpDt, bubbles: true, cancelable: true }));
        await new Promise(r => setTimeout(r, 400));
        const typePasteBlocked = !editable.querySelector('img')
            && root.getAttribute('data-status') === 'warning';

        // 8 — the 'embed' sentinel keeps autoUpload off across LATER calls,
        // not just the call that set it — no re-armed POST to "/embed".
        root.ndsEditor.setImageUpload({ autoUpload: true });
        const embedAutoUploadOff = !('autoUpload' in root.querySelector('[data-editor-image-upload]').dataset);

        return { urlInsert, uploadRead, altSeeded, uploadInsert, pasteInsert, clickSelects, prefills, removeEnabled, removeListsAvatar, avatarRemoved, oversizePasteBlocked, multiPasteOrdered, typePasteBlocked, embedAutoUploadOff };
    });
    const imageProblems = Object.entries(imageOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (imageProblems.length) {
        failures++;
        console.log('FAIL image-popover-e2e');
        imageProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS image-popover-e2e');
    }

    // E2E: server-upload mode — the consumer stamps NDS.Upload's own attrs on
    // the generated container; the URL field takes the server's {url} response
    // and no base64 enters the value. The POST is intercepted in-flight.
    await page.setRequestInterception(true);
    const onFakeUpload = (req) => {
        if (req.url().includes('/fake-upload')) {
            req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ url: 'https://cdn.example.com/uploaded-42.png' }) });
        } else req.continue();
    };
    page.on('request', onFakeUpload);
    const serverOut = await page.evaluate(async () => {
        const waitFor = async (fn) => {
            for (let i = 0; i < 40; i++) {
                if (fn()) return true;
                await new Promise(r => setTimeout(r, 50));
            }
            return false;
        };
        const root = document.getElementById('story').closest('.nds-editor');
        const editable = root.querySelector('.nds-editor-editable');
        const source = root.querySelector('.nds-editor-source');
        editable.innerHTML = '<p>نص</p>';
        editable.focus();
        const sel = getSelection();
        const r = document.createRange();
        r.setStart(editable.querySelector('p').firstChild, 1);
        r.collapse(true);
        sel.removeAllRanges();
        sel.addRange(r);
        const imgBtn = root.querySelector('[data-cmd="image"]');
        imgBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        imgBtn.click();
        await new Promise(requestAnimationFrame);
        const menu = root.querySelector('[data-editor-image-dropmenu] .nds-dropmenu-menu');
        const up = menu.querySelector('[data-editor-image-upload]');
        // The doc page's showcase script hijacks beforeUpload into a fake
        // slow simulation — stop it at the container so the REAL XHR runs,
        // matching a consumer page (which doesn't load nds-showcase.js).
        up.addEventListener('nds:upload:beforeUpload', (e) => e.stopPropagation());
        up.dataset.uploadUrl = '/NDS-vanilla/fake-upload';
        up.dataset.autoUpload = 'true';
        const fileInput = menu.querySelector('[data-editor-image-file]');
        const dt = new DataTransfer();
        dt.items.add(new File([new Uint8Array([137, 80, 78, 71])], 'photo.png', { type: 'image/png' }));
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
        const urlField = menu.querySelector('[data-editor-image-url]');
        const serverUrlArrives = await waitFor(() => urlField.value === 'https://cdn.example.com/uploaded-42.png');
        const chipComplete = await waitFor(() => !!menu.querySelector('.nds-file-item[data-status="success"]'));
        menu.querySelector('[data-editor-image-confirm]').click();
        const inserted = !!editable.querySelector('img[src="https://cdn.example.com/uploaded-42.png"]')
            && source.value.includes('https://cdn.example.com/uploaded-42.png')
            && !source.value.includes('data:image');
        up.dataset.uploadUrl = 'embed'; // restore the fixture's embed stamp
        delete up.dataset.autoUpload;
        return { serverUrlArrives, chipComplete, inserted };
    });
    page.off('request', onFakeUpload);
    await page.setRequestInterception(false);
    const serverProblems = Object.entries(serverOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (serverProblems.length) {
        failures++;
        console.log('FAIL image-server-upload-e2e');
        serverProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS image-server-upload-e2e');
    }

    // E2E: default image policy — URL-only popover (no upload affordance, no
    // base64): paste of an image file is blocked with the field's native
    // forms feedback, data: URLs get an inline field error, and
    // setImageUpload() turns the affordance on.
    const policyOut = await page.evaluate(async () => {
        const host = document.createElement('div');
        host.innerHTML = `
          <div class="nds-form-container nds-textarea nds-editor">
            <div class="nds-form-header"><label for="plainpolicy"><span class="nds-label">حقل</span></label></div>
            <div class="nds-form-control"><textarea class="nds-textarea" id="plainpolicy"></textarea></div>
            <div class="nds-form-footer" data-feedback-target hidden></div>
          </div>`;
        document.body.appendChild(host);
        const root = host.querySelector('.nds-editor');
        const inst = NDS.Editor.create(root);
        const editable = root.querySelector('.nds-editor-editable');
        editable.focus();
        const imgBtn = root.querySelector('[data-cmd="image"]');
        imgBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        imgBtn.click();
        await new Promise(requestAnimationFrame);
        const menu = root.querySelector('[data-editor-image-dropmenu] .nds-dropmenu-menu');
        const up = menu.querySelector('[data-editor-image-upload]');
        const uploadHidden = up.style.display === 'none'
            && menu.querySelector('[data-editor-image-or]').style.display === 'none';
        const urlInput = menu.querySelector('[data-editor-image-url]');
        urlInput.value = 'data:image/png;base64,iVBORw==';
        menu.querySelector('[data-editor-image-confirm]').click();
        const fieldError = urlInput.closest('.nds-form-container').getAttribute('data-status') === 'error'
            && !editable.querySelector('img');
        const confirmBlocked = menu.querySelector('[data-editor-image-confirm]').disabled;
        await new Promise(r => setTimeout(r, 200)); // outlive the dropmenu's 100ms item auto-close
        const staysOpenOnError = !menu.hidden;
        urlInput.value = 'https://example.com/ok.png';
        urlInput.dispatchEvent(new Event('input', { bubbles: true }));
        const confirmReEnabled = !menu.querySelector('[data-editor-image-confirm]').disabled
            && !urlInput.closest('.nds-form-container').hasAttribute('data-status');
        menu.querySelector('[data-editor-image-cancel]').click();
        await new Promise(r => setTimeout(r, 250));
        const dt = new DataTransfer();
        dt.items.add(new File([new Uint8Array([137, 80, 78, 71])], 's.png', { type: 'image/png' }));
        editable.focus();
        editable.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
        await new Promise(r => setTimeout(r, 400));
        const pasteBlocked = !editable.querySelector('img')
            && root.getAttribute('data-status') === 'warning'
            && !!root.querySelector('.nds-form-footer .nds-feedback');
        inst.setImageUpload({ uploadUrl: '/api/images' });
        const apiShows = up.style.display !== 'none';
        NDS.Editor.destroy(root);
        host.remove();
        return { uploadHidden, fieldError, confirmBlocked, staysOpenOnError, confirmReEnabled, pasteBlocked, apiShows };
    });
    const policyProblems = Object.entries(policyOut).filter(([, v]) => !v).map(([k]) => `FAILED: ${k}`);
    if (policyProblems.length) {
        failures++;
        console.log('FAIL image-default-policy-e2e');
        policyProblems.forEach(pr => console.log(`  ${pr}`));
    } else {
        console.log('PASS image-default-policy-e2e');
    }

    console.log(failures ? `\n${failures} fixture(s) failed` : '\nAll fixtures passed');
    process.exitCode = failures ? 1 : 0;
} finally {
    await browser.close();
}
