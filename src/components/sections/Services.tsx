'use client'

import { motion } from 'framer-motion'

const services = [
  {
    id: 'business-website',
    title: 'Business Websites',
    description: 'A site that looks professional, loads in under 2 seconds, and you can update yourself. No developer needed after launch.',
  },
  {
    id: 'web-apps',
    title: 'Web Apps & Tools',
    description: 'Custom dashboards, booking systems, inventory tools. Built around exactly how your business works.',
  },
  {
    id: 'fix-site',
    title: 'Fix My Existing Site',
    description: 'Slow, ugly, or outdated? I\'ll rebuild or redesign it so it actually works for you.',
  },
  {
    id: 'automation',
    title: 'Automation & Integrations',
    description: 'Connect your tools, automate your workflows, stop doing things manually. From email sequences to CRM syncs to custom bots — I build systems that run without you.',
  },
  {
    id: 'saas',
    title: 'SaaS Development',
    description: 'Got a software idea? I\'ll build it into a real product — auth, billing, dashboards, user management, the works. MVP only.',
  },
]

export function Services() {
  return (
    <section id="services" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">004</span>
          <h2 className="section-title">Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card-dark p-6 flex flex-col"
            >
              <h3 className="font-display text-xl text-parchment tracking-wider mb-2">{s.title}</h3>
              <p className="text-mist text-sm">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
