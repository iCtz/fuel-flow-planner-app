
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { zones } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";

interface PlanningFiltersProps {
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  monthOptions: Array<{ value: string; label: string }>;
}

export function PlanningFilters({
  selectedZone,
  setSelectedZone,
  selectedMonth,
  setSelectedMonth,
  monthOptions
}: PlanningFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="w-full md:w-1/3">
        <label className="text-sm font-medium block mb-2">Zone</label>
        <Select 
          value={selectedZone} 
          onValueChange={setSelectedZone}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Zones</SelectItem>
            {zones.map(zone => (
              <SelectItem key={zone.id} value={zone.id}>
                {renderLocalizedString(zone.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-1/3">
        <label className="text-sm font-medium block mb-2">Month</label>
        <Select 
          value={selectedMonth} 
          onValueChange={setSelectedMonth}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-1/3 flex md:items-end">
        <div className="flex gap-2 mt-auto w-full">
          <Button variant="outline" className="flex-1" onClick={() => {
            const currentIndex = monthOptions.findIndex(m => m.value === selectedMonth);
            if (currentIndex > 0) {
              setSelectedMonth(monthOptions[currentIndex - 1].value);
            }
          }}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => {
            const currentIndex = monthOptions.findIndex(m => m.value === selectedMonth);
            if (currentIndex < monthOptions.length - 1) {
              setSelectedMonth(monthOptions[currentIndex + 1].value);
            }
          }}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
