
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { renderLocalizedString } from "@/utils/localizedString";
import { Generator } from "@/types/hierarchy";

interface SiteFieldReportsTabProps {
  reports: any[];
  generators: Generator[];
}

export function SiteFieldReportsTab({ reports, generators }: SiteFieldReportsTabProps) {
  const { toast } = useToast();

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Generator</th>
            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Readings</th>
            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map(report => {
              const generator = generators.find(g => g.id === report.generatorId);
              // Ensure we have a string for generator name
              const generatorNameStr = generator ? renderLocalizedString(generator.name) : "Unknown";
              return (
                <tr key={report.id} className="border-b">
                  <td className="py-3 px-4 font-medium">{report.reportDate}</td>
                  <td className="py-3 px-4">{generatorNameStr}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{report.readings.length} readings</td>
                  <td className="py-3 px-4">
                    <Button size="sm" onClick={() => {
                      toast({
                        title: "View Report",
                        description: "This feature will be available soon."
                      });
                    }}>
                      View
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="py-6 text-center text-muted-foreground">
                No field reports submitted for this site yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
