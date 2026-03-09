'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'

const phoneNumber = '919949357594'

const services = [
  {
    id: 'business-website',
    title: 'Business Websites',
    description: 'A site that looks professional, loads in under 2 seconds, and you can update yourself. No developer needed after launch.',
    price: 'From $99',
    color: '#c41230',
  },
  {
    id: 'web-apps',
    title: 'Web Apps & Tools',
    description: 'Custom dashboards, booking systems, inventory tools. Built around exactly how your business works.',
    price: 'From $399',
    color: '#d4a853',
  },
  {
    id: 'fix-site',
    title: 'Fix My Existing Site',
    description: "Slow, ugly, or outdated? I'll rebuild or redesign it so it actually works for you.",
    price: 'From $80',
    color: '#ff6b3d',
  },
  {
    id: 'automation',
    title: 'Automation & Integrations',
    description: 'Connect your tools, automate your workflows, stop doing things manually. From email sequences to CRM syncs to custom bots — I build systems that run without you.',
    price: 'From $350',
    color: '#22c55e',
  },
  {
    id: 'saas',
    title: 'SaaS Development',
    description: "Got a software idea? I'll build it into a real product — auth, billing, dashboards, user management, the works. MVP only.",
    price: 'From $800',
    color: '#8e8ea0',
  },
]

export function Services() {
  const handleServiceClick = (serviceTitle: string, price: string) => {
    const message = `Hi INQ, I'm interested in ${serviceTitle} (${price}). Can you help?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="services" className="section-wrapper relative">
      <div className="grid-overlay-fixed" />
      <div className="gold-glow" />
      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-num">004</span>
          <h2 className="section-title">Services & Pricing</h2>
        </motion.div>

        <div className="grid gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-dark p-5 md:p-8"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: s.color }}
                    />
                    <h3 className="font-display text-2xl md:text-3xl text-parchment tracking-wider">{s.title}</h3>
                  </div>
                  <p className="text-mist mt-2">{s.description}</p>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[200px]">
                  <p className="font-display text-gold text-2xl">{s.price}</p>
                  <button 
                    onClick={() => handleServiceClick(s.title, s.price)}
                    className="btn-primary text-sm flex items-center gap-2"
                    data-cursor-hover
                  >
                    <MessageCircle size={14} />
                    Get Quote
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
