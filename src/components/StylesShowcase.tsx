import { motion } from "motion/react";
import { useState } from "react";

interface Style {
  name: string;
  description: string;
  image: string;
  tags: string[];
}

const styles: Style[] = [
  {
    name: "Blackwork",
    description: "Arte em preto sólido com forte impacto visual. Perfeito para quem busca designs ousados e atemporais.",
    image: "https://images.pexels.com/photos/955938/pexels-photo-955938.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Geométrico", "Tribal", "Ornamental"],
  },
  {
    name: "Fine Line",
    description: "Traços delicados e precisos que criam designs elegantes e minimalistas.",
    image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Minimalista", "Delicado", "Elegante"],
  },
  {
    name: "Realismo",
    description: "Retratos e cenas hiper-realistas com riqueza de detalhes impressionante.",
    image: "https://images.pexels.com/photos/2183131/pexels-photo-2183131.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Retratos", "Natureza", "3D"],
  },
  {
    name: "Dotwork",
    description: "Técnica pontilhista que cria texturas únicas e degradês suaves.",
    image: "https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Mandalas", "Sagrado", "Orgânico"],
  },
  {
    name: "Neo Traditional",
    description: "Evolução do tradicional com cores vibrantes e linhas mais refinadas.",
    image: "https://images.pexels.com/photos/4125548/pexels-photo-4125548.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Colorido", "Bold", "Ilustrativo"],
  },
  {
    name: "Ornamental",
    description: "Padrões decorativos inspirados em arte sacra e arquitetura.",
    image: "https://images.pexels.com/photos/2649403/pexels-photo-2649403.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Barroco", "Filigrana", "Simétrico"],
  },
];

const StylesShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden bg-muted/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Especialidades
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>
          
          <motion.h2 
            className="font-serif text-display-md text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Estilos de Tatuagem
          </motion.h2>
          
          <motion.p 
            className="font-mono text-sm text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Dominamos diversas técnicas para transformar sua visão em arte permanente
          </motion.p>
        </div>
        
        {/* Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style, index) => (
            <motion.div
              key={style.name}
              className="relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <motion.img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  {style.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-primary/20 text-primary text-xs font-mono uppercase tracking-wider border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Title */}
                <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {style.name}
                </h3>
                
                {/* Description */}
                <p className="font-mono text-xs text-muted-foreground leading-relaxed opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  {style.description}
                </p>
                
                {/* View more */}
                <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <span className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
                    <span>Ver trabalhos</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
              
              {/* Border effect */}
              <div className="absolute inset-0 border border-border/0 group-hover:border-primary/30 transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StylesShowcase;
