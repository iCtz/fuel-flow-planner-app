
import { Bell, CalendarDays, Fuel, Menu, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
          <a href="/" className="flex items-center space-x-2">
            <Fuel className="h-6 w-6 text-fuel-accent" />
            <span className="font-bold text-lg hidden sm:inline-block">Fuel Flow Planner</span>
          </a>
        </div>

        <nav
          className={cn(
            "hidden md:flex md:flex-1 md:items-center md:justify-between",
            mobileMenuOpen && "absolute inset-x-0 top-full flex flex-col items-start bg-background shadow-lg border-b p-4 md:p-0 md:shadow-none md:border-0 md:flex-row"
          )}
        >
          <div className={cn("flex gap-6", mobileMenuOpen && "flex-col w-full md:flex-row")}>
            <a
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </a>
            <a
              href="/generators"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Generators
            </a>
            <a
              href="/planning"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Planning
            </a>
            <a
              href="/reports"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Reports
            </a>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <CalendarDays className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <User className="h-4 w-4" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
