'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'BizTrackr PRO',
    description: 'Multi-tenant SaaS commerce platform unifying Inventory, POS, CRM, and Financial Ledgers with enterprise security and real-time analytics.',
    stack: 'Next.js 14 · TypeScript · FastAPI · PostgreSQL · Docker',
    githubUrl: 'https://github.com/inqgamerz48/biztrackr-grand-enterprise',
    liveUrl: null,
  },
  {
    title: 'UNI Manager',
    description: 'Enterprise university management system with multi-role portals, RBAC, attendance tracking, grade management, and PDF analytics.',
    stack: 'Next.js 14 · TypeScript · PostgreSQL · Prisma · Firebase',
    githubUrl: 'https://github.com/inqgamerz48/final-unimamanger',
    liveUrl: null,
  },
  {
    title: 'INQ Portfolio V1',
    description: 'Original cinematic portfolio with gamification, anime themes, easter eggs, and integrated service store.',
    stack: 'HTML · CSS · Vanilla JS · FastAPI · SQLite',
    githubUrl: null,
    liveUrl: 'https://portfolio-inq.pages.dev',
  },
]

export function Projects() {
  return (
    <section id="projects" className="section-wrapper relative">
      <div className="slash-divider" />

      <div className="section-inner max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-parchment mb-16"
        >
          Blades forged in production.
        </motion.h2>

        {/* Project cards */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="anime-card p-8 md:p-10 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  {/* Number + title */}
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-mono text-steel text-[10px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-3xl lg:text-4xl font-black text-parchment group-hover:text-flame transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-mist leading-relaxed mb-5 max-w-2xl">
                    {project.description}
                  </p>

                  <p className="text-mono text-ash text-[10px]">
                    {project.stack}
                  </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 lg:pt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      Source <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      Live <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <a
            href="https://github.com/inqgamerz48"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            View all on GitHub <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
