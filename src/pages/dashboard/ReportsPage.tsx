
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { BarChart, LineChart, PieChart, Download } from "lucide-react";
import { generators, sites, zones, fieldReports, fuelPlans } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FuelConsumptionChart } from "@/components/Dashboard/FuelConsumptionChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bar, 
  BarChart as RechartsBarChart, 
  Cell, 
  Pie, 
  PieChart as RechartsPieChart, 
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { renderLocalizedString } from "@/utils/localizedString";

const ReportsPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Reports";
  }, []);
  
  // Consumption data sample (for demo purposes)
  const consumptionData = [
    { date: "2025-04-01", amount: 345 },
    { date: "2025-04-08", amount: 420 },
    { date: "2025-04-15", amount: 380 },
    { date: "2025-04-22", amount: 450 },
    { date: "2025-04-29", amount: 410 }
  ];
  
  // Generator status for pie chart
  const generatorStatusData = [
    { name: "Operational", value: generators.filter(g => g.status === "operational").length, color: "#10b981" },
    { name: "Maintenance", value: generators.filter(g => g.status === "maintenance").length, color: "#f59e0b" },
    { name: "Offline", value: generators.filter(g => g.status === "offline").length, color: "#ef4444" },
  ];
  
  // Zone generator counts for bar chart
  const zoneGeneratorData = zones.map(zone => {
    const zoneGenerators = generators.filter(g => {
      const site = sites.find(s => s.id === g.siteId);
      return site && site.zoneId === zone.id;
    });
    
    return {
      name: renderLocalizedString(zone.name),
      generators: zoneGenerators.length,
    };
  });
  
  // Field reports status data for pie chart
  const reportStatusData = [
    { name: "Submitted", value: fieldReports.filter(r => r.status === "submitted").length, color: "#3b82f6" },
    { name: "Under Review", value: fieldReports.filter(r => r.status === "under_review").length, color: "#8b5cf6" },
    { name: "Approved", value: fieldReports.filter(r => r.status === "approved").length, color: "#10b981" },
    { name: "Rejected", value: fieldReports.filter(r => r.status === "rejected").length, color: "#ef4444" },
  ];

  return (
    <DashboardLayout 
      title="Analytics & Reports"
      description="View analytics and reports for your fuel management system"
      actions={
        <Button variant="outline" size="sm" onClick={() => {
          toast({
            title: "Export Reports",
            description: "This feature will be available soon."
          });
        }}>
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      }
    >
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="consumption">Consumption</TabsTrigger>
          <TabsTrigger value="generators">Generators</TabsTrigger>
          <TabsTrigger value="fieldReports">Field Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <DashboardCard title="Summary">
              <div className="space-y-4 p-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Generators:</span>
                  <span className="font-medium">{generators.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Sites:</span>
                  <span className="font-medium">{sites.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Zones:</span>
                  <span className="font-medium">{zones.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Plans:</span>
                  <span className="font-medium">{fuelPlans.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Field Reports:</span>
                  <span className="font-medium">{fieldReports.length}</span>
                </div>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Generator Status">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={generatorStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {generatorStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} generators`, "Count"]}
                      labelFormatter={(index) => generatorStatusData[index].name}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Distribution of generator operational status
              </div>
            </DashboardCard>
            
            <DashboardCard title="Total Consumption">
              <div className="space-y-4 p-2">
                <FuelConsumptionChart data={consumptionData} />
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard title="Zone Data">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={zoneGeneratorData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} generators`, "Count"]}
                  />
                  <Bar dataKey="generators" fill="#0284c7" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2">
              Number of generators per zone
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="consumption" className="mt-6 space-y-6">
          <DashboardCard title="Fuel Consumption Trends">
            <div className="p-4">
              <FuelConsumptionChart data={consumptionData} />
            </div>
          </DashboardCard>
          
          <div className="grid md:grid-cols-2 gap-4">
            <DashboardCard title="Highest Consumption Sites">
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left font-medium text-muted-foreground">Site</th>
                      <th className="py-2 px-4 text-left font-medium text-muted-foreground">Zone</th>
                      <th className="py-2 px-4 text-right font-medium text-muted-foreground">Consumption</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sites.slice(0, 5).map((site, index) => {
                      const zone = zones.find(z => z.id === site.zoneId);
                      // Random consumption data for demo
                      const consumption = 100 + Math.floor(Math.random() * 400);
                      
                      // Get string representations
                      const siteName = renderLocalizedString(site.name);
                      const zoneName = zone ? renderLocalizedString(zone.name) : 'Unknown';
                      
                      return (
                        <tr key={site.id} className="border-b">
                          <td className="py-2 px-4">
                            <Link to={`/sites/${site.id}`} className="hover:underline">
                              {siteName}
                            </Link>
                          </td>
                          <td className="py-2 px-4">{zoneName}</td>
                          <td className="py-2 px-4 text-right">{consumption}L</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
            
            <DashboardCard title="Efficiency Analysis">
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Comparison between planned and actual consumption rates.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Zone A</span>
                      <span>92% efficient</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: "92%"}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Zone B</span>
                      <span>78% efficient</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{width: "78%"}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Zone C</span>
                      <span>86% efficient</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: "86%"}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Zone D</span>
                      <span>65% efficient</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: "65%"}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Average Efficiency: 80.25%
                </div>
              </div>
            </DashboardCard>
          </div>
        </TabsContent>
        
        <TabsContent value="generators" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <DashboardCard title="Generator Status Distribution">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={generatorStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {generatorStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} generators`, "Count"]}
                      labelFormatter={(index) => generatorStatusData[index].name}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Distribution of generator operational status
              </div>
            </DashboardCard>
            
            <DashboardCard title="Generators per Zone">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={zoneGeneratorData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} generators`, "Count"]}
                    />
                    <Bar dataKey="generators" fill="#0284c7" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard title="Generator Fuel Levels">
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Generator</th>
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Site</th>
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Status</th>
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Fuel Level</th>
                  </tr>
                </thead>
                <tbody>
                  {generators.slice(0, 10).map((generator) => {
                    const site = sites.find(s => s.id === generator.siteId);
                    
                    // Get string representation
                    const generatorName = renderLocalizedString(generator.name);
                    const siteName = site ? renderLocalizedString(site.name) : 'Unknown';
                    
                    return (
                      <tr key={generator.id} className="border-b">
                        <td className="py-2 px-4">
                          <Link to={`/generators/${generator.id}`} className="hover:underline">
                            {generatorName}
                          </Link>
                        </td>
                        <td className="py-2 px-4">
                          <Link to={`/sites/${generator.siteId}`} className="hover:underline">
                            {siteName}
                          </Link>
                        </td>
                        <td className="py-2 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            generator.status === 'operational' ? 'bg-emerald-100 text-emerald-800' : 
                            generator.status === 'maintenance' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {generator.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  generator.fuelLevel > 70 ? 'bg-emerald-500' : 
                                  generator.fuelLevel > 30 ? 'bg-amber-500' : 
                                  'bg-red-500'
                                }`} 
                                style={{width: `${generator.fuelLevel}%`}}
                              ></div>
                            </div>
                            <span>{generator.fuelLevel}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {generators.length > 10 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/generators">View All Generators</Link>
                  </Button>
                </div>
              )}
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="fieldReports" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <DashboardCard title="Field Report Status">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={reportStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {reportStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} reports`, "Count"]}
                      labelFormatter={(index) => reportStatusData[index].name}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Distribution of field report status
              </div>
            </DashboardCard>
            
            <DashboardCard title="Field Reports Summary">
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Reports:</span>
                    <span className="font-medium">{fieldReports.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pending Review:</span>
                    <span className="font-medium">{fieldReports.filter(r => r.status === "submitted").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Approved:</span>
                    <span className="font-medium">{fieldReports.filter(r => r.status === "approved").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rejected:</span>
                    <span className="font-medium">{fieldReports.filter(r => r.status === "rejected").length}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full" size="sm" asChild>
                    <Link to="/field-reports">View All Reports</Link>
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </div>
          
          <DashboardCard title="Recent Field Reports">
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Date</th>
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Site</th>
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Generator</th>
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Status</th>
                    <th className="py-2 px-4 text-left font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldReports.map(report => {
                    const site = sites.find(s => s.id === report.siteId);
                    const generator = generators.find(g => g.id === report.generatorId);
                    
                    // Get string representations
                    const siteName = site ? renderLocalizedString(site.name) : 'Unknown';
                    const generatorName = generator ? renderLocalizedString(generator.name) : 'Unknown';
                    
                    return (
                      <tr key={report.id} className="border-b">
                        <td className="py-2 px-4">{report.reportDate}</td>
                        <td className="py-2 px-4">
                          <Link to={`/sites/${report.siteId}`} className="hover:underline">
                            {siteName}
                          </Link>
                        </td>
                        <td className="py-2 px-4">
                          <Link to={`/generators/${report.generatorId}`} className="hover:underline">
                            {generatorName}
                          </Link>
                        </td>
                        <td className="py-2 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            report.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                            report.status === 'submitted' ? 'bg-blue-100 text-blue-800' : 
                            report.status === 'under_review' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <Button size="sm" variant="outline" onClick={() => {
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
                  })}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ReportsPage;
