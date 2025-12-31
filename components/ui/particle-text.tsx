'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface ParticleTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  className?: string;
  particleColor?: string;
  as?: React.ElementType;
}

export function ParticleText({
  text,
  className = '',
  particleColor = '#ffffff',
  as: Wrapper = 'span',
  ...props
}: ParticleTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    char: string;
    x: number;
    y: number;
    rotate: number;
    scale: number;
  }>>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const explode = () => {
    if (!containerRef.current) return;
    
    const chars = text.split('');
    const newParticles = chars.map((char, i) => ({
      id: i,
      char,
      x: (Math.random() - 0.5) * 200, // Random x position (-100 to 100)
      y: (Math.random() - 0.5) * 200, // Random y position (-100 to 100)
      rotate: (Math.random() - 0.5) * 60, // Random rotation (-30 to 30 degrees)
      scale: 0.5 + Math.random(), // Random scale (0.5 to 1.5)
    }));
    
    setParticles(newParticles);
    
    // Reset after animation completes
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Wrapper 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        explode();
      }}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
      {...props}
    >
      <AnimatePresence>
        {particles.length > 0 ? (
          particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              animate={{ 
                x: particle.x, 
                y: particle.y, 
                opacity: 0,
                scale: particle.scale,
                rotate: particle.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
              style={{
                color: particleColor,
                transformOrigin: "center center",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              {particle.char}
            </motion.span>
          ))
        ) : (
          <span>{text}</span>
        )}
      </AnimatePresence>
      {/* Invisible text to maintain layout */}
      <span className="invisible">{text}</span>
    </Wrapper>
  );
}
