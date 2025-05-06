
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileSave } from "lucide-react";
import { FuelBudget, BudgetTransaction } from "@/types/hierarchy";
import { useToast } from "@/hooks/use-toast";
import { toPDF } from "react-to-pdf";
import { renderLocalizedString } from "@/utils/localizedString";

interface BudgetExportPDFProps {
  budget: FuelBudget;
  transactions: BudgetTransaction[];
  zoneName: string;
  monthLabel: string;
}

export function BudgetExportPDF({ budget, transactions, zoneName, monthLabel }: BudgetExportPDFProps) {
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!reportRef.current) return;
    
    try {
      await toPDF(reportRef, {
        filename: `fuel-budget-${zoneName}-${monthLabel}.pdf`,
        page: {
          margin: 20,
          format: 'a4',
        }
      });
      
      toast({
        title: "Export Successful",
        description: `Budget report for ${zoneName} - ${monthLabel} has been exported as PDF.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
      console.error("PDF generation error:", error);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleExport}>
        <FileSave className="h-4 w-4 mr-1" />
        Export PDF
      </Button>
      
      {/* Hidden div for PDF content - will be generated on export */}
      <div className="hidden">
        <div ref={reportRef} className="p-8 bg-white">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Fuel Budget Report</h1>
            <h2 className="text-xl">{zoneName} - {monthLabel}</h2>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Budget Summary</h3>
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">Allocated Amount:</td>
                  <td className="py-2 text-right">{budget.allocatedAmount.toLocaleString()} L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Used Amount:</td>
                  <td className="py-2 text-right">{budget.usedAmount.toLocaleString()} L</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Remaining:</td>
                  <td className="py-2 text-right">
                    {(budget.allocatedAmount - budget.usedAmount).toLocaleString()} L
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Usage Percentage:</td>
                  <td className="py-2 text-right">
                    {((budget.usedAmount / budget.allocatedAmount) * 100).toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Status:</td>
                  <td className="py-2 text-right">
                    {budget.status.charAt(0).toUpperCase() + budget.status.slice(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Transaction History</h3>
            {transactions.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-right py-2">Amount (L)</th>
                    <th className="text-left py-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className="py-2">
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </td>
                      <td className="py-2 text-right">
                        {transaction.type === "expense" ? "-" : "+"}{transaction.amount.toLocaleString()}
                      </td>
                      <td className="py-2 text-left max-w-[150px] truncate">
                        {typeof transaction.notes === 'string' ? 
                          transaction.notes : 
                          transaction.notes ? renderLocalizedString(transaction.notes) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-4 text-gray-500">No transactions found.</p>
            )}
          </div>
          
          <div className="mt-8 text-xs text-gray-500">
            <p>Generated on: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
