import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, User, Settings, Shield, Mail, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FormSection,
  FormField,
  FormSelect,
  FormFileUpload,
  FormSwitch,
  RoleCard,
  FormActions,
} from "@/components/forms";

// Configuration data - can be moved to a separate config file
const departmentOptions = [
  { value: "it", label: "IT Department" },
  { value: "risk", label: "Risk Management" },
  { value: "compliance", label: "Compliance" },
  { value: "audit", label: "Audit" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance" },
];

const authProviderOptions = [
  { value: "local", label: "Local Authentication" },
  { value: "sso", label: "SSO / Azure AD" },
  { value: "ldap", label: "LDAP / Active Directory" },
  { value: "nafath", label: "Nafath (KSA)" },
];

const accountStatusOptions = [
  { value: "active", label: "Active - User can login immediately" },
  { value: "pending", label: "Pending Activation - Requires approval" },
  { value: "suspended", label: "Suspended - Temporarily disabled" },
];

const rolesConfig = [
  { id: "admin", name: "System Administrator", description: "Full system access" },
  { id: "security", name: "Security Officer", description: "Security and audit controls" },
  { id: "risk_manager", name: "Risk Manager", description: "Risk assessment and management" },
  { id: "compliance", name: "Compliance Officer", description: "Policy and compliance" },
  { id: "auditor", name: "Auditor", description: "Audit and review functions" },
  { id: "user", name: "Regular User", description: "Basic user access" },
];

interface FormData {
  username: string;
  fullName: string;
  email: string;
  mobile: string;
  department: string;
  designation: string;
  profilePicture: File | null;
  authProvider: string;
  password: string;
  mfaEnabled: boolean;
  sendWelcomeEmail: boolean;
  roles: string[];
  accountStatus: string;
}

const CreateUser = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    fullName: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    profilePicture: null,
    authProvider: "",
    password: "",
    mfaEnabled: false,
    sendWelcomeEmail: true,
    roles: [],
    accountStatus: "active",
  });

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleRole = (roleId: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter((r) => r !== roleId)
        : [...prev.roles, roleId],
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", formData);
    setIsLoading(false);
    navigate("/users");
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto   space-y-8">
        {/* Page Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Create New User</h1>
            <p className="text-muted-foreground">
              Add a new user account with roles, authentication settings, and security options
            </p>
          </div>
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
              {/* Basic Information Section */}
              <FormSection
                icon={User}
                title="Basic Information"
                description="Enter the user's personal details"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    label="Username"
                    name="username"
                    placeholder="Enter unique username"
                    description="Must be unique system-wide"
                    required
                    value={formData.username}
                    onChange={(v) => updateField("username", v)}
                  />
                  <FormField
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter full name"
                    required
                    value={formData.fullName}
                    onChange={(v) => updateField("fullName", v)}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    description="Official email for notifications"
                    required
                    value={formData.email}
                    onChange={(v) => updateField("email", v)}
                  />
                  <FormField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    placeholder="+1234567890"
                    description="For MFA and SMS notifications"
                    value={formData.mobile}
                    onChange={(v) => updateField("mobile", v)}
                  />
                  <FormSelect
                    label="Department"
                    name="department"
                    placeholder="Select department"
                    options={departmentOptions}
                    required
                    value={formData.department}
                    onChange={(v) => updateField("department", v)}
                  />
                  <FormField
                    label="Designation / Title"
                    name="designation"
                    placeholder="Job title or function"
                    value={formData.designation}
                    onChange={(v) => updateField("designation", v)}
                  />
                </div>
                <FormFileUpload
                  label="Profile Picture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={(file) => updateField("profilePicture", file)}
                />
              </FormSection>

              <Separator />

              {/* Authentication Settings Section */}
              <FormSection
                icon={Settings}
                title="Authentication Settings"
                description="Configure login and access methods"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormSelect
                    label="Authentication Provider"
                    name="authProvider"
                    placeholder="Select provider"
                    options={authProviderOptions}
                    required
                    value={formData.authProvider}
                    onChange={(v) => updateField("authProvider", v)}
                  />
                  <FormField
                    label="Initial Password"
                    name="password"
                    type="password"
                    placeholder="Leave empty to send reset link"
                    description="User must change on first login"
                    value={formData.password}
                    onChange={(v) => updateField("password", v)}
                  />
                </div>
                <div className="space-y-3">
                  <FormSwitch
                    icon={Circle}
                    label="Enable Multi-Factor Authentication (MFA)"
                    description="Required for privileged roles"
                    checked={formData.mfaEnabled}
                    onChange={(v) => updateField("mfaEnabled", v)}
                  />
                  <FormSwitch
                    icon={Mail}
                    label="Send Welcome Email"
                    description="Notify user about account creation"
                    checked={formData.sendWelcomeEmail}
                    onChange={(v) => updateField("sendWelcomeEmail", v)}
                  />
                </div>
              </FormSection>

              <Separator />

              {/* Roles & Permissions Section */}
              <FormSection
                icon={Shield}
                title="Roles & Permissions"
                description="Assign roles and access levels"
              >
                <div>
                  <p className="mb-3 text-sm font-medium text-foreground">
                    Assign Roles (Multiple Selection)
                  </p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {rolesConfig.map((role) => (
                      <RoleCard
                        key={role.id}
                        id={role.id}
                        name={role.name}
                        description={role.description}
                        checked={formData.roles.includes(role.id)}
                        onChange={() => toggleRole(role.id)}
                      />
                    ))}
                  </div>
                </div>
                <FormSelect
                  label="Account Status"
                  name="accountStatus"
                  options={accountStatusOptions}
                  required
                  value={formData.accountStatus}
                  onChange={(v) => updateField("accountStatus", v)}
                />
              </FormSection>

              <Separator />

              {/* Form Actions */}
              <FormActions
                submitLabel="Create User Account"
                cancelLabel="Cancel"
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

export default CreateUser;
