import { Link } from "react-router-dom";

const PortfolioFooter = () => {
  return (
    <footer className="border-t border-border/30">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
              Maria Silva
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Fotógrafa de moda e produção visual baseada em São Paulo.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
              Portfólio
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/category/selected" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline w-fit">
                Selecionados
              </Link>
              <Link to="/category/commissioned" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline w-fit">
                Encomendados
              </Link>
              <Link to="/category/editorial" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline w-fit">
                Editorial
              </Link>
              <Link to="/category/personal" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline w-fit">
                Pessoal
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-muted-foreground">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contato@mariasilva.com.br"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline w-fit"
              >
                contato@mariasilva.com.br
              </a>
              <a
                href="tel:+5511999887766"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline w-fit"
              >
                +55 (11) 99988-7766
              </a>
              <a
                href="https://instagram.com/mariasilva.foto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline w-fit"
              >
                @mariasilva.foto
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Maria Silva. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/50">
            São Paulo, Brasil
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;