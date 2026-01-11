import Image from "next/image";
import Link from "next/link";
import { sponsors } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "./ui/card";

export function Sponsors() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  return (
    <section id="sponsors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
              Our Valued Sponsors
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              This festival is made possible by the generous support of our partners.
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          <div>
            <h3 className="text-center text-2xl font-semibold text-foreground/80 mb-8">Platinum Sponsors</h3>
            <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
              {sponsors.platinum.map((sponsor) => {
                const image = getImage(sponsor.logoId);
                return (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={sponsor.name}
                        width={240}
                        height={120}
                        className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-center text-2xl font-semibold text-foreground/80 mb-8">Gold Sponsors</h3>
            <div className="flex justify-center items-center gap-8 md:gap-10 flex-wrap">
              {sponsors.gold.map((sponsor) => {
                const image = getImage(sponsor.logoId);
                return (
                  <Link href={sponsor.website} key={sponsor.id} target="_blank" rel="noopener noreferrer">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={sponsor.name}
                        width={180}
                        height={90}
                        className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
