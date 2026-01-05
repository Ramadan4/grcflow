import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PolicyStatCard = ({ title, value, icon: Icon, variant = "default" }) => {
  const variants = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", variants[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default PolicyStatCard;
