
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { zones } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";
import { useToast } from "@/hooks/use-toast";

interface EmptyPlanningStateProps {
  selectedZone: string;
  selectedMonth: string;
  monthOptions: Array<{ value: string; label: string }>;
}

export function EmptyPlanningState({ 
  selectedZone, 
  selectedMonth, 
  monthOptions 
}: EmptyPlanningStateProps) {
  const { toast } = useToast();

  const handleAddPlan = () => {
    toast({
      title: "Feature Not Available",
      description: "Creating new plans will be available soon.",
      duration: 3000,
    });
  };

  return (
    <div className="bg-card border rounded-lg p-8 text-center">
      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No Plans Found</h3>
      <p className="text-muted-foreground mb-6">
        There are no fuel plans created for {selectedZone === 'all' ? 'any zone' : renderLocalizedString(zones.find(z => z.id === selectedZone)?.name || 'Unknown Zone')} in {monthOptions.find(m => m.value === selectedMonth)?.label}.
      </p>
      <Button onClick={handleAddPlan}>
        <Plus className="h-4 w-4 mr-1" />
        Create New Plan
      </Button>
    </div>
  );
}
