import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useUser } from "@/lib/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  ChevronRight, 
  Package,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user, addOrder } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: total,
      status: 'Processing' as const,
    };
    
    addOrder(newOrder);
    setIsOrdered(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 pt-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center bg-card rounded-3xl p-8 border border-border shadow-elevated"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">Thank you for shopping with Farmoflex. Your order has been placed and is being processed.</p>
            <div className="flex flex-col gap-3">
              <Button size="lg" onClick={() => navigate("/profile")} className="w-full">View Order Status</Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/")} className="w-full">Continue Shopping</Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate("/cart")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-extrabold">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Steps */}
            <div className="lg:col-span-8 space-y-6">
              {/* Step 1: Shipping */}
              <div className={`bg-card rounded-2xl p-6 border ${step === 1 ? 'border-primary shadow-elevated' : 'border-border opacity-70'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" /> 1. Shipping Address
                  </h2>
                  {step > 1 && (
                    <Button variant="link" onClick={() => setStep(1)} className="text-primary font-bold">Edit</Button>
                  )}
                </div>
                
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5 mb-6">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{user.address}</p>
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    </div>
                    <Button size="lg" onClick={() => setStep(2)}>Deliver to this address</Button>
                  </motion.div>
                )}
                
                {step > 1 && (
                  <div className="text-sm text-muted-foreground">
                    Delivering to <span className="font-bold text-foreground">{user.name}</span>, {user.address.substring(0, 30)}...
                  </div>
                )}
              </div>

              {/* Step 2: Payment */}
              <div className={`bg-card rounded-2xl p-6 border ${step === 2 ? 'border-primary shadow-elevated' : 'border-border opacity-70'}`}>
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-primary" /> 2. Payment Method
                </h2>
                
                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="space-y-3 mb-6">
                      <label className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                        <input type="radio" name="payment" defaultChecked />
                        <div className="flex-1">
                          <p className="font-bold">Cash on Delivery (COD)</p>
                          <p className="text-xs text-muted-foreground">Pay when you receive the product</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/50 cursor-not-allowed opacity-50">
                        <input type="radio" name="payment" disabled />
                        <div className="flex-1">
                          <p className="font-bold">Online Payment (UPI / Card)</p>
                          <p className="text-xs text-muted-foreground">Available soon</p>
                        </div>
                      </label>
                    </div>
                    <Button size="lg" onClick={() => setStep(3)}>Continue to review</Button>
                  </motion.div>
                )}
                
                {step > 2 && <div className="text-sm text-muted-foreground">Paid via <span className="font-bold text-foreground">Cash on Delivery</span></div>}
              </div>

              {/* Step 3: Review */}
              <div className={`bg-card rounded-2xl p-6 border ${step === 3 ? 'border-primary shadow-elevated' : 'border-border opacity-70'}`}>
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-primary" /> 3. Review Items & Delivery
                </h2>
                
                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-4">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4 items-center py-4 border-b border-border last:border-0">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-muted rounded-lg" />
                          <div className="flex-1">
                            <p className="font-bold text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <Button size="lg" className="w-full h-12 text-base font-bold" onClick={handlePlaceOrder}>Place Your Order</Button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
                <h2 className="text-lg font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items Total:</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="h-px bg-border pt-2" />
                  <div className="flex justify-between text-lg font-extrabold">
                    <span>Order Total:</span>
                    <span className="text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                {step < 3 && (
                  <p className="text-[10px] text-muted-foreground mt-6 text-center italic">
                    By placing your order, you agree to Farmoflex's terms and conditions.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
