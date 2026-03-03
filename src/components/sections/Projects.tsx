'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'BizTrackr PRO',
    description: 'Multi-tenant SaaS — Inventory, POS, CRM, Financial Ledgers',
    stack: 'Next.js · TypeScript · FastAPI · PostgreSQL · Docker',
    year: '2024',
    githubUrl: 'https://github.com/inqgamerz48/biztrackr-grand-enterprise',
    liveUrl: null,
  },
  {
    title: 'UNI Manager',
    description: 'Enterprise university management — RBAC, attendance, analytics',
    stack: 'Next.js · TypeScript · PostgreSQL · Prisma · Firebase',
    year: '2024',
    githubUrl: 'https://github.com/inqgamerz48/final-unimamanger',
    liveUrl: null,
  },
  {
    title: 'INQ Portfolio V1',
    description: 'Cinematic portfolio — gamification, anime, easter eggs',
    stack: 'HTML · CSS · Vanilla JS · FastAPI · SQLite',
    year: '2023',
    githubUrl: null,
    liveUrl: 'https://portfolio-inq.pages.dev',
  },
]

export function Projects() {
  return (
    <section id="projects" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">003</span>
          <h2 className="section-title">Selected Work</h2>
        </motion.div>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-[3rem_1fr_1fr_auto] gap-8 pb-3 border-b border-parchment/[0.06] text-mono-sm text-ash mb-0">
          <span>#</span>
          <span>Project</span>
          <span>Stack</span>
          <span>Year</span>
        </div>

        {/* Project rows */}
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group"
          >
            <div className="table-row">
              {/* Number */}
              <span className="text-mono-sm text-ash/40">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title + description */}
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-parchment group-hover:text-flame transition-colors tracking-wider" data-cursor-hover>
                  {project.title}
                </h3>
                <p className="text-mist text-sm mt-1">{project.description}</p>
                {/* Links — visible on mobile */}
                <div className="flex gap-4 mt-3 md:hidden">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor-hover>
                      Source <ArrowUpRight size={10} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor-hover>
                      Live <ArrowUpRight size={10} />
                    </a>
                  )}
                </div>
              </div>

              {/* Stack — desktop only */}
              <p className="hidden md:block text-mono-sm text-ash">{project.stack}</p>

              {/* Year + links */}
              <div className="hidden md:flex items-center gap-6">
                <span className="text-mono-sm text-ash">{project.year}</span>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor-hover>
                    Source <ArrowUpRight size={10} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor-hover>
                    Live <ArrowUpRight size={10} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <a href="https://github.com/inqgamerz48" target="_blank" rel="noopener noreferrer" className="btn-ghost" data-cursor-hover>
            View all on GitHub <ArrowUpRight size={10} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
