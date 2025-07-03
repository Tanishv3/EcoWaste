// EcoWaste - Main JavaScript File
// Dynamic functionality, animations, and interactions

class EcoWasteApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupAnimations();
        this.initHeroCanvas();
    }

    init() {
        // Initialize app state
        this.typewriterText = ['Treasure', 'Cash', 'Value', 'Opportunity'];
        this.typewriterIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        // Start animations
        this.startTypewriterEffect();
        this.startCounterAnimation();
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Modals
        this.setupModals();
        
        // Forms
        this.setupForms();
        
        // Scroll effects
        this.setupScrollEffects();
        
        // Mobile menu
        this.setupMobileMenu();
    }

    setupNavigation() {
        // Handle page-based navigation for multi-page site
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Highlight current page in navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === 'index.html' && href === 'index.html') ||
                (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Smooth scrolling for hash links (for single page navigation if needed)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Handle scroll effects for single page sections
        if (currentPage === 'index.html' || currentPage === '') {
            this.setupScrollHighlight();
        }
    }

    setupScrollHighlight() {
        // Active navigation highlighting for sections (only on home page)
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navActions = document.querySelector('.nav-actions');

        if (hamburger && navMenu && navActions) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                navActions.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    navActions.classList.remove('active');
                });
            });
        }
    }

    setupModals() {
        const modals = document.querySelectorAll('.modal');
        const signInUpBtn = document.getElementById('signInUpBtn');
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');

        // Open modals (only if button exists)
        if (signInUpBtn) {
            signInUpBtn.addEventListener('click', () => {
                const modal = document.getElementById('auth-modal');
                if (modal) {
                    modal.classList.add('show');
                }
            });
        }
        
        // Switch between Sign In and signup (only if elements exist)
        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('loginModal');
                this.openModal('signupModal');
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal('signupModal');
                this.openModal('loginModal');
            });
        }

        // Close modals
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-modal');
                this.closeModal(modalId);
            });
        });

        // Close modal when clicking outside
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Modal functionality
        const authModal = document.getElementById('auth-modal');
        const openModalButtons = document.querySelectorAll('[data-modal="auth"]');
        const closeModalButton = document.querySelector('.close-modal');
        const tabButtons = document.querySelectorAll('.tab-btn');

        // Open modal
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                authModal.classList.add('show');
            });
        });

        // Close modal
        closeModalButton.addEventListener('click', () => {
            authModal.classList.remove('show');
        });

        // Tab switching
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show the selected tab content
                const tabId = button.getAttribute('data-tab') + '-tab';
                document.getElementById(tabId).style.display = 'block';
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    setupForms() {
        // Sell form (only if exists)
        const sellForm = document.getElementById('sellForm');
        const fileUploadArea = document.getElementById('fileUploadArea');
        const deviceImages = document.getElementById('deviceImages');
        const uploadedImages = document.getElementById('uploadedImages');

        if (sellForm && fileUploadArea && deviceImages && uploadedImages) {
            // File upload functionality
            fileUploadArea.addEventListener('click', () => deviceImages.click());
            
            fileUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadArea.classList.add('drag-over');
            });
            
            fileUploadArea.addEventListener('dragleave', () => {
                fileUploadArea.classList.remove('drag-over');
            });
            
            fileUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUploadArea.classList.remove('drag-over');
                this.handleFiles(e.dataTransfer.files, uploadedImages);
            });

            deviceImages.addEventListener('change', (e) => {
                this.handleFiles(e.target.files, uploadedImages);
            });

            // Sell form submission
            sellForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSellFormSubmission(sellForm);
            });
        }

        // Contact form (only if exists)
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactFormSubmission(contactForm);
            });
        }

        // Newsletter subscription (only if exists)
        const newsletter = document.querySelector('.newsletter');
        if (newsletter) {
            newsletter.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubscription(newsletter);
            });
        }

        // Hero buttons (only if they exist)
        const startSellingBtn = document.getElementById('startSellingBtn');
        const browseBidsBtn = document.getElementById('browseBidsBtn');
        
        if (startSellingBtn) {
            startSellingBtn.addEventListener('click', () => {
                const sellSection = document.getElementById('sell');
                if (sellSection) {
                    sellSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Redirect to sell page if section doesn't exist
                    window.location.href = 'sell.html';
                }
            });
        }

        if (browseBidsBtn) {
            browseBidsBtn.addEventListener('click', () => {
                // Redirect to the sell page as marketplace is removed
                window.location.href = 'sell.html';
            });
        }

        // Sign-in/sign-up form submission
        document.getElementById('signin-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get selected role
            const role = document.querySelector('input[name="role"]:checked').value;
            
            // Store user role
            localStorage.setItem('userRole', role);
            
            // Redirect to appropriate dashboard
            if (role === 'seller') {
                window.location.href = 'seller-dashboard.html';
            } else {
                window.location.href = 'buyer-dashboard.html';
            }
        });

        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get selected role
            const role = document.querySelector('input[name="role"]:checked').value;
            
            // Store user role
            localStorage.setItem('userRole', role);
            
            // Redirect to appropriate dashboard
            if (role === 'seller') {
                window.location.href = 'seller-dashboard.html';
            } else {
                window.location.href = 'buyer-dashboard.html';
            }
        });
    }

    handleFiles(files, container) {
        Array.from(files).forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'uploaded-image';
                    imageDiv.innerHTML = `
                        <img src="${e.target.result}" alt="Device image ${index + 1}">
                        <button type="button" class="remove-image" onclick="this.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    container.appendChild(imageDiv);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    handleSellFormSubmission(form) {
        const formData = new FormData(form);
        const deviceData = {
            id: Date.now(),
            type: formData.get('deviceType'),
            brand: formData.get('deviceBrand'),
            model: formData.get('deviceModel'),
            condition: formData.get('deviceCondition'),
            description: formData.get('deviceDescription'),
            price: parseInt(formData.get('askingPrice')),
            images: Array.from(document.querySelectorAll('.uploaded-image img')).map(img => img.src),
            bids: [],
            createdAt: new Date().toISOString()
        };

        // Since marketplace is removed, just show a generic success message
        this.showToast('Device listed successfully!', 'success');
        
        // Reset form
        form.reset();
        document.getElementById('uploadedImages').innerHTML = '';
    }

    handleContactFormSubmission(form) {
        const formData = new FormData(form);
        // Simulate form submission
        setTimeout(() => {
            this.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        }, 1000);
    }

    handleNewsletterSubscription(form) {
        const formData = new FormData(form);
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        
        setTimeout(() => {
            this.showToast('Successfully subscribed to newsletter!', 'success');
            form.reset();
        }, 1000);
    }

    setupScrollEffects() {
        // Parallax effect for hero (only if hero background exists)
        const parallaxElement = document.querySelector('.hero-background');
        if (parallaxElement) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const speed = scrolled * 0.5;
                parallaxElement.style.transform = `translateY(${speed}px)`;
            });
        }

        // Fade-in animation for sections
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section');
        if (sections.length > 0) {
            sections.forEach(section => {
                observer.observe(section);
            });
        }
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1
        });

        const animatedElements = document.querySelectorAll('.stat-card, .step, .feature, .contact-method, .footer-section');
        if (animatedElements.length > 0) {
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        }
    }

    initHeroCanvas() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 2) + 1;
                const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                const directionX = (Math.random() * .4) - .2;
                const directionY = (Math.random() * .4) - .2;
                const color = 'rgba(0, 255, 155, 0.5)';
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                                   + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    
                    if (distance < (canvas.width/7) * (canvas.height/7)) {
                        opacityValue = 1 - (distance/20000);
                        ctx.strokeStyle = `rgba(0, 255, 155, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connectParticles();
        }

        initParticles();
        animate();
    }

    startTypewriterEffect() {
        const typewriterElement = document.querySelector('.typewriter-text');
        if (!typewriterElement) return;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentText = this.typewriterText[this.typewriterIndex];
            
            if (this.isDeleting) {
                typewriterElement.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let timeout = this.isDeleting ? deleteSpeed : typeSpeed;

            if (!this.isDeleting && this.charIndex === currentText.length) {
                timeout = pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.typewriterIndex = (this.typewriterIndex + 1) % this.typewriterText.length;
            }

            setTimeout(type, timeout);
        };

        type();
    }

    startCounterAnimation() {
        const counterElements = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(easeOutQuart * target);
                
                element.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(element => {
            observer.observe(element);
        });
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        if (!toast) return; // Exit if toast element doesn't exist
        
        const messageElement = toast.querySelector('.toast-message');
        const closeBtn = toast.querySelector('.toast-close');
        
        if (!messageElement) return; // Exit if message element doesn't exist
        
        messageElement.textContent = message;
        
        // Set toast color based on type
        toast.style.borderLeftColor = type === 'success' ? 'var(--success-color)' : 
                                     type === 'error' ? 'var(--error-color)' : 
                                     'var(--primary-color)';
        
        toast.classList.add('show');
        
        // Auto hide after 4 seconds
        const autoHide = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
        
        // Manual close (only if close button exists)
        if (closeBtn) {
            closeBtn.onclick = () => {
                clearTimeout(autoHide);
                toast.classList.remove('show');
            };
        }
    }
}

// Initialize app when DOM is loaded (only if components.js is not present)
document.addEventListener('DOMContentLoaded', () => {
    // Only auto-initialize if ComponentLoader is not available
    if (typeof ComponentLoader === 'undefined') {
        window.app = new EcoWasteApp();
    }
});

// Additional utility functions
const utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    },
    
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },
    
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EcoWasteApp, utils };
}
