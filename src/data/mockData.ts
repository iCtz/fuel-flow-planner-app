
import { Region, Zone, Site, User, Vendor, FuelPlan, FieldReport } from "@/types/hierarchy";
import { Generator as FuelGenerator, Tank } from "@/types/generators";
import { FuelEvent } from "@/types/fuelEvents";

// Regions
export const regions: Region[] = [
  {
    id: "region-1",
    name: "Northern Region",
    description: "Covers all northern territories",
    zones: []
  },
  {
    id: "region-2",
    name: "Southern Region",
    description: "Covers all southern territories",
    zones: []
  },
  {
    id: "region-3",
    name: "Eastern Region",
    description: "Covers all eastern territories",
    zones: []
  },
  {
    id: "region-4",
    name: "Western Region",
    description: "Covers all western territories",
    zones: []
  }
];

// Users
export const users: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "supervisor",
    zoneId: "zone-1"
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "supervisor",
    zoneId: "zone-2"
  },
  {
    id: "user-3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "field_team"
  },
  {
    id: "user-4",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "field_team"
  },
  {
    id: "user-5",
    name: "James Taylor",
    email: "james.taylor@example.com",
    role: "admin"
  }
];

// Zones
export const zones: Zone[] = [
  {
    id: "zone-1",
    name: "Zone A",
    regionId: "region-1",
    supervisorId: "user-1",
    description: "Northern urban area",
    sites: []
  },
  {
    id: "zone-2",
    name: "Zone B",
    regionId: "region-1",
    supervisorId: "user-2",
    description: "Northern rural area",
    sites: []
  },
  {
    id: "zone-3",
    name: "Zone C",
    regionId: "region-2",
    description: "Southern coastal area",
    sites: []
  },
  {
    id: "zone-4",
    name: "Zone D",
    regionId: "region-3",
    description: "Eastern mountain region",
    sites: []
  }
];

// Vendors
export const vendors: Vendor[] = [
  {
    id: "vendor-1",
    name: "FuelCorp Inc.",
    email: "contact@fuelcorp.com",
    phone: "+1-555-123-4567",
    zoneIds: ["zone-1", "zone-2"],
    isGlobal: false
  },
  {
    id: "vendor-2",
    name: "Global Fuels Ltd.",
    email: "info@globalfuels.com",
    phone: "+1-555-987-6543",
    zoneIds: [],
    isGlobal: true
  },
  {
    id: "vendor-3",
    name: "RegionalFuel Solutions",
    email: "support@regionalfuel.com",
    phone: "+1-555-456-7890",
    zoneIds: ["zone-3", "zone-4"],
    isGlobal: false
  }
];

// Sites
export const sites: Site[] = [
  {
    id: "site-1",
    name: "Main Tower",
    zoneId: "zone-1",
    location: "Downtown, Northern City",
    coordinates: { lat: 40.7128, lng: -74.006 },
    assignedVendorId: "vendor-1",
    generators: []
  },
  {
    id: "site-2",
    name: "Industrial Park",
    zoneId: "zone-1",
    location: "Outskirts, Northern City",
    coordinates: { lat: 40.7218, lng: -74.016 },
    assignedVendorId: "vendor-2",
    generators: []
  },
  {
    id: "site-3",
    name: "Rural Station",
    zoneId: "zone-2",
    location: "Countryside",
    generators: []
  },
  {
    id: "site-4",
    name: "Coast Facility",
    zoneId: "zone-3",
    location: "Southern Coast",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    assignedVendorId: "vendor-3",
    generators: []
  }
];

// Tanks
export const tanks: Tank[] = [
  {
    id: "tank-1",
    generatorId: "generator-1",
    name: "Main Tank",
    capacity: 1000,
    currentLevel: 750,
    lastReading: "2025-04-25",
    gauge: "Digital"
  },
  {
    id: "tank-2",
    generatorId: "generator-1",
    name: "Secondary Tank",
    capacity: 500,
    currentLevel: 300,
    lastReading: "2025-04-25",
    gauge: "Analog"
  },
  {
    id: "tank-3",
    generatorId: "generator-2",
    name: "Primary Tank",
    capacity: 2000,
    currentLevel: 1200,
    lastReading: "2025-04-24",
    gauge: "Digital"
  },
  {
    id: "tank-4",
    generatorId: "generator-3",
    name: "Main Tank",
    capacity: 800,
    currentLevel: 400,
    lastReading: "2025-04-23",
    gauge: "Digital"
  }
];

// Generators - renamed from Generator to FuelGenerator
export const generators: FuelGenerator[] = [
  {
    id: "generator-1",
    name: "Main Backup Generator",
    siteId: "site-1",
    location: "Basement Level 1",
    capacity: 1500,
    fuelLevel: 80,
    status: "operational",
    lastRefill: "2025-04-20",
    nextScheduledRefill: "2025-05-10",
    consumption: 10,
    tanks: [tanks[0], tanks[1]]
  },
  {
    id: "generator-2",
    name: "Emergency Power Unit",
    siteId: "site-2",
    location: "Main Building Roof",
    capacity: 2000,
    fuelLevel: 60,
    status: "operational",
    lastRefill: "2025-04-15",
    nextScheduledRefill: "2025-05-05",
    consumption: 15,
    tanks: [tanks[2]]
  },
  {
    id: "generator-3",
    name: "Backup Generator",
    siteId: "site-3",
    location: "External Shed",
    capacity: 800,
    fuelLevel: 50,
    status: "maintenance",
    lastRefill: "2025-03-30",
    nextScheduledRefill: "2025-05-15",
    consumption: 5,
    tanks: [tanks[3]]
  },
  {
    id: "generator-4",
    name: "Coastal Power Backup",
    siteId: "site-4",
    location: "Main Control Room",
    capacity: 1200,
    fuelLevel: 90,
    status: "operational",
    lastRefill: "2025-04-25",
    nextScheduledRefill: "2025-05-20",
    consumption: 8,
    tanks: []
  }
];

// Link sites and generators
sites.forEach(site => {
  site.generators = generators.filter(g => g.siteId === site.id);
});

// Link zones and sites
zones.forEach(zone => {
  zone.sites = sites.filter(s => s.zoneId === zone.id);
  
  // Add supervisor
  if (zone.supervisorId) {
    zone.supervisor = users.find(u => u.id === zone.supervisorId);
  }
});

// Link regions and zones
regions.forEach(region => {
  region.zones = zones.filter(z => z.regionId === region.id);
});

// Fuel Plans
export const fuelPlans: FuelPlan[] = [
  {
    id: "plan-1",
    month: "2025-05",
    zoneId: "zone-1",
    createdBy: "user-1",
    status: "approved",
    planItems: [
      {
        id: "planitem-1",
        siteId: "site-1",
        generatorId: "generator-1",
        scheduledDate: "2025-05-10",
        amount: 200,
        vendorId: "vendor-1",
        status: "planned",
        notes: "Regular refill"
      },
      {
        id: "planitem-2",
        siteId: "site-2",
        generatorId: "generator-2",
        scheduledDate: "2025-05-05",
        amount: 300,
        vendorId: "vendor-2",
        status: "planned",
        notes: "Emergency top-up required"
      }
    ]
  },
  {
    id: "plan-2",
    month: "2025-05",
    zoneId: "zone-2",
    createdBy: "user-2",
    status: "submitted",
    planItems: [
      {
        id: "planitem-3",
        siteId: "site-3",
        generatorId: "generator-3",
        scheduledDate: "2025-05-15",
        amount: 150,
        vendorId: "vendor-1",
        status: "planned",
        notes: "After maintenance check"
      }
    ]
  },
  {
    id: "plan-3",
    month: "2025-04",
    zoneId: "zone-1",
    createdBy: "user-1",
    status: "completed",
    planItems: [
      {
        id: "planitem-4",
        siteId: "site-1",
        generatorId: "generator-1",
        scheduledDate: "2025-04-20",
        amount: 200,
        vendorId: "vendor-1",
        status: "completed",
        notes: "Completed on schedule"
      }
    ]
  }
];

// Field Reports
export const fieldReports: FieldReport[] = [
  {
    id: "report-1",
    siteId: "site-1",
    generatorId: "generator-1",
    reportDate: "2025-04-25",
    submittedBy: "user-3",
    reviewedBy: "user-1",
    status: "approved",
    readings: [
      {
        tankId: "tank-1",
        fuelLevel: 750,
        timestamp: "2025-04-25T10:30:00",
        notes: "Normal operation"
      },
      {
        tankId: "tank-2",
        fuelLevel: 300,
        timestamp: "2025-04-25T10:35:00",
        notes: "Slight leak detected"
      }
    ],
    notes: "Overall in good condition, minor maintenance required for tank-2"
  },
  {
    id: "report-2",
    siteId: "site-2",
    generatorId: "generator-2",
    reportDate: "2025-04-24",
    submittedBy: "user-4",
    status: "submitted",
    readings: [
      {
        tankId: "tank-3",
        fuelLevel: 1200,
        timestamp: "2025-04-24T14:15:00",
        notes: "All systems normal"
      }
    ],
    notes: "Routine check completed"
  },
  {
    id: "report-3",
    siteId: "site-3",
    generatorId: "generator-3",
    reportDate: "2025-04-23",
    submittedBy: "user-4",
    reviewedBy: "user-2",
    status: "approved",
    readings: [
      {
        tankId: "tank-4",
        fuelLevel: 400,
        timestamp: "2025-04-23T09:45:00",
        notes: "Level lower than expected"
      }
    ],
    notes: "Recommendation: schedule maintenance to check for leaks"
  }
];

// Add to existing exports
export const quickStats = {
  totalFuelUsed: 2500,
  averageConsumption: 12,
  refillEfficiency: 92,
  forecastDays: 28
};

export const upcomingEvents: FuelEvent[] = [
  {
    id: "event-1",
    generatorId: "generator-1",
    generatorName: "Main Backup Generator",
    tankId: "tank-1",
    title: "Scheduled Refill",
    date: "2025-05-10",
    amount: 200,
    type: "refill",
    status: "planned",
    vendorId: "vendor-1"
  },
  {
    id: "event-2",
    generatorId: "generator-2",
    generatorName: "Emergency Power Unit",
    tankId: "tank-3",
    title: "Emergency Refill",
    date: "2025-05-05",
    amount: 300,
    type: "refill",
    status: "planned",
    vendorId: "vendor-2"
  },
  {
    id: "event-3",
    generatorId: "generator-3",
    generatorName: "Backup Generator",
    tankId: "tank-4",
    title: "Maintenance Check",
    date: "2025-05-12",
    type: "maintenance",
    status: "planned"
  }
];

export const consumptionData = [
  { date: "2025-04-01", amount: 45 },
  { date: "2025-04-08", amount: 52 },
  { date: "2025-04-15", amount: 48 },
  { date: "2025-04-22", amount: 61 },
  { date: "2025-04-29", amount: 55 }
];
