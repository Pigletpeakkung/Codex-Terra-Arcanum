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
