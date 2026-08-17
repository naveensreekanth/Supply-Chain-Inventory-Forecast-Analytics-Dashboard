import { useState, useMemo } from "react";
import { Header } from "@/components/dashboard/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { DemandForecastChart } from "@/components/dashboard/DemandForecastChart";
import { SKUProductivityChart } from "@/components/dashboard/SKUProductivityChart";
import { RegionalTrendsChart } from "@/components/dashboard/RegionalTrendsChart";
import { ForecastAccuracyChart } from "@/components/dashboard/ForecastAccuracyChart";
import { InventoryTable } from "@/components/dashboard/InventoryTable";
import { ScenarioPlanner } from "@/components/dashboard/ScenarioPlanner";
import { WarehouseCapacityChart } from "@/components/dashboard/WarehouseCapacityChart";
import {
  initialMonthlyForecasts,
  initialSKUInventory,
  initialRegionalTrends,
  initialWarehouses,
} from "@/data/mock-supply-chain-data";
import { Region, ProductCategory, TimeHorizon, SKUInventoryItem } from "@/types/supply-chain";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  Warehouse,
  BarChart3,
  LayoutDashboard,
  Layers,
  Sparkles,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>("All Regions");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All Categories");
  const [selectedHorizon, setSelectedHorizon] = useState<TimeHorizon>("Full Year 2024");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [skus, setSkus] = useState<SKUInventoryItem[]>(initialSKUInventory);

  // Filter SKUs based on selected region and category
  const filteredSKUs = useMemo(() => {
    return skus.filter((item) => {
      const matchRegion = selectedRegion === "All Regions" || item.region === selectedRegion;
      const matchCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
      return matchRegion && matchCategory;
    });
  }, [skus, selectedRegion, selectedCategory]);

  // Filter forecast data based on time horizon
  const filteredForecasts = useMemo(() => {
    switch (selectedHorizon) {
      case "Q1 2024":
        return initialMonthlyForecasts.slice(0, 3);
      case "Q2 2024":
        return initialMonthlyForecasts.slice(3, 6);
      case "Q3 2024":
        return initialMonthlyForecasts.slice(6, 9);
      case "Q4 2024":
        return initialMonthlyForecasts.slice(9, 12);
      case "Last 30 Days":
        return initialMonthlyForecasts.slice(10, 12);
      case "Full Year 2024":
      default:
        return initialMonthlyForecasts;
    }
  }, [selectedHorizon]);

  // Filter regional trends
  const filteredRegionalTrends = useMemo(() => {
    switch (selectedHorizon) {
      case "Q1 2024":
        return initialRegionalTrends.slice(0, 3);
      case "Q2 2024":
        return initialRegionalTrends.slice(3, 6);
      case "Q3 2024":
        return initialRegionalTrends.slice(6, 9);
      case "Q4 2024":
        return initialRegionalTrends.slice(9, 12);
      case "Last 30 Days":
        return initialRegionalTrends.slice(10, 12);
      default:
        return initialRegionalTrends;
    }
  }, [selectedHorizon]);

  // Filter warehouses based on region
  const filteredWarehouses = useMemo(() => {
    if (selectedRegion === "All Regions") return initialWarehouses;
    return initialWarehouses.filter((wh) => wh.region === selectedRegion);
  }, [selectedRegion]);

  // Calculate dynamic KPIs
  const kpiTurnover = useMemo(() => {
    if (filteredSKUs.length === 0) return "8.4x";
    const avg = filteredSKUs.reduce((acc, s) => acc + s.turnoverRate, 0) / filteredSKUs.length;
    return `${avg.toFixed(1)}x`;
  }, [filteredSKUs]);

  const kpiForecastAccuracy = useMemo(() => {
    if (filteredForecasts.length === 0) return "94.2%";
    const avgMAPE = filteredForecasts.reduce((acc, f) => acc + f.mape, 0) / filteredForecasts.length;
    return `${(100 - avgMAPE).toFixed(1)}%`;
  }, [filteredForecasts]);

  const kpiStockoutRisk = useMemo(() => {
    if (filteredSKUs.length === 0) return "2.1%";
    const criticalCount = filteredSKUs.filter((s) => s.status === "Critical").length;
    const rate = (criticalCount / filteredSKUs.length) * 10;
    return `${Math.max(1.2, +rate.toFixed(1))}%`;
  }, [filteredSKUs]);

  const kpiWarehouseEfficiency = useMemo(() => {
    if (filteredWarehouses.length === 0) return "87.6%";
    const avgOnTime =
      filteredWarehouses.reduce((acc, w) => acc + w.onTimeDispatchRate, 0) / filteredWarehouses.length;
    return `${avgOnTime.toFixed(1)}%`;
  }, [filteredWarehouses]);

  // Quick reorder handler
  const handleReorderSKU = (skuId: string, quantity: number) => {
    setSkus((prev) =>
      prev.map((item) => {
        if (item.id === skuId) {
          const newStock = item.currentStock + quantity;
          const newDaysOfSupply = Math.round(newStock / item.dailyDemand);
          return {
            ...item,
            currentStock: newStock,
            daysOfSupply: newDaysOfSupply,
            status: newStock > item.reorderPoint ? "Optimal" : "Low Stock",
          };
        }
        return item;
      })
    );
  };

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Telemetry updated with latest warehouse data.");
    }, 600);
  };

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = [
      "SKU",
      "Name",
      "Category",
      "Region",
      "Current Stock",
      "Safety Stock",
      "Reorder Point",
      "Daily Demand",
      "Lead Time (Days)",
      "Days of Supply",
      "Turnover Rate (x)",
      "Productivity Score (%)",
      "Unit Cost ($)",
      "Status",
    ];

    const rows = filteredSKUs.map((s) => [
      s.sku,
      `"${s.name}"`,
      s.category,
      s.region,
      s.currentStock,
      s.safetyStock,
      s.reorderPoint,
      s.dailyDemand,
      s.leadTimeDays,
      s.daysOfSupply,
      s.turnoverRate,
      s.productivityScore,
      s.unitCost,
      s.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `supply_chain_inventory_report_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV report downloaded successfully.");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Top Application Header */}
      <Header
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedHorizon={selectedHorizon}
        onHorizonChange={setSelectedHorizon}
        onExportData={handleExportCSV}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* KPI Strip */}
        <section aria-label="Executive Key Performance Indicators">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Inventory Turnover"
              value={kpiTurnover}
              change={12.5}
              trend="up"
              sentiment="positive"
              subtitle="vs last quarter (8.0x target)"
              description="Calculated as COGS divided by Average Inventory value. Measures how rapidly stock is sold and replenished."
              icon={<Package className="h-5 w-5" />}
            />
            <KPICard
              title="Forecast Accuracy"
              value={kpiForecastAccuracy}
              change={3.8}
              trend="up"
              sentiment="positive"
              subtitle="vs 90.0% target"
              description="100% minus Mean Absolute Percentage Error (MAPE). Measures precision of statistical demand forecasts."
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <KPICard
              title="Stockout Risk Rate"
              value={kpiStockoutRisk}
              change={1.2}
              trend="down"
              sentiment="positive"
              subtitle="improved vs Q3"
              description="Percentage of active SKUs whose inventory level has breached or threatens to breach safety stock levels."
              icon={<AlertTriangle className="h-5 w-5" />}
            />
            <KPICard
              title="Warehouse Efficiency"
              value={kpiWarehouseEfficiency}
              change={5.4}
              trend="up"
              sentiment="positive"
              subtitle="on-time dispatch SLA"
              description="Percentage of customer orders dispatched on-time within guaranteed fulfillment turnaround thresholds."
              icon={<Warehouse className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Tabbed Navigation Modules */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex items-center justify-between overflow-x-auto pb-1 border-b border-border/70">
            <TabsList className="h-10 bg-muted/60 p-1 rounded-xl">
              <TabsTrigger value="overview" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" />
                Executive Overview
              </TabsTrigger>
              <TabsTrigger value="forecasting" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
                <BarChart3 className="h-3.5 w-3.5" />
                Demand Forecasting
              </TabsTrigger>
              <TabsTrigger value="inventory" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
                <Layers className="h-3.5 w-3.5" />
                Inventory & Stockouts ({filteredSKUs.length})
              </TabsTrigger>
              <TabsTrigger value="warehouses" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
                <Truck className="h-3.5 w-3.5" />
                Logistics & Nodes
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="text-xs font-semibold gap-1.5 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Scenario Simulator
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab 1: Executive Overview */}
          <TabsContent value="overview" className="space-y-6 m-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DemandForecastChart data={filteredForecasts} />
              <SKUProductivityChart skus={filteredSKUs} />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <RegionalTrendsChart data={filteredRegionalTrends} />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <InventoryTable skus={filteredSKUs} onReorderSKU={handleReorderSKU} />
            </div>
          </TabsContent>

          {/* Tab 2: Demand Forecasting */}
          <TabsContent value="forecasting" className="space-y-6 m-0">
            <div className="grid grid-cols-1 gap-6">
              <DemandForecastChart data={filteredForecasts} />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <ForecastAccuracyChart data={filteredForecasts} />
            </div>
          </TabsContent>

          {/* Tab 3: Inventory Health & Stockouts */}
          <TabsContent value="inventory" className="space-y-6 m-0">
            <div className="grid grid-cols-1 gap-6">
              <InventoryTable skus={filteredSKUs} onReorderSKU={handleReorderSKU} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SKUProductivityChart skus={filteredSKUs} />
              <ScenarioPlanner skus={filteredSKUs} />
            </div>
          </TabsContent>

          {/* Tab 4: Logistics & Warehouses */}
          <TabsContent value="warehouses" className="space-y-6 m-0">
            <div className="grid grid-cols-1 gap-6">
              <WarehouseCapacityChart warehouses={filteredWarehouses} />
            </div>
            <div className="grid grid-cols-1 gap-6">
              <RegionalTrendsChart data={filteredRegionalTrends} />
            </div>
          </TabsContent>

          {/* Tab 5: Scenario Simulator */}
          <TabsContent value="scenarios" className="space-y-6 m-0">
            <ScenarioPlanner skus={filteredSKUs} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-4 mt-8">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <div>
            Supply Chain & Inventory Forecast Analytics Platform © 2024. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">API Status</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Audit Logs</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
