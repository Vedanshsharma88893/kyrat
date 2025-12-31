"use client";

import { useEffect, useRef } from "react";

export function BackgroundVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75; // Optional: slow down slightly for atmosphere
        }
    }, []);

    return (
        <div className="fixed inset-0 top-0 left-0 h-screen w-full z-0 overflow-hidden pointer-events-none bg-black">
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute top-0 left-0 min-h-full min-w-full h-full w-full object-cover opacity-60"
            >
                <source src="https://bot-hosting-assets.s3.amazonaws.com/vid-bg.mp4" type="video/mp4" />
                <source src="/videos/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
