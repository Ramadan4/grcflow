// Dashboard page content - layout is handled by MainLayout in App.tsx
import { StatCard } from "@/components/dashboard/StatCard";
import { GaugeChart } from "@/components/dashboard/GaugeChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { TopUsersCard } from "@/components/dashboard/TopUsersCard";
import { MiniStatCard } from "@/components/dashboard/MiniStatCard";
import { 
  Users, 
  AlertTriangle, 
  RefreshCcw,
  LayoutDashboard,
  Moon,
  ArrowRightLeft,
  Shield,
  AlertCircle,
  Calendar
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const departmentData = [
  { name: "IT", users: 8, color: "hsl(var(--destructive))" },
  { name: "Risk", users: 6, color: "hsl(var(--warning))" },
  { name: "Compliance", users: 5, color: "hsl(var(--success))" },
  { name: "Audit", users: 4, color: "hsl(var(--primary))" },
  { name: "HR", users: 5, color: "hsl(var(--info))" },
];

const topUsers = [
  { name: "John Doe", department: "IT", actions: 1248 },
  { name: "Alice Smith", department: "Risk", actions: 1156 },
  { name: "Bob Johnson", department: "Compliance", actions: 1089 },
  { name: "Sarah Williams", department: "Audit", actions: 967 },
  { name: "Mike Davis", department: "HR", actions: 834 },
];

export default function Dashboard() {
  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary">
              <LayoutDashboard className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">GRC Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Real-time metrics and KPIs for governance, risk, and compliance monitoring
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select defaultValue="7days">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Users"
            value={245}
            icon={Users}
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
            badge={{ text: "+12.5%", variant: "success" }}
            subtitle="vs 218 previous period"
          />
          <StatCard
            title="Total Users"
            value={342}
            icon={Users}
            iconBgColor="bg-info/10"
            iconColor="text-info"
            badge={{ text: "+3.2%", variant: "success" }}
            subtitle="Active accounts"
          />
          <StatCard
            title="Failed Login Rate"
            value="5.8%"
            icon={AlertTriangle}
            iconBgColor="bg-warning/10"
            iconColor="text-warning"
            badge={{ text: "Improving", variant: "success" }}
            subtitle="Of total login attempts"
          />
          <StatCard
            title="SoD Violations"
            value={7}
            icon={RefreshCcw}
            iconBgColor="bg-info/10"
            iconColor="text-info"
            badge={{ text: "Open", variant: "info" }}
            subtitle="5 pending, 2 escalated"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GaugeChart
            title="Login Success Rate"
            value={94.2}
            label="Excellent"
            color="success"
          />
          <DonutChart
            title="MFA Adoption Rate"
            value={71.6}
            label="Active users with MFA"
            color="primary"
            legend={[
              { label: "With MFA", value: 245 },
              { label: "Without", value: 97 },
            ]}
          />
          <GaugeChart
            title="Access Anomaly Rate"
            value={2.1}
            label="Normal"
            color="warning"
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DepartmentChart
            title="Inactive Accounts by Department"
            data={departmentData}
          />
          <TopUsersCard
            title="Top 5 Most Active Users"
            users={topUsers}
          />
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MiniStatCard
            title="After-Hours Logins"
            value={34}
            icon={Moon}
            iconColor="text-chart-5"
          />
          <MiniStatCard
            title="Delegations Active"
            value={12}
            icon={ArrowRightLeft}
            iconColor="text-info"
          />
          <MiniStatCard
            title="Role Changes"
            value={156}
            icon={Shield}
            iconColor="text-success"
          />
          <MiniStatCard
            title="High Severity Events"
            value={23}
            icon={AlertCircle}
            iconColor="text-destructive"
          />
        </div>
      </div>
    </>
  );
}
