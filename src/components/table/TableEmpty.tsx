import React from "react";
import { Inbox } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableEmptyProps {
  colSpan: number;
  message?: string;
  icon?: React.ReactNode;
}

export const TableEmpty: React.FC<TableEmptyProps> = ({
  colSpan,
  message = "No data available",
  icon,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          {icon || <Inbox className="h-10 w-10" />}
          <p className="text-sm">{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};
