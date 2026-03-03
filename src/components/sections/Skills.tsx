'use client'

import { motion } from 'framer-motion'

const categories = [
  { name: 'Frontend', skills: 'Next.js · React · TypeScript · Tailwind · Framer Motion · HTML/CSS' },
  { name: 'Backend', skills: 'FastAPI · Node.js · Express · Python · REST APIs · GraphQL' },
  { name: 'Database / Infra', skills: 'PostgreSQL · MongoDB · Redis · Docker · Nginx · Linux' },
  { name: 'AI / Tools', skills: 'LangChain · OpenAI · Prisma · Firebase · Git · Vercel' },
]

export function Skills() {
  return (
    <section id="skills" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">002</span>
          <h2 className="section-title">Stack</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card-dark p-6"
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-mono-sm text-blood opacity-50">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl text-parchment tracking-wider">{cat.name}</h3>
              </div>
              <p className="text-mist text-sm leading-relaxed">{cat.skills}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
