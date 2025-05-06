
import { FuelBudget } from "@/types/hierarchy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Calendar } from "lucide-react";

interface FuelBudgetCardProps {
  budget: FuelBudget;
  zoneName: string;
  monthLabel: string;
}

export function FuelBudgetCard({ budget, zoneName, monthLabel }: FuelBudgetCardProps) {
  const percentageUsed = (budget.usedAmount / budget.allocatedAmount) * 100;
  const remainingAmount = budget.allocatedAmount - budget.usedAmount;
  const isExceeded = budget.usedAmount > budget.allocatedAmount;
  
  const getProgressColor = () => {
    if (percentageUsed >= 90) return "bg-red-500";
    if (percentageUsed >= 70) return "bg-amber-500";
    return "bg-green-500";
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          {zoneName} - {monthLabel} Budget
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 inline mr-1" />
              {monthLabel}
            </span>
            <span className="text-sm font-medium">
              Status: <span className={`${budget.status === "active" ? "text-green-500" : budget.status === "exceeded" ? "text-red-500" : "text-muted-foreground"}`}>
                {budget.status.charAt(0).toUpperCase() + budget.status.slice(1)}
              </span>
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Used: {budget.usedAmount.toLocaleString()} L</span>
              <span>Allocated: {budget.allocatedAmount.toLocaleString()} L</span>
            </div>
            <Progress value={Math.min(percentageUsed, 100)} className="h-2" indicatorClassName={getProgressColor()} />
            <div className="flex justify-between items-center text-sm">
              <span>{percentageUsed.toFixed(1)}% used</span>
              <span className={isExceeded ? "text-red-500" : "text-green-500"}>
                {isExceeded ? "Exceeded by" : "Remaining"}: {Math.abs(remainingAmount).toLocaleString()} L
              </span>
            </div>
          </div>
          
          {budget.notes && (
            <div className="text-sm text-muted-foreground border-t pt-2 mt-2">
              {typeof budget.notes === 'string' ? budget.notes : budget.notes.en}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
