import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Types
interface Project {
  title: string;
  description: string;
  icon: string;
  year: string;
  tags: string[];
  fullDescription: string;
  features: string[];
}

interface GalleryImage {
  title: string;
  icon: string;
  description: string;
}

interface Testimonial {
  text: string;
  client: string;
  position: string;
  company: string;
  projectType: string;
}

interface ContactForm {
  name: string;
  email: string;
  service: string;
  message: string;
}

const App: React.FC = () => {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  // Refs
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Data
  const projects: Project[] = [
    {
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
      ]
    },
    {
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
      ]
    },
    {
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
      ]
    },
    {
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
      ]
    },
    {
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
      ]
    },
    {
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
      ]
    }
  ];

  const galleryImages: GalleryImage[] = [
    { title: 'Design Sketches', icon: 'fas fa-pencil-ruler', description: 'Early conceptual sketches for fashion collections' },
    { title: 'Traditional Weaving', icon: 'fas fa-loom', description: 'Learning traditional Thai weaving techniques' },
    { title: 'AI Development', icon: 'fas fa-brain', description: 'Working on machine learning algorithms' },
    { title: 'Cultural Research', icon: 'fas fa-globe-asia', description: 'Researching cultural patterns and traditions' },
    { title: 'Voice Recording', icon: 'fas fa-microphone-alt', description: 'Professional voice acting sessions' },
    { title: 'Fashion Photography', icon: 'fas fa-camera', description: 'Behind the scenes of fashion shoots' },
    { title: 'Code Development', icon: 'fas fa-code', description: 'Building innovative web applications' },
    { title: 'Textile Experiments', icon: 'fas fa-cut', description: 'Experimenting with sustainable materials' },
    { title: 'Cultural Workshops', icon: 'fas fa-users', description: 'Leading cultural awareness workshops' },
    { title: 'Design Process', icon: 'fas fa-drafting-compass', description: 'Technical fashion design process' },
    { title: 'AI Training', icon: 'fas fa-robot', description: 'Training AI models for cultural understanding' },
    { title: 'Collaboration', icon: 'fas fa-handshake', description: 'Working with international teams' },
    { title: 'Pattern Making', icon: 'fas fa-shapes', description: 'Creating sustainable fashion patterns' },
    { title: 'Voice Coaching', icon: 'fas fa-volume-up', description: 'Voice acting coaching sessions' },
    { title: 'Tech Innovation', icon: 'fas fa-lightbulb', description: 'Innovative technology solutions' },
    { title: 'Cultural Events', icon: 'fas fa-calendar-alt', description: 'Participating in cultural events' },
    { title: 'Writing Process', icon: 'fas fa-pen-fancy', description: 'Creative writing and content creation' },
    { title: 'Fashion Shows', icon: 'fas fa-tshirt', description: 'Runway shows and fashion presentations' },
    { title: 'Digital Art', icon: 'fas fa-paint-brush', description: 'Digital art and design creation' },
    { title: 'Consulting Sessions', icon: 'fas fa-comments', description: 'Client consulting and strategy sessions' },
    { title: 'Research Travel', icon: 'fas fa-plane', description: 'Cultural research travels' },
    { title: 'Studio Work', icon: 'fas fa-home', description: 'Creative work in the studio' },
    { title: 'Presentations', icon: 'fas fa-presentation', description: 'Project presentations and pitches' },
    { title: 'Inspiration', icon: 'fas fa-star', description: 'Sources of creative inspiration' }
  ];

  const testimonials: Testimonial[] = [
    {
      text: "Thanatsitt's unique perspective bridging Thai and British cultures brought invaluable insights to our international expansion. Their fashion designs perfectly captured our brand's essence while respecting local cultural nuances.",
      client: "Sarah Chen",
      position: "Creative Director",
      company: "London Fashion House",
      projectType: "Fashion Design"
    },
    {
      text: "The AI cultural consulting platform Thanatsitt developed for us has revolutionized how we approach international markets. Their technical expertise combined with deep cultural understanding is truly exceptional.",
      client: "Marcus Thompson",
      position: "CTO",
      company: "TechStart London",
      projectType: "AI Development"
    },
    {
      text: "Working with Thanatsitt on our cultural preservation project was enlightening. Their ability to translate complex cultural concepts into accessible digital experiences is remarkable.",
      client: "Dr. Priya Patel",
      position: "Research Director",
      company: "Cultural Institute",
      projectType: "Cultural Consulting"
    },
    {
      text: "Thanatsitt's voice acting brought our international campaign to life. Their multilingual capabilities and cultural sensitivity made our global launch a tremendous success.",
      client: "James Wilson",
      position: "Founder",
      company: "Digital Agency",
      projectType: "Voice Acting"
    },
    {
      text: "The web development work Thanatsitt delivered exceeded our expectations. Their attention to cultural details and user experience design created a platform that truly resonates with our diverse audience.",
      client: "Emma Rodriguez",
      position: "Producer",
      company: "Media Productions",
      projectType: "Web Development"
    },
    {
      text: "Thanatsitt's writing captures the perfect balance between professional expertise and cultural authenticity. Their content strategy helped us connect with Asian markets in ways we never thought possible.",
      client: "David Kim",
      position: "Brand Manager",
      company: "Global Corp",
      projectType: "Content Writing"
    }
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const typeWriter = () => {
      const text = 'Thanatsitt';
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setTypedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 150);
    };

    typeWriter();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedProject(projects[0]);
    }
    if (galleryImages.length > 0) {
      setSelectedGalleryImage(galleryImages[0]);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
        setShowGalleryModal(false);
        document.body.style.overflow = 'auto';
      }
      
      if (showGalleryModal) {
        if (e.key === 'ArrowLeft') {
          previousGalleryImage();
        } else if (e.key === 'ArrowRight') {
          nextGalleryImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showGalleryModal, selectedGalleryIndex]);

  // Functions
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openModal = (index: number) => {
    setSelectedProject(projects[index]);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const openGalleryModal = (index: number) => {
    setSelectedGalleryIndex(index);
    setSelectedGalleryImage(galleryImages[index]);
    setShowGalleryModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setShowGalleryModal(false);
    document.body.style.overflow = 'auto';
  };

  const previousGalleryImage = () => {
    const newIndex = selectedGalleryIndex > 0 
      ? selectedGalleryIndex - 1 
      : galleryImages.length - 1;
    setSelectedGalleryIndex(newIndex);
    setSelectedGalleryImage(galleryImages[newIndex]);
  };

  const nextGalleryImage = () => {
    const newIndex = selectedGalleryIndex < galleryImages.length - 1 
      ? selectedGalleryIndex + 1 
      : 0;
    setSelectedGalleryIndex(newIndex);
    setSelectedGalleryImage(galleryImages[newIndex]);
  };

  const handleContactFormChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setContactForm({
        name: '',
        email: '',
        service: '',
        message: ''
      });
      
      alert('Thank you for your message! I\'ll get back to you soon.');
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Skill data with animation
  const skillCategories = [
    {
      title: 'Design',
      icon: 'fas fa-palette',
      color: 'from-gold to-yellow-400',
      skills: [
        { name: 'Fashion Design', level: 95 },
        { name: 'UI/UX Design', level: 88 },
        { name: 'Visual Identity', level: 92 }
      ]
    },
    {
      title: 'Technology',
      icon: 'fas fa-code',
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'AI Development', level: 85 },
        { name: 'Web Development', level: 80 },
        { name: 'Video Editing', level: 78 }
      ]
    },
    {
      title: 'Communication',
      icon: 'fas fa-comments',
      color: 'from-green-500 to-teal-600',
      skills: [
        { name: 'Voice Acting', level: 82 },
        { name: 'Writing', level: 90 },
        { name: 'Languages', level: 95 }
      ]
    },
    {
      title: 'Consulting',
      icon: 'fas fa-lightbulb',
      color: 'from-pink-500 to-rose-600',
      skills: [
        { name: 'Cultural Consulting', level: 98 },
        { name: 'Strategy Planning', level: 85 },
        { name: 'Project Management', level: 88 }
      ]
    }
  ];

  return (
    <div className="hero-bg text-white min-h-screen custom-scrollbar overflow-x-hidden">
      {/* Particle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Moon Animation in Top Right Corner */}
      <div className="fixed top-20 right-20 z-10 hidden lg:block">
        <div className="moon-container">
          {/* Main Animated Moon */}
          <div className="animated-moon">
            <div className="moon-crater crater-1"></div>
            <div className="moon-crater crater-2"></div>
            <div className="moon-crater crater-3"></div>
          </div>
          
          {/* Twinkling Stars Around Moon */}
          <div className="moon-stars">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  top: ['10%', '15%', '30%', '50%', '80%', '85%'][i],
                  left: ['20%', '85%', '10%', '95%', '75%', '25%'][i],
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          
          {/* Small Orbiting Moon */}
          <div className="orbiting-moon">
            <div className="orbiting-moon-element"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass-morphism shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="text-2xl font-bold text-gold hover:animate-glow transition-all duration-300 flex items-center group">
              <div className="relative mr-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-400 rounded-full animate-moon-glow group-hover:animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-full"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/20 rounded-full"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              </div>
              <span className="text-shadow group-hover:text-yellow-300 transition-colors">Thanatsitt</span>
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Home', ref: heroRef },
                { name: 'About', ref: aboutRef },
                { name: 'Portfolio', ref: portfolioRef },
                { name: 'Skills', ref: skillsRef },
                { name: 'Gallery', ref: galleryRef },
                { name: 'Reviews', ref: testimonialsRef },
                { name: 'Contact', ref: contactRef }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className="nav-link relative group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gold/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gold hover:animate-wiggle"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 glass-morphism rounded-b-2xl">
              {[
                { name: 'Home', ref: heroRef, icon: 'fas fa-home' },
                { name: 'About', ref: aboutRef, icon: 'fas fa-user' },
                { name: 'Portfolio', ref: portfolioRef, icon: 'fas fa-briefcase' },
                { name: 'Skills', ref: skillsRef, icon: 'fas fa-cogs' },
                { name: 'Gallery', ref: galleryRef, icon: 'fas fa-images' },
                { name: 'Reviews', ref: testimonialsRef, icon: 'fas fa-star' },
                { name: 'Contact', ref: contactRef, icon: 'fas fa-envelope' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-4 hover:bg-gold/20 rounded-lg transition-colors"
                >
                  <i className={`${item.icon} mr-3`}></i>
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gold/20 rounded-full animate-float hidden lg:block"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-moon-silver/20 rounded-full animate-float hidden lg:block" style={{animationDelay: '-2s'}}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-stellar-purple/30 rounded-full animate-bounce-slow hidden lg:block" style={{animationDelay: '-1s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-cosmic-blue/40 rounded-full animate-pulse-slow hidden lg:block"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-shadow">
              <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent typing-cursor">
                {typedText}
              </span>
            </h1>
            <div className="h-2 w-32 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto text-shadow">
            Thai-British interdisciplinary creator bridging{' '}
            <span className="text-gold font-semibold">ancient wisdom</span> with{' '}
            <span className="text-gold font-semibold">modern technology</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => scrollToSection(portfolioRef)}
              className="group bg-gradient-to-r from-gold to-yellow-500 text-black px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-eye mr-3 group-hover:animate-wiggle"></i>
                Explore Portfolio
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection(contactRef)}
              className="group border-2 border-moon-silver text-moon-silver px-10 py-5 rounded-full font-bold text-lg hover:bg-moon-silver hover:text-black transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-paper-plane mr-3 group-hover:animate-wiggle"></i>
                Get In Touch
              </span>
            </button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            {['linkedin', 'github', 'instagram', 'twitter'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-3xl text-gray-400 hover:text-gold transition-colors duration-300 hover:animate-bounce"
              >
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">About Me</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="glass-morphism rounded-3xl p-8 card-hover">
                <div className="aspect-square bg-gradient-to-br from-gold/20 to-purple-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"></div>
                  <i className="fas fa-user text-8xl text-gold/50"></i>
                </div>
              </div>
              
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass-morphism rounded-full p-4 animate-float">
                <i className="fas fa-palette text-2xl text-gold"></i>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-morphism rounded-full p-4 animate-float" style={{animationDelay: '-1s'}}>
                <i className="fas fa-brain text-2xl text-gold"></i>
              </div>
            </div>
            
            {/* About Content */}
            <div className="space-y-8">
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-4 text-gold">
                  <i className="fas fa-star mr-3"></i>Cultural Navigator
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Born from the intersection of Thai heritage and British innovation, I navigate the delicate balance between preserving ancient wisdom and embracing cutting-edge technology. My journey spans continents and disciplines, always seeking to bridge cultural divides through design and technology.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-4 text-gold">
                  <i className="fas fa-graduation-cap mr-3"></i>Educational Journey
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-university text-gold"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">London College of Fashion</h4>
                      <p className="text-gray-400">Fashion Design & Cultural Studies</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-robot text-gold"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">AI & Technology</h4>
                      <p className="text-gray-400">Self-taught Developer & Co-founder</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-4 text-gold">
                  <i className="fas fa-heart mr-3"></i>Philosophy
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  I believe technology should enhance human connection, not replace it. Every project I undertake is guided by principles of cultural sensitivity, ethical innovation, and the timeless wisdom that beauty and function are inseparable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Skills & Expertise</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <SkillCategory key={categoryIndex} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Creative Gallery</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              A visual journey through my creative process, inspirations, and cultural explorations
            </p>
          </div>
          
          {/* Animated Gallery Rows */}
          <div className="space-y-8">
            {/* Row 1 - Left to Right */}
            <GalleryRow 
              images={galleryImages.slice(0, 8)} 
              direction="left" 
              onImageClick={openGalleryModal}
              startIndex={0}
            />
            
            {/* Row 2 - Right to Left */}
            <GalleryRow 
              images={galleryImages.slice(8, 16)} 
              direction="right" 
              onImageClick={openGalleryModal}
              startIndex={8}
            />
            
            {/* Row 3 - Left to Right (Delayed) */}
            <GalleryRow 
              images={galleryImages.slice(16, 24)} 
              direction="left" 
              onImageClick={openGalleryModal}
              startIndex={16}
              delay={true}
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Portfolio</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="glass-morphism rounded-2xl overflow-hidden card-hover cursor-pointer" 
                onClick={() => openModal(index)}
              >
                <div className="h-64 bg-gradient-to-br from-gold/20 to-purple-600/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"></div>
                  <i className={`${project.icon} text-6xl text-gold/70`}></i>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gold">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-moon-silver text-sm">{project.year}</span>
                    <div className="flex space-x-2">
                      <i className="fas fa-eye text-gold hover:animate-bounce cursor-pointer"></i>
                      <i className="fas fa-external-link-alt text-gold hover:animate-bounce cursor-pointer"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Client Reviews</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              What clients say about working with me across different industries and cultures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gold mb-4">Ready to Work Together?</h3>
              <p className="text-gray-300 mb-6">Join these satisfied clients and let's create something extraordinary together.</p>
              <button 
                onClick={() => scrollToSection(contactRef)}
                className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50"
              >
                <i className="fas fa-rocket mr-2"></i>
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Let's Connect</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-6 text-gold">
                  <i className="fas fa-globe-asia mr-3"></i>Global Reach
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-gold"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">London, UK</h4>
                      <p className="text-gray-400">Primary Location</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-gold"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Bangkok, Thailand</h4>
                      <p className="text-gray-400">Cultural Hub</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-6 text-gold">
                  <i className="fas fa-clock mr-3"></i>Availability
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Available for projects worldwide. I work across time zones to accommodate international clients and collaborate with diverse teams.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-6 text-gold">
                  <i className="fas fa-handshake mr-3"></i>Let's Collaborate
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Whether you need fashion design, AI development, cultural consulting, or voice acting services, I'm here to bring your vision to life with cultural sensitivity and technical excellence.
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="glass-morphism rounded-2xl p-8 card-hover">
              <h3 className="text-2xl font-bold mb-6 text-gold">
                <i className="fas fa-envelope mr-3"></i>Send Message
              </h3>
              
              <form className="space-y-6" onSubmit={sendMessage}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      value={contactForm.name}
                      onChange={(e) => handleContactFormChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      value={contactForm.email}
                      onChange={(e) => handleContactFormChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Service Needed</label>
                  <select 
                    value={contactForm.service}
                    onChange={(e) => handleContactFormChange('service', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
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
                
                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea 
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => handleContactFormChange('message', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black py-4 rounded-lg font-bold text-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-gold/50 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <i className="fas fa-spinner animate-spin mr-2"></i>
                      Sending...
                    </span>
                  ) : (
                    <span>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Moon */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="relative mr-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-400 rounded-full animate-moon-glow">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-full"></div>
                  <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 right-1 w-1 h-1 bg-white/40 rounded-full"></div>
                </div>
                {/* Twinkling stars around footer moon */}
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-stars-twinkle"
                    style={{
                      top: ['-8px', '0px', '48px'][i],
                      left: ['-8px', '-12px', '48px'][i],
                      animationDelay: `${i}s`
                    }}
                  />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gold">Thanatsitt Santisamranwilai</h3>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Bridging cultures, creating futures. Where ancient wisdom meets modern innovation.
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              {['linkedin', 'github', 'instagram', 'twitter'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6"></div>
            
            <p className="text-gray-500 text-sm">
              © 2024 Thanatsitt Santisamranwilai. Crafted with ❤️ and 🌙 in London & Bangkok.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showModal && selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={closeModal} 
        />
      )}

      {showGalleryModal && selectedGalleryImage && (
        <GalleryModal 
          image={selectedGalleryImage}
          onClose={closeModal}
          onPrevious={previousGalleryImage}
          onNext={nextGalleryImage}
        />
      )}
    </div>
  );
};

// Component for Skill Category
const SkillCategory: React.FC<{ category: any }> = ({ category }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="glass-morphism rounded-2xl p-8 card-hover">
      <div className="text-center mb-6">
        <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <i className={`${category.icon} text-2xl text-white`}></i>
        </div>
        <h3 className="text-xl font-bold text-gold">{category.title}</h3>
      </div>
      
      <div className="space-y-4">
        {category.skills.map((skill: any, index: number) => (
          <div key={index} className="skill-item">
            <div className="flex justify-between mb-2">
              <span className="text-white">{skill.name}</span>
              <span className="text-gold">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="skill-bar rounded-full h-2 transition-all duration-2000 ease-in-out"
                style={{ width: visible ? `${skill.level}%` : '0%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for Gallery Row
const GalleryRow: React.FC<{
  images: GalleryImage[];
  direction: 'left' | 'right';
  onImageClick: (index: number) => void;
  startIndex: number;
  delay?: boolean;
}> = ({ images, direction, onImageClick, startIndex, delay = false }) => {
  const animationClass = direction === 'left' ? 'animate-slide-left' : 'animate-slide-right';
  const delayStyle = delay ? { animationDelay: '-10s' } : {};

  return (
    <div className="relative overflow-hidden">
      <div className={`flex space-x-6 ${animationClass} gallery-scroll`} style={delayStyle}>
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="flex space-x-6 shrink-0">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-80 h-60 glass-morphism rounded-2xl overflow-hidden shrink-0 cursor-pointer transform hover:scale-105 transition-all duration-300 relative group"
                onClick={() => onImageClick(startIndex + index)}
              >
                <div className="w-full h-full bg-gradient-to-br from-gold/20 to-purple-600/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"></div>
                  <i className={`${image.icon} text-4xl text-gold/70`}></i>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-expand text-gold text-2xl mb-2"></i>
                      <p className="text-white font-semibold">{image.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for Testimonial Card
const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 200);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={ref}
      className={`glass-morphism rounded-2xl p-8 card-hover testimonial-card transition-all duration-500 ${
        visible ? 'animate-zoom-in opacity-100' : 'opacity-0'
      }`}
    >
      {/* Rating Stars */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <i key={i} className="fas fa-star text-gold text-lg"></i>
        ))}
      </div>
      
      {/* Testimonial Text */}
      <blockquote className="text-gray-300 mb-6 text-lg italic leading-relaxed">
        {testimonial.text}
      </blockquote>
      
      {/* Client Info */}
      <div className="border-t border-gray-600 pt-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center">
            <span className="font-bold text-black text-lg">{testimonial.client.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white">{testimonial.client}</h4>
            <p className="text-gold text-sm">{testimonial.position}</p>
            <p className="text-gray-400 text-xs">{testimonial.company}</p>
          </div>
        </div>
        
        {/* Project Type Badge */}
        <div className="mt-4">
          <span className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full">
            {testimonial.projectType}
          </span>
        </div>
      </div>
    </div>
  );
};

// Component for Project Modal
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="glass-morphism rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gold">{project.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                <i className={`${project.icon} text-6xl text-gold/70`}></i>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{project.fullDescription}</p>
              
              <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-2 mb-6">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <i className="fas fa-check text-gold mt-1"></i>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-gold to-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transform transition-all duration-300">
                  <i className="fas fa-eye mr-2"></i>
                  Live Demo
                </button>
                <button className="border-2 border-gold text-gold px-6 py-3 rounded-lg font-bold hover:bg-gold hover:text-black transition-all duration-300">
                  <i className="fab fa-github mr-2"></i>
                  Source Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Gallery Modal
const GalleryModal: React.FC<{
  image: GalleryImage;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ image, onClose, onPrevious, onNext }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          {/* Main Image */}
          <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6">
            <i className={`${image.icon} text-8xl text-gold/70`}></i>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
          
          {/* Image Info */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gold mb-2">{image.title}</h3>
            <p className="text-gray-300">{image.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
