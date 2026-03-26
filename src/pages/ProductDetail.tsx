import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Zap, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  MessageCircle,
  Plus,
  Minus,
  Star,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { useAdmin } from "@/lib/AdminContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { products } = useAdmin();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        window.scrollTo(0, 0);
      } else {
        navigate("/404");
      }
    }
  }, [id, navigate, products]);

  const isOutOfStock = (product?.quantity ?? 0) === 0;

  if (!product) return null;

  const handleAddToCart = () => {
    if (product && !isOutOfStock) {
      addItem(product, quantity);
    }
  };

  const handleBuyNow = () => {
    const message = `Hi, I want to buy ${quantity} unit(s) of ${product.name} (ID: ${product.id})`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/#products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Product Images */}
          <div className="lg:col-span-7 space-y-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center p-8 group"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
            
            {/* Additional Info Cards (Desktop) */}
            <div className="hidden md:grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-border bg-card flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <span className="text-xs font-medium">Fast Delivery</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card flex flex-col items-center text-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <span className="text-xs font-medium">Genuine Product</span>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-6 h-6 text-primary" />
                <span className="text-xs font-medium">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.8 rating)</span>
                </div>
                <div className="w-px h-4 bg-border" />
                <span className={`text-sm font-medium ${
                  isOutOfStock ? 'text-red-600' :
                  (product.quantity ?? 0) <= 5 ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {isOutOfStock ? 'Out of Stock' :
                   (product.quantity ?? 0) <= 5 ? `Low Stock (${product.quantity} left)` : 'In Stock'}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-muted/50 border border-border mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-black text-foreground">₹{product.price.toLocaleString()}</span>
                  {product.unit && <span className="text-muted-foreground text-sm">/ {product.unit}</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-6">Inclusive of all taxes</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-semibold">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="p-2 hover:bg-muted transition-colors border-r border-border"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="p-2 hover:bg-muted transition-colors border-l border-border"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isOutOfStock && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium mb-4">
                    <AlertCircle className="w-4 h-4" /> This product is currently out of stock.
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Button size="lg" className="w-full h-12 text-base font-bold gap-2" onClick={handleAddToCart} disabled={isOutOfStock}>
                    <ShoppingCart className="w-5 h-5" /> {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <Button size="lg" variant="hero" className="w-full h-12 text-base font-bold gap-2" onClick={handleBuyNow} disabled={isOutOfStock}>
                    <Zap className="w-5 h-5" /> Buy Now
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {product.features && (
                  <div>
                    <h3 className="text-lg font-bold mb-3">Key Features</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-16 pt-16 border-t border-border">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-extrabold mb-8">Product Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-border/50 text-sm">
                  <span className="font-semibold text-muted-foreground">{key}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Placeholder */}
        <div className="mt-16 pt-16 border-t border-border">
          <h2 className="text-2xl font-extrabold mb-8">People also viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group space-y-3">
                <div className="aspect-square bg-muted rounded-xl overflow-hidden flex items-center justify-center p-4 border border-border">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{p.name}</h4>
                  <p className="font-bold text-primary">₹{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Contact Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          variant="whatsapp" 
          size="lg" 
          className="rounded-full w-14 h-14 p-0 shadow-elevated"
          asChild
        >
          <a href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I need more info about ${product.name}`)}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-7 h-7" />
          </a>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
