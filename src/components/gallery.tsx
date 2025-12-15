"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function Gallery() {
  const galleryImageIds = [
    "gallery-1", "gallery-2", "gallery-3",
    "gallery-4", "gallery-5", "gallery-6",
    "event-music", "event-art", "event-art-2",
    "event-food", "event-food-2"
  ];

  const images = PlaceHolderImages.filter((img) => galleryImageIds.includes(img.id));

  // Split into two rows
  const mid = Math.ceil(images.length / 2);
  const row1 = images.slice(0, mid);
  const row2 = images.slice(mid);

  // Duplicating for infinite feel (simple version)
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Marquee Speed control via scroll
  // Row 1 moves left, Row 2 moves right
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  const [selectedImage, setSelectedImage] = useState<null | typeof images[0]>(null);

  return (
    <>
      <section ref={containerRef} id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-background overflow-hidden">
        <div className="container px-4 md:px-6 mb-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              Festival Moments
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Experience the vibe through our lens.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Row 1 */}
          <motion.div style={{ x: x1 }} className="flex gap-4 w-max pl-4">
            {marqueeRow1.map((image, i) => (
              <div
                key={`${image.id}-1-${i}`}
                className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div style={{ x: x2 }} className="flex gap-4 w-max pl-4">
            {marqueeRow2.map((image, i) => (
              <div
                key={`${image.id}-2-${i}`}
                className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description}
                fill
                className="object-contain" // Contain to show full image
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-lg font-medium">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
