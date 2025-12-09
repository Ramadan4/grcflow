import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  title: string;
  value: number;
  label: string;
  color?: "success" | "primary" | "info";
  legend?: { label: string; value: number }[];
}

export function DonutChart({ 
  title, 
  value, 
  label,
  color = "primary",
  legend 
}: DonutChartProps) {
  const colors = {
    success: "text-success",
    primary: "text-primary", 
    info: "text-info",
  };

  const strokeColors = {
    success: "stroke-success",
    primary: "stroke-primary",
    info: "stroke-info",
  };

  const percentage = Math.min(Math.max(value, 0), 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              className={strokeColors[color]}
              strokeWidth="10"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
            />
          </svg>
          {/* Value in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-2xl font-bold", colors[color])}>{value}%</span>
          </div>
        </div>
        {legend && (
          <div className="flex gap-6 mt-4 text-xs">
            {legend.map((item, i) => (
              <div key={i} className="text-muted-foreground">
                {item.label}: <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
