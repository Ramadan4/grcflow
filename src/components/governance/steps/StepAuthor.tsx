import { useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link, Image, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface StepAuthorProps {
  content: string;
  onChange: (content: string) => void;
}

const toolbarButtons = [
  { icon: Heading1, label: "Heading 1", action: "h1" },
  { icon: Heading2, label: "Heading 2", action: "h2" },
  { type: "separator" },
  { icon: Bold, label: "Bold", action: "bold" },
  { icon: Italic, label: "Italic", action: "italic" },
  { icon: Underline, label: "Underline", action: "underline" },
  { type: "separator" },
  { icon: List, label: "Bullet List", action: "ul" },
  { icon: ListOrdered, label: "Numbered List", action: "ol" },
  { type: "separator" },
  { icon: AlignLeft, label: "Align Left", action: "left" },
  { icon: AlignCenter, label: "Align Center", action: "center" },
  { icon: AlignRight, label: "Align Right", action: "right" },
  { type: "separator" },
  { icon: Link, label: "Insert Link", action: "link" },
  { icon: Image, label: "Insert Image", action: "image" },
];

const StepAuthor = ({ content, onChange }: StepAuthorProps) => {
  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  const handleToolbarClick = (action: string) => {
    // Toggle active state for formatting buttons
    if (["bold", "italic", "underline", "left", "center", "right"].includes(action)) {
      setActiveFormats((prev) =>
        prev.includes(action)
          ? prev.filter((f) => f !== action)
          : [...prev, action]
      );
    }
    
    // In a real implementation, this would apply formatting to the content
    console.log("Toolbar action:", action);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Author Policy</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Write or edit the policy content using the editor below
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-muted/50 rounded-lg border border-border">
        {toolbarButtons.map((btn, index) => {
          if (btn.type === "separator") {
            return <Separator key={index} orientation="vertical" className="h-6 mx-1" />;
          }
          const Icon = btn.icon!;
          return (
            <Button
              key={btn.action}
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                activeFormats.includes(btn.action!) && "bg-primary/10 text-primary"
              )}
              onClick={() => handleToolbarClick(btn.action!)}
              title={btn.label}
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>

      {/* Editor */}
      <div className="relative">
        <Textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start writing your policy content here...

You can include:
• Policy objectives and scope
• Roles and responsibilities
• Procedures and guidelines
• Compliance requirements
• Enforcement and penalties"
          className="min-h-[400px] font-mono text-sm resize-none"
        />
        
        {/* Word count */}
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
          {content.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">Writing Tips</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Use clear and concise language</li>
          <li>• Define all technical terms</li>
          <li>• Include specific procedures and steps</li>
          <li>• Reference related policies where applicable</li>
        </ul>
      </div>
    </div>
  );
};

export default StepAuthor;
