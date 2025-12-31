"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useCallback } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export function Gallery() {
  const galleryImageIds = [
    "gallery-1",
    "gallery-2",
    "gallery-3",
    "gallery-4",
    "gallery-5",
    "gallery-6",
  ];
  const images = PlaceHolderImages.filter((img) => galleryImageIds.includes(img.id));

  // cursor-based parallax for the whole strip
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const backgroundX = useTransform(springX, [0, 1], ["-6%", "6%"]); // subtle pan
  const backgroundY = useTransform(springY, [0, 1], ["-4%", "4%"]); // subtle pan

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - left) / width;
      const y = (event.clientY - top) / height;
      mouseX.set(Math.min(Math.max(x, 0), 1));
      mouseY.set(Math.min(Math.max(y, 0), 1));
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.section
      id="gallery"
      className="relative w-full py-16 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* soft vignette background */}
      <motion.div
        style={{ translateX: backgroundX, translateY: backgroundY }}
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      >
        <div className="absolute -inset-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(0,0,0,0.75),_transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent" />
      </motion.div>

      <div className="relative z-10 container px-4 md:px-6" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-accent/80 mb-1">Kyrat Gallery</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline text-primary">
              Festival Moments
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Glimpses of faces, lights, and late-night chaos that make Kyrat feel alive.
            </p>
          </div>
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-muted-foreground/80 flex items-center gap-2">
            <span className="h-px w-8 bg-muted" aria-hidden="true" />
            Click & drag or scroll sideways to explore
            <span className="h-px w-8 bg-muted" aria-hidden="true" />
          </p>
        </div>

        <div className="relative mt-10 md:mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />

          <motion.div
            className="flex gap-5 md:gap-7 lg:gap-8 overflow-x-auto pb-8 md:pb-10 snap-x snap-mandatory scroll-smooth info-parent-1 cursor-grab active:cursor-grabbing"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="snap-center first:pl-3 md:first:pl-6 last:pr-3 md:last:pr-6 flex-shrink-0"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="group relative h-[320px] w-[240px] sm:h-[400px] sm:w-[300px] md:h-[440px] md:w-[340px] lg:h-[480px] lg:w-[360px] overflow-hidden rounded-3xl border border-border/40 bg-background/70 shadow-[0_22px_65px_rgba(0,0,0,0.65)] backdrop-blur-sm"
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    sizes="(max-width: 768px) 240px, 340px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
                  <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1 text-left text-xs text-muted-foreground/90">
                    <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-accent/80">
                      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                      Kyrat Moment #{index + 1}
                    </span>
                    <p className="text-sm font-medium text-card-foreground line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
