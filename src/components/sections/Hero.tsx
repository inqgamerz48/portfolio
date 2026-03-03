'use client'

import { motion } from 'framer-motion'

const stats = [
  { num: '4+', label: 'Years Experience' },
  { num: '150+', label: 'Deployments' },
  { num: '10+', label: 'Products Shipped' },
  { num: '∞', label: 'Lines of Code' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-0 px-6 lg:px-8 overflow-hidden">
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Atmospheric glow */}
      <div className="crimson-glow" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="status-dot" />
          <span className="text-mono-sm text-mist">Full Stack Developer — Available for work</span>
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-parchment"
          >
            I BUILD
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-display"
          >
            <span className="text-serif-italic text-flame" style={{ fontSize: '0.85em' }}>systems</span>{' '}
            THAT SHIP
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-8 max-w-md text-mist leading-relaxed"
        >
          Solo developer building production-grade SaaS platforms,
          enterprise systems, and AI-integrated products.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mt-10 flex items-center gap-8"
        >
          <a href="#projects" className="btn-primary" data-cursor-hover>View Work</a>
          <a href="#contact" className="btn-ghost" data-cursor-hover>Get in Touch →</a>
        </motion.div>

        {/* Stats grid — big numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-parchment/[0.06]"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 ${i > 0 ? 'border-l border-parchment/[0.06]' : ''} text-center`}
            >
              <p className="font-display text-4xl md:text-5xl text-parchment tracking-wider">{stat.num}</p>
              <p className="text-mono-sm text-ash mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
