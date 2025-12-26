import { useState, useEffect } from "react";
import { motion } from "motion/react";
import PhotographerBio from "@/components/PhotographerBio";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import Marquee from "@/components/Marquee";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { AISuggestions } from "@/components/AISuggestions";
import { AIImageGenerator } from "@/components/AIImageGenerator";

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
        const data = await fetchMixedMedia(activeCategory, 1, 20);
        setDisplayImages(data.items);
      } catch (err) {
        console.error("Erro ao carregar mídia:", err);
        setError("Falha ao carregar imagens. Por favor, tente novamente mais tarde.");
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
    "name": "Estúdio de Tatuagem",
    "jobTitle": "Tatuador",
    "description":
      "Estúdio de tatuagem artística especializado em blackwork, fine line e realismo.",
    "url": "https://exemplo.com",
    "knowsAbout": [
      "Blackwork",
      "Fine Line",
      "Realismo",
      "Tatuagem Geométrica",
      "Dotwork"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brasil",
      "addressCountry": "BR"
    }
  };

  return (
    <>
      <SEO
        title="Estúdio de Tatuagem | Blackwork, Fine Line & Realismo"
        description="Estúdio de tatuagem artística especializado em blackwork, fine line e realismo."
        canonicalUrl="/"
        ogType="website"
        jsonLd={jsonLd}
      />

      <main>
        <PhotographerBio />

        <Marquee text="Blackwork • Fine Line • Realismo • Geométrico • Dotwork • Ornamental" />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive font-mono text-sm">{error}</p>
          </div>
        )}

        {!error && displayImages.length > 0 && (
          <section className="relative">
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
            <p className="font-mono text-sm text-muted-foreground">
              Nenhuma imagem encontrada.
            </p>
          </div>
        )}

        <AISuggestions />

        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-900/30 to-transparent pointer-events-none" />

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <motion.h2
                  className="font-serif text-display-lg text-foreground leading-[0.9] mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Visualize sua{" "}
                  <span className="text-primary">Arte</span>
                </motion.h2>

                <motion.p
                  className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md mb-10"
                >
                  Gere conceitos únicos de tatuagem usando inteligência artificial.
                </motion.p>

                <AIImageGenerator />
              </div>
            </div>
          </div>
        </section>
      </main>

      {lightboxOpen && (
        <Lightbox
          images={displayImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <AIChatAssistant />
    </>
  );
};

export default Index;
