import { useState, useEffect, useCallback } from "react";
import { SortConfig, PaginationConfig } from "@/components/table/types";

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface UseApiTableOptions {
  endpoint: string;
  initialPage?: number;
  initialPageSize?: number;
  initialSort?: SortConfig;
  autoFetch?: boolean;
}

interface UseApiTableReturn<T> {
  // Data
  data: T[];
  
  // Pagination
  pagination: PaginationConfig;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // Sorting
  sortConfig: SortConfig | undefined;
  handleSort: (key: string) => void;
  
  // Search
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  // State
  isLoading: boolean;
  error: string | null;
  
  // Actions
  refetch: () => Promise<void>;
}

export function useApiTable<T extends Record<string, unknown>>({
  endpoint,
  initialPage = 1,
  initialPageSize = 10,
  initialSort,
  autoFetch = true,
}: UseApiTableOptions): UseApiTableReturn<T> {
  // Data state
  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  
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
  
  // Fetch data from API
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build query params
      const params = new URLSearchParams({
        page: String(currentPage),
        pageSize: String(pageSize),
      });
      
      if (sortConfig) {
        params.append("sortBy", sortConfig.key);
        params.append("sortOrder", sortConfig.direction);
      }
      
      if (searchTerm) {
        params.append("search", searchTerm);
      }
      
      const response = await fetch(`${endpoint}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<T> = await response.json();
      
      setData(result.data);
      setTotalItems(result.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      setData([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, currentPage, pageSize, sortConfig, searchTerm]);
  
  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);
  
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
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // Pagination config object
  const pagination: PaginationConfig = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage: pageSize,
    onPageChange: setPage,
  };
  
  return {
    data,
    pagination,
    setPage,
    setPageSize: handlePageSizeChange,
    sortConfig,
    handleSort,
    searchTerm,
    setSearchTerm: handleSearchChange,
    isLoading,
    error,
    refetch: fetchData,
  };
}
