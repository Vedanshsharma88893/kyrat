"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

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
];

const Pin = ({ color = "#ef4444" }) => (
  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 drop-shadow-md pointer-events-none">
    <div className="w-4 h-4 rounded-full bg-red-600 border border-white/30 shadow-inner" style={{ backgroundColor: color }} />
    <div className="w-1 h-3 bg-gray-400 absolute left-1/2 -translate-x-1/2 top-3 rounded-full opacity-40" />
  </div>
);

const PaperClip = () => (
  <div className="absolute -top-6 left-6 z-30 opacity-90 drop-shadow-sm -rotate-12 pointer-events-none">
    <svg width="32" height="64" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4C8.686 4 6 6.686 6 10V34C6 38.418 9.582 42 14 42C18.418 42 22 38.418 22 34V14H18V34C18 36.209 16.209 38 14 38C11.791 38 10 36.209 10 34V10C10 8.895 10.895 8 12 8C13.105 8 14 8.895 14 10V28C14 29.105 13.105 30 12 30C10.895 30 10 29.105 10 28V14H6V28C6 31.314 8.686 34 12 34C15.314 34 18 31.314 18 28V10C18 6.686 15.314 4 12 4Z" fill="#ccd6f6" className="drop-shadow-sm" />
    </svg>
  </div>
);

function MomentCard({ src, index, onClick }: { src: string; index: number; onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Stable random variations based on index
  const baseRotation = useMemo(() => ((index * 1337) % 16) - 8, [index]);
  const xOffset = useMemo(() => ((index * 42) % 30) - 15, [index]);
  const yOffset = useMemo(() => ((index * 73) % 40) - 20, [index]);
  const decorType = useMemo(() => (index % 4), [index]); // 0: Pin Red, 1: PaperClip, 2: Pin Blue, 3: None

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: baseRotation, x: xOffset, y: yOffset + 100 }}
      whileInView={{ opacity: 1, scale: 1, y: yOffset }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        rotate: baseRotation,
        x: xOffset,
        y: yOffset,
        transformStyle: "preserve-3d",
        zIndex: 10 + index % 10 // Layer them slightly
      }}
      className="relative aspect-[3/4] w-full max-w-[280px] cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="absolute inset-0 rounded-none bg-[#fdfdfd] p-3 pb-10 shadow-2xl transition-all duration-300 group-hover:shadow-teal-500/30 group-hover:-translate-y-2"
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Random Decorations - Moved inside 3D container with higher translateZ */}
        <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="absolute inset-0 pointer-events-none z-50">
          {decorType === 0 && <Pin color="#ef4444" />}
          {decorType === 1 && <PaperClip />}
          {decorType === 2 && <Pin color="#3b82f6" />}
        </div>

        <div className="relative w-full h-full overflow-hidden border border-black/5">
          <Image
            src={encodeURI(src)}
            alt="Festival Moment"
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-white/0 via-white/20 to-transparent" />
      </div>

      {/* Deep Shadow for table-top depth */}
      <div className="absolute inset-0 bg-black/10 blur-xl translate-y-4 translate-x-2 -z-10 opacity-40 group-hover:opacity-60 transition-opacity" />
    </motion.div>
  );
}

export function FestivalMoments({ onImageClick }: { onImageClick?: (src: string) => void }) {
  return (
    <section className="relative w-full py-24 md:py-48 bg-transparent overflow-visible" id="moments">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-28 md:mb-40 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-7xl md:text-[10rem] font-bold font-cursive text-white tracking-normal drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              Moments
            </h2>
            <div className="h-1 w-24 bg-teal-400 mx-auto mt-6 rounded-full shadow-[0_0_15px_#2dd4bf]" />
            <p className="mt-8 text-teal-100/60 text-lg md:text-xl font-light tracking-[0.3em] uppercase">
              The Kyrat Chronicles
            </p>
          </motion.div>
        </div>

        {/* Scattered "Tabletop" Layout */}
        <div
          className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 md:gap-20 max-w-[1400px] mx-auto"
          style={{ perspective: "2000px" }}
        >
          {MOMENT_IMAGES.map((src, i) => (
            <MomentCard
              key={`${src}-${i}`}
              src={src}
              index={i}
              onClick={() => onImageClick?.(src)}
            />
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1600px] pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px]" />
      </div>
    </section>
  );
}

export default FestivalMoments;
