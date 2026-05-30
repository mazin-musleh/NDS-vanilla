// NDS Voice Input — voice-dictation for a text field.
//
// A delegated library, like NDS.Export: init() installs ONE document-level
// click listener; any `.nds-voice-input` button — present now or added later —
// works through it, no per-element sweep. The Web Speech engine and the
// integration live together (the engine has no other consumer).
//
// The button can live ANYWHERE; it links to its input by, in order:
//   1. data-voice-target="<id|name>"   explicit, button anywhere
//   2. data-target="<id|name>"          explicit, shared NDS convention
//   3. the nearest .nds-form-control's primary input   button inside the field
//
// Field chrome (the `listening` state + transcription preview) derives from the
// resolved input's `.nds-form-container` when it has one. A bare input just gets
// its value set and `input`/`change` dispatched — forms (and any consumer) react
// through those standard events.
//
// It does NOT hide the button on unsupported browsers — visibility is the
// consumer's call. A click on an unsupported browser shows a feedback message
// in the field; consumers who want to omit the button entirely can gate on
// NDS.VoiceInput.isSupported().
//
// Public API: NDS.VoiceInput
//   .init() / .reinit()   — install the delegated click handler (idempotent)
//   .isSupported()        — Web Speech API available?  (gate consumer UI)
(function() {
    'use strict';

    var VOICE_TIMEOUT = 30000; // auto-stop after 30s of listening

    var MESSAGES = {
        ar: {
            'no-speech': 'لم يتم اكتشاف صوت',
            'not-allowed': 'مطلوب إذن الميكروفون',
            'audio-capture': 'تم رفض الوصول للميكروفون',
            'network': 'خطأ في الشبكة',
            'aborted': 'تم إلغاء إدخال الصوت',
            'language-not-supported': 'اللغة غير مدعومة',
            'default': 'خطأ في إدخال الصوت',
            'timeout': 'انتهت مهلة إدخال الصوت',
            'unsupported': 'إدخال الصوت غير مدعوم في هذا المتصفح'
        },
        en: {
            'no-speech': 'No speech detected',
            'not-allowed': 'Microphone permission required',
            'audio-capture': 'Microphone access denied',
            'network': 'Network error',
            'aborted': 'Voice input cancelled',
            'language-not-supported': 'Language not supported',
            'default': 'Voice input error',
            'timeout': 'Voice input timed out',
            'unsupported': 'Voice input is not supported in this browser'
        }
    };

    // ── Web Speech engine (internal, lazy) ────────────────────────────
    // The AudioContext is created on the first tone and recognition on the
    // first start — nothing here runs until a voice button is clicked.
    var audioContext = null;

    function initAudioContext() {
        if (!audioContext) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                audioContext = null;
            }
        }
        return audioContext;
    }

    function playTone(frequency, duration) {
        var ctx = initAudioContext();
        if (!ctx) return;
        try {
            if (ctx.state === 'suspended') ctx.resume();
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            var now = ctx.currentTime;
            osc.connect(gain).connect(ctx.destination);
            osc.frequency.setValueAtTime(frequency, now);
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);
            osc.start(now);
            osc.stop(now + duration / 1000);
        } catch (e) {
            // Silent fail
        }
    }

    var tone = {
        start: function() { playTone(800, 200); },
        end: function() { playTone(400, 300); },
        error: function() { playTone(200, 400); }
    };

    function isSupported() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    }

    function getLanguage() {
        return NDS.isArabic ? 'ar-SA' : 'en-US';
    }

    function createRecognition() {
        if (!isSupported()) return null;
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = getLanguage();
        recognition.maxAlternatives = 1;
        return recognition;
    }

    function listen(recognition, callbacks) {
        if (!recognition) return;
        var finalTranscript = '';

        recognition.onstart = function() {
            tone.start();
            if (callbacks.onStart) callbacks.onStart();
        };
        recognition.onresult = function(event) {
            var interimTranscript = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalTranscript += transcript;
                else interimTranscript += transcript;
            }
            if (callbacks.onResult) {
                callbacks.onResult({
                    final: finalTranscript,
                    interim: interimTranscript,
                    isFinal: event.results[event.results.length - 1].isFinal
                });
            }
        };
        recognition.onerror = function(event) {
            tone.error();
            if (callbacks.onError) callbacks.onError(event.error);
        };
        recognition.onend = function() {
            tone.end();
            if (callbacks.onEnd) callbacks.onEnd(finalTranscript);
        };
        recognition.start();
    }

    // ── Helpers ───────────────────────────────────────────────────────
    function triggerEvents(el) {
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Resolve the button's target input: explicit data attribute first (button
    // anywhere), then fall back to the surrounding form-control's primary input.
    function resolveInput(button) {
        var target = button.getAttribute('data-voice-target') || button.getAttribute('data-target');
        if (target) {
            return document.getElementById(target)
                || document.querySelector('[name="' + target + '"]')
                || document.querySelector('[data-name="' + target + '"]');
        }
        var fc = button.closest('.nds-form-control');
        if (!fc) return null;
        return fc.querySelector(':scope > input[type="text"], :scope > input[type="email"], :scope > input[type="search"], :scope > textarea')
            || fc.querySelector(':scope > input, :scope > textarea');
    }

    // Transient message in the field's placeholder, restored after `duration`.
    // Captures the true original only when no message is already showing and
    // cancels any pending restore, so overlapping messages can't strand a
    // message string as the "original".
    function showMessage(input, message, duration) {
        if (!input) return;
        if (input._ndsMsgTimer) clearTimeout(input._ndsMsgTimer);
        else input._ndsMsgOrig = input.placeholder;
        input.placeholder = message;
        input.style.fontStyle = 'italic';
        input.style.opacity = '0.7';
        input._ndsMsgTimer = setTimeout(function() {
            input.placeholder = input._ndsMsgOrig;
            input.style.fontStyle = '';
            input.style.opacity = '';
            input._ndsMsgTimer = null;
        }, duration || 3000);
    }

    // Localized button labels, computed fresh each use so a runtime language
    // switch is reflected (the engine messages already read NDS.langKey lazily).
    function labels() {
        var ar = NDS.isArabic;
        var langName = ar ? 'العربية' : 'English';
        return {
            start: ar ? 'بدء إدخال الصوت (' + langName + ')' : 'Start voice input (' + langName + ')',
            stop: ar ? 'إيقاف إدخال الصوت' : 'Stop voice input'
        };
    }

    // ── Per-button session (lazy, kept in a WeakMap) ──────────────────
    var sessions = new WeakMap();

    function getSession(button) {
        var s = sessions.get(button);
        if (!s) { s = createSession(button); sessions.set(button, s); }
        return s;
    }

    function createSession(button) {
        var isListening = false;
        var recognition = null;
        var timeout = null;
        var input = null;
        var container = null;

        function stop() {
            isListening = false;
            if (recognition) {
                // Detach handlers before aborting so the abort's own end/error
                // events don't re-enter — no spurious "cancelled" message after a
                // final result or an intentional stop, and no double-stop.
                recognition.onstart = recognition.onresult = recognition.onerror = recognition.onend = null;
                try { recognition.abort(); } catch (e) {}
                recognition = null;
            }
            if (timeout) { clearTimeout(timeout); timeout = null; }

            if (container) NDS.State.remove(container, 'listening');
            NDS.aria.pressed(button, false);
            NDS.aria.label(button, labels().start);
            if (input) {
                input.style.fontStyle = '';
                input.style.opacity = '';
            }
        }

        function start() {
            // Resolve at click time so the target can be anywhere and load order
            // doesn't matter — it only has to exist when the user clicks.
            input = resolveInput(button);
            if (!input) return;
            container = input.closest('.nds-form-container');

            recognition = createRecognition();
            if (!recognition) return;

            isListening = true;
            if (container) NDS.State.add(container, 'listening');
            NDS.aria.pressed(button, true);
            NDS.aria.label(button, labels().stop);
            input.focus();

            timeout = setTimeout(function() {
                stop();
                showMessage(input, MESSAGES[NDS.langKey].timeout, 4000);
            }, VOICE_TIMEOUT);

            listen(recognition, {
                onResult: function(result) {
                    var value = result.isFinal ? result.final.trim() : result.interim;
                    input.style.fontStyle = result.isFinal ? '' : 'italic';
                    input.style.opacity = result.isFinal ? '' : '0.7';
                    input.value = value;

                    if (result.isFinal) {
                        stop();
                        // Standard signal — forms (and any consumer) sync chrome
                        // off the input/change events, no reach into forms internals.
                        triggerEvents(input);
                    }
                },
                onError: function(error) {
                    stop();
                    var errorType = typeof error === 'string' ? error : (error && error.error);
                    var dict = MESSAGES[NDS.langKey];
                    showMessage(input, dict[errorType] || dict['default']);
                },
                onEnd: stop
            });
        }

        return {
            toggle: function() { isListening ? stop() : start(); },
            stop: stop
        };
    }

    // ── Delegated click handler (the whole "init") ────────────────────
    var _installed = false;

    function onVoiceClick(e) {
        var button = e.target.closest && e.target.closest('.nds-voice-input');
        if (!button) return;
        if (!isSupported()) {
            // No hiding — tell the user in the field, leave the button alone.
            showMessage(resolveInput(button), MESSAGES[NDS.langKey].unsupported);
            return;
        }
        getSession(button).toggle();
    }

    function init() {
        if (_installed) return;
        _installed = true;
        document.addEventListener('click', onVoiceClick);
        // If a button is removed mid-listening, stop its session so the mic
        // doesn't stay open until the 30s timeout. Pooled observer, fires only
        // on real removals (portal reparents are filtered out by the bus).
        NDS.onDOMRemove('.nds-voice-input', function(buttons) {
            buttons.forEach(function(btn) {
                var s = sessions.get(btn);
                if (s) s.stop();
            });
        });
    }

    if (typeof window !== 'undefined') {
        window.NDS = window.NDS || {};
        NDS.VoiceInput = {
            init: init,
            reinit: init,
            isSupported: isSupported
        };
    }

})();
