
import { Card, CardContent } from "@/components/ui/card";
import { Fuel, AlertCircle, Settings, Power } from "lucide-react";
import { Generator } from "@/types/generators";
import { renderLocalizedString } from "@/utils/localizedString";

interface GeneratorCardProps {
  generator: Generator;
}

export function GeneratorCard({ generator }: GeneratorCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-500';
      case 'maintenance':
        return 'text-amber-500';
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{renderLocalizedString(generator.name)}</h3>
            <span className={`text-xs font-medium flex items-center ${getStatusColor(generator.status)}`}>
              <Power className="h-3 w-3 mr-1" />
              {generator.status}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mb-3">
            {renderLocalizedString(generator.location)}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Fuel Level</span>
              <span className="font-medium">{generator.fuelLevel}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  generator.fuelLevel > 70 
                    ? 'bg-green-500' 
                    : generator.fuelLevel > 30 
                      ? 'bg-amber-500' 
                      : 'bg-red-500'
                }`}
                style={{ width: `${generator.fuelLevel}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-3">
              <div className="flex items-center text-xs">
                <Fuel className="h-4 w-4 mr-1 text-fuel-accent" />
                <span>{generator.capacity}L capacity</span>
              </div>
              {generator.alerts && generator.alerts > 0 && (
                <div className="flex items-center text-xs text-amber-500">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{generator.alerts} alerts</span>
                </div>
              )}
              {generator.needsMaintenance && (
                <div className="flex items-center text-xs text-blue-500">
                  <Settings className="h-4 w-4 mr-1" />
                  <span>Maintenance</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
