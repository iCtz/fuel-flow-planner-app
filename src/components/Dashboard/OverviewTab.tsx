
import { QuickStats } from "@/components/Dashboard/QuickStats";
import { StatisticsGeneratorCard } from "@/components/Dashboard/StatisticsGeneratorCard";
import { UpcomingScheduleCard } from "@/components/Dashboard/UpcomingScheduleCard";
import { FuelConsumptionChart } from "@/components/Dashboard/FuelConsumptionChart";
import { useTranslation } from "react-i18next";

interface OverviewTabProps {
  generators: any[];
  upcomingEvents: any[];
  consumptionData: any[];
  quickStats: any;
}

export function OverviewTab({ 
  generators, 
  upcomingEvents, 
  consumptionData, 
  quickStats 
}: OverviewTabProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <QuickStats {...quickStats} />
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-lg font-medium">{t("dashboard.generatorStatus")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {generators.slice(0, 4).map((generator) => (
              <StatisticsGeneratorCard key={generator.id} generator={generator} />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-lg font-medium">{t("dashboard.planningAnalytics")}</h2>
          
          <div className="grid gap-4">
            <UpcomingScheduleCard events={upcomingEvents} />
            <FuelConsumptionChart data={consumptionData} />
          </div>
        </div>
      </div>
    </div>
  );
}
