import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UserPlus, Download, Filter, Search, Shield, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DynamicTable,
  ColumnConfig,
  ActionConfig,
} from "@/components/table";
import { useTableData } from "@/hooks/useTableData";

// Example user type
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  mfaEnabled: boolean;
}

// Mock API data
const mockUsers: User[] = [
  { id: "1", name: "Ahmed Mohamed", email: "ahmed@company.com", department: "IT", role: "Admin", status: "active", lastLogin: "2024-01-15", mfaEnabled: true },
  { id: "2", name: "Sara Ali", email: "sara@company.com", department: "HR", role: "Manager", status: "active", lastLogin: "2024-01-14", mfaEnabled: true },
  { id: "3", name: "Omar Hassan", email: "omar@company.com", department: "Finance", role: "Analyst", status: "pending", lastLogin: "2024-01-13", mfaEnabled: false },
  { id: "4", name: "Fatima Khalid", email: "fatima@company.com", department: "Legal", role: "Officer", status: "active", lastLogin: "2024-01-12", mfaEnabled: true },
  { id: "5", name: "Youssef Ibrahim", email: "youssef@company.com", department: "Operations", role: "Specialist", status: "inactive", lastLogin: "2024-01-10", mfaEnabled: false },
  { id: "6", name: "Nour Mahmoud", email: "nour@company.com", department: "Marketing", role: "Coordinator", status: "active", lastLogin: "2024-01-15", mfaEnabled: true },
  { id: "7", name: "Khaled Samir", email: "khaled@company.com", department: "IT", role: "Developer", status: "active", lastLogin: "2024-01-14", mfaEnabled: true },
  { id: "8", name: "Layla Fathi", email: "layla@company.com", department: "HR", role: "Recruiter", status: "pending", lastLogin: "2024-01-13", mfaEnabled: false },
  { id: "9", name: "Mostafa Adel", email: "mostafa@company.com", department: "Finance", role: "Accountant", status: "active", lastLogin: "2024-01-12", mfaEnabled: true },
  { id: "10", name: "Dina Essam", email: "dina@company.com", department: "Legal", role: "Paralegal", status: "active", lastLogin: "2024-01-11", mfaEnabled: false },
  { id: "11", name: "Hassan Tarek", email: "hassan@company.com", department: "IT", role: "Engineer", status: "active", lastLogin: "2024-01-15", mfaEnabled: true },
  { id: "12", name: "Mona Sherif", email: "mona@company.com", department: "Operations", role: "Manager", status: "inactive", lastLogin: "2024-01-08", mfaEnabled: false },
];

// Status badge component
const StatusBadge: React.FC<{ status: User["status"] }> = ({ status }) => {
  const variants = {
    active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    inactive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  };
  
  return (
    <Badge className={`${variants[status]} border-0`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// User avatar cell
const UserCell: React.FC<{ name: string; email: string }> = ({ name, email }) => {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
  
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9 bg-primary/10">
        <AvatarFallback className="bg-primary/10 text-primary text-sm">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};

export default function TableExample() {
  const { t } = useTranslation();
  
  // Use the table data hook for local data management
  const {
    paginatedData,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    setPage,
    sortConfig,
    handleSort,
    searchTerm,
    setSearchTerm,
    isLoading,
    setIsLoading,
  } = useTableData<User>({
    data: mockUsers,
    initialPageSize: 5,
  });
  
  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);
  
  // Define columns with custom renderers
  const columns: ColumnConfig<User>[] = [
    {
      key: "name",
      header: t("common.user", "User"),
      sortable: true,
      render: (_, user) => <UserCell name={user.name} email={user.email} />,
    },
    {
      key: "department",
      header: t("common.department", "Department"),
      sortable: true,
      render: (value) => (
        <Badge variant="outline" className="font-normal">
          {value as string}
        </Badge>
      ),
    },
    {
      key: "role",
      header: t("common.role", "Role"),
      sortable: true,
    },
    {
      key: "lastLogin",
      header: t("common.lastLogin", "Last Login"),
      sortable: true,
      className: "text-muted-foreground",
    },
    {
      key: "mfaEnabled",
      header: t("common.security", "Security"),
      render: (value) => (
        <div className="flex items-center gap-1">
          <Shield className={`h-4 w-4 ${value ? "text-green-500" : "text-muted-foreground"}`} />
          <span className={value ? "text-green-600" : "text-muted-foreground"}>
            {value ? "MFA" : "No MFA"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: t("common.status", "Status"),
      sortable: true,
      render: (value) => <StatusBadge status={value as User["status"]} />,
    },
  ];
  
  // Define actions
  const actions: ActionConfig<User>[] = [
    {
      label: t("common.sendEmail", "Send Email"),
      icon: Mail,
      onClick: (user) => console.log("Send email to:", user.email),
    },
    {
      label: t("common.call", "Call"),
      icon: Phone,
      onClick: (user) => console.log("Call:", user.name),
    },
  ];
  
  // Action handlers
  const handleView = (user: User) => {
    console.log("View user:", user);
  };
  
  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
  };
  
  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {t("pages.tableExample.title", "Dynamic Table Example")}
          </h1>
          <p className="text-muted-foreground">
            {t("pages.tableExample.description", "Demonstrates the dynamic table component with pagination, sorting, and actions")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            {t("common.export", "Export")}
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            {t("common.addUser", "Add User")}
          </Button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
          <Input
            placeholder={t("common.searchUsers", "Search users...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ltr:pl-9 rtl:pr-9"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
          {t("common.filters", "Filters")}
        </Button>
      </div>
      
      {/* Dynamic Table */}
      <DynamicTable
        data={paginatedData}
        columns={columns}
        actions={actions}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        sortConfig={sortConfig}
        onSort={handleSort}
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage: pageSize,
          onPageChange: setPage,
        }}
        itemLabel={t("common.users", "users")}
        emptyMessage={t("common.noUsersFound", "No users found")}
        actionsLabel={t("common.actions", "Actions")}
      />
    </div>
  );
}
