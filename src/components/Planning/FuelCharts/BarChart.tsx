
import React from 'react';
import { useTranslation } from "react-i18next";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { formatDate } from '@/utils/forecastUtils';
import { ForecastDataItem } from '@/utils/forecastUtils';

interface BarChartProps {
  data: ForecastDataItem[];
}

export const FuelBarChart = ({ data }: BarChartProps) => {
  const { t } = useTranslation();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
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
        <Bar
          dataKey="actual"
          fill="#0284c7"
          name={t("planning.actualUsage")}
        />
        <Bar
          dataKey="forecast"
          fill="#f59e0b"
          name={t("planning.forecastedUsage")}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
