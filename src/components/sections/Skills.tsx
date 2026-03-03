'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['Next.js 14', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    description: 'Building interfaces that feel alive',
  },
  {
    title: 'Backend',
    skills: ['FastAPI', 'Node.js', 'Python', 'REST APIs', 'GraphQL'],
    description: 'Systems that scale with demand',
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'Prisma', 'SQLAlchemy', 'Firebase', 'Redis'],
    description: 'Data architecture that performs',
  },
  {
    title: 'DevOps',
    skills: ['Docker', 'Git', 'Vercel', 'Railway', 'AWS'],
    description: 'From code to production, seamlessly',
  },
  {
    title: 'AI/ML',
    skills: ['CrewAI', 'LangChain', 'OpenAI', 'Automation', 'Vector DBs'],
    description: 'Intelligence that augments capability',
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#030003]">
      <div className="max-w-5xl mx-auto">
        {/* Section header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-mono text-primary/80 tracking-[0.5em] text-xs">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6 max-w-xl mx-auto leading-tight">
            A full-stack arsenal built through <span className="text-primary">years</span> of shipping.
          </h2>
        </motion.div>

        {/* Skills grid - cleaner, centered */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="group p-8 bg-card border border-card-border hover:border-primary/30 transition-colors duration-300"
            >
              {/* Category number */}
              <span className="text-mono text-primary/20 text-xs tracking-[0.3em]">
                {String(catIndex + 1).padStart(2, '0')}
              </span>

              {/* Category title */}
              <h3 className="font-display text-2xl text-foreground mt-3 mb-2">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-text-muted/70 text-sm mb-5">
                {category.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs text-text-muted/60 bg-background border border-card-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-text-muted/40 mt-16 text-sm"
        >
          <span className="text-primary/50">//</span> Always learning. Never stopping.
        </motion.p>
      </div>

      <div className="section-divider mt-20 max-w-xl mx-auto" />
    </section>
  )
}
