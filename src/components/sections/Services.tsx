'use client'

import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const services = [
  {
    title: 'Landing Page',
    price: '$99',
    priceSub: '- $149',
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
    priceSub: '- $299',
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
    priceSub: '- $800',
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
    priceSub: '- $1500',
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
    <section id="services" className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-[#030003]">
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
            Services & Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mt-6 max-w-xl mx-auto leading-tight">
            Let's build something <span className="text-primary">remarkable</span>.
          </h2>
          <p className="text-text-muted/60 mt-4 max-w-md mx-auto">
            No templates. No generic designs. Just tailored solutions.
          </p>
        </motion.div>

        {/* Pricing cards - centered grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${service.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="flex items-center gap-1 bg-primary text-foreground text-[10px] font-medium px-3 py-1 tracking-wider">
                    <Zap size={10} />
                    POPULAR
                  </span>
                </div>
              )}

              {/* Card */}
              <div 
                className={`h-full p-6 border transition-all duration-300 ${
                  service.popular 
                    ? 'border-primary bg-card' 
                    : 'border-card-border bg-card hover:border-primary/30'
                }`}
              >
                <h3 className="text-xl text-foreground">
                  {service.title}
                </h3>

                <div className="mt-3 mb-3">
                  <span className="text-3xl text-foreground">
                    {service.price}
                  </span>
                  <span className="text-text-muted/50 text-sm">
                    {service.priceSub}
                  </span>
                </div>

                <p className="text-text-muted/60 text-sm mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-text-muted/70">
                      <Check size={14} className="text-primary/60 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/919949357594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 text-center text-sm tracking-wider transition-all duration-300 ${
                    service.popular
                      ? 'bg-primary text-foreground hover:bg-primary/90'
                      : 'border border-card-border text-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  Get Started
                </a>
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
          Need something custom? <a href="#contact" className="text-primary/60 hover:text-primary">Let's talk</a>
        </motion.p>
      </div>
    </section>
  )
}
