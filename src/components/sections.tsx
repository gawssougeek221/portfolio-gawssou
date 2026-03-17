'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ============================================
// ABOUT SECTION WITH PHOTO
// ============================================
export function AboutSection() {
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
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8" style={{ opacity }}>
        {/* Photo + Intro Row */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-black/50">
              <img 
                src="/images/photo-gawssou.jpg" 
                alt="Gawssou Thiam"
                className="w-full h-full object-cover"
              />
              {/* Fallback gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center -z-10">
                <span className="text-6xl font-bold text-white">GT</span>
              </div>
            </div>
            {/* Status badge */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full border border-green-500/30 flex items-center gap-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Disponible</span>
            </motion.div>
          </motion.div>

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6 justify-center lg:justify-start"
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50" />
              <span className="text-xs uppercase tracking-widest text-white/40">Qui suis-je</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight mb-6"
            >
              Gawssou Thiam
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-white/60 font-light mb-4"
            >
              Expert IA & Community Manager
            </motion.p>
            
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base text-white/50 font-light leading-relaxed"
              >
                Passionné de technologie, d'intelligence artificielle et de digital, basé à Keur Massar, Dakar.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base text-white/50 font-light leading-relaxed"
              >
                Titulaire d'une Licence en Informatique, Réseaux et Télécommunications de l'IACD Barack Obama, je poursuis actuellement un Master en Génie Logiciel à l'Université Numérique Cheikh Hamidou Kane (UN-CHK).
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base text-white/50 font-light leading-relaxed"
              >
                J'explore les dernières avancées en IA pour créer des expériences digitales futuristes et transformer le quotidien des entreprises sénégalaises.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Stats + Formation */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <h4 className="text-lg font-medium text-white mb-2">Licence Informatique, Réseaux et Télécommunications</h4>
                <p className="text-sm text-white/40 font-light">IACD Barack Obama</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-6 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Master Génie Logiciel</h4>
                    <p className="text-sm text-white/40 font-light">Université Numérique Cheikh Hamidou Kane (UN-CHK)</p>
                  </div>
                  <motion.span
                    className="px-3 py-1 text-xs text-white/70 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full whitespace-nowrap"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    En cours
                  </motion.span>
                </div>
              </motion.div>
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
              Chiffres clés
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4"
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
// TESTIMONIALS SECTION
// ============================================
export function TestimonialsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const x = useTransform(scrollYProgress, [0, 1], [100, -100])

  const testimonials = [
    {
      name: 'Aminata Diallo',
      role: 'CEO, StartUp Dakar',
      content: 'Gawssou a livré une vision unique et moderne pour notre présence digitale. Son travail sur notre site web a dépassé nos attentes.',
      avatar: 'AD',
    },
    {
      name: 'Fatou Ndiaye',
      role: 'Directrice Marketing',
      content: 'Une approche innovante et professionnelle. Les visuels IA créés pour notre campagne ont été un vrai game-changer.',
      avatar: 'FN',
    },
    {
      name: 'Moussa Sow',
      role: "Fondateur, Keur'Geek",
      content: "Gawssou combine créativité et expertise technique. Un partenaire de confiance pour notre projet KEUR'GEEK.",
      avatar: 'MS',
    },
  ]

  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-transparent overflow-hidden">
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6 justify-center"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50" />
            <span className="text-xs uppercase tracking-widest text-white/40">Témoignages</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight mb-6"
          >
            Ce qu&apos;ils disent de{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              clients
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/40 font-light max-w-2xl mx-auto"
          >
            Découvrez ce que pensent nos clients de leur collaboration avec moi.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{ x }}
              className="p-6 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/5 hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 3.497a.75.75 0 001.072-.001l2.47 2.447a.75.75 0 00-.982-.001L7.855 5.008-.001-3.304a.75.75 0 00-.982.001L4.098 3.844-.001-3.304a.75.75 0 00-.982-.001L3.855 5.009z" />
                  </svg>
                ))}
              </div>
              
              {/* Content */}
              <p className="text-white/70 font-light mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/40">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
