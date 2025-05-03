
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { zones } from "@/data/mockData";
import { Zone } from "@/types/hierarchy";

export function useZones() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    zones,
    isLoading,
  };
}
