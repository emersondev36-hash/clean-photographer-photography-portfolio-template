import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2, Loader2, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-generate-image`;

export const AIImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch(GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar imagem');
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success('Imagem gerada com sucesso!');
      } else {
        toast.error('Não foi possível gerar a imagem');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro ao gerar imagem');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `tatuagens-style-ai-${Date.now()}.png`;
    link.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="group gap-4 bg-transparent border border-primary/40 hover:border-primary hover:bg-primary/10 text-foreground rounded-none px-10 py-7 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-500">
          <Wand2 className="w-4 h-4 text-primary group-hover:text-foreground transition-colors" strokeWidth={1.5} />
          <span>Gerar com IA</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px] bg-obsidian-900 border border-border/30 rounded-none p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="flex items-center gap-4 font-serif text-2xl text-foreground">
            <div className="w-12 h-12 border border-primary/40 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            Gerador de Tatuagens
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          {/* Input area */}
          <div className="flex gap-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva a tatuagem que deseja visualizar..."
              disabled={isGenerating}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              className="bg-obsidian-800/50 border-border/30 rounded-none font-mono text-sm placeholder:text-muted-foreground/50"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()}
              className="rounded-none bg-primary/20 border border-primary/40 hover:bg-primary/30 hover:border-primary px-4"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-primary" />}
            </Button>
          </div>

          {/* Suggestions */}
          <div className="border border-border/20 p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary block mb-2">Sugestões</span>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              lobo geométrico minimalista, flores em fine line, caveira blackwork com mandala, fênix em realismo
            </p>
          </div>

          {/* Generated content area */}
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="aspect-square border border-border/20 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.2em]">
                    Criando sua obra...
                  </p>
                </div>
              </motion.div>
            )}

            {generatedImage && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div className="border border-border/30 overflow-hidden">
                  <img
                    src={generatedImage}
                    alt="Imagem gerada por IA"
                    className="w-full"
                  />
                </div>
                
                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="icon" 
                    onClick={handleDownload}
                    className="w-10 h-10 rounded-none bg-obsidian-950/80 border border-border/30 hover:border-primary/50 hover:bg-obsidian-900"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    onClick={() => setGeneratedImage(null)}
                    className="w-10 h-10 rounded-none bg-obsidian-950/80 border border-border/30 hover:border-primary/50 hover:bg-obsidian-900"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};