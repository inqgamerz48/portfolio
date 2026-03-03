'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

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
  {
    title: 'TaskFlow',
    description: 'Minimalist project management tool with real-time collaboration, Kanban boards, and team analytics.',
    stack: ['Next.js', 'React', 'Firebase', 'Tailwind'],
    githubUrl: 'https://github.com/inqgamerz48/taskflow',
    liveUrl: null,
    featured: false,
  },
  {
    title: 'DevConnect',
    description: 'Developer networking platform with matching algorithm, portfolio showcase, and chat functionality.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
    githubUrl: 'https://github.com/inqgamerz48/devconnect',
    liveUrl: null,
    featured: false,
  },
  {
    title: 'CodeSnippets',
    description: 'Personal code library with syntax highlighting, tags, and cloud sync across devices.',
    stack: ['React', 'Node.js', 'MongoDB', 'Monaco Editor'],
    githubUrl: 'https://github.com/inqgamerz48/codesnippets',
    liveUrl: null,
    featured: false,
  },
  {
    title: 'WeatherPulse',
    description: 'Beautiful weather dashboard with forecasts, historical data visualization, and location-based alerts.',
    stack: ['React', 'Weather APIs', 'D3.js', 'Tailwind'],
    githubUrl: 'https://github.com/inqgamerz48/weatherpulse',
    liveUrl: null,
    featured: false,
  },
  {
    title: 'URLShortner',
    description: 'Fast URL shortening service with custom aliases, analytics dashboard, and QR code generation.',
    stack: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
    githubUrl: 'https://github.com/inqgamerz48/urlshortner',
    liveUrl: null,
    featured: false,
  },
]

export function Projects() {
  return (
    <section id="projects" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#050505]">
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
            Selected Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6 max-w-xl mx-auto leading-tight">
            Products that <span className="text-primary">exist</span> in production.
            <br />
            Not just on GitHub.
          </h2>
        </motion.div>

        {/* Projects - clean list */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="p-6 md:p-8 bg-card border border-card-border hover:border-primary/30 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Project info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {project.featured && (
                        <span className="text-mono text-primary/60 text-[10px] tracking-[0.15em]">
                          FEATURED
                        </span>
                      )}
                      <span className="text-mono text-text-muted/30 text-xs">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-text-muted/70 mt-2 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-mono text-xs text-text-muted/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 lg:flex-shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-foreground transition-colors text-sm"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-text-muted hover:text-foreground transition-colors text-sm"
                      >
                        <ExternalLink size={16} />
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
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/inqgamerz48"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-mono text-primary/60 hover:text-primary tracking-[0.2em] text-sm transition-colors"
          >
            VIEW ALL PROJECTS
          </a>
        </motion.div>
      </div>

      <div className="section-divider mt-20 max-w-xl mx-auto" />
    </section>
  )
}
