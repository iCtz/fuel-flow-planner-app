
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Globe, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface RegionsZonesTabProps {
  regions: any[];
  zones: any[];
}

export function RegionsZonesTab({ regions, zones }: RegionsZonesTabProps) {
  const { t } = useTranslation();
  
  // Helper function to get string value from potentially localized content
  const getLocalizedString = (text: string | { [key: string]: string }, lang: string = 'en') => {
    if (typeof text === 'string') return text;
    return text[lang] || text.en || '';
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {regions.map(region => (
          <DashboardCard
            key={region.id}
            title={getLocalizedString(region.name)}
            footer={
              <div className="w-full text-sm text-muted-foreground">
                {region.zones.length} zones
              </div>
            }
          >
            <div className="space-y-4 py-2">
              <div className="text-sm text-muted-foreground">
                {getLocalizedString(region.description)}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{region.zones.length} zones</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/regions?id=${region.id}`}>{t("dashboard.viewDetails")}</Link>
                </Button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
      
      <h2 className="text-lg font-medium mt-8">{t("common.zones")}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {zones.slice(0, 6).map(zone => (
          <DashboardCard
            key={zone.id}
            title={getLocalizedString(zone.name)}
            footer={
              <div className="w-full text-sm text-muted-foreground">
                {t("common.regions")}: {getLocalizedString(regions.find(r => r.id === zone.regionId)?.name)}
              </div>
            }
          >
            <div className="space-y-4 py-2">
              <div className="text-sm text-muted-foreground">{getLocalizedString(zone.description)}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Map className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{zone.sites.length} sites</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/zones/${zone.id}`}>{t("dashboard.viewDetails")}</Link>
                </Button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
      
      {zones.length > 6 && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" asChild>
            <Link to="/zones">{t("dashboard.viewAll")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
