import { useState } from "react";
import { FileText, Plus, Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  isPopular?: boolean;
}

interface StepTemplateSelectionProps {
  templates?: Template[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string | null) => void;
}

const defaultTemplates: Template[] = [
  {
    id: "blank",
    name: "Blank Policy",
    description: "Start from scratch with a blank document",
    category: "General",
  },
  {
    id: "data-protection",
    name: "Data Protection Policy",
    description: "Comprehensive data protection and privacy policy template",
    category: "Privacy",
    isPopular: true,
  },
  {
    id: "access-control",
    name: "Access Control Policy",
    description: "Define access control rules and procedures",
    category: "Security",
    isPopular: true,
  },
  {
    id: "incident-response",
    name: "Incident Response Policy",
    description: "Guidelines for handling security incidents",
    category: "Security",
  },
  {
    id: "acceptable-use",
    name: "Acceptable Use Policy",
    description: "Define acceptable use of company resources",
    category: "Compliance",
    isPopular: true,
  },
  {
    id: "password-policy",
    name: "Password Policy",
    description: "Password requirements and management guidelines",
    category: "Security",
  },
];

const StepTemplateSelection = ({
  templates = defaultTemplates,
  selectedTemplate,
  onSelectTemplate,
}: StepTemplateSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "popular">("all");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "popular" && template.isPopular);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Template Selection</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a template to start with or create a blank policy
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "popular" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("popular")}
            className="gap-1"
          >
            <Star className="h-3 w-3" />
            Popular
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={cn(
              "relative p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md",
              selectedTemplate === template.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            {template.isPopular && (
              <div className="absolute top-2 right-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                template.id === "blank" 
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/10 text-primary"
              )}>
                {template.id === "blank" ? (
                  <Plus className="h-5 w-5" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{template.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {template.description}
                </p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {template.category}
                </span>
              </div>
            </div>

            {selectedTemplate === template.id && (
              <div className="absolute inset-0 rounded-xl ring-2 ring-primary pointer-events-none" />
            )}
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <Copy className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No templates found</p>
        </div>
      )}
    </div>
  );
};

export default StepTemplateSelection;
