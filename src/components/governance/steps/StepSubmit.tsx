import { CheckCircle, FileText, Users, Calendar, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface PolicySummary {
  title: string;
  category: string;
  department: string;
  owner: string;
  effectiveDate: string;
  frameworks: string[];
  reviewersCount: number;
  approvedCount: number;
}

interface StepSubmitProps {
  summary: PolicySummary;
  agreements: {
    reviewed: boolean;
    accurate: boolean;
    authorized: boolean;
  };
  onAgreementChange: (key: string, value: boolean) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const StepSubmit = ({
  summary,
  agreements,
  onAgreementChange,
  onSubmit,
  isSubmitting = false,
}: StepSubmitProps) => {
  const allAgreed = agreements.reviewed && agreements.accurate && agreements.authorized;
  const allApproved = summary.approvedCount >= summary.reviewersCount && summary.reviewersCount > 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Submit Policy</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Review the policy summary and submit for final approval
        </p>
      </div>

      {/* Summary Card */}
      <div className="p-6 bg-muted/30 rounded-xl border border-border space-y-4">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Policy Summary
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Policy Title</p>
            <p className="text-sm font-medium text-foreground">{summary.title || "—"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Category</p>
            <p className="text-sm font-medium text-foreground">{summary.category || "—"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Department</p>
            <p className="text-sm font-medium text-foreground">{summary.department || "—"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Policy Owner</p>
            <p className="text-sm font-medium text-foreground">{summary.owner || "—"}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Effective Date</p>
            <p className="text-sm font-medium text-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {summary.effectiveDate || "Not set"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Frameworks</p>
            <div className="flex flex-wrap gap-1">
              {summary.frameworks.length > 0 ? (
                summary.frameworks.map((framework) => (
                  <span
                    key={framework}
                    className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {framework}
                  </span>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">None selected</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Review Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Review Status</span>
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            allApproved ? "text-green-600" : "text-amber-600"
          )}>
            {allApproved ? (
              <>
                <CheckCircle className="h-4 w-4" />
                All Approved
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                {summary.approvedCount}/{summary.reviewersCount} Approved
              </>
            )}
          </div>
        </div>
      </div>

      {/* Agreements */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Submission Agreements
        </h4>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
            <Checkbox
              id="reviewed"
              checked={agreements.reviewed}
              onCheckedChange={(checked) => onAgreementChange("reviewed", checked as boolean)}
            />
            <Label htmlFor="reviewed" className="text-sm text-foreground cursor-pointer">
              I have reviewed the complete policy content and all placeholders have been filled correctly
            </Label>
          </div>

          <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
            <Checkbox
              id="accurate"
              checked={agreements.accurate}
              onCheckedChange={(checked) => onAgreementChange("accurate", checked as boolean)}
            />
            <Label htmlFor="accurate" className="text-sm text-foreground cursor-pointer">
              All information provided is accurate and complies with organizational standards
            </Label>
          </div>

          <div className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border">
            <Checkbox
              id="authorized"
              checked={agreements.authorized}
              onCheckedChange={(checked) => onAgreementChange("authorized", checked as boolean)}
            />
            <Label htmlFor="authorized" className="text-sm text-foreground cursor-pointer">
              I am authorized to submit this policy for publication
            </Label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button
          size="lg"
          disabled={!allAgreed || isSubmitting}
          onClick={onSubmit}
          className="gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Submit Policy
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepSubmit;
