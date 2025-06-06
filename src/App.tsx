import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

interface GalleryImage {
  title: string;
  icon: string;
  description: string;
  imageUrl?: string;
}

interface Testimonial {
  text: string;
  client: string;
  position: string;
  company: string;
  projectType: string;
  avatarUrl?: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Projects data with image URLs
  const projects: Project[] = [
    {
      title: 'Cultural AI Assistant',
      description: 'AI-powered cultural consulting platform bridging Eastern and Western business practices.',
      icon: 'fas fa-robot',
      year: '2024',
      tags: ['AI', 'Cultural Consulting', 'Python', 'NLP'],
      fullDescription: 'An innovative AI assistant designed to help international businesses navigate cultural differences between Eastern and Western markets.',
      features: [
        'Multi-language support (English, Thai, Mandarin)',
        'Cultural etiquette guidance',
        'Business practice recommendations',
        'Real-time cultural translation',
        'Interactive cultural assessment tools'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      demoUrl: 'https://demo.example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      title: 'Sustainable Fashion Collection',
      description: 'Eco-conscious fashion line blending traditional Thai craftsmanship with modern sustainable practices.',
      icon: 'fas fa-leaf',
      year: '2023',
      tags: ['Fashion Design', 'Sustainability', 'Traditional Crafts'],
      fullDescription: 'A groundbreaking fashion collection that honors traditional Thai weaving techniques while embracing modern sustainable materials.',
      features: [
        'Organic cotton and bamboo fiber materials',
        'Traditional hand-weaving techniques',
        'Zero-waste pattern design',
        'Local artisan collaboration',
        'Biodegradable packaging'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop',
      demoUrl: 'https://fashion.example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      title: 'Voice Acting Portfolio Platform',
      description: 'Interactive web platform showcasing multi-lingual voice acting capabilities across different media.',
      icon: 'fas fa-microphone',
      year: '2024',
      tags: ['Voice Acting', 'Web Design', 'Audio Production'],
      fullDescription: 'A comprehensive platform showcasing voice acting work across multiple languages and media formats.',
      features: [
        'Multi-language audio samples',
        'Character voice demonstrations',
        'Commercial and narrative portfolio',
        'Interactive booking system',
        'Real-time audio streaming'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=600&fit=crop',
      demoUrl: 'https://voice.example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      title: 'Digital Storytelling App',
      description: 'Mobile application for preserving and sharing traditional stories across cultures.',
      icon: 'fas fa-book-open',
      year: '2023',
      tags: ['Mobile App', 'Storytelling', 'Cultural Preservation'],
      fullDescription: 'A mobile application dedicated to preserving traditional stories from different cultures.',
      features: [
        'Interactive story maps',
        'Audio narration in multiple languages',
        'Cultural context explanations',
        'Community story submission',
        'Offline reading capabilities'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      demoUrl: 'https://stories.example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      title: 'London Fashion Week Exhibition',
      description: 'Curated exhibition exploring the intersection of technology and traditional craftsmanship.',
      icon: 'fas fa-palette',
      year: '2024',
      tags: ['Exhibition Design', 'Fashion', 'Technology Integration'],
      fullDescription: 'An immersive exhibition that explores how technology can enhance rather than replace traditional craftsmanship.',
      features: [
        'Interactive textile displays',
        'AR-enhanced garment visualization',
        'Live craftsmanship demonstrations',
        'Digital pattern projection',
        'Visitor engagement analytics'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      demoUrl: 'https://exhibition.example.com',
      githubUrl: 'https://github.com/example'
    },
    {
      title: 'Cultural Bridge Consulting',
      description: 'Comprehensive consulting framework for international businesses entering Asian markets.',
      icon: 'fas fa-handshake',
      year: '2024',
      tags: ['Consulting', 'Strategy', 'International Business'],
      fullDescription: 'A strategic consulting framework that helps international businesses successfully enter and operate in Asian markets.',
      features: [
        'Market entry strategy development',
        'Cultural sensitivity training',
        'Local partnership facilitation',
        'Communication protocol guides',
        'Ongoing cultural advisory support'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
      demoUrl: 'https://consulting.example.com',
      githubUrl: 'https://github.com/example'
    }
  ];

  // Gallery images with URLs
  const galleryImages: GalleryImage[] = [
    { 
      title: 'Design Sketches', 
      icon: 'fas fa-pencil-ruler', 
      description: 'Early conceptual sketches for fashion collections',
      imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop'
    },
    { 
      title: 'Traditional Weaving', 
      icon: 'fas fa-loom', 
      description: 'Learning traditional Thai weaving techniques',
      imageUrl: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=400&h=300&fit=crop'
    },
    { 
      title: 'AI Development', 
      icon: 'fas fa-brain', 
      description: 'Working on machine learning algorithms',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop'
    },
    { 
      title: 'Cultural Research', 
      icon: 'fas fa-globe-asia', 
      description: 'Researching cultural patterns and traditions',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'
    },
    { 
      title: 'Voice Recording', 
      icon: 'fas fa-microphone-alt', 
      description: 'Professional voice acting sessions',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop'
    },
    { 
      title: 'Fashion Photography', 
      icon: 'fas fa-camera', 
      description: 'Behind the scenes of fashion shoots',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop'
    },
    { 
      title: 'Code Development', 
      icon: 'fas fa-code', 
      description: 'Building innovative web applications',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop'
    },
    { 
      title: 'Textile Experiments', 
      icon: 'fas fa-cut', 
      description: 'Experimenting with sustainable materials',
      imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop'
    },
    { 
      title: 'Cultural Workshops', 
      icon: 'fas fa-users', 
      description: 'Leading cultural awareness workshops',
      imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop'
    },
    { 
      title: 'Tech Innovation', 
      icon: 'fas fa-lightbulb', 
      description: 'Exploring new technology solutions',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
    }
  ];

  // Testimonials with avatar URLs
  const testimonials: Testimonial[] = [
    {
      text: "Thanatsitt's unique perspective bridging Thai and British cultures brought invaluable insights to our international expansion.",
      client: "Sarah Chen",
      position: "Creative Director",
      company: "London Fashion House",
      projectType: "Fashion Design",
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: "The AI cultural consulting platform Thanatsitt developed for us has revolutionized how we approach international markets.",
      client: "Marcus Thompson",
      position: "CTO",
      company: "TechStart London",
      projectType: "AI Development",
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: "Working with Thanatsitt on our sustainable fashion line was transformative. Their understanding of traditional craftsmanship is exceptional.",
      client: "Emma Rodriguez",
      position: "Sustainability Director",
      company: "EcoFashion Collective",
      projectType: "Sustainable Fashion",
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      text: "The voice acting portfolio platform exceeded our expectations. Thanatsitt's attention to detail and cultural sensitivity is remarkable.",
      client: "David Kim",
      position: "Audio Producer",
      company: "Global Media Productions",
      projectType: "Voice Acting Platform",
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  // Skills data
  const skillCategories: SkillCategory[] = [
    {
      title: 'Technical Skills',
      icon: 'fas fa-code',
      color: 'from-blue-500 to-purple-600',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'JavaScript/TypeScript', level: 85 },
        { name: 'React/Next.js', level: 88 },
        { name: 'Machine Learning', level: 82 },
        { name: 'Data Analysis', level: 85 }
      ]
    },
    {
      title: 'Creative Skills',
      icon: 'fas fa-palette',
      color: 'from-pink-500 to-rose-600',
      skills: [
        { name: 'Fashion Design', level: 95 },
        { name: 'UI/UX Design', level: 80 },
        { name: 'Voice Acting', level: 92 },
        { name: 'Creative Direction', level: 88 },
        { name: 'Brand Strategy', level: 85 }
      ]
    },
    {
      title: 'Cultural & Language',
      icon: 'fas fa-globe',
      color: 'from-green-500 to-teal-600',
      skills: [
        { name: 'English (Native)', level: 100 },
        { name: 'Thai (Native)', level: 100 },
        { name: 'Mandarin', level: 75 },
        { name: 'Cultural Consulting', level: 95 },
        { name: 'Cross-Cultural Communication', level: 98 }
      ]
    }
  ];

  // Star Field Component
  const StarField: React.FC = () => {
    const [stars, setStars] = useState<Array<{
      id: number;
      type: 'shine' | 'twinkle' | 'pulse' | 'shooting' | 'burst';
      x: number;
      y: number;
      delay: number;
    }>>([]);

    useEffect(() => {
      const generateStars = () => {
        const newStars = [];
        
        // Generate different types of stars
        for (let i = 0; i < 50; i++) {
          newStars.push({
            id: i,
            type: ['shine', 'twinkle', 'pulse'][Math.floor(Math.random() * 3)] as any,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5
          });
        }
        
        // Add some shooting stars
        for (let i = 50; i < 55; i++) {
          newStars.push({
            id: i,
            type: 'shooting',
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 10
          });
        }
        
        // Add some star bursts
        for (let i = 55; i < 60; i++) {
          newStars.push({
            id: i,
            type: 'burst',
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 8
          });
        }
        
        setStars(newStars);
      };

      generateStars();
    }, []);

    return (
      <div className="star-field">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`${star.type === 'shine' ? 'shining-star' : 
                       star.type === 'twinkle' ? 'twinkling-star' :
                       star.type === 'pulse' ? 'pulsing-star' :
                       star.type === 'shooting' ? 'shooting-star' :
                       'star-burst'}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>
    );
  };

  // Optimized Image Component
  const OptimizedImage: React.FC<{
    src?: string;
    alt: string;
    className?: string;
    fallbackIcon?: string;
  }> = ({ src, alt, className = '', fallbackIcon = 'fas fa-image' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(false);
    };

    if (!src || hasError) {
      return (
        <div className={`image-placeholder ${className}`}>
          <i className={`${fallbackIcon} text-4xl text-gold/50`}></i>
        </div>
      );
    }

    return (
      <div className={`relative ${className}`}>
        {!isLoaded && (
          <div className="absolute inset-0 image-placeholder">
            <i className={`${fallbackIcon} text-4xl text-gold/50`}></i>
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      </div>
    );
  };

  // Intersection Observer Hook
  const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
          ...options
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return [ref, isIntersecting] as const;
  };

  // Project Modal Component
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
                <OptimizedImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="aspect-video rounded-xl mb-6"
                  fallbackIcon={project.icon}
                />
                
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
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-gold to-yellow-500 text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transform transition-all duration-300"
                    >
                      <i className="fas fa-eye mr-2"></i>
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-2 border-gold text-gold px-6 py-3 rounded-lg font-bold hover:bg-gold hover:text-black transition-all duration-300"
                    >
                      <i className="fab fa-github mr-2"></i>
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Gallery Modal Component
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
            <OptimizedImage
              src={image.imageUrl}
              alt={image.title}
              className="aspect-video rounded-xl mb-6"
              fallbackIcon={image.icon}
            />
            
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
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gold mb-2">{image.title}</h3>
              <p className="text-gray-300">{image.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Skill Category Component
  const SkillCategory: React.FC<{ category: SkillCategory }> = ({ category }) => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
      <div ref={ref} className="glass-morphism rounded-2xl p-8 card-hover gpu-accelerated">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 gpu-accelerated`}>
            <i className={`${category.icon} text-2xl text-white`}></i>
          </div>
          <h3 className="text-xl font-bold text-gold">{category.title}</h3>
        </div>
        
        <div className="space-y-4">
          {category.skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="flex justify-between mb-2">
                <span className="text-white">{skill.name}</span>
                <span className="text-gold">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="skill-bar rounded-full h-2"
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transition: 'width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Gallery Row Component
  const GalleryRow: React.FC<{
    images: GalleryImage[];
    direction: 'left' | 'right';
    onImageClick: (index: number) => void;
    startIndex: number;
    delay?: boolean;
  }> = ({ images, direction, onImageClick, startIndex, delay = false }) => {
    const animationClass = direction === 'left' ? 'animate-slide-left' : 'animate-slide-right';
    const delayStyle = delay ? { animationDelay: '-10s' } : {};

    const handleImageClick = useCallback((index: number) => {
      onImageClick(startIndex + index);
    }, [onImageClick, startIndex]);

    return (
      <div className="relative overflow-hidden">
        <div className={`flex space-x-6 ${animationClass} gallery-scroll gpu-accelerated`} style={delayStyle}>
          {Array.from({ length: 2 }, (_, i) => (
            <div key={i} className="flex space-x-6 shrink-0">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-80 h-60 glass-morphism rounded-2xl overflow-hidden shrink-0 cursor-pointer card-hover relative group gpu-accelerated"
                  onClick={() => handleImageClick(index)}
                >
                  <OptimizedImage
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full"
                    fallbackIcon={image.icon}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <i className="fas fa-expand text-gold text-2xl mb-2"></i>
                      <p className="text-white font-semibold">{image.title}</p>
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

  // Testimonial Card Component
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
        <div className="flex mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <i key={i} className="fas fa-star text-gold text-lg"></i>
          ))}
        </div>
        
        <blockquote className="text-gray-300 mb-6 text-lg italic leading-relaxed">
          {testimonial.text}
        </blockquote>
        
        <div className="border-t border-gray-600 pt-6">
          <div className="flex items-center space-x-4">
            <OptimizedImage
              src={testimonial.avatarUrl}
              alt={testimonial.client}
              className="w-12 h-12 rounded-full"
              fallbackIcon="fas fa-user"
            />
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
      </div>
    );
  };

  // Event Handlers
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const openGalleryModal = (index: number) => {
    setSelectedGalleryImage(galleryImages[index]);
    setSelectedGalleryIndex(index);
    setShowGalleryModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowGalleryModal(false);
    setSelectedProject(null);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="hero-bg text-white min-h-screen custom-scrollbar overflow-x-hidden">
      {/* Star Field Background */}
      <StarField />

      {/* Particle Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 30 }, (_, i) => (
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

      {/* Enhanced Moon Animation */}
      <div className="fixed top-20 right-20 z-10 hidden lg:block">
        <div className="moon-container">
          <div className="animated-moon">
            <div className="moon-crater crater-1"></div>
            <div className="moon-crater crater-2"></div>
            <div className="moon-crater crater-3"></div>
          </div>
          
          <div className="moon-stars">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="shining-star"
                style={{
                  top: ['5%', '10%', '25%', '40%', '60%', '75%', '90%', '95%'][i],
                  left: ['15%', '85%', '5%', '95%', '10%', '90%', '20%', '80%'][i],
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
          
          <div className="orbiting-moon">
            <div className="orbiting-moon-element"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gold animate-pulse-slow">
              <i className="fas fa-moon mr-2"></i>
              Thanatsitt
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Gallery', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link text-white hover:text-gold transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                {['Home', 'About', 'Skills', 'Gallery', 'Portfolio', 'Testimonials', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-link text-white hover:text-gold transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow">
              <span className="text-white">Hello, I'm </span>
              <span className="text-gold animate-glow">Thanatsitt</span>
            </h1>
            
            <div className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300">
              <span className="typing-cursor">Cultural Bridge Builder & Creative Innovator</span>
            </div>
            
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-300">
              Bridging Eastern wisdom with Western innovation through AI, sustainable fashion, 
              and cross-cultural storytelling. From Bangkok to London, creating meaningful 
              connections across cultures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="#portfolio"
                className="bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 animate-bounce-slow"
              >
                <i className="fas fa-rocket mr-2"></i>
                Explore My Work
              </a>
              <a
                href="#contact"
                className="border-2 border-gold text-gold px-8 py-4 rounded-full font-bold text-lg hover:bg-gold hover:text-black transition-all duration-300"
              >
                <i className="fas fa-envelope mr-2"></i>
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A unique blend of Eastern heritage and Western education, creating innovative solutions 
              that bridge cultures and inspire change.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-gold mb-4">
                  <i className="fas fa-globe-asia mr-3"></i>
                  Cultural Heritage
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Born in Thailand with deep roots in traditional craftsmanship and Eastern philosophy, 
                  I bring authentic cultural insights to every project. My understanding of Asian markets 
                  and traditions provides unique value in today's global economy.
                </p>
              </div>

              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-gold mb-4">
                  <i className="fas fa-graduation-cap mr-3"></i>
                  Western Innovation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Educated in London's dynamic creative and tech scene, I've mastered cutting-edge 
                  technologies and contemporary design principles. This Western perspective complements 
                  my Eastern heritage perfectly.
                </p>
              </div>

              <div className="glass-morphism rounded-2xl p-8 card-hover">
                <h3 className="text-2xl font-bold text-gold mb-4">
                  <i className="fas fa-lightbulb mr-3"></i>
                  Creative Fusion
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  My work represents a unique fusion of traditional wisdom and modern innovation. 
                  Whether it's AI development, sustainable fashion, or voice acting, I bring a 
                  distinctive cross-cultural perspective to every endeavor.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="glass-morphism rounded-2xl p-8 text-center">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/20 to-purple-600/20 flex items-center justify-center">
                  <i className="fas fa-user text-6xl text-gold/70"></i>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Thanatsitt Laohakangvalvit</h3>
                <p className="text-gold mb-6">Cultural Bridge Builder & Creative Innovator</p>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gold">5+</div>
                    <div className="text-sm text-gray-300">Years Experience</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gold">3</div>
                    <div className="text-sm text-gray-300">Languages</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gold">50+</div>
                    <div className="text-sm text-gray-300">Projects</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gold">2</div>
                    <div className="text-sm text-gray-300">Continents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Skills & Expertise</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A diverse skill set spanning technology, creativity, and cultural intelligence, 
              honed through years of cross-cultural experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCategory key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Creative Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A visual journey through my creative process, from initial concepts to final implementations.
            </p>
          </div>

          <div className="space-y-8">
            <GalleryRow
              images={galleryImages.slice(0, 5)}
              direction="left"
              onImageClick={openGalleryModal}
              startIndex={0}
            />
            <GalleryRow
              images={galleryImages.slice(5, 10)}
              direction="right"
              onImageClick={openGalleryModal}
              startIndex={5}
              delay={true}
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Innovative projects that showcase the intersection of technology, culture, and creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass-morphism rounded-2xl overflow-hidden card-hover cursor-pointer group"
                onClick={() => openProjectModal(project)}
              >
                <OptimizedImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="aspect-video"
                  fallbackIcon={project.icon}
                />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-gold text-sm">{project.year}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gold group-hover:text-yellow-400 transition-colors">
                    <span className="text-sm font-medium">Learn More</span>
                    <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Client Testimonials</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              What clients and collaborators say about working with me across different projects and cultures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold">Let's Connect</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to bridge cultures and create something amazing together? 
              I'd love to hear about your project and explore how we can collaborate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="glass-morphism rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gold mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <div className="text-white font-medium">Email</div>
                      <div className="text-gray-300">thanatsitt@example.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-phone text-white"></i>
                    </div>
                    <div>
                      <div className="text-white font-medium">Phone</div>
                      <div className="text-gray-300">+44 (0) 20 1234 5678</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-white"></i>
                    </div>
                    <div>
                      <div className="text-white font-medium">Location</div>
                      <div className="text-gray-300">London, UK / Bangkok, Thailand</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-600">
                  <h4 className="text-lg font-bold text-white mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: 'fab fa-linkedin', url: '#', color: 'from-blue-600 to-blue-700' },
                      { icon: 'fab fa-github', url: '#', color: 'from-gray-700 to-gray-800' },
                      { icon: 'fab fa-twitter', url: '#', color: 'from-blue-400 to-blue-500' },
                      { icon: 'fab fa-instagram', url: '#', color: 'from-pink-500 to-purple-600' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className={`w-10 h-10 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center text-white hover:scale-110 transform transition-all duration-300`}
                      >
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gold mb-6">Send a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Project Collaboration"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Tell me about your project and how we can work together..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-yellow-500 text-black px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transform transition-all duration-300"
                >
                  <i className="fas fa-paper-plane mr-2"></i>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gold mb-4">
              <i className="fas fa-moon mr-2"></i>
              Thanatsitt Laohakangvalvit
            </div>
            <p className="text-gray-300 mb-6">
              Bridging cultures, creating futures, one project at a time.
            </p>
            <div className="text-gray-400 text-sm">
              © 2024 Thanatsitt Laohakangvalvit. All rights reserved.
            </div>
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

export default App;
