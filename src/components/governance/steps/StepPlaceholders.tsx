import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Placeholder {
  id: string;
  name: string;
  description: string;
  type: "text" | "textarea" | "date" | "email";
  required?: boolean;
  defaultValue?: string;
}

interface StepPlaceholdersProps {
  placeholders?: Placeholder[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
}

const defaultPlaceholders: Placeholder[] = [
  {
    id: "company_name",
    name: "Company Name",
    description: "Your organization's legal name",
    type: "text",
    required: true,
  },
  {
    id: "effective_date",
    name: "Effective Date",
    description: "When this policy takes effect",
    type: "date",
    required: true,
  },
  {
    id: "contact_email",
    name: "Contact Email",
    description: "Email for policy inquiries",
    type: "email",
    required: true,
  },
  {
    id: "department_name",
    name: "Department Name",
    description: "Responsible department",
    type: "text",
    required: false,
  },
  {
    id: "additional_notes",
    name: "Additional Notes",
    description: "Any additional context or notes",
    type: "textarea",
    required: false,
  },
];

const StepPlaceholders = ({
  placeholders = defaultPlaceholders,
  values,
  onChange,
}: StepPlaceholdersProps) => {
  const requiredCount = placeholders.filter((p) => p.required).length;
  const filledRequired = placeholders.filter(
    (p) => p.required && values[p.id]?.trim()
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Fill Placeholders</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Complete the template placeholders with your organization's information
        </p>
      </div>

      {filledRequired < requiredCount && (
        <Alert variant="default" className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            {requiredCount - filledRequired} required field(s) remaining
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {placeholders.map((placeholder) => (
          <div
            key={placeholder.id}
            className={placeholder.type === "textarea" ? "md:col-span-2" : ""}
          >
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                {placeholder.name}
                {placeholder.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </Label>
              <p className="text-xs text-muted-foreground">{placeholder.description}</p>
              
              {placeholder.type === "textarea" ? (
                <Textarea
                  value={values[placeholder.id] || ""}
                  onChange={(e) => onChange(placeholder.id, e.target.value)}
                  placeholder={`Enter ${placeholder.name.toLowerCase()}`}
                  className="min-h-[100px]"
                />
              ) : (
                <Input
                  type={placeholder.type === "date" ? "date" : placeholder.type === "email" ? "email" : "text"}
                  value={values[placeholder.id] || ""}
                  onChange={(e) => onChange(placeholder.id, e.target.value)}
                  placeholder={`Enter ${placeholder.name.toLowerCase()}`}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Progress: {filledRequired}/{requiredCount} required fields
        </p>
        <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(filledRequired / requiredCount) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepPlaceholders;
