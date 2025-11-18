import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { sku: "SKU-001", productivity: 92 },
  { sku: "SKU-002", productivity: 87 },
  { sku: "SKU-003", productivity: 95 },
  { sku: "SKU-004", productivity: 78 },
  { sku: "SKU-005", productivity: 88 },
  { sku: "SKU-006", productivity: 91 },
  { sku: "SKU-007", productivity: 85 },
  { sku: "SKU-008", productivity: 94 },
];

export const SKUProductivityChart = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">SKU Productivity Analysis</h3>
        <p className="text-sm text-muted-foreground">Performance metrics by product SKU (%)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="sku" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Bar 
            dataKey="productivity" 
            fill="hsl(var(--chart-1))" 
            radius={[8, 8, 0, 0]}
            name="Productivity %"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
