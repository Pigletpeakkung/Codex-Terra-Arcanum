/**
 * =============================================================================
 * THANATSITT PORTFOLIO - MAIN APPLICATION SCRIPT
 * Advanced Alpine.js application with modern JavaScript features
 * =============================================================================
 */

// =============================================================================
// GLOBAL CONFIGURATION & UTILITIES
// =============================================================================

/**
 * Global application configuration
 */
const APP_CONFIG = {
    // Animation settings
    animations: {
        typingSpeed: 100,
        typingDelay: 2000,
        scrollOffset: 100,
        intersectionThreshold: 0.1
    },
    
    // Contact form settings
    contact: {
        emailjsServiceId: 'service_your_id', // Replace with your EmailJS service ID
        emailjsTemplateId: 'template_your_id', // Replace with your EmailJS template ID
        emailjsPublicKey: 'your_public_key' // Replace with your EmailJS public key
    },
    
    // Social media links
    social: {
  linkedin: 'https://www.linkedin.com/in/thanatsitts',
  github: 'https://github.com/pigletpeakkung',
  instagram: 'https://www.instagram.com/thanatsitts',
  twitter: 'https://x.com/thanatsitts',
  email: 'thanattsitt.info@yahoo.co.uk',
  website: 'https://pegearts.com'
    }
    
    // Performance settings
    performance: {
        debounceDelay: 300,
        throttleDelay: 100,
        lazyLoadOffset: 50
    }
};

/**
 * Utility functions
 */
const Utils = {
    // Debounce function for performance optimization
    debounce(func, wait) {
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

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Smooth scroll to element
    scrollToElement(elementId, offset = 0) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Generate unique ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Sanitize HTML
    sanitizeHtml(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
};

/**
 * Toast notification system
 */
const Toast = {
    container: null,

    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 5000) {
        if (!this.container) this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${Utils.sanitizeHtml(message)}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        this.container.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);

        return toast;
    },

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};

/**
 * Analytics tracking
 */
const Analytics = {
    track(event, data = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', event, data);
        }

        // Custom analytics
        console.log('Analytics Event:', event, data);
    },

    trackPageView(page) {
        this.track('page_view', { page_title: page });
    },

    trackContact(method) {
        this.track('contact', { method });
    },

    trackProjectView(projectId) {
        this.track('project_view', { project_id: projectId });
    },

    trackSkillInteraction(skill) {
        this.track('skill_interaction', { skill_name: skill });
    }
};

// =============================================================================
// MAIN ALPINE.JS APPLICATION
// =============================================================================

/**
 * Main portfolio application
 */
function portfolioApp() {
    return {
        // =============================================================================
        // STATE MANAGEMENT
        // =============================================================================
        
        // Navigation state
        scrolled: false,
        mobileMenuOpen: false,
        currentSection: 'home',
        
        // Typing animation state
        typedText: '',
        typingIndex: 0,
        typingTexts: [
            'Thanatsitt',
            'Cultural Bridge Builder',
            'AI Developer',
            'Fashion Designer',
            'Voice Artist',
            'Digital Innovator'
        ],
        currentTextIndex: 0,
        isTyping: true,
        
        // Portfolio state
        portfolioFilter: 'all',
        projectModal: {
            show: false,
            project: null
        },
        
        // Contact form state
        contactForm: {
            name: '',
            email: '',
            subject: '',
            message: '',
            loading: false
        },
        contactStatus: {
            show: false,
            type: 'success',
            message: ''
        },
        
        // Performance tracking
        intersectionObserver: null,
        scrollThrottled: null,

        // =============================================================================
        // DATA COLLECTIONS
        // =============================================================================
        
        /**
         * Portfolio projects data
         */
        projects: [
            {
                id: 1,
                title: 'AI-Powered Cultural Translation Platform',
                category: 'AI Development',
                categoryColor: 'bg-blue-500/20 text-blue-400',
                description: 'Revolutionary AI system that preserves cultural nuances in real-time translation, bridging communication gaps between Thai and English speakers.',
                fullDescription: 'This groundbreaking AI platform combines natural language processing with deep cultural understanding to provide translations that maintain emotional context, cultural references, and subtle meanings often lost in traditional translation systems. The platform has been trained on thousands of cultural texts and conversations.',
                year: '2024',
                role: 'Lead AI Developer & Cultural Consultant',
                client: 'International Cultural Exchange Foundation',
                technologies: ['Python', 'TensorFlow', 'Natural Language Processing', 'Cultural AI', 'REST API'],
                features: [
                    'Real-time cultural context preservation',
                    'Emotion-aware translation algorithms',
                    'Cultural reference database integration',
                    'Multi-dialect support for Thai languages',
                    'Continuous learning from user feedback'
                ],
                icon: 'fas fa-robot',
                link: 'https://github.com/thanatsitt/cultural-ai',
                filter: 'ai'
            },
            {
                id: 2,
                title: 'Sustainable Thai Silk Fashion Line',
                category: 'Fashion Design',
                categoryColor: 'bg-purple-500/20 text-purple-400',
                description: 'Contemporary fashion collection celebrating traditional Thai silk craftsmanship with modern sustainable practices and innovative design techniques.',
                fullDescription: 'This collection represents a harmonious blend of ancient Thai silk weaving traditions with contemporary sustainable fashion practices. Each piece tells a story of cultural heritage while addressing modern environmental concerns through innovative eco-friendly production methods.',
                year: '2023',
                role: 'Creative Director & Designer',
                client: 'London Fashion Week',
                technologies: ['Sustainable Materials', 'Traditional Weaving', 'Modern Tailoring', 'Eco-Dyeing'],
                features: [
                    'Zero-waste pattern design',
                    'Traditional Thai silk integration',
                    'Modern silhouette adaptation',
                    'Eco-friendly dyeing processes',
                    'Cultural storytelling through design'
                ],
                icon: 'fas fa-tshirt',
                link: 'https://pegearts.com/fashion',
                filter: 'fashion'
            },
            {
                id: 3,
                title: 'Cross-Cultural Brand Strategy for Tech Startup',
                category: 'Cultural Consulting',
                categoryColor: 'bg-green-500/20 text-green-400',
                description: 'Comprehensive cultural consulting project helping a Silicon Valley startup successfully enter Asian markets with culturally sensitive branding.',
                fullDescription: 'Led a comprehensive cultural transformation project for a major tech startup expanding into Asian markets. The project involved deep cultural research, brand adaptation strategies, and the development of culturally appropriate marketing campaigns that respected local traditions while maintaining brand integrity.',
                year: '2023',
                role: 'Senior Cultural Consultant',
                client: 'TechFlow Innovations',
                technologies: ['Cultural Research', 'Brand Strategy', 'Market Analysis', 'Localization'],
                features: [
                    'Comprehensive cultural market analysis',
                    'Brand adaptation strategies',
                    'Culturally sensitive marketing campaigns',
                    'Local partnership facilitation',
                    'Ongoing cultural training programs'
                ],
                icon: 'fas fa-globe-asia',
                link: '#',
                filter: 'consulting'
            },
            {
                id: 4,
                title: 'Multilingual Voice Acting for Educational Platform',
                category: 'Voice Acting',
                categoryColor: 'bg-yellow-500/20 text-yellow-400',
                description: 'Professional voice acting services for an international educational platform, providing narration in multiple languages and dialects.',
                fullDescription: 'Provided comprehensive voice acting services for a leading educational technology platform, creating engaging multilingual content that helps students learn about different cultures. The project required mastering various vocal techniques and cultural speech patterns.',
                year: '2024',
                role: 'Voice Artist & Cultural Advisor',
                client: 'EduGlobal Learning',
                technologies: ['Professional Recording', 'Audio Engineering', 'Multiple Languages', 'Cultural Pronunciation'],
                features: [
                    'Multi-language narration (Thai, English)',
                    'Cultural pronunciation accuracy',
                    'Emotional range adaptation',
                    'Educational content optimization',
                    'Interactive learning integration'
                ],
                icon: 'fas fa-microphone',
                link: '#',
                filter: 'voice'
            },
            {
                id: 5,
                title: 'Smart Fashion Recommendation AI',
                category: 'AI Development',
                categoryColor: 'bg-blue-500/20 text-blue-400',
                description: 'Machine learning system that provides personalized fashion recommendations based on cultural preferences, body type, and style history.',
                fullDescription: 'Developed an intelligent fashion recommendation system that combines computer vision, machine learning, and cultural understanding to provide personalized styling advice. The system learns from user preferences and cultural context to suggest outfits that are both stylish and culturally appropriate.',
                year: '2023',
                role: 'AI Developer & Fashion Consultant',
                client: 'StyleSense Technologies',
                technologies: ['Machine Learning', 'Computer Vision', 'Python', 'Fashion Analytics', 'Cultural AI'],
                features: [
                    'Personalized style recommendations',
                    'Cultural appropriateness checking',
                    'Body type optimization',
                    'Trend analysis integration',
                    'Virtual try-on capabilities'
                ],
                icon: 'fas fa-brain',
                link: 'https://github.com/thanatsitt/fashion-ai',
                filter: 'ai'
            },
            {
                id: 6,
                title: 'Traditional Craft Revival Initiative',
                category: 'Cultural Consulting',
                categoryColor: 'bg-green-500/20 text-green-400',
                description: 'Cultural preservation project documenting and revitalizing traditional Thai craftsmanship techniques for modern artisans.',
                fullDescription: 'Led a comprehensive cultural preservation initiative focused on documenting, teaching, and revitalizing traditional Thai craftsmanship techniques. The project created educational resources, workshops, and mentorship programs to ensure these valuable skills are passed to future generations.',
                year: '2024',
                role: 'Cultural Preservation Specialist',
                client: 'Thai Cultural Heritage Foundation',
                technologies: ['Cultural Documentation', 'Educational Design', 'Workshop Development', 'Mentorship Programs'],
                features: [
                    'Traditional technique documentation',
                    'Modern adaptation strategies',
                    'Artisan mentorship programs',
                    'Educational resource creation',
                    'Cultural workshop facilitation'
                ],
                icon: 'fas fa-hands',
                link: '#',
                filter: 'consulting'
            }
        ],

        /**
         * Client testimonials data
         */
        testimonials: [
            {
                id: 1,
                name: 'Sarah Chen',
                role: 'CEO, TechFlow Innovations',
                rating: 5,
                content: 'Thanatsitt\'s cultural insights were invaluable in our Asian market expansion. Their ability to bridge cultural gaps while maintaining our brand identity was exceptional. The results exceeded our expectations.',
                project: 'Cross-Cultural Brand Strategy',
                avatar: '/images/testimonials/sarah-chen.jpg'
            },
            {
                id: 2,
                name: 'Dr. James Morrison',
                role: 'Director, International Cultural Exchange Foundation',
                rating: 5,
                content: 'The AI translation platform Thanatsitt developed has revolutionized how we handle cross-cultural communications. The cultural nuance preservation is remarkable and has significantly improved our international programs.',
                project: 'AI Cultural Translation Platform',
                avatar: '/images/testimonials/james-morrison.jpg'
            },
            {
                id: 3,
                name: 'Maria Rodriguez',
                role: 'Fashion Director, London Fashion Week',
                rating: 5,
                content: 'Thanatsitt\'s sustainable Thai silk collection was one of the highlights of our show. The perfect blend of traditional craftsmanship and modern design sensibility created something truly special.',
                project: 'Sustainable Fashion Collection',
                avatar: '/images/testimonials/maria-rodriguez.jpg'
            },
            {
                id: 4,
                name: 'Alex Thompson',
                role: 'Product Manager, EduGlobal Learning',
                rating: 5,
                content: 'Working with Thanatsitt on our multilingual educational content was a game-changer. Their voice acting skills and cultural knowledge brought our lessons to life in ways we never imagined.',
                project: 'Educational Voice Acting',
                avatar: '/images/testimonials/alex-thompson.jpg'
            },
            {
                id: 5,
                name: 'Dr. Priya Patel',
                role: 'CTO, StyleSense Technologies',
                rating: 5,
                content: 'Thanatsitt\'s fashion AI recommendation system has transformed our platform. The cultural sensitivity and personalization accuracy have significantly improved user engagement and satisfaction.',
                project: 'Fashion Recommendation AI',
                avatar: '/images/testimonials/priya-patel.jpg'
            },
            {
                id: 6,
                name: 'Somchai Jaidee',
                role: 'Director, Thai Cultural Heritage Foundation',
                rating: 5,
                content: 'Thanatsitt\'s work in preserving our traditional crafts has been extraordinary. Their modern approach to cultural preservation ensures our heritage will thrive for generations to come.',
                project: 'Cultural Preservation Initiative',
                avatar: '/images/testimonials/somchai-jaidee.jpg'
            }
        ],

        // =============================================================================
        // COMPUTED PROPERTIES
        // =============================================================================
        
        /**
         * Filtered projects based on current filter
         */
        get filteredProjects() {
            if (this.portfolioFilter === 'all') {
                return this.projects;
            }
            return this.projects.filter(project => project.filter === this.portfolioFilter);
        },

        /**
         * Contact form validation
         */
        get isContactFormValid() {
            return this.contactForm.name.trim() !== '' &&
                   Utils.isValidEmail(this.contactForm.email) &&
                   this.contactForm.subject.trim() !== '' &&
                   this.contactForm.message.trim() !== '';
        },

        // =============================================================================
        // LIFECYCLE METHODS
        // =============================================================================
        
        /**
         * Initialize the application
         */
        init() {
            console.log('🚀 Portfolio App Initialized');
            
            // Initialize components
            this.initializeScrollHandling();
            this.initializeTypingAnimation();
            this.initializeIntersectionObserver();
            this.initializeEmailJS();
            this.initializeToastSystem();
            this.initializeKeyboardNavigation();
            this.initializePerformanceOptimizations();
            
            // Track page load
            Analytics.trackPageView('Portfolio Home');
            
            // Set initial section
            this.updateCurrentSection();
            
            console.log('✅ All systems initialized');
        },

        /**
         * Initialize scroll handling
         */
        initializeScrollHandling() {
            this.scrollThrottled = Utils.throttle(() => {
                this.scrolled = window.scrollY > 50;
                this.updateCurrentSection();
            }, APP_CONFIG.performance.throttleDelay);

            window.addEventListener('scroll', this.scrollThrottled);
        },

        /**
         * Initialize typing animation
         */
        initializeTypingAnimation() {
            this.startTypingAnimation();
        },

        /**
         * Initialize intersection observer for animations
         */
        initializeIntersectionObserver() {
            this.intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        Analytics.track('section_view', { section: entry.target.id });
                    }
                });
            }, {
                threshold: APP_CONFIG.animations.intersectionThreshold,
                rootMargin: '0px 0px -50px 0px'
            });

            // Observe all sections
            document.querySelectorAll('section[id]').forEach(section => {
                section.classList.add('animate-on-scroll');
                this.intersectionObserver.observe(section);
            });
        },

        /**
         * Initialize EmailJS
         */
        initializeEmailJS() {
            if (typeof emailjs !== 'undefined' && APP_CONFIG.contact.emailjsPublicKey) {
                emailjs.init(APP_CONFIG.contact.emailjsPublicKey);
                console.log('✅ EmailJS initialized');
            } else {
                console.warn('⚠️ EmailJS not available or not configured');
            }
        },

        /**
         * Initialize toast notification system
         */
        initializeToastSystem() {
            Toast.init();
        },

        /**
         * Initialize keyboard navigation
         */
        initializeKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                // ESC key closes modals
                if (e.key === 'Escape') {
                    if (this.projectModal.show) {
                        this.closeProjectModal();
                    }
                    if (this.mobileMenuOpen) {
                        this.mobileMenuOpen = false;
                    }
                }
                
                // Arrow keys for navigation
                if (e.ctrlKey || e.metaKey) {
                    switch(e.key) {
                        case 'ArrowUp':
                            e.preventDefault();
                            this.scrollToSection('home');
                            break;
                        case 'ArrowDown':
                            e.preventDefault();
                            this.scrollToSection('contact');
                            break;
                    }
                }
            });
        },

        /**
         * Initialize performance optimizations
         */
        initializePerformanceOptimizations() {
            // Preload critical images
            this.preloadCriticalImages();
            
            // Initialize lazy loading
            this.initializeLazyLoading();
            
            // Optimize animations for reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            }
        },

        // =============================================================================
        // ANIMATION METHODS
        // =============================================================================
        
        /**
         * Start typing animation
         */
        startTypingAnimation() {
            const typeText = () => {
                const currentText = this.typingTexts[this.currentTextIndex];
                
                if (this.isTyping) {
                    if (this.typingIndex < currentText.length) {
                        this.typedText += currentText.charAt(this.typingIndex);
                        this.typingIndex++;
                        setTimeout(typeText, APP_CONFIG.animations.typingSpeed);
                    } else {
                        this.isTyping = false;
                        setTimeout(typeText, APP_CONFIG.animations.typingDelay);
                    }
                } else {
                    if (this.typingIndex > 0) {
                        this.typedText = this.typedText.slice(0, -1);
                        this.typingIndex--;
                        setTimeout(typeText, APP_CONFIG.animations.typingSpeed / 2);
                    } else {
                        this.isTyping = true;
                        this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                        setTimeout(typeText, APP_CONFIG.animations.typingSpeed);
                    }
                }
            };
            
            typeText();
        },

        /**
         * Animate skill bars
         */
        animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-bar');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width') || '0%';
                    bar.style.width = width;
                }, index * 200);
            });
        },

        // =============================================================================
        // NAVIGATION METHODS
        // =============================================================================
        
        /**
         * Scroll to section
         */
        scrollToSection(sectionId) {
            Utils.scrollToElement(sectionId, 80);
            this.mobileMenuOpen = false;
            Analytics.track('navigation', { section: sectionId });
        },

        /**
         * Update current section based on scroll position
         */
        updateCurrentSection() {
            const sections = ['home', 'about', 'skills', 'portfolio', 'gallery', 'testimonials', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        if (this.currentSection !== sectionId) {
                            this.currentSection = sectionId;
                            Analytics.trackPageView(`Portfolio ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}`);
                        }
                        break;
                    }
                }
            }
        },

        // =============================================================================
        // PORTFOLIO METHODS
        // =============================================================================
        
        /**
         * Open project modal
         */
        openProjectModal(project) {
            this.projectModal.project = project;
            this.projectModal.show = true;
            document.body.style.overflow = 'hidden';
            Analytics.trackProjectView(project.id);
        },

        /**
         * Close project modal
         */
        closeProjectModal() {
            this.projectModal.show = false;
            this.projectModal.project = null;
            document.body.style.overflow = 'auto';
        },

        /**
         * Filter portfolio projects
         */
        filterProjects(filter) {
            this.portfolioFilter = filter;
            Analytics.track('portfolio_filter', { filter });
        },

        // =============================================================================
        // CONTACT FORM METHODS
        // =============================================================================
        
        /**
         * Submit contact form
         */
        async submitContactForm() {
            if (!this.isContactFormValid) {
                this.showContactStatus('error', 'Please fill in all required fields correctly.');
                return;
            }

            this.contactForm.loading = true;

            try {
                // EmailJS integration
                if (typeof emailjs !== 'undefined' && APP_CONFIG.contact.emailjsServiceId) {
                    await emailjs.send(
                        APP_CONFIG.contact.emailjsServiceId,
                        APP_CONFIG.contact.emailjsTemplateId,
                        {
                            from_name: this.contactForm.name,
                            from_email: this.contactForm.email,
                            subject: this.contactForm.subject,
                            message: this.contactForm.message,
                            to_email: APP_CONFIG.social.email
                        }
                    );

                    this.showContactStatus('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
                    this.resetContactForm();
                    Analytics.trackContact('email');
                    Toast.success('Message sent successfully!');
                } else {
                    // Fallback: mailto link
                    const mailtoLink = `mailto:${APP_CONFIG.social.email}?subject=${encodeURIComponent(this.contactForm.subject)}&body=${encodeURIComponent(`Name: ${this.contactForm.name}\nEmail: ${this.contactForm.email}\n\nMessage:\n${this.contactForm.message}`)}`;
                    window.location.href = mailtoLink;
                    
                    this.showContactStatus('success', 'Opening your email client...');
                    Analytics.trackContact('mailto');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                this.showContactStatus('error', 'Sorry, there was an error sending your message. Please try again or contact me directly.');
                Toast.error('Failed to send message. Please try again.');
            } finally {
                this.contactForm.loading = false;
            }
        },

        /**
         * Show contact form status
         */
        showContactStatus(type, message) {
            this.contactStatus.type = type;
            this.contactStatus.message = message;
            this.contactStatus.show = true;

            // Auto hide after 5 seconds
            setTimeout(() => {
                this.contactStatus.show = false;
            }, 5000);
        },

        /**
         * Reset contact form
         */
        resetContactForm() {
            this.contactForm.name = '';
            this.contactForm.email = '';
            this.contactForm.subject = '';
            this.contactForm.message = '';
        },

        // =============================================================================
        // PERFORMANCE OPTIMIZATION METHODS
        // =============================================================================
        
        /**
         * Preload critical images
         */
        preloadCriticalImages() {
            const criticalImages = [
                '/images/profile.jpg',
                '/images/hero-bg.jpg'
            ];

            criticalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        },

        /**
         * Initialize lazy loading
         */
        initializeLazyLoading() {
            if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            lazyImageObserver.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    lazyImageObserver.observe(img);
                });
            }
        },

        // =============================================================================
        // UTILITY METHODS
        // =============================================================================
        
        /**
         * Handle skill interaction
         */
        handleSkillInteraction(skill) {
            Analytics.trackSkillInteraction(skill);
            Toast.info(`${skill} - Click to learn more!`);
        },

        /**
         * Copy email to clipboard
         */
        async copyEmailToClipboard() {
            try {
                await navigator.clipboard.writeText(APP_CONFIG.social.email);
                Toast.success('Email copied to clipboard!');
                Analytics.track('email_copied');
            } catch (error) {
                console.error('Failed to copy email:', error);
                Toast.error('Failed to copy email');
            }
        },

        /**
         * Share portfolio
         */
        async sharePortfolio() {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'Thanatsitt Santisamranwilai - Portfolio',
                        text: 'Check out this amazing portfolio of a Thai-British cultural bridge builder and digital innovator!',
                        url: window.location.href
                    });
                    Analytics.track('portfolio_shared', { method: 'native' });
                } catch (error) {
                    console.error('Error sharing:', error);
                }
            } else {
                // Fallback: copy URL to clipboard
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    Toast.success('Portfolio URL copied to clipboard!');
                    Analytics.track('portfolio_shared', { method: 'clipboard' });
                } catch (error) {
                    Toast.error('Failed to copy URL');
                }
            }
        },

        /**
         * Download resume/CV
         */
        downloadResume() {
            const link = document.createElement('a');
            link.href = '/documents/Thanatsitt_Santisamranwilai_Resume.pdf';
            link.download = 'Thanatsitt_Santisamranwilai_Resume.pdf';
            link.click();
            Analytics.track('resume_downloaded');
            Toast.success('Resume download started!');
        },

        // =============================================================================
        // CLEANUP METHODS
        // =============================================================================
        
        /**
         * Cleanup when component is destroyed
         */
        destroy() {
            // Remove event listeners
            if (this.scrollThrottled) {
                window.removeEventListener('scroll', this.scrollThrottled);
            }

            // Disconnect observers
            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
            }

            // Reset body overflow
            document.body.style.overflow = 'auto';

            console.log('🧹 Portfolio App Cleaned Up');
        }
    };
}

// =============================================================================
// GLOBAL EVENT LISTENERS & INITIALIZATION
// =============================================================================

/**
 * Initialize application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 DOM Content Loaded');
    
    // Initialize toast system
    Toast.init();
    
    // Add global error handling
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        Toast.error('An unexpected error occurred. Please refresh the page.');
    });

    // Add unhandled promise rejection handling
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        Toast.error('A network error occurred. Please check your connection.');
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
            Analytics.track('performance', { load_time: loadTime });
        });
    }

    console.log('✅ Global initialization complete');
});

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        Analytics.track('page_hidden');
    } else {
        Analytics.track('page_visible');
    }
});

/**
 * Handle online/offline status
 */
window.addEventListener('online', () => {
    Toast.success('Connection restored!');
    Analytics.track('connection_restored');
});

window.addEventListener('offline', () => {
    Toast.warning('You are currently offline. Some features may not work.');
    Analytics.track('connection_lost');
});

// =============================================================================
// EXPORT FOR MODULE SYSTEMS
// =============================================================================

// For ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioApp, Utils, Toast, Analytics, APP_CONFIG };
}

// For AMD
if (typeof define === 'function' && define.amd) {
    define(() => ({ portfolioApp, Utils, Toast, Analytics, APP_CONFIG }));
}

// Global assignment
window.portfolioApp = portfolioApp;
window.PortfolioUtils = Utils;
window.Toast = Toast;
window.Analytics = Analytics;

console.log('🚀 Portfolio Application Script Loaded Successfully');


/**
 * =============================================================================
 * THANATSITT PORTFOLIO - GSAP ENHANCED APPLICATION
 * Advanced Alpine.js + GSAP application with cinematic animations
 * =============================================================================
 */

// =============================================================================
// GSAP CONFIGURATION & UTILITIES
// =============================================================================

/**
 * GSAP Animation Configuration
 */
const GSAP_CONFIG = {
    // Default animation settings
    defaults: {
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15
    },
    
    // Easing presets
    easing: {
        smooth: "power2.inOut",
        bounce: "back.out(1.7)",
        elastic: "elastic.out(1, 0.3)",
        cosmic: "power3.out",
        gentle: "sine.inOut"
    },
    
    // Animation durations
    durations: {
        fast: 0.3,
        normal: 0.8,
        slow: 1.5,
        cosmic: 2.0
    }
};

/**
 * Advanced GSAP Animation System
 */
class CosmicAnimations {
    constructor() {
        this.timeline = gsap.timeline();
        this.scrollTriggers = [];
        this.particles = [];
        this.init();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        // Set GSAP defaults
        gsap.defaults(GSAP_CONFIG.defaults);
        
        // Initialize animation systems
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initParticleSystem();
        this.initMoonAnimation();
        this.initFloatingElements();
        this.initTextAnimations();
        
        console.log('🎬 GSAP Animation System Initialized');
    }

    /**
     * Hero Section Cinematic Entrance
     */
    initHeroAnimations() {
        const heroTl = gsap.timeline({ delay: 0.5 });
        
        // Set initial states
        gsap.set(['.hero-greeting', '.hero-title', '.hero-subtitle', '.hero-buttons', '.hero-social'], {
            opacity: 0,
            y: 100
        });

        // Cinematic entrance sequence
        heroTl
            .from('.hero-greeting', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: GSAP_CONFIG.easing.cosmic
            })
            .from('.hero-title h1', {
                duration: 1.2,
                y: 80,
                opacity: 0,
                ease: GSAP_CONFIG.easing.bounce,
                onComplete: () => this.startTypingAnimation()
            }, "-=0.5")
            .from('.hero-subtitle', {
                duration: 1,
                y: 60,
                opacity: 0,
                ease: GSAP_CONFIG.easing.smooth
            }, "-=0.7")
            .from('.hero-buttons button', {
                duration: 0.8,
                y: 40,
                opacity: 0,
                stagger: 0.2,
                ease: GSAP_CONFIG.easing.bounce
            }, "-=0.5")
            .from('.hero-social a', {
                duration: 0.6,
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                ease: GSAP_CONFIG.easing.elastic
            }, "-=0.3");

        // Floating animation for hero elements
        gsap.to('.hero-title', {
            duration: 6,
            y: -10,
            repeat: -1,
            yoyo: true,
            ease: GSAP_CONFIG.easing.gentle
        });
    }

    /**
     * Advanced Typing Animation with GSAP
     */
    startTypingAnimation() {
        const texts = [
            'Thanatsitt',
            'Cultural Bridge Builder',
            'AI Developer',
            'Fashion Designer',
            'Voice Artist',
            'Digital Innovator'
        ];
        
        let currentIndex = 0;
        const typeElement = document.querySelector('.typing-text');
        
        const typeText = () => {
            const currentText = texts[currentIndex];
            
            // Type in animation
            gsap.to(typeElement, {
                duration: currentText.length * 0.05,
                text: currentText,
                ease: "none",
                onComplete: () => {
                    // Wait then type out
                    gsap.delayedCall(2, () => {
                        gsap.to(typeElement, {
                            duration: 0.5,
                            text: "",
                            ease: "none",
                            onComplete: () => {
                                currentIndex = (currentIndex + 1) % texts.length;
                                typeText();
                            }
                        });
                    });
                }
            });
        };
        
        typeText();
    }

    /**
     * Scroll-triggered animations
     */
    initScrollAnimations() {
        // About section
        ScrollTrigger.create({
            trigger: '#about',
            start: 'top 80%',
            onEnter: () => {
                gsap.from('#about .glass-morphism', {
                    duration: 1,
                    y: 80,
                    opacity: 0,
                    stagger: 0.2,
                    ease: GSAP_CONFIG.easing.cosmic
                });
            }
        });

        // Skills section with progress bars
        ScrollTrigger.create({
            trigger: '#skills',
            start: 'top 70%',
            onEnter: () => {
                this.animateSkillBars();
            }
        });

        // Portfolio section
        ScrollTrigger.create({
            trigger: '#portfolio',
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.portfolio-item', {
                    duration: 0.8,
                    y: 60,
                    opacity: 0,
                    stagger: 0.15,
                    ease: GSAP_CONFIG.easing.bounce
                });
            }
        });

        // Testimonials section
        ScrollTrigger.create({
            trigger: '#testimonials',
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.testimonial-item', {
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    stagger: 0.15,
                    ease: GSAP_CONFIG.easing.cosmic,
                    onComplete: () => this.animateTestimonialStars()
                });
            }
        });

        // Gallery section
        ScrollTrigger.create({
            trigger: '#gallery',
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.gallery-item', {
                    duration: 0.6,
                    scale: 0.8,
                    opacity: 0,
                    stagger: 0.1,
                    ease: GSAP_CONFIG.easing.elastic
                });
            }
        });

        // Contact section
        ScrollTrigger.create({
            trigger: '#contact',
            start: 'top 80%',
            onEnter: () => {
                gsap.from('.contact-form', {
                    duration: 1,
                    x: -100,
                    opacity: 0,
                    ease: GSAP_CONFIG.easing.cosmic
                });
                
                gsap.from('.contact-info', {
                    duration: 1,
                    x: 100,
                    opacity: 0,
                    ease: GSAP_CONFIG.easing.cosmic
                }, "-=0.5");
            }
        });
    }

    /**
     * Animated skill progress bars
     */
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage') || '0%';
            
            gsap.fromTo(bar, {
                width: '0%'
            }, {
                width: percentage,
                duration: 1.5,
                delay: index * 0.1,
                ease: GSAP_CONFIG.easing.cosmic,
                onUpdate: function() {
                    // Add glow effect during animation
                    bar.style.boxShadow = `0 0 20px rgba(212, 175, 55, ${this.progress()})`;
                }
            });
        });
    }

    /**
     * Testimonial star animations
     */
    animateTestimonialStars() {
        const stars = document.querySelectorAll('.testimonial-stars i');
        
        stars.forEach((star, index) => {
            gsap.from(star, {
                duration: 0.3,
                scale: 0,
                rotation: 180,
                delay: index * 0.05,
                ease: GSAP_CONFIG.easing.bounce
            });
        });
    }

    /**
     * Advanced particle system
     */
    initParticleSystem() {
        const particleContainer = document.querySelector('.particle-container');
        if (!particleContainer) return;

        // Create cosmic particles
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: radial-gradient(circle, #D4AF37, transparent);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            particleContainer.appendChild(particle);
            this.particles.push(particle);

            // Animate particle
            gsap.to(particle, {
                duration: Math.random() * 20 + 10,
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: Math.random() * 0.8 + 0.2,
                repeat: -1,
                yoyo: true,
                ease: GSAP_CONFIG.easing.gentle
            });
        }
    }

    /**
     * Enhanced moon animation
     */
    initMoonAnimation() {
        const moon = document.querySelector('.animated-moon');
        if (!moon) return;

        // Main moon rotation
        gsap.to(moon, {
            duration: 20,
            rotation: 360,
            repeat: -1,
            ease: "none"
        });

        // Moon glow effect
        gsap.to(moon, {
            duration: 4,
            filter: 'brightness(1.2) drop-shadow(0 0 30px rgba(212, 175, 55, 0.8))',
            repeat: -1,
            yoyo: true,
            ease: GSAP_CONFIG.easing.gentle
        });

        // Orbiting moon
        const orbitingMoon = document.querySelector('.orbiting-moon');
        if (orbitingMoon) {
            gsap.to(orbitingMoon, {
                duration: 15,
                rotation: 360,
                repeat: -1,
                ease: "none",
                transformOrigin: "100px 100px"
            });
        }

        // Twinkling stars around moon
        const stars = document.querySelectorAll('.moon-stars .star');
        stars.forEach((star, index) => {
            gsap.to(star, {
                duration: Math.random() * 2 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                scale: Math.random() * 0.5 + 0.5,
                repeat: -1,
                yoyo: true,
                delay: index * 0.2,
                ease: GSAP_CONFIG.easing.gentle
            });
        });
    }

    /**
     * Floating elements animation
     */
    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            gsap.to(element, {
                duration: Math.random() * 8 + 6,
                y: Math.random() * 40 - 20,
                x: Math.random() * 20 - 10,
                rotation: Math.random() * 360,
                repeat: -1,
                yoyo: true,
                delay: index * 0.5,
                ease: GSAP_CONFIG.easing.gentle
            });
        });
    }

    /**
     * Text reveal animations
     */
    initTextAnimations() {
        const textElements = document.querySelectorAll('.animate-text');
        
        textElements.forEach(element => {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 90%',
                onEnter: () => {
                    gsap.from(element, {
                        duration: 1,
                        y: 50,
                        opacity: 0,
                        ease: GSAP_CONFIG.easing.cosmic
                    });
                }
            });
        });
    }

    /**
     * Project modal animations
     */
    animateProjectModal(show = true) {
        const modal = document.querySelector('.modal-backdrop');
        const content = document.querySelector('.modal-content');
        
        if (show) {
            gsap.set(modal, { display: 'flex' });
            gsap.fromTo(modal, {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.3,
                ease: GSAP_CONFIG.easing.smooth
            });
            
            gsap.fromTo(content, {
                scale: 0.8,
                y: 100,
                opacity: 0
            }, {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: GSAP_CONFIG.easing.bounce
            });
        } else {
            gsap.to(content, {
                scale: 0.8,
                y: 100,
                opacity: 0,
                duration: 0.3,
                ease: GSAP_CONFIG.easing.smooth
            });
            
            gsap.to(modal, {
                opacity: 0,
                duration: 0.3,
                ease: GSAP_CONFIG.easing.smooth,
                onComplete: () => {
                    modal.style.display = 'none';
                }
            });
        }
    }

    /**
     * Form submission animation
     */
    animateFormSubmission(success = true) {
        const form = document.querySelector('.contact-form');
        const button = document.querySelector('.contact-submit');
        
        if (success) {
            gsap.to(form, {
                duration: 0.5,
                scale: 1.02,
                ease: GSAP_CONFIG.easing.bounce,
                yoyo: true,
                repeat: 1
            });
            
            gsap.to(button, {
                duration: 0.3,
                backgroundColor: '#10B981',
                ease: GSAP_CONFIG.easing.smooth
            });
        } else {
            gsap.to(form, {
                duration: 0.1,
                x: 10,
                ease: GSAP_CONFIG.easing.smooth,
                yoyo: true,
                repeat: 5
            });
        }
    }

    /**
     * Cleanup animations
     */
    destroy() {
        this.scrollTriggers.forEach(trigger => trigger.kill());
        this.timeline.kill();
        ScrollTrigger.killAll();
        console.log('🧹 GSAP Animations Cleaned Up');
    }
}

/**
 * Enhanced notification system with GSAP
 */
function showCosmicNotification(message, type = 'success') {
    const notification = document.getElementById('notification') || createNotificationElement();
    
    // Update notification content and style
    const icon = type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-exclamation-circle' : 
                 'fas fa-info-circle';
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="${icon} text-xl"></i>
            <p class="flex-1">${message}</p>
            <button onclick="hideCosmicNotification()" class="text-white/80 hover:text-white">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Apply type-specific styling
    notification.className = `cosmic-notification cosmic-notification-${type}`;
    
    // GSAP entrance animation
    gsap.set(notification, { display: 'block' });
    gsap.fromTo(notification, {
        y: 100,
        opacity: 0,
        scale: 0.8
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: GSAP_CONFIG.easing.bounce
    });
    
    // Auto-hide after 5 seconds
    gsap.delayedCall(5, () => hideCosmicNotification());
}

function hideCosmicNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        gsap.to(notification, {
            y: 100,
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: GSAP_CONFIG.easing.smooth,
            onComplete: () => {
                notification.style.display = 'none';
            }
        });
    }
}

function createNotificationElement() {
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = 'cosmic-notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: none;
        max-width: 400px;
        padding: 16px 20px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        font-weight: 500;
    `;
    document.body.appendChild(notification);
    return notification;
}

/**
 * Enhanced smooth scrolling with GSAP
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: element,
                offsetY: 80
            },
            ease: GSAP_CONFIG.easing.cosmic
        });
        
        // Add visual feedback
        gsap.fromTo(element, {
            backgroundColor: 'rgba(212, 175, 55, 0)'
        }, {
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: GSAP_CONFIG.easing.smooth
        });
    }
}

/**
 * Enhanced image handling with GSAP
 */
function initImageHandling() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            gsap.fromTo(this, {
                scale: 1.1,
                opacity: 0,
                filter: 'blur(5px)'
            }, {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: GSAP_CONFIG.easing.cosmic
            });
        });
        
        img.addEventListener('error', function() {
            this.parentElement.classList.add('image-fallback');
            gsap.to(this, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    this.style.display = 'none';
                }
            });
        });
    });
}

// =============================================================================
// ENHANCED ALPINE.JS APPLICATION WITH GSAP
// =============================================================================

/**
 * Enhanced portfolio application with GSAP integration
 */
function portfolioApp() {
    return {
        // ... (previous state properties remain the same)
        
        // GSAP Animation instance
        animations: null,
        
        // Enhanced initialization
        init() {
            console.log('🚀 Enhanced Portfolio App with GSAP Initialized');
            
            // Initialize GSAP animations
            this.animations = new CosmicAnimations();
            
            // Initialize other components (previous code)
            this.initializeScrollHandling();
            this.initializeIntersectionObserver();
            this.initializeEmailJS();
            this.initializeToastSystem();
            this.initializeKeyboardNavigation();
            this.initializePerformanceOptimizations();
            
            // Enhanced image handling
            initImageHandling();
            
            // Track page load
            Analytics.trackPageView('Portfolio Home');
            
            console.log('✅ All systems initialized with GSAP');
        },

        // Enhanced project modal methods
        openProjectModal(project) {
            this.projectModal.project = project;
            this.projectModal.show = true;
            document.body.style.overflow = 'hidden';
            
            // Use GSAP animation
            this.animations.animateProjectModal(true);
            
            Analytics.trackProjectView(project.id);
        },

        closeProjectModal() {
            // Use GSAP animation
            this.animations.animateProjectModal(false);
            
            // Delay state update to allow animation to complete
            gsap.delayedCall(0.3, () => {
                this.projectModal.show = false;
                this.projectModal.project = null;
                document.body.style.overflow = 'auto';
            });
        },

        // Enhanced form submission
        async submitContactForm() {
            if (!this.isContactFormValid) {
                this.animations.animateFormSubmission(false);
                showCosmicNotification('Please fill in all required fields correctly.', 'error');
                return;
            }

            this.contactForm.loading = true;

            try {
                // EmailJS integration (same as before)
                if (typeof emailjs !== 'undefined' && APP_CONFIG.contact.emailjsServiceId) {
                    await emailjs.send(
                        APP_CONFIG.contact.emailjsServiceId,
                        APP_CONFIG.contact.emailjsTemplateId,
                        {
                            from_name: this.contactForm.name,
                            from_email: this.contactForm.email,
                            subject: this.contactForm.subject,
                            message: this.contactForm.message,
                            to_email: APP_CONFIG.social.email
                        }
                    );

                    this.animations.animateFormSubmission(true);
                    showCosmicNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                    this.resetContactForm();
                    Analytics.trackContact('email');
                } else {
                    // Fallback: mailto link
                    const mailtoLink = `mailto:${APP_CONFIG.social.email}?subject=${encodeURIComponent(this.contactForm.subject)}&body=${encodeURIComponent(`Name: ${this.contactForm.name}\nEmail: ${this.contactForm.email}\n\nMessage:\n${this.contactForm.message}`)}`;
                    window.location.href = mailtoLink;
                    
                    showCosmicNotification('Opening your email client...', 'success');
                    Analytics.trackContact('mailto');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                this.animations.animateFormSubmission(false);
                showCosmicNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
            } finally {
                this.contactForm.loading = false;
            }
        },

        // Enhanced scroll to section
        scrollToSection(sectionId) {
            scrollToSection(sectionId);
            this.mobileMenuOpen = false;
            Analytics.track('navigation', { section: sectionId });
        },

        // Enhanced cleanup
        destroy() {
            // Cleanup GSAP animations
            if (this.animations) {
                this.animations.destroy();
            }
            
            // Previous cleanup code
            if (this.scrollThrottled) {
                window.removeEventListener('scroll', this.scrollThrottled);
            }

            if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
            }

            document.body.style.overflow = 'auto';

            console.log('🧹 Enhanced Portfolio App Cleaned Up');
        }
    };
}

// =============================================================================
// GLOBAL INITIALIZATION WITH GSAP
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 DOM Content Loaded - Initializing GSAP Enhanced Portfolio');
    
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Set up global GSAP settings
    gsap.config({
        nullTargetWarn: false,
        trialWarn: false
    });
    
    // Initialize enhanced toast system
    Toast.init();
    
    // Add enhanced error handling
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        showCosmicNotification('An unexpected error occurred. Please refresh the page.', 'error');
    });

    console.log('✅ GSAP Enhanced Portfolio Initialization Complete');
});

// Export enhanced functions
window.portfolioApp = portfolioApp;
window.showCosmicNotification = showCosmicNotification;
window.hideCosmicNotification = hideCosmicNotification;
window.scrollToSection = scrollToSection;
window.CosmicAnimations = CosmicAnimations;

console.log('🌟 GSAP Enhanced Portfolio Application Script Loaded Successfully');
