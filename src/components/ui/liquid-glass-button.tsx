"use client";

import React, { useId } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LiquidGlassButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export function LiquidGlassButton({ href, children, className }: LiquidGlassButtonProps) {
    const filterId = useId().replace(/:/g, "");

    return (
        <Link
            href={href}
            className={cn(
                "relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 group rounded-[50px] overflow-visible min-w-[200px]",
                className
            )}
        >
            <div className="absolute inset-0 z-0">
                {/* Backdrop Filter Layer */}
                <div
                    className="absolute inset-0 z-[1] rounded-[50px]"
                    style={{
                        background: "hsl(0 0% 100% / 0.1)",
                        backdropFilter: `url(#liquid-glass-filter-${filterId})`,
                        WebkitBackdropFilter: `url(#liquid-glass-filter-${filterId})`,
                    }}
                >
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ visibility: "hidden" }} xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id={`liquid-glass-filter-${filterId}`} colorInterpolationFilters="sRGB">
                                <feImage
                                    href={`data:image/svg+xml,%3Csvg viewBox='0 0 174 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='red' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%230000'/%3E%3Cstop offset='100%25' stop-color='red'/%3E%3C/linearGradient%3E%3ClinearGradient id='blue' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230000'/%3E%3Cstop offset='100%25' stop-color='blue'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' width='174' height='50' fill='black'/%3E%3Crect x='0' y='0' width='174' height='50' rx='50' fill='url(%23red)' /%3E%3Crect x='0' y='0' width='174' height='50' rx='50' fill='url(%23blue)' style='mix-blend-mode: difference' /%3E%3Crect x='1.25' y='1.25' width='171.5' height='47.5' rx='50' fill='hsl(0 0%25 53%25 / 0.9)' style='filter:blur(5px)' /%3E%3C/svg%3E`}
                                    x="0" y="0" width="100%" height="100%" result="map"
                                />
                                <feDisplacementMap in="SourceGraphic" in2="map" scale="210" xChannelSelector="R" yChannelSelector="B" result="dispRed" />
                                <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
                                <feDisplacementMap in="SourceGraphic" in2="map" scale="210" xChannelSelector="R" yChannelSelector="B" result="dispGreen" />
                                <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
                                <feDisplacementMap in="SourceGraphic" in2="map" scale="210" xChannelSelector="R" yChannelSelector="B" result="dispBlue" />
                                <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
                                <feBlend in="red" in2="green" mode="screen" result="rg" />
                                <feBlend in="rg" in2="blue" mode="screen" result="output" />
                                <feGaussianBlur in="output" stdDeviation="0.38" />
                            </filter>
                        </defs>
                    </svg>
                </div>
                {/* Gradient Border Layer */}
                <div
                    className="absolute inset-0 z-[2] pointer-events-none rounded-[50px] border border-transparent"
                    style={{
                        background: "linear-gradient(315deg, rgba(120, 120, 120, 0.7) 0%, rgba(120, 120, 120, 0) 30%, rgba(120, 120, 120, 0) 70%, rgba(120, 120, 120, 0.7) 100%) border-box",
                        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                    }}
                />
            </div>
            <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                {children}
            </span>
        </Link>
    );
}
