"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ onLoaded }: { onLoaded?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameCount = 151;
  const currentFrame = (index: number) =>
    `/videos/hero/frames/frame${index.toString().padStart(4, "0")}.webp`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // Set canvas dimensions based on device - use device pixel ratio for crisp rendering
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.scale(dpr, dpr);
    };

    updateCanvasSize();

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const ctx = gsap.context(() => {
      const airpods = { frame: 1 };

      const render = () => {
        const width = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
        const height = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));

        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[airpods.frame - 1];
        if (img) {
          context.drawImage(img, 0, 0, width, height);
        }
      };

      const preloadImages = () => {
        for (let i = 1; i <= frameCount; i++) {
          const img = new Image();
          img.src = currentFrame(i);
          img.onload = () => {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) {
              setIsLoading(false);
              onLoaded?.();
              initAnimation();
            }
          };
          images.push(img);
        }
      };

      const initAnimation = () => {
        render();

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const frameIndex = Math.floor(self.progress * (frameCount - 1)) + 1;
            airpods.frame = frameIndex;
            render();

            // Fade out and blur effect at the very end
            const maskEnd = self.progress > 0.95
              ? 100 - (self.progress - 0.95) * 300
              : 100;

            canvas.style.setProperty('--mask-end', `${maskEnd}%`);

            if (self.progress > 0.99) {
              const fadeProgress = (self.progress - 0.99) / 0.01;
              const opacity = 1 - fadeProgress;
              const blurAmount = fadeProgress * 20;

              canvas.style.opacity = opacity.toString();
              canvas.style.filter = `blur(${blurAmount}px)`;
            } else {
              canvas.style.opacity = "1";
              canvas.style.filter = "blur(0px)";
            }
          },
        });
      };

      // Handle resize
      const handleResize = () => {
        updateCanvasSize();
        render();
      };

      window.addEventListener("resize", handleResize);
      preloadImages();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => ctx.revert();
  }, [onLoaded]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent overflow-hidden"
      style={{ height: "100vh", minHeight: "100svh" }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "linear-gradient(to bottom, black var(--mask-end, 100%), transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black var(--mask-end, 100%), transparent 100%)",
            mixBlendMode: "normal",
          }}
        />
      </div>
    </section>
  );
}
