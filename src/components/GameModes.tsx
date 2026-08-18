import { Check, HeartCrack, Leaf, Pickaxe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const modes = [
  {
    number: "01",
    name: "CreateMine",
    tag: "Wirtschaft & Aufbau",
    nameColor: "var(--raw-accent-cyan)",
    Icon: Pickaxe,
    description:
      "Pack die Spitzhacke aus! Ein spannender Modus für alle, die gerne minen, leveln und wirtschaften. Arbeite dich hoch und werde der reichste Spieler.",
    highlights: ["Minen & Leveln", "Eigene Wirtschaft", "Fairer Aufstieg"],
  },
  {
    number: "02",
    name: "LifeStealDupe",
    tag: "PvP & Loot",
    nameColor: "var(--raw-accent-purple)",
    Icon: HeartCrack,
    description:
      "Action pur! In diesem Modus geht es ums Überleben und Kämpfen. Besiege andere Spieler, um ihre Herzen zu stehlen (LifeSteal), und nutze Duplizierungs-Mechaniken (Dupe), um dir epische Ausrüstung zu craften. Nur die Stärksten überleben hier!",
    highlights: ["LifeSteal-Kämpfe", "Dupe-Mechaniken", "Epische Loot-Jagd"],
  },
  {
    number: "03",
    name: "GHG SMP",
    tag: "Survival & Community",
    nameColor: "#66ff66",
    Icon: Leaf,
    description:
      "Spiele zusammen mit der Community, gründe eine Base, farme Ressourcen und erlebe Minecraft Survival, wie es sein sollte.",
    highlights: ["Gemeinsame Basen", "Ressourcen farmen", "Klassisches Survival"],
  },
];

export default function GameModes() {
  return (
    <section id="spielmodi" className="relative z-[1] py-20 px-6 max-w-[1200px] mx-auto">
      <ScrollReveal className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-3 justify-center text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-accent-purple">
          <span>02</span>
          <span className="w-8 h-px bg-accent-purple/40" aria-hidden="true" />
          Spielmodi
        </div>
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold mb-3">
          Unsere Spielmodi
        </h2>
        <p className="text-text-secondary max-w-[500px] mx-auto text-[0.95rem]">
          Wähle deinen Weg — ob Knast-Ausbruch oder LifeSteal.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modes.map((mode, index) => (
          <ScrollReveal key={mode.name} delay={index * 100}>
            <article className="group relative flex h-full flex-col overflow-hidden bg-white/[.03] border border-white/[.08] rounded-2xl p-8 backdrop-blur-[10px] transition-all duration-400 hover:-translate-y-1 hover:border-white/[.12] hover:shadow-[0_20px_60px_rgba(0,0,0,.3)]">
              {/* Gradient top border on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, #00e5ff, #b44aff)",
                }}
                aria-hidden="true"
              />

              {/* Corner glow on hover */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 blur-2xl transition-opacity duration-400 group-hover:opacity-25"
                style={{ background: mode.nameColor }}
                aria-hidden="true"
              />

              {/* Large faint index number */}
              <span
                className="absolute top-4 right-6 font-display text-[3.5rem] font-bold leading-none opacity-[.06] select-none"
                aria-hidden="true"
              >
                {mode.number}
              </span>

              {/* Icon badge + tag */}
              <div className="relative flex items-center gap-3 mb-5">
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-xl flex-shrink-0"
                  style={{ background: `color-mix(in oklab, ${mode.nameColor} 15%, transparent)` }}
                >
                  <mode.Icon className="w-7 h-7" color={mode.nameColor} strokeWidth={1.5} />
                </div>
                <span
                  className="inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: mode.nameColor, borderColor: `color-mix(in oklab, ${mode.nameColor} 40%, transparent)` }}
                >
                  {mode.tag}
                </span>
              </div>

              <h3
                className="relative font-display text-[1.5rem] font-bold mb-3"
                style={{ color: mode.nameColor }}
              >
                {mode.name}
              </h3>

              <div
                className="relative h-px w-full mb-4"
                style={{ background: `linear-gradient(90deg, ${mode.nameColor}, transparent)`, opacity: 0.35 }}
                aria-hidden="true"
              />

              <p className="relative text-text-secondary text-[0.95rem] leading-[1.7] mb-6">
                {mode.description}
              </p>

              <ul className="relative mt-auto flex flex-col gap-2.5 border-t border-white/[.08] pt-5">
                {mode.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[0.85rem] text-text-primary">
                    <Check className="w-4 h-4 flex-shrink-0" color={mode.nameColor} strokeWidth={2.25} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </ScrollReveal>
        ))}
      </div>

    </section>
  );
}
