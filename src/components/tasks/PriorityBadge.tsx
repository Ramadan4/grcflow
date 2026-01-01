import { cn } from "@/lib/utils";

type Priority = "high" | "medium" | "low";

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: {
    label: "high",
    className: "bg-destructive/10 text-destructive border border-destructive/20",
  },
  medium: {
    label: "medium",
    className: "bg-warning/10 text-warning border border-warning/20",
  },
  low: {
    label: "low",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

export default PriorityBadge;
