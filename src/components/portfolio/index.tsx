import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Menu, Eye, ExternalLink, Send, Star, Globe, Clock, Heart, Palette, Code, MessageCircle, Crown, Users, CheckCircle, ArrowRight, Github, Linkedin, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Portfolio_index.css';

// Types
interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  year: string;
  tags: string[];
  features: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
}

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
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

interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

interface ContactForm {
  name: string;
  email: string;
  service: string;
  message: string;
}

// Data
const projects: Project[] = [
  {
    id: '1',
    title: 'Cultural AI Assistant',
    description: 'AI-powered cultural consulting platform bridging Eastern and Western business practices.',
    fullDescription: 'An innovative AI assistant designed to help international businesses navigate cultural differences between Eastern and Western markets. The platform uses advanced natural language processing to provide culturally-sensitive advice and recommendations.',
    icon: 'robot',
    year: '2024',
    tags: ['AI', 'Cultural Consulting', 'Python', 'NLP'],
    features: [
      'Multi-language support (English, Thai, Mandarin)',
      'Cultural etiquette guidance',
      'Business practice recommendations',
      'Real-time cultural translation',
      'Interactive cultural assessment tools'
    ]
  },
  {
    id: '2',
    title: 'Sustainable Fashion Collection',
    description: 'Eco-conscious fashion line blending traditional Thai craftsmanship with modern sustainable practices.',
    fullDescription: 'A groundbreaking fashion collection that honors traditional Thai weaving techniques while embracing modern sustainable materials and production methods.',
    icon: 'leaf',
    year: '2023',
    tags: ['Fashion Design', 'Sustainability', 'Traditional Crafts'],
    features: [
      'Organic cotton and bamboo fiber materials',
      'Traditional hand-weaving techniques',
      'Zero-waste pattern design',
      'Local artisan collaboration',
      'Biodegradable packaging'
    ]
  },
  {
    id: '3',
    title: 'Voice Acting Portfolio Platform',
    description: 'Interactive web platform showcasing multi-lingual voice acting capabilities across different media.',
    fullDescription: 'A comprehensive platform showcasing voice acting work across multiple languages and media formats, featuring interactive audio samples and booking capabilities.',
    icon: 'mic',
    year: '2024',
    tags: ['Voice Acting', 'Web Design', 'Audio Production'],
    features: [
      'Multi-language audio samples',
      'Character voice demonstrations',
      'Commercial and narrative portfolio',
      'Interactive booking system',
      'Real-time audio streaming'
    ]
  },
  {
    id: '4',
    title: 'Digital Storytelling App',
    description: 'Mobile application for preserving and sharing traditional stories across cultures.',
    fullDescription: 'A mobile application dedicated to preserving traditional stories from different cultures while making them accessible to modern audiences through interactive storytelling.',
    icon: 'book',
    year: '2023',
    tags: ['Mobile App', 'Storytelling', 'Cultural Preservation'],
    features: [
      'Interactive story maps',
      'Audio narration in multiple languages',
      'Cultural context explanations',
      'Community story submission',
      'Offline reading capabilities'
    ]
  },
  {
    id: '5',
    title: 'London Fashion Week Exhibition',
    description: 'Curated exhibition exploring the intersection of technology and traditional craftsmanship.',
    fullDescription: 'An immersive exhibition that explores how technology can enhance rather than replace traditional craftsmanship, featuring interactive installations and live demonstrations.',
    icon: 'palette',
    year: '2024',
    tags: ['Exhibition Design', 'Fashion', 'Technology Integration'],
    features: [
      'Interactive textile displays',
      'AR-enhanced garment visualization',
      'Live craftsmanship demonstrations',
      'Digital pattern projection',
      'Visitor engagement analytics'
    ]
  },
  {
    id: '6',
    title: 'Cultural Bridge Consulting',
    description: 'Comprehensive consulting framework for international businesses entering Asian markets.',
    fullDescription: 'A strategic consulting framework that helps international businesses successfully enter and operate in Asian markets by understanding cultural nuances and local business practices.',
    icon: 'handshake',
    year: '2024',
    tags: ['Consulting', 'Strategy', 'International Business'],
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
  { id: '1', title: 'Design Sketches', icon: 'pencil', description: 'Early conceptual sketches for fashion collections', category: 'design' },
  { id: '2', title: 'Traditional Weaving', icon: 'grid', description: 'Learning traditional Thai weaving techniques', category: 'craft' },
  { id: '3', title: 'AI Development', icon: 'brain', description: 'Working on machine learning algorithms', category: 'tech' },
  { id: '4', title: 'Cultural Research', icon: 'globe', description: 'Researching cultural patterns and traditions', category: 'research' },
  { id: '5', title: 'Voice Recording', icon: 'mic', description: 'Professional voice acting sessions', category: 'voice' },
  { id: '6', title: 'Fashion Photography', icon: 'camera', description: 'Behind the scenes of fashion shoots', category: 'photo' },
  { id: '7', title: 'Code Development', icon: 'code', description: 'Building innovative web applications', category: 'tech' },
  { id: '8', title: 'Textile Experiments', icon: 'scissors', description: 'Experimenting with sustainable materials', category: 'craft' },
  { id: '9', title: 'Cultural Workshops', icon: 'users', description: 'Leading cultural awareness workshops', category: 'workshop' },
  { id: '10', title: 'Design Process', icon: 'compass', description: 'Technical fashion design process', category: 'design' },
  { id: '11', title: 'AI Training', icon: 'cpu', description: 'Training AI models for cultural understanding', category: 'tech' },
  { id: '12', title: 'Collaboration', icon: 'handshake', description: 'Working with international teams', category: 'collab' },
  { id: '13', title: 'Pattern Making', icon: 'shapes', description: 'Creating sustainable fashion patterns', category: 'design' },
  { id: '14', title: 'Voice Coaching', icon: 'volume', description: 'Voice acting coaching sessions', category: 'voice' },
  { id: '15', title: 'Tech Innovation', icon: 'lightbulb', description: 'Innovative technology solutions', category: 'tech' },
  { id: '16', title: 'Cultural Events', icon: 'calendar', description: 'Participating in cultural events', category: 'event' },
  { id: '17', title: 'Writing Process', icon: 'pen', description: 'Creative writing and content creation', category: 'writing' },
  { id: '18', title: 'Fashion Shows', icon: 'shirt', description: 'Runway shows and fashion presentations', category: 'fashion' },
  { id: '19', title: 'Digital Art', icon: 'paintbrush', description: 'Digital art and design creation', category: 'art' },
  { id: '20', title: 'Consulting Sessions', icon: 'message-circle', description: 'Client consulting and strategy sessions', category: 'consulting' },
  { id: '21', title: 'Research Travel', icon: 'plane', description: 'Cultural research travels', category: 'travel' },
  { id: '22', title: 'Studio Work', icon: 'home', description: 'Creative work in the studio', category: 'studio' },
  { id: '23', title: 'Presentations', icon: 'presentation', description: 'Project presentations and pitches', category: 'presentation' },
  { id: '24', title: 'Inspiration', icon: 'star', description: 'Sources of creative inspiration', category: 'inspiration' }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    text: "Thanatsitt's unique perspective bridging Thai and British cultures brought invaluable insights to our international expansion. Their fashion designs perfectly captured our brand's essence while respecting local cultural nuances.",
    client: "Sarah Chen",
    position: "Creative Director",
    company: "London Fashion House",
    projectType: "Fashion Design",
    rating: 5
  },
  {
    id: '2',
    text: "The AI cultural consulting platform Thanatsitt developed for us has revolutionized how we approach international markets. Their technical expertise combined with deep cultural understanding is truly exceptional.",
    client: "Marcus Thompson",
    position: "CTO",
    company: "TechStart London",
    projectType: "AI Development",
    rating: 5
  },
  {
    id: '3',
    text: "Working with Thanatsitt on our cultural preservation project was enlightening. Their ability to translate complex cultural concepts into accessible digital experiences is remarkable.",
    client: "Dr. Priya Patel",
    position: "Research Director",
    company: "Cultural Institute",
    projectType: "Cultural Consulting",
    rating: 5
  },
  {
    id: '4',
    text: "Thanatsitt's voice acting brought our international campaign to life. Their multilingual capabilities and cultural sensitivity made our global launch a tremendous success.",
    client: "James Wilson",
    position: "Founder",
    company: "Digital Agency",
    projectType: "Voice Acting",
    rating: 5
  },
  {
    id: '5',
    text: "The web development work Thanatsitt delivered exceeded our expectations. Their attention to cultural details and user experience design created a platform that truly resonates with our diverse audience.",
    client: "Emma Rodriguez",
    position: "Producer",
    company: "Media Productions",
    projectType: "Web Development",
    rating: 5
  },
  {
    id: '6',
    text: "Thanatsitt's writing captures the perfect balance between professional expertise and cultural authenticity. Their content strategy helped us connect with Asian markets in ways we never thought possible.",
    client: "David Kim",
    position: "Brand Manager",
    company: "Global Corp",
    projectType: "Content Writing",
    rating: 5
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: 'Design',
    icon: 'palette',
    color: 'from-gold to-yellow-400',
    skills: [
      { name: 'Fashion Design', percentage: 95, icon: 'shirt' },
      { name: 'UI/UX Design', percentage: 88, icon: 'monitor' },
      { name: 'Visual Identity', percentage: 92, icon: 'eye' }
    ]
  },
  {
    title: 'Technology',
    icon: 'code',
    color: 'from-blue-500 to-purple-600',
    skills: [
      { name: 'AI Development', percentage: 85, icon: 'cpu' },
      { name: 'Web Development', percentage: 80, icon: 'globe' },
      { name: 'Video Editing', percentage: 78, icon: 'video' }
    ]
  },
  {
    title: 'Communication',
    icon: 'message-circle',
    color: 'from-green-500 to-teal-600',
    skills: [
      { name: 'Voice Acting', percentage: 82, icon: 'mic' },
      { name: 'Writing', percentage: 90, icon: 'pen' },
      { name: 'Public Speaking', percentage: 85, icon: 'users' }
    ]
  },
  {
    title: 'Leadership',
    icon: 'crown',
    color: 'from-purple-500 to-pink-600',
    skills: [
      { name: 'Team Management', percentage: 88, icon: 'users' },
      { name: 'Project Planning', percentage: 92, icon: 'calendar' },
      { name: 'Strategic Thinking', percentage: 90, icon: 'target' }
    ]
  }
];

// Components
const ParticleBackground: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 5
  }));

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            y: [-20, -10, 0],
            rotate: [0, 1, -1, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const MoonAnimation: React.FC = () => {
  const stars = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.5
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
            'radial-gradient(circle at 30% 30%, #D4AF37 0%, #F4D03F 30%, #FFF 100%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
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
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        className="orbiting-moon"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="orbiting-moon-element" />
      </motion.div>
    </div>
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
    <span className="typing-cursor">
      {displayText}
    </span>
  );
};

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="card-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onViewportEnter={() => setIsVisible(true)}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="card-front"
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Palette className="text-2xl text-black" />
          </div>
          <h3 className="text-xl font-bold text-gold">{category.title}</h3>
        </div>

        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <div key={skillIndex} className="skill-item">
              <div className="flex justify-between mb-2">
                <span className="text-white">{skill.name}</span>
                <span className="text-gold">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="skill-bar rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: isVisible ? `${skill.percentage}%` : 0 }}
                  transition={{ duration: 2, delay: skillIndex * 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="card-back"
        animate={{ rotateY: isFlipped ? 0 : 180 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-gold mb-6">{category.title} Expertise</h3>
        <div className="space-y-4 text-white">
          {category.skills.map((skill, skillIndex) => (
            <div key={skillIndex} className="flex items-center justify-center space-x-2">
              <Users className="text-gold" size={16} />
              <span>{skill.name} - {skill.percentage}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <motion.div
      className="glass-morphism rounded-2xl overflow-hidden card-hover cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
    >
      <div className="h-64 bg-gradient-to-br from-gold/20 to-purple-600/20 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
        <Code className="text-6xl text-gold/70" />
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
            <Eye className="text-gold hover:animate-bounce cursor-pointer" size={16} />
            <ExternalLink className="text-gold hover:animate-bounce cursor-pointer" size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      className="glass-morphism rounded-2xl p-8 card-hover testimonial-card"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="flex mb-4">
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <Star key={i} className="text-gold text-lg fill-current" size={16} />
        ))}
      </div>

      <blockquote className="text-gray-300 mb-6 text-lg italic leading-relaxed">
        "{testimonial.text}"
      </blockquote>

      <div className="border-t border-gray-600 pt-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center">
            <span className="font-bold text-black text-lg">
              {testimonial.client.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white">{testimonial.client}</h4>
            <p className="text-gold text-sm">{testimonial.position}</p>
            <p className="text-gray-400 text-xs">{testimonial.company}</p>
          </div>
        </div>

        <div className="mt-4">
          <span className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full">
            {testimonial.projectType}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const GalleryRow: React.FC<{ images: GalleryImage[]; direction: 'left' | 'right'; onImageClick: (index: number) => void }> = ({ images, direction, onImageClick }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex space-x-6"
        animate={{
          x: direction === 'left' ? ['100%', '-100%'] : ['-100%', '100%']
        }}
        transition={{
          duration: direction === 'left' ? 20 : 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...images, ...images].map((image, index) => (
          <motion.div
            key={`${image.id}-${index}`}
            className="w-80 h-60 glass-morphism rounded-2xl overflow-hidden shrink-0 cursor-pointer relative group"
            whileHover={{ scale: 1.05 }}
            onClick={() => onImageClick(images.findIndex(img => img.id === image.id))}
          >
            <div className="w-full h-full bg-gradient-to-br from-gold/20 to-purple-600/20 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              <Palette className="text-4xl text-gold/70" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="text-gold text-2xl mb-2 mx-auto" />
                  <p className="text-white font-semibold">{image.title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-morphism rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Portfolio Component
const Portfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const formRef = useRef<HTMLFormElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const openGalleryModal = (index: number) => {
    setSelectedGalleryIndex(index);
    setSelectedGalleryImage(galleryImages[index]);
  };

  const closeGalleryModal = () => {
    setSelectedGalleryImage(null);
  };

  const previousGalleryImage = () => {
    const newIndex = selectedGalleryIndex > 0 ? selectedGalleryIndex - 1 : galleryImages.length - 1;
    setSelectedGalleryIndex(newIndex);
    setSelectedGalleryImage(galleryImages[newIndex]);
  };

  const nextGalleryImage = () => {
    const newIndex = selectedGalleryIndex < galleryImages.length - 1 ? selectedGalleryIndex + 1 : 0;
    setSelectedGalleryIndex(newIndex);
    setSelectedGalleryImage(galleryImages[newIndex]);
  };

  const handleContactFormChange = (field: keyof ContactForm, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormStatus('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('');

    try {
      // Replace with your EmailJS configuration
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current!,
        'YOUR_PUBLIC_KEY'
      );

      setFormStatus('Message sent successfully! I\'ll get back to you soon.');
      setContactForm({ name: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  return (
    <div className="hero-bg text-white min-h-screen custom-scrollbar overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-yellow-400 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Moon Animation */}
      <div className="fixed top-20 right-20 z-10 hidden lg:block">
        <MoonAnimation />
      </div>

      {/* Navigation */}
      <motion.nav
        className={`fixed w-full z-40 transition-all duration-500 ${
          scrolled ? 'glass-morphism shadow-2xl' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.a
              href="#"
              className="text-2xl font-bold text-gold hover:animate-glow transition-all duration-300 flex items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative mr-3">
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-400 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212, 175, 55, 0.6)',
                      '0 0 30px rgba(212, 175, 55, 0.8)',
                      '0 0 20px rgba(212, 175, 55, 0.6)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-full" />
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full" />
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/20 rounded-full" />
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              <span className="text-shadow group-hover:text-yellow-300 transition-colors">
                Thanatsitt
              </span>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'portfolio', 'skills', 'gallery', 'testimonials', 'contact'].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className="nav-link relative group px-3 py-2 capitalize"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10">{section === 'testimonials' ? 'Reviews' : section}</span>
                  <motion.div
                    className="absolute inset-0 bg-gold/20 rounded-lg"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="md:hidden pb-4 glass-morphism rounded-b-2xl"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {['home', 'about', 'portfolio', 'skills', 'gallery', 'testimonials', 'contact'].map((section) => (
                  <motion.a
                    key={section}
                    href={`#${section}`}
                    className="block py-3 px-4 hover:bg-gold/20 rounded-lg transition-colors capitalize"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section);
                    }}
                    whileHover={{ x: 10 }}
                  >
                    {section === 'testimonials' ? 'Reviews' : section}
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gold/20 rounded-full hidden lg:block"
          animate={{
            y: [-20, -10, 0],
            rotate: [0, 1, -1, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-moon-silver/20 rounded-full hidden lg:block"
          animate={{
            y: [-20, -10, 0],
            rotate: [0, 1, -1, 0]
          }}
          transition={{
            duration: 6,
            delay: -2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-shadow">
              <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
                <TypeWriter text="Thanatsitt" />
              </span>
            </h1>
            <motion.div
              className="h-2 w-32 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <Eye className="mr-3" size={20} />
                Explore Portfolio
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="group border-2 border-moon-silver text-moon-silver px-10 py-5 rounded-full font-bold text-lg relative overflow-hidden"
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(192, 192, 200, 1)', color: 'black' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                <Send className="mr-3" size={20} />
                Get In Touch
              </span>
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
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Twitter, href: '#', label: 'Twitter' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="text-3xl text-gray-400 hover:text-gold transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -5 }}
                aria-label={label}
              >
                <Icon size={32} />
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
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">About Me</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-morphism rounded-3xl p-8 card-hover">
                <div className="aspect-square bg-gradient-to-br from-gold/20 to-purple-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
                  <Users className="text-8xl text-gold/50" />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 glass-morphism rounded-full p-4"
                animate={{
                  y: [-20, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Palette className="text-2xl text-gold" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 glass-morphism rounded-full p-4"
                animate={{
                  y: [-20, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{
                  duration: 6,
                  delay: -1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Code className="text-2xl text-gold" />
              </motion.div>
            </motion.div>

            {/* About Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="glass-morphism rounded-2xl p-8 card-hover"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gold flex items-center">
                  <Star className="mr-3" />
                  Cultural Navigator
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Born from the intersection of Thai heritage and British innovation, I navigate the delicate balance between preserving ancient wisdom and embracing cutting-edge technology. My journey spans continents and disciplines, always seeking to bridge cultural divides through design and technology.
                </p>
              </motion.div>

              <motion.div
                className="glass-morphism rounded-2xl p-8 card-hover"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gold flex items-center">
                  <Globe className="mr-3" />
                  Educational Journey
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <Globe className="text-gold" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">London College of Fashion</h4>
                      <p className="text-gray-400">Fashion Design & Cultural Studies</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <Code className="text-gold" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">AI & Technology</h4>
                      <p className="text-gray-400">Self-taught Developer & Co-founder</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-morphism rounded-2xl p-8 card-hover"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-gold flex items-center">
                  <Heart className="mr-3" />
                  Philosophy
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  I believe technology should enhance human connection, not replace it. Every project I undertake is guided by principles of cultural sensitivity, ethical innovation, and the timeless wisdom that beauty and function are inseparable.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Skills & Expertise</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Portfolio</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => openProjectModal(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Creative Gallery</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              A visual journey through my creative process, inspirations, and cultural explorations
            </p>
          </motion.div>

          <div className="space-y-8">
            <GalleryRow
              images={galleryImages.slice(0, 8)}
              direction="left"
              onImageClick={openGalleryModal}
            />
            <GalleryRow
              images={galleryImages.slice(8, 16)}
              direction="right"
              onImageClick={(index) => openGalleryModal(index + 8)}
            />
            <GalleryRow
              images={galleryImages.slice(16, 24)}
              direction="left"
              onImageClick={(index) => openGalleryModal(index + 16)}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Client Reviews</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
            <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
              What clients say about working with me across different industries and cultures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gold mb-4">Ready to Work Together?</h3>
              <p className="text-gray-300 mb-6">Join these satisfied clients and let's create something extraordinary together.</p>
              <motion.button
                className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-3 rounded-full font-bold"
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="inline mr-2" size={16} />
                Start Your Project
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold text-shadow">Let's Connect</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gold to-yellow-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-6 text-gold flex items-center">
                  <Globe className="mr-3" />
                  Global Reach
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <MapPin className="text-gold" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">London, UK</h4>
                      <p className="text-gray-400">Primary Location</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <MapPin className="text-gold" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Bangkok, Thailand</h4>
                      <p className="text-gray-400">Cultural Hub</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-6 text-gold flex items-center">
                  <Clock className="mr-3" />
                  Availability
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Available for projects worldwide. I work across time zones to accommodate international clients and collaborate with diverse teams.
                </p>
              </div>

              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold mb-6 text-gold flex items-center">
                  <Users className="mr-3" />
                  Let's Collaborate
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Whether you need fashion design, AI development, cultural consulting, or voice acting services, I'm here to bring your vision to life with cultural sensitivity and technical excellence.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="glass-morphism rounded-2xl p-8 card-hover"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gold flex items-center">
                <Mail className="mr-3" />
                Send Message
              </h3>

              <form ref={formRef} className="space-y-6" onSubmit={sendMessage}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-white font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="user_name"
                      value={contactForm.name}
                      onChange={(e) => handleContactFormChange('name', e.target.value)}
                      className="form-input w-full"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-white font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="user_email"
                      value={contactForm.email}
                      onChange={(e) => handleContactFormChange('email', e.target.value)}
                      className="form-input w-full"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-white font-medium mb-2">
                    Service Needed
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={contactForm.service}
                    onChange={(e) => handleContactFormChange('service', e.target.value)}
                    className="form-input w-full"
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
                  <label htmlFor="contact-message" className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={contactForm.message}
                    onChange={(e) => handleContactFormChange('message', e.target.value)}
                    rows={5}
                    className="form-input w-full resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                <AnimatePresence>
                  {formStatus && (
                    <motion.div
                      className={`status-message ${
                        formStatus.includes('success') ? 'status-success' : 'status-error'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {formStatus}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              className="flex justify-center items-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mr-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-400 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(212, 175, 55, 0.6)',
                      '0 0 30px rgba(212, 175, 55, 0.8)',
                      '0 0 20px rgba(212, 175, 55, 0.6)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-full" />
                  <div className="absolute top-2 left-2 w-3 h-3 bg-white/30 rounded-full" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/20 rounded-full" />
                  <div className="absolute top-1/2 right-1 w-1 h-1 bg-white/40 rounded-full" />
                </motion.div>
                {/* Twinkling stars around footer moon */}
                {Array.from({ length: 3 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: i === 0 ? '-8px' : i === 1 ? '48px' : '0px',
                      left: i === 0 ? '48px' : i === 1 ? '-8px' : '-12px'
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      delay: i,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gold">Thanatsitt Santisamranwilai</h3>
            </motion.div>

            <motion.p
              className="text-gray-400 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bridging cultures, creating futures. Where ancient wisdom meets modern innovation.
            </motion.p>

            <motion.div
              className="flex justify-center space-x-6 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' }
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-gold transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />

            <motion.p
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              © 2024 Thanatsitt Santisamranwilai. Crafted with ❤️ and 🌙 in London & Bangkok.
            </motion.p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <Modal isOpen={!!selectedProject} onClose={closeProjectModal}>
        {selectedProject && (
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-gold">{selectedProject.title}</h2>
              <motion.button
                onClick={closeProjectModal}
                className="text-gray-400 hover:text-white text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                  <Code className="text-6xl text-gold/70" />
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gold/20 text-gold text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.fullDescription}</p>

                <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                <ul className="space-y-2 mb-6">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="text-gold mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex space-x-4">
                  <motion.button
                    className="bg-gradient-to-r from-gold to-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye size={16} />
                    <span>Live Demo</span>
                  </motion.button>
                  <motion.button
                    className="border-2 border-gold text-gold px-6 py-3 rounded-lg font-bold hover:bg-gold hover:text-black transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={16} />
                    <span>Source Code</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Gallery Modal */}
      <Modal isOpen={!!selectedGalleryImage} onClose={closeGalleryModal}>
        {selectedGalleryImage && (
          <div className="max-w-4xl w-full">
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-video bg-gradient-to-br from-gold/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                <Palette className="text-8xl text-gold/70" />
              </div>

              {/* Navigation Arrows */}
              <motion.button
                onClick={previousGalleryImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={nextGalleryImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} />
              </motion.button>

              {/* Close Button */}
              <motion.button
                onClick={closeGalleryModal}
                className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              {/* Image Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gold mb-2">{selectedGalleryImage.title}</h3>
                <p className="text-gray-300">{selectedGalleryImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Portfolio;
