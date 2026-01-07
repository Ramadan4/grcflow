import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PolicyStepper,
  PolicyProgressCard,
  PolicyQuickActions,
  PolicyHelpCard,
} from "@/components/governance";
import {
  StepMetadata,
  StepTemplateSelection,
  StepPlaceholders,
  StepAuthor,
  StepReview,
  StepSubmit,
} from "@/components/governance/steps";

// Configuration objects
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

// Initial reviewers for demo
const initialReviewers = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@company.com",
    status: "approved" as const,
  },
  {
    id: "2",
    name: "Sara Mohamed",
    email: "sara.mohamed@company.com",
    status: "pending" as const,
  },
];

const CreatePolicy = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Metadata
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

  // Step 2: Template
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Step 3: Placeholders
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({});

  // Step 4: Author
  const [policyContent, setPolicyContent] = useState("");

  // Step 5: Review
  const [reviewers, setReviewers] = useState(initialReviewers);
  const [reviewComments, setReviewComments] = useState("");

  // Step 6: Submit
  const [agreements, setAgreements] = useState({
    reviewed: false,
    accurate: false,
    authorized: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceholderChange = (id: string, value: string) => {
    setPlaceholderValues(prev => ({ ...prev, [id]: value }));
  };

  const handleAddReviewer = (email: string) => {
    const newReviewer = {
      id: Date.now().toString(),
      name: email.split("@")[0].replace(/[._]/g, " "),
      email,
      status: "pending" as const,
    };
    setReviewers(prev => [...prev, newReviewer]);
  };

  const handleRemoveReviewer = (id: string) => {
    setReviewers(prev => prev.filter(r => r.id !== id));
  };

  const handleAgreementChange = (key: string, value: boolean) => {
    setAgreements(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    navigate("/policies");
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

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepMetadata
            formData={formData}
            onInputChange={handleInputChange}
            categories={categoriesConfig}
            departments={departmentsConfig}
            owners={ownersConfig}
            languages={languagesConfig}
            frameworks={frameworksConfig}
            selectedFrameworks={selectedFrameworks}
            onFrameworksChange={setSelectedFrameworks}
            tags={tags}
            onTagsChange={setTags}
          />
        );
      case 2:
        return (
          <StepTemplateSelection
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        );
      case 3:
        return (
          <StepPlaceholders
            values={placeholderValues}
            onChange={handlePlaceholderChange}
          />
        );
      case 4:
        return (
          <StepAuthor
            content={policyContent}
            onChange={setPolicyContent}
          />
        );
      case 5:
        return (
          <StepReview
            reviewers={reviewers}
            onAddReviewer={handleAddReviewer}
            onRemoveReviewer={handleRemoveReviewer}
            comments={reviewComments}
            onCommentsChange={setReviewComments}
          />
        );
      case 6:
        return (
          <StepSubmit
            summary={{
              title: formData.title,
              category: categoriesConfig.find(c => c.value === formData.category)?.label || "",
              department: departmentsConfig.find(d => d.value === formData.department)?.label || "",
              owner: ownersConfig.find(o => o.value === formData.owner)?.label || "",
              effectiveDate: formData.effectiveDate,
              frameworks: selectedFrameworks.map(
                f => frameworksConfig.find(fw => fw.id === f)?.label || f
              ),
              reviewersCount: reviewers.length,
              approvedCount: reviewers.filter(r => r.status === "approved").length,
            }}
            agreements={agreements}
            onAgreementChange={handleAgreementChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
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

          {/* Dynamic Step Content */}
          <div className="rounded-xl border border-border bg-card p-6">
            {renderStepContent()}

            {/* Form Actions - Hide on Submit step */}
            {currentStep !== 6 && (
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
            )}
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
