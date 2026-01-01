import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskStatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant?: "default" | "warning" | "success" | "destructive";
}

const variantStyles = {
  default: {
    card: "",
    icon: "text-muted-foreground",
    value: "text-foreground",
  },
  warning: {
    card: "bg-warning/5 border-warning/20",
    icon: "text-warning",
    value: "text-warning",
  },
  success: {
    card: "bg-success/5 border-success/20",
    icon: "text-success",
    value: "text-foreground",
  },
  destructive: {
    card: "bg-destructive/5 border-destructive/20",
    icon: "text-destructive",
    value: "text-destructive",
  },
};

export function TaskStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
}: TaskStatCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className={cn("border shadow-sm", styles.card)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={cn("text-2xl font-bold", styles.value)}>{value}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <Icon className={cn("h-5 w-5", styles.icon)} />
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskStatCard;
