import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Moon, 
  Menu, 
  X, 
  ExternalLink, 
  Github, 
  Mail, 
  Phone, 
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Palette,
  Brain,
  Globe,
  Leaf,
  Robot,
  Star,
  GraduationCap,
  Heart,
  Eye,
  Calendar,
  ArrowRight,
  Send,
  CheckCircle,
  ArrowUp
} from 'lucide-react';
import './App.css';

// Types
interface Project {
  id: number;
  title: string;
  category: string;
  type: string;
  icon: React.ReactNode;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  year: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}

interface Skill {
  name: string;
  percentage: number;
  icon: React.ReactNode;
}

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Components
const Navigation: React.FC<{ 
  scrolled: boolean; 
  mobileMenuOpen: boolean; 
  setMobileMenuOpen: (open: boolean) => void;
}> = ({ scrolled, mobileMenuOpen, setMobileMenuOpen }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.a
            href="#"
            className="text-2xl font-bold text-gold hover:scale-105 transition-transform flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Moon className="mr-3" />
            </motion.div>
            <span className="text-shadow">Thanatsitt</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'portfolio', 'skills', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative group capitalize text-white hover:text-gold transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10">{item}</span>
                <motion.div
                  className="absolute inset-0 bg-gold/20 rounded-lg"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden pb-4 bg-black/90 backdrop-blur-xl rounded-b-2xl border border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {['home', 'about', 'portfolio', 'skills', 'contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-3 px-4 hover:bg-gold/20 rounded-lg transition-colors capitalize"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const strings = [
    'Thanatsitt Santisamranwilai',
    'Cultural Navigator',
    'AI Developer',
    'Design Thinker',
    'Bridge Builder'
  ];

  useEffect(() => {
    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeWriter = () => {
      const currentString = strings[stringIndex];
      
      if (!isDeleting && charIndex < currentString.length) {
        setTypedText(currentString.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeWriter, 100);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentString.substring(0, charIndex - 1));
        charIndex--;
        setTimeout(typeWriter, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          stringIndex = (stringIndex + 1) % strings.length;
        }
        setTimeout(typeWriter, isDeleting ? 1000 : 2000);
      }
    };

    typeWriter();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-gold/20 rounded-full hidden lg:block"
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 bg-moon-silver/20 rounded-full hidden lg:block"
        animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: -2 }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-shadow">
            <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <motion.div
            className="h-2 w-32 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto text-shadow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Thai-British interdisciplinary creator bridging{' '}
          <span className="text-gold font-semibold">ancient wisdom</span> with{' '}
          <span className="text-gold font-semibold">modern technology</span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="group bg-gradient-to-r from-gold to-yellow-500 text-black px-10 py-5 rounded-full font-bold text-lg relative overflow-hidden"
            onClick={() => scrollToSection('portfolio')}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              <Eye className="mr-3" />
              Explore Portfolio
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="group border-2 border-moon-silver text-moon-silver px-10 py-5 rounded-full font-bold text-lg relative overflow-hidden"
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              <Send className="mr-3" />
              Get In Touch
            </span>
            <motion.div
              className="absolute inset-0 bg-moon-silver"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { icon: <Linkedin />, href: '#' },
            { icon: <Github />, href: '#' },
            { icon: <Instagram />, href: '#' },
            { icon: <Twitter />, href: '#' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="text-3xl text-gray-400 hover:text-gold transition-colors"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gold rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

const About: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="about" className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">About Me</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            className="relative"
            variants={scaleIn}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            <div className="glass-morphism rounded-3xl p-8 hover:scale-105 transition-transform duration-500">
              <div className="aspect-square bg-gradient-to-br from-gold/20 to-purple-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                <div className="text-8xl text-gold/50">👤</div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 glass-morphism rounded-full p-4"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Palette className="text-2xl text-gold" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 glass-morphism rounded-full p-4"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4, repeat: Infinity, delay: -2 }}
            >
              <Brain className="text-2xl text-gold" />
            </motion.div>
          </motion.div>

          {/* About Content */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            <motion.div
              className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold mb-4 text-gold flex items-center">
                <Star className="mr-3" />
                Cultural Navigator
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Born from the intersection of Thai heritage and British innovation, I navigate the delicate balance between preserving ancient wisdom and embracing cutting-edge technology.
              </p>
            </motion.div>

            <motion.div
              className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold mb-4 text-gold flex items-center">
                <GraduationCap className="mr-3" />
                Educational Journey
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <GraduationCap className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">London College of Fashion</h4>
                    <p className="text-gray-400">Fashion Design & Cultural Studies</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <Robot className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">AI & Technology</h4>
                    <p className="text-gray-400">Self-taught Developer & Co-founder</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              variants={fadeInUp}
            >
              <h3 className="text-2xl font-bold mb-4 text-gold flex items-center">
                <Heart className="mr-3" />
                Philosophy
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                I believe technology should enhance human connection, not replace it. Every project I undertake is guided by principles of cultural sensitivity and ethical innovation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skillCategories = [
    {
      title: 'Design',
      icon: <Palette className="text-2xl text-black" />,
      gradient: 'from-gold to-yellow-400',
      skills: [
        { name: 'Fashion Design', percentage: 95, icon: <Palette /> },
        { name: 'UI/UX Design', percentage: 88, icon: <Globe /> },
        { name: 'Visual Identity', percentage: 92, icon: <Star /> }
      ]
    },
    {
      title: 'Technology',
      icon: <Brain className="text-2xl text-white" />,
      gradient: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'AI Development', percentage: 85, icon: <Robot /> },
        { name: 'Web Development', percentage: 80, icon: <Globe /> },
        { name: 'Machine Learning', percentage: 75, icon: <Brain /> }
      ]
    },
    {
      title: 'Cultural',
      icon: <Globe className="text-2xl text-white" />,
      gradient: 'from-green-500 to-teal-600',
      skills: [
        { name: 'Cross-Cultural Communication', percentage: 98, icon: <Globe /> },
        { name: 'Cultural Research', percentage: 90, icon: <Star /> },
        { name: 'Storytelling', percentage: 95, icon: <Heart /> }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Skills & Expertise</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              variants={fadeInUp}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gold">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="text-white flex items-center">
                        <span className="mr-2">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-gold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-gold to-yellow-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'London College of Fashion Projects',
      category: 'Fashion Design',
      type: 'fashion',
      icon: <Palette />,
      description: 'Visual storytelling through fashion, exploring cultural identity and human-centered aesthetics.',
      fullDescription: 'A comprehensive collection of fashion design projects from my time at London College of Fashion. These works explore the intersection of Thai cultural heritage with contemporary Western fashion paradigms.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      tags: ['Fashion Design', 'Cultural Identity', 'Sustainability', 'LCF'],
      year: '2023',
      features: [
        'Sustainable material research and application',
        'Cultural motif integration with modern silhouettes',
        'Human-centered design methodology'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop'
      ]
    },
    {
      id: 2,
      title: 'Twilight Goddess AI Art',
      category: 'AI Art',
      type: 'ai',
      icon: <Brain />,
      description: 'AI-generated visuals exploring Thai mythology through divine feminine imagery.',
      fullDescription: 'An innovative exploration of Thai mythology through AI-generated art, focusing on divine feminine archetypes and their relevance in contemporary digital culture.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      tags: ['Midjourney', 'Thai Mythology', 'Digital Art', 'AI Ethics'],
      year: '2024',
      features: [
        'Custom AI model training on Thai cultural imagery',
        'Ethical AI practices in cultural representation',
        'Interactive digital gallery experience'
      ],
      liveUrl: 'https://example.com/twilight-goddess'
    },
    {
      id: 3,
      title: 'ThannxAI Platform',
      category: 'AI Platform',
      type: 'ai',
      icon: <Robot />,
      description: 'Human-centered AI platform focusing on ethical technology integration.',
      fullDescription: 'Co-founded AI platform that prioritizes human connection and ethical technology integration. ThannxAI makes artificial intelligence accessible and meaningful for everyone.',
      image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&h=600&fit=crop',
      tags: ['AI Ethics', 'Human-Centered Design', 'Co-founder', 'Innovation'],
      year: '2024',
      features: [
        'Ethical AI framework implementation',
        'Multi-cultural user interface design',
        'Privacy-first architecture'
      ],
      liveUrl: 'https://thannxai.com',
      githubUrl: 'https://github.com/thannxai'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Portfolio Gallery</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A curated collection of projects that showcase the intersection of culture, technology, and human-centered design.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {['all', 'fashion', 'ai', 'web'].map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                activeFilter === filter
                  ? 'bg-gold text-black'
                  : 'bg-white/10 text-white hover:bg-gold/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter === 'all' ? 'All Projects' : filter}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group glass-morphism rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-500 cursor-pointer"
                variants={fadeInUp}
                layout
                onClick={() => openModal(project)}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <Eye className="text-4xl text-white mb-2 mx-auto" />
                      <p className="text-white font-semibold">View Details</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <span className="mr-2">{project.icon}</span>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/10 px-3 py-1 rounded-full text-sm text-gray-300 hover:bg-gold/20 hover:text-white transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="mr-2 w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center text-gold">
                      <span className="text-sm font-semibold mr-2">View Project</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="glass-morphism rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-auto"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gold mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center space-x-4">
                      <span className="bg-gold text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <span className="mr-2">{selectedProject.icon}</span>
                        {selectedProject.category}
                      </span>
                      <span className="text-gray-400 flex items-center">
                        <Calendar className="mr-2 w-4 h-4" />
                        {selectedProject.year}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white text-3xl transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X />
                  </motion.button>
                </div>

                {/* Modal Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Project Image */}
                  <div className="space-y-6">
                    <div className="aspect-video rounded-2xl overflow-hidden">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Gallery */}
                    {selectedProject.gallery && (
                      <div className="grid grid-cols-3 gap-4">
                        {selectedProject.gallery.map((image, index) => (
                          <motion.div
                            key={index}
                            className="aspect-square rounded-lg overflow-hidden cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={image}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-gold mb-3">Project Overview</h4>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gold mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/10 px-4 py-2 rounded-full text-sm text-gray-300 border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-gold mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <CheckCircle className="text-gold mr-3 w-5 h-5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-4 pt-6">
                      {selectedProject.liveUrl && (
                        <motion.a
                          href={selectedProject.liveUrl}
                          className="flex-1 bg-gradient-to-r from-gold to-yellow-500 text-black py-3 px-6 rounded-xl font-semibold text-center flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="mr-2 w-4 h-4" />
                          View Live
                        </motion.a>
                      )}
                      {selectedProject.githubUrl && (
                        <motion.a
                          href={selectedProject.githubUrl}
                          className="flex-1 border-2 border-gold text-gold py-3 px-6 rounded-xl font-semibold text-center flex items-center justify-center hover:bg-gold hover:text-black transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="mr-2 w-4 h-4" />
                          View Code
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

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! I\'ll get back to you within 24 hours.', {
        duration: 5000,
        style: {
          background: '#1a1a2e',
          color: '#fff',
          border: '1px solid #D4AF37'
        }
      });

      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        style: {
          background: '#1a1a2e',
          color: '#fff',
          border: '1px solid #ef4444'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Let's Create Together</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bridge cultures and create something extraordinary? Let's start a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            variants={fadeInUp}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            <div className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gold">Get In Touch</h3>

              <div className="space-y-6">
                {[
                  { icon: <Mail />, title: 'Email', value: 'hello@thanatsitt.com' },
                  { icon: <Phone />, title: 'Phone', value: '+44 (0) 123 456 7890' },
                  { icon: <MapPin />, title: 'Location', value: 'London, UK / Bangkok, TH' }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{contact.title}</h4>
                      <p className="text-gray-400">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: <Linkedin />, href: '#' },
                    { icon: <Github />, href: '#' },
                    { icon: <Instagram />, href: '#' },
                    { icon: <Twitter />, href: '#' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="glass-morphism rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
            onSubmit={handleSubmit}
            variants={fadeInUp}
            initial="initial"
            animate={inView ? "animate" : "initial"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white flex items-center">
                  <span className="mr-2">👤</span>Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white flex items-center">
                  <Mail className="mr-2 w-4 h-4" />Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white flex items-center">
                <span className="mr-2">💼</span>Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300"
              >
                <option value="">Select project type</option>
                <option value="fashion">Fashion Design</option>
                <option value="ai">AI Development</option>
                <option value="web">Web Development</option>
                <option value="consulting">Cultural Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white flex items-center">
                <span className="mr-2">💬</span>Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300 resize-none"
                placeholder="Tell me about your project, vision, and how we can create something amazing together..."
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-3"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending Magic...
                  </>
                ) : (
                  <>
                    <Send className="mr-3" />
                    Send Message ✨
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex justify-center items-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Moon className="text-3xl text-gold mr-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gold">Thanatsitt Santisamranwilai</h3>
          </div>

          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Bridging cultures, creating futures. Where ancient wisdom meets modern innovation.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            {[
              { icon: <Linkedin />, href: '#' },
              { icon: <Github />, href: '#' },
              { icon: <Instagram />, href: '#' },
              { icon: <Twitter />, href: '#' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-gold transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6" />

          <p className="text-gray-500 text-sm">
            © 2024 Thanatsitt Santisamranwilai. Crafted with ❤️ and ✨ in London & Bangkok.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop: React.FC<{ scrolled: boolean }> = ({ scrolled }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.button
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-gold to-yellow-500 text-black rounded-full shadow-2xl z-40 flex items-center justify-center group"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="text-xl group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Main App Component
const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-purple via-cosmic-blue to-stellar-purple text-white overflow-x-hidden">
      <Toaster position="top-right" />
      
      {/* Particle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Navigation 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
      <ScrollToTop scrolled={scrolled} />
    </div>
  );
};

export default App;
