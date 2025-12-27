import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CheckboxOption {
  id: string;
  label: string;
}

interface FormCheckboxGroupProps {
  label: string;
  name: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  description?: string;
  required?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
}

const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  label,
  name,
  options,
  selectedValues,
  onChange,
  description,
  required = false,
  className,
  columns = 2,
}) => {
  const handleChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionId]);
    } else {
      onChange(selectedValues.filter((v) => v !== optionId));
    }
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  };

  return (
    <div className={cn("space-y-3", className)}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <div className={`grid gap-3 ${gridCols[columns]}`}>
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Checkbox
              id={`${name}-${option.id}`}
              checked={selectedValues.includes(option.id)}
              onCheckedChange={(checked) =>
                handleChange(option.id, checked as boolean)
              }
              className="border-primary data-[state=checked]:bg-primary"
            />
            <Label
              htmlFor={`${name}-${option.id}`}
              className="text-sm font-normal text-foreground cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default FormCheckboxGroup;
