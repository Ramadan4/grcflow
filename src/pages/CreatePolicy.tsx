import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSection, FormField, FormDateInput } from "@/components/forms";
import {
  PolicyStepper,
  PolicyProgressCard,
  PolicyQuickActions,
  PolicyHelpCard,
  FrameworkCheckbox,
  TagInput,
} from "@/components/governance";

const stepsConfig = [
  { id: 1, title: "Policy Metadata", description: "Basic information" },
  { id: 2, title: "Template Selection", description: "Select or create blank" },
  { id: 3, title: "Fill Placeholders", description: "Fill template values" },
  { id: 4, title: "Author", description: "Edit policy body" },
  { id: 5, title: "Internal review", description: "Internal Review" },
  { id: 6, title: "Submit", description: "Final submission" },
];

const frameworksConfig = [
  { id: "gdpr", label: "GDPR" },
  { id: "iso27001", label: "ISO 27001" },
  { id: "nist", label: "NIST" },
  { id: "soc2", label: "SOC 2" },
  { id: "hipaa", label: "HIPAA" },
];

const categoriesConfig = [
  { value: "privacy", label: "Privacy" },
  { value: "security", label: "Security" },
  { value: "compliance", label: "Compliance" },
  { value: "hr", label: "HR" },
];

const departmentsConfig = [
  { value: "legal", label: "Legal" },
  { value: "it", label: "IT Security" },
  { value: "hr", label: "HR" },
  { value: "finance", label: "Finance" },
];

const ownersConfig = [
  { value: "jane", label: "Jane Smith" },
  { value: "john", label: "John Doe" },
  { value: "sarah", label: "Sarah Johnson" },
];

const languagesConfig = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
];

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    department: "",
    owner: "",
    language: "en",
    effectiveDate: "",
    reviewCycle: "12",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < stepsConfig.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Create Policy</h1>
            <p className="text-sm text-muted-foreground">Policy List</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Save className="h-4 w-4" />
          Save Draft
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stepper */}
          <div className="rounded-xl border border-border bg-card p-6">
            <PolicyStepper
              steps={stepsConfig}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          {/* Form */}
          <div className="rounded-xl border border-border bg-card p-6">
            <FormSection title="Policy Metadata">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Policy Title"
                  name="title"
                  required
                  placeholder="Enter policy title"
                  value={formData.title}
                  onChange={(v) => handleInputChange("title", v)}
                />

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(v) => handleInputChange("category", v)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesConfig.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Department <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.department} onValueChange={(v) => handleInputChange("department", v)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departmentsConfig.map(dept => (
                        <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Policy Owner <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.owner} onValueChange={(v) => handleInputChange("owner", v)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select owner" />
                    </SelectTrigger>
                    <SelectContent>
                      {ownersConfig.map(owner => (
                        <SelectItem key={owner.value} value={owner.value}>{owner.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Language <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.language} onValueChange={(v) => handleInputChange("language", v)}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languagesConfig.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <FormDateInput
                  label="Effective Date"
                  name="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={(v) => handleInputChange("effectiveDate", v)}
                />
              </div>

              <FormField
                label="Review Cycle (Months)"
                name="reviewCycle"
                type="number"
                placeholder="12"
                value={formData.reviewCycle}
                onChange={(v) => handleInputChange("reviewCycle", v)}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Frameworks <span className="text-destructive">*</span>
                </Label>
                <FrameworkCheckbox
                  frameworks={frameworksConfig}
                  selectedFrameworks={selectedFrameworks}
                  onChange={setSelectedFrameworks}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Tags (Max 15)
                </Label>
                <TagInput
                  tags={tags}
                  onChange={setTags}
                  maxTags={15}
                  placeholder="Add tag"
                />
              </div>
            </FormSection>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => navigate("/policies")}>
                  Cancel
                </Button>
                <Button onClick={handleNext} className="gap-2">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <PolicyProgressCard
            currentStep={currentStep}
            totalSteps={stepsConfig.length}
            status="draft"
          />
          <PolicyQuickActions
            onSaveDraft={() => console.log("Save draft")}
            onPreview={() => console.log("Preview")}
          />
          <PolicyHelpCard />
        </div>
      </div>
    </div>
  );
};

export default CreatePolicy;
