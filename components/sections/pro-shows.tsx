"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Pro show images - using local images from public/images/pro-shows
const proShowImages = [
  {
    id: 1,
    src: "/images/pro-shows/1.webp",
    label: "Parikrama",
  },
  {
    id: 2,
    src: "/images/pro-shows/2.webp",
    label: "Sama duo",
  },
  {
    id: 3,
    src: "/images/pro-shows/3.webp",
    label: "VJ",
  },
  {
    id: 4,
    src: "/images/pro-shows/4.jpg",
    label: "Night 1",
  },
  {
    id: 5,
    src: "/images/pro-shows/5.jpg",
    label: "DJ Elina",
  },
  {
    id: 6,
    src: "/images/pro-shows/6.jpg",
    label: "Night 2",
  },
];

// Auto-play interval in milliseconds
const AUTO_PLAY_INTERVAL = 3500;

export function ProShows() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality - never stops
  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % proShowImages.length);
      }, AUTO_PLAY_INTERVAL);
    };

    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset interval when manually changing slides
  const handlePillClick = useCallback((index: number) => {
    setActiveIndex(index);
    // Reset the interval to give full time on the new slide
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % proShowImages.length);
      }, AUTO_PLAY_INTERVAL);
    }
  }, []);

  // Calculate positions for each card based on active index with smooth transitions
  const getCardVariants = (index: number) => {
    const totalImages = proShowImages.length;
    let diff = index - activeIndex;

    // Normalize diff to handle circular carousel
    if (diff > totalImages / 2) diff -= totalImages;
    if (diff < -totalImages / 2) diff += totalImages;

    // Smooth spring transition config
    const transition = {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 0.8,
    };

    // Check if mobile (we'll use a simplified approach)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const xOffset = isMobile ? 120 : 200;
    const farXOffset = isMobile ? 80 : 120;

    if (diff === 0) {
      // Active/center card
      return {
        x: 0,
        z: 50,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        transition,
      };
    } else if (diff === -1) {
      // Left card (rotated)
      return {
        x: -xOffset,
        z: -150,
        rotateY: isMobile ? 35 : 45,
        scale: isMobile ? 0.75 : 0.85,
        opacity: 0.8,
        zIndex: 5,
        transition,
      };
    } else if (diff === 1) {
      // Right card (rotated)
      return {
        x: xOffset,
        z: -150,
        rotateY: isMobile ? -35 : -45,
        scale: isMobile ? 0.75 : 0.85,
        opacity: 0.8,
        zIndex: 5,
        transition,
      };
    } else if (diff === -2 || diff === totalImages - 2) {
      // Far left card (behind)
      return {
        x: -farXOffset,
        z: -300,
        rotateY: 30,
        scale: isMobile ? 0.55 : 0.7,
        opacity: isMobile ? 0.2 : 0.4,
        zIndex: 1,
        transition,
      };
    } else if (diff === 2 || diff === -(totalImages - 2)) {
      // Far right card (behind)
      return {
        x: farXOffset,
        z: -300,
        rotateY: -30,
        scale: isMobile ? 0.55 : 0.7,
        opacity: isMobile ? 0.2 : 0.4,
        zIndex: 1,
        transition,
      };
    } else {
      // Hidden cards
      return {
        x: diff > 0 ? 100 : -100,
        z: -400,
        rotateY: diff > 0 ? -20 : 20,
        scale: 0.5,
        opacity: 0,
        zIndex: 0,
        transition,
      };
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-12 md:py-16 px-4 relative z-50">
      {/* 3D Carousel Container */}
      <div
        className="relative w-full max-w-4xl"
        style={{
          height: "clamp(300px, 50vh, 420px)",
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Images Container */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {proShowImages.map((image, index) => {
            const variants = getCardVariants(index);
            return (
              <motion.div
                key={image.id}
                className="absolute cursor-pointer overflow-hidden shadow-2xl"
                style={{
                  width: "clamp(150px, 40vw, 220px)",
                  height: "clamp(200px, 53vw, 292px)",
                  borderRadius: "16px",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  x: variants.x,
                  z: variants.z,
                  rotateY: variants.rotateY,
                  scale: variants.scale,
                  opacity: variants.opacity,
                  zIndex: variants.zIndex,
                }}
                transition={variants.transition}
                onClick={() => handlePillClick(index)}
                whileHover={{
                  scale: index === activeIndex ? 1.05 : variants.scale,
                  transition: { duration: 0.2 }
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ borderRadius: "inherit" }}
                >
                  <Image
                    src={image.src}
                    alt={image.label}
                    fill
                    className="object-cover"
                    style={{ borderRadius: "inherit" }}
                    unoptimized
                  />
                </div>
                {/* Gradient overlay for depth */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  style={{ borderRadius: "inherit" }}
                />
                {/* Shine effect on active card */}
                {index === activeIndex && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                    style={{ borderRadius: "inherit" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress indicator for auto-play */}
      <div className="w-full max-w-xs mt-8 mb-4">
        <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/60 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: AUTO_PLAY_INTERVAL / 1000,
              ease: "linear",
              repeat: Infinity,
            }}
            key={activeIndex} // Reset animation on slide change
          />
        </div>
      </div>

      {/* Pills Navigation */}
      <div
        className="flex items-center justify-center gap-3 mt-4"
        style={{ opacity: 1 }}
      >
        {proShowImages.map((image, index) => (
          <motion.button
            key={image.id}
            onClick={() => handlePillClick(index)}
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: index === activeIndex
                ? "rgb(255, 255, 255)"
                : "rgba(255, 255, 255, 0.1)",
              border: index === activeIndex
                ? "none"
                : "1px solid rgba(255, 255, 255, 0.2)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Number */}
            <motion.span
              className="font-mono text-sm font-medium tracking-wider"
              style={{
                fontFamily: "'Kode Mono', monospace",
                letterSpacing: "0.1em",
              }}
              animate={{
                color: index === activeIndex ? "rgb(5, 5, 5)" : "rgba(255, 255, 255, 0.7)",
              }}
              transition={{ duration: 0.3 }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>

            {/* Label - only show for active */}
            <AnimatePresence mode="wait">
              {index === activeIndex && (
                <motion.span
                  initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                  animate={{ opacity: 1, width: "auto", marginLeft: 4 }}
                  exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="font-sans text-sm font-medium overflow-hidden whitespace-nowrap"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgb(5, 5, 5)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {image.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
