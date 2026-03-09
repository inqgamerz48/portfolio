'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const staticProjects = [
  {
    id: 'ember-ash',
    title: 'Ember & Ash',
    description: 'A modern restaurant website featuring online reservations, dynamic menu display with categories, about section, contact form, and gallery. Built for table bookings and customer engagement.',
    features: ['Online Reservations', 'Menu Management', 'Contact Form', 'Gallery', 'Responsive Design'],
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    year: '2026',
    image: '/projects/ss1.PNG',
    liveUrl: 'https://inq-restaurant-demo.vercel.app/',
  },
  {
    id: 'meridian-properties',
    title: 'Meridian Properties',
    description: 'A premium real estate showcase with property listings, detailed property pages, search/filter functionality, agent profiles, and contact integration. Designed to convert leads into clients.',
    features: ['Property Listings', 'Search & Filter', 'Agent Profiles', 'Lead Generation', 'Gallery'],
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    year: '2026',
    image: '/projects/ss2.PNG',
    liveUrl: 'https://inq-realestate-demo.vercel.app/',
  },
  {
    id: 'biztrackr',
    title: 'BizTrackr',
    description: 'A comprehensive business management dashboard with inventory tracking, sales analytics, employee management, invoice generation, and real-time reporting. Replaced spreadsheets with a real system.',
    features: ['Inventory Management', 'Sales Analytics', 'Employee Management', 'Invoice Generation', 'Real-time Reporting'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'FastAPI', 'PostgreSQL'],
    year: '2026',
    image: '/projects/ss4.PNG',
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

        <div className="grid gap-8">
          {staticProjects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-dark p-5 md:p-8"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-80 h-48 lg:h-56 bg-ink rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl text-parchment tracking-wider">{p.title}</h3>
                      <p className="text-mist mt-2">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.features.map((f) => (
                          <span key={f} className="text-xs text-ash bg-ink px-2 py-1 rounded">{f}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-mono-sm text-ash">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                      <span className="ml-2">{p.year}</span>
                    </div>
                    {p.liveUrl && (
                      <a 
                        href={p.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary text-xs" 
                        data-cursor-hover
                      >
                        View Live <ArrowUpRight size={12} />
                      </a>
                    )}
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
