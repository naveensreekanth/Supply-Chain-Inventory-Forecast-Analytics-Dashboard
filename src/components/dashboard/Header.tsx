import React from "react";
import { Region, ProductCategory, TimeHorizon } from "@/types/supply-chain";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Download,
  RotateCw,
  Boxes,
  MapPin,
  Tag,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

interface HeaderProps {
  selectedRegion: Region;
  onRegionChange: (region: Region) => void;
  selectedCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
  selectedHorizon: TimeHorizon;
  onHorizonChange: (horizon: TimeHorizon) => void;
  onExportData: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  selectedRegion,
  onRegionChange,
  selectedCategory,
  onCategoryChange,
  selectedHorizon,
  onHorizonChange,
  onExportData,
  onRefresh,
  isRefreshing = false,
}) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast.info(`Switched to ${theme === "dark" ? "light" : "dark"} mode`);
  };

  return (
    <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75 sticky top-0 z-30 shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm shrink-0">
              <Boxes className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Supply Chain & Inventory Analytics
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live System
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Demand Forecasting, Multi-Echelon Stock Health & Scenario Modeling
              </p>
            </div>
          </div>

          {/* Filter Bar & Quick Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Region Filter */}
            <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-lg border border-border/60">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <Select value={selectedRegion} onValueChange={(val) => onRegionChange(val as Region)}>
                <SelectTrigger className="h-7 border-0 bg-transparent shadow-none p-0 text-xs font-medium focus:ring-0 focus:ring-offset-0 w-[105px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Regions">All Regions</SelectItem>
                  <SelectItem value="North">North Hub</SelectItem>
                  <SelectItem value="South">South Hub</SelectItem>
                  <SelectItem value="East">East Hub</SelectItem>
                  <SelectItem value="West">West Hub</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-lg border border-border/60">
              <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <Select value={selectedCategory} onValueChange={(val) => onCategoryChange(val as ProductCategory)}>
                <SelectTrigger className="h-7 border-0 bg-transparent shadow-none p-0 text-xs font-medium focus:ring-0 focus:ring-offset-0 w-[115px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Apparel">Apparel</SelectItem>
                  <SelectItem value="Industrial">Industrial</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                  <SelectItem value="FMCG">FMCG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Horizon Filter */}
            <div className="flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-lg border border-border/60">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <Select value={selectedHorizon} onValueChange={(val) => onHorizonChange(val as TimeHorizon)}>
                <SelectTrigger className="h-7 border-0 bg-transparent shadow-none p-0 text-xs font-medium focus:ring-0 focus:ring-offset-0 w-[105px]">
                  <SelectValue placeholder="Horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Year 2024">Full Year 2024</SelectItem>
                  <SelectItem value="Q1 2024">Q1 2024</SelectItem>
                  <SelectItem value="Q2 2024">Q2 2024</SelectItem>
                  <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                  <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                  <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 gap-1.5 text-xs font-medium px-2.5"
            >
              <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onExportData}
              className="h-8 gap-1.5 text-xs font-medium px-2.5 bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary hover:text-primary"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
