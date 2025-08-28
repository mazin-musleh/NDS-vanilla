// Thousands Separators
(function () {
    'use strict';
    const ThousandsNumbers = document.querySelectorAll('.nds-number-format');
    if (ThousandsNumbers.length > 0) {
        ThousandsNumbers.forEach(el => {
            const num = parseInt(el.textContent.replace(/,/g, ''), 10);
            if (!isNaN(num)) {
                el.textContent = num.toLocaleString();
            }
        });
    }
})();

// Counter Animation
(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.nds-counter-value');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.textContent.replace(/[^\d]/g, ''), 10) || 0;
                    const duration = 1000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const currentValue = Math.ceil(progress * target);
                        el.textContent = currentValue.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);

                    observer.unobserve(el); // Stop observing after animation starts
                }
            });
        }, {
            threshold: 0.5 // 50% of the element must be visible
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    });
})();// Test comment
// Another test comment
// Fresh test
// Test without watch
