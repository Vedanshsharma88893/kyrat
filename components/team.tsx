"use client";

import Image from "next/image";
import Link from "next/link";
import { team } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Team() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  // Only show first 6 members for the preview section (2 rows of 3 on desktop)
  const displayedTeam = team.slice(0, 6);

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-transparent relative">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white">
              Meet the Team
            </h2>
            <p className="max-w-[900px] text-white/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The passionate individuals working behind the scenes to make Kyrat a reality.
            </p>
          </div>
        </div>

        {/* Grid Layout (No Scroll) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayedTeam.map((member) => {
            const image = getImage(member.imageId);
            return (
              <div
                key={member.id}
                className="flex flex-col items-center text-center gap-3 p-4
                           bg-white/5 backdrop-blur-sm border border-white/10
                           hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                style={{ borderRadius: '40px' }}
              >
                <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-cyan-400/50">
                  {image && (
                    <AvatarImage
                      src={image.imageUrl}
                      alt={member.name}
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <AvatarFallback className="bg-cyan-900 text-white text-2xl">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-headline text-white">{member.name}</h3>
                  <p className="text-sm text-cyan-400 font-semibold">{member.title}</p>
                  <p className="text-sm text-white/60 max-w-xs line-clamp-2">{member.bio}</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <TooltipProvider>
                    {member.social.twitter && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={member.social.twitter} target="_blank" className="text-white/50 hover:text-cyan-400 transition-colors">
                            <Twitter className="h-5 w-5" />
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
                          <Link href={member.social.linkedin} target="_blank" className="text-white/50 hover:text-cyan-400 transition-colors">
                            <Linkedin className="h-5 w-5" />
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
                          <Link href={member.social.instagram} target="_blank" className="text-white/50 hover:text-cyan-400 transition-colors">
                            <Instagram className="h-5 w-5" />
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

        {/* View All Members Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/team"
            className="group flex items-center gap-3 px-8 py-4 rounded-full
                       bg-white/10 backdrop-blur-md border border-white/20
                       hover:bg-cyan-500/20 hover:border-cyan-400/40
                       transition-all duration-300 hover:scale-105"
          >
            <span className="text-white font-semibold">View All Members</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
