
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteGeneratorsTab } from "./SiteGeneratorsTab";
import { SiteFieldReportsTab } from "./SiteFieldReportsTab";
import { Generator } from "@/types/generators";

interface SiteTabsProps {
  siteGenerators: Generator[];
  siteReports: any[];
}

export function SiteTabs({ siteGenerators, siteReports }: SiteTabsProps) {
  return (
    <Tabs defaultValue="generators">
      <TabsList>
        <TabsTrigger value="generators">Generators</TabsTrigger>
        <TabsTrigger value="reports">Field Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="generators" className="mt-6">
        <SiteGeneratorsTab generators={siteGenerators} />
      </TabsContent>
      
      <TabsContent value="reports" className="mt-6">
        <SiteFieldReportsTab 
          reports={siteReports} 
          generators={siteGenerators} 
        />
      </TabsContent>
    </Tabs>
  );
}
