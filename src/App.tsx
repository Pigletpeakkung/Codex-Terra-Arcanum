/**
 * =============================================================================
 * MAIN APPLICATION COMPONENT
 * Enhanced with GSAP animations and TypeScript
 * =============================================================================
 */

import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Components
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Portfolio from './components/Portfolio/Portfolio';
import Gallery from './components/Gallery/Gallery';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleSystem from './components/common/ParticleSystem';
import MoonAnimation from './components/common/MoonAnimation';
import Notification from './components/common/Notification';

// Hooks
import { useScrollPosition } from './hooks/useScrollPosition';
import { useActiveSection } from './hooks/useActiveSection';
import { useGSAPAnimations } from './hooks/useGSAPAnimations';

// Types
import { AppConfig } from './types/config';

// Configuration
import { appConfig } from './config/app.config';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

/**
 * Main App Component
 */
const App: React.FC = () => {
  const appRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useScrollPosition();
  const activeSection = useActiveSection();
  
  // Initialize GSAP animations
  useGSAPAnimations();

  useEffect(() => {
    // Set GSAP defaults
    gsap.defaults({
      duration: 0.8,
      ease: "power2.out"
    });

    // Initialize ScrollTrigger
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{appConfig.seo.title}</title>
        <meta name="description" content={appConfig.seo.description} />
        <meta name="keywords" content={appConfig.seo.keywords.join(', ')} />
        <meta name="author" content={appConfig.personal.name} />
        
        {/* Open Graph */}
        <meta property="og:title" content={appConfig.seo.title} />
        <meta property="og:description" content={appConfig.seo.description} />
        <meta property="og:image" content={appConfig.seo.ogImage} />
        <meta property="og:url" content={appConfig.seo.siteUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={appConfig.seo.title} />
        <meta name="twitter:description" content={appConfig.seo.description} />
        <meta name="twitter:image" content={appConfig.seo.twitterImage} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(appConfig.structuredData)}
        </script>
      </Helmet>

      <div 
        ref={appRef}
        className="app hero-bg text-white min-h-screen custom-scrollbar overflow-x-hidden"
      >
        {/* Background Systems */}
        <ParticleSystem />
        <MoonAnimation />

        {/* Navigation */}
        <Navigation 
          scrolled={scrollPosition > 100}
          activeSection={activeSection}
        />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Portfolio />
          <Gallery />
          <Testimonials />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Global Components */}
        <Notification />
      </div>
    </>
  );
};

export default App;
