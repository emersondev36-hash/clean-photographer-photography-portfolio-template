import { motion } from "motion/react";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowLeftRight } from "lucide-react";

interface BeforeAfterImage {
  id: string;
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
}

// Placeholder data - in production, these would be real images
const coverUpExamples: BeforeAfterImage[] = [
  {
    id: "1",
    title: "Cobertura Floral",
    description: "Transformação de tatuagem antiga em composição floral detalhada",
    beforeUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=800&fit=crop",
    afterUrl: "https://images.unsplash.com/photo-1590246814883-57c511e76c68?w=600&h=800&fit=crop",
  },
  {
    id: "2",
    title: "Cobertura Blackwork",
    description: "Restauração completa com técnica blackwork geométrico",
    beforeUrl: "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=600&h=800&fit=crop",
    afterUrl: "https://images.unsplash.com/photo-1569494523408-a64a430c4331?w=600&h=800&fit=crop",
  },
  {
    id: "3",
    title: "Cobertura Realista",
    description: "Conversão de tribal antigo em retrato realista",
    beforeUrl: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=600&h=800&fit=crop",
    afterUrl: "https://images.unsplash.com/photo-1542349314-10d26c8e1c1c?w=600&h=800&fit=crop",
  },
];

const BeforeAfterSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % coverUpExamples.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + coverUpExamples.length) % coverUpExamples.length);
    setSliderPosition(50);
  };

  const activeImage = coverUpExamples[activeIndex];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-900/30 to-obsidian-950 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Transformações
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <h2 className="font-serif text-display-md text-foreground mb-4">
            Coberturas & Restaurações
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto">
            Transformamos tatuagens antigas em obras de arte. Veja o antes e depois 
            de alguns dos nossos trabalhos de cobertura.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Slider Container */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              ref={containerRef}
              className="relative aspect-[3/4] overflow-hidden border border-border/30 cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background) */}
              <img
                src={activeImage.afterUrl}
                alt="Depois"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeImage.beforeUrl}
                  alt="Antes"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: `${100 / (sliderPosition / 100)}%` }}
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                  <ArrowLeftRight className="w-5 h-5 text-primary-foreground" strokeWidth={2} />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border/30">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground">Antes</span>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border/30">
                <span className="font-mono text-[10px] uppercase tracking-wider text-foreground">Depois</span>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border/30">
                <span className="font-mono text-[10px] text-muted-foreground">
                  Arraste para comparar
                </span>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prevSlide}
                className="group flex items-center gap-2 px-4 py-2 border border-border/30 hover:border-primary/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Anterior
                </span>
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {coverUpExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setSliderPosition(50);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? "bg-primary w-6" 
                        : "bg-border/50 hover:bg-border"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="group flex items-center gap-2 px-4 py-2 border border-border/30 hover:border-primary/50 transition-colors"
              >
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Próximo
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary block mb-2">
                Projeto {activeIndex + 1} de {coverUpExamples.length}
              </span>
              <h3 className="font-serif text-3xl text-foreground mb-4">
                {activeImage.title}
              </h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                {activeImage.description}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-border/20">
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                Sobre Coberturas
              </h4>
              <ul className="space-y-3">
                {[
                  "Consulta prévia para avaliação da tatuagem antiga",
                  "Design personalizado para melhor cobertura",
                  "Técnicas avançadas para cores e linhas",
                  "Garantia de resultado satisfatório",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="font-mono text-xs text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="/contact"
              className="group inline-flex items-center gap-4 px-6 py-3 border border-primary/40 hover:border-primary hover:bg-primary/10 transition-all duration-300"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                Agende uma Consulta
              </span>
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
