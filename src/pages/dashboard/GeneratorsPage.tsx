
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { generators, sites, zones } from "@/data/mockData";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { GeneratorCard } from "@/components/Dashboard/GeneratorCard";
import { Input } from "@/components/ui/input";
import { Generator } from "@/types/generators";

const GeneratorsPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const siteId = queryParams.get("siteId");
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGenerators, setFilteredGenerators] = useState<Generator[]>(generators);
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Generators";
    filterGenerators();
  }, [siteId, searchTerm]);
  
  const filterGenerators = () => {
    let filtered = generators;
    
    if (siteId) {
      filtered = filtered.filter(generator => generator.siteId === siteId);
    }
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(generator => 
        generator.name.toLowerCase().includes(lowerSearch) || 
        generator.location.toLowerCase().includes(lowerSearch)
      );
    }
    
    setFilteredGenerators(filtered);
  };

  const handleAddGenerator = () => {
    toast({
      title: "Feature Not Available",
      description: "Adding new generators will be available soon.",
      duration: 3000,
    });
  };
  
  const getSiteAndZone = (generator: Generator) => {
    const site = sites.find(site => site.id === generator.siteId);
    const zone = site ? zones.find(zone => zone.id === site.zoneId) : null;
    return {
      siteName: site?.name || "Unknown site",
      zoneName: zone?.name || "Unknown zone",
    };
  };

  return (
    <DashboardLayout 
      title={siteId ? `Generators at ${sites.find(site => site.id === siteId)?.name}` : "All Generators"}
      description="Monitor and manage all generators"
      actions={
        <>
          {siteId && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/sites/${siteId}`}>Back to Site</Link>
            </Button>
          )}
          <Button size="sm" onClick={handleAddGenerator}>
            <Plus className="h-4 w-4 mr-1" />
            Add Generator
          </Button>
        </>
      }
    >
      <div className="flex items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search generators..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-2 text-sm text-muted-foreground">
          {filteredGenerators.length} generators found
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGenerators.map((generator) => {
          const { siteName, zoneName } = getSiteAndZone(generator);
          return (
            <div key={generator.id} className="flex flex-col">
              <GeneratorCard generator={generator} />
              {!siteId && (
                <div className="mt-1 px-2 text-xs text-muted-foreground">
                  Location: <Link to={`/sites/${generator.siteId}`} className="hover:underline">{siteName}</Link> in <Link to={`/zones`} className="hover:underline">{zoneName}</Link>
                </div>
              )}
            </div>
          );
        })}
        
        {filteredGenerators.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No generators found matching your criteria.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GeneratorsPage;
