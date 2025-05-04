
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { fuelPlans } from "@/data/mockData";

export function usePlanningPage(initialZoneId: string | null, initialMonth: string | null) {
  const { toast } = useToast();
  
  const [selectedZone, setSelectedZone] = useState<string>(initialZoneId || 'all');
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth || '2025-05');
  const [currentPlans, setCurrentPlans] = useState<any[]>([]);
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Planning";
    
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
      title: "Feature Not Available",
      description: "Creating new plans will be available soon.",
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

  return {
    selectedZone,
    setSelectedZone,
    selectedMonth,
    setSelectedMonth,
    currentPlans,
    handleAddPlan,
    monthOptions
  };
}
