import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-5"
        >
          {t("cta.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-primary-foreground/70 text-lg mb-10 max-w-lg mx-auto"
        >
          {t("cta.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button size="lg" variant="hero" asChild>
            <a href="#contact">
              {t("cta.button")} <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <Button size="lg" variant="whatsapp" asChild>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" /> {t("contact.info.whatsapp")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
