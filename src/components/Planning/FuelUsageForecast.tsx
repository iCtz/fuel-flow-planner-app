
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Chart as ChartIcon, 
  CalendarDays,
  ChartBar,
  ChartLine
} from "lucide-react";
import { DashboardCard } from "@/components/Dashboard/DashboardCard";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { generators, sites, zones } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { renderLocalizedString } from "@/utils/localizedString";

// Generate forecast data
const generateForecastData = (generatorId: string | null, days: number) => {
  const forecastData = [];
  const startDate = new Date();
  const avgConsumption = generatorId 
    ? generators.find(g => g.id === generatorId)?.consumption || 12
    : 12;
    
  // Randomize consumption within a realistic range
  const getRandomConsumption = (base: number) => {
    const variance = base * 0.2; // 20% variance
    return base + (Math.random() * variance * 2 - variance);
  };
  
  // Generate historical data (past 7 days)
  for (let i = -7; i < 0; i++) {
    const currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i);
    
    forecastData.push({
      date: currentDate.toISOString().split('T')[0],
      actual: Math.round(getRandomConsumption(avgConsumption) * 10) / 10,
      forecast: null,
      type: 'historical'
    });
  }
  
  // Generate forecast data
  for (let i = 0; i < days; i++) {
    const currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i);
    
    // Use a slightly increasing trend for forecast
    const forecastValue = Math.round((avgConsumption + (i * 0.2)) * 10) / 10;
    
    forecastData.push({
      date: currentDate.toISOString().split('T')[0],
      actual: i === 0 ? Math.round(getRandomConsumption(avgConsumption) * 10) / 10 : null,
      forecast: forecastValue,
      type: 'forecast'
    });
  }
  
  return forecastData;
};

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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };
  
  // Calculate total forecast consumption
  const totalForecast = forecastData
    .filter(item => item.forecast !== null)
    .reduce((sum, item) => sum + (item.forecast || 0), 0);
  
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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium block mb-2">{t("common.generator")}</label>
            <Select 
              value={selectedGenerator || 'all'} 
              onValueChange={handleGeneratorChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("planning.selectGenerator")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("planning.allGenerators")}</SelectItem>
                {generators.map(generator => (
                  <SelectItem key={generator.id} value={generator.id}>
                    {renderLocalizedString(generator.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium block mb-2">{t("planning.forecastRange")}</label>
            <div className="flex gap-2">
              {[7, 14, 30].map(days => (
                <Button 
                  key={days} 
                  variant={forecastDays === days ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleForecastRangeChange(days)}
                >
                  {days} {t("common.days")}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium block mb-2">{t("planning.chartType")}</label>
            <Tabs defaultValue={chartType} onValueChange={setChartType} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="line"><ChartLine className="h-3 w-3 mr-1" /> {t("planning.line")}</TabsTrigger>
                <TabsTrigger value="area"><ChartIcon className="h-3 w-3 mr-1" /> {t("planning.area")}</TabsTrigger>
                <TabsTrigger value="bar"><ChartBar className="h-3 w-3 mr-1" /> {t("planning.bar")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">{t("planning.totalForecastUsage")}</div>
              <div className="text-2xl font-bold">{Math.round(totalForecast)} L</div>
              <div className="text-xs text-muted-foreground">{t("planning.nextXDays", { days: forecastDays })}</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">{t("planning.avgDailyUsage")}</div>
              <div className="text-2xl font-bold">{Math.round(totalForecast / forecastDays * 10) / 10} L</div>
              <div className="text-xs text-muted-foreground">{t("planning.perDay")}</div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">{t("planning.nextRefillEstimate")}</div>
              <div className="text-2xl font-bold">{Math.floor(forecastDays / 2)} {t("common.days")}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(Date.now() + Math.floor(forecastDays / 2) * 86400000).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-72 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={forecastData}>
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
              </LineChart>
            ) : chartType === "area" ? (
              <AreaChart data={forecastData}>
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
              </AreaChart>
            ) : (
              <BarChart data={forecastData}>
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
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
