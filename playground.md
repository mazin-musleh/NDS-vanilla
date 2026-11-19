---
layout: default
sitemap: false  # internal dev/test page — keep out of the public sitemap
noindex: true   # also tell crawlers not to index it if reached via a link
title: "نظام التصميم الموحد لكود المنصات السعودي"
lang: ar
direction: rtl
---

<!-- Internal dev/test scratch page: side menu rail, full menu with icons and search. -->

<div class="nds-content-layout nds-has-sidemenu nds-rail">
  <aside class="nds-sidemenu" aria-label="Sidebar" data-i18n-aria-label="sidemenu.sidebar">
    <button class="nds-sidemenu-toggle nds-btn" aria-label="Sidebar Menu" data-i18n-aria-label="sidemenu.sidebar_menu" hidden>
      <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
      <span class="nds-label nds-truncate">القائمة الجانبية</span>
    </button>
    <nav class="nds-drawer nds-divided nds-lined" data-search>
      <div class="nds-scroll-more nds-divided">
        <ul class="nds-drawer-list nds-scroll-more-content">
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-home-01" aria-hidden="true"></i>
              <span class="nds-label">الرئيسية</span>
            </a>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
              <i class="hgi hgi-stroke hgi-passport-01" aria-hidden="true"></i>
              <span class="nds-label">الجوازات</span>
              <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">3</span></span>
            </button>
            <ul>
              <li data-state="active">
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">تجديد جواز السفر</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">إصدار جواز سفر</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">الإبلاغ عن فقدان جواز السفر</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
              <i class="hgi hgi-stroke hgi-airplane-01" aria-hidden="true"></i>
              <span class="nds-label">التأشيرات</span>
              <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">5</span></span>
            </button>
            <ul>
              <li>
                <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
                  <span class="nds-label">تأشيرات الزيارة</span>
                </button>
                <ul>
                  <li>
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">زيارة عائلية</span>
                    </a>
                  </li>
                  <li>
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">زيارة شخصية</span>
                    </a>
                  </li>
                  <li>
                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                      <span class="nds-label">زيارة سياحية</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">تمديد التأشيرة</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">الخروج والعودة</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
              <span class="nds-label">المواعيد</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-credit-card" aria-hidden="true"></i>
              <span class="nds-label">المدفوعات</span>
              <span class="nds-tag nds-gray nds-xs nds-rounded"><span class="nds-label">2</span></span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-file-01" aria-hidden="true"></i>
              <span class="nds-label">المستندات</span>
            </a>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator" aria-expanded="false">
              <i class="hgi hgi-stroke hgi-task-01" aria-hidden="true"></i>
              <span class="nds-label">الطلبات</span>
            </button>
            <ul>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">طلب جديد</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">طلباتي قيد المعالجة</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">الطلبات المكتملة</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-message-01" aria-hidden="true"></i>
              <span class="nds-label">الرسائل</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-notification-01" aria-hidden="true"></i>
              <span class="nds-label">الإشعارات الواردة من الجهات الحكومية</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-chart-histogram" aria-hidden="true"></i>
              <span class="nds-label">التقارير</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-user-group" aria-hidden="true"></i>
              <span class="nds-label">التابعون</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-settings-01" aria-hidden="true"></i>
              <span class="nds-label">الإعدادات</span>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <i class="hgi hgi-stroke hgi-headset" aria-hidden="true"></i>
              <span class="nds-label">تواصل معنا</span>
            </a>
          </li>
        </ul>
        <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more" data-i18n-aria-label="scroll-more.show_more">
          <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </aside>
  <div class="nds-content" id="main-content">
    <section class="nds-content-section">
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h2 class="nds-section-title">تجديد جواز السفر</h2>
          <p class="nds-section-description">جدّد جواز سفرك إلكترونيًا دون الحاجة إلى زيارة المكتب.</p>
        </div>
        <div class="nds-section-body nds-prose">
          <p>يمكنك تجديد جواز السفر قبل انتهائه بستة أشهر. جهّز صورة شخصية حديثة، وادفع الرسوم عبر سداد، ثم قدّم الطلب من صفحة الطلبات.</p>
          <p>يصلك إشعار عند جاهزية الجواز، ويمكنك استلامه من الفرع الذي تختاره أو طلب توصيله إلى عنوانك الوطني.</p>
        </div>
      </div>
    </section>
    <section class="nds-content-section">
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h2 class="nds-section-title">المتطلبات</h2>
        </div>
        <div class="nds-section-body nds-prose">
          <p>هوية وطنية سارية، وجواز السفر السابق، وصورة شخصية بخلفية بيضاء، وسداد الرسوم المقررة.</p>
          <p>لمن هم دون الثامنة عشرة: حضور ولي الأمر أو موافقته الإلكترونية عبر أبشر.</p>
        </div>
      </div>
    </section>
    <section class="nds-content-section">
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h2 class="nds-section-title">الرسوم</h2>
        </div>
        <div class="nds-section-body nds-prose">
          <p>تختلف الرسوم حسب مدة الجواز: خمس سنوات أو عشر سنوات. تُدفع الرسوم قبل تقديم الطلب ولا تُسترد بعد إصدار الجواز.</p>
          <p>في حال التأخر في التجديد بعد انتهاء الجواز لا تُفرض غرامة، لكن لا يمكنك السفر به.</p>
        </div>
      </div>
    </section>
    <section class="nds-content-section">
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h2 class="nds-section-title">الأسئلة الشائعة</h2>
        </div>
        <div class="nds-section-body nds-prose">
          <p>هل يمكنني التجديد من خارج المملكة؟ نعم، عبر السفارة أو القنصلية في بلد الإقامة.</p>
          <p>كم يستغرق الإصدار؟ عادةً من ثلاثة إلى خمسة أيام عمل بعد اكتمال الطلب.</p>
          <p>هل أحتاج إلى موعد؟ لا، إلا إذا اخترت الاستلام من الفرع.</p>
        </div>
      </div>
    </section>
  </div>
</div>
