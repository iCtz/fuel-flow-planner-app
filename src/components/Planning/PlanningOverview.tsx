
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { renderLocalizedString } from "@/utils/localizedString";
import { Link } from "react-router-dom";
import { fuelPlans, zones, sites } from "@/data/mockData";

export function PlanningOverview() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  // Planning state
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('2025-05');
  const [currentPlans, setCurrentPlans] = useState<any[]>([]);
  
  useEffect(() => {
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
      title: t("notifications.featureNotAvailable"),
      description: t("notifications.comingSoon"),
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">{t("common.zone")}</label>
          <Select 
            value={selectedZone} 
            onValueChange={setSelectedZone}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("planning.selectZone")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("planning.allZones")}</SelectItem>
              {zones.map(zone => (
                <SelectItem key={zone.id} value={zone.id}>
                  {renderLocalizedString(zone.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium block mb-2">{t("common.month")}</label>
          <Select 
            value={selectedMonth} 
            onValueChange={setSelectedMonth}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("planning.selectMonth")} />
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
              {t("common.previous")}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => {
              const currentIndex = monthOptions.findIndex(m => m.value === selectedMonth);
              if (currentIndex < monthOptions.length - 1) {
                setSelectedMonth(monthOptions[currentIndex + 1].value);
              }
            }}>
              {t("common.next")}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
      
      {currentPlans.length > 0 ? (
        <PlanningTabs 
          currentPlans={currentPlans} 
          monthOptions={monthOptions}
          selectedMonth={selectedMonth}
        />
      ) : (
        <EmptyPlanning 
          handleAddPlan={handleAddPlan} 
          selectedZone={selectedZone} 
          monthOptions={monthOptions} 
          selectedMonth={selectedMonth} 
        />
      )}
    </div>
  );
}

interface PlanningTabsProps {
  currentPlans: any[];
  monthOptions: { value: string; label: string }[];
  selectedMonth: string;
}

function PlanningTabs({ currentPlans, monthOptions, selectedMonth }: PlanningTabsProps) {
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

interface EmptyPlanningProps {
  handleAddPlan: () => void;
  selectedZone: string;
  monthOptions: { value: string; label: string }[];
  selectedMonth: string;
}

function EmptyPlanning({ handleAddPlan, selectedZone, monthOptions, selectedMonth }: EmptyPlanningProps) {
  const { t } = useTranslation();
  
  return (
    <div className="bg-card border rounded-lg p-8 text-center">
      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">{t("planning.noPlansFound")}</h3>
      <p className="text-muted-foreground mb-6">
        {t("planning.noPlansDescription")} 
        {selectedZone === 'all' ? 
          t("planning.anyZone") : 
          renderLocalizedString(zones.find(z => z.id === selectedZone)?.name || t("common.unknownZone"))
        } {t("planning.inMonth")} {monthOptions.find(m => m.value === selectedMonth)?.label}.
      </p>
      <Button onClick={handleAddPlan}>
        <Plus className="h-4 w-4 mr-1" />
        {t("planning.createNewPlan")}
      </Button>
    </div>
  );
}
