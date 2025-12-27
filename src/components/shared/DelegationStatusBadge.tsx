import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type DelegationStatusType = "active" | "scheduled" | "expired" | "revoked";

interface DelegationStatusBadgeProps {
  status: DelegationStatusType;
  className?: string;
}

const statusStyles: Record<DelegationStatusType, string> = {
  active: "bg-success text-success-foreground",
  scheduled: "bg-info text-info-foreground",
  expired: "bg-muted text-muted-foreground",
  revoked: "bg-destructive text-destructive-foreground",
};

const statusLabels: Record<DelegationStatusType, string> = {
  active: "Active",
  scheduled: "Scheduled",
  expired: "Expired",
  revoked: "Revoked",
};

export const DelegationStatusBadge: React.FC<DelegationStatusBadgeProps> = ({
  status,
  className,
}) => {
  return (
    <Badge className={cn(statusStyles[status], "font-medium", className)}>
      {statusLabels[status]}
    </Badge>
  );
};
