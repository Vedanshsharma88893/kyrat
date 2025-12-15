"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Image from "next/image";

// Constants matching the "Card Stack" aesthetic
const CARD_WIDTH = 400; // Wider cards
const CARD_HEIGHT = 600; // Taller cards
const SPACING = 300; // More spacing to prevent clutter
const TOTAL_ITEMS = 15;
const SCROLL_HEIGHT = "400vh"; // Long scroll area

const PRO_SHOW_IMAGES = [
    "/images/pro-shows/edm-night.png",
    "/images/pro-shows/rock-concert.png",
    "/images/pro-shows/dj-night.png",
    "/images/pro-shows/fusion-night.png",
    "/images/pro-shows/indie-evening.png",
    "/images/pro-shows/jazz-night.png",
];

const ITEMS = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
    id: i,
    // Cycle through local images
    src: PRO_SHOW_IMAGES[i % PRO_SHOW_IMAGES.length],
}));

export function FestivalMoments() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative z-30 bg-neutral-950" style={{ height: SCROLL_HEIGHT }}>
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-visible perspective-[1200px] relative">

                {/* Rotated 3D Plane */}
                <motion.div
                    className="relative z-10 flex items-center justify-center"
                    style={{
                        width: `min(90vw, ${CARD_WIDTH}px)`,
                        height: `min(90vh, ${CARD_HEIGHT}px)`,
                        transformStyle: "preserve-3d",
                        rotateX: -15,
                        rotateY: -30,
                        rotateZ: 5,
                    }}
                >
                    {ITEMS.map((item, index) => (
                        <StackCard
                            key={index}
                            index={index}
                            total={TOTAL_ITEMS}
                            progress={scrollYProgress}
                            src={item.src}
                            isSelected={selectedCard === index}
                            onSelect={() => setSelectedCard(selectedCard === index ? null : index)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function StackCard({ 
    index, 
    total, 
    progress, 
    src, 
    isSelected = false,
    onSelect = () => {}
}: { 
    index: number, 
    total: number, 
    progress: MotionValue<number>, 
    src: string,
    isSelected?: boolean,
    onSelect?: () => void
}) {
    const [isHovered, setIsHovered] = useState(false);
    // Initial Z position:
    // We start deeply shifted back (-5000) so the first card (index 0) is invisible at start.
    const initialZ = -index * SPACING - 5000;

    // Movement: 
    // We need to travel:
    // 1. The 5000px deep offset to bring Card 0 to camera.
    // 2. The Total Stack Depth (15 * 300 = 4500).
    // 3. A buffer to push them past the camera (e.g. +2000).
    const distanceToTravel = (total * SPACING) + 5000 + 2000;

    // Global Z movement
    const moveZ = useTransform(progress, [0, 1], [0, distanceToTravel]);

    // Net Z for this card - adjust if selected
    const baseZ = useTransform(moveZ, (v) => initialZ + v);
    const z = useTransform(
        [baseZ, isSelected ? 1 : 0],
        ([z, selected]) => selected ? 1000 : z
    );

    // Fade Logic:
    // Fade IN from deep (-5000 range)
    // Fade OUT as it hits camera (200)
    const opacity = useTransform(z,
        [-6000, -3000, 200, 800],
        [0, 1, 1, 0]
    );

    // Scale Logic: 
    const scale = useTransform(z, [-6000, 200], [0.6, 1]);

    return (
        <motion.div
            style={{
                position: "absolute",
                inset: 0,
                zIndex: isSelected ? 50 : undefined,
                z: z,
                opacity: opacity,
                scale: scale,
                y: isHovered ? -20 : 0,
                transition: 'transform 0.2s ease, z 0.3s ease',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
            }}
            className="rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/10 transition-transform duration-200 ease-in-out"
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                boxShadow: isSelected ? '0 0 30px rgba(255,255,255,0.3)' : '0 10px 25px -5px rgba(0,0,0,0.3)',
                zIndex: 40,
            }}
            whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
            }}
        >
            <Image
                src={src}
                alt={`Moment ${index}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
                priority={index < 3}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

            {/* Content */}
            <div className="absolute bottom-6 left-6">
                <span className="text-8xl font-black text-white/10 select-none font-headline">
                    {(index + 1).toString().padStart(2, '0')}
                </span>
            </div>
        </motion.div>
    );
}
