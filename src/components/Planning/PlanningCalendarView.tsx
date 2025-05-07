
import { useState, useEffect } from "react";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { FuelPlan } from "@/types/hierarchy";
import { CalendarGrid } from "./Calendar/CalendarGrid";
import { MonthNavigation } from "./Calendar/MonthNavigation";
import { CalendarSummary } from "./Calendar/CalendarSummary";

interface PlanningCalendarViewProps {
  currentPlans: FuelPlan[];
  selectedMonth: string;
}

export function PlanningCalendarView({ currentPlans, selectedMonth }: PlanningCalendarViewProps) {
  // Extract month and year from the selectedMonth string (format: "YYYY-MM")
  const [year, month] = selectedMonth.split('-').map(Number);
  
  // Initialize calendar state with the selected month
  const [currentMonth, setCurrentMonth] = useState(
    new Date(year, month - 1, 1) // Month is 0-indexed in JavaScript Date
  );
  
  // Update current month when selectedMonth changes
  useEffect(() => {
    const [newYear, newMonth] = selectedMonth.split('-').map(Number);
    setCurrentMonth(new Date(newYear, newMonth - 1, 1));
  }, [selectedMonth]);
  
  // Collect all events from the plans
  const allEvents = currentPlans.flatMap(plan => plan.planItems);
  
  return (
    <DashboardCard title="Monthly Schedule">
      <div className="p-4">
        <MonthNavigation 
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
        
        <CalendarGrid 
          currentMonth={currentMonth}
          events={allEvents}
        />
        
        <CalendarSummary 
          plans={currentPlans}
          selectedMonth={selectedMonth}
        />
      </div>
    </DashboardCard>
  );
}
