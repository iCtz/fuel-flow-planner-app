
import { Generator } from "@/types/generators";
import { GeneratorCard } from "@/components/Dashboard/GeneratorCard";

interface SiteGeneratorsTabProps {
  generators: Generator[];
}

export function SiteGeneratorsTab({ generators }: SiteGeneratorsTabProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {generators.map(generator => (
        <GeneratorCard key={generator.id} generator={generator} />
      ))}
      
      {generators.length === 0 && (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No generators added to this site yet.
        </div>
      )}
    </div>
  );
}
