
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zones } from "@/data/mockData";
import { FuelUsageForecast } from "@/components/Planning/FuelUsageForecast";
import { CalendarIntegration } from "@/components/Planning/CalendarIntegration";
import { PlanningFilters } from "@/components/Planning/PlanningFilters";
import { PlanningOverviewCard } from "@/components/Planning/PlanningOverviewCard";
import { PlanningCalendarView } from "@/components/Planning/PlanningCalendarView";
import { PlanningDetailsTable } from "@/components/Planning/PlanningDetailsTable";
import { EmptyPlanningState } from "@/components/Planning/EmptyPlanningState";
import { usePlanningPage } from "@/hooks/usePlanningPage";

const PlanningPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const zoneId = queryParams.get("zoneId");
  const monthParam = queryParams.get("month");
  
  const {
    selectedZone,
    setSelectedZone,
    selectedMonth,
    setSelectedMonth,
    currentPlans,
    handleAddPlan,
    monthOptions
  } = usePlanningPage(zoneId, monthParam);

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
      <PlanningFilters 
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthOptions={monthOptions}
      />

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
                return (
                  <PlanningOverviewCard 
                    key={plan.id}
                    plan={plan}
                    zone={zone}
                    selectedMonth={selectedMonth}
                  />
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-6">
            <PlanningCalendarView 
              currentPlans={currentPlans}
              selectedMonth={selectedMonth}
            />
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <PlanningDetailsTable currentPlans={currentPlans} />
          </TabsContent>
        </Tabs>
      ) : (
        <EmptyPlanningState 
          selectedZone={selectedZone}
          selectedMonth={selectedMonth}
          monthOptions={monthOptions}
        />
      )}
    </DashboardLayout>
  );
};

export default PlanningPage;
