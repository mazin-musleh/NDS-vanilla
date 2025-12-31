---
layout: home
title: "National Design System for Saudi Arabia"
hero_title: "National Design System for Saudi Arabia"
hero_description: "A comprehensive design system empowering consistent, accessible, and high-performance digital
government experiences across the Kingdom."
#hero_image: /assets/img/riyadhcenter.webp
hero_image_pos: 50% 10%
lang: en
direction: ltr
---

<!-- About the System -->
<section id="aboutSystem" class="nds-content-section">

    <div class="nds-section-head">
        <h2 class="nds-section-title">About the Design System</h2>
        <p class="nds-section-description">The National Design System for Saudi Arabia
            is a living documentation and component library built to standardize digital government services. It
            provides reusable components, design tokens, accessibility guidelines, and interaction patterns that
            ensure consistency across all government digital touchpoints.</p>
    </div>
    <div class="nds-section-content">

        <style>
            /* ==============================================
               SSP REQUESTER - HERO SECTION
            ============================================== */
            .ssp-requester {
                position: relative;
                overflow: hidden;
                min-height: 400px;
            }

            .ssp-requester__bg {
                --overlay: 0.7;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                object-fit: cover;
                object-position: center 60%;
                z-index: 0;
            }

            .ssp-requester::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: linear-gradient(0deg, rgba(9, 42, 30, var(--overlay, 0.70)) 0%, rgba(9, 42, 30, var(--overlay, 0.70)) 100%);
                z-index: 1;
                pointer-events: none;
            }

            .ssp-requester__content {
                position: relative;
                z-index: 2;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 32px 16px;
                gap: 32px;
            }

            /* ==============================================
               SSP REQUESTER - SEARCH SECTION
            ============================================== */
            .ssp-requester__search {
                max-width: 800px;
                width: 100%;
                text-align: center;
            }

            .ssp-requester__title {
                color: #fff;
                font-size: 30px;
                line-height: 38px;
                font-weight: 700;
                margin: 0 0 24px 0;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            /* ==============================================
               SSP REQUESTER - CARDS GRID
            ============================================== */
            .ssp-requester__cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 280px));
                gap: 16px;
                /* width: 100%; */
                max-width: 1200px;
            }

            /* ==============================================
               SSP REQUESTER - CARD COMPONENT
            ============================================== */
            .ssp-card {
                display: flex;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }

            .ssp-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 12px -2px rgba(0, 0, 0, 0.15);
            }

            .ssp-card__icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                min-height: 120px;
                flex-shrink: 0;
            }

            .ssp-card__icon-circle {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }

            .ssp-card__icon-circle i {
                font-size: 28px;
                color: #fff;
            }

            .ssp-card__body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: #fff;
                gap: 12px;
                padding: 16px;
                flex: 1;
            }

            .ssp-card__title {
                font-size: 18px;
                line-height: 28px;
                font-weight: 600;
                color: #1a1a1a;
                margin: 0;
            }

            .ssp-card__btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 8px 16px;
                color: #fff !important;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                text-decoration: none;
                cursor: pointer;
                transition: background-color 0.2s ease, filter 0.2s ease;
                width: fit-content;
            }

            .ssp-card__btn:hover {
                filter: brightness(1.1);
            }

            .ssp-card__btn label {
                line-height: normal;
            }

            /* ==============================================
               SSP REQUESTER - CARD COLOR VARIANTS
            ============================================== */
            /* Red - Report Issue */
            .ssp-card--danger .ssp-card__icon {
                background: linear-gradient(135deg, #E05949 0%, #c94a3d 100%);
            }

            .ssp-card--danger .ssp-card__btn {
                background-color: #E05949;
            }

            /* Green - Service Request */
            .ssp-card--success .ssp-card__icon {
                background: linear-gradient(135deg, #34C89F 0%, #2aa882 100%);
            }

            .ssp-card--success .ssp-card__btn {
                background-color: #34C89F;
            }

            /* Blue - Book Assets */
            .ssp-card--info .ssp-card__icon {
                background: linear-gradient(135deg, #4995e9 0%, #3a7bc8 100%);
            }

            .ssp-card--info .ssp-card__btn {
                background-color: #4995e9;
            }

            /* Gray - Solutions */
            .ssp-card--neutral .ssp-card__icon {
                background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
            }

            .ssp-card--neutral .ssp-card__btn {
                background-color: #6b7280;
            }

            /* ==============================================
               SSP REQUESTER - RESPONSIVE
            ============================================== */
            @media (max-width: 599px) {
                .ssp-requester__title {
                    font-size: 24px;
                    line-height: 32px;
                }

                .ssp-requester__cards {
                    grid-template-columns: 1fr;
                }

                .ssp-card__icon {
                    width: 80px;
                    min-height: 100px;
                }

                .ssp-card__icon-circle {
                    width: 48px;
                    height: 48px;
                }

                .ssp-card__icon-circle i {
                    font-size: 24px;
                }
            }
        </style>

        <div class="ssp-requester" style="--overlay: 0.7;">
            <!-- Background Image -->
            <img src="https://iu.edu.sa/media/Slides/IUGATE.webp" class="ssp-requester__bg" alt="">

            <!-- Content -->
            <div class="ssp-requester__content">

                <!-- Search Section -->
                <div class="ssp-requester__search">
                    <h1 class="ssp-requester__title" data-i18n-key="search_widget.help1">
                        <span data-i18nkey="search_widget.help1"></span>
                    </h1>
                    {{{search_widget}}}
                </div>

                <!-- Cards Grid -->
                <div class="ssp-requester__cards">

                    <!-- Report an Issue Card -->
                    <div class="ssp-card ssp-card--danger">
                        <div class="ssp-card__icon">
                            <span class="ssp-card__icon-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M9.11199 0.265001C10.1764 -0.0883337 11.3236 -0.0883337 12.388 0.265001C13.4481 0.616874 14.2804 1.45141 15.1165 2.62395C15.9499 3.7926 16.8708 5.42206 18.0578 7.5225L18.1044 7.60496C19.2917 9.70572 20.2125 11.3351 20.7864 12.6565C21.363 13.9843 21.6502 15.1307 21.4211 16.2321C21.1903 17.3411 20.6214 18.3495 19.7928 19.1117C18.9662 19.872 17.8407 20.1928 16.4236 20.3468C15.0145 20.5 13.1712 20.5 10.7988 20.5H10.7013C8.32882 20.5 6.48554 20.5 5.07642 20.3468C3.65927 20.1928 2.53379 19.872 1.70722 19.1117C0.878623 18.3495 0.30968 17.3411 0.078953 16.2321C-0.150202 15.1307 0.137 13.9843 0.713655 12.6565C1.28752 11.3351 2.20835 9.70572 3.39558 7.60495L3.44218 7.5225L3.44218 7.52249C4.62921 5.42206 5.55008 3.7926 6.38347 2.62395C7.21963 1.45141 8.05194 0.616874 9.11199 0.265001ZM11.9155 1.68862C11.1578 1.43713 10.3422 1.43713 9.58454 1.68862C8.98856 1.88645 8.38943 2.3945 7.60474 3.49486C6.82275 4.59143 5.93998 6.15144 4.72466 8.30193C3.50941 10.4523 2.62825 12.0135 2.08951 13.254C1.54983 14.4967 1.41463 15.2879 1.5475 15.9266C1.71511 16.7321 2.12754 17.4602 2.72272 18.0077C3.19016 18.4377 3.91852 18.7121 5.23854 18.8556C6.55696 18.9989 8.31861 19 10.75 19C13.1814 19 14.943 18.9989 16.2615 18.8556C17.5815 18.7121 18.3099 18.4377 18.7773 18.0077C19.3725 17.4602 19.7849 16.7321 19.9525 15.9266C20.0854 15.2879 19.9502 14.4967 19.4105 13.254C18.8718 12.0135 17.9906 10.4523 16.7754 8.30193C15.56 6.15144 14.6773 4.59143 13.8953 3.49486C13.1106 2.3945 12.5115 1.88645 11.9155 1.68862ZM9.74219 14.25C9.74219 13.6977 10.1899 13.25 10.7422 13.25H10.7512C11.3035 13.25 11.7512 13.6977 11.7512 14.25C11.7512 14.8023 11.3035 15.25 10.7512 15.25H10.7422C10.1899 15.25 9.74219 14.8023 9.74219 14.25ZM10 11.25C10 11.6642 10.3358 12 10.75 12C11.1642 12 11.5 11.6642 11.5 11.25V7.25C11.5 6.83579 11.1642 6.5 10.75 6.5C10.3358 6.5 10 6.83579 10 7.25V11.25Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                        </div>
                        <div class="ssp-card__body">
                            <h3 class="ssp-card__title">
                                <span data-i18nkey="search_widget.help2"></span>
                            </h3>
                            <a role="button" class="ssp-card__btn" data-spa-page="scc" data-spa="true"
                                data-spa-module="requests"
                                href="/WorkOrder.do?woMode=newWO&from=Templates&module=incident&reqTemplate=3602&requestServiceId=-1"
                                data-externalframe="true">
                                <span class="label"><span data-i18nkey="search_widget.help5"></span></span>
                            </a>
                        </div>
                    </div>

                    <!-- Service Request Card -->
                    <div class="ssp-card ssp-card--success" data-card="service">
                        <div class="ssp-card__icon">
                            <span class="ssp-card__icon-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.5 0.75C5.5 0.335786 5.16421 0 4.75 0C4.33579 0 4 0.335786 4 0.75V4H0.75C0.335786 4 0 4.33579 0 4.75C0 5.16421 0.335786 5.5 0.75 5.5H4V8.75C4 9.16421 4.33579 9.5 4.75 9.5C5.16421 9.5 5.5 9.16421 5.5 8.75V5.5H8.75C9.16421 5.5 9.5 5.16421 9.5 4.75C9.5 4.33579 9.16421 4 8.75 4H5.5V0.75ZM9.78688 3.81082e-06C9.37267 -0.00130254 9.03582 0.333423 9.03452 0.747635C9.03321 1.16185 9.36794 1.49869 9.78215 1.5C11.3378 1.5049 12.4593 1.53422 13.3173 1.681C14.1536 1.82406 14.6645 2.06723 15.0481 2.45087C15.4713 2.87408 15.725 3.45372 15.8602 4.45981C15.9984 5.48748 16 6.84215 16 8.74897V12.0921C16 12.53 15.9967 12.8069 15.9833 12.999H15.6951H15.6951C14.3275 12.9989 13.2252 12.9989 12.3582 13.1155C11.4581 13.2365 10.7003 13.4954 10.0984 14.0973C9.49643 14.6992 9.23754 15.4571 9.11652 16.3572C8.99996 17.2242 8.99998 18.3265 9 19.6941V19.9858C8.83315 19.9964 8.59183 19.999 8.20584 19.999C6.56521 19.999 5.39983 19.9978 4.5048 19.8933C3.62593 19.7907 3.10466 19.5972 2.71008 19.279C2.52969 19.1336 2.36538 18.9693 2.21993 18.7889C1.9018 18.3943 1.70831 17.873 1.6057 16.9942C1.5012 16.0991 1.5 14.9338 1.5 13.2931L1.5 10.749C1.5 10.3348 1.16421 9.99897 0.75 9.99897C0.335787 9.99897 0 10.3348 0 10.749V13.3414C-1.17954e-05 14.923 -2.12714e-05 16.176 0.11582 17.1681C0.234724 18.1865 0.484274 19.026 1.05221 19.7304C1.26478 19.994 1.50494 20.2342 1.76858 20.4468C2.47298 21.0147 3.31245 21.2642 4.33084 21.3831C5.32299 21.499 6.57597 21.499 8.15754 21.499H8.15756H8.20584L8.31024 21.499C8.91349 21.4995 9.3899 21.4999 9.83679 21.3422C9.92917 21.3096 10.0197 21.2721 10.1081 21.2298C10.5356 21.0253 10.8722 20.6882 11.2984 20.2613L11.3722 20.1874L16.1088 15.4509L16.1943 15.3655C16.6887 14.872 17.0801 14.4814 17.2907 13.9729C17.5013 13.4645 17.5007 12.9116 17.5001 12.213L17.5 12.0921V8.69255V8.69251C17.5 6.85477 17.5 5.39915 17.3469 4.25994C17.1892 3.08752 16.8571 2.13857 16.1088 1.39021C15.4332 0.714686 14.5932 0.377469 13.5703 0.20248C12.5691 0.0312189 11.3233 0.00484913 9.78688 3.81082e-06ZM12.5581 14.6021C13.1622 14.5209 13.9235 14.5036 14.9384 14.4999L10.501 18.9373C10.5046 17.9224 10.5219 17.1612 10.6031 16.5571C10.7018 15.8233 10.8822 15.4347 11.159 15.158C11.4358 14.8812 11.8243 14.7008 12.5581 14.6021Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                        </div>
                        <div class="ssp-card__body">
                            <h3 class="ssp-card__title">
                                <span data-i18nkey="search_widget.help3"></span>
                            </h3>
                            <a role="button" class="ssp-card__btn" data-spa-page="scc" data-spa="true"
                                data-spa-module="requests"
                                href="/WorkOrder.do?woMode=newWO&from=Templates&module=serviceRequest&reqTemplate=3605&requestServiceId=1801"
                                data-externalframe="true">
                                <span class="label"><span data-i18nkey="search_widget.help6"></span></span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>