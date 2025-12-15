"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");
  const logoImage = PlaceHolderImages.find((img) => img.id === "sponsor-aurora");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20 },
    visible: { y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section id="hero" className="relative w-full h-[100vh]">
      <div className="absolute inset-0 -z-10">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <motion.div 
        className="container relative flex h-full flex-col items-center justify-center text-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        <motion.div 
          variants={itemVariants}
          animate={{
            y: [0, -10, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          >
          {logoImage && (
            <Image
              src={logoImage.imageUrl}
              alt="Logo"
              width={96}
              height={96}
              className="rounded-full w-20 h-20 md:w-24 md:h-24 shadow-lg"
              data-ai-hint={logoImage.imageHint}
            />
          )}
        </motion.div>
        <motion.div variants={itemVariants} className="space-y-4 mt-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl md:text-7xl lg:text-8xl font-headline drop-shadow-md">
            KYRAT Festival
          </h1>
          <p className="max-w-[700px] text-primary-foreground/80 text-base md:text-xl drop-shadow">
            Immerse yourself in a celebration of music, art, and nature.
          </p>
        </motion.div>
        <motion.div 
          className="absolute bottom-8 animate-bounce">
          <ArrowDown className="h-8 w-8 text-primary-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
