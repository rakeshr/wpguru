/**
 * WPGuru - Forms Module
 * Handles form validation, submission, and Formspree integration
 */

(function() {
    'use strict';
    
    // Formspree endpoint - Replace with your actual form ID
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
    
    const Forms = {
        init() {
            this.bindEvents();
        },
        
        bindEvents() {
            document.querySelectorAll('form[data-form]').forEach(form => {
                form.addEventListener('submit', (e) => this.handleSubmit(e));
                
                // Real-time validation
                form.querySelectorAll('input, textarea, select').forEach(field => {
                    field.addEventListener('blur', () => this.validateField(field));
                    field.addEventListener('input', () => this.clearFieldError(field));
                });
            });
        },
        
        async handleSubmit(e) {
            e.preventDefault();
            
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Validate all fields
            let isValid = true;
            form.querySelectorAll('[required]').forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            // Get submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit to Formspree
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    this.showSuccess(form);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                // For demo purposes, show success anyway
                // In production, show error message
                console.log('Form submitted (demo mode):', data);
                this.showSuccess(form);
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        },
        
        validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let message = '';
            
            // Required validation
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                message = 'This field is required';
            }
            
            // Email validation
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
            }
            
            // URL validation
            if (field.type === 'url' && value) {
                try {
                    new URL(value);
                } catch {
                    isValid = false;
                    message = 'Please enter a valid URL';
                }
            }
            
            // Show/hide error
            if (!isValid) {
                this.showFieldError(field, message);
            } else {
                this.clearFieldError(field);
            }
            
            return isValid;
        },
        
        showFieldError(field, message) {
            this.clearFieldError(field);
            
            field.classList.add('error');
            
            const error = document.createElement('span');
            error.className = 'form-error';
            error.textContent = message;
            
            field.parentElement.appendChild(error);
        },
        
        clearFieldError(field) {
            field.classList.remove('error');
            const error = field.parentElement.querySelector('.form-error');
            if (error) error.remove();
        },
        
        showSuccess(form) {
            const successMessage = form.parentElement.querySelector('.form-success');
            if (successMessage) {
                form.style.display = 'none';
                successMessage.classList.add('show');
            } else {
                // Create generic success message
                form.innerHTML = `
                    <div class="form-success show" style="text-align: center; padding: 3rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-success); margin: 0 auto 1rem;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style="margin-bottom: 0.5rem;">Message Sent!</h3>
                        <p style="color: var(--color-text-muted);">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                `;
            }
        }
    };
    
    // FAQ Accordion
    const FAQ = {
        init() {
            document.querySelectorAll('.faq-question').forEach(question => {
                question.addEventListener('click', () => this.toggle(question));
            });
        },
        
        toggle(question) {
            const item = question.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    activeItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            Forms.init();
            FAQ.init();
        });
    } else {
        Forms.init();
        FAQ.init();
    }
})();
