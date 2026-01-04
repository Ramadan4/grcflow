import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Edit, Copy, Trash2 } from "lucide-react";
import RoleTypeBadge from "./RoleTypeBadge";
import SodConflictBadge from "./SodConflictBadge";

export interface RoleData {
  id: string;
  name: string;
  description: string;
  type: "system" | "custom";
  permissionsCount: number;
  assignedUsers: number;
  sodConflicts: number;
  status: "active" | "inactive";
}

interface RolesTableProps {
  roles: RoleData[];
  onViewUsers?: (role: RoleData) => void;
  onEdit?: (role: RoleData) => void;
  onDuplicate?: (role: RoleData) => void;
  onDelete?: (role: RoleData) => void;
}

const RolesTable = ({
  roles,
  onViewUsers,
  onEdit,
  onDuplicate,
  onDelete,
}: RolesTableProps) => {
  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-semibold text-foreground">
              Role Details
            </TableHead>
            <TableHead className="font-semibold text-foreground">Type</TableHead>
            <TableHead className="font-semibold text-foreground">
              Permissions
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Assigned Users
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              SoD Conflicts
            </TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-semibold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id} className="hover:bg-muted/50">
              <TableCell>
                <div className="space-y-0.5">
                  <p className="font-medium text-foreground">{role.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <RoleTypeBadge type={role.type} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">{role.permissionsCount}</span>
                  <span className="text-muted-foreground">permissions</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">{role.assignedUsers}</span>
                  <span className="text-muted-foreground">users</span>
                </div>
              </TableCell>
              <TableCell>
                <SodConflictBadge conflicts={role.sodConflicts} />
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    role.status === "active"
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {role.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onViewUsers?.(role)}
                  >
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit?.(role)}
                  >
                    <Edit className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDuplicate?.(role)}
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDelete?.(role)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RolesTable;
