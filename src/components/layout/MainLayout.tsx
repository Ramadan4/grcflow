import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";
import { Topbar } from "./Topbar";
import { menuConfig, defaultUser, MenuGroup, UserProfile } from "@/config/menuConfig";

interface MainLayoutProps {
  children: React.ReactNode;
  menuGroups?: MenuGroup[];
  user?: UserProfile;
  showSearch?: boolean;
  onLogout?: () => void;
  logo?: {
    title: string;
    subtitle?: string;
    description?: string;
  };
}

export function MainLayout({
  children,
  menuGroups = menuConfig,
  user = defaultUser,
  showSearch = true,
  onLogout,
  logo,
}: MainLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNav menuGroups={menuGroups} user={user} logo={logo} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar user={user} onLogout={onLogout} showSearch={showSearch} />
          <main className="flex-1 overflow-auto bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
