// Horizontal Row Scroll Functionality
(() => {
    'use strict';
    
    const initializeRowScroll = (forceUpdate = false) => {
        const containers = document.querySelectorAll('.oneRowContent');
        if (!containers.length) return;

        containers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }
            
            // Skip if already initialized unless forcing update
            if (container.hasAttribute('data-onerow-initialized') && !forceUpdate) return;
            
            if (!container.hasAttribute('data-onerow-initialized')) {
                container.setAttribute('data-onerow-initialized', 'true');
                initializeSingleContainer(container);
            } else if (forceUpdate) {
                // For already initialized containers, just update indicators
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 10);
            }
        });
    };

    const initializeSingleContainer = (container) => {
        // Set initial scroll behavior
        container.style.scrollBehavior = 'smooth';
        
        function scrollToTarget(target) {
            if (!container || !target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
                scrollMode: 'if-needed'
            });
            
            setTimeout(() => updateScrollIndicators(), 300);
        }

        function needsScroll() {
            if (!container.classList.contains('oneRowContent')) {
                return false;
            }
            
            // Batch all geometric property reads together
            const containerWidth = container.clientWidth;
            const children = Array.from(container.children);
            const contentWidth = children
                .filter(child => !child.classList.contains('showMore'))
                .reduce((total, child) => total + child.offsetWidth, 0);
            
            return contentWidth > containerWidth;
        }
        
        function updateScrollIndicators() {
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
                    atStart = Math.abs(scrollLeft) <= 2;
                    atEnd = Math.abs(scrollLeft) >= maxScroll - 2;
                } else {
                    atStart = scrollLeft <= 2;
                    atEnd = scrollLeft >= maxScroll - 2;
                }
                
                container.classList.toggle('atStart', atStart);
                container.classList.toggle('atEnd', atEnd);
            } else {
                container.classList.remove('atStart', 'atEnd');
            }
        }

        function setupEventListeners() {
            // Click handlers
            Array.from(container.children).forEach(item => {
                item.addEventListener('click', function (e) {
                    if (!this.parentElement?.classList.contains('oneRowContent')) return;
                    
                    if (dragState.hasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }
                    
                    if (!needsScroll()) return;
                    
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

            // Mouse wheel horizontal scroll
            let isScrolling = false;
            container.addEventListener('wheel', (e) => {
                if (!container.classList.contains('oneRowContent')) {
                    Object.assign(container.style, {
                        cursor: '',
                        userSelect: '',
                        scrollBehavior: ''
                    });
                    return;
                }
                
                if (!needsScroll()) return;
                if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
                
                e.preventDefault();
                if (isScrolling) return;
                
                isScrolling = true;
                container.style.scrollBehavior = 'auto';
                
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

            // Drag scroll functionality
            let dragState = { active: false, startX: 0, scrollLeft: 0, hasDragged: false };
            
            container.addEventListener('mousedown', (e) => {
                if (!container.classList.contains('oneRowContent')) {
                    Object.assign(container.style, {
                        cursor: '',
                        userSelect: '',
                        scrollBehavior: ''
                    });
                    return;
                }
                
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
                    
                    if (dragState.hasDragged) {
                        setTimeout(() => {
                            dragState.hasDragged = false;
                        }, 100);
                    }
                }
            };
            
            const handleMouseMove = (e) => {
                if (!dragState.active) return;
                if (!container.classList.contains('oneRowContent')) {
                    handleMouseUp();
                    return;
                }
                e.preventDefault();
                
                if (Math.abs(e.pageX - dragState.startX) > 3) {
                    dragState.hasDragged = true;
                }
                
                container.scrollLeft = dragState.scrollLeft - (e.pageX - dragState.startX) * 1.0;
                updateScrollIndicators();
            };
            
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);
            
            // Window resize handler
            window.addEventListener('resize', () => {
                setTimeout(() => updateScrollIndicators(), 100);
            });
        }

        // Initial indicator state - delay to ensure CSS is applied and avoid forced reflow
        setTimeout(() => updateScrollIndicators(), 200); // Increased delay for better performance
        setupEventListeners();
    };

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.initializeRowScroll = initializeRowScroll;
        
        window.NDSOneRowContent = {
            initializeRowScroll
        };
    }

    // Note: Initialization now handled by nds-init.js unified system
})();