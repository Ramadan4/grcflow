import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ShieldCheck, Settings, AlertTriangle, Plus, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RoleStatCard,
  RolesTable,
  SodProtectionAlert,
} from "@/components/roles";
import type { RoleData } from "@/components/roles";

// Stats configuration
const statsConfig = [
  {
    id: "total",
    label: "Total Roles",
    icon: Shield,
    iconBgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "system",
    label: "System Roles",
    icon: ShieldCheck,
    iconBgColor: "bg-success/10",
    iconColor: "text-success",
  },
  {
    id: "custom",
    label: "Custom Roles",
    icon: Settings,
    iconBgColor: "bg-purple/10",
    iconColor: "text-purple",
  },
  {
    id: "conflicts",
    label: "SoD Conflicts",
    icon: AlertTriangle,
    iconBgColor: "bg-destructive/10",
    iconColor: "text-destructive",
  },
];

// Mock data
const mockRoles: RoleData[] = [
  {
    id: "1",
    name: "System Administrator",
    description: "Full system access and configuration",
    type: "system",
    permissionsCount: 45,
    assignedUsers: 5,
    sodConflicts: 0,
    status: "active",
  },
  {
    id: "2",
    name: "Risk Manager",
    description: "Risk assessment and management",
    type: "custom",
    permissionsCount: 18,
    assignedUsers: 12,
    sodConflicts: 2,
    status: "active",
  },
  {
    id: "3",
    name: "Compliance Officer",
    description: "Policy and compliance oversight",
    type: "custom",
    permissionsCount: 22,
    assignedUsers: 8,
    sodConflicts: 1,
    status: "active",
  },
  {
    id: "4",
    name: "Auditor",
    description: "Audit and review functions",
    type: "system",
    permissionsCount: 15,
    assignedUsers: 6,
    sodConflicts: 3,
    status: "active",
  },
  {
    id: "5",
    name: "Risk Creator",
    description: "Create and submit risk records",
    type: "custom",
    permissionsCount: 8,
    assignedUsers: 15,
    sodConflicts: 1,
    status: "active",
  },
];

const Roles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Calculate stats from data
  const stats = {
    total: mockRoles.length,
    system: mockRoles.filter((r) => r.type === "system").length,
    custom: mockRoles.filter((r) => r.type === "custom").length,
    conflicts: mockRoles.reduce((sum, r) => sum + r.sodConflicts, 0),
  };

  // Filter roles
  const filteredRoles = mockRoles.filter((role) => {
    const matchesSearch =
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || role.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">Role Management</h1>
            <p className="text-muted-foreground">
              Configure role-based access control (RBAC) and segregation of duties rules
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            SoD Rules
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Matrix
          </Button>
          <Button
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate("/roles/create")}
          >
            <Plus className="h-4 w-4" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => (
          <RoleStatCard
            key={stat.id}
            label={stat.label}
            value={stats[stat.id as keyof typeof stats]}
            icon={stat.icon}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search roles by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Roles Table */}
      <RolesTable
        roles={filteredRoles}
        onEdit={(role) => navigate(`/roles/${role.id}/edit`)}
        onViewUsers={(role) => console.log("View users:", role)}
        onDuplicate={(role) => console.log("Duplicate:", role)}
        onDelete={(role) => console.log("Delete:", role)}
      />

      {/* SoD Alert */}
      <SodProtectionAlert />
    </div>
  );
};

export default Roles;
