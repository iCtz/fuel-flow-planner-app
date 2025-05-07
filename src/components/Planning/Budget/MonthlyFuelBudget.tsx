
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FuelBudget, Zone } from "@/types/hierarchy";
import { fuelBudgets, budgetTransactions, zones } from "@/data/mockData";
import { Plus, DollarSign } from "lucide-react";
import { FuelBudgetCard } from "./FuelBudgetCard";
import { BudgetTransactionsList } from "./BudgetTransactionsList";
import { BudgetManagementForm } from "./BudgetManagementForm";
import { BudgetExportPDF } from "./BudgetExportPDF";
import { renderLocalizedString } from "@/utils/localizedString";
import { useToast } from "@/hooks/use-toast";

interface MonthlyFuelBudgetProps {
  selectedZone: string;
  selectedMonth: string;
  monthOptions: Array<{ value: string; label: string }>;
}

export function MonthlyFuelBudget({ 
  selectedZone, 
  selectedMonth,
  monthOptions 
}: MonthlyFuelBudgetProps) {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [localBudgets, setLocalBudgets] = useState<FuelBudget[]>(fuelBudgets);
  
  // Filter budgets based on selected zone and month
  const filteredBudgets = localBudgets.filter(budget => {
    if (selectedZone !== "all" && budget.zoneId !== selectedZone) {
      return false;
    }
    return budget.month === selectedMonth;
  });

  // Get current month label
  const currentMonthLabel = monthOptions.find(m => m.value === selectedMonth)?.label || "";
  
  // Handle form submission
  const handleBudgetSubmit = (formData: any) => {
    const newBudget: FuelBudget = {
      id: `budget-${Date.now()}`,
      zoneId: formData.zoneId,
      month: formData.month,
      allocatedAmount: formData.allocatedAmount,
      usedAmount: 0,
      status: "active",
      createdBy: "user-1", // Assuming logged in user
      updatedAt: new Date().toISOString(),
      notes: formData.notes || undefined
    };
    
    setLocalBudgets(prev => [...prev, newBudget]);
    setIsFormOpen(false);
    
    toast({
      title: "Budget Created",
      description: "New fuel budget has been successfully created."
    });
  };
  
  // Get transactions for a specific budget
  const getTransactionsForBudget = (budgetId: string) => {
    return budgetTransactions.filter(transaction => transaction.budgetId === budgetId);
  };

  // Get zone name by ID
  const getZoneName = (zoneId: string): string => {
    const zone = zones.find(zone => zone.id === zoneId);
    return zone ? renderLocalizedString(zone.name) : "Unknown Zone";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Monthly Fuel Budget
        </CardTitle>
        <CardDescription>
          Set and track monthly fuel allocation budgets for each zone
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{selectedZone === "all" ? "All Zones" : getZoneName(selectedZone)} - {currentMonthLabel}</h3>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Create Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <BudgetManagementForm
                monthOptions={monthOptions}
                onSubmit={handleBudgetSubmit}
                onCancel={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        {filteredBudgets.length > 0 ? (
          <div className="space-y-6">
            {filteredBudgets.map(budget => (
              <Tabs key={budget.id} defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Budget Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="flex justify-between items-start mb-4">
                    <FuelBudgetCard 
                      budget={budget} 
                      zoneName={getZoneName(budget.zoneId)}
                      monthLabel={currentMonthLabel}
                    />
                    <BudgetExportPDF
                      budget={budget}
                      transactions={getTransactionsForBudget(budget.id)}
                      zoneName={getZoneName(budget.zoneId)}
                      monthLabel={currentMonthLabel}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="transactions">
                  <BudgetTransactionsList 
                    transactions={getTransactionsForBudget(budget.id)} 
                  />
                </TabsContent>
              </Tabs>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border rounded-lg bg-muted/10">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Budgets Found</h3>
            <p className="text-muted-foreground mb-6">
              No budget has been set for {selectedZone === "all" ? "any zone" : getZoneName(selectedZone)} in {currentMonthLabel}.
            </p>
            <Button onClick={() => setIsFormOpen(true)}>Create New Budget</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
