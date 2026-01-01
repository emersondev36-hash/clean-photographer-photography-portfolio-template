import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Award, Clock, Shield, Users, Star, Heart } from "lucide-react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import { fetchPexelsPhotos } from "@/services/pexels";

const About = () => {
  const [portrait, setPortrait] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortrait = async () => {
      try {
        const data = await fetchPexelsPhotos('PERSONAL', 1, 1);
        if (data.photos.length > 0) {
          const photo = data.photos[0];
          setPortrait({
            src: photo.src.large2x,
            alt: 'Artista tatuador no estúdio',
            width: photo.width,
            height: photo.height,
          });
        }
      } catch (err) {
        console.error('Erro ao carregar imagem:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPortrait();
  }, []);

  const stats = [
    { number: "8+", label: "Anos de Experiência", icon: Clock },
    { number: "500+", label: "Clientes Satisfeitos", icon: Users },
    { number: "1000+", label: "Tatuagens Realizadas", icon: Star },
    { number: "100%", label: "Materiais Descartáveis", icon: Shield },
  ];

  const values = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Seguimos rigorosamente todas as normas da ANVISA. Materiais 100% descartáveis e ambiente esterilizado."
    },
    {
      icon: Star,
      title: "Qualidade",
      description: "Utilizamos apenas tintas e equipamentos de primeira linha, garantindo resultados duradouros e cores vibrantes."
    },
    {
      icon: Heart,
      title: "Personalização",
      description: "Cada tatuagem é única. Trabalhamos em colaboração para criar a arte perfeita para você."
    },
    {
      icon: Award,
      title: "Experiência",
      description: "Anos de prática e aperfeiçoamento contínuo em diversas técnicas de tatuagem."
    },
  ];

  const timeline = [
    {
      year: "2016",
      title: "Início da Jornada",
      description: "Começamos como um pequeno estúdio com foco em blackwork e designs geométricos."
    },
    {
      year: "2018",
      title: "Expansão Criativa",
      description: "Ampliamos nossa expertise para fine line, realismo e dotwork, atendendo a demanda crescente."
    },
    {
      year: "2020",
      title: "Novo Espaço",
      description: "Inauguração do novo estúdio em São Paulo, com ambiente moderno e equipamentos de última geração."
    },
    {
      year: "2024",
      title: "Referência no Mercado",
      description: "Reconhecidos como um dos principais estúdios de tatuagem artística da região."
    },
  ];

  return (
    <>
      <SEO
        title="Sobre - Tatuagens Style | Nossa História e Filosofia"
        description="Conheça o estúdio Tatuagens Style. Mais de 8 anos de experiência em tatuagem artística, especializado em blackwork, fine line e realismo."
        canonicalUrl="/about"
      />

      <PortfolioHeader activeCategory="" />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-mesh">
          <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />
          
          <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left - Content */}
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                      Sobre Nós
                    </span>
                  </div>
                  
                  <h1 className="font-serif text-display-lg text-foreground leading-[0.95]">
                    Tatuagens{" "}
                    <span className="text-primary text-glow-subtle">Style</span>
                  </h1>
                  
                  <p className="font-mono text-sm text-muted-foreground">
                    Estúdio de Tatuagem Artística • São Paulo
                  </p>
                </div>

                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Somos um estúdio de tatuagem artística dedicado a transformar suas ideias 
                    em obras de arte permanentes. Com mais de 8 anos de experiência, 
                    especializamos em diversos estilos, desde o minimalismo do fine line 
                    até a intensidade do blackwork e a precisão do realismo.
                  </p>

                  <p>
                    Nosso compromisso vai além da estética: priorizamos a segurança, 
                    o conforto e a experiência única de cada cliente. Cada tatuagem 
                    é tratada como uma obra de arte personalizada, criada em colaboração 
                    direta com você.
                  </p>
                </div>

                <motion.div 
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    to="/contact" 
                    className="group inline-flex items-center gap-4 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 font-mono text-sm uppercase tracking-wider"
                  >
                    <span>Agendar Consulta</span>
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right - Image */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {!loading && portrait && (
                  <div className="relative overflow-hidden">
                    <img
                      src={portrait.src}
                      alt={portrait.alt}
                      className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    {/* Decorative frame */}
                    <div className="absolute inset-0 border border-primary/20 pointer-events-none" />
                    <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/10 pointer-events-none" />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-border/20">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 border border-primary/30 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-4xl text-primary block mb-2">{stat.number}</span>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
              <motion.div 
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  Nossos Valores
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              </motion.div>
              
              <motion.h2 
                className="font-serif text-display-md text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Por que nos escolher
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="group p-8 border border-border/20 hover:border-primary/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                    <value.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-muted/5">
          <div className="max-w-[1200px] mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
              <motion.div 
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  Nossa Trajetória
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              </motion.div>
              
              <motion.h2 
                className="font-serif text-display-md text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Anos de dedicação
              </motion.h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className={`relative flex items-center gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`inline-block p-6 border border-border/20 hover:border-primary/30 transition-colors ${
                        index % 2 === 0 ? 'md:ml-auto' : ''
                      }`}>
                        <span className="font-serif text-3xl text-primary block mb-2">{item.year}</span>
                        <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                        <p className="font-mono text-xs text-muted-foreground max-w-sm">{item.description}</p>
                      </div>
                    </div>
                    
                    {/* Center dot */}
                    <div className="hidden md:flex items-center justify-center w-4 h-4 bg-background border-2 border-primary rounded-full z-10" />
                    
                    {/* Empty space for alignment */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="py-24">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10">
            <div className="text-center mb-16">
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
                Estilos que dominamos
              </motion.h2>
            </div>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {["Blackwork", "Fine Line", "Realismo", "Dotwork", "Geométrico", "Ornamental", "Neo Traditional", "Minimalista", "Lettering", "Cover-up"].map((style) => (
                <span 
                  key={style} 
                  className="px-6 py-3 border border-border/30 hover:border-primary/50 text-muted-foreground hover:text-primary font-mono text-sm uppercase tracking-wider transition-all duration-300"
                >
                  {style}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-border/20">
          <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-display-md text-foreground mb-6">
                Pronto para criar sua{" "}
                <span className="text-primary text-glow-subtle">próxima arte?</span>
              </h2>
              
              <p className="font-mono text-sm text-muted-foreground mb-10 max-w-lg mx-auto">
                Entre em contato para agendar uma consulta e transformar sua ideia em realidade.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 font-mono text-sm uppercase tracking-wider"
                >
                  <span>Agendar Consulta</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-3 px-8 py-4 border border-border hover:border-primary text-foreground hover:text-primary transition-all duration-500 font-mono text-sm uppercase tracking-wider"
                >
                  <span>Ver Portfólio</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default About;
