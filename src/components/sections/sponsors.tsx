"use client";

import Image from "next/image";
import Link from "next/link";
import { sponsors } from "@/lib/data";
import { motion } from "framer-motion";

export function Sponsors() {
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

        <div className="mt-12 space-y-16">
          {/* Current Sponsors Section */}
          {sponsors.current.length > 0 && (
            <div>
              <h3 className="text-center text-2xl font-semibold text-foreground/80 mb-8">
                Sponsors
              </h3>
              <div className="grid grid-cols-2 justify-items-center items-center gap-8 md:flex md:justify-center md:gap-12 flex-wrap">
                {sponsors.current.map((sponsor) => (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        filter: "grayscale(0%) drop-shadow(0 0 0.75rem hsl(var(--primary) / 0.5))"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="filter grayscale hover:grayscale-0 transition-all duration-300 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                    >
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={180}
                        height={90}
                        className="object-contain"
                        unoptimized
                      />
                      <p className="text-center mt-2 text-sm text-muted-foreground font-medium">
                        {sponsor.name}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Past Sponsors Section */}
          {sponsors.past.length > 0 && (
            <div>
              <h3 className="text-center text-2xl font-semibold text-foreground/60 mb-8">
                Past Sponsors
              </h3>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                We are grateful to the organizations that have supported us in previous editions.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center items-center gap-6 md:gap-8">
                {sponsors.past.map((sponsor) => (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        filter: "grayscale(0%) drop-shadow(0 0 0.5rem hsl(var(--primary) / 0.3))"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/20"
                    >
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={120}
                        height={60}
                        className="object-contain"
                        unoptimized
                      />
                      <p className="text-center mt-2 text-xs text-muted-foreground">
                        {sponsor.name}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
