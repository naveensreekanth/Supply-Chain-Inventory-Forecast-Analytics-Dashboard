import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  sentiment?: "positive" | "negative" | "neutral";
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const KPICard = ({
  title,
  value,
  change,
  trend = "neutral",
  sentiment,
  subtitle,
  description,
  icon,
}: KPICardProps) => {
  // Determine color based on sentiment if provided, otherwise fallback to trend
  const getTrendColor = () => {
    if (sentiment === "positive") return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40";
    if (sentiment === "negative") return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40";
    if (sentiment === "neutral") return "text-muted-foreground bg-muted";

    // Fallback: up is positive, down is negative
    if (trend === "up") return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40";
    if (trend === "down") return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40";
    return "text-muted-foreground bg-muted";
  };

  const getTrendIcon = () => {
    if (trend === "up") return <ArrowUp className="h-3.5 w-3.5" />;
    if (trend === "down") return <ArrowDown className="h-3.5 w-3.5" />;
    return <Minus className="h-3.5 w-3.5" />;
  };

  return (
    <Card className="p-5 border border-border/80 shadow-sm hover:shadow-md transition-all duration-200 bg-card">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5 flex-1 pr-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</span>
            {description && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" aria-label="Metric details" className="text-muted-foreground/60 hover:text-muted-foreground">
                    <Info className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {description}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{value}</div>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 pt-1 text-xs font-medium">
              <span className={cn("inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full", getTrendColor())}>
                {getTrendIcon()}
                <span>{Math.abs(change)}%</span>
              </span>
              <span className="text-muted-foreground text-[11px] truncate">{subtitle || "vs previous period"}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
