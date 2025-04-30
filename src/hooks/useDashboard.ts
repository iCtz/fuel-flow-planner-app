
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { 
  generators, 
  upcomingEvents, 
  consumptionData, 
  quickStats, 
  regions, 
  zones, 
  sites 
} from "@/data/mockData";

export function useDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = t("header.appTitle") + " - " + t("common.dashboard");
  }, [t]);
  
  const handleAddGenerator = () => {
    toast({
      title: t("notifications.featureNotAvailable"),
      description: t("notifications.comingSoon"),
      duration: 3000,
    });
  };
  
  return {
    activeTab,
    setActiveTab,
    handleAddGenerator,
    dashboardData: {
      generators,
      upcomingEvents,
      consumptionData,
      quickStats,
      regions,
      zones,
      sites
    }
  };
}
