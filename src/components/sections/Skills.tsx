'use client'

import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Frontend',
    skills: 'Next.js, React, TypeScript, Tailwind CSS, Framer Motion, HTML/CSS',
  },
  {
    name: 'Backend',
    skills: 'FastAPI, Node.js, Express, Python, REST APIs, GraphQL',
  },
  {
    name: 'Database & Infra',
    skills: 'PostgreSQL, MongoDB, Redis, Docker, Nginx, Linux',
  },
  {
    name: 'AI & Tools',
    skills: 'LangChain, OpenAI, Prisma, Firebase, Git, Vercel',
  },
]

export function Skills() {
  return (
    <section id="skills" className="section-wrapper relative">
      <div className="section-inner max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Capabilities
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-fg mb-16"
        >
          Tools of the trade.
        </motion.h2>

        {/* Editorial numbered list */}
        <div className="space-y-0">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="py-8 border-t border-[rgba(200,180,160,0.08)] grid grid-cols-12 gap-4 items-baseline"
            >
              {/* Number */}
              <span className="col-span-1 text-mono text-charcoal">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Category name */}
              <h3 className="col-span-3 sm:col-span-3 font-serif text-xl lg:text-2xl text-fg">
                {cat.name}
              </h3>

              {/* Skills — inline */}
              <p className="col-span-8 text-ash leading-relaxed">
                {cat.skills}
              </p>
            </motion.div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-[rgba(200,180,160,0.08)]" />
        </div>
      </div>
    </section>
  )
}
