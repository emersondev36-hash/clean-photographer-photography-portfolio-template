import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { CalendarDays, Clock, ChevronLeft, ChevronRight, Check, ArrowRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import PortfolioHeader from "@/components/PortfolioHeader";
import PortfolioFooter from "@/components/PortfolioFooter";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
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

const appointmentSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(100),
  email: z.string().trim().email({ message: "E-mail inválido" }).max(255),
  phone: z.string().trim().min(10, { message: "Telefone inválido" }).max(20),
  style: z.string().trim().optional(),
  description: z.string().trim().max(1000).optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

const timeSlots = [
  "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      style: "",
      description: "",
    },
  });

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  
  const handlePrevWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const handleDateSelect = (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return;
    if (date.getDay() === 0) return; // Sunday
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!selectedDate || !selectedTime) {
      toast.error("Selecione uma data e horário");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("appointments").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        style: data.style || null,
        description: data.description || null,
        date: format(selectedDate, "yyyy-MM-dd"),
        time_slot: selectedTime,
      });

      if (error) throw error;

      toast.success("Agendamento realizado com sucesso! Entraremos em contato para confirmar.");
      setStep(4);
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Erro ao realizar agendamento. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, startOfDay(new Date())) || date.getDay() === 0;
  };

  return (
    <>
      <SEO
        title="Agendar Consulta - Tatuagens Style"
        description="Agende sua consulta ou sessão de tatuagem no Tatuagens Style. Escolha a data e horário que melhor se encaixa na sua agenda."
        canonicalUrl="/agendar"
      />

      <PortfolioHeader activeCategory="" />
      
      <main className="min-h-screen bg-gradient-hero">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 noise-overlay pointer-events-none opacity-50" />
          
          <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                  Agendamento
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
              
              <h1 className="font-serif text-display-lg text-foreground leading-[0.9] mb-6">
                Agende sua{" "}
                <span className="text-primary text-glow-subtle">Sessão</span>
              </h1>
              
              <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Escolha a data e horário mais conveniente para sua consulta ou sessão de tatuagem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="pb-12">
          <div className="max-w-[800px] mx-auto px-6 md:px-12">
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div 
                    className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${
                      step >= s 
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-border/30 text-muted-foreground"
                    } ${step > s ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {step > s ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="font-mono text-sm">{s}</span>
                    )}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-px transition-colors duration-300 ${
                      step > s ? "bg-primary" : "bg-border/30"
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-16 mt-4">
              <span className={`font-mono text-[10px] uppercase tracking-wider ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                Data
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                Horário
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                Dados
              </span>
            </div>
          </div>
        </section>

        {/* Booking Content */}
        <section className="pb-32">
          <div className="max-w-[800px] mx-auto px-6 md:px-12">
            {/* Step 1: Date Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border/20 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <CalendarDays className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h2 className="font-serif text-xl text-foreground">Escolha a Data</h2>
                </div>

                {/* Week Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevWeek}
                    className="p-2 border border-border/30 hover:border-primary/50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="font-mono text-sm text-foreground">
                    {format(currentWeekStart, "MMMM yyyy", { locale: ptBR })}
                  </span>
                  <button
                    onClick={handleNextWeek}
                    className="p-2 border border-border/30 hover:border-primary/50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 mb-8">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => (
                    <div key={day} className="text-center">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {day}
                      </span>
                    </div>
                  ))}
                  {weekDays.map((date) => {
                    const disabled = isDateDisabled(date);
                    const selected = selectedDate && isSameDay(date, selectedDate);
                    const today = isToday(date);
                    
                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => handleDateSelect(date)}
                        disabled={disabled}
                        className={`aspect-square flex flex-col items-center justify-center border transition-all duration-300 ${
                          disabled 
                            ? "border-border/10 text-muted-foreground/30 cursor-not-allowed" 
                            : selected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/30 hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <span className="font-mono text-sm">{format(date, "d")}</span>
                        {today && !disabled && (
                          <span className="font-mono text-[8px] text-primary mt-1">Hoje</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <Button
                  onClick={() => selectedDate && setStep(2)}
                  disabled={!selectedDate}
                  className="w-full gap-2 bg-transparent border border-primary/40 hover:border-primary hover:bg-primary/10 text-foreground rounded-none py-6 font-mono text-xs uppercase tracking-[0.2em]"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 text-primary" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Time Selection */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border/20 p-6 md:p-8"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  <h2 className="font-serif text-xl text-foreground">Escolha o Horário</h2>
                </div>
                <p className="font-mono text-xs text-muted-foreground mb-6">
                  {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {timeSlots.map((time) => {
                    const selected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`py-4 border transition-all duration-300 ${
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/30 hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <span className="font-mono text-sm">{time}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 gap-2 rounded-none py-6 font-mono text-xs uppercase tracking-[0.2em]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </Button>
                  <Button
                    onClick={() => selectedTime && setStep(3)}
                    disabled={!selectedTime}
                    className="flex-1 gap-2 bg-transparent border border-primary/40 hover:border-primary hover:bg-primary/10 text-foreground rounded-none py-6 font-mono text-xs uppercase tracking-[0.2em]"
                  >
                    Continuar
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Form */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border/20 p-6 md:p-8"
              >
                <h2 className="font-serif text-xl text-foreground mb-2">Seus Dados</h2>
                <p className="font-mono text-xs text-muted-foreground mb-6">
                  {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })} às {selectedTime}
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
                                className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary"
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
                                className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary"
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
                              Telefone *
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(00) 00000-0000" 
                                className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary"
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
                                className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm px-0 focus-visible:ring-0 focus-visible:border-primary"
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
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            Descrição do projeto
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva sua ideia de tatuagem..." 
                              className="border-0 border-b border-border/30 rounded-none bg-transparent font-mono text-sm min-h-[100px] px-0 focus-visible:ring-0 focus-visible:border-primary resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="font-mono text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1 gap-2 rounded-none py-6 font-mono text-xs uppercase tracking-[0.2em]"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none py-6 font-mono text-xs uppercase tracking-[0.2em]"
                      >
                        {isSubmitting ? "Agendando..." : "Confirmar"}
                        {!isSubmitting && <Check className="w-4 h-4" />}
                      </Button>
                    </div>
                  </form>
                </Form>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-primary/30 bg-primary/5 p-8 md:p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 border-2 border-primary bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Agendamento Confirmado!</h2>
                <p className="font-mono text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Recebemos seu agendamento e entraremos em contato em breve para confirmar 
                  todos os detalhes da sua sessão.
                </p>
                <div className="font-mono text-sm text-foreground mb-8 p-4 border border-border/20 inline-block">
                  {selectedDate && format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })} às {selectedTime}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/"
                    className="px-6 py-3 border border-border/30 hover:border-primary/50 font-mono text-xs uppercase tracking-[0.2em] transition-colors"
                  >
                    Voltar ao Início
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 border border-primary/40 hover:border-primary hover:bg-primary/10 font-mono text-xs uppercase tracking-[0.2em] transition-colors"
                  >
                    Fale Conosco
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <PortfolioFooter />
    </>
  );
};

export default Booking;
