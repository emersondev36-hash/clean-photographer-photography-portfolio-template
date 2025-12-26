import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Suggestion {
  title: string;
  description: string;
  style: string;
  placement: string;
}

const SUGGEST_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-suggest`;

export const AISuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SUGGEST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ context: 'Sugira ideias criativas para tatuagens artísticas em blackwork, fine line ou realismo' }),
      });

      const data = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
        setHasLoaded(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-900/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />
      
      <div className="max-w-[1400px] mx-auto relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <div>
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Inteligência Artificial
              </span>
            </motion.div>
            
            <motion.h2 
              className="font-serif text-display-lg text-foreground leading-[0.9]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Inspiração{" "}
              <span className="text-primary text-glow-subtle">IA</span>
            </motion.h2>
          </div>
          
          <motion.div 
            className="lg:pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-md">
              Deixe a inteligência artificial sugerir ideias únicas e personalizadas 
              para sua próxima tatuagem. Cada conceito é gerado especialmente para você.
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        {!hasLoaded && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              onClick={fetchSuggestions} 
              disabled={isLoading} 
              size="lg" 
              className="group gap-4 bg-transparent border border-primary/40 hover:border-primary hover:bg-primary/10 text-foreground rounded-none px-10 py-7 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gerando ideias...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-primary group-hover:text-foreground transition-colors" />
                  <span>Gerar Sugestões</span>
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Suggestions Grid */}
        <AnimatePresence mode="wait">
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
                {suggestions.map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="group relative border border-border/20 p-8 hover:border-primary/30 transition-all duration-500"
                  >
                    {/* Number */}
                    <span className="absolute top-4 right-4 font-mono text-xs text-muted-foreground/40">
                      0{i + 1}
                    </span>
                    
                    {/* Icon */}
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                      <Lightbulb className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-serif text-xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {suggestion.title}
                    </h3>
                    
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">
                      {suggestion.description}
                    </p>
                    
                    {/* Meta */}
                    <div className="pt-6 border-t border-border/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Estilo</span>
                        <span className="font-mono text-xs text-foreground/80">{suggestion.style}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">Local</span>
                        <span className="font-mono text-xs text-foreground/80">{suggestion.placement}</span>
                      </div>
                    </div>

                    {/* Corner accents on hover */}
                    <div className="absolute top-0 left-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-px bg-primary" />
                      <div className="absolute top-0 left-0 w-px h-full bg-primary" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 right-0 w-full h-px bg-primary" />
                      <div className="absolute bottom-0 right-0 w-px h-full bg-primary" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Refresh button */}
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={fetchSuggestions} 
                  disabled={isLoading} 
                  className="gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground hover:bg-transparent"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Novas Sugestões
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};