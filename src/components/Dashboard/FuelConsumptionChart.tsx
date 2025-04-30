
import { DashboardCard } from "./DashboardCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

interface ConsumptionData {
  date: string;
  amount: number;
}

interface FuelConsumptionChartProps {
  data: ConsumptionData[];
}

export function FuelConsumptionChart({ data }: FuelConsumptionChartProps) {
  const isMobile = useIsMobile();
  
  return (
    <DashboardCard title="Fuel Consumption Trends">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: isMobile ? 0 : 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value}
              minTickGap={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}L`}
              width={isMobile ? 30 : 50}
            />
            <Tooltip
              formatter={(value: number) => [`${value}L`, "Consumption"]}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "0.5rem",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#0284c7"
              fill="url(#colorAmount)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
