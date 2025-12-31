"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface AnimatedButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
}

export function AnimatedButton({ text, onClick, className = "" }: AnimatedButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                group
                relative
                flex items-center gap-3
                px-8 py-4 rounded-xl
                bg-white/10
                backdrop-blur-xl
                border-none outline-none ring-0
                text-white font-semibold tracking-wide
                shadow-[0_8px_32px_rgba(0,0,0,0.2)]
                
                /* Hover State: 80% white + noise */
                hover:bg-white/80 hover:text-black hover:shadow-[0_8px_32px_rgba(255,255,255,0.3)]
                transition-all duration-300 ease-out
                overflow-hidden
                ${className}
            `}
        >
            {/* Noise overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
            />

            <span className="relative z-10">{text}</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
    );
}
