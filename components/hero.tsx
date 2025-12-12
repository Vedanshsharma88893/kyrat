"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");
  const logoImage = PlaceHolderImages.find((img) => img.id === "sponsor-aurora");
  const logoRef = useRef(null);
  const heroContentRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const logoEl = logoRef.current;
    const heroContentEl = heroContentRef.current;
    const arrowEl = arrowRef.current;

    gsap.set(logoEl, { opacity: 0, y: -20 });

    const tl = gsap.timeline();
    tl.to(logoEl, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .to(heroContentEl, { opacity: 1, duration: 0.8 }, "-=0.5")
      .to(arrowEl, { opacity: 1, duration: 0.5 }, "-=0.5");
      
    gsap.to(logoEl, {
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "30% top",
        scrub: 1.5,
      },
    });

    gsap.to(arrowEl, {
      opacity: 0,
      scrollTrigger: {
        trigger: "#hero",
        start: "5% top",
        end: "20% top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([logoEl, heroContentEl, arrowEl]);
    };
  }, []);

  return (
    <section id="hero" className="relative w-full h-[calc(100vh-4rem)]">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover -z-10"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      <div className="container relative flex h-full flex-col items-center justify-center text-center">
        <div ref={logoRef} className="opacity-0">
          {logoImage && (
            <Image
              src={logoImage.imageUrl}
              alt="Logo"
              width={96}
              height={96}
              className="rounded-full"
              data-ai-hint={logoImage.imageHint}
            />
          )}
        </div>
        <div ref={heroContentRef} className="space-y-4 mt-4 opacity-0">
          <h1 className="text-4xl font-extrabold tracking-tighter text-primary-foreground sm:text-6xl md:text-7xl lg:text-8xl font-headline">
            KYRAT Festival
          </h1>
          <p className="max-w-[700px] text-primary-foreground/80 md:text-xl">
            Immerse yourself in a celebration of music, art, and nature.
          </p>
        </div>
        <div ref={arrowRef} className="absolute bottom-8 animate-bounce opacity-0">
          <ArrowDown className="h-8 w-8 text-primary-foreground/50" />
        </div>
      </div>
    </section>
  );
}
