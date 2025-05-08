
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

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="mb-3">
        <h3 className="font-medium text-base">{renderLocalizedString(generator.name)}</h3>
        <p className="text-sm text-muted-foreground">{renderLocalizedString(generator.location)}</p>
      </div>

      <div className="relative mb-4">
        <div className="h-20 bg-blue-400 rounded-md overflow-hidden relative">
          <div 
            className="w-full h-full bg-gradient-to-b from-blue-300 to-blue-500"
            style={{ 
              backgroundSize: '100% 100%',
              position: 'absolute'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-orange-500">{generator.fuelLevel}%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs px-3 py-1 h-8"
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
          className="text-xs px-3 py-1 h-8"
          asChild
        >
          <Link to={`/generators/${generator.id}`}>
            <Settings className="h-4 w-4 mr-1" />
            Details
          </Link>
        </Button>
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
