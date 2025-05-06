
import { usePlanning } from "@/hooks/usePlanning";
import { PlanningFiltersSimple } from "@/components/Planning/PlanningFiltersSimple";
import { PlanningFeatureTeaser } from "@/components/Planning/PlanningFeatureTeaser";
import { EmptyPlanningSimple } from "@/components/Planning/EmptyPlanningSimple";
import { PlanningTabsSimple } from "@/components/Planning/PlanningTabsSimple";

export function PlanningOverview() {
  const {
    selectedZone,
    setSelectedZone,
    selectedMonth,
    setSelectedMonth,
    currentPlans,
    handleAddPlan,
    monthOptions
  } = usePlanning();

  return (
    <div className="space-y-6">
      <PlanningFiltersSimple
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthOptions={monthOptions}
      />
      
      <PlanningFeatureTeaser />
      
      {currentPlans.length > 0 ? (
        <PlanningTabsSimple 
          currentPlans={currentPlans} 
          monthOptions={monthOptions}
          selectedMonth={selectedMonth}
        />
      ) : (
        <EmptyPlanningSimple 
          handleAddPlan={handleAddPlan} 
          selectedZone={selectedZone} 
          monthOptions={monthOptions} 
          selectedMonth={selectedMonth} 
        />
      )}
    </div>
  );
}
