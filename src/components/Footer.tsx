import { useLanguage } from "@/lib/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = [
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.products"), href: "#products" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-heading font-extrabold text-xl mb-3">
              FARMO<span className="text-secondary">FLEX</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              {t("footer.desc")}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">{t("footer.links")}</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li>+91 99999 99999</li>
              <li>info@farmoflex.in</li>
              <li>India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} Farmoflex India Pvt Ltd. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
