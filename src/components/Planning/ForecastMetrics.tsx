
import React from 'react';
import { useTranslation } from "react-i18next";

interface ForecastMetricsProps {
  totalForecast: number;
  forecastDays: number;
}

export function ForecastMetrics({ totalForecast, forecastDays }: ForecastMetricsProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">{t("planning.totalForecastUsage")}</div>
          <div className="text-2xl font-bold">{Math.round(totalForecast)} L</div>
          <div className="text-xs text-muted-foreground">{t("planning.nextXDays", { days: forecastDays })}</div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">{t("planning.avgDailyUsage")}</div>
          <div className="text-2xl font-bold">{Math.round(totalForecast / forecastDays * 10) / 10} L</div>
          <div className="text-xs text-muted-foreground">{t("planning.perDay")}</div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground">{t("planning.nextRefillEstimate")}</div>
          <div className="text-2xl font-bold">{Math.floor(forecastDays / 2)} {t("common.days")}</div>
          <div className="text-xs text-muted-foreground">
            {new Date(Date.now() + Math.floor(forecastDays / 2) * 86400000).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
