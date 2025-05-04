
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import { FuelPlan } from "@/types/hierarchy";
import { sites, generators, vendors } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";
import { Link } from "react-router-dom";

interface PlanningDetailsTableProps {
  currentPlans: FuelPlan[];
}

export function PlanningDetailsTable({ currentPlans }: PlanningDetailsTableProps) {
  return (
    <DashboardCard title="Refill Schedule">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Site</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Generator</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Amount</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Vendor</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.flatMap(plan => 
              plan.planItems.map((item: any) => {
                const site = sites.find(s => s.id === item.siteId);
                const generator = generators.find(g => g.id === item.generatorId);
                const vendor = vendors.find(v => v.id === item.vendorId);
                
                // Create string representations
                const siteName = site ? renderLocalizedString(site.name) : 'Unknown';
                const generatorName = generator ? renderLocalizedString(generator.name) : 'Unknown';
                const vendorName = vendor ? renderLocalizedString(vendor.name) : 'Not assigned';
                
                return (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{item.scheduledDate}</td>
                    <td className="py-3 px-4">
                      <Link to={`/sites/${site?.id}`} className="hover:underline">
                        {siteName}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/generators/${generator?.id}`} className="hover:underline">
                        {generatorName}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{item.amount}L</td>
                    <td className="py-3 px-4">{vendorName}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
            
            {currentPlans.flatMap(plan => plan.planItems).length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-muted-foreground">
                  No refill items planned for the selected period.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}
