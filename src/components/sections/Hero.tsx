'use client'

import { motion } from 'framer-motion'

const tagline = 'Available for projects'
const headline = "I am INQ. I build SaaS and full-stack sites and apps including websites."
const subhead = "Custom sites, web apps, and tools — built fast, easy for you to manage, and designed to actually convert visitors into customers."
const trustLine = "Websites · Web Apps · SaaS · APIs · Automation · Mobile"
const quote = `"I started building because too many small businesses were overpaying for average results."`

const stats = [
  { num: '4+', label: 'Years Experience' },
  { num: '15+', label: 'Projects completed' },
  { num: '100%', label: 'Client satisfaction' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-0 px-6 lg:px-8 overflow-hidden">
      {/* Static grid overlay */}
      <div className="grid-overlay-fixed" />
      
      {/* Glow effects - simplified */}
      <div className="crimson-glow" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/50 to-void" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pb-16">
        {/* Tagline with pulse dot */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="w-2 h-2 bg-green rounded-full animate-pulse" />
          <span className="text-mono-sm text-mist">{tagline}</span>
        </motion.div>

        {/* Headline with reveal effect */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-parchment"
          >
            {headline}
          </motion.h1>
        </div>

        {/* Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-4 md:mt-6 max-w-2xl text-base md:text-lg text-mist leading-relaxed"
        >
          {subhead}
        </motion.p>

        {/* CTA buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-8 flex items-center gap-6 flex-wrap"
        >
          <motion.a 
            href="#projects" 
            className="btn-primary text-sm px-8 py-3"
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See my work
          </motion.a>
          <motion.a 
            href="#contact" 
            className="btn-ghost text-sm"
            data-cursor-hover
            whileHover={{ x: 5 }}
          >
            Let's talk
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mt-8 text-base text-mist"
        >
          {trustLine}
        </motion.div>

        {/* Quote */}
        <motion.blockquote 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-6 p-4 border-l-4 border-parchment/60 bg-ink/60 rounded-sm max-w-2xl"
        >
          <p className="text-base text-mist italic">{quote}</p>
        </motion.blockquote>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-parchment/[0.06] max-w-2xl"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className={`py-6 text-center ${i > 0 ? 'border-l border-parchment/[0.06]' : ''}`}
            >
              <p className="font-display text-xl md:text-2xl text-parchment tracking-wider">{stat.num}</p>
              <p className="text-mono-sm text-ash mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
