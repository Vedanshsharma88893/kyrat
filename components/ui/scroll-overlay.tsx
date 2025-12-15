"use client";

import { motion } from "framer-motion";

export function ScrollOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-40 select-none">
            {/* Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
    );
}
