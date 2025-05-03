
import { LocalizedString } from "./hierarchy";

export type Generator = {
  id: string;
  name: string | LocalizedString;
  siteId: string;
  location: string | LocalizedString;
  status: 'operational' | 'maintenance' | 'offline';
  fuelLevel: number; // percentage
  capacity: number; // liters
  tanks: Tank[];
  lastRefill?: string; // ISO date string
  nextScheduledRefill?: string; // ISO date string
  alerts?: number;
  needsMaintenance?: boolean;
};

export type Tank = {
  id: string;
  generatorId: string;
  capacity: number; // liters
  currentLevel: number; // liters
  lastMeasurement?: string; // ISO date string
};
