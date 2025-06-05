/**
 * Thanatsitt Portfolio - Enhanced Interactive Features
 * Optimized for your live Netlify deployment
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌙 Thanatsitt Portfolio Loading...');
    
    // Initialize all features
    initializePortfolio();
    
    console.log('✨ Portfolio Enhanced Successfully!');
});

function initializePortfolio() {
    
    // 1. Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
        console.log('✅ AOS Animation initialized');
    }

    // 2. Initialize Particles.js Background
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: window.innerWidth <= 768 ? 40 : 80,
                    density: { enable: true, value_area: 800 }
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
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
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
        console.log('✅ Particles.js background initialized');
    }

    // 3. Initialize Typed.js for Hero Name Animation
    if (typeof Typed !== 'undefined') {
        const typedElement = document.getElementById('typed-name');
        if (typedElement) {
            new Typed('#typed-name', {
                strings: [
                    'Thanatsitt Santisamranwilai',
                    'Cultural Navigator',
                    'AI Developer & Designer',
                    'Story Weaver',
                    'Bridge Builder',
                    'Thai-British Creator'
                ],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 2000,
                startDelay: 500,
                loop: false,
                showCursor: true,
                cursorChar: '|'
            });
            console.log('✅ Typed.js name animation initialized');
        }
    }

    // 4. Enhanced Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('📱 Mobile menu toggled');
        });
    }

    // 5. Smooth Scrolling Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileToggle) mobileToggle.classList.remove('active');
                if (navLinks) navLinks.classList.remove('active');
                
                console.log(`🔗 Navigated to ${targetId}`);
            }
        });
    });

    // 6. Enhanced Scroll Effects
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollPos = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollPos / docHeight) * 100, 100);
        
        // Update scroll progress bar
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
        
        // Navigation background on scroll
        const mainNav = document.querySelector('.main-nav');
        if (mainNav) {
            if (scrollPos > 100) {
                mainNav.classList.add('scrolled');
            } else {
                mainNav.classList.remove('scrolled');
            }
        }
        
        // Show/hide scroll to top button
        const scrollToTop = document.querySelector('.scroll-to-top');
        if (scrollToTop) {
            if (scrollPos > 500) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        }
        
        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // 7. Scroll to Top Button
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('⬆️ Scrolled to top');
        });
    }

    // 8. Gallery Modal Functions
    window.openModal = function(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        if (modal && modalImage) {
            modal.style.display = 'flex';
            modalImage.src = imageSrc;
            document.body.style.overflow = 'hidden';
            console.log('🖼️ Modal opened');
        }
    };

    window.closeModal = function() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log('❌ Modal closed');
        }
    };

    // Modal event listeners
    const closeBtn = document.querySelector('.close');
    const modal = document.getElementById('imageModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // 9. Enhanced Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
            
            // Simulate form submission (replace with actual EmailJS)
            setTimeout(() => {
                showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                console.log('📧 Contact form submitted');
            }, 2000);
        });
    }

    // 10. Custom Cursor (Desktop Only)
    if (window.innerWidth > 768) {
        const cursor = document.getElementById('cursor');
        if (cursor) {
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.1;
                cursorY += (mouseY - cursorY) * 0.1;
                
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';
                
                requestAnimationFrame(animateCursor);
            }
            animateCursor();
            
            // Cursor hover effects
            const hoverElements = document.querySelectorAll('.gallery-item, .project-card, .cta-button, .project-link, .nav-links a');
            hoverElements.forEach(element => {
                element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
            
            console.log('🖱️ Custom cursor initialized');
        }
    }

    // 11. Interactive Moon Effect
    const moon = document.querySelector('.moon');
    if (moon) {
        moon.addEventListener('click', function() {
            createSparkleEffect(this);
            console.log('🌙 Moon clicked - sparkles created!');
        });
        
        moon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                createSparkleEffect(this);
            }
        });
    }

    // 12. Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // 13. Hide Loading Screen
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 800);
            console.log('⏳ Loading screen hidden');
        }
    }, 2500);

    // 14. Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            if (mobileToggle) mobileToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        }
    });

    // 15. Enhanced Tag Interactions
    const tags = document.querySelectorAll('.tag, .tech-tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('✅ All portfolio features initialized successfully');
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}-message`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    const form = document.getElementById('contactForm');
    if (form) {
        // Remove existing messages
        const existingMessages = form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        form.appendChild(messageDiv);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟', '✦', '🌙'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: ${20 + Math.random() * 10}px;
            pointer-events: none;
            z-index: 9999;
            color: #D4AF37;
            animation: sparkleFloat 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count) || parseInt(element.textContent);
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOutCubic * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize GSAP animations if available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in animations for gallery items
    gsap.utils.toArray('.gallery-item').forEach((item, index) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Project cards animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: index * 0.2,
                scrollTrigguer: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    console.log('✅ GSAP animations initialized');
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: scale(1) rotate(0deg) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) rotate(360deg) translateY(-100px);
        }
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 10px;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInUp 0.3s ease;
        transition: opacity 0.3s ease;
    }
    
    .success-message {
        background: rgba(76, 175, 80, 0.2);
        color: #4CAF50;
        border: 1px solid rgba(76, 175, 80, 0.3);
    }
    
    .error-message {
        background: rgba(244, 67, 54, 0.2);
        color: #f44336;
        border: 1px solid rgba(244, 67, 54, 0.3);
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleCSS;
document.head.appendChild(styleSheet);

console.log('🌙 Thanatsitt Portfolio JavaScript Loaded Successfully!');
console.log('✨ Ready to bridge cultures and create digital magic!');
