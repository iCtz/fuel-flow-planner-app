
export type FuelEvent = {
  id: string;
  generatorId: string;
  generatorName: string;
  title: string;
  date: string;
  amount?: number;
  type: 'refill' | 'maintenance' | 'check';
  notes?: string;
};
