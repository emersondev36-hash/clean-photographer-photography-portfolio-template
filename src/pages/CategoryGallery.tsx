import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import MasonryGallery from "@/components/MasonryGallery";
import Lightbox from "@/components/Lightbox";
import SEO from "@/components/SEO";
import { fetchMixedMedia } from "@/services/pexels";

const validCategories = ['selected', 'commissioned', 'editorial', 'personal', 'all', 'blackwork', 'fineline', 'realismo', 'dotwork', 'neotraditional', 'ornamental'];

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
      'selected': 'Destaques',
      'commissioned': 'Blackwork',
      'editorial': 'Fine Line',
      'personal': 'Realismo',
      'all': 'Galeria Completa',
      'blackwork': 'Blackwork',
      'fineline': 'Fine Line',
      'realismo': 'Realismo',
      'dotwork': 'Dotwork',
      'neotraditional': 'Neo Traditional',
      'ornamental': 'Ornamental'
    };
    return titles[cat] || 'Galeria';
  };

  const getCategoryDescription = (cat: string) => {
    const descriptions: Record<string, string> = {
      'selected': 'Nossos melhores trabalhos selecionados, destacando a excelência artística do estúdio.',
      'commissioned': 'Arte em preto sólido com forte impacto visual. Designs ousados e atemporais.',
      'editorial': 'Traços delicados e precisos que criam designs elegantes e minimalistas.',
      'personal': 'Retratos e cenas hiper-realistas com riqueza de detalhes impressionante.',
      'all': 'Explore toda a nossa coleção de tatuagens.',
      'blackwork': 'Arte em preto sólido com forte impacto visual. Utiliza apenas tinta preta para criar designs geométricos, tribais e coberturas ousadas.',
      'fineline': 'Técnica de agulha única que produz linhas extremamente finas e delicadas. Perfeita para designs minimalistas e botânicos.',
      'realismo': 'Reprodução hiper-realista de retratos, animais e cenas. Maestria técnica em texturas, sombras e detalhes fotográficos.',
      'dotwork': 'Arte pontilhista que cria degradês e texturas através de milhares de pontos. Ideal para mandalas e geometria sagrada.',
      'neotraditional': 'Evolução moderna do estilo tradicional americano. Linhas bold com cores vibrantes e temas ilustrativos contemporâneos.',
      'ornamental': 'Padrões decorativos inspirados em arte barroca e arquitetura gótica. Designs simétricos que seguem a anatomia do corpo.'
    };
    return descriptions[cat] || 'Explore nossa coleção';
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${getCategoryTitle(category)} - Tatuagens Style`,
    "description": getCategoryDescription(category),
    "url": `https://tatuagensstyle.com.br/category/${category}`,
    "creator": { "@type": "Organization", "name": "Tatuagens Style" }
  };

  return (
    <>
      <SEO
        title={`${getCategoryTitle(category)} - Tatuagens Style`}
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