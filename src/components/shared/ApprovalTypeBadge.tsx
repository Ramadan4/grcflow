import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ApprovalTypeBadgeProps {
  type: string;
  className?: string;
}

export const ApprovalTypeBadge: React.FC<ApprovalTypeBadgeProps> = ({
  type,
  className,
}) => {
  return (
    <Badge
      variant="outline"
      className={cn("font-normal bg-background", className)}
    >
      {type}
    </Badge>
  );
};
