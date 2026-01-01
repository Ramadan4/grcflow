import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium",
        "bg-muted text-muted-foreground border border-border"
      )}
    >
      {category}
    </span>
  );
}

export default CategoryBadge;
