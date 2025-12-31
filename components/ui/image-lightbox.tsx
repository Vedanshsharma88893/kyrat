"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImageLightboxProps {
    src: string | null;
    onClose: () => void;
}

export function ImageLightbox({ src, onClose }: ImageLightboxProps) {
    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (src) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [src]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && src) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [src, onClose]);

    return (
        <AnimatePresence>
            {src && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center"
                    style={{ zIndex: 99999 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                >
                    {/* Backdrop with blur */}
                    <div
                        className="absolute inset-0 bg-black/80"
                        style={{ backdropFilter: "blur(20px)" }}
                    />

                    {/* Glass container */}
                    <motion.div
                        className="relative w-[85vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-w-3xl h-auto max-h-[70vh] rounded-2xl md:rounded-3xl overflow-hidden flex items-center justify-center p-4 md:p-6"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25
                        }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "rgba(20, 20, 20, 0.95)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        {/* Image - using regular img tag for reliability */}
                        <img
                            src={src}
                            alt="Festival Moment"
                            className="rounded-lg object-contain"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "65vh",
                                width: "auto",
                                height: "auto",
                            }}
                        />

                        {/* Close button - Glass style */}
                        <motion.button
                            className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            whileHover={{
                                scale: 1.1,
                                background: "rgba(255, 255, 255, 0.2)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.button>

                        {/* Shine effect */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
                                borderRadius: "inherit",
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
