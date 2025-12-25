import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({ icon: Icon, title, description, children, className }: FormSectionProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default FormSection;
