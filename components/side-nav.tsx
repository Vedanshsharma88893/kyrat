"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    { id: "hero", label: "Home" },
    { id: "featured-events", label: "Events" },
    { id: "pro-shows", label: "Pro Shows" },
    { id: "schedule", label: "Schedule" },
    { id: "festival-moments", label: "Moments" },
    { id: "sponsors", label: "Sponsors" },
    { id: "team", label: "Team" },
];

export function SideNav() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isInHeroAnimation, setIsInHeroAnimation] = useState(true);

    useEffect(() => {
        // Track scroll position to hide nav during hero animation (first 500vh of scroll)
        const handleScroll = () => {
            // Hero uses 500% scroll height for its animation
            // Check if we're still in the hero animation zone
            const heroAnimationEnd = window.innerHeight * 5; // 500vh
            const currentScroll = window.scrollY;
            setIsInHeroAnimation(currentScroll < heroAnimationEnd);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the most visible section
                let maxRatio = 0;
                let mostVisibleSection = activeSection;

                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        mostVisibleSection = entry.target.id;
                    }
                });

                if (maxRatio > 0) {
                    setActiveSection(mostVisibleSection);
                }
            },
            {
                rootMargin: "-30% 0px -30% 0px", // Trigger when section is in the middle 40% of viewport
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
            }
        );

        // Delayed observation to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            navItems.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element);
                }
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [activeSection]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // For hero, scroll to top
            if (id === "hero") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    };

    // Hide nav when in hero animation or when hero section is active
    const shouldHideNav = isInHeroAnimation || activeSection === "hero";

    return (
        <motion.nav
            initial={{ x: 100, opacity: 0 }}
            animate={{
                x: shouldHideNav ? 100 : 0,
                opacity: shouldHideNav ? 0 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
            }}
            className={`fixed right-0 top-1/2 z-[99] -translate-y-1/2 hidden md:block ${shouldHideNav ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
            <ul className="flex flex-col items-end gap-4 pr-8">
                {navItems.map((item) => {
                    // Don't show "Home" link in the side nav since it's hidden on home
                    if (item.id === "hero") return null;

                    const isActive = activeSection === item.id;

                    return (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className="group flex flex-col items-end text-right transition-all duration-300 ease-in-out focus:outline-none"
                            >
                                <motion.span
                                    initial={false}
                                    animate={{
                                        fontSize: isActive ? "3rem" : "1rem",
                                        opacity: isActive ? 1 : 0.4,
                                        color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                    className={cn(
                                        "font-bold font-headline leading-tight tracking-tighter",
                                        !isActive && "group-hover:opacity-70 group-hover:scale-105 transition-all"
                                    )}
                                >
                                    {item.label}
                                </motion.span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </motion.nav>
    );
}
