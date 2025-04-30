
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { MapPin, User, Plus, FuelConst, Calendar, ClipboardList } from "lucide-react";
import { zones, sites, users, fuelPlans, regions } from "@/data/mockData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ZoneDetailsPage = () => {
  const { zoneId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [zone, setZone] = useState<any>(null);
  const [zonePlans, setZonePlans] = useState<any[]>([]);
  const [supervisor, setSupervisor] = useState<any>(null);
  const [region, setRegion] = useState<any>(null);
  
  useEffect(() => {
    if (zoneId) {
      const zoneData = zones.find(z => z.id === zoneId);
      
      if (zoneData) {
        setZone(zoneData);
        document.title = `Fuel Flow Planner - ${zoneData.name}`;
        
        // Get supervisor
        if (zoneData.supervisorId) {
          setSupervisor(users.find(u => u.id === zoneData.supervisorId));
        }
        
        // Get region
        setRegion(regions.find(r => r.id === zoneData.regionId));
        
        // Get fuel plans for this zone
        setZonePlans(fuelPlans.filter(p => p.zoneId === zoneId));
      } else {
        toast({
          title: "Zone not found",
          description: "The requested zone could not be found.",
          variant: "destructive"
        });
        navigate("/zones");
      }
    }
  }, [zoneId, navigate, toast]);
  
  if (!zone) {
    return null; // Loading or not found
  }

  return (
    <DashboardLayout 
      title={zone.name}
      description={`Zone in ${region?.name || 'Unknown Region'}`}
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to="/zones">Back to Zones</Link>
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Site
          </Button>
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Zone Details">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{zone.description}</p>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-fuel-secondary" />
              <div>
                <p className="text-sm font-medium">Supervisor</p>
                <p className="text-sm text-muted-foreground">{supervisor?.name || "Unassigned"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-fuel-accent" />
              <div>
                <p className="text-sm font-medium">Total Sites</p>
                <p className="text-sm">{zone.sites.length} sites</p>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard title="Current Month Plan">
          <div className="space-y-4">
            {zonePlans.some(p => p.month === "2025-05") ? (
              <div>
                <p className="text-sm font-medium">May 2025</p>
                <p className="text-sm text-muted-foreground">
                  Status: {zonePlans.find(p => p.month === "2025-05")?.status}
                </p>
                <div className="mt-4">
                  <Button size="sm" asChild>
                    <Link to={`/planning?zoneId=${zoneId}&month=2025-05`}>View Plan</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">No plan created for current month.</p>
                <div className="mt-4">
                  <Button size="sm">Create May 2025 Plan</Button>
                </div>
              </div>
            )}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Actions">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to={`/planning?zoneId=${zoneId}`}>
                <Calendar className="h-4 w-4 mr-2" />
                View Planning Calendar
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to={`/field-reports?zoneId=${zoneId}`}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Review Field Reports
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => {
              toast({
                title: "Assign Supervisor",
                description: "This feature will be available soon."
              });
            }}>
              <User className="h-4 w-4 mr-2" />
              Assign Supervisor
            </Button>
          </div>
        </DashboardCard>
      </div>
      
      <Tabs defaultValue="sites">
        <TabsList>
          <TabsTrigger value="sites">Sites ({zone.sites.length})</TabsTrigger>
          <TabsTrigger value="plans">Fuel Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sites" className="mt-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {zone.sites.map((siteId: string) => {
              const site = sites.find(s => s.id === siteId);
              if (!site) return null;
              
              return (
                <DashboardCard key={site.id} title={site.name}>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{site.location}</p>
                    <p className="text-sm">
                      <span className="font-medium">{site.generators.length}</span> generators
                    </p>
                    <Button className="w-full" size="sm" asChild>
                      <Link to={`/sites/${site.id}`}>View Details</Link>
                    </Button>
                  </div>
                </DashboardCard>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="plans" className="mt-6">
          <div className="bg-card rounded-lg border shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Month</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Items</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Created By</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {zonePlans.length > 0 ? (
                  zonePlans.map(plan => {
                    const creator = users.find(u => u.id === plan.createdBy);
                    return (
                      <tr key={plan.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{plan.month}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {plan.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{plan.planItems.length}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{creator?.name || "Unknown"}</td>
                        <td className="py-3 px-4">
                          <Button size="sm" asChild>
                            <Link to={`/planning?zoneId=${zoneId}&month=${plan.month}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground">
                      No fuel plans created for this zone yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ZoneDetailsPage;
