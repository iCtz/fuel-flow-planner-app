
import React from 'react';
import { useTranslation } from "react-i18next";
import { ChartLine, ChartBar, ChartPie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generators } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { renderLocalizedString } from "@/utils/localizedString";

interface ForecastControlsProps {
  selectedGenerator: string | null;
  handleGeneratorChange: (value: string) => void;
  forecastDays: number;
  handleForecastRangeChange: (days: number) => void;
  chartType: string;
  setChartType: (type: string) => void;
}

export function ForecastControls({
  selectedGenerator,
  handleGeneratorChange,
  forecastDays,
  handleForecastRangeChange,
  chartType,
  setChartType
}: ForecastControlsProps) {
  const { t } = useTranslation();

  return (
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
        <Tabs value={chartType} onValueChange={setChartType} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="line"><ChartLine className="h-3 w-3 mr-1" /> {t("planning.line")}</TabsTrigger>
            <TabsTrigger value="area"><ChartPie className="h-3 w-3 mr-1" /> {t("planning.area")}</TabsTrigger>
            <TabsTrigger value="bar"><ChartBar className="h-3 w-3 mr-1" /> {t("planning.bar")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
