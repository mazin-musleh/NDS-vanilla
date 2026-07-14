/**
 * National Design System - Showcase JavaScript
 * Common functionality for component demonstration pages
 *
 * Toggle Button Formats:
 *
 * Class toggling (default):
 * data-toggler='["class1 class2", ".target", "type"]'
 *
 * Class with explicit action (add/remove instead of toggle):
 * data-toggler='["class1", ".target", "type", "add"]'
 * data-toggler='["class1", ".target", "type", "remove"]'
 *
 * Attribute toggling:
 * data-toggler='["attr1=value1 attr2", ".target", "type", "attr"]'
 * data-toggler='["disabled checked", ".target", "type", "attr"]'  // for boolean attributes
 *
 * Inline style / CSS custom property toggling:
 * data-toggler='["--truncate:2", ".target", "type", "style"]'
 * data-toggler='["--truncate:2 --max-height:200px", ".target", "type", "style"]'  // multiple props
 *
 * Multiple operations:
 * data-toggler='[["class1", ".target1", "type1"], ["class2", ".target2", "type2", "add"]]'
 */

(function() {
    'use strict';

    // Singleton lifecycle: init once (guard against double-boot), tear down via
    // one AbortController for signal-based listeners plus _offHandles for non-signal
    // core subscriptions (NDS.onAttrChange).
    let _initDone = false;
    let _abortController = null;
    let _offHandles = [];

    // Alert demo content — single source of truth. Non-inline alerts use the
    // capitalized variant name as the title; only inline alerts have prefixes.
    const INLINE_TITLES = { critical: 'Important:', success: 'Success:', info: 'Information:', warning: 'Warning:', neutral: 'Notification:' };
    const ALERT_MESSAGES = {
        success: 'Operation completed successfully!',
        warning: 'Please review your changes before proceeding.',
        error: 'An error occurred. Please try again.',
        info: 'This is an informational message.',
        neutral: 'This is a neutral notification.',
        critical: 'This is a very important banner message that requires attention'
    };
    const TOAST_MESSAGES = {
        success: 'Changes saved successfully!',
        warning: 'Your session will expire soon.',
        error: 'Failed to complete the action.',
        info: 'New update available for download.'
    };
    const FEEDBACK_MESSAGES = {
        success: 'Operation completed successfully',
        warning: 'Please review before proceeding',
        error: 'This field is required',
        info: 'This is an informational hint',
        neutral: 'General note for reference'
    };

    // Dispatch registry for the single delegated click listener. Each entry is an
    // independent matcher resolved via e.target.closest — there is NO early break,
    // so an element matching two entries triggers both, exactly replicating the
    // separate per-concern listeners this consolidates. (Function declarations are
    // hoisted, so the handlers referenced here are defined further down.)
    var CLICK_HANDLERS = [
        { match: '.demo-toggle-btn',         handle: handleToggleClick },
        { match: '.demo-action-btn',         handle: demoActionDispatch, preventDefault: true },
        { match: '[data-card-mode]',         handle: cardModeToggle },
        { match: '[data-card-state]',        handle: cardStateToggle },
        { match: '[data-card-header]',       handle: cardHeaderToggle },
        { match: '[data-card-color]',        handle: cardColorToggle },
        { match: '[data-card-layout]',       handle: cardLayoutToggle },
        { match: '[data-card-toggle]',       handle: cardContentToggle },
        { match: '[data-stepper-fallback]',  handle: stepperFallbackToggle },
        { match: '[data-form-fix]',          handle: formFixToggle },
        { match: '[data-form-fix-icon]',     handle: formFixIconToggle },
        { match: '[data-form-fix-dropmenu]', handle: formFixDropmenuToggle },
        { match: '[data-rating-disable]',    handle: ratingDisableToggle },
        { match: '[data-quote-bg]',          handle: quoteBgToggle },
        { match: '[data-quote-toggle]',      handle: quoteToggle },
        { match: '.demo-counter-restart',    handle: counterRestart }
    ];

    function onDocumentClick(e) {
        for (var i = 0; i < CLICK_HANDLERS.length; i++) {
            var entry = CLICK_HANDLERS[i];
            var el = e.target.closest(entry.match);
            if (!el) continue;
            if (entry.preventDefault) e.preventDefault();
            entry.handle(el, e);
        }
    }

    // Main initialization function — idempotent (singleton, _initDone guard so a
    // double-boot can't bind the listener twice).
    function initializeShowcase() {
        if (_initDone) return;
        _initDone = true;
        _abortController = new AbortController();
        const signal = _abortController.signal;

        // Demo-card first-paint defaults (oncolor auto-click + option visibility).
        // Run BEFORE the click listener is attached so the synthetic firstBgButton
        // click stays a pre-listener no-op, exactly as before consolidation.
        initDemoCardDefaults();

        // One delegated click listener for every demo control (replaces ~15
        // per-button / per-concern listeners). Dispatch via CLICK_HANDLERS.
        document.addEventListener('click', onDocumentClick, { signal });

        // Custom upload event, page-gated fetch shim, and the pooled stepper observer.
        initializeFakeFileUpload(signal);
        initializeAutocompleteDemoData();
        initializeStepperResponsiveSimplify();
    }

    // Tear down every listener/subscription this module owns.
    function destroy() {
        if (_abortController) _abortController.abort();
        _abortController = null;
        _offHandles.forEach(off => off());
        _offHandles = [];
        _initDone = false;
    }

    // Expose the global API at module-eval; the self-boot at file end calls init().
    if (typeof window !== 'undefined') {
        NDS.Showcase = {
            initializeDemoToggleButtons: initDemoCardDefaults,
            updateButtonsForBackground: updateButtonsForBackground,
            startUploadSimulation: startUploadSimulation,
            populateDemoFiles: populateDemoFiles,
            reapplyActiveTogglers: reapplyActiveTogglers,
            init: initializeShowcase,
            destroy: destroy
        };
    }

    // Get the hidden copy for a code element, creating it on first request. The
    // snapshot is the pristine authored source — every mutator calls this getter
    // before it mutates, so the first call (always a user interaction, post-init)
    // captures before any change. Lazy, so untouched demos allocate nothing.
    // textContent yields the raw source pre- or post-highlight alike: nds-code
    // keeps textContent === source (the corpus is entity-escaped).
    function getHiddenCodeCopy(codeElement) {
        var copy = codeElement.parentNode.querySelector('.original-code-content');
        if (!copy) {
            copy = document.createElement('div');
            copy.style.display = 'none';
            copy.className = 'original-code-content';
            copy.textContent = codeElement.textContent;
            codeElement.parentNode.insertBefore(copy, codeElement.nextSibling);
        }
        return copy;
    }

    // Update the hidden copy and apply to visible code element
    function updateCodeFromHiddenCopy(codeElement, updatedContent) {
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;

        // Update the hidden copy
        hiddenCopy.textContent = updatedContent;

        // nds-code reads the source from textContent, so the raw markup must be
        // written as TEXT — innerHTML would parse the tags into real DOM and the
        // highlighter's textContent read would then strip them. Clear the stale
        // snapshot so reprocess re-captures the fresh (escaped) content.
        codeElement.textContent = updatedContent;
        delete codeElement.dataset.originalContent;

        // Reprocess using the nds-code API (re-highlights from textContent)
        NDS.Code.reprocessCodeElement(codeElement);
    }



    function updateButtonsForBackground(container, bgType) {
        const buttons = container.querySelectorAll('.nds-btn');
        
        buttons.forEach(button => {
            if (bgType === 'colored') {
                // Add oncolor class for colored backgrounds
                if (!button.classList.contains('nds-oncolor')) {
                    button.classList.add('nds-oncolor');
                }
            } else {
                // Remove oncolor class for default/none background
                button.classList.remove('nds-oncolor');
            }
        });
    }


    // Demo-card first-paint defaults (the click handling itself is delegated via
    // CLICK_HANDLERS). Initializes oncolor cards and pairs option visibility.
    function initDemoCardDefaults() {
        document.querySelectorAll('.nds-demo-card').forEach(card => {
            const demoContainer = card.querySelector('.demo-container');
            const hasOncolorButtons = demoContainer && demoContainer.querySelector('.nds-oncolor');

            // Find first background toggle button for initialization by looking for any background-related toggles
            const firstBgButton = card.querySelector('.demo-toggle-btn[data-toggler*="Bg"], .demo-toggle-btn[data-toggler*="bg"]');

            if (hasOncolorButtons && firstBgButton) {
                // Trigger click on first button to apply initial state
                firstBgButton.click();
            }

            // Pair options with layout state on first paint so variant-specific
            // toggles start out hidden/shown correctly.
            updateDemoOptionVisibility(card);
        });
    }

    // ── Option pairing ────────────────────────────────────────────────
    // A toggle button can scope itself to a specific layout state of its
    // toggler target via:
    //   data-demo-requires-class="nds-radial"        (show only when target has class)
    //   data-demo-forbids-class="nds-vertical nds-radial"   (hide when any listed class present)
    // Both accept space-separated class names. Re-evaluated after every
    // toggle so options track the active variant automatically. If a
    // currently-active button becomes hidden, its state is reset (class
    // removed, button deselected, exclusive-group siblings fall back to
    // their default option) so the stepper doesn't carry stale modifiers
    // across variant changes.
    function updateDemoOptionVisibility(demoCard) {
        NDS.queryAll(demoCard, '[data-demo-requires-class], [data-demo-forbids-class]').forEach(function (btn) {
            var togglerData = parseTogglerData(btn);
            if (!togglerData || !togglerData[0]) return;
            var targetSelector = togglerData[0][1];
            var targets = findToggleTargets(demoCard, targetSelector);
            if (!targets.length) return;
            var target = targets[0];

            var requires = (btn.getAttribute('data-demo-requires-class') || '').trim().split(/\s+/).filter(Boolean);
            var forbids = (btn.getAttribute('data-demo-forbids-class') || '').trim().split(/\s+/).filter(Boolean);

            var show = true;
            for (var i = 0; i < requires.length && show; i++) {
                if (!target.classList.contains(requires[i])) show = false;
            }
            for (var j = 0; j < forbids.length && show; j++) {
                if (target.classList.contains(forbids[j])) show = false;
            }

            btn.hidden = !show;

            if (!show && NDS.State.has(btn, 'selected')) {
                resetHiddenToggle(btn, demoCard, togglerData);
            }
        });
    }

    // Reverse a toggle button's effect and clear its selected state. Mirrors
    // the class change into the code-example tab so the copy-paste markup
    // doesn't keep stale modifiers. For exclusive-group buttons inside a
    // dropmenu (e.g. a Size dropdown where the SM option becomes invalid
    // after a variant change), shift selection to the group's default
    // sibling (the one whose class value is empty).
    function resetHiddenToggle(btn, demoCard, togglerData) {
        togglerData.forEach(function (pair) {
            var classNames = pair[0];
            var targetSelector = pair[1];
            var operation = pair[3] || 'class';
            var action = pair[4];
            if (operation !== 'class' || !classNames || !targetSelector) return;

            var targets = findToggleTargets(demoCard, targetSelector);
            var classArray = classNames.trim().split(/\s+/).filter(Boolean);
            targets.forEach(function (target) {
                classArray.forEach(function (cls) {
                    if (action === 'remove') {
                        target.classList.add(cls);
                    } else {
                        target.classList.remove(cls);
                    }
                });
                updateCodeExampleForClasses(demoCard, target, classArray);
            });
        });

        NDS.State.remove(btn, 'selected');
        applyToggleStyles(btn, demoCard);

        var groupName = togglerData[0][2];
        if (!groupName || !btn.closest('.demo-toggle-menu')) return;

        var siblings = Array.from(NDS.queryAll(demoCard, '[data-toggler]')).filter(function (b) {
            return b !== btn && b.getAttribute('data-toggler').includes(groupName);
        });
        if (!siblings.length) return;

        var defaultSibling = siblings.find(function (b) {
            var d = parseTogglerData(b);
            var firstVal = d && d[0] && d[0][0];
            return firstVal === '';
        }) || siblings[0];

        selectDropmenuItem(defaultSibling, '.nds-dropmenu-item');
    }

    // Select a dropmenu item: deselect siblings, select button, update trigger label
    function selectDropmenuItem(button, siblingSelector) {
        var dropmenu = NDS.Dropmenu?.from(button);
        if (!dropmenu) return;
        var menu = NDS.Dropmenu.menuOf(dropmenu);
        (menu || dropmenu).querySelectorAll(siblingSelector).forEach(function(b) { NDS.State.remove(b, 'selected'); });
        NDS.State.add(button, 'selected');
        var triggerEl = dropmenu.querySelector('.nds-dropmenu-trigger');
        var triggerLabel = triggerEl?.querySelector('.nds-label');
        if (triggerLabel) {
            var prefix = triggerEl.getAttribute('data-label-prefix') || '';
            triggerLabel.textContent = prefix + button.querySelector('.nds-label').textContent;
        }
    }

    // Parse data-toggler JSON into normalized togglePairs array, or null if invalid.
    // data-toggler is a static markup contract (never rewritten at runtime), so the
    // result is cached per button element — a WeakMap needs no teardown and never
    // goes stale. The mutual-exclusion loop re-parses every sibling on each click.
    var _togglerCache = new WeakMap();
    function parseTogglerData(button) {
        if (_togglerCache.has(button)) return _togglerCache.get(button);
        var result = parseTogglerRaw(button);
        _togglerCache.set(button, result);
        return result;
    }

    function parseTogglerRaw(button) {
        var togglerData = button.getAttribute('data-toggler');
        if (!togglerData) return null;

        try {
            var parsed = JSON.parse(togglerData);
            var pairs = [];

            if (Array.isArray(parsed) && parsed.length >= 2) {
                if (typeof parsed[0] === 'string') {
                    pairs = [[parsed[0], parsed[1], parsed[2], parsed[3]]];
                } else {
                    pairs = parsed;
                }

                var ACTION_KEYWORDS = ['add', 'remove'];
                pairs = pairs.map(function(pair) {
                    var op = pair[3];
                    if (op && ACTION_KEYWORDS.includes(op)) {
                        return [pair[0], pair[1], pair[2], 'class', op];
                    }
                    return pair;
                });
            } else {
                return null;
            }

            return pairs;
        } catch (e) {
            return null;
        }
    }

    // Find all matching target elements within a demo card's .demo-container and .code-example
    function findToggleTargets(demoCard, targetSelector) {
        var targets = [];
        var searchContainers = [
            ...demoCard.querySelectorAll('.demo-container'),
            ...demoCard.querySelectorAll('.code-example')
        ];

        if (targetSelector.startsWith('#')) {
            var idSelector = targetSelector.substring(1);
            var idParts = idSelector.split(' ');
            var elementId = idParts[0];
            var subSelector = idParts.slice(1).join(' ');

            for (var i = 0; i < searchContainers.length; i++) {
                var elementById = searchContainers[i].querySelector('#' + elementId);
                if (elementById) {
                    if (subSelector) {
                        targets.push(...elementById.querySelectorAll(subSelector));
                    } else {
                        targets.push(elementById);
                    }
                }
            }
        } else if (targetSelector === '.demo-container') {
            targets.push(...demoCard.querySelectorAll('.demo-container'));
        } else if (targetSelector === '.code-example') {
            targets.push(...demoCard.querySelectorAll('.code-example'));
        } else {
            // A class token in a CSS selector (`.foo`) matches exactly elements
            // whose classList contains that token, so querySelectorAll covers the
            // single-class, compound, descendant, attribute and tag cases alike.
            for (var i = 0; i < searchContainers.length; i++) {
                targets.push(...searchContainers[i].querySelectorAll(targetSelector));
            }
        }

        return targets;
    }

    // Re-apply all active data-toggler operations in a demo card after DOM changes.
    // Handles mutual exclusion: reverses deselected siblings before applying selected ones.
    function reapplyActiveTogglers(demoCard) {
        var allTogglerBtns = NDS.queryAll(demoCard, '.demo-toggle-btn[data-toggler]');

        // Collect types that have an active (selected) button
        var activeTypes = {};
        allTogglerBtns.forEach(function(btn) {
            if (!NDS.State.has(btn, 'selected')) return;
            var pairs = parseTogglerData(btn);
            if (!pairs) return;
            pairs.forEach(function(pair) {
                var type = pair[2] || 'default';
                activeTypes[type] = true;
            });
        });

        // Pass 1: reverse deselected buttons whose type has an active selection
        allTogglerBtns.forEach(function(btn) {
            if (NDS.State.has(btn, 'selected')) return;
            var pairs = parseTogglerData(btn);
            if (!pairs) return;

            pairs.forEach(function(pair) {
                var value = pair[0], selector = pair[1], type = pair[2] || 'default', operation = pair[3], action = pair[4];
                if (!value || !selector || !activeTypes[type]) return;

                var op = operation || 'class';
                var targets = findToggleTargets(demoCard, selector);

                targets.forEach(function(el) {
                    if (op === 'attr') {
                        value.trim().split(/\s+/).forEach(function(attrPair) {
                            var attrName = attrPair.split('=')[0];
                            el.removeAttribute(attrName);
                            if (attrName === 'data-required') {
                                NDS.Forms.setState(el, 'required', false);
                            }
                        });
                    } else if (op === 'data-state') {
                        value.trim().split(/\s+/).forEach(function(state) {
                            if (!state) return;
                            NDS.Forms.setState(el, state, false);
                        });
                    } else if (op === 'prop') {
                        value.trim().split(/\s+/).forEach(function(prop) {
                            if (prop) el[prop] = false;
                        });
                    } else if (op !== 'content-prepend' && op !== 'content-append') {
                        // Class: reverse
                        value.trim().split(/\s+/).forEach(function(cls) {
                            if (!cls) return;
                            if (action === 'add' || !action) {
                                el.classList.remove(cls);
                            } else if (action === 'remove') {
                                el.classList.add(cls);
                            }
                        });
                    }
                });
            });
        });

        // Pass 2: apply selected buttons
        allTogglerBtns.forEach(function(btn) {
            if (!NDS.State.has(btn, 'selected')) return;
            var pairs = parseTogglerData(btn);
            if (!pairs) return;

            pairs.forEach(function(pair) {
                var value = pair[0], selector = pair[1], operation = pair[3], action = pair[4];
                if (!value || !selector) return;

                var op = operation || 'class';
                var targets = findToggleTargets(demoCard, selector);

                targets.forEach(function(el) {
                    if (op === 'attr') {
                        value.trim().split(/\s+/).forEach(function(attrPair) {
                            var parts = attrPair.split('=');
                            if (parts[1] !== undefined) {
                                el.setAttribute(parts[0], parts[1]);
                            } else {
                                el.setAttribute(parts[0], '');
                            }
                            if (parts[0] === 'data-required') {
                                NDS.Forms.setState(el, 'required', true);
                            }
                        });
                    } else if (op === 'data-state') {
                        value.trim().split(/\s+/).forEach(function(state) {
                            if (!state) return;
                            toggleDataState(el, state, false);
                            NDS.Forms.setState(el, state, true);
                        });
                    } else if (op === 'prop') {
                        value.trim().split(/\s+/).forEach(function(prop) {
                            if (prop) el[prop] = true;
                        });
                    } else if (op === 'style') {
                        handleStyleToggling(el, value);
                    } else if (op === 'content-prepend' || op === 'content-append') {
                        handleContentToggling(el, value, op);
                    } else {
                        var effectiveAction = action || 'add';
                        value.trim().split(/\s+/).forEach(function(cls) {
                            if (!cls) return;
                            if (effectiveAction === 'remove') {
                                el.classList.remove(cls);
                            } else {
                                el.classList.add(cls);
                            }
                        });
                    }
                });
            });

            if (btn.hasAttribute('data-toggle-style')) {
                applyToggleStyles(btn, demoCard);
            }
        });
    }

    function handleToggleClick(button) {
        // Check for new data-toggler format first
        let togglePairs = parseTogglerData(button);

        if (!togglePairs) {
            // Fallback to legacy data attributes for backward compatibility
            const toggleClass = button.getAttribute('data-toggle');
            const targetSelector = button.getAttribute('data-target') || button.getAttribute('data-default-target');

            if (!toggleClass) {
                return;
            }

            togglePairs = [[toggleClass, targetSelector]];
        }

        const demoCard = NDS.closest(button, '.nds-demo-card');
        if (!demoCard) {
            return;
        }

        // --- Mutual exclusion: deselect other buttons BEFORE applying new toggle ---
        const buttonTypes = [...new Set(togglePairs.map(([,, type]) => type || 'default'))];

        if (buttonTypes.length === 1) {
            const buttonType = buttonTypes[0];

            const allTogglers = NDS.queryAll(demoCard, '[data-toggler]');
            allTogglers.forEach(otherButton => {
                if (otherButton === button) return;

                const otherOps = parseTogglerData(otherButton);
                if (!otherOps) return;

                const otherTypes = [...new Set(otherOps.map(([,, type]) => type || 'default'))];

                // Deselect if other button is single-type, same type, and currently selected
                if (otherTypes.length === 1 && otherTypes[0] === buttonType && NDS.State.has(otherButton, 'selected')) {
                    NDS.State.remove(otherButton, 'selected');

                    // Reverse inline styles from data-toggle-style on the deselected button
                    applyToggleStyles(otherButton, demoCard);

                    // Reverse the changes for the deselected button
                    otherOps.forEach(([classNamesOrAttrs, targetSelector, , otherOperation, otherAction]) => {
                        if (!classNamesOrAttrs || !targetSelector) return;

                        const deselectionOperationType = otherOperation || 'class';
                        const deselectionTargetElements = findToggleTargets(demoCard, targetSelector);

                        if (deselectionTargetElements.length) {
                            deselectionTargetElements.forEach(targetElement => {
                                if (deselectionOperationType === 'attr') {
                                    handleAttributeToggling(targetElement, classNamesOrAttrs, demoCard);
                                } else if (deselectionOperationType === 'data-state') {
                                    handleDataStateToggling(targetElement, classNamesOrAttrs, demoCard);
                                } else if (deselectionOperationType === 'prop') {
                                    handlePropertyDeselection(targetElement, classNamesOrAttrs);
                                } else if (deselectionOperationType === 'style') {
                                    handleStyleDeselection(targetElement, classNamesOrAttrs);
                                } else if (deselectionOperationType === 'content-prepend' || deselectionOperationType === 'content-append') {
                                    handleContentToggling(targetElement, classNamesOrAttrs, deselectionOperationType);
                                    updateCodeExampleForContent(demoCard, targetElement, classNamesOrAttrs, deselectionOperationType);
                                } else {
                                    // Class deselection: reverse based on action
                                    const classArray = classNamesOrAttrs.trim().split(/\s+/);

                                    classArray.forEach(className => {
                                        if (!className) return;
                                        if (otherAction === 'add') {
                                            targetElement.classList.remove(className);
                                        } else if (otherAction === 'remove') {
                                            targetElement.classList.add(className);
                                        } else {
                                            if (targetElement.classList.contains(className)) {
                                                targetElement.classList.remove(className);
                                            }
                                        }
                                    });

                                    updateCodeExampleForClasses(demoCard, targetElement, classArray);
                                }
                            });
                        }
                    });
                }
            });
        }

        // --- Process each toggle operation ---
        // If button is already selected, we're deselecting → reverse explicit actions
        const isDeselecting = NDS.State.has(button, 'selected');

        // Prevent deselection for dropmenu items only when the group has
        // other members (Variant / Size / any exclusive one-of-many set).
        // Standalone dropmenu toggles — each in its own unique group — still
        // toggle off, so a multi-select "Modifiers" menu works as expected.
        if (isDeselecting && button.closest('.demo-toggle-menu')) {
            const groupName = togglePairs[0]?.[2] || 'default';
            if (groupName !== 'default') {
                const siblingsInGroup = Array.from(NDS.queryAll(demoCard, '[data-toggler]')).filter(btn =>
                    btn !== button && btn.getAttribute('data-toggler').includes(groupName)
                );
                if (siblingsInGroup.length > 0) return;
            }
        }

        // Prevent deselection for attr toggles when other buttons share the same group
        // (e.g., variant selectors must always have one active)
        const hasAttrOp = togglePairs.some(([,,,op]) => (op || 'class') === 'attr');
        const toggleType = togglePairs[0]?.[2] || 'default';
        if (isDeselecting && hasAttrOp && toggleType !== 'default') {
            const siblingsInGroup = Array.from(NDS.queryAll(demoCard, '[data-toggler]')).filter(btn =>
                btn !== button && btn.getAttribute('data-toggler').includes(toggleType)
            );
            if (siblingsInGroup.length > 0) return;
        }

        togglePairs.forEach(([classNamesOrAttrs, targetSelector, type, operation, action]) => {
            if (!targetSelector || (!classNamesOrAttrs && (!operation || operation === 'class'))) {
                return;
            }

            // Determine operation type: "class" (default), "attr", "content-prepend", or "content-append"
            const operationType = operation || 'class';

            const targetElements = findToggleTargets(demoCard, targetSelector);
            if (!targetElements.length) return;

            // Apply changes to ALL matching elements
            targetElements.forEach(targetElement => {
                if (operationType === 'attr') {
                    // Handle attribute toggling
                    handleAttributeToggling(targetElement, classNamesOrAttrs, demoCard);
                } else if (operationType === 'data-state') {
                    // Handle data-state attribute toggling (space-separated values like classes)
                    handleDataStateToggling(targetElement, classNamesOrAttrs, demoCard);
                } else if (operationType === 'prop') {
                    // Handle native JS property toggling (e.g. indeterminate)
                    handlePropertyToggling(targetElement, classNamesOrAttrs);
                } else if (operationType === 'style') {
                    // Handle inline style / CSS custom property toggling
                    if (isDeselecting) {
                        handleStyleDeselection(targetElement, classNamesOrAttrs);
                    } else {
                        handleStyleToggling(targetElement, classNamesOrAttrs);
                    }
                } else if (operationType === 'chart') {
                    // Handle chart option toggling via NDSChart API
                    handleChartToggling(targetElement, button, isDeselecting);
                } else if (operationType === 'content-prepend' || operationType === 'content-append') {
                    // Handle content toggling (append/prepend)
                    handleContentToggling(targetElement, classNamesOrAttrs, operationType);
                } else {
                    // Handle class toggling (default), add, or remove
                    const classArray = classNamesOrAttrs.trim().split(/\s+/);

                    // Reverse explicit actions when deselecting
                    const effectiveAction = isDeselecting
                        ? (action === 'add' ? 'remove' : action === 'remove' ? 'add' : action)
                        : action;

                    classArray.forEach(className => {
                        if (!className) return;
                        if (effectiveAction === 'add') {
                            targetElement.classList.add(className);
                        } else if (effectiveAction === 'remove') {
                            targetElement.classList.remove(className);
                        } else {
                            targetElement.classList.toggle(className);
                        }
                    });

                    // Special handling for nds-color class on alerts: update JS code example
                    if (classArray.includes('nds-color') && targetElement.classList.contains('nds-alert')) {
                        updateAlertColorInJsCode(targetElement, demoCard);
                    }

                    // Handle code updates for specific class changes
                    updateCodeExampleForClasses(demoCard, targetElement, classArray);
                }
            });
            
            // Update code example for content changes (only once per toggle action)
            if ((operationType === 'content-prepend' || operationType === 'content-append') && targetElements.length > 0) {
                updateCodeExampleForContent(demoCard, targetElements[0], classNamesOrAttrs, operationType);
            }
        });
        
        // Toggle the clicked button's selected state
        if (NDS.State.has(button, 'selected')) NDS.State.remove(button, 'selected');
        else NDS.State.add(button, 'selected');

        // Apply/remove inline styles from data-toggle-style when button is selected/deselected
        // Format: data-toggle-style=".target { --prop:val; width:fit-content; }"
        // When selected: sets each property on matching targets in .demo-container and .code-example
        // When deselected (mutual exclusion): removes those properties
        applyToggleStyles(button, demoCard);

        // Sync dropmenu trigger label when item is selected
        // Supports data-label-prefix on the trigger for prefixed labels (e.g., "Layout: Default")
        const dropmenu = NDS.Dropmenu?.from(button);
        if (dropmenu && NDS.State.has(button, 'selected')) {
            const trigger = dropmenu.querySelector('.nds-dropmenu-trigger');
            const triggerLabel = trigger?.querySelector('.nds-label');
            const itemLabel = button.querySelector('.nds-label');
            if (triggerLabel && itemLabel) {
                const prefix = trigger.getAttribute('data-label-prefix') || '';
                const customLabel = button.getAttribute('data-trigger-label');
                triggerLabel.textContent = prefix + (customLabel || itemLabel.textContent);
            }
        }

        // Update alert/toast code examples directly from toggle states
        if (buttonTypes.length === 1) {
            updateAlertCodeFromToggles(demoCard, buttonTypes[0]);
            updateFeedbackCodeFromToggles(demoCard, buttonTypes[0]);
        }

        // Update chart JS code example from current toggle states
        if (togglePairs.some(([,,, op]) => op === 'chart')) {
            updateChartCodeFromToggles(demoCard);
        }

        // Clean up and re-scan grid last-row borders after any toggle change.
        // Remove nds-last-row from divided lists before rescanning (esp. from grid view).
        togglePairs.forEach(([classNames, targetSelector, type]) => {
            if (type === 'dlLayout' || classNames.includes('nds-grid')) {
                const targets = demoCard.querySelectorAll(targetSelector);
                targets.forEach(target => {
                    const items = target.querySelectorAll('.nds-definition-item');
                    items.forEach(item => item.classList.remove('nds-last-row'));
                });
            }
        });
        NDS.gridLastRow.update(demoCard);

        // Rebuild code from live DOM for demo cards that opt in via data-code-rebuild
        if (demoCard.hasAttribute('data-code-rebuild')) {
            rebuildDemoCode(demoCard);
        }

        // Re-pair options with the post-toggle layout state (variant-specific
        // toggles hide/show as the active variant changes).
        updateDemoOptionVisibility(demoCard);
    }

    // Update alert/toast code examples directly from toggle button states
    function updateAlertCodeFromToggles(demoCard, toggleType) {
        // Only handle alert-related toggles
        if (!toggleType || !['alertVariant', 'toastVariant', 'toastPosition', 'toastColor', 'alertColor', 'alertStyle'].includes(toggleType)) {
            return;
        }

        const isToast = toggleType.startsWith('toast');

        // Get current state from selected toggle buttons
        const variantType = isToast ? 'toastVariant' : 'alertVariant';
        let variant = 'success';
        const variantToggle = NDS.querySelector(demoCard, `[data-toggler*="${variantType}"][data-state~="selected"]`);
        if (variantToggle) {
            try {
                const data = JSON.parse(variantToggle.getAttribute('data-toggler'));
                variant = data[0].split('=')[1] || 'success';
            } catch (e) {}
        }

        // Get position (toast only)
        let position = 'top';
        if (isToast) {
            const positionToggle = NDS.querySelector(demoCard, '[data-toggler*="toastPosition"][data-state~="selected"]');
            if (positionToggle) {
                position = 'bottom';
            }
        }

        // Get color and shadow
        const colorType = isToast ? 'toastColor' : 'alertColor';
        const colorToggle = NDS.querySelector(demoCard, `[data-toggler*="${colorType}"][data-state~="selected"]`);
        const hasColor = !!colorToggle;
        const shadowToggle = NDS.querySelector(demoCard, '[data-toggler*="alertStyle"][data-state~="selected"]');
        const hasShadow = !!shadowToggle;

        const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);

        const messages = isToast ? TOAST_MESSAGES : ALERT_MESSAGES;
        const alertEl = demoCard.querySelector('.nds-alert');
        const isInline = alertEl && alertEl.classList.contains('nds-inline');
        const titles = isInline ? INLINE_TITLES : null;
        const title = (titles && titles[variant]) || capitalizedVariant;

        // Update JS code example
        withCodeExample(demoCard, '.lang-javascript, .code-example code[class*="javascript"]', function(code) {
            // Update variant
            code = code.replace(/variant:\s*['"][^'"]+['"]/, `variant: '${variant}'`);
            // Update title
            code = code.replace(/title:\s*['"][^'"]+['"]/, `title: '${title}'`);
            // Update description
            if (messages[variant]) {
                code = code.replace(/description:\s*['"][^'"]+['"]/, `description: '${messages[variant]}'`);
            }
            // Update color and shadow
            code = code.replace(/color:\s*(true|false)/, `color: ${hasColor}`);
            code = code.replace(/shadow:\s*(true|false)/, `shadow: ${hasShadow}`);
            // Update position (toast only)
            if (isToast) {
                code = code.replace(/position:\s*['"][^'"]+['"]/, `position: '${position}'`);
            }
            return code;
        });

        // Update HTML code example
        withCodeExample(demoCard, '.lang-html, .code-example code[class*="html"]', function(code) {
            // Update data-status
            code = code.replace(/data-status="[^"]*"/, `data-status="${variant}"`);

            // Update title
            code = code.replace(/(<span class="nds-alert-title">)[^<]+(<\/span>)/, `$1${title}$2`);

            // Update description
            if (messages[variant]) {
                code = code.replace(/(<p class="nds-alert-description">)[^<]+(<\/p>)/, `$1${messages[variant]}$2`);
            }

            // Toggle nds-color class
            if (hasColor && !code.includes('nds-color')) {
                code = code.replace(/class="nds-alert nds-card/, 'class="nds-alert nds-card nds-color');
            } else if (!hasColor) {
                code = code.replace(/ nds-color/, '');
            }

            // Toggle nds-shadow class
            if (hasShadow && !code.includes('nds-shadow')) {
                code = code.replace(/class="nds-alert nds-card/, 'class="nds-alert nds-card nds-shadow');
            } else if (!hasShadow) {
                code = code.replace(/ nds-shadow/, '');
            }

            // Toast-specific updates
            if (isToast) {
                // Update data-position
                code = code.replace(/data-position="[^"]*"/, `data-position="${position}"`);
            }

            return code;
        });
    }

    // Apply/remove inline styles from data-toggle-style on toggler buttons
    // Format: data-toggle-style=".selector { --prop:val; width:fit-content }"
    // Applies styles to live DOM elements in .demo-container AND updates <code> text in code tabs
    // Reverses styles from deselected buttons in the same toggle group
    function applyToggleStyles(button, demoCard) {
        const styleRule = button.getAttribute('data-toggle-style');
        const isSelected = NDS.State.has(button, 'selected');

        if (!styleRule) return;

        const match = styleRule.match(/^([^\{]+)\{([^}]+)\}$/);
        if (!match) return;

        const selector = match[1].trim();
        const styleValue = match[2].trim().replace(/;$/, '');

        // 1. Apply to live DOM elements in .demo-container
        const demoContainers = demoCard.querySelectorAll('.demo-container');
        demoContainers.forEach(container => {
            container.querySelectorAll(selector).forEach(el => {
                if (isSelected) {
                    el.setAttribute('style', styleValue);
                } else {
                    el.removeAttribute('style');
                }
            });
        });

        // 2. Update <code> text content to add/remove style attribute
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;

        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let code = hiddenCopy.textContent;

        // Build a regex to find the element by its class in the code text
        // Extract the class name from the selector (e.g., ".nds-definition-list" -> "nds-definition-list")
        const classMatch = selector.match(/^\.([a-zA-Z0-9_-]+)/);
        if (!classMatch) return;
        const className = classMatch[1].replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

        // Match the opening tag that contains this class
        const tagRegex = new RegExp(`(<[a-z][a-z0-9]*\\s[^>]*class="[^"]*${className}[^"]*")( style="[^"]*")?([^>]*>)`, 'g');

        if (isSelected) {
            // Add or replace style attribute
            code = code.replace(tagRegex, (match, before, existingStyle, after) => {
                return before + ` style="${styleValue}"` + after;
            });
        } else {
            // Remove style attribute
            code = code.replace(tagRegex, (match, before, existingStyle, after) => {
                return before + after;
            });
        }

        updateCodeFromHiddenCopy(codeElement, code);
    }

    // Handle attribute toggling for target element
    function handleAttributeToggling(targetElement, attributeString, demoCard) {
        // Parse attribute string format: "attr1=value1 attr2=value2" or "attr1 attr2" (for boolean attributes)
        const attributePairs = attributeString.trim().split(/\s+/);

        attributePairs.forEach(attrPair => {
            if (!attrPair) return;

            const [attrName, attrValue] = attrPair.split('=');
            const isAdding = !targetElement.hasAttribute(attrName);

            if (attrValue !== undefined) {
                // Attribute with value: toggle between value and removing
                if (targetElement.getAttribute(attrName) === attrValue) {
                    targetElement.removeAttribute(attrName);
                } else {
                    targetElement.setAttribute(attrName, attrValue);
                }
            } else {
                // Boolean attribute: toggle presence
                if (targetElement.hasAttribute(attrName)) {
                    targetElement.removeAttribute(attrName);
                } else {
                    targetElement.setAttribute(attrName, '');
                }
            }

            // Propagate data-required to inputs (live demo)
            if (attrName === 'data-required') {
                NDS.Forms.setState(targetElement, 'required', isAdding);
            }

            // Special handling for data-status variant changes
            if (attrName === 'data-status' && targetElement.classList.contains('nds-alert')) {
                const currentStatus = NDS.Status.get(targetElement);
                if (currentStatus) {
                    updateAlertVariantContent(targetElement, currentStatus, demoCard);
                }
            }

            // Update feedback message text when status changes
            if (attrName === 'data-status' && targetElement.classList.contains('nds-feedback')) {
                const currentStatus = NDS.Status.get(targetElement);
                if (currentStatus) {
                    const msgEl = targetElement.querySelector('.nds-feedback-message');
                    if (msgEl && FEEDBACK_MESSAGES[currentStatus]) {
                        msgEl.textContent = FEEDBACK_MESSAGES[currentStatus];
                    }
                }
            }

            // Special handling for data-position changes
            if (attrName === 'data-position' && targetElement.classList.contains('nds-alert')) {
                updateAlertPositionInJsCode(targetElement, demoCard);
            }
        });

        // Update code example for attribute changes
        updateCodeExampleForAttributes(demoCard, targetElement, attributePairs);

        // Sync required on inputs in code when data-required toggles (skip groups)
        if (attributePairs.some(p => p.startsWith('data-required')) && !targetElement.classList.contains('nds-form-group')) {
            updateCodeInputAttribute(demoCard, 'required', targetElement.hasAttribute('data-required'));
        }
    }

    // Handle native JS property toggling (boolean properties like indeterminate)
    function handlePropertyToggling(targetElement, propsString) {
        var props = propsString.trim().split(/\s+/);

        props.forEach(function(prop) {
            if (!prop) return;
            var newValue = !targetElement[prop];
            targetElement[prop] = newValue;

            // Sync with forms system if available
            if (prop === 'indeterminate') {
                NDS.Forms.setIndeterminate(targetElement, newValue);
            }
        });
    }

    // Handle property deselection - explicitly sets properties to false
    function handlePropertyDeselection(targetElement, propsString) {
        var props = propsString.trim().split(/\s+/);

        props.forEach(function(prop) {
            if (!prop) return;
            targetElement[prop] = false;

            // Sync with forms system if available
            if (prop === 'indeterminate') {
                NDS.Forms.setIndeterminate(targetElement, false);
            }
        });
    }

    // Handle inline style / CSS custom property toggling
    // Format: "--prop:value" or "--prop:value otherProp:value" (space-separated pairs)
    function handleStyleToggling(targetElement, propsString) {
        propsString.trim().split(/\s+/).forEach(function(pair) {
            var colonIdx = pair.indexOf(':');
            if (colonIdx === -1) return;
            var prop = pair.substring(0, colonIdx).trim();
            var value = pair.substring(colonIdx + 1).trim();
            targetElement.style.setProperty(prop, value);
        });
    }

    // Handle style deselection - removes previously set properties
    function handleStyleDeselection(targetElement, propsString) {
        propsString.trim().split(/\s+/).forEach(function(pair) {
            var colonIdx = pair.indexOf(':');
            if (colonIdx === -1) return;
            var prop = pair.substring(0, colonIdx).trim();
            targetElement.style.removeProperty(prop);
        });
    }

    // Handle data-state attribute toggling (space-separated values)
    function handleDataStateToggling(targetElement, statesString, demoCard) {
        const states = statesString.trim().split(/\s+/);

        states.forEach(state => {
            if (!state) return;
            const isAdding = !NDS.State.has(targetElement, state);

            // Live demo: Forms API handles data-state + input propagation
            NDS.Forms.setState(targetElement, state, isAdding);

            // Sync code example text
            if (demoCard) {
                updateCodeExampleForDataState(demoCard, targetElement, state, isAdding);
            }
        });
    }

    function toggleDataState(el, state, add) {
        if (add) NDS.State.add(el, state);
        else NDS.State.remove(el, state);
    }

    function updateCodeExampleForDataState(demoCard, changedElement, state, isAdding) {
        var baseClass = Array.from(changedElement.classList)[0];
        if (!baseClass) return;
        var escaped = baseClass.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
        var liveState = NDS.State.get(changedElement);

        withCodeExample(demoCard, '', function(code) {
            var tagRegex = new RegExp('(<[^>]*class="(?:[^"]*\\s)?' + escaped + '(?:\\s[^"]*|)"[^>]*?)(/?>)', 'g');
            return code.replace(tagRegex, function(match, before, close) {
                var tag = before.replace(/\s*data-state="[^"]*"/, '');
                if (liveState) tag += ' data-state="' + liveState + '"';
                return tag + close;
            });
        });

        if (state === 'disabled') updateCodeInputAttribute(demoCard, 'disabled', isAdding);
        if (state === 'readonly') updateCodeInputAttribute(demoCard, 'readonly', isAdding);
    }

    function updateCodeInputAttribute(demoCard, attrName, add) {
        var escapedAttr = attrName.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
        withCodeExample(demoCard, '', function(code) {
            return code.replace(/(<(?:input|textarea|select)\b[^>]*?)(\/?>)/g, function(match, before, close) {
                var tag = before.replace(new RegExp('\\s*' + escapedAttr + '(?:="[^"]*")?'), '');
                if (add) tag += ' ' + attrName;
                return tag + close;
            });
        });
    }

    // Update feedback code examples (JS + HTML) from toggle button states
    function updateFeedbackCodeFromToggles(demoCard, toggleType) {
        if (!toggleType || !['feedbackStatus', 'feedbackMsgStatus', 'feedbackSize', 'feedbackMsgSize', 'feedbackStyle', 'feedbackRing', 'feedbackMsgStyle'].includes(toggleType)) {
            return;
        }

        const feedbackEl = demoCard.querySelector('.demo-container .nds-feedback');
        if (!feedbackEl) return;

        // Read current state from the live element
        const status = NDS.Status.get(feedbackEl) || 'info';

        let size = 'sm';
        if (feedbackEl.classList.contains('nds-lg')) size = 'lg';
        else if (feedbackEl.classList.contains('nds-md')) size = 'md';

        let style = '';
        if (feedbackEl.classList.contains('nds-outline')) style = 'outline';
        else if (feedbackEl.classList.contains('nds-ring')) style = 'ring';

        const msgEl = feedbackEl.querySelector('.nds-feedback-message');
        const hasMessage = !!msgEl;
        const message = hasMessage ? (FEEDBACK_MESSAGES[status] || msgEl.textContent) : null;

        // Update JS code example
        withCodeExample(demoCard, '.lang-javascript, .code-example code[class*="javascript"]', function(code) {
            code = code.replace(/status:\s*['"][^'"]+['"]/, `status: '${status}'`);
            code = code.replace(/size:\s*['"][^'"]+['"]/, `size: '${size}'`);
            if (hasMessage && message) {
                code = code.replace(/message:\s*['"][^'"]+['"]/, `message: '${message}'`);
            }
            // Update style — handle both existing style line and missing style line
            if (code.match(/style:\s*['"][^'"]*['"]/)) {
                code = code.replace(/style:\s*['"][^'"]*['"]/, `style: '${style}'`);
            }
            return code;
        });

        // Update HTML code example
        withCodeExample(demoCard, '.lang-html, .code-example code[class*="html"]', function(code) {
            // Update data-status
            code = code.replace(/data-status="[^"]*"/, `data-status="${status}"`);

            // Update message text
            if (hasMessage && message) {
                code = code.replace(/(nds-feedback-message">)[^<]+(<)/, `$1${message}$2`);
            }

            // Update classes on .nds-feedback element
            code = code.replace(
                /(<span class="nds-feedback)([^"]*)"/,
                function(match, prefix, currentClasses) {
                    let classes = currentClasses
                        .replace(/\s*nds-ring/g, '')
                        .replace(/\s*nds-outline/g, '')
                        .replace(/\s*nds-sm/g, '')
                        .replace(/\s*nds-md/g, '')
                        .replace(/\s*nds-lg/g, '');
                    if (style) classes += ' nds-' + style;
                    classes += ' nds-' + size;
                    return prefix + classes + '"';
                }
            );

            return code;
        });
    }

    // Update alert content and code examples when variant changes
    function updateAlertVariantContent(alertElement, variant, demoCard) {
        const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);

        // Determine if this is a toast or regular alert
        const isToast = alertElement.classList.contains('nds-toast');
        const isInline = alertElement.classList.contains('nds-inline');
        const messages = isToast ? TOAST_MESSAGES : ALERT_MESSAGES;
        const titles = isInline ? INLINE_TITLES : null;
        const title = (titles && titles[variant]) || capitalizedVariant;

        // Update title text
        const titleElement = alertElement.querySelector('.nds-alert-title');
        if (titleElement) {
            titleElement.textContent = title;
        }

        // Update description text
        const descElement = alertElement.querySelector('.nds-alert-description');
        if (descElement && messages[variant]) {
            descElement.textContent = messages[variant];
        }

        // Update HTML code example
        const htmlCodeElement = demoCard.querySelector('.code-example code.lang-html, .code-example code[class*="html"]');
        if (htmlCodeElement) {
            const hiddenCopy = getHiddenCodeCopy(htmlCodeElement);
            if (hiddenCopy) {
                let updatedCode = hiddenCopy.textContent;
                // Update title
                updatedCode = updatedCode.replace(
                    /(<span class="nds-alert-title">)[^<]+(<\/span>)/,
                    `$1${title}$2`
                );
                // Update description
                if (messages[variant]) {
                    updatedCode = updatedCode.replace(
                        /(<p class="nds-alert-description">)[^<]+(<\/p>)/,
                        `$1${messages[variant]}$2`
                    );
                }
                updateCodeFromHiddenCopy(htmlCodeElement, updatedCode);
            }
        }

        // Update JS code example with all current options
        updateAlertJsCodeExample(alertElement, demoCard, variant, title, messages[variant]);
    }

    // Update JS code example with all current alert options
    function updateAlertJsCodeExample(alertElement, demoCard, variant, title, description) {
        var position = alertElement.getAttribute('data-position') || 'top';
        var hasColor = alertElement.classList.contains('nds-color');
        withCodeExample(demoCard, JS_CODE_SELECTOR, function(code) {
            code = code.replace(/variant:\s*['"][^'"]+['"]/, "variant: '" + variant + "'");
            code = code.replace(/title:\s*['"][^'"]+['"]/, "title: '" + title + "'");
            if (description) code = code.replace(/description:\s*['"][^'"]+['"]/, "description: '" + description + "'");
            code = code.replace(/position:\s*['"][^'"]+['"]/, "position: '" + position + "'");
            code = code.replace(/color:\s*(true|false)/, 'color: ' + hasColor);
            return code;
        });
    }

    // Update a code example by selector: get hidden copy, apply replaceFn, write back
    function withCodeExample(demoCard, langSelector, replaceFn) {
        var el = demoCard.querySelector('.code-example code' + langSelector);
        if (!el) return;
        var copy = getHiddenCodeCopy(el);
        if (!copy) return;
        updateCodeFromHiddenCopy(el, replaceFn(copy.textContent));
    }

    var JS_CODE_SELECTOR = '.lang-javascript, [class*="javascript"]';

    function updateAlertPositionInJsCode(alertElement, demoCard) {
        var position = alertElement.getAttribute('data-position') || 'top';
        withCodeExample(demoCard, JS_CODE_SELECTOR, function(code) {
            return code.replace(/position:\s*['"][^'"]+['"]/, "position: '" + position + "'");
        });
    }

    function updateAlertColorInJsCode(alertElement, demoCard) {
        var hasColor = alertElement.classList.contains('nds-color');
        withCodeExample(demoCard, JS_CODE_SELECTOR, function(code) {
            return code.replace(/color:\s*(true|false)/, 'color: ' + hasColor);
        });
    }

    // Handle chart option toggling — calls NDSChart update() API
    function handleChartToggling(targetElement, button, isDeselecting) {
        if (!targetElement || !targetElement.ndsChart) return;
        var optsAttr = isDeselecting ? button.getAttribute('data-chart-opt-off') : button.getAttribute('data-chart-opt');
        if (!optsAttr) return;
        try {
            var opts = JSON.parse(optsAttr);
            targetElement.ndsChart.update(opts);
        } catch (e) { /* invalid JSON */ }
    }

    // Update chart JS code example based on current toggle button states
    function updateChartCodeFromToggles(demoCard) {
        var jsCodeElement = demoCard.querySelector('.code-example code.lang-js');
        if (!jsCodeElement) return;

        var hiddenCopy = getHiddenCodeCopy(jsCodeElement);
        if (!hiddenCopy) return;

        var updatedCode = hiddenCopy.textContent;

        // Read all chart toggle buttons and apply their current state to the code
        NDS.queryAll(demoCard, '[data-toggler*="chart"]').forEach(function (btn) {
            var isOn = NDS.State.has(btn, 'selected');
            var codeReplace = btn.getAttribute('data-code-on');
            var codeReplaceOff = btn.getAttribute('data-code-off');
            if (!codeReplace || !codeReplaceOff) return;

            // Replace the off pattern with on pattern or vice versa
            if (isOn) {
                updatedCode = updatedCode.split(codeReplaceOff).join(codeReplace);
            } else {
                updatedCode = updatedCode.split(codeReplace).join(codeReplaceOff);
            }
        });

        updateCodeFromHiddenCopy(jsCodeElement, updatedCode);
    }

    // Handle content toggling (append/prepend) for target element
    function handleContentToggling(targetElement, contentHTML, operationType) {
        // XSS-safe: contentHTML is page-authored data-toggler markup (static), not user input.
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentHTML;
        const contentToToggle = tempDiv.firstElementChild || tempDiv.firstChild;
        
        if (!contentToToggle) {
            return;
        }
        
        // Check if content already exists in the target element
        let existingContent = null;
        
        // Simple content detection - look for elements with the same tag and classes
        if (contentToToggle.tagName && contentToToggle.className) {
            const selector = `${contentToToggle.tagName.toLowerCase()}.${contentToToggle.className.split(' ').join('.')}`;
            existingContent = targetElement.querySelector(selector);
        } else if (contentToToggle.tagName) {
            existingContent = targetElement.querySelector(contentToToggle.tagName.toLowerCase());
        }
        
        if (existingContent) {
            // Remove the content
            existingContent.remove();
        } else {
            // Add the content
            const newElement = contentToToggle.cloneNode(true);
            
            if (operationType === 'content-prepend') {
                targetElement.insertBefore(newElement, targetElement.firstChild);
            } else {
                // Default to append
                targetElement.appendChild(newElement);
            }
        }
    }

    // Update code example for attribute changes
    function updateCodeExampleForAttributes(demoCard, changedElement, changedAttributes) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        if (!changedElement || !changedAttributes) return;
        
        // Get content from hidden copy
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let updatedCode = hiddenCopy.textContent;
        
        // Get the tag name and first class to identify the element in the code
        const tagName = changedElement.tagName.toLowerCase();
        const firstClass = Array.from(changedElement.classList)[0];
        
        if (!firstClass) return;

        // Find the element in the code by tag and exact class match
        // Class must be after " or space, and followed by space or "
        const escapedClass = firstClass.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
        const elementRegex = new RegExp(
            `<${tagName}([^>]*class="(?:[^"]*\\s)?${escapedClass}(?:\\s[^"]*)?"[^>]*?)(\\s*\\/?)>`,
            'gi'
        );
        
        updatedCode = updatedCode.replace(elementRegex, (match, attributes, selfClosing) => {
            let elementAttributes = attributes;
            
            // For each changed attribute, update it in the code
            changedAttributes.forEach(attrPair => {
                const [attrName, attrValue] = attrPair.split('=');
                const currentValue = changedElement.getAttribute(attrName);
                
                // Remove existing attribute from the match
                const attrRegex = new RegExp(`\\s+${attrName.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}(?:="[^"]*")?`, 'gi');
                elementAttributes = elementAttributes.replace(attrRegex, '');
                
                // Add attribute if it exists on the element
                if (currentValue !== null) {
                    if (currentValue === '') {
                        // Boolean attribute
                        elementAttributes += ` ${attrName}`;
                    } else {
                        // Attribute with value
                        elementAttributes += ` ${attrName}="${currentValue}"`;
                    }
                }
            });
            
            return `<${tagName}${elementAttributes}${selfClosing}>`;
        });
        
        // Update using the hidden copy system
        updateCodeFromHiddenCopy(codeElement, updatedCode);
    }


    // Update code example for specific class changes only
    function updateCodeExampleForClasses(demoCard, changedElement, changedClasses) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        if (!changedElement || !changedClasses) return;
        
        // Get content from hidden copy
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let updatedCode = hiddenCopy.textContent;
        
        // Get the base class name (first class) of the changed element to identify it in the code
        const baseClassName = Array.from(changedElement.classList)[0];
        if (!baseClassName) return;
        
        // Find the class attribute for this element
        const classRegex = new RegExp(`class="([^"]*\\s+)?${baseClassName.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")}(\\s[^"]*)?"`, 'g');
        
        updatedCode = updatedCode.replace(classRegex, (match) => {
            const classMatch = match.match(/class="([^"]*)"/);
            if (!classMatch) return match;
            
            let existingClasses = classMatch[1].split(/\s+/).filter(Boolean);
            const classesInMatch = [...existingClasses];
            
            // Only update if this element contains the base class
            if (!classesInMatch.includes(baseClassName)) return match;
            
            // For each changed class, toggle it in the code
            changedClasses.forEach(className => {
                if (changedElement.classList.contains(className)) {
                    // Class is present on element, add it to code if not already there
                    if (!existingClasses.includes(className)) {
                        existingClasses.push(className);
                    }
                } else {
                    // Class is not on element, remove it from code
                    existingClasses = existingClasses.filter(cls => cls !== className);
                }
            });
            
            return `class="${existingClasses.join(' ')}"`;
        });
        
        // Update using the hidden copy system
        updateCodeFromHiddenCopy(codeElement, updatedCode);
    }

    // Update code example for content changes - simple approach
    function updateCodeExampleForContent(demoCard, targetElement, contentHTML, operationType) {
        const codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;
        
        // Get content from hidden copy
        const hiddenCopy = getHiddenCodeCopy(codeElement);
        if (!hiddenCopy) return;
        let updatedCode = hiddenCopy.textContent;
        
        // Get the target element info to find it in the code
        const tagName = targetElement.tagName.toLowerCase();
        const firstClass = Array.from(targetElement.classList)[0];
        if (!firstClass) return;
        
        // XSS-safe: contentHTML is page-authored data-toggler markup (static), not user input.
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = contentHTML;
        const contentToToggle = tempDiv.firstElementChild || tempDiv.firstChild;
        if (!contentToToggle) return;
        
        // Check if content exists in target element BEFORE the DOM change to determine the action
        // We need to check the code content, not the current DOM state
        let hasContent = false;
        if (contentToToggle.tagName && contentToToggle.className) {
            // Check for any class from the content to toggle
            const contentClasses = contentToToggle.className.split(' ');
            hasContent = contentClasses.some(cls => updatedCode.includes(cls));
        } else if (contentToToggle.tagName) {
            // If no classes, check for the tag name
            hasContent = updatedCode.includes(`<${contentToToggle.tagName.toLowerCase()}`);
        }
        
        // Find the element in the raw HTML and update it
        const escapedFirstClass = firstClass.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
        const elementRegex = new RegExp(`(<${tagName}[^>]*class="[^"]*\\b${escapedFirstClass}\\b[^"]*"[^>]*>)([\\s\\S]*?)(<\\/${tagName}>)`, 'gi');
        
        updatedCode = updatedCode.replace(elementRegex, (match, openTag, content, closeTag) => {
            let updatedContent = content;
            
            if (hasContent) {
                // Remove the content from the code
                if (contentToToggle.tagName && contentToToggle.className) {
                    // Remove by any of the classes
                    const contentClasses = contentToToggle.className.split(' ');
                    for (const cls of contentClasses) {
                        if (cls) {
                            const contentRegex = new RegExp(`\\s*<${contentToToggle.tagName.toLowerCase()}[^>]*class="[^"]*${cls}[^"]*"[^>]*>[\\s\\S]*?<\\/${contentToToggle.tagName.toLowerCase()}>`, 'gi');
                            updatedContent = updatedContent.replace(contentRegex, '');
                        }
                    }
                } else if (contentToToggle.tagName) {
                    // Remove by tag name if no classes
                    const contentRegex = new RegExp(`\\s*<${contentToToggle.tagName.toLowerCase()}[^>]*>[\\s\\S]*?<\\/${contentToToggle.tagName.toLowerCase()}>`, 'gi');
                    updatedContent = updatedContent.replace(contentRegex, '');
                }
            } else {
                // Add the content to the code
                const contentHTML = contentToToggle.outerHTML;
                
                // Detect the existing indentation from the content
                const lines = updatedContent.split('\n');
                let indent = '';
                for (let line of lines) {
                    if (line.trim()) {
                        const match = line.match(/^(\s*)/);
                        if (match) {
                            indent = match[1];
                            break;
                        }
                    }
                }
                
                if (operationType === 'content-prepend') {
                    // For prepend, add newline first, then indented content
                    updatedContent = '\n' + indent + contentHTML + updatedContent;
                } else {
                    updatedContent = updatedContent + '\n' + indent + contentHTML;
                }
            }
            
            return openTag + updatedContent + closeTag;
        });
        
        // Update using the hidden copy system
        updateCodeFromHiddenCopy(codeElement, updatedCode);
    }

    // Fake file upload for demonstration purposes
    function initializeFakeFileUpload(signal) {
        // Set up fake upload URLs for demo containers
        document.querySelectorAll('.nds-file-upload').forEach(container => {
            if (!container.dataset.uploadUrl) {
                container.dataset.uploadUrl = '/demo/upload';
                container.dataset.autoUpload = 'true';
            }
        });

        // Listen for beforeUpload events to intercept and simulate uploads
        document.addEventListener('nds:upload:beforeUpload', function(e) {
            e.preventDefault();
            startUploadSimulation(e.target.closest('.nds-file-upload'), e.detail.fileData);
        }, { signal });
    }

    // Simple upload simulation using UI API
    function startUploadSimulation(uploadContainer, fileData) {
        // Get the file upload API instance
        const api = NDS.Upload.getInstance(uploadContainer);
        if (!api) {
            return;
        }

        // Calculate upload duration based on file size
        const file = fileData.file;
        const fileSizeKB = file.size / 1024;
        const baseSpeedKBps = 100; // 100 KB/s for slow connection
        const baseDuration = (fileSizeKB / baseSpeedKBps) * 1000;
        const randomFactor = 0.5 + Math.random(); // ±50% variation
        const uploadDuration = Math.max(3000, Math.min(60000, baseDuration * randomFactor));
        
        
        // Update existing file status to uploading and start progress simulation
        api.setFileStatus(fileData.id, 'uploading', { progress: 0 });
        simulateProgress(api, fileData.id, uploadDuration);
    }
    
    // Clean progress simulation using UI API
    function simulateProgress(api, fileId, duration) {
        let progress = 0;
        const interval = 150; // Update every 150ms
        const progressStep = 100 / (duration / interval);
        
        const progressTimer = setInterval(() => {
            // Simulate network variations
            const networkCondition = Math.random();
            let speedMultiplier = 1;
            
            if (networkCondition < 0.2) speedMultiplier = 0.05; // 20% chance of stall
            else if (networkCondition < 0.5) speedMultiplier = 0.2; // 30% chance of slow
            else if (networkCondition < 0.8) speedMultiplier = 0.6; // 30% chance of medium
            // else normal speed (20% chance)
            
            progress += (progressStep * speedMultiplier) + (Math.random() * 1);
            progress = Math.min(progress, 100);
            
            // Update progress using API
            api.setFileProgress(fileId, progress);
            
            // Complete when 100%
            if (progress >= 100) {
                clearInterval(progressTimer);
                
                // Set processing status first
                api.setFileStatus(fileId, 'processing');
                
                // 90% success rate after processing delay
                setTimeout(() => {
                    const shouldSucceed = Math.random() > 0.1;
                    if (shouldSucceed) {
                        api.setFileStatus(fileId, 'complete');
                    } else {
                        api.setFileStatus(fileId, 'error', { error: 'Demo upload failed' });
                    }
                }, 2000); // 2 second processing delay
            }
        }, interval);
    }

    // Simulated server search for autocomplete demo
    // Pre-fetches services-autocomplete.json, then intercepts subsequent fetches to filter by query
    function initializeAutocompleteDemoData() {
        // Find autocomplete demo containers
        var demoContainer = document.querySelector('.nds-form-container[data-url*="services-autocomplete"]');
        if (!demoContainer) return;

        var dataUrl = demoContainer.getAttribute('data-url');
        var nameField = demoContainer.getAttribute('data-name') || 'Title';
        var queryParam = demoContainer.getAttribute('data-query-param') || 'q';
        var demoData = null;

        // Pre-fetch the full dataset
        fetch(dataUrl).then(function(res) { return res.json(); }).then(function(data) {
            demoData = Array.isArray(data) ? data : [];
        });

        // Intercept subsequent fetches to simulate server-side search
        var originalFetch = window.fetch;
        window.fetch = function(url) {
            if (demoData && typeof url === 'string' && url.includes('services-autocomplete')) {
                var queryMatch = url.match(new RegExp('[?&]' + queryParam + '=([^&]*)'));
                var query = queryMatch ? decodeURIComponent(queryMatch[1]) : '';

                var filtered = query
                    ? demoData.filter(function(item) {
                        return String(item[nameField] || '').toLowerCase().includes(query.toLowerCase());
                    })
                    : demoData;

                return new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve(new Response(JSON.stringify(filtered), {
                            status: 200,
                            headers: { 'Content-Type': 'application/json' }
                        }));
                    }, 150 + Math.random() * 350);
                });
            }
            return originalFetch.apply(this, arguments);
        };
    }

    // Card mode dropmenu — mutually exclusive card modes (default, expandable, selectable)
    function cardModeToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const mode = btn.dataset.cardMode;
        let card = demoCard.querySelector('.demo-container .nds-card');
        if (!card) return;

        selectDropmenuItem(btn, '[data-card-mode]');

        // Reset all mode sections
        card.querySelector('.nds-card-checkbox')?.setAttribute('hidden', '');
        card.querySelector('.nds-card-actions')?.setAttribute('hidden', '');
        // Clean expandable state
        if (card.ndsExpandable) {
            card.ndsExpandable.destroy();
            delete card.ndsExpandable;
        }
        card.classList.remove('nds-expandable');
        NDS.State.remove(card, 'expandable', 'expanded');
        card.removeAttribute('data-nds-expandable-initialized');
        const cardContent = card.querySelector('.nds-card-content');
        if (cardContent) cardContent.classList.remove('nds-expandable-content');

        // Ensure header visibility matches state
        const headerMode = NDS.querySelector(demoCard, '[data-card-header][data-state~="selected"]')?.dataset.cardHeader || 'icon';
        const cardHeader = card.querySelector('.nds-card-header');
        if (headerMode === 'none' && mode !== 'selectable') {
            cardHeader?.setAttribute('hidden', '');
        } else {
            cardHeader?.removeAttribute('hidden');
        }

        // Swap description for expandable mode
        const desc = card.querySelector('.nds-card-description');
        if (desc) {
            if (!desc.dataset.shortDesc) desc.dataset.shortDesc = desc.textContent;
            desc.textContent = mode === 'expandable'
                ? 'This card demonstrates the flexible structure of the NDS card component. It supports featured icons, images, tags, ratings, action buttons, and selection checkboxes. Toggle the options above to preview different configurations. The expandable mode collapses long content behind a show-more button, keeping layouts compact while preserving access to the full content when needed.'
                : desc.dataset.shortDesc;
        }

        // Apply mode
        if (mode === 'selectable') {
            card.querySelector('.nds-card-checkbox')?.removeAttribute('hidden');
        } else if (mode === 'actions') {
            card.querySelector('.nds-card-actions')?.removeAttribute('hidden');
        } else if (mode === 'expandable') {
            // Reset state to default if interactive/disabled
            if (card.tagName === 'BUTTON') {
                const defaultStateBtn = NDS.querySelector(demoCard, '[data-card-state="default"]');
                if (defaultStateBtn) defaultStateBtn.click();
                card = demoCard.querySelector('.demo-container .nds-card');
                if (!card) return;
            }

            // Remove truncate if active (conflicts with expandable)
            card.querySelectorAll('.nds-truncate').forEach(el => el.classList.remove('nds-truncate'));
            const truncateBtn = NDS.querySelector(demoCard, '[data-toggler*="cardTruncate"]');
            if (truncateBtn) NDS.State.remove(truncateBtn, 'selected');

            card.classList.add('nds-expandable');
            NDS.State.add(card, 'expandable');
            if (cardContent) {
                cardContent.classList.add('nds-expandable-content');
                cardContent.style.setProperty('--max-height', '200px');
            }
        }

        NDS.Expandable.reinit();
        rebuildCardCode(demoCard);
    }

    // Card state dropmenu — default/interactive/disabled/interactive-disabled
    function cardStateToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const state = btn.dataset.cardState;
        selectDropmenuItem(btn, '[data-card-state]');

        let card = demoCard.querySelector('.demo-container .nds-card');
        if (!card) return;

        // Reset mode to default if expandable is active
        if (state !== 'default' && NDS.State.has(card, 'expandable')) {
            const defaultModeBtn = NDS.querySelector(demoCard, '[data-card-mode="default"]');
            if (defaultModeBtn) defaultModeBtn.click();
            card = demoCard.querySelector('.demo-container .nds-card');
            if (!card) return;
        }

        const needsButton = state !== 'default';
        const isButton = card.tagName === 'BUTTON';

        // Swap element if needed
        if (needsButton && !isButton) {
            const newEl = document.createElement('button');
            for (const attr of card.attributes) newEl.setAttribute(attr.name, attr.value);
            newEl.innerHTML = card.innerHTML;
            card.parentNode.replaceChild(newEl, card);
            card = newEl;
        } else if (!needsButton && isButton) {
            const newEl = document.createElement('div');
            for (const attr of card.attributes) newEl.setAttribute(attr.name, attr.value);
            newEl.innerHTML = card.innerHTML;
            card.parentNode.replaceChild(newEl, card);
            card = newEl;
        }

        // Toggle disabled
        if (state === 'disabled') {
            card.setAttribute('disabled', '');
            // Disable form controls via data-state (forms.js two-way binding)
            card.querySelectorAll('.nds-form-container').forEach(el => {
                NDS.State.add(el, 'disabled');
            });
            card.querySelectorAll('input, button, a').forEach(el => el.setAttribute('disabled', ''));
        } else {
            card.removeAttribute('disabled');
            card.querySelectorAll('.nds-form-container').forEach(el => {
                NDS.State.remove(el, 'disabled');
            });
            card.querySelectorAll('input, button, a').forEach(el => el.removeAttribute('disabled'));
        }

        rebuildCardCode(demoCard);
    }

    // Card header dropmenu — icon/image/none
    function cardHeaderToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const headerType = btn.dataset.cardHeader;
        selectDropmenuItem(btn, '[data-card-header]');

        // Hide both, then show selected
        const iconSection = demoCard.querySelector('.demo-container .nds-card-featured-icon');
        const imageSection = demoCard.querySelector('.demo-container .nds-card-image:not(.nds-avatar)');
        const avatarSection = demoCard.querySelector('.demo-container .nds-avatar');
        const cardHeader = demoCard.querySelector('.demo-container .nds-card-header');
        if (iconSection) iconSection.setAttribute('hidden', '');
        if (imageSection) imageSection.setAttribute('hidden', '');
        if (avatarSection) avatarSection.setAttribute('hidden', '');

        const checkboxVisible = demoCard.querySelector('.demo-container .nds-card-checkbox:not([hidden])');
        if (headerType === 'none' && !checkboxVisible) {
            if (cardHeader) cardHeader.setAttribute('hidden', '');
        } else {
            if (cardHeader) cardHeader.removeAttribute('hidden');
            if (headerType === 'icon' && iconSection) iconSection.removeAttribute('hidden');
            if (headerType === 'avatar' && avatarSection) avatarSection.removeAttribute('hidden');
            if (headerType === 'image' && imageSection) imageSection.removeAttribute('hidden');
        }

        rebuildCardCode(demoCard);
    }

    // Card color dropmenu — mutually exclusive color variants
    var CARD_COLOR_CLASSES = ['nds-neutral', 'nds-green', 'nds-yellow', 'nds-red', 'nds-blue', 'nds-oncolor'];
    function cardColorToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const color = btn.dataset.cardColor;
        selectDropmenuItem(btn, '[data-card-color]');

        const container = demoCard.querySelector('.demo-container');
        const cards = demoCard.querySelectorAll('.demo-container .nds-card');
        cards.forEach(card => {
            card.classList.remove(...CARD_COLOR_CLASSES);
            if (color !== 'none') card.classList.add('nds-' + color);
        });

        // Toggle dark background for oncolor variant
        if (container) container.classList.toggle('dark-bg', color === 'oncolor');

        rebuildCardCode(demoCard);
    }

    function cardLayoutToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const layout = btn.dataset.cardLayout;
        selectDropmenuItem(btn, '[data-card-layout]');

        const card = demoCard.querySelector('.demo-container .nds-card');
        if (!card) return;

        card.classList.remove('nds-rowView', 'nds-center');
        if (layout === 'rowView') card.classList.add('nds-rowView');
        else if (layout === 'center') card.classList.add('nds-center');

        rebuildCardCode(demoCard);
    }

    // Stepper Fallback dropmenu: picks the always-on variant that acts as the
    // fallback when no breakpoint override matches. data-stepper-fallback on
    // each dropmenu item carries the variant name (horizontal|vertical|radial).
    // Routes through the public NDS.Stepper.setFallback(id, variant) rather than
    // reaching into the instance, so the authored fallback, the always-on class,
    // and apply()'s live toggle stay coherent.
    function stepperFallbackToggle(btn) {
        const variant = btn.dataset.stepperFallback;
        if (!variant) return;

        const targetId = btn.dataset.stepperTarget;
        const stepper = targetId && document.getElementById(targetId);
        if (!stepper) return;

        selectDropmenuItem(btn, '[data-stepper-fallback]');
        NDS.Stepper.setFallback(targetId, variant);

        // Pass the real always-on variant classes so the code-tab update
        // checks each and strips those no longer on the element. Horizontal
        // has no class (it's the default), so it's intentionally absent.
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (demoCard) updateCodeExampleForClasses(demoCard, stepper, ['nds-vertical', 'nds-radial']);
    }

    // Stepper responsive auto-simplify: minimizes the authored class count
    // while preserving the effective variant at every breakpoint. The fallback
    // (read/written via NDS.Stepper.getFallback / setFallback) absorbs whichever
    // variant appears most often across BPs, so matching BP classes can be
    // dropped. Remaining BP overrides keep only the ones that differ from the
    // chosen fallback. Fires on every class mutation via MutationObserver; the
    // "already optimal" guard prevents a re-collapse loop.
    //
    // Example: nds-stepper nds-vertical-lg nds-radial-md nds-radial-sm
    //   F=horizontal needs 3 BP classes + 0 fallback = 3
    //   F=vertical   needs 2 BP classes + 1 fallback = 3
    //   F=radial     needs 1 BP class  + 1 fallback = 2  ← picked
    //   Result: nds-stepper nds-radial nds-vertical-lg
    const STEPPER_VARIANTS = ['horizontal', 'vertical', 'radial'];
    const STEPPER_BPS = ['sm', 'md', 'lg'];
    const STEPPER_BP_RE = /^nds-(?:horizontal|vertical|radial)-(?:sm|md|lg)$/;

    function stepperEffectiveAt(stepper, bp, fallback) {
        for (const v of STEPPER_VARIANTS) {
            if (stepper.classList.contains(`nds-${v}-${bp}`)) return v;
        }
        return fallback;
    }

    // Class count needed to express the given effective map with `fb` as the
    // always-on fallback. BPs matching fb need no class; others need
    // nds-{variant}-{bp}. Fallback adds 1 class unless it's horizontal (the
    // default — no class).
    function stepperCountFor(fb, effective) {
        return effective.filter(e => e !== fb).length + (fb !== 'horizontal' ? 1 : 0);
    }

    function stepperSimplify(stepper, newFb, effective) {
        // Strip every BP class, then set the new fallback (which updates the
        // always-on variant class + instance state and re-applies the responsive
        // layout). Finally, re-add BP overrides only where effective differs from
        // the new fallback.
        for (const bp of STEPPER_BPS) {
            for (const v of STEPPER_VARIANTS) stepper.classList.remove(`nds-${v}-${bp}`);
        }
        NDS.Stepper.setFallback(stepper.id, newFb);
        effective.forEach((e, i) => {
            if (e !== newFb) stepper.classList.add(`nds-${e}-${STEPPER_BPS[i]}`);
        });

        const demoCard = NDS.closest(stepper, '.nds-demo-card');
        if (!demoCard) return;

        // Sync Fallback dropmenu to the new fallback.
        const fbTarget = NDS.querySelector(demoCard, `[data-stepper-fallback="${newFb}"]`);
        if (fbTarget) selectDropmenuItem(fbTarget, '[data-stepper-fallback]');

        // Sync each BP dropmenu to the correct option — Fallback when the BP
        // inherits, the matching variant when it overrides.
        STEPPER_BPS.forEach((bp, i) => {
            const groupName = 'stepperLayout' + bp[0].toUpperCase() + bp.slice(1);
            const groupItems = NDS.queryAll(demoCard, `.demo-toggle-btn[data-toggler*="${groupName}"]`);
            if (!groupItems.length) return;

            const expectedClass = effective[i] === newFb ? '' : `nds-${effective[i]}-${bp}`;
            const target = groupItems.find(b => {
                const m = (b.getAttribute('data-toggler') || '').match(/^\[\s*"([^"]*)"/);
                return m && m[1] === expectedClass;
            });
            if (target) {
                groupItems.forEach(b => NDS.State.remove(b, 'selected'));
                selectDropmenuItem(target, '.nds-dropmenu-item');
            }
        });

        // Mirror into the code tab. Pass every variant + BP class so stale ones
        // are stripped; nds-horizontal excluded (horizontal has no always-on class).
        const touched = [
            'nds-vertical', 'nds-radial',
            ...STEPPER_VARIANTS.flatMap(v => STEPPER_BPS.map(bp => `nds-${v}-${bp}`))
        ];
        updateCodeExampleForClasses(demoCard, stepper, touched);
    }

    // Re-runs on every class mutation via the shared NDS.onAttrChange observer.
    // stepperSimplify writes class, which re-delivers here — the "already optimal"
    // guard (bestTotal >= currentTotal) makes that re-entry a no-op fixed point.
    function stepperDetect(stepper) {
        const currentFb = NDS.Stepper.getFallback(stepper.id) || 'horizontal';
        const effective = STEPPER_BPS.map(bp => stepperEffectiveAt(stepper, bp, currentFb));

        const authoredBpCount = [...stepper.classList].filter(c => STEPPER_BP_RE.test(c)).length;
        const currentTotal = authoredBpCount + (currentFb !== 'horizontal' ? 1 : 0);

        let bestFb = currentFb;
        let bestTotal = currentTotal;
        for (const candidate of STEPPER_VARIANTS) {
            const total = stepperCountFor(candidate, effective);
            if (total < bestTotal) {
                bestTotal = total;
                bestFb = candidate;
            }
        }

        if (bestTotal >= currentTotal) return;
        stepperSimplify(stepper, bestFb, effective);
    }

    function initializeStepperResponsiveSimplify() {
        if (!document.querySelector('[data-stepper-auto-simplify]')) return;
        _offHandles.push(
            NDS.onAttrChange('[data-stepper-auto-simplify]', ['class'], els => els.forEach(stepperDetect))
        );
        document.querySelectorAll('[data-stepper-auto-simplify]').forEach(stepperDetect);
    }

    // Card content toggle — show/hide optional card sections and rebuild code
    function cardContentToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const section = btn.dataset.cardToggle;
        const selectorMap = {
            tags: '.nds-card-tags',
            rating: '.nds-card-rating'
        };
        const selector = selectorMap[section];
        if (!selector) return;
        const target = demoCard.querySelector(`.demo-container ${selector}`);
        if (!target) return;

        // Toggle hidden + button selected state
        var isHidden = target.hasAttribute('hidden');
        target.toggleAttribute('hidden', !isHidden);
        if (isHidden) NDS.State.add(btn, 'selected');
        else NDS.State.remove(btn, 'selected');

        // Rebuild code from visible demo HTML
        rebuildCardCode(demoCard);
    }


    // Form fix visibility — show/hide prefix/suffix
    function formFixToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const mode = btn.dataset.formFix;
        const formControl = demoCard.querySelector('.demo-container .nds-form-control');
        if (!formControl) return;

        selectDropmenuItem(btn, '[data-form-fix]');

        // Store original content on first use
        if (!formControl.dataset.originalFixHtml) {
            formControl.dataset.originalFixHtml = formControl.innerHTML;
        }

        // Restore original first
        var input = formControl.querySelector('input, textarea, select');
        var inputValue = input ? input.value : '';
        formControl.innerHTML = formControl.dataset.originalFixHtml;
        input = formControl.querySelector('input, textarea, select');
        if (input) input.value = inputValue;

        // Remove based on mode
        if (mode === 'suffix' || mode === 'prefix') {
            var removeSelector = mode === 'suffix' ? '.nds-prefix' : '.nds-suffix';
            var toRemove = formControl.querySelector(removeSelector);
            if (toRemove) toRemove.remove();
        }

        // Re-apply active data-toggler operations first (fixStyle, fixSize, state, etc.)
        reapplyActiveTogglers(demoCard);

        // Re-apply icon/dropmenu after state so new elements inherit disabled/readonly
        if (NDS.querySelector(demoCard, '[data-form-fix-icon][data-state~="selected"]')) {
            applyFormFixIcon(formControl, true);
        }
        if (NDS.querySelector(demoCard, '[data-form-fix-dropmenu][data-state~="selected"]')) {
            applyFormFixDropmenu(formControl, true);
        }

        // Update code example after all toggles reapplied
        rebuildDemoCode(demoCard);
    }

    // Apply or remove icon from prefix/suffix buttons
    function applyFormFixIcon(formControl, isActive) {
        formControl.querySelectorAll('.nds-prefix, .nds-suffix').forEach(function(fix) {
            var childBtn = fix.querySelector('.nds-btn');
            if (!childBtn) return;

            if (isActive) {
                if (!childBtn.querySelector('i.nds-hgi-award-05')) {
                    var icon = document.createElement('i');
                    icon.className = 'nds-icon nds-hgi-award-05';
                    childBtn.insertBefore(icon, childBtn.firstChild);
                }
            } else {
                var existing = childBtn.querySelector('i.nds-hgi-award-05');
                if (existing) existing.remove();
            }
        });
    }

    // Form fix icon toggle — add/remove icon to prefix/suffix
    function formFixIconToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const isActive = !NDS.State.has(btn, 'selected');
        if (isActive) NDS.State.add(btn, 'selected');
        else NDS.State.remove(btn, 'selected');
        const formControl = demoCard.querySelector('.demo-container .nds-form-control');
        if (!formControl) return;

        applyFormFixIcon(formControl, isActive);
        rebuildDemoCode(demoCard);
    }

    // Apply or remove dropmenu from prefix/suffix containers
    function applyFormFixDropmenu(formControl, isActive) {
        var formContainer = formControl.closest('.nds-form-container');
        var isDisabled = formContainer ? NDS.State.has(formContainer, 'disabled') : false;

        formControl.querySelectorAll('.nds-prefix, .nds-suffix').forEach(fix => {
            var childBtn = fix.querySelector('.nds-btn');

            if (isActive) {
                // Add dropmenu to container
                fix.classList.add('nds-dropmenu');

                // Convert child span to button trigger
                if (childBtn && !childBtn.classList.contains('nds-dropmenu-trigger')) {
                    var trigger = document.createElement('button');
                    trigger.className = childBtn.className + ' nds-menu-btn nds-dropmenu-trigger';
                    trigger.innerHTML = childBtn.innerHTML;
                    if (isDisabled) {
                        trigger.disabled = true;
                        trigger.setAttribute('aria-disabled', 'true');
                    }
                    childBtn.replaceWith(trigger);
                }

                // Inject menu if not present
                if (!fix.querySelector('.nds-dropmenu-menu')) {
                    var menu = document.createElement('div');
                    menu.className = 'nds-dropmenu-menu';
                    menu.hidden = true;
                    menu.innerHTML =
                        '<div class="nds-dropmenu-scroll">' +
                            '<button class="nds-btn nds-subtle nds-dropmenu-item"><span class="nds-label">Option 1</span></button>' +
                            '<button class="nds-btn nds-subtle nds-dropmenu-item"><span class="nds-label">Option 2</span></button>' +
                            '<button class="nds-btn nds-subtle nds-dropmenu-item"><span class="nds-label">Option 3</span></button>' +
                        '</div>';
                    fix.appendChild(menu);

                    // Propagate disabled to menu items
                    if (isDisabled) {
                        menu.querySelectorAll('button').forEach(function(btn) {
                            btn.disabled = true;
                            btn.setAttribute('aria-disabled', 'true');
                        });
                    }
                }

                // Soft dependency — demo skips the dropmenu enhancement if NDS.Dropmenu isn't bundled.
                if (NDS.Dropmenu) NDS.Dropmenu.init(fix);
            } else {
                // Remove dropmenu from container
                fix.classList.remove('nds-dropmenu');
                fix.removeAttribute('data-nds-dropmenu-initialized');

                // Convert button trigger back to span
                var trigger = fix.querySelector('.nds-dropmenu-trigger');
                if (trigger) {
                    var span = document.createElement('span');
                    span.className = trigger.className.replace(' nds-menu-btn', '').replace(' nds-dropmenu-trigger', '');
                    span.innerHTML = trigger.innerHTML;
                    span.removeAttribute('aria-expanded');
                    span.removeAttribute('aria-haspopup');
                    if (isDisabled) {
                        span.setAttribute('aria-disabled', 'true');
                    }
                    trigger.replaceWith(span);
                }

                // Remove menu
                var menu = fix.querySelector('.nds-dropmenu-menu');
                if (menu) menu.remove();
            }
        });
    }

    // Form fix dropmenu toggle — convert prefix/suffix to dropmenu triggers
    function formFixDropmenuToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const isActive = !NDS.State.has(btn, 'selected');
        if (isActive) NDS.State.add(btn, 'selected');
        else NDS.State.remove(btn, 'selected');
        const formControl = demoCard.querySelector('.demo-container .nds-form-control');
        if (!formControl) return;

        applyFormFixDropmenu(formControl, isActive);

        // Rebuild code example from live demo
        rebuildDemoCode(demoCard);
    }

    // Rating disable toggle — toggle disabled state via rating API
    function ratingDisableToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;
        const rating = demoCard.querySelector('.nds-rating');
        if (!rating || !rating.ndsRating) return;
        const disabled = !rating.ndsRating.isDisabled();
        rating.ndsRating.setDisabled(disabled);
        if (disabled) NDS.State.add(btn, 'selected');
        else NDS.State.remove(btn, 'selected');
        rebuildDemoCode(demoCard);
    }

    // Generic: rebuild code example from the live demo DOM.
    // Works for any demo card — clones the first root element in .demo-container,
    // strips runtime/demo-only attributes, replaces demo IDs, and outputs clean HTML.
    function rebuildDemoCode(demoCard) {
        var codeElement = demoCard.querySelector('.code-example code');
        if (!codeElement) return;

        // Find the root demo element (skip wrapper divs like .state-demo)
        var demoContainer = demoCard.querySelector('.demo-container');
        if (!demoContainer) return;
        var rootEl = demoContainer.querySelector('.state-demo > *') || demoContainer.querySelector(':scope > *');
        if (!rootEl) return;

        // Get clean IDs from the original static code (lazily snapshotted before
        // any mutation — the code tab isn't touched until a code-update runs).
        var hiddenCopy = getHiddenCodeCopy(codeElement);
        var idMap = {};
        if (hiddenCopy) {
            var origIds = hiddenCopy.textContent.match(/id="([^"]+)"/g);
            var demoIds = [];
            rootEl.querySelectorAll('[id]').forEach(function(el) { demoIds.push(el.id); });
            if (origIds) {
                origIds.forEach(function(match, i) {
                    var cleanId = match.replace(/id="([^"]+)"/, '$1');
                    if (demoIds[i]) idMap[demoIds[i]] = cleanId;
                });
            }
        }

        var clone = rootEl.cloneNode(true);

        // Strip all runtime *-initialized attributes added by JS
        [clone, ...clone.querySelectorAll('*')].forEach(function(el) {
            el.getAttributeNames().filter(a => a.endsWith('-initialized')).forEach(a => el.removeAttribute(a));
        });
        clone.querySelectorAll('[aria-expanded]').forEach(function(el) { el.removeAttribute('aria-expanded'); el.removeAttribute('aria-haspopup'); });
        clone.querySelectorAll('[role="menu"]').forEach(function(el) { el.removeAttribute('role'); el.removeAttribute('aria-hidden'); el.removeAttribute('style'); });
        clone.querySelectorAll('[role="menuitem"]').forEach(function(el) { el.removeAttribute('role'); });

        // Strip rating runtime attributes (set by JS initialization)
        clone.querySelectorAll('.nds-rating-star').forEach(function(el) {
            NDS.State.clear(el);
            el.removeAttribute('data-value');
        });

        // Strip demo-only data attributes
        clone.querySelectorAll('[data-original-fix-html]').forEach(function(el) { el.removeAttribute('data-original-fix-html'); });
        if (clone.hasAttribute('data-original-fix-html')) clone.removeAttribute('data-original-fix-html');
        clone.querySelectorAll('[data-short-desc]').forEach(function(el) { el.removeAttribute('data-short-desc'); });

        // Strip state propagation (disabled/readonly/required on inputs — data-state on container is enough)
        clone.querySelectorAll('[aria-disabled]').forEach(function(el) { el.removeAttribute('aria-disabled'); });
        clone.querySelectorAll('input[disabled], textarea[disabled], select[disabled], button[disabled]').forEach(function(el) {
            // Only strip if parent container has data-state with disabled
            if (el.closest('[data-state*="disabled"]')) el.removeAttribute('disabled');
        });
        clone.querySelectorAll('input[readonly], textarea[readonly]').forEach(function(el) {
            if (el.closest('[data-state*="readonly"]')) el.removeAttribute('readonly');
        });
        clone.querySelectorAll('input[required], textarea[required], select[required]').forEach(function(el) {
            if (el.closest('[data-required]')) el.removeAttribute('required');
        });

        // Replace demo IDs with clean code IDs
        Object.keys(idMap).forEach(function(demoId) {
            var cleanId = idMap[demoId];
            var el = clone.querySelector('#' + demoId);
            if (el) el.id = cleanId;
            var label = clone.querySelector('label[for="' + demoId + '"]');
            if (label) label.setAttribute('for', cleanId);
        });

        // outerHTML serializes empty attributes as attr="", strip for clean output
        var result = formatHtml(clone.outerHTML.replace(/([\w-])=""/g, '$1'));
        hiddenCopy.textContent = result;
        // Write as TEXT, not innerHTML — see updateCodeFromHiddenCopy.
        codeElement.textContent = result;
        delete codeElement.dataset.originalContent;
        NDS.Code.reprocessCodeElement(codeElement);
    }

    function rebuildCardCode(demoCard) {
        const codeEl = demoCard.querySelector('.code-example code.lang-html');
        if (!codeEl) return;

        const card = demoCard.querySelector('.demo-container .nds-card');
        if (!card) return;

        // Clone and strip hidden elements + demo-only data attributes
        const clone = card.cloneNode(true);
        clone.querySelectorAll('[hidden]').forEach(el => el.remove());
        clone.querySelectorAll('[data-short-desc]').forEach(el => el.removeAttribute('data-short-desc'));

        // Strip all runtime *-initialized attributes
        [clone, ...clone.querySelectorAll('*')].forEach(el => {
            el.getAttributeNames().filter(a => a.endsWith('-initialized')).forEach(a => el.removeAttribute(a));
        });

        // Clean expandable: strip runtime state and button, keep structure
        clone.querySelectorAll('.nds-expandable').forEach(el => {
            NDS.State.remove(el, 'expandable', 'expanded');
        });
        clone.querySelectorAll('.nds-expand-btn').forEach(el => el.remove());
        const expContent = clone.querySelector('.nds-expandable-content');
        if (expContent) {
            expContent.removeAttribute('style');
            expContent.setAttribute('style', '--max-height:200px');
        }

        // outerHTML serializes empty attributes as attr="", strip for clean output
        let html = clone.outerHTML.replace(/([\w-])=""/g, '$1');

        // Format and indent the HTML
        html = formatHtml(html, '    ');
        updateCodeFromHiddenCopy(codeEl, html);
    }

    function rebuildQuoteCode(demoCard) {
        const codeEl = demoCard.querySelector('.code-example code.lang-html');
        if (!codeEl) return;

        const quote = demoCard.querySelector('.demo-container .nds-quote');
        if (!quote) return;

        const clone = quote.cloneNode(true);
        clone.querySelectorAll('[hidden]').forEach(el => el.remove());

        [clone, ...clone.querySelectorAll('*')].forEach(el => {
            el.getAttributeNames().filter(a => a.endsWith('-initialized')).forEach(a => el.removeAttribute(a));
        });

        let html = clone.outerHTML.replace(/([\w-])=""/g, '$1');
        html = formatHtml(html, '    ');
        updateCodeFromHiddenCopy(codeEl, html);
    }

    // Quote background dropmenu — solid/transparent
    function quoteBgToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const quote = demoCard.querySelector('.demo-container .nds-quote');
        if (!quote) return;

        selectDropmenuItem(btn, '[data-quote-bg]');
        quote.classList.toggle('nds-transparent', btn.dataset.quoteBg === 'transparent');
        rebuildQuoteCode(demoCard);
    }

    // Quote content toggle — show/hide title/avatar/author
    function quoteToggle(btn) {
        const demoCard = NDS.closest(btn, '.nds-demo-card');
        if (!demoCard) return;

        const quote = demoCard.querySelector('.demo-container .nds-quote');
        if (!quote) return;

        const target = btn.dataset.quoteToggle;
        let el;
        if (target === 'title')  el = quote.querySelector('.nds-quote-title');
        if (target === 'avatar') el = quote.querySelector('.nds-quote-author .nds-avatar');
        if (target === 'author') el = quote.querySelector('.nds-quote-author');
        if (!el) return;

        if (el.hasAttribute('hidden')) {
            el.removeAttribute('hidden');
            NDS.State.add(btn, 'selected');
        } else {
            el.setAttribute('hidden', '');
            NDS.State.remove(btn, 'selected');
        }

        rebuildQuoteCode(demoCard);
    }

    // Format raw HTML string with consistent indentation
    function formatHtml(html, indentChar) {
        indentChar = indentChar || '  ';
        var formatted = '';
        var indent = 0;
        var lines = html
            .replace(/^\s+/gm, '')
            .replace(/></g, '>\n<')
            .split('\n');

        lines.forEach(function(line) {
            line = line.trim();
            if (!line) return;
            if (line.match(/^<\//) && indent > 0) indent--;
            formatted += indentChar.repeat(indent) + line + '\n';
            if (line.match(/^<[a-z][^/]*[^/]>$/) && !line.match(/^<(input|br|hr|img|meta|link)\b/)) indent++;
        });

        return formatted.trim();
    }

    // Demo action buttons — dispatch by data-action (preventDefault handled by the
    // delegated click registry via the entry's preventDefault flag).
    var DEMO_ACTIONS = {
        'populate-demo-files': btn => populateDemoFiles(btn),
        'reset-progress-duration': btn => resetProgressDuration(btn),
        'random-progress-value': btn => randomProgressValue(btn),
        'toast-show': btn => createAlertFromDemo(btn, true),
        'alert-create': btn => createAlertFromDemo(btn, false),
        'cookie-show': btn => showCookiePopupFromDemo(btn)
    };
    function demoActionDispatch(actionBtn) {
        var handler = DEMO_ACTIONS[actionBtn.getAttribute('data-action')];
        if (handler) handler(actionBtn);
    }

    // Show the site-wide cookie popup, honoring the demo card's layout toggle
    function showCookiePopupFromDemo(button) {
        // Soft dependency — demo no-ops if NDS.Cookies isn't bundled.
        if (!NDS.Cookies || typeof NDS.Cookies.show !== 'function') return;

        const demoCard = NDS.closest(button, '.nds-demo-card');
        const popup = document.getElementById('ndsCookiesPopup');
        if (popup && demoCard) {
            const centerToggle = NDS.querySelector(demoCard, '[data-toggler*="cookieLayout"][data-state~="selected"]');
            popup.classList.toggle('nds-compact', !!centerToggle);
        }
        NDS.Cookies.show();
    }

    // Reset progress duration animation
    function resetProgressDuration(button) {
        const demoCard = NDS.closest(button, '.nds-demo-card');
        if (!demoCard) return;

        const progressButtons = demoCard.querySelectorAll('.nds-progress:not(.nds-progress-static)');
        progressButtons.forEach(btn => {
            const circle = btn.querySelector('.nds-progress-circle');
            if (circle) {
                const clone = circle.cloneNode(true);
                circle.replaceWith(clone);
            }
        });
    }

    // Set random progress values
    function randomProgressValue(button) {
        const demoCard = NDS.closest(button, '.nds-demo-card');
        if (!demoCard) return;

        const progressButtons = demoCard.querySelectorAll('.nds-progress-static');
        progressButtons.forEach(btn => {
            // Generate random value between 0 and 100
            const randomValue = Math.floor(Math.random() * 101);
            btn.style.setProperty('--progress-value', randomValue);
        });
    }

    // Create alert or toast from demo toggle states
    function createAlertFromDemo(button, isToast) {
        const demoCard = NDS.closest(button, '.nds-demo-card');
        if (!demoCard) return;

        // Determine toggle type prefixes based on alert type
        const variantType = isToast ? 'toastVariant' : 'alertVariant';
        const colorType = isToast ? 'toastColor' : 'alertColor';

        // Get variant from selected toggle button
        let variant = 'success';
        const variantToggle = NDS.querySelector(demoCard, `[data-toggler*="${variantType}"][data-state~="selected"]`);
        if (variantToggle) {
            try {
                const toggleData = JSON.parse(variantToggle.getAttribute('data-toggler'));
                variant = toggleData[0].split('=')[1] || 'success';
            } catch (e) {}
        }

        // Get color from toggle button
        const colorToggle = NDS.querySelector(demoCard, `[data-toggler*="${colorType}"][data-state~="selected"]`);
        const hasColor = !!colorToggle;

        // Get position (toast only)
        let position = 'top';
        if (isToast) {
            const positionToggle = NDS.querySelector(demoCard, '[data-toggler*="toastPosition"][data-state~="selected"]');
            if (positionToggle) position = 'bottom';
        }

        const messages = isToast ? TOAST_MESSAGES : ALERT_MESSAGES;

        // Soft dependency — demo skips alert/toast creation if NDS.Alert isn't bundled.
        if (NDS.Alert) {
            const options = {
                variant: variant,
                title: variant.charAt(0).toUpperCase() + variant.slice(1),
                description: messages[variant],
                color: hasColor
            };

            if (isToast) {
                options.display = 'toast';
                options.position = position;
                options.duration = 4000;
                options.shadow = true;
                options.closable = true;
            } else {
                options.target = '#demo-alert-container';
                options.prepend = true;
            }

            NDS.Alert.create(options);
        }
    }

    function populateDemoFiles(button) {
        
        // Find the file upload container in the same demo card
        const demoCard = NDS.closest(button, '.nds-demo-card');
        if (!demoCard) {
            return;
        }
        
        const uploadContainer = demoCard.querySelector('.nds-file-upload');
        if (!uploadContainer) {
            return;
        }
        
        // Get the file upload API instance
        const api = NDS.Upload.getInstance(uploadContainer);
        if (!api) {
            return;
        }

        // Clear existing files first
        api.clearAllFiles();

        // Check if single file mode is active
        const isSingleFile = NDS.State.has(uploadContainer, 'single');
        
        // Create mock files with different statuses
        const allDemoFiles = [
            {
                name: 'progress-report.pdf',
                size: 1024 * 512, // 512KB
                type: 'application/pdf',
                status: 'uploading',
                progress: 45
            },
            {
                name: 'processing-file.xlsx',
                size: 1024 * 384, // 384KB
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                status: 'processing',
                progress: 100
            },
            {
                name: 'completed-document.docx',
                size: 1024 * 256, // 256KB  
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                status: 'complete',
                progress: 100
            },
            {
                name: 'failed-upload.jpg',
                size: 1024 * 1024 * 2.5, // 2.5MB
                type: 'image/jpeg',
                status: 'error',
                progress: 0,
                error: 'File size exceeds limit'
            }
        ];
        
        // Select files based on mode
        let demoFiles;
        if (isSingleFile) {
            // Single file mode: pick one random file
            const randomIndex = Math.floor(Math.random() * allDemoFiles.length);
            demoFiles = [allDemoFiles[randomIndex]];
        } else {
            // Multi file mode: use all files
            demoFiles = allDemoFiles;
        }
        
        // Add each demo file using the API
        demoFiles.forEach(fileData => {
            // Create a mock File object
            const mockFile = new File([''], fileData.name, { 
                type: fileData.type,
                lastModified: Date.now()
            });
            
            // Override the size property (File objects are read-only, but we can try)
            Object.defineProperty(mockFile, 'size', { 
                value: fileData.size,
                writable: false 
            });
            
            // Add the file using the API
            const fileId = api.addFile(mockFile, {
                status: fileData.status,
                progress: fileData.progress,
                error: fileData.error
            });
            
            
            // If it's uploading status, simulate progress
            if (fileData.status === 'uploading') {
                simulateProgressForDemo(api, fileId, fileData.progress);
            }
        });
        
    }
    
    function simulateProgressForDemo(api, fileId, startProgress) {
        let progress = startProgress;
        const targetProgress = Math.min(startProgress + 30, 85); // Don't complete, just show progress

        const interval = setInterval(() => {
            progress += Math.random() * 3;
            if (progress >= targetProgress) {
                progress = targetProgress;
                clearInterval(interval);
            }

            api.setFileProgress(fileId, progress);
        }, 200);
    }

    // ── Counter restart button ───────────────────────────────────────
    function counterRestart(btn) {
        const card = NDS.closest(btn, '.nds-demo-card');
        if (!card) return;

        card.querySelectorAll('.nds-counter-value').forEach(function(el) {
            if (typeof el._ndsCounterOff === 'function') {
                el._ndsCounterOff();
                delete el._ndsCounterOff;
            }
            el.removeAttribute('data-animated');

            // Reset the number text node back to 0 (preserves child elements like icons)
            var textNodes = [];
            for (var node of el.childNodes) {
                if (node.nodeType === Node.TEXT_NODE) textNodes.push(node);
            }
            var target = textNodes.find(function(n) { return /\d/.test(n.textContent); })
                || textNodes[textNodes.length - 1];
            if (target) target.textContent = '0';
            else el.textContent = '0';
        });

        // Soft dependency — demo skips counter re-init if NDS.Numbers isn't bundled.
        if (NDS.Numbers) NDS.Numbers.reinit();
    }

    // Self-boot: showcase ships as its own defer bundle, so it initializes itself
    // rather than relying on the main loader — whose init is decoupled from
    // DOMContentLoaded and could otherwise run before this bundle has executed
    // (leaving the demos un-wired). Defer guarantees the DOM is parsed here.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeShowcase);
    } else {
        initializeShowcase();
    }

})();