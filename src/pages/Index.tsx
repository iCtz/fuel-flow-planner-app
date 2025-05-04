
import { useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDashboard } from "@/hooks/useDashboard";
import { PlanningOverview } from "@/components/Planning/PlanningOverview";
import { DashboardTabs } from "@/components/Dashboard/DashboardTabs";

const Index = () => {
  const { t } = useTranslation();
  const { 
    dashboardData,
    handleAddGenerator 
  } = useDashboard();

  const { 
    generators, 
    upcomingEvents, 
    consumptionData, 
    quickStats, 
    regions, 
    zones, 
    sites 
  } = dashboardData;
  
  useEffect(() => {
    document.title = t("header.appTitle") + " - " + t("common.dashboard");
  }, [t]);

  return (
    <DashboardLayout 
      title={t("dashboard.fuelPlanning")}
      description={t("dashboard.planningDescription")}
      actions={
        <Button variant="default" size="sm" onClick={handleAddGenerator}>
          <Plus className="h-4 w-4 mr-1" />
          {t("planning.createNewPlan")}
        </Button>
      }
    >
      {/* Planning section as main focus */}
      <PlanningOverview />

      {/* Dashboard quick overview sections */}
      <DashboardTabs
        generators={generators}
        upcomingEvents={upcomingEvents}
        consumptionData={consumptionData}
        quickStats={quickStats}
        regions={regions}
        zones={zones}
        sites={sites}
      />
    </DashboardLayout>
  );
};

export default Index;
