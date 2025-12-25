import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFileUploadProps {
  label: string;
  name: string;
  accept?: string;
  description?: string;
  required?: boolean;
  onChange?: (file: File | null) => void;
  className?: string;
}

const FormFileUpload = ({
  label,
  name,
  accept = "image/*",
  description,
  required = false,
  onChange,
  className,
}: FormFileUploadProps) => {
  const [fileName, setFileName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
    onChange?.(file);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <div className="flex gap-3">
        <div className="flex h-11 flex-1 items-center rounded-lg border border-border bg-background px-3">
          <span className="text-sm text-muted-foreground">
            {fileName || "No file chosen"}
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="h-11 gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default FormFileUpload;
