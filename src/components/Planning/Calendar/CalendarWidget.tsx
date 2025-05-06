
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarWidgetProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  getDaysWithEvents: (date: Date) => boolean;
  disabledDates?: (date: Date) => boolean;
}

export function CalendarWidget({
  date,
  onDateChange,
  getDaysWithEvents,
  disabledDates
}: CalendarWidgetProps) {
  const { t } = useTranslation();
  
  return (
    <div className="w-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateChange}
        className="rounded-md border pointer-events-auto w-full"
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
        disabled={disabledDates}
      />
    </div>
  );
}
