
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar as CalendarIcon, Download, CalendarDays, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { fuelPlans, zones, sites, generators } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";
import { useToast } from "@/hooks/use-toast";

export function CalendarIntegration() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<any[]>([]);
  
  // Calculate the date one month from now
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  
  // Collect all refill events from the fuel plans
  const allEvents = fuelPlans.flatMap(plan => 
    plan.planItems.map(item => {
      const site = sites.find(s => s.id === item.siteId);
      const generator = generators.find(g => g.id === item.generatorId);
      const dateObj = new Date(item.scheduledDate);
      
      return {
        id: item.id,
        title: `Refill ${renderLocalizedString(site?.name || "")} - ${renderLocalizedString(generator?.name || "")}`,
        date: dateObj,
        type: 'refill',
        amount: item.amount,
        status: item.status
      };
    })
  );
  
  // Find events for the selected date
  const findEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    return allEvents.filter(event => {
      const eventDate = event.date;
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });
  };
  
  // Update events when date changes
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setEvents(findEventsForDate(newDate));
  };
  
  // Generate a function to determine which dates have events
  const getDaysWithEvents = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    
    return allEvents.some(event => {
      const eventDate = event.date;
      return (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() === month &&
        eventDate.getDate() === day
      );
    });
  };
  
  const handleExportCalendar = () => {
    toast({
      title: t("planning.calendarExported"),
      description: t("planning.calendarExportDescription"),
    });
  };
  
  const handleAddToCalendar = () => {
    toast({
      title: t("planning.addedToCalendar"),
      description: t("planning.addedToCalendarDescription"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2" />
          {t("planning.calendarIntegration")}
        </CardTitle>
        <CardDescription>
          {t("planning.calendarDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md border pointer-events-auto"
              modifiers={{
                hasEvents: getDaysWithEvents
              }}
              modifiersStyles={{
                hasEvents: { 
                  fontWeight: 'bold', 
                  textDecoration: 'underline', 
                  color: 'var(--primary)'
                }
              }}
              disabled={(date) => {
                // Disable dates more than a month in the future
                return date > oneMonthFromNow;
              }}
            />
            <div className="flex flex-wrap gap-2 mt-4">
              <Button onClick={handleExportCalendar} variant="outline" size="sm" className="flex-grow">
                <Download className="h-4 w-4 mr-2" />
                {t("planning.exportCalendar")}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-grow">
                    <Plus className="h-4 w-4 mr-2" />
                    {t("planning.addToCalendar")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">{t("planning.selectCalendarApp")}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t("planning.selectCalendarDescription")}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="justify-start" 
                        onClick={handleAddToCalendar}
                      >
                        Google Calendar
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start" 
                        onClick={handleAddToCalendar}
                      >
                        Microsoft Outlook
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start" 
                        onClick={handleAddToCalendar}
                      >
                        Apple Calendar
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start" 
                        onClick={handleAddToCalendar}
                      >
                        Yahoo Calendar
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
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
        </div>
      </CardContent>
    </Card>
  );
}
