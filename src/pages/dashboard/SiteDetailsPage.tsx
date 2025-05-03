
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { renderLocalizedString } from "@/utils/localizedString";
import { SiteDetailsCards } from "@/components/Sites/SiteDetailsCards";
import { SiteTabs } from "@/components/Sites/SiteTabs";
import { useSiteDetails } from "@/hooks/useSiteDetails";

const SiteDetailsPage = () => {
  const { siteId } = useParams();
  const { site, zone, vendor, siteGenerators, siteReports } = useSiteDetails(siteId);
  
  if (!site) {
    return null; // Loading or not found
  }

  // Create string representation of site name for title
  const siteNameStr = renderLocalizedString(site.name);
  const zoneNameStr = zone ? renderLocalizedString(zone.name) : 'Unknown Zone';

  return (
    <DashboardLayout 
      title={siteNameStr}
      description={`Site in ${zoneNameStr}`}
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link to="/sites">Back to Sites</Link>
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Generator
          </Button>
        </>
      }
    >
      <SiteDetailsCards 
        site={site} 
        zone={zone} 
        vendor={vendor} 
        siteGenerators={siteGenerators} 
      />
      
      <SiteTabs 
        siteGenerators={siteGenerators} 
        siteReports={siteReports} 
      />
    </DashboardLayout>
  );
};

export default SiteDetailsPage;
