import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o processo de agendamento?",
    answer: "O processo começa com uma consulta onde discutimos sua ideia, tamanho, posicionamento e estilo. Após aprovar o orçamento, agendamos a sessão com um sinal de 30%. O design final é apresentado no dia da tatuagem, com possibilidade de ajustes."
  },
  {
    question: "Dói muito fazer tatuagem?",
    answer: "A dor varia de pessoa para pessoa e depende da região do corpo. Áreas com mais gordura e músculo tendem a doer menos. Oferecemos pausas durante a sessão e temos anestésicos tópicos disponíveis para áreas mais sensíveis."
  },
  {
    question: "Quanto tempo leva para cicatrizar?",
    answer: "A cicatrização superficial leva de 2 a 3 semanas. A cicatrização completa, incluindo as camadas mais profundas da pele, pode levar de 2 a 3 meses. Fornecemos instruções detalhadas de cuidados pós-tatuagem."
  },
  {
    question: "Posso trazer meu próprio design?",
    answer: "Absolutamente! Trabalhamos tanto com designs próprios quanto com ideias que você traz. Nosso artista pode adaptar e aprimorar seu conceito para garantir que funcione bem como tatuagem."
  },
  {
    question: "Vocês fazem cobertura de tatuagens antigas?",
    answer: "Sim, realizamos coberturas (cover-ups). O processo requer uma avaliação presencial da tatuagem existente para determinar as melhores opções de design e cores que funcionarão sobre a arte anterior."
  },
  {
    question: "Qual é a idade mínima para tatuar?",
    answer: "A idade mínima é 18 anos. Menores de idade podem tatuar apenas com autorização dos pais ou responsáveis legais, que devem estar presentes no momento da tatuagem com documento de identificação."
  },
  {
    question: "E se eu precisar cancelar ou remarcar?",
    answer: "Pedimos aviso prévio de 48 horas para cancelamentos ou remarcações. O sinal é mantido como crédito para reagendamento. Cancelamentos sem aviso resultam na perda do sinal."
  },
  {
    question: "Vocês usam materiais descartáveis?",
    answer: "Sim, 100% dos materiais que entram em contato com a pele são descartáveis e esterilizados. Agulhas, tubos, tintas e luvas são abertos na sua frente. Seguimos todas as normas da ANVISA para biossegurança."
  },
];

const FAQSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/5 via-transparent to-muted/5 pointer-events-none" />
      
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              FAQ
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>
          
          <motion.h2 
            className="font-serif text-display-md text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Perguntas Frequentes
          </motion.h2>
          
          <motion.p 
            className="font-mono text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Tudo o que você precisa saber antes da sua sessão
          </motion.p>
        </div>
        
        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/30 px-6 hover:border-primary/30 transition-colors duration-300 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="font-serif text-left text-foreground hover:text-primary py-6 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-mono text-sm text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        
        {/* Additional CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-sm text-muted-foreground mb-4">
            Ainda tem dúvidas?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-mono text-sm uppercase tracking-wider group"
          >
            <span>Entre em contato</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
