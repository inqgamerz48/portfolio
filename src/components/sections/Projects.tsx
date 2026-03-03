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
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-wrapper relative bg-[#06060a]">
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
          <span className="section-label mb-6 inline-flex">Selected Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6 max-w-xl mx-auto leading-tight">
            Products that <span className="text-primary-light">exist</span> in production.
            <br />
            Not just on GitHub.
          </h2>
        </motion.div>

        {/* Featured projects — large cards */}
        <div className="space-y-5 mb-8">
          {featured.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="glass-card p-6 md:p-8 relative overflow-hidden">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Project info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1.5 text-mono text-primary/60 text-[10px] tracking-[0.15em]">
                        <Star size={10} className="fill-primary/60" />
                        FEATURED
                      </span>
                      <span className="text-mono text-text-muted/20 text-xs">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl text-foreground group-hover:text-primary-light transition-colors duration-300 font-display">
                      {project.title}
                    </h3>

                    <p className="text-text-muted/60 mt-3 max-w-2xl leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stack.map((tech) => (
                        <span key={tech} className="skill-pill text-[11px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 lg:flex-shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-text-muted hover:text-foreground hover:border-white/[0.12] transition-all text-sm"
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
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary-light hover:bg-primary/15 transition-all text-sm"
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

        {/* Other projects — compact grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {others.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group"
            >
              <div className="glass-card-sm p-5 h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg text-foreground group-hover:text-primary-light transition-colors duration-300 font-display">
                    {project.title}
                  </h3>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted/40 hover:text-foreground transition-colors p-1"
                    >
                      <Github size={15} />
                    </a>
                  )}
                </div>
                <p className="text-text-muted/50 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-mono text-[10px] text-text-muted/40">
                      {tech}
                    </span>
                  ))}
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
          className="mt-12 text-center"
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
