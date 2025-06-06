import React from 'react';
import { motion } from 'framer-motion';

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

export default MoonAnimation;
