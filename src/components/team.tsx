import Image from "next/image";
import { team } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export function Team() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">
              Meet the Team
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The passionate individuals working behind the scenes to make KYRAT Festival a reality.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
          {team.map((member) => {
            const image = getImage(member.imageId);
            return (
              <div key={member.id} className="flex flex-col items-center text-center gap-4">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/50">
                  {image && (
                    <AvatarImage 
                      src={image.imageUrl} 
                      alt={member.name}
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-headline">{member.name}</h3>
                  <p className="text-sm text-accent font-semibold">{member.title}</p>
                  <p className="text-sm text-muted-foreground max-w-xs">{member.bio}</p>
                </div>
                 <div className="flex items-center gap-2 mt-2">
                    <TooltipProvider>
                      {member.social.twitter && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={member.social.twitter} target="_blank" className="text-muted-foreground hover:text-primary">
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
                            <Link href={member.social.linkedin} target="_blank" className="text-muted-foreground hover:text-primary">
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
                            <Link href={member.social.instagram} target="_blank" className="text-muted-foreground hover:text-primary">
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
      </div>
    </section>
  );
}
