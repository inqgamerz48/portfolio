'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-8 overflow-hidden">
      {/* Atmospheric crimson glow */}
      <div className="crimson-glow" />

      {/* Floating ember particles */}
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />
      <div className="particle" />

      {/* Kanji background decoration — 鍛 (forge) */}
      <div className="kanji-bg right-[5%] top-[10%]" aria-hidden="true">鍛</div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="section-eyebrow mb-8"
        >
          Full Stack Developer · Systems Builder
        </motion.p>

        {/* Main title — dramatic staggered reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-parchment"
          >
            I forge
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-display"
          >
            systems that{' '}
            <em className="not-italic text-blood-glow">ship.</em>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 max-w-lg text-mist text-lg leading-relaxed"
        >
          Solo developer building production-grade SaaS platforms,
          enterprise systems, and AI-integrated products.
          Not prototypes — products people use.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mt-12"
        >
          <a href="#projects" className="btn-blade">
            View Work
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-blood" />
        </motion.div>
      </motion.div>
    </section>
  )
}
