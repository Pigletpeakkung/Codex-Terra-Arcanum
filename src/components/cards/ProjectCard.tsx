import React from 'react';
import { motion } from 'framer-motion';
import { Code, Eye, ExternalLink } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
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

export default ProjectCard;
