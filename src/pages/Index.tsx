import { KPICard } from "@/components/dashboard/KPICard";
import { DemandForecastChart } from "@/components/dashboard/DemandForecastChart";
import { SKUProductivityChart } from "@/components/dashboard/SKUProductivityChart";
import { RegionalTrendsChart } from "@/components/dashboard/RegionalTrendsChart";
import { Package, TrendingUp, AlertTriangle, Warehouse } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">Supply Chain Inventory & Forecast Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">2024 Performance Overview</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Inventory Turnover"
            value="8.4x"
            change={12.5}
            trend="up"
            subtitle="vs last quarter"
            icon={<Package className="h-6 w-6 text-primary" />}
          />
          <KPICard
            title="Forecast Accuracy"
            value="94.2%"
            change={3.8}
            trend="up"
            subtitle="vs target 90%"
            icon={<TrendingUp className="h-6 w-6 text-success" />}
          />
          <KPICard
            title="Stockout Risk"
            value="2.1%"
            change={-1.2}
            trend="down"
            subtitle="improved"
            icon={<AlertTriangle className="h-6 w-6 text-warning" />}
          />
          <KPICard
            title="Warehouse Efficiency"
            value="87.6%"
            change={5.4}
            trend="up"
            subtitle="vs last month"
            icon={<Warehouse className="h-6 w-6 text-accent" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DemandForecastChart />
          <SKUProductivityChart />
        </div>

        {/* Full Width Chart */}
        <div className="grid grid-cols-1 gap-6">
          <RegionalTrendsChart />
        </div>
      </main>
    </div>
  );
};

export default Index;
