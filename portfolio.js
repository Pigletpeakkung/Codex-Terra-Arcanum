/**
 * Thanatsitt Portfolio - Simplified Working Version
 * This version focuses on core functionality that works reliably
 */

$(document).ready(function() {
    console.log('🌙 Portfolio JavaScript Loading...');
    
    // Initialize core features
    initializePortfolio();
    
    console.log('✨ Portfolio Loaded Successfully!');
});

function initializePortfolio() {
    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        console.log('✅ AOS initialized');
    }

    // 2. Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: window.innerWidth <= 768 ? 50 : 80 },
                color: { value: ["#D4AF37", "#C0C0C8"] },
                shape: { type: "circle" },
                opacity: { value: 0.6, random: true },
                size: { value: 3, random: true },
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
                    random: true
                }
            },
            interactivity: {
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
        console.log('✅ Particles.js initialized');
    }

    // 3. Initialize Typed.js for hero name
    if (typeof Typed !== 'undefined' && $('#typed-name').length) {
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
            loop: false,
            showCursor: true
        });
        console.log('✅ Typed.js initialized');
    }

    // 4. Mobile Menu Toggle
    $('#mobileMenuToggle').click(function() {
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('active');
    });

    // 5. Smooth Scrolling
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000);
            
            // Close mobile menu
            $('#mobileMenuToggle').removeClass('active');
            $('.nav-links').removeClass('active');
        }
    });

    // 6. Scroll Effects
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollPos / docHeight) * 100;
        
        // Update scroll progress
        $('.scroll-progress').css('width', scrollPercent + '%');
        
        // Navigation background
        if (scrollPos > 100) {
            $('.main-nav').addClass('scrolled');
        } else {
            $('.main-nav').removeClass('scrolled');
        }
        
        // Scroll to top button
        if (scrollPos > 500) {
            $('.scroll-to-top').addClass('visible');
        } else {
            $('.scroll-to-top').removeClass('visible');
        }
    });

    // 7. Scroll to Top Button
    $('#scrollToTop, .scroll-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    // 8. Gallery Modal Functions
    window.openModal = function(imageSrc) {
        $('#imageModal').css('display', 'flex').hide().fadeIn(300);
        $('#modalImage').attr('src', imageSrc);
        $('body').css('overflow', 'hidden');
    };

    window.closeModal = function() {
        $('#imageModal').fadeOut(300);
        $('body').css('overflow', 'auto');
    };

    // Close modal events
    $('.close').click(closeModal);
    $('#imageModal').click(function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // 9. Contact Form
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading
        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.html();
        submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        
        // Simulate sending (replace with actual EmailJS code)
        setTimeout(function() {
            $('#successMessage').slideDown();
            $('#contactForm')[0].reset();
            submitBtn.prop('disabled', false).html(originalText);
            
            setTimeout(function() {
                $('#successMessage').slideUp();
            }, 5000);
        }, 2000);
    });

    // 10. Custom Cursor (desktop only)
    if (window.innerWidth > 768) {
        $(document).mousemove(function(e) {
            $('#cursor').css({
                left: e.clientX + 'px',
                top: e.clientY + 'px'
            });
        });

        // Cursor hover effects
        $('.gallery-item, .project-card, .cta-button').hover(
            function() { $('#cursor').addClass('hover'); },
            function() { $('#cursor').removeClass('hover'); }
        );
    }

    // 11. Moon Click Effect
    $('.moon').click(function() {
        createSparkles($(this));
    });

    // 12. Counter Animation
    $('.stat-number').each(function() {
        const $this = $(this);
        const target = parseInt($this.data('count'));
        
        // Simple counter animation
        $({ count: 0 }).animate({ count: target }, {
            duration: 2000,
            step: function() {
                $this.text(Math.floor(this.count));
            },
            complete: function() {
                $this.text(target);
            }
        });
    });

    // 13. Hide Loading Screen
    setTimeout(function() {
        $('#loading').fadeOut(1000);
    }, 2000);

    // 14. Keyboard Navigation
    $(document).keydown(function(e) {
        if (e.key === 'Escape') {
            closeModal();
            $('#mobileMenuToggle').removeClass('active');
            $('.nav-links').removeClass('active');
        }
    });

    console.log('✅ All features initialized');
}

// Utility Functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createSparkles(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟', '✦'];
    const rect = element[0].getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const sparkle = $('<div class="sparkle">')
            .text(sparkles[Math.floor(Math.random() * sparkles.length)])
            .css({
                position: 'fixed',
                left: rect.left + Math.random() * rect.width,
                top: rect.top + Math.random() * rect.height,
                fontSize: '20px',
                pointerEvents: 'none',
                zIndex: 9999,
                color: '#D4AF37'
            });
        
        $('body').append(sparkle);
        
        sparkle.animate({
            top: '-=50px',
            opacity: 0
        }, 1000, function() {
            $(this).remove();
        });
    }
}

// Initialize GSAP animations if available
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Simple fade-in animations
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
                    start: "top 80%"
                }
            }
        );
    });
    
    console.log('✅ GSAP animations initialized');
}

console.log('🌙 Portfolio.js loaded successfully');
