import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { SKUInventoryItem } from "@/types/supply-chain";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SKUProductivityChartProps {
  skus: SKUInventoryItem[];
}

export const SKUProductivityChart = ({ skus }: SKUProductivityChartProps) => {
  const [metric, setMetric] = useState<"productivityScore" | "turnoverRate">("productivityScore");

  // Sort SKUs by selected metric
  const sortedData = [...skus]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, 8);

  const getBarColor = (item: SKUInventoryItem) => {
    if (metric === "productivityScore") {
      if (item.productivityScore >= 90) return "hsl(var(--chart-3))"; // green
      if (item.productivityScore >= 80) return "hsl(var(--chart-1))"; // blue
      return "hsl(var(--chart-4))"; // amber
    } else {
      if (item.turnoverRate >= 9.0) return "hsl(var(--chart-3))";
      if (item.turnoverRate >= 8.0) return "hsl(var(--chart-1))";
      return "hsl(var(--chart-4))";
    }
  };

  return (
    <Card className="p-6 border border-border/80 shadow-sm bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-foreground">
            Top SKU Productivity & Turnover Rank
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operational efficiency and velocity metrics by product SKU
          </p>
        </div>

        <Tabs value={metric} onValueChange={(v) => setMetric(v as "productivityScore" | "turnoverRate")}>
          <TabsList className="h-8">
            <TabsTrigger value="productivityScore" className="text-xs px-2.5">
              Productivity (%)
            </TabsTrigger>
            <TabsTrigger value="turnoverRate" className="text-xs px-2.5">
              Turnover (x)
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={sortedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.7} />
          <XAxis
            dataKey="sku"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: "12px" }}
            tickLine={false}
            domain={metric === "productivityScore" ? [60, 100] : [6, 11]}
            unit={metric === "productivityScore" ? "%" : "x"}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
            formatter={(value: number, _name: string, props: { payload?: SKUInventoryItem }) => {
              const item = props.payload;
              return [
                metric === "productivityScore" ? `${value}% (Ranked)` : `${value}x/yr`,
                item ? `${item.name} (${item.category})` : "SKU",
              ];
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }} />
          <Bar
            dataKey={metric}
            name={metric === "productivityScore" ? "Productivity Score (%)" : "Annual Turnover Rate (x)"}
            radius={[6, 6, 0, 0]}
            maxBarSize={38}
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
