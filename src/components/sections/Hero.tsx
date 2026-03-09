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
      <div className="grid-overlay" />
      <div className="crimson-glow" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 text-mono-sm text-mist"
            >
              {tagline}
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-display text-parchment"
              >
                {headline}
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-4 md:mt-6 max-w-lg text-sm md:text-base text-mist leading-relaxed"
            >
              {subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-8 flex items-center gap-6 flex-wrap"
            >
              <a href="#projects" className="btn-primary" data-cursor-hover>See my work</a>
              <a href="#contact" className="btn-ghost" data-cursor-hover>Let's talk</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="mt-8 text-mist"
            >
              {trustLine}
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-6 p-4 border-l-4 border-parchment/60 bg-ink/60 rounded-sm"
            >
              <p className="text-mist italic">{quote}</p>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-parchment/[0.06]"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-6 text-center ${i > 0 ? 'border-l border-parchment/[0.06]' : ''}`}
                >
                  <p className="font-display text-xl md:text-2xl text-parchment tracking-wider">{stat.num}</p>
                  <p className="text-mono-sm text-ash mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blood/20 via-flame/10 to-ember/20 rounded-lg blur-2xl" />
              <img 
                src="/hero-image.png" 
                alt="INQ - Full Stack Developer" 
                className="relative rounded-lg shadow-2xl border border-parchment/10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
