import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Eye } from 'lucide-react';
import { GalleryImage } from '../../types';

interface GalleryRowProps {
  images: GalleryImage[];
  direction: 'left' | 'right';
  onImageClick: (index: number) => void;
}

const GalleryRow: React.FC<GalleryRowProps> = ({ images, direction, onImageClick }) => {
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

export default GalleryRow;
