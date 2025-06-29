// EcoWaste - Main JavaScript File
// Dynamic functionality, animations, and interactions

class EcoWasteApp {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.generateMarketplaceItems();
        this.setupAnimations();
        this.initHeroCanvas();
    }

    init() {
        // Initialize app state
        this.marketplaceItems = [];
        this.filteredItems = [];
        this.currentFilter = 'all';
        this.itemsPerPage = 6;
        this.currentPage = 1;
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
        
        // Marketplace
        this.setupMarketplace();
        
        // Scroll effects
        this.setupScrollEffects();
        
        // Mobile menu
        this.setupMobileMenu();
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            const headerHeight = document.querySelector('.header').offsetHeight;
            
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

    setupModals() {
        const modals = document.querySelectorAll('.modal');
        const signInUpBtn = document.getElementById('signInUpBtn');
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');

        // Open modals
        signInUpBtn.addEventListener('click', () => this.openModal('loginModal'));
        
        // Switch between Sign In and signup
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('loginModal');
            this.openModal('signupModal');
        });
        
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            this.closeModal('signupModal');
            this.openModal('loginModal');
        });

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
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    setupForms() {
        // Sell form
        const sellForm = document.getElementById('sellForm');
        const fileUploadArea = document.getElementById('fileUploadArea');
        const deviceImages = document.getElementById('deviceImages');
        const uploadedImages = document.getElementById('uploadedImages');

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

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactFormSubmission(contactForm);
        });

        // Newsletter subscription
        const newsletter = document.querySelector('.newsletter');
        newsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubscription(newsletter);
        });

        // Hero buttons
        document.getElementById('startSellingBtn').addEventListener('click', () => {
            document.getElementById('sell').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('browseBidsBtn').addEventListener('click', () => {
            document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' });
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

        // Add to marketplace
        this.marketplaceItems.unshift(deviceData);
        this.filterItems(this.currentFilter);
        this.renderMarketplaceItems();

        // Show success message
        this.showToast('Device listed successfully! Buyers can now place bids.', 'success');
        
        // Reset form
        form.reset();
        document.getElementById('uploadedImages').innerHTML = '';
        
        // Scroll to marketplace
        document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' });
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

    setupMarketplace() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.filterItems(category);
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Load more button
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMoreItems();
        });
    }

    generateMarketplaceItems() {
        const categories = ['mobile', 'audio', 'computing', 'gaming'];
        const brands = {
            mobile: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Google'],
            audio: ['Sony', 'Bose', 'Audio-Technica', 'Sennheiser', 'JBL'],
            computing: ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS'],
            gaming: ['Sony', 'Microsoft', 'Nintendo', 'Razer', 'Logitech']
        };
        
        const models = {
            mobile: ['iPhone 12', 'Galaxy S21', 'OnePlus 9', 'Mi 11', 'Pixel 6'],
            audio: ['WH-1000XM4', 'QuietComfort 35', 'ATH-M50x', 'HD 660S', 'Flip 5'],
            computing: ['MacBook Pro', 'XPS 13', 'Pavilion', 'ThinkPad', 'ZenBook'],
            gaming: ['PlayStation 5', 'Xbox Series X', 'Switch OLED', 'DeathAdder', 'G Pro']
        };
        
        const conditions = ['excellent', 'good', 'fair', 'poor', 'broken'];
        const descriptions = [
            'Gently used device in great condition. All original accessories included.',
            'Device has minor wear but works perfectly. No major scratches or damage.',
            'Some signs of use but fully functional. Perfect for parts or repair.',
            'Device has issues but could be valuable for parts or refurbishment.',
            'Not working but contains valuable components for repair shops.'
        ];

        // Generate 20 sample items
        for (let i = 0; i < 20; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const brand = brands[category][Math.floor(Math.random() * brands[category].length)];
            const model = models[category][Math.floor(Math.random() * models[category].length)];
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            const basePrice = Math.floor(Math.random() * 50000) + 1000;
            const bidCount = Math.floor(Math.random() * 15);

            this.marketplaceItems.push({
                id: Date.now() + i,
                category,
                brand,
                model,
                condition,
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                price: basePrice,
                currentBid: bidCount > 0 ? basePrice + Math.floor(Math.random() * 5000) : 0,
                bidCount,
                images: [],
                createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
            });
        }

        this.filterItems('all');
    }

    filterItems(category) {
        this.currentFilter = category;
        this.currentPage = 1;
        
        if (category === 'all') {
            this.filteredItems = [...this.marketplaceItems];
        } else {
            this.filteredItems = this.marketplaceItems.filter(item => item.category === category);
        }
        
        this.renderMarketplaceItems();
    }

    renderMarketplaceItems() {
        const grid = document.getElementById('marketplaceGrid');
        const itemsToShow = this.filteredItems.slice(0, this.currentPage * this.itemsPerPage);
        
        grid.innerHTML = itemsToShow.map(item => this.createMarketplaceItemHTML(item)).join('');
        
        // Setup item click handlers
        document.querySelectorAll('.marketplace-item').forEach(element => {
            element.addEventListener('click', () => {
                const itemId = parseInt(element.getAttribute('data-id'));
                this.showItemDetails(itemId);
            });
        });
        
        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (itemsToShow.length >= this.filteredItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    createMarketplaceItemHTML(item) {
        const icon = this.getDeviceIcon(item.category);
        const timeAgo = this.getTimeAgo(new Date(item.createdAt));
        
        return `
            <div class="marketplace-item" data-id="${item.id}">
                <div class="item-image">
                    <i class="${icon}"></i>
                </div>
                <div class="item-content">
                    <div class="item-header">
                        <h3 class="item-title">${item.brand} ${item.model}</h3>
                        <span class="item-condition condition-${item.condition}">${item.condition}</span>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-footer">
                        <div class="item-price">₹${item.currentBid > 0 ? item.currentBid.toLocaleString() : item.price.toLocaleString()}</div>
                        <div class="bid-count">
                            <i class="fas fa-gavel"></i>
                            ${item.bidCount} bid${item.bidCount !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div class="item-meta">
                        <small>Listed ${timeAgo}</small>
                    </div>
                </div>
            </div>
        `;
    }

    getDeviceIcon(category) {
        const icons = {
            mobile: 'fas fa-mobile-alt',
            audio: 'fas fa-headphones',
            computing: 'fas fa-laptop',
            gaming: 'fas fa-gamepad'
        };
        return icons[category] || 'fas fa-microchip';
    }

    getTimeAgo(date) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
        return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`;
    }

    loadMoreItems() {
        this.currentPage++;
        this.renderMarketplaceItems();
    }

    showItemDetails(itemId) {
        const item = this.marketplaceItems.find(i => i.id === itemId);
        if (!item) return;

        const modal = document.getElementById('itemModal');
        const detailsContainer = modal.querySelector('.item-details');
        
        detailsContainer.innerHTML = `
            <div class="item-detail-header">
                <h2>${item.brand} ${item.model}</h2>
                <span class="item-condition condition-${item.condition}">${item.condition}</span>
            </div>
            <div class="item-detail-content">
                <div class="item-detail-image">
                    <i class="${this.getDeviceIcon(item.category)}"></i>
                </div>
                <div class="item-detail-info">
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p><strong>Condition:</strong> ${item.condition}</p>
                    <p><strong>Description:</strong> ${item.description}</p>
                    <p><strong>Asking Price:</strong> ₹${item.price.toLocaleString()}</p>
                    ${item.currentBid > 0 ? `<p><strong>Current Highest Bid:</strong> ₹${item.currentBid.toLocaleString()}</p>` : ''}
                    <p><strong>Total Bids:</strong> ${item.bidCount}</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-primary" onclick="app.showBidModal(${item.id})">
                    <i class="fas fa-gavel"></i>
                    Place Bid
                </button>
                <button class="btn btn-secondary" onclick="app.contactSeller(${item.id})">
                    <i class="fas fa-envelope"></i>
                    Contact Seller
                </button>
            </div>
        `;
        
        this.openModal('itemModal');
    }

    showBidModal(itemId) {
        const item = this.marketplaceItems.find(i => i.id === itemId);
        if (!item) return;

        this.closeModal('itemModal');
        
        const modal = document.getElementById('bidModal');
        const currentBidSpan = modal.querySelector('.current-bid');
        const minBidSpan = modal.querySelector('.min-bid');
        const bidForm = document.getElementById('bidForm');
        
        const currentBid = item.currentBid > 0 ? item.currentBid : item.price;
        const minBid = currentBid + 100;
        
        currentBidSpan.textContent = `₹${currentBid.toLocaleString()}`;
        minBidSpan.textContent = `₹${minBid.toLocaleString()}`;
        
        document.getElementById('bidAmount').min = minBid;
        document.getElementById('bidAmount').value = minBid;
        
        // Setup bid form submission
        bidForm.onsubmit = (e) => {
            e.preventDefault();
            this.handleBidSubmission(itemId, bidForm);
        };
        
        this.openModal('bidModal');
    }

    handleBidSubmission(itemId, form) {
        const formData = new FormData(form);
        const bidAmount = parseInt(formData.get('bidAmount'));
        const bidMessage = formData.get('bidMessage');
        
        const item = this.marketplaceItems.find(i => i.id === itemId);
        if (!item) return;
        
        // Update item with new bid
        item.currentBid = bidAmount;
        item.bidCount++;
        
        this.showToast('Bid placed successfully! The seller will be notified.', 'success');
        this.closeModal('bidModal');
        this.renderMarketplaceItems();
        
        form.reset();
    }

    contactSeller(itemId) {
        this.closeModal('itemModal');
        this.showToast('Redirecting to contact form...', 'info');
        
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }

    setupScrollEffects() {
        // Parallax effect for hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-background');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });

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

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
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

        document.querySelectorAll('.stat-card, .marketplace-item, .step, .feature, .contact-method, .footer-section').forEach(el => {
            observer.observe(el);
        });
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
        const messageElement = toast.querySelector('.toast-message');
        const closeBtn = toast.querySelector('.toast-close');
        
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
        
        // Manual close
        closeBtn.onclick = () => {
            clearTimeout(autoHide);
            toast.classList.remove('show');
        };
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EcoWasteApp();
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
