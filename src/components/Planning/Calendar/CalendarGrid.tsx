
import { useState } from "react";
import { Droplet } from "lucide-react";
import { Site } from "@/types/hierarchy";
import { sites } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";

interface CalendarGridProps {
  currentMonth: Date;
  events: any[];
}

export function CalendarGrid({ currentMonth, events }: CalendarGridProps) {
  // Calculate the number of days in the month
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  // Calculate the starting day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  
  // Create array for the days in the month
  const days = Array.from({ length: 35 }).map((_, index) => {
    const day = index - firstDayOfMonth + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
  
  // Get events for a specific day
  const getEventsForDay = (day: number | null) => {
    if (!day) return [];
    
    return events.filter((event: any) => {
      const eventDate = new Date(event.scheduledDate);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentMonth.getMonth() &&
             eventDate.getFullYear() === currentMonth.getFullYear();
    });
  };
  
  // Find site info
  const getSiteInfo = (siteId: string): Site | undefined => {
    return sites.find(s => s.id === siteId);
  };
  
  return (
    <>
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
        
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          
          return (
            <div 
              key={index} 
              className={`min-h-24 p-1 border rounded ${!day ? 'bg-muted/20' : 'hover:bg-muted/50 transition-colors'}`}
            >
              {day && (
                <>
                  <div className="text-right text-sm font-medium">{day}</div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.map((event: any, eventIndex: number) => {
                      const siteInfo = getSiteInfo(event.siteId);
                      const siteName = siteInfo ? renderLocalizedString(siteInfo.name) : 'Unknown Site';
                      
                      return (
                        <div 
                          key={eventIndex}
                          className="text-xs p-1.5 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-default"
                          title={`${siteName} - ${event.amount}L`}
                        >
                          <div className="flex items-center gap-1 truncate">
                            <Droplet className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{siteName}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
