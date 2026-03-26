import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Link } from "react-router-dom";
import { useAdmin } from "@/lib/AdminContext";

const ProductCarousel = () => {
  const { t } = useLanguage();
  const { heroSlides } = useAdmin();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="relative w-full overflow-hidden bg-background py-10">
      <div className="container mx-auto px-4 mb-8 text-center md:text-left">
        <h2 className="text-3xl font-extrabold text-foreground mb-2">Featured Machinery</h2>
        <p className="text-muted-foreground">High-performance tools for modern Indian agriculture.</p>
      </div>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {heroSlides.map((item, index) => (
            <div key={item.id || index} className="embla__slide flex-[0_0_100%] min-w-0 relative px-4">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-lg text-white/80 mb-6 max-w-lg">{item.desc}</p>
                    <Button variant="hero" asChild>
                      <Link to="/#products">
                        View More <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;

