
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Plus, Edit, Trash, MapPin, User } from "lucide-react";
import { zones, regions, users } from "@/data/mockData";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Zone } from "@/types/hierarchy";

const ZonesPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const regionId = queryParams.get("regionId");
  
  const [filteredZones, setFilteredZones] = useState<Zone[]>(zones);
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Zones";
    
    if (regionId) {
      setFilteredZones(zones.filter(zone => zone.regionId === regionId));
    } else {
      setFilteredZones(zones);
    }
  }, [regionId]);

  const handleAddZone = () => {
    toast({
      title: "Feature Not Available",
      description: "Adding new zones will be available soon.",
      duration: 3000,
    });
  };

  return (
    <DashboardLayout 
      title={regionId ? `Zones in ${regions.find(r => r.id === regionId)?.name}` : "All Zones"}
      description="Manage zones and their supervisors"
      actions={
        <>
          {regionId && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/regions">Back to Regions</Link>
            </Button>
          )}
          <Button size="sm" onClick={handleAddZone}>
            <Plus className="h-4 w-4 mr-1" />
            Add Zone
          </Button>
        </>
      }
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredZones.map(zone => {
          const regionName = regions.find(r => r.id === zone.regionId)?.name || "Unknown";
          const supervisor = users.find(u => u.id === zone.supervisorId);
          
          return (
            <DashboardCard 
              key={zone.id} 
              title={zone.name}
              footer={
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm text-muted-foreground">Region: {regionName}</span>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => toast({
                      title: "Edit Zone",
                      description: "This feature will be available soon."
                    })}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => toast({
                      title: "Delete Zone",
                      description: "This feature will be available soon."
                    })}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {zone.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-fuel-accent" />
                    <span className="text-sm">{zone.sites.length} sites</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-fuel-secondary" />
                    <span className="text-sm">{supervisor?.name || "No supervisor"}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="sm" asChild>
                  <Link to={`/zones/${zone.id}`}>View Details</Link>
                </Button>
              </div>
            </DashboardCard>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default ZonesPage;
