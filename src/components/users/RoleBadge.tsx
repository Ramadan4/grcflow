import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RoleType = "admin" | "security-officer" | "risk-manager" | "compliance-officer" | "auditor" | "user";

interface RoleBadgeProps {
  role: RoleType;
  className?: string;
}

const roleStyles: Record<RoleType, string> = {
  admin: "bg-primary text-primary-foreground",
  "security-officer": "bg-info text-info-foreground",
  "risk-manager": "bg-purple text-white",
  "compliance-officer": "bg-purple text-white",
  auditor: "bg-info text-info-foreground",
  user: "bg-muted text-muted-foreground",
};

const roleLabels: Record<RoleType, string> = {
  admin: "Admin",
  "security-officer": "Security Officer",
  "risk-manager": "Risk Manager",
  "compliance-officer": "Compliance Officer",
  auditor: "Auditor",
  user: "User",
};

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className }) => {
  return (
    <Badge className={cn(roleStyles[role], "font-medium", className)}>
      {roleLabels[role]}
    </Badge>
  );
};
