import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "compact-tractor",
    name: "Compact Tractor",
    desc: "Powerful and versatile tractor designed for small to medium Indian farms with high fuel efficiency and easy maintenance.",
    category: "Farming Machinery",
    image: "/images/products/compact_tractor.png",
    price: 450000,
    unit: "Unit",
    stock_status: "in_stock",
    specs: {
      "Horsepower": "25 HP",
      "Fuel Type": "Diesel",
      "Transmission": "8 Forward + 2 Reverse",
      "Lifting Capacity": "1000 kg",
    },
    features: [
      "Fuel-efficient engine",
      "Ergonomic operator platform",
      "Rugged design for Indian terrains",
      "Compatible with various implements",
    ]
  },
  {
    id: "combine-harvester",
    name: "Combine Harvester",
    desc: "High-efficiency harvester for quick and clean grain collection, suitable for wheat, paddy, and soybean.",
    category: "Farming Machinery",
    image: "/images/products/combine_harvester.png",
    price: 1850000,
    unit: "Unit",
    stock_status: "in_stock",
    specs: {
      "Engine Power": "100 HP",
      "Cutting Width": "12 Feet",
      "Grain Tank": "3000 Liters",
      "Fuel Tank": "200 Liters",
    },
    features: [
      "Advanced threshing system",
      "Large grain storage",
      "GPS tracking enabled",
      "Ac cabin option available",
    ]
  },
  {
    id: "solar-irrigation-pump",
    name: "Solar Irrigation Pump",
    desc: "Sustainable water pumping solution powered by solar energy, reducing dependency on electricity and diesel.",
    category: "Irrigation Systems",
    image: "/images/products/solar_irrigation_system.png",
    price: 85000,
    unit: "Set",
    stock_status: "in_stock",
    specs: {
      "Power": "5 HP",
      "Max Head": "50 Meters",
      "Water Output": "150000 Liters/Day",
      "PV Array": "4.5 kWp",
    },
    features: [
      "Zero operational cost",
      "Automatic operation",
      "Dry run protection",
      "High-efficiency motor",
    ]
  },
  {
    id: "drip-irrigation-kit",
    name: "Drip Irrigation Kit",
    desc: "Complete kit for targeted water delivery and water conservation, perfect for row crops and orchards.",
    category: "Irrigation Systems",
    image: "/images/products/drip_irrigation_kit.png",
    price: 15000,
    unit: "Acre",
    stock_status: "in_stock",
    specs: {
      "Lateral Pipe Size": "16 mm",
      "Dripper Spacing": "40 cm",
      "Flow Rate": "2 LPH",
      "UV Stabilized": "Yes",
    },
    features: [
      "Water saving up to 60%",
      "Uniform water distribution",
      "Easy installation",
      "Fertigation compatible",
    ]
  },
  {
    id: "mini-power-tiller",
    name: "Mini Power Tiller",
    desc: "Lightweight and easy-to-handle tiller for preparation of soil in small farms and gardens.",
    category: "Farming Machinery",
    image: "/images/products/mini_tiller.png",
    price: 45000,
    unit: "Unit",
    stock_status: "low_stock",
    specs: {
      "Engine": "7 HP Petrol",
      "Tilling Width": "3 Feet",
      "Tilling Depth": "6 Inches",
      "Starting System": "Recoil",
    },
    features: [
      "Compact and portable",
      "Adjustable handle",
      "Powerful engine",
      "Multiple attachments support",
    ]
  },
  {
    id: "battery-sprayer",
    name: "Battery Sprayer",
    desc: "Ergonomic battery-operated sprayer for efficient pest control and fertilizer application.",
    category: "Farming Machinery",
    image: "/images/products/pesticide_sprayer.png",
    price: 3200,
    unit: "Unit",
    stock_status: "in_stock",
    specs: {
      "Tank Capacity": "16 Liters",
      "Battery": "12V 8Ah",
      "Run Time": "4-6 Hours",
      "Weight": "5.5 kg",
    },
    features: [
      "Dual pump system",
      "Backrest padding",
      "Speed control regulator",
      "Stainless steel lance",
    ]
  },
  {
    id: "ear-tag-applicator",
    name: "Ear Tag Applicator",
    desc: "Heavy-duty applicator for quick and painless ear tagging of cattle and sheep.",
    category: "Dairy Equipment",
    image: "/images/products/ear_tag_applicator.png",
    price: 850,
    unit: "Unit",
    stock_status: "in_stock",
    specs: {
      "Material": "Alloy Steel",
      "Weight": "250g",
      "Finish": "Powder Coated",
    },
    features: [
      "Anti-slip grip",
      "Easy pin replacement",
      "Durable spring",
    ]
  },
  {
    id: "teat-dip-bottle",
    name: "Teat Dip Bottle",
    desc: "Ergonomic teat dip cup for hygienic milking care and mastitis prevention.",
    category: "Dairy Equipment",
    image: "/images/products/teat_dip_bottle.png",
    price: 350,
    unit: "Unit",
    stock_status: "in_stock",
    specs: {
      "Capacity": "300 ml",
      "Material": "HDPE Plastic",
      "Non-return valve": "Yes",
    },
    features: [
      "Auto-suction",
      "Transparent scale",
      "Spill-proof design",
    ]
  },
  {
    id: "automatic-water-bowl",
    name: "Automatic Water Bowl",
    desc: "Self-filling water bowls for clean water supply for poultry and livestock.",
    category: "Poultry Equipment",
    image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&q=80&w=800",
    price: 1200,
    unit: "Unit",
    stock_status: "in_stock",
    specs: {
      "Inlet Size": "1/2 Inch",
      "Bowl Diameter": "10 Inches",
      "Material": "ABS Plastic",
    },
    features: [
      "Float valve system",
      "Wall mountable",
      "Easy cleaning",
    ]
  },
  {
    id: "milking-machine-single",
    name: "Single Bucket Milking Machine",
    desc: "Mobile milking machine with high-performance vacuum pump and stainless steel bucket, ideal for small dairy farms.",
    category: "Dairy Equipment",
    image: "/images/products/milking_machine.png",
    price: 38000,
    unit: "Unit",
    stock_status: "in_stock",
    specs: {
      "Bucket Capacity": "25 Liters",
      "Motor Power": "0.55 kW",
      "Pulsation Frequency": "60/40",
      "Pump Capacity": "200 L/min",
    },
    features: [
      "Low noise operation",
      "Easy to move with wheels",
      "Hygienic stainless steel bucket",
      "High-grade silicone liners",
    ]
  },
];

export const getProductById = (id: string) => products.find(p => p.id === id);
export const searchProducts = (query: string) => 
  products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );
