import { cn } from "@/lib/utils";
import { Clock, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";

type TaskStatus = "pending" | "in_progress" | "completed" | "overdue";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<TaskStatus, { label: string; icon: typeof Clock; className: string }> = {
  pending: {
    label: "pending",
    icon: Clock,
    className: "bg-muted text-muted-foreground border border-border",
  },
  in_progress: {
    label: "in progress",
    icon: RefreshCw,
    className: "bg-primary text-primary-foreground",
  },
  completed: {
    label: "completed",
    icon: CheckCircle,
    className: "bg-success text-success-foreground",
  },
  overdue: {
    label: "overdue",
    icon: AlertTriangle,
    className: "bg-destructive text-destructive-foreground",
  },
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

export default TaskStatusBadge;
