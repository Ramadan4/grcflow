import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckSquare,
  ListTodo,
  Clock,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Inbox,
} from "lucide-react";
import { TaskStatCard, TasksTable, Task } from "@/components/tasks";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Review Security Policy Updates",
    description: "Review and approve the latest security policy updates for Q1 2025",
    priority: "high",
    status: "pending",
    assignedBy: { name: "Sarah Wilson" },
    startDate: "2025-01-10",
    dueDate: "2025-01-20",
    category: "Security Policies",
  },
  {
    id: "2",
    title: "Complete Audit Trail Review",
    description: "Analyze and document findings from the last month's audit trail",
    priority: "medium",
    status: "in_progress",
    assignedBy: { name: "Michael Chen" },
    startDate: "2025-01-08",
    dueDate: "2025-01-18",
    category: "Audit",
  },
  {
    id: "3",
    title: "User Access Request - Marketing Team",
    description: "Review and process access requests for 5 new marketing team members",
    priority: "high",
    status: "pending",
    assignedBy: { name: "HR Department" },
    startDate: "2025-01-15",
    dueDate: "2025-01-16",
    category: "User Management",
  },
  {
    id: "4",
    title: "Workflow Approval - Finance",
    description: "Approve the new expense approval workflow for the finance department",
    priority: "low",
    status: "completed",
    assignedBy: { name: "Finance Team" },
    startDate: "2025-01-05",
    dueDate: "2025-01-12",
    category: "Workflows",
  },
  {
    id: "5",
    title: "SSO Configuration Review",
    description: "Review and test the new SSO configuration for Azure AD integration",
    priority: "high",
    status: "overdue",
    assignedBy: { name: "IT Director" },
    startDate: "2025-01-01",
    dueDate: "2025-01-14",
    category: "SSO",
  },
];

type TabValue = "all" | "pending" | "in_progress" | "completed" | "overdue";

const stats = [
  {
    title: "Total Tasks",
    value: 5,
    subtitle: "All assigned tasks",
    icon: ListTodo,
    variant: "default" as const,
  },
  {
    title: "Pending",
    value: 2,
    subtitle: "Awaiting action",
    icon: Clock,
    variant: "warning" as const,
  },
  {
    title: "In Progress",
    value: 1,
    subtitle: "Currently working",
    icon: RefreshCw,
    variant: "default" as const,
  },
  {
    title: "Completed",
    value: 1,
    subtitle: "Finished tasks",
    icon: CheckCircle,
    variant: "success" as const,
  },
  {
    title: "Overdue",
    value: 1,
    subtitle: "Past due date",
    icon: AlertTriangle,
    variant: "destructive" as const,
  },
];

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = mockTasks.filter((task) => {
    const matchesTab = activeTab === "all" || task.status === activeTab;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleView = (task: Task) => {
    console.log("View task:", task);
  };

  const handleEdit = (task: Task) => {
    console.log("Edit task:", task);
  };

  const handleDelete = (task: Task) => {
    console.log("Delete task:", task);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <CheckSquare className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">My Tasks Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track your assigned tasks and delegations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <TaskStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Task Inbox */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="h-5 w-5 text-foreground" />
              <CardTitle className="text-xl">Task Inbox</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
            <TabsList className="w-full justify-start bg-muted/50 p-1">
              <TabsTrigger value="all" className="flex-1">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex-1">
                Pending
              </TabsTrigger>
              <TabsTrigger value="in_progress" className="flex-1">
                In Progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">
                Completed
              </TabsTrigger>
              <TabsTrigger value="overdue" className="flex-1">
                Overdue
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Table */}
          <TasksTable
            tasks={filteredTasks}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
