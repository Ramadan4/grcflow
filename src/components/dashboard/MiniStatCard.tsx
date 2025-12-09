import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MiniStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}

export function MiniStatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = "text-primary" 
}: MiniStatCardProps) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <Icon className={cn("h-5 w-5 shrink-0", iconColor)} />
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
