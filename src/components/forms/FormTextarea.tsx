import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  rows?: number;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder,
  description,
  required = false,
  value,
  onChange,
  className,
  disabled = false,
  rows = 4,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        rows={rows}
        className="border-border bg-background resize-none"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default FormTextarea;
