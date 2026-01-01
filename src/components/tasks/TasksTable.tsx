import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { CategoryBadge } from "./CategoryBadge";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | "overdue";
  assignedBy: {
    name: string;
    avatar?: string;
  };
  startDate: string;
  dueDate: string;
  category: string;
}

interface TasksTableProps {
  tasks: Task[];
  onView?: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export function TasksTable({ tasks, onView, onEdit, onDelete }: TasksTableProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold text-foreground">Task</TableHead>
            <TableHead className="font-semibold text-foreground">Priority</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-semibold text-foreground">Assigned By</TableHead>
            <TableHead className="font-semibold text-foreground">Start Date</TableHead>
            <TableHead className="font-semibold text-foreground">Due Date</TableHead>
            <TableHead className="font-semibold text-foreground">Category</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-muted/30">
              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{task.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {task.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <PriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={task.assignedBy.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedBy.name}`}
                      alt={task.assignedBy.name}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(task.assignedBy.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-foreground">{task.assignedBy.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {task.startDate}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {task.dueDate}
              </TableCell>
              <TableCell>
                <CategoryBadge category={task.category} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(task)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(task)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete?.(task)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TasksTable;
