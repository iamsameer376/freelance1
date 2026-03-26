import { motion } from "framer-motion";
import { Search, FileText, MessageSquare, Truck } from "lucide-react";

const steps = [
  { icon: Search, title: "Browse Products", desc: "Explore our full range of equipment" },
  { icon: FileText, title: "Request Quote", desc: "Send an enquiry or request a quote" },
  { icon: MessageSquare, title: "Get Consultation", desc: "Our experts guide your purchase" },
  { icon: Truck, title: "Delivery & Support", desc: "Fast delivery with ongoing support" },
];

const HowItWorksSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
          How It Works
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-border" />

        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center relative"
          >
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-secondary/10 border-4 border-card flex items-center justify-center relative z-10">
              <s.icon className="w-8 h-8 text-secondary" />
            </div>
            <span className="text-xs font-bold text-secondary mb-1 block">Step {i + 1}</span>
            <h3 className="font-bold text-foreground mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
