
import React from "react";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { takeScreenshot } from "@/utils/screenshotUtils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({ children, title, description, actions }: DashboardLayoutProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const handleScreenshot = async () => {
    try {
      await takeScreenshot('dashboard-content', `${title.toLowerCase().replace(/\s+/g, '-')}`);
      toast({
        title: t("common.success"),
        description: t("dashboard.screenshotSaved"),
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("dashboard.screenshotError"),
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2 flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleScreenshot}
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              {t("common.screenshot")}
            </Button>
            {actions}
          </div>
        </div>
        
        <div id="dashboard-content">
          {children}
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
