
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChartLine, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export function PlanningFeatureTeaser() {
  const { t } = useTranslation();
  
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="border rounded-lg p-4 bg-muted/10 hover:bg-muted/20 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <ChartLine className="h-5 w-5 text-primary" />
          <h3 className="font-medium">{t("planning.fuelUsageForecast")}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {t("planning.forecastTeaser")}
        </p>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/planning">
            {t("planning.viewForecasts")}
          </Link>
        </Button>
      </div>
      
      <div className="border rounded-lg p-4 bg-muted/10 hover:bg-muted/20 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h3 className="font-medium">{t("planning.calendarIntegration")}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {t("planning.calendarTeaser")}
        </p>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to="/planning">
            {t("planning.viewCalendar")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
