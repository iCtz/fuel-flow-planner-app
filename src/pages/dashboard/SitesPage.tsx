
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Plus, MapPin, Fuel, Building } from "lucide-react";
import { sites, zones, vendors } from "@/data/mockData";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Site } from "@/types/hierarchy";
import { renderLocalizedString } from "@/utils/localizedString";

const SitesPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const zoneId = queryParams.get("zoneId");
  
  const [filteredSites, setFilteredSites] = useState<Site[]>(sites);
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Sites";
    
    if (zoneId) {
      setFilteredSites(sites.filter(site => site.zoneId === zoneId));
    } else {
      setFilteredSites(sites);
    }
  }, [zoneId]);

  const handleAddSite = () => {
    toast({
      title: "Feature Not Available",
      description: "Adding new sites will be available soon.",
      duration: 3000,
    });
  };

  return (
    <DashboardLayout 
      title={zoneId ? `Sites in ${renderLocalizedString(zones.find(z => z.id === zoneId)?.name)}` : "All Sites"}
      description="Manage all sites and their generators"
      actions={
        <>
          {zoneId && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/zones/${zoneId}`}>Back to Zone</Link>
            </Button>
          )}
          <Button size="sm" onClick={handleAddSite}>
            <Plus className="h-4 w-4 mr-1" />
            Add Site
          </Button>
        </>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSites.map(site => {
          const zoneName = zones.find(z => z.id === site.zoneId)?.name || "Unknown";
          const vendor = site.assignedVendorId ? vendors.find(v => v.id === site.assignedVendorId) : null;
          
          return (
            <DashboardCard 
              key={site.id} 
              title={renderLocalizedString(site.name)}
              footer={
                <div className="w-full text-sm text-muted-foreground">
                  Zone: {renderLocalizedString(zoneName)}
                </div>
              }
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-fuel-accent" />
                  <span className="text-sm">{renderLocalizedString(site.location)}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <Fuel className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {site.generators.length} Generators
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {vendor ? `Vendor: ${renderLocalizedString(vendor.name)}` : "No vendor assigned"}
                    </span>
                  </div>
                </div>
                
                <Button className="w-full" size="sm" asChild>
                  <Link to={`/sites/${site.id}`}>View Details</Link>
                </Button>
              </div>
            </DashboardCard>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default SitesPage;
