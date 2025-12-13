import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import { fetchPexelsPhotos } from "@/services/pexels";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Endereço de e-mail inválido" }).max(255, { message: "E-mail deve ter menos de 255 caracteres" }),
  message: z.string().trim().min(1, { message: "Mensagem é obrigatória" }).max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const About = () => {
  const [portrait, setPortrait] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Mensagem enviada",
        description: "Obrigada pelo contato. Retornarei em breve.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    const loadPortrait = async () => {
      try {
        const data = await fetchPexelsPhotos('PERSONAL', 1, 1);
        if (data.photos.length > 0) {
          const photo = data.photos[0];
          setPortrait({
            src: photo.src.large2x,
            alt: '',
            width: photo.width,
            height: photo.height,
          });
        }
      } catch (err) {
        console.error('Erro ao carregar retrato:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPortrait();
  }, []);

  return (
    <>
      <SEO
        title="Sobre - Maria Silva"
        description="Conheça Maria Silva, fotógrafa de produção especializada em moda, editorial e fotografia comercial."
        canonicalUrl="/about"
      />

      <PortfolioHeader activeCategory="" />
      
      <main className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Portrait */}
            <div className="order-2 lg:order-1">
              {!loading && portrait && (
                <div className="relative overflow-hidden animate-blur-in">
                  <img
                    src={portrait.src}
                    alt={portrait.alt}
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-accent font-display">
                  Sobre
                </p>
                <h1 className="font-display text-display-lg text-foreground">
                  Maria Silva
                </h1>
                <p className="text-lg text-muted-foreground italic">
                  Fotógrafa de produção & diretora criativa
                </p>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Especializada em moda, editorial e fotografia comercial.
                  Criando imagens marcantes com precisão técnica e visão criativa 
                  para marcas e publicações há mais de uma década.
                </p>

                <p>
                  Ofereço serviços completos de produção incluindo direção de arte, 
                  locação, casting e gerenciamento de set. Minha abordagem colaborativa 
                  garante execução impecável do conceito à entrega.
                </p>
              </div>

              <div className="pt-8 space-y-6">
                <div>
                  <h3 className="font-display text-sm uppercase tracking-[0.2em] text-foreground mb-4">
                    Serviços
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Fotografia de Moda", "Editorial", "Produção Comercial", "Direção de Arte", "Casting"].map((service) => (
                      <span key={service} className="px-4 py-2 border border-border text-sm text-muted-foreground">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="border-t border-border/30">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-24">
            <div className="max-w-2xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <p className="text-xs uppercase tracking-[0.3em] text-accent font-display">
                  Contato
                </p>
                <h2 className="font-display text-display-md text-foreground">
                  Vamos trabalhar juntos
                </h2>
                <p className="text-muted-foreground">
                  Para orçamentos, colaborações ou apenas dizer olá.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-display">
                            Nome
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu nome"
                              className="border-0 border-b border-border rounded-none bg-transparent text-foreground px-0 py-4 text-lg focus-visible:ring-0 focus-visible:border-accent transition-colors duration-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-display">
                            E-mail
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="seu@email.com"
                              className="border-0 border-b border-border rounded-none bg-transparent text-foreground px-0 py-4 text-lg focus-visible:ring-0 focus-visible:border-accent transition-colors duration-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-display">
                          Mensagem
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Conte-me sobre seu projeto..."
                            className="border-0 border-b border-border rounded-none bg-transparent text-foreground min-h-[150px] px-0 py-4 text-lg focus-visible:ring-0 focus-visible:border-accent transition-colors duration-500 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-8 flex justify-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-16 py-6 text-sm uppercase tracking-[0.2em] font-display bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-500"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>

      <PortfolioFooter />
    </>
  );
};

export default About;