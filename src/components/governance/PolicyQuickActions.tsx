import { Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PolicyQuickActionsProps {
  onSaveDraft?: () => void;
  onPreview?: () => void;
}

const PolicyQuickActions = ({ onSaveDraft, onPreview }: PolicyQuickActionsProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={onSaveDraft}
        >
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2"
          onClick={onPreview}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>
    </div>
  );
};

export default PolicyQuickActions;
