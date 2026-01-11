"use client";

import { team } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function TeamPageGrid() {
    const getImage = (imageId: string) => {
        return PlaceHolderImages.find((img) => img.id === imageId);
    };

    return (
        <div className="container px-4 md:px-6 py-12 md:py-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline">
                        <span className="text-white">The </span>
                        <span className="text-cyan-400">Team</span>
                    </h1>
                    <p className="max-w-[900px] text-white/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Meet the creative minds and dedicated individuals behind{" "}
                        <span className="text-cyan-400 font-semibold">Kyrat</span>.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                {team.map((member) => {
                    const image = getImage(member.imageId);
                    return (
                        <div
                            key={member.id}
                            className="group relative flex flex-col items-center text-center gap-3 p-4
                                bg-white/5 backdrop-blur-sm border border-white/10
                                hover:bg-cyan-950/30 hover:border-cyan-500/30 
                                transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                            style={{ borderRadius: '30px' }}
                        >
                            <div className="relative">
                                <Avatar className="h-20 w-20 md:h-24 md:w-24 border-3 border-cyan-400/50 group-hover:border-cyan-400 transition-colors duration-300">
                                    {image && (
                                        <AvatarImage
                                            src={image.imageUrl}
                                            alt={member.name}
                                            data-ai-hint={image.imageHint}
                                        />
                                    )}
                                    <AvatarFallback className="bg-gradient-to-br from-cyan-900 to-cyan-700 text-white text-xl font-bold">
                                        {member.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 rounded-full border border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                            </div>
                            <div className="space-y-1 w-full">
                                <h3 className="text-sm md:text-base font-bold font-headline text-white group-hover:text-cyan-300 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-xs text-cyan-400/80 font-semibold uppercase tracking-wider">{member.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
