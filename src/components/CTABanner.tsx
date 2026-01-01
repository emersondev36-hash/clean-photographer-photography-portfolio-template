import { motion } from "motion/react";
import { Calendar, MessageCircle, Instagram } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary text-xs font-mono uppercase tracking-wider mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Agenda Aberta
          </motion.div>
          
          {/* Heading */}
          <motion.h2 
            className="font-serif text-display-lg text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Pronto para criar sua{" "}
            <span className="text-primary text-glow-subtle">próxima arte?</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="font-mono text-sm text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cada tatuagem começa com uma conversa. Entre em contato para discutir sua ideia 
            e agendar sua consulta. Estamos aqui para transformar sua visão em realidade.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Primary CTA */}
            <a 
              href="/contact" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 font-mono text-sm uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Consulta</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            {/* Secondary CTAs */}
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border hover:border-primary text-foreground hover:text-primary transition-all duration-500 font-mono text-sm uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            
            <a 
              href="https://instagram.com/tatuagensstyle" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-border hover:border-primary text-foreground hover:text-primary transition-all duration-500 font-mono text-sm uppercase tracking-wider"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-12 border-t border-border/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center">
              <span className="font-serif text-3xl text-primary">500+</span>
              <p className="font-mono text-xs text-muted-foreground mt-1">Clientes Satisfeitos</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <span className="font-serif text-3xl text-primary">8+</span>
              <p className="font-mono text-xs text-muted-foreground mt-1">Anos de Experiência</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <span className="font-serif text-3xl text-primary">100%</span>
              <p className="font-mono text-xs text-muted-foreground mt-1">Materiais Descartáveis</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="text-center">
              <span className="font-serif text-3xl text-primary">ANVISA</span>
              <p className="font-mono text-xs text-muted-foreground mt-1">Normas de Segurança</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
