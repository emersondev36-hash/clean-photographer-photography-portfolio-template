import { Link } from "react-router-dom";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Página Não Encontrada | Tatuagens Style"
        description="A página que você está procurando não existe ou foi movida. Retorne à página inicial para explorar nosso portfólio de tatuagens."
        canonicalUrl="/404"
        ogType="website"
      />

      <PortfolioHeader activeCategory="" />

      <main className="min-h-screen flex items-center justify-center px-8 pt-20 animate-fade-in">
        <div className="text-center max-w-2xl">
          {/* Tattoo-themed 404 */}
          <div className="relative inline-block mb-8">
            <h1 className="text-7xl md:text-9xl font-display tracking-tight text-primary text-glow">
              404
            </h1>
            <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10" />
          </div>
          
          <p className="text-2xl md:text-3xl font-display tracking-tight mb-4 text-foreground">
            Arte não encontrada
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-md mx-auto font-mono">
            A página que você está procurando não existe ou foi movida para outro lugar.
          </p>
          
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 glow-purple"
          >
            Voltar ao Estúdio
          </Link>
        </div>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default NotFound;
