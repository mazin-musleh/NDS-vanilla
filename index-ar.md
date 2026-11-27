---
layout: home

lang: ar
direction: rtl
breadcrumb_root_url: /ar/
mainnav: mainnav-ar
footer: docs-ar
og_image: docs-assets/img/nds-cover-ar.webp
siteTitle: "NDS-vanilla - قالب كود المنصات"
brandSlogan: قالب كود المنصات
herosliders: herosliders-ar
permalink: /ar/
description: "مشروع مفتوح المصدر لتطبيق نظام التصميم الموحد في المملكة العربية السعودية، مبني بلغة HTML وCSS وJavaScript دون أي اعتماديات خارجية، وجاهز للاستخدام في المشاريع الفعلية."

# Bundle sizes shown in the Architecture section (gzipped KB). Update when bundles change:
# gzip -c <file> | wc -c, divided by 1024: nds-main.min.js, every other bundle but nds-audit, _site/.../nds.critical.min.css
bundle_sizes:
  critical_css: 10 # nds.critical.min.css
  core_js: 64 # nds-main.min.js (loads on every page)
  total_js: 190 # every assets/js/*.min.js except nds-audit (full library, demand-loaded)
---
{%- assign templates = site.data.catalog | where_exp: "e", "e.url contains '/templates/'" %}
{%- assign examples = site.data.catalog | where_exp: "e", "e.url contains '/examples/'" %}
{%- assign events = site.data.catalog | where_exp: "e", "e.url contains '/events/'" %}

<section id="about" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">عن المشروع</h2>
            <p class="nds-section-description">التعريف بالمشروع، وأهدافه، وما يقدمه.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <p>تعتمد هيئة الحكومة الرقمية (DGA) كود المنصات (نظام التصميم الموحد، ويعرف أيضاً بنظام التصميم الوطني) للمواقع والخدمات الحكومية في المملكة العربية السعودية. وتنشر الهيئة مواصفات النظام عبر منصة <a href="https://www.figma.com/@sdga" target="_blank">Figma</a>، وتوفر نسخته البرمجية الرسمية مكتبة مكونات مبنية باستخدام React وStorybook.</p>
                <p>يقدم هذا المشروع تطبيقاً عملياً لكود المنصات باستخدام HTML وCSS وJavaScript، دون أطر عمل أو مكتبات خارجية، ولذلك يعمل في أي مشروع: موقع ثابت، أو صفحات يولّدها الخادم، أو تطبيق مبني باستخدام React أو غيره من أطر العمل.</p>
                <p>ولا يقتصر المشروع على المكونات، بل يشمل نظاماً لتخطيط الصفحات، وقوالب صفحات جاهزة متوافقة مع كود المنصات، ووثائق استخدام، وبيئة تطوير؛ لتبني فرق العمل صفحات وخدمات كاملة، لا مكونات متفرقة فقط.</p>
                <p>كما يدعم المشروع البناء بمساعدة وكلاء البرمجة الذكية عبر <a href="{{ '/ar/guides/integration-quality/' | relative_url }}">NDS IQ</a>، وهو دليل قواعد تتبعه هذه الأدوات لتبني صفحات متوافقة مع قالب كود المنصات وتفحصها بالطريقة نفسها في كل مرة.</p>
            </div>
            <div class="nds-block">
                <div class="nds-alert nds-card nds-inline" data-status="neutral" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">إخلاء مسؤولية</span>
                            <p class="nds-alert-description">هذا المشروع تطبيق مجتمعي مستقل لكود المنصات (نظام التصميم الموحد)، ولا يرتبط رسمياً بهيئة الحكومة الرقمية (DGA)
                                أو بحكومة المملكة العربية السعودية، ولا تعتمده أي منهما أو تدعمه أو تديره.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="audience" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">الفئات المستفيدة</h2>
            <p class="nds-section-description">صمّم القالب للفرق والأفراد الذين يطوّرون المواقع والخدمات الحكومية أو يهيئونها أو يتعلمون تقنياتها.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <ul class="nds-list nds-grid nds-shadow nds-horizontal" style="--max-col: 2; --mid-col: 1; --min-col: 1;">
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-building-06" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">الجهات والفرق الحكومية</span>
                                <p class="nds-card-description">يتيح للجهات الحكومية تطوير خدمات رقمية متوافقة مع كود المنصات، باستخدام التقنيات والبيئات المعتمدة لديها.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-briefcase-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">المطورون المستقلون</span>
                                <p class="nds-card-description">يوفر للمطورين مكتبة مكونات قابلة لإعادة الاستخدام وقوالب صفحات جاهزة، تختصر وقت تنفيذ مواقع العملاء.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-mortarboard-02" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">الطلاب وحديثو التخرج</span>
                                <p class="nds-card-description">يمنح الطلاب خبرة عملية في HTML وCSS وJavaScript، من خلال كود واضح ومنظم يستخدم في مشاريع فعلية.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-teaching" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">المعلمون والمدربون</span>
                                <p class="nds-card-description">يوفر للمعلمين والمدربين مكونات فعلية وقوالب صفحات وأنماط تطوير عملية، يمكن توظيفها في الدورات التدريبية والمعسكرات وورش عمل تطوير الويب.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="nds-block">
                <div class="nds-alert nds-card nds-inline" data-status="warning" role="alert">
                    <span class="nds-feedback nds-alert-icon">
                        <span class="nds-feedback-icon">
                            <i class="nds-icon" aria-hidden="true"></i>
                        </span>
                    </span>
                    <div class="nds-alert-content">
                        <div class="nds-alert-text">
                            <span class="nds-alert-title">تنبيه مهم</span>
                            <p class="nds-alert-description">الهوية البصرية الافتراضية مخصصة للجهات الحكومية في المملكة العربية السعودية، وتشمل متغيرات التصميم والألوان والشعارات ومكوّن الختم الرقمي. ويتعين على المشاريع غير الحكومية استبدال هذه العناصر بهويتها البصرية الخاصة قبل إطلاق الموقع.</p>
                        </div>
                        <div class="nds-alert-actions">
                            <a href="{{ '/foundations/themes.html' | relative_url }}" class="nds-link">دليل تخصيص السمات</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="compliance" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action nds-wrap">
                <a href="{{ '/templates/index.html' | relative_url }}" class="nds-btn nds-secondary-outline">
                    <span class="nds-label">عرض الكل</span>
                </a>
            </div>
            <h2 class="nds-section-title">قوالب صفحات الجهات الحكومية</h2>
            <p class="nds-section-brief">قوالب صفحات جاهزة للاستخدام، مبنية وفق مواصفات كود المنصات.</p>
            <p class="nds-section-description">بنيت هذه القوالب على متغيرات التصميم والخطوط والمسافات وأنماط التفاعل المعتمدة في كود المنصات، لتكون نقطة انطلاق لأشهر واجهات الخدمات الحكومية؛ يمكن استخدامها كما هي، أو تعديلها حسب حاجة المشروع.</p>
        </div>
    </div>
    <div class="nds-section-body nds-breakout">
        <div class="nds-block">
            <div class="nds-swiper" style="--max-slides:3; --mid-slides:2; --min-slides:1; --peek:0px">
                <div class="nds-swiper-wrapper">
                    {% for tpl in templates %}{%- assign _arc = site.data.ar.catalog | where: 'url', tpl.url | first %}
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke nds-shadow">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle">
                                        {{ tpl.icon }}
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    {%- if tpl.new %}
                                    <div class="nds-card-corner">
                                        <span class="nds-tag" data-status="info">
                                            <span class="nds-label">جديد</span>
                                        </span>
                                    </div>
                                    {%- endif %}
                                    <span class="nds-card-title">{{ _arc.title | default: tpl.title }}</span>
                                    <p class="nds-card-description">{{ _arc.description | default: tpl.description }}</p>
                                </div>
                            </div>
                            {% if tpl.url %}
                            <div class="nds-card-actions">
                                <a href="{{ tpl.url | relative_url }}" class="nds-btn nds-primary">
                                    <span class="nds-label">استعراض القالب</span>
                                </a>
                            </div>
                            {% endif %}
                        </div>
                    </div>
                    {% endfor %}
                </div>
                <div class="nds-swiper-navigation" hidden>
                    <div class="nds-swiper-buttons">
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                            aria-label="القالب السابق"></button>
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                            aria-label="القالب التالي"></button>
                    </div>
                    <div class="nds-swiper-pagination"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="examples" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">نماذج تطبيقية</h2>
            <p class="nds-section-description">{{ examples | size }} صفحة كاملة تبين كيف تعمل مكونات قالب كود المنصات معاً في واجهات الخدمات الحكومية.</p>
        </div>
    </div>
    <div class="nds-section-body nds-breakout">
        <div class="nds-block">
            <div class="nds-swiper" style="--max-slides:3; --mid-slides:2; --min-slides:1; --peek:40px">
                <div class="nds-swiper-wrapper">
                    {% for ex in examples %}{%- assign _arc = site.data.ar.catalog | where: 'url', ex.url | first %}
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke nds-shadow">
                            <div class="nds-card-header">
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle">
                                        {{ ex.icon }}
                                    </span>
                                </div>
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    {%- if ex.new %}
                                    <div class="nds-card-corner">
                                        <span class="nds-tag" data-status="info">
                                            <span class="nds-label">جديد</span>
                                        </span>
                                    </div>
                                    {%- endif %}
                                    <span class="nds-card-title">{{ _arc.title | default: ex.title }}</span>
                                    <p class="nds-card-description nds-truncate" style="--truncate: 2;">{{ _arc.description | default: ex.description }}</p>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue">
                                        <span class="nds-label">{{ site.data.ar.labels[ex.category] | default: ex.category }}</span>
                                    </span>
                                    {% for tag in ex.tags %}
                                    <span class="nds-tag nds-gray">
                                        <span class="nds-label">{{ tag }}</span>
                                    </span>
                                    {% endfor %}
                                </div>
                            </div>
                            {% if ex.url %}
                            <div class="nds-card-actions">
                                <a href="{{ ex.url | relative_url }}" class="nds-btn nds-primary">
                                    <span class="nds-label">استعراض الصفحة</span>
                                </a>
                            </div>
                            {% endif %}
                        </div>
                    </div>
                    {% endfor %}
                </div>
                <div class="nds-swiper-navigation" hidden>
                    <div class="nds-swiper-buttons">
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                            aria-label="النموذج السابق"></button>
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                            aria-label="النموذج التالي"></button>
                    </div>
                    <div class="nds-swiper-pagination"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="events" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">سمات المناسبات الوطنية</h2>
            <p class="nds-section-description">حزم تصميم خاصة بالمناسبات الوطنية، يكفي سطر واحد لتطبيقها على الموقع كله، وحذفه للعودة إلى المظهر الافتراضي.</p>
        </div>
    </div>
    <div class="nds-section-body nds-breakout">
        <div class="nds-block">
            <div class="nds-swiper" style="--max-slides:3; --mid-slides:2; --min-slides:1; --peek:20px">
                <div class="nds-swiper-wrapper">
                    {% for ev in events %}{%- assign _arc = site.data.ar.catalog | where: 'url', ev.url | first %}
                    <div class="nds-swiper-slide">
                        <div class="nds-card nds-stroke nds-shadow">
                            <div class="nds-card-header">
                                {% if ev.thumbnail %}
                                <div class="nds-card-image">
                                    <img data-src="{{ ev.thumbnail | relative_url }}" width="400" height="200"
                                        alt="معاينة سمة {{ _arc.title | default: ev.title }}" decoding="async">
                                </div>
                                {% else %}
                                <div class="nds-card-featured-icon">
                                    <span class="nds-featured-icon nds-circle">
                                        {{ ev.icon }}
                                    </span>
                                </div>
                                {% endif %}
                            </div>
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <span class="nds-card-title">{{ _arc.title | default: ev.title }}</span>
                                    <p class="nds-card-description">{{ _arc.description | default: ev.description }}</p>
                                </div>
                                <div class="nds-card-tags">
                                    <span class="nds-tag nds-blue">
                                        <span class="nds-label">{{ site.data.ar.labels[ev.category] | default: ev.category }}</span>
                                    </span>
                                    {% for tag in ev.tags %}
                                    <span class="nds-tag nds-gray">
                                        <span class="nds-label">{{ tag }}</span>
                                    </span>
                                    {% endfor %}
                                </div>
                            </div>
                            {% if ev.theme or ev.url %}
                            <div class="nds-card-actions">
                                {% if ev.theme %}
                                {%- assign _tflat = "" | split: "" -%}
                                {%- for _g in site.data.themes -%}{%- assign _tflat = _tflat | concat: _g.list -%}{%-
                                endfor -%}
                                {%- assign _t = _tflat | where: 'value', ev.theme | first -%}
                                {%- if _t %}
                                <button type="button" class="nds-btn nds-primary" data-theme-value="{{ _t.value }}"
                                    {%- if _t.js %}
                                    data-theme-js="{{ _t.js | relative_url }}?ver={{ site.asset_ver }}"
                                    {% endif %}>
                                    <span class="nds-label">معاينة</span>
                                </button>
                                {%- endif %}
                                {% endif %}
                                {% if ev.url %}
                                <a href="{{ ev.url | relative_url }}" class="nds-btn nds-secondary-outline">
                                    <span class="nds-label">التفاصيل</span>
                                </a>
                                {% endif %}
                            </div>
                            {% endif %}
                        </div>
                    </div>
                    {% endfor %}
                </div>
                <div class="nds-swiper-navigation" hidden>
                    <div class="nds-swiper-buttons">
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" type="button"
                            aria-label="المناسبة السابقة"></button>
                        <button class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" type="button"
                            aria-label="المناسبة التالية"></button>
                    </div>
                    <div class="nds-swiper-pagination"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="components" class="nds-content-section">
    <div class="nds-section-wrapper">
{% include library-list.html title="المكتبة" description="استعرض جميع موارد قالب كود المنصات، بدءاً من متغيرات التصميم وصولاً إلى واجهات JavaScript البرمجية. يمكنك تصفية العناصر حسب النوع أو البحث بالاسم." %}
    </div>
</section>

<section id="architecture" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action">
                <div class="nds-progress-circle nds-lg" data-num="100" data-max="100" role="progressbar" aria-labelledby="home-performance-text">
                    <svg width="120" height="120" viewBox="0 0 24 24">
                        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
                        <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
                            stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
                    </svg>
                    <div class="nds-progress-info">
                        <span class="nds-progress-out-of">
                            <span class="nds-progress-number"></span>
                            <span class="nds-progress-of"></span>
                        </span>
                        <span class="nds-progress-text" id="home-performance-text">الأداء</span>
                    </div>
                </div>
            </div>
            <h2 class="nds-section-title">البنية التقنية والأداء</h2>
            <p class="nds-section-description">أداء عال وتوافق واسع مع المتصفحات.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal" style="--max-col: 2; --mid-col: 1; --min-col: 1;">
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">دون اعتماديات خارجية</span>
                                <p class="nds-card-description">لا يحتاج المشروع إلى Bootstrap أو Tailwind أو jQuery أو أي إطار عمل؛ فالناتج HTML وCSS وJavaScript فقط، يضاف إلى المشروع الحالي دون فرض تقنية جديدة.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-cpu-charge" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">محمّل ذكي للمكونات</span>
                                <p class="nds-card-description">يفحص المحمّل الصفحة مرة واحدة ليعرف المكونات الموجودة فيها؛ فيشغّل المكونات الأساسية أولاً، ثم البقية عندما يتفرغ المتصفح. ولا يحمّل ملف JavaScript إضافياً إلا إذا احتاجته الصفحة، فلا تشغّل كل صفحة إلا ما يلزمها.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-arrow-data-transfer-horizontal" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">دعم أصيل للاتجاهين RTL وLTR</span>
                                <p class="nds-card-description">بني القالب منذ البداية ليعمل بالاتجاهين؛ إذ تنقلب الهوامش والمسافات والحدود والمواضع تلقائياً حسب اتجاه الصفحة، دون ملف أنماط منفصل للعربية. ويكفي تغيير خاصية واحدة في HTML للتبديل بين الاتجاهين.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-paint-brush-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">متغيرات تصميم بأربعة مستويات</span>
                                <p class="nds-card-description">تنظم متغيرات التصميم (الألوان والمسافات والخطوط) في أربعة مستويات: لوحة الألوان، ثم المتغيرات الأساسية، ثم المتغيرات الدلالية، ثم متغيرات كل مكوّن، وجميعها متغيرات CSS عادية. ويوفر كل مكوّن خيارات تخصيص واضحة دون المساس بتفاصيله الداخلية.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-paint-board" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">السمات والوضع الداكن</span>
                                <p class="nds-card-description">يدعم النظام الوضعين الفاتح والداكن، مع إمكانية تخصيص الهوية البصرية بالكامل. ويمكن توليد لوحة ألوان كاملة من لون واحد، أو اختيار سمة جاهزة، أو تحميل سمة من ملف CSS، ويتم التبديل بين السمات بخاصية واحدة في HTML دون إعادة بناء الموقع.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-zap" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">~{{ page.bundle_sizes.critical_css }} KB من CSS الأساسي (بعد الضغط)</span>
                                <p class="nds-card-description">تقسم ملفات CSS إلى جزأين: جزء صغير يظهر به أعلى الصفحة فوراً، وجزء يحمّل بعده دون أن يؤخر العرض.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-layers-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">عرض الصفحة على خمس مراحل</span>
                                <p class="nds-card-description">تظهر الصفحة على خمس مراحل متتابعة: الهيكل الأساسي، ثم الأنماط الأساسية، ثم بقية الأنماط، ثم JavaScript، وأخيراً الأيقونات والخطوط. ولا تظهر أي مرحلة قبل أن تكتمل، فلا يرى الزائر صفحة بلا تنسيق، وتأتي الأيقونات في النهاية حتى لا تؤخر ظهور المحتوى الرئيسي (LCP).</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-code-circle" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">~{{ page.bundle_sizes.core_js }} KB من JavaScript الأساسي (بعد الضغط)</span>
                                <p class="nds-card-description">يبلغ الحجم الإجمالي للمكتبة نحو {{ page.bundle_sizes.total_js }} كيلوبايت بعد الضغط، لكنها لا تحمّل دفعة واحدة؛ فكل صفحة تحمّل ملفاً أساسياً صغيراً بحجم يقارب {{ page.bundle_sizes.core_js }} كيلوبايت، ولا تحمّل بقية المكونات إلا إذا وجدت في الصفحة؛ لذلك تحتاج الصفحة عادة إلى جزء صغير من المكتبة فقط.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-chart-line-data-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">متوافق مع مؤشرات أداء الويب</span>
                                <p class="nds-card-description">حقق المشروع نتيجة 100 في اختبار Google PageSpeed، واجتاز في ذلك الاختبار مؤشرات LCP وCLS وINP. ويختبر الأداء على أجهزة الكمبيوتر والجوال، وعلى اتصالات سريعة وبطيئة.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-dashboard-speed-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">الحركات والانتقالات</span>
                                <p class="nds-card-description">تعتمد الحركات على معالج الرسوميات (GPU) لتبقى سلسة حتى على الأجهزة الضعيفة، ولا تعالج العناصر البعيدة عن الشاشة إلا عند الوصول إليها.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section id="frameworks" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <div class="nds-section-action nds-wrap">
                <a href="{{ '/core/init.html#init-frameworks' | relative_url }}" class="nds-btn nds-secondary-outline">
                    <span class="nds-label">دليل التكامل مع أطر العمل</span>
                </a>
            </div>
            <h2 class="nds-section-title">التوافق مع أطر العمل</h2>
            <p class="nds-section-description">يعمل قالب كود المنصات مع أي إطار عمل، لأنه مبني بلغة HTML وCSS وJavaScript فقط؛ فلا حاجة إلى تغيير التقنيات المستخدمة في المشروع.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <ul class="nds-list nds-grid nds-shadow nds-horizontal" style="--max-col: 2; --mid-col: 1; --min-col: 1;">
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-checkmark-badge-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">أطر عمل تم اختبارها</span>
                                <p class="nds-card-description">جرى اختبار القالب فعلياً في المتصفح مع الإصدارين 18 و19 من React، و3.4 و3.5 من Vue، و4 و5 من Svelte، و17 و19 من Angular. وشمل الاختبار أيضاً الصفحات التي يولّدها الخادم في React وVue، والصفحات التي تحدّث جزءاً منها عبر htmx وTurbo.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-layers-02" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">تشغيل المكونات وإيقافها</span>
                                <p class="nds-card-description">عندما يضيف إطار العمل واجهة جديدة، يشغّل الأمر <code class="nds-inline-code lang-js">NDS.init.mount()</code> مكوناتها. وقبل إزالتها، ينظّف الأمر <code class="nds-inline-code lang-js">NDS.init.destroy()</code> كل ما يتعلق بها، مثل القوائم المفتوحة وخلفيات النوافذ المنبثقة، فلا يبقى لها أثر في الصفحة.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-refresh" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">تحديث جزء من الصفحة</span>
                                <p class="nds-card-description">تستبدل أدوات مثل Turbo وhtmx وLivewire جزءاً من الصفحة دون إعادة تحميلها. ولكي تعمل المكونات في الجزء الجديد، استدع <code class="nds-inline-code lang-js">NDS.init.destroy()</code> على الجزء القديم قبل استبداله، ثم <code class="nds-inline-code lang-js">NDS.init.mount()</code> على الجزء الجديد بعد وصوله.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-server-stack-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">الصفحات التي يولّدها الخادم</span>
                                <p class="nds-card-description">يعمل القالب مع Next.js وNuxt؛ أضف الخاصية <code class="nds-inline-code lang-html">data-no-auto-init</code> إلى العنصر <code class="nds-inline-code lang-html">&lt;html&gt;</code>، فينتظر القالب حتى ينتهي إطار العمل من تجهيز الصفحة (Hydration)، ثم يشغّل مكوناته.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-link-04" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">مزامنة الحقول مع البيانات</span>
                                <p class="nds-card-description">عند تغيّر قيمة أي حقل، يطلق القالب الحدثين المعتادين <code class="nds-inline-code lang-js">input</code> و<code class="nds-inline-code lang-js">change</code>، فتبقى البيانات محدّثة تلقائياً في <code class="nds-inline-code lang-js">onChange</code> في React، و<code class="nds-inline-code lang-html">v-model</code> في Vue، و<code class="nds-inline-code lang-html">ngModel</code> في Angular، و<code class="nds-inline-code lang-html">bind:value</code> في Svelte.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-translate" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">العمل مع أدوات الترجمة</span>
                                <p class="nds-card-description">عند تبديل لغة الواجهة، يغيّر القالب النصوص فقط ولا يمس عناصر الصفحة التي أنشأها إطار العمل؛ فتبقى علامات <code class="nds-inline-code lang-html">data-i18n</code> في JSX وVue وAngular تعمل بعد كل تحديث للصفحة.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section id="dev-environment" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">بيئة التطوير</h2>
            <p class="nds-section-description">الأدوات والموارد اللازمة لبناء النظام وتعديله وتطويره.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block nds-prose">
                <p>يعتمد المشروع على <a href="https://jekyllrb.com/" target="_blank">Jekyll</a>، وهو مولّد مواقع ثابتة تدعمه GitHub Pages. ويتولى تحويل القوالب وملفات الأنماط والبيانات إلى صفحات HTML ثابتة، دون الحاجة إلى سلسلة أدوات خارجية.</p>
            </div>
            <div class="nds-block">
                <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal" style="--max-col: 2; --mid-col: 1; --min-col: 1;">
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-artificial-intelligence-04" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">التطوير بمساعدة الذكاء الاصطناعي</span>
                                <p class="nds-card-description">أعد الكود المصدري للقالب ليسهل تطويره بمساعدة وكلاء البرمجة الذكية؛ إذ يتضمن المستودع قواعد المشروع وخطوات عمل مفصلة للمهام الشائعة، فتلتزم هذه الأدوات بالمعايير نفسها، وتجري الفحوصات التي يجريها المطور.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-paint-brush-01" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">بنية Sass</span>
                                <p class="nds-card-description">لكل مكوّن ملف أنماط خاص به، وتتشارك الملفات المتغيرات والدوال المساعدة (Mixins) ومتغيرات التصميم على مستوى النظام، ثم يجمعها Jekyll ويضغطها في ملفات CSS النهائية.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-code" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">بنية JavaScript المعيارية</span>
                                <p class="nds-card-description">لكل مكوّن ملف JavaScript مستقل، ويشغّل محمّل المكونات الموجود منها في الصفحة فقط. ويجمع سكربت Ruby الملفات ويضغطها باستخدام <a href="https://terser.org/" target="_blank">Terser</a> في حزم: ملف أساسي خفيف، وحزم إضافية تحمّل عند الحاجة.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-layout-03" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">قوالب Liquid</span>
                                <p class="nds-card-description">تبنى الصفحات من أجزاء مشتركة يعاد استخدامها بدلاً من تكرار الكود، عبر محرك القوالب المدمج في Jekyll، الذي يدعم التخطيطات وملفات التضمين والحلقات والشروط وربط البيانات.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-database" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">إدارة البيانات باستخدام YAML</span>
                                <p class="nds-card-description">تحفظ بيانات الموقع، مثل القوائم وعناصر التنقل ومحتوى الصفحة الرئيسية والإعدادات، في ملفات YAML منظمة ومستقلة عن القوالب، ثم تدمج معها أثناء البناء.</p>
                            </div>
                        </div>
                    </li>
                    <li class="nds-card">
                        <div class="nds-card-header">
                            <div class="nds-card-featured-icon">
                                <span class="nds-featured-icon nds-circle"><i class="hgi hgi-stroke hgi-puzzle" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <div class="nds-card-content">
                            <div class="nds-card-text">
                                <span class="nds-card-title">إضافات مخصصة</span>
                                <p class="nds-card-description">توسّع سكربتات Ruby المخصصة إمكانات Jekyll أثناء بناء الموقع، لتنفيذ مهام مثل تجميع ملفات JavaScript وضغط HTML وضبط مسارات الروابط. ويمكن تعديل كل إضافة وفق احتياجات المشروع.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section id="support" class="nds-content-section nds-brand">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">الاستشارات والتطوير</h2>
            <p class="nds-section-description">تتوفر خدمات الاستشارات والتطوير لتطبيق كود المنصات في المواقع والخدمات الحكومية: من مراجعة الواجهات الحالية ومواءمتها مع معايير هيئة الحكومة الرقمية، إلى بناء مكونات خاصة، أو تنفيذ موقع أو بوابة إلكترونية كاملة.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-persona">
                <div class="nds-avatar nds-image-border">
                    <img src="{{ '/docs-assets/img/mazin-musleh.webp' | relative_url }}" alt="" width="240" height="240" loading="lazy">
                </div>
                <div class="nds-persona-info">
                    <span class="nds-persona-name">مازن مصلح الحجيلي</span>
                    <span class="nds-persona-role nds-truncate">مستشار تطوير الواجهات الأمامية</span>
                </div>
            </div>
            <div class="nds-section-action">
                <a href="{{ site.author_profile }}" target="_blank" rel="noopener" class="nds-btn nds-primary">
                    <span class="nds-label">التواصل عبر LinkedIn</span>
                </a>
                <a href="{{ site.repository_url }}/issues/new/choose" target="_blank" rel="noopener" class="nds-btn nds-secondary-outline">
                    <span class="nds-label">الإبلاغ عن مشكلة</span>
                </a>
            </div>
        </div>
    </div>
</section>