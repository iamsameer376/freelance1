import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Review, HeroSlide, SaleRecord } from '@/types/product';
import { products as defaultProducts } from '@/data/products';

interface AdminContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, quantity: number) => void;

  // Hero Slides
  heroSlides: HeroSlide[];
  addSlide: (slide: HeroSlide) => void;
  updateSlide: (slide: HeroSlide) => void;
  removeSlide: (id: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;
  replyToReview: (reviewId: string, reply: string) => void;
  deleteReview: (id: string) => void;

  // Sales
  sales: SaleRecord[];
  addSale: (sale: SaleRecord) => void;

  // Orders (synced from UserContext)
  allOrders: any[];
  updateOrderStatus: (orderId: string, status: string) => void;
}

const defaultHeroSlides: HeroSlide[] = [
  { id: 'slide-1', image: '/images/products/compact_tractor.png', title: 'Compact Tractors', desc: 'Powerful and versatile for Indian farms.' },
  { id: 'slide-2', image: '/images/products/combine_harvester.png', title: 'Combine Harvesters', desc: 'Efficient harvesting solutions for large fields.' },
  { id: 'slide-3', image: '/images/products/solar_irrigation_system.png', title: 'Solar Irrigation', desc: 'Sustainable water management systems.' },
];

const defaultReviews: Review[] = [
  { id: 'rev-1', productId: 'compact-tractor', customerName: 'Rajesh Kumar', rating: 5, comment: 'Excellent tractor! Very reliable and fuel-efficient. Perfect for my 10-acre farm.', date: '2026-03-15' },
  { id: 'rev-2', productId: 'solar-irrigation-pump', customerName: 'Priya Sharma', rating: 4, comment: 'Great product, easy to install. Saves a lot on electricity bills.', date: '2026-03-18' },
  { id: 'rev-3', productId: 'mini-power-tiller', customerName: 'Amit Patel', rating: 5, comment: 'Very compact and powerful. Handles my garden with ease.', date: '2026-03-20' },
  { id: 'rev-4', productId: 'battery-sprayer', customerName: 'Sunita Devi', rating: 3, comment: 'Good sprayer but battery life could be better.', date: '2026-03-22' },
  { id: 'rev-5', productId: 'milking-machine-single', customerName: 'Mohan Lal', rating: 5, comment: 'Best investment for my dairy farm. Saves so much time!', date: '2026-03-24' },
];

const generateSampleSales = (): SaleRecord[] => {
  const sales: SaleRecord[] = [];
  const productSamples = [
    { id: 'compact-tractor', name: 'Compact Tractor', price: 450000 },
    { id: 'combine-harvester', name: 'Combine Harvester', price: 1850000 },
    { id: 'solar-irrigation-pump', name: 'Solar Irrigation Pump', price: 85000 },
    { id: 'mini-power-tiller', name: 'Mini Power Tiller', price: 45000 },
    { id: 'battery-sprayer', name: 'Battery Sprayer', price: 3200 },
    { id: 'milking-machine-single', name: 'Single Bucket Milking Machine', price: 38000 },
  ];

  for (let d = 30; d >= 0; d--) {
    const date = new Date();
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split('T')[0];
    const ordersToday = Math.floor(Math.random() * 4) + 1;
    for (let o = 0; o < ordersToday; o++) {
      const p = productSamples[Math.floor(Math.random() * productSamples.length)];
      const qty = Math.floor(Math.random() * 3) + 1;
      sales.push({
        id: `sale-${d}-${o}`,
        orderId: `ORD-${100000 + d * 10 + o}`,
        productId: p.id,
        productName: p.name,
        quantity: qty,
        revenue: p.price * qty,
        date: dateStr,
      });
    }
  }
  return sales;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('admin_products');
    if (saved) return JSON.parse(saved);
    return defaultProducts.map(p => ({ ...p, quantity: p.quantity ?? 50 }));
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('admin_hero_slides');
    return saved ? JSON.parse(saved) : defaultHeroSlides;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('admin_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [sales, setSales] = useState<SaleRecord[]>(() => {
    const saved = localStorage.getItem('admin_sales');
    return saved ? JSON.parse(saved) : generateSampleSales();
  });

  const [allOrders, setAllOrders] = useState<any[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist
  useEffect(() => { localStorage.setItem('admin_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('admin_hero_slides', JSON.stringify(heroSlides)); }, [heroSlides]);
  useEffect(() => { localStorage.setItem('admin_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('admin_sales', JSON.stringify(sales)); }, [sales]);

  // Sync orders from customer side
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('orders');
      if (saved) setAllOrders(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorage);
    const interval = setInterval(() => {
      const saved = localStorage.getItem('orders');
      if (saved) setAllOrders(JSON.parse(saved));
    }, 2000);
    return () => { window.removeEventListener('storage', handleStorage); clearInterval(interval); };
  }, []);

  // Product CRUD
  const addProduct = (product: Product) => setProducts(prev => [...prev, { ...product, quantity: product.quantity ?? 50 }]);
  const updateProduct = (product: Product) => setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));
  const updateStock = (id: string, quantity: number) => {
    setProducts(prev => prev.map(p => p.id === id ? {
      ...p,
      quantity,
      stock_status: quantity === 0 ? 'out_of_stock' : quantity <= 5 ? 'low_stock' : 'in_stock'
    } : p));
  };

  // Hero slides
  const addSlide = (slide: HeroSlide) => setHeroSlides(prev => [...prev, slide]);
  const updateSlide = (slide: HeroSlide) => setHeroSlides(prev => prev.map(s => s.id === slide.id ? slide : s));
  const removeSlide = (id: string) => setHeroSlides(prev => prev.filter(s => s.id !== id));

  // Reviews
  const addReview = (review: Review) => setReviews(prev => [...prev, review]);
  const replyToReview = (reviewId: string, reply: string) => setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, adminReply: reply } : r));
  const deleteReview = (id: string) => setReviews(prev => prev.filter(r => r.id !== id));

  // Sales
  const addSale = (sale: SaleRecord) => setSales(prev => [...prev, sale]);

  // Orders
  const updateOrderStatus = (orderId: string, status: string) => {
    const updatedOrders = allOrders.map(o => o.id === orderId ? { ...o, status } : o);
    setAllOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <AdminContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct, updateStock,
      heroSlides, addSlide, updateSlide, removeSlide,
      reviews, addReview, replyToReview, deleteReview,
      sales, addSale,
      allOrders, updateOrderStatus,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
