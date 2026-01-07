import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormDateInput } from "@/components/forms";
import { FrameworkCheckbox, TagInput } from "@/components/governance";

interface SelectOption {
  value: string;
  label: string;
}

interface Framework {
  id: string;
  label: string;
}

interface StepMetadataProps {
  formData: {
    title: string;
    category: string;
    department: string;
    owner: string;
    language: string;
    effectiveDate: string;
    reviewCycle: string;
  };
  onInputChange: (field: string, value: string) => void;
  categories: SelectOption[];
  departments: SelectOption[];
  owners: SelectOption[];
  languages: SelectOption[];
  frameworks: Framework[];
  selectedFrameworks: string[];
  onFrameworksChange: (frameworks: string[]) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const StepMetadata = ({
  formData,
  onInputChange,
  categories,
  departments,
  owners,
  languages,
  frameworks,
  selectedFrameworks,
  onFrameworksChange,
  tags,
  onTagsChange,
}: StepMetadataProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Policy Metadata</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Policy Title"
          name="title"
          required
          placeholder="Enter policy title"
          value={formData.title}
          onChange={(v) => onInputChange("title", v)}
        />

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.category} onValueChange={(v) => onInputChange("category", v)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Department <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.department} onValueChange={(v) => onInputChange("department", v)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Policy Owner <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.owner} onValueChange={(v) => onInputChange("owner", v)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select owner" />
            </SelectTrigger>
            <SelectContent>
              {owners.map(owner => (
                <SelectItem key={owner.value} value={owner.value}>{owner.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Language <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.language} onValueChange={(v) => onInputChange("language", v)}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <FormDateInput
          label="Effective Date"
          name="effectiveDate"
          value={formData.effectiveDate}
          onChange={(v) => onInputChange("effectiveDate", v)}
        />
      </div>

      <FormField
        label="Review Cycle (Months)"
        name="reviewCycle"
        type="number"
        placeholder="12"
        value={formData.reviewCycle}
        onChange={(v) => onInputChange("reviewCycle", v)}
      />

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Frameworks <span className="text-destructive">*</span>
        </Label>
        <FrameworkCheckbox
          frameworks={frameworks}
          selectedFrameworks={selectedFrameworks}
          onChange={onFrameworksChange}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Tags (Max 15)
        </Label>
        <TagInput
          tags={tags}
          onChange={onTagsChange}
          maxTags={15}
          placeholder="Add tag"
        />
      </div>
    </div>
  );
};

export default StepMetadata;
