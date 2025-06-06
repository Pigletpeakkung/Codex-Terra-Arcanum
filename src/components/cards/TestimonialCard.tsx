import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
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

export default TestimonialCard;
