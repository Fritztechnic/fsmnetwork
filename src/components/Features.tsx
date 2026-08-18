import { Clock, ShieldCheck, Sparkles, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    title: "Aktive Community",
    description: "Zusammen bauen, handeln und Abenteuer erleben.",
    Icon: Users,
  },
  {
    title: "Faire Regeln",
    description: "Kein Pay-to-Win, klare Moderation für alle.",
    Icon: ShieldCheck,
  },
  {
    title: "Regelmäßige Updates",
    description: "Neue Inhalte und Events in kurzen Abständen.",
    Icon: Sparkles,
  },
  {
    title: "24/7 online",
    description: "Der Server läuft rund um die Uhr.",
    Icon: Clock,
  },
];

export default function Features() {
  return (
    <section className="relative z-[1] py-16 px-6 max-w-[1100px] mx-auto">
      <ScrollReveal className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-accent-cyan">
          <span>01</span>
          <span className="w-8 h-px bg-accent-cyan/40" aria-hidden="true" />
          Warum FSM Network
        </div>
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold">
          Das erwartet dich
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <ScrollReveal key={feature.title} delay={index * 80} className="text-center">
            <feature.Icon
              className="w-7 h-7 mx-auto mb-3 text-accent-cyan"
              strokeWidth={1.5}
            />
            <h3 className="font-display text-[1.05rem] font-semibold mb-1.5">
              {feature.title}
            </h3>
            <p className="text-text-secondary text-[0.85rem] leading-[1.6]">
              {feature.description}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
