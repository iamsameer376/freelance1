import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            {t("contact.title")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">{t("contact.subtitle")}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{t("contact.info.phone")}</h4>
                <p className="text-muted-foreground">+91 99999 99999</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{t("contact.info.email")}</h4>
                <p className="text-muted-foreground">info@farmoflex.in</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{t("contact.info.location")}</h4>
                <p className="text-muted-foreground">India</p>
              </div>
            </div>
            <Button variant="whatsapp" size="lg" className="mt-4" asChild>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" /> {t("contact.info.whatsapp")}
              </a>
            </Button>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-xl bg-background p-6 shadow-card space-y-4"
          >
            <input
              type="text"
              placeholder={t("contact.form.name")}
              required
              maxLength={100}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder={t("contact.form.email")}
              required
              maxLength={255}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder={t("contact.form.phone")}
              required
              maxLength={15}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder={t("contact.form.message")}
              required
              maxLength={1000}
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button type="submit" variant="hero" size="lg" className="w-full">
              {t("contact.form.submit")}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
