import { motion } from "motion/react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const StudioMap = () => {
  const address = "Rua Augusta, 2000 - Jardins, São Paulo - SP, 01412-100";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  // Static map embed (replace with actual embed URL when available)
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0754868895595!2d-46.6607!3d-23.5558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzIwLjkiUyA0NsKwMzknMzguNSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890";

  return (
    <motion.div
      className="border border-border/20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {/* Map Header */}
      <div className="p-4 border-b border-border/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-primary/30 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
            Localização
          </span>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider">
            Abrir no Maps
          </span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Map Container */}
      <div className="relative aspect-video bg-obsidian-900">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização do Estúdio"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Address Footer */}
      <div className="p-4 border-t border-border/20">
        <div className="flex items-start gap-3">
          <Navigation className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="font-mono text-xs text-foreground mb-1">
              Rua Augusta, 2000 - Jardins
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              São Paulo - SP, 01412-100
            </p>
          </div>
        </div>
        
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 border border-primary/40 hover:border-primary hover:bg-primary/10 transition-all duration-300"
        >
          <Navigation className="w-4 h-4 text-primary" strokeWidth={1.5} />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
            Como Chegar
          </span>
        </a>
      </div>
    </motion.div>
  );
};

export default StudioMap;
