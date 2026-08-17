import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SKUInventoryItem } from "@/types/supply-chain";
import { runScenarioSimulation } from "@/data/mock-supply-chain-data";
import {
  SlidersHorizontal,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  RotateCcw,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface ScenarioPlannerProps {
  skus: SKUInventoryItem[];
}

export const ScenarioPlanner = ({ skus }: ScenarioPlannerProps) => {
  const [leadTimeMult, setLeadTimeMult] = useState<number>(1.0);
  const [safetyStockMult, setSafetyStockMult] = useState<number>(1.0);
  const [demandShockPct, setDemandShockPct] = useState<number>(0);

  const simulation = runScenarioSimulation(
    leadTimeMult,
    safetyStockMult,
    demandShockPct,
    skus
  );

  const handleReset = () => {
    setLeadTimeMult(1.0);
    setSafetyStockMult(1.0);
    setDemandShockPct(0);
    toast.info("Simulation parameters reset to baseline.");
  };

  const applyPreset = (presetName: string, lt: number, ss: number, ds: number) => {
    setLeadTimeMult(lt);
    setSafetyStockMult(ss);
    setDemandShockPct(ds);
    toast.success(`Preset Applied: ${presetName}`);
  };

  return (
    <Card className="p-6 border border-border/80 shadow-sm bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base lg:text-lg font-semibold text-foreground">
              What-If Supply Chain Risk & Scenario Simulator
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3" />
              Dynamic Monte Carlo Engine
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Test inventory resilience against supplier lead time shocks, demand spikes, and safety stock adjustments
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="h-8 gap-1.5 text-xs self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset to Baseline</span>
        </Button>
      </div>

      {/* Preset Scenarios Strip */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-muted/40 rounded-xl border border-border/60">
        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Instant Presets:
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => applyPreset("Port Congestion / Supply Bottleneck", 1.5, 1.2, 0)}
          className="h-7 text-[11px] px-2.5"
        >
          Port Disruption (+50% Lead Time)
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => applyPreset("Black Friday Surge", 1.1, 1.4, 30)}
          className="h-7 text-[11px] px-2.5"
        >
          Holiday Surge (+30% Demand)
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => applyPreset("Lean Working Capital", 0.9, 0.7, 0)}
          className="h-7 text-[11px] px-2.5"
        >
          Lean Working Capital (-30% Safety Stock)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Lead Time Multiplier */}
          <div className="space-y-2 p-4 rounded-lg bg-muted/20 border border-border/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                Supplier Lead Time Multiplier
              </span>
              <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                {leadTimeMult.toFixed(2)}x ({leadTimeMult >= 1 ? `+${((leadTimeMult - 1) * 100).toFixed(0)}%` : `${((leadTimeMult - 1) * 100).toFixed(0)}%`})
              </span>
            </div>
            <Slider
              value={[leadTimeMult]}
              min={0.8}
              max={2.0}
              step={0.05}
              onValueChange={(val) => setLeadTimeMult(val[0])}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0.8x (Fast Inbound)</span>
              <span>1.0x (Normal)</span>
              <span>2.0x (Severe Delay)</span>
            </div>
          </div>

          {/* Slider 2: Safety Stock Multiplier */}
          <div className="space-y-2 p-4 rounded-lg bg-muted/20 border border-border/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Safety Stock Multiplier
              </span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                {safetyStockMult.toFixed(2)}x ({safetyStockMult >= 1 ? `+${((safetyStockMult - 1) * 100).toFixed(0)}%` : `${((safetyStockMult - 1) * 100).toFixed(0)}%`})
              </span>
            </div>
            <Slider
              value={[safetyStockMult]}
              min={0.5}
              max={2.5}
              step={0.1}
              onValueChange={(val) => setSafetyStockMult(val[0])}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0.5x (Lean / Low Buffer)</span>
              <span>1.0x (Standard Target)</span>
              <span>2.5x (High Buffer)</span>
            </div>
          </div>

          {/* Slider 3: Demand Shock */}
          <div className="space-y-2 p-4 rounded-lg bg-muted/20 border border-border/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
                Demand Surge Factor (% Spike)
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                +{demandShockPct}%
              </span>
            </div>
            <Slider
              value={[demandShockPct]}
              min={0}
              max={50}
              step={5}
              onValueChange={(val) => setDemandShockPct(val[0])}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0% (Steady Baseline)</span>
              <span>+25% (Moderate Spike)</span>
              <span>+50% (Extreme Rush)</span>
            </div>
          </div>
        </div>

        {/* Real-time Projected Outputs Column */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-muted/30 border border-border/80">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Projected Scenario Impact
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Output 1: Projected Stockout Risk */}
              <div className="p-3.5 rounded-lg bg-card border border-border/70">
                <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  Stockout Risk
                </div>
                <div className={`text-xl font-bold ${
                  simulation.projectedStockoutRisk > 4.0
                    ? "text-rose-600 dark:text-rose-400"
                    : simulation.projectedStockoutRisk > 2.5
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}>
                  {simulation.projectedStockoutRisk}%
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Baseline: 2.1%
                </div>
              </div>

              {/* Output 2: Projected Service Level */}
              <div className="p-3.5 rounded-lg bg-card border border-border/70">
                <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground mb-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Service Level
                </div>
                <div className="text-xl font-bold text-foreground">
                  {simulation.projectedServiceLevel}%
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Target: 95.0%
                </div>
              </div>

              {/* Output 3: Holding Cost Delta */}
              <div className="p-3.5 rounded-lg bg-card border border-border/70">
                <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground mb-1">
                  <DollarSign className="h-3.5 w-3.5 text-blue-500" />
                  Holding Cost Δ
                </div>
                <div className={`text-xl font-bold ${
                  simulation.holdingCostDeltaPct > 0
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }`}>
                  {simulation.holdingCostDeltaPct > 0 ? `+${simulation.holdingCostDeltaPct}%` : `${simulation.holdingCostDeltaPct}%`}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Working capital delta
                </div>
              </div>

              {/* Output 4: Critical SKUs */}
              <div className="p-3.5 rounded-lg bg-card border border-border/70">
                <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                  SKUs at Risk
                </div>
                <div className={`text-xl font-bold ${
                  simulation.criticalSKUCount >= 4
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-foreground"
                }`}>
                  {simulation.criticalSKUCount} / {skus.length}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  Items below safety buffer
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">AI Strategy Recommendation:</span>{" "}
            {simulation.projectedStockoutRisk > 4.0 ? (
              <span>High stockout hazard detected. Increase safety stock buffer by at least +{simulation.recommendedSafetyStockDeltaPct}% to maintain &gt;95% SLA.</span>
            ) : simulation.holdingCostDeltaPct > 20 ? (
              <span>Inventory is well-buffered but holding cost is elevated. Consider staggering inbound POs to release working capital.</span>
            ) : (
              <span>Optimal operational balance achieved. Stockout probability is within acceptable risk tolerances.</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
