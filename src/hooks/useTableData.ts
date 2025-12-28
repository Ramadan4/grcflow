import { useState, useCallback, useMemo } from "react";
import { SortConfig } from "@/components/table/types";
import { sortData, paginateData, filterData } from "@/components/table/utils";

interface UseTableDataOptions<T> {
  data: T[];
  initialPage?: number;
  initialPageSize?: number;
  initialSort?: SortConfig;
  searchKeys?: string[];
}

interface UseTableDataReturn<T> {
  // Processed data
  processedData: T[];
  paginatedData: T[];
  
  // Pagination
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // Sorting
  sortConfig: SortConfig | undefined;
  handleSort: (key: string) => void;
  
  // Search/Filter
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useTableData<T extends Record<string, any>>({
  data,
  initialPage = 1,
  initialPageSize = 10,
  initialSort,
  searchKeys,
}: UseTableDataOptions<T>): UseTableDataReturn<T> {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Sort state
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>(initialSort);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  
  // Loading/Error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle sorting
  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
    setCurrentPage(1);
  }, []);
  
  // Handle page change
  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);
  
  // Handle page size change
  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);
  
  // Handle search change
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);
  
  // Process data (filter + sort)
  const processedData = useMemo(() => {
    let result = data;
    
    // Apply search filter
    if (searchTerm) {
      result = filterData(result, searchTerm, searchKeys);
    }
    
    // Apply sorting
    if (sortConfig) {
      result = sortData(result, sortConfig.key, sortConfig.direction);
    }
    
    return result;
  }, [data, searchTerm, searchKeys, sortConfig]);
  
  // Calculate pagination
  const totalItems = processedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // Paginate data
  const paginatedData = useMemo(() => {
    return paginateData(processedData, currentPage, pageSize);
  }, [processedData, currentPage, pageSize]);
  
  return {
    processedData,
    paginatedData,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    setPage,
    setPageSize: handlePageSizeChange,
    sortConfig,
    handleSort,
    searchTerm,
    setSearchTerm: handleSearchChange,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}
