'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const staticProjects = [
  {
    id: 'ember-ash',
    title: 'Ember & Ash',
    description: 'A restaurant that needed to fill tables, not just look good online.',
    stack: ['Website'],
    year: '2026',
    image: '/projects/ember-ash.svg',
    liveUrl: 'https://inq-restaurant-demo.vercel.app/',
  },
  {
    id: 'meridian-properties',
    title: 'Meridian Properties',
    description: 'Real estate that needed to look as premium as its listings.',
    stack: ['Website'],
    year: '2026',
    image: '/projects/meridian-properties.svg',
    liveUrl: 'https://inq-realestate-demo.vercel.app/',
  },
  {
    id: 'biztrackr',
    title: 'BizTrackr',
    description: 'A small business drowning in spreadsheets needed a real system.',
    stack: ['Web App'],
    year: '2026',
    image: '/projects/biztrackr.svg',
    liveUrl: 'https://biztrackr-grand-enterprise.vercel.app/',
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

        <div className="grid gap-6">
          {staticProjects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-dark p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-48 h-32 bg-ink rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg md:text-xl text-parchment tracking-wider">{p.title}</h3>
                      <p className="text-mist text-sm mt-1">{p.description}</p>
                    </div>
                    {p.liveUrl && (
                      <a 
                        href={p.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-ghost text-xs" 
                        data-cursor-hover
                      >
                        Live <ArrowUpRight size={10} />
                      </a>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-3 text-mono-sm text-ash">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                    <span className="ml-2">{p.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
