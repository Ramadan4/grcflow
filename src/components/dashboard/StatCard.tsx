import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  badge?: {
    text: string;
    variant: "success" | "warning" | "danger" | "info";
  };
  subtitle?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
  badge,
  subtitle 
}: StatCardProps) {
  const badgeColors = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-destructive/10 text-destructive",
    info: "bg-info/10 text-info",
  };

  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">{value}</span>
              {badge && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  badgeColors[badge.variant]
                )}>
                  {badge.text}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className={cn("p-2.5 rounded-lg", iconBgColor)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
