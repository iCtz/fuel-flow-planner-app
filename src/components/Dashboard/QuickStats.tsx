
import { DashboardCard } from "./DashboardCard";
import { Droplet, GaugeCircle, Percent, TrendingUp } from "lucide-react";

interface QuickStatsProps {
  totalFuelUsed: number;
  averageConsumption: number;
  refillEfficiency: number;
  forecastDays: number;
}

export function QuickStats({ totalFuelUsed, averageConsumption, refillEfficiency, forecastDays }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard 
        title="Total Fuel Used" 
        value={`${totalFuelUsed}L`}
        icon={<Droplet className="h-4 w-4 text-fuel-accent" />}
      />
      
      <StatCard 
        title="Avg. Consumption" 
        value={`${averageConsumption}L/day`}
        icon={<GaugeCircle className="h-4 w-4 text-fuel-secondary" />}
      />
      
      <StatCard 
        title="Refill Efficiency" 
        value={`${refillEfficiency}%`}
        icon={<Percent className="h-4 w-4 text-emerald-500" />}
      />
      
      <StatCard 
        title="Forecast Range" 
        value={`${forecastDays} days`}
        icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <DashboardCard title={title}>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </div>
    </DashboardCard>
  );
}
