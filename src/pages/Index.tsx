import { useState, useEffect } from "react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PhotographerBio from "@/components/PhotographerBio";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";

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
    "@type": "Person",
    "name": "Maria Silva",
    "jobTitle": "Fotógrafa de Produção",
    "description": "Fotógrafa de produção especializada em moda, editorial e fotografia comercial.",
    "url": "https://mariasilva.com.br",
    "image": "https://mariasilva.com.br/og-image.jpg",
    "sameAs": ["https://instagram.com/mariasilva.foto"],
    "knowsAbout": ["Fotografia de Moda", "Fotografia Editorial", "Produção Comercial"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressCountry": "BR"
    }
  };

  return (
    <>
      <SEO
        title="Maria Silva - Produção & Fotografia de Moda"
        description="Fotógrafa de produção especializada em moda, editorial e fotografia comercial."
        canonicalUrl="/"
        ogType="profile"
        jsonLd={jsonLd}
      />

      <PortfolioHeader activeCategory={activeCategory} />
      
      <main>
        <PhotographerBio />

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && displayImages.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <MasonryGallery
              images={displayImages}
              onImageClick={handleImageClick}
            />
          </div>
        )}

        {!loading && !error && displayImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhuma imagem encontrada.</p>
          </div>
        )}
      </main>

      {lightboxOpen && displayImages.length > 0 && (
        <Lightbox
          images={displayImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default Index;