export interface Project {
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

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  category: string;
}

export interface Testimonial {
  id: string;
  text: string;
  client: string;
  position: string;
  company: string;
  projectType: string;
  rating: number;
}

export interface Skill {
  name: string;
  percentage: number;
  icon: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: Skill[];
}

export interface ContactForm {
  name: string;
  email: string;
  service: string;
  message: string;
}
