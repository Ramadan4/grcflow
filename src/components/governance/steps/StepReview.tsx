import { useState } from "react";
import { User, Plus, X, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Reviewer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "pending" | "approved" | "rejected" | "changes-requested";
  comment?: string;
  reviewedAt?: string;
}

interface StepReviewProps {
  reviewers: Reviewer[];
  onAddReviewer: (email: string) => void;
  onRemoveReviewer: (id: string) => void;
  comments: string;
  onCommentsChange: (comments: string) => void;
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-muted text-muted-foreground" },
  approved: { label: "Approved", icon: CheckCircle, className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  rejected: { label: "Rejected", icon: AlertCircle, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  "changes-requested": { label: "Changes Requested", icon: AlertCircle, className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
};

const StepReview = ({
  reviewers,
  onAddReviewer,
  onRemoveReviewer,
  comments,
  onCommentsChange,
}: StepReviewProps) => {
  const [newReviewerEmail, setNewReviewerEmail] = useState("");

  const handleAddReviewer = () => {
    if (newReviewerEmail.trim()) {
      onAddReviewer(newReviewerEmail.trim());
      setNewReviewerEmail("");
    }
  };

  const approvedCount = reviewers.filter((r) => r.status === "approved").length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Internal Review</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add reviewers and manage the internal review process
        </p>
      </div>

      {/* Add Reviewer */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter reviewer email"
          value={newReviewerEmail}
          onChange={(e) => setNewReviewerEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddReviewer()}
          className="flex-1"
        />
        <Button onClick={handleAddReviewer} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Reviewer
        </Button>
      </div>

      {/* Reviewers List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">
            Reviewers ({reviewers.length})
          </h4>
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            {approvedCount}/{reviewers.length} Approved
          </Badge>
        </div>

        {reviewers.length === 0 ? (
          <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">
            <User className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No reviewers added yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {reviewers.map((reviewer) => {
              const status = statusConfig[reviewer.status];
              const StatusIcon = status.icon;
              
              return (
                <div
                  key={reviewer.id}
                  className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={reviewer.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {reviewer.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{reviewer.name}</p>
                      <p className="text-xs text-muted-foreground">{reviewer.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={cn("gap-1", status.className)}>
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => onRemoveReviewer(reviewer.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Comments */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Review Notes</h4>
        <Textarea
          value={comments}
          onChange={(e) => onCommentsChange(e.target.value)}
          placeholder="Add any notes or context for the reviewers..."
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default StepReview;
