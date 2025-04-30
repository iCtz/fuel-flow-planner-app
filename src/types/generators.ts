
export type Generator = {
  id: string;
  name: string;
  siteId: string;
  location: string;
  capacity: number;
  fuelLevel: number;
  status: 'operational' | 'maintenance' | 'offline';
  lastRefill?: string;
  nextScheduledRefill?: string;
  consumption?: number;
  tanks: Tank[];
};

export type Tank = {
  id: string;
  generatorId: string;
  name: string;
  capacity: number;
  currentLevel: number;
  lastReading?: string;
  gauge?: string; // Type of measurement tool
};
