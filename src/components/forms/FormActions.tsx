import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

const FormActions = ({
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  onSubmit,
  onCancel,
  isLoading = false,
  className,
}: FormActionsProps) => {
  return (
    <div className={cn("flex items-center justify-end gap-3 pt-6", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="h-11 px-6"
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={isLoading}
        className="h-11 px-6"
      >
        {isLoading ? "Loading..." : submitLabel}
      </Button>
    </div>
  );
};

export default FormActions;
