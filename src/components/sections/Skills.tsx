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
      <div className="slash-divider" />

      <div className="section-inner max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Arsenal
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-parchment mb-16"
        >
          Weapons of choice.
        </motion.h2>

        {/* Category cards with crimson top border */}
        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="anime-card p-7"
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span className="text-mono text-steel text-[10px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-parchment font-black">
                  {cat.name}
                </h3>
              </div>
              <p className="text-mist leading-relaxed">
                {cat.skills}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
