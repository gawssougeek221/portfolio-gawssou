"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Bot, Rocket, GraduationCap, Users, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  {
    index: "01",
    icon: GraduationCap,
    color: "text-cyan-400",
    ring: "border-cyan-500/30 bg-cyan-500/10",
    title: "Apprendre",
    subtitle: "2019 — 2024 · Les fondations",
    text: "Double Licence en informatique, télécoms & développement web/mobile. Les bases solides : réseaux, code, rigueur. La curiosité devient méthode.",
    stat: "2 Licences",
    statLabel: "IACD · UN-CHK",
  },
  {
    index: "02",
    icon: Rocket,
    color: "text-purple-400",
    ring: "border-purple-500/30 bg-purple-500/10",
    title: "Créer",
    subtitle: "Projets · Keur'Geek Digital",
    text: "Sama Agent, Stockplus, Stafflow, DocuAI : des solutions concrètes pour digitaliser les entreprises sénégalaises. L'idée devient produit, le produit devient impact.",
    stat: "5 Projets",
    statLabel: "IA · Web · Gestion",
  },
  {
    index: "03",
    icon: Bot,
    color: "text-emerald-400",
    ring: "border-emerald-500/30 bg-emerald-500/10",
    title: "Automatiser",
    subtitle: "IA & Workflows",
    text: "Agents WhatsApp 24/7, traitement intelligent de documents, workflows n8n et MCP. J'orchestre l'IA pour faire gagner des heures aux équipes.",
    stat: "24/7",
    statLabel: "Agents & Automation",
  },
  {
    index: "04",
    icon: Users,
    color: "text-pink-400",
    ring: "border-pink-500/30 bg-pink-500/10",
    title: "Transmettre",
    subtitle: "Formations & Ateliers",
    text: "Ateliers pratiques, vulgarisation de l'IA générative, accompagnement d'étudiants et de pros. La tech n'a de valeur que partagée.",
    stat: "Master",
    statLabel: "Génie Logiciel · En cours",
  },
];

/**
 * ScrollyJourney — scrollytelling sticky :
 * visuel fixe à gauche, chapitres qui défilent à droite.
 * L'étape active pilote le panneau sticky.
 */
export function ScrollyJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Progression 0..1 → index de chapitre actif
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(
      CHAPTERS.length - 1,
      Math.max(0, Math.floor(v * CHAPTERS.length))
    );
    setActive(i);
  });

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const ActiveIcon = CHAPTERS[active].icon;

  return (
    <section
      id="parcours-story"
      ref={sectionRef}
      className="relative z-10 py-24 md:py-32 bg-neutral-950/70 border-y border-white/10 overflow-hidden"
    >
      {/* Titre géant en fond avec drift parallax */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute top-8 left-0 right-0 text-center font-black uppercase tracking-tight text-[16vw] md:text-[9rem] leading-none text-white/[0.03]"
      >
        Parcours
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            Scrollytelling — mon histoire au fil du scroll
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Quatre chapitres, une même mission
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Scrollez lentement : le panneau de gauche reste fixe pendant que
            l&apos;histoire se dévoile à droite.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* ---- Panneau sticky ---- */}
          <div className="hidden lg:block sticky top-28">
            <div className="relative p-8 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-md overflow-hidden min-h-[420px] flex flex-col justify-between">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl" />

              {/* Barre de progression verticale */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5">
                <motion.div
                  style={{ height: progress }}
                  className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500"
                />
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl border flex items-center justify-center mb-5",
                        CHAPTERS[active].ring
                      )}
                    >
                      <ActiveIcon
                        className={cn("w-7 h-7", CHAPTERS[active].color)}
                      />
                    </div>
                    <div className="font-mono text-xs text-neutral-500">
                      Chapitre {CHAPTERS[active].index} / 04
                    </div>
                    <h3 className="text-4xl font-bold text-white mt-1">
                      {CHAPTERS[active].title}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1">
                      {CHAPTERS[active].subtitle}
                    </p>
                    <p className="text-sm text-neutral-300 leading-relaxed mt-4 max-w-md">
                      {CHAPTERS[active].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mt-8 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {CHAPTERS[active].stat}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {CHAPTERS[active].statLabel}
                  </div>
                </div>
                {/* Dots */}
                <div className="flex gap-2">
                  {CHAPTERS.map((c, i) => (
                    <span
                      key={c.index}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === active
                          ? "w-8 bg-gradient-to-r from-cyan-400 to-purple-500"
                          : "w-2 bg-white/15"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Chapitres scrollés ---- */}
          <div className="space-y-6 lg:space-y-0">
            {CHAPTERS.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === active;
              return (
                <div
                  key={c.index}
                  className="lg:min-h-[70vh] flex items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 48 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      "w-full p-6 sm:p-8 rounded-3xl border backdrop-blur-md transition-colors duration-500",
                      isActive
                        ? "bg-neutral-900/90 border-white/25 shadow-2xl"
                        : "bg-neutral-900/40 border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl border flex items-center justify-center shrink-0",
                          c.ring
                        )}
                      >
                        <Icon className={cn("w-6 h-6", c.color)} />
                      </div>
                      <div>
                        <div className="font-mono text-[11px] text-neutral-500">
                          {c.index}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {c.title}
                        </h3>
                      </div>
                      {/* indicateur mobile */}
                      <span
                        className={cn(
                          "ml-auto lg:hidden text-[11px] px-2.5 py-1 rounded-full border",
                          isActive
                            ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
                            : "border-white/10 text-neutral-500"
                        )}
                      >
                        {isActive ? "● actif" : "○"}
                      </span>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-wider text-neutral-500">
                      {c.subtitle}
                    </p>
                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                      {c.text}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        {c.stat}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {c.statLabel}
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
