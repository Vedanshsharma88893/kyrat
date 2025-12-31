"use client";

import React, { useRef, useEffect } from "react";
import { useTransform, motion, useMotionValue, MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MOMENT_IMAGES = [
  "/images/moments/IMG-20250621-WA0323.jpg",
  "/images/moments/IMG-20250621-WA0333 (1).jpg",
  "/images/moments/IMG-20250621-WA0334.jpg",
  "/images/moments/IMG-20250621-WA0345.jpg",
  "/images/moments/IMG-20250621-WA0352.jpg",
  "/images/moments/IMG-20250621-WA0386.jpg",
  "/images/moments/WhatsApp Image 2025-12-15 at 18.05.50_961b5302.jpg",
  "/images/moments/WhatsApp Image 2025-12-15 at 18.05.52_240e6e6f.jpg",
  "/images/moments/WhatsApp Image 2025-12-15 at 18.05.54_e56ddee3.jpg",
  "/images/moments/WhatsApp Image 2025-12-15 at 18.05.55_2022add6.jpg",
  "/images/moments/IMG-20250621-WA0334.jpg",
  "/images/moments/IMG-20250621-WA0386.jpg",
  "/images/moments/IMG-20250621-WA0323.jpg",
  "/images/moments/IMG-20250621-WA0333 (1).jpg",
  "/images/moments/IMG-20250621-WA0334.jpg",
  "/images/moments/IMG-20250621-WA0345.jpg",
  "/images/moments/IMG-20250621-WA0352.jpg",
  "/images/moments/IMG-20250621-WA0386.jpg",
  "/images/moments/IMG-20250621-WA0323.jpg",
  "/images/moments/IMG-20250621-WA0333 (1).jpg",
];

export function FestivalMoments({ onImageClick, id }: { onImageClick?: (src: string) => void, id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%", // Long scroll for cards
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.set(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, [scrollProgress]);

  return (
    <section
      ref={containerRef}
      id={id || "festival-moments"}
      className="relative w-full overflow-hidden bg-transparent"
      style={{ height: "100vh" }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Header - Overlays background */}
        <div className="absolute top-[10%] left-[5%] md:left-[10%] z-[100] pointer-events-none">
          <span className="text-zinc-500 font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-2 block">Festival Highlights</span>
          <h2 className="text-5xl md:text-8xl font-black leading-tight tracking-tighter uppercase text-white drop-shadow-2xl">
            Festival <br /> Moments
          </h2>
        </div>

        {/* Scene Container */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
          {MOMENT_IMAGES.map((src, index) => (
            <Card
              key={index}
              index={index}
              src={src}
              total={MOMENT_IMAGES.length}
              progress={scrollProgress}
              onImageClick={onImageClick}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
          <span className="text-white text-[10px] uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-white" />
        </div>
      </div>
    </section>
  );
}

function Card({
  index,
  src,
  total,
  progress,
  onImageClick
}: {
  index: number;
  src: string;
  total: number;
  progress: MotionValue<number>;
  onImageClick?: (src: string) => void;
}) {
  const stagger = 0.035;
  const duration = 0.35;

  const start = index * stagger;
  const end = Math.min(start + duration, 1);

  // X: Movement from Right to Left
  const x = useTransform(progress, [start, start + duration * 0.5, end], [1400, 0, -1400]);

  // Scale: Depth feel
  const scale = useTransform(progress, [start, start + duration * 0.5, end], [0.7, 1.1, 0.7]);

  // Rotation
  const rotate = useTransform(progress, [start, start + duration * 0.5, end], [10, 0, -10]);

  // Opacity
  const opacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);

  return (
    <motion.div
      onClick={() => onImageClick?.(src)}
      className="absolute flex items-center justify-center cursor-pointer"
      style={{
        x,
        scale,
        rotate,
        opacity,
        zIndex: total + index,
        width: "min(90vw, 600px)",
        height: "min(60vh, 400px)",
      }}
    >
      <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-800 border-2 border-white/20">
        <img
          src={src.startsWith("/") ? src : `/${src}`}
          alt={`Moment ${index + 1}`}
          className="w-full h-full object-cover select-none"
          loading="eager"
        />
        <div className="absolute top-6 left-6 text-white text-3xl font-black drop-shadow-lg opacity-40">
          {index + 1}
        </div>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    </motion.div>
  );
}

export default FestivalMoments;
