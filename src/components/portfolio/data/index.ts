import { Project, GalleryImage, Testimonial, SkillCategory } from '../types';

export const projects: Project[] = [
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

export const galleryImages: GalleryImage[] = [
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

export const testimonials: Testimonial[] = [
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

export const skillCategories: SkillCategory[] = [
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
