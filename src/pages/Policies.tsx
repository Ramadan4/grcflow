import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CheckCircle, Clock, FileEdit, Search, Filter, Plus, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PolicyStatCard, PolicyListCard } from "@/components/governance";

// Mock data - في الواقع هتيجي من API
const mockPolicies = [
  {
    id: "1",
    title: "Data Protection and Privacy Policy",
    status: "published" as const,
    version: "v2.1",
    category: "Privacy",
    framework: "GDPR",
    department: "Legal",
    owner: "Jane Smith",
    effectiveDate: "2024-01-15",
    lastReview: "2024-10-01",
  },
  {
    id: "2",
    title: "Information Security Policy",
    status: "draft" as const,
    version: "v1.0",
    category: "Security",
    framework: "ISO 27001",
    department: "IT Security",
    owner: "John Doe",
    effectiveDate: "2024-12-01",
    lastReview: "2024-11-15",
  },
  {
    id: "3",
    title: "Acceptable Use Policy",
    status: "under-review" as const,
    version: "v3.2",
    category: "Compliance",
    framework: "Internal",
    department: "HR",
    owner: "Sarah Johnson",
    effectiveDate: "2024-02-01",
    lastReview: "2024-11-01",
  },
];

const statsConfig = [
  { title: "Policies", value: 24, icon: FileText, variant: "primary" as const },
  { title: "Published", value: 18, icon: CheckCircle, variant: "success" as const },
  { title: "In Review", value: 4, icon: Clock, variant: "warning" as const },
  { title: "Draft", value: 2, icon: FileEdit, variant: "info" as const },
];

const Policies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || policy.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || policy.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Policies</h1>
            <p className="text-sm text-muted-foreground">Policy List</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Archive className="h-4 w-4" />
            policyArchive
          </Button>
          <Button onClick={() => navigate("/policies/create")} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Policy
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat) => (
          <PolicyStatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            variant={stat.variant}
          />
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter className="h-4 w-4" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="privacy">Privacy</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Policy Cards */}
      <div className="space-y-4">
        {filteredPolicies.map((policy) => (
          <PolicyListCard
            key={policy.id}
            policy={policy}
            onView={(id) => console.log("View", id)}
            onEdit={(id) => console.log("Edit", id)}
            onDelete={(id) => console.log("Delete", id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Policies;
