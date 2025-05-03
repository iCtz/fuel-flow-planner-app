
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { sites, zones, vendors, generators, fieldReports } from "@/data/mockData";
import { Site, Zone, Vendor } from "@/types/hierarchy";
import { Generator } from "@/types/generators";
import { renderLocalizedString } from "@/utils/localizedString";

export function useSiteDetails(siteId: string | undefined) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [site, setSite] = useState<Site | null>(null);
  const [zone, setZone] = useState<Zone | null>(null);
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [siteGenerators, setSiteGenerators] = useState<Generator[]>([]);
  const [siteReports, setSiteReports] = useState<any[]>([]);
  
  useEffect(() => {
    if (siteId) {
      const siteData = sites.find(s => s.id === siteId);
      
      if (siteData) {
        setSite(siteData);
        document.title = `Fuel Flow Planner - ${renderLocalizedString(siteData.name)}`;
        
        // Get zone
        setZone(zones.find(z => z.id === siteData.zoneId) || null);
        
        // Get vendor
        if (siteData.assignedVendorId) {
          setVendor(vendors.find(v => v.id === siteData.assignedVendorId) || null);
        } else {
          setVendor(null);
        }
        
        // Get generators
        setSiteGenerators(generators.filter(g => g.siteId === siteId));
        
        // Get field reports
        setSiteReports(fieldReports.filter(r => r.siteId === siteId));
      } else {
        toast({
          title: "Site not found",
          description: "The requested site could not be found.",
          variant: "destructive"
        });
        navigate("/sites");
      }
    }
  }, [siteId, navigate, toast]);

  return {
    site,
    zone,
    vendor,
    siteGenerators,
    siteReports
  };
}
