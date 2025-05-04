
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Calendar, Plus, ChevronLeft, ChevronRight, Download, Droplet } from "lucide-react";
import { fuelPlans, zones, sites, generators, vendors } from "@/data/mockData";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { renderLocalizedString } from "@/utils/localizedString";
import { FuelUsageForecast } from "@/components/Planning/FuelUsageForecast";
import { CalendarIntegration } from "@/components/Planning/CalendarIntegration";

const PlanningPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const zoneId = queryParams.get("zoneId");
  const siteId = queryParams.get("siteId");
  const monthParam = queryParams.get("month");
  
  const [selectedZone, setSelectedZone] = useState<string>(zoneId || 'all');
  const [selectedMonth, setSelectedMonth] = useState<string>(monthParam || '2025-05');
  const [currentPlans, setCurrentPlans] = useState<any[]>([]);
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Planning";
    
    // Filter plans based on selected zone and month
    filterPlans();
  }, [selectedZone, selectedMonth]);
  
  const filterPlans = () => {
    let filtered = fuelPlans;
    
    if (selectedZone !== 'all') {
      filtered = filtered.filter(plan => plan.zoneId === selectedZone);
    }
    
    filtered = filtered.filter(plan => plan.month === selectedMonth);
    
    setCurrentPlans(filtered);
  };

  const handleAddPlan = () => {
    toast({
      title: "Feature Not Available",
      description: "Creating new plans will be available soon.",
      duration: 3000,
    });
  };
  
  // Generate month options - from 3 months ago to 6 months ahead
  const getMonthOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = -3; i <= 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      options.push({ value, label });
    }
    
    return options;
  };
  
  const monthOptions = getMonthOptions();

  return (
    <DashboardLayout 
      title="Fuel Planning"
      description="Create and manage monthly fuel plans for all zones"
      actions={
        <Button size="sm" onClick={handleAddPlan}>
          <Plus className="h-4 w-4 mr-1" />
          Create New Plan
        </Button>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">Zone</label>
          <Select 
            value={selectedZone} 
            onValueChange={setSelectedZone}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone.id} value={zone.id}>
                  {renderLocalizedString(zone.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">Month</label>
          <Select 
            value={selectedMonth} 
            onValueChange={setSelectedMonth}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3 flex md:items-end">
          <div className="flex gap-2 mt-auto w-full">
            <Button variant="outline" className="flex-1" onClick={() => {
              const currentIndex = monthOptions.findIndex(m => m.value === selectedMonth);
              if (currentIndex > 0) {
                setSelectedMonth(monthOptions[currentIndex - 1].value);
              }
            }}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => {
              const currentIndex = monthOptions.findIndex(m => m.value === selectedMonth);
              if (currentIndex < monthOptions.length - 1) {
                setSelectedMonth(monthOptions[currentIndex + 1].value);
              }
            }}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Planning Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <FuelUsageForecast />
        <CalendarIntegration />
      </div>
      
      {currentPlans.length > 0 ? (
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="details">Plan Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPlans.map(plan => {
                const zone = zones.find(z => z.id === plan.zoneId);
                const zoneName = zone ? renderLocalizedString(zone.name) : 'Unknown Zone';
                return (
                  <DashboardCard 
                    key={plan.id} 
                    title={`${zoneName} - ${selectedMonth}`}
                    footer={
                      <div className="w-full flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          {plan.planItems.length} refills planned
                        </span>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => toast({
                            title: "Download Plan",
                            description: "This feature will be available soon."
                          })}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    }
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Status</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {plan.status}
                          </span>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-medium">Total Volume</p>
                          <p className="text-sm">
                            {plan.planItems.reduce((sum: number, item: any) => sum + (item.amount || 0), 0)}L
                          </p>
                        </div>
                      </div>
                      
                      <Button className="w-full" size="sm" onClick={() => {
                        toast({
                          title: "View Plan Details",
                          description: "This feature will be available soon."
                        });
                      }}>
                        View Details
                      </Button>
                    </div>
                  </DashboardCard>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6">
            <DashboardCard title="Monthly Schedule">
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {/* This is a simplified calendar. In a real app, we would calculate the days based on the month */}
                  {Array.from({ length: 35 }).map((_, index) => {
                    const day = index - 5; // First day of month starts on the 6th cell (Sunday)
                    
                    // Create a placeholder for the events on this day
                    const events = currentPlans.flatMap(plan => 
                      plan.planItems.filter((item: any) => {
                        const itemDate = new Date(item.scheduledDate);
                        return itemDate.getDate() === day + 1;
                      })
                    );
                    
                    return (
                      <div 
                        key={index} 
                        className={`min-h-24 p-1 border rounded ${day < 0 || day >= 31 ? 'bg-muted/20' : 'hover:bg-muted/50'}`}
                      >
                        {day >= 0 && day < 31 && (
                          <>
                            <div className="text-right text-sm font-medium">{day + 1}</div>
                            <div className="mt-1">
                              {events.map((event: any, eventIndex: number) => {
                                const siteInfo = sites.find(s => s.id === event.siteId);
                                const siteName = siteInfo ? renderLocalizedString(siteInfo.name) : 'Unknown Site';
                                return (
                                  <div 
                                    key={eventIndex}
                                    className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800"
                                    title={`${siteName} - ${event.amount}L`}
                                  >
                                    <div className="flex items-center gap-1 truncate">
                                      <Droplet className="h-3 w-3" />
                                      <span className="truncate">{siteName}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {selectedMonth.replace('-', ' ')} - Total Events: {
                    currentPlans.reduce((sum, plan) => sum + plan.planItems.length, 0)
                  }
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <DashboardCard title="Refill Schedule">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Site</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Generator</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Amount</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Vendor</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPlans.flatMap(plan => 
                      plan.planItems.map((item: any) => {
                        const site = sites.find(s => s.id === item.siteId);
                        const generator = generators.find(g => g.id === item.generatorId);
                        const vendor = vendors.find(v => v.id === item.vendorId);
                        
                        // Create string representations
                        const siteName = site ? renderLocalizedString(site.name) : 'Unknown';
                        const generatorName = generator ? renderLocalizedString(generator.name) : 'Unknown';
                        const vendorName = vendor ? renderLocalizedString(vendor.name) : 'Not assigned';
                        
                        return (
                          <tr key={item.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{item.scheduledDate}</td>
                            <td className="py-3 px-4">
                              <Link to={`/sites/${site?.id}`} className="hover:underline">
                                {siteName}
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link to={`/generators/${generator?.id}`} className="hover:underline">
                                {generatorName}
                              </Link>
                            </td>
                            <td className="py-3 px-4">{item.amount}L</td>
                            <td className="py-3 px-4">{vendorName}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                    
                    {currentPlans.flatMap(plan => plan.planItems).length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-muted-foreground">
                          No refill items planned for the selected period.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="bg-card border rounded-lg p-8 text-center">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Plans Found</h3>
          <p className="text-muted-foreground mb-6">
            There are no fuel plans created for {selectedZone === 'all' ? 'any zone' : renderLocalizedString(zones.find(z => z.id === selectedZone)?.name || 'Unknown Zone')} in {monthOptions.find(m => m.value === selectedMonth)?.label}.
          </p>
          <Button onClick={handleAddPlan}>
            <Plus className="h-4 w-4 mr-1" />
            Create New Plan
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PlanningPage;
