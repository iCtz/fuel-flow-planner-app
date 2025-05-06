
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: string;
  amount: number;
  status: string;
}

interface EventsListProps {
  date: Date | undefined;
  events: Event[];
}

export function EventsList({ date, events }: EventsListProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const handleAddToCalendar = () => {
    toast({
      title: t("planning.addedToCalendar"),
      description: t("planning.addedToCalendarDescription"),
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium">
        {date 
          ? format(date, "MMMM d, yyyy") 
          : t("planning.selectADate")}
      </h3>
      
      {events.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-md">
          <CalendarIcon className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground">
            {t("planning.noEventsScheduled")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event, index) => (
            <div 
              key={index} 
              className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <Badge variant={event.status === 'completed' ? "default" : "outline"}>
                  {event.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {format(event.date, "h:mm a")} • {event.amount}L
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs" 
                onClick={handleAddToCalendar}
              >
                <Plus className="h-3 w-3 mr-1" />
                {t("planning.addToMyCalendar")}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
