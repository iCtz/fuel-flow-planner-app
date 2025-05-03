
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
  consumption?: number; // liters per day
};

export type Tank = {
  id: string;
  generatorId: string;
  name?: string | LocalizedString; // Added name property
  capacity: number; // liters
  currentLevel: number; // liters
  lastMeasurement?: string; // ISO date string
  lastReading?: string; // ISO date string
  gauge?: string; // Type of gauge (Digital, Analog, etc)
};
