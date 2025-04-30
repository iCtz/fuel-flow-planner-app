
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { OverviewTab } from "@/components/Dashboard/OverviewTab";
import { RegionsZonesTab } from "@/components/Dashboard/RegionsZonesTab";
import { SitesTab } from "@/components/Dashboard/SitesTab";
import { GeneratorsTab } from "@/components/Dashboard/GeneratorsTab";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useDashboard } from "@/hooks/useDashboard";

const Index = () => {
  const { t } = useTranslation();
  const { 
    activeTab, 
    setActiveTab, 
    handleAddGenerator, 
    dashboardData 
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

  return (
    <DashboardLayout 
      title={t("dashboard.title")}
      description={t("dashboard.description")}
      actions={
        <>
          <Button variant="outline" size="sm">
            {t("actions.last30Days")}
          </Button>
          <Button variant="default" size="sm" onClick={handleAddGenerator}>
            <Plus className="h-4 w-4 mr-1" />
            {t("actions.addGenerator")}
          </Button>
        </>
      }
    >
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">{t("dashboard.overview")}</TabsTrigger>
          <TabsTrigger value="regions">{t("dashboard.regionsZones")}</TabsTrigger>
          <TabsTrigger value="sites">{t("dashboard.sites")}</TabsTrigger>
          <TabsTrigger value="generators">{t("dashboard.generators")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab 
            generators={generators}
            upcomingEvents={upcomingEvents}
            consumptionData={consumptionData}
            quickStats={quickStats}
          />
        </TabsContent>
        
        <TabsContent value="regions">
          <RegionsZonesTab regions={regions} zones={zones} />
        </TabsContent>
        
        <TabsContent value="sites">
          <SitesTab sites={sites} zones={zones} />
        </TabsContent>
        
        <TabsContent value="generators">
          <GeneratorsTab generators={generators} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
