import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GaugeChartProps {
  title: string;
  value: number;
  label: string;
  color?: "success" | "warning" | "danger" | "primary";
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

export function GaugeChart({ 
  title, 
  value, 
  label, 
  color = "success",
  subtitle,
  size = "md"
}: GaugeChartProps) {
  const colors = {
    success: { stroke: "hsl(var(--success))", text: "text-success" },
    warning: { stroke: "hsl(var(--warning))", text: "text-warning" },
    danger: { stroke: "hsl(var(--destructive))", text: "text-destructive" },
    primary: { stroke: "hsl(var(--primary))", text: "text-primary" },
  };

  const sizes = {
    sm: { width: 120, height: 80, textSize: "text-2xl" },
    md: { width: 180, height: 100, textSize: "text-4xl" },
    lg: { width: 220, height: 120, textSize: "text-5xl" },
  };

  const { width, height, textSize } = sizes[size];
  const { stroke, text } = colors[color];
  
  // Calculate the arc
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = 70;
  const startAngle = 180;
  const endAngle = 0;
  const angleRange = startAngle - endAngle;
  const currentAngle = startAngle - (percentage / 100) * angleRange;
  
  const startX = 90 + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = 85 + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = 90 + radius * Math.cos((currentAngle * Math.PI) / 180);
  const endY = 85 + radius * Math.sin((currentAngle * Math.PI) / 180);
  
  const largeArcFlag = percentage > 50 ? 1 : 0;

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        <div className="relative" style={{ width, height }}>
          <svg viewBox="0 0 180 100" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 20 85 A 70 70 0 0 1 160 85"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <path
              d={`M ${startX} ${startY} A 70 70 0 ${largeArcFlag} 0 ${endX} ${endY}`}
              fill="none"
              stroke={stroke}
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>
          {/* Value in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
            <span className={cn(textSize, "font-bold", text)}>{value}%</span>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
