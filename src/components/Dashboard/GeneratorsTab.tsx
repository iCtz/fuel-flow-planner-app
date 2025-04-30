
import { GeneratorCard } from "@/components/Dashboard/GeneratorCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface GeneratorsTabProps {
  generators: any[];
}

export function GeneratorsTab({ generators }: GeneratorsTabProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {generators.map((generator) => (
          <GeneratorCard key={generator.id} generator={generator} />
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button variant="outline" asChild>
          <Link to="/generators">{t("dashboard.viewAll")}</Link>
        </Button>
      </div>
    </div>
  );
}
