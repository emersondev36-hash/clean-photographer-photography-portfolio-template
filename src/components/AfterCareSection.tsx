import { motion } from "motion/react";
import { Clock, Calendar, CalendarDays, AlertTriangle, CheckCircle, Droplets, Sun, Shirt } from "lucide-react";
import { useState } from "react";

const afterCareSteps = [
  {
    id: "first-24h",
    icon: Clock,
    title: "Primeiras 24 Horas",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    borderColor: "border-red-400/30",
    items: [
      "Mantenha o filme plástico por 2-4 horas",
      "Lave delicadamente com água morna e sabão neutro",
      "Seque com papel toalha (sem esfregar)",
      "Aplique uma camada fina de pomada cicatrizante",
      "Não cubra novamente após a primeira lavagem",
    ],
  },
  {
    id: "first-week",
    icon: Calendar,
    title: "Primeira Semana",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/30",
    items: [
      "Lave 2-3 vezes ao dia com sabão neutro",
      "Aplique pomada cicatrizante em camada fina",
      "Use roupas largas sobre a tatuagem",
      "Evite exposição ao sol direto",
      "Não coce, mesmo se houver coceira",
    ],
  },
  {
    id: "first-month",
    icon: CalendarDays,
    title: "Primeiro Mês",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
    items: [
      "Continue hidratando com loção sem fragrância",
      "Evite banhos de sol, piscina e mar",
      "A casquinha vai cair naturalmente",
      "Use protetor solar após cicatrização",
      "Agende retoque se necessário (grátis em 30 dias)",
    ],
  },
  {
    id: "avoid",
    icon: AlertTriangle,
    title: "O Que Evitar",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    items: [
      "Não exponha ao sol por 3-4 semanas",
      "Evite piscinas, mar e banheiras",
      "Não arranque as casquinhas",
      "Evite roupas apertadas sobre a tatuagem",
      "Não aplique álcool ou produtos abrasivos",
    ],
  },
];

const quickTips = [
  { icon: Droplets, text: "Hidrate sempre", description: "Pele hidratada = cores vibrantes" },
  { icon: Sun, text: "Protetor solar", description: "Use FPS 50+ após cicatrização" },
  { icon: Shirt, text: "Roupas largas", description: "Evite atrito na área tatuada" },
  { icon: CheckCircle, text: "Retoque grátis", description: "Garantia de 30 dias" },
];

const AfterCareSection = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>("first-24h");

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-900/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

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
              Cuidados Pós-Tatuagem
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          
          <h2 className="font-serif text-display-md text-foreground mb-4">
            Aftercare
          </h2>
          <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto">
            Siga estas instruções para garantir a melhor cicatrização e preservar 
            a qualidade da sua tatuagem por toda a vida.
          </p>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {quickTips.map((tip, index) => (
            <motion.div
              key={tip.text}
              className="group text-center p-6 border border-border/20 hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <div className="w-12 h-12 mx-auto mb-4 border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
                <tip.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h4 className="font-mono text-sm text-foreground mb-1">{tip.text}</h4>
              <p className="font-mono text-[10px] text-muted-foreground">{tip.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Care Steps Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {afterCareSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`group cursor-pointer border ${step.borderColor} p-6 transition-all duration-500 hover:${step.bgColor}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setExpandedCard(expandedCard === step.id ? null : step.id)}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 border ${step.borderColor} ${expandedCard === step.id ? step.bgColor : ''} flex items-center justify-center transition-all duration-300`}>
                  <step.icon className={`w-4 h-4 ${step.color}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-mono text-sm ${step.color} mb-1`}>
                    {step.title}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {expandedCard === step.id ? "Clique para fechar" : "Clique para expandir"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedCard === step.id ? "auto" : 0,
                  opacity: expandedCard === step.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="space-y-3 pt-4 border-t border-border/10">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-3 h-3 ${step.color} mt-1 flex-shrink-0`} strokeWidth={2} />
                      <span className="font-mono text-xs text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Warning Note */}
        <motion.div
          className="mt-12 p-6 border border-amber-400/30 bg-amber-400/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <h4 className="font-mono text-sm text-amber-400 mb-2">Sinais de Alerta</h4>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                Se notar inchaço excessivo, pus, febre ou vermelhidão que se espalha além da tatuagem, 
                procure atendimento médico. Esses podem ser sinais de infecção que requerem tratamento profissional.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AfterCareSection;
