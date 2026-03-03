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
    features: ['Database design', 'User authentication', 'REST API', 'Admin dashboard', 'Email notifications', '2–4 week delivery'],
    popular: false,
  },
  {
    name: 'SaaS MVP',
    description: 'Multi-tenant product ready to scale',
    price: '$800 – $1500',
    features: ['Multi-tenant architecture', 'Payment integration', 'Full backend', 'Production deployment', 'Scalable design', '4–8 week delivery'],
    popular: false,
  },
]

export function Services() {
  return (
    <section id="services" className="section-wrapper relative">
      <div className="slash-divider" />

      <div className="section-inner max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Services & Pricing
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-parchment mb-16"
        >
          Commission a blade.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-5">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`anime-card p-7 md:p-8 flex flex-col ${tier.popular ? 'border-blood/30 ring-1 ring-blood/10' : ''
                }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl md:text-2xl font-black text-parchment">
                  {tier.name}
                </h3>
                {tier.popular && (
                  <span className="text-mono text-blood text-[9px] bg-blood/10 px-2 py-1 rounded-sm">
                    Popular
                  </span>
                )}
              </div>

              <p className="text-mist mb-2">{tier.description}</p>
              <p className="font-serif text-2xl font-black text-gold mb-6">{tier.price}</p>

              {/* Features */}
              <ul className="space-y-2.5 flex-grow mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="text-mist text-sm flex items-baseline gap-3">
                    <span className="text-blood text-xs">▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="btn-blade text-center w-full">
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
