"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const ROWS = [
  [MOMENT_IMAGES[0], MOMENT_IMAGES[1], MOMENT_IMAGES[2]],
  [MOMENT_IMAGES[3], MOMENT_IMAGES[4], MOMENT_IMAGES[5]],
  [MOMENT_IMAGES[6], MOMENT_IMAGES[7], MOMENT_IMAGES[8]],
  [MOMENT_IMAGES[9], MOMENT_IMAGES[10], MOMENT_IMAGES[11]],
];

export function FestivalMoments({ onImageClick }: { onImageClick?: (src: string) => void }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Slight delay to ensure parent layouts (like pin-spacers) are calculated
    const timer = setTimeout(() => {
      setIsReady(true);

      const rows = gsap.utils.toArray<HTMLElement>(".unroll-row");

      rows.forEach((row, i) => {
        const cards = row.querySelectorAll(".unroll-card");

        // FORCED VISIBILITY INITIAL STATE
        gsap.set(cards, {
          opacity: 0.6,
          rotateX: -15, // Mild tilt back
          scale: 0.95,
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
        });

        // UNROLL ANIMATION
        gsap.to(cards, {
          opacity: 1,
          rotateX: 0,
          scale: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
            end: "top 30%",
            scrub: 1,
          }
        });
      });

      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={targetRef}
      id="festival-moments-resilient"
      className="relative w-full z-[500] bg-transparent overflow-visible"
      style={{ minHeight: "200vh", padding: "100px 0" }}
    >
      <div className="container mx-auto px-4 md:px-12 relative">

        {/* Status indicator */}
        <div style={{ position: "absolute", top: -20, left: 10, fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>
          Components: {ROWS.length} rows | State: {isReady ? "GSAP Active" : "Initializing..."}
        </div>

        {/* Hero Section */}
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-white">
          <div className="flex flex-col text-left">
            <span className="text-zinc-500 font-bold tracking-[0.4em] text-sm uppercase mb-4">A Visual Journey</span>
            <h2 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter uppercase">
              Festival <br /> Moments
            </h2>
          </div>
          <div className="max-w-xs text-right hidden md:block">
            <p className="text-zinc-400 text-lg font-medium leading-snug">
              A sequence of images unrolling, guided by scroll, angle and animation.
            </p>
          </div>
        </div>

        {/* Unroll Grid */}
        <div className="w-full flex flex-col gap-8 md:gap-12" style={{ perspective: "3000px" }}>
          {ROWS.map((rowImages, rowIndex) => (
            <div
              key={rowIndex}
              className="unroll-row grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {rowImages.map((src, imgIndex) => (
                <div
                  key={`${src}-${imgIndex}`}
                  className="unroll-card relative rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 ring-1 ring-white/10"
                  onClick={() => onImageClick?.(src)}
                  style={{
                    minHeight: "300px",
                    height: "35vh", // Guaranteed height
                    transformStyle: "preserve-3d"
                  }}
                >
                  <img
                    src={encodeURI(src)}
                    alt="Captured Moment"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FestivalMoments;
