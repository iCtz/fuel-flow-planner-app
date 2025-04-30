import { Generator } from "@/types/generators";

export type Region = {
  id: string;
  name: string;
  description?: string;
  zones: Zone[];
};

export type Zone = {
  id: string;
  name: string;
  regionId: string;
  supervisor?: User;
  supervisorId?: string;
  description?: string;
  sites: Site[];
};

export type Site = {
  id: string;
  name: string;
  zoneId: string;
  location: string;
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
  name: string;
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
  notes?: string;
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
  notes?: string;
};

export type TankReading = {
  tankId: string;
  fuelLevel: number;
  timestamp: string;
  notes?: string;
};
