"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AnimatedButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
}

export function AnimatedButton({ text, onClick, className = "" }: AnimatedButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative flex items-center justify-center rounded-full bg-white group cursor-pointer overflow-visible ${className}`}
        >
            {/* The expanding blue circle - mimicing the Framer "L Icon Hover" */}
            <motion.div
                className="absolute bg-[#0055FF] rounded-full pointer-events-none"
                initial={{
                    width: "8px",
                    height: "8px",
                    bottom: "-8px",
                    left: "50%",
                    x: "-50%",
                }}
                animate={{
                    width: isHovered ? "110%" : "8px",
                    height: isHovered ? "150%" : "8px",
                    bottom: isHovered ? "-25%" : "-8px",
                    borderRadius: "39px", // Match parent radius roughly
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
            />

            <div className="relative z-10 px-8 py-3 flex items-center gap-2">
                <span
                    className={`font-semibold text-lg transition-colors duration-200 ${isHovered ? "text-white" : "text-black"
                        }`}
                >
                    {text}
                </span>
                <motion.div
                    animate={{
                        x: isHovered ? 4 : 0,
                        color: isHovered ? "white" : "black"
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <ArrowRight className={`w-5 h-5 transition-colors duration-200 ${isHovered ? "text-white" : "text-black"}`} />
                </motion.div>
            </div>
        </button>
    );
}
