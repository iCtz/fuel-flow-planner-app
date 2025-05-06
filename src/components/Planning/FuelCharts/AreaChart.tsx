
import React from 'react';
import { useTranslation } from "react-i18next";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { formatDate } from '@/utils/forecastUtils';
import { ForecastDataItem } from '@/utils/forecastUtils';

interface AreaChartProps {
  data: ForecastDataItem[];
}

export const FuelAreaChart = ({ data }: AreaChartProps) => {
  const { t } = useTranslation();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={data}>
        <defs>
          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis 
          dataKey="date" 
          tickFormatter={formatDate}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `${value}L`}
        />
        <Tooltip 
          formatter={(value: number) => [`${value}L`, "Usage"]}
          labelFormatter={(label) => `Date: ${formatDate(label)}`}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="actual"
          stroke="#0284c7"
          fill="url(#colorActual)"
          strokeWidth={2}
          dot={{ r: 3 }}
          name={t("planning.actualUsage")}
        />
        <Area
          type="monotone"
          dataKey="forecast"
          stroke="#f59e0b"
          fill="url(#colorForecast)"
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={{ r: 3 }}
          name={t("planning.forecastedUsage")}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};
