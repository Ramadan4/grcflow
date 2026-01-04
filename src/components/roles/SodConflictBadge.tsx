import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface SodConflictBadgeProps {
  conflicts: number;
  className?: string;
}

const SodConflictBadge = ({ conflicts, className }: SodConflictBadgeProps) => {
  if (conflicts === 0) {
    return (
      <span className={cn("text-sm text-success font-medium", className)}>
        No conflicts
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-destructive px-2.5 py-1 text-xs font-medium text-destructive-foreground",
        className
      )}
    >
      <AlertTriangle className="h-3 w-3" />
      {conflicts} conflicts
    </span>
  );
};

export default SodConflictBadge;
