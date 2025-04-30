
import { useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Plus, Building, MapPin, Mail, Phone } from "lucide-react";
import { vendors, zones, sites } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VendorsPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Vendors";
  }, []);

  const handleAddVendor = () => {
    toast({
      title: "Feature Not Available",
      description: "Adding new vendors will be available soon.",
      duration: 3000,
    });
  };
  
  const getSiteCount = (vendorId: string) => {
    return sites.filter(site => site.assignedVendorId === vendorId).length;
  };
  
  const getZoneNames = (zoneIds: string[]) => {
    if (zoneIds.length === 0) return "";
    return zoneIds.map(id => zones.find(zone => zone.id === id)?.name || 'Unknown').join(', ');
  };

  return (
    <DashboardLayout 
      title="Fuel Vendors"
      description="Manage vendors that provide fuel refilling services"
      actions={
        <Button size="sm" onClick={handleAddVendor}>
          <Plus className="h-4 w-4 mr-1" />
          Add Vendor
        </Button>
      }
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map(vendor => (
          <DashboardCard 
            key={vendor.id} 
            title={vendor.name}
            footer={
              <div className="w-full flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {getSiteCount(vendor.id)} assigned sites
                </span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${vendor.email}`} className="text-sm hover:underline">
                  {vendor.email}
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${vendor.phone}`} className="text-sm hover:underline">
                  {vendor.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-fuel-accent" />
                <div className="text-sm">
                  {vendor.isGlobal ? (
                    <span className="text-sm font-medium">Global Vendor</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium">Zones: </span>
                      <span className="text-sm text-muted-foreground">
                        {getZoneNames(vendor.zoneIds)}
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <Button className="w-full" size="sm" onClick={() => {
                toast({
                  title: "View Vendor Details",
                  description: "This feature will be available soon."
                });
              }}>
                View Details
              </Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default VendorsPage;
