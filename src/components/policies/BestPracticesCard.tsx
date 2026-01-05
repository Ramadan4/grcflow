import { LucideIcon } from "lucide-react";

const BestPracticesCard = ({ title, practices }) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">
        {practices.map((practice, index) => {
          const Icon = practice.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground text-sm">{practice.title}</p>
                <p className="text-xs text-muted-foreground">{practice.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestPracticesCard;
