import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Users } from 'lucide-react';
import { SkillCategory } from '../../types';

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
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

export default SkillCard;
