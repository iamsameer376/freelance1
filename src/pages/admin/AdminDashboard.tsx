import { useAdmin } from "@/lib/AdminContext";
import { useMemo, useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { sales, allOrders, products } = useAdmin();
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "12m" | "all">("30d");
  const [selectedProduct, setSelectedProduct] = useState<string>("all");

  const filteredSales = useMemo(() => {
    const now = new Date();
    return sales.filter((s) => {
      const saleDate = new Date(s.date);
      if (dateRange === "7d") return now.getTime() - saleDate.getTime() <= 7 * 86400000;
      if (dateRange === "30d") return now.getTime() - saleDate.getTime() <= 30 * 86400000;
      if (dateRange === "12m") return now.getTime() - saleDate.getTime() <= 365 * 86400000;
      return true;
    }).filter(s => selectedProduct === "all" || s.productId === selectedProduct);
  }, [sales, dateRange, selectedProduct]);

  const totalRevenue = filteredSales.reduce((sum, s) => sum + s.revenue, 0);
  const totalOrders = new Set(filteredSales.map(s => s.orderId)).size;
  const totalUnitsSold = filteredSales.reduce((sum, s) => sum + s.quantity, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Group sales by date for chart
  const dailySales = useMemo(() => {
    const map = new Map<string, number>();
    filteredSales.forEach(s => {
      map.set(s.date, (map.get(s.date) || 0) + s.revenue);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-15);
  }, [filteredSales]);

  const maxRevenue = Math.max(...dailySales.map(d => d[1]), 1);

  // Per-product breakdown
  const productBreakdown = useMemo(() => {
    const map = new Map<string, { name: string; units: number; revenue: number }>();
    filteredSales.forEach(s => {
      const existing = map.get(s.productId) || { name: s.productName, units: 0, revenue: 0 };
      existing.units += s.quantity;
      existing.revenue += s.revenue;
      map.set(s.productId, existing);
    });
    return Array.from(map.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredSales]);

  const statCards = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-100" },
    { label: "Total Orders", value: totalOrders.toString(), icon: ShoppingBag, color: "text-blue-600 bg-blue-100" },
    { label: "Units Sold", value: totalUnitsSold.toString(), icon: Package, color: "text-purple-600 bg-purple-100" },
    { label: "Avg Order Value", value: `₹${Math.round(avgOrderValue).toLocaleString()}`, icon: TrendingUp, color: "text-orange-600 bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Sales Dashboard</h1>
          <p className="text-muted-foreground text-sm">Overview of your store performance</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["7d", "30d", "12m", "all"] as const).map((range) => (
            <Button
              key={range}
              size="sm"
              variant={dateRange === range ? "default" : "outline"}
              onClick={() => setDateRange(range)}
              className="text-xs"
            >
              <Calendar className="w-3 h-3 mr-1" />
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : range === "12m" ? "12 Months" : "All Time"}
            </Button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-card rounded-2xl p-5 border border-border shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-black">{card.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h2 className="text-lg font-bold mb-6">Revenue Trend</h2>
        <div className="flex items-end gap-1.5 h-48">
          {dailySales.map(([date, rev]) => (
            <div key={date} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="absolute -top-8 bg-foreground text-background text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold z-10">
                ₹{rev.toLocaleString()} · {date.slice(5)}
              </div>
              <div
                className="w-full bg-primary/80 rounded-t-md hover:bg-primary transition-colors min-h-[4px]"
                style={{ height: `${(rev / maxRevenue) * 100}%` }}
              />
              <span className="text-[8px] text-muted-foreground font-mono">{date.slice(8)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Filter + Breakdown */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-bold">Product Sales Breakdown</h2>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-background border border-border rounded-lg px-3 py-2 text-sm font-medium"
          >
            <option value="all">All Products</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-bold text-muted-foreground text-xs uppercase tracking-wider">Product</th>
                <th className="text-right py-3 px-2 font-bold text-muted-foreground text-xs uppercase tracking-wider">Units Sold</th>
                <th className="text-right py-3 px-2 font-bold text-muted-foreground text-xs uppercase tracking-wider">Revenue</th>
                <th className="text-right py-3 px-2 font-bold text-muted-foreground text-xs uppercase tracking-wider">Share</th>
              </tr>
            </thead>
            <tbody>
              {productBreakdown.map((item) => (
                <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-2 font-medium">{item.name}</td>
                  <td className="py-3 px-2 text-right">{item.units}</td>
                  <td className="py-3 px-2 text-right font-bold">₹{item.revenue.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(item.revenue / totalRevenue) * 100}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-10 text-right">{((item.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        {allOrders.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {allOrders.slice(0, 5).map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="font-bold text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">₹{order.total?.toLocaleString()}</p>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
