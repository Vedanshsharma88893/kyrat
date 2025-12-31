'use client';

import { useEffect, useRef, useState } from 'react';

type LoadingScreenProps = {
    onLoadComplete?: () => void;
    minDisplayTime?: number;
    isReady?: boolean;
};

export function LoadingScreen({
    onLoadComplete,
    minDisplayTime = 1500,
    isReady = true
}: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const startTimeRef = useRef<number>(Date.now());
    const [internalReady, setInternalReady] = useState(false);

    useEffect(() => {
        // Disable scrolling while loading
        document.body.style.overflow = 'hidden';

        // Set video playback to 2x speed
        if (videoRef.current) {
            videoRef.current.playbackRate = 2.0;
            videoRef.current.play().catch(console.warn);
        }

        const checkPageReady = () => {
            return document.readyState === 'complete';
        };

        const onInternalLoad = () => {
            setInternalReady(true);
        };

        if (checkPageReady()) {
            onInternalLoad();
        } else {
            window.addEventListener('load', onInternalLoad);
            const fallback = setTimeout(onInternalLoad, 5000);
            return () => {
                window.removeEventListener('load', onInternalLoad);
                clearTimeout(fallback);
                document.body.style.overflow = '';
            };
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (internalReady && isReady) {
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = Math.max(0, minDisplayTime - elapsed);

            const timer = setTimeout(() => {
                setIsFadingOut(true);
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = '';
                    onLoadComplete?.();
                }, 600);
            }, remaining);

            return () => clearTimeout(timer);
        }
    }, [internalReady, isReady, minDisplayTime, onLoadComplete]);

    if (!isLoading) return null;

    return (
        <div
            className={`
                fixed inset-0 z-[9999] 
                flex items-center justify-center 
                bg-black
                transition-opacity duration-[600ms] ease-out
                ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
        >
            {/* Rounded video container - 80px */}
            <div
                className="relative overflow-hidden"
                style={{
                    width: '100px',
                    height: '80px',
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/loading.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
