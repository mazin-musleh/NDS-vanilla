---
layout: page
title: دليل البدء
since: "1.6.0"
last_edit: "27/11/2026 - 04:09 PM"
lang: ar
direction: rtl
og_image: docs-assets/img/nds-cover-ar.webp
siteTitle: "NDS-vanilla - قالب كود المنصات"
brandSlogan: قالب كود المنصات
permalink: /ar/guides/get-started/
hero_title: البدء في تطبيق كود المنصات
hero_style: nds-flat
hero_description: "دليل عملي لإعداد قالب كود المنصات بمساعدة وكلاء البرمجة الذكية، وبناء الصفحات والتحقق منها، والانتقال إلى الإصدارات الجديدة."
breadcrumb:
  - ["الأدلة", "/ar/guides"]
layout_class: nds-has-sideinfo
sidemenu_mode: false
---

<section id="get-started-guide" class="nds-content-section nds-sideinfo-section">
    <div class="nds-section-body">
        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="في هذه الصفحة">
            <nav class="nds-toc" aria-label="جدول المحتويات" style="--toc-skeleton-rows: 15"
                data-toc-source="#get-started-guide article" data-toc-levels="h2, h3">
                <div class="nds-toc-head">
                    <span class="nds-label">في هذه الصفحة</span>
                    <h2 class="nds-toc-title nds-truncate">دمج القالب</h2>
                </div>
                <div class="nds-drawer nds-lined">
                    <ul class="nds-drawer-list"></ul>
                </div>
            </nav>
        </aside>

        <div class="nds-info-content">
            <article class="nds-prose">

                <h2 id="overview">نظرة عامة</h2>
                <p>يقدم هذا الدليل طريقة سهلة للحصول على صفحات متوافقة مع كود المنصات، مبنية وفق خطة واضحة ومفحوصة في المتصفح. يكفي لصق أمر واحد ليتولى وكيل البرمجة الذكي بقية العمل، مستنداً إلى <a class="nds-color" href="{{ 'guides/integration-quality' | relative_url }}">NDS IQ</a>، دليل القواعد الذي ينظم بناء الصفحات الجديدة، ونقل الصفحات القائمة، ومراجعتها.</p>

                <div class="nds-alert nds-card nds-color" data-status="info" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">تم اختباره مع Claude Code</span>
                            <p class="nds-alert-description">خضع NDS IQ لاختبار كامل مع Claude Code، وهو مصمم ليعمل مع وكلاء البرمجة الآخرين أيضاً، وقد تختلف النتائج معهم.</p>
                        </div>
                    </div>
                </div>

                <div class="nds-alert nds-card" data-status="info" role="alert">
                    <span class="nds-feedback nds-alert-icon nds-outline">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">المتطلبات</span>
                            <ul class="nds-alert-description">
                                <li><strong>وكيل برمجة ذكي محلي</strong> قادر على قراءة ملفات المشروع وتعديلها، مثل Claude Code أو Cursor أو Codex؛ لأن مساعدات المحادثة عبر المتصفح لا تصل إلى ملفات المشروع.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <h3 id="browsers">دعم المتصفحات</h3>
                <p>لا يعتمد القالب قائمة محددة للمتصفحات المدعومة؛ فإذا افتقد المتصفح ميزة ما، تعطّل الجزء المرتبط بها فقط وبقيت الصفحة تعمل، ضمن الحدود الموضحة أدناه.</p>
                <ul>
                    <li><strong>المتصفحات الصادرة منذ عام 2022</strong>: تعمل جميع مكونات القالب، وفي Chrome وEdge تعمل جميعها منذ عام 2021.</li>
                    <li><strong>Safari وFirefox بين أواخر 2020 و2021</strong>: لا تعمل النافذة المنبثقة (Modal) واللوحة الجانبية (Panel).</li>
                    <li><strong>المتصفحات قبل أواخر 2020</strong>: لا يعمل كود JavaScript الخاص بالقالب.</li>
                </ul>

                <h2 id="setup">1. الإعداد</h2>
                <p>يتم الإعداد مرة واحدة فقط، إذ يثبّت الوكيل NDS IQ، وينزّل القالب، ويعدّ خطة العمل، ثم يطرح أسئلته دفعة واحدة.</p>

                <h3 id="instructions-block">أمر الإعداد</h3>
                <p>افتح جلسة جديدة مع الوكيل، والصق الأمر التالي:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="نسخ الأمر">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Download the raw file to `NDS-IQ.md` at the project root using `curl` or another direct HTTP client. Do not use a web-fetch tool: it may save a re-rendered copy.
https://raw.githubusercontent.com/mazin-musleh/NDS-vanilla/refs/heads/main/_includes/NDS-IQ.md

Confirm that the file starts with `# NDS IQ`, then read it from top to bottom. This is the project's UI-layer rulebook. All NDS work runs by its rules. Set up NDS IQ in this project as its install section describes, then build the plan.
                    </code>
                </div>

                <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">قبل اللصق</span>
                            <p class="nds-alert-description">اختر وضع تشغيل يسمح للوكيل بتعديل الملفات، ووافق على الوصول إلى الإنترنت عند طلبه.</p>
                        </div>
                    </div>
                </div>

                <p>إذا تعذّر على الوكيل تنزيل الملفات، فراجع <a class="nds-color" href="#manual-install">التثبيت اليدوي</a>.</p>

                <p>يضيف الإعداد ثلاثة عناصر إلى المشروع:</p>
                <ol>
                    <li><code class="nds-inline-code lang-html">NDS-IQ.md</code> في جذر المشروع، وهو ملف القواعد. ولا ينبغي تعديله يدوياً، لأن التحديثات تستبدله بالكامل.</li>
                    <li><strong>مرساة (Anchor)</strong> في <code class="nds-inline-code lang-html">CLAUDE.md</code> (Claude Code) أو <code class="nds-inline-code lang-html">AGENTS.md</code> (Cursor وCodex)، وهي فقرة قصيرة تحفظ مسارات المشروع، وتوجّه الوكيل إلى قراءة القواعد قبل أي عمل على القالب.</li>
                    <li><strong>قالب كود المنصات</strong> في <code class="nds-inline-code lang-html">.nds/</code>، بالإصدار نفسه المستخدم في المشروع، أو بأحدث إصدار عند التثبيت الأول.</li>
                </ol>

                <h3 id="paths">المسارات</h3>
                <p>تحفظ المرساة مسارين: مجلد القالب، ومجلد الملفات الثابتة. ويحدد الوكيل قيمة <code class="nds-inline-code lang-html">NDS_ASSETS</code> تلقائياً، ولا يسأل إلا عند وجود أكثر من مجلد مناسب، ثم يتأكد من رابط ملفات القالب (CSS وJavaScript والخطوط) قبل إضافة أول وسم يحمّلها في الصفحات.</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>المتغير</th><th>الوصف</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ROOT</code></td><td>مجلد القالب، والقيمة الافتراضية: <code class="nds-inline-code lang-html">.nds/</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">NDS_ASSETS</code></td><td>المجلد الذي يعرض منه التطبيق الملفات الثابتة، مثل <code class="nds-inline-code lang-html">public/assets/</code> أو <code class="nds-inline-code lang-html">wwwroot/</code>.</td></tr>
                    </tbody>
                </table>

                <h3 id="plan-review">مراجعة الخطة</h3>
                <p>بعد ذلك يحصر الوكيل الصفحات والمسارات ومكتبات الواجهة القديمة في <code class="nds-inline-code lang-html">NDS-PLAN.md</code>، ثم يتوقف ليطرح أسئلة المشروع كلها في رسالة واحدة: رابط ملفات القالب، وطريقة نقل الصفحات القائمة، والتعامل مع أي عمل سابق على القالب، وسياسة أمان المحتوى (CSP) إن وجدت، وهل يتحقق الموقع من الختم الرقمي، و<a class="nds-color" href="#agent-drives">وتيرة العمل</a>. وتمثل الإجابات موافقة على الخطة، فيبدأ الوكيل البناء.</p>

                <p>إذا لم يعدّ الوكيل الخطة، فالصق الأمر التالي:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="نسخ الأمر">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Inventory the project and write NDS-PLAN.md for my review.
                    </code>
                </div>

                <p>الخطة مطلوبة عند العمل على أكثر من صفحة. ويمكن الاستغناء عنها في تجربة من صفحة واحدة، لكن الوكيل لن يحتفظ حينها بأي سجل بين الجلسات.</p>

                <h2 id="sessions">2. البناء</h2>
                <p>بعد اعتماد الخطة، يكفي وصف المطلوب لكل صفحة: الهدف منها، ومحتواها، والبيانات التي تعرضها، وأي قيود خاصة بها، فيما يتولى NDS IQ تحديد طريقة بنائها.</p>

                <h3 id="agent-drives">وتيرة العمل</h3>
                <p>تتوفر طريقتان:</p>
                <ul>
                    <li><strong>صفحة بصفحة (الافتراضي)</strong>: يبني الوكيل صفحة واحدة في كل مرة؛ فيطرح أسئلته، ثم يبنيها ويفحصها في المتصفح، ويحدّث الخطة، ويتوقف بانتظار الموافقة.</li>
                    <li><strong>الخطة كاملة</strong>: يبني الوكيل جميع الصفحات بالإجابات الافتراضية، ثم يعرض في النهاية القرارات والفحوص المعلقة.</li>
                </ul>
                <p>في الحالتين، يبقى اعتماد الصفحة بيد المطور وحده عبر وضع علامة <code class="nds-inline-code lang-html">Built and Verified</code> (تم البناء والتحقق)، أما الصفحات التي تحمل علامة <code class="nds-inline-code lang-html">Awaiting Verification</code> (بانتظار التحقق) فتنتظر الاعتماد. وينتهي العمل عندما تحمل جميع صفحات الخطة علامة <code class="nds-inline-code lang-html">Built and Verified</code>.</p>

                <h3 id="verification">التحقق في المتصفح</h3>
                <p>يفحص الوكيل كل صفحة في المتصفح من جانبين:</p>
                <ul>
                    <li><strong>السلوك</strong>: يحمّل الصفحة، ويراجع وحدة التحكم (console)، ويشغّل <code class="nds-inline-code lang-js">NDS.init.audit()</code>، ويختبر جميع التفاعلات وعمليات التحقق في النماذج.</li>
                    <li><strong>المظهر</strong>: يقارن الصفحة بنظيرتها في القالب على شاشات سطح المكتب والجوال، في الوضعين الفاتح والداكن.</li>
                </ul>
                <p>ولا تكفي مراجعة الكود وحدها للتحقق.</p>

                <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">في حال عدم توفر متصفح</span>
                            <p class="nds-alert-description">يجهّز الوكيل أولاً متصفحاً يعمل في الخلفية دون واجهة (Headless)، وإذا تعذّر ذلك قدّم قائمة فحص يدوي وحدد ما لم يتمكن من فحصه.</p>
                        </div>
                    </div>
                </div>

                <h3 id="resuming">الجلسة التالية</h3>
                <p>عند بدء جلسة جديدة، الصق الأمر التالي:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="نسخ الأمر">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Continue: read NDS-PLAN.md and propose the next step.
                    </code>
                </div>

                <p>بعد اكتمال الخطة، يمكن طلب التعديلات بلغة عادية دون خطة. ويعيد الوكيل فحص كل صفحة يعدّلها في الحالات التي يمسها التغيير، وإذا شمل التعديل ملفاً مشتركاً، مثل التخطيط أو ملف أنماط المشروع، أعاد فحص جميع الصفحات التي تستخدمه.</p>

                <p>قد تنحرف الجلسات الطويلة عن مسارها؛ فإذا تجاوز الوكيل الخطة أو سأل عما تجيب عنه القواعد، فاطلب منه أن «<strong>يتبع IQ</strong>»، فيعيد قراءة القواعد ويعود إلى المسار الصحيح.</p>

                <h3 id="legacy-cleanup">إزالة المكتبات القديمة</h3>
                <p>لا تحمّل صفحات القالب مكتبات الواجهة القديمة مثل jQuery أو Bootstrap، لكن الوكيل لا يزيلها من المشروع؛ فقرار إزالتها يعود إلى المطور.</p>

                <h3 id="findings-report">تقرير الملاحظات</h3>
                <p>عند اكتشاف خلل أو نقص في القالب، يسجّله الوكيل في <code class="nds-inline-code lang-html">NDS-REPORT.md</code>. ويتضمن كل بند إصدار القالب، وإصدار القواعد، والمكوّن، ومثالاً مختصراً يعيد إنتاج المشكلة. وبعد مراجعة التقرير، أرسل الملاحظات المؤكدة إلى <a class="nds-color" href="https://github.com/mazin-musleh/NDS-vanilla/issues">GitHub Issues</a>.</p>

                <h2 id="upgrade">3. الترقية</h2>
                <p>عند صدور إصدار جديد، الصق الأمر التالي:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="نسخ الأمر">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Upgrade the NDS template to the latest release.
                    </code>
                </div>
                <p>ينفّذ الوكيل الخطوات التالية:</p>
                <ul>
                    <li>يستبدل القالب في <code class="nds-inline-code lang-html">NDS_ROOT</code> وينسخ الملفات الثابتة الجديدة (CSS وJavaScript والخطوط) إلى <code class="nds-inline-code lang-html">NDS_ASSETS</code>.</li>
                    <li>يراجع ملاحظات الترحيل في سجل التغييرات، ويشغّل فحص الترحيل على كل صفحة، ثم يصلح الصفحات المتأثرة وفق الخطة.</li>
                    <li>يستبدل <code class="nds-inline-code lang-html">NDS-IQ.md</code> بأحدث نسخة منه.</li>
                    <li>يعرض الميزات الجديدة التي قد تفيد المشروع.</li>
                </ul>
                <p>تبقى المرساة والمسارات دون تغيير. ولفحص صفحة يدوياً، راجع دليل <a class="nds-color" href="{{ 'guides/migration' | relative_url }}">الترحيل</a>.</p>

                <h3 id="update-rules">تحديث القواعد</h3>
                <p>لتحديث القواعد فقط، الصق الأمر التالي:</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="نسخ الأمر">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-prompt">
Update the NDS IQ rules file to the latest revision.
                    </code>
                </div>
                <p>يستبدل الوكيل <code class="nds-inline-code lang-html">NDS-IQ.md</code> عند اختلافه عن النسخة المنشورة، وينبّه إذا كان القالب نفسه بحاجة إلى تحديث. أما القوالب الأقدم من الإصدار 2.0، فيثبّت لها النسخة v3.2 من القواعد، وهي آخر نسخة متوافقة معها.</p>

                <h2 id="manual-install">التثبيت اليدوي (اختياري)</h2>
                <p>يجمع الإعداد الخطوتين التاليتين، ولا حاجة إلى تنفيذهما يدوياً إلا إذا تعذّر على الوكيل تنزيل الملفات.</p>

                <p><strong>الخطوة 1. تثبيت القالب.</strong> نزّل <code class="nds-inline-code lang-html">nds-vanilla-template-v{{ site.latest_release }}.zip</code> من <a class="nds-color" href="{{ site.repository_url }}/releases/latest">GitHub Releases</a>، وفك ضغطه في مجلد <code class="nds-inline-code lang-html">.nds/</code> في جذر المشروع، وأضف هذا المجلد إلى <code class="nds-inline-code lang-html">.gitignore</code>. ويجب أن يكون <code class="nds-inline-code lang-html">NDS-INDEX.md</code> مباشرة داخل <code class="nds-inline-code lang-html">.nds/</code>، دون مجلد فرعي باسم الإصدار.</p>
                <p>القالب مرجع للقراءة فقط، فانسخ منه ما تحتاج دون تعديله.</p>
                <div class="nds-code">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="نسخ مثال الكود">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <code class="lang-markdown">
.nds/
├── README.md          - Overview and entry-point documentation
├── NDS-INDEX.md       - Map from each need to this release's files
├── _site/             - Compiled documentation and runtime assets
│   ├── components/    - Built doc pages, the visual reference
│   └── assets/        - Runtime CSS, JS, fonts, and i18n
├── _source/           - Source files and catalogs (added on install)
├── CHANGELOG.md       - Release history and migration notes
└── LICENSE            - License terms
                    </code>
                </div>

                <p><strong>الخطوة 2. تثبيت القواعد.</strong> احفظ القواعد التالية باسم <code class="nds-inline-code lang-html">NDS-IQ.md</code> في جذر المشروع كما هي دون أي تعديل، ثم أضف المرساة إلى ملف الوكيل، واضبط قيمة <code class="nds-inline-code lang-html">NDS_ASSETS</code>. ونص المرساة موجود في قسم <em>This file</em> من القواعد.</p>
{%- capture _instr %}{% include NDS-IQ.md %}{% endcapture %}
{%- assign _iq_parts = _instr | split: 'instructions v' %}
{%- assign _iq_v = _iq_parts[1] | split: ')' | first %}
                <div class="nds-code nds-expandable">
                    <span class="nds-code-tags lang-markdown">
                        <span class="nds-tag nds-gray nds-xs nds-code-lang lang-markdown"><span class="nds-label">Markdown</span></span>
                        <span class="nds-tag nds-green nds-xs"><span class="nds-label">IQ v{{ _iq_v }}</span></span>
                    </span>
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy nds-icon-only" aria-label="نسخ تعليمات NDS IQ">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-markdown">
{{ _instr | strip | escape }}
                        </code>
                    </div>
                </div>

            </article>
        </div>
    </div>
</section>
