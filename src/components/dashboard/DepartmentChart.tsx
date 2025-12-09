import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface DepartmentData {
  name: string;
  users: number;
  color: string;
}

interface DepartmentChartProps {
  title: string;
  data: DepartmentData[];
}

export function DepartmentChart({ title, data }: DepartmentChartProps) {
  const maxUsers = Math.max(...data.map(d => d.users));

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((dept, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{dept.name}</span>
              <span className="text-muted-foreground">{dept.users} users</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${(dept.users / maxUsers) * 100}%`,
                  backgroundColor: dept.color
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
