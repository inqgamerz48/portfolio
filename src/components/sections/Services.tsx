'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const services = [
  {
    title: 'Landing Page',
    price: '$99',
    priceSub: '– $149',
    description: 'Single-page presence that converts',
    features: [
      'Responsive design',
      'Custom animations',
      'Contact form',
      'Basic SEO',
      '3-5 day delivery',
    ],
    popular: false,
  },
  {
    title: 'Business Site',
    price: '$199',
    priceSub: '– $299',
    description: 'Multi-page website with CMS',
    features: [
      'Up to 5 pages',
      'Admin panel',
      'Blog integration',
      'Content management',
      'Advanced SEO',
      '7-10 day delivery',
    ],
    popular: true,
  },
  {
    title: 'Web Application',
    price: '$400',
    priceSub: '– $800',
    description: 'Custom full-stack application',
    features: [
      'Database design',
      'User authentication',
      'REST API',
      'Admin dashboard',
      'Email notifications',
      '2-4 week delivery',
    ],
    popular: false,
  },
  {
    title: 'SaaS MVP',
    price: '$800',
    priceSub: '– $1500',
    description: 'Multi-tenant product ready to scale',
    features: [
      'Multi-tenant architecture',
      'Payment integration',
      'Full backend',
      'Production deployment',
      'Scalable design',
      '4-8 week delivery',
    ],
    popular: false,
  },
]

export function Services() {
  return (
    <section id="services" className="section-wrapper relative bg-[#06060a]">
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
          <span className="section-label mb-6 inline-flex">Services & Pricing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6 max-w-xl mx-auto leading-tight">
            Let&rsquo;s build something <span className="text-primary-light">remarkable</span>.
          </h2>
          <p className="text-text-muted/50 mt-4 max-w-md mx-auto text-sm">
            No templates. No generic designs. Just tailored solutions.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${service.popular ? 'lg:-mt-3 lg:mb-3' : ''}`}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="flex items-center gap-1.5 bg-gradient-to-r from-primary to-primary-light text-white text-[10px] font-semibold px-4 py-1.5 rounded-full tracking-wider shadow-lg shadow-primary/30">
                    <Zap size={10} className="fill-white" />
                    POPULAR
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`h-full p-6 rounded-2xl transition-all duration-300 ${service.popular
                    ? 'animated-border shadow-lg shadow-primary/10'
                    : 'glass-card'
                  }`}
              >
                <div className={service.popular ? 'relative z-10' : ''}>
                  <h3 className="text-lg text-foreground font-display text-xl">
                    {service.title}
                  </h3>

                  <div className="mt-4 mb-3">
                    <span className="text-3xl text-foreground font-light font-display">
                      {service.price}
                    </span>
                    <span className="text-text-muted/40 text-sm ml-1">
                      {service.priceSub}
                    </span>
                  </div>

                  <p className="text-text-muted/50 text-sm mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-text-muted/60">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check size={10} className="text-primary-light" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/919949357594"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-3 text-center text-sm tracking-wider rounded-xl transition-all duration-300 font-medium ${service.popular
                        ? 'btn-primary justify-center'
                        : 'bg-white/[0.03] border border-white/[0.06] text-foreground/80 hover:border-primary/30 hover:text-primary-light hover:bg-primary/[0.04]'
                      }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-text-muted/40 mt-12 text-sm"
        >
          Need something custom?{' '}
          <a href="#contact" className="text-primary-light/70 hover:text-primary-light transition-colors">
            Let&rsquo;s talk
          </a>
        </motion.p>
      </div>
    </section>
  )
}
