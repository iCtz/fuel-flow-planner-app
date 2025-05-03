
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Calendar, ClipboardList, Building } from "lucide-react";

interface SiteActionsProps {
  siteId: string;
}

export function SiteActions({ siteId }: SiteActionsProps) {
  const { toast } = useToast();
  
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link to={`/planning?siteId=${siteId}`}>
          <Calendar className="h-4 w-4 mr-2" />
          View Refill Schedule
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start" asChild>
        <Link to={`/field-reports?siteId=${siteId}`}>
          <ClipboardList className="h-4 w-4 mr-2" />
          View Field Reports
        </Link>
      </Button>
      <Button variant="outline" className="w-full justify-start" onClick={() => {
        toast({
          title: "Assign Vendor",
          description: "This feature will be available soon."
        });
      }}>
        <Building className="h-4 w-4 mr-2" />
        Assign Vendor
      </Button>
    </div>
  );
}
