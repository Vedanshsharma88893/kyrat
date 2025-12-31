import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="w-full relative mt-auto">
      {/* Background Image with Mask for smooth blend */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 120px)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 120px)'
        }}
      >
        <Image
          src="/images/assets/seafloor.png"
          alt="Seafloor Background"
          fill
          className="object-cover object-center"
          quality={100}
        />
        {/* Darkening Overlay for text visibility */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container flex flex-col items-center justify-between gap-4 sm:gap-6 px-4 py-12 sm:py-16 md:px-6 md:flex-row">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Kyrat Logo"
            width={32}
            height={32}
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
          <span className="text-base sm:text-lg font-semibold font-headline text-white">Kyrat</span>
        </Link>
        <p className="text-xs sm:text-sm text-white/60 text-center">
          © {new Date().getFullYear()} Kyrat. All rights reserved.
        </p>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10 text-white/70 hover:text-white hover:bg-white/10">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10 text-white/70 hover:text-white hover:bg-white/10">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-10 sm:w-10 text-white/70 hover:text-white hover:bg-white/10">
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
