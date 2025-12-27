import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    role: "Diretora de Arte, Vogue Brasil",
    content: "A sensibilidade artística da Raya é incomparável. Cada imagem que ela captura transcende a fotografia comum e se torna verdadeira arte.",
    avatar: "MS"
  },
  {
    id: 2,
    name: "Carlos Eduardo",
    role: "CEO, Galeria Modernista",
    content: "Trabalhamos com centenas de fotógrafos ao longo dos anos, mas o trabalho de Raya tem uma qualidade etérea que simplesmente não encontramos em nenhum outro lugar.",
    avatar: "CE"
  },
  {
    id: 3,
    name: "Juliana Ferreira",
    role: "Editora-Chefe, Elle Decor",
    content: "As composições de Raya são magistrais. Ela consegue capturar a alma de cada projeto arquitetônico de uma forma única e poética.",
    avatar: "JF"
  },
  {
    id: 4,
    name: "Roberto Almeida",
    role: "Curador, MASP",
    content: "A obra de Raya é um testemunho do poder da fotografia como forma de arte. Cada série conta uma história profunda e envolvente.",
    avatar: "RA"
  }
];

const TestimonialsCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            O Que Dizem
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
                className="absolute w-full"
              >
                <div className="glass-card p-12 md:p-16 text-center">
                  {/* Content */}
                  <p className="font-display text-xl md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed mb-10 italic">
                    "{testimonials[current].content}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
                      <span className="font-mono text-sm text-primary">
                        {testimonials[current].avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-foreground">
                        {testimonials[current].name}
                      </h4>
                      <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current 
                      ? "w-8 bg-primary" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
