import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSection } from "@/components/forms";
import ModulePermissionCard from "@/components/roles/ModulePermissionCard";
import type { ModulePermissionConfig } from "@/components/roles/ModulePermissionCard";

// Department options
const departmentOptions = [
  "All Departments",
  "IT",
  "Finance",
  "HR",
  "Risk Management",
  "Compliance",
  "Legal",
  "Operations",
];

// Module configurations
const modulesConfig: ModulePermissionConfig[] = [
  {
    id: "users",
    name: "User Management",
    permissions: [
      { id: "users.create", label: "Create" },
      { id: "users.read", label: "Read" },
      { id: "users.update", label: "Update" },
      { id: "users.delete", label: "Delete" },
      { id: "users.suspend", label: "Suspend" },
      { id: "users.unlock", label: "Unlock" },
    ],
  },
  {
    id: "roles",
    name: "Role Management",
    permissions: [
      { id: "roles.create", label: "Create" },
      { id: "roles.read", label: "Read" },
      { id: "roles.update", label: "Update" },
      { id: "roles.delete", label: "Delete" },
      { id: "roles.assign", label: "Assign" },
    ],
  },
  {
    id: "policies",
    name: "Policy Management",
    permissions: [
      { id: "policies.create", label: "Create" },
      { id: "policies.read", label: "Read" },
      { id: "policies.update", label: "Update" },
      { id: "policies.delete", label: "Delete" },
      { id: "policies.approve", label: "Approve" },
      { id: "policies.publish", label: "Publish" },
    ],
  },
  {
    id: "risks",
    name: "Risk Management",
    permissions: [
      { id: "risks.create", label: "Create" },
      { id: "risks.read", label: "Read" },
      { id: "risks.update", label: "Update" },
      { id: "risks.delete", label: "Delete" },
      { id: "risks.assess", label: "Assess" },
      { id: "risks.approve", label: "Approve" },
    ],
  },
  {
    id: "compliance",
    name: "Compliance Management",
    permissions: [
      { id: "compliance.create", label: "Create" },
      { id: "compliance.read", label: "Read" },
      { id: "compliance.update", label: "Update" },
      { id: "compliance.delete", label: "Delete" },
      { id: "compliance.assess", label: "Assess" },
    ],
  },
  {
    id: "audit",
    name: "Audit Management",
    permissions: [
      { id: "audit.create", label: "Create" },
      { id: "audit.read", label: "Read" },
      { id: "audit.update", label: "Update" },
      { id: "audit.delete", label: "Delete" },
      { id: "audit.schedule", label: "Schedule" },
      { id: "audit.report", label: "Report" },
    ],
  },
];

interface FormData {
  roleName: string;
  roleCode: string;
  description: string;
  roleLevel: string;
  departmentScope: string[];
  modulePermissions: Record<string, string[]>;
  moduleAccessLevels: Record<string, string>;
}

const CreateRole = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    roleName: "",
    roleCode: "",
    description: "",
    roleLevel: "",
    departmentScope: [],
    modulePermissions: {},
    moduleAccessLevels: {},
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (
    moduleId: string,
    permissionId: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const current = prev.modulePermissions[moduleId] || [];
      const updated = checked
        ? [...current, permissionId]
        : current.filter((p) => p !== permissionId);
      return {
        ...prev,
        modulePermissions: { ...prev.modulePermissions, [moduleId]: updated },
      };
    });
  };

  const handleSelectAll = (moduleId: string, checked: boolean) => {
    const module = modulesConfig.find((m) => m.id === moduleId);
    if (!module) return;

    setFormData((prev) => ({
      ...prev,
      modulePermissions: {
        ...prev.modulePermissions,
        [moduleId]: checked ? module.permissions.map((p) => p.id) : [],
      },
    }));
  };

  const handleAccessLevelChange = (moduleId: string, level: string) => {
    setFormData((prev) => ({
      ...prev,
      moduleAccessLevels: { ...prev.moduleAccessLevels, [moduleId]: level },
    }));
  };

  const handleSubmit = () => {
    console.log("Submit:", formData);
    navigate("/roles");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">Create New Role</h1>
          <p className="text-muted-foreground">
            Define role permissions and access controls
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="p-6 space-y-8">
          {/* Role Information Section */}
          <FormSection title="Role Information">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Role Name <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="e.g., Risk Manager, Compliance Officer"
                  value={formData.roleName}
                  onChange={(e) => updateField("roleName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Role Code <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="e.g., RISK_MGR, COMP_OFF"
                  value={formData.roleCode}
                  onChange={(e) => updateField("roleCode", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Description <span className="text-destructive">*</span>
              </label>
              <Textarea
                placeholder="Describe the role responsibilities, authority level, and purpose"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Role Level
                </label>
                <Input
                  placeholder="1-10"
                  value={formData.roleLevel}
                  onChange={(e) => updateField("roleLevel", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Department Scope <span className="text-destructive">*</span>
                </label>
                <select
                  multiple
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={formData.departmentScope}
                  onChange={(e) => {
                    const selected = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    updateField("departmentScope", selected);
                  }}
                >
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  Hold Ctrl/Cmd to select multiple departments. This scope applies to
                  all modules.
                </p>
              </div>
            </div>
          </FormSection>

          {/* Module Permissions Section */}
          <FormSection title="Module Permissions & Access Levels">
            <p className="text-sm text-muted-foreground -mt-2 mb-4">
              Configure permissions, access level, and department scope for each GRC
              module independently.
            </p>
            <div className="space-y-4">
              {modulesConfig.map((module) => (
                <ModulePermissionCard
                  key={module.id}
                  module={module}
                  selectedPermissions={formData.modulePermissions[module.id] || []}
                  accessLevel={formData.moduleAccessLevels[module.id] || ""}
                  onPermissionChange={(permId, checked) =>
                    handlePermissionChange(module.id, permId, checked)
                  }
                  onSelectAll={(checked) => handleSelectAll(module.id, checked)}
                  onAccessLevelChange={(level) =>
                    handleAccessLevelChange(module.id, level)
                  }
                />
              ))}
            </div>
          </FormSection>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => navigate("/roles")}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
            >
              Create Role
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRole;
