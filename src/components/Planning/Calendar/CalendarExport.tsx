
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

export function CalendarExport() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const handleExportCalendar = () => {
    toast({
      title: t("planning.calendarExported"),
      description: t("planning.calendarExportDescription"),
    });
  };
  
  const handleAddToCalendar = () => {
    toast({
      title: t("planning.addedToCalendar"),
      description: t("planning.addedToCalendarDescription"),
    });
  };
  
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button onClick={handleExportCalendar} variant="outline" size="sm" className="flex-grow">
        <Download className="h-4 w-4 mr-2" />
        {t("planning.exportCalendar")}
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex-grow">
            <Plus className="h-4 w-4 mr-2" />
            {t("planning.addToCalendar")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{t("planning.selectCalendarApp")}</h4>
              <p className="text-sm text-muted-foreground">
                {t("planning.selectCalendarDescription")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={handleAddToCalendar}
              >
                Google Calendar
              </Button>
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={handleAddToCalendar}
              >
                Microsoft Outlook
              </Button>
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={handleAddToCalendar}
              >
                Apple Calendar
              </Button>
              <Button 
                variant="outline" 
                className="justify-start" 
                onClick={handleAddToCalendar}
              >
                Yahoo Calendar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
