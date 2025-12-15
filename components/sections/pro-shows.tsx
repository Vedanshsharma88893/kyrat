"use client";

import Image from "next/image";

type ProShow = {
  id: number;
  title: string;
  year: string;
  src: string;
};

const proShows: ProShow[] = [
  {
    id: 1,
    title: "DJ Night",
    year: "2024",
    src: "/images/pro-shows/dj-night.png",
  },
  {
    id: 2,
    title: "Rock Concert",
    year: "2023",
    src: "/images/pro-shows/rock-concert.png",
  },
  {
    id: 3,
    title: "EDM Night",
    year: "2022",
    src: "/images/pro-shows/edm-night.png",
  },
  {
    id: 4,
    title: "Indie Evening",
    year: "2021",
    src: "/images/pro-shows/indie-evening.png",
  },
  {
    id: 5,
    title: "Fusion Night",
    year: "2020",
    src: "/images/pro-shows/fusion-night.png",
  },
  {
    id: 6,
    title: "Jazz Night",
    year: "2019",
    src: "/images/pro-shows/jazz-night.png",
  },
  {
    id: 7,
    title: "Pop Star",
    year: "2018",
    src: "https://placehold.co/800x1200/e91e63/ffffff?text=Pop+Star+2018",
  },
  {
    id: 8,
    title: "Electronic Vibes",
    year: "2017",
    src: "https://placehold.co/800x1200/00bcd4/ffffff?text=Electronic+Vibes+2017",
  },
  {
    id: 9,
    title: "Metal Fest",
    year: "2016",
    src: "https://placehold.co/800x1200/ff5722/ffffff?text=Metal+Fest+2016",
  },
  {
    id: 10,
    title: "Acoustic Sessions",
    year: "2015",
    src: "https://placehold.co/800x1200/8bc34a/ffffff?text=Acoustic+Sessions+2015",
  },
];

export function ProShows(): JSX.Element {
  return (
    <section
      id="pro-shows"
      className="relative z-10 bg-background text-foreground border-t border-border/40"
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Kyrat Legacy
          </p>
          <h2 className="mt-4 text-4xl font-bold uppercase tracking-[0.25em] sm:text-5xl md:text-6xl font-headline">
            Pro Shows
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Relive the energy of past pro shows at Kyrat. Scroll to travel through
            the years and see the nights that lit up the campus.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "70vh",
            perspective: "1px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="h-full w-full overflow-y-auto overflow-x-hidden"
            style={{
              transform: "rotate(-90deg) translate3d(0, -100vh, 0)",
              transformOrigin: "right top",
            }}
          >
            <div
              className="flex h-screen flex-col items-center justify-center gap-8"
              style={{ paddingBottom: "10rem" }}
            >
              {proShows.map((show, index) => {
                const depth = index % 3 === 0 ? -0.2 : index % 3 === 1 ? 0.15 : -0.15;
                const scale = index % 3 === 0 ? 1.1 : index % 3 === 1 ? 0.8 : 1.15;
                const offsetY = index % 3 === 0 ? -10 : index % 3 === 1 ? 14 : 0;

                return (
                  <div
                    key={show.id}
                    className="flex min-h-[40vh] items-center justify-center"
                    style={{
                      transform: `rotate(90deg) translateZ(${depth}px) scale(${scale}) translateY(${offsetY}vh)`,
                      transformOrigin: "50% 50%",
                      transition: "transform 0.8s ease-out",
                    }}
                  >
                    <div className="overflow-hidden rounded-3xl bg-background shadow-[0_10px_50px_rgba(0,0,0,0.45)]">
                      <div className="relative h-[55vh] w-[45vh] max-w-[45vh]">
                        <Image
                          src={show.src}
                          alt={show.title}
                          fill
                          className="object-cover saturate-50 sepia-[0.3] hue-rotate-[5deg]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                            {show.year}
                          </p>
                          <p className="mt-2 text-lg font-semibold text-white">
                            {show.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
