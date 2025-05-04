
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { FuelPlan, Site } from "@/types/hierarchy";
import { sites } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";
import { Droplet } from "lucide-react";

interface PlanningCalendarViewProps {
  currentPlans: FuelPlan[];
  selectedMonth: string;
}

export function PlanningCalendarView({ currentPlans, selectedMonth }: PlanningCalendarViewProps) {
  return (
    <DashboardCard title="Monthly Schedule">
      <div className="p-4">
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
          {/* This is a simplified calendar. In a real app, we would calculate the days based on the month */}
          {Array.from({ length: 35 }).map((_, index) => {
            const day = index - 5; // First day of month starts on the 6th cell (Sunday)
            
            // Create a placeholder for the events on this day
            const events = currentPlans.flatMap(plan => 
              plan.planItems.filter((item: any) => {
                const itemDate = new Date(item.scheduledDate);
                return itemDate.getDate() === day + 1;
              })
            );
            
            return (
              <div 
                key={index} 
                className={`min-h-24 p-1 border rounded ${day < 0 || day >= 31 ? 'bg-muted/20' : 'hover:bg-muted/50'}`}
              >
                {day >= 0 && day < 31 && (
                  <>
                    <div className="text-right text-sm font-medium">{day + 1}</div>
                    <div className="mt-1">
                      {events.map((event: any, eventIndex: number) => {
                        const siteInfo = sites.find(s => s.id === event.siteId);
                        const siteName = siteInfo ? renderLocalizedString(siteInfo.name) : 'Unknown Site';
                        return (
                          <div 
                            key={eventIndex}
                            className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800"
                            title={`${siteName} - ${event.amount}L`}
                          >
                            <div className="flex items-center gap-1 truncate">
                              <Droplet className="h-3 w-3" />
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
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {selectedMonth.replace('-', ' ')} - Total Events: {
            currentPlans.reduce((sum, plan) => sum + plan.planItems.length, 0)
          }
        </div>
      </div>
    </DashboardCard>
  );
}
