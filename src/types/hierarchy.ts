
import { Generator } from "@/types/generators";

export type LocalizedString = {
  en: string;
  ar: string;
};

export type Region = {
  id: string;
  name: string | LocalizedString;
  description?: string | LocalizedString;
  zones: Zone[];
};

export type Zone = {
  id: string;
  name: string | LocalizedString;
  regionId: string;
  supervisor?: User;
  supervisorId?: string;
  description?: string | LocalizedString;
  sites: Site[];
};

export type Site = {
  id: string;
  name: string | LocalizedString;
  zoneId: string;
  location: string | LocalizedString;
  coordinates?: { lat: number; lng: number };
  assignedVendorId?: string;
  generators: Generator[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "supervisor" | "field_team";
  zoneId?: string;
};

export type Vendor = {
  id: string;
  name: string | LocalizedString;
  email: string;
  phone: string;
  zoneIds: string[]; // Zones this vendor can service
  isGlobal: boolean; // If true, vendor can service any zone
};

export type FuelPlan = {
  id: string;
  month: string; // Format: "YYYY-MM"
  zoneId: string;
  createdBy: string;
  status: "draft" | "submitted" | "approved" | "in_progress" | "completed";
  planItems: PlanItem[];
};

export type PlanItem = {
  id: string;
  siteId: string;
  generatorId: string;
  scheduledDate: string;
  amount: number;
  vendorId?: string;
  status: "planned" | "completed" | "missed";
  notes?: string | LocalizedString;
};

export type FieldReport = {
  id: string;
  siteId: string;
  generatorId: string;
  reportDate: string;
  submittedBy: string;
  reviewedBy?: string;
  status: "submitted" | "under_review" | "approved" | "rejected";
  readings: TankReading[];
  notes?: string | LocalizedString;
};

export type TankReading = {
  tankId: string;
  fuelLevel: number;
  timestamp: string;
  notes?: string | LocalizedString;
};

// New Budget Types
export type FuelBudget = {
  id: string;
  zoneId: string;
  month: string; // Format: "YYYY-MM"
  allocatedAmount: number;
  usedAmount: number;
  status: "active" | "closed" | "exceeded";
  createdBy: string;
  updatedAt: string;
  notes?: string | LocalizedString;
};

export type BudgetTransaction = {
  id: string;
  budgetId: string;
  amount: number;
  type: "allocation" | "adjustment" | "expense";
  date: string;
  relatedPlanItemId?: string;
  notes?: string | LocalizedString;
};
