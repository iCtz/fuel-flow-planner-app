
import { useState, useEffect, useMemo } from "react";
import { fuelPlans, sites, generators } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: string;
  amount: number;
  status: string;
  siteId?: string;
  generatorId?: string;
}

export function useCalendarEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  // Calculate the date one month from now
  const oneMonthFromNow = useMemo(() => {
    const future = new Date();
    future.setMonth(future.getMonth() + 1);
    return future;
  }, []);
  
  // Collect all refill events from the fuel plans
  const allEvents: CalendarEvent[] = useMemo(() => {
    return fuelPlans.flatMap(plan => 
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
          status: item.status,
          siteId: item.siteId,
          generatorId: item.generatorId
        };
      })
    );
  }, []);
  
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
  
  // Set initial events based on current date
  useEffect(() => {
    setEvents(findEventsForDate(date));
  }, []);
  
  return {
    date,
    events,
    allEvents,
    oneMonthFromNow,
    handleDateChange,
    getDaysWithEvents
  };
}
