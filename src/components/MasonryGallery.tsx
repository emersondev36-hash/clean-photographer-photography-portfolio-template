import { useState, useEffect, useRef } from "react";

interface GalleryItem {
  type?: "image" | "video";
  src: string;
  videoSrc?: string;
  highResSrc?: string;
  alt: string;
  span?: number;
  width?: number;
  height?: number;
}

interface MasonryGalleryProps {
  images: GalleryItem[];
  onImageClick: (index: number) => void;
}

const MasonryGallery = ({ images, onImageClick }: MasonryGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const handleImageHover = (index: number) => {
    setHoveredIndex(index);
    
    // Play video on hover
    const video = videoRefs.current.get(index);
    if (video) {
      video.play().catch(() => {});
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 3000);
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    
    // Pause video on leave
    const video = videoRefs.current.get(index);
    if (video) {
      video.pause();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-8 pb-20">
      <div className="text-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageClick(index)}
            onMouseEnter={() => handleImageHover(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className="relative cursor-zoom-in inline-block align-top p-1 md:p-1.5 lg:p-2 group animate-fade-in"
            style={{ 
              height: "300px",
              animationDelay: `${(index % 5) * 80}ms`,
              animationFillMode: "backwards"
            }}
          >
            <div className="relative h-full overflow-hidden">
              {image.type === "video" ? (
                <div className="relative h-full w-auto inline-block">
                  {image.width && image.height && (
                    <svg
                      width={image.width}
                      height={image.height}
                      viewBox={`0 0 ${image.width} ${image.height}`}
                      className="h-full w-auto"
                    >
                      <rect width={image.width} height={image.height} className="fill-muted" />
                    </svg>
                  )}
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current.set(index, el);
                    }}
                    poster={image.src}
                    muted
                    loop
                    playsInline
                    preload="none"
                    onLoadedData={() => handleImageLoad(index)}
                    className={`absolute top-0 left-0 h-full w-auto object-contain transition-all duration-500 ${
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "grayscale opacity-40"
                        : "grayscale-0 opacity-100"
                    } group-hover:scale-[1.03]`}
                    style={{
                      opacity: loadedImages.has(index) ? (hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1) : 0,
                    }}
                  >
                    <source src={image.videoSrc} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <picture className={`inline-block h-full w-auto ${loadedImages.has(index) ? "show" : ""}`}>
                  {image.width && image.height && (
                    <svg
                      width={image.width}
                      height={image.height}
                      viewBox={`0 0 ${image.width} ${image.height}`}
                      className="h-full w-auto"
                    >
                      <rect width={image.width} height={image.height} className="fill-muted" />
                    </svg>
                  )}
                  <img
                    src={image.src}
                    alt={image.alt}
                    onLoad={() => handleImageLoad(index)}
                    className={`absolute top-0 left-0 h-full w-auto object-contain transition-all duration-500 ${
                      hoveredIndex !== null && hoveredIndex !== index
                        ? "grayscale opacity-40"
                        : "grayscale-0 opacity-100"
                    } group-hover:scale-[1.03]`}
                    style={{
                      opacity: loadedImages.has(index) ? (hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1) : 0,
                    }}
                    loading="lazy"
                  />
                </picture>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MasonryGallery;
