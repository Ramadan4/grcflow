import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface UserData {
  name: string;
  department: string;
  actions: number;
}

interface TopUsersCardProps {
  title: string;
  users: UserData[];
}

export function TopUsersCard({ title, users }: TopUsersCardProps) {
  const rankColors = [
    "bg-primary text-primary-foreground",
    "bg-info text-info-foreground",
    "bg-success text-success-foreground",
    "bg-warning text-warning-foreground",
    "bg-chart-5 text-white",
  ];

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {users.map((user, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${rankColors[index] || "bg-muted text-muted-foreground"}`}>
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.department}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              {user.actions} actions
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
