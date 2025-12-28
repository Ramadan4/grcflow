import { ColumnConfig } from "./types";

/**
 * Converts a camelCase or snake_case key to a human-readable header
 */
export function keyToHeader(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Auto-generates column configurations from data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateColumnsFromData<T extends Record<string, any>>(
  data: T[],
  options: {
    excludeColumns?: string[];
    columnLabels?: Record<string, string>;
  } = {}
): ColumnConfig<T>[] {
  const { excludeColumns = [], columnLabels = {} } = options;
  
  if (!data || data.length === 0) {
    return [];
  }
  
  const firstItem = data[0];
  const keys = Object.keys(firstItem).filter(
    (key) => !excludeColumns.includes(key)
  );
  
  return keys.map((key) => ({
    key,
    header: columnLabels[key] || keyToHeader(key),
    sortable: true,
  }));
}

/**
 * Sorts data based on sort configuration
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortData<T extends Record<string, any>>(
  data: T[],
  sortKey: string,
  direction: "asc" | "desc"
): T[] {
  return [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    let comparison = 0;
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      comparison = aValue - bValue;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }
    
    return direction === "asc" ? comparison : -comparison;
  });
}

/**
 * Paginates data locally
 */
export function paginateData<T>(
  data: T[],
  page: number,
  itemsPerPage: number
): T[] {
  const start = (page - 1) * itemsPerPage;
  return data.slice(start, start + itemsPerPage);
}

/**
 * Filters data based on search term
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterData<T extends Record<string, any>>(
  data: T[],
  searchTerm: string,
  searchKeys?: string[]
): T[] {
  if (!searchTerm) return data;
  
  const term = searchTerm.toLowerCase();
  
  return data.filter((item) => {
    const keysToSearch = searchKeys || Object.keys(item);
    
    return keysToSearch.some((key) => {
      const value = item[key];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(term);
    });
  });
}
