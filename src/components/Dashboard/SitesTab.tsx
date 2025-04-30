
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SitesTabProps {
  sites: any[];
  zones: any[];
}

export function SitesTab({ sites, zones }: SitesTabProps) {
  const { t } = useTranslation();
  
  // Helper function to get string value from potentially localized content
  const getLocalizedString = (text: string | { [key: string]: string }, lang: string = 'en') => {
    if (typeof text === 'string') return text;
    return text[lang] || text.en || '';
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sites.map(site => (
          <DashboardCard
            key={site.id}
            title={getLocalizedString(site.name)}
            footer={
              <div className="w-full text-sm text-muted-foreground">
                {t("common.zones")}: {getLocalizedString(zones.find(z => z.id === site.zoneId)?.name)}
              </div>
            }
          >
            <div className="space-y-4 py-2">
              <div className="text-sm text-muted-foreground">{getLocalizedString(site.location)}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{site.generators.length} generators</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/sites/${site.id}`}>{t("dashboard.viewDetails")}</Link>
                </Button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button variant="outline" asChild>
          <Link to="/sites">{t("dashboard.viewAll")}</Link>
        </Button>
      </div>
    </div>
  );
}
