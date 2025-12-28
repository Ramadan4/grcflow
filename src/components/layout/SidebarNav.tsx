import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
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
import { useTranslation } from "react-i18next";

interface SidebarNavProps {
  menuGroups: MenuGroup[];
  user?: UserProfile;
  logo?: {
    title: string;
    subtitle?: string;
    description?: string;
  };
}

function MenuItemComponent({
  item,
  collapsed,
}: {
  item: MenuItem;
  collapsed: boolean;
}) {
  const{t}=useTranslation()
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="h-10 w-full justify-between hover:bg-sidebar-accent rounded-lg">
              <div className="flex items-center gap-3">
                <item.icon className="h-[18px] w-[18px] shrink-0 text-sidebar-foreground/70" />
                {!collapsed && (
                  <span className="text-[13px] font-normal">{t(item.title)}</span>
                )}
              </div>
              {!collapsed && (
                <ChevronRight
                  className={cn(
                    "h-4 w-4 text-sidebar-foreground/50 transition-transform duration-200",
                    isOpen && "rotate-90"
                  )}
                />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="ml-7 mt-1 space-y-0.5 border-l border-sidebar-border/50 pl-3">
              {item.children?.map((child) => (
                <SidebarMenuItem key={child.title}>
                  <SidebarMenuButton asChild className="h-9">
                    <NavLink
                      to={child.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors text-[13px]"
                      activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    >
                      <child.icon className="h-4 w-4 shrink-0" />
                      <span>{t(child.title)}</span>
                      {child.badge && (
                        <Badge className="ml-auto h-5 min-w-5 flex items-center justify-center rounded-full bg-sidebar-foreground/20 text-sidebar-foreground text-[10px] font-medium px-1.5">
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
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors group"
          activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
        >
          <item.icon className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && (
            <>
              <span className="text-[13px] font-normal flex-1 text-start" >
                {t(item.title)}
              </span>
              {item.badge && (
                <Badge className="h-5 min-w-5 flex items-center justify-center rounded-full bg-sidebar-foreground/20 text-sidebar-foreground text-[10px] font-medium px-1.5">
                  {item.badge}
                </Badge>
              )}
              {item.url === "/" && (
                <ChevronRight className="h-4 w-4 text-primary-foreground/70 opacity-0 group-[.active]:opacity-100" />
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
  const { i18n, t } = useTranslation();

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Sidebar
      className="border-r-0"
      collapsible="icon"
      side={i18n.language === "ar" ? "right" : "left"}
    >
      <SidebarHeader className="px-4 py-4 border-b border-sidebar-border/30">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/80 to-primary shrink-0 shadow-sm">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          {!collapsed && (
            <>
              <div className="flex flex-col leading-tight">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-base font-semibold text-sidebar-foreground">
                    {logo.title}
                  </span>
                </div>
                {logo.subtitle && (
                  <span className="text-base font-bold text-primary">
                    {logo.subtitle}
                  </span>
                )}
                {logo.description && (
                  <span className="text-[11px] text-sidebar-foreground/50 mt-0.5">
                    {logo.description}
                  </span>
                )}
              </div>
              <button className="ml-auto p-1.5 rounded-md hover:bg-sidebar-accent transition-colors">
                <Sparkles className="h-4 w-4 text-sidebar-foreground/50" />
              </button>
            </>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {menuGroups.map((group) => (
          <SidebarGroup key={group.label} className="mb-2">
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-3">
                {t(group.label)}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
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
        <SidebarFooter className="border-t border-sidebar-border/30 p-3 mt-auto">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-[11px] font-medium">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-[13px] font-medium text-sidebar-foreground truncate">
                  {user.name}
                </span>
                <span className="text-[11px] text-sidebar-foreground/50 truncate">
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
