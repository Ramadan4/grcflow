import React, { useState } from "react";
import { Users as UsersIcon, Upload, Download, Plus, Lock, ShieldX } from "lucide-react";
import { PageHeader } from "@/components/users/PageHeader";
import { StatsCard } from "@/components/users/StatsCard";
import { SearchAndFilters } from "@/components/users/SearchAndFilters";
import { UsersTable, User } from "@/components/users/UsersTable";
import { TablePagination } from "@/components/users/TablePagination";

// Mock data - this would come from your API
const mockUsers: User[] = [
  {
    id: "1",
    name: "System Administrator",
    email: "admin@grcflow.com",
    initials: "SA",
    avatarBgColor: "bg-primary",
    department: "IT",
    roles: ["admin", "security-officer"],
    lastLogin: "2 hours ago",
    mfaEnabled: true,
    status: "active",
  },
  {
    id: "2",
    name: "John Doe",
    email: "jdoe@grcflow.com",
    initials: "JD",
    avatarBgColor: "bg-info",
    department: "Risk Management",
    roles: ["risk-manager"],
    lastLogin: "1 day ago",
    mfaEnabled: true,
    status: "active",
  },
  {
    id: "3",
    name: "Alice Smith",
    email: "asmith@grcflow.com",
    initials: "AS",
    avatarBgColor: "bg-purple",
    department: "Compliance",
    roles: ["compliance-officer"],
    lastLogin: "3 hours ago",
    mfaEnabled: false,
    status: "active",
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bjohnson@grcflow.com",
    initials: "BJ",
    avatarBgColor: "bg-warning",
    department: "Audit",
    roles: ["auditor"],
    lastLogin: "1 week ago",
    mfaEnabled: true,
    status: "suspended",
  },
  {
    id: "5",
    name: "Sarah Williams",
    email: "swilliams@grcflow.com",
    initials: "SW",
    avatarBgColor: "bg-success",
    department: "HR",
    roles: ["user"],
    lastLogin: "Never",
    mfaEnabled: false,
    status: "pending",
  },
];

const Users: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Calculate stats
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter((u) => u.status === "active").length;
  const mfaEnabled = mockUsers.filter((u) => u.mfaEnabled).length;
  const suspendedUsers = mockUsers.filter((u) => u.status === "suspended").length;

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };

  const handleView = (user: User) => {
    console.log("View user:", user);
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Page Header */}
      <PageHeader
        icon={UsersIcon}
        title="User Management"
        description="Create and manage user accounts with proper roles, authentication methods, and attributes"
        actions={[
          { label: "Bulk Import", icon: Upload, variant: "action" },
          { label: "Export Users", icon: Download, variant: "action" },
          { label: "Create User", icon: Plus, variant: "create" },
        ]}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Users"
          value={totalUsers}
          icon={UsersIcon}
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
        />
        <StatsCard
          label="Active Users"
          value={activeUsers}
          icon={Lock}
          iconBgColor="bg-success/10"
          iconColor="text-success"
        />
        <StatsCard
          label="MFA Enabled"
          value={mfaEnabled}
          icon={ShieldX}
          iconBgColor="bg-purple/10"
          iconColor="text-purple"
        />
        <StatsCard
          label="Suspended"
          value={suspendedUsers}
          icon={Lock}
          iconBgColor="bg-destructive/10"
          iconColor="text-destructive"
        />
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        searchPlaceholder="Search users by name, email, or department..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={[
          {
            name: "department",
            placeholder: "Department",
            value: departmentFilter,
            onChange: setDepartmentFilter,
            options: [
              { value: "all", label: "All Departments" },
              { value: "it", label: "IT" },
              { value: "risk", label: "Risk Management" },
              { value: "compliance", label: "Compliance" },
              { value: "audit", label: "Audit" },
              { value: "hr", label: "HR" },
            ],
          },
          {
            name: "status",
            placeholder: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "suspended", label: "Suspended" },
            ],
          },
        ]}
      />

      {/* Users Table */}
      <UsersTable
        users={mockUsers}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={2}
        totalItems={totalUsers}
        itemsPerPage={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;
