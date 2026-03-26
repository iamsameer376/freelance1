import { motion } from "framer-motion";
import { Shield, IndianRupee, Tractor, Leaf } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const WhyChooseUsSection = () => {
  const { t } = useLanguage();

  const reasons = [
    { icon: Shield, title: t("whyUs.items.durable"), desc: t("whyUs.items.durableDesc") },
    { icon: IndianRupee, title: t("whyUs.items.cost"), desc: t("whyUs.items.costDesc") },
    { icon: Tractor, title: t("whyUs.items.innovative"), desc: t("whyUs.items.innovativeDesc") },
    { icon: Leaf, title: t("whyUs.items.award"), desc: t("whyUs.items.awardDesc") },
  ];

  return (
    <section id="why-us" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            {t("whyUs.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {t("whyUs.title")}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <r.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
