import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface RoleStatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

const RoleStatCard = ({
  label,
  value,
  icon: Icon,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
  className,
}: RoleStatCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          iconBgColor
        )}
      >
        <Icon className={cn("h-6 w-6", iconColor)} />
      </div>
    </div>
  );
};

export default RoleStatCard;
