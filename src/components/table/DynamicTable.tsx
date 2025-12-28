import React, { useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { DynamicTableHeader } from "./TableHeader";
import { DynamicTableRow } from "./TableRow";
import { DynamicTablePagination } from "./TablePagination";
import { TableEmpty } from "./TableEmpty";
import { TableLoading } from "./TableLoading";
import { TableError } from "./TableError";
import { DynamicTableProps, ColumnConfig } from "./types";
import { generateColumnsFromData } from "./utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DynamicTable<T extends Record<string, any>>({
  // Data
  data,
  columns: propColumns,
  
  // Key extraction
  keyExtractor,
  idField = "id",
  
  // Actions
  actions,
  onEdit,
  onView,
  onDelete,
  
  // Pagination
  pagination,
  
  // Sorting
  sortConfig,
  onSort,
  
  // State
  isLoading = false,
  error = null,
  
  // Customization
  emptyMessage = "No data available",
  itemLabel = "items",
  actionsLabel = "Actions",
  className = "",
  
  // Auto-generate columns
  autoGenerateColumns = false,
  excludeColumns = ["id"],
  columnLabels = {},
}: DynamicTableProps<T>) {
  // Generate or use provided columns
  const columns: ColumnConfig<T>[] = useMemo(() => {
    if (propColumns && propColumns.length > 0) {
      return propColumns;
    }
    
    if (autoGenerateColumns && data.length > 0) {
      return generateColumnsFromData(data, { excludeColumns, columnLabels });
    }
    
    return [];
  }, [propColumns, autoGenerateColumns, data, excludeColumns, columnLabels]);
  
  // Determine if we have actions
  const hasActions = Boolean(actions?.length || onEdit || onView || onDelete);
  
  // Calculate column span for empty/loading/error states
  const colSpan = columns.length + (hasActions ? 1 : 0);
  
  // Get key for each item
  const getKey = (item: T, index: number): string => {
    if (keyExtractor) {
      return keyExtractor(item);
    }
    const id = item[idField];
    return id !== undefined && id !== null ? String(id) : String(index);
  };

  return (
    <div className={`bg-card rounded-lg border border-border overflow-hidden ${className}`}>
      <Table>
        <DynamicTableHeader
          columns={columns}
          hasActions={hasActions}
          actionsLabel={actionsLabel}
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <TableBody>
          {isLoading ? (
            <TableLoading colSpan={colSpan} />
          ) : error ? (
            <TableError colSpan={colSpan} message={error} />
          ) : data.length === 0 ? (
            <TableEmpty colSpan={colSpan} message={emptyMessage} />
          ) : (
            data.map((item, index) => (
              <DynamicTableRow
                key={getKey(item, index)}
                item={item}
                columns={columns}
                actions={actions}
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
                hasActions={hasActions}
              />
            ))
          )}
        </TableBody>
      </Table>
      
      {pagination && !isLoading && !error && data.length > 0 && (
        <DynamicTablePagination {...pagination} itemLabel={itemLabel} />
      )}
    </div>
  );
}
