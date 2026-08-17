import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RegionalTrendItem } from "@/types/supply-chain";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RegionalTrendsChartProps {
  data: RegionalTrendItem[];
}

export const RegionalTrendsChart = ({ data }: RegionalTrendsChartProps) => {
  const [viewType, setViewType] = useState<"stacked" | "separate">("stacked");

  return (
    <Card className="p-6 border border-border/80 shadow-sm bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-foreground">
            Regional Inventory & Demand Distribution
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Throughput volume distributed across North, South, East, and West distribution hubs
          </p>
        </div>

        <Tabs value={viewType} onValueChange={(v) => setViewType(v as "stacked" | "separate")}>
          <TabsList className="h-8">
            <TabsTrigger value="stacked" className="text-xs px-3">Stacked Area</TabsTrigger>
            <TabsTrigger value="separate" className="text-xs px-3">Individual Trends</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorNorth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.7} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorSouth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.7} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorEast" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.7} />
              <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorWest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.7} />
              <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.7} />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
            tickLine={false}
            tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()} units`,
              name,
            ]}
          />
          <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }} />

          <Area
            type="monotone"
            dataKey="north"
            stackId={viewType === "stacked" ? "1" : undefined}
            stroke="hsl(var(--chart-1))"
            fill="url(#colorNorth)"
            strokeWidth={2}
            name="North Hub (Chicago)"
          />
          <Area
            type="monotone"
            dataKey="south"
            stackId={viewType === "stacked" ? "1" : undefined}
            stroke="hsl(var(--chart-2))"
            fill="url(#colorSouth)"
            strokeWidth={2}
            name="South Hub (Dallas)"
          />
          <Area
            type="monotone"
            dataKey="east"
            stackId={viewType === "stacked" ? "1" : undefined}
            stroke="hsl(var(--chart-3))"
            fill="url(#colorEast)"
            strokeWidth={2}
            name="East Hub (Allentown)"
          />
          <Area
            type="monotone"
            dataKey="west"
            stackId={viewType === "stacked" ? "1" : undefined}
            stroke="hsl(var(--chart-4))"
            fill="url(#colorWest)"
            strokeWidth={2}
            name="West Hub (Reno)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
