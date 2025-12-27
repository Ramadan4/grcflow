import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightLeft, ArrowLeft, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FormSection,
  FormSelect,
  FormCheckboxGroup,
  FormTextarea,
  FormDateInput,
  FormSwitch,
  FormActions,
} from "@/components/forms";

// Configuration data
const delegateOptions = [
  { value: "sarah", label: "Sarah Johnson (sarah.j@example.com)" },
  { value: "emily", label: "Emily Davis (emily.d@example.com)" },
  { value: "lisa", label: "Lisa Anderson (lisa.a@example.com)" },
  { value: "jennifer", label: "Jennifer Martinez (jennifer.m@example.com)" },
];

const priorityOptions = [
  { value: "low", label: "Low Priority" },
  { value: "normal", label: "Normal Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent" },
];

const approvalTypeOptions = [
  { id: "user_management", label: "User Management" },
  { id: "role_assignment", label: "Role Assignment" },
  { id: "workflow_approval", label: "Workflow Approval" },
  { id: "security_policies", label: "Security Policies" },
  { id: "template_approval", label: "Template Approval" },
  { id: "organization_settings", label: "Organization Settings" },
];

interface FormData {
  delegateTo: string;
  priorityLevel: string;
  startDate: string;
  endDate: string;
  approvalTypes: string[];
  reason: string;
  notes: string;
  sendNotification: boolean;
}

const CreateDelegation: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    delegateTo: "",
    priorityLevel: "normal",
    startDate: "",
    endDate: "",
    approvalTypes: [],
    reason: "",
    notes: "",
    sendNotification: true,
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Delegation created:", formData);
    setIsLoading(false);
    navigate("/delegation");
  };

  const handleCancel = () => {
    navigate("/delegation");
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ArrowRightLeft className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {t("delegation.createTitle", "Create Delegation")}
              </h1>
              <p className="text-muted-foreground">
                {t("delegation.createDescription", "Delegate your approval authority to another user")}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/delegation")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("delegation.backToList", "Back to List")}
          </Button>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-6 lg:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-8"
            >
              {/* Delegation Details Section */}
              <FormSection
                icon={ArrowRightLeft}
                title={t("delegation.detailsTitle", "Delegation Details")}
                description={t("delegation.detailsDescription", "Configure the delegation period and approval types")}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormSelect
                    label={t("delegation.delegateTo", "Delegate To")}
                    name="delegateTo"
                    placeholder={t("delegation.selectUser", "Select user")}
                    options={delegateOptions}
                    required
                    value={formData.delegateTo}
                    onChange={(v) => updateField("delegateTo", v)}
                  />
                  <FormSelect
                    label={t("delegation.priorityLevel", "Priority Level")}
                    name="priorityLevel"
                    options={priorityOptions}
                    value={formData.priorityLevel}
                    onChange={(v) => updateField("priorityLevel", v)}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormDateInput
                    label={t("delegation.startDate", "Start Date")}
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={(v) => updateField("startDate", v)}
                  />
                  <FormDateInput
                    label={t("delegation.endDate", "End Date")}
                    name="endDate"
                    required
                    value={formData.endDate}
                    onChange={(v) => updateField("endDate", v)}
                    min={formData.startDate}
                  />
                </div>

                <FormCheckboxGroup
                  label={t("delegation.approvalTypesToDelegate", "Approval Types to Delegate")}
                  name="approvalTypes"
                  options={approvalTypeOptions}
                  selectedValues={formData.approvalTypes}
                  onChange={(values) => updateField("approvalTypes", values)}
                  required
                  columns={2}
                  description={t("delegation.approvalTypesDescription", "Select all approval types you want to delegate")}
                />

                <FormTextarea
                  label={t("delegation.reasonForDelegation", "Reason for Delegation")}
                  name="reason"
                  placeholder={t("delegation.reasonPlaceholder", "e.g., Annual leave, Business trip, Medical leave...")}
                  required
                  value={formData.reason}
                  onChange={(v) => updateField("reason", v)}
                />

                <FormTextarea
                  label={t("delegation.additionalNotes", "Additional Notes")}
                  name="notes"
                  placeholder={t("delegation.notesPlaceholder", "Any additional information or instructions...")}
                  value={formData.notes}
                  onChange={(v) => updateField("notes", v)}
                />

                <FormSwitch
                  icon={Bell}
                  label={t("delegation.sendNotification", "Send notification to delegatee when delegation becomes active")}
                  checked={formData.sendNotification}
                  onChange={(v) => updateField("sendNotification", v)}
                />
              </FormSection>

              {/* Form Actions */}
              <FormActions
                submitLabel={t("delegation.createDelegation", "Create Delegation")}
                cancelLabel={t("common.cancel", "Cancel")}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDelegation;
