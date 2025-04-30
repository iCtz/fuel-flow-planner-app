
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { GeneratorCard } from "@/components/Dashboard/GeneratorCard";
import { UpcomingScheduleCard } from "@/components/Dashboard/UpcomingScheduleCard";
import { FuelConsumptionChart } from "@/components/Dashboard/FuelConsumptionChart";
import { QuickStats } from "@/components/Dashboard/QuickStats";
import { 
  generators, 
  upcomingEvents, 
  consumptionData, 
  quickStats, 
  regions, 
  zones, 
  sites 
} from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Fuel, 
  MapPin, 
  Globe, 
  Map 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Fuel Flow Planner - Dashboard";
  }, []);

  const handleAddGenerator = () => {
    toast({
      title: "Feature Not Available",
      description: "Adding new generators will be available soon.",
      duration: 3000,
    });
  };

  return (
    <DashboardLayout 
      title="Dashboard"
      description="Monitor and manage your fuel flow planning system"
      actions={
        <>
          <Button variant="outline" size="sm">
            Last 30 days
          </Button>
          <Button variant="default" size="sm" onClick={handleAddGenerator}>
            <Plus className="h-4 w-4 mr-1" />
            Add Generator
          </Button>
        </>
      }
    >
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="regions">Regions & Zones</TabsTrigger>
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="generators">Generators</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <QuickStats {...quickStats} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Generator Status</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {generators.slice(0, 4).map((generator) => (
                  <GeneratorCard key={generator.id} generator={generator} />
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Planning and Analytics</h2>
              
              <div className="grid gap-4">
                <UpcomingScheduleCard events={upcomingEvents} />
                <FuelConsumptionChart data={consumptionData} />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="regions" className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {regions.map(region => (
              <DashboardCard
                key={region.id}
                title={region.name}
                footer={
                  <div className="w-full text-sm text-muted-foreground">
                    {region.zones.length} zones
                  </div>
                }
              >
                <div className="space-y-4 py-2">
                  <div className="text-sm text-muted-foreground">{region.description}</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{region.zones.length} zones</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/regions?id=${region.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
          
          <h2 className="text-lg font-medium mt-8">All Zones</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {zones.slice(0, 6).map(zone => (
              <DashboardCard
                key={zone.id}
                title={zone.name}
                footer={
                  <div className="w-full text-sm text-muted-foreground">
                    Region: {regions.find(r => r.id === zone.regionId)?.name}
                  </div>
                }
              >
                <div className="space-y-4 py-2">
                  <div className="text-sm text-muted-foreground">{zone.description}</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Map className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{zone.sites.length} sites</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/zones/${zone.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
          
          {zones.length > 6 && (
            <div className="flex justify-center mt-4">
              <Button variant="outline" asChild>
                <Link to="/zones">View All Zones</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="sites" className="space-y-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sites.map(site => (
              <DashboardCard
                key={site.id}
                title={site.name}
                footer={
                  <div className="w-full text-sm text-muted-foreground">
                    Zone: {zones.find(z => z.id === site.zoneId)?.name}
                  </div>
                }
              >
                <div className="space-y-4 py-2">
                  <div className="text-sm text-muted-foreground">{site.location}</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{site.generators.length} generators</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/sites/${site.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" asChild>
              <Link to="/sites">View All Sites</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="generators" className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {generators.map((generator) => (
              <GeneratorCard key={generator.id} generator={generator} />
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" asChild>
              <Link to="/generators">View All Generators</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
