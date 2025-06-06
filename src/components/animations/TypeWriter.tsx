import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text, speed = 150 }) => {
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

export default TypeWriter;
