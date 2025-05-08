
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneratorsTab } from "@/components/Dashboard/GeneratorsTab";
import { SitesTab } from "@/components/Dashboard/SitesTab";
import { RegionsZonesTab } from "@/components/Dashboard/RegionsZonesTab";
import { OverviewTab } from "@/components/Dashboard/OverviewTab";
import { useTranslation } from "react-i18next";
import { Generator } from "@/types/generators";

interface DashboardTabsProps {
  generators: Generator[];
  upcomingEvents: any[];
  consumptionData: any[];
  quickStats: any;
  regions: any[];
  zones: any[];
  sites: any[];
}

export function DashboardTabs({
  generators,
  upcomingEvents,
  consumptionData,
  quickStats,
  regions,
  zones,
  sites
}: DashboardTabsProps) {
  const { t } = useTranslation();
  
  return (
    <Tabs defaultValue="stats" className="mt-8">
      <TabsList>
        <TabsTrigger value="stats">{t("dashboard.statistics")}</TabsTrigger>
        <TabsTrigger value="generators">{t("dashboard.generators")}</TabsTrigger>
        <TabsTrigger value="sites">{t("dashboard.sites")}</TabsTrigger>
        <TabsTrigger value="regions">{t("dashboard.regionsZones")}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="stats">
        <OverviewTab 
          generators={generators}
          upcomingEvents={upcomingEvents}
          consumptionData={consumptionData}
          quickStats={quickStats}
        />
      </TabsContent>
      
      <TabsContent value="generators">
        <GeneratorsTab generators={generators} />
      </TabsContent>
      
      <TabsContent value="sites">
        <SitesTab sites={sites} zones={zones} />
      </TabsContent>
      
      <TabsContent value="regions">
        <RegionsZonesTab regions={regions} zones={zones} />
      </TabsContent>
    </Tabs>
  );
}
