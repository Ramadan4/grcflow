import { LucideIcon, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PolicyCard = ({ 
  icon: Icon, 
  title, 
  description, 
  settings = [], 
  enabled = true, 
  onToggle,
  onEdit,
  iconVariant = "primary" 
}) => {
  const iconVariants = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", iconVariants[iconVariant])}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={enabled} onCheckedChange={onToggle} />
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-2 gap-3">
        {settings.map((setting, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">{setting.label}</span>
            {setting.badge ? (
              <span className={cn(
                "rounded-md px-2 py-0.5 text-xs font-medium",
                setting.badgeVariant === "muted" 
                  ? "bg-muted text-muted-foreground" 
                  : "bg-primary/10 text-primary"
              )}>
                {setting.value}
              </span>
            ) : (
              <span className="text-sm font-medium text-foreground">{setting.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyCard;
