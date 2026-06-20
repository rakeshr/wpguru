/**
 * WPGuru - Main JavaScript
 * GSAP animations, cursor glow, counters, and interactive effects
 */

(function() {
    'use strict';

    // ============================================
    // GSAP Scroll Animations (Robust)
    // ============================================
    const GSAPAnimations = {
        init() {
            // Always show elements first, then animate
            this.showAllElements();

            if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
                return;
            }

            gsap.registerPlugin(ScrollTrigger);

            // Fade up animations
            gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
                const delay = parseFloat(el.dataset.delay || 0) / 1000;
                gsap.fromTo(el,
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 92%',
                            toggleActions: 'play none none none'
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: delay,
                        ease: 'power3.out'
                    }
                );
            });

            // Fade left animations
            gsap.utils.toArray('[data-animate="fade-left"]').forEach((el) => {
                gsap.fromTo(el,
                    { x: -60, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        },
                        x: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out'
                    }
                );
            });

            // Fade right animations
            gsap.utils.toArray('[data-animate="fade-right"]').forEach((el) => {
                gsap.fromTo(el,
                    { x: 60, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        },
                        x: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out'
                    }
                );
            });

            // Stagger grid items (feature cards, pricing cards, testimonials)
            gsap.utils.toArray('.grid-3').forEach((grid) => {
                const cards = grid.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
                if (cards.length > 0) {
                    gsap.fromTo(cards,
                        { y: 40, opacity: 0 },
                        {
                            scrollTrigger: {
                                trigger: grid,
                                start: 'top 88%',
                                toggleActions: 'play none none none'
                            },
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            stagger: 0.12,
                            ease: 'power2.out'
                        }
                    );
                }
            });

            // Step numbers animation
            gsap.utils.toArray('.step-number').forEach((el) => {
                gsap.fromTo(el,
                    { scale: 0, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        },
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
                    }
                );
            });

            // Counter animation for stats
            gsap.utils.toArray('[data-count]').forEach((el) => {
                const target = parseInt(el.getAttribute('data-count'));
                const obj = { value: 0 };
                gsap.to(obj, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    value: target,
                    duration: 2,
                    ease: 'power1.out',
                    onUpdate: () => {
                        el.textContent = Math.round(obj.value);
                    }
                });
            });

            // Hero content entrance
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                gsap.fromTo('.hero-badge',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
                );
                gsap.fromTo('.hero h1',
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, delay: 0.4, ease: 'power3.out' }
                );
                gsap.fromTo('.hero p.lead',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
                );
                gsap.fromTo('.hero-actions',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power3.out' }
                );
                gsap.fromTo('.hero-trust',
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, delay: 1, ease: 'power3.out' }
                );
            }

            // Hero visual card entrance
            const heroVisual = document.querySelector('.hero-visual-card');
            if (heroVisual) {
                gsap.fromTo(heroVisual,
                    { x: 60, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
                );
            }

            // Parallax orbs on scroll
            gsap.utils.toArray('.orb').forEach((orb) => {
                gsap.to(orb, {
                    scrollTrigger: {
                        trigger: orb.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    },
                    y: -100,
                    ease: 'none'
                });
            });
        },

        // Show all animated elements immediately (fallback)
        showAllElements() {
            document.querySelectorAll('[data-animate]').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }
    };

    // ============================================
    // Cursor Glow Effect
    // ============================================
    const CursorGlow = {
        init() {
            const glow = document.querySelector('.cursor-glow');
            if (!glow || window.innerWidth < 768) return;

            let mouseX = 0, mouseY = 0;
            let glowX = 0, glowY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            const animate = () => {
                glowX += (mouseX - glowX) * 0.08;
                glowY += (mouseY - glowY) * 0.08;
                glow.style.left = glowX + 'px';
                glow.style.top = glowY + 'px';
                requestAnimationFrame(animate);
            };

            animate();
        }
    };

    // ============================================
    // Smooth Scroll
    // ============================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // ============================================
    // Utility Functions
    // ============================================
    const Utils = {
        debounce(func, wait = 20) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // ============================================
    // Back to Top Button
    // ============================================
    const BackToTop = {
        init() {
            const button = document.querySelector('.back-to-top');
            if (!button) return;

            window.addEventListener('scroll', Utils.throttle(() => {
                if (window.pageYOffset > 500) {
                    button.classList.add('visible');
                } else {
                    button.classList.remove('visible');
                }
            }, 100));

            button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // ============================================
    // Tilt Effect on Cards
    // ============================================
    const TiltEffect = {
        init() {
            if (window.innerWidth < 768) return;

            document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        }
    };

    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        GSAPAnimations.init();
        CursorGlow.init();
        SmoothScroll.init();
        BackToTop.init();

        setTimeout(() => {
            TiltEffect.init();
        }, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
