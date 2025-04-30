
export type FuelEvent = {
  id: string;
  generatorId: string;
  generatorName: string;
  tankId: string;
  title: string;
  date: string;
  amount?: number;
  type: 'refill' | 'maintenance' | 'check';
  notes?: string;
  status: 'planned' | 'completed' | 'cancelled';
  vendorId?: string;
  fieldReportId?: string;
};
