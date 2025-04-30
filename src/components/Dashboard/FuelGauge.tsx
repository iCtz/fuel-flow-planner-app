
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface FuelGaugeProps {
  percentage: number;
  className?: string;
}

export function FuelGauge({ percentage, className }: FuelGaugeProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    setAnimatedPercentage(percentage);
  }, [percentage]);

  // Create markers at 25%, 50%, and 75%
  const markers = [25, 50, 75].map((level) => ({
    position: `${100 - level}%`,
    level: level,
  }));

  // Determine the color based on the fuel level
  const getColor = () => {
    if (percentage <= 20) return "bg-red-500";
    if (percentage <= 40) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className={cn("fuel-gauge-container", className)}>
      <div 
        className="fuel-gauge-fill" 
        style={{ height: `${animatedPercentage}%` }}
      />
      <div 
        className="fuel-gauge-empty" 
        style={{ height: `${100 - animatedPercentage}%` }}
      />
      
      {markers.map((marker) => (
        <div 
          key={marker.level} 
          className="fuel-gauge-marker" 
          style={{ top: marker.position }}
        />
      ))}
      
      <div className="fuel-gauge-text text-xl">
        {Math.round(animatedPercentage)}%
      </div>
    </div>
  );
}
