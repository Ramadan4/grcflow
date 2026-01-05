import { useNavigate } from "react-router-dom";
import { Shield, Key, Clock, Lock, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import FormSection from "@/components/forms/FormSection";
import { 
  GuidelinesCard, 
  SecurityNoticeCard, 
  BestPracticesCard 
} from "@/components/policies";

const policyTypeOptions = [
  { value: "password", label: "Password Policy" },
  { value: "session", label: "Session Management" },
  { value: "login", label: "Login Security" },
  { value: "access", label: "Access Control" },
  { value: "privacy", label: "Data Privacy" },
];

const priorityOptions = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const enforcementOptions = [
  { value: "enforce", label: "Enforce" },
  { value: "audit", label: "Audit Only" },
  { value: "disabled", label: "Disabled" },
];

const guidelinesItems = [
  "Policies apply to all users unless specific exceptions are configured",
  "Higher priority policies override conflicting lower priority rules",
  "Audit mode logs violations without enforcement",
  "Changes take effect immediately after saving",
];

const bestPractices = [
  {
    icon: Lock,
    title: "Password Policies",
    description: "Minimum 12 characters with complexity requirements",
  },
  {
    icon: Clock,
    title: "Session Timeout",
    description: "30 minutes idle timeout recommended",
  },
  {
    icon: Key,
    title: "MFA Requirement",
    description: "Enable for privileged accounts",
  },
];

const CreateSecurityPolicy = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Create policy");
    navigate("/security/policies");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary">Create Security Policy</h1>
          <p className="text-muted-foreground">
            Define new security policy with custom rules and enforcement settings
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormSection title="Policy Information">
                  {/* Policy Name and Type */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Policy Name <span className="text-destructive">*</span>
                      </label>
                      <Input placeholder="e.g., Enhanced Password Policy" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Policy Type <span className="text-destructive">*</span>
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {policyTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Description
                    </label>
                    <Textarea 
                      placeholder="Describe the purpose and scope of this policy"
                      rows={4}
                    />
                  </div>

                  {/* Priority and Enforcement */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Priority Level
                      </label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Enforcement Mode
                      </label>
                      <Select defaultValue="enforce">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {enforcementOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </FormSection>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Button type="submit" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Policy
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/security/policies")}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <GuidelinesCard 
            title="Policy Guidelines" 
            items={guidelinesItems} 
          />
          <SecurityNoticeCard 
            title="Security Notice"
            message="Overly restrictive policies may impact user productivity. Test policies in audit mode before full enforcement."
          />
          <BestPracticesCard 
            title="Best Practices" 
            practices={bestPractices} 
          />
        </div>
      </div>
    </div>
  );
};

export default CreateSecurityPolicy;
