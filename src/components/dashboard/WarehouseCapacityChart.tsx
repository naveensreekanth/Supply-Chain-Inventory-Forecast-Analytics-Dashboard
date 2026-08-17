import { Card } from "@/components/ui/card";
import { WarehouseNode } from "@/types/supply-chain";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Warehouse, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

interface WarehouseCapacityChartProps {
  warehouses: WarehouseNode[];
}

export const WarehouseCapacityChart = ({ warehouses }: WarehouseCapacityChartProps) => {
  const chartData = warehouses.map((wh) => ({
    name: wh.name.split(" ")[0], // Short name
    fullName: wh.name,
    location: wh.location,
    utilized: wh.utilizedUnits,
    capacity: wh.capacityUnits,
    available: wh.capacityUnits - wh.utilizedUnits,
    utilizationRate: wh.utilizationRate,
    turnaround: wh.avgTurnaroundHours,
    onTimeRate: wh.onTimeDispatchRate,
  }));

  const getStatusColor = (status: WarehouseNode["status"]) => {
    switch (status) {
      case "Optimal":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Near Capacity":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "High Congestion":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
    }
  };

  return (
    <Card className="p-6 border border-border/80 shadow-sm bg-card">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-base lg:text-lg font-semibold text-foreground">
            Regional Distribution Nodes & Warehouse Capacity
          </h3>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
            4 Facilities Active
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Storage utilization, turnaround velocity, and dispatch SLA compliance by logistics hub
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Utilization Bar Chart */}
        <div className="lg:col-span-7">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.7} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: "12px" }}
                tickLine={false}
                tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
                formatter={(val: number, name: string) => [
                  `${val.toLocaleString()} units`,
                  name,
                ]}
              />
              <Legend wrapperStyle={{ paddingTop: "8px", fontSize: "12px" }} />
              <Bar
                dataKey="utilized"
                name="Utilized Storage (Units)"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
              <Bar
                dataKey="available"
                name="Remaining Capacity (Units)"
                fill="hsl(var(--muted))"
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Facility Cards Strip */}
        <div className="lg:col-span-5 space-y-3">
          {warehouses.map((wh) => (
            <div
              key={wh.id}
              className="p-3 rounded-lg border border-border/70 bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Warehouse className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-foreground">{wh.name}</span>
                    <span className="text-[10px] text-muted-foreground ml-1.5">({wh.location})</span>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusColor(wh.status)}`}>
                  {wh.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 my-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Capacity Used</span>
                  <span className="font-semibold text-foreground">{wh.utilizationRate}%</span>
                </div>
                <Progress
                  value={wh.utilizationRate}
                  className={`h-1.5 ${
                    wh.utilizationRate > 90
                      ? "[&>div]:bg-rose-500"
                      : wh.utilizationRate > 80
                      ? "[&>div]:bg-amber-500"
                      : "[&>div]:bg-emerald-500"
                  }`}
                />
              </div>

              {/* Sub metrics */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Turnaround: <strong className="text-foreground">{wh.avgTurnaroundHours}h</strong>
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  On-Time: <strong className="text-foreground">{wh.onTimeDispatchRate}%</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
