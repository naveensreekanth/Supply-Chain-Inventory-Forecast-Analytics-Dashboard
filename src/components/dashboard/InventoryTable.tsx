import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SKUInventoryItem, StockHealthStatus } from "@/types/supply-chain";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  PackageCheck,
  ShoppingCart,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";

interface InventoryTableProps {
  skus: SKUInventoryItem[];
  onReorderSKU?: (skuId: string, quantity: number) => void;
}

export const InventoryTable = ({ skus, onReorderSKU }: InventoryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortField, setSortField] = useState<keyof SKUInventoryItem>("daysOfSupply");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (field: keyof SKUInventoryItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleQuickReorder = (sku: SKUInventoryItem) => {
    const recommendedQty = Math.max(sku.reorderPoint * 2 - sku.currentStock, 100);
    if (onReorderSKU) {
      onReorderSKU(sku.id, recommendedQty);
    }
    toast.success(`Reorder PO Created for ${sku.sku}`, {
      description: `Purchase order placed for ${recommendedQty.toLocaleString()} units of ${sku.name} (${sku.region} Hub).`,
    });
  };

  const filteredData = skus
    .filter((item) => {
      const matchesSearch =
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "number" && typeof valB === "number") {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

  const getStatusBadge = (status: StockHealthStatus) => {
    switch (status) {
      case "Critical":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            <AlertCircle className="h-3 w-3" />
            Critical Stockout
          </span>
        );
      case "Low Stock":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-3 w-3" />
            Low Stock (&lt; ROP)
          </span>
        );
      case "Optimal":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Healthy Optimal
          </span>
        );
      case "Surplus":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <PackageCheck className="h-3 w-3" />
            Surplus Stock
          </span>
        );
    }
  };

  return (
    <Card className="p-6 border border-border/80 shadow-sm bg-card">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base lg:text-lg font-semibold text-foreground">
            SKU Stock Health & Reorder Management
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time inventory levels, safety stock buffers, and reorder point (ROP) triggers
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search SKU, name, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 text-xs"
            />
          </div>

          {/* Status Quick Filter Buttons */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/60 text-xs">
            {["ALL", "Critical", "Low Stock", "Optimal", "Surplus"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  statusFilter === st
                    ? "bg-background text-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border/70 overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="text-xs font-semibold cursor-pointer" onClick={() => handleSort("sku")}>
                <div className="flex items-center gap-1">
                  SKU & Name
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-xs font-semibold">Category & Hub</TableHead>
              <TableHead className="text-xs font-semibold text-right cursor-pointer" onClick={() => handleSort("currentStock")}>
                <div className="flex items-center justify-end gap-1">
                  On-Hand Stock
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-xs font-semibold text-right">Reorder Point (ROP)</TableHead>
              <TableHead className="text-xs font-semibold text-right cursor-pointer" onClick={() => handleSort("daysOfSupply")}>
                <div className="flex items-center justify-end gap-1">
                  Days of Supply (DOS)
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-xs font-semibold text-center">Health Status</TableHead>
              <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                  No SKUs matched the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => {
                const isBelowROP = item.currentStock <= item.reorderPoint;
                return (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">
                      <div className="font-semibold text-foreground text-xs">{item.sku}</div>
                      <div className="text-[11px] text-muted-foreground max-w-[220px] truncate">{item.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium text-foreground">{item.category}</div>
                      <div className="text-[11px] text-muted-foreground">{item.region} Hub</div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <div className={`text-xs ${isBelowROP ? "text-rose-600 dark:text-rose-400 font-bold" : "text-foreground"}`}>
                        {item.currentStock.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-muted-foreground">Safety: {item.safetyStock}</div>
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      <div className="font-medium text-foreground">{item.reorderPoint.toLocaleString()} units</div>
                      <div className="text-[10px] text-muted-foreground">Lead Time: {item.leadTimeDays}d</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          item.daysOfSupply <= 7
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            : item.daysOfSupply <= 18
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {item.daysOfSupply} days
                      </span>
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={item.status === "Critical" ? "default" : "outline"}
                        onClick={() => handleQuickReorder(item)}
                        className={`h-7 text-xs gap-1.5 px-2.5 ${
                          item.status === "Critical"
                            ? "bg-rose-600 hover:bg-rose-700 text-white"
                            : ""
                        }`}
                      >
                        <ShoppingCart className="h-3 w-3" />
                        <span>Reorder</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
