
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { zones } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";

interface EmptyPlanningSimpleProps {
  handleAddPlan: () => void;
  selectedZone: string;
  monthOptions: { value: string; label: string }[];
  selectedMonth: string;
}

export function EmptyPlanningSimple({ 
  handleAddPlan, 
  selectedZone, 
  monthOptions, 
  selectedMonth 
}: EmptyPlanningSimpleProps) {
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
