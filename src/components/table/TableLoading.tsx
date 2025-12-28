import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableLoadingProps {
  colSpan: number;
  rows?: number;
}

export const TableLoading: React.FC<TableLoadingProps> = ({
  colSpan,
  rows = 5,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: colSpan }).map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
