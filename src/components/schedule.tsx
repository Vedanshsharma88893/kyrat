import { schedule } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Waves } from "lucide-react";
import type { ScheduleItem } from "@/types";

export function Schedule() {
  return (
    <section id="schedule" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              Festival Schedule
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Plan your festival experience. Don't miss your favorite artists and events.
            </p>
          </div>
        </div>
        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px] mx-auto">
            <TabsTrigger value="day1">Day 1</TabsTrigger>
            <TabsTrigger value="day2">Day 2</TabsTrigger>
          </TabsList>
          <TabsContent value="day1">
            <Timeline daySchedule={schedule.day1} />
          </TabsContent>
          <TabsContent value="day2">
            <Timeline daySchedule={schedule.day2} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function Timeline({ daySchedule }: { daySchedule: ScheduleItem[] }) {
  return (
    <Card className="mt-8">
      <CardContent className="p-6 md:p-10">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" />
          {daySchedule.map((item, index) => (
            <div key={item.id} className="relative flex items-start gap-6 md:gap-8 mb-10 last:mb-0">
               {/* Desktop: Right side */}
              <div className="hidden md:block md:w-1/2 text-right pr-8">
                {index % 2 === 0 && (
                  <div>
                    <p className="font-bold text-lg text-primary">{item.performer}</p>
                    <p className="text-muted-foreground flex items-center justify-end gap-2"><Waves className="w-4 h-4"/>{item.stage}</p>
                  </div>
                )}
              </div>
              <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10">
                <div className="h-4 w-4 rounded-full bg-primary border-4 border-background" />
              </div>
               {/* Mobile & Desktop Left Side */}
              <div className="md:w-1/2 md:pl-8">
                 <p className="font-mono text-sm text-accent mb-1">{item.startTime} - {item.endTime}</p>
                 <div className="md:hidden">
                    <p className="font-bold text-lg text-primary">{item.performer}</p>
                    <p className="text-muted-foreground flex items-center gap-2"><Waves className="w-4 h-4"/>{item.stage}</p>
                  </div>
                {index % 2 !== 0 && (
                  <div className="hidden md:block">
                    <p className="font-bold text-lg text-primary">{item.performer}</p>
                    <p className="text-muted-foreground flex items-center gap-2"><Waves className="w-4 h-4"/>{item.stage}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
