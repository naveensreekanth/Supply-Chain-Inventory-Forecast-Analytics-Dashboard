import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", actual: 4200, forecast: 4000 },
  { month: "Feb", actual: 3800, forecast: 4100 },
  { month: "Mar", actual: 4500, forecast: 4300 },
  { month: "Apr", actual: 4800, forecast: 4600 },
  { month: "May", actual: 5200, forecast: 5000 },
  { month: "Jun", actual: 5100, forecast: 5300 },
  { month: "Jul", actual: 5600, forecast: 5400 },
  { month: "Aug", actual: 5800, forecast: 5700 },
  { month: "Sep", actual: 5400, forecast: 5500 },
  { month: "Oct", actual: 6000, forecast: 5800 },
  { month: "Nov", actual: 6200, forecast: 6100 },
  { month: "Dec", actual: 6500, forecast: 6300 },
];

export const DemandForecastChart = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Monthly Demand vs Forecast</h3>
        <p className="text-sm text-muted-foreground">Actual demand compared to forecasted values (2024)</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
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
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            name="Actual Demand"
            dot={{ fill: 'hsl(var(--chart-1))' }}
          />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Forecasted Demand"
            dot={{ fill: 'hsl(var(--chart-2))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
