"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreativeGatewayProps {
    href: string;
    label: string;
    className?: string;
    variant?: "sticker" | "glitch" | "minimal";
}

export function CreativeGateway({ href, label, className, variant = "sticker" }: CreativeGatewayProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    if (variant === "sticker") {
        return (
            <div ref={ref} className={cn("absolute z-20 pointer-events-none", className)}>
                <Link href={href} className="pointer-events-auto block">
                    <motion.div
                        style={{ rotate, scale, y }}
                        whileHover={{ scale: 1.3, rotate: 0 }}
                        className="relative font-bold uppercase tracking-tighter text-black bg-yellow-400 p-6 rounded-full w-40 h-40 flex items-center justify-center text-center shadow-2xl border-4 border-black font-headline cursor-pointer transition-colors hover:bg-yellow-300"
                    >
                        <span className="relative z-10 text-lg leading-none transform -rotate-12 block">
                            {label}
                        </span>
                        <div className="absolute inset-0 border-2 border-dashed border-black/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    </motion.div>
                </Link>
            </div>
        );
    }

    if (variant === "glitch") {
        return (
            <div ref={ref} className={cn("absolute z-20 pointer-events-none", className)}>
                <Link href={href} className="pointer-events-auto group">
                    <motion.div
                        style={{ x: y }} // Parallax side scroll
                        className="flex items-center gap-2"
                    >
                        <span className="text-6xl md:text-8xl font-black font-headline text-foreground/80 group-hover:text-foreground transition-colors duration-300 blur-sm group-hover:blur-0">
                            {label}
                        </span>
                        <ArrowUpRight className="text-foreground/50 w-12 h-12 group-hover:rotate-45 transition-transform" />
                    </motion.div>
                </Link>
            </div>
        );
    }

    return null;
}
