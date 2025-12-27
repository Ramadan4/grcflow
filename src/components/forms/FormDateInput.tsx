import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormDateInputProps {
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
}

const FormDateInput: React.FC<FormDateInputProps> = ({
  label,
  name,
  placeholder,
  description,
  required = false,
  value,
  onChange,
  className,
  disabled = false,
  min,
  max,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type="date"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        min={min}
        max={max}
        className="h-11 border-border bg-background"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default FormDateInput;
