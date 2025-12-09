import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Shield, 
  Key, 
  Lock, 
  FileText, 
  BarChart3, 
  GitBranch, 
  Bell, 
  FileStack, 
  Building2, 
  User, 
  Settings,
  Sparkles,
  ArrowRightLeft
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Delegation", url: "/delegation", icon: ArrowRightLeft },
  { title: "Users", url: "/users", icon: Users },
  { title: "Roles & Permissions", url: "/roles", icon: Shield },
  { title: "SSO Configuration", url: "/sso", icon: Key },
  { title: "Security Policies", url: "/security", icon: Lock },
  { title: "Audit Logs", url: "/audit", icon: FileText },
  { title: "User Activity", url: "/activity", icon: BarChart3 },
  { title: "Workflows", url: "/workflows", icon: GitBranch },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Templates", url: "/templates", icon: FileStack },
  { title: "Organization", url: "/organization", icon: Building2 },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent">
            <Shield className="h-5 w-5 text-sidebar-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-sidebar-foreground">GRC</span>
            <span className="text-lg font-bold text-primary">Flow</span>
            <span className="text-xs text-sidebar-foreground/70">Governance Platform</span>
          </div>
          <button className="ml-auto p-1.5 rounded-md hover:bg-sidebar-accent transition-colors">
            <Sparkles className="h-4 w-4 text-sidebar-foreground/70" />
          </button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-3 mb-2">
            Core Platform & Access Control
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
