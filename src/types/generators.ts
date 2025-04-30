
export type Generator = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  fuelLevel: number;
  status: 'operational' | 'maintenance' | 'offline';
  lastRefill?: string;
  nextScheduledRefill?: string;
  consumption?: number;
};
