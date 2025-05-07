
import { FuelPlan } from "@/types/hierarchy";

interface CalendarSummaryProps {
  plans: FuelPlan[];
  selectedMonth: string;
}

export function CalendarSummary({ plans, selectedMonth }: CalendarSummaryProps) {
  // Calculate total events
  const totalEvents = plans.reduce((sum, plan) => sum + plan.planItems.length, 0);
  
  // Calculate total volume
  const totalVolume = plans.reduce((sum, plan) => {
    return sum + plan.planItems.reduce((planSum, item) => planSum + item.amount, 0);
  }, 0);
  
  // Count statuses
  const statusCounts = plans.reduce((acc: Record<string, number>, plan) => {
    plan.planItems.forEach(item => {
      acc[item.status] = (acc[item.status] || 0) + 1;
    });
    return acc;
  }, {});
  
  return (
    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
      <div className="p-2 bg-muted/30 rounded-md">
        <div className="text-sm text-muted-foreground">Total Events</div>
        <div className="text-lg font-semibold">{totalEvents}</div>
      </div>
      
      <div className="p-2 bg-muted/30 rounded-md">
        <div className="text-sm text-muted-foreground">Total Volume</div>
        <div className="text-lg font-semibold">{totalVolume.toLocaleString()}L</div>
      </div>
      
      <div className="p-2 bg-muted/30 rounded-md">
        <div className="text-sm text-muted-foreground">Completed</div>
        <div className="text-lg font-semibold">
          {statusCounts['completed'] || 0} / {totalEvents}
        </div>
      </div>
    </div>
  );
}
