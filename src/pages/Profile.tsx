import { useUser } from "@/lib/UserContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  Package, 
  MapPin, 
  Phone, 
  Mail, 
  LogOut,
  ChevronRight,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, orders } = useUser();

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Side Nav */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft sticky top-24">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                    <User className="w-10 h-10" />
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-xs text-muted-foreground truncate w-full">{user.email}</p>
                </div>
                
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start gap-3 text-primary bg-primary/5 font-bold">
                    <Package className="w-4 h-4" /> My Orders
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Settings className="w-4 h-4" /> Account Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/5">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Button>
                </nav>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-9 space-y-8">
              {/* User Info Section */}
              <section className="bg-card rounded-2xl p-8 border border-border shadow-soft">
                <h3 className="text-xl font-black mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3" /> Full Name
                    </p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Mail className="w-3 h-3" /> Email Address
                    </p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <Phone className="w-3 h-3" /> Phone Number
                    </p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> Shipping Address
                    </p>
                    <p className="font-medium leading-tight">{user.address}</p>
                  </div>
                </div>
              </section>

              {/* Orders History Section */}
              <section className="space-y-4">
                <h3 className="text-xl font-black px-2">Order History</h3>
                
                {orders.length === 0 ? (
                  <div className="bg-card rounded-2xl p-12 text-center border border-border border-dashed">
                    <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <motion.div 
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-2xl overflow-hidden border border-border shadow-soft group hover:border-primary/30 transition-all"
                      >
                        <div className="bg-muted/50 p-4 flex flex-wrap justify-between items-center gap-4">
                          <div className="flex gap-8">
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
                              <p className="text-sm font-bold text-primary">₹{order.total.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tighter">
                            <Clock className="w-3 h-3" /> {order.status}
                          </div>
                        </div>
                        
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex -space-x-3 overflow-hidden">
                            {order.items.slice(0, 3).map((item, i) => (
                              <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-card bg-muted p-1">
                                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-card bg-muted text-[10px] font-bold text-muted-foreground">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="gap-2 group-hover:text-primary">
                            Order Details <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
