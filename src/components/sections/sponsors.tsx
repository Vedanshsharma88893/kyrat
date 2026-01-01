"use client";

import Image from "next/image";
import Link from "next/link";
import { sponsors } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

export function Sponsors() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  return (
    <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              Our Valued Sponsors
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              This festival is made possible by the generous support of our partners.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          <div>
            <h3 className="text-center text-2xl font-semibold text-foreground/80 mb-8">Platinum Sponsors</h3>
            <div className="grid grid-cols-2 justify-items-center items-center gap-8 md:flex md:justify-center md:gap-12 flex-wrap">
              {sponsors.platinum.map((sponsor) => {
                const image = getImage(sponsor.logoId);
                return (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        filter: "grayscale(0%) drop-shadow(0 0 0.75rem hsl(var(--primary) / 0.5))"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="filter grayscale"
                    >
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={sponsor.name}
                          width={150}
                          height={75}
                          className="object-contain"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-center text-2xl font-semibold text-foreground/80 mb-8">Gold Sponsors</h3>
            <div className="grid grid-cols-2 justify-items-center items-center gap-8 md:flex md:justify-center md:gap-10 flex-wrap">
              {sponsors.gold.map((sponsor) => {
                const image = getImage(sponsor.logoId);
                return (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        filter: "grayscale(0%) drop-shadow(0 0 0.5rem hsl(var(--primary) / 0.4))"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="filter grayscale"
                    >
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={sponsor.name}
                          width={120}
                          height={60}
                          className="object-contain"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
