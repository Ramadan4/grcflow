import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButton {
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "outline" | "action" | "create";
  onClick?: () => void;
}

interface PageHeaderProps {
  icon?: LucideIcon;
  iconBgColor?: string;
  title: string;
  description: string;
  actions?: ActionButton[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon: Icon,
  iconBgColor = "bg-primary/10",
  title,
  description,
  actions = [],
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`p-3 rounded-xl ${iconBgColor}`}>
            <Icon className="h-8 w-8 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {actions.length > 0 && (
        <div className="flex items-center gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "action"}
              onClick={action.onClick}
              className="gap-2"
            >
              {action.icon && <action.icon className="h-4 w-4" />}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
