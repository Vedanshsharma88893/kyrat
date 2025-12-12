"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KyratLogo } from "./icons";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/events", label: "Events" },
  { href: "/campus-map", label: "Campus Map"},
  { href: "/#schedule", label: "Schedule" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#sponsors", label: "Sponsors" },
  { href: "/#team", label: "Team" },
];

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <KyratLogo className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block font-headline">
            KYRAT Festival
          </span>
        </Link>
        <motion.nav 
            className="hidden md:flex items-center gap-6 text-sm"
            variants={navVariants}
            initial="hidden"
            animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={navItemVariants}>
              <Link
                href={link.href}
                className="font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-4 text-lg font-medium mt-8">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4" onClick={() => setIsOpen(false)}>
                  <KyratLogo className="h-6 w-6 text-primary" />
                  <span className="font-headline">KYRAT Festival</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground py-2 text-base"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
