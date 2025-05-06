
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { zones } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";

interface PlanningFiltersSimpleProps {
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  monthOptions: Array<{ value: string; label: string }>;
}

export function PlanningFiltersSimple({
  selectedZone,
  setSelectedZone,
  selectedMonth,
  setSelectedMonth,
  monthOptions
}: PlanningFiltersSimpleProps) {
  const { t } = useTranslation();
  
  return (
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
  );
}
