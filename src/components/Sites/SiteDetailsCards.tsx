
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Building, Edit, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Site, Zone, Vendor } from "@/types/hierarchy";
import { Generator } from "@/types/generators";
import { useToast } from "@/hooks/use-toast";
import { renderLocalizedString } from "@/utils/localizedString";
import { SiteActions } from "./SiteActions";

interface SiteDetailsCardsProps {
  site: Site;
  zone: Zone | null;
  vendor: Vendor | null;
  siteGenerators: Generator[];
}

export function SiteDetailsCards({ site, zone, vendor, siteGenerators }: SiteDetailsCardsProps) {
  const { toast } = useToast();
  
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <DashboardCard title="Site Details">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-fuel-accent" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{renderLocalizedString(site.location)}</p>
            </div>
          </div>
          
          {site.coordinates && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4"></div> {/* Spacer for alignment */}
              <div>
                <p className="text-sm text-muted-foreground">
                  Lat: {site.coordinates.lat.toFixed(4)}, 
                  Lng: {site.coordinates.lng.toFixed(4)}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Assigned Vendor</p>
              <p className="text-sm text-muted-foreground">
                {vendor ? renderLocalizedString(vendor.name) : "No vendor assigned"}
              </p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full" onClick={() => {
            toast({
              title: "Edit Site",
              description: "This feature will be available soon."
            });
          }}>
            <Edit className="h-4 w-4 mr-1" />
            Edit Details
          </Button>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Generator Summary">
        <div className="space-y-4">
          <div className="text-sm">
            <div className="flex justify-between mb-2">
              <span>Total Generators:</span>
              <span className="font-medium">{siteGenerators.length}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Operational:</span>
              <span className="font-medium">{siteGenerators.filter(g => g.status === 'operational').length}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>In Maintenance:</span>
              <span className="font-medium">{siteGenerators.filter(g => g.status === 'maintenance').length}</span>
            </div>
            <div className="flex justify-between">
              <span>Offline:</span>
              <span className="font-medium">{siteGenerators.filter(g => g.status === 'offline').length}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="text-sm font-medium mb-1">Average Fuel Level</div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div 
                className="bg-fuel-accent h-2.5 rounded-full" 
                style={{ 
                  width: `${siteGenerators.length 
                    ? Math.round(siteGenerators.reduce((acc, gen) => acc + gen.fuelLevel, 0) / siteGenerators.length) 
                    : 0}%` 
                }}
              ></div>
            </div>
            <div className="text-right text-xs text-muted-foreground mt-1">
              {siteGenerators.length 
                ? Math.round(siteGenerators.reduce((acc, gen) => acc + gen.fuelLevel, 0) / siteGenerators.length)
                : 0}%
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Actions">
        <SiteActions siteId={site.id} />
      </DashboardCard>
    </div>
  );
}
