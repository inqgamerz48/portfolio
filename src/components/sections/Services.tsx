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
      <div className="section-inner max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          className="section-eyebrow mb-6"
        >
          Services
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-heading text-fg mb-16"
        >
          What I build for clients.
        </motion.h2>

        {/* Editorial table layout */}
        <div className="space-y-0">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`py-10 border-t border-[rgba(200,180,160,0.08)] ${tier.popular ? 'bg-[rgba(212,65,42,0.03)] -mx-6 px-6 lg:-mx-10 lg:px-10' : ''
                }`}
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                {/* Tier name & price */}
                <div className="col-span-12 lg:col-span-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-2xl lg:text-3xl text-fg">
                      {tier.name}
                    </h3>
                    {tier.popular && (
                      <span className="text-mono text-ember text-[10px]">Popular</span>
                    )}
                  </div>
                  <p className="text-ash mt-1">{tier.description}</p>
                  <p className="font-serif text-xl text-bone mt-3">{tier.price}</p>
                </div>

                {/* Features */}
                <div className="col-span-12 lg:col-span-6 lg:col-start-6 mt-4 lg:mt-0">
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="text-ash flex items-baseline gap-3">
                        <span className="text-charcoal select-none">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="col-span-12 lg:col-span-2 lg:col-start-12 mt-4 lg:mt-0 flex lg:justify-end">
                  <a href="#contact" className="btn-ghost">
                    Start
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[rgba(200,180,160,0.08)]" />
        </div>
      </div>
    </section>
  )
}
