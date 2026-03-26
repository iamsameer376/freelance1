import { useAdmin } from "@/lib/AdminContext";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";

const statusOptions = ["Processing", "Shipped", "Delivered"];
const statusColors: Record<string, string> = {
  Processing: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};
const statusIcons: Record<string, any> = {
  Processing: Clock,
  Shipped: Truck,
  Delivered: CheckCircle2,
};

const AdminOrders = () => {
  const { allOrders, updateOrderStatus } = useAdmin();

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Orders</h1>
        <p className="text-muted-foreground text-sm">{allOrders.length} total orders</p>
      </div>

      {allOrders.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 text-center border border-border border-dashed">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">No orders yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Orders from customers will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {allOrders.map((order: any) => {
            const StatusIcon = statusIcons[order.status] || Clock;
            return (
              <div key={order.id} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
                <div className="bg-muted/50 p-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Order ID</p>
                      <p className="text-sm font-bold">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Date</p>
                      <p className="text-sm font-bold">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Total</p>
                      <p className="text-sm font-bold text-primary">₹{order.total?.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1 rounded-full ${statusColors[order.status] || "bg-muted"}`}>
                      <StatusIcon className="w-3 h-3" /> {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className="bg-background border border-border rounded-lg px-2 py-1 text-xs font-medium"
                    >
                      {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-3">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 bg-muted/50 rounded-xl p-2 pr-4">
                        <div className="w-10 h-10 rounded-lg bg-background overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">Qty: {item.quantity} · ₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
