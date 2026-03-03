'use client'

import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="section-wrapper">
      <div className="section-inner">
        {/* Section header with number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">001</span>
          <h2 className="section-title">About</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-display text-3xl md:text-4xl text-parchment tracking-wide leading-[1.15] mb-6">
              A SOLO DEVELOPER WHO FORGES{' '}
              <span className="text-serif-italic text-flame" style={{ fontSize: '0.9em' }}>production</span>{' '}
              SYSTEMS
            </p>
            <p className="text-mist leading-relaxed mb-4">
              CSE Diploma student at Gitam University with 4+ years of building real software.
              I&apos;ve deployed 150+ production systems across SaaS platforms, university management portals,
              restaurant ordering systems, and AI-integrated tools.
            </p>
            <p className="text-mist leading-relaxed">
              Stack of choice: Next.js, TypeScript, FastAPI, PostgreSQL, Docker.
              Code that scales, ships, and survives contact with real users.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-dark p-8 flex flex-col justify-center"
          >
            <p className="text-serif-italic text-xl md:text-2xl text-parchment leading-relaxed mb-4">
              &ldquo;Fast. Relentless. Production-ready. Every line of code is a blade forged for battle.&rdquo;
            </p>
            <p className="text-mono-sm text-blood">— INQ</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
