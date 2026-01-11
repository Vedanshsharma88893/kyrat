"use client";

import Image from "next/image";
import Link from "next/link";
import { sponsors } from "@/lib/data";
import { motion } from "framer-motion";

export function Sponsors() {
  return (
    <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
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
              <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
                {sponsors.current.map((sponsor) => (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        filter: "drop-shadow(0 0 0.75rem hsl(var(--primary) / 0.5))"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="filter grayscale hover:grayscale-0 transition-all duration-300"
                    >
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={240}
                        height={120}
                        className="object-contain"
                        unoptimized
                      />
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
              <div className="flex justify-center items-center gap-8 md:gap-10 flex-wrap">
                {sponsors.past.map((sponsor) => (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        filter: "drop-shadow(0 0 0.5rem hsl(var(--primary) / 0.3))"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                    >
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        width={180}
                        height={90}
                        className="object-contain"
                        unoptimized
                      />
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
