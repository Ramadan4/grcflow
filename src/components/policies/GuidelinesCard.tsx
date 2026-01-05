import { cn } from "@/lib/utils";

const GuidelinesCard = ({ title, items, className = "" }) => {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5", className)}>
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuidelinesCard;
