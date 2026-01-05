import { useState, useEffect } from "react";
import { motion } from "motion/react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import Marquee from "@/components/Marquee";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { AISuggestions } from "@/components/AISuggestions";
import { AIImageGenerator } from "@/components/AIImageGenerator";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";
import StylesShowcase from "@/components/StylesShowcase";
import CTABanner from "@/components/CTABanner";
import AfterCareSection from "@/components/AfterCareSection";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import WhatsAppButton from "@/components/WhatsAppButton";
import ArtistsSection from "@/components/ArtistsSection";

const Index = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeCategory = "SELECTED";

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(activeCategory, 1, 12);
        setDisplayImages(data.items);
      } catch (err) {
        console.error('Erro ao carregar mídia:', err);
        setError('Falha ao carregar imagens. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tatuagens Style",
    "jobTitle": "Estúdio de Tatuagem",
    "description": "Estúdio de tatuagem artística especializado em blackwork, fine line e realismo. Arte permanente que conta sua história.",
    "url": "https://tatuagensstyle.com.br",
    "image": "https://tatuagensstyle.com.br/og-image.jpg",
    "sameAs": ["https://instagram.com/tatuagensstyle"],
    "knowsAbout": ["Blackwork", "Fine Line", "Realismo", "Tatuagem Geométrica", "Dotwork"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressCountry": "BR"
    }
  };

  return (
    <>
      <SEO
        title="Tatuagens Style - Arte em Tatuagem | Blackwork, Fine Line & Realismo"
        description="Estúdio de tatuagem artística especializado em blackwork, fine line e realismo. Arte permanente que conta sua história."
        canonicalUrl="/"
        ogType="website"
        jsonLd={jsonLd}
      />

      <PortfolioHeader activeCategory={activeCategory} />
      
      <main>
        <PhotographerBio />
        
        {/* Elegant marquee divider */}
        <Marquee text="Blackwork • Fine Line • Realismo • Geométrico • Dotwork • Ornamental" />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive font-mono text-sm">{error}</p>
          </div>
        )}

        {/* Gallery Section */}
        {!error && displayImages.length > 0 && (
          <section className="relative">
            {/* Section Header */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-24 pb-12">
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  Trabalhos Recentes
                </span>
              </motion.div>
              
              <motion.h2 
                className="font-serif text-display-md text-foreground mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Portfólio
              </motion.h2>
            </div>
            
            <MasonryGallery
              images={displayImages}
              onImageClick={handleImageClick}
            />
          </section>
        )}

        {!loading && !error && displayImages.length === 0 && (
          <div className="text-center py-32">
            <p className="font-mono text-sm text-muted-foreground">Nenhuma imagem encontrada.</p>
          </div>
        )}

        {/* Styles Showcase Section */}
        <StylesShowcase />

        {/* Before/After Slider Section */}
        <BeforeAfterSlider />

        {/* Services & Pricing Section */}
        <ServicesSection />

        {/* Aftercare Section */}
        <AfterCareSection />

        {/* Testimonials Section */}
        <TestimonialsCarousel />

        {/* Artists Section */}
        <ArtistsSection />

        {/* AI Suggestions Section */}
        <AISuggestions />

        {/* AI Image Generator Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-900/30 to-transparent pointer-events-none" />
          
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left - Content */}
              <div>
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                    Gerador de Arte
                  </span>
                </motion.div>
                
                <motion.h2 
                  className="font-serif text-display-lg text-foreground leading-[0.9] mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Visualize sua{" "}
                  <span className="text-primary text-glow-subtle">Arte</span>
                </motion.h2>
                
                <motion.p 
                  className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Use inteligência artificial para gerar conceitos únicos de tatuagem. 
                  Descreva sua visão e deixe a IA criar uma prévia da sua próxima arte.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <AIImageGenerator />
                </motion.div>
              </div>
              
              {/* Right - Decorative */}
              <motion.div 
                className="hidden lg:block relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative aspect-square">
                  {/* Decorative grid */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                      <div 
                        key={i} 
                        className="border border-border/10 hover:border-primary/20 transition-colors duration-500"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="font-serif text-8xl text-primary/10">AI</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Banner */}
        <CTABanner />
      </main>

      {lightboxOpen && displayImages.length > 0 && (
        <Lightbox
          images={displayImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* AI Chat Assistant - floating */}
      <AIChatAssistant />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      <PortfolioFooter />
    </>
  );
};

export default Index;