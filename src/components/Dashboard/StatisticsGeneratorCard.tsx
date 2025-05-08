
import { Fuel, Settings, Power, Wrench } from "lucide-react";
import { Generator } from "@/types/generators";
import { renderLocalizedString } from "@/utils/localizedString";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface StatisticsGeneratorCardProps {
  generator: Generator;
}

export function StatisticsGeneratorCard({ generator }: StatisticsGeneratorCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <Power className="h-4 w-4 mr-1 text-green-500" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4 mr-1 text-amber-500" />;
      case 'offline':
        return <Power className="h-4 w-4 mr-1 text-red-500" />;
      default:
        return <Power className="h-4 w-4 mr-1 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return <span className="text-green-500">Operational</span>;
      case 'maintenance':
        return <span className="text-amber-500">Maintenance</span>;
      case 'offline':
        return <span className="text-red-500">Offline</span>;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  // Calculate total capacity from all tanks
  const totalCapacity = generator.tanks.reduce((sum, tank) => sum + tank.capacity, 0);
  
  // Determine fuel level color based on percentage
  const getFuelIndicatorColor = (fuelLevel: number) => {
    if (fuelLevel >= 80) return "from-green-300 to-green-500";
    if (fuelLevel >= 40) return "from-blue-300 to-blue-500";
    return "from-red-300 to-red-500";
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="mb-3">
        <h3 className="font-medium text-base">{renderLocalizedString(generator.name)}</h3>
        <p className="text-sm text-muted-foreground">{renderLocalizedString(generator.location)}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-1/3">
          <div className="h-20 w-20 bg-gray-200 rounded-md overflow-hidden relative">
            <div 
              className={`w-full h-full bg-gradient-to-b ${getFuelIndicatorColor(generator.fuelLevel)}`}
              style={{ 
                height: `${generator.fuelLevel}%`,
                position: 'absolute',
                bottom: 0
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-orange-500">{generator.fuelLevel}%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 w-2/3">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs px-3 py-1 h-8 w-full justify-start"
            asChild
          >
            <Link to={`/planning?generatorId=${generator.id}`}>
              <Fuel className="h-4 w-4 mr-1 text-orange-500" />
              Refill
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs px-3 py-1 h-8 w-full justify-start"
            asChild
          >
            <Link to={`/generators/${generator.id}`}>
              <Settings className="h-4 w-4 mr-1" />
              Details
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 text-sm">
        <div className="flex items-center">
          <span className="text-muted-foreground mr-1">{totalCapacity}L</span>
          {generator.tanks.length > 1 && (
            <span className="text-xs text-muted-foreground">
              ({generator.tanks.length} tanks)
            </span>
          )}
        </div>
        
        <div className="flex items-center">
          {getStatusIcon(generator.status)}
          {getStatusText(generator.status)}
        </div>
      </div>
    </div>
  );
}
