import { useCart } from "@/lib/CartContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag,
  ShieldCheck,
  Truck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-extrabold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 text-center border border-border shadow-soft">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Button size="lg" onClick={() => navigate("/#products")}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-soft flex flex-col md:flex-row gap-6 relative"
                  >
                    <div className="w-full md:w-32 h-32 bg-muted rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg hover:text-primary transition-colors">
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <p className="font-black text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-6 mt-4">
                        <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-muted transition-colors border-r border-border"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-muted transition-colors border-l border-border"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1.5 text-sm text-destructive hover:underline font-medium"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-elevated">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping Fee</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[10px] text-orange-600 bg-orange-50 p-2 rounded">
                      Add ₹{(5000 - subtotal).toLocaleString()} more for FREE delivery
                    </p>
                  )}
                  <div className="h-px bg-border pt-2" />
                  <div className="flex justify-between text-xl font-black">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full h-12 text-base font-bold gap-2 mb-4"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Buy <ArrowRight className="w-5 h-5" />
                </Button>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Secure Payment & Transaction</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Trusted Delivery with Tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
