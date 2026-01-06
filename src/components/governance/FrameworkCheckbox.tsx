import { cn } from "@/lib/utils";

interface Framework {
  id: string;
  label: string;
}

interface FrameworkCheckboxProps {
  frameworks: Framework[];
  selectedFrameworks: string[];
  onChange: (selected: string[]) => void;
}

const FrameworkCheckbox = ({ frameworks, selectedFrameworks, onChange }: FrameworkCheckboxProps) => {
  const toggleFramework = (id: string) => {
    if (selectedFrameworks.includes(id)) {
      onChange(selectedFrameworks.filter(f => f !== id));
    } else {
      onChange([...selectedFrameworks, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {frameworks.map((framework) => {
        const isSelected = selectedFrameworks.includes(framework.id);
        return (
          <button
            key={framework.id}
            type="button"
            onClick={() => toggleFramework(framework.id)}
            className={cn(
              "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              isSelected
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/50"
            )}
          >
            {framework.label}
          </button>
        );
      })}
    </div>
  );
};

export default FrameworkCheckbox;
