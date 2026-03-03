'use client'

import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="section-wrapper relative">
      {/* Slash divider */}
      <div className="slash-divider" />

      <div className="section-inner max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          About
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-parchment mb-10"
        >
          A lone developer who doesn&apos;t build{' '}
          <em className="not-italic text-flame">prototypes</em> —{' '}
          he forges production systems.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6 text-mist leading-relaxed text-lg max-w-3xl"
        >
          <p>
            CSE Diploma student at Gitam University with 4+ years of building real software.
            I&apos;ve deployed 150+ production systems across SaaS platforms, university management portals,
            restaurant ordering systems, and AI-integrated tools.
          </p>
          <p>
            Stack of choice: Next.js, TypeScript, FastAPI, PostgreSQL, Docker.
            I write code that scales, ships, and survives contact with real users.
          </p>
        </motion.div>

        {/* Stats with gold numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { num: '4+', label: 'Years' },
            { num: '150+', label: 'Deployments' },
            { num: '10+', label: 'Products' },
            { num: '1', label: 'Developer' },
          ].map((stat, i) => (
            <div key={i} className="text-center py-6 border-t border-blood/10">
              <p className="font-serif text-3xl md:text-4xl font-black text-gold-glow">{stat.num}</p>
              <p className="text-mono text-ash mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Ethos card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 anime-card p-8 md:p-10"
        >
          <p className="font-serif text-xl md:text-2xl text-parchment leading-relaxed italic">
            &ldquo;Fast. Relentless. Production-ready. Every line of code is a blade forged for battle.&rdquo;
          </p>
          <p className="text-mono text-blood mt-4">— INQ</p>
        </motion.div>
      </div>
    </section>
  )
}
