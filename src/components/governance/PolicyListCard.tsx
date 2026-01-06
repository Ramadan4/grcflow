import { FileText, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PolicyStatusBadge from "./PolicyStatusBadge";

interface PolicyData {
  id: string;
  title: string;
  status: "published" | "draft" | "under-review";
  version: string;
  category: string;
  framework: string;
  department: string;
  owner: string;
  effectiveDate: string;
  lastReview: string;
}

interface PolicyListCardProps {
  policy: PolicyData;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const PolicyListCard = ({ policy, onView, onEdit, onDelete }: PolicyListCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{policy.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <PolicyStatusBadge status={policy.status} />
              <span className="text-sm text-muted-foreground">{policy.version}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => onView?.(policy.id)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit?.(policy.id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete?.(policy.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Category</p>
          <p className="text-sm font-medium text-foreground">{policy.category}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Framework</p>
          <p className="text-sm font-medium text-foreground">{policy.framework}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Department</p>
          <p className="text-sm font-medium text-foreground">{policy.department}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Owner</p>
          <p className="text-sm font-medium text-foreground">{policy.owner}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Effective Date</p>
          <p className="text-sm font-medium text-foreground">{policy.effectiveDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Last Review</p>
          <p className="text-sm font-medium text-foreground">{policy.lastReview}</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyListCard;
