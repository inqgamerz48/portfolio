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
      <div className="section-inner max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
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
          className="text-heading text-fg mb-16"
        >
          Products that exist in production.
        </motion.h2>

        {/* Project list — editorial, ruled */}
        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group py-10 border-t border-[rgba(200,180,160,0.08)]"
            >
              <div className="grid grid-cols-12 gap-4">
                {/* Number */}
                <span className="col-span-1 text-mono text-charcoal pt-2">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="col-span-11 lg:col-span-7">
                  <h3 className="font-serif text-3xl lg:text-4xl text-fg group-hover:text-ember-glow transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-ash leading-relaxed">
                    {project.description}
                  </p>
                  <p className="mt-4 text-mono text-bone opacity-50">
                    {project.stack}
                  </p>
                </div>

                {/* Links */}
                <div className="col-span-11 lg:col-span-4 lg:col-start-9 flex items-start gap-6 mt-4 lg:mt-2 lg:justify-end">
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
          {/* Bottom border */}
          <div className="border-t border-[rgba(200,180,160,0.08)]" />
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
