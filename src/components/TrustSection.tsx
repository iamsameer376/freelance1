import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Users, Headphones } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const TrustSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: ShieldCheck, title: t("trust.items.qa"), desc: t("trust.items.qaDesc") },
    { icon: Wrench, title: t("trust.items.materials"), desc: t("trust.items.materialsDesc") },
    { icon: Users, title: t("trust.items.exp"), desc: t("trust.items.expDesc") },
    { icon: Headphones, title: t("trust.items.support"), desc: t("trust.items.supportDesc") },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold uppercase tracking-widest text-secondary mb-2"
        >
          {t("trust.badge")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-14 px-4"
        >
          {t("trust.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-background p-6 shadow-soft hover:shadow-card transition-shadow text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <item.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
