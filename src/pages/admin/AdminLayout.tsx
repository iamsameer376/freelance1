import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Image,
  Star,
  ShoppingBag,
  ArrowLeft,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/hero", icon: Image, label: "Hero Slides" },
  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/admin/reviews", icon: Star, label: "Reviews" },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-lg font-black tracking-tight">Farmoflex</h1>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-sm" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-black">Farmoflex Admin</h1>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`
              }
            >
              <item.icon className="w-3 h-3" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8 pt-16 md:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
