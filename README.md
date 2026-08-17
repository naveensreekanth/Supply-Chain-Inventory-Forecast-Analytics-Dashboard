# Supply Chain & Inventory Forecast Analytics Dashboard

An enterprise-grade supply chain intelligence and demand forecasting platform. Built with React, TypeScript, Vite, Tailwind CSS, Recharts, and shadcn/ui.

![Dashboard Preview](public/placeholder.svg)

---

## Key Features

- **Executive KPI Dashboard**: Live tracking of Inventory Turnover, Forecast Accuracy (MAPE/Bias), Stockout Risk Rate, and Warehouse Efficiency.
- **Demand Forecasting & Accuracy Engine**:
  - Actual vs. Forecast demand comparison with monthly breakdown.
  - Interactive Forecast Confidence Intervals (80% and 95% intervals).
  - MAPE (Mean Absolute Percentage Error) and bias tracking over time.
- **SKU Productivity & Inventory Health**:
  - SKU productivity score ranking and turnover index.
  - Multi-echelon stock health matrix with real-time risk indicators (*Critical*, *Low Stock*, *Optimal*, *Surplus*).
  - Calculated Days of Supply (DOS), Reorder Points (ROP), and automated quick-reorder triggers.
- **Regional Warehouse & Logistics Analytics**:
  - Multi-region inventory trend tracking (North, South, East, West).
  - Warehouse storage capacity utilization gauges and inbound/outbound fulfillment rates.
- **Interactive "What-If" Scenario Simulator**:
  - Dynamic simulation of supply chain shocks (lead time fluctuations, safety stock multipliers, demand surge).
  - Live recalculation of projected stockout probability, service level, and inventory holding cost deltas.
- **Data Export & Telemetry**:
  - One-click CSV export of inventory health and forecast records.
  - Comprehensive Light & Dark mode support.
  - Dynamic filtering by Region, Product Category, and Time Horizon.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 18, Vite 5, TypeScript |
| **Styling** | Tailwind CSS, CSS Custom Properties (HSL Design Tokens), `lucide-react` |
| **Data Visualization** | Recharts (Responsive Line, Area, Bar, and Composed Charts) |
| **UI Components** | shadcn/ui (Radix UI Primitives, Badges, Tabs, Sliders, Dialogs, Tooltips) |
| **State & Notifications** | TanStack React Query, Sonner & Toaster |
| **Theming** | `next-themes` (Dark/Light/System) |

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18.0 or higher) and `npm` installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/naveensreekanth/Supply-Chain-Inventory-Forecast-Analytics-Dashboard.git
   cd Supply-Chain-Inventory-Forecast-Analytics-Dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## Project Structure

```
├── public/                  # Static assets (favicons, robots.txt)
├── src/
│   ├── components/
│   │   ├── dashboard/       # Specialized supply chain analytics components
│   │   │   ├── DemandForecastChart.tsx    # Monthly demand vs forecast with CI bands
│   │   │   ├── ForecastAccuracyChart.tsx  # MAPE & forecast bias tracker
│   │   │   ├── Header.tsx                 # Navigation, global filters & actions
│   │   │   ├── InventoryTable.tsx         # SKU stock health & reorder management
│   │   │   ├── KPICard.tsx                # Metric cards with sentiment-aware trends
│   │   │   ├── RegionalTrendsChart.tsx    # Multi-region warehouse distribution
│   │   │   ├── ScenarioPlanner.tsx        # What-if supply chain simulation engine
│   │   │   ├── SKUProductivityChart.tsx   # SKU performance & turnover metrics
│   │   │   └── WarehouseCapacityChart.tsx # Facility storage & throughput gauges
│   │   ├── theme-provider.tsx             # Dark/light mode theme provider
│   │   └── ui/              # shadcn/ui reusable component library
│   ├── data/
│   │   └── mock-supply-chain-data.ts     # Realistic multi-region dataset & calculations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions & class merges
│   ├── types/               # TypeScript interface definitions
│   ├── App.tsx              # Root app component with providers & routing
│   ├── index.css            # Design tokens & Tailwind layers
│   └── main.tsx             # Application entry point
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Core Supply Chain Metrics & Formulas

- **Inventory Turnover Ratio**: $\text{ITR} = \frac{\text{Cost of Goods Sold (COGS)}}{\text{Average Inventory}}$
- **Forecast Accuracy (MAPE)**: $\text{MAPE} = \frac{1}{n} \sum_{t=1}^{n} \left| \frac{A_t - F_t}{A_t} \right| \times 100\%$
- **Reorder Point (ROP)**: $\text{ROP} = (\text{Average Daily Demand} \times \text{Lead Time}) + \text{Safety Stock}$
- **Days of Supply (DOS)**: $\text{DOS} = \frac{\text{Current Stock Level}}{\text{Average Daily Demand}}$

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
