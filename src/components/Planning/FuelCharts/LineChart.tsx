
import React from 'react';
import { useTranslation } from "react-i18next";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { formatDate } from '@/utils/forecastUtils';
import { ForecastDataItem } from '@/utils/forecastUtils';

interface LineChartProps {
  data: ForecastDataItem[];
}

export const FuelLineChart = ({ data }: LineChartProps) => {
  const { t } = useTranslation();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#0284c7"
          strokeWidth={2}
          dot={{ r: 3 }}
          name={t("planning.actualUsage")}
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#f59e0b"
          strokeDasharray="5 5"
          strokeWidth={2}
          dot={{ r: 3 }}
          name={t("planning.forecastedUsage")}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
