/**
 * =============================================================================
 * HERO SECTION COMPONENT
 * Enhanced with GSAP cinematic animations
 * =============================================================================
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Hooks
import { useTypingAnimation } from '../../hooks/useTypingAnimation';
import { useScrollTo } from '../../hooks/useScrollTo';

// Types
interface HeroProps {
  className?: string;
}

/**
 * Hero Section Component
 */
const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const heroRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const scrollTo = useScrollTo();

  // Typing animation texts
  const typingTexts = [
    'Thanatsitt',
    'Cultural Bridge Builder',
    'AI Developer',
    'Fashion Designer',
    'Voice Artist',
    'Digital Innovator'
  ];

  const { startTyping } = useTypingAnimation(typingTexts, '.typing-text');

  useEffect(() => {
    if (!heroRef.current) return;

    // Create timeline for hero entrance
    const tl = gsap.timeline({ delay: 0.5 });

    // Set initial states
    gsap.set([greetingRef.current, titleRef.current, subtitleRef.current, buttonsRef.current, socialRef.current], {
      opacity: 0,
      y: 100
    });

    // Cinematic entrance sequence
    tl.from(greetingRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out"
    })
    .from(titleRef.current, {
      duration: 1.2,
      y: 80,
      opacity: 0,
      ease: "back.out(1.7)",
      onComplete: startTyping
    }, "-=0.5")
    .from(subtitleRef.current, {
      duration: 1,
      y: 60,
      opacity: 0,
      ease: "power2.inOut"
    }, "-=0.7")
    .from(buttonsRef.current?.children || [], {
      duration: 0.8,
      y: 40,
      opacity: 0,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .from(socialRef.current?.children || [], {
      duration: 0.6,
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      ease: "elastic.out(1, 0.3)"
    }, "-=0.3");

    // Floating animation for title
    gsap.to(titleRef.current, {
      duration: 6,
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [startTyping]);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${className}`}
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Greeting */}
          <div ref={greetingRef} className="hero-greeting mb-6">
            <p className="text-lg md:text-xl text-gold font-medium">
              <i className="fas fa-star mr-2"></i>
              Welcome to my digital universe
            </p>
          </div>

          {/* Hero Title */}
          <div ref={titleRef} className="hero-title mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              I'm <span className="typing-text bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent"></span>
              <span className="animate-pulse">|</span>
            </h1>
          </div>

          {/* Hero Subtitle */}
          <div ref={subtitleRef} className="hero-subtitle mb-12">
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Thai-British Cultural Bridge Builder & Digital Innovator
              <br />
              <span className="text-gold">Blending Eastern Heritage with Western Innovation</span>
            </p>
          </div>

          {/* Hero Buttons */}
          <div ref={buttonsRef} className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => scrollTo('portfolio')}
              className="btn-cosmic px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-briefcase mr-2"></i>
              Explore My Work
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 rounded-full border-2 border-gold text-gold font-semibold text-lg hover:bg-gold hover:text-deep-purple transition-all duration-300 hover:scale-105"
            >
              <i className="fas fa-envelope mr-2"></i>
              Get In Touch
            </button>
          </div>

          {/* Hero Social Links */}
          <div ref={socialRef} className="hero-social flex justify-center space-x-6">
            <a 
              href="https://linkedin.com/in/thanatsitt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl hover:text-gold transition-all duration-300 hover:scale-125"
              aria-label="LinkedIn Profile"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a 
              href="https://github.com/thanatsitt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl hover:text-gold transition-all duration-300 hover:scale-125"
              aria-label="GitHub Profile"
            >
              <i className="fab fa-github"></i>
            </a>
            <a 
              href="https://instagram.com/thanatsitt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl hover:text-gold transition-all duration-300 hover:scale-125"
              aria-label="Instagram Profile"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="mailto:thanattsitt.info@yahoo.co.uk"
              className="social-icon text-2xl hover:text-gold transition-all duration-300 hover:scale-125"
              aria-label="Email Contact"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a 
              href="https://pegearts.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon text-2xl hover:text-gold transition-all duration-300 hover:scale-125"
              aria-label="Portfolio Website"
            >
              <i className="fas fa-globe"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-1/4 left-1/4 w-4 h-4 bg-gold rounded-full opacity-60"></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-3 h-3 bg-moon-silver rounded-full opacity-40"></div>
        <div className="floating-element absolute bottom-1/4 left-1/3 w-5 h-5 bg-gold rounded-full opacity-50"></div>
        <div className="floating-element absolute bottom-1/3 right-1/3 w-2 h-2 bg-moon-silver rounded-full opacity-70"></div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
