import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface TableErrorProps {
  colSpan: number;
  message?: string;
  onRetry?: () => void;
}

export const TableError: React.FC<TableErrorProps> = ({
  colSpan,
  message = "Failed to load data",
  onRetry,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center gap-3 text-destructive">
          <AlertCircle className="h-10 w-10" />
          <p className="text-sm">{message}</p>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
              Retry
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
