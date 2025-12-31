"use client";

import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function TeamPageGrid() {
    const getImage = (imageId: string) => {
        return PlaceHolderImages.find((img) => img.id === imageId);
    };

    return (
        <div className="container px-4 md:px-6 py-12 md:py-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl font-headline text-white">
                        The Team
                    </h1>
                    <p className="max-w-[900px] text-white/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Meet the creative minds and dedicated individuals behind Kyrat Festival.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-12">
                {team.map((member) => {
                    const image = getImage(member.imageId);
                    return (
                        <div
                            key={member.id}
                            className="group relative flex flex-col items-center text-center gap-3 p-4
                         bg-white/5 backdrop-blur-sm border border-white/10
                         hover:bg-cyan-950/30 hover:border-cyan-500/30 
                         transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                            style={{ borderRadius: '40px' }}
                        >
                            <div className="relative">
                                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-cyan-400/50 group-hover:border-cyan-400 transition-colors duration-300">
                                    {image && (
                                        <AvatarImage
                                            src={image.imageUrl}
                                            alt={member.name}
                                            data-ai-hint={image.imageHint}
                                        />
                                    )}
                                    <AvatarFallback className="bg-cyan-900 text-white text-3xl">
                                        {member.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                {/* Decorative ring */}
                                <div className="absolute inset-0 rounded-full border border-white/20 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
                            </div>

                            <div className="space-y-1 w-full">
                                <h3 className="text-xl font-bold font-headline text-white group-hover:text-cyan-300 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-cyan-400 font-semibold uppercase tracking-wider">{member.title}</p>
                                <p className="text-sm text-white/60 line-clamp-3 mt-2 mx-auto max-w-[250px]">{member.bio}</p>
                            </div>

                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10 w-full justify-center">
                                <TooltipProvider>
                                    {member.social.twitter && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link href={member.social.twitter} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-white/50 hover:text-cyan-400 transition-all">
                                                    <Twitter className="h-4 w-4" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Twitter</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                    {member.social.linkedin && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link href={member.social.linkedin} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-white/50 hover:text-cyan-400 transition-all">
                                                    <Linkedin className="h-4 w-4" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>LinkedIn</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                    {member.social.instagram && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link href={member.social.instagram} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500/20 text-white/50 hover:text-cyan-400 transition-all">
                                                    <Instagram className="h-4 w-4" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Instagram</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </TooltipProvider>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
