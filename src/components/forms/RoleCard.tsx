import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  id: string;
  name: string;
  description: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const RoleCard = ({
  id,
  name,
  description,
  checked = false,
  onChange,
  className,
  disabled = false,
}: RoleCardProps) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors",
        checked
          ? "border-primary bg-primary/5"
          : "border-border bg-background hover:border-primary/50",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className="mt-0.5"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </label>
  );
};

export default RoleCard;
