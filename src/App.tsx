
// Import i18n configuration first
import "./i18n";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Dashboard pages
import RegionsPage from "./pages/dashboard/RegionsPage";
import ZonesPage from "./pages/dashboard/ZonesPage";
import ZoneDetailsPage from "./pages/dashboard/ZoneDetailsPage";
import SitesPage from "./pages/dashboard/SitesPage";
import SiteDetailsPage from "./pages/dashboard/SiteDetailsPage";
import GeneratorsPage from "./pages/dashboard/GeneratorsPage";
import GeneratorDetailsPage from "./pages/dashboard/GeneratorDetailsPage";
import PlanningPage from "./pages/dashboard/PlanningPage";
import VendorsPage from "./pages/dashboard/VendorsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import FieldReportsPage from "./pages/dashboard/FieldReportsPage";
import UsersPage from "./pages/dashboard/UsersPage";
import UserDetailsPage from "./pages/dashboard/UserDetailsPage";

import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/regions" element={<RegionsPage />} />
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/zones/:zoneId" element={<ZoneDetailsPage />} />
            <Route path="/sites" element={<SitesPage />} />
            <Route path="/sites/:siteId" element={<SiteDetailsPage />} />
            <Route path="/generators" element={<GeneratorsPage />} />
            <Route path="/generators/:generatorId" element={<GeneratorDetailsPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/field-reports" element={<FieldReportsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UserDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
