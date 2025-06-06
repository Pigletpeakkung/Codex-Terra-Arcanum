import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import './index.css';

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  year: string;
  tags: string[];
  fullDescription: string;
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}

interface GalleryImage {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: string;
}

interface Testimonial {
  id: string;
  text: string;
  client: string;
  position: string;
  company: string;
  projectType: string;
  rating: number;
}

interface ContactForm {
  name: string;
  email: string;
  service: string;
  message: string;
}

// Components
const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 5,
  }));

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const EnhancedMoon: React.FC = () => {
  const stars = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <div className="moon-container">
      <motion.div
        className="animated-moon"
        animate={{
          scale: [1, 1.1, 1.2, 1.1, 1],
          background: [
            'radial-gradient(circle at 30% 30%, #D4AF37 0%, #F4D03F 30%, #FFF 100%)',
            'radial-gradient(circle at 40% 40%, #D4AF37 0%, #F4D03F 40%, #FFF 100%)',
            'radial-gradient(circle at 50% 50%, #D4AF37 0%, #F4D03F 50%, #FFF 100%)',
            'radial-gradient(circle at 60% 60%, #D4AF37 0%, #F4D03F 40%, #FFF 100%)',
            'radial-gradient(circle at 30% 30%, #D4AF37 0%, #F4D03F 30%, #FFF 100%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="moon-crater crater-1" />
        <div className="moon-crater crater-2" />
        <div className="moon-crater crater-3" />
      </motion.div>

      <div className="moon-stars">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="orbiting-moon"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="orbiting-moon-element" />
      </motion.div>
    </div>
  );
};

const Navigation: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'about', label: 'About', icon: 'fas fa-user' },
    { id: 'portfolio', label: 'Portfolio', icon: 'fas fa-briefcase' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-cogs' },
    { id: 'gallery', label: 'Gallery', icon: 'fas fa-images' },
    { id: 'testimonials', label: 'Reviews', icon: 'fas fa-star' },
    { id: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
  ];

  return (
    <motion.nav
      className={`navigation ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.a
          href="#"
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logo-moon">
            <div className="logo-moon-inner">
              <div className="logo-crater logo-crater-1" />
              <div className="logo-crater logo-crater-2" />
            </div>
            <motion.div
              className="logo-sparkle"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="logo-text">Thanatsitt</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="nav-menu desktop-menu">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="nav-link-text">{item.label}</span>
              <div className="nav-link-bg" />
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-bars" />
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className="mobile-nav-link"
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={item.icon} />
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const TypeWriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <motion.div className="hero-content" style={{ y }}>
        <motion.div
          className="hero-title-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="hero-title">
            <TypeWriter text="Thanatsitt" />
          </h1>
          <div className="hero-title-underline" />
        </motion.div>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Thai-British interdisciplinary creator bridging{' '}
          <span className="highlight">ancient wisdom</span> with{' '}
          <span className="highlight">modern technology</span>
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            className="btn btn-primary"
            onClick={() => scrollToSection('portfolio')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-eye" />
            Explore Portfolio
          </motion.button>

          <motion.button
            className="btn btn-secondary"
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-paper-plane" />
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          className="hero-social"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {[
            { icon: 'fab fa-linkedin', url: '#', label: 'LinkedIn' },
            { icon: 'fab fa-github', url: '#', label: 'GitHub' },
            { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
            { icon: 'fab fa-twitter', url: '#', label: 'Twitter' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              className="social-link"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              aria-label={social.label}
            >
              <i className={social.icon} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-indicator-inner">
          <div className="scroll-indicator-dot" />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="floating-element floating-element-1"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="floating-element floating-element-2"
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -2,
        }}
      />
      <motion.div
        className="floating-element floating-element-3"
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -1,
        }}
      />
    </section>
  );
};

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-underline" />
        </motion.div>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="about-grid">
            <motion.div className="about-image" variants={itemVariants}>
              <div className="glass-card">
                <div className="profile-image-placeholder">
                  <i className="fas fa-user" />
                </div>
              </div>
              
              <motion.div
                className="floating-badge floating-badge-1"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <i className="fas fa-palette" />
              </motion.div>
              
              <motion.div
                className="floating-badge floating-badge-2"
                animate={{
                  y: [10, -10, 10],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: -1,
                }}
              >
                <i className="fas fa-brain" />
              </motion.div>
            </motion.div>

            <div className="about-text">
              <motion.div className="about-card" variants={itemVariants}>
                <h3 className="about-card-title">
                  <i className="fas fa-star" />
                  Cultural Navigator
                </h3>
                <p className="about-card-text">
                  Born from the intersection of Thai heritage and British innovation, I navigate the delicate balance between preserving ancient wisdom and embracing cutting-edge technology. My journey spans continents and disciplines, always seeking to bridge cultural divides through design and technology.
                </p>
              </motion.div>

              <motion.div className="about-card" variants={itemVariants}>
                <h3 className="about-card-title">
                  <i className="fas fa-graduation-cap" />
                  Educational Journey
                </h3>
                <div className="education-list">
                  <div className="education-item">
                    <div className="education-icon">
                      <i className="fas fa-university" />
                    </div>
                    <div className="education-content">
                      <h4>London College of Fashion</h4>
                      <p>Fashion Design & Cultural Studies</p>
                    </div>
                  </div>
                  <div className="education-item">
                    <div className="education-icon">
                      <i className="fas fa-robot" />
                    </div>
                    <div className="education-content">
                      <h4>AI & Technology</h4>
                      <p>Self-taught Developer & Co-founder</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="about-card" variants={itemVariants}>
                <h3 className="about-card-title">
                  <i className="fas fa-heart" />
                  Philosophy
                </h3>
                <p className="about-card-text">
                  I believe technology should enhance human connection, not replace it. Every project I undertake is guided by principles of cultural sensitivity, ethical innovation, and the timeless wisdom that beauty and function are inseparable.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard: React.FC<{
  title: string;
  icon: string;
  color: string;
  skills: Array<{ name: string; level: number }>;
  delay: number;
}> = ({ title, icon, color, skills, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="skill-card-inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div className="skill-card-front">
          <div className="skill-card-header">
            <div className={`skill-icon ${color}`}>
              <i className={icon} />
            </div>
            <h3 className="skill-card-title">{title}</h3>
          </div>

          <div className="skill-list">
            {skills.map((skill, index) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-container">
                  <motion.div
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: delay + index * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="skill-card-back">
          <h3 className="skill-card-title">{title} Expertise</h3>
          <div className="skill-summary">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-summary-item">
                <i className="fas fa-check" />
                <span>{skill.name} - {skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const skillCategories = [
    {
      title: 'Design',
      icon: 'fas fa-palette',
      color: 'gold',
      skills: [
        { name: 'Fashion Design', level: 95 },
        { name: 'UI/UX Design', level: 88 },
        { name: 'Visual Identity', level: 92 },
      ],
    },
    {
      title: 'Technology',
      icon: 'fas fa-code',
      color: 'blue',
      skills: [
        { name: 'AI Development', level: 85 },
        { name: 'Web Development', level: 80 },
        { name: 'Video Editing', level: 78 },
      ],
    },
    {
      title: 'Communication',
      icon: 'fas fa-comments',
      color: 'green',
      skills: [
        { name: 'Voice Acting', level: 82 },
        { name: 'Writing', level: 90 },
        { name: 'Public Speaking', level: 85 },
      ],
    },
    {
      title: 'Leadership',
      icon: 'fas fa-crown',
      color: 'purple',
      skills: [
        { name: 'Team Management', level: 88 },
        { name: 'Project Planning', level: 92 },
        { name: 'Strategic Thinking', level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="section-underline" />
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              {...category}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const projects: Project[] = [
    {
      id: '1',
      title: 'Cultural AI Assistant',
      description: 'AI-powered cultural consulting platform bridging Eastern and Western business practices.',
      icon: 'fas fa-robot',
      year: '2024',
      tags: ['AI', 'Cultural Consulting', 'Python', 'NLP'],
      fullDescription: 'An innovative AI assistant designed to help international businesses navigate cultural differences between Eastern and Western markets. The platform uses advanced natural language processing to provide culturally-sensitive advice and recommendations.',
      features: [
        'Multi-language support (English, Thai, Mandarin)',
        'Cultural etiquette guidance',
        'Business practice recommendations',
        'Real-time cultural translation',
        'Interactive cultural assessment tools'
      ],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '2',
      title: 'Sustainable Fashion Collection',
      description: 'Eco-conscious fashion line blending traditional Thai craftsmanship with modern sustainable practices.',
      icon: 'fas fa-leaf',
      year: '2023',
      tags: ['Fashion Design', 'Sustainability', 'Traditional Crafts'],
      fullDescription: 'A groundbreaking fashion collection that honors traditional Thai weaving techniques while embracing modern sustainable materials and production methods.',
      features: [
        'Organic cotton and bamboo fiber materials',
        'Traditional hand-weaving techniques',
        'Zero-waste pattern design',
        'Local artisan collaboration',
        'Biodegradable packaging'
      ],
      demoUrl: '#',
    },
    {
      id: '3',
      title: 'Voice Acting Portfolio Platform',
      description: 'Interactive web platform showcasing multi-lingual voice acting capabilities across different media.',
      icon: 'fas fa-microphone',
      year: '2024',
      tags: ['Voice Acting', 'Web Design', 'Audio Production'],
      fullDescription: 'A comprehensive platform showcasing voice acting work across multiple languages and media formats, featuring interactive audio samples and booking capabilities.',
      features: [
        'Multi-language audio samples',
        'Character voice demonstrations',
        'Commercial and narrative portfolio',
        'Interactive booking system',
        'Real-time audio streaming'
      ],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '4',
      title: 'Digital Storytelling App',
      description: 'Mobile application for preserving and sharing traditional stories across cultures.',
      icon: 'fas fa-book-open',
      year: '2023',
      tags: ['Mobile App', 'Storytelling', 'Cultural Preservation'],
      fullDescription: 'A mobile application dedicated to preserving traditional stories from different cultures while making them accessible to modern audiences through interactive storytelling.',
      features: [
        'Interactive story maps',
        'Audio narration in multiple languages',
        'Cultural context explanations',
        'Community story submission',
        'Offline reading capabilities'
      ],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: '5',
      title: 'London Fashion Week Exhibition',
      description: 'Curated exhibition exploring the intersection of technology and traditional craftsmanship.',
      icon: 'fas fa-palette',
      year: '2024',
      tags: ['Exhibition Design', 'Fashion', 'Technology Integration'],
      fullDescription: 'An immersive exhibition that explores how technology can enhance rather than replace traditional craftsmanship, featuring interactive installations and live demonstrations.',
      features: [
        'Interactive textile displays',
        'AR-enhanced garment visualization',
        'Live craftsmanship demonstrations',
        'Digital pattern projection',
        'Visitor engagement analytics'
      ],
      demoUrl: '#',
    },
    {
      id: '6',
      title: 'Cultural Bridge Consulting',
      description: 'Comprehensive consulting framework for international businesses entering Asian markets.',
      icon: 'fas fa-handshake',
      year: '2024',
      tags: ['Consulting', 'Strategy', 'International Business'],
      fullDescription: 'A strategic consulting framework that helps international businesses successfully enter and operate in Asian markets by understanding cultural nuances and local business practices.',
      features: [
        'Market entry strategy development',
        'Cultural sensitivity training',
        'Local partnership facilitation',
        'Communication protocol guides',
        'Ongoing cultural advisory support'
      ],
      demoUrl: '#',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="portfolio" className="portfolio-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Portfolio</h2>
          <div className="section-underline" />
        </motion.div>

        <motion.div
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="portfolio-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="portfolio-card-image">
                <i className={project.icon} />
              </div>

              <div className="portfolio-card-content">
                <h3 className="portfolio-card-title">{project.title}</h3>
                <p className="portfolio-card-description">{project.description}</p>

                <div className="portfolio-card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="portfolio-card-footer">
                  <span className="portfolio-card-year">{project.year}</span>
                  <div className="portfolio-card-actions">
                    <i className="fas fa-eye" />
                    <i className="fas fa-external-link-alt" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{selectedProject.title}</h2>
                <button
                  className="modal-close"
                  onClick={() => setSelectedProject(null)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-grid">
                  <div className="modal-image">
                    <div className="project-image-placeholder">
                      <i className={selectedProject.icon} />
                    </div>
                    <div className="modal-tags">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-details">
                    <h3>Project Overview</h3>
                    <p>{selectedProject.fullDescription}</p>

                    <h3>Key Features</h3>
                    <ul className="feature-list">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fas fa-check" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="modal-actions">
                      {selectedProject.demoUrl && (
                        <motion.a
                          href={selectedProject.demoUrl}
                          className="btn btn-primary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fas fa-eye" />
                          Live Demo
                        </motion.a>
                      )}
                      {selectedProject.githubUrl && (
                        <motion.a
                          href={selectedProject.githubUrl}
                          className="btn btn-secondary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className="fab fa-github" />
                          Source Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const galleryImages: GalleryImage[] = [
    { id: '1', title: 'Design Sketches', icon: 'fas fa-pencil-ruler', description: 'Early conceptual sketches for fashion collections', category: 'design' },
    { id: '2', title: 'Traditional Weaving', icon: 'fas fa-loom', description: 'Learning traditional Thai weaving techniques', category: 'culture' },
    { id: '3', title: 'AI Development', icon: 'fas fa-brain', description: 'Working on machine learning algorithms', category: 'tech' },
    { id: '4', title: 'Cultural Research', icon: 'fas fa-globe-asia', description: 'Researching cultural patterns and traditions', category: 'culture' },
    { id: '5', title: 'Voice Recording', icon: 'fas fa-microphone-alt', description: 'Professional voice acting sessions', category: 'voice' },
    { id: '6', title: 'Fashion Photography', icon: 'fas fa-camera', description: 'Behind the scenes of fashion shoots', category: 'design' },
    { id: '7', title: 'Code Development', icon: 'fas fa-code', description: 'Building innovative web applications', category: 'tech' },
    { id: '8', title: 'Textile Experiments', icon: 'fas fa-cut', description: 'Experimenting with sustainable materials', category: 'design' },
    { id: '9', title: 'Cultural Workshops', icon: 'fas fa-users', description: 'Leading cultural awareness workshops', category: 'culture' },
    { id: '10', title: 'Design Process', icon: 'fas fa-drafting-compass', description: 'Technical fashion design process', category: 'design' },
    { id: '11', title: 'AI Training', icon: 'fas fa-robot', description: 'Training AI models for cultural understanding', category: 'tech' },
    { id: '12', title: 'Collaboration', icon: 'fas fa-handshake', description: 'Working with international teams', category: 'culture' },
    { id: '13', title: 'Pattern Making', icon: 'fas fa-shapes', description: 'Creating sustainable fashion patterns', category: 'design' },
    { id: '14', title: 'Voice Coaching', icon: 'fas fa-volume-up', description: 'Voice acting coaching sessions', category: 'voice' },
    { id: '15', title: 'Tech Innovation', icon: 'fas fa-lightbulb', description: 'Innovative technology solutions', category: 'tech' },
    { id: '16', title: 'Cultural Events', icon: 'fas fa-calendar-alt', description: 'Participating in cultural events', category: 'culture' },
    { id: '17', title: 'Writing Process', icon: 'fas fa-pen-fancy', description: 'Creative writing and content creation', category: 'writing' },
    { id: '18', title: 'Fashion Shows', icon: 'fas fa-tshirt', description: 'Runway shows and fashion presentations', category: 'design' },
    { id: '19', title: 'Digital Art', icon: 'fas fa-paint-brush', description: 'Digital art and design creation', category: 'design' },
    { id: '20', title: 'Consulting Sessions', icon: 'fas fa-comments', description: 'Client consulting and strategy sessions', category: 'culture' },
    { id: '21', title: 'Research Travel', icon: 'fas fa-plane', description: 'Cultural research travels', category: 'culture' },
    { id: '22', title: 'Studio Work', icon: 'fas fa-home', description: 'Creative work in the studio', category: 'design' },
    { id: '23', title: 'Presentations', icon: 'fas fa-presentation', description: 'Project presentations and pitches', category: 'culture' },
    { id: '24', title: 'Inspiration', icon: 'fas fa-star', description: 'Sources of creative inspiration', category: 'design' },
  ];

  const openModal = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % galleryImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  // Split images into rows for animation
  const row1 = galleryImages.slice(0, 8);
  const row2 = galleryImages.slice(8, 16);
  const row3 = galleryImages.slice(16, 24);

  return (
    <section id="gallery" className="gallery-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Creative Gallery</h2>
          <div className="section-underline" />
          <p className="section-subtitle">
            A visual journey through my creative process, inspirations, and cultural explorations
          </p>
        </motion.div>

        <div className="gallery-container">
          {/* Row 1 - Left to Right */}
          <motion.div
            className="gallery-row"
            animate={{ x: [0, -50] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row1, ...row1].map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                className="gallery-item"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => openModal(image, galleryImages.indexOf(image))}
              >
                <div className={`gallery-item-content category-${image.category}`}>
                  <i className={image.icon} />
                  <div className="gallery-item-overlay">
                    <div className="gallery-item-info">
                      <i className="fas fa-expand" />
                      <p>{image.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2 - Right to Left */}
          <motion.div
            className="gallery-row"
            animate={{ x: [-50, 0] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...row2, ...row2].map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                className="gallery-item"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => openModal(image, galleryImages.indexOf(image))}
              >
                <div className={`gallery-item-content category-${image.category}`}>
                  <i className={image.icon} />
                  <div className="gallery-item-overlay">
                    <div className="gallery-item-info">
                      <i className="fas fa-expand" />
                      <p>{image.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Row 3 - Left to Right (Delayed) */}
          <motion.div
            className="gallery-row"
            animate={{ x: [0, -50] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: -10,
            }}
          >
            {[...row3, ...row3].map((image, index) => (
              <motion.div
                key={`${image.id}-${index}`}
                className="gallery-item"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                onClick={() => openModal(image, galleryImages.indexOf(image))}
              >
                <div className={`gallery-item-content category-${image.category}`}>
                  <i className={image.icon} />
                  <div className="gallery-item-overlay">
                    <div className="gallery-item-info">
                      <i className="fas fa-expand" />
                      <p>{image.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="gallery-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="gallery-modal-content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="gallery-modal-image">
                <div className={`gallery-modal-placeholder category-${selectedImage.category}`}>
                  <i className={selectedImage.icon} />
                </div>

                <button className="gallery-nav-btn gallery-nav-prev" onClick={prevImage}>
                  <i className="fas fa-chevron-left" />
                </button>
                <button className="gallery-nav-btn gallery-nav-next" onClick={nextImage}>
                  <i className="fas fa-chevron-right" />
                </button>
                <button className="gallery-modal-close" onClick={closeModal}>
                  <i className="fas fa-times" />
                </button>
              </div>

              <div className="gallery-modal-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TestimonialsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const testimonials: Testimonial[] = [
    {
      id: '1',
      text: "Thanatsitt's unique perspective bridging Thai and British cultures brought invaluable insights to our international expansion. Their fashion designs perfectly captured our brand's essence while respecting local cultural nuances.",
      client: "Sarah Chen",
      position: "Creative Director",
      company: "London Fashion House",
      projectType: "Fashion Design",
      rating: 5,
    },
    {
      id: '2',
      text: "The AI cultural consulting platform Thanatsitt developed for us has revolutionized how we approach international markets. Their technical expertise combined with deep cultural understanding is truly exceptional.",
      client: "Marcus Thompson",
      position: "CTO",
      company: "TechStart London",
      projectType: "AI Development",
      rating: 5,
    },
    {
      id: '3',
      text: "Working with Thanatsitt on our cultural preservation project was enlightening. Their ability to translate complex cultural concepts into accessible digital experiences is remarkable.",
      client: "Dr. Priya Patel",
      position: "Research Director",
      company: "Cultural Institute",
      projectType: "Cultural Consulting",
      rating: 5,
    },
    {
      id: '4',
      text: "Thanatsitt's voice acting brought our international campaign to life. Their multilingual capabilities and cultural sensitivity made our global launch a tremendous success.",
      client: "James Wilson",
      position: "Founder",
      company: "Digital Agency",
      projectType: "Voice Acting",
      rating: 5,
    },
    {
      id: '5',
      text: "The web development work Thanatsitt delivered exceeded our expectations. Their attention to cultural details and user experience design created a platform that truly resonates with our diverse audience.",
      client: "Emma Rodriguez",
      position: "Producer",
      company: "Media Productions",
      projectType: "Web Development",
      rating: 5,
    },
    {
      id: '6',
      text: "Thanatsitt's writing captures the perfect balance between professional expertise and cultural authenticity. Their content strategy helped us connect with Asian markets in ways we never thought possible.",
      client: "David Kim",
      position: "Brand Manager",
      company: "Global Corp",
      projectType: "Content Writing",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="testimonials-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Client Reviews</h2>
          <div className="section-underline" />
          <p className="section-subtitle">
            What clients say about working with me across different industries and cultures
          </p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="testimonial-rating">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>

              <blockquote className="testimonial-text">
                "{testimonial.text}"
              </blockquote>

              <div className="testimonial-divider" />

              <div className="testimonial-client">
                <div className="client-info">
                  <div className="client-avatar">
                    {testimonial.client.charAt(0)}
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">{testimonial.client}</h4>
                    <p className="client-position">{testimonial.position}</p>
                    <p className="client-company">{testimonial.company}</p>
                  </div>
                </div>
                <div className="project-type-badge">
                  {testimonial.projectType}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="testimonials-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="cta-card">
            <h3>Ready to Work Together?</h3>
            <p>Join these satisfied clients and let's create something extraordinary together.</p>
            <motion.button
              className="btn btn-primary"
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-rocket" />
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('');

    try {
      // Replace with your EmailJS configuration
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        formRef.current!,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setFormStatus('Message sent successfully! I\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Let's Connect</h2>
          <div className="section-underline" />
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="contact-card">
              <h3>
                <i className="fas fa-globe-asia" />
                Global Reach
              </h3>
              <div className="location-list">
                <div className="location-item">
                  <div className="location-icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div className="location-details">
                    <h4>London, UK</h4>
                    <p>Primary Location</p>
                  </div>
                </div>
                <div className="location-item">
                  <div className="location-icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div className="location-details">
                    <h4>Bangkok, Thailand</h4>
                    <p>Cultural Hub</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <h3>
                <i className="fas fa-clock" />
                Availability
              </h3>
              <p>
                Available for projects worldwide. I work across time zones to accommodate international clients and collaborate with diverse teams.
              </p>
            </div>

            <div className="contact-card">
              <h3>
                <i className="fas fa-handshake" />
                Let's Collaborate
              </h3>
              <p>
                Whether you need fashion design, AI development, cultural consulting, or voice acting services, I'm here to bring your vision to life with cultural sensitivity and technical excellence.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="contact-card">
              <h3>
                <i className="fas fa-envelope" />
                Send Message
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Needed</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    <option value="fashion-design">Fashion Design</option>
                    <option value="ai-development">AI Development</option>
                    <option value="web-development">Web Development</option>
                    <option value="cultural-consulting">Cultural Consulting</option>
                    <option value="voice-acting">Voice Acting</option>
                    <option value="writing">Writing Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {formStatus && (
                  <motion.div
                    className={`form-status ${formStatus.includes('success') ? 'success' : 'error'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {formStatus}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="footer-moon">
              <div className="footer-moon-inner">
                <div className="footer-crater footer-crater-1" />
                <div className="footer-crater footer-crater-2" />
                <div className="footer-crater footer-crater-3" />
              </div>
              <motion.div
                className="footer-star footer-star-1"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="footer-star footer-star-2"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              <motion.div
                className="footer-star footer-star-3"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>
            <h3>Thanatsitt Santisamranwilai</h3>
          </div>

          <p className="footer-description">
            Bridging cultures, creating futures. Where ancient wisdom meets modern innovation.
          </p>

          <div className="footer-social">
            {[
              { icon: 'fab fa-linkedin', url: '#', label: 'LinkedIn' },
              { icon: 'fab fa-github', url: '#', label: 'GitHub' },
              { icon: 'fab fa-instagram', url: '#', label: 'Instagram' },
              { icon: 'fab fa-twitter', url: '#', label: 'Twitter' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                className="footer-social-link"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <i className={social.icon} />
              </motion.a>
            ))}
          </div>

          <div className="footer-divider" />

          <p className="footer-copyright">
            © 2024 Thanatsitt Santisamranwilai. Crafted with ❤️ and 🌙 in London & Bangkok.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
    />
  );
};

// Main App Component
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key

    // Section observer for navigation
    const sections = ['home', 'about', 'portfolio', 'skills', 'gallery', 'testimonials', 'contact'];
    const observers = sections.map(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(element);
        return observer;
      }
      return null;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div className="app">
      <ScrollProgress />
      <ParticleBackground />
      <EnhancedMoon />
      <Navigation activeSection={activeSection} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <Portfolio />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
