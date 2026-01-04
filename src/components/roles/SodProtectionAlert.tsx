import { AlertTriangle } from "lucide-react";

interface SodProtectionAlertProps {
  title?: string;
  description?: string;
}

const SodProtectionAlert = ({
  title = "Segregation of Duties (SoD) Protection",
  description = "The system automatically detects conflicting role assignments. Users cannot be assigned roles that violate SoD rules (e.g., Risk Creator + Risk Approver).",
}: SodProtectionAlertProps) => {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning-light p-4">
      <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default SodProtectionAlert;
