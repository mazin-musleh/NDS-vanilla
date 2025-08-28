// Horizontal row scroll functionality
(() => {
    'use strict';
    
    const initializeRowScroll = (forceUpdate = false) => {
        const containers = document.querySelectorAll('.oneRowContent');
        if (!containers.length) return;

        containers.forEach(container => {
            // Skip if already initialized unless forcing update
            if (container.hasAttribute('data-onerow-initialized') && !forceUpdate) return;
            
            if (!container.hasAttribute('data-onerow-initialized')) {
                container.setAttribute('data-onerow-initialized', 'true');
                initializeSingleContainer(container);
            } else if (forceUpdate) {
                // For already initialized containers, just update indicators
                // Find the updateScrollIndicators function for this container
                setTimeout(() => {
                    // The updateScrollIndicators function is closure-scoped, so we need to trigger it
                    // We can do this by dispatching a resize event to trigger the existing handlers
                    window.dispatchEvent(new Event('resize'));
                }, 10);
            }
        });
    };

    const initializeSingleContainer = (container) => {

        // Set initial scroll behavior
        container.style.scrollBehavior = 'smooth';
        
        // Initial indicator state - delay to ensure CSS is applied
        setTimeout(() => updateScrollIndicators(), 100);

        function scrollToTarget(target) {
            if (!container || !target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
                scrollMode: 'if-needed'
            });
            
            // Update indicators after scroll animation completes
            setTimeout(() => updateScrollIndicators(), 300);
        }

        function needsScroll() {
            // If container doesn't have oneRowContent class, no scrolling is needed
            if (!container.classList.contains('oneRowContent')) {
                return false;
            }
            
            // Force layout calculation
            container.offsetHeight;
            
            // Calculate content width excluding .showMore elements
            const children = Array.from(container.children);
            const contentWidth = children
                .filter(child => !child.classList.contains('showMore'))
                .reduce((total, child) => total + child.offsetWidth, 0);
            
            return contentWidth > container.clientWidth;
        }
        
        function updateScrollIndicators() {
            // If container doesn't have oneRowContent class, remove all scroll-related classes
            if (!container.classList.contains('oneRowContent')) {
                container.classList.remove('hasMore', 'atStart', 'atEnd');
                return;
            }
            
            const hasOverflow = needsScroll();
            container.classList.toggle('hasMore', hasOverflow);
            
            if (hasOverflow) {
                const { scrollLeft, scrollWidth, clientWidth } = container;
                const maxScroll = scrollWidth - clientWidth;
                const isRTL = document.documentElement.dir === 'rtl';
                
                let atStart, atEnd;
                
                if (isRTL) {
                    // RTL: start is at 0, end is at max scroll (reversed from visual perspective)
                    atStart = Math.abs(scrollLeft) <= 2;
                    atEnd = Math.abs(scrollLeft) >= maxScroll - 2;
                } else {
                    // LTR: start is at 0, end is at max scroll
                    atStart = scrollLeft <= 2;
                    atEnd = scrollLeft >= maxScroll - 2;
                }
                
                container.classList.toggle('atStart', atStart);
                container.classList.toggle('atEnd', atEnd);
            } else {
                container.classList.remove('atStart', 'atEnd');
            }
        }

        // On click - scope to this container only
        Array.from(container.children).forEach(item => {
            item.addEventListener('click', function (e) {
                // Check if parent still has the class
                if (!this.parentElement?.classList.contains('oneRowContent')) return;
                
                // Prevent click if we just finished dragging
                if (dragState.hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                
                // Only scroll if scrolling is needed
                if (!needsScroll()) return;
                
                // If at end and clicked on showMore, scroll back to start
                if (container.classList.contains('atEnd') && this.classList.contains('showMore')) {
                    e.preventDefault();
                    e.stopPropagation();
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                    setTimeout(() => updateScrollIndicators(), 300);
                    return;
                }
                
                scrollToTarget(this);
            });
        });

        // Mouse wheel horizontal scroll - only if scrolling is needed
        let isScrolling = false;
        container.addEventListener('wheel', (e) => {
            // Check if element still has the class
            if (!container.classList.contains('oneRowContent')) {
                // Reset styles and return
                Object.assign(container.style, {
                    cursor: '',
                    userSelect: '',
                    scrollBehavior: ''
                });
                return;
            }
            
            // Only handle wheel if scrolling is needed
            if (!needsScroll()) return;
            
            if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
            
            e.preventDefault();
            if (isScrolling) return;
            
            isScrolling = true;
            container.style.scrollBehavior = 'auto';
            
            // Check RTL direction for proper scroll direction
            const isRTL = document.documentElement.dir === 'rtl';
            const scrollMultiplier = isRTL ? -0.8 : 0.8;
            const scrollAmount = e.deltaY * scrollMultiplier;
            const startScroll = container.scrollLeft;
            let frame = 0;
            const duration = 150;
            
            const animate = () => {
                frame += 16;
                const progress = Math.min(frame / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                container.scrollLeft = startScroll + (scrollAmount * easeOut);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    isScrolling = false;
                    container.style.scrollBehavior = 'smooth';
                    updateScrollIndicators();
                }
            };
            requestAnimationFrame(animate);
        }, { passive: false });

        // Drag scroll functionality - only if scrolling is needed
        let dragState = { active: false, startX: 0, scrollLeft: 0, hasDragged: false };
        
        container.addEventListener('mousedown', (e) => {
            // Check if element still has the class
            if (!container.classList.contains('oneRowContent')) {
                Object.assign(container.style, {
                    cursor: '',
                    userSelect: '',
                    scrollBehavior: ''
                });
                return;
            }
            
            // Only enable drag if scrolling is needed
            if (!needsScroll()) return;
            
            dragState = {
                active: true,
                startX: e.pageX,
                scrollLeft: container.scrollLeft,
                hasDragged: false
            };
            
            Object.assign(container.style, {
                cursor: 'grabbing',
                userSelect: 'none',
                scrollBehavior: 'auto'
            });
        });
        
        const handleMouseUp = () => {
            if (dragState.active) {
                dragState.active = false;
                Object.assign(container.style, {
                    cursor: '',
                    userSelect: '',
                    scrollBehavior: container.classList.contains('oneRowContent') ? 'smooth' : ''
                });
                
                // Prevent clicks briefly after dragging
                if (dragState.hasDragged) {
                    setTimeout(() => {
                        dragState.hasDragged = false;
                    }, 100);
                }
            }
        };
        
        const handleMouseMove = (e) => {
            if (!dragState.active) return;
            // Check if element still has the class
            if (!container.classList.contains('oneRowContent')) {
                handleMouseUp();
                return;
            }
            e.preventDefault();
            
            // Mark as dragged if moved more than 3 pixels
            if (Math.abs(e.pageX - dragState.startX) > 3) {
                dragState.hasDragged = true;
            }
            
            container.scrollLeft = dragState.scrollLeft - (e.pageX - dragState.startX) * 1.0;
            updateScrollIndicators();
        };
        
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        
        // Update indicators on window resize
        window.addEventListener('resize', () => {
            setTimeout(() => updateScrollIndicators(), 100);
        });
    }; // end initializeSingleContainer

    // Auto-initialize row scroll
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeRowScroll);
    } else {
        setTimeout(initializeRowScroll, 50);
    }

    // Expose globally
    window.initializeRowScroll = initializeRowScroll;
})();