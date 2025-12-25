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
  ArrowRightLeft,
  LogOut,
  LucideIcon
} from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  badge?: string | number;
  children?: MenuItem[];
}

export interface MenuGroup {
  label: string;
  items: MenuItem[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export const menuConfig: MenuGroup[] = [
  {
    label: "Core Platform & Access Control",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "My Tasks", url: "/tasks", icon: CheckSquare, badge: 5 },
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
    ],
  },
];

export const userMenuItems: MenuItem[] = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Logout", url: "/logout", icon: LogOut },
];

export const defaultUser: UserProfile = {
  name: "John Doe",
  email: "john.doe@company.com",
  role: "Administrator",
};
