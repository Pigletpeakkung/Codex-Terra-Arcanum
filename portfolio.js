/**
 * Thanatsitt Santisamranwilai Portfolio
 * Enhanced Interactive Portfolio Website
 * Author: Thanatsitt Santisamranwilai
 * Version: 2.0.0
 */

'use strict';

// Portfolio Application Class
class ThanatsittPortfolio {
    constructor() {
        this.config = {
            emailjs: {
                userId: 'YOUR_EMAILJS_USER_ID', // Replace with actual EmailJS User ID
                serviceId: 'YOUR_SERVICE_ID',   // Replace with actual Service ID
                templateId: 'YOUR_TEMPLATE_ID'  // Replace with actual Template ID
            },
            animations: {
                duration: 1000,
                easing: 'power2.out',
                stagger: 0.15
            },
            performance: {
                scrollThrottle: 16, // ~60fps
                resizeThrottle: 100
            }
        };

        this.state = {
            isLoaded: false,
            currentSection: 'home',
            scrollPosition: 0,
            maxScroll: 0,
            isMobile: window.innerWidth <= 768
        };

        this.elements = {};
        this.observers = {};
        this.timers = {};

        this.init();
    }

    // Initialize the portfolio
    init() {
        this.cacheElements();
        this.initializeLibraries();
        this.bindEvents();
        this.setupAnimations();
        this.initializeObservers();
        this.enhanceAccessibility();
        this.optimizePerformance();
        
        console.log('🌙 Thanatsitt Portfolio Initialized');
    }

    // Cache DOM elements for performance
    cacheElements() {
        this.elements = {
            // Navigation
            nav: $('.main-nav'),
            navLinks: $('.nav-links a'),
            mobileToggle: $('#mobileMenuToggle'),
            mobileMenu: $('.nav-links'),

            // Hero section
            hero: $('.hero'),
            heroContent: $('.hero-content'),
            typedElement: $('#typed-name'),
            statNumbers: $('.stat-number'),

            // Interactive elements
            moon: $('.moon'),
            cursor: $('#cursor'),
            particles: $('#particles-js'),
            movingLights: $('.moving-lights'),

            // Content sections
            galleryItems: $('.gallery-item'),
            projectCards: $('.project-card'),
            sectionTitles: $('.section-title'),

            // Forms and UI
            contactForm: $('#contactForm'),
            submitBtn: $('#submitBtn'),
            successMessage: $('#successMessage'),
            loadingScreen: $('#loading'),
            scrollToTop: $('#scrollToTop'),
            scrollProgress: $('.scroll-progress'),

            // Modal
            modal: $('#imageModal'),
            modalImage: $('#modalImage'),
            modalClose: $('.close')
        };
    }

    // Initialize external libraries
    initializeLibraries() {
        this.initEmailJS();
        this.initParticles();
        this.initTypedJS();
        this.initAOS();
        this.initGSAP();
    }

    // Initialize EmailJS
    initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.config.emailjs.userId);
        }
    }

    // Initialize Particles.js
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: this.state.isMobile ? 50 : 100,
                        density: { enable: true, value_area: 1000 }
                    },
                    color: { value: ["#D4AF37", "#C0C0C8", "#8B8B9A"] },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.6,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1 }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#C0C0C8",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: this.state.isMobile ? 2 : 3,
                        direction: "none",
                        random: true,
                        out_mode: "out",
                        attract: { enable: true, rotateX: 600, rotateY: 1200 }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: !this.state.isMobile, mode: "grab" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 200, line_linked: { opacity: 0.8 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Initialize Typed.js
    initTypedJS() {
        if (typeof Typed !== 'undefined' && this.elements.typedElement.length) {
            new Typed('#typed-name', {
                strings: [
                    'Thanatsitt Santisamranwilai',
                    'Cultural Navigator',
                    'AI Developer',
                    'Design Thinker',
                    'Story Weaver'
                ],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 2000,
                startDelay: 500,
                loop: false,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }

    // Initialize AOS (Animate On Scroll)
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: this.config.animations.duration,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
    }

    // Initialize GSAP animations
    initGSAP() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            this.setupGSAPAnimations();
        }
    }

    // Setup GSAP animations
    setupGSAPAnimations() {
        // Hero parallax
        gsap.to('.hero-content', {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Gallery items stagger animation
        gsap.set('.gallery-item', { y: 100, opacity: 0 });
        ScrollTrigger.batch('.gallery-item', {
            onEnter: (elements) => {
                gsap.to(elements, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: this.config.animations.stagger,
                    ease: this.config.animations.easing
                });
            },
            start: "top 85%"
        });

        // Project cards animation
        gsap.set('.project-card', { y: 80, opacity: 0 });
        ScrollTrigger.batch('.project-card', {
            onEnter: (elements) => {
                gsap.to(elements, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                });
            },
            start: "top 80%"
        });

        // Section titles reveal
        this.elements.sectionTitles.each((index, title) => {
            gsap.fromTo(title, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: this.config.animations.easing,
                    scrollTrigger: {
                        trigger: title,
                        start: "top 85%"
                    }
                }
            );
        });
    }

    // Bind all event listeners
    bindEvents() {
        this.bindNavigationEvents();
        this.bindScrollEvents();
        this.bindInteractionEvents();
        this.bindFormEvents();
        this.bindKeyboardEvents();
        this.bindResizeEvents();
    }

    // Navigation events
    bindNavigationEvents() {
        // Smooth scrolling for navigation links
        this.elements.navLinks.on('click', (e) => {
            e.preventDefault();
            const target = $(e.currentTarget.getAttribute('href'));
            if (target.length) {
                this.smoothScrollTo(target.offset().top - 80);
                this.closeMobileMenu();
            }
        });

        // Mobile menu toggle
        this.elements.mobileToggle.on('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu on link click
        this.elements.mobileMenu.find('a').on('click', () => {
            this.closeMobileMenu();
        });
    }

    // Scroll events
    bindScrollEvents() {
        let scrollTimeout;
        $(window).on('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, this.config.performance.scrollThrottle);
        });
    }

    // Handle scroll functionality
    handleScroll() {
        const scrollPos = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollPos / docHeight) * 100;

        this.state.scrollPosition = scrollPos;

        // Update scroll progress
        this.elements.scrollProgress.css('width', scrollPercent + '%');

        // Navigation background on scroll
        if (scrollPos > 100) {
            this.elements.nav.addClass('scrolled');
        } else {
            this.elements.nav.removeClass('scrolled');
        }

        // Show/hide scroll to top button
        if (scrollPos > 500) {
            this.elements.scrollToTop.addClass('visible');
        } else {
            this.elements.scrollToTop.removeClass('visible');
        }

        // Update active navigation
        this.updateActiveNavigation();

        // Track scroll depth for analytics
        this.trackScrollDepth(scrollPercent);
    }

    // Update active navigation based on scroll position
    updateActiveNavigation() {
        this.elements.navLinks.removeClass('active');
        this.elements.navLinks.each((index, link) => {
            const $link = $(link);
            const target = $($link.attr('href'));
            if (target.length) {
                const targetTop = target.offset().top;
                const targetBottom = targetTop + target.height();
                if (this.state.scrollPosition + 150 >= targetTop && 
                    this.state.scrollPosition + 150 < targetBottom) {
                    $link.addClass('active');
                    this.state.currentSection = $link.attr('href').substring(1);
                }
            }
        });
    }

    // Interaction events
    bindInteractionEvents() {
        // Custom cursor
        this.initCustomCursor();

        // Moon interaction
        this.initMoonInteraction();

        // Magnetic effects
        this.initMagneticEffects();

        // Gallery and project interactions
        this.initContentInteractions();

        // Scroll to top
        this.elements.scrollToTop.on('click', () => {
            this.smoothScrollTo(0);
        });
    }

    // Custom cursor functionality
    initCustomCursor() {
        if (this.state.isMobile) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        $(document).on('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            this.elements.cursor.css({
                left: cursorX + 'px',
                top: cursorY + 'px'
            });
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor hover effects
        $('.gallery-item, .project-card, .cta-button, .project-link, .nav-links a, .tag, .tech-tag')
            .on('mouseenter', () => this.elements.cursor.addClass('hover'))
            .on('mouseleave', () => this.elements.cursor.removeClass('hover'));

        // Cursor click effect
        $(document)
            .on('mousedown', () => this.elements.cursor.addClass('click'))
            .on('mouseup', () => this.elements.cursor.removeClass('click'));
    }

    // Moon interaction
    initMoonInteraction() {
        // Parallax effect
        $(document).on('mousemove', (e) => {
            if (this.state.isMobile) return;
            
            const mouseX = (e.clientX / window.innerWidth) - 0.5;
            const mouseY = (e.clientY / window.innerHeight) - 0.5;
            
            gsap.to('.moon', {
                x: mouseX * 30,
                y: mouseY * 30,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        // Click effect
        this.elements.moon.on('click', () => {
            this.createMoonSparkles();
        });

        // Hover effect
        this.elements.moon
            .on('mouseenter', () => {
                gsap.to('.moon', { scale: 1.1, duration: 0.3 });
            })
            .on('mouseleave', () => {
                gsap.to('.moon', { scale: 1, duration: 0.3 });
            });
    }

    // Create sparkle effect for moon
    createMoonSparkles() {
        const moonRect = this.elements.moon[0].getBoundingClientRect();
        const centerX = moonRect.left + moonRect.width / 2;
        const centerY = moonRect.top + moonRect.height / 2;

        for (let i = 0; i < 12; i++) {
            const sparkle = $('<div class="sparkle">✨</div>');
            $('body').append(sparkle);
            
            gsap.set(sparkle, {
                position: 'fixed',
                left: centerX,
                top: centerY,
                fontSize: '20px',
                pointerEvents: 'none',
                zIndex: 9999
            });
            
            gsap.to(sparkle, {
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                opacity: 0,
                scale: 0,
                rotation: Math.random() * 360,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => sparkle.remove()
            });
        }

        // Moon scale animation
        gsap.to('.moon', {
            scale: 1.3,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }

    // Magnetic effects for interactive elements
    initMagneticEffects() {
        if (this.state.isMobile) return;

        const magneticElements = $('.cta-button, .project-link, .submit-btn');
        
        magneticElements.each((index, element) => {
            const $element = $(element);
            
            $element.on('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(element, {
                    x: x * 0.15,
                    y: y * 0.15,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            $element.on('mouseleave', () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // Content interactions
    initContentInteractions() {
        // Gallery item clicks
        this.elements.galleryItems.on('click', (e) => {
            const imageSrc = $(e.currentTarget).find('img').attr('src').replace('w=400', 'w=800');
            this.openModal(imageSrc);
        });

        // Tag hover effects
        $('.tag, .tech-tag').on('mouseenter', function() {
            gsap.to(this, { scale: 1.05, y: -3, duration: 0.2 });
        }).on('mouseleave', function() {
            gsap.to(this, { scale: 1, y: 0, duration: 0.2 });
        });

        // Enhanced gallery hover
        this.elements.galleryItems.on('mouseenter', function() {
            $(this).find('.tag').each((index, tag) => {
                setTimeout(() => $(tag).addClass('tag-hover'), index * 100);
            });
        }).on('mouseleave', function() {
            $(this).find('.tag').removeClass('tag-hover');
        });
    }

    // Form events
    bindFormEvents() {
        // Real-time validation
        $('.form-input, .form-textarea').on('input blur', () => {
            this.validateForm();
        });

        // Form submission
        this.elements.contactForm.on('submit', (e) => {
            this.handleFormSubmission(e);
        });
    }

    // Keyboard events
    bindKeyboardEvents() {
        $(document).on('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    this.closeMobileMenu();
                    break;
                case 'Tab':
                    this.elements.cursor.hide();
                    break;
            }
        });

        $(document).on('mousemove', () => {
            this.elements.cursor.show();
        });

        // Enhanced keyboard navigation for interactive elements
        $('.gallery-item, .project-card').on('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(e.currentTarget).click();
            }
        });
    }

    // Resize events
    bindResizeEvents() {
        let resizeTimeout;
        $(window).on('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, this.config.performance.resizeThrottle);
        });
    }

    // Handle window resize
    handleResize() {
        const wasMobile = this.state.isMobile;
        this.state.isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== this.state.isMobile) {
            // Reinitialize particles with new settings
            this.initParticles();
            
            // Update cursor visibility
            if (this.state.isMobile) {
                this.elements.cursor.hide();
            } else {
                this.elements.cursor.show();
            }
        }
    }

    // Setup intersection observers
    initializeObservers() {
        this.setupCounterObserver();
        this.setupImageObserver();
        this.setupAnimationObserver();
    }

    // Counter animation observer
    setupCounterObserver() {
        this.observers.counter = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = parseInt(entry.target.dataset.count);
                    this.animateCounter($(entry.target), target);
                }
            });
        }, { threshold: 0.5 });

        this.elements.statNumbers.each((index, element) => {
            this.observers.counter.observe(element);
        });
    }

    // Image lazy loading observer
    setupImageObserver() {
        this.observers.image = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        this.observers.image.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            this.observers.image.observe(img);
        });
    }

    // Animation observer for enhanced effects
    setupAnimationObserver() {
        this.observers.animation = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.gallery-item, .project-card, .section-title').forEach(el => {
            this.observers.animation.observe(el);
        });
    }

    // Setup animations
    setupAnimations() {
        // Hide loading screen
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 2500);

        // Preload critical images
        this.preloadImages();
    }

    // Hide loading screen with animation
    hideLoadingScreen() {
        gsap.to(this.elements.loadingScreen, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                this.elements.loadingScreen.remove();
                this.state.isLoaded = true;
                
                // Trigger entrance animations
                gsap.fromTo('.hero-content', 
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
                );
            }
        });
    }

    // Preload critical images
    preloadImages() {
        const imageUrls = [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
            'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
            'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=400&h=250&fit=crop'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    // Utility Functions
    
    // Smooth scroll to position
    smoothScrollTo(position) {
        $('html, body').animate({
            scrollTop: position
        }, 1000, 'easeInOutCubic');
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        this.elements.mobileToggle.toggleClass('active');
        this.elements.mobileMenu.toggleClass('active');
    }

    // Close mobile menu
    closeMobileMenu() {
        this.elements.mobileToggle.removeClass('active');
        this.elements.mobileMenu.removeClass('active');
    }

    // Animate counter
    animateCounter($element, target) {
        const counter = { value: 0 };
        gsap.to(counter, {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
                $element.text(Math.round(counter.value));
            }
        });
    }

    // Modal Functions
    
    // Open modal with image
    openModal(imageSrc) {
        this.elements.modal.css('display', 'flex').hide().fadeIn(300);
        this.elements.modal.attr('aria-hidden', 'false');
        this.elements.modalImage.attr('src', imageSrc);
        $('body').css('overflow', 'hidden');
        
        // Animate modal content
        gsap.fromTo('.modal-content', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
    }

    // Close modal
    closeModal() {
        gsap.to('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                this.elements.modal.fadeOut(200);
                this.elements.modal.attr('aria-hidden', 'true');
                $('body').css('overflow', 'auto');
            }
        });
    }

    // Form Functions
    
    // Validate form
    validateForm() {
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        
        let isValid = true;
        
        // Name validation
        if (name.length < 2) {
            this.showFieldError('#name', 'Name must be at least 2 characters');
            isValid = false;
        } else {
            this.showFieldSuccess('#name');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFieldError('#email', 'Please enter a valid email address');
            isValid = false;
        } else {
            this.showFieldSuccess('#email');
        }
        
        // Subject validation
        if (subject.length < 5) {
            this.showFieldError('#subject', 'Subject must be at least 5 characters');
            isValid = false;
        } else {
            this.showFieldSuccess('#subject');
        }
        
        // Message validation
        if (message.length < 10) {
            this.showFieldError('#message', 'Message must be at least 10 characters');
            isValid = false;
        } else {
            this.showFieldSuccess('#message');
        }
        
        return isValid;
    }

    // Show field error
    showFieldError(fieldSelector, message) {
        const field = $(fieldSelector);
        field.css('border-color', '#ff6b6b');
        field.siblings('.error-message').remove();
        field.after(`<div class="error-message" style="color: #ff6b6b; font-size: 0.8rem; margin-top: 0.5rem;">${message}</div>`);
    }

    // Show field success
    showFieldSuccess(fieldSelector) {
        const field = $(fieldSelector);
        field.css('border-color', '#51cf66');
        field.siblings('.error-message').remove();
    }

    // Handle form submission
    async handleFormSubmission(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        const originalText = this.elements.submitBtn.html();
        
        // Show loading state
        this.elements.submitBtn.prop('disabled', true)
                              .html('<i class="fas fa-spinner fa-spin"></i> Sending Message...');
        
        const formData = {
            from_name: $('#name').val(),
            from_email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val(),
            to_name: 'Thanatsitt'
        };
        
        try {
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(
                    this.config.emailjs.serviceId,
                    this.config.emailjs.templateId,
                    formData
                );
            } else {
                // Simulate API call for demo
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            
            // Show success
            this.elements.successMessage.slideDown(400);
            this.elements.contactForm[0].reset();
            
            // Reset form styles
            $('.form-input, .form-textarea').css('border-color', 'rgba(255, 255, 255, 0.2)');
            $('.error-message').remove();
            
            // Success button state
            this.elements.submitBtn.html('<i class="fas fa-check-circle"></i> Message Sent Successfully!');
            
            // Reset after delay
            setTimeout(() => {
                this.elements.submitBtn.prop('disabled', false).html(originalText);
                this.elements.successMessage.slideUp(400);
            }, 5000);
            
            // Track success
            this.trackEvent('form_submit', 'Contact', 'Success');
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormError('Sorry, there was an error sending your message. Please try again or contact me directly at thanattsitt.info@yahoo.co.uk');
            this.elements.submitBtn.prop('disabled', false).html(originalText);
        }
    }

    // Show form error
    showFormError(message) {
        const errorMsg = $(`<div class="error-message" style="background: rgba(255, 107, 107, 0.2); color: #ff6b6b; padding: 1rem; border-radius: 10px; margin-top: 1rem; border: 1px solid rgba(255, 107, 107, 0.3);">${message}</div>`);
        this.elements.contactForm.append(errorMsg);
        
        setTimeout(() => {
            errorMsg.fadeOut(400, function() {
                $(this).remove();
            });
        }, 8000);
    }

    // Accessibility enhancements
    enhanceAccessibility() {
        // Add skip links
        if (!$('.skip-link').length) {
            $('body').prepend('<a href="#main-content" class="skip-link">Skip to main content</a>');
        }
        
        // Enhance focus indicators
        $('a, button, input, textarea, [tabindex]')
            .on('focus', function() { $(this).addClass('focus-visible'); })
            .on('blur', function() { $(this).removeClass('focus-visible'); });
        
        // Add ARIA live region
        if (!$('#live-region').length) {
            $('body').append('<div id="live-region" aria-live="polite" aria-atomic="true" style="position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;"></div>');
        }
    }

    // Performance optimizations
    optimizePerformance() {
        // Optimize for reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (typeof gsap !== 'undefined') {
                gsap.globalTimeline.timeScale(0.1);
            }
            this.elements.movingLights.hide();
        }
        
        // Optimize particles for mobile
        if (this.state.isMobile) {
            this.elements.movingLights.hide();
        }
    }

    // Analytics and tracking
    trackEvent(action, category, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }

    // Track scroll depth
    trackScrollDepth(scrollPercent) {
        if (scrollPercent > this.state.maxScroll) {
            this.state.maxScroll = scrollPercent;
            
            // Track milestone scrolls
            if ([25, 50, 75, 90].includes(Math.round(scrollPercent))) {
                this.trackEvent('scroll', 'Engagement', `${Math.round(scrollPercent)}%`);
            }
        }
    }

    // Public API methods
    
    // Get current state
    getState() {
        return { ...this.state };
    }

    // Update configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    // Destroy instance
    destroy() {
        // Remove event listeners
        $(window).off('scroll resize');
        $(document).off('mousemove keydown');
        
        // Disconnect observers
        Object.values(this.observers).forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });
        
        // Clear timers
        Object.values(this.timers).forEach(timer => {
            clearTimeout(timer);
        });
        
        console.log('🌙 Portfolio instance destroyed');
    }
}

// Initialize portfolio when DOM is ready
$(document).ready(() => {
    // Create global portfolio instance
    window.ThanatsittPortfolio = new ThanatsittPortfolio();
    
    // Global modal functions for backward compatibility
    window.openModal = (imageSrc) => {
        window.ThanatsittPortfolio.openModal(imageSrc);
    };
    
    window.closeModal = () => {
        window.ThanatsittPortfolio.closeModal();
    };
    
    // Close modal on outside click
    $(window).on('click', (event) => {
        if (event.target.id === 'imageModal') {
            window.ThanatsittPortfolio.closeModal();
        }
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThanatsittPortfolio;
}

console.log('🌙 Portfolio.js loaded successfully');
console.log('✨ Bridging ancient wisdom with modern technology');
