
import { DashboardCard } from "./DashboardCard";
import { FuelGauge } from "./FuelGauge";
import { Button } from "@/components/ui/button";
import { Droplet, Gauge, Power, Settings } from "lucide-react";
import { Generator } from "@/types/generators";

interface GeneratorCardProps {
  generator: Generator;
}

export function GeneratorCard({ generator }: GeneratorCardProps) {
  const { name, location, fuelLevel, capacity, status } = generator;

  const statusColor = {
    operational: "text-green-500",
    maintenance: "text-amber-500",
    offline: "text-red-500",
  }[status] || "text-muted-foreground";

  return (
    <DashboardCard 
      title={name}
      className="hover:border-fuel-primary/50 transition-colors"
      footer={
        <div className="flex justify-between w-full text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {capacity}L
          </span>
          <span className={`font-medium flex items-center gap-1 ${statusColor}`}>
            <Power className="h-3.5 w-3.5" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">{location}</div>
        
        <div className="flex items-center gap-4">
          <FuelGauge percentage={fuelLevel} className="h-28" />
          
          <div className="space-y-3">
            <Button 
              className="w-full" 
              size="sm"
              variant="outline"
            >
              <Droplet className="mr-1 h-3.5 w-3.5 text-fuel-accent" />
              Refill
            </Button>
            
            <Button 
              className="w-full" 
              size="sm" 
              variant="outline"
            >
              <Settings className="mr-1 h-3.5 w-3.5" />
              Details
            </Button>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
