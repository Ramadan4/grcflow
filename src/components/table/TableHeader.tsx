import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TableHead, TableHeader as UITableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ColumnConfig, SortConfig } from "./types";

interface TableHeaderProps<T> {
  columns: ColumnConfig<T>[];
  hasActions: boolean;
  actionsLabel: string;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
}

export function DynamicTableHeader<T>({
  columns,
  hasActions,
  actionsLabel,
  sortConfig,
  onSort,
}: TableHeaderProps<T>) {
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === "asc" 
      ? <ArrowUp className="h-4 w-4" /> 
      : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <UITableHeader>
      <TableRow className="bg-muted/30 hover:bg-muted/30">
        {columns.map((column) => (
          <TableHead
            key={column.key}
            className={`font-semibold text-foreground ${column.className || ""}`}
            style={column.width ? { width: column.width } : undefined}
          >
            {column.sortable && onSort ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSort(column.key)}
                className="h-auto p-0 font-semibold hover:bg-transparent"
              >
                {column.header}
                <span className="ltr:ml-2 rtl:mr-2">{getSortIcon(column.key)}</span>
              </Button>
            ) : (
              column.header
            )}
          </TableHead>
        ))}
        {hasActions && (
          <TableHead className="font-semibold text-foreground text-center">
            {actionsLabel}
          </TableHead>
        )}
      </TableRow>
    </UITableHeader>
  );
}
