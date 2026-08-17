import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MonthlyForecastItem } from "@/types/supply-chain";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DemandForecastChartProps {
  data: MonthlyForecastItem[];
}

export const DemandForecastChart = ({ data }: DemandForecastChartProps) => {
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);

  // Compute key summary metrics
  const totalActual = data.reduce((acc, item) => acc + item.actual, 0);
  const totalForecast = data.reduce((acc, item) => acc + item.forecast, 0);
  const variancePct = ((totalActual - totalForecast) / totalForecast) * 100;
  const avgMAPE = (data.reduce((acc, item) => acc + item.mape, 0) / data.length).toFixed(1);

  return (
    <Card className="p-6 border border-border/80 shadow-sm bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base lg:text-lg font-semibold text-foreground">
              Monthly Demand vs. Forecast (2024)
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">
              MAPE: {avgMAPE}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Statistical comparison of actual consumption against ML-forecasted values
          </p>
        </div>

        {/* Confidence Interval Toggle */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50 self-start sm:self-auto">
          <Switch
            id="ci-toggle"
            checked={showConfidenceBands}
            onCheckedChange={setShowConfidenceBands}
          />
          <Label htmlFor="ci-toggle" className="text-xs font-medium cursor-pointer">
            Confidence Bands (80% / 95%)
          </Label>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/40 rounded-lg text-center text-xs">
        <div>
          <span className="text-muted-foreground">Total Actual:</span>{" "}
          <span className="font-semibold text-foreground">{totalActual.toLocaleString()} units</span>
        </div>
        <div>
          <span className="text-muted-foreground">Total Forecast:</span>{" "}
          <span className="font-semibold text-foreground">{totalForecast.toLocaleString()} units</span>
        </div>
        <div>
          <span className="text-muted-foreground">Net Variance:</span>{" "}
          <span
            className={`font-semibold ${
              variancePct >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {variancePct > 0 ? `+${variancePct.toFixed(1)}%` : `${variancePct.toFixed(1)}%`}
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
          <Legend
            wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }}
          />

          {showConfidenceBands && (
            <>
              <Area
                type="monotone"
                dataKey="upper95"
                stroke="transparent"
                fill="hsl(var(--primary))"
                fillOpacity={0.08}
                name="95% CI Range"
              />
              <Area
                type="monotone"
                dataKey="upper80"
                stroke="transparent"
                fill="hsl(var(--primary))"
                fillOpacity={0.14}
                name="80% CI Range"
              />
            </>
          )}

          <Line
            type="monotone"
            dataKey="actual"
            stroke="hsl(var(--primary))"
            strokeWidth={2.5}
            name="Actual Demand"
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Forecasted Demand"
            dot={{ fill: "hsl(var(--accent))", r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
