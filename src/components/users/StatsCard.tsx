import React from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  valueColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
  valueColor,
}) => {
  return (
    <Card className="p-4">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold ${valueColor || iconColor || "text-foreground"}`}>
          {value}
        </p>
      </div>
      {Icon && (
        <div className={`p-3 rounded-xl ${iconBgColor} mt-2`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      )}
    </Card>
  );
};
