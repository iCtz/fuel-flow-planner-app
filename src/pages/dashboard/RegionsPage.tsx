
import { useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, ChevronRight } from "lucide-react";
import { regions } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RegionsPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Fuel Flow Planner - Regions";
  }, []);

  const handleAddRegion = () => {
    toast({
      title: "Feature Not Available",
      description: "Adding new regions will be available soon.",
      duration: 3000,
    });
  };

  return (
    <DashboardLayout 
      title="Regions"
      description="Manage all regions in your organization"
      actions={
        <Button size="sm" onClick={handleAddRegion}>
          <Plus className="h-4 w-4 mr-1" />
          Add Region
        </Button>
      }
    >
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Description</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Zones</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {regions.map((region) => (
                <tr key={region.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{region.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{region.description}</td>
                  <td className="py-3 px-4">{region.zones.length}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => toast({
                        title: "Edit Region",
                        description: "This feature will be available soon.",
                        duration: 3000,
                      })}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => toast({
                        title: "Delete Region",
                        description: "This feature will be available soon.",
                        duration: 3000,
                      })}>
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/zones?regionId=${region.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegionsPage;
