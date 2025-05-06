
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChartLine } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { generateForecastData, calculateTotalForecast } from "@/utils/forecastUtils";
import { ForecastControls } from "./ForecastControls";
import { ForecastMetrics } from "./ForecastMetrics";
import { FuelLineChart } from "./FuelCharts/LineChart";
import { FuelAreaChart } from "./FuelCharts/AreaChart";
import { FuelBarChart } from "./FuelCharts/BarChart";

export function FuelUsageForecast() {
  const { t } = useTranslation();
  const [forecastDays, setForecastDays] = useState<number>(14);
  const [selectedGenerator, setSelectedGenerator] = useState<string | null>(null);
  const [forecastData, setForecastData] = useState(() => generateForecastData(selectedGenerator, 14));
  const [chartType, setChartType] = useState<string>("line");
  
  const handleGeneratorChange = (value: string) => {
    setSelectedGenerator(value === 'all' ? null : value);
    setForecastData(generateForecastData(value === 'all' ? null : value, forecastDays));
  };
  
  const handleForecastRangeChange = (days: number) => {
    setForecastDays(days);
    setForecastData(generateForecastData(selectedGenerator, days));
  };
  
  // Calculate total forecast consumption
  const totalForecast = calculateTotalForecast(forecastData);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChartLine className="h-4 w-4 mr-2" />
          {t("planning.fuelUsageForecast")}
        </CardTitle>
        <CardDescription>
          {t("planning.forecastDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForecastControls
          selectedGenerator={selectedGenerator}
          handleGeneratorChange={handleGeneratorChange}
          forecastDays={forecastDays}
          handleForecastRangeChange={handleForecastRangeChange}
          chartType={chartType}
          setChartType={setChartType}
        />
        
        <ForecastMetrics 
          totalForecast={totalForecast}
          forecastDays={forecastDays}
        />
        
        <div className="h-72 mt-6">
          {chartType === "line" ? (
            <FuelLineChart data={forecastData} />
          ) : chartType === "area" ? (
            <FuelAreaChart data={forecastData} />
          ) : (
            <FuelBarChart data={forecastData} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
