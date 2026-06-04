---
layout: home
sitemap: false  # internal dev/test page — keep out of the public sitemap
title: "النظام الوطني للتصميم — المملكة العربية السعودية"
hero_title: "النظام الوطني للتصميم"
hero_description: "نظام تصميم شامل يُمكِّن من بناء تجارب رقمية حكومية متّسقة وقابلة للوصول وعالية الأداء عبر أرجاء المملكة العربية السعودية."
hero_image_pos: 50% 10%
lang: ar
direction: rtl
---

<!--
  Arabic-first playground page for stress-testing typography, RTL layout,
  and accessibility-panel modes against real cursive Arabic text.
  Exercises:
    • Long paragraphs with connected ligatures → catches letter-spacing
      breakage when the Dyslexia Friendly bundle is active.
    • Headings + ordered/unordered lists → tests highlight-titles, line-height,
      word-spacing, and the Text Alignment cycle (start / end / justify).
    • Inline links → tests highlight-links underline + outline scaffold.
    • Mixed Arabic + Latin (URLs, technical terms, code) → exercises the
      font-family cascade so Latin glyphs hit Lexend/IBM Plex Sans Arabic
      according to the active mode without breaking the Arabic stack.
-->

<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">عن النظام</h2>
            <p class="nds-section-description">نسعى إلى توحيد لغة التصميم الرقمي الحكومي حول ركائز ثابتة: البساطة، الاتساق، إمكانية الوصول، والأداء.</p>
        </div>
        <div class="nds-section-body">
            <p>يُقدِّم النظام الوطني للتصميم منظومة متكاملة من المكوِّنات والأنماط والقوالب التي تُسرِّع بناء الخدمات الرقمية الحكومية مع الحفاظ على معايير عالمية في تجربة المستخدم. صُمِّمت كل قطعة فيه لتعمل بكفاءة في الاتجاهَين معاً (يمين-إلى-يسار ويسار-إلى-يمين)، ولتدعم اللغتَين العربية والإنجليزية بشكل أصيل.</p>

            <p>تستند فلسفة النظام إلى ثلاث ركائز رئيسية: <strong>التوحيد</strong> الذي يضمن خبرة مستخدم متّسقة عبر كل الجهات الحكومية، و<strong>إمكانية الوصول</strong> التي تجعل الخدمات في متناول كل المواطنين بمختلف قدراتهم، و<strong>الأداء</strong> الذي يحرص على سرعة استجابة لا تتأثر بحالة الشبكة أو الجهاز.</p>
        </div>
    </div>
</section>

<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">المبادئ الأساسية</h2>
            <p class="nds-section-description">معايير تصميمية تشكِّل أساس كل قرار في النظام.</p>
        </div>
        <div class="nds-section-body">
            <ol>
                <li><strong>وضوح اللغة البصرية:</strong> ألوان، خطوط، ومسافات تتبع نظام رموز موحَّداً.</li>
                <li><strong>استجابة كل المقاسات:</strong> تخطيطات تتكيَّف من ٣٢٠ بكسل حتى أوسع الشاشات (شاشات اللوحات الرقمية ٢٥٦٠ بكسل وأكثر).</li>
                <li><strong>سهولة التطوير:</strong> شيفرات HTML وCSS وJavaScript مكتوبة بطريقة مباشرة، بلا تعقيد لا داعي له.</li>
                <li><strong>توثيق متين:</strong> صفحة لكل مكوِّن، مع أمثلة قابلة للنسخ مباشرةً، وشرح مفصَّل لكل خاصية.</li>
            </ol>

            <blockquote>
                <p>"التصميم الجيِّد هو ذلك الذي يفتح الباب للجميع، لا الذي يُحسِّن المظهر فقط."</p>
            </blockquote>
        </div>
    </div>
</section>

<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">إمكانية الوصول</h2>
            <p class="nds-section-description">يُولِي النظام اهتماماً خاصاً بدعم القُرَّاء العرب وذوي الإعاقات المختلفة.</p>
        </div>
        <div class="nds-section-body">
            <p>تتضمَّن لوحة إمكانية الوصول مجموعة من الأنماط القابلة للتفعيل بنقرة واحدة: تكبير الخط، زيادة التباين، تخفيف الحركة، إبراز العناوين، وتبديل اتجاه النص. تتوافق إعداداتها مع توجيهات منظمة الإنترنت العالمية WCAG 2.1، مع مراعاة الخصوصيات الكتابية للنص العربي — منها عدم تطبيق <code>letter-spacing</code> على الحروف العربية المتَّصلة، إذ إن تباعد الأحرف يُفصِّم اللغة العربية المكتوبة بصرياً ويُعقِّد قراءتها بدلاً من تبسيطها.</p>

            <h3>روابط مفيدة</h3>
            <ul>
                <li><a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">WAI-ARIA Authoring Practices Guide</a></li>
                <li><a href="https://www.w3.org/TR/alreq/" target="_blank" rel="noopener noreferrer">متطلبات تخطيط النص العربي — تقرير W3C</a></li>
                <li><a href="/components">صفحة المكونات في هذا الموقع</a></li>
                <li><a href="/">العودة إلى الصفحة الرئيسية</a></li>
            </ul>
        </div>
    </div>
</section>

<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">مثال على شيفرة برمجية</h2>
            <p class="nds-section-description">عرض لكيفية تكامل مكوِّنات النظام داخل صفحات الخدمات الحكومية.</p>
        </div>
        <div class="nds-section-body">
            <p>المثال التالي يجمع بين العربية في نص الواجهة والإنجليزية في أسماء الفئات (CSS classes) وأسماء الأيقونات — وهو نمط شائع في الواجهات ثنائية اللغة. يوفِّر النظام تكاملاً سلساً لذلك دون الحاجة إلى عمليات تحويل يدوية.</p>

<pre><code class="lang-html">&lt;!-- زر أساسي يُمثِّل إجراءً رئيسياً --&gt;
&lt;button class="nds-btn nds-primary"&gt;
    &lt;i class="nds-icon nds-hgi-arrow-up-right" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;ابدأ الخدمة الآن&lt;/span&gt;
&lt;/button&gt;</code></pre>

            <p>عند تفعيل نمط <strong>"خط واضح"</strong> من لوحة إمكانية الوصول، يبقى هذا المربع البرمجي على خط الواجهة الافتراضي (IBM Plex Sans Arabic) — لأن لوحة الإمكانية تُحدِّد خطها الخاص محلياً عبر متغيِّر <code>--a11y-font-family</code>، مما يحميها من التغيُّرات المُطبَّقة على بقية الصفحة.</p>

            <div class="nds-flex nds-gap-md" style="margin-top: 1.5rem;">
                <a href="/components" class="nds-btn nds-primary">
                    <span class="nds-label">استعرض المكوِّنات</span>
                </a>
                <a href="/" class="nds-btn nds-secondary-outline">
                    <span class="nds-label">العودة للرئيسية</span>
                </a>
            </div>
        </div>
    </div>
</section>
