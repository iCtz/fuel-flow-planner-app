
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MonthNavigationProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthNavigation({ currentMonth, onMonthChange }: MonthNavigationProps) {
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    onMonthChange(newMonth);
  };
  
  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    onMonthChange(newMonth);
  };
  
  return (
    <div className="flex items-center justify-between mb-4">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={prevMonth}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <h3 className="text-lg font-medium">
        {format(currentMonth, "MMMM yyyy")}
      </h3>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={nextMonth}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
