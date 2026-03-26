import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Globe, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { languages } from "@/lib/translations";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/lib/AdminContext";
import { Product } from "@/types/product";
import { ShoppingCart, User as UserIcon } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { products } = useAdmin();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: t("nav.home"), href: "/#hero" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.products"), href: "/#products" },
    { label: t("nav.whyUs"), href: "/#why-us" },
    { label: t("nav.testimonials"), href: "/#testimonials" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setShowSearch(false);
    setIsOpen(false);
  };

  const currentLang = languages.find((l) => l.code === language);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="/#hero" className="font-heading font-800 text-xl text-primary tracking-tight shrink-0">
          <span className="font-extrabold">FORMO</span>
          <span className="text-gradient font-extrabold">FLEX</span>
        </a>

        {/* Desktop Search & Nav */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center max-w-2xl mx-8">
          <div className="relative w-full" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearch(true);
                }}
                onFocus={() => setShowSearch(true)}
                className="w-full bg-muted/50 border border-border rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            <AnimatePresence>
              {showSearch && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden z-50"
                >
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded bg-muted overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <p className="ml-auto text-sm font-medium text-primary">₹{product.price.toLocaleString()}</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-4 mr-2">
            {links.slice(1, 4).map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                <span>{currentLang?.native}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`cursor-pointer ${language === lang.code ? "bg-primary/10 text-primary" : ""}`}
                >
                  <span className="font-medium">{lang.native}</span>
                  <span className="ml-2 text-xs text-muted-foreground">({lang.label})</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <UserIcon className="w-5 h-5" />
            </Button>
          </div>

          <Button size="sm" variant="hero" asChild>
            <a href="/#contact">
              <Phone className="w-4 h-4" /> {t("nav.getQuote")}
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => {
              setIsOpen(false);
              setShowSearch(!showSearch);
            }}
          >
            <Search className="w-5 h-5 text-foreground" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2 relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => navigate("/profile")}
          >
            <UserIcon className="w-5 h-5 text-foreground" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Globe className="w-5 h-5 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card max-h-[300px] overflow-y-auto">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`cursor-pointer ${language === lang.code ? "bg-primary/10 text-primary" : ""}`}
                >
                  <span className="font-medium">{lang.native}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="text-foreground p-2" onClick={() => {
            setIsOpen(!isOpen);
            setShowSearch(false);
          }}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border overflow-hidden px-4 py-3"
          >
            <div className="relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              
              {searchQuery.trim() !== "" && searchResults.length > 0 && (
                <div className="mt-2 bg-card border border-border rounded-xl shadow-elevated overflow-hidden max-h-[60vh] overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left border-b border-border last:border-0"
                    >
                      <div className="w-12 h-12 rounded bg-muted overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                        <p className="text-sm font-medium text-primary mt-1">₹{product.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-foreground/70 hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Button size="lg" variant="hero" className="w-full" asChild>
                <a href="/#contact" onClick={() => setIsOpen(false)}>
                  <Phone className="w-4 h-4 mr-2" /> {t("nav.getQuote")}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
