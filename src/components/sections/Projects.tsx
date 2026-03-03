'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  githubUrl: string | null
  liveUrl: string | null
  year: string
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        // Map data to handle missing fields if any, and extract a year from createdAt
        const formattedData = Array.isArray(data) ? data.map(p => ({
          ...p,
          year: new Date(p.createdAt).getFullYear().toString()
        })) : []
        setProjects(formattedData)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch projects', err)
        setLoading(false)
      })
  }, [])

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

        {/* Loading State */}
        {loading && (
          <div className="py-12 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-8 border-b border-parchment/[0.04] pb-6">
                <div className="w-8 h-4 bg-ink rounded animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="w-48 h-6 bg-ink rounded animate-pulse" />
                  <div className="w-full h-4 bg-ink rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="py-12 text-center text-mist">
            <p className="font-mono text-sm uppercase tracking-widest">No projects available</p>
          </div>
        )}

        {/* Project rows */}
        {!loading && projects.length > 0 && projects.map((project, i) => (
          <motion.div
            key={project.id}
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
              <p className="hidden md:block text-mono-sm text-ash">
                {Array.isArray(project.stack) ? project.stack.join(' · ') : project.stack}
              </p>

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
