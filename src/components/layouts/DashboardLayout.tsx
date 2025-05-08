
import React from "react";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardLayout({ children, title, description, actions }: DashboardLayoutProps) {
  const { t } = useTranslation();
  
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
          
          {actions && (
            <div className="mt-4 md:mt-0 space-x-2">
              {actions}
            </div>
          )}
        </div>
        
        {children}
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
