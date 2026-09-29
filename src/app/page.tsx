"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Cpu,
  Workflow,
  Wrench,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle,
  Copy,
  ChevronRight,
  BookOpen,
  Users,
  Sparkles,
  Zap,
  Menu,
  X,
  Layers,
  Bot,
  PackageCheck,
  FileText,
  ChevronDown
} from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          "hide-logo"?: string;
          events?: string;
        },
        HTMLElement
      >;
    }
  }
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "ia" | "web" | "dev">("all");

  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Reveal Hero content on scroll over the Spline robot canvas
        gsap.from(".gsap-hero-content", {
          scrollTrigger: {
            trigger: ".gsap-hero-trigger",
            start: "top 60%",
            end: "top 20%",
            scrub: 1
          },
          opacity: 0,
          y: 80,
          ease: "power2.out"
        });

        // Reveal cards on scroll
        gsap.from(".gsap-card-reveal", {
          scrollTrigger: {
            trigger: ".gsap-cards-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out"
        });
      });

      return () => ctx.revert();
    }
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const projects = [
    {
      id: "sama-agent",
      title: "Sama Agent",
      category: "ia",
      tag: "IA & WhatsApp",
      description:
        "Assistant IA sur-mesure destiné aux entreprises pour automatiser la relation client, la prise de rendez-vous et les échanges directement via WhatsApp.",
      highlights: [
        "Automatisation du service client 24/7",
        "Intégration API WhatsApp & LLM",
        "Traitement automatique des requêtes courantes",
        "Gain de temps et réactivité accrue"
      ],
      icon: Bot,
      accent: "from-cyan-500 to-blue-600"
    },
    {
      id: "stockplus",
      title: "Stockplus",
      category: "web",
      tag: "Gestion & Web",
      description:
        "Solution numérique intuitive de gestion de stock conçue pour optimiser le suivi des inventaires, des entrées/sorties et des ventes en temps réel.",
      highlights: [
        "Gestion simplifiée des produits et catégories",
        "Suivi des entrées/sorties et alertes de stock",
        "Interface responsive et moderne",
        "Rapports d'activité et statistiques"
      ],
      icon: PackageCheck,
      accent: "from-emerald-500 to-teal-600"
    },
    {
      id: "stafflow",
      title: "Stafflow",
      category: "web",
      tag: "Organisation & RH",
      description:
        "Plateforme web de gestion et d'organisation permettant d'orchestrer les tâches d'équipe, le suivi des collaborateurs et les flux de travail.",
      highlights: [
        "Planification et attribution des tâches",
        "Suivi d'avancement des projets d'équipe",
        "Tableaux de bord d'organisation",
        "Amélioration de la productivité globale"
      ],
      icon: Layers,
      accent: "from-purple-500 to-indigo-600"
    },
    {
      id: "docuai",
      title: "DocuAI",
      category: "ia",
      tag: "IA & Documents",
      description:
        "Solution basée sur l'intelligence artificielle pour l'analyse, l'extraction de données et le traitement intelligent de documents (PDF, rapports, factures).",
      highlights: [
        "Extraction automatique de données clés",
        "Résumé intelligent et Q/R sur documents",
        "Gain de temps sur la lecture de longs fichiers",
        "Intégration d'outils GenAI et Vision"
      ],
      icon: FileText,
      accent: "from-pink-500 to-rose-600"
    },
    {
      id: "keurgeek-digital",
      title: "Keur’Geek Digital",
      category: "dev",
      tag: "Startup & Innovation",
      description:
        "Startup tech sénégalaise spécialisée dans les solutions numériques, l'intelligence artificielle, le développement web, l'automatisation et la formation pratique.",
      highlights: [
        "Développement de solutions web & mobile",
        "Intégration d'APIs et automatisations n8n",
        "Ateliers et formations pratiques en IA/Informatique",
        "Sensibilisation et vulgarisation technologique"
      ],
      icon: Sparkles,
      accent: "from-amber-500 to-orange-600"
    }
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab || p.id === "keurgeek-digital");

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-purple-600 selection:text-white relative font-sans">
      {/* Fixed 3D Spline Canvas Interactive Robot Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* @ts-ignore */}
          <spline-viewer
            url="https://prod.spline.design/m4QKQK7slm5uLuls/scene.splinecode"
            style={{ width: "100vw", height: "100vh", maxWidth: "100%", maxHeight: "100%" }}
            hide-logo="true"
            events="all"
          />
        </div>
      </div>

      {/* Progress Bar Top Accent */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 z-[100]" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-[1.5px] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center font-bold text-white text-lg">
                GT
              </div>
            </div>
            <div>
              <span className="font-semibold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Gawssou Thiam
              </span>
              <span className="block text-xs text-neutral-400 font-light">
                Informaticien &amp; Entrepreneur
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#about" className="hover:text-white transition-colors">
              Profil
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Activités &amp; Formations
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projets
            </a>
            <a href="#skills" className="hover:text-white transition-colors">
              Compétences
            </a>
            <a href="#education" className="hover:text-white transition-colors">
              Parcours
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/221701056707"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300 border border-white/10"
            aria-label="Menu Mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-neutral-950/95 border-b border-white/10 px-6 py-6 space-y-4"
            >
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-300 hover:text-white py-1"
              >
                Profil &amp; Vision
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-300 hover:text-white py-1"
              >
                Activités &amp; Formations
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-300 hover:text-white py-1"
              >
                Projets
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-300 hover:text-white py-1"
              >
                Compétences
              </a>
              <a
                href="#education"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-300 hover:text-white py-1"
              >
                Parcours &amp; Diplômes
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-300 hover:text-white py-1"
              >
                Contact
              </a>
              <div className="pt-2">
                <a
                  href="https://wa.me/221701056707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-white"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Me contacter sur WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* SECTION 1: Full-Screen 3D Robot Viewport with Scroll Indicator */}
      <section className="relative h-screen w-full flex flex-col justify-between items-center z-10 pointer-events-none pt-24 pb-12 px-6">
        <div />
        
        {/* Floating Scroll Indicator at bottom */}
        <motion.a
          href="#hero-info"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
          className="pointer-events-auto flex flex-col items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-white/80 hover:text-white transition-all shadow-xl"
        >
          <span className="text-xs uppercase tracking-widest font-mono text-neutral-300">SCROLL</span>
          <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </motion.a>
      </section>

      {/* SECTION 2: Hero Information Revealed on Scroll */}
      <section id="hero-info" className="gsap-hero-trigger relative z-10 pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="gsap-hero-content text-center md:text-left space-y-8 bg-black/60 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
          {/* Status Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Disponible pour formations, projets &amp; accompagnements
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-neutral-400 text-xs">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Dakar, Sénégal
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Gawssou{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Thiam
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-200 tracking-tight">
              Informaticien &amp; Entrepreneur Numérique
            </p>
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-normal leading-relaxed max-w-3xl">
              Fondateur de <strong className="text-white">Keur’Geek Digital</strong>. Spécialisé en{" "}
              <span className="text-cyan-300">Intelligence Artificielle</span>,{" "}
              <span className="text-purple-300">Développement Web &amp; Mobile</span> et{" "}
              <span className="text-emerald-300">Automatisation des workflows</span>. Actif dans
              la création de solutions digitales innovantes et l'animation de formations &amp;
              ateliers pratiques en informatique.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <a
              href="https://wa.me/221701056707"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-medium text-black bg-white hover:bg-neutral-200 transition-all shadow-xl hover:shadow-cyan-500/20 active:scale-95"
            >
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>Discuter sur WhatsApp</span>
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-neutral-300 border border-white/15 hover:border-white/40 hover:bg-white/5 transition-all"
            >
              <span>Découvrir mes projets</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/gawssou-thiam-7216a0280"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-neutral-400 border border-white/10 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/gawssougeek221"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-neutral-400 border border-white/10 hover:border-purple-500/50 hover:text-purple-400 hover:bg-purple-500/5 transition-all"
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick Metrics / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 max-w-4xl">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-bold text-cyan-400">Keur’Geek</div>
              <div className="text-xs text-neutral-400 mt-1">Startup Tech Fondée</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-bold text-purple-400">Web &amp; IA</div>
              <div className="text-xs text-neutral-400 mt-1">Développement &amp; Agents</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-bold text-emerald-400">Ateliers</div>
              <div className="text-xs text-neutral-400 mt-1">Sensibilisation &amp; Formations</div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-bold text-pink-400">Dakar</div>
              <div className="text-xs text-neutral-400 mt-1">Sénégal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profil Professionnel & Vision Section */}
      <section id="about" className="relative z-10 py-20 bg-neutral-950/70 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
                <Users className="w-4 h-4" />
                <span>À propos de moi</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                Informaticien, Formateur &amp; Fondateur de Keur’Geek Digital
              </h2>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Fort d'un solide parcours académique en informatique, télécommunications et génie
                logiciel, je combine une expertise technique polyvalente et un esprit d'initiative
                entrepreneurial.
              </p>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Mon objectif est d'accompagner les entreprises, les étudiants et les professionnels
                dans l'adoption des technologies modernes : du développement d'applications web et
                mobile à l'intégration d'assistants IA et à l'automatisation des processus métier.
              </p>
            </div>

            {/* Keur'Geek Digital Capabilities Cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4 gsap-cards-container">
              <div className="gsap-card-reveal p-5 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">Solutions IA &amp; Intégration API</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Conception d'assistants intelligents (comme Sama Agent), prompt engineering, LLM et
                  traitement automatique de documents.
                </p>
              </div>

              <div className="gsap-card-reveal p-5 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-purple-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Code className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">Développement Web &amp; Mobile</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Création de solutions logicielles performantes et adaptées aux besoins locaux
                  (HTML/CSS, JavaScript, Supabase, Vercel).
                </p>
              </div>

              <div className="gsap-card-reveal p-5 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-emerald-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">Automatisation des Workflows</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Orchestration de flux de travail complexes avec n8n, protocoles MCP et
                  interconnexion de services digitaux.
                </p>
              </div>

              <div className="gsap-card-reveal p-5 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-pink-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base">Formation &amp; Sensibilisation</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Animation d'ateliers pratiques, transmission de connaissances informatiques et
                  vulgarisation technologique pour le grand public.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Formations Section */}
      <section id="services" className="relative z-10 py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
            <Zap className="w-4 h-4" />
            <span>Offres &amp; Activités</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Services &amp; Formations Pratiques
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Des prestations adaptées aussi bien aux entreprises qu'aux apprenants cherchant à se
            former aux outils informatiques et à l'intelligence artificielle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Intégration d'Assistants &amp; IA</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Mise en place d'agents virtuels sur WhatsApp et le web pour l'automatisation des réponses
                clients, le traitement documentaire et l'optimisation du support.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Agents WhatsApp personnalisés</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Prompt engineering &amp; workflows LLM</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Formations &amp; Ateliers Informatiques</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Animation de sessions de formation pratique en informatique, sensibilisation aux usages
                de l'IA générative et accompagnement pédagogique pour étudiants et professionnels.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>Ateliers d'initiation et de perfectionnement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>Vulgarisation des outils technologiques</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">Développement Web &amp; Automatisations</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Conception d'applications sur-mesure (gestion de stock, suivi d'équipe), intégration
                d'APIs et automatisation de processus métier via n8n.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-neutral-300 pt-2 border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Applications Web &amp; APIs sur-mesure</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Workflows automatisés (n8n &amp; MCP)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="relative z-10 py-20 bg-neutral-950/80 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Réalisations Phares</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Projets &amp; Solutions Développées
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
                Aperçu des solutions concrètes créées pour répondre aux enjeux de digitalisation,
                d'automatisation et de gestion.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-neutral-900 border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-white text-black font-semibold shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Tous ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("ia")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "ia"
                    ? "bg-white text-black font-semibold shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                IA &amp; GenAI
              </button>
              <button
                onClick={() => setActiveTab("web")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "web"
                    ? "bg-white text-black font-semibold shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Gestion &amp; Web
              </button>
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-2xl bg-neutral-900/90 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.accent} p-0.5`}
                      >
                        <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-white">
                          <IconComponent className="w-6 h-6" />
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-neutral-300">
                        {project.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                        Points forts :
                      </h4>
                      <ul className="space-y-1.5 text-xs text-neutral-400">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compétences Section */}
      <section id="skills" className="relative z-10 py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <Wrench className="w-4 h-4" />
            <span>Savoir-faire technique</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Compétences &amp; Technologies
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Stack technologique maitrisée pour le développement de logiciels, les intégrations d'IA,
            l'automatisation et l'ingénierie pédagogique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Développement */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-cyan-500/40 transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Développement</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> HTML / CSS
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> JavaScript
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Développement Web &amp; Mobile
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> REST APIs &amp; Intégrations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Git / GitHub
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Supabase
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Vercel
              </li>
            </ul>
          </div>

          {/* Intelligence Artificielle */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-purple-500/40 transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Intelligence Artificielle</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> IA Générative &amp; LLM
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Prompt Engineering
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Agents IA &amp; WhatsApp
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Génération de contenus
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Traitement de documents
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Vision par ordinateur
              </li>
            </ul>
          </div>

          {/* Automatisation */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Automatisation</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> n8n
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Workflows complexes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Webhooks &amp; APIs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> MCP (Model Context Protocol)
              </li>
            </ul>
          </div>

          {/* Outils & Pédagogie */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-pink-500/40 transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Outils &amp; Pédagogie</h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> VS Code &amp; Antigravity
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Google AI Studio &amp; NotebookLM
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Claude &amp; Gemini
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Animation d'ateliers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> Formation pratique en informatique
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Parcours Académique & Professionnel */}
      <section id="education" className="relative z-10 py-20 bg-neutral-950/80 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400">
              <GraduationCap className="w-4 h-4" />
              <span>Cursus &amp; Certifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Formation &amp; Parcours Académique
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Informations rigoureuses et vérifiées sur l'ensemble de mon parcours d'études et de
              formation continue.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Academic Degrees */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Diplômes &amp; Études Supérieures</span>
              </h3>

              {/* Licence IACD */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-cyan-500/40 transition-all space-y-3 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Licence en Informatique, Télécommunication et Réseaux
                    </h4>
                    <p className="text-xs sm:text-sm text-cyan-400 mt-1">
                      IACD – Institut Africain pour le Commerce et le Développement Barack Obama
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shrink-0">
                    2019–2023
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Formation approfondie en réseaux, télécommunications et informatique. Diplôme /
                  attestation officiellement délivrés en 2024 au nom de <strong>Gawssou Thiam</strong>.
                </p>
              </div>

              {/* Licence UN-CHK */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-purple-500/40 transition-all space-y-3 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Licence en Développement Web et Mobile
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-400 mt-1">
                      IDA / Université numérique Cheikh Hamidou Kane (UN-CHK)
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30 shrink-0">
                    2020–2024
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Cursus axé sur la programmation web, mobile et l'ingénierie logicielle.{" "}
                  <span className="text-emerald-400 font-medium">Formation achevée</span> (Diplôme en
                  cours de retrait administratif).
                </p>
              </div>

              {/* Master UN-CHK */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-amber-500/40 transition-all space-y-3 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">Master en Génie Logiciel</h4>
                    <p className="text-xs sm:text-sm text-amber-400 mt-1">
                      Université numérique Cheikh Hamidou Kane (UN-CHK)
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
                    En cours
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Spécialisation avancée en génie logiciel, architecture système et technologies
                  logicielles de pointe.
                </p>
              </div>
            </div>

            {/* Experience & Professional Trainings */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <span>Expérience &amp; Formation Continue</span>
              </h3>

              {/* Keur'Geek Digital */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-emerald-500/40 transition-all space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Fondateur &amp; Lead Tech / Formateur
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-400 mt-1">Keur’Geek Digital</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                    Fondateur
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Conception et déploiement de solutions web et d'agents IA (Sama Agent, Stockplus).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Automatisation de processus métier pour TPE/PME sénégalaises via n8n.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Animation d'ateliers et activités de sensibilisation aux outils informatiques et à l'IA.</span>
                  </li>
                </ul>
              </div>

              {/* Vocalis Center */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-pink-500/40 transition-all space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Formation en Techniques de Communication &amp; Centre d’Appel
                    </h4>
                    <p className="text-xs sm:text-sm text-pink-400 mt-1">Vocalis Center</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-500/10 text-pink-300 border border-pink-500/30 shrink-0">
                    2025
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Renforcement des compétences en communication professionnelle, gestion de la relation
                  client et techniques d'expression orale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/15 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <span>Prise de contact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Discutons de votre projet ou d'une opportunité de formation
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Que vous recherchiez un formateur passionné en informatique, un partenaire tech pour
                développer vos applications ou intégrer de l'IA, je suis disponible pour échanger.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://wa.me/221701056707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-lg active:scale-95 text-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Démarrer sur WhatsApp</span>
                </a>
                <a
                  href="mailto:thiamgawssou2@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-neutral-300 border border-white/15 hover:border-white/40 hover:bg-white/5 transition-all text-sm"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Envoyer un Email</span>
                </a>
              </div>
            </div>

            {/* Direct Information Box */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-950/80 border border-white/10 space-y-4">
              <h3 className="text-base font-semibold text-white border-b border-white/10 pb-3">
                Coordonnées Officielles
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-neutral-300 truncate">thiamgawssou2@gmail.com</span>
                  </div>
                  <button
                    onClick={() => handleCopy("thiamgawssou2@gmail.com", "email")}
                    className="p-1.5 rounded text-neutral-400 hover:text-white"
                    title="Copier l'email"
                  >
                    {copiedField === "email" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-neutral-300">+221 70 105 67 07</span>
                  </div>
                  <button
                    onClick={() => handleCopy("701056707", "phone")}
                    className="p-1.5 rounded text-neutral-400 hover:text-white"
                    title="Copier le numéro"
                  >
                    {copiedField === "phone" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                    <a
                      href="https://www.linkedin.com/in/gawssou-thiam-7216a0280"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-300 hover:text-blue-400 truncate"
                    >
                      gawssou-thiam-7216a0280
                    </a>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-purple-400 shrink-0" />
                    <a
                      href="https://github.com/gawssougeek221"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-300 hover:text-purple-400 truncate"
                    >
                      github.com/gawssougeek221
                    </a>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-white/5">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-pink-400 shrink-0" />
                    <span className="text-neutral-300">Dakar, Sénégal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 border-t border-white/10 bg-neutral-950 text-neutral-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Gawssou Thiam</strong>. Tous
            droits réservés. Dakar, Sénégal.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://portfolio-gawssou.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              portfolio-gawssou.vercel.app
            </a>
            <a
              href="https://www.linkedin.com/in/gawssou-thiam-7216a0280"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/gawssougeek221"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a href="mailto:thiamgawssou2@gmail.com" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
