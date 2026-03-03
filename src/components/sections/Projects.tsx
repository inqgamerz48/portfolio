'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'

const projects = [
  {
    title: 'BizTrackr PRO',
    description: 'Multi-tenant SaaS commerce platform unifying Inventory, POS, CRM, and Financial Ledgers with enterprise security and real-time analytics.',
    stack: ['Next.js 14', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/inqgamerz48/biztrackr-grand-enterprise',
    liveUrl: null,
    featured: true,
  },
  {
    title: 'UNI Manager',
    description: 'Enterprise university management system with multi-role portals, RBAC, attendance tracking, grade management, and PDF analytics.',
    stack: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Firebase'],
    githubUrl: 'https://github.com/inqgamerz48/final-unimamanger',
    liveUrl: null,
    featured: true,
  },
  {
    title: 'INQ Portfolio V1',
    description: 'Original cinematic portfolio with gamification, anime themes, easter eggs, and integrated service store.',
    stack: ['HTML', 'CSS', 'Vanilla JS', 'FastAPI', 'SQLite'],
    githubUrl: null,
    liveUrl: 'https://portfolio-inq.pages.dev',
    featured: true,
  },

]

export function Projects() {
  return (
    <section id="projects" className="section-wrapper relative bg-[#06060a]">
      <div className="section-divider-top" />
      <div className="section-inner max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-flex">Selected Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6 max-w-xl mx-auto leading-tight">
            Products that <span className="text-primary-light">exist</span> in production.
            <br />
            Not just on GitHub.
          </h2>
        </motion.div>

        {/* Projects grid — 3-column cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-7 md:p-8 h-full relative overflow-hidden flex flex-col">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="flex items-center gap-1.5 text-mono text-primary/60 text-[10px] tracking-[0.15em]">
                      <Star size={10} className="fill-primary/60" />
                      FEATURED
                    </span>
                    <span className="text-mono text-text-muted/20 text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl text-foreground group-hover:text-primary-light transition-colors duration-300 font-display mb-4">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted/60 leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span key={tech} className="skill-pill text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-text-muted hover:text-foreground hover:border-white/[0.12] transition-all text-sm flex-1 justify-center"
                      >
                        <Github size={15} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary-light hover:bg-primary/15 transition-all text-sm flex-1 justify-center"
                      >
                        <ExternalLink size={15} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/inqgamerz48"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex text-xs"
          >
            View All Projects →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
