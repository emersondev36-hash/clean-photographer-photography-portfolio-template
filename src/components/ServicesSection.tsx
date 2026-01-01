import { motion } from "motion/react";
import { Clock, Ruler, Star, Zap } from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  priceRange: string;
  duration: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const services: ServiceCard[] = [
  {
    title: "Fine Line",
    description: "Traços delicados e minimalistas com precisão cirúrgica",
    priceRange: "R$ 300 - R$ 800",
    duration: "1-3 horas",
    features: ["Traços finos", "Design minimalista", "Alta precisão", "Ideal para primeiro tattoo"],
    icon: <Ruler className="w-5 h-5" />,
  },
  {
    title: "Blackwork",
    description: "Arte em preto sólido com contraste intenso e impactante",
    priceRange: "R$ 500 - R$ 2.000",
    duration: "2-6 horas",
    features: ["Preto sólido", "Alto contraste", "Designs geométricos", "Cobertura de tatuagens"],
    icon: <Star className="w-5 h-5" />,
    popular: true,
  },
  {
    title: "Realismo",
    description: "Retratos e cenas hiper-realistas com riqueza de detalhes",
    priceRange: "R$ 800 - R$ 4.000",
    duration: "4-10 horas",
    features: ["Retratos detalhados", "Sombreamento avançado", "Efeito 3D", "Múltiplas sessões"],
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "Dotwork",
    description: "Técnica pontilhista criando texturas e degradês únicos",
    priceRange: "R$ 400 - R$ 1.500",
    duration: "2-5 horas",
    features: ["Técnica pontilhista", "Degradês suaves", "Mandalas", "Padrões geométricos"],
    icon: <Clock className="w-5 h-5" />,
  },
];

const ServicesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
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
              Serviços
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
            Estilos & Preços
          </motion.h2>
          
          <motion.p 
            className="font-mono text-sm text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cada tatuagem é única. Os valores são estimativas baseadas na complexidade 
            e tamanho do projeto. Orçamento final após análise do design.
          </motion.p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className={`relative group p-8 border border-border/30 hover:border-primary/30 transition-all duration-500 ${
                service.popular ? 'ring-1 ring-primary/20' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider">
                  Popular
                </div>
              )}
              
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-border/50 text-primary mb-6 group-hover:border-primary/50 transition-colors">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-xl text-foreground mb-2">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="font-mono text-xs text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              {/* Price */}
              <div className="mb-4">
                <span className="font-serif text-2xl text-primary">
                  {service.priceRange}
                </span>
              </div>
              
              {/* Duration */}
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xs">{service.duration}</span>
              </div>
              
              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-xs text-muted-foreground mb-6">
            * Valores incluem design exclusivo e retoque após cicatrização
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-3 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 font-mono text-sm uppercase tracking-wider group"
          >
            <span>Solicitar Orçamento</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
