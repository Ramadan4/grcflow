// ============= Table Types =============

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ColumnConfig<T = any> {
  key: string;
  header: string;
  render?: (value: unknown, item: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
  width?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ActionConfig<T = any> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (item: T) => void;
  variant?: "default" | "destructive";
  show?: (item: T) => boolean;
}

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface TableState {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DynamicTableProps<T = any> {
  // Data
  data: T[];
  columns?: ColumnConfig<T>[];
  
  // Key extraction
  keyExtractor?: (item: T) => string;
  idField?: string;
  
  // Actions
  actions?: ActionConfig<T>[];
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  onDelete?: (item: T) => void;
  
  // Pagination
  pagination?: PaginationConfig;
  
  // Sorting
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  
  // State
  isLoading?: boolean;
  error?: string | null;
  
  // Customization
  emptyMessage?: string;
  itemLabel?: string;
  actionsLabel?: string;
  className?: string;
  
  // Auto-generate columns from data
  autoGenerateColumns?: boolean;
  excludeColumns?: string[];
  columnLabels?: Record<string, string>;
}
