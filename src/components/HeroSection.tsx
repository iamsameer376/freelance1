import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const HeroSection = () => {
  const { t } = useLanguage();
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const slideImages = [
    "/images/hero/hero-1.png",
    "/images/hero/hero-2.png",
    "/images/hero/hero-3.png",
  ];

  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {slideImages.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
              <img
                src={src}
                alt={`Hero background ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/30 text-white text-xs md:text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight mb-6 drop-shadow-lg"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-md"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" variant="hero" asChild className="w-full sm:w-auto text-lg py-7 px-8">
              <a href="#products">
                {t("hero.explore")} <ArrowRight className="w-6 h-6 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="hero-outline" asChild className="w-full sm:w-auto text-lg py-7 px-8 bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20">
              <a href="#contact">
                <MessageCircle className="w-6 h-6 mr-2" /> {t("hero.quote")}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
