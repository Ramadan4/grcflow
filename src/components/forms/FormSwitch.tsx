import { LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface FormSwitchProps {
  icon?: LucideIcon;
  label: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const FormSwitch = ({
  icon: Icon,
  label,
  description,
  checked = false,
  onChange,
  className,
  disabled = false,
}: FormSwitchProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border border-border bg-background p-4",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} disabled={disabled} />
    </div>
  );
};

export default FormSwitch;
