import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRightLeft, Plus, User, Calendar } from "lucide-react";
import { PageHeader } from "@/components/users/PageHeader";
import { StatsCard } from "@/components/users/StatsCard";
import { SearchAndFilters } from "@/components/users/SearchAndFilters";
import { TablePagination } from "@/components/users/TablePagination";
import {
  DataTable,
  ColumnDef,
  DelegationStatusBadge,
  DelegationStatusType,
  ApprovalTypeBadge,
} from "@/components/shared";

// Types
interface Delegation {
  id: string;
  fromUser: {
    name: string;
    email: string;
  };
  toUser: {
    name: string;
    email: string;
  };
  startDate: string;
  endDate: string;
  approvalTypes: string[];
  status: DelegationStatusType;
  reason: string;
}

// Mock data
const mockDelegations: Delegation[] = [
  {
    id: "1",
    fromUser: { name: "John Smith", email: "john.smith@example.com" },
    toUser: { name: "Sarah Johnson", email: "sarah.j@example.com" },
    startDate: "2024-01-15",
    endDate: "2024-01-30",
    approvalTypes: ["User Management", "Role Assignment"],
    status: "active",
    reason: "Annual leave",
  },
  {
    id: "2",
    fromUser: { name: "Michael Brown", email: "michael.b@example.com" },
    toUser: { name: "Emily Davis", email: "emily.d@example.com" },
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    approvalTypes: ["Workflow Approval", "Security Policies"],
    status: "scheduled",
    reason: "Business trip",
  },
  {
    id: "3",
    fromUser: { name: "David Wilson", email: "david.w@example.com" },
    toUser: { name: "Lisa Anderson", email: "lisa.a@example.com" },
    startDate: "2024-01-01",
    endDate: "2024-01-10",
    approvalTypes: ["User Management"],
    status: "expired",
    reason: "Sick leave",
  },

  {
    id: "4",
    fromUser: { name: "Robert Taylor", email: "robert.t@example.com" },
    toUser: { name: "Jennifer Martinez", email: "jennifer.m@example.com" },
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    approvalTypes: ["Role Assignment", "Template Approval"],
    status: "revoked",
    reason: "Emergency - revoked early",
  },

  {
    id: "5",
    fromUser: { name: "Robert Taylor", email: "robert.t@example.com" },
    toUser: { name: "Jennifer Martinez", email: "jennifer.m@example.com" },
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    approvalTypes: ["Role Assignment", "Template Approval"],
    status: "revoked",
    reason: "Emergency - revoked early",
  },
];

const Delegation: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  // Calculate stats
  const totalDelegations = mockDelegations.length;
  const activeDelegations = mockDelegations.filter(
    (d) => d.status === "active"
  ).length;
  const scheduledDelegations = mockDelegations.filter(
    (d) => d.status === "scheduled"
  ).length;
  const expiredDelegations = mockDelegations.filter(
    (d) => d.status === "expired"
  ).length;

  const handleEdit = (delegation: Delegation) => {
    console.log("Edit delegation:", delegation);
  };

  const handleView = (delegation: Delegation) => {
    console.log("View delegation:", delegation);
  };

  // Table columns configuration
  const columns: ColumnDef<Delegation>[] = [
    {
      key: "fromUser",
      header: t("delegation.from", "From"),
      render: (item) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {item.fromUser.name}
          </span>
        </div>
      ),
    },
    {
      key: "toUser",
      header: t("delegation.to", "To"),
      render: (item) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">
            {item.toUser.name}
          </span>
        </div>
      ),
    },
    {
      key: "period",
      header: t("delegation.period", "Period"),
      render: (item) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm">
            <div className="text-foreground">{item.startDate}</div>
            <div className="text-muted-foreground">to {item.endDate}</div>
          </div>
        </div>
      ),
    },
    {
      key: "approvalTypes",
      header: t("delegation.approvalTypes", "Approval Types"),
      render: (item) => (
        <div className="flex flex-wrap gap-1">
          {item.approvalTypes.map((type, index) => (
            <ApprovalTypeBadge key={index} type={type} />
          ))}
        </div>
      ),
    },
    {
      key: "status",
      header: t("delegation.status", "Status"),
      render: (item) => <DelegationStatusBadge status={item.status} />,
    },
    {
      key: "reason",
      header: t("delegation.reason", "Reason"),
      render: (item) => (
        <span className="text-muted-foreground">{item.reason}</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Page Header */}
      <PageHeader
        icon={ArrowRightLeft}
        title={t("delegation.title", "Approval Delegation")}
        description={t(
          "delegation.description",
          "Delegate approval authority to other users"
        )}
        actions={[
          {
            label: t("delegation.createDelegation", "Create Delegation"),
            icon: Plus,
            variant: "create",
            onClick: () => navigate("/delegation/create"),
          },
        ]}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label={t("delegation.totalDelegations", "Total Delegations")}
          value={totalDelegations}
          valueColor="text-foreground"
        />
        <StatsCard
          label={t("delegation.active", "Active")}
          value={activeDelegations}
          valueColor="text-success"
        />
        <StatsCard
          label={t("delegation.scheduled", "Scheduled")}
          value={scheduledDelegations}
          valueColor="text-info"
        />
        <StatsCard
          label={t("delegation.expired", "Expired")}
          value={expiredDelegations}
          valueColor="text-muted-foreground"
        />
      </div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t("delegation.historyTitle", "Delegation History")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t(
              "delegation.historyDescription",
              "Manage and track approval delegations"
            )}
          </p>
        </div>
        <SearchAndFilters
          searchPlaceholder={t(
            "delegation.searchPlaceholder",
            "Search delegations..."
          )}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filters={[
            {
              name: "status",
              placeholder: t("delegation.allStatus", "All Status"),
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                {
                  value: "all",
                  label: t("delegation.allStatus", "All Status"),
                },
                { value: "active", label: t("delegation.active", "Active") },
                {
                  value: "scheduled",
                  label: t("delegation.scheduled", "Scheduled"),
                },
                { value: "expired", label: t("delegation.expired", "Expired") },
                { value: "revoked", label: t("delegation.revoked", "Revoked") },
              ],
            },
          ]}
        />
      </div>

      {/* Delegations Table */}
      <DataTable
        data={mockDelegations}
        columns={columns}
        keyExtractor={(item) => item.id}
        onEdit={handleEdit}
        onView={handleView}
      />

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={totalDelegations}
        itemsPerPage={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Delegation;
