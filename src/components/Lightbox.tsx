import { useState, useEffect, useRef } from "react";

interface LightboxProps {
  images: { 
    src: string; 
    alt: string;
    photographer?: string;
    client?: string;
    location?: string;
    details?: string;
  }[];
  initialIndex: number;
  onClose: () => void;
}

const Lightbox = ({ images, initialIndex, onClose }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const imageRect = imageRef.current.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    // Check if click is outside image (top or bottom)
    if (clickY < imageRect.top || clickY > imageRect.bottom) {
      onClose();
      return;
    }
    
    // Check if click is on left or right side of image
    const imageCenterX = imageRect.left + imageRect.width / 2;
    if (clickX < imageCenterX) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const imageRect = imageRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    
    setCursorPos({ x: e.clientX, y: e.clientY });
    
    // Update cursor style based on position
    const imageCenterX = imageRect.left + imageRect.width / 2;
    const container = containerRef.current;
    if (container) {
      if (mouseX < imageCenterX && currentIndex > 0) {
        container.style.cursor = 'w-resize';
      } else if (mouseX >= imageCenterX && currentIndex < images.length - 1) {
        container.style.cursor = 'e-resize';
      } else {
        container.style.cursor = 'default';
      }
    }
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 bg-background z-[100] flex items-center justify-center animate-fade-in"
      onMouseMove={handleMouseMove}
    >
      {/* Back Button - Top Left */}
      <button
        onClick={onClose}
        className="fixed top-6 left-6 z-[200] flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label="Fechar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-xs uppercase tracking-[0.2em] font-display hidden md:inline">Voltar</span>
      </button>

      {/* Page Indicator - Top Right */}
      <div className="fixed top-6 right-6 z-[102] text-muted-foreground text-xs uppercase tracking-[0.2em] font-display">
        {currentIndex + 1} — {images.length}
      </div>


      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center px-[10%]"
        onClick={handleClick}
      >
        <img
          ref={imageRef}
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[85vh] object-contain transition-opacity duration-300 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Lightbox;
