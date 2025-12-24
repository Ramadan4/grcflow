import React from "react";
import { cn } from "@/lib/utils";

interface SecurityBadgeProps {
  mfaEnabled: boolean;
  className?: string;
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({ mfaEnabled, className }) => {
  return (
    <span
      className={cn(
        "flex items-center gap-1 text-sm font-medium",
        mfaEnabled ? "text-success" : "text-muted-foreground",
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full", mfaEnabled ? "bg-success" : "bg-muted-foreground")} />
      {mfaEnabled ? "MFA Enabled" : "No MFA"}
    </span>
  );
};
