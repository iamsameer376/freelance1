export interface Product {
  id: string;
  name: string;
  desc: string;
  category: string;
  image: string;
  price: number;
  unit?: string;
  quantity?: number;
  specs?: Record<string, string>;
  features?: string[];
  stock_status?: "in_stock" | "out_of_stock" | "low_stock";
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  adminReply?: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  desc: string;
}

export interface SaleRecord {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  revenue: number;
  date: string;
}
