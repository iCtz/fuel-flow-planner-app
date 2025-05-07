
import { useTranslation } from "react-i18next";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarWidget } from "./Calendar/CalendarWidget";
import { CalendarExport } from "./Calendar/CalendarExport";
import { EventsList } from "./Calendar/EventsList";
import { useCalendarEvents } from "./Calendar/useCalendarEvents";

export function CalendarIntegration() {
  const { t } = useTranslation();
  const { 
    date, 
    events, 
    oneMonthFromNow,
    handleDateChange,
    getDaysWithEvents
  } = useCalendarEvents();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDays className="h-4 w-4 mr-2" />
          {t("planning.calendarIntegration")}
        </CardTitle>
        <CardDescription>
          {t("planning.calendarDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CalendarWidget 
              date={date}
              onDateChange={handleDateChange}
              getDaysWithEvents={getDaysWithEvents}
              disabledDates={(date) => date > oneMonthFromNow}
            />
            <CalendarExport />
          </div>
          
          <div>
            <EventsList date={date} events={events} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
