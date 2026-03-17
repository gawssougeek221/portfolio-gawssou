'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { 
  MessageCircle, 
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Zap,
  Code,
  Palette,
  Rocket,
  Users,
} from 'lucide-react'
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail'
import { Carousel } from '@/components/ui/carousel'
import { ElegantShapesBackground } from '@/components/ui/shape-landing-hero'

// ============================================
// SPLINE VIEWER - FIXED BACKGROUND WITH SCROLL EVENTS + BLUR ON SECTIONS
// ============================================
function SplineViewerBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [blurAmount, setBlurAmount] = useState(0)
  
  useEffect(() => {
    // Load Spline Viewer script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.68/build/spline-viewer.js'
    script.async = true
    document.body.appendChild(script)
    
    // Hide Spline logo after viewer loads
    const hideLogo = () => {
      const viewers = document.querySelectorAll('spline-viewer')
      viewers.forEach((viewer) => {
        // Try to access shadow DOM
        try {
          const shadow = viewer.shadowRoot
          if (shadow) {
            const style = document.createElement('style')
            style.textContent = `
              a[href*="spline.design"],
              a[href*="splinetool"],
              [class*="logo"],
              [class*="watermark"],
              #logo,
              .logo {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
              }
            `
            shadow.appendChild(style)
          }
        } catch (e) {
          // Shadow DOM not accessible, use CSS fallback
        }
      })
    }
    
    // Wait for viewer to be defined and loaded
    const checkViewer = setInterval(() => {
      const viewer = document.querySelector('spline-viewer')
      if (viewer) {
        clearInterval(checkViewer)
        setTimeout(hideLogo, 500)
        // Also try after load event
        viewer.addEventListener('load', hideLogo)
      }
    }, 100)
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      clearInterval(checkViewer)
    }
  }, [])

  // Track scroll to apply blur when past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 2 // Hero is 200vh
      const scrollY = window.scrollY
      
      // Calculate blur based on scroll position
      // Start blur after hero section, max blur at 50px past
      if (scrollY > heroHeight - 200) {
        const progress = Math.min((scrollY - (heroHeight - 200)) / 300, 1)
        setBlurAmount(progress * 8) // Max 8px blur
      } else {
        setBlurAmount(0)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-auto transition-all duration-500"
      style={{ 
        filter: `blur(${blurAmount}px)`,
        opacity: blurAmount > 0 ? 0.7 : 1,
      }}
    >
      {/* Dark overlay that increases with blur */}
      <div 
        className="absolute inset-0 bg-black/0 transition-all duration-500 z-10 pointer-events-none"
        style={{ 
          backgroundColor: `rgba(0, 0, 0, ${blurAmount * 0.05})` 
        }}
      />
      {/* @ts-ignore - Custom element not recognized by TypeScript */}
      <spline-viewer 
        url="https://prod.spline.design/m4QKQK7slm5uLuls/scene.splinecode"
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
        hide-logo="true"
        events="all"
      />
    </div>
  )
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================
function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <motion.div
      className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-20"
      animate={{
        x: mousePosition.x - 300,
        y: mousePosition.y - 300,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      style={{
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
      }}
    />
  )
}

// ============================================
// MAGNETIC BUTTON
// ============================================
function MagneticButton({ children, className = '', ...props }: any) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }
  
  const reset = () => setPosition({ x: 0, y: 0 })
  
  return (
    <motion.a
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      {...props}
    >
      {children}
    </motion.a>
  )
}

// ============================================
// NAVIGATION
// ============================================
function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
      
      if (latest > lastScrollY.current && latest > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = latest
    })
    return () => unsubscribe()
  }, [scrollY])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a 
              href="#" 
              className="text-base font-medium text-white tracking-tight relative group"
              whileHover={{ scale: 1.02 }}
            >
              <span className="relative z-10">Gawssou Thiam</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-white"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {['Services', 'Projets', 'À propos'].map((item, i) => (
                <motion.a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-').replace('à', 'a')}`}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200 relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <MagneticButton
                  href="https://wa.me/221771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-black bg-white px-5 py-2.5 rounded-lg hover:bg-white/90 transition-all duration-200 inline-flex items-center gap-2"
                >
                  <span>Contact</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </MagneticButton>
              </motion.div>
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 relative z-50"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={isOpen ? 'open' : 'closed'}
                className="w-5 h-5 relative"
              >
                <motion.span
                  className="absolute top-0 left-0 w-full h-0.5 bg-white"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                />
                <motion.span
                  className="absolute top-2 left-0 w-full h-0.5 bg-white"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                />
                <motion.span
                  className="absolute top-4 left-0 w-full h-0.5 bg-white"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/98 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {['Services', 'Projets', 'À propos'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-').replace('à', 'a')}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="text-4xl text-white font-light hover:text-white/70 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/221771234567"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsOpen(false)}
                className="mt-6 text-base font-medium text-black bg-white px-8 py-4 rounded-xl"
              >
                Contact WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================
// HERO SECTION - Robot Spline Only (Scroll to reveal name)
// ============================================
function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <section ref={containerRef} className="relative min-h-[200vh] pointer-events-none">
      {/* Scroll indicator - discret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// NAME REVEAL SECTION - Appears after scrolling past robot
// ============================================
function NameRevealSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 0.9])
  
  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center">
      {/* Background overlay that fades in */}
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none"
        style={{ opacity: bgOpacity }}
      />
      
      <motion.div 
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 text-sm text-white/50 mb-8 px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm"
        >
          <motion.span 
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Disponible pour de nouveaux projets
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight leading-none mb-6"
        >
          <span className="inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Gawssou
            </motion.span>
          </span>
          <span className="inline-block ml-3 md:ml-4">
            <motion.span
              className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Thiam
            </motion.span>
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl text-white/60 font-light mb-4"
        >
          Expert IA & Community Manager
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl text-white/30 font-light max-w-2xl mx-auto mb-12"
        >
          Solutions digitales innovantes pour booster les entreprises et entrepreneurs sénégalais.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="https://wa.me/221771234567"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-black bg-white overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Discuter sur WhatsApp
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </span>
          </MagneticButton>
          
          <motion.a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white/70 border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Voir les services
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// SECTION SERVICES - CAROUSEL 3D
// ============================================
const SERVICES_SLIDES = [
  {
    title: "Visuels & Vidéos IA",
    button: "Découvrir",
    description: "Images, pubs, cinématiques générées par IA, adaptées au marché sénégalais",
    src: '/images/service-ai-visuals.png',
  },
  {
    title: "Sites Web Futuristes",
    button: "Découvrir",
    description: "Sites web avec 3D interactive et génération de contenu par IA",
    src: '/images/service-web.png',
    videoSrc: '/videos/sites-web.mp4', // Video preview
  },
  {
    title: "Automatisations Business",
    button: "Découvrir",
    description: "Automatisation de vos processus pour gain de temps et efficacité",
    src: '/images/service-automation.png',
  },
  {
    title: "KEUR'GEEK Auto-Community",
    button: "Découvrir",
    description: "Gestion 100% automatisée de vos réseaux sociaux avec IA",
    src: '/images/service-community.png',
  },
  {
    title: "Branding IA Complet",
    button: "Découvrir",
    description: "Identité visuelle professionnelle de A à Z avec l'intelligence artificielle",
    src: '/images/service-branding.png',
  },
]

function ServicesSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-40 bg-transparent overflow-hidden">
      {/* Elegant animated shapes background */}
      <ElegantShapesBackground className="opacity-60" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 pointer-events-none" />
      
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50" />
            <span className="text-xs uppercase tracking-widest text-white/40">Ce que je fais</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Services
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/40 font-light max-w-lg"
          >
            Cliquez sur les cartes ou utilisez les flèches pour explorer mes services.
          </motion.p>
        </motion.div>

        {/* Carousel 3D */}
        <div className="relative overflow-hidden w-full h-full py-8">
          <Carousel slides={SERVICES_SLIDES} />
        </div>
      </div>
    </section>
  )
}

// ============================================
// SECTION PROJETS - FOCUS RAIL CAROUSEL
// ============================================
const PROJECTS_DATA: FocusRailItem[] = [
  {
    id: 1,
    title: "KEUR'GEEK DIGITAL",
    description: "Écosystème complet de solutions IA pour le Sénégal. Plateforme web et mobile avec automatisations intelligentes.",
    meta: "IA • Web • Mobile",
    imageSrc: '/images/project-keurgeek.png',
    href: '#keurgeek',
  },
  {
    id: 2,
    title: 'Visuels & Vidéos IA',
    description: 'Contenus publicitaires générés par IA, adaptés au marché sénégalais. Publicités qui convertissent vraiment.',
    meta: "Création • Marketing",
    imageSrc: '/images/service-ai-visuals.png',
    href: '#visuels',
  },
  {
    id: 3,
    title: 'Senestock AI',
    description: 'Gestion de stock intelligente avec prédictions IA pour commerçants sénégalais. Optimisation des ventes.',
    meta: "IA • Business",
    imageSrc: '/images/project-senestock.png',
    href: '#senestock',
  },
  {
    id: 4,
    title: 'Design Produit IA',
    description: 'Visuels professionnels pour artisans et e-commerce. Studio photo virtuel avec IA.',
    meta: "Design • E-commerce",
    imageSrc: '/images/service-branding.png',
    href: '#design',
  },
  {
    id: 5,
    title: 'Sama Cours du Soir',
    description: 'Apprentissage personnalisé avec IA, entièrement adapté au programme scolaire sénégalais.',
    meta: "Éducation • IA",
    imageSrc: '/images/service-community.png',
    href: '#cours',
  },
  {
    id: 6,
    title: 'Projet Agritech',
    description: 'Soutien intelligent aux agriculteurs sénégalais avec prévisions météo et conseils de culture IA.',
    meta: "Agriculture • IA",
    imageSrc: '/images/service-automation.png',
    href: '#agritech',
  },
]

function ProjectsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200])

  return (
    <section id="projets" ref={ref} className="relative bg-black/30">
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </motion.div>
      
      <div className="relative z-20">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-24 md:pt-40 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50" />
              <span className="text-xs uppercase tracking-widest text-white/40">Portfolio</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
            >
              Projets
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/40 font-light max-w-lg"
            >
              Glissez ou utilisez les flèches pour explorer mes réalisations.
            </motion.p>
          </motion.div>
        </div>

        {/* Focus Rail Carousel */}
        <FocusRail 
          items={PROJECTS_DATA} 
          autoPlay={false} 
          loop={true}
          className="bg-transparent"
        />
      </div>
    </section>
  )
}

// ============================================
// SECTION ABOUT
// ============================================
function AboutSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  
  return (
    <section id="about" ref={containerRef} className="relative py-24 md:py-40 bg-transparent">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8" style={{ opacity }}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50" />
              <span className="text-xs uppercase tracking-widest text-white/40">Qui suis-je</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight mb-8"
            >
              À propos
            </motion.h2>
            
            <div className="space-y-6">
              {[
                `Je m'appelle Gawssou Thiam, passionné de technologie, d'intelligence artificielle et de digital, basé à Keur Massar, Dakar.`,
                `Titulaire d'une Licence en Informatique, Réseaux et Télécommunications de l'IACD Barack Obama, je poursuis actuellement un Master en Génie Logiciel à l'Université Numérique Cheikh Hamidou Kane (UN-CHK) au Sénégal.`,
                `Depuis toujours, je vis et respire la tech : je passe mes journées à explorer les dernières avancées en IA, à créer des expériences digitales futuristes et à imaginer comment ces outils peuvent transformer le quotidien des entreprises et des particuliers au Sénégal.`,
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="text-lg text-white/50 font-light leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-medium text-white/30 uppercase tracking-widest mb-8"
            >
              Formation
            </motion.h3>
            
            <div className="space-y-6">
              {[
                {
                  title: 'Licence Informatique, Réseaux et Télécommunications',
                  school: 'IACD Barack Obama',
                  status: 'completed',
                },
                {
                  title: 'Master Génie Logiciel',
                  school: 'Université Numérique Cheikh Hamidou Kane (UN-CHK)',
                  status: 'current',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-6 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-white/40 font-light">{item.school}</p>
                    </div>
                    {item.status === 'current' && (
                      <motion.span
                        className="px-3 py-1 text-xs text-white/70 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full whitespace-nowrap"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        En cours
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { value: '5+', label: 'Services' },
                { value: '10+', label: 'Projets' },
                { value: '100%', label: 'Passion' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-4 rounded-xl bg-black/50 backdrop-blur-sm border border-white/5"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <div className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  
  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-black/50">
      <motion.div
        className="relative z-20 max-w-4xl mx-auto px-6 lg:px-8 text-center"
        style={{ scale, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
            animate={{ 
              boxShadow: [
                '0 0 0px rgba(139,92,246,0)',
                '0 0 20px rgba(139,92,246,0.3)',
                '0 0 0px rgba(139,92,246,0)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/60">Prêt à démarrer ?</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6"
          >
            Transformez votre
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              business
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/40 font-light mb-12 max-w-xl mx-auto"
          >
            Discutons de votre projet et voyons comment l'IA peut vous aider à scaler rapidement.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton
              href="https://wa.me/221771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-medium text-black bg-white overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center gap-3 text-lg">
                <MessageCircle className="w-5 h-5" />
                Démarrer sur WhatsApp
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="relative z-20 py-10 bg-black/80 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm text-white/30 font-light"
          >
            © {new Date().getFullYear()} Gawssou Thiam. Keur Massar, Dakar, Sénégal.
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-8"
          >
            {['Services', 'Projets', 'WhatsApp'].map((item, i) => (
              <motion.a
                key={item}
                href={item === 'WhatsApp' ? 'https://wa.me/221771234567' : `#${item.toLowerCase()}`}
                target={item === 'WhatsApp' ? '_blank' : undefined}
                rel={item === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                className="text-sm text-white/30 hover:text-white transition-colors font-light relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// AVATAR BUBBLE - With Audio & Loop
// ============================================
function AvatarBubble() {
  const [isVisible, setIsVisible] = useState(false)
  const [showLoop, setShowLoop] = useState(false)
  const introVideoRef = useRef<HTMLVideoElement>(null)
  const loopVideoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    let count = 0
    const handleScroll = () => {
      if (!isVisible) {
        count++
        if (count >= 2) setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  // Play intro video with audio when visible
  useEffect(() => {
    if (isVisible && introVideoRef.current) {
      introVideoRef.current.play().catch(() => {
        // Autoplay with sound might be blocked, try muted first
        if (introVideoRef.current) {
          introVideoRef.current.muted = true
          introVideoRef.current.play()
        }
      })
    }
  }, [isVisible])

  // Play loop video when intro ends
  useEffect(() => {
    if (showLoop && loopVideoRef.current) {
      loopVideoRef.current.play().catch(() => {
        if (loopVideoRef.current) {
          loopVideoRef.current.muted = true
          loopVideoRef.current.play()
        }
      })
    }
  }, [showLoop])

  const handleClick = () => {
    window.open('https://wa.me/221771234567?text=Salut%20Gawssou%2C%20j%27ai%20vu%20ton%20avatar%21', '_blank')
  }

  const introUrl = 'https://res.cloudinary.com/dk0nh2e6b/video/upload/v1773557505/TON_PRESENTATION_d4w8sy.mp4'
  const loopUrl = 'https://res.cloudinary.com/dk0nh2e6b/video/upload/v1773557401/TON_LOOP_pmsblu.mp4'

  if (!isVisible) return null

  return (
    <div
      onClick={handleClick}
      className="fixed bottom-24 left-6 z-[55] w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full overflow-hidden cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.3) 100%)',
        border: '2px solid rgba(139, 92, 246, 0.5)',
        boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
      }}
    >
      {!showLoop ? (
        <video
          ref={introVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          onEnded={() => setShowLoop(true)}
          onError={() => setShowLoop(true)}
        >
          <source src={introUrl} type="video/mp4" />
        </video>
      ) : (
        <video
          ref={loopVideoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          playsInline
          muted={false}
        >
          <source src={loopUrl} type="video/mp4" />
        </video>
      )}
    </div>
  )
}

// ============================================
// WHATSAPP BUTTON
// ============================================
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/221771234567"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30 group"
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-green-400"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <MessageCircle className="w-7 h-7 text-white relative z-10" />
      
      <motion.div
        className="absolute right-full mr-3 px-3 py-2 bg-black/90 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={{ x: 10 }}
        whileHover={{ x: 0 }}
      >
        Chat WhatsApp
      </motion.div>
    </motion.a>
  )
}

// ============================================
// EXIT POPUP
// ============================================
function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
            
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-6"
            >
              🚀
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Besoin d'un boost IA ?
            </h3>
            <p className="text-white/50 font-light mb-8">
              À Keur Massar / Dakar ? Discutons gratuitement de votre projet digital.
            </p>

            <motion.a
              href="https://wa.me/221771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-black bg-white hover:bg-white/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat WhatsApp Gratuit
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================
// MAIN
// ============================================
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* Fixed Spline Viewer Background - captures scroll events */}
      <SplineViewerBackground />
      
      {/* UI Elements */}
      <ScrollProgress />
      <CursorGlow />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Content sections - scrollable over fixed Spline */}
      <HeroSection />
      <NameRevealSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <CTASection />
      <Footer />
      
      {/* Fixed buttons */}
      <AvatarBubble />
      <WhatsAppButton />
      <ExitPopup />
    </main>
  )
}
