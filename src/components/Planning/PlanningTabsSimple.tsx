
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { renderLocalizedString } from "@/utils/localizedString";
import { Link } from "react-router-dom";
import { zones } from "@/data/mockData";

interface PlanningTabsSimpleProps {
  currentPlans: any[];
  monthOptions: { value: string; label: string }[];
  selectedMonth: string;
}

export function PlanningTabsSimple({ currentPlans, monthOptions, selectedMonth }: PlanningTabsSimpleProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">{t("common.overview")}</TabsTrigger>
        <TabsTrigger value="calendar">{t("planning.calendarView")}</TabsTrigger>
        <TabsTrigger value="details">{t("planning.planDetails")}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6 space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentPlans.map(plan => {
            const zone = zones.find(z => z.id === plan.zoneId);
            const zoneName = zone ? renderLocalizedString(zone.name) : t("common.unknownZone");
            return (
              <DashboardCard 
                key={plan.id} 
                title={`${zoneName} - ${monthOptions.find(m => m.value === selectedMonth)?.label}`}
                footer={
                  <div className="w-full flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {plan.planItems.length} {t("planning.refillsPlanned")}
                    </span>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => toast({
                        title: t("planning.downloadPlan"),
                        description: t("notifications.comingSoon")
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
                      <p className="text-sm font-medium">{t("common.status")}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {plan.status}
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-medium">{t("planning.totalVolume")}</p>
                      <p className="text-sm">
                        {plan.planItems.reduce((sum: number, item: any) => sum + (item.amount || 0), 0)}L
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="sm" 
                    asChild
                  >
                    <Link to={`/planning?zoneId=${plan.zoneId}&month=${plan.month}`}>
                      {t("common.viewDetails")}
                    </Link>
                  </Button>
                </div>
              </DashboardCard>
            );
          })}
        </div>
      </TabsContent>
      
      <TabsContent value="calendar" className="mt-6">
        <DashboardCard title={t("planning.monthlySchedule")}>
          <div className="p-4">
            {/* Calendar content - simplified for now */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
              <div>{t("calendar.sun")}</div>
              <div>{t("calendar.mon")}</div>
              <div>{t("calendar.tue")}</div>
              <div>{t("calendar.wed")}</div>
              <div>{t("calendar.thu")}</div>
              <div>{t("calendar.fri")}</div>
              <div>{t("calendar.sat")}</div>
            </div>
            
            <Link to="/planning" className="block text-center text-primary underline py-4">
              {t("planning.viewFullCalendar")}
            </Link>
          </div>
        </DashboardCard>
      </TabsContent>
      
      <TabsContent value="details" className="mt-6">
        <Link to="/planning" className="block">
          <Button className="mb-4">
            {t("planning.viewAllDetails")}
          </Button>
        </Link>
      </TabsContent>
    </Tabs>
  );
}
