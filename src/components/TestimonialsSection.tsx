import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const testimonials = [
  {
    name: "Rajesh Patel",
    location: "Gujarat",
    text: "Farmoflex equipment has transformed our dairy operations. The quality is unmatched and their support team is always responsive.",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    location: "Punjab",
    text: "We've been using their ear tags and applicators for 3 years. Extremely durable and cost-effective. Highly recommended!",
    rating: 5,
  },
  {
    name: "Anita Sharma",
    location: "Maharashtra",
    text: "The automatic water bowls work flawlessly. My poultry farm productivity has improved significantly since switching to Farmoflex.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            {t("testimonials.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-card p-6 shadow-soft"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-5 italic leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
