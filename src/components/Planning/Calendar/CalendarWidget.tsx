
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
  const [currentMonth, setCurrentMonth] = useState<Date>(date || new Date());
  
  const handleMonthChange = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={() => handleMonthChange('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h4 className="text-sm font-medium">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h4>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0" 
          onClick={() => handleMonthChange('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={onDateChange}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
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
