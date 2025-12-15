"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FocusScrollProps {
    children: React.ReactNode;
    className?: string;
}

export function FocusScroll({ children, className }: FocusScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Track the element's position relative to the viewport
    // "start end": When the element's top edge enters the viewport from the bottom
    // "end start": When the element's bottom edge leaves the viewport at the top
    // This covers the entire lifecycle of the element in the viewport.
    // At 0.5 (midpoint), the center of the element aligns with the center of the viewport
    // (assuming linear scrolling and element height < viewport height or handled proportionally)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Scale: 0.9 -> 1.0 -> 0.9 (Avoid scaling above 1.0 to prevent blurriness)
    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

    return (
        <motion.div
            ref={ref}
            style={{
                scale,
                opacity,
            }}
            className={cn("w-full transition-shadow", className)}
        >
            {children}
        </motion.div>
    );
}
