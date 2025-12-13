import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";

const validCategories = ['selected', 'commissioned', 'editorial', 'personal', 'all'];

const CategoryGallery = () => {
  const { category } = useParams<{ category: string }>();
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [page, setPage] = useState(1);

  if (!category || !validCategories.includes(category.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  const categoryUpper = category.toUpperCase();

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMixedMedia(categoryUpper, page, 20);
        setImages(data.items);
      } catch (err) {
        console.error('Erro ao carregar mídia:', err);
        setError('Falha ao carregar imagens.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [categoryUpper, page]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, string> = {
      'selected': 'Selecionados',
      'commissioned': 'Encomendados',
      'editorial': 'Editorial',
      'personal': 'Pessoal',
      'all': 'Galeria Completa'
    };
    return titles[cat] || 'Galeria';
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'selected': 'Seleção curada de campanhas de moda e trabalhos editoriais.',
      'commissioned': 'Campanhas comerciais para marcas de luxo.',
      'editorial': 'Fotografia editorial para publicações de destaque.',
      'personal': 'Projetos pessoais e experimentação criativa.',
      'all': 'Portfólio completo de trabalhos.'
    };
    return descriptions[cat] || 'Explore a coleção';
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${getCategoryTitle(category)} - Maria Silva`,
    "description": getCategoryDescription(category),
    "url": `https://mariasilva.com.br/category/${category}`,
    "creator": { "@type": "Person", "name": "Maria Silva" }
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle(category)} - Maria Silva`}
        description={getCategoryDescription(category)}
        canonicalUrl={`/category/${category}`}
        jsonLd={jsonLd}
      />

      <PortfolioHeader activeCategory={categoryUpper} />

      <main className="pt-24">
        {/* Category Header */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-display">
              Portfólio
            </p>
            <h1 className="font-display text-display-lg text-foreground">
              {getCategoryTitle(category)}
            </h1>
            <p className="text-lg text-muted-foreground italic max-w-xl">
              {getCategoryDescription(category)}
            </p>
          </div>
        </section>

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {!error && images.length > 0 && (
          <div className="animate-fade-in">
            <MasonryGallery images={images} onImageClick={handleImageClick} />
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhuma imagem encontrada.</p>
          </div>
        )}
      </main>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <PortfolioFooter />
    </>
  );
};

export default CategoryGallery;