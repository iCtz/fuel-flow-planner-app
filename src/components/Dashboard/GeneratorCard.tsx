
import { DashboardCard } from "./DashboardCard";
import { FuelGauge } from "./FuelGauge";
import { Button } from "@/components/ui/button";
import { Droplet, Gauge, Power, Settings } from "lucide-react";
import { Generator } from "@/types/generators";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface GeneratorCardProps {
  generator: Generator;
}

export function GeneratorCard({ generator }: GeneratorCardProps) {
  const { name, location, fuelLevel, capacity, status, tanks } = generator;
  const { toast } = useToast();

  const statusColor = {
    operational: "text-green-500",
    maintenance: "text-amber-500",
    offline: "text-red-500",
  }[status] || "text-muted-foreground";

  const hasMultipleTanks = tanks && tanks.length > 1;

  return (
    <DashboardCard 
      title={name}
      className="hover:border-fuel-primary/50 transition-colors"
      footer={
        <div className="flex justify-between w-full text-sm">
          <span className="text-muted-foreground flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {capacity}L {hasMultipleTanks && `(${tanks.length} tanks)`}
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
              onClick={() => {
                toast({
                  title: "Refill Scheduled",
                  description: "This feature will be available soon."
                });
              }}
            >
              <Droplet className="mr-1 h-3.5 w-3.5 text-fuel-accent" />
              Refill
            </Button>
            
            <Button 
              className="w-full" 
              size="sm" 
              variant="outline"
              asChild
            >
              <Link to={`/generators/${generator.id}`}>
                <Settings className="mr-1 h-3.5 w-3.5" />
                Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
