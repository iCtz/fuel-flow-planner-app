
import { Bell, CalendarDays, Fuel, Menu, Settings, User, LayoutDashboard, Globe, Map, Box, Users } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: t("common.dashboard"), path: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: t("common.regions"), path: "/regions", icon: <Globe className="h-4 w-4" /> },
    { name: t("common.zones"), path: "/zones", icon: <Map className="h-4 w-4" /> },
    { name: t("common.sites"), path: "/sites", icon: <Box className="h-4 w-4" /> },
    { name: t("common.generators"), path: "/generators", icon: <Fuel className="h-4 w-4" /> },
    { name: t("common.planning"), path: "/planning", icon: <CalendarDays className="h-4 w-4" /> },
    { name: t("common.vendors"), path: "/vendors", icon: <Users className="h-4 w-4" /> },
    { name: t("common.reports"), path: "/reports", icon: <Bell className="h-4 w-4" /> },
    { name: t("common.users"), path: "/users", icon: <User className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Button
            variant="ghost"
            className="md:hidden"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center space-x-2">
            <Fuel className="h-6 w-6 text-fuel-accent" />
            <span className="font-bold text-lg hidden sm:inline-block">{t("header.appTitle")}</span>
          </Link>
        </div>

        <nav
          className={cn(
            "hidden md:flex md:flex-1 md:items-center md:justify-between",
            mobileMenuOpen && "absolute inset-x-0 top-full flex flex-col items-start bg-background shadow-lg border-b p-4 md:p-0 md:shadow-none md:border-0 md:flex-row z-50"
          )}
        >
          <div className={cn("flex gap-6", mobileMenuOpen && "flex-col w-full md:flex-row")}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
                  isActive(item.path) ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link to="/users">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="icon" variant="ghost">
            <Settings className="h-4 w-4" />
          </Button>
          <LanguageSwitcher />
          <ModeToggle />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 p-2 rounded-md",
                    isActive(item.path) ? "bg-secondary text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
