import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface PolicyStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const PolicyStepper = ({ steps, currentStep, onStepClick }: PolicyStepperProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick?.(step.id)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-primary text-primary-foreground",
                  !isCompleted && !isCurrent && "border-2 border-border bg-card text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : step.id}
              </button>
              <div className="mt-2 text-center">
                <p className={cn(
                  "text-sm font-medium",
                  isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </div>

            {/* Connector Line */}
            {!isLast && (
              <div className={cn(
                "flex-1 h-0.5 mx-4 mt-[-24px]",
                isCompleted ? "bg-primary" : "bg-border"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PolicyStepper;
