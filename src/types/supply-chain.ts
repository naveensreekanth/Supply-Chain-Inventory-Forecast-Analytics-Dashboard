export type Region = "All Regions" | "North" | "South" | "East" | "West";
export type ProductCategory = "All Categories" | "Electronics" | "Apparel" | "Industrial" | "Automotive" | "FMCG";
export type TimeHorizon = "Last 30 Days" | "Q1 2024" | "Q2 2024" | "Q3 2024" | "Q4 2024" | "Full Year 2024";

export interface KPIMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  sentiment: "positive" | "negative" | "neutral";
  subtitle: string;
  description?: string;
}

export interface MonthlyForecastItem {
  month: string;
  actual: number;
  forecast: number;
  lower80: number;
  upper80: number;
  lower95: number;
  upper95: number;
  mape: number; // Mean absolute percentage error (%)
  bias: number; // Tracking bias (+ is over-forecast, - is under-forecast)
}

export type StockHealthStatus = "Critical" | "Low Stock" | "Optimal" | "Surplus";

export interface SKUInventoryItem {
  id: string;
  sku: string;
  name: string;
  category: "Electronics" | "Apparel" | "Industrial" | "Automotive" | "FMCG";
  region: "North" | "South" | "East" | "West";
  currentStock: number;
  safetyStock: number;
  reorderPoint: number;
  dailyDemand: number;
  leadTimeDays: number;
  daysOfSupply: number;
  turnoverRate: number;
  productivityScore: number;
  unitCost: number;
  status: StockHealthStatus;
}

export interface RegionalTrendItem {
  month: string;
  north: number;
  south: number;
  east: number;
  west: number;
  total?: number;
}

export interface WarehouseNode {
  id: string;
  name: string;
  region: "North" | "South" | "East" | "West";
  location: string;
  capacityUnits: number;
  utilizedUnits: number;
  utilizationRate: number;
  avgTurnaroundHours: number;
  onTimeDispatchRate: number;
  status: "Optimal" | "Near Capacity" | "High Congestion";
}

export interface ScenarioSimulationResult {
  projectedStockoutRisk: number;
  projectedServiceLevel: number;
  holdingCostDeltaPct: number;
  recommendedSafetyStockDeltaPct: number;
  criticalSKUCount: number;
}
