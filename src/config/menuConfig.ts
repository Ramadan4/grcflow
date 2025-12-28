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
  LucideIcon,
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
    label: "sidebar.platformLabel",
    items: [
      { title: "sidebar.dashboard", url: "/", icon: LayoutDashboard },
      { title: "sidebar.myTasks", url: "/tasks", icon: CheckSquare, badge: 5 },
      { title: "sidebar.delegation", url: "/delegation", icon: ArrowRightLeft },
      { title: "sidebar.users", url: "/users", icon: Users },
      { title: "sidebar.rolesPermissions", url: "/roles", icon: Shield },
      { title: "sidebar.ssoConfiguration", url: "/sso", icon: Key },
      { title: "sidebar.securityPolicies", url: "/security", icon: Lock },
      { title: "sidebar.auditLogs", url: "/audit", icon: FileText },
      { title: "sidebar.userActivity", url: "/activity", icon: BarChart3 },
      { title: "sidebar.workflows", url: "/workflows", icon: GitBranch },
      { title: "sidebar.notifications", url: "/notifications", icon: Bell },
      { title: "sidebar.templates", url: "/templates", icon: FileStack },
      { title: "sidebar.organization", url: "/organization", icon: Building2 },
      { title: "sidebar.profile", url: "/profile", icon: User },
      { title: "sidebar.settings", url: "/settings", icon: Settings },
    ],
  },

  {
    label: "Policy",
    items: [{ title: "policy", url: "/policy", icon: LayoutDashboard }],
  },
  {
    label: "Risk",
    items: [{ title: "Risk", url: "/risk", icon: LayoutDashboard }],
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
