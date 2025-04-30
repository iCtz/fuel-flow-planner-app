
import { Generator } from "@/types/generators";
import { FuelEvent } from "@/types/fuelEvents";

export const generators: Generator[] = [
  {
    id: "gen-001",
    name: "Main Building Generator",
    location: "Basement, Main Building",
    capacity: 500,
    fuelLevel: 78,
    status: "operational",
    lastRefill: "2025-04-15T08:00:00Z",
    nextScheduledRefill: "2025-05-05T08:00:00Z"
  },
  {
    id: "gen-002",
    name: "Backup Power Unit 1",
    location: "East Wing, Floor 1",
    capacity: 350,
    fuelLevel: 45,
    status: "operational",
    lastRefill: "2025-04-20T09:30:00Z",
    nextScheduledRefill: "2025-05-10T09:00:00Z"
  },
  {
    id: "gen-003",
    name: "Emergency Generator",
    location: "Security Building",
    capacity: 250,
    fuelLevel: 92,
    status: "operational",
    lastRefill: "2025-04-26T11:15:00Z",
    nextScheduledRefill: "2025-05-20T10:00:00Z"
  },
  {
    id: "gen-004",
    name: "Portable Generator A",
    location: "Warehouse, Section C",
    capacity: 150,
    fuelLevel: 22,
    status: "maintenance",
    lastRefill: "2025-04-05T14:00:00Z",
    nextScheduledRefill: "2025-05-02T15:00:00Z"
  },
];

export const upcomingEvents: FuelEvent[] = [
  {
    id: "evt-001",
    generatorId: "gen-001",
    generatorName: "Main Building Generator",
    title: "Scheduled Refill",
    date: "2025-05-05T08:00:00Z",
    amount: 120,
    type: "refill",
    notes: "Regular monthly refill"
  },
  {
    id: "evt-002",
    generatorId: "gen-004",
    generatorName: "Portable Generator A",
    title: "Maintenance Check",
    date: "2025-05-02T15:00:00Z",
    type: "maintenance",
    notes: "Fix fuel gauge and perform routine maintenance"
  },
  {
    id: "evt-003",
    generatorId: "gen-002",
    generatorName: "Backup Power Unit 1",
    title: "Scheduled Refill",
    date: "2025-05-10T09:00:00Z",
    amount: 200,
    type: "refill",
    notes: "Fill to capacity for seasonal backup"
  },
  {
    id: "evt-004",
    generatorId: "gen-003",
    generatorName: "Emergency Generator",
    title: "Status Check",
    date: "2025-05-12T13:30:00Z",
    type: "check",
    notes: "Quarterly inspection"
  }
];

export const consumptionData = [
  { date: "Jan", amount: 320 },
  { date: "Feb", amount: 280 },
  { date: "Mar", amount: 410 },
  { date: "Apr", amount: 350 },
  { date: "May", amount: 0 },
  { date: "Jun", amount: 0 },
  { date: "Jul", amount: 0 },
  { date: "Aug", amount: 0 },
  { date: "Sep", amount: 0 },
  { date: "Oct", amount: 0 },
  { date: "Nov", amount: 0 },
  { date: "Dec", amount: 0 }
];

export const quickStats = {
  totalFuelUsed: 1360,
  averageConsumption: 11.3,
  refillEfficiency: 92,
  forecastDays: 14
};
