import { useState } from "react";
import { ChevronDown, Shield, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MenuGroup, MenuItem, UserProfile } from "@/config/menuConfig";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarNavProps {
  menuGroups: MenuGroup[];
  user?: UserProfile;
  logo?: {
    title: string;
    subtitle?: string;
    description?: string;
  };
}

function MenuItemComponent({ item, collapsed }: { item: MenuItem; collapsed: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="h-10 w-full justify-between">
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
              </div>
              {!collapsed && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-6 mt-1 space-y-1 border-l border-sidebar-border pl-3">
              {item.children?.map((child) => (
                <SidebarMenuItem key={child.title}>
                  <SidebarMenuButton asChild className="h-9">
                    <NavLink
                      to={child.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors text-sm"
                      activeClassName="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      <child.icon className="h-4 w-4 shrink-0" />
                      <span>{child.title}</span>
                      {child.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {child.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className="h-10">
        <NavLink
          to={item.url}
          end={item.url === "/"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <item.icon className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="text-sm font-medium">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function SidebarNav({
  menuGroups,
  user,
  logo = { title: "GRC", subtitle: "Flow", description: "Governance Platform" },
}: SidebarNavProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar className="border-r-0" collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-accent shrink-0">
            <Shield className="h-5 w-5 text-sidebar-foreground" />
          </div>
          {!collapsed && (
            <>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-sidebar-foreground">
                  {logo.title}
                </span>
                {logo.subtitle && (
                  <span className="text-lg font-bold text-primary">{logo.subtitle}</span>
                )}
                {logo.description && (
                  <span className="text-xs text-sidebar-foreground/70">
                    {logo.description}
                  </span>
                )}
              </div>
              <button className="ml-auto p-1.5 rounded-md hover:bg-sidebar-accent transition-colors">
                <Sparkles className="h-4 w-4 text-sidebar-foreground/70" />
              </button>
            </>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-3 mb-2">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <MenuItemComponent
                    key={item.title}
                    item={item}
                    collapsed={collapsed}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {user && (
        <SidebarFooter className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </span>
                <span className="text-xs text-sidebar-foreground/60 truncate">
                  {user.email}
                </span>
              </div>
            )}
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
