import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Permission {
  id: string;
  label: string;
}

export interface ModulePermissionConfig {
  id: string;
  name: string;
  permissions: Permission[];
}

interface ModulePermissionCardProps {
  module: ModulePermissionConfig;
  selectedPermissions: string[];
  accessLevel: string;
  onPermissionChange: (permissionId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onAccessLevelChange: (level: string) => void;
  className?: string;
}

const accessLevelOptions = [
  { value: "record", label: "Record Level" },
  { value: "department", label: "Department Level" },
  { value: "organization", label: "Organization Level" },
];

const ModulePermissionCard = ({
  module,
  selectedPermissions,
  accessLevel,
  onPermissionChange,
  onSelectAll,
  onAccessLevelChange,
  className,
}: ModulePermissionCardProps) => {
  const allSelected =
    module.permissions.length > 0 &&
    module.permissions.every((p) => selectedPermissions.includes(p.id));

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 space-y-4",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{module.name}</h4>
          <p className="text-xs text-muted-foreground">ID: {module.id}</p>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => onSelectAll(checked === true)}
          />
          <span className="text-sm text-muted-foreground">Select All</span>
        </label>
      </div>

      {/* Permissions */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Permissions</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {module.permissions.map((permission) => (
            <label
              key={permission.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={(checked) =>
                  onPermissionChange(permission.id, checked === true)
                }
              />
              <span className="text-sm text-foreground">{permission.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Access Level */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Access Level</p>
        <Select value={accessLevel} onValueChange={onAccessLevelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            {accessLevelOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Scope of data access for this module
        </p>
      </div>
    </div>
  );
};

export default ModulePermissionCard;
