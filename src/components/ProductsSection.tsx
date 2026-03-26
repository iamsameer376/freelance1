import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useAdmin } from "@/lib/AdminContext";
import { Link } from "react-router-dom";

const categoryColors: Record<string, string> = {
  "Dairy Equipment": "bg-primary/10 text-primary",
  "Poultry Equipment": "bg-secondary/10 text-secondary",
  "Farming Machinery": "bg-orange-500/10 text-orange-600",
  "Irrigation Systems": "bg-blue-500/10 text-blue-600",
};

const ProductsSection = () => {
  const { t } = useLanguage();
  const { products } = useAdmin();
  return (
    <section id="products" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            {t("nav.products")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 px-4">
            {t("products.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto px-4">
            {t("products.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl bg-card overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 mx-auto w-full max-w-sm sm:max-w-none"
            >
              <Link to={`/product/${p.id}`} className="block">
                <div className="h-48 md:h-56 bg-muted flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-3xl">🔧</span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-5">
                <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 ${categoryColors[p.category]}`}>
                  {p.category}
                </span>
                <Link to={`/product/${p.id}`}>
                  <h3 className="font-bold text-lg text-foreground mb-1 hover:text-primary transition-colors">{p.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{p.desc}</p>
                <p className="text-lg font-bold text-primary mb-4">₹{p.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" className="flex-1" asChild>
                    <Link to={`/product/${p.id}`}>
                      {t("products.viewDetails")} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="whatsapp"
                    asChild
                  >
                    <a
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
