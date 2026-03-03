'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['Next.js 14', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    description: 'Building interfaces that feel alive',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Backend',
    skills: ['FastAPI', 'Node.js', 'Python', 'REST APIs', 'GraphQL'],
    description: 'Systems that scale with demand',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'Prisma', 'SQLAlchemy', 'Firebase', 'Redis'],
    description: 'Data architecture that performs',
    gradient: 'from-purple-500/20 to-violet-500/20',
  },
  {
    title: 'DevOps',
    skills: ['Docker', 'Git', 'Vercel', 'Railway', 'AWS'],
    description: 'From code to production, seamlessly',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    title: 'AI/ML',
    skills: ['CrewAI', 'LangChain', 'OpenAI', 'Automation', 'Vector DBs'],
    description: 'Intelligence that augments capability',
    gradient: 'from-red-500/20 to-pink-500/20',
  },
]

export function Skills() {
  return (
    <section id="skills" className="section-wrapper relative bg-[#06060a]">
      <div className="section-divider-top" />
      <div className="section-inner max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-flex">Capabilities</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6 max-w-xl mx-auto leading-tight">
            A full-stack arsenal built through <span className="text-primary-light">years</span> of shipping.
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="group glass-card p-7 relative overflow-hidden"
            >
              {/* Subtle gradient glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative z-10">
                {/* Category number */}
                <span className="text-mono text-primary/30 text-xs tracking-[0.3em]">
                  {String(catIndex + 1).padStart(2, '0')}
                </span>

                {/* Category title */}
                <h3 className="font-display text-2xl text-foreground mt-3 mb-2 group-hover:text-primary-light transition-colors duration-300">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-text-muted/60 text-sm mb-5">
                  {category.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-pill text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
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
          className="text-center text-text-muted/40 mt-14 text-sm"
        >
          <span className="text-primary/40">//</span> Always learning. Never stopping.
        </motion.p>
      </div>
    </section>
  )
}
