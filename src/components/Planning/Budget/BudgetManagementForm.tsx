
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FuelBudget } from "@/types/hierarchy";
import { zones } from "@/data/mockData";
import { renderLocalizedString } from "@/utils/localizedString";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DollarSign } from "lucide-react";

interface BudgetManagementFormProps {
  budget?: FuelBudget;
  monthOptions: Array<{ value: string; label: string }>;
  onSubmit: (data: z.infer<typeof budgetFormSchema>) => void;
  onCancel: () => void;
}

const budgetFormSchema = z.object({
  zoneId: z.string().min(1, { message: "Please select a zone" }),
  month: z.string().min(1, { message: "Please select a month" }),
  allocatedAmount: z.coerce.number().positive({ message: "Budget must be greater than 0" }),
  notes: z.string().optional(),
});

export function BudgetManagementForm({ 
  budget, 
  monthOptions, 
  onSubmit, 
  onCancel 
}: BudgetManagementFormProps) {
  const { toast } = useToast();
  const isEditing = !!budget;
  
  const form = useForm<z.infer<typeof budgetFormSchema>>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      zoneId: budget?.zoneId || "",
      month: budget?.month || "",
      allocatedAmount: budget?.allocatedAmount || 0,
      notes: typeof budget?.notes === 'string' ? budget.notes : budget?.notes?.en || "",
    },
  });

  const handleFormSubmit = (data: z.infer<typeof budgetFormSchema>) => {
    onSubmit(data);
    toast({
      title: isEditing ? "Budget Updated" : "Budget Created",
      description: `Fuel budget for ${monthOptions.find(m => m.value === data.month)?.label} has been ${isEditing ? 'updated' : 'created'}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          {isEditing ? "Edit Fuel Budget" : "Create New Budget"}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="zoneId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    disabled={isEditing}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {zones.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                          {renderLocalizedString(zone.name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Month</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isEditing}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a month" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {monthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="allocatedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Amount (Liters)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Total fuel allocation for the selected zone and month
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional notes about this budget"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Budget" : "Create Budget"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
