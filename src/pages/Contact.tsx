import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { Instagram, Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import StudioMap from "@/components/StudioMap";
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
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z.string().trim().email({ message: "Endereço de e-mail inválido" }).max(255, { message: "E-mail deve ter menos de 255 caracteres" }),
  phone: z.string().trim().optional(),
  style: z.string().trim().optional(),
  message: z.string().trim().min(1, { message: "Mensagem é obrigatória" }).max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      style: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("contacts").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        style: data.style || null,
        message: data.message,
      });

      if (error) throw error;

      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      form.reset();
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contato@tatuagensstyle.com.br",
      href: "mailto:contato@tatuagensstyle.com.br",
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "+55 (41) 99753-9084",
      href: "tel:+5541997539084",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@tatuagensstyle",
      href: "https://instagram.com/tatuagensstyle",
      external: true,
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "São Paulo, SP - Brasil",
      href: null,
    },
  ];

  return (
    <>
      <SEO
        title="Contato - Tatuagens Style | Agende sua Sessão"
        description="Entre em contato com o estúdio Tatuagens Style para agendar sua sessão, tirar dúvidas ou solicitar orçamentos personalizados."
        canonicalUrl="/contact"
      />

      <PortfolioHeader activeCategory="" />
      
      <main className="min-h-screen bg-gradient-hero">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />
          
          <div className="relative max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
            <motion.div 
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  Contato
                </span>
              </div>
              
              <h1 className="font-serif text-display-lg text-foreground leading-[0.9] mb-6">
                Vamos criar sua{" "}
                <span className="text-primary text-glow-subtle">próxima arte</span>
              </h1>
              
              <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-lg">
                Entre em contato para agendar sua sessão, tirar dúvidas ou solicitar um orçamento personalizado.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative pb-32">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Left - Contact Info */}
              <motion.div 
                className="space-y-12"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Contact Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="group block border border-border/20 p-6 hover:border-primary/30 transition-all duration-500"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                              <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                            </div>
                            {item.external && (
                              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1">
                            {item.label}
                          </span>
                          <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                            {item.value}
                          </span>
                        </a>
                      ) : (
                        <div className="border border-border/20 p-6">
                          <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-4">
                            <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 block mb-1">
                            {item.label}
                          </span>
                          <span className="font-mono text-sm text-foreground">
                            {item.value}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Additional Info */}
                <motion.div 
                  className="border border-border/20 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="font-serif text-xl text-foreground mb-4">
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Segunda - Sexta</span>
                      <span className="text-foreground">10:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sábado</span>
                      <span className="text-foreground">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domingo</span>
                      <span className="text-foreground/50">Fechado</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border/20">
                    <p className="font-mono text-xs text-muted-foreground">
                      * Atendemos apenas com hora marcada. Entre em contato para agendar.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right - Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="border border-border/20 p-8 lg:p-10">
                  <h2 className="font-serif text-2xl text-foreground mb-2">
                    Envie sua mensagem
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground mb-8">
                    Preencha o formulário abaixo e retornaremos em breve.
                  </p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                Nome *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Seu nome" 
                                  className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/40"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="font-mono text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                E-mail *
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="seu@email.com" 
                                  className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/40"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="font-mono text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                Telefone
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="(00) 00000-0000" 
                                  className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/40"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="font-mono text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="style"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                Estilo desejado
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Ex: Blackwork, Fine Line..." 
                                  className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors placeholder:text-muted-foreground/40"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="font-mono text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                              Mensagem *
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Descreva sua ideia de tatuagem, tamanho, local do corpo e qualquer referência visual que tenha..." 
                                className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm min-h-[150px] px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors resize-none placeholder:text-muted-foreground/40"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="font-mono text-xs" />
                          </FormItem>
                        )}
                      />

                      <div className="pt-6">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="group w-full gap-4 bg-transparent border border-primary/40 hover:border-primary hover:bg-primary/10 text-foreground rounded-none py-6 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-500"
                        >
                          {isSubmitting ? (
                            "Enviando..."
                          ) : (
                            <>
                              <span>Enviar Mensagem</span>
                              <Send className="w-4 h-4 text-primary group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16"
            >
              <StudioMap />
            </motion.div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <PortfolioFooter />
    </>
  );
};

export default Contact;