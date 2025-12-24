import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "active" | "suspended" | "pending" | "inactive";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  active: "bg-success text-success-foreground",
  suspended: "bg-suspended text-suspended-foreground",
  pending: "bg-pending text-pending-foreground",
  inactive: "bg-muted text-muted-foreground",
};

const statusLabels: Record<StatusType, string> = {
  active: "Active",
  suspended: "Suspended",
  pending: "Pending",
  inactive: "Inactive",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <Badge className={cn(statusStyles[status], "font-medium", className)}>
      {statusLabels[status]}
    </Badge>
  );
};
