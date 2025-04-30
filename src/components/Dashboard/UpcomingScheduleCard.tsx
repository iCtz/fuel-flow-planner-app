
import { DashboardCard } from "./DashboardCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FuelEvent } from "@/types/fuelEvents";

interface UpcomingScheduleCardProps {
  events: FuelEvent[];
}

export function UpcomingScheduleCard({ events }: UpcomingScheduleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <DashboardCard 
      title="Upcoming Schedule"
      footer={
        <Button variant="ghost" size="sm" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Schedule Event
        </Button>
      }
    >
      <ScrollArea className="h-60 pr-4">
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No upcoming events scheduled
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 rounded-md border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-12 text-center">
                  <div className="text-xs font-medium text-muted-foreground">
                    {formatDate(event.date)}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-fuel-accent">
                    {new Date(event.date).getDate()}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Generator: {event.generatorName}
                  </div>
                  {event.amount && (
                    <div className="text-sm">Amount: {event.amount}L</div>
                  )}
                </div>
                <div className="text-xs font-medium text-muted-foreground">
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </DashboardCard>
  );
}
