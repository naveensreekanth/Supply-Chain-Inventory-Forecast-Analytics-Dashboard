import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
} from "recharts";
import { MonthlyForecastItem } from "@/types/supply-chain";

interface ForecastAccuracyChartProps {
  data: MonthlyForecastItem[];
}

export const ForecastAccuracyChart = ({ data }: ForecastAccuracyChartProps) => {
  return (
    <Card className="p-6 border border-border/80 shadow-sm bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-foreground">
            Forecast Error & Bias Analysis (MAPE & Tracking Signal)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Error percentages and directional bias (positive bias = over-forecast; negative = under-forecast)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-primary" />
            <span className="text-muted-foreground">MAPE %</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-amber-500" />
            <span className="text-muted-foreground">Bias %</span>
          </div>
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
            unit="%"
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
              `${val > 0 && name === "Forecast Bias (%)" ? "+" : ""}${val}%`,
              name,
            ]}
          />
          <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }} />
          <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1.5} />
          <ReferenceLine
            y={5}
            stroke="hsl(var(--warning))"
            strokeDasharray="3 3"
            label={{ value: "Target Max MAPE (5%)", fill: "hsl(var(--warning))", fontSize: 10, position: "top" }}
          />

          <Bar
            dataKey="mape"
            name="MAPE Error (%)"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Line
            type="monotone"
            dataKey="bias"
            name="Forecast Bias (%)"
            stroke="hsl(var(--warning))"
            strokeWidth={2.5}
            dot={{ fill: "hsl(var(--warning))", r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};
