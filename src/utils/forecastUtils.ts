
import { Generator } from "@/types/generators";
import { generators } from "@/data/mockData";

// Generate forecast data
export const generateForecastData = (generatorId: string | null, days: number) => {
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

// Format date string for chart display
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
};

// Calculate total forecast consumption
export const calculateTotalForecast = (forecastData: any[]) => {
  return forecastData
    .filter(item => item.forecast !== null)
    .reduce((sum, item) => sum + (item.forecast || 0), 0);
};

export type ForecastDataItem = {
  date: string;
  actual: number | null;
  forecast: number | null;
  type: 'historical' | 'forecast';
};

