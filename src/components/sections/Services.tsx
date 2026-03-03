'use client'

import { motion } from 'framer-motion'

const tiers = [
  {
    name: 'Landing Page',
    description: 'Single-page presence that converts',
    price: '$99 – $149',
    features: ['Responsive design', 'Custom animations', 'Contact form', 'Basic SEO', '3–5 day delivery'],
    popular: false,
  },
  {
    name: 'Business Site',
    description: 'Multi-page website with CMS',
    price: '$199 – $299',
    features: ['Up to 5 pages', 'Admin panel', 'Blog integration', 'Content management', 'Advanced SEO', '7–10 day delivery'],
    popular: true,
  },
  {
    name: 'Web Application',
    description: 'Custom full-stack application',
    price: '$400 – $800',
    features: ['Database design', 'User auth', 'REST API', 'Admin dashboard', 'Email notifications', '2–4 week delivery'],
    popular: false,
  },
  {
    name: 'SaaS MVP',
    description: 'Multi-tenant product ready to scale',
    price: '$800 – $1500',
    features: ['Multi-tenant arch', 'Payment integration', 'Full backend', 'Production deploy', 'Scalable design', '4–8 week delivery'],
    popular: false,
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

        <div className="grid md:grid-cols-2 gap-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`card-dark p-7 flex flex-col ${tier.popular ? 'border-blood/20 ring-1 ring-blood/10' : ''
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-2xl text-parchment tracking-wider">{tier.name}</h3>
                {tier.popular && (
                  <span className="text-mono-sm text-blood bg-blood/10 px-2 py-0.5 rounded-sm text-[9px]">Popular</span>
                )}
              </div>
              <p className="text-mist text-sm mb-2">{tier.description}</p>
              <p className="font-display text-3xl text-gold tracking-wider mb-6">{tier.price}</p>

              <ul className="space-y-2 flex-grow mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="text-mist text-sm flex items-baseline gap-2">
                    <span className="text-blood text-[8px]">▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="btn-primary w-full text-center" data-cursor-hover>Get Started</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
