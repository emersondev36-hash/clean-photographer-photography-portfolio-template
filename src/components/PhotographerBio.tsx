import { Link } from "react-router-dom";

const PhotographerBio = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-display animate-fade-in">
          Portfólio 2024
        </p>
        
        <h1 className="font-display text-display-xl text-foreground animate-slide-up">
          Maria Silva
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Fotógrafa de produção especializada em moda, editorial e trabalhos comerciais.
          Criando imagens que contam histórias.
        </p>

        <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link 
            to="/about" 
            className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-500 font-display link-underline"
          >
            Conheça meu trabalho
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PhotographerBio;