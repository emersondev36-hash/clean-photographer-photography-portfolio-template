import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import FocusTrap from "focus-trap-react";

interface PortfolioHeaderProps {
  activeCategory: string;
}

const categories = [
  { key: "SELECTED", label: "Selecionados" },
  { key: "COMMISSIONED", label: "Encomendados" },
  { key: "EDITORIAL", label: "Editorial" },
  { key: "PERSONAL", label: "Pessoal" },
];

const PortfolioHeader = ({ activeCategory }: PortfolioHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-lg md:text-xl tracking-tight text-foreground hover:text-accent transition-colors duration-500"
        >
          Maria Silva
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Abrir menu de navegação"
          aria-expanded={mobileMenuOpen}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {categories.map((category) => (
            <Link
              key={category.key}
              to={`/category/${category.key.toLowerCase()}`}
              className={`relative text-sm tracking-wide transition-colors duration-300 link-underline ${
                activeCategory === category.key
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.label}
            </Link>
          ))}
          
          <Link
            to="/about"
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
          >
            Sobre
          </Link>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <FocusTrap>
            <div
              className="fixed inset-0 bg-background z-50 md:hidden animate-fade-in"
              role="dialog"
              aria-modal="true"
              aria-label="Navegação mobile"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Fechar menu de navegação"
                >
                  <X size={26} strokeWidth={1.5} />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col items-center justify-center gap-10 px-8 pt-16">
                {categories.map((category, index) => (
                  <Link
                    key={category.key}
                    to={`/category/${category.key.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display text-3xl tracking-tight transition-colors duration-300 ${
                      activeCategory === category.key
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {category.label}
                  </Link>
                ))}

                {/* Separator */}
                <div className="w-12 h-px bg-accent/50 my-4"></div>

                {/* About Link */}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl tracking-tight text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  Sobre
                </Link>
              </nav>
            </div>
          </FocusTrap>
        )}
      </div>
    </header>
  );
};

export default PortfolioHeader;