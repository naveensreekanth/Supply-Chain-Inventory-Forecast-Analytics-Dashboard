import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", north: 2400, south: 1800, east: 2200, west: 2000 },
  { month: "Feb", north: 2200, south: 1900, east: 2100, west: 2100 },
  { month: "Mar", north: 2600, south: 2100, east: 2400, west: 2200 },
  { month: "Apr", north: 2800, south: 2300, east: 2500, west: 2400 },
  { month: "May", north: 3000, south: 2400, east: 2700, west: 2500 },
  { month: "Jun", north: 2900, south: 2500, east: 2600, west: 2600 },
];

export const RegionalTrendsChart = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Regional Inventory Trends</h3>
        <p className="text-sm text-muted-foreground">Distribution across regional warehouses</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
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
          <Area 
            type="monotone" 
            dataKey="north" 
            stackId="1" 
            stroke="hsl(var(--chart-1))" 
            fill="hsl(var(--chart-1))"
            fillOpacity={0.6}
            name="North Region"
          />
          <Area 
            type="monotone" 
            dataKey="south" 
            stackId="1" 
            stroke="hsl(var(--chart-2))" 
            fill="hsl(var(--chart-2))"
            fillOpacity={0.6}
            name="South Region"
          />
          <Area 
            type="monotone" 
            dataKey="east" 
            stackId="1" 
            stroke="hsl(var(--chart-3))" 
            fill="hsl(var(--chart-3))"
            fillOpacity={0.6}
            name="East Region"
          />
          <Area 
            type="monotone" 
            dataKey="west" 
            stackId="1" 
            stroke="hsl(var(--chart-4))" 
            fill="hsl(var(--chart-4))"
            fillOpacity={0.6}
            name="West Region"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
