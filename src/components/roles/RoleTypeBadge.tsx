import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RoleTypeValue = "system" | "custom";

interface RoleTypeBadgeProps {
  type: RoleTypeValue;
  className?: string;
}

const typeStyles: Record<RoleTypeValue, string> = {
  system: "bg-primary text-primary-foreground",
  custom: "bg-success text-success-foreground",
};

const typeLabels: Record<RoleTypeValue, string> = {
  system: "System",
  custom: "Custom",
};

const RoleTypeBadge = ({ type, className }: RoleTypeBadgeProps) => {
  return (
    <Badge className={cn(typeStyles[type], "font-medium", className)}>
      {typeLabels[type]}
    </Badge>
  );
};

export default RoleTypeBadge;
