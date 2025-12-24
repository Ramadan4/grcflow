import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchAndFiltersProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: {
    name: string;
    placeholder: string;
    options: FilterOption[];
    value?: string;
    onChange?: (value: string) => void;
  }[];
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  filters = [],
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {filters.map((filter) => (
          <Select
            key={filter.name}
            value={filter.value}
            onValueChange={filter.onChange}
          >
            <SelectTrigger className="w-[140px] bg-card border-border">
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
    </div>
  );
};
