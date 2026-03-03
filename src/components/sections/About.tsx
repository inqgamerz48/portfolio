'use client'

import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="section-wrapper relative">
      <div className="section-inner max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          About
        </motion.p>

        {/* Editorial lead paragraph */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-fg mb-10"
        >
          I&apos;m a solo developer who builds{' '}
          <em className="text-ember not-italic">production-grade systems</em> —
          not prototypes, not mockups, not &quot;proof of concepts.&quot;
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6 text-ash leading-relaxed text-lg max-w-3xl"
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

        {/* Inline stats — not cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 pt-8 border-t border-[rgba(200,180,160,0.08)]"
        >
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-mono text-bone">
            <span>4+ years experience</span>
            <span className="text-[rgba(200,180,160,0.2)]">·</span>
            <span>150+ deployments</span>
            <span className="text-[rgba(200,180,160,0.2)]">·</span>
            <span>10+ production products</span>
            <span className="text-[rgba(200,180,160,0.2)]">·</span>
            <span>Solo developer</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
