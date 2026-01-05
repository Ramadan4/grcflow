import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  Users,
  Key,
  Clock,
  Lock,
  FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  PolicyStatCard, 
  PolicyCard, 
  PolicyTabs 
} from "@/components/policies";

const statsConfig = [
  { 
    title: "Active Policies", 
    value: "8", 
    icon: Shield, 
    variant: "default" 
  },
  { 
    title: "Compliance Rate", 
    value: "94%", 
    icon: CheckCircle, 
    variant: "success" 
  },
  { 
    title: "Failed Logins (24h)", 
    value: "23", 
    icon: AlertTriangle, 
    variant: "warning" 
  },
  { 
    title: "Active Sessions", 
    value: "147", 
    icon: Users, 
    variant: "info" 
  },
];

const tabsConfig = [
  { id: "authentication", label: "Authentication", icon: Key },
  { id: "session", label: "Session", icon: Clock },
  { id: "access", label: "Access Control", icon: Lock },
  { id: "compliance", label: "Compliance", icon: FileCheck },
];

const policiesData = {
  authentication: [
    {
      id: 1,
      icon: Lock,
      title: "Password Policy",
      description: "Enforce password complexity and rotation requirements",
      enabled: true,
      iconVariant: "primary",
      settings: [
        { label: "Min Length", value: "12 chars" },
        { label: "Complexity", value: "High" },
        { label: "Expiration", value: "90 days" },
        { label: "History", value: "5 passwords" },
      ],
    },
    {
      id: 2,
      icon: Key,
      title: "Login Security",
      description: "Control login attempts and multi-factor authentication",
      enabled: true,
      iconVariant: "success",
      settings: [
        { label: "Max Attempts", value: "5" },
        { label: "Lockout Duration", value: "30 min" },
        { label: "MFA Required", value: "Disabled", badge: true, badgeVariant: "muted" },
        { label: "MFA Methods", value: "2" },
      ],
    },
  ],
  session: [
    {
      id: 3,
      icon: Clock,
      title: "Session Timeout",
      description: "Configure session duration and idle timeout settings",
      enabled: true,
      iconVariant: "primary",
      settings: [
        { label: "Session Duration", value: "8 hours" },
        { label: "Idle Timeout", value: "30 min" },
        { label: "Remember Me", value: "Enabled", badge: true },
        { label: "Max Sessions", value: "3" },
      ],
    },
  ],
  access: [
    {
      id: 4,
      icon: Shield,
      title: "IP Restrictions",
      description: "Limit access based on IP addresses and ranges",
      enabled: false,
      iconVariant: "warning",
      settings: [
        { label: "Whitelist IPs", value: "5 ranges" },
        { label: "Blacklist IPs", value: "12 IPs" },
        { label: "Geo Blocking", value: "Disabled", badge: true, badgeVariant: "muted" },
        { label: "VPN Detection", value: "Off" },
      ],
    },
  ],
  compliance: [
    {
      id: 5,
      icon: FileCheck,
      title: "Audit Logging",
      description: "Track and log all security-related events",
      enabled: true,
      iconVariant: "success",
      settings: [
        { label: "Log Retention", value: "90 days" },
        { label: "Event Types", value: "All" },
        { label: "Export Format", value: "JSON" },
        { label: "Real-time Alerts", value: "Enabled", badge: true },
      ],
    },
  ],
};

const SecurityPolicies = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("authentication");

  const currentPolicies = policiesData[activeTab] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Security Policies</h1>
            <p className="text-muted-foreground">
              Configure and manage platform-wide security policies and access controls
            </p>
          </div>
        </div>
        <Button onClick={() => navigate("/security/policies/create")} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Policy
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat, index) => (
          <PolicyStatCard key={index} {...stat} />
        ))}
      </div>

      {/* Tabs */}
      <PolicyTabs 
        tabs={tabsConfig} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Policy Cards */}
      <div className="space-y-4">
        {currentPolicies.map((policy) => (
          <PolicyCard
            key={policy.id}
            icon={policy.icon}
            title={policy.title}
            description={policy.description}
            settings={policy.settings}
            enabled={policy.enabled}
            iconVariant={policy.iconVariant}
            onToggle={() => console.log("Toggle", policy.id)}
            onEdit={() => console.log("Edit", policy.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SecurityPolicies;
