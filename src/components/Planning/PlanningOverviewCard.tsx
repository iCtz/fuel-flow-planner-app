
import { FuelPlan, Site, Zone, Vendor } from "@/types/hierarchy";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { renderLocalizedString } from "@/utils/localizedString";
import { Link } from "react-router-dom";

interface PlanningOverviewCardProps {
  plan: FuelPlan;
  zone: Zone | undefined;
  selectedMonth: string;
}

export function PlanningOverviewCard({ plan, zone, selectedMonth }: PlanningOverviewCardProps) {
  const { toast } = useToast();
  const zoneName = zone ? renderLocalizedString(zone.name) : 'Unknown Zone';
  
  return (
    <DashboardCard 
      key={plan.id} 
      title={`${zoneName} - ${selectedMonth}`}
      footer={
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {plan.planItems.length} refills planned
          </span>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={() => toast({
              title: "Download Plan",
              description: "This feature will be available soon."
            })}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Status</p>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {plan.status}
            </span>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium">Total Volume</p>
            <p className="text-sm">
              {plan.planItems.reduce((sum: number, item: any) => sum + (item.amount || 0), 0)}L
            </p>
          </div>
        </div>
        
        <Button className="w-full" size="sm" onClick={() => {
          toast({
            title: "View Plan Details",
            description: "This feature will be available soon."
          });
        }}>
          View Details
        </Button>
      </div>
    </DashboardCard>
  );
}
