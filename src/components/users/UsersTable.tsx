import React from "react";
import { MoreVertical, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { RoleBadge } from "./RoleBadge";
import { SecurityBadge } from "./SecurityBadge";
import { StatusBadge } from "./StatusBadge";

export type RoleType = "admin" | "security-officer" | "risk-manager" | "compliance-officer" | "auditor" | "user";
export type StatusType = "active" | "suspended" | "pending" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarBgColor?: string;
  department: string;
  roles: RoleType[];
  lastLogin: string;
  mfaEnabled: boolean;
  status: StatusType;
}

interface UsersTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onView?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEdit,
  onView,
  onDelete,
}) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="font-semibold text-foreground">User</TableHead>
            <TableHead className="font-semibold text-foreground">Department</TableHead>
            <TableHead className="font-semibold text-foreground">Roles</TableHead>
            <TableHead className="font-semibold text-foreground">Last Login</TableHead>
            <TableHead className="font-semibold text-foreground">Security</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/20">
              <TableCell>
                <UserAvatar
                  name={user.name}
                  email={user.email}
                  initials={user.initials}
                  bgColor={user.avatarBgColor}
                />
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {user.department}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {user.roles.map((role) => (
                    <RoleBadge key={role} role={role} />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {user.lastLogin}
              </TableCell>
              <TableCell>
                <SecurityBadge mfaEnabled={user.mfaEnabled} />
              </TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView?.(user)}
                    className="h-8 w-8"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(user)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(user)}>
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete?.(user)}
                        className="text-destructive"
                      >
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
