/**
 * WPGuru - Navigation Module
 * Handles mobile menu, scroll effects, and active states
 */

(function() {
    'use strict';
    
    const Navbar = {
        navbar: null,
        toggle: null,
        links: null,
        lastScroll: 0,
        
        init() {
            this.navbar = document.querySelector('.navbar');
            this.toggle = document.querySelector('.nav-toggle');
            this.links = document.querySelector('.nav-links');
            
            if (!this.navbar) return;
            
            this.bindEvents();
            this.setActiveLink();
        },
        
        bindEvents() {
            // Scroll effect
            window.addEventListener('scroll', () => this.handleScroll());
            
            // Mobile toggle
            if (this.toggle) {
                this.toggle.addEventListener('click', () => this.toggleMenu());
            }
            
            // Close menu on link click
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!this.navbar.contains(e.target)) {
                    this.closeMenu();
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMenu();
                }
            });
        },
        
        handleScroll() {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            this.lastScroll = currentScroll;
        },
        
        toggleMenu() {
            this.toggle.classList.toggle('active');
            this.links.classList.toggle('active');
            document.body.style.overflow = this.links.classList.contains('active') ? 'hidden' : '';
        },
        
        closeMenu() {
            this.toggle?.classList.remove('active');
            this.links?.classList.remove('active');
            document.body.style.overflow = '';
        },
        
        setActiveLink() {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            
            document.querySelectorAll('.nav-link').forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                    link.classList.add('active');
                }
            });
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Navbar.init());
    } else {
        Navbar.init();
    }
})();
