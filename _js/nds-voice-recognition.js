// NDS Voice Recognition
// Low-level wrapper around the Web Speech API with:
//   - Auto language detection from page (ar-SA / en-US)
//   - Audio feedback tones on start / end / error
//   - Callback-style result streaming (final + interim transcripts)
//
// Public API: NDS.VoiceRecognition
//   .isSupported()                          — boolean
//   .getLanguage()                          — 'ar-SA' | 'en-US'
//   .create(options)                        — SpeechRecognition instance
//   .startListening(recognition, callbacks) — { onStart, onResult, onError, onEnd }
//   .stopListening(recognition)
//   .audioFeedback.{ init, start, end, error }
//
// Form integration (data-target lookup, listening state, error messaging)
// lives in nds-forms.js and consumes this module.

(function() {
    'use strict';

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

    var audioFeedback = {
        init: initAudioContext,
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

    function create(options) {
        if (!isSupported()) return null;

        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        var detectedLang = getLanguage();

        Object.assign(recognition, {
            continuous: false,
            interimResults: true,
            lang: detectedLang,
            maxAlternatives: 1
        }, options || {});

        recognition._ndsLang = detectedLang;
        return recognition;
    }

    function startListening(recognition, callbacks) {
        if (!recognition) return;

        var finalTranscript = '';
        callbacks = callbacks || {};

        recognition.onstart = function() {
            audioFeedback.start();
            if (callbacks.onStart) callbacks.onStart();
        };

        recognition.onresult = function(event) {
            var interimTranscript = '';

            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
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
            audioFeedback.error();
            if (callbacks.onError) callbacks.onError(event.error);
        };

        recognition.onend = function() {
            audioFeedback.end();
            if (callbacks.onEnd) callbacks.onEnd(finalTranscript);
        };

        recognition.start();
    }

    function stopListening(recognition) {
        if (recognition) recognition.stop();
    }

    NDS.VoiceRecognition = {
        audioFeedback: audioFeedback,
        isSupported: isSupported,
        getLanguage: getLanguage,
        create: create,
        startListening: startListening,
        stopListening: stopListening,
        _loaded: true
    };

})();
