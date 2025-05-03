
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Plus, MapPin, Fuel, Building, Edit, Calendar, ClipboardList } from "lucide-react";
import { sites, zones, vendors, generators, fieldReports } from "@/data/mockData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneratorCard } from "@/components/Dashboard/GeneratorCard";
import { Site } from "@/types/hierarchy";
import { Generator } from "@/types/generators";
import { renderLocalizedString } from "@/utils/localizedString";

const SiteDetailsPage = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [site, setSite] = useState<Site | null>(null);
  const [zone, setZone] = useState<any>(null);
  const [vendor, setVendor] = useState<any>(null);
  const [siteGenerators, setSiteGenerators] = useState<Generator[]>([]);
  const [siteReports, setSiteReports] = useState<any[]>([]);
  
  useEffect(() => {
    if (siteId) {
      const siteData = sites.find(s => s.id === siteId);
      
      if (siteData) {
        setSite(siteData);
        document.title = `Fuel Flow Planner - ${renderLocalizedString(siteData.name)}`;
        
        // Get zone
        setZone(zones.find(z => z.id === siteData.zoneId));
        
        // Get vendor
        if (siteData.assignedVendorId) {
          setVendor(vendors.find(v => v.id === siteData.assignedVendorId));
        }
        
        // Get generators
        setSiteGenerators(generators.filter(g => g.siteId === siteId));
        
        // Get field reports
        setSiteReports(fieldReports.filter(r => r.siteId === siteId));
      } else {
        toast({
          title: "Site not found",
          description: "The requested site could not be found.",
          variant: "destructive"
        });
        navigate("/sites");
      }
    }
  }, [siteId, navigate, toast]);
  
  if (!site) {
    return null; // Loading or not found
  }

  return (
    <DashboardLayout 
      title={renderLocalizedString(site.name)}
      description={`Site in ${zone ? renderLocalizedString(zone.name) : 'Unknown Zone'}`}
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to="/sites">Back to Sites</Link>
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Generator
          </Button>
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Site Details">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-fuel-accent" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{site.location}</p>
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
                  {vendor ? vendor.name : "No vendor assigned"}
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
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to={`/planning?siteId=${siteId}`}>
                <Calendar className="h-4 w-4 mr-2" />
                View Refill Schedule
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to={`/field-reports?siteId=${siteId}`}>
                <ClipboardList className="h-4 w-4 mr-2" />
                View Field Reports
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => {
              toast({
                title: "Assign Vendor",
                description: "This feature will be available soon."
              });
            }}>
              <Building className="h-4 w-4 mr-2" />
              Assign Vendor
            </Button>
          </div>
        </DashboardCard>
      </div>
      
      <Tabs defaultValue="generators">
        <TabsList>
          <TabsTrigger value="generators">Generators</TabsTrigger>
          <TabsTrigger value="reports">Field Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generators" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteGenerators.map(generator => (
              <GeneratorCard key={generator.id} generator={generator} />
            ))}
            
            {siteGenerators.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No generators added to this site yet.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <div className="bg-card rounded-lg border shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Generator</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Readings</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {siteReports.length > 0 ? (
                  siteReports.map(report => {
                    const generator = generators.find(g => g.id === report.generatorId);
                    return (
                      <tr key={report.id} className="border-b">
                        <td className="py-3 px-4 font-medium">{report.reportDate}</td>
                        <td className="py-3 px-4">{generator?.name || "Unknown"}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{report.readings.length} readings</td>
                        <td className="py-3 px-4">
                          <Button size="sm" onClick={() => {
                            toast({
                              title: "View Report",
                              description: "This feature will be available soon."
                            });
                          }}>
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground">
                      No field reports submitted for this site yet.
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

export default SiteDetailsPage;
