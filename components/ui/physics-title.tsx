"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

interface PhysicsTitleProps {
    title: string;
    className?: string;
}

export function PhysicsTitle({ title, className = "" }: PhysicsTitleProps) {
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Spring physics configuration to match a "premium, intentional" feel
    // Higher mass gives it a "heavy" physics feel.
    const springConfig = { stiffness: 100, damping: 20, mass: 1.2 };

    // Split title into words to animate them individually or characters
    // "Physics-Based" often implies characters dropping in.
    const words = title.split(" ");

    return (
        <h2
            ref={ref}
            className={`flex flex-wrap justify-center gap-[0.25em] ${className}`}
            style={{ perspective: "1000px" }} // Adds depth for 3D physics feel
        >
            <span className="sr-only">{title}</span>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap overflow-visible">
                    {word.split("").map((char, charIndex) => (
                        <PhysicsChar
                            key={`${wordIndex}-${charIndex}`}
                            char={char}
                            index={wordIndex * 10 + charIndex} // Stagger index
                            isInView={isInView}
                            springConfig={springConfig}
                        />
                    ))}
                </span>
            ))}
        </h2>
    );
}

function PhysicsChar({
    char,
    index,
    isInView,
    springConfig,
}: {
    char: string;
    index: number;
    isInView: boolean;
    springConfig: any;
}) {
    // Initial state: Random rotation, scale down, off screen or "dropped"
    // Target state: Normal.

    return (
        <motion.span
            className="inline-block"
            initial={{
                y: 100,
                rotateX: 90,
                opacity: 0,
                filter: "blur(10px)"
            }}
            animate={isInView ? {
                y: 0,
                rotateX: 0,
                opacity: 1,
                filter: "blur(0px)"
            } : {}}
            transition={{
                type: "spring",
                ...springConfig,
                delay: index * 0.03, // Slight stagger for wave effect
            }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}
