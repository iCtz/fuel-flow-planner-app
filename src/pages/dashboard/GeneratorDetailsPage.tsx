
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { generators, sites, zones, fieldReports, tanks } from "@/data/mockData";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FuelGauge } from "@/components/Dashboard/FuelGauge";
import { Generator, Tank } from "@/types/generators";
import { Calendar, Droplet, FileText, MapPin, Settings, Tool } from "lucide-react";

const GeneratorDetailsPage = () => {
  const { generatorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [generator, setGenerator] = useState<Generator | null>(null);
  const [site, setSite] = useState<any>(null);
  const [zone, setZone] = useState<any>(null);
  const [generatorReports, setGeneratorReports] = useState<any[]>([]);
  
  // Mock consumption data for the chart
  const [consumptionData, setConsumptionData] = useState([
    { day: "Mon", amount: 12 },
    { day: "Tue", amount: 15 },
    { day: "Wed", amount: 10 },
    { day: "Thu", amount: 13 },
    { day: "Fri", amount: 18 },
    { day: "Sat", amount: 8 },
    { day: "Sun", amount: 5 },
  ]);
  
  useEffect(() => {
    if (generatorId) {
      const generatorData = generators.find(g => g.id === generatorId);
      
      if (generatorData) {
        setGenerator(generatorData);
        document.title = `Fuel Flow Planner - ${generatorData.name}`;
        
        // Get site and zone
        const siteData = sites.find(s => s.id === generatorData.siteId);
        setSite(siteData);
        
        if (siteData) {
          setZone(zones.find(z => z.id === siteData.zoneId));
        }
        
        // Get field reports
        setGeneratorReports(fieldReports.filter(r => r.generatorId === generatorId));
        
        // Ensure tanks are properly linked
        if (!generatorData.tanks.length) {
          // If no tanks are linked, find them from the tanks array
          const generatorTanks = tanks.filter(t => t.generatorId === generatorId);
          generatorData.tanks = generatorTanks;
          setGenerator({...generatorData});
        }
      } else {
        toast({
          title: "Generator not found",
          description: "The requested generator could not be found.",
          variant: "destructive"
        });
        navigate("/generators");
      }
    }
  }, [generatorId, navigate, toast]);
  
  if (!generator || !site) {
    return null; // Loading or not found
  }

  return (
    <DashboardLayout 
      title={generator.name}
      description={`Generator at ${site.name} in ${zone?.name || 'Unknown Zone'}`}
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/sites/${site.id}`}>Back to Site</Link>
          </Button>
          <Button size="sm" onClick={() => {
            toast({
              title: "Schedule Refill",
              description: "This feature will be available soon."
            });
          }}>
            <Droplet className="h-4 w-4 mr-1" />
            Schedule Refill
          </Button>
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Generator Details">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-fuel-accent" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{generator.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    generator.status === 'operational' ? 'bg-emerald-100 text-emerald-800' : 
                    generator.status === 'maintenance' ? 'bg-amber-100 text-amber-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {generator.status.charAt(0).toUpperCase() + generator.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Capacity</p>
                <p className="text-sm">{generator.capacity}L</p>
              </div>
            </div>
            
            {generator.lastRefill && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Refill</p>
                  <p className="text-sm text-muted-foreground">{generator.lastRefill}</p>
                </div>
              </div>
            )}
            
            {generator.nextScheduledRefill && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-fuel-secondary" />
                <div>
                  <p className="text-sm font-medium">Next Scheduled Refill</p>
                  <p className="text-sm">{generator.nextScheduledRefill}</p>
                </div>
              </div>
            )}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Fuel Status">
          <div className="flex items-center justify-center p-4">
            <FuelGauge percentage={generator.fuelLevel} className="h-36" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Current Fuel Level</p>
            <p className="text-2xl font-bold">{generator.fuelLevel}%</p>
            {generator.consumption && (
              <p className="text-sm text-muted-foreground mt-1">
                Consumption rate: ~{generator.consumption}L/day
              </p>
            )}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Actions">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={() => {
              toast({
                title: "Schedule Maintenance",
                description: "This feature will be available soon."
              });
            }}>
              <Tool className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => {
              toast({
                title: "Add Field Report",
                description: "This feature will be available soon."
              });
            }}>
              <FileText className="h-4 w-4 mr-2" />
              Add Field Report
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => {
              toast({
                title: "Download Data",
                description: "This feature will be available soon."
              });
            }}>
              <Droplet className="h-4 w-4 mr-2" />
              Download History
            </Button>
          </div>
        </DashboardCard>
      </div>
      
      <Tabs defaultValue="tanks">
        <TabsList>
          <TabsTrigger value="tanks">Tanks ({generator.tanks.length})</TabsTrigger>
          <TabsTrigger value="consumption">Consumption History</TabsTrigger>
          <TabsTrigger value="reports">Field Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tanks" className="mt-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generator.tanks && generator.tanks.map((tank: Tank) => (
              <DashboardCard key={tank.id} title={tank.name}>
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-2">
                    <FuelGauge 
                      percentage={Math.round((tank.currentLevel / tank.capacity) * 100)} 
                      className="h-28"
                    />
                  </div>
                  
                  <div className="text-center mb-2">
                    <p className="text-sm font-medium">Current Level</p>
                    <p className="text-lg font-bold">{tank.currentLevel}/{tank.capacity}L</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((tank.currentLevel / tank.capacity) * 100)}%
                    </p>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Reading:</span>
                    <span>{tank.lastReading || 'N/A'}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gauge Type:</span>
                    <span>{tank.gauge || 'N/A'}</span>
                  </div>
                </div>
              </DashboardCard>
            ))}
            
            {(!generator.tanks || generator.tanks.length === 0) && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No tanks added to this generator yet.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="consumption" className="mt-6">
          <div className="bg-card rounded-lg border shadow-sm p-4">
            <h3 className="text-lg font-medium mb-4">Weekly Consumption</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consumptionData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value}L`, 'Consumption']}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Bar dataKey="amount" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Average Consumption: {Math.round(consumptionData.reduce((acc, item) => acc + item.amount, 0) / consumptionData.length)}L/day
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="mt-6">
          <div className="bg-card rounded-lg border shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Submitted By</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Readings</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {generatorReports.length > 0 ? (
                  generatorReports.map(report => (
                    <tr key={report.id} className="border-b">
                      <td className="py-3 px-4 font-medium">{report.reportDate}</td>
                      <td className="py-3 px-4">{report.submittedBy}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground">
                      No field reports submitted for this generator yet.
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

export default GeneratorDetailsPage;
