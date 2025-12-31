"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/footer';
import { TeamPageGrid } from '@/components/team-page-grid';

export default function TeamRoute() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 1.0;
            videoRef.current.muted = true;
            videoRef.current.play().catch((e) => {
                console.warn("Video autoplay blocked:", e);
            });
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col text-foreground">
            {/* Background Video Container - Same as main page */}
            <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-neutral-900">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                >
                    <source src="/videos/bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Simple Back Button Header */}
            <div className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
                <div className="container flex items-center justify-between">
                    <a
                        href="/"
                        className="group flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300
                       bg-white/10 backdrop-blur-lg
                       hover:bg-white/20 hover:scale-105"
                    >
                        <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                        <span className="text-white font-medium text-sm">Back to Home</span>
                    </a>

                    <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Image
                            src="/logo.png"
                            alt="Kyrat Logo"
                            width={40}
                            height={40}
                            className="h-8 w-8 md:h-10 md:w-10"
                        />
                    </a>
                </div>
            </div>

            <main className="flex-1 relative z-10 pt-20">
                <TeamPageGrid />
            </main>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
}
