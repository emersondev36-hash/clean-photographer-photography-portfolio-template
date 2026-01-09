import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Style {
  name: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

const styles: Style[] = [
  {
    name: "Blackwork",
    description: "Arte em preto sólido com forte impacto visual. Utiliza apenas tinta preta para criar desde designs geométricos minimalistas até coberturas densas e ousadas. Ideal para quem busca tattoos atemporais.",
    image: "https://images.pexels.com/photos/7389072/pexels-photo-7389072.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Preto Sólido", "Geométrico", "Alto Contraste"],
    href: "/category/blackwork",
  },
  {
    name: "Fine Line",
    description: "Técnica de agulha única que produz linhas extremamente finas e delicadas. Perfeita para designs minimalistas, botânicos e símbolos sutis que envelhecem com elegância.",
    image: "https://images.pexels.com/photos/15116198/pexels-photo-15116198.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Agulha Única", "Minimalista", "Botânico"],
    href: "/category/fineline",
  },
  {
    name: "Realismo",
    description: "Reprodução hiper-realista de retratos, animais e cenas. Exige maestria técnica para capturar texturas, sombras e detalhes fotográficos na pele.",
    image: "https://images.pexels.com/photos/4442040/pexels-photo-4442040.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Retratos", "Fotográfico", "Sombreamento"],
    href: "/category/realismo",
  },
  {
    name: "Dotwork",
    description: "Arte pontilhista que cria degradês e texturas através de milhares de pontos. Muito usada em mandalas, padrões sagrados e designs geométricos complexos.",
    image: "https://images.pexels.com/photos/32886463/pexels-photo-32886463.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Pontilhismo", "Mandalas", "Geometria Sagrada"],
    href: "/category/dotwork",
  },
  {
    name: "Neo Traditional",
    description: "Evolução moderna do estilo tradicional americano. Combina linhas bold com cores vibrantes, degradês suaves e temas ilustrativos contemporâneos.",
    image: "https://images.pexels.com/photos/1680178/pexels-photo-1680178.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Cores Vibrantes", "Ilustrativo", "Bold Lines"],
    href: "/category/neotraditional",
  },
  {
    name: "Ornamental",
    description: "Padrões decorativos inspirados em arte barroca, filigrana e arquitetura gótica. Designs simétricos e intrincados que seguem a anatomia do corpo.",
    image: "https://images.pexels.com/photos/29241240/pexels-photo-29241240.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Barroco", "Simetria", "Filigrana"],
    href: "/category/ornamental",
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
                  <Link 
                    to={style.href}
                    className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider hover:gap-3 transition-all"
                  >
                    <span>Ver trabalhos</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
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
