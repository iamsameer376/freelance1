import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();
  
  const stats = [
    { value: "15+", label: t("about.stats.exp") },
    { value: "200+", label: t("about.stats.products") },
    { value: "5000+", label: t("about.stats.clients") },
    { value: "28", label: t("about.stats.states") },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
              {t("about.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 px-2">
              {t("about.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("about.desc1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.desc2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-card p-6 shadow-card text-center"
              >
                <div className="text-4xl font-extrabold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
