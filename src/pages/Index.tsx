
import { Header } from "@/components/Header";
import { GeneratorCard } from "@/components/Dashboard/GeneratorCard";
import { UpcomingScheduleCard } from "@/components/Dashboard/UpcomingScheduleCard";
import { FuelConsumptionChart } from "@/components/Dashboard/FuelConsumptionChart";
import { QuickStats } from "@/components/Dashboard/QuickStats";
import { generators, upcomingEvents, consumptionData, quickStats } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Fuel Flow Planner - Dashboard";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage your generator fuel status and planning
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <Button variant="outline" size="sm">
              Last 30 days
            </Button>
            <Button variant="default" size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Add Generator
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <QuickStats {...quickStats} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium">Generator Status</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {generators.map((generator) => (
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
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2025 Fuel Flow Planner. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
