
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { fuelPlans, zones } from "@/data/mockData";

export function usePlanning() {
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

  return {
    selectedZone,
    setSelectedZone,
    selectedMonth,
    setSelectedMonth,
    currentPlans,
    handleAddPlan,
    monthOptions,
    t,
    toast
  };
}
