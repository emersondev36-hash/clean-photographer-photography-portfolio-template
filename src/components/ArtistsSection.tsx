import { Instagram } from "lucide-react";

interface Artist {
  name: string;
  specialty: string;
  bio: string;
  image: string;
  instagram: string;
}

const artists: Artist[] = [
  {
    name: "Lucas Mendes",
    specialty: "Blackwork & Dotwork",
    bio: "Especialista em trabalhos de grande escala com técnicas de pontilhismo e preenchimento sólido. 8 anos de experiência.",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    instagram: "lucasmendes.ink"
  },
  {
    name: "Marina Costa",
    specialty: "Fine Line & Minimalista",
    bio: "Artista focada em traços delicados e designs minimalistas. Cada linha conta uma história única.",
    image: "https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=400",
    instagram: "marinacosta.tattoo"
  },
  {
    name: "Rafael Santos",
    specialty: "Realismo & Retratos",
    bio: "Mestre em realismo preto e cinza. Transforma fotografias em arte permanente na pele.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    instagram: "rafaelsantos.art"
  },
  {
    name: "Juliana Ferreira",
    specialty: "Ornamental & Geométrico",
    bio: "Combina elementos ornamentais com geometria sagrada. Especialista em mandalas e padrões complexos.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    instagram: "juferreira.tattoo"
  }
];

const ArtistsSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-900/20 to-transparent pointer-events-none" />
      
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gradient-to-r from-primary to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Nossa Equipe
            </span>
          </div>
          
          <h2 className="font-serif text-display-md text-foreground">
            Artistas
          </h2>
          
          <p className="font-mono text-sm text-muted-foreground mt-4 max-w-md">
            Conheça os talentos por trás de cada trabalho. Artistas especializados em diferentes estilos para dar vida à sua visão.
          </p>
        </div>
        
        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {artists.map((artist, index) => (
            <div
              key={artist.name}
              className="group relative animate-fade-in"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: "backwards"
              }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-muted">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Instagram link */}
                <a
                  href={`https://instagram.com/${artist.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 p-2 bg-primary/90 text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:scale-110"
                  aria-label={`Instagram de ${artist.name}`}
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
              
              {/* Info */}
              <div>
                <h3 className="font-serif text-lg text-foreground mb-1">
                  {artist.name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-primary mb-2">
                  {artist.specialty}
                </p>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {artist.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;
