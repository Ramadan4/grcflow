import React from "react";
import { MoreVertical, Pencil, Eye, Trash2 } from "lucide-react";
import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnConfig, ActionConfig } from "./types";

interface TableRowProps<T> {
  item: T;
  columns: ColumnConfig<T>[];
  actions?: ActionConfig<T>[];
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  onDelete?: (item: T) => void;
  hasActions: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DynamicTableRow<T extends Record<string, any>>({
  item,
  columns,
  actions = [],
  onEdit,
  onView,
  onDelete,
  hasActions,
}: TableRowProps<T>) {
  const getCellValue = (column: ColumnConfig<T>) => {
    const value = item[column.key];
    
    if (column.render) {
      return column.render(value, item);
    }
    
    // Handle different value types
    if (value === null || value === undefined) {
      return "-";
    }
    
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  const visibleActions = actions.filter(
    (action) => !action.show || action.show(item)
  );

  return (
    <UITableRow className="hover:bg-muted/20">
      {columns.map((column) => (
        <TableCell key={column.key} className={column.className}>
          {getCellValue(column)}
        </TableCell>
      ))}
      {hasActions && (
        <TableCell className="text-center">
          <div className="flex items-center justify-center gap-1">
            {onView && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView(item)}
                className="h-8 w-8"
                title="View"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(item)}
                className="h-8 w-8"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item)}
                className="h-8 w-8 text-destructive hover:text-destructive"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            {visibleActions.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {visibleActions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => action.onClick(item)}
                      className={
                        action.variant === "destructive" ? "text-destructive" : ""
                      }
                    >
                      {action.icon && <action.icon className="h-4 w-4 ltr:mr-2 rtl:ml-2" />}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </TableCell>
      )}
    </UITableRow>
  );
}
