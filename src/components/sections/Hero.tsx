'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-8 overflow-hidden">
      {/* Ambient glow — single corner-anchored gradient */}
      <div className="ambient-glow" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-eyebrow mb-8"
        >
          Full Stack Developer · Systems Builder
        </motion.p>

        {/* Main title — massive serif, staggered */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-fg"
          >
            I build things
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-display"
          >
            that <em className="text-ember-glow not-italic">ship.</em>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-10 max-w-lg text-ash text-lg leading-relaxed"
        >
          Solo developer building production-grade SaaS platforms,
          enterprise systems, and AI-integrated products.
          Not prototypes — products people use.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-12"
        >
          <a href="#projects" className="btn-primary">
            View Work
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-ash" />
        </motion.div>
      </motion.div>
    </section>
  )
}
