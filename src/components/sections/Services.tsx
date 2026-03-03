'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Service {
  id: string
  title: string
  description: string
  priceMin: number
  priceMax: number
  features: string[]
  popular: boolean
}

export function Services() {
  const [tiers, setTiers] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setTiers(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch services', err)
        setLoading(false)
      })
  }, [])

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

        {loading && (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="card-dark p-7 flex flex-col h-[400px]">
                <div className="w-1/2 h-8 bg-ink rounded animate-pulse mb-3" />
                <div className="w-3/4 h-4 bg-ink rounded animate-pulse mb-6" />
                <div className="w-1/3 h-10 bg-ink rounded animate-pulse mb-8" />
                <div className="space-y-4 flex-grow">
                  <div className="w-full h-3 bg-ink rounded animate-pulse" />
                  <div className="w-5/6 h-3 bg-ink rounded animate-pulse" />
                  <div className="w-4/5 h-3 bg-ink rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && tiers.length === 0 && (
          <div className="py-12 text-center text-mist">
            <p className="font-mono text-sm uppercase tracking-widest">No services listed yet</p>
          </div>
        )}

        {!loading && tiers.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`card-dark p-7 flex flex-col ${tier.popular ? 'border-blood/20 ring-1 ring-blood/10' : ''
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-2xl text-parchment tracking-wider">{tier.title}</h3>
                  {tier.popular && (
                    <span className="text-mono-sm text-blood bg-blood/10 px-2 py-0.5 rounded-sm text-[9px]">Popular</span>
                  )}
                </div>
                <p className="text-mist text-sm mb-2">{tier.description}</p>
                <p className="font-display text-3xl text-gold tracking-wider mb-6">
                  ${tier.priceMin} – ${tier.priceMax}
                </p>

                <ul className="space-y-2 flex-grow mb-6">
                  {tier.features.map((f, j) => (
                    <li key={j} className="text-mist text-sm flex items-baseline gap-2">
                      <span className="text-blood text-[8px]">▸</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="btn-primary w-full text-center" data-cursor-hover>Get Started</a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
