import PolicyStatusBadge from "./PolicyStatusBadge";

interface PolicyProgressCardProps {
  currentStep: number;
  totalSteps: number;
  status: "published" | "draft" | "under-review";
}

const PolicyProgressCard = ({ currentStep, totalSteps, status }: PolicyProgressCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Progress</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Step</span>
          <span className="text-sm font-medium text-foreground">{currentStep} of {totalSteps}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <PolicyStatusBadge status={status} />
        </div>
      </div>
    </div>
  );
};

export default PolicyProgressCard;
